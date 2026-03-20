export interface ProjectStep {
    id: number;
    duration?: string;
    title: string;
    description: string;
    image: string;
}

export const projectsSteps: ProjectStep[] = [
    {
        id: 1,
        duration: "До 7 дней",
        title: "Дом «Лайнер», Московская область, Глебово",
        description: " 200 м²",
        image: "/projectstep1.png",
    },
    {
        id: 2,
        title: "Проект в работе",
        description: " Скоро проект появится на сайте",
        image: "/projectempty.png",
    },
];
