import { LitElement, html, unsafeCSS } from "lit";
import { customElement, queryAssignedNodes, state } from "lit/decorators.js";
import tailwindStyles from "../index.css?inline";
import { classMap } from "lit/directives/class-map.js";

@customElement("psr-card")
export class PsrCard extends LitElement {
  static styles = [unsafeCSS(tailwindStyles)];

  @queryAssignedNodes({ slot: 'icon' })
  _iconNodes!: NodeListOf<Element>;

  @queryAssignedNodes({ slot: 'footer' })
  _footerNodes!: NodeListOf<Element>;

  @state()
  private _hasSlotIcon = false;

  @state()
  private _hasSlotFooter = false;

  render() {
    return html`
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="w-full">
          <div class="items-start space-x-4 ${classMap({ 'flex': this._hasSlotIcon })}">
              <div class="h-12 w-12 rounded-lg flex items-center justify-center shrink-0" .hidden=${!this._hasSlotIcon}>
                <slot name="icon" @slotchange=${this._onHeadingSlotChange} />
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-4 text-slate-800">
                  <slot name="title" />
                </h3>
                <slot />
              </div>
          </div>
        </div>
        <div class="mt-4 text-center text-xs text-slate-500 border-t border-slate-100 pt-4 ${classMap({ 'hidden': !this._hasSlotFooter })}">
          <slot name="footer" @slotchange=${this._onFooterSlotChange} />
        </div>
      </div>
    `;
  }

  private _onHeadingSlotChange() {
    this._hasSlotIcon = this._iconNodes.length > 0;
  }

  private _onFooterSlotChange() {
    this._hasSlotFooter = this._footerNodes.length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "psr-card": PsrCard;
  }
}
