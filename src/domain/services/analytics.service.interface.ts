/**
 * Interface para serviço de análise de contratos
 * Centraliza toda a lógica de negócio relacionada a dados
 */

export interface AgencyAnalysis {
    name: string;
    valor: number;
}

export interface CategoryAnalysis {
    name: string;
    quantidade: number;
}

export interface PersonTypeAnalysis {
    type: string;
    quantidade: number;
    valor: number;
}

export interface IAnalyticsService {
    /**
     * Retorna total de contratos
     */
    getTotalContracts(): number;

    /**
     * Retorna total orçamentário (receita e despesa)
     */
    getTotalBudget(): number;

    /**
     * Retorna total de despesas
     */
    getTotalExpenses(): number;

    /**
     * Retorna total de receitas
     */
    getTotalRevenues(): number;

    /**
     * Retorna quantidade de fornecedores únicos
     */
    getTotalSuppliers(): number;

    /**
     * Retorna órgãos ordenados por investimento
     */
    getTopAgencies(limit: number): AgencyAnalysis[];

    /**
     * Retorna categorias de processo
     */
    getCategoryAnalysis(): CategoryAnalysis[];

    /**
     * Retorna análise por tipo de pessoa
     */
    getPersonTypeAnalysis(): Omit<PersonTypeAnalysis, 'valor'>[];

    /**
     * Retorna análise de custo por tipo de pessoa
     */
    getPersonTypeCostAnalysis(): Omit<PersonTypeAnalysis, 'quantidade'>[];
}
