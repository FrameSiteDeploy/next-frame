"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {faqs} from "@/data/faq";
import {AddLine, SubtractLine} from "@/assets/icons";

const FaqAccordion = () => {
    return (
        <Accordion.Root
            type="single"
            collapsible
            defaultValue="item-1"
            className="xl:col-start-3 xl:col-span-8 col-span-full flex flex-col gap-4 xl:h-165"
        >
            {faqs.map((item) => (
                <Accordion.Item
                    key={item.id}
                    value={`item-${item.id}`}
                    className="relative group"
                >
                    <div className="flex flex-col gap-4">
                        <div className="divider h-[1px] w-full bg-gradation-300"/>

                        <Accordion.Trigger
                            className="flex items-center justify-between text-gradation-800 text-left w-full cursor-pointer"
                        >
                            <h3>{item.question}</h3>

                            <span className="shrink-0 ml-4 flex items-center">
                                <AddLine className="block group-data-[state=open]:hidden"/>
                                <SubtractLine className="hidden group-data-[state=open]:block"/>
                            </span>
                        </Accordion.Trigger>
                    </div>

                    <Accordion.Content
                        className={`
                            overflow-hidden
                            data-[state=open]:animate-accordion-down
                            data-[state=closed]:animate-accordion-up
                            flex flex-col
                            xl:h-[230px]
                        `}
                    >
                        <div
                            className="
                                text-l text-gradation-600
                                xl:self-end xl:mt-auto xl:pt-0
                                pt-3
                            "
                        >
                            <p>{item.answer}</p>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

export default FaqAccordion;
