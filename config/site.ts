export const siteName = "Frame";

export const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
).replace(/\/$/, "");

export const siteTitle = "Frame — монолитные дома под ключ в Москве и Московской области";

export const siteDescription =
    "Строим загородные монолитные дома под ключ в Москве и Московской области: проектирование, инженерные системы, отделка и благоустройство. 15 лет опыта, гарантия 10 лет.";

export const siteKeywords = [
    "строительство домов",
    "монолитные дома",
    "дом под ключ",
    "загородный дом",
    "проектирование домов",
    "строительство домов Москва",
    "строительство домов Московская область",
    "Frame",
];

export const siteOgImage = {
    url: "/hero.png",
    width: 1400,
    height: 810,
    alt: "Загородный монолитный дом Frame",
};
