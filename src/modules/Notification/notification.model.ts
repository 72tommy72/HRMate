// Notification model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface INotification extends Document {
    recipientType: "user" | "employee" | "client"; // نوع المستلم
    recipientId: string;                           // معرف المستلم
    channel: "email" | "sms" | "whatsapp" | "inApp";
    subject?: string;                              // لمحتوى الإيميل أو inApp
    message: string;
    templateKey?: string;                          // مفتاح الرسالة إن كانت template
    status: "pending" | "sent" | "failed";
    scheduledAt?: Date;                            // لو الإشعار متأخر
    sentAt?: Date;
    error?: string;                                // لو حصل خطأ
    createdAt: Date;
    createdBy?: string;
}

const notificationSchema = new Schema<INotification>(
    {
        recipientType: {
            type: String,
            enum: ["user", "employee", "client"],
            required: true,
        },
        recipientId: { type: String, required: true },
        channel: {
            type: String,
            enum: ["email", "sms", "whatsapp", "inApp"],
            required: true,
        },
        subject: { type: String },
        message: { type: String, required: true },
        templateKey: { type: String },
        status: {
            type: String,
            enum: ["pending", "sent", "failed"],
            default: "pending",
        },
        scheduledAt: { type: Date },
        sentAt: { type: Date },
        error: { type: String },
        createdBy: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const Notification =
    mongoose.models.Notification || model("Notification", notificationSchema);
