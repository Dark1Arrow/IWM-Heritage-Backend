import mongoose from "mongoose";

const savedHeritageSchema = new mongoose.Schema({
  // Reference to the User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Indexed for fast lookups by user
  },
  
  // Reference to the Heritage Site
  heritageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HeritageDetails',
    required: true
  },

  // // User-specific customizations
  // collectionName: {
  //   type: String,
  //   trim: true,
  //   default: 'My Favorites'
  // },
  
  // personalNotes: {
  //   type: String,
  //   maxlength: 500
  // },

  // isVisited: {
  //   type: Boolean,
  //   default: false
  // },

  savedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt automatically
});

// CRITICAL: Prevent duplicate saves (one user can't save the same site twice)
savedHeritageSchema.index({ userId: 1, heritageId: 1 }, { unique: true });

export default mongoose.model('SavedHeritage', savedHeritageSchema);