/**
 * Interface para repositório de emendas
 */

import type { ParliamentaryAmendment } from "../../types/parliamentary-amendment";

export interface IParliamentaryAmendmentsRepository {
  /**
   * Retorna todos os emendas
   */
  getAll(): ParliamentaryAmendment[];
}
