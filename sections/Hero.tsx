"use client";

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

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

                <div className="relative z-10 container flex flex-col justify-between h-full pt-[128px]">
                    <div className="grid grid-cols-12 gap-10">
                        <div className="flex flex-col col-start-8 col-span-5 text-white gap-[6px]">
                            <p className="text-l">
                                Строим загородные дома «под ключ» в Москве и Московской области уже 15 лет
                            </p>
                            <p className="text-l">
                                От благоустройства до внутренней отделки, с гарантией 10 лет на несущие конструкции
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-12 pb-12">
                        <h1 className="text-white text-justify [text-align-last:justify]">Надежные монолитные дома без
                            сюрпризов в смете</h1>
                        <div className="flex items-center gap-[38px] grid grid-cols-12 gap-10">
                            <p className="text-m text-white col-span-2">Листайте вниз</p>
                            <div className="h-[1px] col-span-10 bg-white"></div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="bg-gradation-100 h-[186px] flex items-center">
                <div className="container grid grid-cols-12 gap-10">
                    <div className="col-start-3 col-span-5  flex flex-col gap-[6px]">
                        <p className="text-l font-medium text-gradation-800">Помогаем контролировать бюджет</p>
                        <p className="text-m">Заранее обсуждаем ориентир по стоимости br (дома «под ключ» от 4 500 000 ₽) <br/> и
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
