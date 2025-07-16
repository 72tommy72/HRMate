/**
 * Employee Controller
 * Handles HTTP requests related to employee operations
 */

import { Request, Response } from "express";
import * as EmployeeService from "./employee.service";
import { catchError } from "../../utils/catchError";

/**
 * Retrieves all employees from the database
 * @param req Express Request object
 * @param res Express Response object
 */
export const getAllEmployees = catchError(async (req: Request, res: Response) => {
    const result = await EmployeeService.getAllEmployeesService(req as any);
    res.status(result.statusCode).json(result.data);
});

/**
 * Retrieves a specific employee by their ID
 * @param req Express Request object containing employee ID in params
 * @param res Express Response object
 */
export const getEmployeeById = catchError(async (req: Request, res: Response) => {
    const result = await EmployeeService.getEmployeeByIdService(req.params.id);
    res.status(result.statusCode).json(result.data);
});

/**
 * Creates a new employee record
 * @param req Express Request object containing employee data in body
 * @param res Express Response object
 */
export const createEmployee = catchError(async (req: Request, res: Response) => {
    const result = await EmployeeService.createEmployeeService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Updates an existing employee record
 * @param req Express Request object containing updated employee data
 * @param res Express Response object
 */
export const updateEmployee = catchError(async (req: Request, res: Response) => {
    const result = await EmployeeService.updateEmployeeService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Deletes an employee record by ID
 * @param req Express Request object containing employee ID in params
 * @param res Express Response object
 */
export const deleteEmployee = catchError(async (req: Request, res: Response) => {
    const result = await EmployeeService.deleteEmployeeService(req.params.id);
    res.status(result.statusCode).json(result.data);
});
