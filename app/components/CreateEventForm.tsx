"use client";

import { useState } from "react";

interface CreateEventFormProps{
  userId: string;
}

export default function CreateEventForm({ userId }: CreateEventFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ ...form, userId }),
    });

    if (res.ok) {
      alert("Event created!");
      setForm({ name: "", description: "", location: "", date: "", category: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Event Name" onChange={handleChange} value={form.name} required />
      <input name="location" placeholder="Location" onChange={handleChange} value={form.location} />
      <input type="datetime-local" name="date" onChange={handleChange} value={form.date} required />
      <select name="category" onChange={handleChange} value={form.category}>
        <option value="">Select Category (Optional)</option>
        <option value="conference">Conference</option>
        <option value="workshop">Workshop</option>
        <option value="social">Social</option>
        <option value="corporate">Corporate</option>
        <option value="educational">Educational</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} />
      
      <button type="submit">Create Event</button>
    </form>
  );
}
