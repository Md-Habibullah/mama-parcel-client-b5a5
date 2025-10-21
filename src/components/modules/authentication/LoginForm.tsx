import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({
        //! For development only
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const payload = {
                email: data.email.trim(),
                password: data.password.trim(),
            };

            const res = await login(payload).unwrap();
            if (res.success) {
                toast.success("Logged in successfully");
                navigate("/");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err?.data?.message);

            // Handle errors inline in form
            if (err?.data?.message === "User does not exist") {
                form.setError("email", { type: "manual", message: "Email does not exist" });
            }
            else if (err?.data?.message === "User is blocked or deleted") {
                form.setError("email", { type: "manual", message: "User is blocked or deleted" });
            }
            else if (err?.data?.message === "Password does not matched") {
                form.setError("password", { type: "manual", message: "Password is incorrect" });
            }
            // else if (err?.data?.message === "User is not verified") {
            //     toast.error("Your account is not verified");
            //     navigate("/verify", { state: data.email });
            // }
            else {
                toast.error("Something went wrong. Please try again");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                                value={field.value || ""}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                tabIndex={-1} // Prevent tab focus on the button
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                {/*//* http://localhost:5000/api/v1/auth/google */}
                <Button
                    onClick={() => window.open(`${config.baseUrl}/auth/google`)}
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer"
                >
                    Login with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" replace className="underline underline-offset-4">
                    Register
                </Link>
            </div>
        </div>
    );
}