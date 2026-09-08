export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Nomad Flow logo"
    >
      {/* Subtle rounded square background using currentColor with low opacity */}
      <rect width="48" height="48" rx="10" fill="currentColor" fillOpacity="0.02" />

      {/* Main star */}
      <g transform="translate(6 6)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M15 1.5l3.9 7.9 8.7 1.3-6.3 6.1 1.5 8.6L15 23.8 5.2 25.4l1.5-8.6L.4 10.7l8.7-1.3L15 1.5z"
          fill="#FACC15"
          stroke="#F59E0B"
          strokeWidth="0.6"
        />

        {/* Small sparkles */}
        <g transform="translate(24 4)">
          <path d="M2 0l0.9 1.9L4.7 2.8 2.8 4l-0.9 1.9L1 4  -0.8 2.8 1 1.9 2 0z" fill="#FACC15" opacity="0.95" />
        </g>
        <g transform="translate(28 18) scale(0.8)">
          <path d="M2 0l0.6 1.2 1.2 0.6-1.2 0.6L2 3.6 1.4 2.4 0.2 1.8 1.4 1.2 2 0z" fill="#FACC15" opacity="0.9" />
        </g>
      </g>
    </svg>
  );
}
