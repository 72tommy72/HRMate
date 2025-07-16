//@ts-ignore
import swaggerJSDoc from 'swagger-jsdoc';
// import { swaggerPaths } from './docs';
import { attendanceDocs } from '../docs/attendance.docs';
import authDocs from '../docs/auth.docs';
import { categoryDocs } from '../docs/categories.docs';
import { clientDocs } from '../docs/clients.docs';
import { employeeDocs } from '../docs/employees.docs';
import { logDocs } from '../docs/log.docs';
import { notificationDocs } from '../docs/notifications.docs';
import { qrSessionDocs } from '../docs/QRCode.docs';
import { settingsDocs } from '../docs/settings.docs';
import { transactionDocs } from '../docs/transaction.docs';
import { userDocs } from '../docs/user.docs';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API documentation for the E-commerce project',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: {
            ...attendanceDocs,
            ...authDocs,
            ...categoryDocs,
            ...clientDocs,
            ...employeeDocs,
            ...logDocs,
            ...notificationDocs,
            ...qrSessionDocs,
            ...settingsDocs,
            ...transactionDocs,
            ...userDocs,
        },
    },
    apis: [

    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
