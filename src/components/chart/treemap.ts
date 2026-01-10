import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import * as echarts from 'echarts';
import tailwindStyles from "../../index.css?inline";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { Formatter } from "../../utils/formatters";
import type { TreeSeriesNodeItemOption } from "echarts/types/src/chart/tree/TreeSeries.js";
import { DEFAULT_CHART_CONFIG } from "../../config/chart-config";

@customElement('chart-treemap')
class ChartTreemap extends LitElement {
  private chart?: echarts.ECharts;

  @property()
  data: TreeSeriesNodeItemOption[] = [];

  @query("#chart")
  _chart: HTMLDivElement | undefined;

  static styles = [
    unsafeCSS(tailwindStyles)
  ];

  protected render() {
    return html`<div id="chart" class="w-full h-175"></div>`;
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
    this.dispose();
  }

  dispose(): void {
    if (this.chart) {
      this.chart.dispose();
      this.chart = undefined;
    }
  }

  protected buildOption(data: TreeSeriesNodeItemOption[]): ECBasicOption {
    return {
      ...DEFAULT_CHART_CONFIG,
      tooltip: {
        show: true,
        formatter: ({ name, value }: { name: string, value: number }) => `<b>${Formatter.ucWords(name)}:</b> ${Formatter.currency(value)}`
      },
      series: {
        type: 'treemap',
        leafDepth: 1,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        roam: false,
        data,
      },
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chart-treemap': ChartTreemap
  }
}
