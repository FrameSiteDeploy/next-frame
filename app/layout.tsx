import type {Metadata} from "next";
import {Montserrat, Manrope} from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/layout/Header";
import React from "react";
import LenisProvider from "@/components/providers/LenisProvider";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin", "cyrillic"],
    variable: "--font-manrope",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Frame",
    description: "Powered by atriune",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${montserrat.variable} ${manrope.variable}`}>
        <div className="wrapper flex flex-col min-h-[100v] overflow-x-hidden">
            <Header/>
            <LenisProvider>
                {children}
            </LenisProvider>
            {/*    TODO: footer*/}
        </div>
        </body>
        </html>
    );
}
