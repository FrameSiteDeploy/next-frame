import React from "react";
import {getLenis} from "@/lib/lenisInstance";

export const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const lenis = getLenis();

    if (lenis) {
        lenis.scrollTo(target, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 2),
        });
    } else {
        target.scrollIntoView({behavior: "smooth"});
    }
};
