import * as LucideIcons from "lucide-react";
import React from "react";

// Create a component that can render any Lucide icon by name
export const LucideIcon: React.FC<{
    name: string;
    className?: string;
    size?: number;
}> = ({ name, className = "", size = 24 }) => {
    const Icon = (LucideIcons as any)[name];

    if (!Icon) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return <Icon className={className} size={size} />;
};

// Export all Lucide icons
export const icons = LucideIcons;
