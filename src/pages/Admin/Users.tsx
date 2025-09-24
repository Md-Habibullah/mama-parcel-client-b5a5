import { useState } from "react";
import {
    useGetUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
    useUpdateUserRoleMutation,
} from "@/redux/features/user/user.api";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { IUser, TRole } from "@/types";
import { Search, Shield, UserX, UserCheck, Users } from "lucide-react";

export default function AdminUsers() {
    const [search, setSearch] = useState("");
    const { data, isLoading, error } = useGetUsersQuery();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();

    const filteredUsers: IUser[] | undefined = data?.data?.filter(
        user =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleBlock = async (user: IUser) => {
        if (user.role === "SUPER_ADMIN") {
            toast.error("You cannot block the Super Admin");
            return;
        }
        try {
            await blockUser(user._id).unwrap();
            toast.success(`${user.name} blocked successfully`);
        } catch {
            toast.error("Failed to block user");
        }
    };

    const handleUnblock = async (user: IUser) => {
        if (user.role === "SUPER_ADMIN") {
            toast.error("You cannot unblock the Super Admin");
            return;
        }
        try {
            await unblockUser(user._id).unwrap();
            toast.success(`${user.name} unblocked successfully`);
        } catch {
            toast.error("Failed to unblock user");
        }
    };

    const handleRoleChange = async (user: IUser, role: TRole) => {
        if (user.role === "SUPER_ADMIN") {
            toast.error("You cannot change the role of the Super Admin");
            return;
        }
        try {
            await updateUserRole({ id: user._id, role }).unwrap();
            toast.success(`${user.name} role updated to ${role}`);
        } catch {
            toast.error("Role update failed");
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center py-8">Failed to load users</div>;

    return (
        <div className="space-y-6 m-4">
            {/* Header Section */}
            <div className="md:pl-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage all users and their permissions
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid px-12 pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.data?.length || 0}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {data?.data?.filter(u => u.isActive === "ACTIVE").length || 0}
                                </p>
                            </div>
                            <UserCheck className="h-8 w-8 text-green-500 dark:text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-600 dark:text-red-400">Blocked Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {data?.data?.filter(u => u.isActive === "BLOCKED").length || 0}
                                </p>
                            </div>
                            <UserX className="h-8 w-8 text-red-500 dark:text-red-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Admins</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {data?.data?.filter(u => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length || 0}
                                </p>
                            </div>
                            <Shield className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table Card */}
            <Card className="md:px-8 md:mx-12 shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="py-2 text-xl font-bold text-gray-900 dark:text-white">
                                Users List
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Manage user roles and status
                            </CardDescription>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search users..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-700">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">User</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Email</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Role</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers?.map(user => (
                                    <TableRow key={user._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                                                <span className="text-gray-500 dark:text-gray-400 text-xs font-mono">{user._id.slice(-8)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-900 dark:text-white">{user.email}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={user.role}
                                                onValueChange={(role: TRole) => handleRoleChange(user, role)}
                                                disabled={user.role === "SUPER_ADMIN"}
                                            >
                                                <SelectTrigger className="w-32 border-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SENDER">Sender</SelectItem>
                                                    <SelectItem value="RECEIVER">Receiver</SelectItem>
                                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.isActive === "BLOCKED"
                                                        ? "destructive"
                                                        : user.isActive === "ACTIVE"
                                                            ? "default"
                                                            : "secondary"
                                                }
                                                className="capitalize"
                                            >
                                                {user.isActive.toLowerCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {user.isActive === "BLOCKED" ? (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleUnblock(user)}
                                                    disabled={user.role === "SUPER_ADMIN"}
                                                    className="gap-2"
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                    Unblock
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleBlock(user)}
                                                    disabled={user.role === "SUPER_ADMIN"}
                                                    className="gap-2"
                                                >
                                                    <UserX className="h-4 w-4" />
                                                    Block
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredUsers?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                            <p className="text-lg font-medium">No users found</p>
                                            <p className="text-sm">Try adjusting your search criteria</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}