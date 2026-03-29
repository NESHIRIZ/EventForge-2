"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateEventFormProps{
  userId: string;
}

export default function CreateEventForm({ userId }: CreateEventFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ ...form, userId }),
    });

    if (res.ok) {
      router.push("/thank-you");
    } else {
      setIsSubmitting(false);
      // Handle error, maybe show message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Event Name *</label>
        <input
          id="name"
          name="name"
          placeholder="Event Name"
          onChange={handleChange}
          value={form.name}
          required
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium">Location</label>
        <input
          id="location"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={form.location}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">Date & Time *</label>
        <input
          id="date"
          type="datetime-local"
          name="date"
          onChange={handleChange}
          value={form.date}
          required
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={form.category}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Creating Event...
          </span>
        ) : (
          "Create Event"
        )}
      </button>
    </form>
  );
}
