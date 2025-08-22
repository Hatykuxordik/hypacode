"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export default function ContactPageClients() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Placeholder for Formspree; replace 'xdkobqpb' with your form ID
  // const [state, handleSubmit] = useForm("xdkobqpb"); // Uncomment if using Formspree

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate submission or use Formspree
    try {
      // await handleSubmit(e); // If using Formspree
      // if (state.succeeded) {
      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      // }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. I'll get back to you as soon as
                possible.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const contactInfo = [
    {
      icon: MailIcon,
      label: "Email",
      value: "hatykuxordik@gmail.com",
      href: "mailto:hatykuxordik@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+2349086802928",
      href: "tel:+234(908)680-2928",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lagos, Nigeria",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "@hatykuxordik",
      href: "https://github.com/hatykuxordik",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "@hatykuxordik",
      href: "https://linkedin.com/in/hatykuxordik",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <AnimatedSection>
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I&apos;m always excited to discuss new opportunities, collaborate
              on projects, or just have a conversation about web development.
              Let&apos;s connect!
            </p>
          </section>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <FloatingCard delay={0.1}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Send Me a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Your message here..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
                      <p className="text-destructive text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FloatingCard>

          {/* Contact Information */}
          <FloatingCard delay={0.2}>
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <p className="text-muted-foreground">
                    Prefer to reach out directly? Here are my contact details.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{info.label}</p>
                          {info.href !== "#" ? (
                            <a
                              href={info.href}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Connect With Me</CardTitle>
                  <p className="text-muted-foreground">
                    Follow me on social media for updates and tech insights.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/10 transition-colors group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{social.label}</p>
                          <p className="text-muted-foreground">
                            {social.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Availability</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    I'm currently available for freelance projects and full-time
                    opportunities. I typically respond to messages within 24
                    hours.
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Available for new projects
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FloatingCard>
        </div>

        {/* FAQ Section */}
        <AnimatedSection delay={0.3}>
          <Section className="mt-20">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    What's your typical response time?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    I usually respond to emails and messages within 24 hours,
                    often much sooner during business hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Do you work with international clients?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Absolutely! I have experience working with clients across
                    different time zones and am comfortable with remote
                    collaboration.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    What types of projects do you take on?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    I specialize in frontend development, including landing
                    pages, web applications, dashboards, and e-commerce sites
                    using React, Next.js, and modern technologies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Do you provide ongoing support?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, I offer maintenance and support services for projects
                    I've developed, including bug fixes, updates, and feature
                    enhancements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>
        </AnimatedSection>
      </div>
    </div>
  );
}
