import React from "react";
import Section from "@/components/layout/Section";
import FaqAccordion from "@/components/FaqAccordion";

const Faq = () => {
    return (
        <Section
            title={"Ответили на самые  часто-задаваемые вопросы"}
            subtitle="Вопросы и ответы"
            id="faq"
        >
            <div className="grid grid-cols-12 gap-10">
                <FaqAccordion/>
            </div>
        </Section>
);
};

export default Faq;