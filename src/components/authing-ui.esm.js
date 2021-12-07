import { AuthingGuard as AuthingGuard$1, GuardEventsCamelToKebabMap } from '@authing/native-js-ui-components';
export { GuardMode, GuardScenes, LoginMethods, RegisterMethods, getAuthClient, initAuthClient } from '@authing/native-js-ui-components';
import '@authing/native-js-ui-components/lib/index.min.css';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var callbackEvent = ["before-login", "before-register"];
var script = {
  name: "AuthingGuard",
  props: {
    appId: {
      type: String,
      required: true
    },
    tenantId: {
      type: String,
      required: false
    },
    config: {
      type: Object,
      required: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      required: false // normal(全屏) modal(弹窗)

    },
    autoRegister: {
      type: Boolean,
      required: false
    },
    isSSO: {
      type: Boolean,
      required: false
    },
    clickCloseable: {
      type: Boolean,
      default: true,
      required: false
    },
    escCloseable: {
      type: Boolean,
      default: true,
      required: false
    },
    onBeforeLogin: {
      type: Function,
      required: false
    },
    onBeforeRegister: {
      type: Function,
      required: false
    }
  },
  data: function data() {
    return {
      localVisible: false,
      $guard: null
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler: function handler(val) {
        if (val !== this.localVisible) {
          this.localVisible = val;
        }
      }
    },
    localVisible: {
      handler: function handler(val) {
        if (val !== this.visible) {
          this.$emit("update:visible", val);
        }

        if (val) {
          this.show();
        } else {
          this.hide();
        }
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.config = this.config || {};
    this.config.mode = this.mode ? this.mode : this.config.mode;
    this.config.autoRegister = this.autoRegister ? this.autoRegister : this.config.autoRegister;
    this.config.isSSO = this.isSSO ? this.isSSO : this.config.isSSO;
    this.config.clickCloseable = this.clickCloseable ? this.clickCloseable : this.config.clickCloseable;
    this.config.escCloseable = this.escCloseable ? this.escCloseable : this.config.escCloseable; // this.config.autoRegister = format(this.autoRegister, this.config.autoRegister)
    // this.config.isSSO = format(this.isSSO, this.config.isSSO)
    // this.config.clickCloseable = format(this.clickCloseable, this.config.clickCloseable)
    // this.config.escCloseable = format(this.escCloseable, this.config.escCloseable)

    var guard = new AuthingGuard$1(this.appId, this.config, this.tenantId);
    var evts = Object.values(GuardEventsCamelToKebabMap);
    var kebabToCamelMap = Object.entries(GuardEventsCamelToKebabMap).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          camel = _ref2[0],
          kebab = _ref2[1];

      return Object.assign({}, acc, _defineProperty({}, kebab, camel));
    }, {});
    var listeners = evts.reduce(function (acc, evtName) {
      return Object.assign({}, acc, _defineProperty({}, evtName, function () {
        if (evtName === "close") {
          _this.localVisible = false;
        }

        for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }

        if (!callbackEvent.includes(evtName)) {
          _this.$emit.apply(_this, [evtName].concat(rest));
        } else {
          var camelEvtName = kebabToCamelMap[evtName];

          if (_this[camelEvtName]) {
            return _this[camelEvtName].apply(_this, rest);
          }

          return true;
        }
      }));
    }, {});
    evts.forEach(function (evtName) {
      return guard.on(evtName, listeners[evtName]);
    });

    if (this.localVisible) {
      guard.show();
    }

    this.$guard = guard;
  },
  methods: {
    show: function show() {
      this.$guard.show();
    },
    hide: function hide() {
      this.$guard.hide();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "authing_guard_container" } })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var AuthingGuard = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export { AuthingGuard };
