'strict mode';

import { html, LitElement, unsafeCSS } from "lit";
import * as echarts from "echarts";
import { customElement, property, query } from "lit/decorators.js";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { BAR_CHART_LABEL_FORMATTER, DEFAULT_CHART_CONFIG, DEFAULT_TOOLTIP_CONFIG, Y_AXIS_LABEL_CONFIG } from "../../config/chart-config";
import { Formatter } from "../../utils/formatters";
import tailwindStyles from '../../index.css?inline'
import type { ChartData, IChartAdapter } from "./chart.interface";

@customElement('chart-bar')
export class ChartBar extends LitElement implements IChartAdapter {
    private chart?: echarts.ECharts;

    @property()
    /* @ts-ignore */
    data: ChartData;

    @query('#chart')
    /* @ts-ignore */
    _chart: HTMLDivElement;

    static styles = [
        unsafeCSS(tailwindStyles),
    ]

    render() {
        return html`<div id="chart" class="w-full h-80"></div>`;
    }

    firstUpdated() {
        if (!this.data) return;
        this.chart = echarts.init(this._chart);
        this.chart.setOption(this.buildOption(this.data));
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.dispose()
    }

    dispose(): void {
        if (this.chart) {
            this.chart.dispose();
            this.chart = undefined;
        }
    }

    protected buildOption(data: ChartData): ECBasicOption {
        return {
            ...DEFAULT_CHART_CONFIG,
            tooltip: {
                ...DEFAULT_TOOLTIP_CONFIG,
                formatter: (params: any) => {
                    return `${params[0].name}: ${Formatter.currency(params[0].value)}`;
                },
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: BAR_CHART_LABEL_FORMATTER,
                },
            },
            yAxis: {
                type: 'category',
                data: data.labels,
                axisLabel: Y_AXIS_LABEL_CONFIG,
            },
            series: [
                {
                    name: 'Valor',
                    type: 'bar',
                    data: data.values,
                    itemStyle: { color: '#3b82f6' },
                },
            ],
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'chart-bar': ChartBar
    }
}