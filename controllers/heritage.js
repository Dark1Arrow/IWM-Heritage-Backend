import HeritageDetails from "../model/heritageDetails.js"
import { uploadImageToCloudinary } from "../utils/imageUploder.js";

// Create :- For Add new detail pages  
// List :- Fetches all data with only few details
// GetOne :- With complete details
// Update :- Update Specific heritage
// Delete :- Delete Specific Heritage

const createHeritage = async (req, res) => {
    try {
        // 1. Extract non-file data from req.body
        let {
            name,
            tagline,
            era,
            heritageType,
            location: _location,
            about: _about,
            timeline: _timeline,
            architecture: _architecture,
            significance: _significance,
            story: _story,
            visitInfo: _visitInfo,
            contact: _contact,
            experiences: _experiences,
        } = req.body;

        // 2. Parse stringified JSON fields from FormData
        // We use helper to parse only if they exist as strings
        const parse = (data) => (typeof data === "string" ? JSON.parse(data) : data);

        const locationData = parse(_location);
        const about = parse(_about);
        const timeline = parse(_timeline);
        const architecture = parse(_architecture);
        const significance = parse(_significance);
        const story = parse(_story);
        const visitInfo = parse(_visitInfo);
        const contact = parse(_contact);
        const experiences = parse(_experiences);

        // 3. Extract Files (Main Image and Gallery)
        const mainImageFile = req.files?.mainImage;
        const galleryFiles = req.files?.gallery; // Expected as an array of files
        const archFooterFile = req.files?.archFooterImage;

        // 4. Validation (Check mandatory fields)
        if (!name || !heritageType || !mainImageFile || !locationData?.coordinates || !timeline.length) {
            return res.status(400).json({
                success: false,
                message: "Name, Heritage Type, Main Image, and Coordinates are required.",
            });
        }

        // 5. Upload Main Hero Image to Cloudinary
        const mainImageUpload = await uploadImageToCloudinary(
            mainImageFile,
            process.env.FOLDER_NAME || "HeritageDharsan/Main"
        );

        if (archFooterFile) {
            const fileToUpload = Array.isArray(archFooterFile) ? archFooterFile : archFooterFile;
            const footerUpload = await uploadImageToCloudinary(fileToUpload, "HeritageDharsan/Architecture");
            // Inject the URL into the parsed architecture object
            architecture.footerImage = footerUpload.secure_url;
        }

        // 6. Upload Gallery Images (Looping through multiple files)
        let galleryUrls = [];
        if (galleryFiles) {
            // Handle both single and multiple file uploads
            const filesToUpload = Array.isArray(galleryFiles) ? galleryFiles : [galleryFiles];

            for (const file of filesToUpload) {
                const upload = await uploadImageToCloudinary(file, "HeritageDharsan/Gallery");
                galleryUrls.push(upload.secure_url);
            }
        }

        const lng = parseFloat(locationData.coordinates);
        const lat = parseFloat(locationData.coordinates);

        // 7. Create Database Entry
        const newHeritage = await HeritageDetails.create({
            name,
            tagline,
            era,
            heritageType,
            mainImage: mainImageUpload.secure_url,
            location: {
                type: "Point",
                coordinates: [lng, lat],
                address: locationData.address,
            },
            about,
            timeline,
            architecture,
            significance,
            story,
            visitInfo,
            contact,
            experiences,
            gallery: galleryUrls,
        });

        // 8. Success Response
        res.status(200).json({
            success: true,
            data: newHeritage,
            message: "Heritage site created successfully!",
        });

    } catch (error) {
        console.error("HERITAGE_CREATION_ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create heritage site",
            error: error.message,
        });
    }
};

const getAllHeritage = async (req, res) => {
    try {
        // Fetching all documents from the collection
        const heritages = await HeritageDetails.find({})
            .select("name mainImage heritageType tagline era lat lng location visitInfo about")
            .lean();

        // Check if data exists
        if (!heritages || heritages.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No heritage sites found",
            });
        }

        // Return the detailed data
        return res.status(200).json({
            success: true,
            count: heritages.length,
            data: heritages,
        });
    } catch (error) {
        console.error("Error fetching heritage details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const deleteHeritage = async (req, res) => {
    try {
        const { id } = req.params;

        const heritage = await HeritageDetails.findById(id);

        if (!heritage) {
            return res.status(404).json({
                success: false,
                message: "Heritage site not found",
            });
        }

        await HeritageDetails.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Heritage site deleted successfully",
        });

    } catch (error) {
        console.error("DELETE_HERITAGE_ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getHeritageById = async (req, res) => {
    try {
        const { id } = req.params;
        const heritage = await HeritageDetails.findById(id);

        if (!heritage) {
            return res.status(404).json({
                success: false,
                message: "Heritage site not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: heritage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching heritage data",
            error: error.message,
        });
    }
};

const editHeritage = async (req, res) => {
    try {
        const { heritageId } = req.body;
        const updates = req.body;

        // 1. Find existing heritage
        const heritage = await HeritageDetails.findById(heritageId);
        if (!heritage) {
            return res.status(404).json({ success: false, message: "Heritage not found" });
        }
        
        if (updates.architecture) heritage.architecture = JSON.parse(updates.architecture);

        // 2. Handle Image Updates (Optional)
        // If a new mainImage is uploaded, update it (using Cloudinary or similar)
        if (req.files) {
            if (req.files.mainImage) {
                const mainImage = req.files.mainImage;
                const imageUpload = await uploadImageToCloudinary(mainImage, process.env.FOLDER_NAME);
                heritage.mainImage = imageUpload.secure_url;
            }
            if (req.files.archFooterImage) {
                const footerFile = req.files.archFooterImage || req.files.archFooterImage;
                const footerUpload = await uploadImageToCloudinary(footerFile, process.env.FOLDER_NAME);
                 heritage.archFooterImage = footerUpload.secure_url;
            }

            if (req.files.gallery) {
                let galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
                const uploadPromises = galleryFiles.map(file =>
                    uploadImageToCloudinary(file, process.env.FOLDER_NAME)
                );
                const results = await Promise.all(uploadPromises);
                const newUrls = results.map(r => r.secure_url);

                // Append new images to existing gallery
                heritage.gallery = [...heritage.gallery, ...newUrls];
            }
        }

        // 3. Parse and Update Nested Objects
        // Because FormData sends everything as strings, we must parse them
        if (updates.location) heritage.location = JSON.parse(updates.location);
        if (updates.about) heritage.about = JSON.parse(updates.about);
        if (updates.significance) heritage.significance = JSON.parse(updates.significance);
        if (updates.story) heritage.story = JSON.parse(updates.story);
        if (updates.visitInfo) heritage.visitInfo = JSON.parse(updates.visitInfo);
        if (updates.timeline) heritage.timeline = JSON.parse(updates.timeline);
        if (updates.contact) heritage.contact = JSON.parse(updates.contact);

        console.log(heritage.architecture)

        // 4. Update Basic Fields
        const basicFields = ["name", "tagline", "era", "heritageType"];
        basicFields.forEach((field) => {
            if (updates[field]) {
                heritage[field] = updates[field];
            }
        });

        // 5. Handle Gallery Updates (Append or Replace)


        await heritage.save();

        res.status(200).json({
            success: true,
            message: "Heritage updated successfully",
            data: heritage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update heritage",
            error: error.message,
        });
    }
};

export { createHeritage, getAllHeritage, deleteHeritage, getHeritageById, editHeritage }