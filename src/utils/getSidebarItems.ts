
import { role } from "@/constrants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSIdebarItems";
import { senderSidebarItems } from "@/routes/senderSidebarItems";
import { type TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.superAdmin:
            return [...adminSidebarItems];
        case role.admin:
            return [...adminSidebarItems];
        case role.sender:
            return [...senderSidebarItems];
        case role.receiver:
            return [...receiverSidebarItems];
        default:
            return [];
    }
};