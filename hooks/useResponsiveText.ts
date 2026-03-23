import {useBreakpoint} from "@/hooks/useBreakpoint";
import {
    Breakpoint,
    ResponsiveTextConfig,
    createResponsiveText,
} from "@/utils/responsiveText";

export const useResponsiveText = (config: ResponsiveTextConfig) => {
    const {breakpoint} = useBreakpoint("2xl"); // как у тебя в других местах

    const filled = createResponsiveText(config);

    return filled[breakpoint as Breakpoint];
};
