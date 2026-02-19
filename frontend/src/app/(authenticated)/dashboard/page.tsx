export default function DashboardPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-4">
      {/* Main video feed */}
      <div className="relative w-full max-w-[1100px] overflow-hidden rounded-lg bg-muted/30">
        <div className="aspect-video w-full bg-foreground/30" />

        {/* Control bar overlay at bottom of video */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full bg-white/60 transition-colors hover:bg-white"
            />
          ))}
          {/* Move icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-5 w-5 text-white/80"
          >
            <polyline points="5 9 2 12 5 15" />
            <polyline points="9 5 12 2 15 5" />
            <polyline points="15 19 12 22 9 19" />
            <polyline points="19 9 22 12 19 15" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="12" y1="2" x2="12" y2="22" />
          </svg>
        </div>
      </div>

      {/* Secondary video feed */}
      <div className="aspect-video w-full max-w-[500px] rounded-lg bg-foreground/40" />

      {/* Timeline bar */}
      <div className="flex w-full max-w-[500px] items-center gap-2 rounded-full bg-primary px-3 py-2">
        {/* Close button */}
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            className="h-3 w-3 text-primary"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        {/* Left marker */}
        <div className="h-5 w-1.5 rounded-sm bg-white" />

        {/* Progress bar */}
        <div className="relative flex-1 rounded-full bg-foreground/50 py-1.5">
          <div className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-primary" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" />
        </div>

        {/* Right marker */}
        <div className="h-5 w-1.5 rounded-sm bg-white" />
      </div>
    </div>
  );
}
