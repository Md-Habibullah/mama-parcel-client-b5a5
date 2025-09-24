import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Target, Globe, Heart, Shield,
    TrendingUp, HeartHandshake
} from 'lucide-react';
import { teamMembers } from '@/assets/data/data';

export default function About() {
    const navigate = useNavigate();

    const values = [
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Customer First",
            description: "Our customers are at the heart of everything we do. Their satisfaction is our top priority."
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Reliability",
            description: "We deliver on our promises. Every package, every time, with consistent quality service."
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Innovation",
            description: "We continuously improve our services with technology and innovative solutions."
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Sustainability",
            description: "We're committed to reducing our environmental impact through efficient routing and eco-friendly practices."
        }
    ];

    const milestones = [
        { year: "2018", event: "Mama Parcel Founded", description: "Started with a small team and big dreams" },
        { year: "2019", event: "10,000 Deliveries", description: "Reached our first major milestone" },
        { year: "2020", event: "Nationwide Expansion", description: "Expanded services to cover the entire country" },
        { year: "2021", event: "Mobile App Launch", description: "Released our award-winning tracking app" },
        { year: "2022", event: "500,000+ Deliveries", description: "Served half a million customers" },
        { year: "2023", event: "International Service", description: "Began offering international shipping" }
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary text-sm px-4 py-1">
                            Our Story
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            More Than Just <span className="text-primary">Delivery</span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            At Mama Parcel, we're building connections through reliable delivery services.
                            What started as a simple idea has grown into a trusted nationwide service.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => navigate("/contact")}
                            className="px-8 py-3 text-lg"
                        >
                            Get in Touch
                        </Button>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-lg bg-muted px-4 py-1 text-sm font-medium mb-6">
                                <Target className="h-4 w-4 mr-2 text-primary" />
                                Our Mission
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Delivering Happiness to Your Doorstep
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Mama Parcel was founded on a simple belief: delivery services should be reliable,
                                affordable, and transparent. We've built our company around these core principles,
                                constantly innovating to serve our customers better.
                            </p>
                            <p className="text-muted-foreground mb-8">
                                Today, we serve thousands of customers across the country with a commitment to
                                excellence in every package we deliver. Our team works tirelessly to ensure that
                                your parcels arrive safely and on time, every time.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-2xl font-bold text-primary">500K+</div>
                                    <div className="text-muted-foreground">Packages Delivered</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">98%</div>
                                    <div className="text-muted-foreground">Success Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">24/7</div>
                                    <div className="text-muted-foreground">Customer Support</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">500+</div>
                                    <div className="text-muted-foreground">Cities Served</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/10 rounded-2xl rotate-3"></div>
                            <Card className="relative overflow-hidden border-0 shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-video bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                                        <div className="text-center text-primary-foreground p-6">
                                            <HeartHandshake className="h-16 w-16 mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold">Our Promise</h3>
                                            <p className="mt-2">Every package treated with care and delivered on time</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Description Section */}
            <section className="py-16 px-4 md:px-8 bg-background">
                <div className="container mx-auto text-center max-w-4xl">
                    <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                        Our Services
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Fast, Reliable, and Affordable Delivery
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Mama Parcel offers nationwide delivery with real-time tracking, dedicated support, and flexible options to suit every customer. Whether you’re sending parcels locally or internationally, we make sure they arrive safely and on time.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <Globe className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Nationwide Coverage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Delivering to every city and town across the country, reliably and efficiently.</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <Heart className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Customer Satisfaction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Our priority is your happiness. Every parcel is handled with care and attention.</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <TrendingUp className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Innovative Solutions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">We leverage the latest technology to provide fast, transparent, and efficient delivery services.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-muted px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            Our Values
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            The Principles That Guide Us
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Our values are the foundation of everything we do at Mama Parcel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                                            {value.icon}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 px-4 md:px-8 relative">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            Our Journey
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Milestones Along the Way
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            From humble beginnings to nationwide service, our journey has been remarkable.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                                    {/* Content */}
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                        <Card className="border-0 shadow-lg">
                                            <CardContent className="p-6">
                                                <div className="text-sm text-primary font-semibold">{milestone.year}</div>
                                                <h3 className="text-xl font-bold mt-2">{milestone.event}</h3>
                                                <p className="text-muted-foreground mt-2">{milestone.description}</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background"></div>

                                    {/* Spacer */}
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-muted px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            Our Team
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Meet the Mama Parcel Family
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Our dedicated team works tirelessly to ensure your parcels are delivered safely and on time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-card">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl">{member.name}</CardTitle>
                                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{member.description}</p>
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