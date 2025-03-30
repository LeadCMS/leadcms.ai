import React from "react";

interface TextWithIconsSectionProps {
    title: string;
    description?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    className?: string;
    reversed?: boolean;
}

export const TextWithIconsSection: React.FC<TextWithIconsSectionProps> = ({
    title,
    description,
    leftContent,
    rightContent,
    className = "",
    reversed = false,
}) => {
    return (
        <section className={`w-full py-12 md:py-24 lg:py-32 ${className}`}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 items-center max-w-5xl mx-auto">
                    <div className={reversed ? "order-2" : ""}>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
                        {description && (
                            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
                        )}
                        {leftContent && <div className="mt-8">{leftContent}</div>}
                    </div>
                    <div className={reversed ? "order-1" : ""}>{rightContent}</div>
                </div>
            </div>
        </section>
    );
};
