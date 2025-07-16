import Joi from "joi";

/**
 * Configuration for email validation
 * Ensures email has at least 2 domain segments and valid TLD
 */
const EMAIL_CONFIG = {
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
};

/**
 * Regular expression pattern for password validation
 * Allows alphanumeric characters with length between 3-30
 */
const PASSWORD_PATTERN = new RegExp("^[a-zA-Z0-9]{3,30}$");

/**
 * Schema for validating user registration data
 * Includes username, email, password and password confirmation
 */
export const registerSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()
        .description('Username must be 3-20 alphanumeric characters'),
    email: Joi.string()
        .email(EMAIL_CONFIG)
        .required()
        .description('Valid email address required'),
    password: Joi.string()
        .pattern(PASSWORD_PATTERN)
        .required()
        .description('Password must be 3-30 alphanumeric characters'),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .description('Must match password field'),
}).required();

/**
 * Schema for validating account activation
 */
export const activateSchema = Joi.object({
    activationCode: Joi.string()
        .required()
        .description('Activation code is required'),
}).required();

/**
 * Schema for validating user login credentials
 */
export const loginSchema = Joi.object({
    email: Joi.string()
        .email(EMAIL_CONFIG)
        .required()
        .description('Valid email address required'),
    password: Joi.string()
        .pattern(PASSWORD_PATTERN)
        .required()
        .description('Password must be 3-30 alphanumeric characters'),
}).required();

/**
 * Schema for validating forget password request
 */
export const forgetPasswordSchema = Joi.object({
    email: Joi.string()
        .email(EMAIL_CONFIG)
        .required()
        .description('Valid email address required'),
}).required();

/**
 * Schema for validating password reset request
 * Includes email, reset code, new password and confirmation
 */
export const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email(EMAIL_CONFIG)
        .required()
        .description('Valid email address required'),
    forgetCode: Joi.string()
        .required()
        .description('Password reset code is required'),
    password: Joi.string()
        .pattern(PASSWORD_PATTERN)
        .required()
        .description('Password must be 3-30 alphanumeric characters'),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .description('Must match password field'),
}).required();
