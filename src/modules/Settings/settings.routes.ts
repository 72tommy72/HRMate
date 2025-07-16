import { Router } from "express";
import {
  getSettings,
  updateSettings,
  resetSettings,
} from "./settings.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";

/**
 * Initialize Express Router
 */
const router = Router();

/**
 * @route   GET /api/settings
 * @desc    Get current system settings
 * @access  Admin only
 */
router.get("/", isAuthentcated, isAuthorized("admin"), getSettings);

/**
 * @route   PUT /api/settings
 * @desc    Update system settings
 * @access  Admin only
 */
router.put("/", isAuthentcated, isAuthorized("admin"), updateSettings);

/**
 * @route   DELETE /api/settings/reset
 * @desc    Reset settings to default values
 * @access  Admin only
 */
router.delete("/reset", isAuthentcated, isAuthorized("admin"), resetSettings);

export default router;
