import { html, LitElement, nothing, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('psr-kpi')
export class PsrKpi extends LitElement {

    @property()
    title: string = '';

    @property()
    value: string = '';

    @property()
    icon?: string = '';

    @property({ attribute: 'icon-color' })
    iconColor?: string = 'bg-gray-100 text-gray-600';

    @property()
    description?: string = '';

    protected render(): unknown {
        return this.value ? html`
           <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
                ${this.renderIcon()}
                <div>
                    <p class="text-sm text-slate-500 font-medium uppercase">${this.title}</p>
                    <p class="text-2xl font-bold text-slate-900" id="totalContracts">${this.value}</p>
                    ${this.renderDescription()}
                </div>
            </div>
        ` : '';
    }

    private renderIcon(): TemplateResult|typeof nothing {
        if (!this.icon) return nothing;

        return html`<div class="p-3 ${this.iconColor} rounded-full mr-4">
            <i data-lucide="${this.icon}" class="w-8 h-8"></i>
        </div>`;
    }

    private renderDescription(): TemplateResult|typeof nothing {
        if (!this.description) return nothing;

        return html`<p class="text-xs text-slate-400 mt-1">${this.description}</p>`;
    }

    protected createRenderRoot() {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'psr-kpi': PsrKpi;
    }
}