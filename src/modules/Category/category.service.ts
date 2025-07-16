/**
 * Category Service Implementation
 * Handles all business logic related to category operations
 */

import { Request } from "express";
import { Category } from "./category.model";

/**
 * Retrieves all categories from the database
 * @returns Object containing status code, message and categories data
 */
export async function getAllCategoriesService() {
    const categories = await Category.find();
    if (!categories) {
        return {
            statusCode: 404,
            message: "Categories not found",
            data: null
        }
    }
    return {
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: categories
    }
}

/**
 * Retrieves a specific category by its ID
 * @param id - The ID of the category to retrieve
 * @returns Object containing status code, message and category data
 */
export async function getCategoryByIdService(id: string) {
    const category = await Category.findById(id);
    if (!category) {
        return {
            statusCode: 404,
            message: "Category not found",
            data: null
        }
    }
    return {
        statusCode: 200,
        message: "Category retrieved successfully",
        data: category
    }
}

/**
 * Creates a new category
 * @param req - Express Request object containing category data
 * @returns Object containing status code, message and created category data
 */
export async function createCategoryService(req: Request) {
    const categoryData = (req as any).body;
    
    const category = await Category.create({
        ...categoryData
    });

    return {
        statusCode: 201,
        message: "Category created successfully",
        data: category,
    };
}

/**
 * Updates an existing category
 * @param req - Express Request object containing updated category data
 * @returns Object containing status code, message and updated category data
 */
export async function updateCategoryService(req: Request) {
    const { id } = (req as any).params;
    const updateData = (req as any).body;

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { ...updateData },
        { new: true }
    );

    if (!updatedCategory) {
        return {
            statusCode: 404,
            message: "Category not found",
            data: null
        };
    }

    return {
        statusCode: 200,
        message: "Category updated successfully",
        data: updatedCategory
    };
}

/**
 * Deletes a category by its ID
 * @param id - The ID of the category to delete
 * @returns Object containing status code, message and deleted category data
 */
export async function deleteCategoryService(id: string) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return {
            statusCode: 404,
            message: "Category not found",
            data: null
        }
    }
    return {
        statusCode: 200,
        message: "Category deleted successfully",
        data: category
    }
}