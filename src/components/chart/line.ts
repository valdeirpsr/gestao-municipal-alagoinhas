import { html, LitElement, unsafeCSS } from "lit";
import * as echarts from 'echarts';
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../index.css?inline";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { DEFAULT_CHART_CONFIG } from "../../config/chart-config";
import type { MarkLine1DDataItemOption } from "echarts/types/src/component/marker/MarkLineModel.js";

type AxisType = {
  type?: 'value' | 'category' | 'time' | 'log'
  data?: string[] | number[]
}

type SerieType = {
  name?: string;
  data: any;
  [_: string]: any;
}

@customElement('chart-line')
export class ChartLine extends LitElement {
  private chart?: echarts.ECharts;

  @property()
  data: number[] = [];

  @property()
  series: SerieType[]|undefined = undefined;

  @property()
  xAxis: AxisType = {
    type: 'value'
  }

  @property()
  yAxis: AxisType = {
    type: 'value'
  };

  @property()
  markLines: MarkLine1DDataItemOption[] = []

  @query("#chart")
  _chart: HTMLDivElement | undefined;

  static styles = [
    unsafeCSS(tailwindStyles)
  ];

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
    this.chart.setOption(this.buildOption());
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

  private buildOption(): ECBasicOption {
    let series = this.generateSeriesOption();
    series = this.generateMarkLines(series);

    return {
      ...DEFAULT_CHART_CONFIG,
      tooltip: {
        show: true,
      },
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      series,
    }
  }

  private generateSeriesOption() {
    if (!this.series) return this.generateSeriesDataOption() as SerieType[];

    return this.series;
  }

  private generateSeriesDataOption() {
    return [
      {
        type: 'line',
        smooth: true,
        data: this.data,
      }
    ]
  }

  private generateMarkLines(series: SerieType[]): SerieType[] {
    if (this.markLines.length === 0) return series;

    return series.map((value) => ({
      ...value,
      markLine: {
        silent: true,
        label: {
          show: true,
          position: 'middle',
        },
        lineStyle: {
          color: '#333'
        },
        data: this.markLines
      }
    }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chart-line': ChartLine
  }
}
