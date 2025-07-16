import { Request } from "express";
import { Log } from "./log.model";

/**
 * Log Service Implementation
 * This module handles all log-related operations including fetching, creating and analyzing logs
 */

/**
 * Retrieves all logs from the database
 * @param req - Express Request object
 * @returns Object containing status code, message and logs data
 */
export async function getAllLogsService(req: Request) {
    const logs = await Log.find();
    if (!logs) {
        return {
            statusCode: 404,
            message: "Logs not found",
            data: null,
        }
    }
    return {
        statusCode: 200,
        message: "Logs fetched successfully",
        data: logs,
    }
}

/**
 * Creates a new log entry in the database
 * @param req - Express Request object containing log details in body
 * @returns Object containing status code, success flag, message and created log data
 */
export async function createLogService(req: Request) {
    // Extract log details from request body with default values where applicable
    const {
        timestamp = new Date(),
        level,
        action,
        category = "other",
        user,
        userId,
        details,
        metadata,
        resource,
        changes,
        result,
        errorCode,
        errorMessage,
        duration,
        tags,
        severity = "low",
        isSystemGenerated = false,
        correlationId,
    } = req.body;

    // Create new log entry with extracted details
    const newLog = await Log.create({
        timestamp,
        level,
        action,
        category,
        user,
        userId,
        details,
        metadata,
        resource,
        changes,
        result,
        errorCode,
        errorMessage,
        duration,
        tags,
        severity,
        isSystemGenerated,
        correlationId,
    });

    return {
        statusCode: 201,
        success: true,
        message: "Log created successfully",
        data: newLog,
    };
}

/**
 * Generates statistical analysis of logs within a specified date range
 * @param req - Express Request object containing optional startDate and endDate in query
 * @returns Object containing status code, success flag, message and aggregated statistics
 */
export async function getLogsStatsService(req: Request) {
    const { startDate, endDate } = req.query;

    // Build match criteria for date filtering
    const match: any = {};

    if (startDate || endDate) {
        match.timestamp = {};
        if (startDate) match.timestamp.$gte = new Date(startDate as string);
        if (endDate) match.timestamp.$lte = new Date(endDate as string);
    }

    // Perform aggregation to get various statistics
    const stats = await Log.aggregate([
        { $match: match },
        {
            $facet: {
                levelCounts: [
                    { $group: { _id: "$level", count: { $sum: 1 } } },
                ],
                resultCounts: [
                    { $group: { _id: "$result", count: { $sum: 1 } } },
                ],
                severityCounts: [
                    { $group: { _id: "$severity", count: { $sum: 1 } } },
                ],
                total: [
                    { $count: "totalLogs" }
                ]
            }
        }
    ]);

    if (!stats) {
        return {
            statusCode: 404,
            message: "Logs not found",
            data: null,
        }
    }

    return {
        statusCode: 200,
        success: true,
        message: "Log statistics fetched successfully",
        data: stats[0],
    };
}
