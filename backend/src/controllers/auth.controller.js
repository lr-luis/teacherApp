import { getProfile } from '../api/axiosGoogle.js'
import { createUser, userExist } from '../firestore.js'
import { isObjectEmpty } from '../scripts/lrUtils.js'
export const signUp = async (req, res) => {
  const { email } = req.body
  console.log(req.body)
  console.log('email', email)
  const userExists = await userExist(email)
  console.log('userExist::', userExists)
  if (userExists) {
    return res.status(302).json({
      message: 'El correo ya fue registrado con otra cuenta'
    })
  }
  
  const isDocCreated = await createUser(req.body)
  if (!isDocCreated) {
    return res.status(500).json({
      message: 'An error occurred while creating the user doc'
    })
  }

  return res.status(201).json({
    message: 'user created successfully'
  })
  
}

export const googleSingIn = async (req, res) => {
  console.log('::::::::googleSignIn:::::::')
  console.log('req-->', req.body)
  if (!req.body) {
    return res.status(400).json({
      message: 'an error ocurred to get token (b)'
    })
  }
  const { access_token } = req.body
  if (!access_token || access_token == undefined ||access_token == 'undefined') {
    return res.status(400).json({
      message: 'an error ocurred to get token (t)'
    })
  }
  const { email = '', name = '', given_name = '', picture = '', error }  = await  getProfile(access_token)
  // console.log('profileInSignIn -->', profile)
  if (error) {
    return res.status(400).json({
      message: error
    })
  }
  const userExists = await userExist(email)
  if (!userExists) {
    return res.status(403).json({
      message: 'Not exist user with this email'
    })
  }

  return res.status(202).json({
    message: 'User found',
    data: {
      email,
      name,
      given_name,
      picture
    }
  })
}

export const googleRegister = async(req, res ) => {
  console.log('::::::::googleRegister:::::::')
  console.log('req-->', req.body)
 
  
  if (!req.body) {
    return res.status(400).json({
      message: 'an error ocurred to get token (b)'
    })
  }

  if (isObjectEmpty(req.body)) {
    console.log('an error ocurred to get token (oe)')
    return res.status(400).json({
      message: 'an error ocurred to get token (oe)'
    })
  }

  const { access_token } = req.body
  console.log('access_token', access_token)
  if (!access_token || access_token == undefined || access_token == 'undefined') {
    console.log('an error ocurred to get token (t)')
    return res.status(400).json({
      message: 'an error ocurred to get token (t)'
    })
  }

    const {
      email = "",
      name = "",
      given_name = "",
      picture = "",
      error,
    } = await getProfile(access_token);
  if (error) {
    console.log('An error ocurred to get profile', error)
    return res.status(400).json({
      message: error
    })
  }

  const userExists = await userExist(email);
  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }


  return res.status(202).json({
    message: "user registry successfully",
    data: {
      email,
      name,
      given_name,
      picture,
    },
  });
}