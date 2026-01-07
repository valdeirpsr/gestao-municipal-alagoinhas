import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import tailwindStyles from '../index.css?inline';

/**
 * Psr Nav
 * Menu superior
 */
@customElement('psr-nav')
export class PsrNav extends LitElement {
  /**
   * Current active tab
   */
  @property()
  tab: string = 'contratos'

  private readonly classMenuActive = {
    'border-blue-500': true,
    'text-slate-900': true,
  }

  private readonly classMenuDisable = {
    'border-transparent': true,
    'text-slate-500': true,
    'hover:border-slate-300': true,
    'hover:text-slate-700': true,
  }

  private readonly tabs = [
    { id: 'contratos', label: 'Contratos', href: '/' },
    { id: 'emendas', label: 'Emendas', href: '/emendas.html' },
  ]

  render() {
    return html`
      <nav class="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="shrink-0 flex items-center">
                <span class="font-bold text-xl text-slate-700">Gestão de Municipal</span>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                ${this.tabs.map((link) => this._renderTabButton(link.href, link.label))}
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-xs">
                Prefeitura de Alagoinhas<br>
                <small class="text-slate-400">Última atualização: 30/12/2025</small>
              </span>
            </div>
          </div>
        </div>
      </nav>
    `
  }

  private _renderTabButton(href: string, label: string) {
    const isActive = window.location.pathname === href;
    const buttonClass = isActive ? this.classMenuActive : this.classMenuDisable
    return html`
      <a
        href="${href}"
        class="${classMap(buttonClass)} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 cursor-pointer">
        ${label}
      </a>
    `
  }

  static styles = [
    unsafeCSS(tailwindStyles),
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'psr-nav': PsrNav
  }
}
