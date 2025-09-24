import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    useCreateParcelMutation,
    useLazyFindUserByEmailQuery,
} from "@/redux/features/parcel/parcel.api";
import type { ICreateParcel } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Package, Truck, MapPin, DollarSign, User, Weight, Send } from "lucide-react";

// Zod validation schema
const createParcelSchema = z.object({
    receiverEmail: z.string().email("Please enter a valid email address"),
    parcelType: z.string().min(2, "Parcel type must be at least 2 characters"),
    weight: z.number().positive("Weight must be a positive number").min(0.1, "Weight must be at least 0.1kg"),
    pickupAddress: z.string().min(5, "Pickup address must be at least 5 characters"),
    deliveryAddress: z.string().min(5, "Delivery address must be at least 5 characters"),
    fee: z.number().nonnegative("Fee must be a non-negative number").min(0, "Fee cannot be negative"),
});

type CreateParcelFormData = z.infer<typeof createParcelSchema>;

export default function CreateParcel() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateParcelFormData>({
        resolver: zodResolver(createParcelSchema),
        defaultValues: {
            receiverEmail: "",
            parcelType: "",
            weight: undefined,
            pickupAddress: "",
            deliveryAddress: "",
            fee: undefined,
        },
    });

    const [createParcel, { isLoading }] = useCreateParcelMutation();
    const [findUserByEmail] = useLazyFindUserByEmailQuery();

    const onSubmit = async (data: CreateParcelFormData) => {
        try {
            // 1️⃣ Find Receiver ID first
            const userRes = await findUserByEmail(data.receiverEmail).unwrap();
            const receiverId = userRes.data._id;

            if (!receiverId) {
                toast.error("Receiver not found!");
                return;
            }

            // 2️⃣ Create Parcel with receiver ID
            const parcelData: ICreateParcel = {
                receiver: receiverId,
                parcelType: data.parcelType,
                weight: data.weight,
                pickupAddress: data.pickupAddress,
                deliveryAddress: data.deliveryAddress,
                fee: data.fee,
            };

            const res = await createParcel(parcelData).unwrap();
            toast.success(`Parcel created! Tracking ID: ${res.data.trackingId}`);

            // Reset form
            reset();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create parcel");
        }
    };

    return (
        <div className="mb-8 bg-gradient-to-b from-background to-muted/30 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text">
                        Create New Parcel
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Send packages with ease and track them in real-time
                    </p>
                </div>

                <Card className="shadow-2xl rounded-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            Parcel Information
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Fill in the details to create a new parcel shipment
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Receiver Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="receiverEmail" className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Receiver Email *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="receiverEmail"
                                            placeholder="receiver@example.com"
                                            {...register("receiverEmail")}
                                            className={`pl-10 pr-4 py-3 border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.receiverEmail
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                                                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                                                }`}
                                        />
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                    {errors.receiverEmail && (
                                        <p className="text-red-500 text-sm">{errors.receiverEmail.message}</p>
                                    )}
                                </div>

                                {/* Parcel Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="parcelType" className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <Package className="h-4 w-4" />
                                        Parcel Type *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="parcelType"
                                            placeholder="Document, Package, Fragile, etc."
                                            {...register("parcelType")}
                                            className={`pl-10 pr-4 py-3 border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.parcelType
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                                                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                                                }`}
                                        />
                                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                    {errors.parcelType && (
                                        <p className="text-red-500 text-sm">{errors.parcelType.message}</p>
                                    )}
                                </div>

                                {/* Weight */}
                                <div className="space-y-2">
                                    <Label htmlFor="weight" className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <Weight className="h-4 w-4" />
                                        Weight (kg) *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.1"
                                            placeholder="0.5"
                                            {...register("weight", { valueAsNumber: true })}
                                            className={`pl-10 pr-4 py-3 border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.weight
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                                                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                                                }`}
                                        />
                                        <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                    {errors.weight && (
                                        <p className="text-red-500 text-sm">{errors.weight.message}</p>
                                    )}
                                </div>

                                {/* Fee */}
                                <div className="space-y-2">
                                    <Label htmlFor="fee" className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" />
                                        Delivery Fee (৳) *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="fee"
                                            type="number"
                                            step="0.01"
                                            placeholder="150.00"
                                            {...register("fee", { valueAsNumber: true })}
                                            className={`pl-10 pr-4 py-3 border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.fee
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                                                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                                                }`}
                                        />
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                    {errors.fee && (
                                        <p className="text-red-500 text-sm">{errors.fee.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Pickup Address */}
                            <div className="space-y-2">
                                <Label htmlFor="pickupAddress" className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Pickup Address *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="pickupAddress"
                                        placeholder="Enter complete pickup address with city and postal code"
                                        {...register("pickupAddress")}
                                        className={`pl-10 pr-4 py-3 border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.pickupAddress
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                                            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                                            }`}
                                    />
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                                {errors.pickupAddress && (
                                    <p className="text-red-500 text-sm">{errors.pickupAddress.message}</p>
                                )}
                            </div>

                            {/* Delivery Address */}
                            <div className="space-y-2">
                                <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    Delivery Address *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="deliveryAddress"
                                        placeholder="Enter complete delivery address with city and postal code"
                                        {...register("deliveryAddress")}
                                        className={`pl-10 pr-4 py-3 border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.deliveryAddress
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                                            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                                            }`}
                                    />
                                    <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                                {errors.deliveryAddress && (
                                    <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all shadow-lg hover:shadow-xl gap-2"
                                size="lg"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <Send className="h-5 w-5" />
                                )}
                                {isLoading ? "Creating Parcel..." : "Create Parcel"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}