import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Mail, Phone, MapPin, Clock, Send, CheckCircle,
    MessageCircle, MailCheck, HeartHandshake
} from 'lucide-react';
import { faqs } from '@/assets/data/data';

export default function Contact() {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would handle form submission here
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactMethods = [
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Call Us",
            details: "+1 (800) 123-4567",
            description: "Our support team is available 24/7"
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Us",
            details: "support@mamaparcel.com",
            description: "Send us an email anytime"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Visit Us",
            details: "123 Delivery Street, City, Country",
            description: "Come say hello at our headquarters"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Business Hours",
            details: "Mon - Fri: 8AM - 6PM",
            description: "Weekends: 9AM - 4PM"
        }
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary text-sm px-4 py-1">
                            Get in Touch
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            We're Here to <span className="text-primary">Help</span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Have questions about our delivery services? Our team is ready to assist you with any inquiries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                                            {method.icon}
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg">{method.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-foreground">{method.details}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{method.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form and FAQ */}
            <section className="py-16 px-4 md:px-8 bg-muted">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5 text-primary" />
                                    Send us a Message
                                </CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                        <p className="text-muted-foreground">
                                            Thank you for contacting us. We'll get back to you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="your.email@example.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="What is this regarding?"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="How can we help you?"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full gap-2">
                                            <Send className="h-4 w-4" />
                                            Send Message
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* FAQ Section */}
                        <div>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <HeartHandshake className="h-5 w-5 text-primary" />
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-muted-foreground">
                                    Find quick answers to common questions about our services.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <Card key={index} className="border-0 shadow-sm">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold mb-2">{faq.question}</h3>
                                            <p className="text-muted-foreground text-sm">{faq.answer}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <Card className="mt-8 border-0 bg-primary/5">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <MailCheck className="h-8 w-8 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-2">Prefer email?</h3>
                                            <p className="text-muted-foreground text-sm">
                                                You can also reach us directly at support@mamaparcel.com.
                                                We typically respond within a few hours.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            {/* <section className="py-16 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Location</h2>
                        <p className="text-muted-foreground">
                            Visit our headquarters or find one of our many distribution centers near you.
                        </p>
                    </div>

                    <Card className="border-0 shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <div className="aspect-video bg-muted flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        123 Delivery Street, City, Country
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section> */}
            {/* Map Section */}
            <section className="py-16 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Location</h2>
                        <p className="text-muted-foreground">
                            Visit our headquarters or find one of our many distribution centers near you.
                        </p>
                    </div>

                    <Card className="border-0 shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <div className="w-full aspect-video">
                                {/* <iframe
                                    title="Mama Parcel Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902536123456!2d90.40123456789012!3d23.810123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77e01234567%3A0xabcdef1234567890!2s123%20Delivery%20Street%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1694694400000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    className="border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe> */}
                                <iframe
                                    title="Mama Parcel Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902536123456!2d90.40123456789012!3d23.810123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77e01234567%3A0xabcdef1234567890!2sExact%20Address%20Here!5e0!3m2!1sen!2sus!4v1694694400000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    className="border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="text-center py-4">
                                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                                <p className="text-foreground font-semibold">123 Delivery Street, Dhaka, Bangladesh</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-primary-foreground/10"></div>
                <div className="container mx-auto text-center relative z-10 max-w-4xl">
                    <Badge className="mb-4 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                        Need Help?
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                        Our customer support team is available 24/7 to assist you with any questions or concerns.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-background text-foreground hover:bg-background/90 px-8 shadow-lg"
                            onClick={() => window.location.href = 'tel:+18001234567'}
                        >
                            Call Now
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-background text-background hover:bg-primary-foreground/10 px-8 shadow-lg"
                            onClick={() => window.location.href = 'mailto:support@mamaparcel.com'}
                        >
                            Email Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};