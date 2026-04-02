"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { GoogleIcon } from "../components/icons";

type SessionUser = {
  id: number;
  name: string;
  email: string;
};

function getDashboardHref(role: string | null) {
  return role === "organizer" || role === "attendee"
    ? `/dashboard?role=${role}`
    : "/dashboard";
}

function getGoogleOauthErrorCopy(code: string | null) {
  if (!code) return null;

  const errorCopy: Record<string, string> = {
    cancelled: "Google sign-in was cancelled. Please try again.",
    not_configured: "Google sign-in is not available right now.",
    state_mismatch: "Google sign-in expired. Please try again.",
    missing_params: "Google sign-in failed. Please try again.",
    token_exchange_failed: "Google sign-in failed. Please try again.",
    missing_id_token: "Google sign-in failed. Please try again.",
    invalid_id_token: "Google sign-in failed. Please try again.",
    email_not_verified: "Please verify your Google email address and try again.",
    user_create_failed: "We could not sign you in. Please try again.",
  };

  return errorCopy[code] ?? "Google sign-in failed. Please try again.";
}

export function SigninClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("oauth");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(() =>
    getGoogleOauthErrorCopy(oauthError),
  );
  const [submitting, setSubmitting] = useState(false);
  const [oauthSubmitting, setOauthSubmitting] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  const showRegisteredNotice = searchParams.get("registered") === "1";

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No session");
        }
        return response.json() as Promise<{ user: SessionUser }>;
      })
      .then((data) => {
        setSessionUser(data.user);
      })
      .catch(() => {
        setSessionUser(null);
      });
  }, []);

  useEffect(() => {
    if (!sessionUser) return;
    router.refresh();
    router.replace(getDashboardHref(searchParams.get("role")));
  }, [router, searchParams, sessionUser]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      message?: string;
      user?: SessionUser;
    };

    if (!response.ok) {
      setError(data.message ?? "Login failed.");
      setSubmitting(false);
      return;
    }

    setSessionUser(data.user ?? null);
    form?.reset();
    setSubmitting(false);
    setMessage(null);
    router.refresh();
    router.push(getDashboardHref(searchParams.get("role")));
  }

  function handleGoogleSignin() {
    setOauthSubmitting(true);

    const role = searchParams.get("role");
    const destination = role
      ? `/api/auth/google?role=${encodeURIComponent(role)}`
      : "/api/auth/google";

    window.location.assign(destination);
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-md animate-fade-in-up">
      {/* Card */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-8 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <h1 className="font-heading text-4xl font-black tracking-tight text-gradient-primary">
            Welcome back
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Sign in to your EventHive account and continue creating.
          </p>

          {showRegisteredNotice ? (
            <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 flex items-center gap-2">
              <span>✓</span>
              Account created! Please sign in to continue.
            </div>
          ) : null}

          <div className="mt-8 space-y-4">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              disabled={submitting || oauthSubmitting}
              className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 px-4 text-sm font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <GoogleIcon className="h-5 w-5" />
              {oauthSubmitting ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Or
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </label>

              <button
                type="submit"
                disabled={submitting || oauthSubmitting}
                className="group inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
              >
                {submitting ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⚙️</span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Status Messages */}
          {sessionUser ? (
            <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-700 flex items-center gap-2">
              <span>✓</span>
              Signed in as {sessionUser.name}
            </div>
          ) : null}

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

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-primary hover:text-primary/80 transition-colors">
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
