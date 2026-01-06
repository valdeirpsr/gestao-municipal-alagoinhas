/**
 * Configurações de gráficos
 */

import type { ECBasicOption } from 'echarts/types/dist/shared';

export const DEFAULT_CHART_CONFIG: Partial<ECBasicOption> = {
    title: {
        show: false,
    },
    grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        containLabel: true,
    },
};

export const DEFAULT_TOOLTIP_CONFIG = {
    trigger: 'axis' as const,
    axisPointer: { type: 'shadow' as const },
};

export const BAR_CHART_LABEL_FORMATTER = (value: number) => {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`;
    return value.toString();
};

export const Y_AXIS_LABEL_CONFIG = {
    width: 130,
    overflow: 'break' as const,
};