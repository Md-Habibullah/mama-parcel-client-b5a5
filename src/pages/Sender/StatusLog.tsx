/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";
import { useGetParcelByIdQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";
import type { IUserSummary, ParcelStatus } from "@/types/parcel.type";

export default function ParcelStatusLogs() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useGetParcelByIdQuery(id!);

    const parcel: IParcel | null = data?.data || null;
    const logs = parcel?.statusLogs ?? [];
    console.log(logs)

    const getUser = (user: IUserSummary | string | undefined) => {
        if (!user) return "N/A";
        if (typeof user === "string") return user;
        return user.name;
    };

    const getEmail = (user: IUserSummary | string | undefined) => {
        if (!user) return "N/A";
        if (typeof user === "string") return "-";
        return user.email;
    };

    const statusColor = (status: ParcelStatus) => {
        switch (status) {
            case "REQUESTED": return "bg-gray-200 text-gray-800";
            case "APPROVED": return "bg-blue-200 text-blue-800";
            case "DISPATCHED": return "bg-purple-200 text-purple-800";
            case "IN_TRANSIT": return "bg-yellow-200 text-yellow-800";
            case "DELIVERED": return "bg-green-200 text-green-800";
            case "RETURNED": return "bg-red-200 text-red-800";
            case "CANCELED": return "bg-red-300 text-red-900";
            default: return "bg-gray-200 text-gray-800";
        }
    };

    if (isLoading) return <Skeleton className="h-80 w-full rounded-xl" />;
    if (error) return <div className="text-red-500 text-center">Failed to load parcel details</div>;
    if (!parcel) return <div className="text-gray-500 text-center">No parcel found</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 flex flex-col gap-6 mb-12">
            <Card className="shadow-xl rounded-2xl border border-gray-600">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Parcel Details</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 border p-6 rounded-xl ">
                        <div><strong>Tracking ID:</strong> {parcel.trackingId}</div>
                        <div><strong>Sender Name:</strong> {getUser(parcel.sender)}</div>
                        <div><strong>Receiver Name:</strong> {getUser(parcel.receiver)}</div>
                        <div><strong>Sender Email:</strong> {getEmail(parcel.sender)}</div>
                        <div><strong>Receiver Email:</strong> {getEmail(parcel.receiver)}</div>
                        <div><strong>Type / Weight:</strong> {parcel.parcelType} / {parcel.weight}kg</div>
                        <div><strong>Pickup / Delivery:</strong> {parcel.pickupAddress} → {parcel.deliveryAddress}</div>
                        <div><strong>Fee:</strong> ${parcel.fee}</div>
                        <div>
                            <strong>Current Status:</strong>{" "}
                            <span className={`px-2 py-1 rounded-md ${statusColor(parcel.currentStatus)}`}>
                                {parcel.currentStatus}
                            </span>
                        </div>
                    </div>

                    {/* Status Timeline */}
                    {logs.length > 0 && (
                        <div className="my-6">
                            <strong>Status Timeline:</strong>
                            <div className="flex flex-col gap-6 mt-4 relative before:absolute before:w-1 before:h-full before:bg-gray-300 before:left-5 before:top-6">
                                {logs.map((log, idx) => (
                                    <div key={idx} className="flex items-start gap-4 relative">
                                        <div
                                            className={`w-3 h-3 rounded-full mt-1.5 ${statusColor(log.status).split(" ")[0]}`}
                                        />
                                        <div>
                                            <div className={`inline-block px-2 py-1 rounded-md ${statusColor(log.status)}`}>
                                                {log.status}
                                            </div>
                                            <div className="text-gray-500 text-sm mt-1">
                                                Modified by: {(log.updatedBy as any)?.name ?? "N/A"}
                                            </div>
                                            <div className="text-gray-500 text-sm mt-1">{log.note ?? "No note"}</div>
                                            <div className="text-gray-400 text-xs mt-0.5">
                                                {new Date((log as any).timestamp ?? log.updatedAt).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
