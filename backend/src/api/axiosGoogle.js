import axios from 'axios'

export const getProfile = async (token) => {
  console.log(':::::getProfile:::::')
  console.log('token', token)
  if (!token || token === undefined) {
    console.log('control de error token')
    return {
      error: 'token not exist'
    }
  }
  const profile = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log('err-->', err)
      return {
        error: 'an error ocurred '
      }
    })
  
  console.log('profile-->', profile)
  return profile
}
