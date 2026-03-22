import React from "react";
import {Pattern} from "@/assets/icons";
import {formatText} from "@/utils/formatText";

interface GreenBannerProps {
    stat: string;
    description: string;
}

const GreenBanner = ({stat, description}: GreenBannerProps) => {
    return (
        <div className="bg-royal-green-800">
            <div className="container grid-responsive items-center">
                <div className="flex flex-col col-start-3 col-span-5 gap-4">
                    <h1 className="text-gradation-100">{formatText(stat)}</h1>
                    <p className="text-l text-gradation-100">{formatText(description)}</p>
                </div>
                <Pattern/>
            </div>
        </div>
    );
};

export default GreenBanner;
