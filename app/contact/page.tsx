import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { SITE_NAME, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${SITE_NAME} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Contact Us
      </h1>
      <p className="mt-2 text-gray-600">
        Questions, feedback, or a coupon that isn&apos;t working? Send us a
        message and we&apos;ll get back to you.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
        <Mail className="h-4 w-4" aria-hidden="true" />
        {SITE_EMAIL}
      </div>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
