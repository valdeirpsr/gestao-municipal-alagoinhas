/**
 * Implementação de repositório usando dados em JSON
 * Pode ser facilmente substituído por uma chamada a API
 */

import type { Contract } from '../models/contract';
import type { IContractRepository } from './contract.repository.interface';

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
}
