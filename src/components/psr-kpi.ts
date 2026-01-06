import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from '../index.css?inline';

@customElement('psr-kpi')
export class PsrKpi extends LitElement {

    @property()
    title: string = '';

    @property()
    value: string = '';

    protected render(): unknown {
        return this.value ? html`
            <div class="bg-white overflow-hidden rounded-lg shadow-sm border border-slate-100 p-5">
                <dt class="text-sm font-medium text-slate-500 truncate" alt="${this.title}">${this.title}</dt>
                <dd class="mt-1 text-2xl font-semibold text-slate-900" alt="${this.value}">${this.value}</dd>
            </div>
        ` : '';
    }

    static styles = [
        unsafeCSS(tailwindStyles),
    ]
}