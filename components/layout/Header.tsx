"use client";

import React, {useEffect, useRef, useState} from 'react';
import Button from "@/components/ui/Button";
import {Logo, LogoWithText, MenuLine, PhoneFill} from "@/assets/icons";
import {cn} from "tailwind-variants";
import {useScrollStore} from "@/lib/scrollState";
import {useBreakpoint} from "@/hooks/useBreakpoint";
import {scrollTo} from "@/utils/scrollTo";

const Header = () => {
    const [visible, setVisible] = useState(true);
    const [inverted, setInverted] = useState(true);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const lastScrollY = useRef(0);
    const {isBelow} = useBreakpoint();

    const isBelowSm = isBelow("sm")

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const {isPinned} = useScrollStore.getState();

            // console.log('isPinned', isPinned, currentScrollY);

            if (isPinned) {
                setVisible(false)
            } else if (currentScrollY < 10) {
                setVisible(true);
                setInverted(true);
            } else if (currentScrollY > lastScrollY.current) {
                setVisible(false);
            } else {
                setVisible(true);
                setInverted(false);
            }


            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                "h-[81px] flex items-center",
                "transition-all duration-300 ease-in-out",
                "backdrop-blur-[8px]",
                visible ? "translate-y-0" : "-translate-y-full",
                inverted
                    ? "text-white bg-black/10"
                    : "text-royal-green-800 bg-white/90"
            )}
        >
            <div className="container h-full">
                <div
                    className="relative items-center grid-responsive h-full"
                >
                    <span
                        className={cn(
                            "absolute bottom-0 left-0 right-0",
                            "h-[1px] translate-y-1/2",
                            inverted ? "bg-white/20" : "bg-gradation-300",
                            visible ? "opacity-100 delay-0" : "opacity-0 delay-300"
                        )}
                    />
                    <Button iconOnly={isBelowSm} inverted={inverted} startIcon={<MenuLine/>} variant="secondary"
                            className="2xl:hidden col-span-1 sm:col-span-2">
                        Меню
                    </Button>
                    <a
                        href="#"
                        className="flex xl:grow-0 grow-1 2xl:col-span-2 xl:col-span-8 md:col-span-4 col-span-2 justify-center 2xl:justify-start"
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setIsLogoHovered(false)}
                    >
                        {inverted ? (
                            <div className="relative w-[140px] h-[48px]">
                                <div
                                    className={cn(
                                        "absolute inset-0 flex justify-center 2xl:justify-start transition-opacity duration-300",
                                        isLogoHovered ? "opacity-0" : "opacity-100"
                                    )}
                                >
                                    <Logo/>
                                </div>
                                <div
                                    className={cn(
                                        "absolute inset-0 flex justify-center 2xl:justify-start transition-opacity duration-300",
                                        isLogoHovered ? "opacity-100" : "opacity-0"
                                    )}
                                >
                                    <LogoWithText className="w-[140px] h-[48px] fill-gradation-100"/>
                                </div>
                            </div>
                        ) : (
                            <LogoWithText className="w-[140px] h-[48px] fill-gradation-800"/>
                        )}
                    </a>
                    <div className="2xl:flex hidden col-span-8 justify-between">
                        <div className="flex gap-6">
                            <a className="text-l" href="#process" onClick={scrollTo("process")}>Процесс</a>
                            <a className="text-l" href="#projects" onClick={scrollTo("projects")}>Проекты</a>
                            <a className="text-l" href="#services" onClick={scrollTo("services")}>Услуги</a>
                            <a className="text-l" href="#reviews" onClick={scrollTo("reviews")}>Отзывы</a>
                            <a className="text-l" href="#faq" onClick={scrollTo("faq")}>Q&A</a>
                        </div>
                        <a href="tel:+74957927751">+7 (495) 792‑77‑51</a>
                    </div>
                    <Button iconOnly={isBelowSm} startIcon={isBelowSm && <PhoneFill/>}
                            onClick={scrollTo("contacts")} inverted={inverted}
                            className="col-span-1 sm:col-span-2 max-sm:ml-auto">
                        Связаться
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
