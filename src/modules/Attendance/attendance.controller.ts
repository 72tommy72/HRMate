import { Request, Response } from "express";
import * as AttendanceService from "./attendance.service";
import { catchError } from "../../utils/catchError";

/**
 * Controller for handling employee check-in
 * Records the time when employee starts their work day
 */
export const checkIn = catchError(async (req: Request, res: Response) => {
  const result = await AttendanceService.checkInService((req as any).user);
  res.status(result.statusCode).json(result.data);
});

/**
 * Controller for handling employee check-out
 * Records the time when employee ends their work day
 */
export const checkOut = catchError(async (req: Request, res: Response) => {
  const result = await AttendanceService.checkOutService((req as any).user);
  res.status(result.statusCode).json(result.data);
});

/**
 * Controller to get attendance records for the logged-in employee
 * Returns attendance history for the current user
 */
export const getMyAttendance = catchError(async (req: Request, res: Response) => {
  const result = await AttendanceService.getMyAttendanceService((req as any).user);
  res.status(result.statusCode).json(result.data);
});

/**
 * Controller to get attendance records for all employees
 * Accessible by authorized personnel only
 */
export const getAllAttendance = catchError(async (req: Request, res: Response) => {
  const result = await AttendanceService.getAllAttendanceService(req);
  res.status(result.statusCode).json(result.data);
});

/**
 * Controller to get attendance records for a specific employee
 * Requires employee ID as parameter
 */
export const getAttendanceByEmployee = catchError(async (req: Request, res: Response) => {
  const result = await AttendanceService.getAttendanceByEmployeeService(req);
  res.status(result.statusCode).json(result.data);
});
