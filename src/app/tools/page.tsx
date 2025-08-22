import { InteractiveToolsPage } from "@/components/tools/interactive-tools-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Tools - Hypacode Portfolio",
  description:
    "Explore interactive web development tools that showcase modern frontend capabilities including color palette generator, responsive design tester, and more.",
  keywords: [
    "web tools",
    "frontend tools",
    "color palette",
    "responsive design",
    "drag drop builder",
    "hypacode",
  ],
};

export default function ToolsPage() {
  return <InteractiveToolsPage />;
}
