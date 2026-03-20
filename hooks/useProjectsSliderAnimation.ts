import { RefObject, useRef } from "react";
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

export const useProjectsSliderAnimation = ({
                                               sizes,
                                               gap,
                                               animation,
                                               slidesRef,
                                           }: UseProjectsSliderAnimationOptions) => {
    const prevRef = useRef(0);

    const getSlideWidthByIndex = (i: number, activeIndex: number) =>
        i === activeIndex ? sizes.active.w : sizes.inactive.w;

    // Все неактивные (включая next) имеют одинаковую ширину 460
    // Активный — 760. Масштаб применяется только к img внутри слайда
    const imgScaleFor = (i: number, active: number) => {
        if (i === active) return { sx: 1, sy: 1 };
        return {
            sx: sizes.inactive.w / sizes.active.w,
            sy: sizes.inactive.h / sizes.active.h,
        };
    };

    const getX = (i: number, active: number): number => {
        if (i === active) return 0;
        if (i < active) return -(active - i) * (sizes.inactive.w + gap);
        // После активного: каждый слайд шириной inactive.w
        return sizes.active.w + gap + (i - active - 1) * (sizes.inactive.w + gap);
    };

    const init = () => {
        slidesRef.current?.forEach((slide, i) => {
            const img = slide.querySelector("img");

            gsap.set(slide, {
                x: getX(i, 0),
                transformOrigin: "left top",
                force3D: true,
            });

            if (img) {
                const { sx, sy } = imgScaleFor(i, 0);
                gsap.set(img, {
                    scaleX: sx,
                    scaleY: sy,
                    transformOrigin: "left top",
                    force3D: true,
                });
            }
        });
    };

    const goTo = (next: number) => {
        const slides = slidesRef.current;
        if (!slides) return;

        prevRef.current = next;

        slides.forEach((slide, i) => {
            const img = slide.querySelector("img");
            const { sx, sy } = imgScaleFor(i, next);

            gsap.to(slide, {
                x: getX(i, next),
                duration: animation.duration,
                ease: animation.ease,
                overwrite: "auto",
                force3D: true,
            });

            if (img) {
                gsap.to(img, {
                    scaleX: sx,
                    scaleY: sy,
                    duration: animation.duration,
                    ease: animation.ease,
                    overwrite: "auto",
                    force3D: true,
                });
            }
        });
    };

    return { init, goTo, getSlideWidthByIndex };
};
