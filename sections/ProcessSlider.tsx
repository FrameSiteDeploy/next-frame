"use client";

import React, {useRef} from "react";
import {useGSAP} from "@gsap/react";
import Section from "@/components/layout/Section";
import {processSteps} from "@/data/processSteps";
import {usePinnedScroll} from "@/hooks/usePinnedScroll";
import {useSliderAnimation} from "@/hooks/useSliderAnimation";
import SliderTrack from "@/components/slider/SliderTrack";

const CONFIG = {
    sizes: {
        inactive: {w: 160, h: 93},
        next: {w: 460, h: 266},
        active: {w: 760, h: 440},
    },
    gap: 40,
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
    scroll: {
        scrollPerStep: 600,
    },
} as const;

const ProcessSlider = () => {
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const textsRef = useRef<HTMLDivElement[]>([]);

    const {init, goTo} = useSliderAnimation({
        sizes: CONFIG.sizes,
        gap: CONFIG.gap,
        animation: CONFIG.animation,
        imagesRef,
        textsRef,
    });

    const {wrapRef} = usePinnedScroll({
        count: processSteps.length,
        scrollPerStep: CONFIG.scroll.scrollPerStep,
        onSlideChange: goTo,
    });

    useGSAP(() => {
        init();
    }, {scope: wrapRef});

    const {sizes} = CONFIG;

    return (
        <div ref={wrapRef} className="w-full">
            <Section
                title={"Строим надёжные дома\nи крепкие отношения"}
                subtitle="Процесс работы"
                id="process"
            >
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-start-3 col-span-10">

                        <SliderTrack height={sizes.active.h}>
                            {processSteps.map((step, i) => (
                                <img
                                    key={step.id}
                                    ref={(el) => {
                                        if (el) imagesRef.current[i] = el;
                                    }}
                                    src={step.image}
                                    alt={step.title}
                                    loading="eager"
                                    fetchPriority={i === 0 ? "high" : "low"}
                                    decoding="async"
                                    className="absolute top-0 left-0 object-cover object-center"
                                    style={{
                                        width: sizes.active.w,
                                        height: sizes.active.h,
                                    }}
                                />
                            ))}
                        </SliderTrack>


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
