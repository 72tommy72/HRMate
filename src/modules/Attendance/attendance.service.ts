import { Request } from "express";
import { Attendance } from "./attendance.model";

/**
 * Service layer for handling employee attendance operations
 */

/**
 * Handles employee check-in process
 * @param user - Employee user object
 * @returns Response object with status and check-in details
 */
export async function checkInService(user: any) {
    // Set today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if employee already checked in today
    const alreadyCheckedIn = await Attendance.findOne({
        employeeId: user._id,
        date: today,
    });

    if (alreadyCheckedIn) {
        return {
            statusCode: 400,
            data: {
                success: false,
                message: "You have already checked in today",
            },
        };
    }

    // Get current time and set work start time (9:00 AM)
    const now = new Date();
    const workStartTime = new Date();
    workStartTime.setHours(9, 0, 0, 0);

    // Determine attendance status based on arrival time
    const status = now > workStartTime ? "late" : "present";

    // Create new attendance record
    const attendance = await Attendance.create({
        employeeId: user._id,
        date: today,
        checkIn: now.toTimeString().split(" ")[0],
        status,
    });

    return {
        statusCode: 200,
        data: {
            success: true,
            message: "Check-in successful",
            data: attendance,
        },
    };
}

/**
 * Handles employee check-out process
 * @param user - Employee user object
 * @returns Response object with status and check-out details
 */
export async function checkOutService(user: any) {
    // Set today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance record for the employee
    const attendance = await Attendance.findOne({
        employeeId: user._id,
        date: today,
    });

    if (!attendance) {
        return {
            statusCode: 404,
            data: {
                success: false,
                message: "You haven't checked in today",
            },
        };
    }

    if (attendance.checkOut) {
        return {
            statusCode: 400,
            data: {
                success: false,
                message: "You have already checked out",
            },
        };
    }

    // Calculate working hours
    const now = new Date();
    const checkInTime = new Date(today);
    const [hours, minutes] = attendance.checkIn?.split(":") || ["9", "0"];
    checkInTime.setHours(Number(hours), Number(minutes), 0, 0);

    const diffMs = now.getTime() - checkInTime.getTime();
    const workingHours = Number((diffMs / (1000 * 60 * 60)).toFixed(2));

    // Update attendance record with check-out details
    await Attendance.findByIdAndUpdate(attendance._id, {
        checkOut: now.toTimeString().split(" ")[0],
        workingHours,
        overtimeHours: workingHours > 8 ? workingHours - 8 : 0, // Calculate overtime if worked more than 8 hours
    });

    return {
        statusCode: 200,
        data: {
            success: true,
            message: "Check-out successful",
        },
    };
}

/**
 * Retrieves attendance records for the current user
 * @param req - Express Request object
 * @returns Response object with user's attendance records
 */
export async function getMyAttendanceService(req: Request) {
    const userId = (req as any).user?.id;
    const attendance = await Attendance.find({ userId });
    
    if (!attendance) {
        return {
            statusCode: 404,
            message: "User not found",
            data: { success: false },
        };
    }

    return {
        statusCode: 200,
        message: "User found",
        data: attendance
    };
}

/**
 * Retrieves all attendance records
 * @param req - Express Request object
 * @returns Response object with all attendance records
 */
export async function getAllAttendanceService(req: Request) {
    const attendance = await Attendance.find();
    
    if (!attendance) {
        return {
            statusCode: 404,
            message: "Employee not found",
            data: { success: false },
        };
    }

    return {
        statusCode: 200,
        message: "Employee found",
        data: attendance
    };
}

/**
 * Retrieves attendance records for a specific employee
 * @param req - Express Request object containing employeeId
 * @returns Response object with employee's attendance records
 */
export async function getAttendanceByEmployeeService(req: Request) {
    const { employeeId } = req.params;
    const attendance = await Attendance.find({ employeeId });
    
    if (!attendance) {
        return {
            statusCode: 404,
            message: "Employee not found",
            data: { success: false },
        };
    }

    return {
        statusCode: 200,
        message: "Employee found",
        data: attendance
    };
}