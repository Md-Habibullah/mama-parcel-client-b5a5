import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Rocket, Shield, Clock, Globe, Package, Truck, Star, Users, CheckCircle, MapPin } from 'lucide-react';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';

const HomePage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8">
                <Skeleton className="h-40 w-full rounded-xl mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-60 w-full rounded-xl" />
                    <Skeleton className="h-60 w-full rounded-xl" />
                    <Skeleton className="h-60 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );

    // if (error) return <div className="text-red-500 text-center py-8">Failed to load profile</div>;

    const profile = data?.data;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-muted/50 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,black,rgba(255,255,255,0))]"></div>

                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex-1 space-y-6">
                            <Badge variant="secondary" className="text-sm px-4 py-1 bg-primary/10 text-primary">
                                Fast & Reliable Delivery
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                Your Parcel Delivery <span className="text-primary">Made Simple</span>
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Mama Parcel delivers your packages with care, speed, and reliability.
                                Experience the next generation of parcel delivery services.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    size="lg"
                                    className="px-8 py-3 text-lg"
                                    onClick={() => navigate("/track")}
                                >
                                    Track Your Package
                                </Button>
                                <div className="flex justify-center gap-4">
                                    {
                                        !profile?.role && (
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="px-8 py-3 text-lg"
                                                onClick={() => navigate("/about")}
                                            >
                                                Learn More
                                            </Button>
                                        )
                                    }
                                    {
                                        profile?.role === "SENDER" && (
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="px-8 py-3 text-lg"
                                                onClick={() => navigate("/create-parcel")}
                                            >
                                                Create Parcel
                                            </Button>
                                        )
                                    }
                                    {
                                        profile?.role === "RECEIVER" && (
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="px-8 py-3 text-lg"
                                                onClick={() => navigate("/receiver/parcels")}
                                            >
                                                My Parcels
                                            </Button>
                                        )
                                    }
                                    {
                                        (profile?.role === "ADMIN" || profile?.role === "SUPER_ADMIN") && (
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="px-8 py-3 text-lg"
                                                onClick={() => navigate("/admin/analytics")}
                                            >
                                                Analytics
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/10 rounded-2xl rotate-3"></div>
                                <Card className="relative w-full max-w-md overflow-hidden shadow-xl">
                                    <CardContent className="p-0">
                                        <div className="aspect-video bg-primary flex items-center justify-center">
                                            <Truck className="h-20 w-20 text-primary-foreground" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
                                            <p className="text-muted-foreground">
                                                Track your package in real-time from pickup to delivery
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {/* <section className="py-16 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Why Choose Mama Parcel?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            We provide exceptional delivery services with a focus on reliability, speed, and customer satisfaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Rocket className="h-10 w-10 text-primary" />,
                                title: "Fast Delivery",
                                description: "Get your parcels delivered in record time with our express service options."
                            },
                            {
                                icon: <Shield className="h-10 w-10 text-primary" />,
                                title: "Secure Handling",
                                description: "Your items are handled with care and security throughout the journey."
                            },
                            {
                                icon: <Globe className="h-10 w-10 text-primary" />,
                                title: "Nationwide Coverage",
                                description: "We deliver to all major cities and towns across the country."
                            },
                            {
                                icon: <Clock className="h-10 w-10 text-primary" />,
                                title: "24/7 Support",
                                description: "Our customer service team is available around the clock to assist you."
                            }
                        ].map((feature, index) => (
                            <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-center">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Services Section */}
            <section className="py-16 bg-muted px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Our Delivery Services
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            We offer a range of delivery options to meet your specific needs and requirements.
                        </p>
                    </div>

                    <Tabs defaultValue="domestic" className="w-full max-w-6xl mx-auto">
                        <TabsList className="grid w-full grid-cols-3 mb-12">
                            <TabsTrigger value="domestic">Domestic Delivery</TabsTrigger>
                            <TabsTrigger value="international">International Shipping</TabsTrigger>
                            <TabsTrigger value="business">Business Solutions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="domestic" className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Standard Delivery</CardTitle>
                                        <CardDescription>3-5 business days</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Reliable and affordable delivery for all your domestic parcels.</p>
                                    <Button variant="link" className="p-0 mt-4 text-primary">
                                        Learn more →
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Rocket className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Express Delivery</CardTitle>
                                        <CardDescription>Next day delivery</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Get your urgent parcels delivered the next business day.</p>
                                    <Button variant="link" className="p-0 mt-4 text-primary">
                                        Learn more →
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="international" className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>International Standard</CardTitle>
                                        <CardDescription>5-10 business days</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Cost-effective international shipping with reliable delivery times.</p>
                                    <Button variant="link" className="p-0 mt-4 text-primary">
                                        Learn more →
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Rocket className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>International Express</CardTitle>
                                        <CardDescription>2-3 business days</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Fast international delivery for your time-sensitive shipments.</p>
                                    <Button variant="link" className="p-0 mt-4 text-primary">
                                        Learn more →
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="business" className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Truck className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Business Account</CardTitle>
                                        <CardDescription>Volume discounts</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Special rates and benefits for businesses with regular shipping needs.</p>
                                    <Button variant="link" className="p-0 mt-4 text-primary">
                                        Learn more →
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Enterprise Solutions</CardTitle>
                                        <CardDescription>Customized services</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Tailored logistics solutions for large enterprises with complex needs.</p>
                                    <Button variant="link" className="p-0 mt-4 text-primary">
                                        Learn more →
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-primary/5 relative">
                <div className="absolute inset-0 bg-dot-primary/10"></div>
                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '50K+', label: 'Deliveries Made', icon: <Package className="h-6 w-6" /> },
                            { value: '98%', label: 'Success Rate', icon: <CheckCircle className="h-6 w-6" /> },
                            { value: '24/7', label: 'Support', icon: <Clock className="h-6 w-6" /> },
                            { value: '500+', label: 'Cities Served', icon: <MapPin className="h-6 w-6" /> },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-card rounded-xl shadow-sm border">
                                <div className="flex justify-center mb-3 text-primary">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 md:px-8 relative">
                <div className="absolute -top-20 left-0 w-full flex justify-center">
                    <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>

                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            Why Choose Us
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Delivering Happiness, One Package at a Time
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            We provide exceptional delivery services with a focus on reliability, speed, and customer satisfaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Rocket className="h-10 w-10 text-primary" />,
                                title: "Lightning Fast",
                                description: "Get your parcels delivered in record time with our express service options.",
                                highlight: "From 24h delivery"
                            },
                            {
                                icon: <Shield className="h-10 w-10 text-primary" />,
                                title: "Secure Handling",
                                description: "Your items are handled with care and security throughout the journey.",
                                highlight: "Fully insured"
                            },
                            {
                                icon: <Globe className="h-10 w-10 text-primary" />,
                                title: "Global Reach",
                                description: "We deliver to all major cities and towns across the country and beyond.",
                                highlight: "100+ countries"
                            },
                            {
                                icon: <Clock className="h-10 w-10 text-primary" />,
                                title: "24/7 Support",
                                description: "Our customer service team is available around the clock to assist you.",
                                highlight: "Always available"
                            }
                        ].map((feature, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-card/80">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    <div className="text-sm text-primary font-medium">{feature.highlight}</div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-muted px-4 md:px-8 relative">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            Testimonials
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Don't just take our word for it - hear from some of our satisfied customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <Card key={item} className="border-0 shadow-lg bg-card relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current inline" />
                                    ))}
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Sarah Johnson</div>
                                            <div className="text-sm text-muted-foreground">Small Business Owner</div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground italic">
                                        "Mama Parcel has transformed how I ship products to my customers. Their tracking system is incredible and delivery times are always as promised."
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-primary-foreground/10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

                <div className="container mx-auto text-center relative z-10 max-w-4xl">
                    <Badge className="mb-4 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                        Get Started
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Send Your Parcel?</h2>
                    <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust Mama Parcel with their delivery needs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-background text-foreground hover:bg-background/90 px-8 shadow-lg"
                            onClick={() => navigate("/track")}
                        >
                            Send a Package Now
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-background text-background hover:bg-primary-foreground/10 px-8 shadow-lg"
                            onClick={() => navigate("/contact")}
                        >
                            Contact Our Team
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;