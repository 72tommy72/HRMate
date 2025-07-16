export const employeeDocs = {
    '/employees': {
        get: {
            tags: ['Employees'],
            summary: 'Get all employees',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'List of employees retrieved successfully' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
            },
        },
        post: {
            tags: ['Employees'],
            summary: 'Create a new employee',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            name: 'Ahmed Salah',
                            email: 'ahmed@example.com',
                            phone: '+201234567890',
                            jobTitle: 'HR Manager',
                            salary: 7000,
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Employee created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
            },
        },
    },

    '/employees/{id}': {
        get: {
            tags: ['Employees'],
            summary: 'Get employee by ID',
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
                200: { description: 'Employee details retrieved' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Employee not found' },
            },
        },

        put: {
            tags: ['Employees'],
            summary: 'Update employee data',
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
                            name: 'Ahmed Updated',
                            phone: '+201112223344',
                            salary: 8000,
                            jobTitle: 'Senior Manager',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Employee updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Employee not found' },
            },
        },

        delete: {
            tags: ['Employees'],
            summary: 'Delete employee',
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
                200: { description: 'Employee deleted successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (Admins only)' },
                404: { description: 'Employee not found' },
            },
        },
    },
};
