import DataTable from "datatables.net-dt";
import type { ILoaService } from "../../../domain/services/loa.service.interface";
import type { BudgetItem, GovernmentalSector } from "../../../types/loa";
import { DOM_ELEMENTS } from "../../../config/constants";

type DataType = { type: string, total: number }[];

export class TablePresenter {
  private service: ILoaService;

  constructor(loaService: ILoaService) {
    this.service = loaService;
  }

  /**
   * Inicializa e renderiza tabela de emendas
   */
  initialize(): void {
    this.initializeExpensesByFunction();
    this.initializeRevenues();
  }

  public async initializeExpensesByFunction() {
    const expenses = this.service.getExpensesGroupedFunction();
    const data = this.mapExpensesByFunctionToDataTable(expenses);

    this.buildDataTable(DOM_ELEMENTS.loaExpensesByFunctionTable, data);
  }

  public async initializeRevenues() {
    const revenues = Object.values(this.service.getRevenues()).flat();
    const data = this.mapRevenuesToDataTable(revenues)

    this.buildDataTable(DOM_ELEMENTS.loaRevenuesTable, data)
  }

  private buildDataTable(elementQuery: string, data: any) {
    new DataTable(elementQuery, {
      columns: [
        { data: 'type', title: 'Descrição' },
        { data: 'total', title: 'Valor' },
      ],
      columnDefs: [
        { targets: 1, render: DataTable.render.number('.', ',', 2, 'R$ ') }
      ],
      pageLength: data.length,
      paging: false,
      searching: false,
      data,
    })
  }

  private mapExpensesByFunctionToDataTable(data: GovernmentalSector[]): DataType {
    return data.map((value) => ({
      type: value.funcao,
      total: value.total
    }));
  }

  private mapRevenuesToDataTable(data: BudgetItem[]): DataType {
    return data.map((value) => ({
      type: value.receita,
      total: value.total
    }))
  }
}
