import { useState } from "react";
import {
    useGetAllParcelsQuery,
    useUpdateParcelStatusMutation,
    useBlockOrUnblockParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import type { IParcel } from "@/types";
import type { IUserSummary, ParcelStatus } from "@/types/parcel.type";
import { Search, Package, Truck, DollarSign, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

export default function AdminParcels() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, error } = useGetAllParcelsQuery({
        page,
        limit,
        searchTerm: search || undefined,
    });

    const [updateParcelStatus] = useUpdateParcelStatusMutation();
    const [toggleBlock, { isLoading: blockLoading }] = useBlockOrUnblockParcelMutation();
    const [loadingParcel, setLoadingParcel] = useState<string | null>(null);

    // Modal
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const [selectedParcel, setSelectedParcel] = useState<IParcel | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<ParcelStatus | null>(null);

    const parcels: IParcel[] = data?.data || [];
    const meta = data?.meta;
    const totalPages = meta?.totalPage || 1;
    const showPagination = (meta?.total || 0) > limit;

    const filteredParcels = parcels.filter(parcel => {
        const senderName = typeof parcel.sender === "string" ? "" : (parcel.sender as IUserSummary)?.name || "";
        const receiverName = typeof parcel.receiver === "string" ? "" : (parcel.receiver as IUserSummary)?.name || "";
        return (
            parcel.trackingId.toLowerCase().includes(search.toLowerCase()) ||
            senderName.toLowerCase().includes(search.toLowerCase()) ||
            receiverName.toLowerCase().includes(search.toLowerCase())
        );
    });

    const getBadgeVariant = (status: ParcelStatus) => {
        switch (status) {
            case "REQUESTED": return "outline";
            case "APPROVED": return "secondary";
            case "RETURNED": return "destructive";
            case "DISPATCHED": return "default";
            case "IN_TRANSIT": return "default";
            case "DELIVERED": return "secondary";
            case "CANCELED": return "destructive";
            default: return "default";
        }
    };

    const getStatusColor = (status: ParcelStatus) => {
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

    const handleOpenModal = (parcel: IParcel, status: ParcelStatus) => {
        setSelectedParcel(parcel);
        setSelectedStatus(status);
        setNote("");
        setOpen(true);
    };

    const handleSubmitStatus = async () => {
        if (!selectedParcel || !selectedStatus) return;
        try {
            await updateParcelStatus({
                id: selectedParcel._id,
                status: selectedStatus,
                note,
            }).unwrap();
            toast.success(`Parcel ${selectedParcel.trackingId} status updated to ${selectedStatus}`);
            setOpen(false);
        } catch {
            toast.error("Failed to update parcel status");
        }
    };

    const handleToggleBlock = async (parcel: IParcel) => {
        try {
            setLoadingParcel(parcel._id);
            await toggleBlock(parcel._id).unwrap();
            toast.success(`Parcel ${parcel.trackingId} ${parcel.isBlocked ? "unblocked" : "blocked"} successfully`);
        } catch {
            toast.error("Failed to update block status");
        } finally {
            setLoadingParcel(null);
        }
    };

    const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

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

    return (
        <div className="space-y-6 m-4">
            {/* Header Section */}
            <div className="px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Parcel Management</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage all parcels and track their status
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Parcels</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{meta?.total || 0}</p>
                            </div>
                            <Package className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Parcels</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {parcels.filter(p => !p.isBlocked).length}
                                </p>
                            </div>
                            <Truck className="h-8 w-8 text-green-500 dark:text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-600 dark:text-red-400">Blocked Parcels</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {parcels.filter(p => p.isBlocked).length}
                                </p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${parcels.reduce((sum, p) => sum + (p.fee || 0), 0).toFixed(2)}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Parcels Table Card for Desktop */}
            <Card className="hidden md:block px-8 mx-12 shadow-2xl rounded-2xl border-0 bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="py-2 text-xl font-bold text-gray-900 dark:text-white">
                                Parcels List
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Manage parcel status and block/unblock parcels
                            </CardDescription>
                        </div>
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by tracking ID, sender, or receiver..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
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
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Tracking ID</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Sender</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Receiver</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Type / Weight</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Route</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Fee</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredParcels.map(parcel => {
                                    const senderName = typeof parcel.sender === "string"
                                        ? parcel.sender
                                        : (parcel.sender as IUserSummary)?.name || "N/A";
                                    const receiverName = typeof parcel.receiver === "string"
                                        ? parcel.receiver
                                        : (parcel.receiver as IUserSummary)?.name || "N/A";

                                    return (
                                        <TableRow key={parcel._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <TableCell className="font-mono font-semibold text-gray-900 dark:text-white">
                                                {parcel.trackingId}
                                            </TableCell>
                                            <TableCell className="text-gray-900 dark:text-white">{senderName}</TableCell>
                                            <TableCell className="text-gray-900 dark:text-white">{receiverName}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Package className="h-4 w-4 text-blue-500" />
                                                    <span className="text-gray-900 dark:text-white">
                                                        {parcel.parcelType} / {parcel.weight}kg
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">From: {parcel.pickupAddress}</span>
                                                    <span className="text-gray-600 dark:text-gray-400">To: {parcel.deliveryAddress}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-green-600 dark:text-green-400">
                                                ${parcel.fee}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={parcel.currentStatus}
                                                    onValueChange={(value: ParcelStatus) =>
                                                        handleOpenModal(parcel, value)
                                                    }
                                                >
                                                    <SelectTrigger className="w-36 border-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {["REQUESTED", "APPROVED", "DISPATCHED", "IN_TRANSIT", "DELIVERED", "RETURNED", "CANCELED"].map(status => (
                                                            <SelectItem key={status} value={status}>
                                                                <Badge
                                                                    variant={getBadgeVariant(status as ParcelStatus)}
                                                                    className={`w-full text-left ${getStatusColor(status as ParcelStatus)}`}
                                                                >
                                                                    {status}
                                                                </Badge>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Button
                                                    variant={parcel.isBlocked ? "secondary" : "destructive"}
                                                    size="sm"
                                                    className="w-24 text-sm font-medium transition-all duration-200 gap-2"
                                                    disabled={blockLoading && loadingParcel === parcel._id}
                                                    onClick={() => handleToggleBlock(parcel)}
                                                >
                                                    {blockLoading && loadingParcel === parcel._id ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                                                    ) : parcel.isBlocked ? (
                                                        <>🔓 Unblock</>
                                                    ) : (
                                                        <>🚫 Block</>
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {filteredParcels.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-12 text-gray-500 dark:text-gray-400">
                                            <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                            <p className="text-lg font-medium">No parcels found</p>
                                            <p className="text-sm">Try adjusting your search criteria</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {showPagination && (
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, meta?.total || 0)} of {meta?.total} parcels
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrev}
                                    disabled={page === 1}
                                    className="gap-1"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={page === pageNum ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setPage(pageNum)}
                                                className="w-8 h-8 p-0"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                    {totalPages > 5 && <span className="px-2">...</span>}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNext}
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
            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4 px-4 sm:px-12">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="py-2 text-xl font-bold text-gray-900 dark:text-white">
                                Parcels List
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Manage parcel status and block/unblock parcels
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                {filteredParcels.map(parcel => {
                    const senderName = typeof parcel.sender === "string"
                        ? parcel.sender
                        : (parcel.sender as IUserSummary)?.name || "N/A";
                    const receiverName = typeof parcel.receiver === "string"
                        ? parcel.receiver
                        : (parcel.receiver as IUserSummary)?.name || "N/A";

                    return (
                        <Card key={parcel._id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-mono font-semibold">{parcel.trackingId}</span>
                                <Badge className={`w-28 justify-center border ${getStatusColor(parcel.currentStatus)}`}>
                                    {parcel.currentStatus}
                                </Badge>
                            </div>
                            <div className="text-gray-900 dark:text-white space-y-1">
                                <p className="font-medium">{senderName}</p>
                                <p className="font-medium">{receiverName}</p>
                                <p><Package className="inline h-4 w-4" /> {parcel.parcelType} / {parcel.weight}kg</p>
                                <p className="text-sm">From: {parcel.pickupAddress}</p>
                                <p className="text-sm">To: {parcel.deliveryAddress}</p>
                                <p className="font-semibold text-green-600 dark:text-green-400 mt-1">Fee: ${parcel.fee}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <Select
                                    value={parcel.currentStatus}
                                    onValueChange={(v) => handleOpenModal(parcel, v as ParcelStatus)}
                                >
                                    <SelectTrigger className="w-full border-2 bg-white dark:bg-gray-700 dark:border-gray-600">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["REQUESTED", "APPROVED", "DISPATCHED", "IN_TRANSIT", "DELIVERED", "RETURNED", "CANCELED"].map(status => (
                                            <SelectItem key={status} value={status}>
                                                <Badge
                                                    variant={getBadgeVariant(status as ParcelStatus)}
                                                    className={`w-full text-left ${getStatusColor(status as ParcelStatus)}`}
                                                >
                                                    {status}
                                                </Badge>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant={parcel.isBlocked ? "secondary" : "destructive"}
                                    size="sm"
                                    className="flex-1 gap-2"
                                    disabled={blockLoading && loadingParcel === parcel._id}
                                    onClick={() => handleToggleBlock(parcel)}
                                >
                                    {blockLoading && loadingParcel === parcel._id
                                        ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                                        : parcel.isBlocked ? <>🔓 Unblock</> : <>🚫 Block</>}
                                </Button>

                                {/* Pagination Controls */}
                                {showPagination && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
                                        {/* <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, meta?.total || 0)} of {meta?.total} parcels
                                        </div> */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handlePrev}
                                                disabled={page === 1}
                                                className="gap-1"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Previous
                                            </Button>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                    const pageNum = i + 1;
                                                    return (
                                                        <Button
                                                            key={pageNum}
                                                            variant={page === pageNum ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => setPage(pageNum)}
                                                            className="w-8 h-8 p-0"
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    );
                                                })}
                                                {totalPages > 5 && <span className="px-2">...</span>}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleNext}
                                                disabled={page === totalPages}
                                                className="gap-1"
                                            >
                                                Next
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Status Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white dark:bg-gray-800 border-0 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            Update Parcel Status
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                            Add a note for the status change of parcel {selectedParcel?.trackingId}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                Changing status to: <strong className="capitalize">{selectedStatus?.toLowerCase()}</strong>
                            </p>
                        </div>
                        <Input
                            placeholder="Enter note here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmitStatus} disabled={!note.trim()}>
                            Update Status
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}