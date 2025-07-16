// Category model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface ISubcategory {
    id: string;
    name: string;
    nameEn?: string;
}

export interface ICategory extends Document {
    name: string;
    nameEn?: string;
    type: "income" | "expense" | "both";
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
    subcategories?: ISubcategory[];
    budgetLimit?: number;
    isActive: boolean;
    sortOrder?: number;
    defaultTaxRate?: number;
    accountingCode?: string;
    tags?: string[];
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
}

const subcategorySchema = new Schema<ISubcategory>(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        nameEn: String,
    },
    { _id: false }
);

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        nameEn: String,
        type: {
            type: String,
            enum: ["income", "expense", "both"],
            required: true,
        },
        description: String,
        color: String,
        icon: String,
        parentId: { type: String, default: null },
        subcategories: [subcategorySchema],
        budgetLimit: Number,
        isActive: { type: Boolean, default: true },
        sortOrder: Number,
        defaultTaxRate: Number,
        accountingCode: String,
        tags: [String],
        createdBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedBy: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Category =
    mongoose.models.Category || model<ICategory>("Category", categorySchema);
