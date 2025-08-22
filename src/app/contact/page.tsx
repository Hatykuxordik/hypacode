import { Metadata } from "next";
import ContactPageClients from "./page-clients";

export const metadata: Metadata = {
  title: "Contact Hypacode - Get In Touch",
  description:
    "Reach out to Hypacode for project inquiries, collaborations, or any questions. Let's build something amazing together!",
  keywords: [
    "contact",
    "hire frontend developer",
    "collaboration",
    "get in touch",
    "hypacode",
  ],
};

export default function ContactPage() {
  return <ContactPageClients />;
}
