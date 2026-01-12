import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js"; // Adicionado 'state'
import { classMap } from "lit/directives/class-map.js";
import tailwindStyles from "../index.css?inline";

/**
 * Psr Nav
 */
@customElement("psr-nav")
export class PsrNav extends LitElement {
  /**
   * Estado do menu mobile
   */
  @state()
  private _isMobileMenuOpen = false;

  private readonly classMenuActive = {
    "border-blue-500": true,
    "text-slate-900": true,
  };

  private readonly classMenuDisable = {
    "border-transparent": true,
    "text-slate-500": true,
    "hover:border-slate-300": true,
    "hover:text-slate-700": true,
  };

  private readonly tabs = [
    { label: "Contratos", href: "/" },
    { label: "Emendas", href: "/emendas.html" },
    { label: "LOA", href: "/loa.html" },
    { label: "Fontes", href: "/fontes.html" },
  ];

  private _toggleMenu() {
    this._isMobileMenuOpen = !this._isMobileMenuOpen;
  }

  render() {
    return html`
      <nav class="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="shrink-0 flex items-center z-50 relative">
                <a href="/"><span class="font-bold text-xl text-slate-700">Gestão Municipal</span></a>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                ${this.tabs.map((link) => this._renderTabButton(link.href, link.label))}
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-xs hidden sm:block text-right">
                Prefeitura de Alagoinhas<br />
                <small class="text-slate-400">Última atualização: 30/12/2025</small>
              </span>

              <div class="-mr-2 flex items-center sm:hidden z-50 relative">
                <button
                  @click="${this._toggleMenu}"
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none transition-colors"
                  aria-controls="mobile-menu"
                  aria-expanded="${this._isMobileMenuOpen}"
                >
                  <span class="sr-only">Abrir menu</span>
                  ${this._isMobileMenuOpen
                    ? html`
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      `
                    : html`
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      `}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="fixed inset-0 z-40 bg-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out sm:hidden ${
            this._isMobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-4'
          }"
        >
          <div class="h-16"></div>

          <div class="pt-8 px-4 pb-24 bg-white h-screen overflow-y-auto flex flex-col justify-between">
            <div class="space-y-6">
              ${this.tabs.map((link) => this._renderMobileTabButton(link.href, link.label))}
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
               <p class="text-sm font-medium text-slate-900">Prefeitura de Alagoinhas</p>
               <p class="text-xs text-slate-500 mt-1">Última atualização: 30/12/2025</p>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  // Renderização dos botões Desktop (sem alterações significativas)
  private _renderTabButton(href: string, label: string) {
    const isActive = window.location.pathname === href;
    const buttonClass = isActive ? this.classMenuActive : this.classMenuDisable;
    return html`
      <a
        href="${href}"
        class="${classMap(
          buttonClass,
        )} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
      >
        ${label}
      </a>
    `;
  }

  // Renderização dos botões Mobile (Estilo Apple: Fonte maior, block display)
  private _renderMobileTabButton(href: string, label: string) {
    const isActive = window.location.pathname === href;

    // Estilos específicos para o mobile
    const mobileActiveClass = isActive
      ? "text-blue-600 font-bold bg-blue-50/50"
      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50";

    return html`
      <a
        href="${href}"
        @click="${this._toggleMenu}"
        class="${mobileActiveClass} block px-4 py-4 text-2xl rounded-xl transition-all duration-200"
      >
        ${label}
      </a>
    `;
  }

  static styles = [unsafeCSS(tailwindStyles)];
}

declare global {
  interface HTMLElementTagNameMap {
    "psr-nav": PsrNav;
  }
}
