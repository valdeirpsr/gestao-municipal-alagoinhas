/**
 * Presenter para tabela de contratos
 * Responsável pela lógica de apresentação da tabela
 */

import DataTable from 'datatables.net-dt';
import { Formatter } from '../../../utils/formatters';
import { BADGE_TYPES, DOM_ELEMENTS } from '../../../config/constants';
import type { Contract } from '../../../types/contract';

export class TablePresenter {
    private contracts: Contract[];

    constructor(contracts: Contract[]) {
        this.contracts = contracts;
    }

    /**
     * Inicializa e renderiza tabela de contratos
     */
    initialize(): void {
        const tableData = this.mapContractsToTableData(this.contracts);

        new DataTable(DOM_ELEMENTS.contractsTable, {
            columns: [
                { data: 'supplier', title: 'Fornecedor' },
                { data: 'publicAdministrationUnit', title: 'Órgão' },
                { data: 'category', title: 'Categoria' },
                { data: 'contractObject', title: 'Objeto' },
                { data: 'isActive', title: 'Vigente' },
                { data: 'totalContractValue', title: 'Valor Global' },
                {
                    data: 'actions',
                    title: 'Ação',
                },
            ],
            columnDefs: [
                {
                    targets: 4,
                    className: 'text-center',
                },
                {
                    targets: 5,
                    render: DataTable.render.number('.', ',', 2, 'R$ '),
                },
            ],
            language: {
                decimal: ',',
                thousands: '.',
            },
            data: tableData,
        });
    }

    /**
     * Mapeia contratos para dados da tabela
     */
    private mapContractsToTableData(
        contracts: Contract[]
    ): Array<Record<string, any>> {
        return contracts.map((contract) => ({
            supplier: Formatter.truncate(contract.nomeRazaoSocialFornecedor, 40),
            publicAdministrationUnit: `${contract.numeroContratoEmpenho}/${contract.anoContrato}`,
            category: contract.categoriaProcesso.nome,
            contractObject: Formatter.truncate(contract.objetoContrato, 30),
            isActive: this.renderActiveStatus(contract),
            totalContractValue: contract.valorGlobal,
            actions: this.renderActionButton(contract),
        }));
    }

    /**
     * Renderiza status de vigência
     */
    private renderActiveStatus(contract: Contract): string {
        const isActive = new Date(contract.dataVigenciaFim) >= new Date();
        const badgeType = isActive ? BADGE_TYPES.success : BADGE_TYPES.danger;
        const badgeText = isActive ? 'Sim' : 'Não';
        const formattedDate = Formatter.date(contract.dataVigenciaFim);

        return `${this.createBadgeHtml(badgeText, badgeType)}<br><small>${formattedDate}</small>`;
    }

    /**
     * Renderiza botão de ação
     */
    private renderActionButton(contract: Contract): string {
        return `<button type="button" data-doc="${contract.numeroControlePncpCompra}" class="cursor-pointer font-medium flex items-center gap-0.5 bg-sky-400 text-white p-1 rounded hover:bg-sky-800 transition-colors duration-300">
            <i data-lucide="file-text" class="w-4 h-4 text-white"></i> Info
        </button>`;
    }

    /**
     * Cria badge
     */
    private createBadgeHtml(text: string, type: string = BADGE_TYPES.success): string {
        const colors: Record<string, string> = {
            danger: 'bg-red-400/10 text-red-400 inset-ring-red-600/10',
            success: 'bg-green-400/10 text-green-400 inset-ring-green-600/10',
            warning: 'bg-yellow-400/10 text-yellow-500 inset-ring-yellow-600/10',
        };

        return `<span class="${colors[type] || ''} text-xs font-medium px-1.5 py-0.5 rounded inset-ring">${text}</span>`;
    }
}
