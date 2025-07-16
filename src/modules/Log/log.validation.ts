import Joi from "joi";

/**
 * Schema for retrieving log statistics within a date range
 * Allows filtering logs based on start and end dates
 */
export const getLogsStatsSchema = Joi.object({
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
});

/**
 * Schema for creating comprehensive log entries
 * Includes tracking information, user data, and system metrics
 */
export const createLogSchema = Joi.object({
    // Log level indicating severity of the event
    level: Joi.string()
        .valid("debug", "info", "warn", "error", "fatal")
        .required(),

    // Action performed that triggered this log
    action: Joi.string().required(),

    // Category to group related logs
    category: Joi.string()
        .valid("auth", "transaction", "system", "whatsapp", "other")
        .default("other"),

    // User information
    user: Joi.string().optional(),
    userId: Joi.string().optional(),
    details: Joi.string().optional(),

    // Additional contextual information about the request
    metadata: Joi.object({
        ip: Joi.string().ip({ version: ["ipv4", "ipv6"] }).optional(),
        userAgent: Joi.string().optional(),
        device: Joi.string().optional(),
        location: Joi.string().optional(),
        sessionId: Joi.string().optional(),
    }).optional(),

    // Information about the affected resource
    resource: Joi.object({
        type: Joi.string().required(),
        id: Joi.string().required(),
        name: Joi.string().optional(),
    }).optional(),

    // Track changes made to resources
    changes: Joi.object({
        before: Joi.any(),
        after: Joi.any(),
    }).optional(),

    // Outcome of the action
    result: Joi.string().valid("success", "failure", "partial").required(),

    // Error tracking
    errorCode: Joi.string().optional(),
    errorMessage: Joi.string().optional(),
    duration: Joi.number().optional(),
    tags: Joi.array().items(Joi.string()).optional(),

    // Impact level of the logged event
    severity: Joi.string()
        .valid("low", "medium", "high", "critical")
        .default("low"),

    // System flags
    isSystemGenerated: Joi.boolean().default(false),
    correlationId: Joi.string().optional(),
});

/**
 * Schema for retrieving and filtering logs with pagination
 * Supports various filter criteria and search capabilities
 */
export const getAllLogsSchema = Joi.object({
    // Pagination parameters
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(20),

    // General search term
    search: Joi.string().optional(),

    // Specific filters
    level: Joi.string().valid("debug", "info", "warn", "error", "fatal"),
    category: Joi.string().valid("auth", "transaction", "system", "whatsapp", "other"),
    userId: Joi.string(),
    action: Joi.string(),

    // Date range filters
    startDate: Joi.date(),
    endDate: Joi.date(),
    
    // Result and severity filters
    result: Joi.string().valid("success", "failure", "partial"),
    severity: Joi.string().valid("low", "medium", "high", "critical"),
});
