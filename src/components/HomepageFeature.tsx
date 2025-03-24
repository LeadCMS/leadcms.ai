import { Link } from 'gatsby';
import React from 'react';

interface HomepageFeatureProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  linkUrl?: string;
  linkText?: string;
  layout?: 'left' | 'right' | 'center';
}

const HomepageFeature: React.FC<HomepageFeatureProps> = ({ 
  title, 
  description, 
  image, 
  imageAlt,
  linkUrl, 
  linkText = 'Learn More',
  layout = 'left'
}) => {
  return (
    <div className={`homepage-feature homepage-feature-${layout}`}>
      {image && (
        <div className="feature-image">
          <img src={image} alt={imageAlt || title || 'Feature image'} />
        </div>
      )}
      <div className="feature-content">
        {title && <h2 className="feature-title">{title}</h2>}
        {description && <p className="feature-description">{description}</p>}
        {linkUrl && (
          <Link to={linkUrl} className="feature-link">
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomepageFeature;
