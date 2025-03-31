declare module '@mdx-js/react' {
  import * as React from 'react';
  
  type ComponentType =
    | 'a'
    | 'blockquote'
    | 'code'
    | 'delete'
    | 'em'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'hr'
    | 'img'
    | 'inlineCode'
    | 'li'
    | 'ol'
    | 'p'
    | 'pre'
    | 'strong'
    | 'thematicBreak'
    | 'ul'
    | string;
  
  export interface MDXProviderComponents {
    [key: ComponentType]: React.ComponentType<any>;
  }
  
  export interface MDXProviderProps {
    components: MDXProviderComponents;
    children: React.ReactNode;
  }
  
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}

declare module 'gatsby-plugin-mdx' {
  import * as React from 'react';
  
  export interface MDXRendererProps {
    children: string;
  }
  
  export class MDXRenderer extends React.Component<MDXRendererProps> {}
}
