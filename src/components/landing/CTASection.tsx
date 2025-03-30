import React from "react";

interface CTASectionProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    title,
    description,
    actions,
    bgColor = "bg-primary",
    textColor = "text-primary-foreground",
    className = "",
}) => {
    return (
        <section className={`w-full py-12 md:py-24 lg:py-32 ${bgColor} ${textColor} ${className}`}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {title}
                </h2>
                {description && <p className="mt-6 text-xl max-w-2xl mx-auto">{description}</p>}
                {actions && (
                    <div className="flex flex-wrap gap-4 justify-center mt-10">{actions}</div>
                )}
            </div>
        </section>
    );
};
