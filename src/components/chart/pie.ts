'strict mode';

import { html, LitElement, unsafeCSS } from "lit";
import * as echarts from "echarts";
import { customElement, property, query } from "lit/decorators.js";
import type { IPieChartAdapter, PieChartData } from "../../adapters/chart.adapter.interface";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { DEFAULT_CHART_CONFIG, DEFAULT_PIE_COLORS, DEFAULT_PIE_TOOLTIP } from "../../config/chart-config";
import tailwindStyles from '../../index.css?inline'

@customElement('chart-pie')
export class ChartPie extends LitElement implements IPieChartAdapter {
    private chart?: echarts.ECharts;

    @property()
    /* @ts-ignore */
    data: PieChartData[];

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

    protected buildOption(data: PieChartData[]): ECBasicOption {
        return {
            ...DEFAULT_CHART_CONFIG,
            tooltip: DEFAULT_PIE_TOOLTIP,
            legend: {
                orient: 'vertical',
                top: 'middle',
                left: 0
            },
            series: [
                {
                    name: 'Dados',
                    type: 'pie',
                    radius: ['40%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 14,
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: true,
                    },
                    data,
                    color: DEFAULT_PIE_COLORS,
                    left: '20%'
                },
            ],
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'chart-pie': ChartPie
    }
}