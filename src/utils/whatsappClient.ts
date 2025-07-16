/**
 * WhatsApp Client Management Module
 * Handles creation and management of WhatsApp Web client instances
 */

import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// Store active WhatsApp client instances mapped by phone numbers
export const clientsMap: Record<string, Client> = {};

/**
 * Creates and initializes a new WhatsApp client instance
 * @param sessionId Unique identifier for the client session
 * @param phone Phone number associated with the WhatsApp account
 */
export async function createWhatsappClient(sessionId: string, phone: string) {
    // Initialize WhatsApp client with authentication and security settings
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: sessionId }),
        puppeteer: {
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
    });

    // Handle QR code generation for client authentication
    client.on("qr", (qr) => {
        console.log(`🔐 QR for ${phone}`);
        qrcode.generate(qr, { small: true });
    });

    // Handle successful client connection
    client.on("ready", () => {
        console.log(`✅ WhatsApp client ready for ${phone}`);
        clientsMap[phone] = client;
    });

    // Handle client disconnection and cleanup
    client.on("disconnected", () => {
        console.log(`❌ Client disconnected: ${phone}`);
        delete clientsMap[phone];
    });

    // Start the client initialization process
    await client.initialize();
}
