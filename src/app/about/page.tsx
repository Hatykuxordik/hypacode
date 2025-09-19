import { Metadata } from "next";
import AboutHero from "./about-hero";
import ValuesSection from "./value-section";
import ExperienceSection from "./experience-section";
import CertificationsSection from "./certifications-section";
import EducationSection from "./education-section";
import { EnhancedNarrative } from "./enhanced-narrative";

export const metadata: Metadata = {
  title: "About - Hypacode Portfolio",
  description: "Learn about my journey as a frontend developer.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AboutHero />
        <div className="my-16">
          <EnhancedNarrative />
        </div>
        <ValuesSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
      </div>
    </div>
  );
}
