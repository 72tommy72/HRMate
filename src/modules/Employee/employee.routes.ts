import { Router } from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from "./employee.controller";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { 
    createEmployeeSchema, 
    deleteEmployeeSchema, 
    getEmployeeByIdSchema, 
    updateEmployeeSchema 
} from "./employee.validation";
import { isValid } from "../../middlewares/validation.middleware";

const router = Router();

/**
 * @route   GET /api/employees
 * @desc    Get all employees
 * @access  Authenticated users (Admin only)
 */
router.get("/", 
    isAuthentcated, 
    isAuthorized("admin"),
    getAllEmployees
);

/**
 * @route   GET /api/employees/:id
 * @desc    Get employee by ID
 * @access  Authenticated users (Admin only)
 */
router.get("/:id", 
    isAuthentcated, 
    isAuthorized("admin"),
    isValid(getEmployeeByIdSchema), 
    getEmployeeById
);

/**
 * @route   POST /api/employees
 * @desc    Create new employee
 * @access  Admin only
 */
router.post("/", 
    isAuthentcated, 
    isAuthorized("admin"),
    isValid(createEmployeeSchema), 
    createEmployee
);

/**
 * @route   PUT /api/employees/:id
 * @desc    Update employee data
 * @access  Admin only
 */
router.put("/:id", 
    isAuthentcated, 
    isAuthorized("admin"),
    isValid(updateEmployeeSchema), 
    updateEmployee
);

/**
 * @route   DELETE /api/employees/:id
 * @desc    Delete employee
 * @access  Admin only
 */
router.delete("/:id", 
    isAuthentcated, 
    isAuthorized("admin"),
    isValid(deleteEmployeeSchema), 
    deleteEmployee
);

export default router;
