import { useEffect } from 'react';

const SEO = ({ title, description, keywords, image, schema }) => {
  useEffect(() => {
    // Set Document Title
    const defaultTitle = 'Cake Snow Bakery - Best Cake in Nepal | Anniversary & Chocolate Cakes';
    const fullTitle = title ? `${title} | Cake Snow Bakery` : defaultTitle;
    document.title = fullTitle;
    
    // Update Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
      
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
    }

    // Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    // Update Image Tags
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', image);
      } else {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        ogImage.setAttribute('content', image);
        document.head.appendChild(ogImage);
      }

      let twImage = document.querySelector('meta[property="twitter:image"]');
      if (twImage) {
        twImage.setAttribute('content', image);
      } else {
        twImage = document.createElement('meta');
        twImage.setAttribute('property', 'twitter:image');
        twImage.setAttribute('content', image);
        document.head.appendChild(twImage);
      }
    }

    // Update Structured Data Schema
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
      // Remove existing schema if not provided for this page
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) existingScript.remove();
    }
  }, [title, description, keywords, image, schema]);

  return null;
};

export default SEO;
