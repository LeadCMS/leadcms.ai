import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "secondary";
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
    variant = "default",
    className = "",
    children,
    ...props
}) => {
    const variantStyles = {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    };

    return (
        <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
