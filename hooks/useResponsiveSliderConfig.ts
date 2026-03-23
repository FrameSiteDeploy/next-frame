import {useBreakpoint} from "@/hooks/useBreakpoint";

export type BreakpointName = "xs" | "sm" | "md" | "xl" | "2xl";

export type SliderSizes = {
    inactive: { w: number; h: number };
    next: { w: number; h: number };
    active: { w: number; h: number };
};

export type SliderConfigByBp = Record<BreakpointName, SliderSizes>;

type BaseSliderConfig = {
    sizesByBreakpoint: SliderConfigByBp;
    gapByBreakpoint: Record<BreakpointName, number>;
    animation: {
        duration: number;
        ease: string;
        textOutDuration: number;
        textInDuration: number;
        textInDelay: number;
        textOutEase: string;
        textInX: number;
        textOutX: number;
    };
    scrollPerStep: number;
};

const FALLBACK_BREAKPOINT: BreakpointName = "xl";

export const useResponsiveSliderConfig = <T extends BaseSliderConfig>(config: T) => {
    const { breakpoint, ready } = useBreakpoint();

    const bp = breakpoint ?? FALLBACK_BREAKPOINT;

    const sizes = config.sizesByBreakpoint[bp];
    const gap = config.gapByBreakpoint[bp];
    const animated = bp === "xl" || bp === "2xl";

    return {
        breakpoint,
        ready,
        sizes,
        gap,
        animation: config.animation,
        scrollPerStep: config.scrollPerStep,
        animated,
    };
};
