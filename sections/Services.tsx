import React from "react";
import Section from "@/components/layout/Section";
import Image from "next/image";
import ServicesAccordion from "@/components/ServicesAccordion";

const Services = () => {
    return (
        <Section
            title={"Считаем стоимость по объему работ и фиксируем цену в договоре"}
            subtitle="Наши услуги"
            id="services"
            inverted
        >
            <div className="grid grid-cols-12 gap-10">
                <ServicesAccordion />
            </div>
        </Section>
    );
};

export default Services;
