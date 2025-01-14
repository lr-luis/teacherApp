import { Router } from "express";
import { googleSingIn, signUp, googleRegister } from "../controllers/auth.controller.js";

const router = Router()

router.post('/googleSignIn', googleSingIn)
router.post('/signUp', signUp)
router.post('/googleRegister', googleRegister)

export default router