import { useGoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { googleLoginRequest, googleRegisterRequest, loginRequest } from '../api/auth'

export const AuthContext = createContext()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
export const AuthProvider = ({ children }) => {
  console.log('AuthProvider')
  const [googleToken, setGoogleToken] = useState(null)
  const [googleProfile, setGoogleProfile] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user)
      console.log('res-->', res.data)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      // console.log('error', error)
      setErrors(error.response.data)
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log('res::', res)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      } else {
        setErrors([error.response.data.message])
      }
    }
  }

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (token) => {
      
      setLoading(true)
      setIsAuthenticated(false)
      setGoogleToken(token)
      
      await saveGoogleProfile(token)
    },
    onError: (error) => console.log('Login Failed:', error)
  })

  const saveGoogleProfile = async (token) => {
    try {
      const { status, data} = await googleRegisterRequest(token)
      // console.log('e', e)
      console.log('status', status)
      console.log('data', data)
      if (status !== 202) {
        console.error('on Error ocurred to register user', data?.message)
      }
      console.log('hasta aqui todo bien')
      setUser(data.data)
      setIsAuthenticated(true)
      setLoading(false)
      console.log('user-->', user)
      console.log('user-->', user)
    } catch (e) {
      console.log('e', e)
      toast.error(e.response.data.message || 'An error occurred to register user')
    }
  }

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (token) => {
      console.log('token', token)
      setLoading(true)
      setIsAuthenticated(false)
      setGoogleToken(token)
      // console.log('se guardo el token')
      await validateGoogleUser(token)
    },
    onError: (error) => console.log('Login Failed:', error)
  })

  const validateGoogleUser = async (token) => {
    console.log('onValidateGoogleUser')
    try {
      const { data, status } = await googleLoginRequest(token)
      
      if (status !== 202) {
        console.log('message', data.message)
      }
      setUser(data.data)
      setIsAuthenticated(true)
      setLoading(false)
      // console.log('user', user)
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message || 'An error occurred to login user')
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }
      // try {
      //   const res = await verifyTokenRequest(cookies.token)
      //   setLoading(true)
      //   if (!res.data) {
      //     setIsAuthenticated(false)
      //     setLoading(false)
      //     return
      //   }
      //   console.warn('si esta autenticado')
      //   setIsAuthenticated(true)
      //   setLoading(false)
      //   setUser(res.data)
      // } catch (error) {
      //   console.error(error)
      //   setLoading(false)
      //   setIsAuthenticated(false)
      //   setUser(null)
      // }
    }
    checkLogin()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signInWithGoogle,
        registerWithGoogle,
        logout,
        loading,
        user,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
