import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
} from "./transaction.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { 
  createTransactionSchema, 
  deleteTransactionSchema, 
  getTransactionByIdSchema, 
  updateTransactionSchema 
} from "./transaction.validation";

const router = Router();

/**
 * @route   GET /api/transactions
 * @desc    Get all transactions with filtering capability
 * @access  Authenticated users
 */
router.get("/", isAuthentcated, getAllTransactions);

/**
 * @route   GET /api/transactions/:id
 * @desc    Get a single transaction by ID
 * @access  Authenticated users
 */
router.get(
  "/:id", 
  isAuthentcated, 
  isValid(getTransactionByIdSchema),
  getTransactionById
);

/**
 * @route   POST /api/transactions
 * @desc    Create a new transaction
 * @access  Admin only
 */
router.post(
  "/", 
  isAuthentcated, 
  isAuthorized("admin"), 
  isValid(createTransactionSchema), 
  createTransaction
);

/**
 * @route   PATCH /api/transactions/:id
 * @desc    Update an existing transaction
 * @access  Admin only
 */
router.patch(
  "/:id", 
  isAuthentcated, 
  isAuthorized("admin"), 
  isValid(updateTransactionSchema), 
  updateTransaction
);

/**
 * @route   DELETE /api/transactions/:id
 * @desc    Delete a transaction
 * @access  Admin only
 */
router.delete(
  "/:id", 
  isAuthentcated, 
  isAuthorized("admin"), 
  isValid(deleteTransactionSchema), 
  deleteTransaction
);

export default router;
