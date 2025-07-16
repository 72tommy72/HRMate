import Joi from "joi";

/**
 * Validation schema for adding a new user
 * Includes basic user info, profile details, security settings and preferences
 */
export const addUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "manager", "employee", "accountant").default("employee"),
    status: Joi.string().valid("active", "inactive", "suspended").default("active"),
    permissions: Joi.array().items(Joi.string()).default([]),
    employeeId: Joi.string().optional(), // Optional field to link user with employee record
    profile: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        avatar: Joi.string().uri().optional(),
        phone: Joi.string().optional(),
        language: Joi.string().valid("ar", "en").default("ar"),
        timezone: Joi.string().optional(),
        dateFormat: Joi.string().default("DD/MM/YYYY"),
        timeFormat: Joi.string().valid("12h", "24h").default("24h"),
    }).optional(),
    security: Joi.object({
        lastLogin: Joi.date().optional(),
        lastLoginIP: Joi.string().ip().optional(),
        loginAttempts: Joi.number().default(0),
        isLocked: Joi.boolean().default(false),
        lockUntil: Joi.date().optional(),
        passwordChangedAt: Joi.date().optional(),
        mustChangePassword: Joi.boolean().default(false),
        twoFactorEnabled: Joi.boolean().default(false),
    }).optional(),
    preferences: Joi.object({
        theme: Joi.string().valid("light", "dark", "auto").default("light"),
        notifications: Joi.object({
            email: Joi.boolean().default(true),
            sms: Joi.boolean().default(false),
            whatsapp: Joi.boolean().default(true),
            inApp: Joi.boolean().default(true),
        }).optional(),
        dashboard: Joi.object({
            defaultView: Joi.string().default("overview"),
            autoRefresh: Joi.boolean().default(true),
            refreshInterval: Joi.number().default(30),
        }).optional(),
    }).optional(),
});

/**
 * Validation schema for getting users list with pagination and filters
 */
export const getAllUsersSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    search: Joi.string(),
    status: Joi.string(),
    role: Joi.string(),
    permission: Joi.string(),
});

/**
 * Validation schema for getting a single user by ID
 */
export const getUserSchema = Joi.object({
    id: Joi.string().required(),
});

/**
 * Validation schema for updating user information
 * All fields are optional to allow partial updates
 */
export const updateUserSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string().valid("admin", "manager", "employee", "accountant"),
    status: Joi.string().valid("active", "inactive", "suspended"),
    permissions: Joi.array().items(Joi.string()),
    employeeId: Joi.string().optional(),
    profile: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        avatar: Joi.string().uri(),
        phone: Joi.string(),
        language: Joi.string().valid("ar", "en"),
        timezone: Joi.string(),
        dateFormat: Joi.string(),
        timeFormat: Joi.string().valid("12h", "24h"),
    }).optional(),
    security: Joi.object({
        lastLogin: Joi.date(),
        lastLoginIP: Joi.string().ip(),
        loginAttempts: Joi.number(),
        isLocked: Joi.boolean(),
        lockUntil: Joi.date(),
        passwordChangedAt: Joi.date(),
        mustChangePassword: Joi.boolean(),
        twoFactorEnabled: Joi.boolean(),
    }).optional(),
    preferences: Joi.object({
        theme: Joi.string().valid("light", "dark", "auto"),
        notifications: Joi.object({
            email: Joi.boolean(),
            sms: Joi.boolean(),
            whatsapp: Joi.boolean(),
            inApp: Joi.boolean(),
        }),
        dashboard: Joi.object({
            defaultView: Joi.string(),
            autoRefresh: Joi.boolean(),
            refreshInterval: Joi.number(),
        }),
    }).optional(),
});

/**
 * Validation schema for updating user password
 */
export const updateUserPasswordSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
});

/**
 * Validation schema for updating user lock status
 */
export const updateUserLockSchema = Joi.object({
    id: Joi.string().required(),
    isLocked: Joi.boolean().required(),
});

/**
 * Validation schema for resetting user session
 */
export const updateUserResetSessionSchema = Joi.object({
    id: Joi.string().required(),
});

/**
 * Validation schema for deleting a user
 */
export const deleteUserSchema = Joi.object({
    id: Joi.string().required(),
});