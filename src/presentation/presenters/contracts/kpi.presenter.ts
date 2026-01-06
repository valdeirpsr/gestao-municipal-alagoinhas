/**
 * Presenter para KPI Cards
 * Responsável apenas pela apresentação dos dados de KPI
 */

import type { IAnalyticsService } from '../../../domain/services/analytics.service.interface';
import { Formatter } from '../../../utils/formatters';
import { DOM_ELEMENTS } from '../../../config/constants';
import type { PsrKpi } from '../../../components/psr-kpi';

export class KpiPresenter {
    private analyticsService: IAnalyticsService;

    constructor(analyticsService: IAnalyticsService) {
        this.analyticsService = analyticsService;
    }

    /**
     * Renderiza total de contratos
     */
    renderTotalContracts(): void {
        const total = this.analyticsService.getTotalContracts();
        this.updateElement(DOM_ELEMENTS.totalContracts, String(total));
    }

    /**
     * Renderiza orçamento total
     */
    renderBudgetTotal(): void {
        const total = this.analyticsService.getTotalBudget();
        this.updateElement(DOM_ELEMENTS.totalValue, Formatter.currency(total));
    }

    /**
     * Renderiza top investimento
     */
    renderTopInvestment(): void {
        const topAgencies = this.analyticsService.getTopAgencies(1);
        const topName = topAgencies.length > 0 ? topAgencies[0].name : '-';
        this.updateElement(DOM_ELEMENTS.topInvestment, topName);
    }

    /**
     * Renderiza total de despesas
     */
    renderTotalExpenses(): void {
        const total = this.analyticsService.getTotalExpenses();
        this.updateElement(DOM_ELEMENTS.topExpenses, Formatter.currency(total));
    }

    /**
     * Renderiza total de receitas
     */
    renderTotalRevenues(): void {
        const total = this.analyticsService.getTotalRevenues();
        this.updateElement(DOM_ELEMENTS.topRevenues, Formatter.currency(total));
    }

    /**
     * Renderiza total de fornecedores
     */
    renderTotalSuppliers(): void {
        const total = this.analyticsService.getTotalSuppliers();
        this.updateElement(DOM_ELEMENTS.totalContracted, String(total));
    }

    /**
     * Renderiza todos os KPIs
     */
    renderAll(): void {
        this.renderTotalContracts();
        this.renderBudgetTotal();
        this.renderTopInvestment();
        this.renderTotalExpenses();
        this.renderTotalRevenues();
        this.renderTotalSuppliers();
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
