var SvgIcon = (function () {
'use strict';

var svgIcon = Backed(class SvgIcon extends HTMLElement {
  static get observedAttributes() {
    return ['icon'];
  }
  static get properties() {
    return {
      icon: {
        observer: '__iconChanged__'
      },
      iconset: {
        value: window.svgIconset
      }
    };
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
    } else if (!change.value && this.iconset) {
      let parts = this._icon.split('::');
      if (parts.length === 1) {
        this.iconset['icons'].host.removeIcon(this);
      } else {
        this.iconset[parts[0]].host.removeIcon(this);
      }
    }
    this._icon = change.value;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }
});

return svgIcon;

}());
//# sourceMappingURL=svg-icon.js.map
