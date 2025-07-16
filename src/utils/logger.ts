/**
 * Logger Configuration Module
 * This module sets up a Winston logger with Console and MongoDB transports
 */

import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

/**
 * Create a logger instance with the following configuration:
 * - Log Level: Info
 * - Format: JSON with timestamp
 * - Transports: Console and MongoDB
 */
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        // Console transport for development visibility
        new transports.Console(),

        // MongoDB transport for persistent logging
        new transports.MongoDB({
            // Use environment variable for MongoDB URI or fallback to local instance
            db: process.env.MONGO_URI || 'mongodb://localhost:27017/food-app',
            options: { useUnifiedTopology: true },
            collection: 'logs',
            level: 'info', // Can be changed to 'error' for production
            tryReconnect: true, // Automatically attempt reconnection on connection loss
        }),
    ],
});

export default logger;
