import * as React from "react";
import { Link } from "gatsby";
import { Button } from "@/components/ui/button";
import { Package, GitBranch } from "lucide-react";
import { StyleSafelist } from "./ui/safelist";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <StyleSafelist />
      
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              <span className="text-xl font-bold">OnlineSales</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/#features" className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
              <Link to="/#why" className="text-sm font-medium hover:underline underline-offset-4">
                Why OnlineSales
              </Link>
              <Link to="/#compare" className="text-sm font-medium hover:underline underline-offset-4">
                Compare
              </Link>
              <Link to="/contact-us" className="text-sm font-medium hover:underline underline-offset-4">
                Contact Us
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                to="https://github.com/peterliapin/onlinesales.core"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-sm font-medium"
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </Link>
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
                <Package className="h-6 w-6" />
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} OnlineSales. All rights reserved.
                </p>
              </div>
              <nav className="flex gap-6">
                <Link to="/terms" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                  Terms
                </Link>
                <Link to="/privacy" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                  Privacy
                </Link>
                <Link to="/getting-started" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                  Docs
                </Link>
                <Link
                  to="https://github.com/peterliapin/onlinesales.core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                >
                  GitHub
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
      </>    
  );
};
