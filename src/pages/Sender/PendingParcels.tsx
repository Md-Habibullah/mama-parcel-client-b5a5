/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetMyParcelsQuery, useCancelParcelMutation } from "@/redux/features/parcel/parcel.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { IParcel } from "@/types";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Parcels() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: parcelsResponse, isLoading, error } = useGetMyParcelsQuery({ page, limit });
    const [cancelParcel] = useCancelParcelMutation();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    if (isLoading) return <Skeleton className="h-80 w-full rounded-xl" />;
    if (error) return <div className="text-red-500 text-center">Failed to load parcels</div>;

    const allParcels: IParcel[] = parcelsResponse?.data || [];
    const meta = parcelsResponse?.meta;
    const totalPages = meta?.totalPage || 1;

    const parcels: IParcel[] = allParcels.filter(parcel => parcel.currentStatus === 'REQUESTED');

    const handleCancel = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You are about to cancel this parcel!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Cancel Parcel",
            cancelButtonText: "No",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        setLoadingId(id);
        try {
            await cancelParcel(id).unwrap();
            Swal.fire({
                title: "Canceled!",
                text: "The parcel has been canceled successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                title: "Failed!",
                text: "Could not cancel the parcel. Try again later.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            setLoadingId(null);
        }
    };

    const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

    const getStatusColor = (status: string) => {
        switch (status) {
            case "REQUESTED": return "bg-yellow-500 text-black";
            case "CANCELED": return "bg-red-500 text-white";
            case "DELIVERED": return "bg-green-500 text-white";
            default: return "bg-gray-500 text-white";
        }
    };

    return (
        <Card className="container md:px-8 shadow-2xl border-0 bg-white dark:bg-gray-800 mx-auto my-8 border-gray-700 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">My Parcels</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <Table className="min-w-[900px] text-sm">
                    <TableHeader>
                        <TableRow className="bg-gray-800">
                            <TableHead className="w-40">Tracking ID</TableHead>
                            <TableHead className="w-28 text-center">Type</TableHead>
                            <TableHead className="w-28 text-center">Weight</TableHead>
                            <TableHead className="w-36 text-center">Status</TableHead>
                            <TableHead className="w-28 text-center">Fee</TableHead>
                            <TableHead className="w-36 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parcels.map(parcel => (
                            <TableRow key={parcel._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <TableCell className="truncate">{parcel.trackingId}</TableCell>
                                <TableCell className="text-center">{parcel.parcelType}</TableCell>
                                <TableCell className="text-center">{parcel.weight} kg</TableCell>
                                <TableCell className="text-center">
                                    <Badge className={`w-32 text-center ${getStatusColor(parcel.currentStatus)}`}>
                                        {parcel.currentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">${parcel.fee}</TableCell>
                                <TableCell className="text-center">
                                    {parcel.currentStatus !== "CANCELED" ? (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            disabled={loadingId === parcel._id}
                                            onClick={() => handleCancel(parcel._id)}
                                        >
                                            {loadingId === parcel._id ? "Canceling..." : "Cancel"}
                                        </Button>
                                    ) : (
                                        <Badge variant="secondary" className="w-28 text-center">Canceled</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {parcels.length === 0 && <div className="text-center py-10 text-gray-500">No parcels found.</div>}

                <div className="flex justify-center mt-6 gap-4">
                    <Button variant="outline" disabled={page === 1} onClick={handlePrev}>
                        Previous
                    </Button>
                    <span className="flex items-center gap-2">
                        Page {page} of {totalPages}
                    </span>
                    <Button variant="outline" disabled={page === totalPages} onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
