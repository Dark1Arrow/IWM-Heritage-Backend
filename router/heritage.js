import express from "express"
import {isAdmin,auth} from "../middleware/auth.js"
import { createHeritage, deleteHeritage, getAllHeritage ,editHeritage,getHeritageById} from "../controllers/heritage.js"

const router = express.Router()

router.post("/createHeritage",auth,isAdmin,createHeritage)
router.get("/allHeriatge",getAllHeritage)
router.delete("/deleteHeritage/:id",auth,isAdmin,deleteHeritage)
router.get("/getHeritage/:id",getHeritageById)
router.post("/editHeritage",auth,isAdmin,editHeritage)

export default router