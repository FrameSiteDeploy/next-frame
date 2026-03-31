"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import { services } from "@/data/services";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { formatText } from "@/utils/formatText";

const ServicesAccordion = () => {
    const { isBelow, ready } = useBreakpoint();
    const isMobile = ready ? isBelow("xl") : false;

    if (isMobile) {
        return (
            <div className="col-span-full flex flex-col gap-6">
                {services.map((item) => (
                    <div key={item.id} className="flex flex-col gap-6">
                        <div className="divider h-[1px] w-full bg-gradation-300" />
                        <h3 className="text-gradation-100">{formatText(item.title)}</h3>
                        <div className="flex flex-col gap-2 text-l text-gradation-200">
                            {item.description.map((p, i) => (
                                <p key={i}>{formatText(p)}</p>
                            ))}
                        </div>
                        <Image
                            width={160}
                            height={93}
                            src={item.image}
                            alt={item.title}
                            className="w-full sm:h-[348px] h-[168px] object-cover object-center"
                        />
                        <div className="flex flex-col gap-3">
                            <h2 className="text-gradation-100">{item.price}</h2>
                            {item.priceNote && (
                                <p className="text-m text-gradation-300">{formatText(item.priceNote)}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <Accordion.Root
            type="single"
            defaultValue="item-1"
            collapsible
            className="xl:col-start-3 xl:col-span-8 col-span-full flex flex-col gap-6"
        >
            {services.map((item) => (
                <Accordion.Item
                    key={item.id}
                    value={item.id}
                    className="relative group"
                >
                    <Image
                        width={160}
                        height={93}
                        src={item.image}
                        alt={item.title}
                        className="
        absolute right-0 top-0
        2xl:translate-x-[calc(100%+40px)] xl:translate-x-[calc(100%+20px)]
        2xl:w-40 2xl:h-[93px] xl:w-35 xl:h-20

        opacity-0 invisible
        translate-y-3 scale-[0.96]
        transition-all duration-400 ease-out

        group-data-[state=open]:opacity-100
        group-data-[state=open]:visible
        group-data-[state=open]:translate-y-0
        group-data-[state=open]:scale-100
    "
                    />
                    <div className="flex flex-col gap-6">
                        <div className="divider h-[1px] w-full bg-gradation-300" />
                        <Accordion.Trigger
                            className="flex justify-between text-gradation-100 text-left w-full cursor-pointer">
                            <h3>{item.title}</h3>
                            <h3 className="group-data-[state=open]:hidden shrink-0 ml-4">
                                {item.price}
                            </h3>
                        </Accordion.Trigger>
                    </div>
                    <Accordion.Content
                        className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up h-[404px]">
                        <div className="flex flex-col justify-between gap-6 pt-3 h-full">
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
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

export default ServicesAccordion;
