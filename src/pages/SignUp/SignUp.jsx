import { AlertCircle, Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Toaster } from "sonner";
import { useAuth } from '../../context/AuthContext';
// toast.error("Event has not been created");
function Login() {
  const navigate = useNavigate()
  const { handleSubmit } = useForm()
  const { isAuthenticated, registerWithGoogle } = useAuth()
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
    const response = registerWithGoogle(data)
    console.log('response', response)
  })

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-md">
        <form
          onSubmit={onHandleSubmit}
          className="bg-white mb-4 rounded-lg px-8 pb-8 pt-6 shadow-md"
        >
          <h2 className="text-gray-800 mb-6 text-center text-2xl font-bold">
            Sign Up to Your Account
          </h2>

          {error && (
            <div className="bg-red-50 border-red-300 text-red-800 relative mb-4 flex items-center rounded border px-4 py-3">
              <AlertCircle className="text-red-500 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-gray-700 mb-2 block text-sm font-bold"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-gray-700 focus:ring-blue-500 w-full appearance-none rounded border px-3 py-2 pl-10 leading-tight shadow focus:outline-none focus:ring-2"
              />
              <Mail
                className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transform"
                size={20}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 mb-2 block text-sm font-bold"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="text-gray-700 focus:ring-blue-500 mb-3 w-full appearance-none rounded border px-3 py-2 pl-10 leading-tight shadow focus:outline-none focus:ring-2"
              />
              <Lock
                className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transform"
                size={20}
              />
            </div>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-800 inline-block align-baseline text-sm font-bold"
            >
              Forgot Password?
            </a>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white focus:shadow-outline mt-4 w-full rounded px-4 py-2 font-bold transition duration-300 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center flex mb-4 items-center justify-between">
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
          </div>

          {/* <div className="text-center mt-4">
            <span className="text-gray-600 text-sm">
              Don't have an account?
              <a href="/SignUp" className="text-blue-500 hover:text-blue-800 font-bold ml-2">
                Sign Up
              </a>
            </span>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Login
