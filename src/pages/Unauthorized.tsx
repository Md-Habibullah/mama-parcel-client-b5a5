import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ShieldAlert,
    Home,
    LogIn,
    Shield,
    AlertCircle,
    ArrowLeft,
    Contact
} from 'lucide-react';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-6">
                {/* Main Unauthorized Card */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-2xl blur-xl opacity-50"></div>
                    <Card className="relative border-0 shadow-2xl">
                        <CardContent className="pt-6 text-center">
                            {/* Animated Shield Icon */}
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-pulse"></div>
                                <div className="relative bg-amber-500/10 p-4 rounded-full inline-flex">
                                    <ShieldAlert className="h-16 w-16 text-amber-500" />
                                </div>
                            </div>

                            {/* Error Code */}
                            <div className="mb-4">
                                <h1 className="text-8xl font-bold text-foreground bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text">
                                    401
                                </h1>
                                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-2 rounded-full"></div>
                            </div>

                            {/* Error Message */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">
                                    Access Denied
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    You don't have permission to access this page. This area requires special authorization
                                    or your current login session may have expired.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-amber-500" />
                            Available Actions
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button
                                onClick={() => navigate('/login')}
                                className="gap-2 h-12 bg-amber-500 hover:bg-amber-600"
                                size="lg"
                            >
                                <LogIn className="h-4 w-4" />
                                Sign In
                            </Button>

                            <Button
                                onClick={() => navigate('/')}
                                variant="outline"
                                className="gap-2 h-12"
                                size="lg"
                            >
                                <Home className="h-4 w-4" />
                                Go Home
                            </Button>

                            <Button
                                onClick={() => navigate(-1)}
                                variant="outline"
                                className="gap-2 h-12"
                                size="lg"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Go Back
                            </Button>

                            <Button
                                onClick={() => navigate('/contact')}
                                variant="ghost"
                                className="gap-2 h-12"
                                size="lg"
                            >
                                <Contact className="h-4 w-4" />
                                Contact Support
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Helpful Information */}
                <Card className="border-0 bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                            <AlertCircle className="h-5 w-5" />
                            Why am I seeing this?
                        </h3>
                        <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>Your session may have expired due to inactivity</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>You don't have the required permissions for this page</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>This could be a restricted admin or management area</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>Try signing in with an account that has proper access</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Support Contact */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Need access?{" "}
                        <button
                            onClick={() => navigate('/contact')}
                            className="text-amber-600 hover:underline font-medium dark:text-amber-400"
                        >
                            Request permissions from administrator
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}