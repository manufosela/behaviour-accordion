import { LitElement, html, css } from 'lit-element';

/**
 * `behaviour-accordion`
 * BehaviourAccordion
 *
 * @customElement behaviour-accordion
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class BehaviourAccordion extends LitElement {
  static get is() {
    return 'behaviour-accordion';
  }

  static get properties() {
    return {
      target: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline;
      }
      .toggle {
        cursor: pointer;
        content: " ";
        position: relative;
        left: 10px;
        width: 0;
        height: 0;
        margin-top: 0;
        border: 8px solid transparent;
      }
      .down {
        border-top-color: #333;
        top: 15px;
      }
      .up {
        border-bottom-color: #333;
        top: -13px;
      }
    `;
  }

  _toggleCollapse(ev) {
    if (this.targetElement) {
      const el = ev.target;
      if (el.classList.value.includes('up')) {
        el.classList.remove('up');
        el.classList.add('down');
        this.targetElement.style = this.collapsedStyle;
      } else {
        el.classList.remove('down');
        el.classList.add('up');
        this.targetElement.style = '';
      }
    }
  }

  constructor() {
    super();
    this.target = '';

    this.targetElement = null;
    this.collapsedStyle = 'overflow: hidden; height: 0px;';

    this._toggleCollapse = this._toggleCollapse.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.querySelector('a').removeEventListener('click', this._toggleCollapse);
  }

  firstUpdated() {
    this.shadowRoot.querySelector('a').addEventListener('click', this._toggleCollapse);
    this.targetElement = document.querySelector(this.target) || null;
  }

  render() {
    return html`
      <a class="toggle up"></a>
    `;
  }
}

window.customElements.define(BehaviourAccordion.is, BehaviourAccordion);