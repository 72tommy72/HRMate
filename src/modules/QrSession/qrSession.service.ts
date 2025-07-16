/**
 * QR Service implementation
 * Handles QR code generation, status checking and WhatsApp connection
 */
import { clientsMap, createWhatsappClient } from "../../utils/whatsappClient";
import { QrSession } from "./qrSession.model";
import { nanoid } from "nanoid";

/**
 * Generates a new QR code session with a 5-minute expiration time
 * @returns Object containing session details and status
 */
export async function generateQRCodeService() {
    // Generate unique session ID and calculate expiration time
    const sessionId = nanoid(16);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

    // Create new QR session in database
    const qrSession = await QrSession.create({
        sessionId,
        expiresAt,
        status: "pending",
    });

    return {
        statusCode: 201,
        message: "QR session generated successfully",
        data: {
            sessionId: qrSession.sessionId,
            expiresAt: qrSession.expiresAt,
        },
    };
}

/**
 * Retrieves and validates the status of a QR code session
 * Updates expired sessions automatically
 * @param sessionId - The ID of the session to check
 * @returns Object containing session status and details
 */
export async function getQRCodeStatusService(sessionId: string) {
    // Retrieve session from database
    const session = await QrSession.findOne({ sessionId });

    if (!session) {
        return {
            statusCode: 404,
            message: "QR session not found",
            data: { success: false },
        };
    }

    // Auto-update expired sessions
    if (session.expiresAt < new Date() && session.status !== "expired") {
        session.status = "expired";
        await session.save();
    }

    return {
        statusCode: 200,
        message: "QR session status retrieved successfully",
        data: {
            success: true,
            result: session
        },
    };
}

/**
 * Parameters required for WhatsApp connection
 */
interface ConnectParams {
    sessionId: string;
    phone: string;
    userId?: string;
    metadata?: any;
}

/**
 * Establishes WhatsApp connection using QR code session
 * Validates session state and initializes WhatsApp client
 * @param params - Connection parameters including sessionId and phone
 * @returns Object containing connection status and session details
 */
export async function connectWithQRCodeService(params: ConnectParams) {
    const { sessionId, phone, userId, metadata } = params;

    // Validate session existence and state
    const session = await QrSession.findOne({ sessionId });
    if (!session) {
        return {
            statusCode: 404,
            message: "QR session not found",
            data: { success: false },
        };
    }

    if (session.status === "connected") {
        return {
            statusCode: 400,
            message: "This session is already connected",
            data: { success: false },
        };
    }

    // Initialize WhatsApp client and update session
    await createWhatsappClient(sessionId, phone);

    session.status = "connected";
    session.phone = phone;
    session.userId = userId;
    session.metadata = metadata;
    await session.save();

    return {
        statusCode: 200,
        message: "QR session connected and WhatsApp client initialized",
        data: {
            success: true,
            session,
        },
    };
}

/**
 * Disconnects an active WhatsApp session and performs cleanup
 * Handles client destruction and session status updates
 * @param sessionId - The ID of the session to disconnect
 * @returns Object containing disconnection status and session details
 */
export async function disconnectWithQRCodeService(sessionId: string) {
    // Validate session existence and state
    const session = await QrSession.findOne({ sessionId });

    if (!session) {
        return {
            statusCode: 404,
            message: "QR session not found", 
            data: { success: false },
        };
    }

    if (session.status !== "connected") {
        return {
            statusCode: 400,
            message: "QR session is not currently connected",
            data: { success: false },
        };
    }

    // Clean up WhatsApp client resources
    const client = clientsMap[sessionId];
    if (client) {
        try {
            await client.destroy();
            delete clientsMap[sessionId];
        } catch (err) {
            return {
                statusCode: 500,
                message: "Failed to disconnect WhatsApp client",
                data: { success: false, error: err },
            };
        }
    }

    // Mark session as expired
    session.status = "expired";
    await session.save();

    return {
        statusCode: 200,
        message: "WhatsApp session disconnected successfully",
        data: { success: true, session },
    };
}
