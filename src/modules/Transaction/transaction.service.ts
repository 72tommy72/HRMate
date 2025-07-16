/**
 * Transaction Service Implementation
 * Handles all transaction-related business logic
 */

import { Request } from "express";
import { Transaction } from "./transaction.model";

/**
 * Retrieves all transactions from the database
 * @param req Express Request object
 * @returns Object containing status code, success flag, message and transactions data
 */
export async function getAllTransactionsService(req: Request) {
    const transactions = await Transaction.find();
    if (!transactions) {
        return {
            statusCode: 404,
            success: false,
            message: "Transactions not found",
            data: null,
        };
    }
    return {
        statusCode: 200,
        success: true,
        message: "Transactions fetched successfully",
        data: transactions,
    };
}

/**
 * Retrieves a single transaction by its ID
 * @param req Express Request object containing transaction ID in params
 * @returns Object containing status code, success flag, message and transaction data
 */
export async function getTransactionByIdService(req: Request) {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
        return {
            statusCode: 404,
            success: false,
            message: "Transaction not found",
            data: null,
        };
    }
    return {
        statusCode: 200,
        success: true,
        message: "Transaction fetched successfully",
        data: transaction,
    }
}

/**
 * Creates a new transaction
 * @param req Express Request object containing transaction details in body
 * @returns Object containing status code, success flag, message and created transaction data
 */
export async function createTransactionService(req: Request) {
    const {
        amount,
        type,
        categoryId,
        date,
        description,
        clientId,
        employeeId,
        paymentMethod,
        createdBy,
    } = req.body;

    const newTransaction = await Transaction.create({
        amount,
        type,
        categoryId,
        date,
        description,
        clientId,
        employeeId,
        paymentMethod,
        createdBy,
        createdAt: new Date(),
    });

    return {
        statusCode: 201,
        success: true,
        message: "Transaction created successfully",
        data: newTransaction,
    };
}

/**
 * Updates an existing transaction
 * @param req Express Request object containing transaction ID in params and update data in body
 * @returns Object containing status code, success flag, message and updated transaction data
 */
export async function updateTransactionService(req: Request) {
    const { id } = req.params;
    const {
        amount,
        type,
        categoryId,
        date,
        description,
        clientId,
        employeeId,
        paymentMethod,
        updatedBy,
    } = req.body;

    // Only include fields that are provided in the request
    const updateData: any = {
        ...(amount !== undefined && { amount }),
        ...(type && { type }),
        ...(categoryId && { categoryId }),
        ...(date && { date }),
        ...(description && { description }),
        ...(clientId && { clientId }),
        ...(employeeId && { employeeId }),
        ...(paymentMethod && { paymentMethod }),
        ...(updatedBy && { updatedBy }),
        updatedAt: new Date(),
    };

    const transaction = await Transaction.findByIdAndUpdate(id, updateData, {
        new: true,
    });

    if (!transaction) {
        return {
            statusCode: 404,
            success: false,
            message: "Transaction not found",
            data: null,
        };
    }

    return {
        statusCode: 200,
        success: true,
        message: "Transaction updated successfully",
        data: transaction,
    };
}

/**
 * Deletes a transaction by its ID
 * @param req Express Request object containing transaction ID in params
 * @returns Object containing status code, success flag, message and deleted transaction data
 */
export async function deleteTransactionService(req: Request) {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
        return {
            statusCode: 404,
            success: false,
            message: "Transaction not found",
            data: null,
        };
    }
    return {
        statusCode: 200,
        success: true,
        message: "Transaction deleted successfully",
        data: transaction,
    };
}
