import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { role } from "@/constrants/role";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import type { TRole } from "@/types";
import { receiverSidebarItems } from "./receiverSIdebarItems";
import TrackParcel from "@/pages/TrackParcel";
import CreateParcel from "@/pages/Sender/CreateParcel";
import ParcelStatusLogs from "@/pages/Sender/StatusLog";
import EditProfile from "@/pages/EditProfile";
import Contact from "@/pages/Contact";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            { index: true, Component: Home },
            { path: "about", Component: About },
            { path: "contact", Component: Contact },
            { path: "create-parcel", Component: withAuth(CreateParcel, role.sender as TRole) },
            { path: "track", Component: TrackParcel },
            { path: "parcel/:id", element: <ParcelStatusLogs /> },
        ],
    },
    // Super Admin routes
    // {
    //     Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    //     path: "/superadmin",
    //     children: [
    //         { index: true, element: <Navigate to="/admin/analytics" /> },
    //         ...generateRoutes(adminSidebarItems),
    //     ],
    // },

    {
        Component: withAuth(DashboardLayout, [role.superAdmin as TRole, role.admin as TRole]),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItems),
        ],
    },

    // Sender routes
    {
        Component: withAuth(DashboardLayout, role.sender as TRole),
        path: "/sender",
        children: [
            { index: true, element: <Navigate to="/sender/parcels" /> },
            ...generateRoutes(senderSidebarItems),
        ],
    },

    // Receiver routes
    {
        Component: withAuth(DashboardLayout, role.receiver as TRole),
        path: "/receiver",
        children: [
            { index: true, element: <Navigate to="/receiver/parcels" /> },
            ...generateRoutes(receiverSidebarItems),
        ],
    },

    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    { path: "/update-profile", Component: EditProfile },
    { path: "/unauthorized", Component: Unauthorized },
]);
