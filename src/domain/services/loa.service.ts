import type { Agency, Expenses, GeneralBudget, GovernmentalSector, ItemHistory } from "../../types/loa";
import type { LoaRepository } from "../repositories/loa.repository";
import type { ILoaService } from "./loa.service.interface";

export class LoaService implements ILoaService {
  private repository: LoaRepository;

  constructor(loaRepository: LoaRepository) {
    this.repository = loaRepository;
  }

  public getTotalRevenues(): number {
    return this.repository.getTotals().receita;
  }

  public getTotalFiscalBudgetExpenses(): number {
    return this.repository.getTotals().despesa_fiscal;
  }

  public getTotalSocialSecurityExpenses(): number {
    return this.repository.getTotals().despesa_seguridade;
  }

  public getRevenues(): GeneralBudget {
    return this.repository.getRevenues();
  }

  public getExpenses(): Expenses {
    return this.repository.getExpenses();
  }

  public getRevenueHistory(): Array<ItemHistory> {
    return this.repository.getHistory().filter((value) => value.tipo.startsWith('receita'));
  }

  public getExpenseHistory(): Array<ItemHistory> {
    return this.repository.getHistory().filter((value) => value.tipo.startsWith('despesa'));
  }

  public getExpensesByAgency(): Array<Agency> {
    return this.repository.getExpensesByAgency();
  }

  public getExpensesGroupedFunction(): Array<GovernmentalSector> {
    return this.repository.getExpensesByFunction();
  }
}
