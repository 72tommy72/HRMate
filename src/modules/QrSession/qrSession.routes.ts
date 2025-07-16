/**
 * QR Session Routes Module
 * Handles all QR code related operations for mobile device pairing
 */

import { Router } from "express";
import {
    generateQRCode,
    getQRCodeStatus, 
    connectWithQRCode,
    disconnectWithQRCode,
} from "./qrSession.controller";

// Import middleware functions
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { 
    connectWithQRCodeSchema, 
    disconnectWithQRCodeSchema 
} from "./qrSession.validation";

// Initialize Express Router instance
const router = Router();

/**
 * QR Code Generation Route
 * @route   GET /api/qr-session/generate
 * @desc    Generate new QR code for mobile device pairing
 * @access  Admin only
 */
router.get(
    "/generate", 
    isAuthentcated, 
    isAuthorized("admin"), 
    generateQRCode
);

/**
 * QR Code Status Check Route
 * @route   GET /api/qr-session/status  
 * @desc    Check QR connection status
 * @access  Admin only
 */
router.get(
    "/status", 
    isAuthentcated, 
    isAuthorized("admin"), 
    getQRCodeStatus
);

/**
 * Mobile Device Connection Route
 * @route   POST /api/qr-session/connect
 * @desc    Connect system to mobile device using QR code
 * @access  Admin only
 */
router.post(
    "/connect", 
    isAuthentcated, 
    isAuthorized("admin"), 
    isValid(connectWithQRCodeSchema), 
    connectWithQRCode
);

/**
 * Session Disconnection Route
 * @route   POST /api/qr-session/disconnect
 * @desc    Disconnect WhatsApp session
 * @access  Admin only
 */
router.post(
    "/disconnect",
    isAuthentcated,
    isAuthorized("admin"),
    isValid(disconnectWithQRCodeSchema),
    disconnectWithQRCode
);

export default router;
