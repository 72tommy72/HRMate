import { Router } from "express";
import {
  createLog,
  getAllLogs,
  getLogsStats,
} from "./log.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { createLogSchema, getAllLogsSchema, getLogsStatsSchema } from "./log.validation";

const router = Router();

/**
 * @route   GET /api/logs
 * @desc    Get all logs (with filtering capability)
 * @access  Admin only
 */
router.get("/", isAuthentcated, isAuthorized("admin"), isValid(getAllLogsSchema), getAllLogs);

/**
 * @route   POST /api/logs
 * @desc    Create a new log entry (used internally for event logging)
 * @access  Authenticated users only
 */
router.post("/", isAuthentcated, isValid(createLogSchema), createLog);

/**
 * @route   GET /api/logs/stats
 * @desc    Get general statistics about logs
 * @access  Admin only
 */
router.get("/stats", isAuthentcated, isAuthorized("admin"), isValid(getLogsStatsSchema), getLogsStats);

export default router;
