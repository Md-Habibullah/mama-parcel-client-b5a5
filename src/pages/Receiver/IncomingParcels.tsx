import { useState } from "react";
import {
    useGetIncomingParcelsQuery,
    useConfirmDeliveryMutation,
    useReturnParcelMutation
} from "@/redux/features/parcel/parcel.api";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Swal from "sweetalert2";
import type { IParcel } from "@/types";
import type { IUserSummary, ParcelStatus } from "@/types/parcel.type";
import { Package, CheckCircle2, RotateCcw } from "lucide-react";

export default function IncomingParcels() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, error } = useGetIncomingParcelsQuery({ page, limit });
    const [confirmDelivery] = useConfirmDeliveryMutation();
    const [returnParcel] = useReturnParcelMutation();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">Failed to load incoming parcels</div>;
    }

    const allParcels: IParcel[] = data?.data || [];
    const parcels = allParcels.filter(
        (parcel) => parcel.currentStatus !== 'REQUESTED' && parcel.currentStatus !== 'CANCELED'
    );

    const restrictedStatuses = ["REQUESTED", "APPROVED", "RETURNED", "DISPATCHED", "CANCELED"];
    const totalItems = data?.meta?.total || 0;
    const totalPages = data?.meta?.totalPage || 1;
    const shouldShowPagination = totalItems > limit;

    const getStatusColor = (status: ParcelStatus) => {
        switch (status) {
            case "REQUESTED": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
            case "APPROVED": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
            case "DISPATCHED": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
            case "IN_TRANSIT": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
            case "DELIVERED": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
            case "RETURNED": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
            case "CANCELED": return "bg-red-200 text-red-900 dark:bg-red-800/50 dark:text-red-100";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
        }
    };

    const getPaginationRange = () => {
        const range = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) range.push(i);
        } else {
            if (page <= 3) {
                for (let i = 1; i <= 4; i++) range.push(i);
                range.push('...', totalPages);
            } else if (page >= totalPages - 2) {
                range.push(1, '...');
                for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
            } else {
                range.push(1, '...');
                for (let i = page - 1; i <= page + 1; i++) range.push(i);
                range.push('...', totalPages);
            }
        }
        return range;
    };

    const handleConfirm = async (id: string) => {
        const result = await Swal.fire({
            title: "Confirm Delivery?",
            text: "Are you sure you have received this parcel?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            try {
                await confirmDelivery(id).unwrap();
                Swal.fire("Confirmed!", "Parcel marked as delivered.", "success");
            } catch {
                Swal.fire("Error!", "Failed to confirm delivery.", "error");
            }
        }
    };

    const handleReturn = async (id: string) => {
        const result = await Swal.fire({
            title: "Confirm Return?",
            text: "Are you sure you want to return the parcel?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            try {
                await returnParcel(id).unwrap();
                Swal.fire("Confirmed!", "Parcel Returned.", "success");
            } catch {
                Swal.fire("Error!", "Failed to return parcel.", "error");
            }
        }
    };

    return (
        <Card className="mx-3 sm:mx-12 my-8 shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Incoming Parcels</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Confirm or return your incoming parcels
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-700">
                            <TableRow>
                                <TableHead>Tracking ID</TableHead>
                                <TableHead>Sender Name</TableHead>
                                <TableHead>Sender Email</TableHead>
                                <TableHead>Type / Weight</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead className="text-center">Confirm</TableHead>
                                <TableHead className="text-center">Return</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parcels.map(parcel => {
                                const isDisabled = restrictedStatuses.includes(parcel.currentStatus);
                                return (
                                    <TableRow key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <TableCell className="font-mono">{parcel.trackingId}</TableCell>
                                        <TableCell>{(parcel.sender as IUserSummary)?.name || "N/A"}</TableCell>
                                        <TableCell>{(parcel.sender as IUserSummary)?.email || "N/A"}</TableCell>
                                        <TableCell>{parcel.parcelType} / {parcel.weight}kg</TableCell>
                                        <TableCell>
                                            <Badge className={`w-28 justify-center border ${getStatusColor(parcel.currentStatus)}`}>
                                                {parcel.currentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-green-600 dark:text-green-400">${parcel.fee}</TableCell>
                                        <TableCell className="text-center">
                                            {parcel.currentStatus === "DELIVERED" ? (
                                                <Badge className="bg-green-600 text-white">Confirmed</Badge>
                                            ) : (
                                                <Button size="sm" variant="outline" disabled={isDisabled} className="gap-1"
                                                    onClick={() => !isDisabled && handleConfirm(parcel._id)}>
                                                    <CheckCircle2 className="h-4 w-4" /> Confirm
                                                </Button>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {parcel.currentStatus === "RETURNED" ? (
                                                <Badge className="bg-red-600 text-white">Returned</Badge>
                                            ) : (
                                                <Button size="sm" variant="outline" className="gap-1"
                                                    onClick={() => handleReturn(parcel._id)}>
                                                    <RotateCcw className="h-4 w-4" /> Return
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {parcels.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-12 text-gray-500 dark:text-gray-400">
                                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                        <p className="text-lg font-medium">No incoming parcels found</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Cards */}
                <div className="block md:hidden space-y-4 mt-4">
                    {parcels.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-lg font-medium">No incoming parcels found</p>
                        </div>
                    ) : (
                        parcels.map(parcel => {
                            const isDisabled = restrictedStatuses.includes(parcel.currentStatus);
                            return (
                                <div key={parcel._id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-sm font-semibold">{parcel.trackingId}</span>
                                        <Badge className={`w-28 justify-center border ${getStatusColor(parcel.currentStatus)}`}>
                                            {parcel.currentStatus}
                                        </Badge>
                                    </div>

                                    <div className="text-sm space-y-1 text-gray-800 dark:text-gray-200">
                                        <p className="font-medium text-base">{(parcel.sender as IUserSummary)?.name || "N/A"}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{(parcel.sender as IUserSummary)?.email || "N/A"}</p>
                                        <p><span className="font-medium">Type:</span> {parcel.parcelType} / {parcel.weight}kg</p>
                                        <p className="font-semibold text-green-600 dark:text-green-400 mt-2">Fee: ${parcel.fee}</p>
                                    </div>

                                    <div className="flex justify-between mt-3">
                                        {parcel.currentStatus === "DELIVERED" ? (
                                            <Badge className="bg-green-600 text-white">Confirmed</Badge>
                                        ) : (
                                            <Button size="sm" variant="outline" disabled={isDisabled}
                                                onClick={() => !isDisabled && handleConfirm(parcel._id)}
                                                className="flex-1 mr-2 gap-1">
                                                <CheckCircle2 className="h-4 w-4" /> Confirm
                                            </Button>
                                        )}

                                        {parcel.currentStatus === "RETURNED" ? (
                                            <Badge className="bg-red-600 text-white">Returned</Badge>
                                        ) : (
                                            <Button size="sm" variant="outline"
                                                onClick={() => handleReturn(parcel._id)}
                                                className="flex-1 ml-2 gap-1">
                                                <RotateCcw className="h-4 w-4" /> Return
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                {shouldShowPagination && parcels.length > 0 && (
                    <div className="flex flex-col items-center p-6 gap-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            {getPaginationRange().map((num, idx) =>
                                num === '...' ? (
                                    <span key={idx} className="px-2">...</span>
                                ) : (
                                    <Button key={idx} variant={page === num ? "default" : "outline"} size="sm"
                                        onClick={() => setPage(num as number)}>
                                        {num}
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
