import Link from "next/link";
import { Container } from "./container";
import { CalendarIcon } from "./icons";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background to-background/50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl -mt-32" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl -mb-48" />
      
      <Container>
        <div className="relative z-10 grid gap-12 py-16 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2 transition-transform hover:scale-105">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 text-white">
                <CalendarIcon className="size-4" />
              </span>
              <span className="font-heading text-lg font-bold text-gradient-primary">
                EventHive
              </span>
            </Link>
            <p className="text-sm leading-7 text-muted-foreground">
              The premium event platform for creators who want impact, speed, and beautiful design.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="inline-flex w-9 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all hover:scale-110" title="Twitter">
                𝕏
              </a>
              <a href="#" className="inline-flex w-9 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all hover:scale-110" title="GitHub">
                ⚙
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="/events">
                    Find Events
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="/organizers">
                    Host Events
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="/#faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="#">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="#">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="#">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="#">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-primary transition-colors" href="#">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="relative z-10 flex flex-col items-start justify-between gap-4 border-t border-border/40 py-6 text-sm md:flex-row md:items-center">
          <p className="text-muted-foreground">
            © {currentYear} EventHive. All rights reserved.
          </p>
          <p className="text-muted-foreground italic">
            ✨ Built for events that matter
          </p>
        </div>
      </Container>
    </footer>
  );
}
