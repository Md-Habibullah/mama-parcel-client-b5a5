import { baseApi } from "@/redux/baseApi";
// import type { IResponse, IUser } from "@/types";
// import type { IUpdateUser } from "@/types/user.type";
// import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"],
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo,
            }),
        }),

        // updateUserProfile: builder.mutation<IResponse<IUser>, IUpdateUser>({
        //     query: ({ id, ...payload }) => ({
        //         url: `/user/${id}`,
        //         method: 'PATCH',
        //         body: payload,
        //     }),
        //     invalidatesTags: ['USER'],
        // }),

        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),

        // sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
        //     query: (userInfo) => ({
        //         url: "/otp/send",
        //         method: "POST",
        //         data: userInfo,
        //     }),
        // }),
        // verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
        //     query: (userInfo) => ({
        //         url: "/otp/verify",
        //         method: "POST",
        //         data: userInfo,
        //     }),
        // }),

    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogoutMutation,
    // useUpdateUserProfileMutation,
    // useSendOtpMutation,
    // useVerifyOtpMutation,
} = authApi;