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
            <div className="grid-responsive">
                <FaqAccordion/>
            </div>
        </Section>
);
};

export default Faq;