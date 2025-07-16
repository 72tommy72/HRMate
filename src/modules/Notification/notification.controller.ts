import { Request, Response } from "express";
import * as NotificationService from "./notification.service";
import { catchError } from "../../utils/catchError";

/**
 * Controller for sending a new notification
 * @param req Express request object containing notification data in body
 * @param res Express response object
 */
export const sendNotification = catchError(async (req: Request, res: Response) => {
    const result = await NotificationService.sendNotificationService(req.body);
    res.status(result.statusCode).json(result.data);
});

/**
 * Controller for retrieving all notifications for a user
 * @param req Express request object containing user ID
 * @param res Express response object
 */
export const getAllNotifications = catchError(async (req: Request, res: Response) => {
    const result = await NotificationService.getAllNotificationsService((req as any).user._id);
    res.status(result.statusCode).json(result.data);
});

/**
 * Controller for marking a notification as read
 * @param req Express request object containing notification ID in params
 * @param res Express response object
 */
export const markAsRead = catchError(async (req: Request, res: Response) => {
    const result = await NotificationService.markAsReadService({
        userId: (req as any).user._id,
        notificationId: req.params.id
    });
    res.status(result.statusCode).json(result.data);
});

/**
 * Controller for deleting a specific notification
 * @param req Express request object containing notification ID in params
 * @param res Express response object
 */
export const deleteNotification = catchError(async (req: Request, res: Response) => {
    const result = await NotificationService.deleteNotificationService({
        userId: (req as any).user._id,
        notificationId: req.params.id
    });
    res.status(result.statusCode).json(result.data);
});

/**
 * Controller for deleting all notifications for a user
 * @param req Express request object containing user ID
 * @param res Express response object
 */
export const deleteAllNotifications = catchError(async (req: Request, res: Response) => {
    const result = await NotificationService.deleteAllNotificationsService((req as any).user._id);
    res.status(result.statusCode).json(result.data);
});
