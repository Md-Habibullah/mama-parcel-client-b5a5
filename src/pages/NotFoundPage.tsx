import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    AlertTriangle,
    Home,
    ArrowLeft
} from 'lucide-react';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-sm">
                {/* Error Icon */}
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-destructive/20 rounded-full animate-ping"></div>
                    <div className="relative bg-destructive/10 p-4 rounded-full inline-flex">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h1 className="text-6xl font-bold text-foreground">404</h1>
                    <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        className="gap-2"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}