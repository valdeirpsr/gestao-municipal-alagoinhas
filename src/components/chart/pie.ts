'strict mode';

import { html, LitElement, unsafeCSS } from "lit";
import * as echarts from "echarts";
import { customElement, property, query } from "lit/decorators.js";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { DEFAULT_CHART_CONFIG, DEFAULT_PIE_COLORS, DEFAULT_PIE_TOOLTIP } from "../../config/chart-config";
import tailwindStyles from '../../index.css?inline'
import { Formatter } from "../../utils/formatters";
import type { IPieChartAdapter, PieChartData } from "./chart.interface";

@customElement('chart-pie')
export class ChartPie extends LitElement implements IPieChartAdapter {
    private chart?: echarts.ECharts;

    @property()
    data: PieChartData[] = [];

    @property()
    type: 'default' | 'category' | 'currency' = 'default';

    @query('#chart')
    _chart: HTMLDivElement|undefined;

    static styles = [
        unsafeCSS(tailwindStyles),
    ]

    render() {
        return html`<div id="chart" class="w-full h-80"></div>`;
    }

    firstUpdated() {
        if (!this.data) return;

        if (!this._chart) {
          console.warn(`Element #chart not found`);
          return;
        }

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
        const options = {
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

        switch(this.type) {
            case 'category':
                return this.buildOptionForCategory(options);
            case 'currency':
                return this.buildOptionForCurrency(options);
            default:
                return options;
        }
    }

    /**
     * Configura Label e o Tooltip para o tipo "category" (categorias)
     */
    private buildOptionForCategory(option: ECBasicOption): ECBasicOption {
        (option.series as []).map((serie: {}) => ({
            ...serie,
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold',
                    formatter: '{b}: {c} ({d}%)',
                },
            }
        }));

        if (option.tooltip) {
            return Object.assign(option, {
                tooltip: {
                    ...option.tooltip,
                    formatter: '{b}: {c} ({d}%)'
                }
            });
        }

        return option;
    }

    /**
     * Configura Label para o tipo "currency" (dinheiro)
     */
    private buildOptionForCurrency(option: ECBasicOption): ECBasicOption {
        const fnFormatter = (context: any) => `${context.data.name}:\n${Formatter.currency(context.data.value)} (${context.percent}%)`;

        option.series = (option.series as []).map((serie: {}) => Object.assign({}, {
            ...serie,
            label: {
                show: true,
                formatter: fnFormatter,
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold',
                    formatter: fnFormatter,
                },
            }
        }));

        if (option.tooltip) {
            return Object.assign(option, {
                tooltip: {
                    ...option.tooltip,
                    formatter: fnFormatter,
                }
            });
        }

        return option;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'chart-pie': ChartPie
    }
}
