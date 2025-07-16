/**
 * Import required dependencies and modules
 */
import authRouter from './modules/Auth/auth.router';
import userRouter from './modules/User/user.router';
import transactionsRouter from './modules/Transaction/transaction.routes';
import settingsRouter from './modules/Settings/settings.routes';
import qrSessionRouter from './modules/QrSession/qrSession.routes';
import notificationsRouter from './modules/Notification/notification.routes';
import logsRouter from './modules/Log/log.routes';
import employeesRouter from './modules/Employee/employee.routes';
import clientsRouter from './modules/Client/client.routes';
import categoriesRouter from './modules/Category/category.routes';
import attendanceRouter from './modules/Attendance/attendance.routes';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// @ts-ignore
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from 'utils/swagger';
/**
 * Initialize Express application
 */
const app = express();

/**
 * Apply security and utility middleware
 * - Helmet: Secures HTTP headers
 * - CORS: Enables Cross-Origin Resource Sharing
 * - JSON Parser: Handles JSON payloads
 * - URL Encoded: Handles form data
 * - Cookie Parser: Manages cookies
 * - Mongo Sanitize: Prevents NoSQL injection attacks
 * - XSS Clean: Sanitizes input to prevent Cross-Site Scripting
 * - Morgan: HTTP request logger
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan(process.env.ENVIRONMENT === 'development' ? 'dev' : 'combined'));

/**
 * Rate limiting configuration
 * Limits requests to 100 per 15 minutes window
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// setupSwagger(app);
/**
 * Route configurations
 */
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/transactions', transactionsRouter);
app.use('/settings', settingsRouter);
app.use('/qr-session', qrSessionRouter);
app.use('/notifications', notificationsRouter);
app.use('/logs', logsRouter);
app.use('/employees', employeesRouter);
app.use('/clients', clientsRouter);
app.use('/categories', categoriesRouter);
app.use('/attendance', attendanceRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Global error handlers
 * - 404 Not Found handler for undefined routes
 * - Global error handler for all other errors
 */
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Page Not Found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});

export default app;

/**
 * Route handler for numeric IDs
 * Currently returns 404 as implementation is pending
 */
app.get('/:id(\\d+)', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Handler not implemented' });
});
