import express from "express"

const router = express.Router()

import {createReview,getSiteReviews,toggleLikeReview,deleteReview,getReviewStats} from "../controllers/review.js"
import { auth } from "../middleware/auth.js";

router.get('/:heritageId', getSiteReviews); 
router.post('/', auth, createReview);
router.put('/:id/like', auth, toggleLikeReview);
router.delete('/:id', auth, deleteReview);
router.get('/stats/:heritageId', getReviewStats);

export default router