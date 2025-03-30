import { Package } from "lucide-react";
import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    hideHeader?: boolean;
    hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    header,
    footer,
    hideHeader = false,
    hideFooter = false,
}) => {
    return (
        <div className="flex min-h-screen flex-col">
            {!hideHeader && (header || <Header logo={<Package className="h-6 w-6" />} />)}

            <main className="flex-1">{children}</main>

            {!hideFooter && (footer || <Footer logo={<Package className="h-6 w-6" />} />)}
        </div>
    );
};
