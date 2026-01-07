import type { ParliamentaryAmendment } from "../../types/parliamentary-amendment";
import type { IParliamentaryAmendmentsRepository } from "./parliamentary-amendments.repository.interface";

export class ParliamentaryAmendmentsRepository implements IParliamentaryAmendmentsRepository {
  private data: ParliamentaryAmendment[];

  constructor(data: ParliamentaryAmendment[]) {
    this.data = data;
  }

  getAll(): ParliamentaryAmendment[] {
    return this.data;
  }
}
