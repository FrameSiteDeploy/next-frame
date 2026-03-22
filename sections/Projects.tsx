"use client";

import React, {useRef} from "react";
import Section from "@/components/layout/Section";
import {usePinnedScroll} from "@/hooks/usePinnedScroll";
import {useProjectsSliderAnimation} from "@/hooks/useProjectsSliderAnimation";
import {useGSAP} from "@gsap/react";
import {projectsSteps} from "@/data/projectsSteps";
import {useResponsiveSliderConfig} from "@/hooks/useResponsiveSliderConfig";
import {PROJECTS_SLIDER_CONFIG} from "@/config/projectsSliderConfig";
import {PROCESS_SLIDER_CONFIG} from "@/config/processSliderConfig";
import {useSliderAnimation} from "@/hooks/useSliderAnimation";
import {processSteps} from "@/data/processSteps";
import ScrollTrigger from "gsap/ScrollTrigger";

const Projects = () => {
    const slidesRef = useRef<HTMLDivElement[]>([]);

    const {sizes, gap, animation, scrollPerStep, ready, breakpoint} =
        useResponsiveSliderConfig(PROJECTS_SLIDER_CONFIG);

    const {init, goTo, getSlideWidthByIndex} = useProjectsSliderAnimation({
        sizes,
        gap,
        animation,
        slidesRef,
    });

    const {wrapRef, currentIndex} = usePinnedScroll({
        count: projectsSteps.length,
        scrollPerStep,
        onSlideChange: goTo,
    });

    useGSAP(() => {
        if (!ready) return;
        init(sizes, gap);
        ScrollTrigger.refresh();
    }, {scope: wrapRef, dependencies: [ready, breakpoint]});
    const trackHeight = sizes.active.h + 80 + 16;

    return (
        <div ref={wrapRef} className="w-full">
            <Section
                title={"продуманная архитектура, надежный конструктив и понятный бюджет без «сюрпризов» по ходу стройки"}
                subtitle="Наши проекты"
                id="projects"
                inverted
            >
                <div className="grid-responsive">
                    <div className="col-start-3 col-span-10">

                        <div className="relative" style={{height: trackHeight}}>
                            {projectsSteps.map((step, i) => (
                                <div
                                    key={step.id}
                                    ref={(el) => {
                                        if (el) slidesRef.current[i] = el;
                                    }}
                                    className="absolute top-0 left-0 flex flex-col gap-4"
                                >
                                    <div
                                        className="flex flex-col gap-4"
                                        style={{width: getSlideWidthByIndex(i, currentIndex)}}
                                    >
                                        <h3 className="text-gradation-100 truncate">{step.title}</h3>
                                        <div className="flex gap-4 text-gradation-200">
                                            {step.duration && (
                                                <p className="text-l">
                                                    {step.duration}
                                                </p>
                                            )}
                                            <p className="text-l">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        loading="eager"
                                        fetchPriority={i === 0 ? "high" : "low"}
                                        decoding="async"
                                        className="object-cover object-center"
                                        style={{
                                            width: sizes.active.w,
                                            height: sizes.active.h,
                                            transformOrigin: "left top",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Projects;
