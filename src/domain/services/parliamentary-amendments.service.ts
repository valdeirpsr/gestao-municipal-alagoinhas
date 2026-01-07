import _ from "lodash";
import type { IParliamentaryAmendmentsRepository } from "../repositories/parliamentary-amendments.repository.interface";
import type { IParliamentaryAmendmentsService } from "./parliamentary-amendments.service.interface";

export class ParliamentaryAmendmentsService implements IParliamentaryAmendmentsService {
  private repository: IParliamentaryAmendmentsRepository;

  constructor(repository: IParliamentaryAmendmentsRepository) {
    this.repository = repository;
  }

  public getTotalAmendmentsAmount(): number {
    return this.repository.getAll().reduce((acc, curr) => acc + curr.valor, 0);
  }

  public getAgencyCount(): number {
    return _.uniqBy(this.repository.getAll(), "orgao").length;
  }

  public getTotalBudgetByParlamentary(): number {
    const data = this.repository.getAll();
    const countParliamentaries = Object.keys(_.countBy(data, "vereador")).length;

    return _.sumBy(data, "valor") / countParliamentaries;
  }
}
