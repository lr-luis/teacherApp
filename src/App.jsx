import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  // setProfile(null)

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log('Login Failed:', error)
  })

  const errorInLogin = (error) => {
    console.log('onErrorLogin :: ', error)
  }

  useEffect(
    () => {
      if (user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
          .then((res) => {
            setProfile(res.data)
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
    // <button onClick={() => login()} onError={() => errorInLogin()}>Sign in with Google 🚀</button>
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
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
        <button onClick={login}>Sign in with Google 🚀 </button>
      )}
    </div>
  )
}
export default App
