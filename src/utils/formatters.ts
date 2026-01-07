/**
 * Utilitários de formatação
 */

import { CURRENCY_FORMAT, DATE_FORMATS, CONTRACT_REGEX, BADGE_TYPES } from "../config/constants";

const BADGE_STYLES = {
  danger: "bg-red-400/10 text-red-400 inset-ring-red-600/10",
  success: "bg-green-400/10 text-green-400 inset-ring-green-600/10",
  warning: "bg-yellow-400/10 text-yellow-500 inset-ring-yellow-600/10",
} as const;

export class Formatter {
  /**
   * Formata valor numérico como moeda brasileira
   */
  static currency(value: number | bigint): string {
    return new Intl.NumberFormat(CURRENCY_FORMAT.locale, CURRENCY_FORMAT as Intl.NumberFormatOptions).format(value);
  }

  /**
   * Formata string de data para formato brasileiro
   */
  static date(dateString: string): string {
    return new Date(dateString).toLocaleDateString(DATE_FORMATS.locale);
  }

  /**
   * Formata documento (CPF ou CNPJ)
   */
  static document(value: string): string {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length === 14) {
      // CNPJ
      return cleanedValue.replace(CONTRACT_REGEX.cnpjPattern, "$1.$2.$3/$4-$5");
    } else {
      // CPF
      return cleanedValue.replace(CONTRACT_REGEX.cpfPattern, "$1.$2.$3-$4");
    }
  }

  /**
   * Trunca texto com reticências
   */
  static truncate(text: string, length: number = 50): string {
    return text.length > length ? text.substring(0, length).concat("...") : text;
  }

  /**
   * Normaliza nome de agência/órgão
   */
  static normalizeAgencyName(name: string): string {
    return Formatter.ucWords(
      name
        .toLowerCase()
        .replace(/\s{2,}/, " ")
        .replace(/(secretaria (municipal)? d[ea] )/, "")
        .trim(),
    );
  }

  /**
   * Transforma a primeira letra em maiúscula
   */
  static ucFirst(value: string): string {
    return value.toLocaleLowerCase().replace(/^[a-z]/, (x) => x.toLocaleUpperCase());
  }

  /**
   * Transforma a primeira letra em maiúscula de todas as palavras
   */
  static ucWords(value: string, separator: string = " "): string {
    return value
      .toLocaleLowerCase()
      .split(separator)
      .map((x) => (x.length > 2 ? Formatter.ucFirst(x) : x))
      .join(separator);
  }

  /**
   * Gera classe HTML para badge
   */
  static getBadgeClass(type: string = BADGE_TYPES.success): string {
    return BADGE_STYLES[type as keyof typeof BADGE_STYLES] || BADGE_STYLES.success;
  }

  /**
   * Formata booleano como "Sim" ou "Não"
   */
  static boolean(value: boolean): string {
    return value ? "Sim" : "Não";
  }
}
