import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Pendings = lazy(() => import("@/pages/Sender/PendingParcels"));
const Parcels = lazy(() => import("@/pages/Sender/Parcels"));
const Profile = lazy(() => import("@/pages/Profile"));

export const senderSidebarItems: ISidebarItem[] = [
    {
        title: "Parcels",
        items: [
            { title: "Pendings", url: "/sender/pendings", component: Pendings },
            { title: "My Parcels", url: "/sender/parcels", component: Parcels },
        ],
    },
    {
        title: "Account",
        items: [
            { title: "Profile", url: "/sender/profile", component: Profile },
        ],
    },
];
