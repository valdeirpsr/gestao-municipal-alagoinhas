/**
 * Implementação de repositório usando dados em JSON
 * Pode ser facilmente substituído por uma chamada a API
 */

import { AGENCY_FILES_TYPES } from "../../config/constants";
import type { AgencyFiles } from "../../types/agencyFiles";
import type { Contract } from "../../types/contract";
import { AgencyFilesService } from "../services/agency-files.service";
import type { IContractRepository } from "./contract.repository.interface";

export class JsonContractRepository implements IContractRepository {
  private data: Contract[];

  constructor(data: Contract[]) {
    this.data = data;
  }

  getAll(): Contract[] {
    return this.data;
  }

  getById(id: string): Contract | undefined {
    return this.data.find((contract) => contract.numeroControlePncpCompra === id);
  }

  filter(predicate: (contract: Contract) => boolean): Contract[] {
    return this.data.filter(predicate);
  }

  getTotal(): number {
    return this.data.length;
  }

  async getContractFiles(pncp: string): Promise<AgencyFiles[]> {
    return new AgencyFilesService(AGENCY_FILES_TYPES.CONTRACT, pncp).getFiles();
  }
}
