import type { Agency, Expenses, GeneralBudget, GovernmentalSector, ItemHistory, LOA } from "../../types/loa";
import type { ILoa } from "./loa.repository.interface";

export class LoaRepository implements ILoa {
  private data: LOA;

  constructor(data: LOA) {
    this.data = data;
  }

  public getRevenues(): GeneralBudget {
    return this.data.receitaGeral;
  }

  public getExpenses(): Expenses {
    return this.data.despesas;
  }

  public getHistory(): Array<ItemHistory> {
    return this.data.historico;
  }

  public getExpensesByAgency(): Array<Agency> {
    return this.data.despesas.porOrgaos;
  }

  public getExpensesByFunction(): Array<GovernmentalSector> {
    return this.data.despesas.porFuncoesGoverno;
  }
}
