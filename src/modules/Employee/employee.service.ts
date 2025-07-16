import { Request } from "express";
import { Employee } from "./employee.model";

/**
 * Employee service layer implementation
 * Handles all business logic for employee-related operations
 */

/**
 * Retrieves all employees with pagination, sorting and search capabilities
 * @param req Express Request object containing query parameters
 * @returns Object containing employee data and metadata
 */
export async function getAllEmployeesService(req: Request) {
    // Extract and parse query parameters
    const { page, limit, sortBy, sortOrder, search } = (req as any).query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const sortByField = sortBy as string || "createdAt";
    const sortOrderField = sortOrder as string || "desc";
    const searchQuery = search as string || "";
    const skip = (pageNumber - 1) * limitNumber;

    // Define search filter options
    const filterOptions = {
        $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
            { phone: { $regex: searchQuery, $options: "i" } },
        ],
    };

    // Fetch employees with pagination and sorting
    const employees = await Employee.find(filterOptions)
        .sort({ [sortByField]: sortOrderField === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limitNumber);

    if (employees.length === 0) {
        return { data: [], statusCode: 404 }
    }

    const totalEmployees = await Employee.countDocuments(filterOptions);

    return {
        data: employees,
        totalEmployees,
        page: pageNumber,
        limit: limitNumber,
        sortBy: sortByField,
        sortOrder: sortOrderField,
        search: searchQuery,
        statusCode: 200,
    };
}

/**
 * Retrieves a single employee by their ID
 * @param id Employee ID
 * @returns Object containing employee data or null if not found
 */
export async function getEmployeeByIdService(id: string) {
    const employee = await Employee.findById(id);
    if (!employee) {
        return { data: null, statusCode: 404 }
    }
    return { data: employee, statusCode: 200 };
}

/**
 * Creates a new employee record
 * @param req Express Request object containing employee data
 * @returns Object containing the created employee data
 */
export async function createEmployeeService(req: Request) {
    // Extract employee data from request body
    const {
        employeeNumber,
        name,
        email,
        phone,
        department,
        position,
        salary,
        startDate,
        endDate,
        status,
        bankAccount,
        nationalId,
        address,
        birthDate,
        gender,
        maritalStatus,
        emergencyContact,
        workSchedule,
        benefits,
        attendance,
        documents,
        notes,
    } = req.body;

    // Get creator information
    const createdBy = (req as any).user?._id || "system";

    // Create new employee record
    const newEmployee = await Employee.create({
        employeeNumber,
        name,
        email,
        phone,
        department,
        position,
        salary,
        startDate,
        endDate,
        status,
        bankAccount,
        nationalId,
        address,
        birthDate,
        gender,
        maritalStatus,
        emergencyContact,
        workSchedule,
        benefits,
        attendance,
        documents,
        notes,
        createdBy,
        createdAt: new Date(),
    });

    return { data: newEmployee, statusCode: 201 };
}

/**
 * Updates an existing employee record
 * @param req Express Request object containing updated employee data
 * @returns Object containing the updated employee data
 */
export async function updateEmployeeService(req: Request) {
    const { id } = req.params;
    
    // Extract update fields from request body
    const {
        employeeNumber,
        name,
        email,
        phone,
        department,
        position,
        salary,
        startDate,
        endDate,
        status,
        bankAccount,
        nationalId,
        address,
        birthDate,
        gender,
        maritalStatus,
        emergencyContact,
        workSchedule,
        benefits,
        attendance,
        documents,
        notes,
    } = req.body;

    const updatedBy = (req as any).user?._id || "system";

    // Update employee with only provided fields
    const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
            ...(employeeNumber && { employeeNumber }),
            ...(name && { name }),
            ...(email && { email }),
            ...(phone && { phone }),
            ...(department && { department }),
            ...(position && { position }),
            ...(salary && { salary }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(status && { status }),
            ...(bankAccount && { bankAccount }),
            ...(nationalId && { nationalId }),
            ...(address && { address }),
            ...(birthDate && { birthDate }),
            ...(gender && { gender }),
            ...(maritalStatus && { maritalStatus }),
            ...(emergencyContact && { emergencyContact }),
            ...(workSchedule && { workSchedule }),
            ...(benefits && { benefits }),
            ...(attendance && { attendance }),
            ...(documents && { documents }),
            ...(notes && { notes }),
            updatedBy,
            updatedAt: new Date(),
        },
        { new: true }
    );

    if (!updatedEmployee) {
        return { data: null, statusCode: 404 };
    }

    return { data: updatedEmployee, statusCode: 200 };
}

/**
 * Deletes an employee record
 * @param id Employee ID to delete
 * @returns Object containing the deleted employee data
 */
export async function deleteEmployeeService(id: string) {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
        return { data: null, statusCode: 404 }
    }
    return { data: deletedEmployee, statusCode: 200 };
}
