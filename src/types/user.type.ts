import type { TIsActive, TRole } from ".";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: TRole;
    phone?: string;
    address?: string;
    isDeleted: boolean;
    isActive: TIsActive;
    isBlocked: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUpdateUserRole {
    id: string;
    role: TRole;
}

export interface IUpdateUser {
    id?: string;
    name?: string;
    password?: string;
    phone?: string;
    address?: string;
}