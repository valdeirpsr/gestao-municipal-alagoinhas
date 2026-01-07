/**
 * Interface para emendas parlamentares
 */

export interface IParliamentaryAmendmentsService {
  /**
   * Retorna o valor total das emendas
   */
  getTotalAmendmentsAmount(): number;

  /**
   * Retorna o total de agências/secretarias beneficiadas
   */
  getAgencyCount(): number;

  /**
   * Retorna o valor total que cada parlamentar recebeu para destinações
   */
  getTotalBudgetByParlamentary(): number;
}
