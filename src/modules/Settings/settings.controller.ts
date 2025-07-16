import { Request, Response } from "express";
import * as SettingsService from "./settings.service";
import { catchError } from "../../utils/catchError";

/**
 * Controller for handling settings-related operations
 */

/**
 * Retrieves the current application settings
 * @param _req Express Request object (unused)
 * @param res Express Response object
 * @returns Settings data with status code
 */
export const getSettings = catchError(async (_req: Request, res: Response) => {
    const result = await SettingsService.getSettingsService();
    res.status(result.statusCode).json(result.data);
});

/**
 * Updates the application settings with new values
 * @param req Express Request object containing settings data in body
 * @param res Express Response object
 * @returns Updated settings data with status code
 */
export const updateSettings = catchError(async (req: Request, res: Response) => {
    const result = await SettingsService.updateSettingsService(req.body);
    res.status(result.statusCode).json(result.data);
});

/**
 * Resets the application settings to default values
 * @param req Express Request object
 * @param res Express Response object
 * @returns Reset settings data with status code
 */
export const resetSettings = catchError(async (req: Request, res: Response) => {
    // TODO: Remove type assertion and properly type the request
    const result = await SettingsService.resetSettingsService((req as any));
    res.status(result.statusCode).json(result.data);
});
