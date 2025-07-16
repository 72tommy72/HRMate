import mongoose, { Document, Schema, model } from "mongoose";

export interface IQrSession extends Document {
    sessionId: string;
    userId?: string; // ممكن تبقى undefined لو لسه مش مرتبط بمستخدم
    phone?: string; // لو الجلسة مرتبطة بـ واتساب أو رقم
    status: "pending" | "scanned" | "expired" | "connected";
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    metadata?: any;
}

const qrSessionSchema = new Schema<IQrSession>(
    {
        sessionId: { type: String, required: true, unique: true },
        userId: { type: String },
        phone: { type: String },
        status: {
            type: String,
            enum: ["pending", "scanned", "expired", "connected"],
            default: "pending",
        },
        expiresAt: { type: Date, required: true },
        metadata: { type: Schema.Types.Mixed }, // ممكن تخزن أي معلومات إضافية
    },
    {
        timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
        versionKey: false,
    }
);

export const QrSession =
    mongoose.models.QrSession || model<IQrSession>("QrSession", qrSessionSchema);
