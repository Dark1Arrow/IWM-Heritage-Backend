import SavedHeritage from "../model/savedHeritage.js";

const toggleSaveHeritage = async (req, res) => {
  try {
    const { heritageId } = req.params;
    const userId = req.user.id; 

    // Check if it already exists
    const existingSave = await SavedHeritage.findOne({ userId, heritageId });

    if (existingSave) {
      await existingSave.deleteOne();
      return res.status(200).json({ success: true, message: "Heritage removed from saved list" });
    }

    // Otherwise, create it
    const newSave = await SavedHeritage.create({
      userId,
      heritageId,
    });

    res.status(201).json({ success: true, data: newSave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getSavedHeritage = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedItems = await SavedHeritage.find({ userId })
      .populate('heritageId', 'name mainImage heritageType tagline era lat lng location visitInfo') // Only pull the fields you need
      .sort('-createdAt'); // Latest saved first

    res.status(200).json({
      success: true,
      count: savedItems.length,
      data: savedItems
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {getSavedHeritage, toggleSaveHeritage}