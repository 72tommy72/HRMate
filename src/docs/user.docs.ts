export const userDocs = {
    '/users': {
        get: {
            tags: ['Users'],
            summary: 'Get all users',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of users',
                    content: {
                        'application/json': {
                            example: [
                                {
                                    _id: 'user123',
                                    username: 'admin',
                                    email: 'admin@example.com',
                                    role: 'admin',
                                },
                            ],
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },

    '/users/{id}': {
        get: {
            tags: ['Users'],
            summary: 'Get user by ID',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
                200: { description: 'User found' },
                404: { description: 'User not found' },
            },
        },

        put: {
            tags: ['Users'],
            summary: 'Update user information',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
                content: {
                    'application/json': {
                        example: {
                            username: 'newUsername',
                            email: 'user@domain.com',
                            role: 'employee',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'User updated successfully' },
                400: { description: 'Validation error' },
            },
        },

        delete: {
            tags: ['Users'],
            summary: 'Delete user',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
                200: { description: 'User deleted successfully' },
                404: { description: 'User not found' },
            },
        },
    },

    '/users/{id}/add-user': {
        post: {
            tags: ['Users'],
            summary: 'Add new user for employee',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
                content: {
                    'application/json': {
                        example: {
                            username: 'newUser',
                            email: 'new@user.com',
                            password: 'StrongPass123!',
                            role: 'employee',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'User created successfully' },
                400: { description: 'Validation error' },
            },
        },
    },

    '/users/{id}/password': {
        patch: {
            tags: ['Users'],
            summary: 'Update user password',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
                content: {
                    'application/json': {
                        example: {
                            newPassword: 'NewPassword123!',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Password updated' },
                400: { description: 'Validation error' },
            },
        },
    },

    '/users/{id}/lock': {
        patch: {
            tags: ['Users'],
            summary: 'Lock or unlock user',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
                content: {
                    'application/json': {
                        example: {
                            locked: true,
                        },
                    },
                },
            },
            responses: {
                200: { description: 'User lock status updated' },
                400: { description: 'Validation error' },
            },
        },
    },

    '/users/{id}/reset-session': {
        patch: {
            tags: ['Users'],
            summary: 'Reset active user session',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
                200: { description: 'User sessions reset successfully' },
                400: { description: 'Validation error' },
            },
        },
    },
};
