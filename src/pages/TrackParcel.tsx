/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useLazyTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";
import type { IUserSummary, ParcelStatus } from "@/types/parcel.type";
import { Search, Package, MapPin, User, DollarSign, Scale, Clock } from "lucide-react";

export default function TrackParcel() {
    const [trackingId, setTrackingId] = useState("");
    const [parcel, setParcel] = useState<IParcel | null>(null);

    const [fetchParcel, { isLoading }] = useLazyTrackParcelQuery();

    const handleTrack = async () => {
        if (!trackingId.trim()) return toast.error("Enter a tracking ID");
        try {
            const res = await fetchParcel(trackingId).unwrap();
            setParcel(res.data);
        } catch {
            toast.error("Parcel not found");
            setParcel(null);
        }
    };

    const getUser = (user: IUserSummary | string | undefined) => {
        if (!user) return "N/A";
        if (typeof user === "string") return user;
        return user.name;
    };
    const getUserEmail = (user: IUserSummary | string | undefined) => {
        if (!user) return "N/A";
        if (typeof user === "string") return "-";
        return user.email;
    };

    const statusColor = (status: ParcelStatus) => {
        switch (status) {
            case "REQUESTED": return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600";
            case "APPROVED": return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-600";
            case "DISPATCHED": return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-600";
            case "IN_TRANSIT": return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600";
            case "DELIVERED": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-600";
            case "RETURNED": return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-600";
            case "CANCELED": return "bg-red-200 dark:bg-red-800/50 text-red-900 dark:text-red-100 border-red-400 dark:border-red-600";
            default: return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600";
        }
    };

    const logs = parcel?.statusLogs ?? [];

    return (
        <div className="my-12 py-12 bg-gradient-to-b from-background to-muted/30 px-4">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text">
                        Track Your Parcel
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Enter your tracking ID to get real-time updates on your package delivery status
                    </p>
                </div>

                {/* Tracking Form */}
                <Card className="shadow-2xl rounded-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            Track Your Package
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Enter your unique tracking number below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3 max-w-md mx-auto">
                            <div className="flex-1 relative">
                                <Input
                                    placeholder="Enter tracking ID (e.g., MP123456789)"
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                    className="pl-10 pr-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                                />
                                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <Button
                                onClick={handleTrack}
                                className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                                disabled={isLoading}
                            >
                                {isLoading ? "Tracking..." : "Track Now"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Loading */}
                {isLoading && (
                    <Card className="shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-center space-x-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                <span className="text-lg text-gray-600 dark:text-gray-400">Tracking your parcel...</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Parcel Info */}
                {parcel && !isLoading && (
                    <div className="space-y-6">
                        {/* Main Parcel Card */}
                        <Card className="shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-2xl font-bold">Parcel Details</CardTitle>
                                    <div className={`px-4 py-2 rounded-full ${statusColor(parcel.currentStatus)} text-sm font-semibold border`}>
                                        {parcel.currentStatus}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Tracking Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Tracking ID</div>
                                                <div className="font-semibold text-lg text-gray-900 dark:text-white">{parcel.trackingId}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Shipping Fee</div>
                                                <div className="font-semibold text-lg text-green-700 dark:text-green-300">${parcel.fee}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <Scale className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Type & Weight</div>
                                                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                                                    {parcel.parcelType} / {parcel.weight}kg
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                            <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-1" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Route</div>
                                                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                                                    {parcel.pickupAddress} → {parcel.deliveryAddress}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <User className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                                                <div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">Sender</div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">{getUser(parcel.sender)}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{getUserEmail(parcel.sender)}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <User className="h-6 w-6 text-green-600 dark:text-green-400 mt-1" />
                                                <div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">Receiver</div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">{getUser(parcel.receiver)}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{getUserEmail(parcel.receiver)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status Timeline */}
                        {logs.length > 0 && (
                            <Card className="shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
                                <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-900 text-white rounded-t-2xl">
                                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Delivery Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="relative">
                                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="space-y-8">
                                            {logs.map((log, idx) => (
                                                <div key={idx} className="flex items-start gap-4 relative">
                                                    <div className={`w-4 h-4 rounded-full border-2 ${statusColor(log.status).split(" ")[0]} z-10 mt-1.5 flex-shrink-0`} />
                                                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(log.status)}`}>
                                                                {log.status}
                                                            </span>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                {new Date((log as any).timestamp ?? log.updatedAt).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                            <strong>Modified by:</strong> {(log.updatedBy as any)?.name ?? "N/A"}
                                                        </div>
                                                        {log.note && (
                                                            <div className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 p-3 rounded-lg border dark:border-gray-500">
                                                                <strong>Note:</strong> {log.note}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}