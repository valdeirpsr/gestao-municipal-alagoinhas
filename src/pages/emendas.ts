import { TablePresenter } from "../presentation/presenters/parliamentaryAmendments/table.presenter";
import parliamentaryAmendments from '../assets/json/emendas-vereadores.json';
import type { ParliamentaryAmendment } from "../types/parliamentary-amendment";
import { ParliamentaryAmendmentsRepository } from "../domain/repositories/parliamentary-amendments.repository";
import { KpiPresenter } from "../presentation/presenters/parliamentaryAmendments/kpi.presenter";
import { ParliamentaryAmendmentsService } from "../domain/services/parliamentary-amendments.service";
import { createIcons, icons } from "lucide";

export function initializePage(): void {
  // Dados
  const rawData = parliamentaryAmendments as ParliamentaryAmendment[];

  // Repositório
  const parliamentaryAmendmentsRepository = new ParliamentaryAmendmentsRepository(rawData);

  // Serviços
  const parliamentaryAmendmentsService = new ParliamentaryAmendmentsService(parliamentaryAmendmentsRepository)

  const kpiPresenter = new KpiPresenter(parliamentaryAmendmentsService);
  const tablePresenter = new TablePresenter(parliamentaryAmendmentsRepository);

  tablePresenter.initialize();
  kpiPresenter.renderAll()

  createIcons({ icons })
}

initializePage();
