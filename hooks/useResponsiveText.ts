import {useBreakpoint} from "@/hooks/useBreakpoint";
import {
    Breakpoint,
    ResponsiveTextConfig,
    createResponsiveText,
} from "@/utils/responsiveText";

export const useResponsiveText = (config: ResponsiveTextConfig) => {
    const {breakpoint} = useBreakpoint();

    const filled = createResponsiveText(config);

    return filled[breakpoint as Breakpoint];
};
