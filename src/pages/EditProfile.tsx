import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Save,
    User,
    Phone,
    MapPin,
    CheckCircle,
    AlertCircle,
    Mail,
    Shield,
    Calendar,
} from "lucide-react";
import type { IUser } from "@/types";
import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";

// ---------------- Zod Schema ----------------
const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || /^[+]?[\d\s\-()]{10,}$/.test(val), {
            message: "Please enter a valid phone number",
        }),
    address: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
// ------------------------------------------------

export default function EditProfile() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useUserInfoQuery(undefined);
    const [updateUserProfile, { isLoading: isUpdating, isSuccess, isError, reset }] =
        useUpdateUserProfileMutation();

    const [formData, setFormData] = useState<ProfileFormData>({
        name: "",
        phone: "",
        address: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});

    // Reset mutation state on unmount
    useEffect(() => {
        return () => reset();
    }, [reset]);

    // Load user data
    useEffect(() => {
        if (data?.data) {
            const user = data.data as IUser;
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        if (isError) reset();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate with Zod
        const result = profileSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof ProfileFormData, string>> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof ProfileFormData;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        if (!data?.data?._id) {
            console.error("User ID not found");
            return;
        }

        try {
            await updateUserProfile({ id: data.data._id, ...formData }).unwrap();
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                            <div className="flex gap-4 pt-2">
                                <Skeleton className="h-10 w-32" />
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Error loading state
    if (error) {
        return (
            <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Failed to load profile. Please try refreshing.</AlertDescription>
                        </Alert>
                        <div className="flex justify-center mt-4">
                            <Button onClick={() => window.location.reload()}>Try Again</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back Button */}
                <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                {/* Success/Error Alerts */}
                {isSuccess && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Your profile has been updated successfully.</AlertDescription>
                    </Alert>
                )}

                {isError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Failed to update profile. Please try again.</AlertDescription>
                    </Alert>
                )}

                {/* Edit Profile Form */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Edit Profile</CardTitle>
                                <CardDescription>Update your personal information</CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                                    <User className="h-4 w-4" />
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={errors.name ? "border-destructive" : ""}
                                    disabled={isUpdating}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                                    <Phone className="h-4 w-4" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={formData.phone || ""}
                                    onChange={handleInputChange}
                                    className={errors.phone ? "border-destructive" : ""}
                                    disabled={isUpdating}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-destructive flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Address Field */}
                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                                    <MapPin className="h-4 w-4" />
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    disabled={isUpdating}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={isUpdating} className="gap-2">
                                    {isUpdating ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>

                                <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isUpdating}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Read-only Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            Account Information
                        </CardTitle>
                        <CardDescription>These details cannot be changed from this page</CardDescription>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email Address
                                </Label>
                                <p className="font-medium">{data?.data?.email || "Not available"}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground text-sm">Account Role</Label>
                                <div>
                                    <Badge variant="secondary" className="capitalize">
                                        {data?.data?.role?.toLowerCase().replace("_", " ") || "Not available"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground text-sm">Verification Status</Label>
                                <div>
                                    <Badge
                                        variant={data?.data?.isVerified ? "default" : "secondary"}
                                        className={data?.data?.isVerified ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                    >
                                        {data?.data?.isVerified ? "Verified" : "Not Verified"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground text-sm">Account Status</Label>
                                <div>
                                    <Badge
                                        variant={data?.data?.isActive ? "default" : "secondary"}
                                        className={
                                            data?.data?.isActive
                                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                        }
                                    >
                                        {data?.data?.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {data?.data?.createdAt && (
                            <div className="space-y-2">
                                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Member Since
                                </Label>
                                <p className="text-sm">{new Date(data.data.createdAt).toLocaleDateString()}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
