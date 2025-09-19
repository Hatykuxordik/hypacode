"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  Code2,
  Lightbulb,
  Users,
  Target,
  BookOpen,
  Zap,
  Heart,
  Trophy,
} from "lucide-react";

export function EnhancedNarrative() {
  return (
    <div className="space-y-12">
      {/* Personal Story Section */}
      <AnimatedSection>
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">My Journey & Philosophy</h2>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                My path to frontend development began during my biochemistry
                studies at Obafemi Awolowo University. In my 200 level, I took a
                Python programming course (CSS 201). Starting with the basics of
                Python, I quickly fell in love with programming. It reignited
                memories of my secondary school days when I once had the
                opportunity to learn web development but declined, thinking it
                was too difficult. The Python course changed that perspective,
                proving that coding was not as intimidating as I had once
                imagined.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Driven by curiosity and a love for creativity—especially from my
                background in graphic design—I shifted into web development. I
                began with YouTube tutorials, learning the fundamentals of HTML
                and CSS, while also studying from O&apos;Reilly textbooks to
                deepen my understanding. After months of self-study, I decided
                to invest in formal training. I purchased several Jonas
                Schmedtmann courses on Udemy, which gave me hands-on experience
                with modern frontend development and strengthened my foundations
                in building scalable, responsive applications.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                What drives me most is the intersection of aesthetics and
                functionality. I believe that great user interfaces should feel
                intuitive, perform flawlessly, and solve real problems. Every
                line of code I write is guided by the principle that technology
                should enhance human experiences, not complicate them.
              </p>

              <p className="text-lg leading-relaxed">
                Today, I approach each project with the same scientific rigor I
                learned in biochemistry—hypothesis, experimentation, analysis,
                and iteration. This methodology has helped me deliver solutions
                that not only meet technical requirements but also create
                meaningful connections between users and digital products.
              </p>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Development Philosophy */}
      <AnimatedSection delay={0.1}>
        <Card>
          <CardContent className="pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Development Philosophy</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Code2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Code as Craft</h3>
                    <p className="text-muted-foreground">
                      I treat code as a craft, focusing on readability,
                      maintainability, and performance. Every component is built
                      with future developers in mind, including comprehensive
                      documentation and clear architectural decisions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">User-Centric Design</h3>
                    <p className="text-muted-foreground">
                      Before writing any code, I immerse myself in understanding
                      the user's journey. I believe that the best interfaces are
                      invisible—they guide users naturally toward their goals
                      without friction or confusion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Business Impact</h3>
                    <p className="text-muted-foreground">
                      Every technical decision I make is evaluated through the
                      lens of business value. I focus on solutions that drive
                      engagement, improve conversion rates, and contribute to
                      measurable business outcomes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Performance First</h3>
                    <p className="text-muted-foreground">
                      In today's fast-paced digital world, performance isn't
                      optional. I optimize for Core Web Vitals, implement
                      efficient loading strategies, and ensure applications
                      perform excellently across all devices and network
                      conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Problem-Solving Approach */}
      <AnimatedSection delay={0.2}>
        <Card>
          <CardContent className="pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Problem-Solving Approach</h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-semibold text-lg mb-2">
                  1. Deep Understanding
                </h3>
                <p className="text-muted-foreground mb-4">
                  I start every project by thoroughly understanding the problem
                  space, user needs, and business constraints. This involves
                  stakeholder interviews, user research, and competitive
                  analysis to ensure I'm solving the right problems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">User Research</Badge>
                  <Badge variant="outline">Stakeholder Interviews</Badge>
                  <Badge variant="outline">Competitive Analysis</Badge>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-semibold text-lg mb-2">
                  2. Strategic Planning
                </h3>
                <p className="text-muted-foreground mb-4">
                  I break down complex problems into manageable components,
                  create detailed technical specifications, and establish clear
                  success metrics. This planning phase prevents scope creep and
                  ensures efficient development cycles.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Technical Architecture</Badge>
                  <Badge variant="outline">Component Design</Badge>
                  <Badge variant="outline">Success Metrics</Badge>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-semibold text-lg mb-2">
                  3. Iterative Development
                </h3>
                <p className="text-muted-foreground mb-4">
                  I believe in rapid prototyping and iterative improvement. By
                  building MVPs quickly and gathering feedback early, I can
                  validate assumptions and make data-driven decisions throughout
                  the development process.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Rapid Prototyping</Badge>
                  <Badge variant="outline">User Testing</Badge>
                  <Badge variant="outline">Data-Driven Decisions</Badge>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-semibold text-lg mb-2">
                  4. Continuous Optimization
                </h3>
                <p className="text-muted-foreground mb-4">
                  Post-launch, I monitor performance metrics, user behavior, and
                  business KPIs to identify optimization opportunities. I
                  believe great products are never finished— they evolve based
                  on real-world usage and feedback.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Performance Monitoring</Badge>
                  <Badge variant="outline">A/B Testing</Badge>
                  <Badge variant="outline">Continuous Improvement</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Learning & Growth */}
      <AnimatedSection delay={0.3}>
        <Card>
          <CardContent className="pt-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                Continuous Learning & Growth
              </h2>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                The frontend development landscape evolves rapidly, and I've
                made continuous learning a cornerstone of my professional
                practice. I dedicate at least 5 hours weekly to exploring new
                technologies, reading industry publications, and contributing to
                open-source projects.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                My learning approach combines theoretical understanding with
                practical application. When I encounter a new framework or tool,
                I don't just read the documentation—I build real projects that
                push the boundaries of what I know. This hands-on methodology
                has helped me quickly adapt to emerging technologies and
                industry best practices.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                I'm particularly excited about the intersection of AI and
                frontend development. I've been experimenting with AI-powered
                development tools, exploring how machine learning can enhance
                user experiences, and investigating the potential of automated
                testing and optimization.
              </p>

              <div className="bg-muted/50 p-6 rounded-lg mt-6">
                <h3 className="font-semibold text-lg mb-4">
                  Current Learning Focus
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Technical Skills</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • Advanced React patterns and performance optimization
                      </li>
                      <li>• Server-side rendering with Next.js 14+</li>
                      <li>
                        • WebAssembly for high-performance web applications
                      </li>
                      <li>• Progressive Web App development</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Industry Trends</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• AI-powered development workflows</li>
                      <li>• Web3 and decentralized application development</li>
                      <li>• Advanced accessibility and inclusive design</li>
                      <li>• Micro-frontend architectures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
