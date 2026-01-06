/**
 * Constantes da aplicação
 */

export const CHART_COLORS = {
    primary: '#0088FE',
    secondary: '#00C49F',
    warning: '#FFBB28',
    danger: '#FF8042',
    info: '#8884d8',
    gray: '#555',
    purple: '#9635e5',
    blue: '#3b82f6',
} as const;

export const CURRENCY_FORMAT = {
    locale: 'pt-BR',
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
} as const;

export const AGENCY_FILES_TYPES = {
  CONTRACT: 'contratos'
} as const;