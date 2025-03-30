import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface LinkProps {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const Link: React.FC<LinkProps> = ({ 
  href, 
  children, 
  className,
  ...rest 
}) => {
  // Gatsby's Link component uses 'to' instead of 'href'
  return (
    <GatsbyLink to={href} className={className} {...rest}>
      {children}
    </GatsbyLink>
  );
};

export { Link };
