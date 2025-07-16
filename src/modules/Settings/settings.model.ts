// Settings model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface ISettings extends Document {
    category: "general" | "financial" | "whatsapp" | "security";
    settings: any;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
    {
        category: {
            type: String,
            enum: ["general", "financial", "whatsapp", "security"],
            required: true,
            unique: true,
        },
        settings: {
            type: Schema.Types.Mixed, // مرن لأي نوع بيانات داخلي
            required: true,
        },
        createdBy: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedBy: { type: String },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Settings =
    mongoose.models.Settings || model("Settings", settingsSchema);
