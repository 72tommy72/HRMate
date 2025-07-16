export const clientDocs = {
    '/clients': {
        get: {
            tags: ['Clients'],
            summary: 'Get all clients (with filtering and search)',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Clients fetched successfully' },
                401: { description: 'Unauthorized' },
            },
        },
        post: {
            tags: ['Clients'],
            summary: 'Create a new client',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            name: 'John Doe',
                            phone: '+20123456789',
                            email: 'john@example.com',
                            address: 'Cairo, Egypt',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Client created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
            },
        },
    },

    '/clients/{id}': {
        get: {
            tags: ['Clients'],
            summary: 'Get client by ID',
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
                200: { description: 'Client details fetched' },
                400: { description: 'Invalid ID format' },
                401: { description: 'Unauthorized' },
                404: { description: 'Client not found' },
            },
        },

        patch: {
            tags: ['Clients'],
            summary: 'Update client',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            name: 'Updated Name',
                            phone: '+20123456789',
                            address: 'Updated address',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Client updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Client not found' },
            },
        },

        delete: {
            tags: ['Clients'],
            summary: 'Delete client',
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
                200: { description: 'Client deleted successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Client not found' },
            },
        },
    },
};
