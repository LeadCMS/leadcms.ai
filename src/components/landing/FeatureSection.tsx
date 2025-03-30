import React from "react";

interface FeatureSectionProps {
    title: string;
    description?: string;
    features: React.ReactNode[];
    className?: string;
    columns?: 1 | 2 | 3 | 4;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
    title,
    description,
    features,
    className = "",
    columns = 3,
}) => {
    const gridCols = {
        1: "",
        2: "sm:grid-cols-2",
        3: "md:grid-cols-3",
        4: "sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <section className={`w-full py-12 md:py-24 lg:py-32 ${className}`}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>

                <div className={`grid gap-8 ${gridCols[columns]}`}>{features}</div>
            </div>
        </section>
    );
};
