/**
 * Category Routes Module
 * Handles all category-related API endpoints
 */

import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";

import { 
  createCategorySchema, 
  deleteCategorySchema, 
  getCategoryByIdSchema, 
  updateCategorySchema 
} from "./category.validation";

const router = Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories (with filtering and search)
 * @access  Authenticated users
 */
router.get("/", isAuthentcated, getAllCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Get single category details by ID
 * @access  Authenticated users
 */
router.get("/:id", isAuthentcated, isValid(getCategoryByIdSchema), getCategoryById);

/**
 * @route   POST /api/categories
 * @desc    Create new category
 * @access  Admin only
 */
router.post("/", isAuthentcated, isAuthorized("admin"), isValid(createCategorySchema), createCategory);

/**
 * @route   PATCH /api/categories/:id
 * @desc    Update category information
 * @access  Admin only
 */
router.patch("/:id", isAuthentcated, isAuthorized("admin"), isValid(updateCategorySchema), updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete category
 * @access  Admin only
 */
router.delete("/:id", isAuthentcated, isAuthorized("admin"), isValid(deleteCategorySchema), deleteCategory);


export default router;
