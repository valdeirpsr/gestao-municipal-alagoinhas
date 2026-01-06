import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import tailwindStyles from '../index.css?inline';

@customElement('psr-card')
export class PsrCard extends LitElement {
    static styles = [
        unsafeCSS(tailwindStyles)
    ];

    render() {
        return html`
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 class="text-lg font-semibold mb-4 text-slate-800"><slot name="title" /></h3>
                <div class="w-full h-80">
                    <slot />
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'psr-card': PsrCard;
    }
}