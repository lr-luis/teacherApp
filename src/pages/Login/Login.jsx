import { useGoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { handleSubmit } = useForm()
  const { signInWithGoogle, isAuthenticated } = useAuth()
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onHandleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Password length validation (example)
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    // Clear any previous errors
    setError('')

    // Here you would typically add your login logic
    console.log('Login attempted with:', { email, password })
    // Example: call an authentication service
    // auth.login(email, password)
  }

  const onSubmitGoogle = handleSubmit((data) => {
    signInWithGoogle(data)
  })

  const getGoogleProfile = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log('Login Failed:', error)
  })

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  return (
    <div className="flex h-screen items-center justify-center">
      <Toaster richColors position="top-center" />
      <div className="bg-white mx-auto max-w-sm items-center justify-center space-y-2 rounded-xl px-8 py-8 shadow-lg sm:flex sm:items-center sm:gap-x-6 sm:space-y-0 sm:py-4">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-gray-700 block text-sm font-medium"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="border-gray-300 focus:ring-sky-500 focus:border-sky-500 peer block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm"
              placeholder="Enter your email address"
            ></input>
            <p className="text-pink-600 invisible mt-2 text-sm peer-invalid:visible">
              Please provide a valid email address.
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-700 block text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-gray-300 focus:ring-sky-500 focus:border-sky-500 peer block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm"
              placeholder="Enter your password"
            ></input>
            <p className="text-pink-600 invisible mt-2 text-sm peer-invalid:visible">
              Your password is too short.
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-700 text-white border-transparent focus:ring-sky-500 flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center rounded-lg px-4 py-2 transition duration-300"
            onClick={onSubmitGoogle}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login
