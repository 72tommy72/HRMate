import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { catchError } from "../../utils/catchError";

/**
 * Controller for handling user registration
 * @param req Request object containing user registration data in body
 * @param res Response object to send back registration result
 */
export const register = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.registerService(req.body);
    res.status(result?.statusCode).json(result?.data);
});

/**
 * Controller for activating user account
 * @param req Request object containing activation code in params
 * @param res Response object to send back activation result
 */
export const activatedAccount = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.activateAccountService({ 
        activationCode: req.params.activationCode 
    });
    res.status(result?.statusCode || 500).json(result?.data || {});
});

/**
 * Controller for handling user login
 * @param req Request object containing login credentials in body
 * @param res Response object to send back login result
 */
export const login = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.loginService(req.body);
    res.status(result?.statusCode).json(result?.data);
});

/**
 * Controller for initiating password reset process
 * @param req Request object containing user email in body
 * @param res Response object to send back process result
 */
export const sendForgetPassword = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.forgetPasswordService(req.body.email);
    res.status(result?.statusCode).json(result?.data);
});

/**
 * Controller for resetting user password
 * @param req Request object containing new password data in body
 * @param res Response object to send back reset result
 */
export const resetPassword = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.resetPasswordService(req.body);
    res.status(result?.statusCode).json(result?.data);
});

/**
 * Controller for retrieving user information
 * @param req Request object containing user data in req.user
 * @param res Response object to send back user data
 */
export const getUser = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.getUserService((req as any).user);
    res.status(result?.statusCode).json(result?.data);
});

/**
 * Controller for handling user logout
 * @param req Request object containing user data in req.user
 * @param res Response object to send back logout result
 */
export const logout = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.logoutService((req as any).user);
    res.status(result?.statusCode).json(result?.data);
});
