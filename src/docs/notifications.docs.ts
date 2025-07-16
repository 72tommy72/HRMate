export const notificationDocs = {
    '/notifications': {
        post: {
            tags: ['Notifications'],
            summary: 'Send a notification (Admin only)',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            title: 'New Policy Update',
                            body: 'Please review the updated privacy policy.',
                            recipientId: 'user_id_here',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Notification sent successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },

        get: {
            tags: ['Notifications'],
            summary: 'Get all notifications for the current user',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Notifications retrieved' },
                401: { description: 'Unauthorized' },
            },
        },

        delete: {
            tags: ['Notifications'],
            summary: 'Delete all notifications for the current user',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'All notifications deleted' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/notifications/{id}': {
        delete: {
            tags: ['Notifications'],
            summary: 'Delete a single notification by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'Notification deleted' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Notification not found' },
            },
        },
    },

    '/notifications/{id}/read': {
        patch: {
            tags: ['Notifications'],
            summary: 'Mark a notification as read',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'Notification marked as read' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Notification not found' },
            },
        },
    },
};
