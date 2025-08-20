"use client";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";
import Link from "next/link";
import { certifications } from "./data/about";

export default function CertificationsSection() {
  return (
    <Section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <Award className="h-8 w-8 mr-3 text-primary" />
          Certifications & Achievements
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional certifications and recognitions that validate my
          expertise
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow hover-lift"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                  <Link
                    href={cert.url}
                    target="_blank"
                    className="inline-block text-muted-foreground mb-2 hover:text-primary"
                  >
                    {cert.issuer}
                  </Link>
                  <Badge
                    variant="secondary"
                    className="flex items-center w-fit"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    {cert.year}
                  </Badge>
                </div>
                <Award className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
