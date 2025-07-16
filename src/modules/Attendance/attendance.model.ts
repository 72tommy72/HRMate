/**
 * Attendance Model Implementation
 * Handles employee attendance records including check-in/out times,
 * work status, and related attendance information
 */
import mongoose, { Schema, Document, model } from "mongoose";

/**
 * Interface defining the structure of an Attendance document
 */
export interface IAttendance extends Document {
    employeeId: mongoose.Types.ObjectId; // Reference to Employee
    date: Date;                         // Attendance date
    status: "present" | "absent" | "late" | "on_leave";
    checkIn?: string;                   // Check-in time
    checkOut?: string;                  // Check-out time
    workingHours?: number;              // Actual working hours
    overtimeHours?: number;             // Additional hours worked
    notes?: string;                     // Additional notes/comments
    createdAt: Date;                    // Record creation timestamp
    updatedAt: Date;                    // Record update timestamp
}

/**
 * Mongoose schema definition for Attendance records
 */
const attendanceSchema = new Schema<IAttendance>(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["present", "absent", "late", "on_leave"],
            required: true,
        },
        checkIn: String,
        checkOut: String,
        workingHours: Number,
        overtimeHours: Number,
        notes: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/**
 * Export the Attendance model
 * If model exists, use it; otherwise create new model
 */
export const Attendance = 
    mongoose.models.Attendance || model("Attendance", attendanceSchema);
