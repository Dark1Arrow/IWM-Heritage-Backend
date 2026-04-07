import express from "express"
import {auth, isAdmin} from "../middleware/auth.js"
import {updateProfile,deleteAccount,getUserDetails, updateUserProfileImage, instructorDashboard} from "../controllers/profile.js"

const router = express.Router()


router.put("/update-profile",auth,updateProfile)
router.delete("/delete-profile",auth,deleteAccount)
router.get("/getUserDetails",auth,getUserDetails)

router.put("/updateUserProfileImage" ,auth, updateUserProfileImage)

router.get("/instructorDashboard", auth, isAdmin , instructorDashboard)

export default router