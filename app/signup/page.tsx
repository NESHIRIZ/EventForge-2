"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Container } from "../components/container";

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };
    const role = String(formData.get("role") ?? "attendee");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setError(data.message ?? "Registration failed.");
      setSubmitting(false);
      return;
    }

    form?.reset();
    setSubmitting(false);
    setMessage(null);
    router.push(`/signin?registered=1&role=${encodeURIComponent(role)}`);
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] py-12 md:py-20 flex items-center justify-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -mb-48 -mr-48" />
      
      <Container>
        <div className="relative z-10 mx-auto w-full max-w-md animate-fade-in-up">
          {/* Card */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-8 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h1 className="font-heading text-4xl font-black tracking-tight text-gradient-primary">
                Join EventHive
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Create your free account and start managing events today.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground">Full Name</span>
                  <input
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground">Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    minLength={8}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <span className="text-xs text-muted-foreground mt-1 block">
                    Minimum 8 characters for security
                  </span>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground">I want to</span>
                  <select
                    name="role"
                    defaultValue="attendee"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="attendee">👤 Attend Events</option>
                    <option value="organizer">🚀 Organize Events</option>
                  </select>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 mt-6"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⚙️</span>
                      Creating account...
                    </>
                  ) : (
                    "Get Started Free"
                  )}
                </button>
              </form>

              {/* Status Messages */}
              {message ? (
                <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 flex items-center gap-2">
                  <span>✓</span>
                  {message}
                </div>
              ) : null}

              {error ? (
                <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 flex items-start gap-2">
                  <span className="mt-0.5">⚠</span>
                  <span>{error}</span>
                </div>
              ) : null}

              {/* Sign In Link */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="font-bold text-primary hover:text-primary/80 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
