export interface IUserSummary {
    _id: string;
    name: string;
    email: string;
}
export type ParcelStatus =
    | "REQUESTED"
    | "APPROVED"
    | "RETURNED"
    | "DISPATCHED"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "CANCELED";

export interface IParcel {
    _id: string;
    trackingId: string;
    sender: IUserSummary | string;
    receiver: IUserSummary | string;
    parcelType: string;
    weight: number;
    pickupAddress: string;
    deliveryAddress: string;
    fee: number;
    currentStatus: ParcelStatus;
    statusLogs?: Array<{
        updatedBy: string;
        status: ParcelStatus;
        note?: string;
        updatedAt?: string;
        timestamp?: string;
    }>;
    isBlocked?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateParcel {
    receiver: string;
    parcelType: string;
    weight: number;
    pickupAddress: string;
    deliveryAddress: string;
    fee: number;
}

export interface IParcelStats {
    totalUsers: number;
    totalParcels: number;
    pendingParcels: number;
    inTransit: number;
    delivered: number;
    canceled: number;
}




export interface IUpdateParcelStatus {
    id: string;
    status: string;
    note?: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface GetMyParcelsQuery {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sort?: string;
}

// export interface GetUsersQuery {
//     page?: number;
//     limit?: number;
//     searchTerm?: string;
// }

export interface GetAllParcelsQuery {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sort?: string;
}

export interface GetIncomingParcelsQuery {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sort?: string;
}

export interface IResponseWithMeta<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}
