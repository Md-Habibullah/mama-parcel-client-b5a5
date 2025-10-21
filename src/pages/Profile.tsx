import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Phone,
    MapPin,
    Shield,
    CheckCircle,
    Calendar,
    Edit3,
    LogOut,
    Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { baseApi } from "@/redux/baseApi";
import { useAppDispatch } from "@/redux/hooks";

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useUserInfoQuery(undefined);

    if (isLoading) return <ProfileSkeleton />;
    if (error) return <div className="text-red-500 text-center">Failed to load profile</div>;

    const profile = data?.data;

    const initials = profile?.name
        ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
        : "U";

    const handleUpdateProfile = () => {
        navigate("/update-profile");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(baseApi.util.resetApiState());
        navigate("/login");
    };

    return (
        <div className="pt-8 px-4">
            <div className="max-w-md mx-auto">
                <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-8 pt-12 text-center">
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24 border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                                <AvatarImage src={profile?.picture} />
                                <AvatarFallback className="bg-white/20 text-white text-2xl font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <CardTitle className="text-2xl font-bold tracking-tight">
                            {profile?.name ? (
                                profile.name.split(" ").map((word: string) =>
                                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                ).join(" ")
                            ) : "Unknown User"}
                        </CardTitle>

                        <CardDescription className="text-blue-100 flex items-center justify-center gap-2">
                            <Mail className="h-4 w-4" />
                            {profile?.email}
                        </CardDescription>

                        <Badge
                            variant="secondary"
                            className="mt-3 bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30"
                        >
                            <Shield className="h-3 w-3 mr-1" />
                            {profile?.role ? (
                                profile.role.charAt(0).toUpperCase() + profile.role.slice(1).toLowerCase()
                            ) : "N/A"}
                        </Badge>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                                    <p className="font-medium">{profile?.phone || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
                                    <p className="font-medium">{profile?.address || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Member Since</p>
                                    <p className="font-medium">
                                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Verification Status</p>
                                    <Badge
                                        variant={profile?.isVerified ? "default" : "destructive"}
                                        className={profile?.isVerified
                                            ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                        }
                                    >
                                        {profile?.isVerified ? "Verified" : "Not Verified"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex gap-3">
                            <Button
                                onClick={handleUpdateProfile}
                                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                                size="lg"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                            </Button>

                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="flex-1 gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                                size="lg"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const ProfileSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
        <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 pb-8 pt-12 text-center">
                    <Skeleton className="h-24 w-24 rounded-full mx-auto bg-white/20" />
                    <Skeleton className="h-8 w-48 mx-auto mt-4 bg-white/20" />
                    <Skeleton className="h-4 w-32 mx-auto mt-2 bg-white/20" />
                    <Skeleton className="h-6 w-20 mx-auto mt-3 bg-white/20 rounded-full" />
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <Skeleton className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-700" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-700" />
                                <Skeleton className="h-5 w-32 bg-slate-200 dark:bg-slate-700" />
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-3">
                        <Skeleton className="h-12 flex-1 rounded-xl bg-slate-200 dark:bg-slate-700" />
                        <Skeleton className="h-12 flex-1 rounded-xl bg-slate-200 dark:bg-slate-700" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);