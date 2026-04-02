import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/auth";
import { getUserById } from "@/lib/db";
import { Container } from "../components/container";

const SESSION_COOKIE = "eventhive_session";
type UserRole = "attendee" | "organizer";

function getRoleFromQuery(roleParam?: string): UserRole {
  return roleParam === "organizer" ? "organizer" : "attendee";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    redirect("/signin");
  }

  const payload = verifyJwt(token);

  if (!payload) {
    redirect("/signin");
  }

  const user = getUserById(payload.sub);

  if (!user) {
    redirect("/signin");
  }

  const params = await searchParams;
  const role = getRoleFromQuery(params.role);
  const isOrganizer = role === "organizer";
  const eventsHref = `/events?role=${role}`;

  return (
    <main className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl -ml-48" />

      <Container>
        <div className="mx-auto grid max-w-4xl gap-6 relative z-10">
          {/* Welcome Header */}
          <header className="group animate-fade-in-up rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-8 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {isOrganizer ? "🚀 Organizer Mode" : "👤 Attendee Mode"}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-gradient-primary">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Signed in as <span className="font-semibold text-foreground">{user.email}</span>
              </p>
            </div>
          </header>

          {/* Activity Section */}
          <section className="animate-fade-in-up animate-delay-200 rounded-2xl border border-border bg-card p-8 shadow-lg">
            <h2 className="font-heading text-2xl font-bold tracking-tight flex items-center gap-3">
              <span className="text-3xl">{isOrganizer ? "🎯" : "🎪"}</span>
              Your Activity
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {isOrganizer 
                ? "Create and manage your events. Track RSVPs, attendees, and performance metrics in real-time."
                : "Discover amazing events, RSVP, and connect with other attendees in your community."}
            </p>
            
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {isOrganizer ? (
                <>
                  <Link
                    href="/organizers"
                    className="group inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-6 font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Start Organizing</span>
                  </Link>
                  <Link
                    href={eventsHref}
                    className="group inline-flex h-12 items-center justify-center rounded-lg border-2 border-primary/50 bg-primary/10 px-6 font-bold text-primary hover:border-primary hover:bg-primary/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">View Events</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={eventsHref}
                    className="group inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-6 font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Browse Events</span>
                  </Link>
                  <Link
                    href="/organizers"
                    className="group inline-flex h-12 items-center justify-center rounded-lg border-2 border-primary/50 bg-primary/10 px-6 font-bold text-primary hover:border-primary hover:bg-primary/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Host Events</span>
                  </Link>
                </>
              )}
            </div>
          </section>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Events", value: "—", desc: "Upcoming this month" },
              { label: "Total RSVPs", value: "—", desc: "Confirmed attendees" },
              { label: "Engagement", value: "—", desc: "Activity level" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`animate-fade-in-up animate-delay-${(index + 1) * 100} rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
