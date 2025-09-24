import { Link } from 'react-router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Package,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowRight,
    Heart
} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center">
                            <Package className="h-8 w-8 text-primary mr-2" />
                            <span className="text-2xl font-bold">Mama Parcel</span>
                        </Link>
                        <p className="text-muted-foreground max-w-xs">
                            Delivering your packages with care, speed, and reliability. Experience the next generation of parcel delivery services.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services/domestic" className="text-muted-foreground hover:text-primary transition-colors">
                                    Domestic Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/international" className="text-muted-foreground hover:text-primary transition-colors">
                                    International Shipping
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/express" className="text-muted-foreground hover:text-primary transition-colors">
                                    Express Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/business" className="text-muted-foreground hover:text-primary transition-colors">
                                    Business Solutions
                                </Link>
                            </li>
                            <li>
                                <Link to="/track" className="text-muted-foreground hover:text-primary transition-colors">
                                    Package Tracking
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/press" className="text-muted-foreground hover:text-primary transition-colors">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Stay Updated</h3>
                        <p className="text-muted-foreground">Subscribe to our newsletter for the latest updates and offers.</p>
                        <div className="flex space-x-2">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1"
                            />
                            <Button size="icon">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info Bar */}
            <div className="border-t border-b py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center justify-center">
                            <Phone className="h-5 w-5 text-primary mr-2" />
                            <span className="text-muted-foreground">+1 (800) 123-4567</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary mr-2" />
                            <span className="text-muted-foreground">support@mapaparcel.com</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary mr-2" />
                            <span className="text-muted-foreground">123 Delivery St, City, Country</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-muted-foreground text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Mama Parcel. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                            Cookie Policy
                        </Link>
                        <Link to="/sitemap" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>

            {/* Made with love */}
            <div className="bg-muted py-3">
                <div className="container mx-auto px-4">
                    <div className="text-center text-xs text-muted-foreground flex items-center justify-center">
                        Made with <Heart className="h-3 w-3 mx-1 text-red-500 fill-current" /> by the Mama Parcel team
                    </div>
                </div>
            </div>
        </footer>
    );
};