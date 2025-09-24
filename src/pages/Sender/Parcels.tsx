import { useState } from "react";
import { useGetMyParcelsQuery } from "@/redux/features/parcel/parcel.api";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";
import type { IParcel } from "@/types";
import { useNavigate } from "react-router";

export default function Parcels() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading, error } = useGetMyParcelsQuery({ page, limit });
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">Failed to load parcels</div>;
    }

    const allParcels: IParcel[] = data?.data || [];
    const parcels: IParcel[] = allParcels.filter(parcel => parcel.currentStatus !== "REQUESTED");

    const handleStatusLogs = (id: string) => {
        navigate(`/parcel/${id}`);
    };

    const totalPages = data?.meta.totalPage || 1;
    const totalItems = data?.meta.total || 0;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED": return "bg-blue-100 text-blue-800 border-blue-300";
            case "DISPATCHED": return "bg-purple-100 text-purple-800 border-purple-300";
            case "IN_TRANSIT": return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "DELIVERED": return "bg-green-100 text-green-800 border-green-300";
            case "RETURNED": return "bg-red-100 text-red-800 border-red-300";
            case "CANCELED": return "bg-red-200 text-red-900 border-red-400";
            default: return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    return (
        <div className="m-4 space-y-6">
            {/* Header */}
            <div className="md:px-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Parcels</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    View all your parcels and track their status in real-time
                </p>
            </div>

            {/* Parcels Table */}
            <Card className="px-8 md:mx-12 shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                    <div>
                        <CardTitle className="py-2 text-xl font-bold text-gray-900 dark:text-white">
                            My Parcels List
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Click on "Status Logs" to view parcel history
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-700">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Tracking ID</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Type</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Weight</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Fee</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {parcels.map(parcel => (
                                    <TableRow
                                        key={parcel._id}
                                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <TableCell className="font-mono font-semibold text-gray-900 dark:text-white">
                                            {parcel.trackingId}
                                        </TableCell>
                                        <TableCell className="text-gray-900 dark:text-white">{parcel.parcelType}</TableCell>
                                        <TableCell className="text-gray-900 dark:text-white">{parcel.weight} kg</TableCell>
                                        <TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={`border ${getStatusColor(parcel.currentStatus)} w-32 text-center px-2 py-1 text-sm truncate`}
                                                >
                                                    {parcel.currentStatus}
                                                </Badge>
                                            </TableCell>
                                        </TableCell>
                                        <TableCell className="font-semibold text-green-600 dark:text-green-400">
                                            ${parcel.fee}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-28"
                                                onClick={() => handleStatusLogs(parcel._id)}
                                            >
                                                Status Logs
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {parcels.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-gray-500 dark:text-gray-400">
                                            <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                            <p className="text-lg font-medium">No parcels found</p>
                                            <p className="text-sm">Try again later</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalItems > limit && (
                        <div className="flex flex-col sm:flex-row items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700">
                            {/* <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems} parcels
                            </div> */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="gap-1"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <span className="text-gray-800 dark:text-gray-200">
                                    Page {page} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="gap-1"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
