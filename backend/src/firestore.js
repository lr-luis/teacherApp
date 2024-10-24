import { Firestore } from '@google-cloud/firestore';
import { Storage } from '@google-cloud/storage';


export const connectDB = async () => {
  const storage = new Storage({
    keyFilename: 'src/teacherapp-serviceCode.json'
  })
  const proyect = await storage.getProjectId()
  console.log('proyect::', proyect)
  // const [buckets] = await storage.getBuckets()
  // console.log('Buckets:')

  // for (const bucket of buckets) {
  //   console.log(`- ${bucket.name}`)
  // }
}

// connectDB()

const db = new Firestore({
  keyFilename: 'src/teacherapp-serviceCode.json'
})

export const getUsers = async () => {
  const snapshot = await db.collection('users').get();

  snapshot.forEach(doc => {
    console.log(doc.id)
  });
}

export const userExist = async (user = 'test') => {
  console.log('onuserExist::', user)
  const userExist = await (await db.doc(`users/${user}`).get()).exists
  return userExist
}

export const createUser = async (userData) => {
  const isDocCreated = await db
    .doc(`users/${userData.email}`)
    .set({
      email: userData.email,
      name: userData.given_name,
      lastName: userData.family_name
    })
    .then((res) => true)
    .catch((err) => {
      console.log('error to create user doc--> ', err)
      return false
    })
  return isDocCreated
}