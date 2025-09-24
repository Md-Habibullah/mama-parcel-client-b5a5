import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUpdateUserRole, IUser } from "@/types";
import type { IUpdateUser } from "@/types/user.type";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all users
        getUsers: builder.query<IResponse<IUser[]>, void>({
            query: () => ({ url: "/user/all-users", method: "GET" }), // updated to match backend
            providesTags: ["USER"],
        }),

        // Update user profile
        updateUserProfile: builder.mutation<IResponse<IUser>, IUpdateUser>({
            query: (payload) => ({
                url: `/user/${payload.id}`,
                method: 'PATCH',
                data: payload,
            }),
            invalidatesTags: ["USER"],
        }),

        // Block user
        blockUser: builder.mutation<IResponse<IUser>, string>({
            query: (id) => ({ url: `/user/block/${id}`, method: "PATCH" }),
            invalidatesTags: ["USER"],
        }),

        // Unblock user
        unblockUser: builder.mutation<IResponse<IUser>, string>({
            query: (id) => ({ url: `/user/unblock/${id}`, method: "PATCH" }),
            invalidatesTags: ["USER"],
        }),

        // Update user role
        updateUserRole: builder.mutation<IResponse<IUser>, IUpdateUserRole>({
            query: ({ id, role }) => ({ url: `/user/${id}`, method: "PATCH", data: { role } }),
            invalidatesTags: ["USER"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
    useUpdateUserRoleMutation,
    useUpdateUserProfileMutation
} = userApi;
