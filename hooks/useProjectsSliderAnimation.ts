import {RefObject, useCallback, useEffect, useRef} from "react";
import gsap from "gsap";

interface Sizes {
    inactive: { w: number; h: number };
    next: { w: number; h: number };
    active: { w: number; h: number };
}

interface AnimationConfig {
    duration: number;
    ease: string;
    textOutDuration: number;
    textInDuration: number;
    textInDelay: number;
    textOutEase: string;
    textInX: number;
    textOutX: number;
}

interface UseProjectsSliderAnimationOptions {
    sizes: Sizes;
    gap: number;
    animation: AnimationConfig;
    slidesRef: RefObject<HTMLDivElement[]>;
}

const getSlideSize = (i: number, active: number, s: Sizes) => {
    if (i === active) return s.active;
    if (i === active + 1) return s.next;
    return s.inactive;
};

const getX = (i: number, active: number, s: Sizes, g: number): number => {
    if (i === active) return 0;
    if (i < active) return -(active - i) * (s.inactive.w + g);

    // Справа: сначала next, потом остальные inactive
    if (i === active + 1) {
        return s.active.w + g;
    }

    // i > active + 1
    return (
        s.active.w +
        g +
        s.next.w +
        g +
        (i - active - 2) * (s.inactive.w + g)
    );
};

export const useProjectsSliderAnimation = ({
                                               sizes,
                                               gap,
                                               animation,
                                               slidesRef,
                                           }: UseProjectsSliderAnimationOptions) => {
    const prevRef = useRef(0);
    const sizesRef = useRef(sizes);
    const gapRef = useRef(gap);

    useEffect(() => {
        sizesRef.current = sizes;
        gapRef.current = gap;
    }, [sizes, gap]);

    const init = (currentSizes: Sizes, currentGap: number) => {
        const slides = slidesRef.current;
        if (!slides) return;

        slides.forEach((slide, i) => {
            const {w, h} = getSlideSize(i, 0, currentSizes);
            const img = slide.querySelector("img");

            gsap.set(slide, {
                x: getX(i, 0, currentSizes, currentGap),
                width: w,
                height: h,
                force3D: true,
            });

            if (img) {
                gsap.set(img, {
                    width: w,
                    height: h,
                    objectFit: "cover",
                    transformOrigin: "left top",
                });
            }
        });
    };

    const goTo = useCallback((next: number) => {
        const slides = slidesRef.current;
        if (!slides) return;

        const s = sizesRef.current;
        const g = gapRef.current;

        prevRef.current = next;

        slides.forEach((slide, i) => {
            const {w, h} = getSlideSize(i, next, s);
            const img = slide.querySelector("img");

            gsap.to(slide, {
                x: getX(i, next, s, g),
                width: w,
                height: h,
                duration: animation.duration,
                ease: animation.ease,
                overwrite: "auto",
                force3D: true,
            });

            if (img) {
                gsap.to(img, {
                    width: w,
                    height: h,
                    duration: animation.duration,
                    ease: animation.ease,
                    overwrite: "auto",
                    force3D: true,
                });
            }
        });
    }, [animation, slidesRef]);

    const getSlideWidthByIndex = (i: number, activeIndex: number) =>
        getSlideSize(i, activeIndex, sizes).w;

    return {init, goTo, getSlideWidthByIndex};
};
