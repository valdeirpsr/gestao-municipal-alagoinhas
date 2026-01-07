import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('psr-heading')
export class PsrHeading extends LitElement {
    static styles = css`
        :host { display: block; }
        .mb-4 { margin-bottom: 1rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .font-bold { font-weight: 700; }
        .tracking-tight { letter-spacing: -0.025em; }
        .text-heading { color: inherit; }
        .color-gray-300 { border-color: #d1d5dc36 }
    `;

    render() {
        return html`<h1 class="mb-4 text-3xl font-bold tracking-tight text-heading">
            <slot />
        </h1>
        <hr class="color-gray-300 mb-4" />`;
    }
}