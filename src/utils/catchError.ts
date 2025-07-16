import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Higher-order function that wraps an async controller to handle errors
 * 
 * @param controller - Async Express controller function to wrap
 * @returns RequestHandler that catches and forwards errors to Express error handling middleware
 */
export const catchError = (
    controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        controller(req, res, next).catch((error) => next(error));
    };
};
