"use client";

import React, {FC, HtmlHTMLAttributes} from "react";
import {cn} from "tailwind-variants";
import Image from "next/image";
import {ReviewData} from "@/data/reviews";

export type ReviewProps = HtmlHTMLAttributes<HTMLDivElement> & {
    data: ReviewData;
    selected?: boolean;
};

const Review: FC<ReviewProps> = ({data, selected = false, ...props}) => {
    return (
        <div
            {...props}
            className={cn(
                "p-10 flex gap-10 shadow-[0_12px_24px_0_#0000000D,0_24px_48px_0_#0000000D,0_48px_96px_0_#0000000D] w-210 relative z-0",
                selected ? "bg-white" : "bg-gradation-100",
                props.className
            )}
        >
            <div className="flex flex-col gap-4 basis-40 shrink-0">
                <Image width={160} height={160} src={data.image} alt={data.name}/>
                <div className="flex flex-col gap-[6px]">
                    <p className="text-l font-medium text-gradation-800">{data.name}</p>
                    <p className="text-m text-gradation-600">{data.location}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-l text-gradation-600">
                {data.paragraphs.map((text, i) => (
                    <p key={i}>{text}</p>
                ))}
            </div>
        </div>
    );
}

Review.displayName = "Review";
export default Review;
