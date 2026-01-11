/**
 * Constantes da aplicação
 */

import type { MarkLine1DDataItemOption } from "echarts/types/src/component/marker/MarkLineModel.js";

export const DOM_ELEMENTS = {
  // KPI Cards (Contracts)
  totalContracts: "#totalContracts",
  totalValue: "#totalValue",
  topInvestment: "#topInvestment",
  topExpenses: "#TopExpenses",
  topRevenues: "#TopRevenues",
  totalContracted: "#totalContracted",

  // KPI Cards (Amendments)
  totalAmendmentsAmount: "#totalAmendmentsAmount",
  totalAgency: "#totalAgency",
  totalBudgetByCityCouncilMembers: "#totalBudgetByCityCouncilMembers",

  // Charts
  barChartContractsBySecretary: "barChartContractsBySecretary",
  pieChartByCategory: "pieChartByCategory",
  pieChartByPersonType: "pieChartByPersonType",
  pieChartCostByPersonType: "pieChartCostByPersonType",

  // Tables
  contractsTable: "#contractsTable",
  parliamentaryAmendments: "#parliamentaryAmendmentsTable",
  loaExpensesByFunctionTable: "#loaExpensesByFunctionTable",
  loaRevenuesTable: "#loaRevenuesTable",

  // Line
  loaHistoryLine: "#loaHistoryLine",

  // Treemap
  loaExpensesByAgencyTreemap: '#loaExpensesByAgencyTreemap',
} as const;

export const ANALYTICS = {
  TOP_DEPARTMENTS: 5,
  TOP_AGENCIES: 5,
  TOP_SUPPLIERS: 10,
} as const;

export const CHART_COLORS = {
  primary: "#0088FE",
  secondary: "#00C49F",
  warning: "#FFBB28",
  danger: "#FF8042",
  info: "#8884d8",
  gray: "#555",
  purple: "#9635e5",
  blue: "#3b82f6",
} as const;

export const BADGE_TYPES = {
  danger: "danger",
  success: "success",
  warning: "warning",
} as const;

export const DATE_FORMATS = {
  locale: "pt-BR",
  timeZone: "America/Bahia",
} as const;

export const CURRENCY_FORMAT = {
  locale: "pt-BR",
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;

export const PERSON_TYPES = {
  PJ: "Pessoa Jurídica",
  PF: "Pessoa Física",
} as const;

export const CONTRACT_REGEX = {
  cnpj: /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
  cnpjPattern: /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
  cpf: /(\d{3})(\d{3})(\d{3})(\d{2})/,
  cpfPattern: /(\d{3})(\d{3})(\d{3})(\d{2})/g,
} as const;

export const AGENCY_FILES_TYPES = {
  CONTRACT: "contratos",
} as const;

export const LOA = {
  year: 2026,
  markLines: [
    { xAxis: '2022' },
    { xAxis: '2025' },
    { xAxis: '2026' },
  ] as MarkLine1DDataItemOption[]
} as const;
