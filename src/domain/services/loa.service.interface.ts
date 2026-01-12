import type { Agency, Expenses, GeneralBudget, GovernmentalSector, ItemHistory } from "../../types/loa";

export interface ILoaService {
  /**
   * Captura total de despesas
   */
  getTotalRevenues(): number;

  /**
   * Captura total de despesas do Orçamento Fiscal
   */
  getTotalFiscalBudgetExpenses(): number;

  /**
   * Captura total de despesas com Seguridade Social
   */
  getTotalSocialSecurityExpenses(): number;

  /**
   * Captura as receitas gerais
   */
  getRevenues(): GeneralBudget;

  /**
   * Captura as despesas
   */
  getExpenses(): Expenses;

  /**
   * Captura o histórico de receitas
   */
  getRevenueHistory(): Array<ItemHistory>;

  /**
   * Captura o histórico de despesas
   */
  getExpenseHistory(): Array<ItemHistory>;

  /**
   * Captura as despesas por órgãos/secretarias
   */
  getExpensesByAgency(): Array<Agency>;

  /**
   * Captura as despesas por funções do governo
   */
  getExpensesGroupedFunction(): Array<GovernmentalSector>;
}
