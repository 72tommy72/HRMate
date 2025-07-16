import nodemailer from "nodemailer";

/**
 * Sends an email using nodemailer
 * @param to - Recipient email address
 * @param subject - Email subject line
 * @param html - HTML content of the email
 * @returns Promise<boolean> - Returns true if email was sent successfully, false otherwise
 */
export const sendEmail = async ({ 
    to, 
    subject, 
    html 
}: { 
    to: string; 
    subject: string; 
    html: string 
}): Promise<boolean> => {
    // Configure email transport settings
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: process.env.ENVIROMENT === "development" ? 587 : 456,
        secure: process.env.ENVIROMENT === "development" ? false : true,
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    try {
        // Send email with configured transport
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html,
        });

        // Return true if email was accepted by the server
        return info.accepted.length > 0;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};
