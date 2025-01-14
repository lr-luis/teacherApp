import axios from "./axios"

export const loginRequest = (user) => axios.post(`/login`, user)
export const googleLoginRequest = (user) => axios.post(`/googleSignIn`, user)
export const googleRegisterRequest = (user) => axios.post(`/googleRegister`, user)