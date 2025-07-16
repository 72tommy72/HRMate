// Client model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface IClient extends Document {
    clientNumber: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    alternativePhone?: string;
    website?: string;
    industry?: string;
    address: {
        street: string;
        city: string;
        governorate: string;
        country: string;
        postalCode: string;
    };
    contactPerson: {
        name: string;
        position?: string;
        email: string;
        phone: string;
    };
    financialInfo: {
        creditLimit?: number;
        paymentTerms?: string;
        taxNumber?: string;
        currency?: string;
    };
    businessInfo?: {
        foundedYear?: number;
        employeeCount?: number;
        annualRevenue?: number;
        businessType?: string;
    };
    totalProjects?: number;
    activeProjects?: number;
    completedProjects?: number;
    totalPayments?: number;
    outstandingPayments?: number;
    lastPaymentDate?: Date;
    status: "active" | "inactive" | "blacklisted";
    priority?: "low" | "medium" | "high";
    source?: "website" | "referral" | "social" | "other";
    contractStartDate?: Date;
    contractEndDate?: Date;
    documents?: string[];
    notes?: string;
    tags?: string[];
    socialMedia?: {
        facebook?: string;
        linkedin?: string;
        twitter?: string;
    };
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
}

const clientSchema = new Schema<IClient>(
    {
        clientNumber: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        company: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternativePhone: String,
        website: String,
        industry: String,
        address: {
            street: String,
            city: String,
            governorate: String,
            country: String,
            postalCode: String,
        },
        contactPerson: {
            name: { type: String, required: true },
            position: String,
            email: { type: String, required: true },
            phone: { type: String, required: true },
        },
        financialInfo: {
            creditLimit: Number,
            paymentTerms: String,
            taxNumber: String,
            currency: { type: String, default: "EGP" },
        },
        businessInfo: {
            foundedYear: Number,
            employeeCount: Number,
            annualRevenue: Number,
            businessType: String,
        },
        totalProjects: { type: Number, default: 0 },
        activeProjects: { type: Number, default: 0 },
        completedProjects: { type: Number, default: 0 },
        totalPayments: { type: Number, default: 0 },
        outstandingPayments: { type: Number, default: 0 },
        lastPaymentDate: Date,
        status: {
            type: String,
            enum: ["active", "inactive", "blacklisted"],
            default: "active",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        source: {
            type: String,
            enum: ["website", "referral", "social", "other"],
        },
        contractStartDate: Date,
        contractEndDate: Date,
        documents: [String],
        notes: String,
        tags: [String],
        socialMedia: {
            facebook: String,
            linkedin: String,
            twitter: String,
        },
        createdBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedBy: String,

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Client = mongoose.models.Client || model("Client", clientSchema);
