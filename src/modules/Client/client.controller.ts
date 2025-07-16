import { Request, Response } from "express";
import * as ClientService from "./client.service";
import { catchError } from "../../utils/catchError";

/**
 * Client Controller
 * Handles HTTP requests related to client operations
 */

/**
 * Get all clients from the database
 * @param req Express Request object
 * @param res Express Response object
 * @returns List of all clients with status code
 */
export const getAllClients = catchError(async (req: Request, res: Response) => {
    const result = await ClientService.getAllClientsService();
    res.status(result.statusCode).json(result.data);
});

/**
 * Get a specific client by ID
 * @param req Express Request object containing client ID in params
 * @param res Express Response object
 * @returns Single client data with status code
 */
export const getClientById = catchError(async (req: Request, res: Response) => {
    const result = await ClientService.getClientByIdService((req as any).params.id);
    res.status(result.statusCode).json(result.data);
});

/**
 * Create a new client
 * @param req Express Request object containing client data in body
 * @param res Express Response object
 * @returns Created client data with status code
 */
export const createClient = catchError(async (req: Request, res: Response) => {
    const result = await ClientService.createClientService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Update an existing client
 * @param req Express Request object containing updated client data
 * @param res Express Response object
 * @returns Updated client data with status code
 */
export const updateClient = catchError(async (req: Request, res: Response) => {
    const result = await ClientService.updateClientService(req);
    res.status(result.statusCode).json(result.data);
});

/**
 * Delete a client by ID
 * @param req Express Request object containing client ID in params
 * @param res Express Response object
 * @returns Success message with status code
 */
export const deleteClient = catchError(async (req: Request, res: Response) => {
    const result = await ClientService.deleteClientService(req.params.id);
    res.status(result.statusCode).json(result.data);
});
