import Link from "next/link";
import Image from "next/image";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
} from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-12">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/Hypacodelogo.svg"
                alt="Hypacode Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-primary">Hypacode</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              Frontend Developer passionate about creating user-friendly,
              responsive, and visually appealing web applications with modern
              technologies.
            </p>

            {/* Social */}
            <div className="mt-4">
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/hatykuxordik.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/hatykuxordik"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/hypacode"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:hatykuxordik@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <MailIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Frontend Development</li>
              <li className="text-muted-foreground">Web Applications</li>
              <li className="text-muted-foreground">Debugging</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Hypacode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
