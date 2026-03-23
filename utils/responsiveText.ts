// src/utils/responsiveText.ts

export type Breakpoint = "xs" | "sm" | "md" | "xl" | "2xl";

export type ResponsiveTextConfig = Partial<Record<Breakpoint, string>>;

/**
 * Заполняет пропуски: для каждого брейка берёт ближайший доступный текст
 * сверху или снизу.
 */
export const createResponsiveText = (config: ResponsiveTextConfig) => {
    const order: Breakpoint[] = ["xs", "sm", "md", "xl", "2xl"];

    const filled: Partial<Record<Breakpoint, string>> = {};

    // снизу вверх
    let last: string | undefined;
    for (const bp of order) {
        if (config[bp] != null) {
            last = config[bp]!;
        }
        if (last != null) {
            filled[bp] = last;
        }
    }

    // сверху вниз
    let next: string | undefined;
    for (let i = order.length - 1; i >= 0; i--) {
        const bp = order[i];
        if (config[bp] != null) {
            next = config[bp]!;
        }
        if (filled[bp] == null && next != null) {
            filled[bp] = next;
        }
    }

    return filled as Record<Breakpoint, string>;
};
