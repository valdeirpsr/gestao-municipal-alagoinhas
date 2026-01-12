import { LoaRepository } from "../domain/repositories/loa.repository";
import { TablePresenter } from "../presentation/presenters/loa/table.presenter";
import loaData from '../assets/json/loa-2026.json';
import { createIcons, icons } from "lucide";
import { TreemapPresenter } from "../presentation/presenters/loa/treemap.presenter";
import { LoaService } from "../domain/services/loa.service";
import { GraphLinePresenter } from "../presentation/presenters/loa/graph-line.presenter";
import { KpiPresenter } from "../presentation/presenters/loa/kpi.presenter";

const loaRepository = new LoaRepository(loaData);
const loaService = new LoaService(loaRepository);

const table = new TablePresenter(loaService)
const treemap = new TreemapPresenter(loaService);
const graphLine = new GraphLinePresenter(loaService);
const kpi = new KpiPresenter(loaService);

kpi.renderAll()
table.initialize();
treemap.render()
graphLine.initialize();

createIcons({ icons })
