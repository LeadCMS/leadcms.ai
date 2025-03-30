import { Link } from "gatsby";
import React from "react";

interface FooterLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

interface FooterProps {
    logo?: React.ReactNode;
    copyright?: string;
    links?: FooterLink[];
}

export const Footer: React.FC<FooterProps> = ({ logo, copyright, links = [] }) => {
    const year = new Date().getFullYear();

    // Default links if none provided
    const defaultLinks: FooterLink[] =
        links.length > 0
            ? links
            : [
                  { label: "Terms", href: "/terms" },
                  { label: "Privacy", href: "/privacy" },
                  { label: "Contact", href: "/contact" },
              ];

    return (
        <footer className="w-full border-t py-8 mt-auto">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {logo}
                        <p className="text-sm text-muted-foreground">
                            {copyright || `© ${year} OnlineSales. All rights reserved.`}
                        </p>
                    </div>

                    <nav className="flex gap-6">
                        {defaultLinks.map((link, i) =>
                            link.isExternal ? (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={i}
                                    to={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>
                </div>
            </div>
        </footer>
    );
};
