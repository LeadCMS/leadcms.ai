import React, { useState } from "react";

interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsComparisonSectionProps {
    title: string;
    description?: string;
    tabs: TabItem[];
    className?: string;
}

export const TabsComparisonSection: React.FC<TabsComparisonSectionProps> = ({
    title,
    description,
    tabs,
    className = "",
}) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id);

    return (
        <section className={`w-full py-12 md:py-24 lg:py-32 ${className}`} id="compare">
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
                    <div className="w-full">
                        <div className="flex border-b mb-4">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 font-medium text-sm flex-1 text-center 
                    ${
                        activeTab === tab.id
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="p-6 border rounded-lg bg-background">
                            {tabs.find(tab => tab.id === activeTab)?.content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
