export const logDocs = {
    '/logs': {
        get: {
            tags: ['Logs'],
            summary: 'Get all logs',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'level',
                    in: 'query',
                    schema: { type: 'string' },
                    description: 'Filter by log level (info, error, warning)',
                },
                {
                    name: 'from',
                    in: 'query',
                    schema: { type: 'string', format: 'date-time' },
                    description: 'Start date for filtering',
                },
                {
                    name: 'to',
                    in: 'query',
                    schema: { type: 'string', format: 'date-time' },
                    description: 'End date for filtering',
                },
            ],
            responses: {
                200: { description: 'Logs fetched successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
            },
        },
        post: {
            tags: ['Logs'],
            summary: 'Create a new log entry',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            level: 'info',
                            message: 'User login event',
                            context: 'AuthModule',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Log created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/logs/stats': {
        get: {
            tags: ['Logs'],
            summary: 'Get log statistics',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'from',
                    in: 'query',
                    schema: { type: 'string', format: 'date-time' },
                    description: 'Start date for stats',
                },
                {
                    name: 'to',
                    in: 'query',
                    schema: { type: 'string', format: 'date-time' },
                    description: 'End date for stats',
                },
            ],
            responses: {
                200: { description: 'Log statistics fetched' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
            },
        },
    },
};
