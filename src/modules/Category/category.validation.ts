import Joi from "joi";

/**
 * Validation schema for getting a category by ID
 */
export const getCategoryByIdSchema = Joi.object({
    id: Joi.string().required(),
})

/**
 * Validation schema for creating a new category
 * Includes validation for basic category info, appearance, hierarchy, and financial settings
 */
export const createCategorySchema = Joi.object({
    // Basic category information
    name: Joi.string().min(2).max(100).required(),
    nameEn: Joi.string().min(2).max(100).required(),
    type: Joi.string().valid("income", "expense", "both").required(),
    description: Joi.string().max(500).optional(),
    
    // Appearance settings
    color: Joi.string().pattern(/^#([0-9a-fA-F]{6})$/).optional(), // Hex color code
    icon: Joi.string().optional(),
    
    // Hierarchy settings
    parentId: Joi.string().allow(null),
    subcategories: Joi.array().items(
        Joi.object({
            id: Joi.string().optional(),
            name: Joi.string().required(),
            nameEn: Joi.string().required()
        })
    ).optional(),
    
    // Financial and operational settings
    budgetLimit: Joi.number().min(0).optional(),
    isActive: Joi.boolean().default(true),
    sortOrder: Joi.number().min(0).optional(),
    defaultTaxRate: Joi.number().min(0).max(100).optional(),
    accountingCode: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional()
});

/**
 * Validation schema for updating an existing category
 * Similar to create schema but all fields are optional
 */
export const updateCategorySchema = Joi.object({
    // Basic category information
    name: Joi.string().min(2).max(100).optional(),
    nameEn: Joi.string().min(2).max(100).optional(),
    type: Joi.string().valid("income", "expense", "both").optional(),
    description: Joi.string().max(500).optional(),
    
    // Appearance settings
    color: Joi.string().pattern(/^#([0-9a-fA-F]{6})$/).optional(),
    icon: Joi.string().optional(),
    
    // Hierarchy settings
    parentId: Joi.string().allow(null).optional(),
    subcategories: Joi.array().items(
        Joi.object({
            id: Joi.string().optional(),
            name: Joi.string().required(),
            nameEn: Joi.string().required()
        })
    ).optional(),
    
    // Financial and operational settings
    budgetLimit: Joi.number().min(0).optional(),
    isActive: Joi.boolean().optional(),
    sortOrder: Joi.number().min(0).optional(),
    defaultTaxRate: Joi.number().min(0).max(100).optional(),
    accountingCode: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional()
});

/**
 * Validation schema for deleting a category
 */
export const deleteCategorySchema = Joi.object({
    id: Joi.string().required(),
})
