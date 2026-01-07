/**
 * Script principal da aplicação
 * Orquestra a inicialização de todos os presenters
 */

import Swal from 'sweetalert2';
import { createIcons, icons } from 'lucide';
import contractsData from '../public/contratos-prefeitura.json';
import type { Contract } from './types/contract';

// Domínio
import { JsonContractRepository } from './domain/repositories/contract.repository';
import { AnalyticsService } from './domain/services/analytics.service';

// Presenters
import { KpiPresenter } from './presentation/presenters/contracts/kpi.presenter';
import { ChartPresenter } from './presentation/presenters/contracts/chart.presenter';
import { TablePresenter } from './presentation/presenters/contracts/table.presenter';
import { ContractModalPresenter } from './presentation/presenters/contracts/modal.presenter';

// Events
import { EventBus } from './presentation/events/event-bus';
import type { ContractDatatablesSelectedEvent, DomainEvent } from './presentation/events/event-bus';

// Inicialização
async function initializeDashboard(): Promise<void> {
    // Dados (extrair para injetar)
    const rawData = contractsData.data as Contract[];

    // Repositório (abstração de dados)
    const contractRepository = new JsonContractRepository(rawData);

    // Serviços (lógica de negócio)
    const analyticsService = new AnalyticsService(contractRepository);

    // Event Bus (comunicação desacoplada)
    const eventBus = new EventBus();

    // Presenters (lógica de apresentação)
    const kpiPresenter = new KpiPresenter(analyticsService);
    const chartPresenter = new ChartPresenter(analyticsService);
    const tablePresenter = new TablePresenter(contractRepository, eventBus);
    const modalPresenter = new ContractModalPresenter();

    // Inscrever no evento de seleção de contrato
    eventBus.subscribe('contract:datatables:selected', async (event: DomainEvent) => {
        const contractEvent = event as ContractDatatablesSelectedEvent
        const contract = contractRepository.getById(contractEvent.contractId) as Contract;

        if (contract) {
            try {
              Swal.showLoading();
              contract.arquivos = await contractRepository.getContractFiles(contract.numeroControlePNCP);
              modalPresenter.showContractDetails(contract);
              Swal.hideLoading();
            } catch {
              Swal.fire({
                title: 'Ops!',
                text: 'Ocorreu um erro ao tentar capturar as informações do contrato',
                icon: 'error'
              })
            }
        }
    });

    // Renderizar KPIs
    kpiPresenter.renderAll();

    // Renderizar gráficos
    chartPresenter.renderAll();

    // Renderizar tabela
    tablePresenter.initialize();
}

export function start(): void {
    initializeDashboard()
        .catch(console.error)
        .then(() => {
            // Ícones
            createIcons({ icons });
        });
}

start();
