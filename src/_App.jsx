import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
// import Login from './pages/Login/Login'


function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  // setProfile(null)

  const getGoogleProfile = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log('Login Failed:', error)
  })

  const errorInLogin = (error) => {
  }

  useEffect(
    () => {
      console.log('user::one::', user)
      console.log('profile::', profile)
      // if (Array.isArray(user)) {
      if (!!user && (profile == null || Array.isArray(profile))) {
        console.log('user::', user)
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            axios
              .post(`http://localhost:4000/api/signUp`, {
                ...res.data
              })
              .then((response) => {
                console.log('user login successfully')
                setProfile(res.data)
              })
              .catch((err) => {
                console.log('user registry with error', err)
              })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  )

  const logout = () => {
    googleLogout()
    setProfile(null)
    setUser(null)
  }

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile && !Array.isArray(profile) ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
          <button onClick={getGoogleProfile}>Sign in with Google 🚀 </button>
          
        )}
    </div>
  )
}
export default App
