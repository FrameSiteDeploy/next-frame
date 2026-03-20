import Hero from "@/sections/Hero";
import ProcessSlider from "@/sections/ProcessSlider";
import Projects from "@/sections/Projects";
import React from "react";
import GreenBanner from "@/components/ui/GreenBanner";
import Reviews from "@/sections/Reviews";
import Services from "@/sections/Services";
import Faq from "@/sections/Faq";

export default function Home() {
    return (
        <>
            <Hero/>
            <ProcessSlider/>
            <GreenBanner
                stat="10 000+ м²"
                description="Общая площадь построенных частных домов в Москве и Московской области"
            />
            <Projects/>
            <GreenBanner
                stat="15 лет"
                description="Работаем на рынке проектирования  и строительства частных домов и коттеджей"
            />
            <Reviews/>
            <GreenBanner
                stat="4,5 млн руб"
                description="Минимальная стоимость строительства частного дома «под ключ» со всеми работами и материалами"
            />
            <Services/>
            <GreenBanner
                stat="150 проектов"
                description="Имеем опыт работы с разными задачами: от семейных домов до сложных объектов"
            />
            <Faq/>
        </>
    );
}
