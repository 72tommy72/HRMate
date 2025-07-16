export const transactionDocs = {
    '/transactions': {
        get: {
            tags: ['Transactions'],
            summary: 'Get all transactions',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of transactions',
                    content: {
                        'application/json': {
                            example: [
                                {
                                    _id: 'txn_123',
                                    amount: 500,
                                    type: 'credit',
                                    description: 'Payment received',
                                    createdAt: '2025-07-16T12:00:00Z',
                                },
                            ],
                        },
                    },
                },
                401: { description: 'Unauthorized' },
            },
        },

        post: {
            tags: ['Transactions'],
            summary: 'Create new transaction',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            amount: 1000,
                            type: 'debit',
                            description: 'Service payment',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Transaction created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
            },
        },
    },

    '/transactions/{id}': {
        get: {
            tags: ['Transactions'],
            summary: 'Get transaction by ID',
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
                200: { description: 'Transaction found' },
                401: { description: 'Unauthorized' },
                404: { description: 'Transaction not found' },
            },
        },

        patch: {
            tags: ['Transactions'],
            summary: 'Update transaction',
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
                            amount: 600,
                            description: 'Updated service payment',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Transaction updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
                404: { description: 'Transaction not found' },
            },
        },

        delete: {
            tags: ['Transactions'],
            summary: 'Delete transaction',
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
                200: { description: 'Transaction deleted successfully' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admin only)' },
                404: { description: 'Transaction not found' },
            },
        },
    },
};
