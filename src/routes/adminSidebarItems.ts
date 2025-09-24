import Profile from "@/pages/Profile";
import { type ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const ManageUsers = lazy(() => import("@/pages/Admin/Users"));
const ManageParcels = lazy(() => import("@/pages/Admin/Parcels"));

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            { title: "Analytics", url: "/admin/analytics", component: Analytics },
        ],
    },
    {
        title: "Management",
        items: [
            { title: "Users", url: "/admin/users", component: ManageUsers },
            { title: "Parcels", url: "/admin/parcels", component: ManageParcels },
        ],
    },
    {
        title: "Account",
        items: [
            { title: "Profile", url: "/admin/profile", component: Profile },
        ],
    },
];
