import {MutableRefObject, useCallback, useEffect, useRef} from "react";
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

const getSizes = (i: number, active: number, s: Sizes) => {
    if (i === active) return s.active;
    if (i < active) return s.inactive;
    return s.next;
};

const getX = (i: number, active: number, s: Sizes, g: number): number => {
    if (i === active) return 0;
    if (i < active) return -(active - i) * (s.inactive.w + g);
    if (i === active + 1) return s.active.w + g;
    return s.active.w + g + s.next.w + g + (i - active - 2) * (s.next.w + g);
};

export const useSliderAnimation = ({
                                       sizes,
                                       gap,
                                       animation,
                                       imagesRef,
                                       textsRef,
                                   }: UseSliderAnimationOptions) => {
    const prevRef = useRef(0);
    const sizesRef = useRef(sizes);
    const gapRef = useRef(gap);

    useEffect(() => {
        sizesRef.current = sizes;
        gapRef.current = gap;
    }, [sizes, gap]);

    const init = (currentSizes: Sizes, currentGap: number) => {
        imagesRef.current.forEach((img, i) => {
            const {w, h} = getSizes(i, 0, currentSizes);
            gsap.set(img, {
                x: getX(i, 0, currentSizes, currentGap),
                width: w,
                height: h,
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

    const goTo = useCallback((next: number) => {
        const s = sizesRef.current;
        const g = gapRef.current;
        const prev = prevRef.current;
        prevRef.current = next;

        imagesRef.current.forEach((img, i) => {
            const {w, h} = getSizes(i, next, s);
            gsap.to(img, {
                x: getX(i, next, s, g),
                width: w,
                height: h,
                duration: animation.duration,
                ease: animation.ease,
                overwrite: "auto",
                force3D: true,
            });
        });

        gsap.killTweensOf(textsRef.current);

        textsRef.current.forEach((el, i) => {
            if (i !== prev && i !== next) {
                gsap.set(el, {opacity: 0, x: animation.textInX});
            }
        });

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
            `-=${animation.textInDelay}`
        );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {init, goTo};
};
