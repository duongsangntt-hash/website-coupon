import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Try browsing our stores or latest coupons instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <CTAButton href="/">Back to Home</CTAButton>
        <CTAButton href="/coupons" variant="outline">
          Browse Coupons
        </CTAButton>
      </div>
    </div>
  );
}
