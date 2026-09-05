export default function StoreLogo({
  src,
  alt,
  size = 56,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Store logos are small local SVG placeholders; plain img avoids
          next/image's SVG restrictions and remote-pattern config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
