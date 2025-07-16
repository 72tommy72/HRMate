import { Client } from "./client.model";
import { Request } from "express";

/**
 * Client Service Implementation
 * This module handles all client-related database operations
 */

/**
 * Retrieves all clients from the database
 * @returns Object containing status code and client data
 */
export const getAllClientsService = async () => {
    const clients = await Client.find();
    if (!clients) {
        return {
            statusCode: 404,
            message: "No clients found",
            data: null,
        };
    }
    return {
        statusCode: 200,
        data: clients,
    };
}

/**
 * Retrieves a specific client by ID
 * @param id - The client's unique identifier
 * @returns Object containing status code and client data
 */
export const getClientByIdService = async (id: string) => {
    const client = await Client.findById(id);
    if (!client) {
        return {
            statusCode: 404,
            message: "No client found",
            data: null,
        };
    }
    return {
        statusCode: 200,
        data: client,
    };
}

/**
 * Creates a new client in the database
 * @param req - Express request object containing client data
 * @returns Object containing status code and created client data
 */
export async function createClientService(req: Request) {
    // Extract client data from request body
    const clientData = req.body;

    // Create new client using extracted data
    const newClient = await Client.create(clientData);

    return {
        statusCode: 201,
        message: "Client created successfully",
        success: true,
        data: newClient,
    };
}

/**
 * Updates an existing client's information
 * @param req - Express request object containing updated client data
 * @returns Object containing status code and updated client data
 */
export async function updateClientService(req: Request) {
    const { id } = req.params;
    const updateData = req.body;

    // Update client and return new document
    const updatedClient = await Client.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true }
    );

    if (!updatedClient) {
        return {
            statusCode: 404,
            success: false,
            message: "Client not found",
            data: null,
        };
    }

    return {
        statusCode: 200,
        success: true,
        message: "Client updated successfully",
        data: updatedClient,
    };
}

/**
 * Deletes a client from the database
 * @param id - The client's unique identifier
 * @returns Object containing status code and deleted client data
 */
export const deleteClientService = async (id: string) => {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
        return {
            statusCode: 404,
            message: "No client found",
            data: null,
        };
    }
    return {
        statusCode: 200,
        message: "Client deleted successfully",
        data: deletedClient,
    };
}
