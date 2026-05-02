import mongoose from "mongoose";

const HeritageSiteSchema = new mongoose.Schema({
    // --- Header Section ---
    name: {
        type: String,
        required: true,
        trim: true
    },
    tagline: {
        type: String,
        default: "Where Indore’s royal legacy meets timeless architecture"
    },
    era: {
        type: String,
        // default: "18th Century"
    },
    mainImage: {
        type: String,
        required: true
    }, // Hero image URL

    heritageType: {
        type: String,
        enum: ['Religious', 'Architectural', 'Commercial', 'Natural', 'Memorial', 'Museums', 'Memrorial', 'Food', 'Markets'],
        required: true
    },

    // --- Leaflet Map Location ---
    // GeoJSON format: [longitude, latitude]
    // Note: Leaflet uses [lat, lng], so flip them in frontend!
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        },
        address: {
            street: String,
            city: { type: String, default: "Indore" },
            state: { type: String, default: "Madhya Pradesh" },
            zip: String
        }
    },

    // --- Description Section ---
    about: {
        title: String,
        content: String // Long text description
    },

    // --- Historical Timeline Section ---
    timeline: [{
        year: { type: String, required: true }, // e.g., "1747" or "Present Day"
        description: { type: String, required: true }
    }],

    // --- Architecture Section ---
    architecture: {
        description: String,
        influences: [{
            style: String, // e.g., "Maratha Influence", "Mughal Elements"
            details: String
        }] // The decorative image at the bottom of the section
    },
    archFooterImage: {
        type: String
    },

    // --- Cultural Significance ---
    significance: {
        description: String,
        points: [String] // Bullet points from the UI
    },
    story: {
        description: String,
        points: [String] // Bullet points from the UI
    },

    // --- Plan Your Visit (Dynamic sidebar data) ---
    visitInfo: {
        openingHours: { type: String, default: "10:00 AM - 6:00 PM" },
        days: { type: String, default: "Monday - Sunday" },
        entryFees: {
            indian: { type: Number, default: 20 },
            foreign: { type: Number, default: 250 },
            children: { type: String, default: "Free" }
        },
        photography: {
            allowed: { type: Boolean, default: true },
            fee: { type: Number, default: 50 },
            notes: String
        },
        guidedTours: {
            available: { type: Boolean, default: true },
            languages: [String], // ["Hindi", "English"]
            duration: { type: String, default: "1.5 hours" }
        }
    },

    // --- Contact Details ---
    contact: {
        phone: { type: String },
        email: { type: String },
        website: { type: String }
    },

    // --- Experience Section (Linked IDs or Embedded) ---
    experiences: [{
        title: String, // "Food" or "Sarafa Bazaar"
        subtitle: String,
        image: String
    }],

    // --- Gallery Section ---
    gallery: [
        {
            type: String,
            unique: true, // No other document can have this exact title in its gallery
            sparse: true, // Ensures null values don't trigger duplicate errors
            trim: true
        }
    ]// Array of image URLs for the slider

}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// // CRITICAL: Index for Leaflet Map / GeoSpatial Queries
// HeritageSiteSchema.index({ location: "2dsphere" });

const HeritageDetails = mongoose.model('HeritageDetails', HeritageSiteSchema);
export default HeritageDetails

