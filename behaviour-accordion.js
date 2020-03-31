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
    /** CSS-VARIABLES
     --arrow-color: #333;
     */
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
      .disabled {
        cursor: not-allowed;
        opacity:0.3;
      }
      .down {
        border-top-color: var(--arrow-color, #333);
        top: 15px;
      }
      .up {
        border-bottom-color: var(--arrow-color, #333);
        top: -13px;
      }
    `;
  }

  _collapseSection() {
    const element = this.targetElement;
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';
    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      requestAnimationFrame(() => {
        element.style.height = 0 + 'px';
      });
    });
    element.setAttribute('data-collapsed', 'true');
  }

  _expandSection() {
    const element = this.targetElement;
    const sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';
    element.addEventListener('transitionend', (e) => {
      element.removeEventListener('transitionend', arguments.callee);
      element.style.height = null;
    });
    element.setAttribute('data-collapsed', 'false');
  }

  _toggleCollapse(ev) {
    if (this.targetElement) {
      const el = ev.target;
      if (el.classList.value.includes('up')) {
        el.classList.remove('up');
        el.classList.add('down');
        this._collapseSection();
      } else {
        el.classList.remove('down');
        el.classList.add('up');
        this._expandSection();
      }
    }
  }

  constructor() {
    super();
    this.target = '';

    this.targetElement = null;
    this.collapsedStyle = 'overflow:hidden; transition:height 0.3s ease-out;';

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
    if (this.targetElement) {
      this.targetElement.style = this.collapsedStyle;
      this.shadowRoot.querySelector('a').classList.remove('disabled');
    } else {
      this.shadowRoot.querySelector('a').classList.add('disabled');
    }
  }

  render() {
    return html`
      <a class="toggle up"></a>
    `;
  }
}

window.customElements.define(BehaviourAccordion.is, BehaviourAccordion);