/**
 * Interface para resposta com array dos arquivos de contratos, editais e atas
 */
export interface AgencyFilesResponse {
  uri: string;
  url: string;
  dataPublicacaoPncp: string;
  sequencialDocumento: number;
  anoCompra: number;
  sequencialCompra: number;
  cnpj: string;
  titulo: string;
  tipoDocumentoNome: string;
}

export interface AgencyFiles {
  uri: string;
  url: string;
  publicationDate: string;
  title: string;
}
