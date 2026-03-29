"use client";

import Link from "next/link";
import { Container } from "../components/container";

export default function ThankYouPage() {
  return (
    <main className="py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 h-24 w-24 animate-bounce-in rounded-full bg-gradient-to-br from-primary to-secondary p-6">
              <svg
                className="h-full w-full text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="animate-fade-in-up font-heading text-4xl font-bold text-foreground md:text-5xl">
              Thank You!
            </h1>
            <p className="animate-fade-in-up animate-delay-200 mt-4 text-lg text-muted-foreground">
              Your action has been completed successfully. We&apos;re excited to have you with us!
            </p>
          </div>

          <div className="animate-fade-in-up animate-delay-400 space-y-4">
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 hover:scale-105"
            >
              Go to Dashboard
            </Link>
            <div>
              <Link
                href="/events"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Browse More Events →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}