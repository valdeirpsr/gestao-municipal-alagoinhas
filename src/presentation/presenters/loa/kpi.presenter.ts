import type { PsrKpi } from "../../../components/psr-kpi";
import { DOM_ELEMENTS } from "../../../config/constants";
import type { LoaService } from "../../../domain/services/loa.service";
import { Formatter } from "../../../utils/formatters";

export class KpiPresenter {
  private service: LoaService;

  constructor(loaService: LoaService) {
    this.service = loaService;
  }

  /**
   * Renderiza todos os KPIs
   */
  renderAll(): void {
    this.renderRevenue()
    this.renderFiscalBudget()
    this.renderExpensesSocialSecurity()
  }

  private renderRevenue(): void {
    const total = this.service.getTotalRevenues();
    this.updateElement(DOM_ELEMENTS.loaTotalsRevenueKpi, Formatter.currency(total));
  }

  private renderFiscalBudget(): void {
    const total = this.service.getTotalFiscalBudgetExpenses();
    this.updateElement(DOM_ELEMENTS.loaTotalsFiscalBudgetKpi, Formatter.currency(total));
  }

  private renderExpensesSocialSecurity(): void {
    const total = this.service.getTotalSocialSecurityExpenses();
    this.updateElement(DOM_ELEMENTS.loaTotalsExpensesSocialSecurityKpi, Formatter.currency(total));
  }

  /**
   * Atualiza elemento DOM com segurança
   */
  private updateElement(selector: string, content: string): void {
    const element = document.querySelector(selector);
    if (element) {
      (element as PsrKpi).value = content;
    } else {
      console.warn(`Element ${selector} not found`);
    }
  }
}
