/**
 * Import required dependencies and models for notification functionality
 */
import { Notification } from "./notification.model";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../User/user.model";
import { sendMessageViaWhatsapp } from "../../utils/sendWhatsappMessage";

/**
 * Defines the structure for notification request payload
 */
interface SendNotificationBody {
    title: string;                              // Notification title
    message: string;                            // Notification message content
    channels?: ("email" | "whatsapp")[];        // Delivery channels
    createdBy?: string;                         // Notification creator ID
    link?: string;                              // Optional URL link
    fromPhone?: string;                         // Sender's phone number for WhatsApp
}

/**
 * Sends notifications through specified channels (email, WhatsApp)
 * Handles multiple delivery methods in parallel
 */
export async function sendNotificationService({
    userId,
    body,
}: {
    userId: string;
    body: SendNotificationBody;
}) {
    const { title, message, channels = ["email", "whatsapp"], createdBy, fromPhone } = body;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
        return {
            statusCode: 404,
            message: "User not found",
            data: { success: false },
        };
    }

    // Process notifications through selected channels concurrently
    const notifications = await Promise.all(
        channels.map(async (channel: "email" | "whatsapp") => {
            let isSent = false;
            let error: string | undefined = undefined;

            // Email notification handler
            if (channel === "email" && user.email) {
                const isEmailSent = await sendEmail({
                    to: user.email,
                    subject: title,
                    html: `<p>${message}</p>`,
                });

                isSent = isEmailSent;
                if (!isEmailSent) error = "Failed to send via Email";
            }

            // WhatsApp notification handler
            if (channel === "whatsapp" && user.phone) {
                if (!fromPhone) {
                    error = "Missing sender phone number for WhatsApp";
                } else {
                    const result = await sendMessageViaWhatsapp(fromPhone, user.phone, message);
                    isSent = result.data.success;
                    if (!isSent) error = result.message;
                }
            }

            // Persist notification record
            return await Notification.create({
                recipientType: "user",
                recipientId: userId,
                channel,
                subject: title,
                message: message,
                status: isSent ? "sent" : "failed",
                sentAt: isSent ? new Date() : undefined,
                error,
                createdBy,
            });
        })
    );

    return {
        statusCode: 200,
        message: "Notifications sent successfully",
        data: {
            success: true,
            notifications,
        },
    };
}

/**
 * Retrieves all notifications for a given user
 */
export async function getAllNotificationsService(params: { userId: string }) {
    const { userId } = params;
    const notifications = await Notification.find({ user: userId });
    
    if (!notifications) {
        return {
            message: "No notifications found",
            statusCode: 404,
            data: []
        };
    }
    
    return {
        message: "Notifications found successfully",
        statusCode: 200,
        data: notifications
    };
}

/**
 * Updates a notification's read status
 */
export async function markAsReadService(params: { userId: string; notificationId: string }) {
    const { userId, notificationId } = params;
    const notification = await Notification.findOne({ _id: notificationId, user: userId });
    
    if (!notification) {
        return {
            message: "Notification not found",
            statusCode: 404,
            data: null
        };
    }
    
    notification.isRead = true;
    await notification.save();
    
    return {
        message: "Notification marked as read successfully",
        statusCode: 200,
        data: notification
    };
}

/**
 * Removes a specific notification
 */
export async function deleteNotificationService(params: { userId: string; notificationId: string }) {
    const { userId, notificationId } = params;
    const notification = await Notification.findOne({ _id: notificationId, user: userId });
    
    if (!notification) {
        return {
            message: "Notification not found",
            statusCode: 404,
            data: null
        };
    }
    
    await notification.deleteOne();
    
    return {
        message: "Notification deleted successfully",
        statusCode: 200,
        data: notification
    };
}

/**
 * Removes all notifications for a specific user
 */
export async function deleteAllNotificationsService(params: { userId: string }) {
    const { userId } = params;
    const notifications = await Notification.find({ user: userId });
    
    if (!notifications) {
        return {
            message: "No notifications found",
            statusCode: 404,
            data: []
        };
    }
    
    await Notification.deleteMany({ user: userId });
    
    return {
        message: "Notifications deleted successfully",
        statusCode: 200,
        data: null
    };
}
