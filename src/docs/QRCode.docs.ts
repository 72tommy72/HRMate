export const qrSessionDocs = {
    '/qr-session/generate': {
        get: {
            tags: ['QR Session'],
            summary: 'Generate QR Code for mobile device pairing',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'QR code generated successfully',
                    content: {
                        'application/json': {
                            example: {
                                qrImage: 'data:image/png;base64,...',
                                sessionId: 'abc123',
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },

    '/qr-session/status': {
        get: {
            tags: ['QR Session'],
            summary: 'Get QR session connection status',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Session status retrieved',
                    content: {
                        'application/json': {
                            example: {
                                connected: true,
                                clientInfo: {
                                    name: 'WhatsApp Web',
                                    platform: 'Android',
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },

    '/qr-session/connect': {
        post: {
            tags: ['QR Session'],
            summary: 'Connect system to mobile device using QR',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            token: 'scan-token-xyz',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Connected successfully' },
                400: { description: 'Invalid QR token' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },

    '/qr-session/disconnect': {
        post: {
            tags: ['QR Session'],
            summary: 'Disconnect WhatsApp session',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            sessionId: 'abc123',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Session disconnected' },
                400: { description: 'Invalid sessionId' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },
};
