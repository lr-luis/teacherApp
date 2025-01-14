// import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// // const configFile = require('./../teacherapp-serviceCode.json')

// const app = initializeApp({
//   "type": "service_account",
//   "project_id": "teacherapp-1727984119986",
//   "private_key_id": "e61699db665b6178c19ba7ab7b13f237923c22a0",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC073/rQf8tg8eH\nLP+y3hJB1OqH9XUAZQTG610tJyMbfINxoIXqOS/xO9f7eW5WJeDgtKEO0ieATMEg\nYMrh1e3c2iX0Yhynq3gae54TOgudR31OVsSxpIcnQFojdn3NMMB56ox1yMGCeQJI\nAtbW5mvsUYPTUsW3z0/MKV+8EltCB9U/nD7Rq1LxKSzkonUJ5rivz+Vv2QBtRFjE\nPr4ZmneUX5C9FiFP1wxZPjJDnnmpE4g8q/sRIL5MUck9akSuN/wjAO1/OhIfnvTj\noAcl6pznwONDwKlgWh53Ns4O/rfia9BIWeQ8iqVaNQtfcYuwXdojLZTRLsPLgGFM\ndXXDqKnLAgMBAAECggEAVI40ZpoSCZAzF63k1Q9I0vEQpXcFNaj/4YIuqiJHGtpG\nhzxwOLR+/ipsVf46nRHYlMp1FfsKMMAt5Na3GXEjVvmvkRSktYrBdwbcKboPoXG+\nUnTkOOxdqO8+8KG4SsMEwDTnbUfjfvjUIxkIk6ddOjQh+gkNk0fTz+Jp9fdSJHnA\nYbqArgdDI3Sz0eFNitPNePerzKg+3vULuymmBVTR0ZA1cdjnN8uP/fEibrA0mckq\nWQ6ve6MVBfd252gCo9KqViaxRcz+chYlVlmT4rNHI+6Mp/X61DN6zFXAUFD6NR9E\nkJJeLgT9CFPEBnYZ4DDHHIR5gQ8dwbz7xnD888l7kQKBgQDu7mPT1hjed47C5HFz\n3YJX9V4iVg3FrXba8uCsuVGKD+owHcGyLoet4wqUqGSN57fTHsPuP4u/qoqMM5TZ\nDBoKoZRAQ6OnS8hYGmHLhNcARtRd8YAj91uSVVJLM7RT8WDyYiSXtdfKLYD23dad\ndLZONM9Ya/wqOT40QXInS7kzmQKBgQDB3Hnrz1jWZhhvWGyW+/Nu9OUnsbhXyRK4\nZtvHvrr/M3rTwxw4wnuuDouLnrtG2y4VvaXpecURadRwE8xCTRtozTQkyEC7GEYf\nGfraG0248AQUMPRKx/iQB3D4/z0YhU/2P9JcHJ4mwDOfIeOubdnazyKlomtj19zw\nsKqXzx7nAwKBgG+Zk7E3eEg5CcqIT2GyHhadegmJrkcd3b0o4r5qlOZqxpUQ4Q8r\n4p3axW9oNAeAKwGGhje7ILg2nR4dXbH/kA5VKFzX+xHCOOLF99XKx23Op5T1n0et\nWu0/wv9zOBBZV1H/e14NRqydknY8aekDwb9HtW10isTiFebshrhKC0hJAoGALOEh\nyJmj816HYZ+S5BFH9fPz6RCXoJsIHnCRiNh66gG8+bE9o1ZC07TCUXxZ1rl/HcFd\n24M5QCLD735l1yOKqOR4odtKQQYJlcGp9TxE7f+CsjnzFCzfOli+qqZMOpUCQfvc\ncz6czlPIn5p03zjHKoSxfK7xNZgPqhj8JVDp0okCgYEA6XzV5R1/g9RIj69PdznK\nqwjivazbE9Y707O7wtgsZVmi+s8AbavtoyEfUDvpFstRAcWr5adbwOvdkWVLCqPX\npw8snKskPPnnQVuHI//eQI40eMeH4K+oqsGy/a7GvgTFhVFIuFjOoaC9jRKbB1h+\nGlWovw4TGrMlLuMjTxVto/g=\n-----END PRIVATE KEY-----\n",
//   "client_email": "development@teacherapp-1727984119986.iam.gserviceaccount.com",
//   "client_id": "106627916170465233699",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/development%40teacherapp-1727984119986.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"

// })

// const db = getFirestore(app)



// const firestore = require('@google-cloud/firestore')
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
  console.log('onUserExist::', user)
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