import { Link } from "gatsby";
import React from "react";

interface FooterLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

interface LandingFooterProps {
    logo?: React.ReactNode;
    copyright?: string;
    links?: FooterLink[];
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ logo, copyright, links = [] }) => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t py-8">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {logo}
                        <p className="text-sm text-muted-foreground">
                            {copyright || `© ${year} All rights reserved.`}
                        </p>
                    </div>

                    <nav className="flex gap-6">
                        {links.map((link, i) =>
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
