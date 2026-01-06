import type { AgencyFiles } from "../../types/agencyFiles";
import { AgencyFilesRepository } from "../repositories/agency-files.repository";
import type { IAgencyFilesService } from "./agency-files.service.interface";

export class AgencyFilesService implements IAgencyFilesService {
    
    private agencyFilesRepository: AgencyFilesRepository;

    constructor(typeFile: string, pncp: string) {
        this.agencyFilesRepository = new AgencyFilesRepository(typeFile, pncp);
    }

    getTotalFiles(): number {
        return 0;
    };

    async getFiles(): Promise<AgencyFiles[]> {
        return this.agencyFilesRepository
            .listFiles()
            .then(response => response.map(file => ({
                uri: file.uri,
                url: file.url,
                publicationDate: file.dataPublicacaoPncp,
                title: file.titulo
            })))
    };
}