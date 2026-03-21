"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {faqs} from "@/data/faq";
import {AddLine, SubtractLine} from "@/assets/icons";

const FaqAccordion = () => {
    return (
        <Accordion.Root
            type="single"
            defaultValue="item-1"
            className="col-start-3 col-span-8 flex flex-col gap-6 h-165"
        >
            {faqs.map((item) => (
                <Accordion.Item
                    key={item.id}
                    value={`item-${item.id}`}
                    className="relative group"
                >
                    <div className="flex flex-col gap-6">
                        <div className="divider h-[1px] w-full bg-gradation-300"/>

                        <Accordion.Trigger
                            className="flex items-center justify-between text-gradation-800 text-left w-full cursor-pointer">
                            <h3>{item.question}</h3>

                            <span className="shrink-0 ml-4 flex items-center">
                                <AddLine className="block group-data-[state=open]:hidden"/>
                                <SubtractLine className="hidden group-data-[state=open]:block"/>
                            </span>
                        </Accordion.Trigger>
                    </div>

                    <Accordion.Content
                        className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up h-[230px] flex flex-col">
                        <div className="self-end mt-auto text-l text-gradation-600 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out">
                            <p>{item.answer}</p>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

export default FaqAccordion;
