var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var svgIcon = Backed(function (_HTMLElement) {
  inherits(SvgIcon, _HTMLElement);
  createClass(SvgIcon, null, [{
    key: 'observedAttributes',

    /**
     * Attributes to observer
     * @return {Array} ['icon']
     */
    get: function get$$1() {
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

  }]);

  function SvgIcon() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { width: 24, height: 24, color: '#FFF', stroke: 'none' };
    classCallCheck(this, SvgIcon);

    var _this = possibleConstructorReturn(this, (SvgIcon.__proto__ || Object.getPrototypeOf(SvgIcon)).call(this));

    _this.root = _this.attachShadow({ mode: 'open' });
    _this.root.innerHTML = '\n    <style>\n      :host {\n        width: var(--svg-icon-size, ' + opts.width + 'px);\n        height: var(--svg-icon-size, ' + opts.height + 'px);\n        display: inline-flex;\n        display: -ms-inline-flexbox;\n        display: -webkit-inline-flex;\n        display: inline-flex;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n        position: relative;\n        vertical-align: middle;\n        fill: var(--svg-icon-color, ' + opts.color + ');\n        stroke: var(--svg-icon-stroke, ' + opts.stroke + ');\n      }\n    </style>';
    _this._onIconsetAdded = _this._onIconsetAdded.bind(_this);
    window.addEventListener('svg-iconset-added', _this._onIconsetAdded);
    return _this;
  }
  /**
   * Iconset
   * @return {object} window.svgIconset
   * [checkout](svg-iconset.html) for more info.
   */


  createClass(SvgIcon, [{
    key: '_onIconsetAdded',

    /**
     * Applies the icon after iconset is added
     */
    value: function _onIconsetAdded() {
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

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) this[name] = newValue;
    }
  }, {
    key: 'iconset',
    get: function get$$1() {
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

  }, {
    key: 'icon',
    set: function set$$1(value) {
      if (value && this.iconset) {
        var parts = value.split('::');
        if (parts.length === 1) {
          this.iconset['icons'].host.applyIcon(this, value);
        } else {
          this.iconset[parts[0]].host.applyIcon(this, parts[1]);
        }
      } else if (!value && this.iconset) {
        var _parts = this._icon.split('::');
        if (_parts.length === 1) {
          this.iconset['icons'].host.removeIcon(this);
        } else {
          this.iconset[_parts[0]].host.removeIcon(this);
        }
      }
      this._icon = value;
    }
  }]);
  return SvgIcon;
}(HTMLElement));

export default svgIcon;
//# sourceMappingURL=svg-icon-es.js.map
