import type { AgencyFiles } from "./agencyFiles";

/**
 * Interface para dados de órgão/entidade
 */
export interface EntityAgency {
  cnpj: string;
  razaoSocial: string;
  poderId: string;
  esferaId: string;
}

/**
 * Interface para dados de unidade orgânica
 */
export interface UnitAgency {
  ufNome: string;
  codigoUnidade: string;
  ufSigla: string;
  municipioNome: string;
  nomeUnidade: string;
  codigoIbge: string;
}

/**
 * Interface para categoria de processo
 */
export interface ProcessCategory {
  id: number;
  nome: string;
}

/**
 * Interface para tipo de contrato
 */
export interface ContractType {
  id: number;
  nome: string;
}

/**
 * Interface principal para Contrato da Prefeitura
 */
export interface Contract {
  numeroControlePncpCompra: string;
  codigoPaisFornecedor: string;
  dataAtualizacao: string;
  orgaoEntidade: EntityAgency;
  dataAssinatura: string;
  dataVigenciaInicio: string;
  dataVigenciaFim: string;
  niFornecedor: string;
  tipoPessoa: string;
  processo: string;
  orgaoSubRogado: null;
  unidadeOrgao: UnitAgency;
  unidadeSubRogada: null;
  nomeRazaoSocialFornecedor: string;
  informacaoComplementar: string | null;
  categoriaProcesso: ProcessCategory;
  anoContrato: number;
  tipoContrato: ContractType;
  numeroContratoEmpenho: string;
  sequencialContrato: number;
  dataPublicacaoPncp: string;
  niFornecedorSubContratado: null;
  nomeFornecedorSubContratado: null;
  dataAtualizacaoGlobal: string;
  numeroControlePNCP: string;
  receita: boolean;
  numeroParcelas: number;
  numeroRetificacao: number;
  tipoPessoaSubContratada: null;
  objetoContrato: string;
  valorInicial: number;
  valorParcela: number;
  valorGlobal: number;
  valorAcumulado: number | null;
  identificadorCipi: null;
  urlCipi: string | null;
  usuarioNome: string;
  arquivos: AgencyFiles[] | null | undefined;
}

/**
 * Interface para resposta com array de contratos
 */
export interface ContratoResponse {
  data: Contract[];
}

/**
 * Interface para resposta com array dos arquivos de contratos
 */
export interface ContractFiles extends AgencyFiles {
  tipoDocumentoNome: "Contrato";
}
