import { Request, Response } from "express";
import * as LogService from "./log.service";
import { catchError } from "../../utils/catchError";

/**
 * Controller for handling log-related operations
 */

/**
 * Retrieves all logs from the system
 * @param req Express Request object
 * @param res Express Response object
 * @returns List of all logs with appropriate status code
 */
export const getAllLogs = catchError(async (req: Request, res: Response) => {
  const result = await LogService.getAllLogsService(req);
  res.status(result.statusCode).json(result.data);
});

/**
 * Creates a new log entry in the system
 * @param req Express Request object containing log data in body
 * @param res Express Response object
 * @returns Created log data with success status
 */
export const createLog = catchError(async (req: Request, res: Response) => {
  const result = await LogService.createLogService({
    ...req.body,
    user: (req as any).user?.username || "system"
  });
  res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves statistical information about logs
 * @param req Express Request object
 * @param res Express Response object
 * @returns Log statistics with appropriate status code
 */
export const getLogsStats = catchError(async (req: Request, res: Response) => {
  const result = await LogService.getLogsStatsService(req);
  res.status(result.statusCode).json(result.data);
});
