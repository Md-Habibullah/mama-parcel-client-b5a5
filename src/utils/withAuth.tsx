import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole | TRole[]) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />;
        }

        // Handle multiple roles
        if (requiredRole && !isLoading) {
            const userRole = data?.data?.role;

            // If requiredRole is an array, check if user has any of the roles
            if (Array.isArray(requiredRole)) {
                if (!userRole || !requiredRole.includes(userRole)) {
                    return <Navigate to="/unauthorized" />;
                }
            }
            // If requiredRole is a single role, check exact match
            else if (userRole !== requiredRole) {
                return <Navigate to="/unauthorized" />;
            }
        }

        return <Component />;
    };
};