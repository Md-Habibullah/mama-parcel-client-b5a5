import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDeliveryHistoryQuery } from "@/redux/features/parcel/parcel.api";
import { Badge } from "@/components/ui/badge";
import type { IParcel } from "@/types";
import type { IUserSummary, ParcelStatus } from "@/types/parcel.type";
import { Package } from "lucide-react";

export default function DeliveryHistory() {
    const { data, isLoading, error } = useGetDeliveryHistoryQuery();
    const parcels: IParcel[] = data?.data || [];

    // ✅ Status badge colors
    const getStatusColor = (status: ParcelStatus) => {
        switch (status) {
            case "DELIVERED": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
            case "IN_TRANSIT": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
            case "RETURNED": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
            case "CANCELED": return "bg-red-200 text-red-900 dark:bg-red-800/50 dark:text-red-100";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
        }
    };

    if (isLoading) return <Skeleton className="h-80 w-full rounded-xl" />;
    if (error) return <div className="text-red-500 text-center">Failed to load delivery history.</div>;

    return (
        <Card className="mx-3 sm:mx-12 my-8 shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Delivery History
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <Table className="w-full">
                        <TableHeader className="bg-gray-50 dark:bg-gray-700">
                            <TableRow>
                                <TableHead>Tracking ID</TableHead>
                                <TableHead>Sender Name</TableHead>
                                <TableHead>Sender Email</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead>Pickup / Delivery</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parcels.map(parcel => (
                                <TableRow key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <TableCell className="font-mono">{parcel.trackingId}</TableCell>
                                    <TableCell>{(parcel.sender as IUserSummary)?.name || "N/A"}</TableCell>
                                    <TableCell>{(parcel.sender as IUserSummary)?.email || "N/A"}</TableCell>
                                    <TableCell>{parcel.parcelType}</TableCell>
                                    <TableCell>{parcel.weight} kg</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>Pickup: {parcel.pickupAddress}</span>
                                            <span>Delivery: {parcel.deliveryAddress}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-green-600 dark:text-green-400">
                                        ${parcel.fee}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`w-28 justify-center border ${getStatusColor(parcel.currentStatus)}`}>
                                            {parcel.currentStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {parcels.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-12 text-gray-500 dark:text-gray-400">
                                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                        <p className="text-lg font-medium">No delivery history found.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="block md:hidden space-y-4 mt-4">
                    {parcels.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-lg font-medium">No delivery history found.</p>
                        </div>
                    ) : (
                        parcels.map(parcel => (
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

                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <p><span className="font-medium">Type:</span> {parcel.parcelType}</p>
                                        <p><span className="font-medium">Weight:</span> {parcel.weight} kg</p>
                                    </div>

                                    <div className="mt-2 space-y-1">
                                        <p><span className="font-medium">Pickup:</span> {parcel.pickupAddress}</p>
                                        <p><span className="font-medium">Delivery:</span> {parcel.deliveryAddress}</p>
                                    </div>

                                    <p className="font-semibold text-green-600 dark:text-green-400 mt-2">Fee: ${parcel.fee}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
