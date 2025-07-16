// attendance.utils.ts

/**
 * Calculates the total working hours between check-in and check-out times
 * @param checkIn - Check-in time in "HH:mm" format
 * @param checkOut - Check-out time in "HH:mm" format
 * @returns Number of hours as a decimal value
 */
export function calculateWorkingHours(checkIn: string, checkOut: string): number {
    const [inHour, inMinute] = checkIn.split(":").map(Number);
    const [outHour, outMinute] = checkOut.split(":").map(Number);

    const start = new Date();
    start.setHours(inHour, inMinute, 0, 0);

    const end = new Date();
    end.setHours(outHour, outMinute, 0, 0);

    const diffMs = end.getTime() - start.getTime();
    const hours = diffMs / (1000 * 60 * 60);

    // Ensure no negative values are returned
    return Math.max(0, +hours.toFixed(2));
}

/**
 * Checks if an employee is late based on check-in time
 * @param checkIn - Actual check-in time in "HH:mm" format
 * @param expectedTime - Expected arrival time in "HH:mm" format
 * @returns true if employee is late
 */
export function isLate(checkIn: string, expectedTime: string): boolean {
    const [inHour, inMinute] = checkIn.split(":").map(Number);
    const [expHour, expMinute] = expectedTime.split(":").map(Number);

    const checkInDate = new Date();
    checkInDate.setHours(inHour, inMinute, 0, 0);

    const expectedDate = new Date();
    expectedDate.setHours(expHour, expMinute, 0, 0);

    return checkInDate.getTime() > expectedDate.getTime();
}

/**
 * Validates if a given time string matches the "HH:mm" format
 * @param time - Time string to validate
 * @returns true if time format is valid
 */
export function isValidTimeFormat(time: string): boolean {
    return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time);
}
