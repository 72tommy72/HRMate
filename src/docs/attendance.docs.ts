export const attendanceDocs = {
    '/attendance/check-in': {
        post: {
            tags: ['Attendance'],
            summary: 'Check-in for work',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            location: 'Main Office',
                            time: '2025-07-16T08:00:00Z',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Check-in successful' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/attendance/check-out': {
        post: {
            tags: ['Attendance'],
            summary: 'Check-out from work',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            time: '2025-07-16T17:00:00Z',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Check-out successful' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/attendance/me': {
        get: {
            tags: ['Attendance'],
            summary: 'Get current user attendance records',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Attendance records fetched' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/attendance': {
        get: {
            tags: ['Attendance'],
            summary: 'Get all attendance records (Admin only)',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'All attendance records fetched' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden: Admins only' },
            },
        },
    },

    '/attendance/employee/{employeeId}': {
        get: {
            tags: ['Attendance'],
            summary: "Get specific employee's attendance records",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'employeeId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'Employee attendance records fetched' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden: Admins only' },
                404: { description: 'Employee not found' },
            },
        },
    },
};
