import { DOM_ELEMENTS, LOA } from "../../../config/constants";
import type { ILoaService } from "../../../domain/services/loa.service.interface";
import type { ItemHistory } from "../../../types/loa";

type SeriesType = {
  title: string;
  data: {
    name: string;
    type: string;
    data: (number | null)[];
  }[];
}

export class GraphLinePresenter {
  private service: ILoaService;

  constructor(loaService: ILoaService) {
    this.service = loaService;
  }

  initialize() {
    const data = this.service.getRevenueHistory();
    const series = this.generateSeriesOption(data);
    const cards = this.generateCardsElement(series);
    const element = document.querySelector(DOM_ELEMENTS.loaHistoryLine);

    if (element) {
      cards.forEach((card) => element.appendChild(card))
    }
  }

  private generateCardsElement(series: SeriesType[]): HTMLDivElement[] {
    return series.map((value) => {
      const el = document.createElement('psr-card');

      const slotTitle = document.createElement('slot')
      slotTitle.name = 'title';
      slotTitle.innerHTML = `${value.title}<br /><br />`;
      el.appendChild(slotTitle);

      const slotChartLine = document.createElement('chart-line');
      slotChartLine.series = value.data;
      slotChartLine.markLines = LOA.markLines;
      slotChartLine.xAxis = {
        type: 'category',
        data: [2022, 2023, 2024, 2025, 2026, 2027, 2028]
      }
      el.appendChild(slotChartLine);

      const wrapper = document.createElement('div')
      wrapper.classList.add('mt-8', 'first:mt-0')
      wrapper.appendChild(el)

      return wrapper;
    })
  }

  private generateSeriesOption(history: ItemHistory[]) {
    return history.map((value) => {
      return {
        title: value.nome,
        data: [
          {
            name: 'Executada',
            type: 'line',
            data: this.getBudgetExecuted(value)
          },
          {
            name: 'Fixada',
            type: 'line',
            data: this.getBudgetFixed(value)
          },
          {
            name: 'Previsão',
            type: 'line',
            data: this.getBudgetExpected(value)
          }
        ]
      }
    })
  }

  private getBudgetExecuted(history: ItemHistory) {
    return history.anos.map((value) => value.ano < (LOA.year) ? value.total : null);
  }

  private getBudgetFixed(history: ItemHistory) {
    return history.anos.map((value) => value.ano === (LOA.year - 1) || value.ano === (LOA.year) ? value.total : null);
  }

  private getBudgetExpected(history: ItemHistory) {
    return history.anos.map((value) => value.ano > (LOA.year - 1) ? value.total : null);
  }
}
