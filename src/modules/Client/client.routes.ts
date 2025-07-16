import { Router } from "express";
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from "./client.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { 
  createClientSchema, 
  deleteClientSchema, 
  getClientByIdSchema, 
  updateClientSchema 
} from "./client.validation";

const router = Router();

/**
 * @route   GET /api/clients
 * @desc    Get all clients (with filtering and search)
 * @access  Authenticated users
 */
router.get("/", isAuthentcated, getAllClients);

/**
 * @route   GET /api/clients/:id
 * @desc    Get single client details by ID
 * @access  Authenticated users
 */
router.get("/:id", isAuthentcated, isValid(getClientByIdSchema), getClientById);

/**
 * @route   POST /api/clients
 * @desc    Create new client
 * @access  Admin only
 */
router.post("/", isAuthentcated, isAuthorized("admin"), isValid(createClientSchema), createClient);

/**
 * @route   PATCH /api/clients/:id
 * @desc    Update client information
 * @access  Admin only
 */
router.patch("/:id", isAuthentcated, isAuthorized("admin"), isValid(updateClientSchema), updateClient);

/**
 * @route   DELETE /api/clients/:id
 * @desc    Delete client
 * @access  Admin only
 */
router.delete("/:id", isAuthentcated, isAuthorized("admin"), isValid(deleteClientSchema), deleteClient);

export default router;
