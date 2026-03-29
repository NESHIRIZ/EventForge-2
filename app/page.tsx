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
    <article className="animate-fade-in-up rounded-3xl border border-border bg-card p-6 shadow-md transition hover:shadow-lg hover:scale-105 md:p-8">
      <h3 className="font-heading text-xl font-semibold tracking-tight text-secondary">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground md:text-base">
        {points.map((point, index) => (
          <li key={point} className={`flex items-start gap-3 animate-slide-in-left animate-delay-${(index + 1) * 100}`}>
            <span
              aria-hidden="true"
              className="mt-1 h-3 w-3 animate-bounce-in rounded-full bg-primary"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#22d3ee_0%,transparent_40%),radial-gradient(circle_at_80%_40%,#6366f1_0%,transparent_45%),radial-gradient(circle_at_40%_90%,#22c55e_0%,transparent_45%)]" />
        </div>
        <Container>
          <div className="relative z-10 py-24 text-center md:py-28">
            <p className="mb-4 inline-flex animate-fade-in rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Launching a pro events experience
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl animate-fade-in-up text-4xl font-bold leading-tight md:text-6xl">
              Event management that looks premium and works lightning-fast.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up animate-delay-200 text-base leading-relaxed text-white/90 md:text-lg">
              Build high-impact event pages, optimize attendee conversion, and run every event with a polished workflow that keeps attendees coming back.
            </p>
            <div className="mt-8 flex animate-fade-in-up animate-delay-400 flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex h-12 animate-bounce-in animate-delay-500 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-slate-900 shadow-lg shadow-teal-300/40 transition hover:brightness-110 hover:scale-105"
              >
                Explore events
              </Link>
              <Link
                href="/organizers"
                className="inline-flex h-12 animate-fade-in animate-delay-600 items-center justify-center rounded-full border border-white/60 bg-white/10 px-8 text-sm font-semibold text-white transition hover:bg-white/20 hover:scale-105"
              >
                Launch your event
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/50 bg-background py-16 md:py-20">
        <Container>
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <h2 className="animate-fade-in-up font-heading text-3xl font-bold leading-tight md:text-4xl">
              A complete event platform in one polished workspace
            </h2>
            <p className="animate-fade-in-up animate-delay-200 mt-4 text-base text-muted-foreground md:text-lg">
              EventForge combines discovery, attendee experience, and organizer operations into a single modern dashboard with enterprise-ready controls.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="animate-slide-in-left">
              <BenefitList title="Attendees" points={attendeePoints} />
            </div>
            <div className="animate-fade-in-up animate-delay-200">
              <BenefitList title="Organizers" points={organizerPoints} />
            </div>
            <div className="animate-slide-in-right">
              <article className="rounded-3xl border border-border bg-card p-6 shadow-md transition hover:shadow-lg hover:scale-105 md:p-8">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-secondary">Why EventForge</h3>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground md:text-base">
                  <li className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1 h-3 w-3 rounded-full bg-primary" />
                    Smoother event creation, from RSVP settings to attendee limits.
                  </li>
                  <li className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1 h-3 w-3 rounded-full bg-primary" />
                    Integrated guest tracking, waitlists, and real-time status updates.
                  </li>
                  <li className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1 h-3 w-3 rounded-full bg-primary" />
                    Fully responsive experience built for desktop and mobile in one deploy.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="animate-fade-in-up font-heading text-3xl font-bold md:text-4xl">See it live</h2>
              <p className="animate-fade-in-up animate-delay-200 mt-3 text-muted-foreground">
                Preview your events and attendee pipelines with actionable analytics at a glance.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Last 24h traffic",
                  value: "1,290",
                  desc: "Event page views and conversions",
                },
                {
                  title: "Active RSVPs",
                  value: "560",
                  desc: "Confirmed attendees across all showcases",
                },
                {
                  title: "Organizer ROI",
                  value: "+48%",
                  desc: "Goal completion vs time invested",
                },
              ].map((item, index) => (
                <article key={item.title} className={`animate-fade-in-up animate-delay-${(index + 1) * 200} rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-lg hover:scale-105 md:p-6`}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{item.title}</h3>
                  <p className="mt-3 text-3xl font-bold text-foreground">{item.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="faq" className="border-t border-border/70 bg-background py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="animate-fade-in-up font-heading text-3xl font-bold md:text-4xl">Common Questions</h2>
            <p className="animate-fade-in-up animate-delay-200 mt-3 text-muted-foreground">
              Everything you need to know before launching your first event.
            </p>
          </div>
          <div className="mt-8 grid gap-4">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                className={`animate-fade-in-up animate-delay-${(index + 1) * 100} rounded-2xl border border-border bg-card p-5 transition hover:shadow-md`}
              >
                <summary className="cursor-pointer text-base font-semibold">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
