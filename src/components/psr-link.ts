import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('psr-link')
export class PsrLink extends LitElement {
  @property()
  href: string = '';

  @property()
  target: string = '_self';

  static styles = css`
    a {
      align-items: center;
      display: inline-flex;
      color: oklch(54.6% 0.245 262.881);
      font-weight: 500;
      text-decoration: none;

      svg {
        height: 1rem;
        margin-left: 0.25rem;
        width: 1rem;
      }
    }
    a:hover {
      text-decoration: underline;
      color: oklch(48.8% 0.243 264.376);
    }
  `

  protected render(): unknown {
    return html`
    <a href="${this.href}" target="${this.target}">
        <slot></slot>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
    </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'psr-link': PsrLink
  }
}
