import express from 'express';
import { login, register, signUp } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", register)
router.post("/sign-up/:id", signUp)
router.post("/login", login)

export default router