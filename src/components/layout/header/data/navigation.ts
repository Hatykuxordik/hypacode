import {
  Home,
  User,
  Code,
  FolderOpen,
  Wrench,
  MessageSquare,
  Mail,
  BookOpen,
} from "lucide-react";

export const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Blog", href: "/blog", icon: BookOpen },
];
