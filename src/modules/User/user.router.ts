import { Router } from "express";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPassword,
  updateUserLock,
  updateUserResetSession,
  deleteUser,
} from "./user.controller";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import {
  addUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getUserSchema,
  updateUserLockSchema,
  updateUserPasswordSchema,
  updateUserResetSessionSchema,
  updateUserSchema
} from "./user.validation";

const router = Router();

/**
 * @route   POST /api/users/:id/add-user
 * @desc    Add a new user and link them to an employee
 * @access  Admin only
 */
router.post(
  "/:id/add-user",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(addUserSchema),
  addUser
);

/**
 * @route   GET /api/users
 * @desc    Retrieve all users
 * @access  Admin only
 */
router.get(
  "/",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(getAllUsersSchema),
  getAllUsers
);

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a single user by ID
 * @access  Admin only
 */
router.get(
  "/:id",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(getUserSchema),
  getUser
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user information
 * @access  Admin only
 */
router.put(
  "/:id",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(updateUserSchema),
  updateUser
);

/**
 * @route   PATCH /api/users/:id/password
 * @desc    Update user password
 * @access  Admin only
 */
router.patch(
  "/:id/password",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(updateUserPasswordSchema),
  updateUserPassword
);

/**
 * @route   PATCH /api/users/:id/lock
 * @desc    Lock or unlock user account
 * @access  Admin only
 */
router.patch(
  "/:id/lock",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(updateUserLockSchema),
  updateUserLock
);

/**
 * @route   PATCH /api/users/:id/reset-session
 * @desc    Reset active sessions for a user
 * @access  Admin only
 */
router.patch(
  "/:id/reset-session",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(updateUserResetSessionSchema),
  updateUserResetSession
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Admin only
 */
router.delete(
  "/:id",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(deleteUserSchema),
  deleteUser
);

export default router;
