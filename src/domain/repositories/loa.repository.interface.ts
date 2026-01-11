import type { Agency, Expenses, GeneralBudget, GovernmentalSector, ItemHistory } from "../../types/loa";

export interface ILoa {
  /**
   * Captura as receitas gerais
   */
  getRevenues(): GeneralBudget;

  /**
   * Captura as despesas
   */
  getExpenses(): Expenses;

  /**
   * Captura o histórico do LOA (executados, fixados e previsões)
   */
  getHistory(): Array<ItemHistory>;

  /**
   * Captura as despesas por órgãos/secretarias
   */
  getExpensesByAgency(): Array<Agency>;

  /**
   * Captura as despesas por funções do governo
   */
  getExpensesByFunction(): Array<GovernmentalSector>;
}
