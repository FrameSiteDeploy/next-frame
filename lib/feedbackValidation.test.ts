import {describe, expect, it} from "vitest";
import {
    buildFeedbackTelegramMessage,
    getFeedbackErrorMessage,
    validateFeedbackFields,
} from "./feedbackValidation";

describe("validateFeedbackFields", () => {
    it("rejects phone numbers shorter than 11 digits", () => {
        const errors = validateFeedbackFields({
            name: "Иван",
            phone: "+7 999 123 45 6",
            email: "ivan@example.com",
        });

        expect(errors.phone).toBe("Введите корректный номер телефона");
    });

    it("accepts valid feedback fields", () => {
        const errors = validateFeedbackFields({
            name: "Иван",
            phone: "+7 999 123 45 67",
            email: "ivan@example.com",
        });

        expect(errors).toEqual({});
    });
});

describe("getFeedbackErrorMessage", () => {
    it("returns the first error in stable field order", () => {
        const message = getFeedbackErrorMessage({
            phone: "Введите корректный номер телефона",
            email: "Введите корректный адрес почты",
        });

        expect(message).toBe("Введите корректный номер телефона");
    });
});

describe("buildFeedbackTelegramMessage", () => {
    it("escapes user supplied values for Telegram HTML mode", () => {
        const message = buildFeedbackTelegramMessage(
            {
                name: "Иван <Admin>",
                phone: "+7 999 123 45 67",
                email: "ivan&team@example.com",
            },
            new Date("2026-04-30T18:00:00.000Z")
        );

        expect(message).toContain("<b>Имя:</b> Иван &lt;Admin&gt;");
        expect(message).toContain("<b>Почта:</b> ivan&amp;team@example.com");
    });
});
