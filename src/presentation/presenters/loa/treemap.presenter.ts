import { DOM_ELEMENTS } from "../../../config/constants";
import type { ILoaService } from "../../../domain/services/loa.service.interface";
import type { Agency } from "../../../types/loa";
import { Formatter } from "../../../utils/formatters";

export class TreemapPresenter {
  private service: ILoaService;

  constructor(loaService: ILoaService) {
    this.service = loaService;
  }

  public render() {
    const el = document.createElement('chart-treemap');
    el.data = this.mapToDataTable(this.service.getExpensesByAgency());

    document.querySelector(DOM_ELEMENTS.loaExpensesByAgencyTreemap)?.appendChild(el);
  }

  private mapToDataTable(data: Agency[]) {
    return data.map((value) => ({
      name: `${Formatter.ucWords(value.orgao)} (${value.sigla})`,
      value: value.total,
      children: value.despesas.map((val) => ({
        name: Formatter.ucWords(val.programa),
        value: val.total
      }))
    }))
  }
}
