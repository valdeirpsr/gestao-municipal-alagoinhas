import type { PsrKpi } from "../../../components/psr-kpi";
import { DOM_ELEMENTS } from "../../../config/constants";
import type { IParliamentaryAmendmentsService } from "../../../domain/services/parliamentary-amendments.service.interface";
import { Formatter } from "../../../utils/formatters";

export class KpiPresenter {
  private service: IParliamentaryAmendmentsService;

  constructor(service: IParliamentaryAmendmentsService) {
    this.service = service;
  }

  /**
   * Renderiza a soma total das emendas
   */
  renderTotalAmendmentsAmount(): void {
    const total = this.service.getTotalAmendmentsAmount();
    this.updateElement(DOM_ELEMENTS.totalAmendmentsAmount, Formatter.currency(total));
  }

  /**
   * Renderiza total de órgãos/secretarias beneficiadas
   */
  renderAgencyCount(): void {
    const total = this.service.getAgencyCount();
    this.updateElement(DOM_ELEMENTS.totalAgency, String(total));
  }

  /**
   * Renderiza total de órgãos/secretarias beneficiadas
   */
  renderTotalBudgetByParlamentary(): void {
    const total = this.service.getTotalBudgetByParlamentary();
    this.updateElement(DOM_ELEMENTS.totalBudgetByCityCouncilMembers, Formatter.currency(total));
  }

  renderAll(): void {
    this.renderTotalAmendmentsAmount();
    this.renderAgencyCount();
    this.renderTotalBudgetByParlamentary();
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
