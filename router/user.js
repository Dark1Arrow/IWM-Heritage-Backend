import express from "express"
const router = express.Router();

// Controllers
import {sendOTP,login,signup,changePassword} from "../controllers/auth.js"

// Resetpassword controllers
import {resetPassword,resetPasswordToken} from "../controllers/resetPassword.js"

// Middleware
import { auth } from "../middleware/auth.js";


// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Route for sending OTP to the user's email
router.post('/sendotp', sendOTP);

// Route for Changing the password
router.post('/changepassword', auth, changePassword);

// Route for generating a reset password token
router.post('/reset-password-token', resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

export default router