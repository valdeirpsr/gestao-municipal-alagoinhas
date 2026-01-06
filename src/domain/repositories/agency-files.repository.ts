import type { AgencyFilesResponse } from "../../types/agencyFiles";
import type { IAgencyFilesRepositoryInterface } from "./agency-files.repository.interface";

export class AgencyFilesRepository implements IAgencyFilesRepositoryInterface {

    private typeFile: string;
    private doc: string;
    private year: string;
    private sequence: string;

    constructor(typeFile: string, pncp: string) {
        this.typeFile = typeFile;
        this.doc = pncp.substring(0, 14);
        this.year = pncp.slice(-4);
        
        const [ sequence ] = pncp.substring(17).split('/')
        this.sequence = sequence;
    }

    async listFiles(): Promise<AgencyFilesResponse[]> {
        return fetch(`https://pncp.gov.br/api/pncp/v1/orgaos/${this.doc}/${this.typeFile}/${this.year}/${this.sequence}/arquivos`)
            .then(res => res.json())
    }
}