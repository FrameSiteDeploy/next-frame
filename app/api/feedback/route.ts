// app/api/feedback/route.ts
import {NextRequest, NextResponse} from "next/server";
import {
    buildFeedbackTelegramMessage,
    getFeedbackErrorMessage,
    normalizeFeedbackFields,
    type FeedbackFields,
    validateFeedbackFields,
} from "@/lib/feedbackValidation";

// ─── Простой rate-limit в памяти (per IP) ────────────────────────────────────
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 3;       // заявок
const RATE_WINDOW = 60_000; // за 60 секунд

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateMap.get(ip);

    if (!entry || now - entry.ts > RATE_WINDOW) {
        rateMap.set(ip, {count: 1, ts: now});
        return false;
    }
    if (entry.count >= RATE_LIMIT) return true;

    entry.count++;
    return false;
}

// ─── Telegram уведомление ──────────────────────────────────────────────────────
async function sendToTelegram(fields: FeedbackFields) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) return;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: chatId,
            text: buildFeedbackTelegramMessage(fields),
            parse_mode: "HTML",
        }),
    });
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    // Rate limit
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            {error: "Слишком много запросов. Попробуйте позже."},
            {status: 429}
        );
    }

    // Парсинг тела
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({error: "Неверный формат данных"}, {status: 400});
    }

    // Валидация
    const fields: FeedbackFields = {
        name: typeof body.name === "string" ? body.name : "",
        phone: typeof body.phone === "string" ? body.phone : "",
        email: typeof body.email === "string" ? body.email : "",
    };

    const validationError = getFeedbackErrorMessage(
        validateFeedbackFields(fields)
    );
    if (validationError) {
        return NextResponse.json({error: validationError}, {status: 422});
    }

    const normalizedFields = normalizeFeedbackFields(fields);

    // Отправка уведомления
    try {
        await sendToTelegram(normalizedFields);
    } catch (err) {
        console.error("Telegram send error:", err);
        // Не возвращаем ошибку клиенту — логируем и продолжаем
    }

    return NextResponse.json({ok: true}, {status: 200});
}
