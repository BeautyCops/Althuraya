import heroBg from "@/assets/hero-bg.png";

/**
 * Fixed decorative background — uses the uploaded purple wave-mesh image
 * with soft gradient overlays so foreground content stays readable.
 */
export function BackgroundField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, oklch(0.45 0.18 295 / 0.45) 0%, transparent 55%), radial-gradient(ellipse at 20% 90%, oklch(0.30 0.14 290 / 0.55) 0%, transparent 60%), linear-gradient(180deg, oklch(0.13 0.07 295 / 0.55) 0%, oklch(0.10 0.06 295 / 0.85) 100%)",
        }}
      />
      {/* subtle starfield */}
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 137.5) % 100;
          const y = (i * 53.7) % 100;
          const r = (i % 3) * 0.4 + 0.4;
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="oklch(0.95 0.02 305)"
            />
          );
        })}
      </svg>
    </div>
  );
}
