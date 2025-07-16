// Log model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface ILog extends Document {
    level: "debug" | "info" | "warn" | "error" | "fatal";
    action: string;
    category: "auth" | "transaction" | "system" | "whatsapp" | "other";
    user: string;
    userId: string;
    details: string;
    metadata?: {
        ip?: string;
        userAgent?: string;
        device?: string;
        location?: string;
        sessionId?: string;
    };
    resource?: {
        type: string;
        id: string;
        name?: string;
    };
    changes?: {
        before: any;
        after: any;
    };
    result: "success" | "failure" | "partial";
    errorCode?: string;
    errorMessage?: string;
    duration?: number;
    tags?: string[];
    severity: "low" | "medium" | "high" | "critical";
    isSystemGenerated?: boolean;
    correlationId?: string;
}

const logSchema = new Schema<ILog>(
    {
        level: {
            type: String,
            enum: ["debug", "info", "warn", "error", "fatal"],
            required: true,
        },
        action: { type: String, required: true },
        category: {
            type: String,
            enum: ["auth", "transaction", "system", "whatsapp", "other"],
            default: "other",
        },
        user: { type: String },
        userId: { type: String },
        details: { type: String },
        metadata: {
            ip: String,
            userAgent: String,
            device: String,
            location: String,
            sessionId: String,
        },
        resource: {
            type: { type: String },
            id: { type: String },
            name: { type: String },
        },
        changes: {
            before: Schema.Types.Mixed,
            after: Schema.Types.Mixed,
        },
        result: {
            type: String,
            enum: ["success", "failure", "partial"],
            required: true,
        },
        errorCode: { type: String },
        errorMessage: { type: String },
        duration: { type: Number },
        tags: [String],
        severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "low",
        },
        isSystemGenerated: { type: Boolean, default: false },
        correlationId: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Log = mongoose.models.Log || model("Log", logSchema);
