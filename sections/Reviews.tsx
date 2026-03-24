"use client";

import React, {useEffect, useRef, useState} from "react";
import Section from "@/components/layout/Section";
import {useVerticalPinnedScroll} from "@/hooks/useVerticalPinnedScroll";
import gsap from "gsap";
import Review from "@/components/reviews/Review";
import {reviews} from "@/data/reviews";
import {useBreakpoint} from "@/hooks/useBreakpoint";

const Reviews = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const offsetsRef = useRef<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const {ready: bpReady, breakpoint} = useBreakpoint();

    // пересчитываем реальные позиции карточек после рендера и при ресайзе
    useEffect(() => {
        const measure = () => {
            const slider = sliderRef.current;
            if (!slider) return;

            const firstOffset = cardRefs.current[0]?.offsetTop ?? 0;

            offsetsRef.current = cardRefs.current.map((card) => {
                if (!card) return 0;
                // каждая карточка едет к позиции первой
                return card.offsetTop - firstOffset;
            });
        };

        measure();

        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [breakpoint]); // пересчитываем при смене брейкпоинта

    const goTo = (next: number) => {
        setCurrentIndex(next);
        const offsetY = offsetsRef.current[next] ?? 0;

        gsap.to(sliderRef.current, {
            y: -offsetY,
            duration: 0.6,
            ease: "back.out(0.8)",
            overwrite: "auto",
        });
    };

    const wrapRef = useVerticalPinnedScroll({
        count: reviews.length,
        scrollPerStep: 1000,
        onIndexChange: goTo,
        enabled: bpReady,
    });

    return (
        <div ref={wrapRef} className="w-full">
            <Section
                title={"ценим не только прочность\nдомов, но и спокойствие жильцов"}
                subtitle="Отзывы клиентов"
                id="reviews"
                className="h-[100vh]"
            >
                <div className="grow-1 overflow-hidden relative">
                    <div
                        className="absolute z-1 top-0 left-0 w-full h-24 bg-[linear-gradient(to_top,rgba(255,255,255,0)_0%,#ffffff_100%)]"/>
                    <div
                        className="absolute z-1 bottom-0 left-0 w-full h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,#ffffff_100%)]"/>

                    <div className="grid-responsive">
                        <div
                            className="divider bg-gradation-300 h-[1px] xl:col-start-3 xl:col-span-8 col-span-full relative z-10"/>
                    </div>

                    <div className="col-span-full grow-1 flex justify-center">
                        <div
                            ref={sliderRef}
                            className="flex flex-col self-center xl:pt-[166px] pt-[48px] 2xl:gap-12 gap-8"
                        >
                            {reviews.map((review, i) => (
                                <div
                                    key={review.id}
                                    ref={(el) => {
                                        cardRefs.current[i] = el;
                                    }}
                                >
                                    <Review
                                        data={review}
                                        selected={currentIndex === i}
                                        style={{rotate: review.rotate}}
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

export default Reviews;
