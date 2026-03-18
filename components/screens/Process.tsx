"use client";

import React, {useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Section from "@/components/layout/Section";
import {processSteps} from "@/data/processSteps";
import {useScrollStore} from "@/lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
    sizes: {
        inactive: {w: 160, h: 93},
        next: {w: 460, h: 266},
        active: {w: 760, h: 440},
    },
    gap: 40,
    animation: {
        duration: 0.7,
        ease: "back.out(0.8)",
        textOutDuration: 0.35,
        textInDuration: 0.55,
        textInDelay: 0.2,
        textOutEase: "power2.in",
        textInX: 60,
        textOutX: -60,
    },
    scroll: {
        scrollPerStep: 600,
    },
} as const;

const ProcessSlider = () => {
    const sectionWrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const textsRef = useRef<HTMLDivElement[]>([]);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const wrap = sectionWrapRef.current;
        if (!wrap) return;

        const count = processSteps.length;
        const {sizes, gap, animation, scroll} = CONFIG;

        const getX = (i: number, active: number): number => {
            if (i === active) return 0;
            if (i < active) return -(active - i) * (sizes.inactive.w + gap);
            if (i === active + 1) return sizes.active.w + gap;
            return sizes.active.w + gap + sizes.next.w + gap + (i - active - 2) * (sizes.inactive.w + gap);
        };

        imagesRef.current.forEach((img, i) => {
            gsap.set(img, {
                x: getX(i, 0),
                width: i === 0 ? sizes.active.w : i === 1 ? sizes.next.w : sizes.inactive.w,
                height: i === 0 ? sizes.active.h : i === 1 ? sizes.next.h : sizes.inactive.h,
            });
        });

        textsRef.current.forEach((el, i) => {
            gsap.set(el, {
                opacity: i === 0 ? 1 : 0,
                x: i === 0 ? 0 : animation.textInX,
            });
        });

        let currentActive = 0;

        const {setIsPinned} = useScrollStore.getState();

        ScrollTrigger.create({
            trigger: wrap,
            pin: wrap,
            pinSpacing: true,
            start: "top top",
            end: `+=${(count - 1) * scroll.scrollPerStep}`,
            scrub: false,
            anticipatePin: 1,
            onEnter:     () => setIsPinned(true),
            onLeave:     () => setIsPinned(false),
            onEnterBack: () => setIsPinned(true),
            onLeaveBack: () => setIsPinned(false),
            onUpdate: (self) => {
                const newActive = Math.min(
                    count - 1,
                    Math.floor(self.progress * count)
                );

                if (newActive !== currentActive) {
                    const prev = currentActive;
                    const next = newActive;
                    currentActive = next;
                    setActiveIndex(next);

                    imagesRef.current.forEach((img, i) => {
                        const isActive = i === next;
                        const isNext = i === next + 1;

                        gsap.to(img, {
                            x: getX(i, next),
                            width: isActive ? sizes.active.w : isNext ? sizes.next.w : sizes.inactive.w,
                            height: isActive ? sizes.active.h : isNext ? sizes.next.h : sizes.inactive.h,
                            duration: animation.duration,
                            ease: animation.ease,
                        });
                    });

                    textsRef.current.forEach((el) => {
                        gsap.killTweensOf(el);
                    });

                    textsRef.current.forEach((el, i) => {
                        if (i !== prev && i !== next) {
                            gsap.set(el, {opacity: 0, x: animation.textInX});
                        }
                    });

                    gsap.to(textsRef.current[prev], {
                        opacity: 0,
                        x: animation.textOutX,
                        duration: animation.textOutDuration,
                        ease: animation.textOutEase,
                    });

                    gsap.fromTo(
                        textsRef.current[next],
                        {opacity: 0, x: animation.textInX},
                        {
                            opacity: 1,
                            x: 0,
                            duration: animation.textInDuration,
                            ease: animation.ease,
                            delay: animation.textInDelay,
                        }
                    );
                }
            },
        });

    }, {scope: sectionWrapRef});

    const {sizes} = CONFIG;

    return (
        <div ref={sectionWrapRef} className="w-full">
            <Section
                title={"Строим надёжные дома\nи крепкие отношения"}
                subtitle="Процесс работы"
                id="process"
            >
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-start-3 col-span-10">

                        <div
                            ref={trackRef}
                            className="relative"
                            style={{height: sizes.active.h}}
                        >
                            {processSteps.map((step, i) => (
                                <img
                                    key={step.id}
                                    ref={(el) => {
                                        if (el) imagesRef.current[i] = el;
                                    }}
                                    src={step.image}
                                    alt={step.title}
                                    className="absolute top-0 left-0 object-cover object-center"
                                    style={{
                                        width: i === 0 ? sizes.active.w : i === 1 ? sizes.next.w : sizes.inactive.w,
                                        height: i === 0 ? sizes.active.h : i === 1 ? sizes.next.h : sizes.inactive.h,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative mt-10" style={{height: 220}}>
                            {processSteps.map((step, i) => (
                                <div
                                    key={step.id}
                                    ref={(el) => {
                                        if (el) textsRef.current[i] = el;
                                    }}
                                    className="absolute top-0 left-0 flex gap-10 h-full"
                                    style={{width: sizes.active.w, opacity: i === 0 ? 1 : 0}}
                                >
                                    <div className="flex flex-col justify-between shrink-0">
                                        <div className="flex flex-col gap-4">
                                            <h3>{step.step}</h3>
                                            <p className="text-l text-royal-green-800">{step.price}</p>
                                        </div>
                                        <p className="text-l text-royal-green-600">{step.duration}</p>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div className="flex flex-col gap-4">
                                            <h3>{step.title}</h3>
                                            <p className="text-l text-gradation-600">{step.description}</p>
                                        </div>
                                        {step.promo && (
                                            <p className="text-l text-gradation-800">{step.promo}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ProcessSlider;
