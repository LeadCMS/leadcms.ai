import React, { ComponentPropsWithoutRef } from 'react';

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { ContactUs } from "@/components/contact-us";
import { MDXProviderComponents } from '@mdx-js/react';

// UI components and icons for MDX use
const uiComponents = {
  Button,
  Link,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  ContactUs
};

// Use React's built-in HTML element prop types instead of custom interfaces
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type ImageProps = ComponentPropsWithoutRef<'img'>;
type TableProps = ComponentPropsWithoutRef<'table'>;
type TableCellProps = ComponentPropsWithoutRef<'td'>;
type TableHeadProps = ComponentPropsWithoutRef<'th'>;
type DivProps = ComponentPropsWithoutRef<'div'>;
type SectionProps = ComponentPropsWithoutRef<'section'>;
type InputProps = ComponentPropsWithoutRef<'input'>;
type TextareaProps = ComponentPropsWithoutRef<'textarea'>;
type LabelProps = ComponentPropsWithoutRef<'label'>;
type FormProps = ComponentPropsWithoutRef<'form'>;
type SpanProps = ComponentPropsWithoutRef<'span'>;

// Define components using proper React types
const baseComponents = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <h4 {...props}>
      {children}
    </h4>
  ),
  p: (props: ParagraphProps) => <p {...props} />,
  a: ({ children, ...props }: AnchorProps) => (
    <a {...props}>
      {children}
    </a>
  ),
  ul: (props: ListProps) => <ul {...props} />,
  ol: (props: ListProps) => <ol {...props} />,
  li: (props: ListItemProps) => <li {...props} />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote {...props} />
  ),  
  
  img: (props: ImageProps) => (
    <img {...props} alt={props.alt || ''} />
  ),
  table: (props: TableProps) => (
    <div>
      <table {...props} />
    </div>
  ),
  th: (props: TableHeadProps) => (
    <th {...props} />
  ),
  td: (props: TableCellProps) => <td {...props} />,
  hr: () => <hr />,
  div: (props: DivProps) => <div {...props} />,
  section: (props: SectionProps) => <section {...props} />,
  input: (props: InputProps) => <input {...props} />,
  textarea: (props: TextareaProps) => <textarea {...props} />,
  label: (props: LabelProps) => <label {...props} />,
  form: (props: FormProps) => <form {...props} />,
  span: (props: SpanProps) => <span {...props} />,
};

// Combined components object for MDXProvider

export default {
  ...LucideIcons,
  ...baseComponents,
  ...uiComponents,
} as unknown as MDXProviderComponents;
