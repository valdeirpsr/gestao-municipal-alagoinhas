/**
 * Interface para abstração de gráficos
 * Permite trocar de ECharts para qualquer outra lib
 */

export interface ChartData {
    labels: string[];
    values: number[];
}

export interface IChartAdapter {
    /**
     * Renderiza gráfico
     */
    render(data: ChartData, elementId: string): void;

    /**
     * Limpa e desaloca recursos
     */
    dispose(): void;
}
