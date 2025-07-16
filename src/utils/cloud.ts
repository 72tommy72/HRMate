/**
 * Cloudinary Configuration Module
 * This module sets up and exports the Cloudinary client for handling media uploads
 */

// Import Cloudinary v2 SDK
import { v2 as cloudinary } from 'cloudinary';

// Import and configure environment variables
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Your cloudinary cloud name
    api_key: process.env.API_KEY,       // Your cloudinary API key
    api_secret: process.env.API_SECRET  // Your cloudinary API secret
});

// Export configured Cloudinary instance for use in other modules
export default cloudinary;