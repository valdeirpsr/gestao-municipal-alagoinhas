import DataTable, { type Api } from "datatables.net-dt";
import 'datatables.net-rowgroup-dt'
import 'datatables.net-buttons-dt'
import { DOM_ELEMENTS } from "../../../config/constants";
import { Formatter } from "../../../utils/formatters";
import type { IParliamentaryAmendmentsRepository } from "../../../domain/repositories/parliamentary-amendments.repository.interface";
import type { ParliamentaryAmendment } from "../../../types/parliamentary-amendment";

export class TablePresenter {
  private repository: IParliamentaryAmendmentsRepository;

  private COLUMNS_DEF: Record<string, number> = {
    parliamentary: 0,
    description: 1,
    agency: 2,
    budgetType: 3,
    total: 4,
  }

  constructor(repository: IParliamentaryAmendmentsRepository) {
    this.repository = repository;
  }

  /**
   * Inicializa e renderiza tabela de emendas
   */
  initialize(): void {
    const parliamentaryAmendments = this.repository.getAll();
    const tableData = this.mapDataToTableData(parliamentaryAmendments);

    new DataTable(DOM_ELEMENTS.parliamentaryAmendments, {
      columns: [
        { data: 'parliamentary', title: 'Vereador' },
        { data: 'description', title: 'Descrição' },
        { data: 'agency', title: 'Órgão' },
        { data: 'budgetType', title: 'Ação Orçamentária' },
        { data: 'total', title: 'Valor (R$)' },
      ],
      columnDefs: [
        {
          targets: this.COLUMNS_DEF.parliamentary,
          visible: false,
          render: (v: string) => Formatter.ucWords(v)
        },
        {
          targets: this.COLUMNS_DEF.description,
          render: (v: string) => Formatter.ucFirst(v.toLowerCase().trim()),
        },
        {
          targets: this.COLUMNS_DEF.agency,
          className: 'text-center',
        },
        {
          targets: this.COLUMNS_DEF.budgetType,
          render: (v: string) => Formatter.ucWords(v.split(' - ')[1].toLowerCase().trim()),
        },
        {
          targets: this.COLUMNS_DEF.total,
          render: DataTable.render.number('.', ',', 2, '')
        }
      ],
      rowGroup: {
        dataSrc: 'parliamentary',
        endClassName: 'text-end',
        endRender: (rows) => {
          const total = rows.data().toArray().reduce((acc: number, curr: any) => acc + curr.total, 0);
          const totalFormatted = DataTable.render.number('.', ',', 2, 'R$ ');

          /* eslint-disable-next-line */
          /* @ts-ignore */
          return `Total: ${totalFormatted.display(total)}`;
        }
      },
      layout: {
        topStart: {
          buttons: [
            {
              extend: 'collection',
              text: 'Agrupar por',
              autoClose: true,
              buttons: [
                {
                  text: 'Vereador',
                  action: (_e: unknown, dt: Api) => {
                    dt.rowGroup().dataSrc('parliamentary')
                  }
                },
                {
                  text: 'Órgão',
                  action: (_e: unknown, dt: Api) => {
                    dt.rowGroup().dataSrc('agency');
                  }
                },
                {
                  text: 'Ação Orçamentária',
                  action: (_e: unknown, dt: Api) => {
                    dt.rowGroup().dataSrc('budgetType')
                  }
                }
              ]
            }
          ]
        }
      },
      language: {
        decimal: ',',
        thousands: '.',
      },
      orderFixed: [[0, 'asc']],
      data: tableData,
      on: {
        'rowgroup-datasrc': (_ev: unknown, dt: Api, value: string) => {
          dt.column(0).visible(this.COLUMNS_DEF[value] !== this.COLUMNS_DEF.vereador)

          dt.order.fixed({ pre: [[this.COLUMNS_DEF[value], 'asc']] })
          dt.draw()
        },
      },
    });
  }

  /**
   * Mapeia contratos para dados da tabela
   */
  private mapDataToTableData(
    parliamentaryAmendments: ParliamentaryAmendment[]
  ): Array<Record<string, any>> {
    return parliamentaryAmendments.map((parliamentaryAmendment) => ({
      parliamentary: parliamentaryAmendment.vereador,
      description: parliamentaryAmendment.objeto,
      agency: parliamentaryAmendment.orgao,
      budgetType: parliamentaryAmendment.acao_orcamentaria,
      total: parliamentaryAmendment.valor,
    }));
  }
}
