import { Link } from "gatsby";
import React from "react";

interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

interface HeaderProps {
    logo?: React.ReactNode;
    title?: string;
    navigation?: NavItem[];
    actions?: React.ReactNode[];
}

export const Header: React.FC<HeaderProps> = ({
    logo,
    title = "OnlineSales",
    navigation = [],
    actions = [],
}) => {
    // Default navigation items if none provided
    const defaultNavigation: NavItem[] =
        navigation.length > 0
            ? navigation
            : [
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: "About", href: "/about" },
              ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    {logo}
                    {title && (
                        <Link to="/" className="text-xl font-bold">
                            {title}
                        </Link>
                    )}
                </div>

                <nav className="hidden md:flex gap-6">
                    {defaultNavigation.map((item, i) =>
                        item.isExternal ? (
                            <a
                                key={i}
                                href={item.href}
                                className="text-sm font-medium hover:underline underline-offset-4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={i}
                                to={item.href}
                                className="text-sm font-medium hover:underline underline-offset-4"
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                <div className="flex items-center gap-4">{actions}</div>
            </div>
        </header>
    );
};
