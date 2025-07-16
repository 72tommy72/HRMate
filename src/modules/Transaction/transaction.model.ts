// Transaction model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface ITransaction extends Document {
    transactionNumber: string;
    type: "income" | "expense";
    amount: number;
    currency: string;
    description: string;
    category: string;
    subcategory: string;
    date: Date;
    dueDate?: Date;
    status: "pending" | "approved" | "rejected" | "paid";
    paymentMethod: string;
    paymentStatus: "pending" | "completed" | "failed";
    reference?: string;
    invoice?: {
        number: string;
        issueDate: Date;
        dueDate: Date;
    };
    clientId?: string;
    employeeId?: string;
    projectId?: string;
    departmentId?: string;
    tags?: string[];
    attachments?: string[];
    approvalHistory?: {
        action: string;
        by: string;
        date: Date;
        comment?: string;
    }[];
    tax?: {
        rate: number;
        amount: number;
        included: boolean;
    };
    recurring?: {
        isRecurring: boolean;
        frequency: "daily" | "weekly" | "monthly" | "yearly";
        nextDate?: Date;
        endDate?: Date;
    };
    notes?: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    approvedBy?: string;
    approvedAt?: Date;
}

const transactionSchema = new Schema<ITransaction>(
    {
        transactionNumber: { type: String, required: true, unique: true },
        type: { type: String, enum: ["income", "expense"], required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: "EGP" },
        description: { type: String },
        category: { type: String },
        subcategory: { type: String },
        date: { type: Date, required: true },
        dueDate: { type: Date },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "paid"],
            default: "pending",
        },
        paymentMethod: { type: String },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        reference: { type: String },
        invoice: {
            number: String,
            issueDate: Date,
            dueDate: Date,
        },
        clientId: { type: String, ref: "Client" },
        employeeId: { type: String, ref: "Employee" },
        projectId: { type: String },
        departmentId: { type: String },
        tags: [String],
        attachments: [String],
        approvalHistory: [
            {
                action: String,
                by: String,
                date: Date,
                comment: String,
            },
        ],
        tax: {
            rate: Number,
            amount: Number,
            included: Boolean,
        },
        recurring: {
            isRecurring: Boolean,
            frequency: {
                type: String,
                enum: ["daily", "weekly", "monthly", "yearly"],
            },
            nextDate: Date,
            endDate: Date,
        },
        notes: { type: String },
        createdBy: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedBy: { type: String },
        approvedBy: { type: String },
        approvedAt: { type: Date },
    },
    { timestamps: true }
);

export const Transaction =
    mongoose.models.Transaction || model("Transaction", transactionSchema);
