/**
 * Validation schemas for attendance management using Joi
 * This file contains schemas for check-in, check-out and employee attendance retrieval
 */

import Joi from "joi";

/**
 * Schema for validating check-in data
 * Includes status (present/late/on_leave), check-in time in HH:mm format, and optional notes
 */
export const checkInSchema = Joi.object({
    status: Joi.string()
        .valid("present", "late", "on_leave")
        .required(),
    checkIn: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .optional(), // HH:mm format validation
    notes: Joi.string()
        .allow("")
        .optional(),
});

/**
 * Schema for validating check-out data
 * Includes required check-out time, optional working hours, overtime hours and notes
 */
export const checkOutSchema = Joi.object({
    checkOut: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/) // HH:mm format validation
        .required(),
    workingHours: Joi.number()
        .min(0)
        .optional(),
    overtimeHours: Joi.number()
        .min(0)
        .optional(),
    notes: Joi.string()
        .allow("")
        .optional(),
});

/**
 * Schema for validating employee attendance retrieval requests
 * Requires a valid employee ID in ObjectId format
 */
export const getAttendanceByEmployeeSchema = Joi.object({
    employeeId: Joi.string()
        .required(), // ObjectId format validation
});
