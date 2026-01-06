/**
 * Presenter para gráficos
 * Responsável pela lógica de apresentação de gráficos
 */

import type { IAnalyticsService } from '../../../domain/services/analytics.service.interface';
import type { IChartAdapter, ChartData } from '../../../adapters/chart.adapter.interface';
import type { IPieChartAdapter, PieChartData } from '../../../adapters/chart.adapter.interface';
import { DOM_ELEMENTS, ANALYTICS } from '../../../config/constants';

export class ChartPresenter {
    private analyticsService: IAnalyticsService;
    private barChartAdapter: IChartAdapter;
    private pieChartAdapters: Map<string, IPieChartAdapter> = new Map();

    constructor(analyticsService: IAnalyticsService, barChartAdapter: IChartAdapter) {
        this.analyticsService = analyticsService;
        this.barChartAdapter = barChartAdapter;
    }

    /**
     * Registra um adapter de gráfico de pizza
     */
    registerPieChartAdapter(key: string, adapter: IPieChartAdapter): void {
        this.pieChartAdapters.set(key, adapter);
    }

    /**
     * Renderiza gráfico de barras por departamento
     */
    renderDepartmentChart(): void {
        const topAgencies = this.analyticsService.getTopAgencies(ANALYTICS.TOP_DEPARTMENTS);
        const data: ChartData = {
            labels: topAgencies.map((agency) => agency.name),
            values: topAgencies.map((agency) => agency.valor),
        };
        const chartBarEl = document.createElement('chart-bar');
        chartBarEl.data = data;
        document.getElementById(DOM_ELEMENTS.barChartContractsBySecretary)?.appendChild(chartBarEl);
    }

    /**
     * Renderiza gráfico de pizza por categoria
     */
    renderCategoryChart(): void {
        const categories = this.analyticsService.getCategoryAnalysis();
        const data: PieChartData[] = categories.map((cat) => ({
            name: cat.name,
            value: cat.quantidade,
        }));

        const chartBarEl = document.createElement('chart-pie');
        chartBarEl.data = data;
        chartBarEl.type = 'category';
        document.getElementById(DOM_ELEMENTS.pieChartByCategory)?.appendChild(chartBarEl);
    }

    /**
     * Renderiza gráfico de pizza por tipo de pessoa
     */
    renderPersonTypeChart(): void {
        const personTypes = this.analyticsService.getPersonTypeAnalysis();
        const data: PieChartData[] = personTypes.map((pt) => ({
            name: pt.type,
            value: pt.quantidade,
        }));

        const chartBarEl = document.createElement('chart-pie');
        chartBarEl.data = data;
        document.getElementById(DOM_ELEMENTS.pieChartByPersonType)?.appendChild(chartBarEl);
    }

    /**
     * Renderiza gráfico de pizza com custo por tipo de pessoa
     */
    renderPersonTypeCostChart(): void {
        const personTypes = this.analyticsService.getPersonTypeCostAnalysis();
        const data: PieChartData[] = personTypes.map((pt) => ({
            name: pt.type,
            value: pt.valor,
        }));

        const chartBarEl = document.createElement('chart-pie');
        chartBarEl.data = data;
        chartBarEl.type = 'currency';
        document.getElementById(DOM_ELEMENTS.pieChartCostByPersonType)?.appendChild(chartBarEl);
    }

    /**
     * Renderiza todos os gráficos
     */
    renderAll(): void {
        this.renderDepartmentChart();
        this.renderCategoryChart();
        this.renderPersonTypeChart();
        this.renderPersonTypeCostChart();
    }

    /**
     * Limpa todos os gráficos
     */
    disposeAll(): void {
        this.barChartAdapter.dispose();
        this.pieChartAdapters.forEach((adapter) => adapter.dispose());
    }
}
