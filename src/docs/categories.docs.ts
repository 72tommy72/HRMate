export const categoryDocs = {
    '/categories': {
        get: {
            tags: ['Categories'],
            summary: 'Get all categories (with filtering and search)',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Categories fetched successfully' },
                401: { description: 'Unauthorized' },
            },
        },
        post: {
            tags: ['Categories'],
            summary: 'Create a new category',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            name: 'Electronics',
                            description: 'All kinds of electronic items',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Category created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
            },
        },
    },

    '/categories/{id}': {
        get: {
            tags: ['Categories'],
            summary: 'Get category by ID',
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
                200: { description: 'Category details fetched' },
                400: { description: 'Invalid ID format' },
                401: { description: 'Unauthorized' },
                404: { description: 'Category not found' },
            },
        },

        patch: {
            tags: ['Categories'],
            summary: 'Update category',
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
                            name: 'Updated Category Name',
                            description: 'Updated description for the category',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Category updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Category not found' },
            },
        },

        delete: {
            tags: ['Categories'],
            summary: 'Delete category',
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
                200: { description: 'Category deleted successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Category not found' },
            },
        },
    },
};
