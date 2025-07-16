/**
 * Transaction Controller
 * Handles HTTP requests related to financial transactions
 */

import { Request, Response } from "express";
import * as TransactionService from "./transaction.service";
import { catchError } from "../../utils/catchError";

/**
 * Retrieves all transactions from the database
 * @param req Express Request object
 * @param res Express Response object
 */
export const getAllTransactions = catchError(async (req: Request, res: Response) => {
    const result = await TransactionService.getAllTransactionsService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves a specific transaction by its ID
 * @param req Express Request object containing transaction ID
 * @param res Express Response object
 */
export const getTransactionById = catchError(async (req: Request, res: Response) => {
    const result = await TransactionService.getTransactionByIdService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Creates a new transaction record
 * @param req Express Request object containing transaction details
 * @param res Express Response object
 */
export const createTransaction = catchError(async (req: Request, res: Response) => {
    const result = await TransactionService.createTransactionService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Updates an existing transaction record
 * @param req Express Request object containing updated transaction details
 * @param res Express Response object
 */
export const updateTransaction = catchError(async (req: Request, res: Response) => {
    const result = await TransactionService.updateTransactionService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Deletes a transaction record
 * @param req Express Request object containing transaction ID to delete
 * @param res Express Response object
 */
export const deleteTransaction = catchError(async (req: Request, res: Response) => {
    const result = await TransactionService.deleteTransactionService(req);
    res.status(result.statusCode).json(result.data);
});
