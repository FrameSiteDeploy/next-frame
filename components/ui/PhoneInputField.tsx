'use client';

import React, {useMemo} from 'react';
import {
    defaultCountries,
    FlagImage,
    parseCountry,
    ParsedCountry,
} from 'react-international-phone';

const prioritizedCountries = [
    ...defaultCountries.filter((c) => parseCountry(c).iso2 === 'ru'),
    ...defaultCountries.filter((c) => parseCountry(c).iso2 !== 'ru'),
];

const onlyDigits = (value: string) => value.replace(/\D/g, '');

const formatNationalNumber = (digits: string) => {
    // Базовая маска под RU/KZ-стиль ввода: (999) 999-99-99
    const v = digits.slice(0, 10);

    const p1 = v.slice(0, 3);
    const p2 = v.slice(3, 6);
    const p3 = v.slice(6, 8);
    const p4 = v.slice(8, 10);

    if (!v) return '';
    if (v.length <= 3) return `(${p1}`;
    if (v.length <= 6) return `(${p1}) ${p2}`;
    if (v.length <= 8) return `(${p1}) ${p2}-${p3}`;
    return `(${p1}) ${p2}-${p3}-${p4}`;
};

const CountryDropdown = ({
    selectedCountry,
    onSelect,
}: {
    selectedCountry: string;
    onSelect: (country: ParsedCountry) => void;
}) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const parsed = parseCountry(
        defaultCountries.find((c) => parseCountry(c).iso2 === selectedCountry) ??
        defaultCountries[0]
    );

    const filtered = prioritizedCountries
        .map(parseCountry)
        .filter(
            (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.dialCode.includes(search.replace('+', ''))
        );

    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={dropdownRef} className="relative shrink-0">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-gradation-200 hover:text-gradation-100 transition-colors py-1"
            >
                <FlagImage iso2={parsed.iso2} size="20px" />
                <span className="text-m text-[#F4F5F5]">+{parsed.dialCode}</span>
                <svg
                    className={`w-3 h-3 text-gradation-400 transition-transform ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute left-0 top-full mt-2 z-50 w-64 rounded-2xl border border-white/[0.08] bg-[#1C1F1F] shadow-xl flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-white/[0.06]">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Поиск страны..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.06] text-gradation-200 placeholder:text-gradation-500 text-m rounded-full px-4 h-8 outline-none border border-transparent focus:border-gradation-600 transition-colors"
                        />
                    </div>

                    <div
                        className="overflow-y-auto max-h-56"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
                        }}
                    >
                        {filtered.length === 0 ? (
                            <p className="text-m text-gradation-400 px-4 py-3">Не найдено</p>
                        ) : (
                            filtered.map((c) => (
                                <button
                                    key={c.iso2}
                                    type="button"
                                    onClick={() => {
                                        onSelect(c);
                                        setOpen(false);
                                        setSearch('');
                                    }}
                                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-white/[0.06] transition-colors ${
                                        c.iso2 === selectedCountry ? 'bg-white/[0.04]' : ''
                                    }`}
                                >
                                    <FlagImage iso2={c.iso2} size="18px" />
                                    <span className="text-m text-gradation-200 flex-1 truncate">{c.name}</span>
                                    <span className="text-m text-[#F4F5F5]">+{c.dialCode}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

interface PhoneInputFieldProps {
    value: string; // полное значение, например +79991234567
    onChange: (phone: string) => void; // наружу тоже отдаём полное значение
    hasError: boolean;
}

const PhoneInputField = ({value, onChange, hasError}: PhoneInputFieldProps) => {
    const initialCountry = useMemo(() => {
        if (value.startsWith('+7')) return 'ru';
        return 'ru';
    }, [value]);

    const [selectedCountry, setSelectedCountry] = React.useState(initialCountry);

    const parsedCountry = useMemo(() => {
        return parseCountry(
            prioritizedCountries.find((c) => parseCountry(c).iso2 === selectedCountry) ??
            prioritizedCountries[0]
        );
    }, [selectedCountry]);

    const nationalDigits = useMemo(() => {
        const digits = onlyDigits(value);

        if (!digits) return '';

        if (digits.startsWith(parsedCountry.dialCode)) {
            return digits.slice(parsedCountry.dialCode.length);
        }

        return digits;
    }, [value, parsedCountry.dialCode]);

    const displayValue = formatNationalNumber(nationalDigits);

    const handleCountrySelect = (country: ParsedCountry) => {
        setSelectedCountry(country.iso2);

        const currentDigits = onlyDigits(value);
        const prevDial = parsedCountry.dialCode;

        let localPart = currentDigits;
        if (currentDigits.startsWith(prevDial)) {
            localPart = currentDigits.slice(prevDial.length);
        }

        onChange(`+${country.dialCode}${localPart}`);
    };

    const handleInputChange = (nextValue: string) => {
        const localDigits = onlyDigits(nextValue).slice(0, 10);
        onChange(`+${parsedCountry.dialCode}${localDigits}`);
    };

    return (
        <div
            className={`flex items-center bg-white/[0.06] h-12 rounded-full border transition-colors px-4 gap-2 ${
                hasError
                    ? 'border-red-500/60'
                    : 'border-transparent focus-within:border-gradation-500'
            }`}
        >
            <CountryDropdown
                selectedCountry={selectedCountry}
                onSelect={handleCountrySelect}
            />
            <div className="h-5 w-px bg-gradation-600 shrink-0" />
            <input
                type="tel"
                inputMode="tel"
                value={displayValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="(000) 000-00-00"
                className="bg-transparent text-gradation-200 placeholder:text-gradation-500 text-m outline-none w-full"
            />
        </div>
    );
};

export default PhoneInputField;