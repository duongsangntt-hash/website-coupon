"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || `${SITE_NAME} visitor`}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-brand-400 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-brand-400 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-brand-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Message
      </button>
    </form>
  );
}
