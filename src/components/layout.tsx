import * as React from "react";
import { Link } from "gatsby";
import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/icon-192x192.png" alt="LeadCMS Logo" className="h-12 w-12" />
              <span className="text-xl font-bold">LeadCMS</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/#features" className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
              <Link to="/#why" className="text-sm font-medium hover:underline underline-offset-4">
                Why LeadCMS
              </Link>
              <Link to="/#compare" className="text-sm font-medium hover:underline underline-offset-4">
                Compare
              </Link>
              <Link to="/blog" className="text-sm font-medium hover:underline underline-offset-4">
                Blog
              </Link>
              <Link to="/contact-us" className="text-sm font-medium hover:underline underline-offset-4">
                Contact Us
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/LeadCMS"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-sm font-medium"
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </a>
              <Button asChild>
                <Link to="#contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>
        
        {children}
        
        <footer className="w-full border-t py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <img src="/images/icon-192x192.png" alt="LeadCMS Logo" className="h-12 w-12" />
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} LeadCMS. All rights reserved.
                </p>
              </div>
              <nav className="flex gap-6">
                <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                  Blog
                </Link>
                <Link to="/legal/terms" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                  Terms
                </Link>
                <Link to="/legal/privacy" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                  Privacy
                </Link>
                <a
                  href="https://github.com/LeadCMS/leadcms.core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                >
                  Docs
                </a>
                <a
                  href="https://github.com/LeadCMS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};