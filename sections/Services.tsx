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
            {/*<div className="grid grid-cols-12 gap-10">*/}
            {/*    <div className="accordion col-start-3 col-span-8 flex flex-col gap-6 h-165">*/}

            {/*        <div className="flex flex-col gap-6 grow-1 relative ">*/}
            {/*            <Image width={160} height={93} className="absolute right-0 top-0 translate-x-[calc(100%+40px)]"*/}
            {/*                   src="/step4.png" alt="img"/>*/}
            {/*            <div className="divider h-[1px] w-full bg-gradation-300"></div>*/}
            {/*            <div className="flex flex-col justify-between gap-6 h-full">*/}
            {/*                <div className="flex flex-col gap-3">*/}
            {/*                    <div className="flex justify-between text-gradation-100">*/}
            {/*                        <h3>Стоимость строительства монолитного дома</h3>*/}
            {/*                        <h3 className="hidden">от 45 000 ₽ / м²</h3>*/}
            {/*                    </div>*/}
            {/*                    <div className="flex flex-col text-l text-gradation-200 gap-2">*/}
            {/*                        <p>Монолитный дом имеет железобетонный каркас, который воспринимает все основные*/}
            {/*                            нагрузки, что обеспечивает большую свободу планировок, высокую жесткость и*/}
            {/*                            долговечность.</p>*/}
            {/*                        <p>Кирпич и блоки в таком доме чаще выполняют роль заполнения, а не несущих стен,*/}
            {/*                            что позволяет сочетать эстетику и обеспечить надежность</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="flex flex-col gap-3">*/}
            {/*                    <h2 className="text-gradation-100">от 45 000 ₽ / м²</h2>*/}
            {/*                    <p className="text-m text-gradation-300">Работы и материалы по конструктиву, отделка и*/}
            {/*                        инженерия рассчитываются отдельно</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="flex flex-col gap-6 relative ">*/}
            {/*            <Image width={160} height={93} className="absolute right-0 top-0 translate-x-[calc(100%+40px)] hidden"*/}
            {/*                   src="/step2.png" alt="img"/>*/}
            {/*            <div className="divider h-[1px] w-full bg-gradation-300"></div>*/}
            {/*            <div className="flex flex-col justify-between gap-6 h-full">*/}
            {/*                <div className="flex flex-col gap-3">*/}
            {/*                    <div className="flex justify-between text-gradation-100">*/}
            {/*                        <h3>Индивидуальный проект дома</h3>*/}
            {/*                        <h3>от 2 500 ₽ / м²</h3>*/}
            {/*                    </div>*/}
            {/*                    <div className="flex flex-col text-l text-gradation-200 gap-2 hidden">*/}
            {/*                        <p>Монолитный дом имеет железобетонный каркас, который воспринимает все основные*/}
            {/*                            нагрузки, что обеспечивает большую свободу планировок, высокую жесткость и*/}
            {/*                            долговечность.</p>*/}
            {/*                        <p>Кирпич и блоки в таком доме чаще выполняют роль заполнения, а не несущих стен,*/}
            {/*                            что позволяет сочетать эстетику и обеспечить надежность</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="flex flex-col gap-3 hidden">*/}
            {/*                    <h2 className="text-gradation-100">от 2 500 ₽ / м²</h2>*/}
            {/*                    <p className="text-m text-gradation-300">Работы и материалы по конструктиву, отделка и*/}
            {/*                        инженерия рассчитываются отдельно</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}
            <div className="grid grid-cols-12 gap-10">
                <ServicesAccordion />
            </div>
        </Section>
    );
};

export default Services;
