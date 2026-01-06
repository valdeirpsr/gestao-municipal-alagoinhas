/**
 * Interface para repositório de contratos
 * Define o contrato que qualquer implementação deve seguir (Dependency Inversion)
 */

import type { Contract } from '../models/contract';

export interface IContractRepository {
    /**
     * Retorna todos os contratos
     */
    getAll(): Contract[];

    /**
     * Retorna um contrato por ID
     */
    getById(id: string): Contract | undefined;

    /**
     * Retorna contratos filtrados por propriedade
     */
    filter(predicate: (contract: Contract) => boolean): Contract[];

    /**
     * Retorna a quantidade total de contratos
     */
    getTotal(): number;
}
