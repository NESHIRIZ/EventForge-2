"use client";

import { useState } from "react";

interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  category?: string;
}

export default function EditEventForm({ event }: { event: Event }) {
  const [form, setForm] = useState(event);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to update event.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-1.5">
        <label htmlFor="event-name" className="text-sm font-medium">
          Event name <span className="text-destructive">*</span>
        </label>
        <input
          id="event-name"
          type="text"
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="event-location" className="text-sm font-medium">
          Location
        </label>
        <input
          id="event-location"
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="event-date" className="text-sm font-medium">
          Date <span className="text-destructive">*</span>
        </label>
        <input
          id="event-date"
          type="datetime-local"
          required
          name="date"
          value={form.date}
          onChange={handleChange}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="event-category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="event-category"
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select Category (Optional)</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="social">Social</option>
          <option value="corporate">Corporate</option>
          <option value="educational">Educational</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="event-description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="event-description"
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
          Event updated successfully!
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-95 disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

