export const settingsDocs = {
    '/settings': {
        get: {
            tags: ['Settings'],
            summary: 'Get system settings',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Settings fetched successfully',
                    content: {
                        'application/json': {
                            example: {
                                siteName: 'My Company',
                                maintenanceMode: false,
                                defaultLanguage: 'en',
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },

        put: {
            tags: ['Settings'],
            summary: 'Update system settings',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            siteName: 'My Company Updated',
                            maintenanceMode: true,
                            defaultLanguage: 'ar',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Settings updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },

    '/settings/reset': {
        delete: {
            tags: ['Settings'],
            summary: 'Reset settings to default values',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Settings reset successfully' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },
};
