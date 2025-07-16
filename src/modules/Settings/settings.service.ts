import { Request } from "express";
import { Settings } from "./settings.model";

/**
 * Service layer for managing application settings
 */

/**
 * Retrieves all application settings
 * @returns Object containing status code, message and settings data
 */
export async function getSettingsService() {
    const settings = await Settings.find()
    if (!settings) {
        return {
            statusCode: 404,
            message: "Settings not found",
            data: null
        }
    }
    return {
        statusCode: 200,
        message: "Settings found",
        data: settings
    }
}

/**
 * Interface for update settings parameters
 */
interface UpdateSettingsParams {
    category: "general" | "financial" | "whatsapp" | "security";
    settings: any;
    updatedBy?: string;
}

/**
 * Updates settings for a specific category
 * @param params Update settings parameters including category, settings data and updater ID
 * @returns Object containing status code, message and updated settings
 */
export async function updateSettingsService(params: UpdateSettingsParams) {
    const { category, settings, updatedBy } = params;

    const updatedSettings = await Settings.findOneAndUpdate(
        { category },
        {
            settings,
            updatedBy,
            updatedAt: new Date(),
        },
        { new: true, upsert: true } // Creates new document if not found
    );

    return {
        statusCode: 200,
        message: "Settings updated successfully",
        data: updatedSettings,
    };
}

/**
 * Resets all settings to default values
 * @param req Express Request object containing user information
 * @returns Object containing status code, message and newly created default settings
 */
export async function resetSettingsService(req: Request) {
    const createdBy = (req as any).user._id
    
    // Delete all current settings
    await Settings.deleteMany({});

    // Default settings configuration
    const defaultSettings = [
        {
            category: "general",
            settings: {
                siteName: "My System",
                language: "en",
            },
            createdBy,
            updatedBy: createdBy,
        },
        {
            category: "financial",
            settings: {
                currency: "EGP",
                tax: 0,
            },
            createdBy,
            updatedBy: createdBy,
        },
        {
            category: "whatsapp",
            settings: {
                enabled: false,
                defaultNumber: "",
            },
            createdBy,
            updatedBy: createdBy,
        },
        {
            category: "security",
            settings: {
                passwordPolicy: {
                    minLength: 8,
                    requireNumbers: true,
                },
                twoFactorAuth: false,
            },
            createdBy,
            updatedBy: createdBy,
        },
    ];

    // Insert default settings
    const inserted = await Settings.insertMany(defaultSettings);

    return {
        statusCode: 200,
        message: "Settings reset to default successfully",
        data: inserted,
    };
}
