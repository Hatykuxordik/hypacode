// Structured data for SEO optimization
export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sodiq Atiku",
  "alternateName": "Hypacode",
  "description": "Frontend Developer specializing in React, Next.js, and TypeScript with 3+ years of experience building modern web applications",
  "url": "https://hypacode.com",
  "image": "https://hypacode.com/assets/profile1.jpg",
  "sameAs": [
    "https://github.com/hatykuxordik",
    "https://linkedin.com/in/sodiq-atiku",
    "https://twitter.com/hypacode"
  ],
  "jobTitle": "Frontend Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "knowsAbout": [
    "React.js",
    "Next.js", 
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Node.js",
    "Web Development",
    "Frontend Development",
    "Responsive Design",
    "User Interface Design"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Self-taught Developer"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG"
  }
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sodiq Atiku - Frontend Developer Portfolio",
  "alternateName": "Hypacode Portfolio",
  "url": "https://hypacode.com",
  "description": "Professional portfolio showcasing frontend development projects and expertise in React, Next.js, and TypeScript",
  "author": {
    "@type": "Person",
    "name": "Sodiq Atiku"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hypacode.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const professionalServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Hypacode - Frontend Development Services",
  "description": "Professional frontend development services specializing in React, Next.js, and TypeScript applications",
  "url": "https://hypacode.com",
  "telephone": "+234-XXX-XXX-XXXX", // Add actual phone number
  "email": "contact@hypacode.com", // Add actual email
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "9.0765",
    "longitude": "7.3986"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "serviceType": "Web Development",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Frontend Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "React Development",
          "description": "Custom React.js application development"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Next.js Development",
          "description": "Full-stack Next.js application development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "TypeScript Development",
          "description": "Type-safe JavaScript application development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Application Development", 
          "description": "Modern, responsive web application development"
        }
      }
    ]
  }
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hypacode",
  "alternateName": "Sodiq Atiku Frontend Development",
  "url": "https://hypacode.com",
  "logo": "https://hypacode.com/assets/Hypacodelogo.svg",
  "description": "Frontend development services specializing in modern web technologies",
  "founder": {
    "@type": "Person",
    "name": "Sodiq Atiku"
  },
  "foundingDate": "2021",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+234-XXX-XXX-XXXX", // Add actual phone number
    "contactType": "customer service",
    "email": "contact@hypacode.com", // Add actual email
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://github.com/hatykuxordik",
    "https://linkedin.com/in/sodiq-atiku",
    "https://twitter.com/hypacode"
  ]
};

// Blog post structured data generator
export function generateBlogPostStructuredData(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image || "https://hypacode.com/assets/profile1.jpg",
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://hypacode.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hypacode",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hypacode.com/assets/Hypacodelogo.svg"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  };
}

// Project structured data generator
export function generateProjectStructuredData(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  technologies: string[];
  dateCreated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description,
    "url": project.url,
    "image": project.image,
    "creator": {
      "@type": "Person",
      "name": "Sodiq Atiku",
      "url": "https://hypacode.com"
    },
    "dateCreated": project.dateCreated,
    "keywords": project.technologies.join(", "),
    "genre": "Web Application",
    "inLanguage": "en-US"
  };
}

