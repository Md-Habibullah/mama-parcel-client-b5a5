import type { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";
export type { IParcel, ICreateParcel, IParcelStats, IUpdateParcelStatus } from './parcel.type'
export type { IUser, IUpdateUserRole } from './user.type'

export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType;
    }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";
export type TIsActive = "ACTIVE" | "INACTIVE" | "BLOCKED";