/**
 * Import required dependencies
 */
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

// Load environment variables from .env file
dotenv.config();

// Set server port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Initialize and start the server
 * Connects to database and starts listening for requests
 */
const startServer = async (): Promise<void> => {
    try {
        // Connect to database
        await connectDB();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        // Handle server startup errors
        console.error('Failed to start server:', (error as Error).message);
        process.exit(1); // Exit process with failure code
    }
};

// Run the application
startServer();
