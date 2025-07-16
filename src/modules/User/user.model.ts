import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'employee' | 'accountant';
    status: 'active' | 'inactive' | 'suspended';
    permissions: string[];
    employeeId?: string;
    profile?: {
        firstName: string;
        lastName: string;
        avatar?: string;
        phone?: string;
        language: 'ar' | 'en';
        timezone: string;
        dateFormat: string;
        timeFormat: '12h' | '24h';
    };
    security?: {
        lastLogin?: Date;
        lastLoginIP?: string;
        loginAttempts: number;
        isLocked: boolean;
        lockUntil?: Date;
        passwordChangedAt?: Date;
        mustChangePassword: boolean;
        twoFactorEnabled: boolean;
    };
    preferences?: {
        theme: 'light' | 'dark' | 'auto';
        notifications: {
            email: boolean;
            sms: boolean;
            whatsapp: boolean;
            inApp: boolean;
        };
        dashboard: {
            defaultView: string;
            autoRefresh: boolean;
            refreshInterval: number;
        };
    };
    sessions?: {
        id: string;
        token: string;
        device: string;
        ip: string;
        startedAt: Date;
        lastActiveAt: Date;
    }[];
    createdBy: string;
    updatedBy: string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'manager', 'employee', 'accountant'],
            default: 'employee',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active',
        },
        permissions: {
            type: [String],
            default: [],
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
        },
        profile: {
            firstName: String,
            lastName: String,
            avatar: String,
            phone: String,
            language: {
                type: String,
                enum: ['ar', 'en'],
                default: 'ar',
            },
            timezone: String,
            dateFormat: {
                type: String,
                default: 'DD/MM/YYYY',
            },
            timeFormat: {
                type: String,
                enum: ['12h', '24h'],
                default: '24h',
            },
        },
        security: {
            lastLogin: Date,
            lastLoginIP: String,
            loginAttempts: {
                type: Number,
                default: 0,
            },
            isLocked: {
                type: Boolean,
                default: false,
            },
            lockUntil: Date,
            passwordChangedAt: Date,
            mustChangePassword: {
                type: Boolean,
                default: false,
            },
            twoFactorEnabled: {
                type: Boolean,
                default: false,
            },
        },
        preferences: {
            theme: {
                type: String,
                enum: ['light', 'dark', 'auto'],
                default: 'light',
            },
            notifications: {
                email: { type: Boolean, default: true },
                sms: { type: Boolean, default: false },
                whatsapp: { type: Boolean, default: true },
                inApp: { type: Boolean, default: true },
            },
            dashboard: {
                defaultView: { type: String, default: 'overview' },
                autoRefresh: { type: Boolean, default: true },
                refreshInterval: { type: Number, default: 30 },
            },
        },
        sessions: [
            {
                id: String,
                token: String,
                device: String,
                ip: String,
                startedAt: Date,
                lastActiveAt: Date,
            },
        ],
        createdBy: {
            type: String,
            required: true,
            default: 'system',
        },
        updatedBy: {
            type: String,
            required: true,
            default: 'system',
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || model<IUser>('User', userSchema);