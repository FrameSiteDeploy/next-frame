// config/processSliderConfig.ts
import type {SliderConfigByBp} from "@/hooks/useResponsiveSliderConfig";

const sizesByBreakpoint: SliderConfigByBp = {
    "2xl": {
        inactive: {w: 160, h: 93},
        next: {w: 460, h: 266},
        active: {w: 760, h: 440},
    },
    xl: {
        inactive: {w: 140, h: 81},
        next: {w: 380, h: 220},
        active: {w: 620, h: 348},
    },
    md: {
        inactive: {w: 140, h: 81},
        next: {w: 380, h: 220},
        active: {w: 620, h: 348},
    },
    sm: {
        inactive: {w: 140, h: 81},
        next: {w: 380, h: 220},
        active: {w: 620, h: 348},
    },
    xs: {
        inactive: {w: 140, h: 81},
        next: {w: 380, h: 220},
        active: {w: 620, h: 348},
    },
};

export const PROCESS_SLIDER_CONFIG = {
    sizesByBreakpoint,
    gapByBreakpoint: {
        "2xl": 40,
        xl: 20,
        md: 20,
        sm: 20,
        xs: 20,
    },
    animation: {
        duration: 0.6,
        ease: "back.out(0.7)",
        textOutDuration: 0.4,
        textInDuration: 0.6,
        textInDelay: 0.15,
        textOutEase: "power2.inOut",
        textInX: 60,
        textOutX: -40,
    },
    scrollPerStep: 600,
} as const;
