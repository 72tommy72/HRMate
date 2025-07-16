import Joi from "joi";

/**
 * Validation schema for QR code connection requests
 * Validates the required session ID and optional user information
 * 
 * @remarks
 * This schema ensures proper validation of connection parameters:
 * - Session ID: Required unique identifier for the QR session
 * - User ID: Optional identifier for the connecting user
 * - Phone: Optional international format phone number
 * - Metadata: Optional additional connection data
 */
export const connectWithQRCodeSchema = Joi.object({
    // Required session identifier for QR code connection
    sessionId: Joi.string()
        .required()
        .label("Session ID")
        .trim(),
    
    // Optional user identifier for tracking connection source
    userId: Joi.string()
        .optional()
        .label("User ID")
        .trim(),
    
    // Optional phone number validation with international format
    phone: Joi.string()
        .pattern(/^\+?[0-9]{10,15}$/)
        .optional()
        .label("Phone Number")
        .trim()
        .messages({
            'string.pattern.base': 'Phone number must be in international format'
        }),
    
    // Optional metadata object for additional connection context
    metadata: Joi.any()
        .optional()
        .label("Metadata"),
});

/**
 * Validation schema for QR code disconnection requests
 * 
 * @remarks
 * Simple schema that only requires session ID to safely terminate connections
 * Includes custom error messages for better error handling
 */
export const disconnectWithQRCodeSchema = Joi.object({
    sessionId: Joi.string()
        .required()
        .label("Session ID")
        .trim()
        .messages({
            "string.empty": "Session ID is required",
            "any.required": "Session ID is required",
            "string.base": "Session ID must be a string"
        }),
});