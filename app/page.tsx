import Hero from "@/components/screens/Hero";
import Process from "@/components/screens/Process";
import Projects from "@/components/screens/Projects";
import React from "react";
import GreenBanner from "@/components/ui/GreenBanner";

export default function Home() {
    return (
        <>
            <Hero/>
            <Process/>
            <GreenBanner
                stat="10 000+ м²"
                description="Общая площадь построенных частных домов в Москве и Московской области"
            />
            <Projects/>
            <GreenBanner
                stat="15 лет"
                description="Работаем на рынке проектирования  и строительства частных домов и коттеджей"
            />
            {/*   TODO: секция отзывов */}
            <GreenBanner
                stat="4,5 млн руб"
                description="Минимальная стоимость строительства частного дома «под ключ» со всеми работами и материалами"
            />
            {/*    TODO: секция услуг*/}
            <GreenBanner
                stat="150 проектов"
                description="Имеем опыт работы с разными задачами: от семейных домов до сложных объектов"
            />
            {/*    TODO: вопросы и ответы*/}
        </>
    );
}
