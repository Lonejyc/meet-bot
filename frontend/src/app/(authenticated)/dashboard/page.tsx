"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";

export default function DashboardPage() {
  const [sliderValue, setSliderValue] = useState(55);

  return (
    <section className="flex h-screen w-full flex-col overflow-hidden p-4 gap-4">
      <div className="relative w-full max-h-240px overflow-hidden rounded-xl bg-gray-400">
        <div className="flex aspect-video w-full items-center justify-center flex-col gap-1">
          <Camera className="h-10 w-10 text-white/50" />
          <span className="text-xs font-medium text-white/50">Écran Principal</span>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <rect x="2" y="4" width="20" height="16" rx="2" /><rect x="12" y="12" width="8" height="6" rx="1" fill="currentColor" stroke="none" className="text-primary/30" />
              <rect x="12" y="12" width="8" height="6" rx="1" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-135">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
              <line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center shrink-0">
        <div className="flex flex-col items-center gap-2">
          <div className="relative aspect-video w-64 overflow-hidden rounded-lg bg-gray-400">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <Camera className="h-5 w-5 text-white/60" />
              <span className="text-[10px] font-medium text-white/60">Écran de caméra secondaire</span>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 rounded-full bg-yellow-900 px-3 py-1.5">
            <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/30 transition-colors hover:bg-white/60">
              <X className="h-3 w-3 text-white" />
            </button>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
              <circle cx="12" cy="5" r="1.5" />
              <path d="M9 12l1.5-4.5L13 10l2-2" />
              <path d="M8.5 20l2-5 2 2 1.5-4" />
            </svg>
            <style>{`
              .speed-slider { -webkit-appearance: none; appearance: none; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.25); outline: none; cursor: pointer; }
              .speed-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 28px; height: 22px; border-radius: 999px; background: #6c47ff; border: 2px solid rgba(255,255,255,0.5); cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
              .speed-slider::-moz-range-thumb { width: 28px; height: 22px; border-radius: 999px; background: #6c47ff; border: 2px solid rgba(255,255,255,0.5); cursor: pointer; }
            `}</style>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="speed-slider w-full"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
              <circle cx="13" cy="5" r="1.5" />
              <path d="M7 19l3-6 2 3 3-5 2 2" />
              <path d="M10 10l1.5-3.5L15 8l1.5-2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 aspect-video w-64 overflow-hidden rounded-lg bg-gray-400">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <Camera className="h-5 w-5 text-white/60" />
          <span className="text-[10px] font-medium text-white/60">Retour Écran</span>
        </div>
      </div>
    </section>
  );
}

