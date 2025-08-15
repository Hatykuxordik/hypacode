import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Hypacode - Get In Touch",
  description: "Reach out to Hypacode for project inquiries, collaborations, or any questions. Let's build something amazing together!",
  keywords: ["contact", "hire frontend developer", "collaboration", "get in touch", "hypacode"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <AnimatedSection>
        <Section className="text-center mb-16">
          <StaggeredText
            text="Get In Touch"
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind, a question, or just want to say hello? 
            Feel free to reach out through the form below or directly via email.
          </p>
        </Section>
      </AnimatedSection>

      {/* Contact Form and Info */}
      <AnimatedSection delay={0.2}>
        <Section className="bg-muted/50 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FloatingCard delay={0.1}>
              <div className="p-8 rounded-lg shadow-lg bg-background">
                <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" type="text" placeholder="Project Inquiry" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message here..." rows={5} />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </FloatingCard>

            {/* Contact Info */}
            <FloatingCard delay={0.2}>
              <div className="p-8 rounded-lg shadow-lg bg-background h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 mr-3 text-primary" />
                      <span>contact@hypacode.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 mr-3 text-primary" />
                      <span>+1 (123) 456-7890</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 mr-3 text-primary" />
                      <span>San Francisco, CA, USA</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    {/* Social Media Links - Placeholder */}
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="LinkedIn"><Mail /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="GitHub"><Mail /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="Twitter"><Mail /></a>
                    </Button>
                  </div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </Section>
      </AnimatedSection>
    </div>
  );
}

