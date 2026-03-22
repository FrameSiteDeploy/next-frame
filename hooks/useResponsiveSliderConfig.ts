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

export const useResponsiveSliderConfig = <T extends BaseSliderConfig>(config: T) => {
    const { breakpoint, ready } = useBreakpoint("2xl");

    const sizes = config.sizesByBreakpoint[breakpoint];
    const gap = config.gapByBreakpoint[breakpoint];

    const animated = breakpoint === "xl" || breakpoint === "2xl";

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
