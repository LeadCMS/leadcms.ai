import React, { ComponentPropsWithoutRef } from 'react';

// Use React's built-in HTML element prop types instead of custom interfaces
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type CodeProps = ComponentPropsWithoutRef<'code'>;
type PreProps = ComponentPropsWithoutRef<'pre'>;
type ImageProps = ComponentPropsWithoutRef<'img'>;
type TableProps = ComponentPropsWithoutRef<'table'>;
type TableCellProps = ComponentPropsWithoutRef<'td'>;
type TableHeadProps = ComponentPropsWithoutRef<'th'>;

// Define components using proper React types
const mdxComponents = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-3xl font-bold mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-2xl font-bold mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-xl font-bold mb-2" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <h4 className="text-lg font-bold mb-2" {...props}>
      {children}
    </h4>
  ),
  p: (props: ParagraphProps) => <p className="mb-4" {...props} />,
  a: ({ children, ...props }: AnchorProps) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props}>
      {children}
    </a>
  ),
  ul: (props: ListProps) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: ListProps) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: ListItemProps) => <li className="mb-1" {...props} />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  code: (props: CodeProps) => <code className="bg-gray-100 p-1 rounded text-sm" {...props} />,
  pre: (props: PreProps) => (
    <pre className="bg-gray-800 text-white p-4 rounded overflow-auto my-4" {...props} />
  ),
  img: (props: ImageProps) => (
    <img className="max-w-full h-auto my-4" {...props} alt={props.alt || ''} />
  ),
  table: (props: TableProps) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 my-4" {...props} />
    </div>
  ),
  th: (props: TableHeadProps) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: TableCellProps) => <td className="px-6 py-4 whitespace-nowrap" {...props} />,
  hr: () => <hr className="my-8 border-t border-gray-300" />,
};

export default mdxComponents;
