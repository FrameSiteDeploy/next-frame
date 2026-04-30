export interface FeedbackFields {
    name: string;
    phone: string;
    email: string;
}

export interface FeedbackErrors {
    name?: string;
    phone?: string;
    email?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 11;

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

export const normalizeFeedbackFields = ({
    name,
    phone,
    email,
}: FeedbackFields): FeedbackFields => ({
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
});

export const validateFeedbackFields = (fields: FeedbackFields): FeedbackErrors => {
    const errors: FeedbackErrors = {};
    const normalized = normalizeFeedbackFields(fields);

    if (!normalized.name) {
        errors.name = "Укажите имя";
    }

    if (onlyDigits(normalized.phone).length < MIN_PHONE_DIGITS) {
        errors.phone = "Введите корректный номер телефона";
    }

    if (!normalized.email || !EMAIL_PATTERN.test(normalized.email)) {
        errors.email = "Введите корректный адрес почты";
    }

    return errors;
};

export const getFeedbackErrorMessage = (errors: FeedbackErrors): string | null =>
    errors.name ?? errors.phone ?? errors.email ?? null;

export const buildFeedbackTelegramMessage = (
    fields: FeedbackFields,
    now: Date = new Date()
) => {
    const normalized = normalizeFeedbackFields(fields);

    return [
        "<b>Новая заявка</b>",
        "",
        `<b>Имя:</b> ${escapeHtml(normalized.name)}`,
        `<b>Телефон:</b> ${escapeHtml(normalized.phone)}`,
        `<b>Почта:</b> ${escapeHtml(normalized.email)}`,
        "",
        escapeHtml(now.toLocaleString("ru-RU", {timeZone: "Europe/Moscow"})),
    ].join("\n");
};
