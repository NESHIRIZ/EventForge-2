import Link from "next/link";
import { Container } from "./components/container";

const attendeePoints = [
  "Instant discovery by interest, city, and vibe",
  "Personal schedule builder with reminders and check-in QR",
  "Community chat and feedback tools before/after events",
] as const;

const organizerPoints = [
  "Drag-and-drop event builder with on-brand themes",
  "Smart capacity planning, waitlists, and overflow management",
  "Analytics suggestions to boost conversions and retention",
] as const;

const faqItems = [
  {
    q: "Do I need an account to browse events?",
    a: "No—browse freely. Create a free organizer account to publish, promote, and track performance.",
  },
  {
    q: "What makes a premium event in EventForge?",
    a: "Premium events include custom URLs, promotional banners, RSVP automation, and advanced cabin reports.",
  },
  {
    q: "Can I integrate ticketing platforms?",
    a: "Yes, EventForge supports Stripe and PayPal for paid tickets, and CSV export for all attendee lists.",
  },
] as const;

function BenefitList({
  title,
  points,
}: {
  title: string;
  points: readonly string[];
}) {
  return (
    <article className="group animate-fade-in-up rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg card-shadow-hover transition-all md:p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="font-heading text-xl font-bold tracking-tight text-gradient-primary">
          {title}
        </h3>
        <ul className="mt-6 space-y-4 text-sm text-muted-foreground md:text-base">
          {points.map((point, index) => (
            <li key={point} className={`flex items-start gap-3 animate-slide-in-left animate-delay-${(index + 1) * 100}`}>
              <span
                aria-hidden="true"
                className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary"
              />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white min-h-[85vh] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-40 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-float animate-delay-500" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-float animate-delay-1000" />
        </div>
        
        <Container>
          <div className="relative z-10 py-12 text-center md:py-20">
            <div className="inline-flex animate-slide-in-down items-center justify-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-md border border-white/20 mb-6">
              <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                Premium Event Management Platform
              </p>
            </div>
            
            <h1 className="mx-auto mt-8 max-w-4xl animate-fade-in-up text-5xl md:text-7xl font-black leading-[1.1] text-balance">
              Event management that <span className="text-cyan-200">feels premium</span> and <span className="text-yellow-200">works fast</span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-3xl animate-fade-in-up animate-delay-200 text-lg md:text-xl leading-relaxed text-white/90 text-balance font-light">
              Create stunning event experiences, manage attendees effortlessly, and grow your community with EventHive's all-in-one platform—trusted by event creators everywhere.
            </p>
            
            <div className="mt-10 flex animate-fade-in-up animate-delay-400 flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3">
              <Link
                href="/events"
                className="group inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-base font-bold text-indigo-600 shadow-xl shadow-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/60 hover:scale-105 active:scale-95 min-w-48"
              >
                <span className="group-hover:translate-x-1 transition-transform">Explore Events</span>
              </Link>
              
              <Link
                href="/organizers"
                className="group inline-flex h-14 items-center justify-center rounded-lg border-2 border-white/70 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white hover:shadow-xl hover:scale-105 active:scale-95 min-w-48"
              >
                <span className="group-hover:translate-x-1 transition-transform">Host an Event</span>
              </Link>
            </div>
            
            <p className="mt-8 animate-fade-in-up animate-delay-500 text-sm text-white/70">
              ✨ Free to get started • No credit card required
            </p>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center relative z-10">
            <h2 className="animate-fade-in-up font-heading text-4xl md:text-5xl font-black leading-tight">
              Everything you need to run <span className="text-gradient-primary">amazing events</span>
            </h2>
            <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg text-muted-foreground leading-relaxed">
              From discovery to follow-up, manage every aspect of your events in one beautiful, powerful platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 relative z-10">
            <div className="animate-slide-in-left">
              <BenefitList title="🎯 For Attendees" points={attendeePoints} />
            </div>
            <div className="animate-fade-in-up animate-delay-200">
              <BenefitList title="🚀 For Organizers" points={organizerPoints} />
            </div>
            <div className="animate-slide-in-right">
              <article className="group rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg card-shadow-hover transition-all md:p-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-gradient-primary">
                    💪 Why EventHive Wins
                  </h3>
                  <ul className="mt-6 space-y-4 text-sm text-muted-foreground md:text-base">
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      <span className="leading-relaxed">Lightning-fast event creation with AI-powered suggestions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      <span className="leading-relaxed">Real-time attendee tracking & powerful waitlist management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      <span className="leading-relaxed">Mobile-first design that works perfectly everywhere</span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>

      {/* Analytics Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mb-48 blur-3xl" />
        
        <Container>
          <div className="mx-auto max-w-5xl relative z-10">
            <div className="mb-12 text-center">
              <h2 className="animate-fade-in-up font-heading text-4xl md:text-5xl font-black">
                See your events <span className="text-gradient-primary">truly shine</span>
              </h2>
              <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg text-muted-foreground">
                Beautiful analytics and actionable insights at your fingertips.
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "📊",
                  title: "24h Traffic",
                  value: "1,290",
                  desc: "Event page views and qualified leads",
                },
                {
                  icon: "✅",
                  title: "Active RSVPs",
                  value: "560",
                  desc: "Confirmed attendees across events",
                },
                {
                  icon: "🎯",
                  title: "Organizer ROI",
                  value: "+48%",
                  desc: "Goal completion vs. time invested",
                },
              ].map((item, index) => (
                <article 
                  key={item.title} 
                  className={`animate-fade-in-up animate-delay-${(index + 1) * 150} group rounded-2xl border border-border bg-gradient-to-br from-card via-card/95 to-card/80 p-6 shadow-lg card-shadow-hover relative overflow-hidden transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{item.title}</h3>
                    <p className="mt-4 text-5xl font-black bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">{item.value}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-t border-border/40 bg-gradient-to-b from-background/50 to-background py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12 relative z-10">
            <h2 className="animate-fade-in-up font-heading text-4xl md:text-5xl font-black">
              Your questions <span className="text-gradient-primary">answered</span>
            </h2>
            <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg text-muted-foreground">
              Everything you need to know to get started.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl space-y-3 relative z-10">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                className={`animate-fade-in-up animate-delay-${(index + 1) * 100} group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer`}
              >
                <summary className="flex items-center justify-between font-semibold text-foreground transition-colors group-hover:text-primary cursor-pointer select-none">
                  <span>{item.q}</span>
                  <span className="ml-4 text-primary/60 group-open:text-primary transition-colors text-xl">+</span>
                </summary>
                <p className="mt-5 text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
