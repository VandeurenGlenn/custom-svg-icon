'use strict';
export default class SvgIcon extends HTMLElement {
  /**
   * Attributes to observer
   * @return {Array} ['icon']
   */
  static get observedAttributes() {
    return ['icon'];
  }
  /**
   * Create icon-button
   * @param {object} opts Default options
   * @param {number} opts.width The desired height for the svg.
   * @param {number} opts.height The desired width for the svg.
   * @param {string} opts.color The color to fill.
   * @param {string} opts.stroke The stroke color.
   */
  constructor(opts={width: 24, height: 24, color: '#FFF', stroke: 'none'}) {
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = `
    <style>
      :host {
        width: var(--svg-icon-size, ${opts.width}px);
        height: var(--svg-icon-size, ${opts.height}px);
        display: inline-flex;
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: var(--svg-icon-color, ${opts.color});
        stroke: var(--svg-icon-stroke, ${opts.stroke});
      }
    </style>`;
    this._onIconsetAdded = this._onIconsetAdded.bind(this);
    window.addEventListener('svg-iconset-added', this._onIconsetAdded);
  }
  /**
   * Iconset
   * @return {object} window.svgIconset
   * [checkout](svg-iconset.html) for more info.
   */
  get iconset() {
    return window.svgIconset;
  }
  /**
   * icon
   * @param {string} value The desired icon.
   * optional: you can create multiple iconsets
   * by setting a different name on svg-iconset.
   *
   * **example:** ```html
   * <svg-iconset name="my-icons">
   *   <g id="menu">....</g>
   * </svg-iconset>
   * ```
   * This means we can ask for the icon using a prefix
   * **example:** ```html
   * <reef-icon-button icon="my-icons::menu"></reef-icon-button>
   * ```
   */
  set icon(value) {
    if (value && this.iconset) {
      let parts = value.split('::');
      if (parts.length === 1) {
        this.iconset['icons'].host.applyIcon(this, value);
      } else {
        this.iconset[parts[0]].host.applyIcon(this, parts[1]);
      }
    } else if(!value && this.iconset) {
      let parts = this._icon.split('::');
      if (parts.length === 1) {
        this.iconset['icons'].host.removeIcon(this);
      } else {
        this.iconset[parts[0]].host.removeIcon(this);
      }
    }
    this._icon = value;
  }
  /**
   * Applies the icon after iconset is added
   */
  _onIconsetAdded() {
    if (this.hasAttribute('icon')) {
      this.icon = this.getAttribute('icon');
    }
  }
  /**
   * Runs when attribute changes.
   * @param {string} name The name of the attribute that changed.
   * @param {string|object|array} oldValue
   * @param {string|object|array} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }
}
customElements.define('svg-icon', SvgIcon);