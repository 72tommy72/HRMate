// Employee model implementation
import mongoose, { Schema, Document, model } from "mongoose";

export interface IEmployee extends Document {
    employeeNumber: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    salary: number;
    startDate: Date;
    endDate: Date | null;
    status: "active" | "inactive" | "terminated";
    bankAccount: string;
    nationalId: string;
    address: string;
    birthDate: Date;
    gender: "male" | "female";
    maritalStatus: "single" | "married" | "divorced";
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
        address: string;
    };
    workSchedule: {
        startTime: string;
        endTime: string;
        workDays: string[];
        breakTime: string;
    };
    benefits: {
        medicalInsurance: boolean;
        lifeInsurance: boolean;
        transportationAllowance: number;
        mealAllowance: number;
    };
    attendance: {
        totalWorkingDays: number;
        presentDays: number;
        absentDays: number;
        lateDays: number;
        overtimeHours: number;
    };
    documents: string[];
    notes: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
}

const employeeSchema = new Schema<IEmployee>(
    {
        employeeNumber: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        department: { type: String },
        position: { type: String },
        salary: { type: Number },
        startDate: { type: Date },
        endDate: { type: Date, default: null },
        status: {
            type: String,
            enum: ["active", "inactive", "terminated"],
            default: "active",
        },
        bankAccount: { type: String },
        nationalId: { type: String },
        address: { type: String },
        birthDate: { type: Date },
        gender: { type: String, enum: ["male", "female"] },
        maritalStatus: {
            type: String,
            enum: ["single", "married", "divorced"],
        },
        emergencyContact: {
            name: String,
            phone: String,
            relation: String,
            address: String,
        },
        workSchedule: {
            startTime: String,
            endTime: String,
            workDays: [String],
            breakTime: String,
        },
        benefits: {
            medicalInsurance: Boolean,
            lifeInsurance: Boolean,
            transportationAllowance: Number,
            mealAllowance: Number,
        },
        attendance: {
            totalWorkingDays: Number,
            presentDays: Number,
            absentDays: Number,
            lateDays: Number,
            overtimeHours: Number,
        },
        documents: [String],
        notes: { type: String },
        createdBy: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedBy: { type: String },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Employee =
    mongoose.models.Employee || model("Employee", employeeSchema);
