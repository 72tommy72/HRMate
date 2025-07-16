import Joi from "joi";

/**
 * Validation schema for creating a new transaction
 * Validates required and optional fields when creating transaction records
 */
export const createTransactionSchema = Joi.object({
    amount: Joi.number().positive().required(), // Transaction amount must be positive
    type: Joi.string().valid("income", "expense").required(), // Transaction type: income or expense
    categoryId: Joi.string().required(), // MongoDB ObjectId reference to category
    date: Joi.date().required(), // Date when transaction occurred
    description: Joi.string().max(500).optional(), // Optional transaction description
    clientId: Joi.string().optional(), // Optional reference to client
    employeeId: Joi.string().optional(), // Optional reference to employee
    paymentMethod: Joi.string().valid("cash", "bank", "visa", "other").optional(), // Payment method used
    createdBy: Joi.string().required(), // User who created the transaction
});

/**
 * Validation schema for updating an existing transaction
 * All fields are optional since partial updates are allowed
 */
export const updateTransactionSchema = Joi.object({
    amount: Joi.number().positive().optional(),
    type: Joi.string().valid("income", "expense").optional(),
    categoryId: Joi.string().optional(), // MongoDB ObjectId reference
    date: Joi.date().optional(),
    description: Joi.string().max(500).optional(),
    clientId: Joi.string().optional(),
    employeeId: Joi.string().optional(),
    paymentMethod: Joi.string().valid("cash", "bank", "visa", "other").optional(),
    createdBy: Joi.string().optional(),
});

/**
 * Validation schema for deleting a transaction
 * Requires transaction ID
 */
export const deleteTransactionSchema = Joi.object({
    id: Joi.string().required(), // Transaction ID to delete
});

/**
 * Validation schema for retrieving a transaction by ID
 * Requires transaction ID
 */
export const getTransactionByIdSchema = Joi.object({
    id: Joi.string().required(), // Transaction ID to retrieve
});