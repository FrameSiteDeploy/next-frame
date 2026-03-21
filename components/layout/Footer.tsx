'use client';

import React from 'react';
import {LogoWithText} from "@/assets/icons";
import ContactForm from "@/components/ContactForm";

const Footer = () => {
    return (
        <footer id="contacts" className="bg-gradation-800 py-12 min-h-[100vh] h-[100vh]">
            <div className="container grid grid-cols-12 gap-10">
                <div className="flex flex-col col-span-full gap-12">
                    <div className="py-4">
                        <div className="h-[266px] overflow-hidden flex items-center">
                            <LogoWithText className="w-full fill-gradation-100"/>
                        </div>
                    </div>
                    <div className="divider h-[1px] bg-gradation-600"></div>
                </div>
                <div className="h-[504px] col-span-full grid grid-cols-12 gap-10">
                    <div className="col-span-2 flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="text-m text-gradation-200">Связь в медиа</p>
                            <h2 className="text-gradation-100">Почта</h2>
                            <h2 className="text-gradation-100">TG</h2>
                        </div>
                        <p className="text-m text-gradation-300">ООО «НПКЕК» ИНН 9726009923</p>
                    </div>
                    <div className="col-start-3 col-span-5 flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="text-m text-gradation-200">Навигация по сайту</p>
                            <h2 className="text-gradation-100">Процесс</h2>
                            <h2 className="text-gradation-100">Проекты</h2>
                            <h2 className="text-gradation-100">Отзывы</h2>
                            <h2 className="text-gradation-100">Q&A</h2>
                        </div>
                        <p className="text-m text-gradation-300">
                            © 2026 все права защищены, разработано творческим объединением Atriune
                        </p>
                    </div>
                    <ContactForm/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
