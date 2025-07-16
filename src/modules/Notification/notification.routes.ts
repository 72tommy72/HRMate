import { Router } from "express";
import {
  sendNotification,
  getAllNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "./notification.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { 
  deleteNotificationSchema, 
  markAsReadSchema, 
  sendNotificationSchema 
} from "./notification.validation";

const router = Router();

/**
 * @route   POST /api/notifications
 * @desc    Send a notification (by admin or system)
 * @access  Admin only
 * @middleware isAuthentcated - Verifies user is logged in
 * @middleware isAuthorized - Checks if user has admin role
 * @middleware isValid - Validates request body against schema
 */
router.post(
  "/", 
  isAuthentcated, 
  isAuthorized("admin"),
  isValid(sendNotificationSchema), 
  sendNotification
);

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for current user
 * @access  Authenticated users
 * @middleware isAuthentcated - Verifies user is logged in
 */
router.get("/", isAuthentcated, getAllNotifications);

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Authenticated users
 * @middleware isAuthentcated - Verifies user is logged in
 * @middleware isValid - Validates request parameters
 */
router.patch(
  "/:id/read", 
  isAuthentcated,
  isValid(markAsReadSchema), 
  markAsRead
);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a single notification
 * @access  Authenticated users
 * @middleware isAuthentcated - Verifies user is logged in
 * @middleware isValid - Validates request parameters
 */
router.delete(
  "/:id", 
  isAuthentcated,
  isValid(deleteNotificationSchema), 
  deleteNotification
);

/**
 * @route   DELETE /api/notifications
 * @desc    Delete all notifications for current user
 * @access  Authenticated users
 * @middleware isAuthentcated - Verifies user is logged in
 */
router.delete("/", isAuthentcated, deleteAllNotifications);

export default router;
