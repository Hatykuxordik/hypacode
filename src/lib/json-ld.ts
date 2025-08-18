import { Organization, Person, WebSite } from "schema-dts";

export const organizationSchema: Organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hypacode",
  url: "https://hypacode.com",
  logo: "https://hypacode.com/assets/Hypacodelogo.svg",
  sameAs: [
    "https://github.com/hypacode", // Replace with actual GitHub
    "https://linkedin.com/in/hypacode", // Replace with actual LinkedIn
    // Add other social media links
  ],
};

export const personSchema: Person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hypacode",
  url: "https://hypacode.com",
  image: "https://hypacode.com/assets/profile.jpg", // Replace with actual profile image
  sameAs: [
    "https://github.com/hypacode",
    "https://linkedin.com/in/hypacode",
    // Add other social media links
  ],
  jobTitle: "Frontend Developer",
  worksFor: organizationSchema,
};

export const websiteSchema: WebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hypacode - Frontend Developer Portfolio",
  url: "https://hypacode.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hypacode.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};


