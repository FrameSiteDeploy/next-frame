import React from "react";
import {Pattern} from "@/assets/icons";
import {formatText} from "@/utils/formatText";

interface GreenBannerProps {
    stat: string;
    description: string;
}

const GreenBanner = ({stat, description}: GreenBannerProps) => {
    return (
        <div className="bg-royal-green-800 2xl:h-[332px] xl:h-[236px] overflow-hidden">
            <div className="py-6 md:py-12 2xl:py-24 container grid-responsive">
                <div className="flex flex-col xl:col-start-3 xl:col-span-5 md:col-span-6 col-span-4 gap-4">
                    <h1 className="text-gradation-100">{formatText(stat)}</h1>
                    <p className="text-l text-gradation-100">{formatText(description)}</p>
                </div>
                <div className="col relative sm:block hidden">
                    <Pattern className="absolute top-1/2 -translate-y-1/2"/>
                </div>
            </div>
        </div>
    );
};

export default GreenBanner;
