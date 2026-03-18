import {MutableRefObject, useRef} from "react";
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

interface UseSliderAnimationOptions {
    sizes: Sizes;
    gap: number;
    animation: AnimationConfig;
    imagesRef: MutableRefObject<HTMLImageElement[]>;
    textsRef: MutableRefObject<HTMLDivElement[]>;
}

export const useSliderAnimation = ({sizes, gap, animation, imagesRef, textsRef}: UseSliderAnimationOptions) => {
    const prevRef = useRef(0);

    // Предвычисленные scale-значения
    const scaleFor = (i: number, active: number) => {
        if (i === active) return {sx: 1, sy: 1};
        if (i === active + 1) return {sx: sizes.next.w / sizes.active.w, sy: sizes.next.h / sizes.active.h};
        return {sx: sizes.inactive.w / sizes.active.w, sy: sizes.inactive.h / sizes.active.h};
    };

    const getX = (i: number, active: number): number => {
        if (i === active) return 0;
        if (i < active) return -(active - i) * (sizes.inactive.w + gap);
        if (i === active + 1) return sizes.active.w + gap;
        return sizes.active.w + gap + sizes.next.w + gap + (i - active - 2) * (sizes.inactive.w + gap);
    };

    const init = () => {
        imagesRef.current.forEach((img, i) => {
            const {sx, sy} = scaleFor(i, 0);
            gsap.set(img, {
                x: getX(i, 0),
                scaleX: sx,
                scaleY: sy,
                transformOrigin: "left top",
                force3D: true,
            });
        });

        textsRef.current.forEach((el, i) => {
            gsap.set(el, {
                opacity: i === 0 ? 1 : 0,
                x: i === 0 ? 0 : animation.textInX,
            });
        });
    };

    const goTo = (next: number) => {
        const prev = prevRef.current;
        prevRef.current = next;

        // Изображения — только transform, никакого reflow
        imagesRef.current.forEach((img, i) => {
            const {sx, sy} = scaleFor(i, next);
            gsap.to(img, {
                x: getX(i, next),
                scaleX: sx,
                scaleY: sy,
                duration: animation.duration,
                ease: animation.ease,
                overwrite: "auto",
                force3D: true,
            });
        });

        // Убиваем все текстовые анимации разом
        gsap.killTweensOf(textsRef.current);

        // Все посторонние — мгновенно скрыть
        textsRef.current.forEach((el, i) => {
            if (i !== prev && i !== next) {
                gsap.set(el, {opacity: 0, x: animation.textInX});
            }
        });

        // Timeline гарантирует последовательность без race condition
        const tl = gsap.timeline();

        tl.to(textsRef.current[prev], {
            opacity: 0,
            x: animation.textOutX,
            duration: animation.textOutDuration,
            ease: animation.textOutEase,
        });

        tl.fromTo(
            textsRef.current[next],
            {opacity: 0, x: animation.textInX},
            {opacity: 1, x: 0, duration: animation.textInDuration, ease: animation.ease},
            `-=${animation.textInDelay}`  // небольшой overlap вместо независимого delay
        );
    };

    return {init, goTo};
};
