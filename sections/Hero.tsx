"use client";

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {formatText} from "@/utils/formatText";

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

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
                                {formatText("Строим загородные дома «под ключ»  в Москве и Московской области  уже 15 лет")}
                            </p>
                            <p className="text-l">
                                {formatText("От благоустройства до внутренней отделки, с гарантией 10 лет  на несущие конструкции")}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:gap-[38px] gap-6 pb-12">
                        <h1 className="text-white xl:text-justify xl:[text-align-last:justify] max-md:sm:text-justify max-md:sm:[text-align-last:justify]">
                            {/* ≥ 2xl */}
                            <span className="hidden 2xl:inline">
                              {formatText("Надежные монолитные дома без сюрпризов в смете ")}
                            </span>

                            {/* xl–2xl */}
                            <span className="hidden xl:inline 2xl:hidden">
                              {formatText("Надежные монолитные дома без сюрпризов в смете")}
                            </span>

                            {/* md–xl */}
                            <span className="hidden md:inline xl:hidden">
                              {formatText("Надежные монолитные дома\nбез сюрпризов в смете")}
                            </span>

                            {/* sm–md */}
                            <span className="hidden sm:inline md:hidden">
                              {formatText("Надежные монолитные дома без сюрпризов ")}
                            </span>

                            {/* < sm */}
                            <span className="inline sm:hidden">
                              {formatText("Надежные монолитные дома без сюрпризов  в смете")}
                            </span>

                        </h1>
                        <div className="flex items-center grid-responsive">
                            <p className="text-m text-white col-span-1 sm:col-span-2">Листайте <span
                                className="hidden sm:inline">вниз</span></p>
                            <div
                                className="h-[1px] xl:col-span-10 md:col-span-6 sm:col-span-4 col-span-3 bg-white"></div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="bg-gradation-100 h-[186px] flex items-center">
                <div className="container grid-responsive">
                    <div className="col-start-3 col-span-5 flex flex-col gap-[6px]">
                        <p className="text-l font-medium text-gradation-800">Помогаем контролировать бюджет</p>
                        <p className="text-m">Заранее обсуждаем ориентир по стоимости br (дома «под ключ» от 4 500 000
                            ₽) <br/> и
                            предлагаем понятную поэтапную систему оплаты</p>
                    </div>
                    <div className="col-span-5 flex flex-col gap-[6px]">
                        <p className="text-l font-medium text-gradation-800">Сдаем дом, в который можно сразу
                            заехать</p>
                        <p className="text-m">Выполняем отделку, монтаж инженерных систем и благоустройство
                            территории</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
