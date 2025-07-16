import { Request, Response } from "express";
import * as UserService from "./user.service";
import { catchError } from "../../utils/catchError";

/**
 * User Controller Module
 * Handles all user-related HTTP requests and responses
 */

/**
 * Creates a new user
 * @param req Express request object containing user data
 * @param res Express response object
 */
export const addUser = catchError(async (req: Request, res: Response) => {
    const result = await UserService.addUserService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves all users with optional query parameters
 * @param req Express request object containing query parameters
 * @param res Express response object
 */
export const getAllUsers = catchError(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsersService(req.query as any);
    res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves a specific user by ID
 * @param req Express request object containing user ID
 * @param res Express response object
 */
export const getUser = catchError(async (req: Request, res: Response) => {
    const result = await UserService.getUserService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Updates user information
 * @param req Express request object containing updated user data
 * @param res Express response object
 */
export const updateUser = catchError(async (req: Request, res: Response) => {
    const result = await UserService.updateUserService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Updates user password
 * @param req Express request object containing new password data
 * @param res Express response object
 */
export const updateUserPassword = catchError(async (req: Request, res: Response) => {
    const result = await UserService.updateUserPasswordService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Toggles user lock status
 * @param req Express request object containing lock status
 * @param res Express response object
 */
export const updateUserLock = catchError(async (req: Request, res: Response) => {
    const result = await UserService.updateUserLockService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Resets user sessions
 * @param req Express request object
 * @param res Express response object
 */
export const updateUserResetSession = catchError(async (req: Request, res: Response) => {
    const result = await UserService.resetUserSessionsService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Deletes a user
 * @param req Express request object containing user ID
 * @param res Express response object
 */
export const deleteUser = catchError(async (req: Request, res: Response) => {
    const result = await UserService.deleteUserService(req);
    res.status(result.statusCode).json(result.data);
});
