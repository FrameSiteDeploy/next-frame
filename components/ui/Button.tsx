// components/ui/Button/Button.tsx
import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
    base: [
        "inline-flex items-center justify-center gap-2",
        "rounded-full border-none cursor-pointer",
        "font-semibold font-[var(--font-manrope)] whitespace-nowrap",
        "transition-[background,color,border-color] duration-200 ease-in-out",
        "disabled:opacity-40 disabled:pointer-events-none",
    ],
    variants: {
        variant: {
            primary:   "bg-[#2F4C42] text-[#F4D8B9] [&_svg]:text-[#F4D8B9] hover:bg-[#263d35] active:bg-[#1e3029]",
            secondary: "bg-transparent text-[#2F4C42] border border-[#2F4C42] hover:bg-[#2F4C42]/10 active:bg-[#2F4C42]/20",
            ghost:     "bg-transparent text-[#2F4C42] px-0 hover:opacity-80 active:opacity-60",
        },
        size: {
            l: "px-7 py-3.5",
            m: "px-5 py-2.5",
            s: "px-3.5 py-1.5",
        },
        inverted: {
            true: "",
        },
        iconOnly: {
            true:  "p-0",
            false: "",
        },
    },
    compoundVariants: [
        // Primary + Inverted
        {
            variant:  "primary",
            inverted: true,
            class:    "bg-[#F4F5F5] text-[#2F4C42] [&_svg]:text-[#2F4C42] hover:bg-[#e8e9e9] active:bg-[#dcdcdc]",
        },
        // Secondary + Inverted
        {
            variant:  "secondary",
            inverted: true,
            class:    "text-[#F4F5F5] border-[#F4F5F5] hover:bg-white/10 active:bg-white/20",
        },
        // Ghost + Inverted
        {
            variant:  "ghost",
            inverted: true,
            class:    "text-[#F4F5F5] hover:opacity-80 active:opacity-60",
        },
        // Icon only sizes
        { iconOnly: true, size: "l", class: "w-[52px] h-[52px]" },
        { iconOnly: true, size: "m", class: "w-[40px] h-[40px]" },
        { iconOnly: true, size: "s", class: "w-[28px] h-[28px]" },
    ],
    defaultVariants: {
        variant:  "primary",
        size:     "l",
        inverted: false,
        iconOnly: false,
    },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof button> & {
    startIcon?: ReactNode;
    endIcon?:   ReactNode;
};

const Button: FC<ButtonProps> = ({
                                     children,
                                     variant,
                                     size,
                                     inverted,
                                     iconOnly,
                                     startIcon,
                                     endIcon,
                                     className,
                                     ...props
                                 }) => {
    return (
        <button
            className={button({ variant, size, inverted, iconOnly, className })}
            {...props}
        >
            {startIcon && <span className="inline-flex items-center shrink-0">{startIcon}</span>}
            {!iconOnly && children}
            {endIcon && <span className="inline-flex items-center shrink-0">{endIcon}</span>}
        </button>
    );
};

export default Button;
