import type { AgencyFiles } from "../../types/agencyFiles";

export interface IAgencyFilesService {
    /**
     * Retorna total de arquivos
     */
    getTotalFiles(): number;

    /**
     * Retorna arquivos
     */
    getFiles(): Promise<AgencyFiles[]>;
}