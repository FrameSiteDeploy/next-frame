import React, {FC} from 'react';
import {cn} from "tailwind-variants";
import {formatText} from "@/utils/formatText";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    subtitle: string;
    title: string;
    inverted?: boolean;
}

const Section: FC<SectionProps> = ({children, title, subtitle, inverted, ...props}) => {
    return (
        <section
            {...props}
            className={cn(
                props.className,
                "py-24 min-h-[996px] h-[100vh]",
                {
                    "bg-gradation-800": inverted
                }
            )}
        >
            <div className="container flex flex-col gap-12 h-full">
                <div className={cn(
                    "grid-responsive"
                )}>
                    <p className={cn(
                        "col-span-2 text-l",
                        {
                            "text-gradation-300": inverted,
                            "text-gradation-600": !inverted,
                        }

                    )}>
                        {formatText(subtitle)}
                    </p>
                    <div className="col-span-10 flex flex-col gap-12">
                        <h2 className={cn({
                            "text-gradation-100": inverted,
                            "text-gradation-800": !inverted
                        })}>{formatText(title)}</h2>
                    </div>
                </div>
                {children}
            </div>

        </section>
    );
};

export default Section;
