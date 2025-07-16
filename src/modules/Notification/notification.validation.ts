import Joi from "joi";

/**
 * Validation schema for sending notifications
 * Defines the structure and rules for notification data
 */
export const sendNotificationSchema = Joi.object({
    // Type of recipient (user/employee/client)
    recipientType: Joi.string()
        .valid("user", "employee", "client")
        .required(),

    // Unique identifier of the recipient
    recipientId: Joi.string().required(),

    // Communication channel for the notification
    channel: Joi.string()
        .valid("email", "sms", "whatsapp", "inApp")
        .required(),

    // Subject line - required only for email and inApp notifications
    subject: Joi.when("channel", {
        is: Joi.valid("email", "inApp"),
        then: Joi.string().min(3).max(200).required(),
        otherwise: Joi.forbidden(),
    }),

    // Main content of the notification
    message: Joi.string().min(1).max(1000).required(),

    // Optional template identifier for structured notifications
    templateKey: Joi.string().optional(),

    // Current status of the notification
    status: Joi.string()
        .valid("pending", "sent", "failed")
        .default("pending"),

    // Future scheduling timestamp
    scheduledAt: Joi.date().greater("now").optional(),

    // Identifier of the notification creator
    createdBy: Joi.string().optional(),
});

/**
 * Validation schema for marking notifications as read
 */
export const markAsReadSchema = Joi.object({
    id: Joi.string().required()
});

/**
 * Validation schema for deleting notifications
 */
export const deleteNotificationSchema = Joi.object({
    id: Joi.string().required()
});
