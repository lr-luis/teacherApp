import { createUser, userExist } from '../firestore.js'
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