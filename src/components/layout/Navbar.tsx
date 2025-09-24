import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link, useNavigate } from "react-router";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { role } from "@/constrants/role";
import { useAppDispatch } from "@/redux/hooks";
import {
  Menu,
  Package,
  User,
  LogOut,
  Home,
  Info,
  Phone,
  MapPin,
  BarChart3,
  Truck,
  ChevronRight,
  Ship
} from 'lucide-react';
import { cn } from "@/lib/utils";
import type { TRole } from "@/types";
import { baseApi } from "@/redux/baseApi";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC", icon: Home },
  { href: "/about", label: "About", role: "PUBLIC", icon: Info },
  { href: "/contact", label: "Contact", role: "PUBLIC", icon: Phone },
  { href: "/create-parcel", label: "Send Package", role: role.sender, icon: Package },
  { href: "/track", label: "Track Parcel", role: "PUBLIC", icon: MapPin },
  { href: "/admin", label: "Dashboard", role: role.admin, icon: BarChart3 },
  { href: "/admin", label: "Dashboard", role: role.superAdmin, icon: BarChart3 },
  { href: "/sender", label: "Dashboard", role: role.sender, icon: BarChart3 },
  { href: "/receiver", label: "Dashboard", role: role.receiver, icon: Truck },
];

// Role to profile path mapping function
const getProfilePath = (role: TRole) => {
  const rolePaths = {
    'SUPER_ADMIN': '/admin/profile',
    'ADMIN': '/admin/profile',
    'SENDER': '/sender/profile',
    'RECEIVER': '/receiver/profile'
  };
  return rolePaths[role];
};

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(baseApi.util.resetApiState());
    navigate('/login');
  };

  const user = data?.data;
  const userRole = user?.role;
  const hasProfilePicture = user?.picture;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-primary text-lg">
              <div className="p-2 bg-primary rounded-lg shadow-md">
                <Ship className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mama Parcel
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => {
                    const showLink = link.role === "PUBLIC" || link.role === userRole;

                    return showLink ? (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                              "hover:bg-primary/10 hover:text-primary rounded-md",
                              "data-[active]:bg-primary/20 data-[active]:text-primary"
                            )}
                          >
                            {/* <IconComponent className="h-4 w-4 flex-shrink-0" /> */}
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ) : null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          {/* Right side - User actions and theme toggle */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                <div className="hidden sm:block h-4 w-20 bg-muted rounded-md animate-pulse"></div>
              </div>
            ) : user?.email ? (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-accent"
                    >
                      {/* Profile Avatar */}
                      {hasProfilePicture ? (
                        <img
                          src={user.picture}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover border-2 border-border"
                        />
                      ) : (
                        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-border">
                          <span className="text-white font-semibold text-sm">
                            {user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="hidden sm:flex flex-col items-start">
                        <span className="text-sm font-medium text-foreground">
                          {user.email.split('@')[0]}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {user.role?.replace('_', ' ').toLowerCase()}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 p-0 overflow-hidden border shadow-xl">
                    <div className="px-4 py-4 bg-gradient-to-b from-primary/5 to-transparent">
                      <div
                        onClick={() => navigate(getProfilePath(user.role))}
                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent group"
                      >
                        <div className="flex-shrink-0">
                          {hasProfilePicture ? (
                            <img
                              src={user.picture}
                              alt="Profile"
                              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-primary/20">
                              <span className="text-white font-semibold text-lg">
                                {user.email?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground truncate">
                            {user.email}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize font-medium px-2 py-1 bg-primary/10 rounded-full inline-block mt-1">
                            {user.role?.replace('_', ' ').toLowerCase()}
                          </div>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </div>

                    <div className="p-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-3 px-3 py-2 h-10 text-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium">Sign out</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign in</span>
                  </Link>
                </Button>
                <Button asChild size="sm" className="hidden sm:flex">
                  <Link to="/register" className="flex items-center gap-2">
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-3 md:hidden">
                <div className="flex flex-col gap-1">
                  {navigationLinks.map((link, index) => {
                    const showLink = link.role === "PUBLIC" || link.role === userRole;
                    const IconComponent = link.icon;

                    return showLink ? (
                      <Button
                        key={index}
                        variant="ghost"
                        className="justify-start gap-3 px-3 py-2 h-10"
                        asChild
                      >
                        <Link to={link.href}>
                          <IconComponent className="h-4 w-4 flex-shrink-0" />
                          {link.label}
                        </Link>
                      </Button>
                    ) : null;
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}