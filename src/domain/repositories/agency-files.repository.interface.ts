import type { AGENCY_FILES_TYPES } from "../../config/constants";
import type { AgencyFilesResponse } from "../../types/agencyFiles";

export interface IAgencyFilesRepositoryInterface {
    listFiles(type: typeof AGENCY_FILES_TYPES, pncp: string): Promise<AgencyFilesResponse[]>
}