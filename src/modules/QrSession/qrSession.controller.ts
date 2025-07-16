import { Request, Response } from "express";
import * as QrSessionService from "./qrSession.service";
import { catchError } from "../../utils/catchError";

/**
 * Controller for managing QR code sessions and authentication
 * Handles QR code generation, status checking, and connection management
 */

/**
 * Generates a new QR code for authentication
 * Creates a unique session and returns QR code data
 * @param _req Express Request object (unused)
 * @param res Express Response object
 * @returns QR code data with status code
 */
export const generateQRCode = catchError(async (_req: Request, res: Response) => {
    const result = await QrSessionService.generateQRCodeService();
    res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves the current status of a QR code session
 * Used to check if QR code has been scanned or authenticated
 * @param req Express Request object containing sessionId parameter
 * @param res Express Response object
 * @returns QR code session status with status code
 */
export const getQRCodeStatus = catchError(async (req: Request, res: Response) => {
    const result = await QrSessionService.getQRCodeStatusService((req as any).params.sessionId);
    res.status(result.statusCode).json(result.data);
});

/**
 * Handles connection request using QR code
 * Processes authentication and establishes user session
 * @param req Express Request object containing connection data in body
 * @param res Express Response object
 * @returns Connection result with status code
 */
export const connectWithQRCode = catchError(async (req: Request, res: Response) => {
    const result = await QrSessionService.connectWithQRCodeService(req.body);
    res.status(result.statusCode).json(result.data);
});

/**
 * Handles disconnection request using QR code
 * Terminates user session and cleans up QR code data
 * @param req Express Request object containing disconnection data in body
 * @param res Express Response object
 * @returns Disconnection result with status code
 */
export const disconnectWithQRCode = catchError(async (req: Request, res: Response) => {
    const result = await QrSessionService.disconnectWithQRCodeService(req.body);
    res.status(result.statusCode).json(result.data);
});
