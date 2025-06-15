import "./src/styles/global.css";

import React from "react";
import type { WrapPageElementNodeArgs } from "gatsby";
import { LayoutSelector } from "@/components/layoutSelector";

export const wrapPageElement = (args: WrapPageElementNodeArgs): React.ReactElement => {
    console.log("wrapPageElement args:", args);
    const { element, props } = args;
    console.log("props.pageContext.frontmatter:", props?.pageContext?.frontmatter);
    console.log("props.pageContext.timeToRead:", props?.pageContext?.timeToRead);

    // Type cast timeToRead to the expected structure
    const timeToRead = props?.pageContext?.timeToRead as { text: string; minutes: number } | undefined;

    return <LayoutSelector frontmatter={props?.pageContext?.frontmatter as Record<string, any> | undefined} timeToRead={timeToRead}>{element}</LayoutSelector>;
};
