"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";

export default function DashboardPage() {
  const [sliderValue, setSliderValue] = useState(55);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden p-4 gap-4">
      <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-xl bg-gray-400">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <Camera className="h-10 w-10 text-white/50" />
          <span className="text-xs font-medium text-white/50">Écran Principal</span>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <img src="/volume.png" alt="volume" className="h-4 w-4 shrink-0 object-contain" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <img src="/mic.png" alt="mic" className="h-4 w-4 shrink-0 object-contain" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <img src="/metric.png" alt="metric" className="h-4 w-4 shrink-0 object-contain" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <img src="/robot.png" alt="robot" className="h-4 w-4 shrink-0 object-contain" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <img src="/fullscreen.png" alt="fullscreen" className="h-4 w-4 shrink-0 object-contain" />
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
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white">
            <img src="/phone.png" alt="phone" className="h-4 w-4 shrink-0 object-contain" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-colors hover:bg-white group">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white group-hover:text-primary transition-colors">
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

          <div className="flex w-full items-center gap-2 rounded-full bg-gray-400 px-3 py-1.5">
            <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/30 transition-colors hover:bg-white/60">
              <X className="h-3 w-3 text-white" />
            </button>

            <img src="/walk.svg" alt="walk" className="h-4 w-4 shrink-0" />
            <style>{`
              .speed-slider { -webkit-appearance: none; appearance: none; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.75); outline: none; cursor: pointer; }
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
            <img src="/run.svg" alt="run" className="h-4 w-4 shrink-0" />
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 aspect-video w-84 overflow-hidden rounded-lg bg-gray-400">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <Camera className="h-5 w-5 text-white/60" />
          <span className="text-[10px] font-medium text-white/60">Retour Écran</span>
        </div>
      </div>
    </section>
  );
}

