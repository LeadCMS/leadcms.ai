import React from "react";

interface CodeBlockSectionProps {
    title: string;
    description?: string;
    code: string;
    additionalContent?: React.ReactNode;
    className?: string;
}

export const CodeBlockSection: React.FC<CodeBlockSectionProps> = ({
    title,
    description,
    code,
    additionalContent,
    className = "",
}) => {
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

                <div className="max-w-4xl mx-auto">
                    <div className="bg-black rounded-lg overflow-hidden shadow-xl relative">
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full z-[-1]"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full z-[-1]"></div>

                        <div className="flex items-center h-8 bg-gray-800 px-4">
                            <div className="flex space-x-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="ml-2 text-xs text-gray-400">terminal</div>
                        </div>
                        <div className="p-4 md:p-8 overflow-x-auto">
                            <pre className="text-green-400 font-mono text-sm md:text-base whitespace-pre-wrap break-all">
                                {code}
                            </pre>
                        </div>
                    </div>

                    {additionalContent && <div className="mt-12">{additionalContent}</div>}
                </div>
            </div>
        </section>
    );
};
