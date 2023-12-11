"use strict";

const express = require('express');
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const path = require('path');

// Import your API routes
const adminRoutes = require('../../routes/adminRoutes');


// Define Swagger specification
const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "3x3_Intern API",
        description: "API for the 3x3 project, made by Bruno Amat"
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    paths: {
        '/admins': {
            get: {
                summary: 'Get all admins',
                description: 'Retrieve a list of all admins.',
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                example: {
                                    admins: [
                                        // Example data here
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
        '/admin/{id}': {
            get: {
                summary: 'Get admin by ID',
                description: 'Retrieve an admin by its ID.',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of the admin to retrieve.',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                example: {
                                    admin: {
                                        // Example data here
                                    },
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Admin not found',
                    },
                },
            },
        },
        '/admin/new': {
            post: {
                summary: 'Create a new admin',
                description: 'Create a new admin with the provided data.',
                requestBody: {
                    content: {
                        'application/json': {
                            example: {
                                // Example data here
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Admin created successfully',
                        content: {
                            'application/json': {
                                example: {
                                    message: 'Admin created successfully',
                                    admin: {
                                        // Example data here
                                    },
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Error creating admin',
                    },
                },
            },
        },
        '/admin/mod/{id}': {
            put: {
                summary: 'Update an existing admin',
                description: 'Update an existing admin with the provided data.',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of the admin to update.',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            example: {
                                // Example data here
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Admin updated successfully',
                        content: {
                            'application/json': {
                                example: {
                                    message: 'Admin updated successfully',
                                    admin: {
                                        // Example data here
                                    },
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Error updating admin',
                    },
                },
            },
        },
        '/admin/del/{id}': {
            delete: {
                summary: 'Delete an existing admin',
                description: 'Delete an existing admin by its ID.',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID of the admin to delete.',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Admin deleted successfully',
                        content: {
                            'application/json': {
                                example: {
                                    message: 'Admin deleted successfully',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Error deleting admin',
                    },
                },
            },
        },
    },
};

// Serve Swagger documentation
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerSpec));

module.exports = router;