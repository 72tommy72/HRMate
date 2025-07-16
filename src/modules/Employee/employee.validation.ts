import Joi from "joi";

/**
 * Validation schema for getting an employee by ID
 */
export const getEmployeeByIdSchema = Joi.object({
    id: Joi.string().required(),
});

/**
 * Validation schema for creating a new employee
 * Contains all required and optional fields for employee creation
 */
export const createEmployeeSchema = Joi.object({
    // Required fields
    employeeNumber: Joi.string().required(),
    name: Joi.string().required(),
    
    // Basic information
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    department: Joi.string().optional(),
    position: Joi.string().optional(),
    salary: Joi.number().optional(),
    
    // Employment dates and status
    startDate: Joi.date().optional(),
    endDate: Joi.date().allow(null).optional(),
    status: Joi.string().valid("active", "inactive", "terminated").optional(),
    
    // Personal information
    bankAccount: Joi.string().optional(),
    nationalId: Joi.string().optional(),
    address: Joi.string().optional(),
    birthDate: Joi.date().optional(),
    gender: Joi.string().valid("male", "female").optional(),
    maritalStatus: Joi.string().valid("single", "married", "divorced").optional(),
    
    // Emergency contact details
    emergencyContact: Joi.object({
        name: Joi.string().optional(),
        phone: Joi.string().optional(),
        relation: Joi.string().optional(),
        address: Joi.string().optional()
    }).optional(),
    
    // Work schedule information
    workSchedule: Joi.object({
        startTime: Joi.string().optional(),
        endTime: Joi.string().optional(),
        workDays: Joi.array().items(Joi.string()).optional(),
        breakTime: Joi.string().optional()
    }).optional(),
    
    // Benefits package
    benefits: Joi.object({
        medicalInsurance: Joi.boolean().optional(),
        lifeInsurance: Joi.boolean().optional(),
        transportationAllowance: Joi.number().optional(),
        mealAllowance: Joi.number().optional()
    }).optional(),
    
    // Attendance records
    attendance: Joi.object({
        totalWorkingDays: Joi.number().optional(),
        presentDays: Joi.number().optional(),
        absentDays: Joi.number().optional(),
        lateDays: Joi.number().optional(),
        overtimeHours: Joi.number().optional()
    }).optional(),
    
    // Additional information
    documents: Joi.array().items(Joi.string()).optional(),
    notes: Joi.string().optional(),
});

/**
 * Validation schema for updating an existing employee
 * All fields are optional since this is for partial updates
 */
export const updateEmployeeSchema = Joi.object({
    // Basic information
    employeeNumber: Joi.string().optional(),
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    department: Joi.string().optional(),
    position: Joi.string().optional(),
    salary: Joi.number().optional(),
    
    // Employment dates and status
    startDate: Joi.date().optional(),
    endDate: Joi.date().allow(null).optional(),
    status: Joi.string().valid("active", "inactive", "terminated").optional(),
    
    // Personal information
    bankAccount: Joi.string().optional(),
    nationalId: Joi.string().optional(),
    address: Joi.string().optional(),
    birthDate: Joi.date().optional(),
    gender: Joi.string().valid("male", "female").optional(),
    maritalStatus: Joi.string().valid("single", "married", "divorced").optional(),
    
    // Emergency contact details
    emergencyContact: Joi.object({
        name: Joi.string().optional(),
        phone: Joi.string().optional(),
        relation: Joi.string().optional(),
        address: Joi.string().optional()
    }).optional(),
    
    // Work schedule information
    workSchedule: Joi.object({
        startTime: Joi.string().optional(),
        endTime: Joi.string().optional(),
        workDays: Joi.array().items(Joi.string()).optional(),
        breakTime: Joi.string().optional()
    }).optional(),
    
    // Benefits package
    benefits: Joi.object({
        medicalInsurance: Joi.boolean().optional(),
        lifeInsurance: Joi.boolean().optional(),
        transportationAllowance: Joi.number().optional(),
        mealAllowance: Joi.number().optional()
    }).optional(),
    
    // Attendance records
    attendance: Joi.object({
        totalWorkingDays: Joi.number().optional(),
        presentDays: Joi.number().optional(),
        absentDays: Joi.number().optional(),
        lateDays: Joi.number().optional(),
        overtimeHours: Joi.number().optional()
    }).optional(),
    
    // Additional information
    documents: Joi.array().items(Joi.string()).optional(),
    notes: Joi.string().optional(),
});

/**
 * Validation schema for deleting an employee
 */
export const deleteEmployeeSchema = Joi.object({
    id: Joi.string().required(),
});
