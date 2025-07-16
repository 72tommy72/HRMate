/**
 * Utility module for sending WhatsApp messages
 * @module sendWhatsappMessage
 */

import { clientsMap } from "./whatsappClient";

/**
 * Sends a message via WhatsApp using the specified sender and recipient numbers
 * @param {string} fromPhone - The sender's phone number
 * @param {string} toPhone - The recipient's phone number
 * @param {string} message - The message content to be sent
 * @returns {Promise<Object>} Response object containing status code, message and success flag
 */
export async function sendMessageViaWhatsapp(fromPhone: string, toPhone: string, message: string) {
    // Get the WhatsApp client instance for the sender
    const client = clientsMap[fromPhone];

    // Check if sender's WhatsApp client exists
    if (!client) {
        return {
            statusCode: 400,
            message: "Sender phone not connected",
            data: { success: false },
        };
    }

    try {
        // Attempt to send the message
        await client.sendMessage(`${toPhone}@c.us`, message);
        
        // Return success response
        return {
            statusCode: 200,
            message: "Message sent successfully",
            data: { success: true },
        };
    } catch (error) {
        // Return error response if message sending fails
        return {
            statusCode: 500,
            message: "Failed to send message",
            data: { success: false, error },
        };
    }
}
