import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Parcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
const History = lazy(() => import("@/pages/Receiver/DeliveryHistory"));
const Profile = lazy(() => import("@/pages/Profile"));

export const receiverSidebarItems: ISidebarItem[] = [
    {
        title: "Deliveries",
        items: [
            { title: "My Parcels", url: "/receiver/parcels", component: Parcels },
            { title: "Delivery History", url: "/receiver/delivery-history", component: History },
        ],
    },
    {
        title: "Account",
        items: [
            { title: "Profile", url: "/receiver/profile", component: Profile },
        ],
    },
];
