import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import { getAllEvents } from "@/lib/db";
import { Container } from "../components/container";

type UserRole = "attendee" | "organizer";

function getRoleFromQuery(roleParam?: string): UserRole {
  return roleParam === "organizer" ? "organizer" : "attendee";
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const role = getRoleFromQuery(params.role);
  const isOrganizer = role === "organizer";

  const events = getAllEvents();

  const cookieStore = await cookies();
  const token = cookieStore.get("eventhive_session")?.value;
  const payload = token ? verifyJwt(token) : null;
  const isAuthenticated = !!payload;

  return (
    <main>
      {/* Header Section */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-indigo-600/5 to-background py-16 md:py-20 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        
        <Container>
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {isOrganizer ? "🎯 Your Events" : "🎪 Discover"}
            </div>
            
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-black tracking-tight text-gradient-primary">
                {isOrganizer ? "Manage Your Events" : "Discover Amazing Events"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {isOrganizer
                  ? "Create, edit, and manage all your events in one place. Track RSVPs and attendee details."
                  : "Browse events, find your next adventure, and connect with great people in your community."}
              </p>
            </div>

            {isAuthenticated && (
              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/events/new"
                  className="group inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-6 font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <span className="group-hover:translate-x-1 transition-transform">+ Create New Event</span>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Events List Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mb-48" />
        
        <Container>
          {events.length === 0 ? (
            <div className="relative z-10 rounded-2xl border border-dashed border-border bg-gradient-to-br from-card to-card/50 p-12 md:p-16 text-center">
              <div className="text-6xl mb-4">🎪</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                {isAuthenticated ? "No Events Yet" : "Sign In to Browse"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
                {isAuthenticated
                  ? "Ready to create something amazing? Start by building your first event and watch the excitement grow!"
                  : "Sign in to discover events and create your own. Join our community of event creators!"}
              </p>
              {isAuthenticated ? (
                <Link
                  href="/events/new"
                  className="mt-8 inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-8 font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  ✨ Create Your First Event
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="mt-8 inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 px-8 font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  🔐 Sign In Now
                </Link>
              )}
            </div>
          ) : (
            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-heading text-2xl md:text-3xl font-bold">
                  {events.length} {events.length === 1 ? "Event" : "Events"}
                </h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className={`group animate-fade-in-up animate-delay-${((index % 6) + 1) * 100} rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg card-shadow-hover overflow-hidden relative transition-all duration-300`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <h3 className="font-heading text-lg font-bold tracking-tight group-hover:text-gradient-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>📅</span>
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        
                        {event.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>📍</span>
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        )}
                        
                        {event.category && (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary capitalize">
                              {event.category}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      
                      <div className="mt-6 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                        View Event →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
