/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config";

const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: "Name is too short" })
            .max(50, { message: "Name is too long" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/^(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
            .regex(/^(?=.*[!@#$%^&*])/, "Password must contain at least 1 special character")
            .regex(/^(?=.*\d)/, "Password must contain at least 1 number"),
        confirmPassword: z.string().min(8, { message: "Confirm Password is too short" }),
        role: z
            .string()
            .refine((val) => val !== "" && val !== undefined, { message: "Please select a role" })
            .refine((val) => ["SENDER", "RECEIVER"].includes(val), { message: "Please select a valid role" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        };

        try {
            const res = await register(userInfo).unwrap();
            if (res.success) {
                toast.success("User created successfully");
                navigate("/login");
            }
        } catch (error: any) {
            // Handle Zod validation errors from backend
            if (error?.data?.errors && Array.isArray(error.data.errors)) {
                error.data.errors.forEach((err: { field: string; message: string }) => {
                    form.setError(err.field as keyof typeof data, { message: err.message });
                });
            } else if (error?.data?.message) {
                toast.error(error.data.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details to create an account
                </p>
            </div>

            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Email Address" type="email" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="SENDER">Sender</SelectItem>
                                            <SelectItem value="RECEIVER">Receiver</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-muted-foreground px-2 text-[12px]">
                                        Select whether you will be sending or receiving parcels
                                    </FormDescription>
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
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

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
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </div>
    );
}
