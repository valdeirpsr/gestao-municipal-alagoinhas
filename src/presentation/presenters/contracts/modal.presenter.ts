/**
 * Presenter para modal de detalhes de contrato
 * Responsável pela lógica de apresentação do modal
 */

import Swal from 'sweetalert2';
import { Formatter } from '../../../utils/formatters';
import type { AgencyFiles } from '../../../types/agencyFiles';
import type { Contract } from '../../../types/contract';

export class ContractModalPresenter {
    /**
     * Mostra detalhes do contrato em modal
     */
    showContractDetails(contract: Contract): void {
        const html = this.generateContractDetailsHtml(contract);

        Swal.fire({
            html,
            width: 'var(--container-5xl)',
        });
    }

    /**
     * Gera HTML para detalhes do contrato
     */
    private generateContractDetailsHtml(contract: Contract): string {
        return `
            <div class="max-w-5xl text-start mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div class="px-6 py-5 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 class="text-lg leading-6 font-bold text-gray-900">Detalhes da Compra Pública</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">${contract.unidadeOrgao.nomeUnidade}</p>
                    </div>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Contrato: ${contract.numeroContratoEmpenho}
                    </span>
                </div>
                <div class="px-6 py-6">
                    <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                        ${this.renderField('Nº Controle PNCP', contract.numeroControlePNCP)}
                        ${this.renderField('Categoria do Processo', contract.categoriaProcesso.nome)}
                        ${this.renderField('Tipo de Contrato', contract.tipoContrato.nome)}
                        ${this.renderFieldFullWidth('Fornecedor (Razão Social)', contract.nomeRazaoSocialFornecedor)}
                        ${this.renderField('CNPJ/NI Fornecedor', Formatter.document(contract.niFornecedor))}
                        ${this.renderField('Data de Assinatura', Formatter.date(contract.dataAssinatura))}
                        ${this.renderField('Vigência (Início)', Formatter.date(contract.dataVigenciaInicio))}
                        ${this.renderField('Vigência (Fim)', Formatter.date(contract.dataVigenciaFim))}
                        ${this.renderHighlightField('Valor Inicial', Formatter.currency(contract.valorInicial), 'green')}
                        ${this.renderHighlightField('Valor Global', Formatter.currency(contract.valorGlobal), 'green')}
                        ${this.renderBooleanField('Gera Receita?', contract.receita)}
                        ${this.renderFieldFullWidthText('Objeto do Contrato', contract.objetoContrato)}
                        ${contract.arquivos && this.renderFieldFiles('Arquivos', contract.arquivos)}
                    </dl>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza campo simples
     */
    private renderField(label: string, value: string | number): string {
        return `
            <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">${label}</dt>
                <dd class="mt-1 text-sm text-gray-900 break-all">${value}</dd>
            </div>
        `;
    }

    /**
     * Renderiza campo que ocupa largura cheia
     */
    private renderFieldFullWidth(label: string, value: string): string {
        return `
            <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">${label}</dt>
                <dd class="mt-1 text-sm font-semibold text-gray-900">${value}</dd>
            </div>
        `;
    }

    /**
     * Renderiza campo destacado com fundo colorido
     */
    private renderHighlightField(label: string, value: string, color: 'green' | 'blue' = 'green'): string {
        const bgClass = color === 'green' ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100';
        const textClass = color === 'green' ? 'text-green-600' : 'text-blue-600';
        const valueClass = color === 'green' ? 'text-green-900' : 'text-blue-900';

        return `
            <div class="sm:col-span-1 ${bgClass} p-3 rounded-lg border">
                <dt class="text-xs font-bold ${textClass} uppercase tracking-wide">${label}</dt>
                <dd class="mt-1 text-lg font-bold ${valueClass}">${value}</dd>
            </div>
        `;
    }

    /**
     * Renderiza campo booleano
     */
    private renderBooleanField(label: string, value: boolean): string {
        const badgeClass = value
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
        const badgeText = value ? 'Sim' : 'Não';

        return `
            <div class="sm:col-span-1 flex flex-col justify-center">
                <dt class="text-sm font-medium text-gray-500">${label}</dt>
                <dd class="mt-1">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}">
                        ${badgeText}
                    </span>
                </dd>
            </div>
        `;
    }

    /**
     * Renderiza campo com texto longo (quebra de linha)
     */
    private renderFieldFullWidthText(label: string, value: string): string {
        return `
            <div class="sm:col-span-full border-t border-gray-100 pt-6">
                <dt class="text-sm font-medium text-gray-500 mb-2">${label}</dt>
                <dd class="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg leading-relaxed border border-gray-200">
                    ${value}
                </dd>
            </div>
        `;
    }

    /**
     * Renderiza campo com arquivos (contratos)
     */
    private renderFieldFiles(label: string, files: AgencyFiles[]): string {
        return `
            <div class="sm:col-span-full border-t border-gray-100 pt-6">
                <dt class="text-sm font-medium text-gray-500 mb-2">${label}</dt>
                <dd class="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg leading-relaxed border border-gray-200">
                    <ol class="flex flex-wrap gap-x-8 gap-y-4">
                        ${files.map((file) => `<li><a href="${file.url}" download target="_blank" class="cursor-pointer text-blue-600 underline">${file.title}</a></li>`)}
                    </ol>
                </dd>
            </div>
        `;
    }
}
