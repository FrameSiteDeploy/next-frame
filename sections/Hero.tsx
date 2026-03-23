"use client";

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {formatText} from "@/utils/formatText";
import {useResponsiveText} from "@/hooks/useResponsiveText";

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const heroLine1 = useResponsiveText({
        "2xl": "Строим загородные дома «под ключ» в Москве и Московской области уже 15 лет",
        xl: "Строим загородные дома «под ключ» в Москве и Московской области уже 15 лет",
        md: "Строим загородные дома «под ключ»  в Москве и Московской области  уже 15 лет",
        sm: "Строим загородные дома «под ключ» в Москве и Московской области уже 15 лет",
        xs: "Строим загородные дома «под ключ» в Москве и Московской области уже 15 лет",
    });

    const heroLine2 = useResponsiveText({
        "2xl": "От благоустройства до внутренней отделки, с гарантией 10 лет на несущие конструкции",
        xl: "От благоустройства до внутренней отделки, с гарантией 10 лет на несущие конструкции",
        md: "От благоустройства до внутренней отделки, с гарантией 10 лет  на несущие конструкции",
        sm: "От благоустройства до внутренней отделки, с гарантией 10 лет на несущие конструкции",
        xs: "От благоустройства до внутренней отделки, с гарантией 10 лет на несущие конструкции",
    });

    const heroTitle = useResponsiveText({
        "2xl": "Надежные монолитные дома без сюрпризов в смете ",
        xl: "Надежные монолитные дома без сюрпризов в смете",
        md: "Надежные монолитные дома\nбез сюрпризов в смете",
        sm: "Надежные монолитные дома без сюрпризов ",
        xs: "Надежные монолитные дома без сюрпризов  в смете",
    });

    const budgetText = useResponsiveText({
        "2xl": "Заранее обсуждаем ориентир по стоимости  (дома «под ключ» от 4 500 000 ₽)  и предлагаем понятную поэтапную систему оплаты",
        xl:   "Заранее обсуждаем ориентир по стоимости (дома «под ключ» от 4 500 000 ₽) и предлагаем поэтапную систему оплаты",
        md:   "Заранее обсуждаем ориентир по стоимости (дома «под ключ»  от 4 500 000 ₽) и предлагаем понятную поэтапную систему оплаты",
        sm:   "Заранее обсуждаем ориентир по стоимости (дома «под ключ» от 4 500 000 ₽) и предлагаем поэтапную систему оплаты",
        xs:   "Заранее обсуждаем ориентир  по стоимости (дома «под ключ»  от 4 500 000 ₽) и предлагаем поэтапную систему оплаты",
    });

    const handoverText = useResponsiveText({
        xl: "Выполняем отделку, монтаж инженерных систем и благоустройство территории",
        xs: "Выполняем отделку, монтаж инженерных систем  и благоустройство территории",
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                bgRef.current,
                {
                    scale: 1.15,
                    yPercent: 0,
                },
                {
                    scale: 1,
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
                className="relative overflow-hidden flex flex-col items-center gap-10 lg:gap-8 h-[100vh]"
            >
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                    style={{backgroundImage: "url('/hero.png')"}}
                />

                <div className="relative z-10 container flex flex-col justify-between h-full pt-[105px] md:pt-[129px]">
                    <div className="grid-responsive">
                        <div
                            className="flex flex-col 2xl:col-start-8 2xl:col-span-5 xl:col-start-7 xl:col-span-6 md:col-start-5 md:col-span-4 col-span-full text-white gap-[6px]">
                            <p className="text-l">
                                {formatText(heroLine1)}
                            </p>
                            <p className="text-l">
                                {formatText(heroLine2)}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:gap-[38px] gap-6 pb-12">
                        <h1 className="text-white xl:text-justify xl:[text-align-last:justify] max-md:sm:text-justify max-md:sm:[text-align-last:justify]">
                            {formatText(heroTitle)}
                        </h1>
                        <div className="items-center grid-responsive">
                            <p className="text-m text-white col-span-1 sm:col-span-2">Листайте <span
                                className="hidden sm:inline">вниз</span></p>
                            <div
                                className="h-[1px] xl:col-span-10 md:col-span-6 sm:col-span-4 col-span-3 bg-white"></div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="bg-gradation-100 2xl:h-[186px] md:py-12 py-6 flex items-center">
                <div className="container grid-responsive">
                    <div className="xl:col-start-3 xl:col-span-5 md:col-span-4 col-span-full flex flex-col gap-[6px] text-gradation-800">
                        <p className="text-l font-medium">Помогаем контролировать бюджет</p>
                        <p className="text-m">
                            {formatText(budgetText)}
                        </p>
                    </div>
                    <div className="xl:col-span-5 md:col-span-4 col-span-full flex flex-col gap-[6px] text-gradation-800">
                        <p className="text-l font-medium">Сдаем дом, в который можно сразу
                            заехать</p>
                        <p className="text-m">
                            {formatText(handoverText)}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
