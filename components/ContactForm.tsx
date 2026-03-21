'use client';

import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
    defaultCountries,
    FlagImage,
    parseCountry,
    usePhoneInput,
    ParsedCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import Button from '@/components/ui/Button';

// ─── Россия перед Казахстаном при +7 ────────────────────────────────────────

const prioritizedCountries = [
    ...defaultCountries.filter((c) => parseCountry(c).iso2 === 'ru'),
    ...defaultCountries.filter((c) => parseCountry(c).iso2 !== 'ru'),
];

// ─── Типы ─────────────────────────────────────────────────────────────────────

interface FormErrors {
    name?: string;
    phone?: string;
    email?: string;
}

// ─── Классы инпута ────────────────────────────────────────────────────────────

const inputClass = (hasError: boolean) =>
    `bg-white/[0.06] text-gradation-200 placeholder:text-gradation-500 text-m h-12 rounded-full px-6 outline-none border transition-colors w-full ${
        hasError
            ? 'border-red-500/60'
            : 'border-transparent focus:border-gradation-500'
    }`;

// ─── Кастомный дропдаун ───────────────────────────────────────────────────────

const CountryDropdown = ({
                             selectedCountry,
                             onSelect,
                         }: {
    selectedCountry: string;
    onSelect: (country: ParsedCountry) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Закрытие по клику вне
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Ref-callback — перехватывает скролл колесом, не пропускает на страницу
    const listRefCallback = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            node.scrollTop += e.deltaY;
        };

        node.addEventListener('wheel', onWheel, {passive: false});
        return () => node.removeEventListener('wheel', onWheel);
    }, []);

    return (
        <div ref={dropdownRef} className="relative shrink-0">
            {/* Кнопка */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-gradation-200 hover:text-gradation-100 transition-colors py-1"
            >
                <FlagImage iso2={parsed.iso2} size="20px"/>
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

            {/* Дропдаун */}
            {open && (
                <div
                    className="absolute left-0 top-full mt-2 z-50 w-64 rounded-2xl border border-white/[0.08] bg-[#1C1F1F] shadow-xl flex flex-col overflow-hidden">
                    {/* Поиск */}
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

                    {/* Список */}
                    <div
                        ref={listRefCallback}
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
                                    <FlagImage iso2={c.iso2} size="18px"/>
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

// ─── Инпут телефона ───────────────────────────────────────────────────────────

const PhoneInputField = ({
                             value,
                             onChange,
                             hasError,
                         }: {
    value: string;
    onChange: (phone: string) => void;
    hasError: boolean;
}) => {
    const {phone, handlePhoneValueChange, inputRef, country, setCountry} =
        usePhoneInput({
            defaultCountry: 'ru',
            countries: prioritizedCountries, // ru идёт первым → при +7 выбирается Россия
            value,
            onChange: (data) => onChange(data.phone),
        });

    return (
        <div
            className={`flex items-center bg-white/[0.06] h-12 rounded-full border transition-colors px-4 gap-2 ${
                hasError
                    ? 'border-red-500/60'
                    : 'border-transparent focus-within:border-gradation-500'
            }`}
        >
            <CountryDropdown
                selectedCountry={country.iso2}
                onSelect={(c: ParsedCountry) => setCountry(c.iso2)}
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

// ─── Валидация ─────────────────────────────────────────────────────────────────

const validate = (name: string, phone: string, email: string): FormErrors => {
    const errors: FormErrors = {};
    if (!name.trim()) errors.name = 'Укажите имя';
    if (!phone || phone.replace(/\D/g, '').length < 10)
        errors.phone = 'Введите корректный номер телефона';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = 'Введите корректный адрес почты';
    return errors;
};

// ─── Форма ─────────────────────────────────────────────────────────────────────

const ContactForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

    const handleSubmit = async () => {
        const validationErrors = validate(name, phone, email);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setStatus('loading');

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, phone, email}),
            });
            setStatus(res.ok ? 'done' : 'error');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="col-start-8 col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <p className="text-m text-gradation-200">~60 минут на обработку заявки</p>
                    <h2 className="text-gradation-100">Обратная связь</h2>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <input
                            className={inputClass(!!errors.name)}
                            placeholder="Как к Вам обращаться?"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors((p) => ({...p, name: undefined}));
                            }}
                        />
                        {errors.name && <p className="text-m text-red-400 px-4">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <PhoneInputField
                            value={phone}
                            onChange={(v) => {
                                setPhone(v);
                                if (errors.phone) setErrors((p) => ({...p, phone: undefined}));
                            }}
                            hasError={!!errors.phone}
                        />
                        {errors.phone && <p className="text-m text-red-400 px-4">{errors.phone}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <input
                            className={inputClass(!!errors.email)}
                            type="email"
                            placeholder="Электронная почта"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors((p) => ({...p, email: undefined}));
                            }}
                        />
                        {errors.email && <p className="text-m text-red-400 px-4">{errors.email}</p>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Button
                    inverted
                    className="self-start"
                    onClick={handleSubmit}
                    disabled={status === 'loading' || status === 'done'}
                >
                    {status === 'loading'
                        ? 'Отправка...'
                        : status === 'done'
                            ? 'Заявка отправлена'
                            : 'Отправить заявку'}
                </Button>
                {status === 'error' && (
                    <p className="text-m text-red-400">Не удалось отправить заявку. Попробуйте ещё раз.</p>
                )}
                <p className="text-m text-gradation-300">
                    Нажимая на кнопку "Отправить заявку", Вы соглашаетесь на обработку персональных данных
                </p>
            </div>
        </div>
    );
};

export default ContactForm;
