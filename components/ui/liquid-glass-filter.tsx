"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type LiquidGlassFilterProps = {
  label: string
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  className?: string
}

export function LiquidGlassFilter({
  label,
  pressed = false,
  onPressedChange,
  className,
}: LiquidGlassFilterProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onPressedChange?.(!pressed)}
      aria-pressed={pressed}
      className={cn(
        // Contain blending + prevent artifacts from leaking
        "relative isolate w-full overflow-hidden rounded-full px-4 py-2",

        // Typography
        "text-sm font-medium tracking-wide text-black",

        // Base glass (keep it clean)
        "border border-black/10 bg-white/60",
        "supports-[backdrop-filter]:backdrop-blur-md",
        "shadow-[0_12px_28px_rgba(0,0,0,0.12)]",
        "transition-all duration-200 hover:bg-white/70",

        // Pressed look (professional ethical vibe)
        pressed && [
          "border-transparent",
          "bg-gradient-to-r from-[#BFE4FF] via-[#A9D7FF] to-[#CFF6EA]",
          "ring-2 ring-[#2B7FFF]/30",
          "shadow-[0_18px_40px_rgba(43,127,255,0.16)]",
        ],

        className
      )}
    >
      {/* Glass highlights (NO BLUR) */}
      <span className="pointer-events-none absolute inset-0">
        {/* Top sheen: pushed up so it doesn’t sit behind text */}
        <span
          className={cn(
            "absolute left-3 right-10 -top-1 h-6 rounded-full",
            "bg-gradient-to-r from-white/70 via-white/35 to-transparent",
            "opacity-80",
            // fade downward so it never creates a “band” behind letters
            "[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"
          )}
        />

        {/* Soft corner glow (also no blur) */}
        <span
          className={cn(
            "absolute left-4 top-2 h-3 w-16 rounded-full",
            "bg-gradient-to-r from-white/55 to-transparent",
            "opacity-60",
            "[mask-image:linear-gradient(to_right,rgba(0,0,0,1),rgba(0,0,0,0))]"
          )}
        />

        {/* Inner edge glass line */}
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            pressed
              ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)]"
              : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]"
          )}
        />
      </span>

      <span className="relative z-10">{label}</span>
    </Button>
  )
}
