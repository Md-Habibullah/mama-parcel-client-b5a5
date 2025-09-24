import { baseApi } from "@/redux/baseApi";
import type { ICreateParcel, IParcel, IParcelStats, IResponse, IUpdateParcelStatus } from "@/types";
import type { GetAllParcelsQuery, GetIncomingParcelsQuery, GetMyParcelsQuery, IResponseWithMeta } from "@/types/parcel.type";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //* Sender
        createParcel: builder.mutation<IResponse<IParcel>, ICreateParcel>({
            query: (data) => ({ url: "/parcel", method: "POST", data }),
            invalidatesTags: ["PARCEL"],
        }),
        cancelParcel: builder.mutation<IResponse<IParcel>, string>({
            query: (id) => ({ url: `/parcel/cancel/${id}`, method: "PATCH" }),
            invalidatesTags: ["PARCEL"],
        }),
        // getMyParcels: builder.query<IResponse<IParcel[]>, void>({
        //     query: () => ({ url: "/parcel/my-parcels", method: "GET" }),
        //     providesTags: ["PARCEL"],
        // }),
        getMyParcels: builder.query<{
            data: IParcel[];
            meta: { page: number; limit: number; total: number; totalPage: number };
        }, GetMyParcelsQuery>({
            query: (params) => ({
                url: "/parcel/my-parcels",
                method: "GET",
                params,
            }),
            providesTags: ["PARCEL"],
        }),

        findUserByEmail: builder.query<IResponse<{ _id: string; name: string; email: string }>, string>({
            query: (email) => ({ url: `/parcel/find-by-email/${email}`, method: "GET" }),
            providesTags: ["PARCEL"],
        }),

        //* Receiver
        // getIncomingParcels: builder.query<IResponse<IParcel[]>, void>({
        //     query: () => ({ url: "/parcel/incoming", method: "GET" }),
        //     providesTags: ["PARCEL"],
        // }),
        getIncomingParcels: builder.query<IResponseWithMeta<IParcel>, GetIncomingParcelsQuery>({
            query: (params) => ({
                url: "/parcel/incoming",
                method: "GET",
                params, // page, limit, searchTerm, sort, etc.
            }),
            providesTags: ["PARCEL"],
        }),

        confirmDelivery: builder.mutation<IResponse<IParcel>, string>({
            query: (id) => ({ url: `/parcel/confirm-delivery/${id}`, method: "PATCH" }),
            invalidatesTags: ["PARCEL"],
        }),
        getDeliveryHistory: builder.query<IResponse<IParcel[]>, void>({
            query: () => ({ url: "/parcel/history", method: "GET" }),
            providesTags: ["PARCEL"],
        }),

        //* Admin
        // getAllParcels: builder.query<IResponse<IParcel[]>, void>({
        //     query: () => ({ url: "/parcel/all-parcels", method: "GET" }),
        //     providesTags: ["PARCEL"],
        // }),
        getAllParcels: builder.query<{
            data: IParcel[];
            meta: { page: number; limit: number; total: number; totalPage: number };
        }, GetAllParcelsQuery>({
            query: (params) => ({
                url: "/parcel/all-parcels",
                method: "GET",
                params, // page, limit, searchTerm, sort etc.
            }),
            providesTags: ["PARCEL"],
        }),

        updateParcelStatus: builder.mutation<IResponse<IParcel>, IUpdateParcelStatus>({
            query: ({ id, status, note }) => ({ url: `/parcel/status/${id}`, method: "PATCH", data: { status, note } }),
            invalidatesTags: ["PARCEL"],
        }),
        blockOrUnblockParcel: builder.mutation<IResponse<IParcel>, string>({
            query: (id) => ({ url: `/parcel/block/${id}`, method: "PATCH" }),
            invalidatesTags: ["PARCEL"],
        }),

        getStats: builder.query<IResponse<IParcelStats>, void>({
            query: () => ({ url: "/parcel/stats", method: "GET" }),
            providesTags: ["PARCEL"],
        }),

        //* General / All
        getParcelById: builder.query<IResponse<IParcel>, string>({
            query: (id) => ({ url: `/parcel/${id}`, method: "GET" }),
            providesTags: ["PARCEL"],
        }),

        trackParcel: builder.query<IResponse<IParcel>, string>({
            query: (trackingId) => ({ url: `/parcel/track/${trackingId}`, method: "GET" }),
            providesTags: ["PARCEL"],
        }),

        //* Admin & Receiver
        returnParcel: builder.mutation<IResponse<IParcel>, string>({
            query: (id) => ({ url: `/parcel/return/${id}`, method: "PATCH" }),
            invalidatesTags: ["PARCEL"],
        }),
    }),
});

export const {
    //* Sender
    useCreateParcelMutation,
    useCancelParcelMutation,
    useGetMyParcelsQuery,
    useLazyFindUserByEmailQuery,

    //* Receiver
    useGetIncomingParcelsQuery,
    useConfirmDeliveryMutation,
    useGetDeliveryHistoryQuery,

    //* Admin
    useGetAllParcelsQuery,
    useUpdateParcelStatusMutation,
    useBlockOrUnblockParcelMutation,
    useGetStatsQuery,

    //* General
    useGetParcelByIdQuery,
    // useTrackParcelQuery,
    useLazyTrackParcelQuery,

    //* Admin & Receiver
    useReturnParcelMutation,
} = parcelApi;
