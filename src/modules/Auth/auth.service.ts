/**
 * Authentication Service Module
 * Handles user authentication operations like registration, login, password reset etc.
 */

import bcrypt from "bcryptjs";
import crypto from "crypto";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";
import { signUpTemp, forgetCodeTemp } from "../../utils/generateHTML";
import { Auth } from "./auth.model";
import { Token } from "../../models/token.model";
import logger from "../../utils/logger";

/**
 * Handles new user registration
 * @param userName - User's name
 * @param email - User's email
 * @param password - User's password
 */
export async function registerService({
    userName,
    email,
    password,
}: {
    userName: string;
    email: string;
    password: string;
}) {
    // Check if user already exists
    const isAuth = await Auth.findOne({ email });

    if (isAuth) {
        // Handle existing unconfirmed user
        if (isAuth.isConfirmed) {
            return {
                statusCode: 400,
                data: { message: "User already exists" },
            };
        }

        // Update existing unconfirmed user
        isAuth.password = bcrypt.hashSync(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        isAuth.activationCode = crypto.randomBytes(64).toString("hex");
        await isAuth.save();

        // Generate confirmation link
        const link = `${process.env.ENVIROMENT === "development"
            ? process.env.DEV_URL
            : process.env.PRODUCTION_URL
            }/auth/confirmEmail/${isAuth.activationCode}`;

        // Send confirmation email
        const isEmailSent = await sendEmail({
            to: email,
            subject: "Confirmation Email",
            html: signUpTemp(link),
        });

        if (!isEmailSent) {
            return {
                statusCode: 500,
                data: {
                    success: false,
                    message: "Please try again later or contact support",
                },
            };
        }

        return {
            statusCode: 200,
            data: { success: true, message: "Check your email" },
        };
    }

    // Create new user
    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    );
    const activationCode = crypto.randomBytes(64).toString("hex");

    const user = await Auth.create({
        userName,
        email,
        password: hashedPassword,
        activationCode,
    });

    // Send confirmation email to new user
    const link = `${process.env.ENVIROMENT === "development"
        ? process.env.DEV_DOMAIN
        : process.env.PRODUCTION_DOMAIN
        }/auth/confirmEmail/${activationCode}`;
    const isEmailSent = await sendEmail({
        to: email,
        subject: "Confirmation Email",
        html: signUpTemp(link),
    });

    if (!isEmailSent) {
        return {
            statusCode: 500,
            data: {
                success: false,
                message: "Please try again later or contact support",
            },
        };
    }
    return {
        statusCode: 201,
        data: { success: true, message: "Activate your account", user },
    };
}

/**
 * Activates user account using activation code
 * @param activationCode - Account activation code
 */
export async function activateAccountService({
    activationCode,
}: {
    activationCode: string;
}) {
    const user = await Auth.findOneAndUpdate(
        { activationCode },
        {
            isConfirmed: true,
            $unset: { activationCode: 1 },
            new: true
        }
    );
    if (!user) {
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
}

/**
 * Handles user login
 * @param email - User's email
 * @param password - User's password
 */
export async function loginService({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await Auth.findOne({ email });
    if (!user) {
        logger.error("User not found");
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }

    if (!user.isConfirmed) {
        logger.error("Please activate your account")
        return {
            statusCode: 401,
            data: { message: "Please activate your account" },
        };
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        logger.error("Incorrect password");
        return {
            statusCode: 401,
            data: { message: "Incorrect password" },
        };
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    logger.info(`Login successful for user ${user._id}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Login successful", token },
    };
}

/**
 * Initiates password reset process
 * @param email - User's email
 */
export async function forgetPasswordService({
    email
}: { email: string }) {
    const user = await Auth.findOne({ email });
    if (!user) {
        logger.error("User not found");
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }

    // Generate reset code
    const code = randomstring.generate({
        length: 6,
        charset: "numeric",
    })
    user.forgetCode = code;
    await user.save();

    // Send reset code email
    const isEmailSent = await sendEmail({
        to: email,
        subject: "Forget Password",
        html: forgetCodeTemp(code),
    });

    if (!isEmailSent) {
        logger.error("Error sending email");
        return {
            statusCode: 500,
            data: {
                success: false,
                message: "Please try again later or contact support",
            }
        }
    }

    logger.info(`Forget password code sent to ${email}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Check your email" },
    }
}

/**
 * Resets user password using reset code
 * @param forgetCode - Password reset code
 * @param password - New password
 */
export async function resetPasswordService({
    forgetCode, password
}: { forgetCode: string, password: string }) {
    const user = await Auth.findOne({ forgetCode }, { $unset: { forgetCode: 1 } });
    if (!user) {
        logger.error("Code invalid");
        return {
            statusCode: 404,
            data: { message: "Code invalid" },
        };
    }

    // Update password
    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword;
    await user.save();

    // Invalidate existing tokens
    await Token.deleteMany({ user: user._id });

    logger.info(`Password changed for user ${user._id}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Password changed successfully" },
    }
}

/**
 * Retrieves user information
 * @param userId - User ID
 */
export async function getUserService({
    userId
}: { userId: string }) {
    const user = await Auth.findById({ user: userId });
    logger.info("User information retrieved successfully")
    return {
        statusCode: 200,
        data: { success: true, message: "User information retrieved", user },
    }
}

/**
 * Handles user logout
 * @param userId - User ID
 */
export async function logoutService({
    userId
}: { userId: string }) {
    await Token.deleteMany({ user: userId });
    logger.info(`Logout successful for user ${userId}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Logout successful" },
    }
}