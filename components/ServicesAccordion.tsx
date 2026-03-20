"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import {services} from "@/data/services";

const ServicesAccordion = () => {
    return (
        <Accordion.Root
            type="single"
            defaultValue="item-1"
            className="col-start-3 col-span-8 flex flex-col gap-6 h-165"
        >
            {services.map((item) => (
                <Accordion.Item
                    key={item.id}
                    value={item.id}
                    className="relative group flex flex-col data-[state=open]:grow-1"
                >
                    <Image
                        width={160}
                        height={93}
                        src={item.image}
                        alt={item.title}
                        className="absolute right-0 top-0 translate-x-[calc(100%+40px)] hidden group-data-[state=open]:block"
                    />

                    <div className="flex flex-col gap-6">
                        <div className="divider h-[1px] w-full bg-gradation-300"/>
                        <Accordion.Trigger
                            className="flex justify-between text-gradation-100 text-left w-full cursor-pointer">
                            <h3>{item.title}</h3>
                            <h3 className="group-data-[state=open]:hidden shrink-0 ml-4">
                                {item.price}
                            </h3>
                        </Accordion.Trigger>
                    </div>

                    {/* grid — ключевой трюк */}
                    <Accordion.Content
                        className="grid data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up h-full"
                    >
                        {/* слой, который режет содержимое по высоте */}
                        <div className="overflow-hidden h-full">
                            {/* слой, который анимируем по opacity/translate */}
                            <div className="min-h-0 flex flex-col justify-between gap-6 pt-3
                        data-[state=open]:animate-content-in data-[state=closed]:animate-content-out h-full">
                                <div className="flex flex-col gap-2 text-l text-gradation-200">
                                    {item.description.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-gradation-100">{item.price}</h2>
                                    {item.priceNote && (
                                        <p className="text-m text-gradation-300">{item.priceNote}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Accordion.Content>

                </Accordion.Item>


            ))}
        </Accordion.Root>
    );
};

export default ServicesAccordion;
