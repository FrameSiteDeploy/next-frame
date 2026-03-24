"use client";

import React from "react";
import {LogoWithText} from "@/assets/icons";
import ContactForm from "@/components/ContactForm";

const siteCopyright = "© 2026 все права защищены, разработано творческим объединением Atriune"

const Footer = () => {
    return (
        <footer id="contacts" className="bg-gradation-800 sm:py-12 py-6 p min-h-[100vh]">
            <div className="container grid-responsive">
                <div className="flex flex-col col-span-full sm:gap-12 gap-6">
                    <div
                        className="2xl:h-[300px] xl:h-[214px] md:h-[142px] sm:h-[108px] h-[68px] flex items-center">
                        <LogoWithText className="w-full fill-gradation-100"/>
                    </div>
                    <div className="divider h-[1px] bg-gradation-600"></div>
                </div>

                <div className="2xl:h-[504px] col-span-full grid-responsive">
                    {/* Форма */}
                    <div className="order-1 md:order-1 xl:order-3 col-span-full xl:col-start-8 xl:col-span-5">
                    <ContactForm/>
                    </div>

                    {/* Divider только на md+ и только в этой группе */}
                    <div className="order-2 md:order-2 xl:hidden col-span-full my-6">
                        <div className="divider h-[1px] bg-gradation-600"/>
                    </div>

                    {/* Левая колонка */}
                    <div
                        className="order-4 xl:order-1 xl:col-span-2 md:col-span-4 col-span-full flex flex-col justify-between md:gap-12 gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-m text-gradation-200">Связь в медиа</p>
                            <h2 className="text-gradation-100">Почта</h2>
                            <h2 className="text-gradation-100">TG</h2>
                        </div>
                        <div className="flex flex-col gap-6 text-m text-gradation-300">
                            <p>ООО «НПКЕК» ИНН 9726009923</p>
                            <p className="md:hidden block">
                                {siteCopyright}
                            </p>
                        </div>
                    </div>

                    {/* Правая колонка */}
                    <div
                        className="order-3 xl:order-2 xl:col-start-3 xl:col-span-5 md:col-span-4 col-span-full flex flex-col justify-between md:gap-12 gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-m text-gradation-200">Навигация по сайту</p>
                            <h2 className="text-gradation-100">Процесс</h2>
                            <h2 className="text-gradation-100">Проекты</h2>
                            <h2 className="text-gradation-100">Отзывы</h2>
                            <h2 className="text-gradation-100">Q&A</h2>
                        </div>
                        <p className="text-m text-gradation-300 md:block hidden">
                            {siteCopyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
