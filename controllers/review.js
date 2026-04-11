import Review from '../model/review.js';
import mongoose from 'mongoose';
import SavedHeritage from '../model/savedHeritage.js';

const createReview = async (req, res) => {
    try {
        const { heritageId, rating, comment } = req.body;
        const userId = req.user.id; // From auth middleware

        const review = await Review.create({
            heritageId,
            userId,
            rating,
            comment
        });

        // Note: The average rating calculation is handled by a Mongoose 
        // Middleware (Static Method) on the Model for better performance.

        res.status(201).json({ success: true, data: review });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "You have already reviewed this Heritage" });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

const getSiteReviews = async (req, res) => {
    try {
        const { heritageId } = req.params;

        const reviews = await Review.find({ heritageId })
            .populate('userId', 'lastName lastName image email') // To match your UI screenshot
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const toggleLikeReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Check if user already liked the review
        const isLiked = review.likes.includes(req.user.id);

        if (isLiked) {
            // Remove Like
            review.likes.pull(req.user.id);
        } else {
            // Add Like
            review.likes.push(req.user.id);
        }

        review.likeCount = review.likes.length;
        await review.save();

        res.status(200).json({ success: true, likeCount: review.likeCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) return res.status(404).json({ message: "Review not found" });

        // Ensure user owns the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to delete this review" });
        }

        await review.deleteOne();

        res.status(200).json({ success: true, message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getReviewStats = async (req, res) => {
    try {
        const { heritageId } = req.params;
        const targetId = new mongoose.Types.ObjectId(heritageId);

        const stats = await Review.aggregate([
            { $match: { heritageId: targetId } },
            {
                $group: {
                    _id: '$heritageId',
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 },
                    stars: { $push: '$rating' }
                }
            }
        ]);

        if (!stats || stats.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    averageRating: "0.0",
                    totalReviews: 0,
                    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                }
            });
        }

        // 2. FIX HERE: Access the first element
        const result = stats[0]; 

        // 3. Initialize distribution
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        // console.log('--- Now result is an OBJECT ---');
        // console.log(result);

        // 4. Now result.stars will work because result is an object, not an arra

        if (result ) {
            result.stars.forEach(num => {
                distribution[num] = (distribution[num] || 0) + 1;
            });
        }

        const finalAverage = result.averageRating || 0

        const finalTotal = result.totalReviews || 0

        res.status(200).json({
            success: true,
            data: {
                averageRating: finalAverage,
                totalReviews: finalTotal,
                distribution
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export { createReview, getSiteReviews, toggleLikeReview, deleteReview, getReviewStats }