import express from "express"

 const router = express.Router()

import { auth } from "../middleware/auth.js"
import { getSavedHeritage, toggleSaveHeritage } from "../controllers/saved.js"

router.post("/:heritageId", auth, toggleSaveHeritage)
router.get("/", auth, getSavedHeritage)

export default router