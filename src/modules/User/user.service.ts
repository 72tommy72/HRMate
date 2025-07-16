import { Request } from "express";
import bcrypt from "bcryptjs";
import { User } from "./user.model";

/**
 * Service layer for user-related operations
 */

/**
 * Creates a new user in the system
 * @param req Express Request object containing user data
 * @returns Object with created user data and status
 */
export async function addUserService(req: Request) {
    const {
        username,
        email,
        password,
        role,
        status,
        permissions,
        employeeId,
        profile,
        security,
        preferences,
        createdBy,
    } = req.body;

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        status,
        permissions,
        employeeId,
        profile,
        security,
        preferences,
        createdBy: createdBy || "system",
        updatedBy: createdBy || "system",
    });

    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    return {
        message: "User created",
        statusCode: 201,
        success: true,
        data: userObject,
    };
}

/**
 * Retrieves all users with pagination and filtering options
 * @param req Express Request object containing query parameters
 * @returns Object with filtered users list and status
 */
export async function getAllUsersService(req: Request) {
    const { page, limit, search, status, role, permission } = req.query;

    // Build query filters
    const query: any = {};

    if (search) {
        query.$or = [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    if (status) query.status = status;
    if (role) query.role = role;
    if (permission) query.permissions = { $in: [permission] };

    // Handle pagination
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const users = await User.find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    if (users.length === 0) {
        return {
            statusCode: 404,
            message: "No users found",
            success: false,
        };
    }

    return {
        message: "Users found",
        statusCode: 200,
        success: true,
        data: users,
    };
}

/**
 * Retrieves a single user by ID
 * @param req Express Request object containing user ID
 * @returns Object with user data and status
 */
export async function getUserService(req: Request) {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
        return {
            statusCode: 404,
            message: "No user found",
            success: false,
        };
    }

    return {
        message: "User found",
        statusCode: 200,
        success: true,
        data: user,
    };
}

/**
 * Updates user information
 * @param req Express Request object containing update data
 * @returns Object with updated user data and status
 */
export async function updateUserService(req: Request) {
    const { id } = req.params;
    const {
        username,
        email,
        password,
        role,
        status,
        permissions,
        isLocked,
        employeeId,
        profile,
        security,
        preferences,
        updatedBy,
    } = req.body;

    // Build update object with provided fields
    const updateData: any = {
        ...(username && { username }),
        ...(email && { email }),
        ...(role && { role }),
        ...(status && { status }),
        ...(permissions && { permissions }),
        ...(isLocked !== undefined && { "security.isLocked": isLocked }),
        ...(employeeId && { employeeId }),
        ...(profile && { profile }),
        ...(security && { security }),
        ...(preferences && { preferences }),
        updatedBy: updatedBy || "system",
        updatedAt: new Date(),
    };

    // Hash password if provided
    if (password) {
        updateData.password = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
        return {
            statusCode: 404,
            success: false,
            message: 'User not found',
            data: null,
        };
    }

    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    return {
        statusCode: 200,
        success: true,
        message: 'User updated successfully',
        data: userObject,
    };
}

/**
 * Updates user password
 * @param req Express Request object containing new password
 * @returns Object with status of password update
 */
export async function updateUserPasswordService(req: Request) {
    const { id } = req.params;
    const { password } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
        return {
            statusCode: 404,
            message: "No user found",
            success: false,
            data: null
        };
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    user.password = hashedPassword;
    await user.save();

    return {
        statusCode: 200,
        message: "Password updated",
        success: true,
        data: user
    };
}

/**
 * Updates user lock status
 * @param req Express Request object containing lock status
 * @returns Object with updated lock status
 */
export async function updateUserLockService(req: Request) {
    const { id } = req.params;
    const { isLocked } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
        return {
            statusCode: 404,
            message: "No user found",
            success: false,
            data: null
        };
    }

    user.isLocked = isLocked;
    await user.save();

    return {
        statusCode: 200,
        message: "User locked status updated",
        success: true,
        data: user
    };
}

/**
 * Resets user sessions
 * @param req Express Request object containing user ID
 * @returns Object with status of session reset
 */
export async function resetUserSessionsService(req: Request) {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
        return {
            statusCode: 404,
            message: "No user found",
            success: false,
            data: null
        };
    }

    user.sessions = [];
    await user.save();

    return {
        statusCode: 200,
        message: "User sessions reset",
        success: true,
        data: user
    };
}

/**
 * Deletes a user from the system
 * @param req Express Request object containing user ID
 * @returns Object with deletion status
 */
export async function deleteUserService(req: Request) {
    const { id } = req.params;
    
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return {
            statusCode: 404,
            message: "No user found",
            success: false,
            data: null
        };
    }

    return {
        statusCode: 200,
        message: "User deleted",
        success: true,
        data: user
    };
}