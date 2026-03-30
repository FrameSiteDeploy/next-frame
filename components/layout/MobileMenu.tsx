"use client";

import React, {useEffect} from "react";
import {LogoWithText} from "@/assets/icons";
import {scrollTo} from "@/utils/scrollTo";
import {cn} from "tailwind-variants";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

const navLinks = [
    {label: "Процесс", id: "process"},
    {label: "Проекты", id: "projects"},
    {label: "Услуги", id: "services"},
    {label: "Отзывы", id: "reviews"},
    {label: "Q&A", id: "faq"},
];

const MobileMenu = ({open, onClose}: MobileMenuProps) => {
    // Блокируем скролл страницы пока меню открыто
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleLinkClick = (e: React.MouseEvent, id: string) => {
        scrollTo(id)(e);
        onClose();
    };

    return (
        <>
            {/* Оверлей */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                    "hidden md:block",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Панель */}
            <div
                className={cn(
                    "fixed top-0 left-0 bottom-0 z-50",
                    "bg-gradation-800 flex flex-col",
                    "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "w-full xl:max-w-xs",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Шапка панели */}
                <div className="flex items-center justify-between px-6 h-[81px] border-b border-white/10 shrink-0">
                    <LogoWithText className="w-[120px] h-[40px] fill-gradation-100"/>
                    <button
                        onClick={onClose}
                        aria-label="Закрыть меню"
                        className="w-10 h-10 flex items-center justify-center text-gradation-300 hover:text-gradation-100 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M5 5l10 10M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Ссылки */}
                <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => handleLinkClick(e, link.id)}
                            className={cn(
                                "flex items-center justify-between",
                                "py-4 border-b border-white/10",
                                "text-gradation-100 transition-colors hover:text-white",
                                "transition-all duration-300",
                                open
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                            )}
                            style={{
                                transitionDelay: open ? `${i * 40 + 100}ms` : "0ms",
                            }}
                        >
                            <h3>{link.label}</h3>
                            <span className="text-gradation-500 text-m">0{i + 1}</span>
                        </a>
                    ))}
                </nav>

                {/* Телефон внизу */}
                <div
                    className={cn(
                        "px-6 py-8 border-t border-white/10 shrink-0",
                        "transition-all duration-300",
                        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{transitionDelay: open ? "320ms" : "0ms"}}
                >
                    <p className="text-m text-gradation-100 mb-2">Позвонить</p>
                    <a
                        href="tel:+74957927751"
                        className="text-gradation-100 hover:text-white transition-colors"
                    >
                        <h3>+7 (495) 792‑77‑51</h3>
                    </a>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;