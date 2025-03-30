import React from "react";

interface ContactSectionProps {
    title: string;
    description?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
    title,
    description,
    leftContent,
    rightContent,
    className = "",
}) => {
    return (
        <section className={`w-full py-12 md:py-24 lg:py-32 ${className}`}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {(title || description) && (
                        <div className="text-center mb-16">
                            {title && (
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-4 text-lg text-muted-foreground">{description}</p>
                            )}
                        </div>
                    )}

                    <div className="grid gap-12 md:grid-cols-2">
                        {leftContent && <div>{leftContent}</div>}
                        {rightContent && <div>{rightContent}</div>}
                    </div>
                </div>
            </div>
        </section>
    );
};
