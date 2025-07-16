/**
 * Import Express types for request and response handling
 * These types provide TypeScript type definitions for Express.js HTTP objects
 * Request - Represents incoming HTTP requests
 * Response - Represents server responses
 */
import { Request, Response } from "express";
import * as CategoryService from "./category.service";
import { catchError } from "../../utils/catchError";

/**
 * Retrieves all categories from the database
 * @param req Express Request object
 * @param res Express Response object
 * @returns List of all categories with status code
 */
export const getAllCategories = catchError(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategoriesService();
    res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves a specific category by its ID
 * @param req Express Request object containing category ID in params
 * @param res Express Response object
 * @returns Single category data with status code
 */
export const getCategoryById = catchError(async (req: Request, res: Response) => {
    const result = await CategoryService.getCategoryByIdService(req.params.id);
    res.status(result.statusCode).json(result.data);
});

/**
 * Creates a new category in the database
 * @param req Express Request object containing category data
 * @param res Express Response object
 * @returns Newly created category data with status code
 */
export const createCategory = catchError(async (req: Request, res: Response) => {
    const result = await CategoryService.createCategoryService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Updates an existing category in the database
 * @param req Express Request object containing updated category data
 * @param res Express Response object
 * @returns Updated category data with status code
 */
export const updateCategory = catchError(async (req: Request, res: Response) => {
    const result = await CategoryService.updateCategoryService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Deletes a category from the database
 * @param req Express Request object containing category ID in params
 * @param res Express Response object
 * @returns Deletion confirmation with status code
 */
export const deleteCategory = catchError(async (req: Request, res: Response) => {
    const result = await CategoryService.deleteCategoryService(req.params.id);
    res.status(result.statusCode).json(result.data);
});
