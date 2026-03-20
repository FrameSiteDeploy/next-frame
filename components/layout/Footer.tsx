import React from 'react';
import {LogoWithText} from "@/assets/icons";

const Footer = () => {
    return (
        <footer className="bg-gradation-800 py-12">
            <div className="container grid grid-cols-12 gap-10 min-h-[100vh] h-[100vh]">
                <div className="flex flex-col col-span-full gap-12">
                    <div className="py-4">
                        <div className="h-[266px] overflow-hidden flex items-center">
                            <LogoWithText className="w-full fill-gradation-100"/>
                        </div>
                    </div>
                    <div className="divider h-[1px] bg-gradation-600"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
