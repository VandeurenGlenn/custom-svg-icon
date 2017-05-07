'use strict';
export default Backed(class SvgIcon extends HTMLElement {

  /**
   * Attributes to observer
   * @return {Array} ['icon']
   */
  static get observedAttributes() {
    return ['icon'];
  }

  static get properties() {
    return {
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
      icon: {
        observer: '__iconChanged__'
      },

      /**
       * Iconset
       * @return {object} window.svgIconset
       * [checkout](svg-iconset.html) for more info.
       */
      iconset: {
        value: window.svgIconset
      }
    }
  }

  ready() {
    this.icon = this.getAttribute('icon');
  }

  __iconChanged__(change) {
    if (change.value && this.iconset) {
      let parts = change.value.split('::');
      if (parts.length === 1) {
        this.iconset['icons'].host.applyIcon(this, change.value);
      } else {
        this.iconset[parts[0]].host.applyIcon(this, parts[1]);
      }
    } else if(!change.value && this.iconset) {
      let parts = this._icon.split('::');
      if (parts.length === 1) {
        this.iconset['icons'].host.removeIcon(this);
      } else {
        this.iconset[parts[0]].host.removeIcon(this);
      }
    }
    this._icon = change.value;
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
});
