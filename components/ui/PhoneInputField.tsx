'use client';

import React from 'react';
import {
    CountrySelector,
    usePhoneInput,
    ParsedCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';

const PhoneInputField = ({
                             value,
                             onChange,
                         }: {
    value: string;
    onChange: (phone: string) => void;
}) => {
    const {phone, handlePhoneValueChange, inputRef, country, setCountry} =
        usePhoneInput({
            defaultCountry: 'ru',
            value,
            onChange: (data) => onChange(data.phone),
        });

    return (
        <div
            className="flex items-center bg-white/[0.06] h-12 rounded-full border border-transparent focus-within:border-gradation-500 transition-colors px-4 gap-2">
            <CountrySelector
                selectedCountry={country.iso2}
                onSelect={(c: ParsedCountry) => setCountry(c.iso2)}
                renderButtonWrapper={({children, rootProps}) => (
                    <button
                        {...rootProps}
                        className="flex items-center gap-1 shrink-0 bg-transparent border-none cursor-pointer text-gradation-200 hover:text-gradation-100 transition-colors"
                    >
                        {children}
                    </button>
                )}
                dropdownStyleProps={{
                    style: {
                        background: '#1C1F1F',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        color: '#B5BABA',
                        padding: '4px',
                    },
                }}
            />
            <div className="h-5 w-px bg-gradation-600 shrink-0"/>
            <input
                ref={inputRef}
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={handlePhoneValueChange}
                placeholder="(000) 000-00-00"
                className="bg-transparent text-gradation-200 placeholder:text-gradation-500 text-m outline-none w-full"
            />
        </div>
    );
};

export default PhoneInputField;