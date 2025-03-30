import React from "react";

interface HeroSectionProps {
    badge?: React.ReactNode;
    title: string;
    description: string;
    actions?: React.ReactNode;
    visual?: React.ReactNode;
    className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    badge,
    title,
    description,
    actions,
    visual,
    className = "",
}) => {
    return (
        <section
            className={`w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted ${className}`}
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div className="flex flex-col items-start">
                        {badge && <div className="mb-4">{badge}</div>}
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            {title}
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">{description}</p>
                        {actions && <div className="flex flex-wrap gap-4 mt-8">{actions}</div>}
                    </div>
                    {visual && <div className="relative">{visual}</div>}
                </div>
            </div>
        </section>
    );
};
