import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  heritageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HeritageDetails',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
    trim: true,
    maxlength: 1000
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  // We store the count separately for faster querying
  likeCount: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// Prevent a user from reviewing the same site multiple times
reviewSchema.index({ heritageId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema)