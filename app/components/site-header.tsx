import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import { getUserById } from "@/lib/db";
import { SparkIcon } from "./icons";
import { Container } from "./container";

const navLinks = [
  { href: "/", label: "Discover" },
  { href: "/events", label: "Explore" },
  { href: "/organizers", label: "Host" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/events/new", label: "Create" },
  { href: "/thank-you", label: "Support" },
] as const;

const SESSION_COOKIE = "eventforge_session";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  const payload = token ? verifyJwt(token) : null;
  const user = payload ? getUserById(payload.sub) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-pink-500 text-white shadow-lg group-hover:shadow-xl transition-shadow" aria-label="EventForge logo">
              <SparkIcon className="size-5 font-bold" />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-gradient-primary">
              EventForge
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          {user ? (
            <details className="relative">
              <summary className="inline-flex h-10 list-none items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-semibold shadow-sm transition-all hover:shadow-md hover:border-primary/50 cursor-pointer [&::-webkit-details-marker]:hidden">
                <span className="max-w-[10rem] truncate text-foreground">{user.name}</span>
                <span className="text-muted-foreground transition-transform" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-xl backdrop-blur-sm divide-y divide-border/50">
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  📊 Dashboard
                </Link>
                <form action="/api/auth/logout" method="post" className="w-full">
                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10"
                  >
                    🚪 Logout
                  </button>
                </form>
              </div>
            </details>
          ) : (
            <Link
              href="/signin"
              className="inline-flex h-10 items-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-6 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
