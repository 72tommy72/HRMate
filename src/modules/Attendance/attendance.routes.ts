import { Router } from "express";
import {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getAttendanceByEmployee,
} from "./attendance.controller";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { 
  checkInSchema, 
  checkOutSchema, 
  getAttendanceByEmployeeSchema 
} from "./attendance.validaion";

const router = Router();

/**
 * @route POST /api/attendance/check-in
 * @desc Employee check-in endpoint
 * @access Authenticated users
 */
router.post(
  "/check-in",
  isAuthentcated,
  isValid(checkInSchema),
  checkIn
);

/**
 * @route POST /api/attendance/check-out
 * @desc Employee check-out endpoint
 * @access Authenticated users
 */
router.post(
  "/check-out", 
  isAuthentcated,
  isValid(checkOutSchema),
  checkOut
);

/**
 * @route GET /api/attendance/me
 * @desc Get current employee's attendance records
 * @access Authenticated users
 */
router.get(
  "/me",
  isAuthentcated,
  getMyAttendance
);

/**
 * @route GET /api/attendance
 * @desc Get all employees' attendance records
 * @access Admin only
 */
router.get(
  "/",
  isAuthentcated,
  isAuthorized("admin"),
  getAllAttendance
);

/**
 * @route GET /api/attendance/employee/:employeeId
 * @desc Get specific employee's attendance records
 * @access Admin only
 */
router.get(
  "/employee/:employeeId",
  isAuthentcated,
  isAuthorized("admin"),
  isValid(getAttendanceByEmployeeSchema),
  getAttendanceByEmployee
);

export default router;
