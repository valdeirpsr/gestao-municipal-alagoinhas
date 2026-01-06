/**
 * Implementação do serviço de análise
 */

import _ from 'lodash';
import type { IContractRepository } from '../repositories/contract.repository.interface';
import type {
    IAnalyticsService,
    AgencyAnalysis,
    CategoryAnalysis,
    PersonTypeAnalysis,
} from './analytics.service.interface';
import { Formatter } from '../../utils/formatters';
import { PERSON_TYPES } from '../../config/constants';

export class AnalyticsService implements IAnalyticsService {
    private contractRepository: IContractRepository;

    constructor(contractRepository: IContractRepository) {
        this.contractRepository = contractRepository;
    }

    /**
     * Captura a quantidade total de contratos
     */
    getTotalContracts(): number {
        return this.contractRepository.getTotal();
    }

    /**
     * Soma o valor global de todos os contratos
     */
    getTotalBudget(): number {
        const contracts = this.contractRepository.getAll();
        return contracts
            .map((contract) =>
                contract.receita ? contract.valorGlobal * -1 : contract.valorGlobal
            )
            .reduce((acc, curr) => acc + curr, 0);
    }

    /**
     * Captura as despesas
     */
    getTotalExpenses(): number {
        const contracts = this.contractRepository.getAll();
        return contracts
            .filter((contract) => contract.receita === false)
            .reduce((acc, curr) => acc + curr.valorGlobal, 0);
    }

    /**
     * Calcula as receitas
     */
    getTotalRevenues(): number {
        const contracts = this.contractRepository.getAll();
        return contracts
            .filter((contract) => contract.receita === true)
            .reduce((acc, curr) => acc + curr.valorGlobal, 0);
    }

    /**
     * Captura a quantidade de fornecedores/contratados
     */
    getTotalSuppliers(): number {
        const contracts = this.contractRepository.getAll();
        const suppliers = new Set(contracts.map((contract) => contract.niFornecedor));
        return suppliers.size;
    }

    /**
     * Soma quantos reais cada órgão contratou e lista quem mais o fez
     */
    getTopAgencies(limit: number): AgencyAnalysis[] {
        const contracts = this.contractRepository.getAll();

        return _(contracts).groupBy('unidadeOrgao.nomeUnidade')
            .map((contract, key) => ({
                name: this.normalizeAgencyName(key),
                valor: _.sumBy(contract, 'valorGlobal')
            }))
            .sortBy('valor')
            .reverse()
            .slice(0, limit)
            .value();
    }

    /**
     * Lista as categorias e quantifica cada uma delas
     */
    getCategoryAnalysis(): CategoryAnalysis[] {
        const contracts = this.contractRepository.getAll();

        return _(contracts)
            .groupBy('categoriaProcesso.nome')
            .map((contracts, key) => ({
                name: key,
                quantidade: contracts.length
            }))
            .value();
    }

    /**
     * Lista o tipo de pessoa (PJ x PF) e quantificada cada um
     */
    getPersonTypeAnalysis(): Omit<PersonTypeAnalysis, 'valor'>[] {
        const contracts = this.contractRepository.getAll();

        return _(contracts)
            .groupBy('tipoPessoa')
            .map((contracts, key) => ({
                type: this.normalizePersonType(key),
                quantidade: contracts.length
            }))
            .value();
    }

    /**
     * Soma quando cada tipo de pessoa (PJ x PF) usou de reais
     */
    getPersonTypeCostAnalysis(): Omit<PersonTypeAnalysis, 'quantidade'>[] {
        const contracts = this.contractRepository.getAll();

        return _(contracts)
            .groupBy('tipoPessoa')
            .map((contracts, key) => ({
                type: this.normalizePersonType(key),
                valor: _.sumBy(contracts, 'valorGlobal')
            }))
            .value();
    }

    /**
     * Normaliza nome de agência para exibição
     */
    private normalizeAgencyName(name: string): string {
        return Formatter.normalizeAgencyName(name);
    }

    /**
     * Normaliza tipo de pessoa para exibição
     */
    private normalizePersonType(type: string): string {
        return type === 'PJ' ? PERSON_TYPES.PJ : PERSON_TYPES.PF;
    }
}
