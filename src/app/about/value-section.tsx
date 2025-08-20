"use client";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { values } from "./data/about";

export default function ValuesSection() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">My Core Values</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          These principles guide my approach to development and collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
