// ============================================================================
// Receita Geral
// ============================================================================

/**
 * Representa um item individual de receita
 */
export interface BudgetItem {
  receita: string;
  total: number;
}

/**
 * Estrutura de receitas gerais do município
 */
export interface GeneralBudget {
  receitasCorrentes: Array<BudgetItem>;
  receitasCapital: Array<BudgetItem>;
  receitasCorrentesIntraorcamentarias: Array<BudgetItem>;
}

// ============================================================================
// Despesas
// ============================================================================

/**
 * Representa um programa de despesa dentro de um órgão
 */
export interface ExpenseSector {
  programa: string;
  total: number;
}

/**
 * Representa um órgão municipal com suas despesas
 */
export interface Agency {
  orgao: string;
  sigla: string | null;
  total: number;
  despesas: Array<ExpenseSector>;
}

/**
 * Representa uma função de governo
 */
export interface GovernmentalSector {
  funcao: string;
  total: number;
}

/**
 * Representa um item de despesa por natureza
 */
export interface ExpenseCategory {
  despesa: string;
  total: number;
}

/**
 * Agrupa despesas por categoria de natureza
 */
export interface GrupoNaturezaDespesa {
  despesasCorrentes: Array<ExpenseCategory>;
  despesasCapital: Array<ExpenseCategory>;
  reservaContingencia: Array<ExpenseCategory>;
}

/**
 * Estrutura completa de despesas do município
 */
export interface Expenses {
  porOrgaos: Array<Agency>;
  porFuncoesGoverno: Array<GovernmentalSector>;
  porGrupoNaturezaDespesa: GrupoNaturezaDespesa;
}

// ============================================================================
// Histórico
// ============================================================================

/**
 * Tipos de dados históricos possíveis
 */
export type HistoricalType = 'ARRECADAÇÃO' | 'ORÇADA' | 'PREVISÃO' | 'EXECUTADA' | 'FIXADA' | string;

/**
 * Tipos de categoria orçamentária
 */
export type CategoriaOrcamentaria =
  | 'receitas correntes'
  | 'receitas de capital'
  | 'despesas correntes'
  | 'despesas de capital'
  | string;

/**
 * Representa um ano no histórico com seu valor e tipo
 */
export interface Historical {
  ano: number;
  total: number;
  tipo: HistoricalType;
}

/**
 * Representa uma série histórica de receitas ou despesas
 */
export interface ItemHistory {
  nome: string;
  tipo: CategoriaOrcamentaria;
  anos: Array<Historical>;
}

/**
 * Representa uma série histórica de receitas
 */
export interface HistoricRevenueItem {
  nome: string;
  tipo: Omit<ItemHistory, 'despesas correntes' | 'despesas de capital'>;
  anos: Array<Historical>;
}

/**
 * Representa uma série histórica de receitas ou despesas
 */
export interface HistoricExpenseItem {
  nome: string;
  tipo: Omit<ItemHistory, 'receitas correntes' | 'receitas de capital'>;
  anos: Array<Historical>;
}

export interface Totals {
  readonly receita: number;
  readonly despesa_fiscal: number;
  readonly despesa_seguridade: number;
}

// ============================================================================
// Entidade Principal
// ============================================================================

/**
 * Entidade raiz que representa a Lei Orçamentária Anual completa
 * Segue o padrão Aggregate Root do DDD
 */
export interface LOA {
  receitaGeral: GeneralBudget;
  despesas: Expenses;
  historico: Array<ItemHistory>;
  totais: Totals;
}
