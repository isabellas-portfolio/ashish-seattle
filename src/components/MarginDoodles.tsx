export default function MarginDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Heart doodle (top-left) */}
      <svg
        className="absolute left-10 top-16 h-10 w-10 opacity-[0.16] md:opacity-[0.14] rotate-[-6deg] blur-[0.2px]"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M32 54C18 42 10 34 10 24C10 16 16 10 24 10C28 10 31 12 32 14C33 12 36 10 40 10C48 10 54 16 54 24C54 34 46 42 32 54Z"
          stroke="#2A3D66"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Cleaner Seattle skyline doodle (top-right, diagonal) */}
      <svg
        className="absolute right-8 top-28 h-16 w-[340px] opacity-[0.10] hidden sm:block origin-top-right rotate-12"
        viewBox="0 0 520 110"
        fill="none"
        aria-hidden="true"
      >
        {/* baseline (starts at Space Needle) */}
        <path
          d="M120 92H500"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Space Needle (clean outline) */}
        <path
          d="M120 92 L142 48"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M164 92 L142 48"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* needle shaft */}
        <path
          d="M142 48 V 30"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* top spire */}
        <path
          d="M142 30 V 18"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* saucer */}
        <path
          d="M118 52 C 132 40, 152 40, 166 52"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M112 56 C 132 70, 152 70, 172 56"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* little observation deck ring */}
        <path
          d="M128 54 H156"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Buildings (simple, tidy blocks) */}
        <path
          d="M210 92 V 46 H250 V 92"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M260 92 V 34 H302 V 92"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M312 92 V 52 H342 V 92"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M350 92 V 40 H392 V 92"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M402 92 V 58 H438 V 92"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M446 92 V 48 H488 V 92"
          stroke="#2A3D66"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* a few window lines (subtle) */}
        <path
          d="M272 44 V 88 M286 44 V 88"
          stroke="#2A3D66"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M362 48 V 88 M376 48 V 88"
          stroke="#2A3D66"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* tiny clouds (optional cute) */}
        <path
          d="M60 30 C 60 22, 70 20, 74 26 C 78 20, 90 22, 90 30 C 96 30, 100 36, 96 42 H66 C 62 40, 60 36, 60 30 Z"
          stroke="#89B6E4"
          strokeWidth="4"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>

      {/* Coffee cup (left-middle) */}
      <svg
        className="absolute left-8 top-[45%] h-14 w-14 opacity-[0.15] hidden md:block rotate-[-4deg] blur-[0.2px]"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 30H46V54C46 62 40 68 32 68C24 68 18 62 18 54V30Z"
          stroke="#2A3D66"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M46 34H54C60 34 62 38 62 42C62 46 60 50 54 50H46"
          stroke="#2A3D66"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 24C24 20 28 18 28 14M34 24C34 20 38 18 38 14"
          stroke="#89B6E4"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Polaroid outline (bottom-left) */}
      <svg
        className="absolute left-10 bottom-24 h-20 w-20 opacity-[0.16] hidden sm:block rotate-[5deg] blur-[0.2px]"
        viewBox="0 0 90 90"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="10"
          width="62"
          height="70"
          rx="10"
          stroke="#2A3D66"
          strokeWidth="3.5"
        />
        <rect
          x="24"
          y="20"
          width="42"
          height="36"
          rx="8"
          stroke="#2A3D66"
          strokeWidth="3.5"
        />
        <path
          d="M26 68H64"
          stroke="#2A3D66"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Paper airplane (bottom-right) */}
      <svg
        className="absolute right-10 bottom-20 h-16 w-16 opacity-[0.16] hidden md:block rotate-[-5deg] blur-[0.2px]"
        viewBox="0 0 90 90"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 44L78 18L42 62L36 48L12 44Z"
          stroke="#2A3D66"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M36 48L78 18"
          stroke="#89B6E4"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Tiny scattered heart */}
      <svg
        className="absolute right-[22%] top-[38%] h-6 w-6 opacity-[0.14] hidden lg:block rotate-[-3deg] blur-[0.2px]"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M32 50C22 41 16 35 16 28C16 22 21 18 27 18C30 18 32 20 32 21C32 20 34 18 37 18C43 18 48 22 48 28C48 35 42 41 32 50Z"
          stroke="#89B6E4"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
