(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);

  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }

  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];

    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);

      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }

      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }

  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}

function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];

      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];

  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }

  var interceptor = scopedInterceptors[method];

  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }

  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];

  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }

  return interceptor;
}

function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  var interceptor = getApiInterceptorHooks(method);

  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }

  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }

    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  }
};
var SYNC_API_RE = /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
var CONTEXT_API_RE = /^create|Manager$/; // Context例外情况

var CONTEXT_API_RE_EXC = ['createBLEConnection']; // 同步例外情况

var ASYNC_API = ['createBLEConnection'];
var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}

function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}

function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }

  return true;
}
/* eslint-disable no-extend-native */


if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }

  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }

    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni


  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);

  if (result < 0) {
    result = -result;
  }

  result = Math.floor(result + EPS);

  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }

  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);

    if (isNaN(currentIndex)) {
      return;
    }

    var urls = fromArgs.urls;

    if (!Array.isArray(urls)) {
      return;
    }

    var len = urls.length;

    if (!len) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }

    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }

    return {
      indicator: false,
      loop: false
    };
  }
};

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom
    };
  }
}

var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets
  },
  getSystemInfoSync: {
    returnValue: addSafeAreaInsets
  }
};
var todos = ['vibrate'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值

    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }

    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];

        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }

        if (!keyOption) {
          // 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }

    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }

  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }

  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];

    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }

    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;

      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];

      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }

      var returnValue = wx[options.name || methodName].apply(wx, args);

      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }

      return returnValue;
    };
  }

  return method;
}

var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];

function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
        complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};

function getProvider(_ref2) {
  var service = _ref2.service,
      success = _ref2.success,
      fail = _ref2.fail,
      complete = _ref2.complete;
  var res = false;

  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }

  isFn(complete) && complete(res);
}

var extraApi =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }

  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }

    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}

function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}

function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}

function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
var api =
/*#__PURE__*/
Object.freeze({
  __proto__: null
});
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;

  mpInstance.triggerEvent = function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];

  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }

    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }

    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }

  var mixins = vueOptions.mixins;

  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;

  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }

  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];

  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));

      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }

  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }

  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }

  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }

  return type;
}

function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};

  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }

  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];

      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;

        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }

  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = _typeof(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];

    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};

  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }

  return obj;
}

function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';

    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }

      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}

function handleEvent(event) {
  var _this = this;

  event = wrapper$1(event); // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]

  var dataset = (event.currentTarget || event.target).dataset;

  if (!dataset) {
    return console.warn('事件信息不存在');
  }

  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰

  if (!eventOpts) {
    return console.warn('事件信息不存在');
  } // [['handle',[1,2,a]],['handle1',[1,2,a]]]


  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];

        if (methodName) {
          var handlerCtx = _this.$vm;

          if (handlerCtx.$options.generic && handlerCtx.$parent && handlerCtx.$parent.$parent) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }

          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }

          var handler = handlerCtx[methodName];

          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }

          if (isOnce) {
            if (handler.once) {
              return;
            }

            handler.once = true;
          }

          ret.push(handler.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName)));
        }
      });
    }
  });

  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}

var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound'];

function parseBaseApp(vm, _ref3) {
  var mocks = _ref3.mocks,
      initRefs = _ref3.initRefs;

  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      {
        if (!wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this; // vm 上也挂载 globalData

      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;

      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  }; // 兼容旧版本 globalData

  appOptions.globalData = vm.$options.globalData || {}; // 将 methods 中的方法挂在 getApp() 中

  var methods = vm.$options.methods;

  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);
  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children; // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)

  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];

    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  } // 反向递归查找


  var parentVm;

  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);

    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;

        if (!$refs[ref]) {
          $refs[ref] = [];
        }

        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    }
  });
}

function handleLink(event) {
  var _ref4 = event.detail || event.value,
      vuePid = _ref4.vuePid,
      vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)


  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      isPage = _ref5.isPage,
      initRelation = _ref5.initRelation;

  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
      _initVueComponent2 = _slicedToArray(_initVueComponent, 2),
      VueComponent = _initVueComponent2[0],
      vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});

  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this); // 处理父子关系

        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        }); // 初始化 vue 实例

        this.$vm = new VueComponent(options); // 处理$slots,$scopedSlots（暂不支持动态变化$slots）

        initSlots(this.$vm, properties.vueSlots); // 触发首次 setData

        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;

          this.$vm.__call_hook('mounted');

          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  }; // externalClasses

  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }

  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6) {
  var isPage = _ref6.isPage,
      initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);
  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue

    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;

  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }

      if (baseApi[name]) {
        return baseApi[name];
      }

      if (api[name]) {
        return promisify(name, api[name]);
      }

      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }

        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }

      if (eventApi[name]) {
        return eventApi[name];
      }

      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }

      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;

/***/ }),

/***/ 10:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 11:
/*!*************************************************!*\
  !*** ./src/plugins/sdk-wechat.3.13.0-beta.2.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function () {
  return function (t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var o = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var o in t) {
        n.d(r, o, function (e) {
          return t[e];
        }.bind(null, o));
      }
      return r;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 118);
  }([function (t, e, n) {
    (function (e) {
      var r = e.BaaS || {};
      r._config = n(28), r._polyfill = n(29), r.use = function (t) {
        return t(r);
      }, t.exports = r;
    }).call(this, n(24));
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    var i = n(6),
        a = n(2),
        u = n(0),
        s = n(3),
        c = n(31),
        f = n(11);
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
      value: function value(t, e) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var n = Object(this),
            r = n.length >>> 0;
        if (0 === r) return !1;
        var o,
            i,
            a = 0 | e,
            u = Math.max(a >= 0 ? a : r - Math.abs(a), 0);

        for (; u < r;) {
          if ((o = n[u]) === (i = t) || "number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i)) return !0;
          u++;
        }

        return !1;
      }
    });

    var l = function l(t, e) {
      e = e || {};

      var n = function n(_n) {
        var r = new RegExp("(&?)" + _n + "=:" + _n, "g"),
            o = encodeURIComponent(e[_n]);
        t = "undefined" !== o ? t.replace(r, function (t, e) {
          return e + _n + "=" + o;
        }) : t.replace(r, "");
        var i = new RegExp(":" + _n, "g");
        t = t.replace(i, encodeURIComponent(e[_n]));
      };

      for (var r in e) {
        n(r);
      }

      return t.replace(/([^:])\/\//g, function (t, e) {
        return e + "/";
      });
    },
        h = function h() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = u._config.REQUEST_PARAMS_MAP,
          n = o({}, t);
      return Object.keys(t).map(function (r) {
        Object.keys(e).map(function (o) {
          if (r.startsWith(o)) {
            var i = r.replace(o, e[o]);
            delete n[r], n[i] = t[r];
          }
        });
      }), n;
    },
        p = function p(t) {
      var e = "";
      return 404 === t.statusCode ? e = "not found" : t.data.error_msg ? e = t.data.error_msg : t.data.message && (e = t.data.message), e;
    },
        d = function d(t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    },
        y = function t(e) {
      if (null == e) return Object.create(null);
      var n = d(e) ? [] : Object.create(Object.getPrototypeOf(e));

      for (var o in e) {
        e.hasOwnProperty(o) && (e[o] && "object" === r(e[o]) ? (n[o] = d(e[o]) ? [] : {}, n[o] = t(e[o])) : n[o] = e[o]);
      }

      return n;
    };

    var _ = function _(t, e) {
      return t.replace(/:(\w*)/g, function (t, n) {
        void 0 !== e[n] && delete e[n];
      }), e;
    };

    t.exports = {
      mergeRequestHeader: function mergeRequestHeader(t) {
        var e = {
          "X-Hydrogen-Client-ID": u._config.CLIENT_ID,
          "X-Hydrogen-Client-Version": u._config.VERSION,
          "X-Hydrogen-Client-Platform": u._polyfill.CLIENT_PLATFORM,
          "X-Hydrogen-Client-SDK-Type": u._polyfill.SDK_TYPE
        };
        return u._config.ENV && (t["X-Hydrogen-Env-ID"] = u._config.ENV), u.getAuthToken().then(function (n) {
          return n && (e.Authorization = u._config.AUTH_PREFIX + " " + n), o({}, t || {}, e);
        });
      },
      log: f.log,
      setLogLevel: f.setLogLevel,
      format: l,
      getSysPlatform: function getSysPlatform() {
        var t = "UNKNOWN";

        try {
          t = u._polyfill.getSystemInfoSync().platform;
        } catch (t) {}

        return t;
      },
      getFileNameFromPath: function getFileNameFromPath(t) {
        var e = t.lastIndexOf("/");
        return t.slice(e + 1);
      },
      parseRegExp: function parseRegExp(t) {
        var e = [],
            n = t.toString(),
            r = n.lastIndexOf("/");
        return e.push(n.substring(1, r)), r !== n.length - 1 && e.push(n.substring(r + 1)), e;
      },
      replaceQueryParams: h,
      extractErrorMsg: p,
      isArray: d,
      isString: function isString(t) {
        return "[object String]" === Object.prototype.toString.call(t);
      },
      isObject: function isObject(t) {
        var e = r(t);
        return null != t && "object" == e;
      },
      isFunction: function isFunction(t) {
        var e = r(t);
        return null != t && "function" == e;
      },
      cloneDeep: y,
      isSessionExpired: function isSessionExpired() {
        return i.get(a.STORAGE_KEY.EXPIRES_AT).then(function (t) {
          return Date.now() / 1e3 >= (t || 0);
        });
      },
      excludeParams: _,
      doCreateRequestMethod: function doCreateRequestMethod(t) {
        for (var e in t) {
          t.hasOwnProperty(e) && (u[e] = function (e) {
            var n = t[e];
            return function (t) {
              var e = y(t),
                  r = n.method || "GET";
              n.defaultParams && (e = o(y(n.defaultParams), e));
              var i = l(n.url, e),
                  a = {};
              return e.data ? a = e.data : (a = _(n.url, e), a = h(a)), u._baasRequest({
                url: i,
                method: r,
                data: a
              });
            };
          }(e));
        }
      },
      validateStatusCode: function validateStatusCode(t) {
        var e = parseInt(t.status || t.statusCode);
        if (e >= 200 && e < 300) return t;
        throw new s(e, p(t));
      },
      rateLimit: function rateLimit(t) {
        var e = null;
        return function () {
          return e || (e = t.apply(this, arguments).then(function (t) {
            return e = null, t;
          }, function (t) {
            throw e = null, t;
          })), e;
        };
      },
      fnUnsupportedHandler: function fnUnsupportedHandler() {
        throw new s(611);
      },
      compareVersion: function compareVersion(t, e) {
        try {
          if ("string" != typeof t || "string" != typeof e) return 0;
          t = t.replace(/^[^0-9]/, ""), e = e.replace(/^[^0-9]/, "");

          for (var n = t.split("."), r = e.split("."), o = Math.max(n.length, r.length), i = 0; i < o; i++) {
            var a = n[i] ? parseInt(n[i]) : 0,
                u = r[i] ? parseInt(r[i]) : 0;
            if (a > u) return 1;
            if (a < u) return -1;
          }

          return 0;
        } catch (t) {
          return 0;
        }
      },
      makeReportTicketParam: function makeReportTicketParam(t) {
        if (!t) throw new s(605);
        var e = {
          submission_type: "form_id"
        };
        return e.submission_value = t, e;
      },
      extend: function extend() {
        return o.apply(void 0, arguments);
      },
      getUpdateUserProfileParam: function getUpdateUserProfileParam(t) {
        var e;
        return Object.keys(a.UPDATE_USERPROFILE_VALUE).forEach(function (n) {
          t === a.UPDATE_USERPROFILE_VALUE[n] && (e = t);
        }), e || (e = a.UPDATE_USERPROFILE_VALUE.SETNX), e;
      },
      ticketReportThrottle: c,
      getLimitationWithEnableTigger: n(36),
      getResendPayload: n(37),
      withRetry: n(38),
      getBytedanceAppName: n(39)
    };
  }, function (t, e) {
    t.exports = {
      QUERY_LIMITATION_DEFAULT: 20,
      STORAGE_KEY: {
        AUTH_TOKEN: "auth_token",
        USERINFO: "userinfo",
        UID: "uid",
        OPENID: "openid",
        UNIONID: "unionid",
        IS_LOGINED_BAAS: "is_logined_baas",
        IS_ANONYMOUS_USER: "is_anonymous_user",
        EXPIRES_AT: "session_expires_at",
        ALIPAY_USER_ID: "alipay_user_id",
        LATEST_VERSION_CHECK_MILLISECONDS: "latest_version_check_milliseconds",
        REPORT_TICKET_INVOKE_RECORD: "report_ticket_invoke_record"
      },
      VERSION_MIN_CHECK_INTERVAL: "86400000",
      STATUS_CODE: {
        CREATED: 201,
        SUCCESS: 200,
        UPDATE: 200,
        PATCH: 200,
        DELETE: 204,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
      },
      UPLOAD: {
        UPLOAD_FILE_KEY: "file",
        HEADER_AUTH: "Authorization",
        HEADER_CLIENT: "X-Hydrogen-Client-ID",
        HEADER_AUTH_VALUE: "Hydrogen-r1 ",
        UA: "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
      },
      USER_PROFILE_BUILD_IN_FIELDS: ["id", "created_at", "created_by", "updated_at", "country", "nickname", "province", "city", "language", "openid", "unionid", "avatar", "is_authorized", "gender"],
      httpMethodCodeMap: {
        GET: 200,
        POST: 201,
        PUT: 200,
        PATCH: 200,
        DELETE: 204
      },
      LOG_LEVEL: {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error"
      },
      UPDATE_USERPROFILE_VALUE: {
        OVERWRITE: "overwrite",
        SETNX: "setnx",
        FALSE: "false"
      },
      TICKET_REPORT_INVOKE_LIMIT: {
        MIN_INTERVAL_PRE_TIME: 1e3,
        TIMES_LIMIT: {
          MAX_TIMES_PER_CYCLE: 20,
          CYCLE: 864e5
        }
      },
      THIRD_PARTY_AUTH_MODE: {
        POPUP_IFRAME: "popup-iframe",
        POPUP_WINDOW: "popup-window",
        REDIRECT: "redirect"
      },
      THIRD_PARTY_AUTH_STATUS: {
        SUCCESS: "success",
        FAIL: "fail"
      },
      THIRD_PARTY_AUTH_HANDLER: {
        LOGIN: "login",
        ASSOCIATE: "associate"
      },
      THIRD_PARTY_AUTH_PROVIDER: {
        WECHAT_MP: "oauth-wechat-mp",
        WECHAT_WEB: "oauth-wechat-web",
        WEIBO: "oauth-weibo"
      },
      THIRD_PARTY_AUTH_URL_PARAM: {
        PROVIDER: "provider",
        REFERER: "referer",
        MODE: "mode",
        DEBUG: "debug",
        CREATE_USER: "create_user",
        UPDATE_USER_PROFILE: "update_userprofile",
        WECHAT_IFRAME_CONTENT_STYLE: "wechat_iframe_content_style",
        HANDLER: "handler",
        TOKEN: "token",
        AUTH_RESULT: "auth-result"
      },
      PLATFORM: {
        WECHAT: "wechat_miniapp",
        ALIPAY: "alipay_miniapp",
        QQ: "qq_miniapp",
        BAIDU: "baidu_miniapp",
        BYTEDANCE: "bytedance_miniapp"
      }
    };
  }, function (t, e) {
    function n(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    var r = function () {
      function t(e, n) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t);
        var r = new Error();
        return r.code = e, r.message = n ? "".concat(e, ": ").concat(n) : "".concat(e, ": ").concat(this.mapErrorMessage(e)), r;
      }

      var e, r, o;
      return e = t, (r = [{
        key: "mapErrorMessage",
        value: function value(t) {
          switch (t) {
            case 600:
              return "network disconnected";

            case 601:
              return "request timeout";

            case 602:
              return "uninitialized";

            case 603:
              return "unauthorized";

            case 604:
              return "session missing";

            case 605:
              return "incorrect parameter type";

            case 607:
              return "payment cancelled";

            case 608:
              return "payment failed";

            case 609:
              return "wxExtend function should be executed to allow plugin use wx.login, wx.getUserInfo, wx.requestPayment";

            case 610:
              return "errorTracker uninitialized";

            case 611:
              return "unsupported function";

            case 612:
              return "anonymous user is not allowed";

            case 613:
              return "third party auth denied";

            case 614:
              return "third party auth failed";

            case 615:
              return 'gateway type "weixin_tenpay_js" works in WeChat builtin browser only';

            default:
              return "unknown error";
          }
        }
      }]) && n(e.prototype, r), o && n(e, o), t;
    }();

    t.exports = r;
  }, function (t, e, n) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    var o = n(3),
        i = n(5),
        a = n(1),
        u = n(2),
        s = function () {
      function t() {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this._initQueryParams();
      }

      var e, n, s;
      return e = t, (n = [{
        key: "_initQueryParams",
        value: function value() {
          this._queryObject = {}, this._limit = null, this._offset = 0, this._orderBy = null, this._keys = null, this._expand = null;
        }
      }, {
        key: "setQuery",
        value: function value(t) {
          if (!(t instanceof i)) throw new o(605);
          return this._queryObject = a.cloneDeep(t.queryObject), this;
        }
      }, {
        key: "select",
        value: function value(t) {
          return t instanceof Array ? this._keys = t.join(",") : this._keys = t, this;
        }
      }, {
        key: "expand",
        value: function value(t) {
          return t instanceof Array ? this._expand = t.join(",") : this._expand = t, this;
        }
      }, {
        key: "limit",
        value: function value(t) {
          if (!Number.isInteger(t)) throw new o(605);
          return this._limit = t, this;
        }
      }, {
        key: "offset",
        value: function value(t) {
          if (!Number.isInteger(t)) throw new o(605);
          return this._offset = t, this;
        }
      }, {
        key: "orderBy",
        value: function value(t) {
          return t instanceof Array ? this._orderBy = t.join(",") : this._orderBy = t, this;
        }
      }, {
        key: "_handleAllQueryConditions",
        value: function value() {
          var t = {};
          return t.limit = null === this._limit ? u.QUERY_LIMITATION_DEFAULT : this._limit, t.offset = this._offset, this._orderBy && (t.order_by = this._orderBy), this._keys && (t.keys = this._keys), this._expand && (t.expand = this._expand), t.where = JSON.stringify(this._queryObject), t;
        }
      }]) && r(e.prototype, n), s && r(e, s), t;
    }();

    t.exports = s;
  }, function (t, e, n) {
    function r(t, e, n) {
      return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t;
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    var i = n(9),
        a = n(13),
        u = n(3),
        s = n(1),
        c = n(8)._serializeValueFuncFactory(["BaseRecord"]),
        f = function () {
      function t() {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.queryObject = {};
      }

      var e, n, f;
      return e = t, f = [{
        key: "and",
        value: function value() {
          for (var e = new t(), n = {
            $and: []
          }, r = arguments.length, o = new Array(r), i = 0; i < r; i++) {
            o[i] = arguments[i];
          }

          return o.forEach(function (t) {
            n.$and.push(t.queryObject);
          }), e._setQueryObject(n), e;
        }
      }, {
        key: "or",
        value: function value() {
          for (var e = new t(), n = {
            $or: []
          }, r = arguments.length, o = new Array(r), i = 0; i < r; i++) {
            o[i] = arguments[i];
          }

          return o.forEach(function (t) {
            n.$or.push(t.queryObject);
          }), e._setQueryObject(n), e;
        }
      }], (n = [{
        key: "compare",
        value: function value(t, e, n) {
          var o = "eq";

          switch (e) {
            case "=":
              o = "eq";
              break;

            case "!=":
              o = "ne";
              break;

            case "<":
              o = "lt";
              break;

            case "<=":
              o = "lte";
              break;

            case ">":
              o = "gt";
              break;

            case ">=":
              o = "gte";
              break;

            default:
              throw new u(605);
          }

          return this._addQueryObject(t, r({}, o, c(n))), this;
        }
      }, {
        key: "contains",
        value: function value(t, e) {
          if (e && s.isString(e)) return this._addQueryObject(t, {
            contains: e
          }), this;
          throw new u(605);
        }
      }, {
        key: "matches",
        value: function value(t, e) {
          if (e && e instanceof RegExp) {
            var n = s.parseRegExp(e);
            return n.length > 1 ? this._addQueryObject(t, {
              regex: n[0],
              options: n[1]
            }) : this._addQueryObject(t, {
              regex: n[0]
            }), this;
          }

          throw new u(605);
        }
      }, {
        key: "in",
        value: function value(t, e) {
          if (e && e instanceof Array) return this._addQueryObject(t, {
            in: e.map(function (t) {
              return c(t);
            })
          }), this;
          throw new u(605);
        }
      }, {
        key: "notIn",
        value: function value(t, e) {
          if (e && e instanceof Array) return this._addQueryObject(t, {
            nin: e.map(function (t) {
              return c(t);
            })
          }), this;
          throw new u(605);
        }
      }, {
        key: "arrayContains",
        value: function value(t, e) {
          if (e && e instanceof Array) return this._addQueryObject(t, {
            all: e
          }), this;
          throw new u(605);
        }
      }, {
        key: "isNull",
        value: function value(t) {
          var e = this;
          return t && t instanceof Array ? t.forEach(function (t) {
            e._addQueryObject(t, {
              isnull: !0
            });
          }) : this._addQueryObject(t, {
            isnull: !0
          }), this;
        }
      }, {
        key: "isNotNull",
        value: function value(t) {
          var e = this;
          return t && t instanceof Array ? t.forEach(function (t) {
            e._addQueryObject(t, {
              isnull: !1
            });
          }) : this._addQueryObject(t, {
            isnull: !1
          }), this;
        }
      }, {
        key: "exists",
        value: function value(t) {
          var e = this;
          return t && t instanceof Array ? t.forEach(function (t) {
            e._addQueryObject(t, {
              exists: !0
            });
          }) : this._addQueryObject(t, {
            exists: !0
          }), this;
        }
      }, {
        key: "notExists",
        value: function value(t) {
          var e = this;
          return t && t instanceof Array ? t.forEach(function (t) {
            e._addQueryObject(t, {
              exists: !1
            });
          }) : this._addQueryObject(t, {
            exists: !1
          }), this;
        }
      }, {
        key: "include",
        value: function value(t, e) {
          if (e && e instanceof i) return this._addQueryObject(t, {
            intersects: e.toGeoJSON()
          }), this;
          throw new u(605);
        }
      }, {
        key: "within",
        value: function value(t, e) {
          if (e && e instanceof a) return this._addQueryObject(t, {
            within: e.toGeoJSON()
          }), this;
          throw new u(605);
        }
      }, {
        key: "withinCircle",
        value: function value(t, e, n) {
          if (e && e instanceof i) {
            var r = {
              radius: n,
              coordinates: [e.longitude, e.latitude]
            };
            return this._addQueryObject(t, {
              center: r
            }), this;
          }

          throw new u(605);
        }
      }, {
        key: "withinRegion",
        value: function value(t, e, n) {
          var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;

          if (e && e instanceof i) {
            var o = {
              geometry: e.toGeoJSON(),
              min_distance: r
            };
            return n && (o.max_distance = n), this._addQueryObject(t, {
              nearsphere: o
            }), this;
          }

          throw new u(605);
        }
      }, {
        key: "hasKey",
        value: function value(t, e) {
          if ("string" != typeof t || "string" != typeof e) throw u(605);
          return this._addQueryObject(t, {
            has_key: e
          }), this;
        }
      }, {
        key: "_setQueryObject",
        value: function value(t) {
          this.queryObject = t;
        }
      }, {
        key: "_addQueryObject",
        value: function value(t, e) {
          if (e.constructor !== Object) throw new u(605);
          var n = r({}, t, {});
          Object.keys(e).forEach(function (r) {
            n[t]["$".concat(r)] = e[r];
          }), this.queryObject.$and || (this.queryObject.$and = []), this.queryObject.$and.push(n);
        }
      }]) && o(e.prototype, n), f && o(e, f), t;
    }();

    t.exports = f;
  }, function (t, e, n) {
    var r = n(0);
    t.exports = {
      set: function set(t, e) {
        return r._polyfill.setStorageAsync("ifx_baas_" + t, e);
      },
      get: function get(t) {
        return r._polyfill.getStorageAsync("ifx_baas_" + t);
      }
    };
  },, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    var i = n(3);

    function a() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["BaseRecord"],
          e = n(9),
          r = n(13);
      return function (n) {
        return t.includes("Geo") && (n instanceof e || n instanceof r) ? n.toGeoJSON() : t.includes("BaseRecord") && n instanceof u ? null == n._recordID ? "" : n._recordID.toString() : n;
      };
    }

    var u = function () {
      function t(e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this._recordID = e, this._recordValueInit();
      }

      var e, n, u;
      return e = t, (n = [{
        key: "_recordValueInit",
        value: function value() {
          this._record = {
            $set: {},
            $unset: {}
          };
        }
      }, {
        key: "set",
        value: function value() {
          for (var t = this, e = a(["BaseRecord", "Geo"]), n = a(["Geo"]), o = arguments.length, u = new Array(o), s = 0; s < o; s++) {
            u[s] = arguments[s];
          }

          if (1 === u.length) {
            if ("object" !== r(u[0])) throw new i(605);
            var c = u[0],
                f = {};
            Object.keys(u[0]).forEach(function (r) {
              if (t._record.$unset.hasOwnProperty(r)) throw new i(605);
              var o = c[r];
              Array.isArray(o) ? f[r] = o.map(function (t) {
                return n(t);
              }) : f[r] = e(o);
            }), this._record.$set = f;
          } else {
            if (2 !== u.length) throw new i(605);
            if (this._record.$unset.hasOwnProperty(u[0])) throw new i(605);
            var l = u[1];
            Array.isArray(l) ? this._record.$set[u[0]] = l.map(function (t) {
              return n(t);
            }) : this._record.$set[u[0]] = e(l);
          }

          return this;
        }
      }, {
        key: "unset",
        value: function value() {
          for (var t = this, e = arguments.length, n = new Array(e), o = 0; o < e; o++) {
            n[o] = arguments[o];
          }

          if ("object" === r(n[0])) {
            var a = {};
            Object.keys(n[0]).forEach(function (e) {
              if (t._record.$set.hasOwnProperty(e)) throw new i(605);
              a[e] = "";
            }), this._record.$unset = a;
          } else {
            if ("string" != typeof n[0]) throw new i(605);
            if (this._record.$set.hasOwnProperty(n[0])) throw new i(605);
            this._record.$unset[n[0]] = "";
          }

          return this;
        }
      }, {
        key: "incrementBy",
        value: function value(t, e) {
          return this._record.$set[t] = {
            $incr_by: e
          }, this;
        }
      }, {
        key: "append",
        value: function value(t, e) {
          var n = a(["Geo"]);
          return e instanceof Array || (e = [e]), e = e.map(function (t) {
            return n(t);
          }), this._record.$set[t] = {
            $append: e
          }, this;
        }
      }, {
        key: "uAppend",
        value: function value(t, e) {
          var n = a(["Geo"]);
          return e instanceof Array || (e = [e]), e = e.map(function (t) {
            return n(t);
          }), this._record.$set[t] = {
            $append_unique: e
          }, this;
        }
      }, {
        key: "remove",
        value: function value(t, e) {
          var n = a(["Geo"]);
          return e instanceof Array || (e = [e]), e = e.map(function (t) {
            return n(t);
          }), this._record.$set[t] = {
            $remove: e
          }, this;
        }
      }, {
        key: "patchObject",
        value: function value(t, e) {
          if ("[object Object]" !== Object.prototype.toString.call(e)) throw new i(605);
          return this._record.$set[t] = {
            $update: e
          }, this;
        }
      }]) && o(e.prototype, n), u && o(e, u), t;
    }();

    u._serializeValueFuncFactory = a, t.exports = u;
  }, function (t, e, n) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    var o = n(1),
        i = function () {
      function t(e, n) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.longitude = e, this.latitude = n, this.geoJSON = {
          type: "Point",
          coordinates: [this.longitude, this.latitude]
        };
      }

      var e, n, i;
      return e = t, (n = [{
        key: "toGeoJSON",
        value: function value() {
          return o.cloneDeep(this.geoJSON);
        }
      }]) && r(e.prototype, n), i && r(e, i), t;
    }();

    t.exports = i;
  },, function (t, e, n) {
    var r = n(2),
        o = n(32),
        i = function i(t) {
      return o({
        level: t
      });
    },
        a = i(r.LOG_LEVEL.ERROR);

    t.exports = {
      log: function log(t, e) {
        a[t] && a[t](e);
      },
      setLogLevel: function setLogLevel(t) {
        Object.keys(r.LOG_LEVEL).forEach(function (e) {
          r.LOG_LEVEL[e] === t && (a = i(t));
        });
      }
    };
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var s = n(0),
        c = n(8),
        f = n(1),
        l = function (t) {
      function e(t) {
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), i(this, a(e).call(this, t));
      }

      var n, r, c;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && u(t, e);
      }(e, t), n = e, (r = [{
        key: "update",
        value: function value() {
          var t = f.cloneDeep(this._record);
          return this._recordValueInit(), s.updateUser({
            data: t.$set
          });
        }
      }]) && o(n.prototype, r), c && o(n, c), e;
    }(c);

    l.initCurrentUser = function (t) {
      return new (n(40))(t);
    }, t.exports = l;
  }, function (t, e, n) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    var o = n(9),
        i = n(3),
        a = n(1),
        u = function () {
      function t(e) {
        if (function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), !(e && e instanceof Array)) throw new i(605);
        if (e.length < 4) throw new i(605);
        this.points = e, this.geoJSON = {
          type: "Polygon",
          coordinates: []
        };
      }

      var e, n, u;
      return e = t, (n = [{
        key: "toGeoJSON",
        value: function value() {
          var t = [];
          return this.points.forEach(function (e) {
            if (e instanceof o) t.push([e.longitude, e.latitude]);else {
              if (!(e instanceof Array && 2 === e.length)) throw new i(605);
              t.push(e);
            }
          }), this.geoJSON.coordinates = [t], a.cloneDeep(this.geoJSON);
        }
      }]) && r(e.prototype, n), u && r(e, u), t;
    }();

    t.exports = u;
  },,, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var c = n(0),
        f = n(4),
        l = n(12),
        h = n(1),
        p = n(3),
        d = function (t) {
      function e() {
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), a(this, u(e).call(this));
      }

      var n, r, f;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && s(t, e);
      }(e, t), n = e, (r = [{
        key: "get",
        value: function value(t) {
          var e = {
            userID: t
          };
          return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), c.getUserDetail(e);
        }
      }, {
        key: "getWithoutData",
        value: function value(t) {
          if (h.isString(t) || Number.isInteger(t)) return new l(t);
          throw new p(605);
        }
      }, {
        key: "getCurrentUserWithoutData",
        value: function value() {
          return new l();
        }
      }, {
        key: "find",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.withCount,
              n = void 0 !== e && e,
              r = this._handleAllQueryConditions();

          return this._initQueryParams(), c.getUserList(o({}, r, {
            return_total_count: n ? 1 : 0
          }));
        }
      }, {
        key: "count",
        value: function value() {
          return this.limit(1).find({
            withCount: !0
          }).then(function (t) {
            return t.data.meta.total_count;
          });
        }
      }]) && i(n.prototype, r), f && i(n, f), e;
    }(f);

    t.exports = d;
  }, function (t, e, n) {
    var r = n(0),
        o = n(3),
        i = r._config.API;

    t.exports = function (t, e) {
      var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
      if (!t) throw new o(605);
      var a = {
        function_name: t,
        sync: n
      };
      return void 0 !== e && (a.data = e), r._baasRequest({
        url: i.CLOUD_FUNCTION,
        method: "POST",
        data: a
      }).then(function (t) {
        return t.data;
      });
    };
  },, function (t, e, n) {
    var r = n(0);
    t.exports = {
      set: function set(t, e) {
        r._polyfill.setStorageSync("ifx_baas_" + t, e);
      },
      get: function get(t) {
        return r._polyfill.getStorageSync("ifx_baas_" + t);
      }
    };
  },,, function (t, e, n) {
    function r(t, e) {
      return function (t) {
        if (Array.isArray(t)) return t;
      }(t) || function (t, e) {
        var n = [],
            r = !0,
            o = !1,
            i = void 0;

        try {
          for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0) {
            ;
          }
        } catch (t) {
          o = !0, i = t;
        } finally {
          try {
            r || null == u.return || u.return();
          } finally {
            if (o) throw i;
          }
        }

        return n;
      }(t, e) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }

    var o = n(0),
        i = n(2),
        a = n(3),
        u = n(6),
        s = n(1),
        c = n(12),
        f = n(16),
        l = o._config.API;

    function h(t, e) {
      return t.phone ? e ? l.LOGIN_PHONE : l.REGISTER_PHONE : t.email ? e ? l.LOGIN_EMAIL : l.REGISTER_EMAIL : e ? l.LOGIN_USERNAME : l.REGISTER_USERNAME;
    }

    function p(t) {
      return t.phone ? {
        phone: t.phone,
        password: t.password
      } : t.email ? {
        email: t.email,
        password: t.password
      } : {
        username: t.username || "",
        password: t.password
      };
    }

    var d = function d() {
      return Promise.all([u.get(i.STORAGE_KEY.UID), u.get(i.STORAGE_KEY.EXPIRES_AT), s.isSessionExpired()]).then(function (t) {
        var e = r(t, 3),
            n = e[0],
            o = e[1],
            i = e[2];
        return n && o && !i ? new f().get(n).then(function (t) {
          var e = c.initCurrentUser(t.data);
          return e.user_id = t.data.id, e.session_expires_at = o, e;
        }) : Promise.reject(new a(604));
      });
    };

    t.exports = {
      login: s.rateLimit(function (t) {
        var e = h(t, !0),
            n = p(t);
        return o.request({
          url: e,
          method: "POST",
          data: n
        }).then(s.validateStatusCode).then(function (t) {
          return o._polyfill.handleLoginSuccess(t), d();
        });
      }),
      logout: function logout() {
        return o.request({
          url: l.LOGOUT,
          method: "POST"
        }).then(s.validateStatusCode).then(function (t) {
          return o.clearSession().then(function () {
            return t;
          });
        });
      },
      silentLogin: function silentLogin() {
        return Promise.reject(new a(605, "silentLogin 方法未定义"));
      },
      loginWithSmsVerificationCode: s.rateLimit(function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = n.createUser,
            i = void 0 === r || r;
        return o.request({
          url: l.LOGIN_SMS,
          data: {
            phone: t,
            code: e,
            create_user: i
          },
          method: "POST"
        }).then(s.validateStatusCode).then(function (t) {
          return o._polyfill.handleLoginSuccess(t, !1), d();
        });
      }),
      anonymousLogin: s.rateLimit(function () {
        return o.request({
          url: l.ANONYMOUS_LOGIN,
          method: "POST"
        }).then(s.validateStatusCode).then(function (t) {
          return o._polyfill.handleLoginSuccess(t, !0), d();
        });
      }),
      requestPasswordReset: function requestPasswordReset() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.email;
        return o.request({
          url: l.PASSWORD_RESET,
          method: "POST",
          data: {
            email: e
          }
        }).then(s.validateStatusCode);
      },
      register: s.rateLimit(function (t) {
        var e = h(t),
            n = p(t);
        return o.request({
          url: e,
          method: "POST",
          data: n
        }).then(s.validateStatusCode).then(function (t) {
          return o._polyfill.handleLoginSuccess(t), d();
        });
      }),
      getCurrentUser: s.rateLimit(d)
    };
  },, function (t, e) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
    }

    t.exports = n;
  }, function (t, e) {
    var n,
        r,
        o = t.exports = {};

    function i() {
      throw new Error("setTimeout has not been defined");
    }

    function a() {
      throw new Error("clearTimeout has not been defined");
    }

    function u(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);

      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }

    !function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i;
      } catch (t) {
        n = i;
      }

      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (t) {
        r = a;
      }
    }();
    var s,
        c = [],
        f = !1,
        l = -1;

    function h() {
      f && s && (f = !1, s.length ? c = s.concat(c) : l = -1, c.length && p());
    }

    function p() {
      if (!f) {
        var t = u(h);
        f = !0;

        for (var e = c.length; e;) {
          for (s = c, c = []; ++l < e;) {
            s && s[l].run();
          }

          l = -1, e = c.length;
        }

        s = null, f = !1, function (t) {
          if (r === clearTimeout) return clearTimeout(t);
          if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);

          try {
            r(t);
          } catch (e) {
            try {
              return r.call(null, t);
            } catch (e) {
              return r.call(this, t);
            }
          }
        }(t);
      }
    }

    function d(t, e) {
      this.fun = t, this.array = e;
    }

    function y() {}

    o.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
        e[n - 1] = arguments[n];
      }
      c.push(new d(t, e)), 1 !== c.length || f || u(p);
    }, d.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (t) {
      return [];
    }, o.binding = function (t) {
      throw new Error("process.binding is not supported");
    }, o.cwd = function () {
      return "/";
    }, o.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    }, o.umask = function () {
      return 0;
    };
  },, function (t, e, n) {
    function r(t, e) {
      return function (t) {
        if (Array.isArray(t)) return t;
      }(t) || function (t, e) {
        var n = [],
            r = !0,
            o = !1,
            i = void 0;

        try {
          for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0) {
            ;
          }
        } catch (t) {
          o = !0, i = t;
        } finally {
          try {
            r || null == u.return || u.return();
          } finally {
            if (o) throw i;
          }
        }

        return n;
      }(t, e) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }

    var o = n(0),
        i = n(2),
        a = n(1),
        u = [],
        s = !1;
    t.exports = {
      pushStats: function pushStats(t) {
        a.log(i.LOG_LEVEL.DEBUG, "<receive-stats> ".concat(t)), u.includes(t) || (u.push(t), a.log(i.LOG_LEVEL.DEBUG, "<push-stats> ".concat(t, ", [").concat(u, "]")));
      },
      reportStats: function reportStats() {
        return s || !u.length ? Promise.resolve() : Promise.all([o.storageAsync.get(i.STORAGE_KEY.AUTH_TOKEN), a.isSessionExpired()]).then(function (t) {
          var e = r(t, 2),
              n = e[0],
              c = e[1];
          if (n && !c) return s = !0, a.log(i.LOG_LEVEL.DEBUG, "<report-stats> begin"), function t() {
            var e = u[0];
            a.log(i.LOG_LEVEL.DEBUG, "<report-stats> [".concat(e, "]: begin"));
            var n = i.PLATFORM.WECHAT;

            switch (o._polyfill.CLIENT_PLATFORM) {
              case "ALIPAY":
                n = i.PLATFORM.ALIPAY;
                break;

              case "QQ":
                n = i.PLATFORM.QQ;
                break;

              case "BAIDU":
                n = i.PLATFORM.BAIDU;
                break;

              case "BYTEDANCE":
                n = i.PLATFORM.BYTEDANCE;
                break;

              default:
                n = i.PLATFORM.WECHAT;
            }

            return o._baasRequest({
              url: o._config.API.TEMPLATE_MESSAGE_EVENT_REPORT,
              method: "POST",
              data: {
                stats_id: e,
                platform: n
              }
            }).then(function () {
              if (a.log(i.LOG_LEVEL.DEBUG, "<report-stats> [".concat(e, "]: finish")), u.shift(), u.length) return t();
            });
          }().then(function () {
            a.log(i.LOG_LEVEL.DEBUG, "<report-stats> finish"), s = !1;
          }).catch(function (t) {
            throw a.log(i.LOG_LEVEL.DEBUG, "<report-stats> fail", t, u), s = !1, t;
          });
        });
      },
      getQueue: function getQueue() {
        return u.concat();
      }
    };
  }, function (t, e) {
    var n = {
      REGISTER_USERNAME: "/hserve/v2.1/register/username/",
      REGISTER_EMAIL: "/hserve/v2.1/register/email/",
      REGISTER_PHONE: "/hserve/v2.1/register/phone/",
      LOGIN_USERNAME: "/hserve/v2.1/login/username/",
      LOGIN_EMAIL: "/hserve/v2.1/login/email/",
      LOGIN_PHONE: "/hserve/v2.1/login/phone/",
      LOGIN_SMS: "/hserve/v2.1/login/sms/",
      EMAIL_VERIFY: "/hserve/v2.0/user/email-verify/",
      VERIFY_MOBILE: "/hserve/v2.1/sms-phone-verification/",
      ACCOUNT_INFO: "/hserve/v2.2/user/account/",
      PASSWORD_RESET: "/hserve/v2.0/user/password/reset/",
      ANONYMOUS_LOGIN: "/hserve/v2.0/login/anonymous/",
      LOGOUT: "/hserve/v2.0/session/destroy/",
      SERVER_TIME: "/hserve/v2.2/server/time/",
      NATIVE_OAUTH_AUTH: "/hserve/v2.3/idp/oauth/:provider/authenticate/",
      NATIVE_OAUTH_ASSOCIATION: "/hserve/v2.3/idp/oauth/:provider/user-association/",
      UPLOAD: "/hserve/v2.1/upload/",
      CLOUD_FUNCTION: "/hserve/v1/cloud-function/job/",
      USER_DETAIL: "/hserve/v2.0/user/info/:userID/",
      USER_LIST: "/hserve/v2.2/user/info/",
      UPDATE_USER: "/hserve/v2.0/user/info/",
      TABLE_LIST: "/hserve/v2.0/table/",
      TABLE_DETAIL: "/hserve/v2.0/table/:tableID/",
      RECORD_LIST: "/hserve/v2.4/table/:tableID/record/",
      QUERY_RECORD_LIST: "/hserve/v2.4/table/:tableID/record/",
      CREATE_RECORD_LIST: "/hserve/v2.4/table/:tableID/record/?enable_trigger=:enable_trigger",
      RECORD_DETAIL: "/hserve/v2.4/table/:tableID/record/:recordID/",
      CREATE_RECORD: "/hserve/v2.4/table/:tableID/record/",
      UPDATE_RECORD: "/hserve/v2.4/table/:tableID/record/:recordID/",
      UPDATE_RECORD_LIST: "/hserve/v2.4/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger&return_total_count=:return_total_count",
      DELETE_RECORD: "/hserve/v2.4/table/:tableID/record/:recordID/",
      DELETE_RECORD_LIST: "/hserve/v2.4/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger&return_total_count=:return_total_count",
      LAGECY_CONTENT_LIST: "/hserve/v1/content/detail/",
      CONTENT_LIST: "/hserve/v2.2/content/detail/",
      CONTENT_GROUP_LIST: "/hserve/v2.2/content/group/",
      CONTENT_DETAIL: "/hserve/v2.0/content/detail/:richTextID/",
      CONTENT_GROUP_DETAIL: "/hserve/v2.2/content/group/:contentGroupID/",
      CONTENT_CATEGORY_LIST: "/hserve/v2.2/content/category/",
      CONTENT_CATEGORY_DETAIL: "/hserve/v2.0/content/category/:categoryID/",
      FILE_DETAIL: "/hserve/v2.1/uploaded-file/:fileID/",
      FILE_LIST: "/hserve/v2.2/uploaded-file/",
      DELETE_FILE: "/hserve/v2.1/uploaded-file/:fileID/",
      DELETE_FILES: "/hserve/v2.1/uploaded-file/",
      FILE_CATEGORY_DETAIL: "/hserve/v1.3/file-category/:categoryID/",
      FILE_CATEGORY_LIST: "/hserve/v2.2/file-category/",
      CENSOR_IMAGE: "/hserve/v1.7/censor-image/",
      CENSOR_MSG: "/hserve/v1.7/censor-msg/",
      SEND_SMS_CODE: "/hserve/v2.2/sms-verification-code/",
      VERIFY_SMS_CODE: "/hserve/v1.8/sms-verification-code/verify/",
      PAY: "/hserve/v2.2/idp/pay/order/",
      ORDER: "/hserve/v2.0/idp/pay/order/:transactionID/",
      TEMPLATE_MESSAGE_EVENT_REPORT: "/hserve/v2.0/template-message/event-report/",
      WEB: {
        THIRD_PARTY_AUTH: "/hserve/v2.0/idp/:provider/redirect/",
        THIRD_PARTY_LOGIN: "/hserve/v2.0/idp/:provider/authenticate/",
        THIRD_PARTY_ASSOCIATE: "/hserve/v2.0/idp/:provider/user-association/"
      },
      WECHAT: {
        SILENT_LOGIN: "/hserve/v2.4/idp/wechat/silent-login/",
        AUTHENTICATE: "/hserve/v2.4/idp/wechat/authenticate/",
        USER_ASSOCIATE: "/hserve/v2.4/idp/wechat/user-associate/",
        TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/",
        SUBSCRIBE_MESSAGE: "/hserve/v2.2/subscription-message/relationship-report/",
        DECRYPT: "/hserve/v1/wechat/decrypt/",
        WXACODE: "/hserve/v2.4/miniappcode/",
        CENSOR_IMAGE: "/hserve/v1.7/censor-image/",
        CENSOR_MSG: "/hserve/v1.7/censor-msg/",
        CENSOR_ASYNC: "/hserve/v2.2/async-censor/"
      },
      QQ: {
        SILENT_LOGIN: "/hserve/v2.0/idp/qq/silent-login/",
        AUTHENTICATE: "/hserve/v2.0/idp/qq/authenticate/",
        USER_ASSOCIATE: "/hserve/v2.0/idp/qq/user-association/",
        TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/",
        DECRYPT: "/hserve/v2.0/qq/decrypt/",
        CENSOR_IMAGE: "/hserve/v2.2/qq/censor-image/",
        CENSOR_MSG: "/hserve/v2.2/qq/censor-msg/"
      },
      BAIDU: {
        SILENT_LOGIN: "/hserve/v2.1/idp/baidu/silent-login/",
        AUTHENTICATE: "/hserve/v2.1/idp/baidu/authenticate/",
        USER_ASSOCIATE: "/hserve/v2.1/idp/baidu/user-association/",
        TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/"
      },
      ALIPAY: {
        SILENT_LOGIN: "/hserve/v2.1/idp/alipay/silent-login/",
        AUTHENTICATE: "/hserve/v2.1/idp/alipay/authenticate/",
        USER_ASSOCIATE: "/hserve/v2.0/idp/alipay/user-associate/",
        TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/",
        MINIAPP_QR_CODE: "/hserve/v2.0/idp/alipay/miniapp-qr-code/"
      },
      BYTEDANCE: {
        SILENT_LOGIN: "/hserve/v2.4/idp/bytedance/silent-login/",
        AUTHENTICATE: "/hserve/v2.4/idp/bytedance/authenticate/",
        USER_ASSOCIATE: "/hserve/v2.4/idp/bytedance/user-association/",
        TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/",
        MINIAPP_QR_CODE: "/hserve/v2.4/idp/bytedance/miniapp-qr-code/"
      },
      VIDEO_SNAPSHOT: "/hserve/v1/media/video-snapshot/",
      M3U8_CONCAT: "/hserve/v1/media/m3u8-concat/",
      M3U8_CLIP: "/hserve/v1/media/m3u8-clip/",
      M3U8_META: "/hserve/v1/media/m3u8-meta/",
      VIDEO_AUDIO_META: "/hserve/v1/media/audio-video-meta/",
      GET_ASYNC_JOB_RESULT: "/hserve/v1/bulk-operation/:id/",
      LATEST_VERSION: "/hserve/v1/latest-sdk-version/"
    },
        r = [{
      getUserInfo: {
        url: n.USER_DETAIL,
        defaultParams: {
          userID: ""
        }
      },
      getUserDetail: {
        url: n.USER_DETAIL
      },
      getUserList: {
        url: n.USER_LIST
      },
      updateUser: {
        url: n.UPDATE_USER,
        method: "PUT"
      }
    }, {
      getTableList: {
        url: n.TABLE_LIST
      },
      getTable: {
        url: n.TABLE_DETAIL
      },
      getRecordList: {
        url: n.RECORD_LIST
      },
      queryRecordList: {
        url: n.QUERY_RECORD_LIST
      },
      getRecord: {
        url: n.RECORD_DETAIL
      },
      createRecord: {
        url: n.CREATE_RECORD,
        method: "POST"
      },
      createRecordList: {
        url: n.CREATE_RECORD_LIST,
        method: "POST"
      },
      updateRecord: {
        url: n.UPDATE_RECORD,
        method: "PUT"
      },
      updateRecordList: {
        url: n.UPDATE_RECORD_LIST,
        method: "PUT"
      },
      deleteRecord: {
        url: n.DELETE_RECORD,
        method: "DELETE"
      },
      deleteRecordList: {
        url: n.DELETE_RECORD_LIST,
        method: "DELETE"
      }
    }, {
      getContentList: {
        url: n.LAGECY_CONTENT_LIST
      },
      getContentListV2: {
        url: n.CONTENT_LIST
      },
      getContent: {
        url: n.CONTENT_DETAIL
      },
      getContentGroupList: {
        url: n.CONTENT_GROUP_LIST
      },
      getContentGroup: {
        url: n.CONTENT_GROUP_DETAIL
      },
      getContentCategoryList: {
        url: n.CONTENT_CATEGORY_LIST
      },
      getContentCategory: {
        url: n.CONTENT_CATEGORY_DETAIL
      }
    }, {
      getFileDetail: {
        url: n.FILE_DETAIL
      },
      getFileList: {
        url: n.FILE_LIST
      },
      deleteFile: {
        url: n.DELETE_FILE,
        method: "DELETE"
      },
      deleteFiles: {
        url: n.DELETE_FILES,
        method: "DELETE"
      },
      getFileCategoryDetail: {
        url: n.FILE_CATEGORY_DETAIL
      },
      getFileCategoryList: {
        url: n.FILE_CATEGORY_LIST
      },
      sendSmsCode: {
        url: n.SEND_SMS_CODE,
        method: "POST"
      },
      verifySmsCode: {
        url: n.VERIFY_SMS_CODE,
        method: "POST"
      }
    }, {
      getOrderList: {
        url: n.PAY
      }
    }];
    t.exports = {
      API_HOST: "https://api.myminapp.com",
      API: n,
      AUTH_PREFIX: "Hydrogen-r1",
      METHOD_MAP_LIST: r,
      DEBUG: !1,
      RANDOM_OPTION: {
        max: 100
      },
      REQUEST_PARAMS_MAP: {
        contentGroupID: "content_group_id",
        categoryID: "category_id",
        recordID: "id",
        submissionType: "submission_type",
        submissionValue: "submission_value",
        categoryName: "category_name",
        signatureID: "signature_id"
      },
      SDK_DOWNLOAD_PAGE: "https://doc.minapp.com/js-sdk/download-sdk.html",
      VERSION: "v2.0.1-a"
    };
  }, function (t, e, n) {
    t.exports = {
      getAPIHost: function getAPIHost() {
        var t = n(0);
        return t._config.API_HOST || "https://".concat(t._config.CLIENT_ID, ".myminapp.com");
      },
      SDK_TYPE: "file",
      CLIENT_PLATFORM: "UNKNOWN",
      checkLatestVersion: function checkLatestVersion() {
        return null;
      }
    };
  }, function (t, e, n) {
    var r = n(2),
        o = n(19),
        i = n(6),
        a = n(3),
        u = n(1);

    t.exports = function (t) {
      t.init = function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = n.autoLogin,
            o = void 0 !== r && r,
            i = n.logLevel,
            s = void 0 === i ? "" : i,
            c = n.host,
            f = void 0 === c ? "" : c,
            l = n.env;
        if (!u.isString(e)) throw new a(605);
        s && u.setLogLevel(s), t._config.AUTO_LOGIN = o, t._config.ENV = l, t._config.CLIENT_ID = e, t._config.API_HOST = f, t._config.LOG_LEVEL = s, t._polyfill.checkLatestVersion();
      }, t.getAuthToken = function () {
        return i.get(r.STORAGE_KEY.AUTH_TOKEN);
      }, t.checkVersion = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = e.platform,
            o = e.onSuccess,
            a = e.onError;
        o || (o = function o(e) {
          var o = e.statusCode || e.status;
          parseInt(o) !== r.STATUS_CODE.SUCCESS ? a && a(e) : -1 === u.compareVersion(t._config.VERSION, e.data[n]) && u.log(r.LOG_LEVEL.WARN, "【知晓云 SDK 更新提示】当前 SDK 版本为 ".concat(t._config.VERSION, " 最新版本为 ").concat(e.data[n], "，请前往 ").concat(t._config.SDK_DOWNLOAD_PAGE, " 下载。"));
        });
        var s = Date.now();
        return i.get(r.STORAGE_KEY.LATEST_VERSION_CHECK_MILLISECONDS).then(function (e) {
          if (!(e && e - s <= r.VERSION_MIN_CHECK_INTERVAL)) return i.set(r.STORAGE_KEY.LATEST_VERSION_CHECK_MILLISECONDS, s), t.request({
            url: t._config.API.LATEST_VERSION
          }).then(o, a);
        });
      }, t.clearSession = function () {
        return Promise.all([i.set(r.STORAGE_KEY.AUTH_TOKEN, ""), i.set(r.STORAGE_KEY.IS_LOGINED_BAAS, ""), i.set(r.STORAGE_KEY.IS_ANONYMOUS_USER, ""), i.set(r.STORAGE_KEY.USERINFO, ""), i.set(r.STORAGE_KEY.UID, "")]);
      }, t._createRequestMethod = function () {
        t._config.METHOD_MAP_LIST.map(function (t) {
          u.doCreateRequestMethod(t);
        });
      }, t.auth = n(22), t.ContentGroup = n(41), t.File = n(42), t.FileCategory = n(43), t.GeoPoint = n(9), t.GeoPolygon = n(13), t.invokeFunction = n(17), t.invoke = n(17), t.Query = n(5), t.storage = o, t.storageAsync = i, t.TableObject = n(44), t.User = n(16), t.Order = n(46), t.getAsyncJobResult = n(47), t.getServerDate = n(48);
    };
  }, function (t, e, n) {
    var r,
        o = n(2),
        i = n(6),
        a = n(11).log,
        u = function u() {
      return {
        invokeTimes: 1,
        timestamp: Date.now()
      };
    },
        s = function s(t) {
      return isNaN(t.invokeTimes) || isNaN(t.timestamp);
    };

    t.exports = function (t) {
      return function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            c = n.enableThrottle,
            f = void 0 !== c && c;
        if (!f) return t(e);
        var l = o.LOG_LEVEL,
            h = o.TICKET_REPORT_INVOKE_LIMIT,
            p = o.STORAGE_KEY,
            d = Date.now();
        return a(l.DEBUG, "<ticket-report> last: ".concat(r, ", now: ").concat(d)), r && d - r <= h.MIN_INTERVAL_PRE_TIME ? Promise.resolve() : i.get(p.REPORT_TICKET_INVOKE_RECORD).then(function (n) {
          var o = n && d - n.timestamp > h.TIMES_LIMIT.CYCLE;
          return a(l.DEBUG, "<ticket-report> record: ".concat(JSON.stringify(n), ", now: ").concat(d)), n && n.invokeTimes >= h.TIMES_LIMIT.MAX_TIMES_PER_CYCLE && !o ? Promise.resolve() : (!n || o || s(n) ? n = u() : n.invokeTimes += 1, t && "function" == typeof t ? (r = d, i.set(p.REPORT_TICKET_INVOKE_RECORD, n), t(e).then(function (t) {
            return a(l.DEBUG, "<ticket-report> invoke success ".concat(Date.now() - d, "ms")), t;
          }).catch(function (t) {
            throw n.invokeTimes -= 1, i.set(p.REPORT_TICKET_INVOKE_RECORD, n), a(l.DEBUG, "<ticket-report> invoke fail ".concat(Date.now() - d, "ms err: ").concat(t)), t;
          })) : (a(l.DEBUG, "<ticket-report> invoke fail"), void a(l.ERROR, new TypeError('"ticketReportFn" must be Function type'))));
        });
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(33),
        o = ["trace", "debug", "info", "warn", "error", "fatal"],
        i = function i() {};

    t.exports = function (t) {
      (t = t || {}).level = t.level || "info";
      var e = {};
      return o.forEach(function (n) {
        e[n] = function (e) {
          return o.indexOf(e) >= o.indexOf(t.level);
        }(n) ? function () {
          var e,
              o = t.prefix;
          if (t.stderr) e = "error";else switch (n) {
            case "trace":
            case "debug":
              e = "info";
              break;

            case "fatal":
              e = "error";
              break;

            default:
              e = n;
          }
          o && ("function" == typeof o && (o = o(n)), arguments[0] = r.format(o, arguments[0]));
          console[e](r.format.apply(r, arguments));
        } : i;
      }), e;
    };
  }, function (t, e, n) {
    (function (t) {
      var r = Object.getOwnPropertyDescriptors || function (t) {
        for (var e = Object.keys(t), n = {}, r = 0; r < e.length; r++) {
          n[e[r]] = Object.getOwnPropertyDescriptor(t, e[r]);
        }

        return n;
      },
          o = /%[sdj%]/g;

      e.format = function (t) {
        if (!g(t)) {
          for (var e = [], n = 0; n < arguments.length; n++) {
            e.push(u(arguments[n]));
          }

          return e.join(" ");
        }

        n = 1;

        for (var r = arguments, i = r.length, a = String(t).replace(o, function (t) {
          if ("%%" === t) return "%";
          if (n >= i) return t;

          switch (t) {
            case "%s":
              return String(r[n++]);

            case "%d":
              return Number(r[n++]);

            case "%j":
              try {
                return JSON.stringify(r[n++]);
              } catch (t) {
                return "[Circular]";
              }

            default:
              return t;
          }
        }), s = r[n]; n < i; s = r[++n]) {
          y(s) || !b(s) ? a += " " + s : a += " " + u(s);
        }

        return a;
      }, e.deprecate = function (n, r) {
        if (void 0 !== t && !0 === t.noDeprecation) return n;
        if (void 0 === t) return function () {
          return e.deprecate(n, r).apply(this, arguments);
        };
        var o = !1;
        return function () {
          if (!o) {
            if (t.throwDeprecation) throw new Error(r);
            t.traceDeprecation ? console.trace(r) : console.error(r), o = !0;
          }

          return n.apply(this, arguments);
        };
      };
      var i,
          a = {};

      function u(t, n) {
        var r = {
          seen: [],
          stylize: c
        };
        return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), d(n) ? r.showHidden = n : n && e._extend(r, n), v(r.showHidden) && (r.showHidden = !1), v(r.depth) && (r.depth = 2), v(r.colors) && (r.colors = !1), v(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = s), f(r, t, r.depth);
      }

      function s(t, e) {
        var n = u.styles[e];
        return n ? "[" + u.colors[n][0] + "m" + t + "[" + u.colors[n][1] + "m" : t;
      }

      function c(t, e) {
        return t;
      }

      function f(t, n, r) {
        if (t.customInspect && n && O(n.inspect) && n.inspect !== e.inspect && (!n.constructor || n.constructor.prototype !== n)) {
          var o = n.inspect(r, t);
          return g(o) || (o = f(t, o, r)), o;
        }

        var i = function (t, e) {
          if (v(e)) return t.stylize("undefined", "undefined");

          if (g(e)) {
            var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return t.stylize(n, "string");
          }

          if (_(e)) return t.stylize("" + e, "number");
          if (d(e)) return t.stylize("" + e, "boolean");
          if (y(e)) return t.stylize("null", "null");
        }(t, n);

        if (i) return i;

        var a = Object.keys(n),
            u = function (t) {
          var e = {};
          return t.forEach(function (t, n) {
            e[t] = !0;
          }), e;
        }(a);

        if (t.showHidden && (a = Object.getOwnPropertyNames(n)), w(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return l(n);

        if (0 === a.length) {
          if (O(n)) {
            var s = n.name ? ": " + n.name : "";
            return t.stylize("[Function" + s + "]", "special");
          }

          if (E(n)) return t.stylize(RegExp.prototype.toString.call(n), "regexp");
          if (m(n)) return t.stylize(Date.prototype.toString.call(n), "date");
          if (w(n)) return l(n);
        }

        var c,
            b = "",
            T = !1,
            S = ["{", "}"];
        (p(n) && (T = !0, S = ["[", "]"]), O(n)) && (b = " [Function" + (n.name ? ": " + n.name : "") + "]");
        return E(n) && (b = " " + RegExp.prototype.toString.call(n)), m(n) && (b = " " + Date.prototype.toUTCString.call(n)), w(n) && (b = " " + l(n)), 0 !== a.length || T && 0 != n.length ? r < 0 ? E(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(n), c = T ? function (t, e, n, r, o) {
          for (var i = [], a = 0, u = e.length; a < u; ++a) {
            P(e, String(a)) ? i.push(h(t, e, n, r, String(a), !0)) : i.push("");
          }

          return o.forEach(function (o) {
            o.match(/^\d+$/) || i.push(h(t, e, n, r, o, !0));
          }), i;
        }(t, n, r, u, a) : a.map(function (e) {
          return h(t, n, r, u, e, T);
        }), t.seen.pop(), function (t, e, n) {
          if (t.reduce(function (t, e) {
            return e.indexOf("\n") >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0) > 60) return n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1];
          return n[0] + e + " " + t.join(", ") + " " + n[1];
        }(c, b, S)) : S[0] + b + S[1];
      }

      function l(t) {
        return "[" + Error.prototype.toString.call(t) + "]";
      }

      function h(t, e, n, r, o, i) {
        var a, u, s;

        if ((s = Object.getOwnPropertyDescriptor(e, o) || {
          value: e[o]
        }).get ? u = s.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : s.set && (u = t.stylize("[Setter]", "special")), P(r, o) || (a = "[" + o + "]"), u || (t.seen.indexOf(s.value) < 0 ? (u = y(n) ? f(t, s.value, null) : f(t, s.value, n - 1)).indexOf("\n") > -1 && (u = i ? u.split("\n").map(function (t) {
          return "  " + t;
        }).join("\n").substr(2) : "\n" + u.split("\n").map(function (t) {
          return "   " + t;
        }).join("\n")) : u = t.stylize("[Circular]", "special")), v(a)) {
          if (i && o.match(/^\d+$/)) return u;
          (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"));
        }

        return a + ": " + u;
      }

      function p(t) {
        return Array.isArray(t);
      }

      function d(t) {
        return "boolean" == typeof t;
      }

      function y(t) {
        return null === t;
      }

      function _(t) {
        return "number" == typeof t;
      }

      function g(t) {
        return "string" == typeof t;
      }

      function v(t) {
        return void 0 === t;
      }

      function E(t) {
        return b(t) && "[object RegExp]" === T(t);
      }

      function b(t) {
        return "object" == _typeof(t) && null !== t;
      }

      function m(t) {
        return b(t) && "[object Date]" === T(t);
      }

      function w(t) {
        return b(t) && ("[object Error]" === T(t) || t instanceof Error);
      }

      function O(t) {
        return "function" == typeof t;
      }

      function T(t) {
        return Object.prototype.toString.call(t);
      }

      function S(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10);
      }

      e.debuglog = function (n) {
        if (v(i) && (i = t.env.NODE_DEBUG || ""), n = n.toUpperCase(), !a[n]) if (new RegExp("\\b" + n + "\\b", "i").test(i)) {
          var r = t.pid;

          a[n] = function () {
            var t = e.format.apply(e, arguments);
            console.error("%s %d: %s", n, r, t);
          };
        } else a[n] = function () {};
        return a[n];
      }, e.inspect = u, u.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
      }, u.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
      }, e.isArray = p, e.isBoolean = d, e.isNull = y, e.isNullOrUndefined = function (t) {
        return null == t;
      }, e.isNumber = _, e.isString = g, e.isSymbol = function (t) {
        return "symbol" == _typeof(t);
      }, e.isUndefined = v, e.isRegExp = E, e.isObject = b, e.isDate = m, e.isError = w, e.isFunction = O, e.isPrimitive = function (t) {
        return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == _typeof(t) || void 0 === t;
      }, e.isBuffer = n(34);
      var A = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      function I() {
        var t = new Date(),
            e = [S(t.getHours()), S(t.getMinutes()), S(t.getSeconds())].join(":");
        return [t.getDate(), A[t.getMonth()], e].join(" ");
      }

      function P(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }

      e.log = function () {
        console.log("%s - %s", I(), e.format.apply(e, arguments));
      }, e.inherits = n(35), e._extend = function (t, e) {
        if (!e || !b(e)) return t;

        for (var n = Object.keys(e), r = n.length; r--;) {
          t[n[r]] = e[n[r]];
        }

        return t;
      };
      var R = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;

      function D(t, e) {
        if (!t) {
          var n = new Error("Promise was rejected with a falsy value");
          n.reason = t, t = n;
        }

        return e(t);
      }

      e.promisify = function (t) {
        if ("function" != typeof t) throw new TypeError('The "original" argument must be of type Function');

        if (R && t[R]) {
          var e;
          if ("function" != typeof (e = t[R])) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
          return Object.defineProperty(e, R, {
            value: e,
            enumerable: !1,
            writable: !1,
            configurable: !0
          }), e;
        }

        function e() {
          for (var e, n, r = new Promise(function (t, r) {
            e = t, n = r;
          }), o = [], i = 0; i < arguments.length; i++) {
            o.push(arguments[i]);
          }

          o.push(function (t, r) {
            t ? n(t) : e(r);
          });

          try {
            t.apply(this, o);
          } catch (t) {
            n(t);
          }

          return r;
        }

        return Object.setPrototypeOf(e, Object.getPrototypeOf(t)), R && Object.defineProperty(e, R, {
          value: e,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), Object.defineProperties(e, r(t));
      }, e.promisify.custom = R, e.callbackify = function (e) {
        if ("function" != typeof e) throw new TypeError('The "original" argument must be of type Function');

        function n() {
          for (var n = [], r = 0; r < arguments.length; r++) {
            n.push(arguments[r]);
          }

          var o = n.pop();
          if ("function" != typeof o) throw new TypeError("The last argument must be of type Function");

          var i = this,
              a = function a() {
            return o.apply(i, arguments);
          };

          e.apply(this, n).then(function (e) {
            t.nextTick(a, null, e);
          }, function (e) {
            t.nextTick(D, e, a);
          });
        }

        return Object.setPrototypeOf(n, Object.getPrototypeOf(e)), Object.defineProperties(n, r(e)), n;
      };
    }).call(this, n(25));
  }, function (t, e) {
    t.exports = function (t) {
      return t && "object" == _typeof(t) && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8;
    };
  }, function (t, e) {
    "function" == typeof Object.create ? t.exports = function (t, e) {
      t.super_ = e, t.prototype = Object.create(e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
    } : t.exports = function (t, e) {
      t.super_ = e;

      var n = function n() {};

      n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
    };
  }, function (t, e, n) {
    var r = n(2);

    t.exports = function (t, e) {
      return null != t ? t : e ? r.QUERY_LIMITATION_DEFAULT : void 0;
    };
  }, function (t, e, n) {
    function r() {
      return (r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    var o = n(2),
        i = function i(t, e) {
      return (e ? Promise.resolve(e) : t.storageAsync.get(o.STORAGE_KEY.UID)).then(function (e) {
        return t._config.API.USER_DETAIL.replace(/:userID/, e);
      });
    };

    t.exports = function (t, e, n) {
      return i(t, n).then(function (n) {
        return (e.url === n ? i(t) : Promise.resolve(e.url)).then(function (t) {
          return r({}, e, {
            url: t
          });
        });
      });
    };
  }, function (t, e, n) {
    var r = n(2),
        o = n(11).log,
        i = function i(t, e) {
      return !!t && (!e || ("[object RegExp]" === Object.prototype.toString.call(e) ? e.test(t.message) : t.message === e));
    };

    t.exports = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = e.context,
          a = void 0 === n ? {} : n,
          u = e.maxCount,
          s = void 0 === u ? 10 : u,
          c = e.matchMessage;
      return function () {
        for (var e = arguments.length, n = new Array(e), u = 0; u < e; u++) {
          n[u] = arguments[u];
        }

        var f = s,
            l = function e() {
          var u = function u(n) {
            if (i(n, c) && f > 1) return o(r.LOG_LEVEL.DEBUG, '<withRetry> "'.concat(t.name, '" called fail, remaindCount: ').concat(f, ", err: ").concat(n)), f -= 1, e();
            throw n;
          };

          try {
            var s = t.apply(a, n);
            return "[object Promise]" === Object.prototype.toString.call(s) ? s.catch(u) : s;
          } catch (t) {
            return u(t);
          }
        };

        return l();
      };
    };
  }, function (t, e) {
    t.exports = function () {
      return "undefined" == typeof tt ? "" : tt.getSystemInfoSync().appName.toLowerCase();
    };
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var c = n(12),
        f = n(0),
        l = n(3),
        h = n(1),
        p = n(2).USER_PROFILE_BUILD_IN_FIELDS,
        d = f._config.API,
        y = function (t) {
      function e(t) {
        var n;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), n = a(this, u(e).call(this)), h.isObject(t) ? (n.initAttribute(t), n) : a(n, new l(605));
      }

      var n, r, c;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && s(t, e);
      }(e, t), n = e, (r = [{
        key: "initAttribute",
        value: function value(t) {
          var e = this;
          this._attribute = o({}, t), Object.keys(t).forEach(function (n) {
            ("_" === n[0] || p.includes(n)) && (e[n] = t[n]);
          });
        }
      }, {
        key: "toJSON",
        value: function value() {
          return this._attribute;
        }
      }, {
        key: "get",
        value: function value(t) {
          return this._attribute[t];
        }
      }, {
        key: "linkWechat",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkWechat ? f._polyfill.linkWechat.apply(null, arguments) : Promise.reject(new l(605, "linkWechat 方法未定义"));
        }
      }, {
        key: "linkAlipay",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkAlipay ? f._polyfill.linkAlipay.apply(null, arguments) : Promise.reject(new l(605, "linkAlipay 方法未定义"));
        }
      }, {
        key: "linkQQ",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkQQ ? f._polyfill.linkQQ.apply(null, arguments) : Promise.reject(new l(605, "linkQQ 方法未定义"));
        }
      }, {
        key: "linkBaidu",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkBaidu ? f._polyfill.linkBaidu.apply(null, arguments) : Promise.reject(new l(605, "linkBaidu 方法未定义"));
        }
      }, {
        key: "linkTt",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkTt ? f._polyfill.linkTt.apply(null, arguments) : Promise.reject(new l(605, "linkTt 方法未定义"));
        }
      }, {
        key: "linkThirdParty",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkThirdParty ? f._polyfill.linkThirdParty.apply(null, arguments) : Promise.reject(new l(605, "linkThirdParty 方法未定义"));
        }
      }, {
        key: "linkThirdPartyWithAuthData",
        value: function value() {
          return this._anonymous ? Promise.reject(new l(612)) : f._polyfill.linkThirdPartyWithAuthData ? f._polyfill.linkThirdPartyWithAuthData.apply(null, arguments) : Promise.reject(new l(605, "linkThirdPartyWithAuthData 方法未定义"));
        }
      }, {
        key: "updatePassword",
        value: function value(t) {
          var e = this,
              n = t.password,
              r = t.newPassword;
          return this._anonymous ? Promise.reject(new l(612)) : f._baasRequest({
            url: d.ACCOUNT_INFO,
            method: "PUT",
            data: {
              password: n,
              new_password: r
            }
          }).then(function () {
            return e;
          });
        }
      }, {
        key: "setEmail",
        value: function value(t) {
          var e = this,
              n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = n.sendVerificationEmail,
              o = void 0 !== r && r;
          return this._anonymous ? Promise.reject(new l(612)) : f._baasRequest({
            url: d.ACCOUNT_INFO,
            method: "PUT",
            data: {
              email: t
            }
          }).then(function (n) {
            return o && e.requestEmailVerification(t), e.initAttribute(n.data), e;
          });
        }
      }, {
        key: "setUsername",
        value: function value(t) {
          var e = this;
          return this._anonymous ? Promise.reject(new l(612)) : f._baasRequest({
            url: d.ACCOUNT_INFO,
            method: "PUT",
            data: {
              username: t
            }
          }).then(function (t) {
            return e.initAttribute(t.data), e;
          });
        }
      }, {
        key: "requestEmailVerification",
        value: function value() {
          var t = this;
          return this._anonymous ? Promise.reject(new l(612)) : f._baasRequest({
            url: d.EMAIL_VERIFY,
            method: "POST"
          }).then(function () {
            return t;
          });
        }
      }, {
        key: "setAccount",
        value: function value() {
          var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this._anonymous ? Promise.reject(new l(612)) : (e.password && (e.new_password = e.password, delete e.password), f._baasRequest({
            url: d.ACCOUNT_INFO,
            method: "PUT",
            data: e
          }).then(function (e) {
            return t.initAttribute(e.data), t;
          }));
        }
      }, {
        key: "setMobilePhone",
        value: function value(t) {
          var e = this;
          return this._anonymous ? Promise.reject(new l(612)) : f._baasRequest({
            url: d.ACCOUNT_INFO,
            method: "PUT",
            data: {
              phone: t
            }
          }).then(function (t) {
            return e.initAttribute(t.data), e;
          });
        }
      }, {
        key: "verifyMobilePhone",
        value: function value(t) {
          var e = this;
          return this._anonymous ? Promise.reject(new l(612)) : f._baasRequest({
            url: d.VERIFY_MOBILE,
            method: "POST",
            data: {
              code: t
            }
          }).then(function () {
            return e;
          });
        }
      }]) && i(n.prototype, r), c && i(n, c), e;
    }(c);

    t.exports = y;
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var c = n(0),
        f = n(4),
        l = n(5),
        h = function (t) {
      function e(t) {
        var n;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), (n = a(this, u(e).call(this)))._contentGroupID = t, n;
      }

      var n, r, f;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && s(t, e);
      }(e, t), n = e, f = [{
        key: "get",
        value: function value(t) {
          return c.getContentGroup({
            contentGroupID: t
          });
        }
      }, {
        key: "find",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.offset,
              n = void 0 === e ? 0 : e,
              r = t.limit,
              o = void 0 === r ? 20 : r,
              i = t.withCount,
              a = void 0 !== i && i;
          return c.getContentGroupList({
            offset: n,
            limit: o,
            return_total_count: a ? 1 : 0
          });
        }
      }], (r = [{
        key: "getContent",
        value: function value(t) {
          var e = {
            richTextID: t
          };
          return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), c.getContent(e);
        }
      }, {
        key: "find",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.withCount,
              n = void 0 !== e && e,
              r = this._handleAllQueryConditions();

          return r.contentGroupID = this._contentGroupID, this._initQueryParams(), c.getContentListV2(o({}, r, {
            return_total_count: n ? 1 : 0
          }));
        }
      }, {
        key: "count",
        value: function value() {
          return this.limit(1).find({
            withCount: !0
          }).then(function (t) {
            return t.data.meta.total_count;
          });
        }
      }, {
        key: "getCategoryList",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.withCount,
              n = void 0 !== e && e;
          return c.getContentCategoryList({
            contentGroupID: this._contentGroupID,
            limit: 100,
            return_total_count: n ? 1 : 0
          });
        }
      }, {
        key: "getCategory",
        value: function value(t) {
          var e = new l();
          return e.compare("group_id", "=", this._contentGroupID), c.getContentCategory({
            categoryID: t,
            where: JSON.stringify(e.queryObject)
          });
        }
      }]) && i(n.prototype, r), f && i(n, f), e;
    }(f);

    t.exports = h;
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var c = n(0),
        f = n(4),
        l = c._config.API,
        h = function (t) {
      function e() {
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), a(this, u(e).call(this));
      }

      var n, r, f;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && s(t, e);
      }(e, t), n = e, (r = [{
        key: "upload",
        value: function value(t, e) {
          return c.uploadFile(t, e, "json");
        }
      }, {
        key: "delete",
        value: function value(t) {
          return t instanceof Array ? c.deleteFiles({
            id__in: t
          }) : c.deleteFile({
            fileID: t
          });
        }
      }, {
        key: "get",
        value: function value(t) {
          return c.getFileDetail({
            fileID: t
          });
        }
      }, {
        key: "find",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.withCount,
              n = void 0 !== e && e,
              r = this._handleAllQueryConditions();

          return this._initQueryParams(), c.getFileList(o({}, r, {
            return_total_count: n ? 1 : 0
          }));
        }
      }, {
        key: "count",
        value: function value() {
          return this.limit(1).find({
            withCount: !0
          }).then(function (t) {
            return t.data.meta.total_count;
          });
        }
      }, {
        key: "genVideoSnapshot",
        value: function value(t) {
          return c._baasRequest({
            url: l.VIDEO_SNAPSHOT,
            method: "POST",
            data: t
          }).then(function (t) {
            return t.data;
          });
        }
      }, {
        key: "videoConcat",
        value: function value(t) {
          return c._baasRequest({
            url: l.M3U8_CONCAT,
            method: "POST",
            data: t
          }).then(function (t) {
            return t.data;
          });
        }
      }, {
        key: "videoClip",
        value: function value(t) {
          return c._baasRequest({
            url: l.M3U8_CLIP,
            method: "POST",
            data: t
          }).then(function (t) {
            return t.data;
          });
        }
      }, {
        key: "videoMeta",
        value: function value(t) {
          return c._baasRequest({
            url: l.M3U8_META,
            method: "POST",
            data: t
          }).then(function (t) {
            return t.data;
          });
        }
      }, {
        key: "videoAudioMeta",
        value: function value(t) {
          return c._baasRequest({
            url: l.VIDEO_AUDIO_META,
            method: "POST",
            data: t
          }).then(function (t) {
            return t.data;
          });
        }
      }]) && i(n.prototype, r), f && i(n, f), e;
    }(f);

    t.exports = h;
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var c = n(0),
        f = n(4),
        l = n(5),
        h = function (t) {
      function e() {
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), a(this, u(e).call(this));
      }

      var n, r, f;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && s(t, e);
      }(e, t), n = e, (r = [{
        key: "get",
        value: function value(t) {
          return c.getFileCategoryDetail({
            categoryID: t
          });
        }
      }, {
        key: "getFileList",
        value: function value(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = e.withCount,
              r = void 0 !== n && n,
              o = new l();
          return o.in("category_id", [t]), c.getFileList({
            where: JSON.stringify(o.queryObject),
            return_total_count: r ? 1 : 0
          });
        }
      }, {
        key: "find",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.withCount,
              n = void 0 !== e && e,
              r = this._handleAllQueryConditions();

          return this._initQueryParams(), c.getFileCategoryList(o({}, r, {
            return_total_count: n ? 1 : 0
          }));
        }
      }, {
        key: "count",
        value: function value() {
          return this.limit(1).find({
            withCount: !0
          }).then(function (t) {
            return t.data.meta.total_count;
          });
        }
      }]) && i(n.prototype, r), f && i(n, f), e;
    }(f);

    t.exports = h;
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t, e, n) {
      return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
        var r = function (t, e) {
          for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = s(t));) {
            ;
          }

          return t;
        }(t, e);

        if (r) {
          var o = Object.getOwnPropertyDescriptor(r, e);
          return o.get ? o.get.call(n) : o.value;
        }
      })(t, e, n || t);
    }

    function s(t) {
      return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function c(t, e) {
      return (c = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var f = n(0),
        l = n(4),
        h = n(3),
        p = n(5),
        d = n(45),
        y = n(1),
        _ = n(8),
        g = function (t) {
      function e(t) {
        var n;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), (n = a(this, s(e).call(this)))._tableID = t, n;
      }

      var n, r, l;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && c(t, e);
      }(e, t), n = e, (r = [{
        key: "create",
        value: function value() {
          return new d(this._tableID);
        }
      }, {
        key: "createMany",
        value: function value(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = e.enableTrigger,
              r = void 0 === n || n,
              o = _._serializeValueFuncFactory(["BaseRecord"]);

          if (y.isArray(t)) {
            var i = {
              tableID: this._tableID,
              data: t.map(function (t) {
                return Object.keys(t).forEach(function (e) {
                  t[e] = o(t[e]);
                }), t;
              }),
              enable_trigger: r ? 1 : 0
            };
            return f.createRecordList(i);
          }

          throw new h(605);
        }
      }, {
        key: "delete",
        value: function value(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = e.enableTrigger,
              r = void 0 === n || n,
              o = e.withCount,
              i = void 0 !== o && o;
          if (y.isString(t) || Number.isInteger(t)) return f.deleteRecord({
            tableID: this._tableID,
            recordID: t
          });

          if (t instanceof p) {
            var a = {
              tableID: this._tableID,
              limit: y.getLimitationWithEnableTigger(this._limit, r),
              offset: this._offset,
              where: JSON.stringify(t.queryObject),
              enable_trigger: r ? 1 : 0,
              return_total_count: i ? 1 : 0
            };
            return this._initQueryParams(), f.deleteRecordList(a);
          }

          throw new h(605);
        }
      }, {
        key: "getWithoutData",
        value: function value(t) {
          if (y.isString(t) || Number.isInteger(t)) return new d(this._tableID, t);

          if (t instanceof p) {
            var e = {};
            return e.limit = this._limit, e.offset = this._offset, e.where = y.cloneDeep(t.queryObject), this._initQueryParams(), new d(this._tableID, null, e);
          }

          throw new h(605);
        }
      }, {
        key: "get",
        value: function value(t) {
          var e = {
            tableID: this._tableID,
            recordID: t
          };
          return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), f.getRecord(e);
        }
      }, {
        key: "_handleAllQueryConditions",
        value: function value() {
          var t = u(s(e.prototype), "_handleAllQueryConditions", this).call(this);
          return t.tableID = this._tableID, t;
        }
      }, {
        key: "find",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.withCount,
              n = void 0 !== e && e,
              r = this._handleAllQueryConditions();

          return this._initQueryParams(), f.queryRecordList(o({}, r, {
            return_total_count: n ? 1 : 0
          }));
        }
      }, {
        key: "count",
        value: function value() {
          return this.limit(1).find({
            withCount: !0
          }).then(function (t) {
            return t.data.meta.total_count;
          });
        }
      }]) && i(n.prototype, r), l && i(n, l), e;
    }(l);

    t.exports = g;
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var s = n(0),
        c = n(8),
        f = n(1),
        l = function (t) {
      function e(t, n) {
        var r,
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), (r = i(this, a(e).call(this, n)))._tableID = t, r._queryObject = o, r;
      }

      var n, r, c;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && u(t, e);
      }(e, t), n = e, (r = [{
        key: "save",
        value: function value() {
          var t = f.cloneDeep(this._record);
          return this._recordValueInit(), s.createRecord({
            tableID: this._tableID,
            data: t.$set
          });
        }
      }, {
        key: "update",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.enableTrigger,
              n = void 0 === e || e,
              r = t.withCount,
              o = void 0 !== r && r,
              i = f.cloneDeep(this._record);
          if (this._recordValueInit(), this._recordID) return s.updateRecord({
            tableID: this._tableID,
            recordID: this._recordID,
            data: i
          });
          var a = {
            tableID: this._tableID,
            data: i,
            where: JSON.stringify(this._queryObject.where),
            limit: f.getLimitationWithEnableTigger(this._queryObject.limit, n),
            offset: this._queryObject.offset,
            enable_trigger: n ? 1 : 0,
            return_total_count: o ? 1 : 0
          };
          return this._queryObject = {}, s.updateRecordList(a);
        }
      }]) && o(n.prototype, r), c && o(n, c), e;
    }(c);

    t.exports = l;
  }, function (t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    function o() {
      return (o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    function a(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(t) : e;
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t;
      })(t, e);
    }

    var c = n(0),
        f = n(1),
        l = function (t) {
      function e() {
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), a(this, u(e).apply(this, arguments));
      }

      var n, r, l;
      return function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), e && s(t, e);
      }(e, t), n = e, (r = [{
        key: "get",
        value: function value(t) {
          var e = c._config.API,
              n = f.format(e.ORDER, {
            transactionID: t
          });
          return c._baasRequest({
            url: n
          });
        }
      }, {
        key: "getOrderList",
        value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = o({}, this._handleAllQueryConditions(), t);
          return this._initQueryParams(), c.getOrderList(o(e, t));
        }
      }]) && i(n.prototype, r), l && i(n, l), e;
    }(n(4));

    t.exports = l;
  }, function (t, e, n) {
    var r = n(0),
        o = n(1),
        i = r._config.API;

    t.exports = function (t) {
      return r._baasRequest({
        url: o.format(i.GET_ASYNC_JOB_RESULT, {
          id: t
        })
      });
    };
  }, function (t, e, n) {
    var r = n(0),
        o = r._config.API;

    t.exports = function () {
      return r._baasRequest({
        url: o.SERVER_TIME
      });
    };
  }, function (t, e, n) {
    var r = n(0),
        o = n(2),
        i = n(1);
    t.exports = {
      getUploadFileConfig: function getUploadFileConfig(t, e) {
        return e.filename = t, r._baasRequest({
          url: r._polyfill.getAPIHost().replace(/\/$/, "") + "/" + r._config.API.UPLOAD.replace(/^\//, ""),
          method: "POST",
          data: e
        });
      },
      getUploadHeaders: function getUploadHeaders() {
        return r.getAuthToken().then(function (t) {
          return {
            Authorization: o.UPLOAD.HEADER_AUTH_VALUE + t,
            "X-Hydrogen-Client-Version": r._config.VERSION,
            "X-Hydrogen-Client-Platform": i.getSysPlatform(),
            "X-Hydrogen-Client-ID": r._config.CLIENT_ID,
            "User-Agent": o.UPLOAD.UA
          };
        });
      }
    };
  },,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function (t, e, n) {
    var r = n(0),
        o = n(30),
        i = n(119),
        a = n(120),
        u = n(121),
        s = n(122),
        c = n(123);
    r._config.VERSION = "v3.13.0-beta.2", r.use(o), r.use(a), r.use(i), r.use(u), r.use(s), r.use(c), r.pay = n(124), r.order = n(125), r.request = n(126), r._baasRequest = n(127), r.uploadFile = n(128), r.getWXACode = n(129), r.wxDecryptData = n(130), r.wxReportTicket = n(131), r.ErrorTracker = n(132), r._createRequestMethod(), "undefined" != typeof wx && (wx.BaaS = r), t.exports = r;
  }, function (t, e, n) {
    function r() {
      return (r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function o(t, e) {
      return function (t) {
        if (Array.isArray(t)) return t;
      }(t) || function (t, e) {
        var n = [],
            r = !0,
            o = !1,
            i = void 0;

        try {
          for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0) {
            ;
          }
        } catch (t) {
          o = !0, i = t;
        } finally {
          try {
            r || null == u.return || u.return();
          } finally {
            if (o) throw i;
          }
        }

        return n;
      }(t, e) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }

    var i = n(2),
        a = n(3),
        u = n(6),
        s = n(1),
        c = n(22);

    t.exports = function (t) {
      var e = t._polyfill,
          n = t._config.API,
          f = function f() {
        return new Promise(function (n, r) {
          e.wxLogin({
            success: function success(t) {
              n(t.code);
            },
            fail: function fail() {
              t.request.wxRequestFail(r);
            }
          });
        });
      },
          l = function l() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.createUser,
            n = void 0 === e || e,
            r = t.withUnionID,
            o = void 0 !== r && r;
        return new Promise(function (t, e) {
          f().then(function (r) {
            h({
              code: r,
              createUser: n,
              withUnionID: o
            }, t, e);
          }, e);
        });
      },
          h = function h(e, r, o) {
        var i = e.code,
            a = e.createUser,
            u = e.withUnionID;
        return t.request({
          url: n.WECHAT.SILENT_LOGIN,
          method: "POST",
          data: {
            create_user: a,
            code: i,
            login_with_unionid: u
          }
        }).then(s.validateStatusCode).then(function (e) {
          t._polyfill.handleLoginSuccess(e), r(e);
        }, o);
      },
          p = s.rateLimit(function () {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
          e[n] = arguments[n];
        }

        return Promise.all([u.get(i.STORAGE_KEY.AUTH_TOKEN), s.isSessionExpired()]).then(function (t) {
          var n = o(t, 2),
              r = n[0],
              i = n[1];
          if (!r || i) return l.apply(void 0, e);
        });
      }),
          d = function d(e) {
        if (!e || !e.detail) throw new a(603);
        var n = e.detail,
            c = !!e.createUser,
            l = e.syncUserProfile,
            h = e.withUnionID;
        return n.userInfo ? f().then(function (t) {
          return _({
            lang: n.userInfo.language
          }).then(function (e) {
            var n = {
              code: t,
              create_user: c,
              rawData: e.rawData,
              signature: e.signature,
              encryptedData: e.encryptedData,
              login_with_unionid: h,
              iv: e.iv,
              update_userprofile: s.getUpdateUserProfileParam(l)
            };
            return y(n);
          });
        }).then(function (e) {
          var r = n.userInfo;
          r.id = e.data.user_id, r.openid = e.data.openid, r.unionid = e.data.unionid, t._polyfill.handleLoginSuccess(e, !1, r);
        }) : Promise.all([u.get(i.STORAGE_KEY.UID), u.get(i.STORAGE_KEY.OPENID), u.get(i.STORAGE_KEY.UNIONID)]).then(function (t) {
          var e = o(t, 3),
              n = e[0],
              i = e[1],
              u = e[2];
          return Promise.reject(r(new a(603), {
            id: n,
            openid: i,
            unionid: u
          }));
        });
      },
          y = function y(e) {
        return t.request({
          url: n.WECHAT.AUTHENTICATE,
          method: "POST",
          data: e
        }).then(s.validateStatusCode);
      },
          _ = function _() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = e.lang;
        return new Promise(function (e, r) {
          t._polyfill.wxGetUserInfo({
            lang: n,
            success: e,
            fail: r
          });
        });
      };

      r(t.auth, {
        silentLogin: p,
        loginWithWechat: s.rateLimit(function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = e.createUser,
              o = void 0 === n || n,
              a = e.withUnionID,
              u = void 0 !== a && a,
              s = e.syncUserProfile,
              f = void 0 === s ? i.UPDATE_USERPROFILE_VALUE.SETNX : s;
          return (t && t.detail ? d(r(t, {
            createUser: o,
            syncUserProfile: f,
            withUnionID: u
          })) : p({
            createUser: o,
            withUnionID: u
          })).then(function () {
            return c.getCurrentUser();
          });
        }),
        handleUserInfo: s.rateLimit(d),
        linkWechat: s.rateLimit(function (e) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              o = r.syncUserProfile,
              a = void 0 === o ? i.UPDATE_USERPROFILE_VALUE.SETNX : o,
              u = r.withUnionID,
              c = void 0 !== u && u,
              l = !1;
          return e && e.detail && e.detail.userInfo && (l = !0), f().then(function (r) {
            return (l ? _({
              lang: e.detail.userInfo.language
            }) : Promise.resolve(null)).then(function (e) {
              var o = e ? {
                rawData: e.rawData,
                signature: e.signature,
                encryptedData: e.encryptedData,
                iv: e.iv,
                update_userprofile: s.getUpdateUserProfileParam(a),
                associate_with_unionid: c,
                code: r
              } : {
                code: r,
                associate_with_unionid: c
              };
              return t._baasRequest({
                method: "POST",
                url: n.WECHAT.USER_ASSOCIATE,
                data: o
              });
            });
          });
        })
      }), t.login = function (t) {
        return !1 === t ? p().then(function () {
          return Promise.all([u.get(i.STORAGE_KEY.UID), u.get(i.STORAGE_KEY.OPENID), u.get(i.STORAGE_KEY.UNIONID), u.get(i.STORAGE_KEY.EXPIRES_AT)]).then(function (t) {
            var e,
                n,
                r,
                a = o(t, 4),
                u = a[0],
                s = a[1],
                c = a[2],
                f = a[3];
            return e = {
              id: u,
              openid: s,
              unionid: c
            }, n = i.STORAGE_KEY.EXPIRES_AT, r = f, n in e ? Object.defineProperty(e, n, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : e[n] = r, e;
          });
        }) : Promise.reject(new a(605));
      }, t.handleUserInfo = function (e) {
        return t.auth.handleUserInfo(e).then(function () {
          return c.getCurrentUser();
        }).then(function (t) {
          return t.toJSON();
        });
      }, t.logout = t.auth.logout;
    };
  }, function (t, e, n) {
    function r() {
      return (r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    var o = n(27),
        i = n(2),
        a = n(1);

    t.exports = function (t) {
      r(t._polyfill, {
        wxLogin: function wxLogin() {
          var t;
          return (t = wx).login.apply(t, arguments);
        },
        wxGetUserInfo: function wxGetUserInfo() {
          var t;
          return (t = wx).getUserInfo.apply(t, arguments);
        },
        wxPaymentRequest: function wxPaymentRequest() {
          var t;
          return (t = wx).requestPayment.apply(t, arguments);
        },
        CLIENT_PLATFORM: "WECHAT",
        setStorageSync: function setStorageSync(t, e) {
          return a.withRetry(wx.setStorageSync)(t, e);
        },
        getStorageSync: function getStorageSync(t) {
          return a.withRetry(wx.getStorageSync)(t);
        },
        setStorageAsync: function setStorageAsync(t, e) {
          return new Promise(function (n, r) {
            wx.setStorage({
              key: t,
              data: e,
              success: n,
              fail: r
            });
          });
        },
        getStorageAsync: function getStorageAsync(t) {
          return new Promise(function (e) {
            wx.getStorage({
              key: t,
              success: function success(t) {
                return e(t.data);
              },
              fail: function fail() {
                return e(void 0);
              }
            });
          });
        },
        getSystemInfoSync: function getSystemInfoSync() {
          return wx.getSystemInfoSync();
        },
        linkWechat: function linkWechat() {
          var e;
          return (e = t.auth).linkWechat.apply(e, arguments);
        },
        checkLatestVersion: function checkLatestVersion() {
          "devtools" === wx.getSystemInfoSync().platform && t.checkVersion({
            platform: i.PLATFORM.WECHAT
          });
        },
        handleLoginSuccess: function handleLoginSuccess(e, n, a) {
          t.storage.set(i.STORAGE_KEY.UID, e.data.user_id), t.storage.set(i.STORAGE_KEY.OPENID, e.data.openid || ""), t.storage.set(i.STORAGE_KEY.UNIONID, e.data.unionid || ""), t.storage.set(i.STORAGE_KEY.AUTH_TOKEN, e.data.token), e.data.openid && t.storage.set(i.STORAGE_KEY.USERINFO, r({}, t.storage.get(i.STORAGE_KEY.USERINFO), a || {
            id: e.data.user_id,
            openid: e.data.openid,
            unionid: e.data.unionid
          })), t.storage.set(i.STORAGE_KEY.EXPIRES_AT, Math.floor(Date.now() / 1e3) + e.data.expires_in - 30), n ? t.storage.set(i.STORAGE_KEY.IS_ANONYMOUS_USER, 1) : (t.storage.set(i.STORAGE_KEY.IS_ANONYMOUS_USER, 0), o.reportStats());
        }
      });
    };
  }, function (t, e, n) {
    var r = n(2),
        o = n(3),
        i = n(1);

    t.exports = function (t) {
      t.wxCensorImage = function (e) {
        return t.getAuthToken().then(function (n) {
          return new Promise(function (o, a) {
            wx.uploadFile({
              url: t._polyfill.getAPIHost() + t._config.API.WECHAT.CENSOR_IMAGE,
              filePath: e,
              name: r.UPLOAD.UPLOAD_FILE_KEY,
              header: {
                Authorization: r.UPLOAD.HEADER_AUTH_VALUE + n,
                "X-Hydrogen-Client-Version": t._config.VERSION,
                "X-Hydrogen-Client-Platform": i.getSysPlatform(),
                "X-Hydrogen-Client-ID": t._config.CLIENT_ID,
                "User-Agent": r.UPLOAD.UA
              },
              success: function success(t) {
                var e = t.statusCode,
                    n = t.data;
                if (parseInt(e) !== r.STATUS_CODE.SUCCESS) return a(t);
                o(JSON.parse(n));
              },
              fail: function fail() {
                t.request.wxRequestFail(a);
              }
            });
          });
        });
      }, t.wxCensorText = function (e) {
        return e && "string" == typeof e ? t._baasRequest({
          url: t._config.API.WECHAT.CENSOR_MSG,
          method: "POST",
          data: {
            content: e
          }
        }) : Promise.reject(new o(605));
      }, t.censorAsync = function (e) {
        return t._baasRequest({
          url: t._config.API.WECHAT.CENSOR_ASYNC,
          method: "POST",
          data: {
            file_id: e
          }
        });
      }, t.getCensorResult = function (e) {
        return t._baasRequest({
          url: "".concat(t._config.API.WECHAT.CENSOR_ASYNC).concat(e, "/")
        });
      };
    };
  }, function (t, e, n) {
    function r() {
      return (r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    var o = n(27);

    t.exports = function (t) {
      r(t, {
        reportTemplateMsgAnalytics: function reportTemplateMsgAnalytics(t) {
          1014 == t.scene && t.query && t.query._H_utm_campaign && o.pushStats(t.query._H_utm_campaign), o.reportStats();
        }
      });
    };
  }, function (t, e, n) {
    var r = n(0)._config.API;

    t.exports = function (t) {
      t.subscribeMessage = function (e) {
        return t._baasRequest({
          url: r.WECHAT.SUBSCRIBE_MESSAGE,
          method: "POST",
          data: e
        });
      };
    };
  }, function (t, e, n) {
    var r = n(0),
        o = n(3),
        i = r._polyfill,
        a = r._config.API,
        u = {
      merchandiseSchemaID: "merchandise_schema_id",
      merchandiseRecordID: "merchandise_record_id",
      merchandiseSnapshot: "merchandise_snapshot",
      profitSharing: "profit_sharing",
      merchandiseDescription: "merchandise_description",
      totalCost: "total_cost"
    };

    t.exports = function (t) {
      var e = {};

      for (var n in t) {
        e[u[n]] = t[n];
      }

      return e.gateway_type = "weixin_tenpay", r._baasRequest({
        url: a.PAY,
        method: "POST",
        data: e
      }).then(function (t) {
        var e = t.data || {};
        return new Promise(function (t, n) {
          i.wxPaymentRequest({
            appId: e.appId,
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: "MD5",
            paySign: e.paySign,
            success: function success(n) {
              return n.transaction_no = e.transaction_no, n.trade_no = e.trade_no, t(n);
            },
            complete: function complete(t) {
              "requestPayment:fail cancel" == t.errMsg && n(new o(607));
            },
            fail: function fail(t) {
              "requestPayment:fail cancel" == t.errMsg ? n(new o(607)) : n(new o(608, t.errMsg));
            }
          });
        });
      });
    };
  }, function (t, e, n) {
    var r = n(0);

    t.exports = function (t) {
      return new r.Order().get(t.transactionID);
    };
  }, function (t, e, n) {
    var r = n(0),
        o = n(3),
        i = n(1),
        a = n(2),
        u = function u(t) {
      wx.getNetworkType({
        success: function success(e) {
          "none" === e.networkType ? t(new o(600)) : t(new o(601));
        }
      });
    };

    t.exports = function (t) {
      var e = t.url,
          n = t.method,
          s = void 0 === n ? "GET" : n,
          c = t.data,
          f = void 0 === c ? {} : c,
          l = t.header,
          h = void 0 === l ? {} : l,
          p = t.dataType,
          d = void 0 === p ? "json" : p;
      return i.mergeRequestHeader(h).then(function (t) {
        return new Promise(function (n, c) {
          if (!r._config.CLIENT_ID) return c(new o(602));

          if (!/https?:\/\//.test(e)) {
            var l = r._polyfill.getAPIHost();

            e = l.replace(/\/$/, "") + "/" + e.replace(/^\//, "");
          }

          wx.request({
            method: s,
            url: e,
            data: f,
            header: t,
            dataType: d,
            success: n,
            fail: function fail() {
              u(c);
            }
          }), i.log(a.LOG_LEVEL.INFO, "Request => " + e);
        });
      });
    }, t.exports.wxRequestFail = u;
  }, function (t, e, n) {
    var r = n(1),
        o = n(0),
        i = n(2),
        a = n(19);

    t.exports = function (t) {
      var e = t.url,
          n = t.method,
          u = void 0 === n ? "GET" : n,
          s = t.data,
          c = void 0 === s ? {} : s,
          f = t.header,
          l = void 0 === f ? {} : f,
          h = t.dataType,
          p = void 0 === h ? "json" : h;
      return (o._config.AUTO_LOGIN ? o.auth.silentLogin() : Promise.resolve()).then(function () {
        return o.request.call(null, {
          url: e,
          method: u,
          data: c,
          header: l,
          dataType: p
        });
      }).then(function (t) {
        return t.statusCode === i.STATUS_CODE.UNAUTHORIZED && o._config.AUTO_LOGIN ? (n = {
          header: l,
          method: u,
          url: e,
          data: c,
          dataType: p
        }, s = a.get(i.STORAGE_KEY.UID), f = Promise.resolve(), a.get(i.STORAGE_KEY.AUTH_TOKEN) && (f = o.clearSession()), f.then(function () {
          return o.auth.silentLogin().then(function () {
            return r.getResendPayload(o, n, s);
          }).then(function (t) {
            return o.request(t).then(r.validateStatusCode);
          });
        })) : r.validateStatusCode(t);
        var n, s, f;
      });
    };
  }, function (t, e, n) {
    function r() {
      return (r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      })(t);
    }

    var i = n(0),
        a = n(2),
        u = n(3),
        s = n(1),
        c = n(49),
        f = c.getUploadFileConfig,
        l = c.getUploadHeaders;

    t.exports = function (t, e, n) {
      if (!t || "object" !== o(t) || !t.filePath) throw new u(605);

      if (e) {
        if ("object" !== o(e)) throw new u(605);
      } else e = {};

      var c,
          h,
          p,
          d,
          y = null,
          _ = new Promise(function (t, e) {
        c = t, h = e;
      }),
          g = function g(t) {
        return y ? y.onProgressUpdate(t) : p = t, this;
      },
          v = function v() {
        return y && y.abort(), d = !0, this;
      };

      !function t(e) {
        return r(e, {
          catch: function _catch() {
            for (var e, n = arguments.length, r = new Array(n), o = 0; o < n; o++) {
              r[o] = arguments[o];
            }

            var i = (e = Promise.prototype.catch).call.apply(e, [this].concat(r));
            return t(i), i;
          },
          then: function then() {
            for (var e, n = arguments.length, r = new Array(n), o = 0; o < n; o++) {
              r[o] = arguments[o];
            }

            var i = (e = Promise.prototype.then).call.apply(e, [this].concat(r));
            return t(i), i;
          },
          abort: v,
          onProgressUpdate: g
        });
      }(_);
      var E = s.getFileNameFromPath(t.filePath);
      return f(E, s.replaceQueryParams(e)).then(function (e) {
        if (d) return h(new Error("aborted"));
        var r = {
          id: e.data.id,
          fileName: E,
          policy: e.data.policy,
          authorization: e.data.authorization,
          uploadUrl: e.data.upload_url,
          filePath: t.filePath,
          destLink: e.data.path
        };
        y = function (t, e, n, r) {
          return l().then(function (o) {
            return wx.uploadFile({
              url: t.uploadUrl,
              filePath: t.filePath,
              name: a.UPLOAD.UPLOAD_FILE_KEY,
              formData: {
                authorization: t.authorization,
                policy: t.policy
              },
              header: o,
              success: function success(o) {
                var i = {},
                    a = JSON.parse(o.data);
                i.status = "ok", i.path = t.destLink, i.file = {
                  id: t.id,
                  path: t.destLink,
                  name: t.fileName,
                  created_at: a.time,
                  mime_type: a.mimetype,
                  cdn_path: a.url,
                  size: a.file_size
                }, delete o.data, o.data = r && "json" === r ? i : JSON.stringify(i);

                try {
                  e(s.validateStatusCode(o));
                } catch (t) {
                  n(t);
                }
              },
              fail: function fail() {
                i.request.wxRequestFail(n);
              }
            });
          });
        }(r, function (t) {
          if (d) return h(new Error("aborted"));
          c(t);
        }, h, n), p && y.onProgressUpdate(p);
      }, h), _;
    };
  }, function (t, e, n) {
    function r() {
      return (r = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];

          for (var r in n) {
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    var o = n(0),
        i = n(3),
        a = n(1),
        u = o._config.API;

    t.exports = function (t, e, n, s) {
      var c = function (t, e, n, r) {
        var o = {},
            u = ["wxacode", "wxacodeunlimit", "wxaqrcode"].indexOf(t);
        if (!a.isString(t) || -1 === u) throw new i(605, 'type 为字符串类型且只接受 "wxacode", "wxacodeunlimit", "wxaqrcode" 其中一种');
        if (o.code_type = ["miniapp_permanent", "miniapp_temporary", "miniapp_qr"][u], !e || e.constructor !== Object) throw new i(605, "params 为 Object 类型");

        if ("wxacode" === t || "wxaqrcode" === t) {
          if (!e.hasOwnProperty("path")) throw new i(605, '当 type 为 "wxacode" 或 "wxaqrcode" 时，params 中必须带有 "path" 属性');
          o.path = e.path;
        }

        if ("wxacodeunlimit" === t) {
          if (!e.hasOwnProperty("scene")) throw new i(605, '当 type 为 "wxacodeunlimit" 时，params 中必须带有 "scene" 属性');
          o.scene = e.scene, e.hasOwnProperty("page") && (o.path = e.page);
        }

        return o.options = {}, e.hasOwnProperty("width") && (o.options.width = e.width), e.hasOwnProperty("auto_color") && (o.options.auto_color = e.auto_color), e.hasOwnProperty("line_color") && (o.options.line_color = e.line_color), e.hasOwnProperty("is_hyaline") && (o.options.is_hyaline = e.is_hyaline), !0 === n && (o.upload_to_cdn = !0, r && (o.category_name = r)), o;
      }(t, e, n, s);

      return o._baasRequest({
        url: u.WECHAT.WXACODE,
        method: "POST",
        data: c
      }).then(function (t) {
        return n ? r({
          download_url: t.data.uploaded_file.path
        }, t.data) : t.data;
      });
    };
  }, function (t, e, n) {
    var r = n(0),
        o = n(3),
        i = r._config.API,
        a = function a(t) {
      if (!(t instanceof Array) || t.length < 3) return !1;
      return -1 !== ["we-run-data", "open-gid", "phone-number"].indexOf(t[2]);
    };

    t.exports = function () {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
        e[n] = arguments[n];
      }

      if (!a(e)) throw new o(605);
      var u = {
        encryptedData: e[0],
        iv: e[1]
      };
      return r._baasRequest({
        url: i.WECHAT.DECRYPT + e[2] + "/",
        method: "POST",
        data: u
      }).then(function (t) {
        return t.data;
      }, function (t) {
        if (403 === t.code) throw new o(403, "微信解密插件未开启");
        throw t;
      });
    };
  }, function (t, e, n) {
    var r = n(0),
        o = n(1),
        i = r._config.API;
    t.exports = o.ticketReportThrottle(function (t) {
      var e = o.makeReportTicketParam(t);
      return r._baasRequest({
        url: i.WECHAT.TEMPLATE_MESSAGE,
        method: "POST",
        data: e
      });
    });
  }, function (t, e, n) {
    var r = n(0),
        o = n(3),
        i = r._config,
        a = r._polyfill,
        u = n(133),
        s = !1;
    t.exports = {
      enable: function enable() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).usePlugins,
            e = void 0 !== t && t;
        if (!r._config || !r._config.CLIENT_ID) throw new o(602);
        return u.usePlugins = "plugin" === a.SDK_TYPE || e, s = !0, u.init(!0, {
          clientId: r._config.CLIENT_ID
        }, i.VERSION);
      },
      track: function track() {
        if (!s) throw new o(610);
        return u.track.apply(u, arguments);
      },
      metaData: function metaData() {
        if (!s) throw new o(610);
        return u.metaData.apply(u, arguments);
      }
    };
  }, function (t, e, n) {
    (function (r) {
      var o, i;

      function a() {
        return (a = Object.assign || function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];

            for (var r in n) {
              Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
          }

          return t;
        }).apply(this, arguments);
      }

      function u(t) {
        return (u = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
        })(t);
      }

      !function (r, a) {
        "object" == u(e) && void 0 !== t ? t.exports = a() : void 0 === (i = "function" == typeof (o = a) ? o.call(e, n, e, t) : o) || (t.exports = i);
      }(0, function () {
        var t = {
          url: {
            sdkDown: "https://dataapi.testin.cn/sdkDown",
            track: "https://dataapi.testin.cn/sendEvents"
          },
          sdkDown: {
            pid: "",
            pl: "miniPrograms",
            sv: "1.1.1",
            testin_id: "",
            testin_time: 0,
            testin_type: "track",
            testin_name: "testin_bug",
            testin_first: !0,
            di: {
              testin_schan: ["testin_schan_bugout"],
              testin_av: "",
              testin_wechat_ver: "",
              testin_tm: 0,
              testin_pa: "",
              testin_brand: "",
              testin_model: "",
              testin_os: "",
              testin_ov: "",
              testin_dh: 0,
              testin_dw: 0,
              testin_lan: "",
              testin_net: "",
              testin_bug_type: 1,
              testin_bug_lan: 4,
              testin_component_ver: "",
              testin_bug_bn: "",
              testin_bug_pr: "",
              testin_bug_ww: 0,
              testin_bug_wh: 0,
              testin_bug_sbh: "",
              testin_bug_fss: "",
              testin_bus: 2
            }
          },
          record: {
            testin_pid: "",
            testin_id: "",
            testin_pl: "miniPrograms",
            testin_time: 0,
            testin_type: "track",
            testin_name: "testin_bug",
            testin_sv: "1.1.1",
            attrs: {
              testin_av: "",
              testin_wechat_ver: "",
              testin_tm: 0,
              testin_pa: "",
              testin_brand: "",
              testin_model: "",
              testin_os: "",
              testin_ov: "",
              testin_dh: 0,
              testin_dw: 0,
              testin_lan: "",
              testin_url: "",
              testin_net: "",
              testin_bug_type: 1,
              testin_bug_lan: 4,
              testin_component_ver: "",
              testin_bug_bn: "",
              testin_bug_stack: "",
              testin_bug_sv: "1.1.1",
              testin_bug_pr: "0",
              testin_bug_ww: 0,
              testin_bug_wh: 0,
              testin_bug_sbh: "",
              testin_bug_fss: "",
              testin_bug_rea: "",
              testin_bug_slog: "",
              testin_bug_name: "",
              testin_bus: 2
            }
          },
          breadcrumb: [],
          sdkInitComplete: !1
        },
            e = {
          uuid: function uuid() {
            var t, e;
            !function () {
              if (!t) {
                var n = new Array(16);

                e = t = function t() {
                  for (var t, e = 0; e < 16; e++) {
                    0 == (3 & e) && (t = 4294967296 * Math.random()), n[e] = t >>> ((3 & e) << 3) & 255;
                  }

                  return n;
                };
              }
            }();

            for (var n = "function" == typeof r ? r : Array, o = [], i = {}, a = 0; a < 256; a++) {
              o[a] = (a + 256).toString(16).substr(1), i[o[a]] = a;
            }

            function u(t, e) {
              var n = e || 0,
                  r = o;
              return r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]];
            }

            function s(e, r, o) {
              var i = r && o || 0;
              "string" == typeof e && (r = "binary" === e ? new n(16) : null, e = null);
              var a = (e = e || {}).random || (e.rng || t)();
              if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, r) for (var s = 0; s < 16; s++) {
                r[i + s] = a[s];
              }
              return r || u(a);
            }

            var c = s;
            return c.v4 = s, c.parse = function (t, e, n) {
              var r = e && n || 0,
                  o = 0;

              for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function (t) {
                o < 16 && (e[r + o++] = i[t]);
              }); o < 16;) {
                e[r + o++] = 0;
              }

              return e;
            }, c.unparse = u, c.BufferClass = n, c._rng = t, c._mathRNG = e, c._nodeRNG = void 0, c._whatwgRNG = void 0, c();
          },
          getCurrentPageUrl: function getCurrentPageUrl() {
            var t = getCurrentPages();
            if (t.length) return t[t.length - 1];
          },
          getAesKey: function getAesKey() {
            var t,
                e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
                n = e.length,
                r = "";

            for (t = 0; t < 16; t++) {
              r += e.charAt(Math.floor(Math.random() * n));
            }

            return r;
          },
          reWriteApp: function reWriteApp(e) {
            var n = App,
                r = this;

            App = function App(o) {
              return ["onLaunch", "onShow", "onHide", "onError"].forEach(function (n) {
                var i = o[n];

                o[n] = function (o) {
                  "onLaunch" === n && (t.sdkDown.di.testin_chan = t.record.attrs.testin_chan = o.scene);
                  var a = {};
                  "onError" === n ? (a.testin_bug_s_time = r.nowTime(), a.testin_bug_s_tit = "⬆⬆⬆⬆⬆BUG在此⬆⬆⬆⬆⬆", a.testin_bug_s_con = "App: " + n) : (a.testin_bug_s_time = r.nowTime(), a.testin_bug_s_tit = o && o.path || "", a.testin_bug_s_con = "App: " + n), r.pushToBreadcrumb(a), "onError" === n && e.track(o), i && i.call(this, o);
                };
              }), n(o);
            };
          },
          reWritePage: function reWritePage() {
            var t = this,
                e = Page;

            Page = function Page(n) {
              return Object.keys(n).forEach(function (e) {
                "function" == typeof n[e] && t.recordPageFn(n, e);
              }), n.onReady || t.recordPageFn(n, "onReady"), n.onLoad || t.recordPageFn(n, "onLoad"), e(n);
            };
          },
          reWriteWxRequest: function reWriteWxRequest() {
            var e = this,
                n = wx.request;

            try {
              Object.defineProperty(wx, "request", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function value() {
                  var r = arguments[0] || {},
                      o = e.nowTime();
                  return r.url.indexOf(t.url.sdkDown) > -1 || r.url.indexOf(t.url.track) > -1 ? n.apply(wx, arguments) : (r.complete ? e.reWriteComplete(r, o) : r.complete = function (t) {
                    e.pushToBreadcrumb({
                      testin_bug_s_time: e.nowTime(),
                      testin_bug_s_tit: r.url,
                      testin_bug_s_con: r.method + ", status: " + t.statusCode
                    });
                  }, n.apply(wx, arguments));
                }
              });
            } catch (t) {
              console.log(t, "此内容为bugout所有~~");
            }
          },
          reWriteComplete: function reWriteComplete(t, e) {
            var n = this,
                r = t.complete;

            t.complete = function (e) {
              return n.pushToBreadcrumb({
                testin_bug_s_time: n.nowTime(),
                testin_bug_s_tit: t.url,
                testin_bug_s_con: t.method + ", status: " + e.statusCode
              }), r(e);
            };
          },
          reWriteConsole: function reWriteConsole() {
            var t = {
              log: "L",
              info: "I",
              error: "E",
              warn: "W",
              debug: "D"
            },
                e = this;
            this.consoleList = [], ["debug", "error", "info", "log", "warn"].forEach(function (n) {
              var r;
              r = console[n], console[n] = function (o) {
                e.consoleList.push(e.nowTimeTrans() + " " + t[n] + "/console(0): " + o), e.consoleList.length > 100 && e.consoleList.shift(), r.apply(console, arguments);
              };
            });
          },
          recordPageFn: function recordPageFn(t, e) {
            var n = t[e],
                r = this;

            t[e] = function () {
              "onLoad" !== e && "onShow" !== e || (r.activePage = r.getCurrentPageUrl());
              var t = {
                testin_bug_s_time: r.nowTime(),
                testin_bug_s_tit: r.activePage ? r.activePage.route : "-",
                testin_bug_s_con: "Page: " + e
              };
              return "onLoad" === e && (t.args = arguments), r.pushToBreadcrumb(t), n && n.apply(this, arguments);
            };
          },
          nowTime: function nowTime() {
            return new Date().getTime();
          },
          timeZone: function timeZone() {
            return new Date().getTimezoneOffset() / 60;
          },
          nowTimeTrans: function nowTimeTrans() {
            var t = new Date();
            return (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " " + (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":" + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()) + "." + (t.getTime() + "").slice(-3);
          },
          pushToBreadcrumb: function pushToBreadcrumb(e) {
            t.breadcrumb.push(e), t.breadcrumb.length > 100 && t.breadcrumb.shift();
          },
          getStorage: function getStorage() {
            var e = this;
            wx.getStorage({
              key: "testin_id",
              success: function success(e) {
                t.sdkDown.testin_first = !1, t.sdkDown.testin_id = t.record.testin_eid = t.record.testin_id = e.data;
              },
              fail: function fail() {
                var n = e.uuid();
                wx.setStorage({
                  key: "testin_id",
                  data: n
                }), t.sdkDown.testin_first = !0, t.sdkDown.testin_id = t.record.testin_eid = t.record.testin_id = n;
              }
            });
          }
        },
            n = "function" == typeof Symbol && "symbol" == u(Symbol.iterator) ? function (t) {
          return u(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : u(t);
        };
        return {
          init: function init(r, o, i) {
            var a = void 0,
                u = this;

            function s(n, o) {
              if (e.reWriteConsole(), n.usePlugins || (e.reWriteWxRequest(), e.reWritePage(), e.reWriteApp(u)), "boolean" == typeof r) {
                if (t.sdkDown.di.testin_zone = t.record.attrs.testin_zone = e.timeZone(), t.sdkDown.di.testin_av = t.record.attrs.testin_av = i, e.bugOutPower = r, wx.getAccountInfoSync) {
                  var a = wx.getAccountInfoSync();
                  t.sdkDown.di.testin_pa = t.record.attrs.testin_pa = a.miniProgram.appId;
                }

                t.sdkDown.pid = t.record.testin_pid = o, t.sdkDown.testin_time = e.nowTime(), e.getStorage(), wx.getSystemInfo({
                  success: function success(e) {
                    var n = e.system.split(" ");
                    t.record.attrs.testin_wechat_ver = t.sdkDown.di.testin_wechat_ver = e.version, t.record.attrs.testin_brand = t.sdkDown.di.testin_brand = e.brand, t.record.attrs.testin_model = t.sdkDown.di.testin_model = e.model, t.record.attrs.testin_os = t.sdkDown.di.testin_os = n[0], t.record.attrs.testin_ov = t.sdkDown.di.testin_ov = n[1], t.record.attrs.testin_dh = t.sdkDown.di.testin_dh = e.screenHeight, t.record.attrs.testin_dw = t.sdkDown.di.testin_dw = e.screenWidth, t.record.attrs.testin_lan = t.sdkDown.di.testin_lan = e.language, t.record.attrs.testin_bug_bn = t.sdkDown.di.testin_bug_bn = e.platform, t.record.attrs.testin_component_ver = t.sdkDown.di.testin_component_ver = e.SDKVersion, t.record.attrs.testin_bug_pr = t.sdkDown.di.testin_bug_pr = e.pixelRatio.toFixed(1), t.record.attrs.testin_bug_ww = t.sdkDown.di.testin_bug_ww = e.windowWidth, t.record.attrs.testin_bug_wh = t.sdkDown.di.testin_bug_wh = e.windowHeight, t.record.attrs.testin_bug_sbh = t.sdkDown.di.testin_bug_sbh = e.statusBarHeight, t.record.attrs.testin_bug_fss = t.sdkDown.di.testin_bug_fss = e.fontSizeSetting, e.batteryLevel && (t.record.attrs.testin_bat_rem = t.sdkDown.di.testin_bat_rem = e.batteryLevel);
                  },
                  complete: function complete() {
                    wx.getNetworkType({
                      success: function success(e) {
                        t.record.attrs.testin_net = t.sdkDown.di.testin_net = e.networkType;
                      },
                      complete: function complete() {
                        wx.request({
                          url: t.url.sdkDown,
                          method: "POST",
                          data: t.sdkDown
                        });
                      }
                    });
                  }
                });
              } else console.log("请按照集成文档正确集成SDK");
            }

            "object" === (void 0 === o ? "undefined" : n(o)) ? wx.request({
              url: "https://dataapi.testin.cn/api/getappkey/" + o.clientId,
              header: {
                "Content-Type": "text/html;charset=UTF-8"
              },
              success: function success(t) {
                a = t.data ? t.data : "noPid", s(u, a);
              }
            }) : "string" == typeof o && s(u, a = o);
          },
          track: function track(r) {
            if (e.bugOutPower) {
              "string" == typeof r && (t.record.attrs.testin_bug_rea = r.split("\n")[1], t.record.attrs.testin_bug_name = r.split("\n")[0], t.record.attrs.testin_bug_stack = r), "object" === (void 0 === r ? "undefined" : n(r)) && (t.record.attrs.testin_bug_rea = r.message, t.record.attrs.testin_bug_name = r.name, t.record.attrs.testin_bug_stack = r.stack), t.record.attrs.testin_bug_slog = e.consoleList.join("\n"), t.record.attrs.testin_url = e.getCurrentPageUrl() ? e.getCurrentPageUrl().route : "", t.record.testin_time = e.nowTime(), t.record.attrs.testin_bug_steps = JSON.stringify(t.breadcrumb);
              var o = [];
              o.push(t.record), wx.request({
                url: t.url.track,
                method: "POST",
                data: o
              });
            }
          },
          usePlugins: !1,
          metaData: function metaData(e) {
            return t.record.attrs.testin_bug_user = JSON.stringify(a({}, e));
          }
        };
      });
    }).call(this, n(134).Buffer);
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var r = n(135),
          o = n(136),
          i = n(137);

      function a() {
        return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }

      function u(t, e) {
        if (a() < e) throw new RangeError("Invalid typed array length");
        return s.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = s.prototype : (null === t && (t = new s(e)), t.length = e), t;
      }

      function s(t, e, n) {
        if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(t, e, n);

        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return l(this, t);
        }

        return c(this, t, e, n);
      }

      function c(t, e, n, r) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, n, r) {
          if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
          s.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = s.prototype : t = h(t, e);
          return t;
        }(t, e, n, r) : "string" == typeof e ? function (t, e, n) {
          "string" == typeof n && "" !== n || (n = "utf8");
          if (!s.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
          var r = 0 | d(e, n),
              o = (t = u(t, r)).write(e, n);
          o !== r && (t = t.slice(0, o));
          return t;
        }(t, e, n) : function (t, e) {
          if (s.isBuffer(e)) {
            var n = 0 | p(e.length);
            return 0 === (t = u(t, n)).length ? t : (e.copy(t, 0, 0, n), t);
          }

          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? u(t, 0) : h(t, e);
            if ("Buffer" === e.type && i(e.data)) return h(t, e.data);
          }

          var r;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }(t, e);
      }

      function f(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }

      function l(t, e) {
        if (f(e), t = u(t, e < 0 ? 0 : 0 | p(e)), !s.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) {
          t[n] = 0;
        }
        return t;
      }

      function h(t, e) {
        var n = e.length < 0 ? 0 : 0 | p(e.length);
        t = u(t, n);

        for (var r = 0; r < n; r += 1) {
          t[r] = 255 & e[r];
        }

        return t;
      }

      function p(t) {
        if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
        return 0 | t;
      }

      function d(t, e) {
        if (s.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;

        for (var r = !1;;) {
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;

            case "utf8":
            case "utf-8":
            case void 0:
              return B(t).length;

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;

            case "hex":
              return n >>> 1;

            case "base64":
              return F(t).length;

            default:
              if (r) return B(t).length;
              e = ("" + e).toLowerCase(), r = !0;
          }
        }
      }

      function y(t, e, n) {
        var r = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
        if ((n >>>= 0) <= (e >>>= 0)) return "";

        for (t || (t = "utf8");;) {
          switch (t) {
            case "hex":
              return D(this, e, n);

            case "utf8":
            case "utf-8":
              return A(this, e, n);

            case "ascii":
              return P(this, e, n);

            case "latin1":
            case "binary":
              return R(this, e, n);

            case "base64":
              return S(this, e, n);

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return L(this, e, n);

            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), r = !0;
          }
        }
      }

      function _(t, e, n) {
        var r = t[e];
        t[e] = t[n], t[n] = r;
      }

      function g(t, e, n, r, o) {
        if (0 === t.length) return -1;

        if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
          if (o) return -1;
          n = t.length - 1;
        } else if (n < 0) {
          if (!o) return -1;
          n = 0;
        }

        if ("string" == typeof e && (e = s.from(e, r)), s.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, n, r, o);
        if ("number" == typeof e) return e &= 255, s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : v(t, [e], n, r, o);
        throw new TypeError("val must be string, number or Buffer");
      }

      function v(t, e, n, r, o) {
        var i,
            a = 1,
            u = t.length,
            s = e.length;

        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
          if (t.length < 2 || e.length < 2) return -1;
          a = 2, u /= 2, s /= 2, n /= 2;
        }

        function c(t, e) {
          return 1 === a ? t[e] : t.readUInt16BE(e * a);
        }

        if (o) {
          var f = -1;

          for (i = n; i < u; i++) {
            if (c(t, i) === c(e, -1 === f ? 0 : i - f)) {
              if (-1 === f && (f = i), i - f + 1 === s) return f * a;
            } else -1 !== f && (i -= i - f), f = -1;
          }
        } else for (n + s > u && (n = u - s), i = n; i >= 0; i--) {
          for (var l = !0, h = 0; h < s; h++) {
            if (c(t, i + h) !== c(e, h)) {
              l = !1;
              break;
            }
          }

          if (l) return i;
        }

        return -1;
      }

      function E(t, e, n, r) {
        n = Number(n) || 0;
        var o = t.length - n;
        r ? (r = Number(r)) > o && (r = o) : r = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        r > i / 2 && (r = i / 2);

        for (var a = 0; a < r; ++a) {
          var u = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(u)) return a;
          t[n + a] = u;
        }

        return a;
      }

      function b(t, e, n, r) {
        return q(B(e, t.length - n), t, n, r);
      }

      function m(t, e, n, r) {
        return q(function (t) {
          for (var e = [], n = 0; n < t.length; ++n) {
            e.push(255 & t.charCodeAt(n));
          }

          return e;
        }(e), t, n, r);
      }

      function w(t, e, n, r) {
        return m(t, e, n, r);
      }

      function O(t, e, n, r) {
        return q(F(e), t, n, r);
      }

      function T(t, e, n, r) {
        return q(function (t, e) {
          for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) {
            n = t.charCodeAt(a), r = n >> 8, o = n % 256, i.push(o), i.push(r);
          }

          return i;
        }(e, t.length - n), t, n, r);
      }

      function S(t, e, n) {
        return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n));
      }

      function A(t, e, n) {
        n = Math.min(t.length, n);

        for (var r = [], o = e; o < n;) {
          var i,
              a,
              u,
              s,
              c = t[o],
              f = null,
              l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (o + l <= n) switch (l) {
            case 1:
              c < 128 && (f = c);
              break;

            case 2:
              128 == (192 & (i = t[o + 1])) && (s = (31 & c) << 6 | 63 & i) > 127 && (f = s);
              break;

            case 3:
              i = t[o + 1], a = t[o + 2], 128 == (192 & i) && 128 == (192 & a) && (s = (15 & c) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (s < 55296 || s > 57343) && (f = s);
              break;

            case 4:
              i = t[o + 1], a = t[o + 2], u = t[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & u) && (s = (15 & c) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & u) > 65535 && s < 1114112 && (f = s);
          }
          null === f ? (f = 65533, l = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), r.push(f), o += l;
        }

        return function (t) {
          var e = t.length;
          if (e <= I) return String.fromCharCode.apply(String, t);
          var n = "",
              r = 0;

          for (; r < e;) {
            n += String.fromCharCode.apply(String, t.slice(r, r += I));
          }

          return n;
        }(r);
      }

      e.Buffer = s, e.SlowBuffer = function (t) {
        +t != t && (t = 0);
        return s.alloc(+t);
      }, e.INSPECT_MAX_BYTES = 50, s.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function foo() {
              return 42;
            }
          }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
        } catch (t) {
          return !1;
        }
      }(), e.kMaxLength = a(), s.poolSize = 8192, s._augment = function (t) {
        return t.__proto__ = s.prototype, t;
      }, s.from = function (t, e, n) {
        return c(null, t, e, n);
      }, s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
        value: null,
        configurable: !0
      })), s.alloc = function (t, e, n) {
        return function (t, e, n, r) {
          return f(e), e <= 0 ? u(t, e) : void 0 !== n ? "string" == typeof r ? u(t, e).fill(n, r) : u(t, e).fill(n) : u(t, e);
        }(null, t, e, n);
      }, s.allocUnsafe = function (t) {
        return l(null, t);
      }, s.allocUnsafeSlow = function (t) {
        return l(null, t);
      }, s.isBuffer = function (t) {
        return !(null == t || !t._isBuffer);
      }, s.compare = function (t, e) {
        if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;

        for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o) {
          if (t[o] !== e[o]) {
            n = t[o], r = e[o];
            break;
          }
        }

        return n < r ? -1 : r < n ? 1 : 0;
      }, s.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;

          default:
            return !1;
        }
      }, s.concat = function (t, e) {
        if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return s.alloc(0);
        var n;
        if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) {
          e += t[n].length;
        }
        var r = s.allocUnsafe(e),
            o = 0;

        for (n = 0; n < t.length; ++n) {
          var a = t[n];
          if (!s.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
          a.copy(r, o), o += a.length;
        }

        return r;
      }, s.byteLength = d, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

        for (var e = 0; e < t; e += 2) {
          _(this, e, e + 1);
        }

        return this;
      }, s.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

        for (var e = 0; e < t; e += 4) {
          _(this, e, e + 3), _(this, e + 1, e + 2);
        }

        return this;
      }, s.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

        for (var e = 0; e < t; e += 8) {
          _(this, e, e + 7), _(this, e + 1, e + 6), _(this, e + 2, e + 5), _(this, e + 3, e + 4);
        }

        return this;
      }, s.prototype.toString = function () {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : y.apply(this, arguments);
      }, s.prototype.equals = function (t) {
        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === s.compare(this, t);
      }, s.prototype.inspect = function () {
        var t = "",
            n = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">";
      }, s.prototype.compare = function (t, e, n, r, o) {
        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
        if (r >= o && e >= n) return 0;
        if (r >= o) return -1;
        if (e >= n) return 1;
        if (this === t) return 0;

        for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0), u = Math.min(i, a), c = this.slice(r, o), f = t.slice(e, n), l = 0; l < u; ++l) {
          if (c[l] !== f[l]) {
            i = c[l], a = f[l];
            break;
          }
        }

        return i < a ? -1 : a < i ? 1 : 0;
      }, s.prototype.includes = function (t, e, n) {
        return -1 !== this.indexOf(t, e, n);
      }, s.prototype.indexOf = function (t, e, n) {
        return g(this, t, e, n, !0);
      }, s.prototype.lastIndexOf = function (t, e, n) {
        return g(this, t, e, n, !1);
      }, s.prototype.write = function (t, e, n, r) {
        if (void 0 === e) r = "utf8", n = this.length, e = 0;else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
        }
        var o = this.length - e;
        if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        r || (r = "utf8");

        for (var i = !1;;) {
          switch (r) {
            case "hex":
              return E(this, t, e, n);

            case "utf8":
            case "utf-8":
              return b(this, t, e, n);

            case "ascii":
              return m(this, t, e, n);

            case "latin1":
            case "binary":
              return w(this, t, e, n);

            case "base64":
              return O(this, t, e, n);

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return T(this, t, e, n);

            default:
              if (i) throw new TypeError("Unknown encoding: " + r);
              r = ("" + r).toLowerCase(), i = !0;
          }
        }
      }, s.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      var I = 4096;

      function P(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);

        for (var o = e; o < n; ++o) {
          r += String.fromCharCode(127 & t[o]);
        }

        return r;
      }

      function R(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);

        for (var o = e; o < n; ++o) {
          r += String.fromCharCode(t[o]);
        }

        return r;
      }

      function D(t, e, n) {
        var r = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);

        for (var o = "", i = e; i < n; ++i) {
          o += Y(t[i]);
        }

        return o;
      }

      function L(t, e, n) {
        for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) {
          o += String.fromCharCode(r[i] + 256 * r[i + 1]);
        }

        return o;
      }

      function C(t, e, n) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n) throw new RangeError("Trying to access beyond buffer length");
      }

      function U(t, e, n, r, o, i) {
        if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range");
      }

      function k(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);

        for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) {
          t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);
        }
      }

      function N(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);

        for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) {
          t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255;
        }
      }

      function j(t, e, n, r, o, i) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }

      function x(t, e, n, r, i) {
        return i || j(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4;
      }

      function M(t, e, n, r, i) {
        return i || j(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8;
      }

      s.prototype.slice = function (t, e) {
        var n,
            r = this.length;
        if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), s.TYPED_ARRAY_SUPPORT) (n = this.subarray(t, e)).__proto__ = s.prototype;else {
          var o = e - t;
          n = new s(o, void 0);

          for (var i = 0; i < o; ++i) {
            n[i] = this[i + t];
          }
        }
        return n;
      }, s.prototype.readUIntLE = function (t, e, n) {
        t |= 0, e |= 0, n || C(t, e, this.length);

        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) {
          r += this[t + i] * o;
        }

        return r;
      }, s.prototype.readUIntBE = function (t, e, n) {
        t |= 0, e |= 0, n || C(t, e, this.length);

        for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) {
          r += this[t + --e] * o;
        }

        return r;
      }, s.prototype.readUInt8 = function (t, e) {
        return e || C(t, 1, this.length), this[t];
      }, s.prototype.readUInt16LE = function (t, e) {
        return e || C(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, s.prototype.readUInt16BE = function (t, e) {
        return e || C(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, s.prototype.readUInt32LE = function (t, e) {
        return e || C(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, s.prototype.readUInt32BE = function (t, e) {
        return e || C(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, s.prototype.readIntLE = function (t, e, n) {
        t |= 0, e |= 0, n || C(t, e, this.length);

        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) {
          r += this[t + i] * o;
        }

        return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r;
      }, s.prototype.readIntBE = function (t, e, n) {
        t |= 0, e |= 0, n || C(t, e, this.length);

        for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) {
          i += this[t + --r] * o;
        }

        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
      }, s.prototype.readInt8 = function (t, e) {
        return e || C(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, s.prototype.readInt16LE = function (t, e) {
        e || C(t, 2, this.length);
        var n = this[t] | this[t + 1] << 8;
        return 32768 & n ? 4294901760 | n : n;
      }, s.prototype.readInt16BE = function (t, e) {
        e || C(t, 2, this.length);
        var n = this[t + 1] | this[t] << 8;
        return 32768 & n ? 4294901760 | n : n;
      }, s.prototype.readInt32LE = function (t, e) {
        return e || C(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, s.prototype.readInt32BE = function (t, e) {
        return e || C(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, s.prototype.readFloatLE = function (t, e) {
        return e || C(t, 4, this.length), o.read(this, t, !0, 23, 4);
      }, s.prototype.readFloatBE = function (t, e) {
        return e || C(t, 4, this.length), o.read(this, t, !1, 23, 4);
      }, s.prototype.readDoubleLE = function (t, e) {
        return e || C(t, 8, this.length), o.read(this, t, !0, 52, 8);
      }, s.prototype.readDoubleBE = function (t, e) {
        return e || C(t, 8, this.length), o.read(this, t, !1, 52, 8);
      }, s.prototype.writeUIntLE = function (t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || U(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = 1,
            i = 0;

        for (this[e] = 255 & t; ++i < n && (o *= 256);) {
          this[e + i] = t / o & 255;
        }

        return e + n;
      }, s.prototype.writeUIntBE = function (t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || U(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = n - 1,
            i = 1;

        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) {
          this[e + o] = t / i & 255;
        }

        return e + n;
      }, s.prototype.writeUInt8 = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
      }, s.prototype.writeUInt16LE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : k(this, t, e, !0), e + 2;
      }, s.prototype.writeUInt16BE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : k(this, t, e, !1), e + 2;
      }, s.prototype.writeUInt32LE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : N(this, t, e, !0), e + 4;
      }, s.prototype.writeUInt32BE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4;
      }, s.prototype.writeIntLE = function (t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          U(this, t, e, n, o - 1, -o);
        }

        var i = 0,
            a = 1,
            u = 0;

        for (this[e] = 255 & t; ++i < n && (a *= 256);) {
          t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;
        }

        return e + n;
      }, s.prototype.writeIntBE = function (t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          U(this, t, e, n, o - 1, -o);
        }

        var i = n - 1,
            a = 1,
            u = 0;

        for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) {
          t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;
        }

        return e + n;
      }, s.prototype.writeInt8 = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, s.prototype.writeInt16LE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : k(this, t, e, !0), e + 2;
      }, s.prototype.writeInt16BE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : k(this, t, e, !1), e + 2;
      }, s.prototype.writeInt32LE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : N(this, t, e, !0), e + 4;
      }, s.prototype.writeInt32BE = function (t, e, n) {
        return t = +t, e |= 0, n || U(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4;
      }, s.prototype.writeFloatLE = function (t, e, n) {
        return x(this, t, e, !0, n);
      }, s.prototype.writeFloatBE = function (t, e, n) {
        return x(this, t, e, !1, n);
      }, s.prototype.writeDoubleLE = function (t, e, n) {
        return M(this, t, e, !0, n);
      }, s.prototype.writeDoubleBE = function (t, e, n) {
        return M(this, t, e, !1, n);
      }, s.prototype.copy = function (t, e, n, r) {
        if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
        if (r < 0) throw new RangeError("sourceEnd out of bounds");
        r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
        var o,
            i = r - n;
        if (this === t && n < e && e < r) for (o = i - 1; o >= 0; --o) {
          t[o + e] = this[o + n];
        } else if (i < 1e3 || !s.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) {
          t[o + e] = this[o + n];
        } else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
        return i;
      }, s.prototype.fill = function (t, e, n, r) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o);
          }

          if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
          if ("string" == typeof r && !s.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
        } else "number" == typeof t && (t &= 255);

        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
        if (n <= e) return this;
        var i;
        if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (i = e; i < n; ++i) {
          this[i] = t;
        } else {
          var a = s.isBuffer(t) ? t : B(new s(t, r).toString()),
              u = a.length;

          for (i = 0; i < n - e; ++i) {
            this[i + e] = a[i % u];
          }
        }
        return this;
      };
      var G = /[^+\/0-9A-Za-z-_]/g;

      function Y(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }

      function B(t, e) {
        var n;
        e = e || 1 / 0;

        for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
          if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
            if (!o) {
              if (n > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }

              if (a + 1 === r) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }

              o = n;
              continue;
            }

            if (n < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), o = n;
              continue;
            }

            n = 65536 + (o - 55296 << 10 | n - 56320);
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);

          if (o = null, n < 128) {
            if ((e -= 1) < 0) break;
            i.push(n);
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            i.push(n >> 6 | 192, 63 & n | 128);
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
          }
        }

        return i;
      }

      function F(t) {
        return r.toByteArray(function (t) {
          if ((t = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
          }(t).replace(G, "")).length < 2) return "";

          for (; t.length % 4 != 0;) {
            t += "=";
          }

          return t;
        }(t));
      }

      function q(t, e, n, r) {
        for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) {
          e[o + n] = t[o];
        }

        return o;
      }
    }).call(this, n(24));
  }, function (t, e, n) {
    "use strict";

    e.byteLength = function (t) {
      var e = c(t),
          n = e[0],
          r = e[1];
      return 3 * (n + r) / 4 - r;
    }, e.toByteArray = function (t) {
      var e,
          n,
          r = c(t),
          a = r[0],
          u = r[1],
          s = new i(function (t, e, n) {
        return 3 * (e + n) / 4 - n;
      }(0, a, u)),
          f = 0,
          l = u > 0 ? a - 4 : a;

      for (n = 0; n < l; n += 4) {
        e = o[t.charCodeAt(n)] << 18 | o[t.charCodeAt(n + 1)] << 12 | o[t.charCodeAt(n + 2)] << 6 | o[t.charCodeAt(n + 3)], s[f++] = e >> 16 & 255, s[f++] = e >> 8 & 255, s[f++] = 255 & e;
      }

      2 === u && (e = o[t.charCodeAt(n)] << 2 | o[t.charCodeAt(n + 1)] >> 4, s[f++] = 255 & e);
      1 === u && (e = o[t.charCodeAt(n)] << 10 | o[t.charCodeAt(n + 1)] << 4 | o[t.charCodeAt(n + 2)] >> 2, s[f++] = e >> 8 & 255, s[f++] = 255 & e);
      return s;
    }, e.fromByteArray = function (t) {
      for (var e, n = t.length, o = n % 3, i = [], a = 0, u = n - o; a < u; a += 16383) {
        i.push(f(t, a, a + 16383 > u ? u : a + 16383));
      }

      1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
      return i.join("");
    };

    for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = a.length; u < s; ++u) {
      r[u] = a[u], o[a.charCodeAt(u)] = u;
    }

    function c(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var n = t.indexOf("=");
      return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4];
    }

    function f(t, e, n) {
      for (var o, i, a = [], u = e; u < n; u += 3) {
        o = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), a.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
      }

      return a.join("");
    }

    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63;
  }, function (t, e) {
    e.read = function (t, e, n, r, o) {
      var i,
          a,
          u = 8 * o - r - 1,
          s = (1 << u) - 1,
          c = s >> 1,
          f = -7,
          l = n ? o - 1 : 0,
          h = n ? -1 : 1,
          p = t[e + l];

      for (l += h, i = p & (1 << -f) - 1, p >>= -f, f += u; f > 0; i = 256 * i + t[e + l], l += h, f -= 8) {
        ;
      }

      for (a = i & (1 << -f) - 1, i >>= -f, f += r; f > 0; a = 256 * a + t[e + l], l += h, f -= 8) {
        ;
      }

      if (0 === i) i = 1 - c;else {
        if (i === s) return a ? NaN : 1 / 0 * (p ? -1 : 1);
        a += Math.pow(2, r), i -= c;
      }
      return (p ? -1 : 1) * a * Math.pow(2, i - r);
    }, e.write = function (t, e, n, r, o, i) {
      var a,
          u,
          s,
          c = 8 * i - o - 1,
          f = (1 << c) - 1,
          l = f >> 1,
          h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = r ? 0 : i - 1,
          d = r ? 1 : -1,
          y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;

      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, a = f) : (a = Math.floor(Math.log(e) / Math.LN2), e * (s = Math.pow(2, -a)) < 1 && (a--, s *= 2), (e += a + l >= 1 ? h / s : h * Math.pow(2, 1 - l)) * s >= 2 && (a++, s /= 2), a + l >= f ? (u = 0, a = f) : a + l >= 1 ? (u = (e * s - 1) * Math.pow(2, o), a += l) : (u = e * Math.pow(2, l - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + p] = 255 & u, p += d, u /= 256, o -= 8) {
        ;
      }

      for (a = a << o | u, c += o; c > 0; t[n + p] = 255 & a, p += d, a /= 256, c -= 8) {
        ;
      }

      t[n + p - d] |= 128 * y;
    };
  }, function (t, e) {
    var n = {}.toString;

    t.exports = Array.isArray || function (t) {
      return "[object Array]" == n.call(t);
    };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ 12)(module)))

/***/ }),

/***/ 116:
/*!********************************************************!*\
  !*** ./src/components/jyf-parser/libs/MpHtmlParser.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  将 html 解析为适用于小程序 rich-text 的 DOM 结构
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/03/26
*/
var cfg = __webpack_require__(/*! ./config.js */ 117),
    blankChar = cfg.blankChar,
    CssHandler = __webpack_require__(/*! ./CssHandler.js */ 118),
    _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    screenWidth = _wx$getSystemInfoSync.screenWidth,
    system = _wx$getSystemInfoSync.system;

var emoji; // emoji 补丁包 https://jin-yufeng.github.io/Parser/#/instructions?id=emoji

var MpHtmlParser =
/*#__PURE__*/
function () {
  function MpHtmlParser(data) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MpHtmlParser);

    _defineProperty(this, "getName", function (val) {
      return _this.xml ? val : val.toLowerCase();
    });

    _defineProperty(this, "isClose", function () {
      return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';
    });

    _defineProperty(this, "section", function () {
      return _this.data.substring(_this.start, _this.i);
    });

    _defineProperty(this, "siblings", function () {
      return _this.STACK.length ? _this.STACK[_this.STACK.length - 1].children : _this.DOM;
    });

    this.attrs = {};
    this.compress = options.compress;
    this.CssHandler = new CssHandler(options.tagStyle, screenWidth);
    this.data = data;
    this.domain = options.domain;
    this.DOM = [];
    this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
    this.protocol = this.domain && this.domain.includes('://') ? this.domain.split('://')[0] : '';
    this.state = this.Text;
    this.STACK = [];
    this.useAnchor = options.useAnchor;
    this.xml = options.xml;
  }

  _createClass(MpHtmlParser, [{
    key: "parse",
    value: function parse() {
      if (emoji) this.data = emoji.parseEmoji(this.data);

      for (var c; c = this.data[this.i]; this.i++) {
        this.state(c);
      }

      if (this.state == this.Text) this.setText();

      while (this.STACK.length) {
        this.popNode(this.STACK.pop());
      }

      if (this.DOM.length) {
        this.DOM[0].PoweredBy = 'Parser';
        if (this.title) this.DOM[0].title = this.title;
      }

      return this.DOM;
    } // 设置属性

  }, {
    key: "setAttr",
    value: function setAttr() {
      var name = this.getName(this.attrName);

      if (cfg.trustAttrs[name]) {
        if (!this.attrVal) {
          if (cfg.boolAttrs[name]) this.attrs[name] = 'T';
        } else if (name == 'src') this.attrs[name] = this.getUrl(this.attrVal.replace(/&amp;/g, '&'));else this.attrs[name] = this.attrVal;
      }

      this.attrVal = '';

      while (blankChar[this.data[this.i]]) {
        this.i++;
      }

      if (this.isClose()) this.setNode();else {
        this.start = this.i;
        this.state = this.AttrName;
      }
    } // 设置文本节点

  }, {
    key: "setText",
    value: function setText() {
      var back,
          text = this.section();
      if (!text) return;
      text = cfg.onText && cfg.onText(text, function () {
        return back = true;
      }) || text;

      if (back) {
        this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);

        var _j = this.start + text.length;

        for (this.i = this.start; this.i < _j; this.i++) {
          this.state(this.data[this.i]);
        }

        return;
      }

      if (!this.pre) {
        // 合并空白符
        var tmp = [];

        for (var _i = text.length, c; c = text[--_i];) {
          if (!blankChar[c] || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);
        }

        text = tmp.join('');
        if (text == ' ') return;
      } // 处理实体


      var siblings = this.siblings(),
          i = -1,
          j,
          en;

      while (1) {
        if ((i = text.indexOf('&', i + 1)) == -1) break;
        if ((j = text.indexOf(';', i + 2)) == -1) break;

        if (text[i + 1] == '#') {
          en = parseInt((text[i + 2] == 'x' ? '0' : '') + text.substring(i + 2, j));
          if (!isNaN(en)) text = text.substr(0, i) + String.fromCharCode(en) + text.substring(j + 1);
        } else {
          en = text.substring(i + 1, j);
          if (en == 'nbsp') text = text.substr(0, i) + '\xA0' + text.substr(j + 1); // 解决 &nbsp; 失效
          else if (en != 'lt' && en != 'gt' && en != 'amp' && en != 'ensp' && en != 'emsp' && en != 'quot' && en != 'apos') {
              i && siblings.push({
                type: 'text',
                text: text.substr(0, i)
              });
              siblings.push({
                type: 'text',
                text: "&".concat(en, ";"),
                en: 1
              });
              text = text.substr(j + 1);
              i = -1;
            }
        }
      }

      text && siblings.push({
        type: 'text',
        text: text
      });
    } // 设置元素节点

  }, {
    key: "setNode",
    value: function setNode() {
      var node = {
        name: this.tagName.toLowerCase(),
        attrs: this.attrs
      },
          close = cfg.selfClosingTags[node.name] || this.xml && this.data[this.i] == '/';
      this.attrs = {};

      if (!cfg.ignoreTags[node.name]) {
        this.matchAttr(node);

        if (!close) {
          node.children = [];

          if (node.name == 'pre' && cfg.highlight) {
            this.remove(node);
            this.pre = node.pre = true;
          }

          this.siblings().push(node);
          this.STACK.push(node);
        } else if (!cfg.filter || cfg.filter(node, this) != false) this.siblings().push(node);
      } else {
        if (!close) this.remove(node);else if (node.name == 'source') {
          var parent = this.STACK[this.STACK.length - 1],
              attrs = node.attrs;
          if (parent && attrs.src) if (parent.name == 'video' || parent.name == 'audio') parent.attrs.source.push(attrs.src);else {
            var i,
                media = attrs.media;
            if (parent.name == 'picture' && !parent.attrs.src && !(attrs.src.indexOf('.webp') && system.includes('iOS')) && (!media || media.includes('px') && ((i = media.indexOf('min-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth > parseInt(media.substr(i + 1)) || (i = media.indexOf('max-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth < parseInt(media.substr(i + 1))))) parent.attrs.src = attrs.src;
          }
        } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
      }

      if (this.data[this.i] == '/') this.i++;
      this.start = this.i + 1;
      this.state = this.Text;
    } // 移除标签

  }, {
    key: "remove",
    value: function remove(node) {
      var name = node.name,
          j = this.i;

      while (1) {
        if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
          if (name == 'pre' || name == 'svg') this.i = j;else this.i = this.data.length;
          return;
        }

        this.start = this.i += 2;

        while (!blankChar[this.data[this.i]] && !this.isClose()) {
          this.i++;
        }

        if (this.getName(this.section()) == name) {
          // 代码块高亮
          if (name == 'pre') {
            this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);
            return this.i = j;
          } else if (name == 'style') this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else if (name == 'title') this.title = this.data.substring(j + 1, this.i - 7);

          if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length; // 处理 svg

          if (name == 'svg') {
            var src = this.data.substring(j, this.i + 1);
            if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
            var i = j;

            while (this.data[j] != '<') {
              j--;
            }

            src = this.data.substring(j, i) + src;
            var parent = this.STACK[this.STACK.length - 1];
            if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline')) parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
            this.siblings().push({
              name: 'img',
              attrs: {
                src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
                ignore: 'T'
              }
            });
          }

          return;
        }
      }
    } // 处理属性

  }, {
    key: "matchAttr",
    value: function matchAttr(node) {
      var attrs = node.attrs,
          style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
          styleObj = {};

      if (attrs.id) {
        if (this.compress & 1) attrs.id = void 0;else if (this.useAnchor) this.bubble();
      }

      if (this.compress & 2 && attrs.class) attrs.class = void 0;

      switch (node.name) {
        case 'img':
          if (attrs['data-src']) {
            attrs.src = attrs.src || attrs['data-src'];
            attrs['data-src'] = void 0;
          }

          if (attrs.src && !attrs.ignore) {
            if (this.bubble()) attrs.i = (this.imgNum++).toString();else attrs.ignore = 'T';
          }

          break;

        case 'a':
        case 'ad':
          this.bubble();
          break;

        case 'font':
          if (attrs.color) {
            styleObj['color'] = attrs.color;
            attrs.color = void 0;
          }

          if (attrs.face) {
            styleObj['font-family'] = attrs.face;
            attrs.face = void 0;
          }

          if (attrs.size) {
            var size = parseInt(attrs.size);
            if (size < 1) size = 1;else if (size > 7) size = 7;
            var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
            styleObj['font-size'] = map[size - 1];
            attrs.size = void 0;
          }

          break;

        case 'video':
        case 'audio':
          if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else this["".concat(node.name, "Num")]++;

          if (node.name == 'video') {
            if (attrs.width) {
              style = "width:".concat(parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px'), ";").concat(style);
              attrs.width = void 0;
            }

            if (attrs.height) {
              style = "height:".concat(parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px'), ";").concat(style);
              attrs.height = void 0;
            }

            if (this.videoNum > 3) node.lazyLoad = true;
          }

          attrs.source = [];
          if (attrs.src) attrs.source.push(attrs.src);
          if (!attrs.controls && !attrs.autoplay) console.warn("\u5B58\u5728\u6CA1\u6709 controls \u5C5E\u6027\u7684 ".concat(node.name, " \u6807\u7B7E\uFF0C\u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u64AD\u653E"), node);
          this.bubble();
          break;

        case 'td':
        case 'th':
          if (attrs.colspan || attrs.rowspan) for (var k = this.STACK.length, item; item = this.STACK[--k];) {
            if (item.name == 'table') {
              item.c = void 0;
              break;
            }
          }
      }

      if (attrs.align) {
        styleObj['text-align'] = attrs.align;
        attrs.align = void 0;
      } // 压缩 style


      var styles = style.replace(/&quot;/g, '"').replace(/&amp;/g, '&').split(';');
      style = '';

      for (var i = 0, len = styles.length; i < len; i++) {
        var info = styles[i].split(':');
        if (info.length < 2) continue;

        var _key = info[0].trim().toLowerCase(),
            _value = info.slice(1).join(':').trim();

        if (_value.includes('-webkit') || _value.includes('-moz') || _value.includes('-ms') || _value.includes('-o') || _value.includes('safe')) style += ";".concat(_key, ":").concat(_value);else if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import')) styleObj[_key] = _value;
      }

      if (node.name == 'img' && parseInt(styleObj.width || attrs.width) > screenWidth) styleObj.height = 'auto';

      for (var key in styleObj) {
        var value = styleObj[key];
        if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1; // 填充链接

        if (value.includes('url')) {
          var j = value.indexOf('(');

          if (j++ != -1) {
            while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {
              j++;
            }

            value = value.substr(0, j) + this.getUrl(value.substr(j));
          }
        } // 转换 rpx
        else if (value.includes('rpx')) value = value.replace(/[0-9.\s]*rpx/g, function ($) {
            return parseFloat($) * screenWidth / 750 + 'px';
          });else if (key == 'white-space' && value.includes('pre')) this.pre = node.pre = true;

        style += ";".concat(key, ":").concat(value);
      }

      style = style.substr(1);
      if (style) attrs.style = style;
    } // 节点出栈处理

  }, {
    key: "popNode",
    value: function popNode(node) {
      // 空白符处理
      if (node.pre) {
        node.pre = this.pre = void 0;

        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].pre) this.pre = true;
        }
      }

      if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false) return this.siblings().pop();
      var attrs = node.attrs; // 替换一些标签名

      if (node.name == 'picture') {
        node.name = 'img';
        if (!attrs.src && (node.children[0] || '').name == 'img') attrs.src = node.children[0].attrs.src;
        if (attrs.src && !attrs.ignore) attrs.i = (this.imgNum++).toString();
        return node.children = void 0;
      }

      if (cfg.blockTags[node.name]) node.name = 'div';else if (!cfg.trustTags[node.name]) node.name = 'span'; // 处理列表

      if (node.c) {
        if (node.name == 'ul') {
          var floor = 1;

          for (var _i2 = this.STACK.length; _i2--;) {
            if (this.STACK[_i2].name == 'ul') floor++;
          }

          if (floor != 1) for (var _i3 = node.children.length; _i3--;) {
            node.children[_i3].floor = floor;
          }
        } else if (node.name == 'ol') {
          for (var _i4 = 0, num = 1, child; child = node.children[_i4++];) {
            if (child.name == 'li') {
              child.type = 'ol';

              child.num = function (num, type) {
                if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
                if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);

                if (type == 'i' || type == 'I') {
                  num = (num - 1) % 99 + 1;
                  var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
                      ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
                      res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
                  if (type == 'i') return res.toLowerCase();
                  return res;
                }

                return num;
              }(num++, attrs.type) + '.';
            }
          }
        }
      } // 处理表格的边框


      if (node.name == 'table') {
        var padding = attrs.cellpadding,
            spacing = attrs.cellspacing,
            border = attrs.border;

        if (node.c) {
          this.bubble();
          if (!padding) padding = 2;
          if (!spacing) spacing = 2;
        }

        if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
        if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
        if (border || padding) (function f(ns) {
          for (var i = 0, n; n = ns[i]; i++) {
            if (n.name == 'th' || n.name == 'td') {
              if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style);
              if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style);
            } else f(n.children || []);
          }
        })(node.children);
      }

      this.CssHandler.pop && this.CssHandler.pop(node); // 自动压缩

      if (node.name == 'div' && !Object.keys(attrs).length) {
        var siblings = this.siblings();
        if (!(node.children || []).length) siblings.pop();else if (node.children.length == 1 && node.children[0].name == 'div') siblings[siblings.length - 1] = node.children[0];
      }
    } // 工具函数

  }, {
    key: "bubble",
    value: function bubble() {
      for (var i = this.STACK.length, item; item = this.STACK[--i];) {
        if (cfg.richOnlyTags[item.name]) {
          if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
          return false;
        }

        item.c = 1;
      }

      return true;
    }
  }, {
    key: "getUrl",
    value: function getUrl(url) {
      if (url[0] == '/') {
        if (url[1] == '/') url = this.protocol + ':' + url;else if (this.domain) url = this.domain + url;
      } else if (this.domain && url.indexOf('data:') != 0 && !url.includes('://')) url = this.domain + '/' + url;

      return url;
    }
  }, {
    key: "Text",
    // 状态机
    value: function Text(c) {
      if (c == '<') {
        var next = this.data[this.i + 1],
            isLetter = function isLetter(c) {
          return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
        };

        if (isLetter(next)) {
          this.setText();
          this.start = this.i + 1;
          this.state = this.TagName;
        } else if (next == '/') {
          this.setText();

          if (isLetter(this.data[++this.i + 1])) {
            this.start = this.i + 1;
            this.state = this.EndTag;
          } else this.Comment();
        } else if (next == '!') {
          this.setText();
          this.Comment();
        }
      }
    }
  }, {
    key: "Comment",
    value: function Comment() {
      var key;
      if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else key = '>';
      if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else this.i += key.length - 1;
      this.start = this.i + 1;
      this.state = this.Text;
    }
  }, {
    key: "TagName",
    value: function TagName(c) {
      if (blankChar[c]) {
        this.tagName = this.section();

        while (blankChar[this.data[this.i]]) {
          this.i++;
        }

        if (this.isClose()) this.setNode();else {
          this.start = this.i;
          this.state = this.AttrName;
        }
      } else if (this.isClose()) {
        this.tagName = this.section();
        this.setNode();
      }
    }
  }, {
    key: "AttrName",
    value: function AttrName(c) {
      var blank = blankChar[c];

      if (blank) {
        this.attrName = this.section();
        c = this.data[this.i];
      }

      if (c == '=') {
        if (!blank) this.attrName = this.section();

        while (blankChar[this.data[++this.i]]) {
          ;
        }

        this.start = this.i--;
        this.state = this.AttrValue;
      } else if (blank) this.setAttr();else if (this.isClose()) {
        this.attrName = this.section();
        this.setAttr();
      }
    }
  }, {
    key: "AttrValue",
    value: function AttrValue(c) {
      if (c == '"' || c == "'") {
        this.start++;
        if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
        this.attrVal = this.section();
        this.i++;
      } else {
        for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {
          ;
        }

        this.attrVal = this.section();
      }

      this.setAttr();
    }
  }, {
    key: "EndTag",
    value: function EndTag(c) {
      if (blankChar[c] || c == '>' || c == '/') {
        var name = this.getName(this.section());

        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].name == name) break;
        }

        if (i != -1) {
          var node;

          while ((node = this.STACK.pop()).name != name) {
            ;
          }

          this.popNode(node);
        } else if (name == 'p' || name == 'br') this.siblings().push({
          name: name,
          attrs: {}
        });

        this.i = this.data.indexOf('>', this.i);
        this.start = this.i + 1;
        if (this.i == -1) this.i = this.data.length;else this.state = this.Text;
      }
    }
  }]);

  return MpHtmlParser;
}();

module.exports = MpHtmlParser;

/***/ }),

/***/ 117:
/*!**************************************************!*\
  !*** ./src/components/jyf-parser/libs/config.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* 配置文件 */
var canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容

module.exports = {
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (canIUse ? '' : ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr' + (canIUse ? ',rp' : '') + ',embed,iframe'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,picture,table' + (canIUse ? ',bdi,bdo,caption,rt,ruby' : '')),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的属性
  trustAttrs: makeMap('align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns'),
  // bool 型的属性
  boolAttrs: makeMap('autoplay,controls,ignore,loop,muted'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    img: 'max-width:100%',
    mark: 'background-color:yellow',
    picture: 'max-width:100%',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline'
  }
};

function makeMap(str) {
  var map = {},
      list = str.split(',');

  for (var i = list.length; i--;) {
    map[list[i]] = true;
  }

  return map;
}

/***/ }),

/***/ 118:
/*!******************************************************!*\
  !*** ./src/components/jyf-parser/libs/CssHandler.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  解析和匹配 Css 的选择器
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/03/15
*/
var cfg = __webpack_require__(/*! ./config.js */ 117);

var CssHandler =
/*#__PURE__*/
function () {
  function CssHandler(tagStyle) {
    var _this = this;

    _classCallCheck(this, CssHandler);

    _defineProperty(this, "getStyle", function (data) {
      return _this.styles = new CssParser(data, _this.styles).parse();
    });

    var styles = Object.assign({}, cfg.userAgentStyles);

    for (var item in tagStyle) {
      styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];
    }

    this.styles = styles;
  }

  _createClass(CssHandler, [{
    key: "match",
    value: function match(name, attrs) {
      var tmp,
          matched = (tmp = this.styles[name]) ? tmp + ';' : '';

      if (attrs.class) {
        var items = attrs.class.split(' ');

        for (var i = 0, item; item = items[i]; i++) {
          if (tmp = this.styles['.' + item]) matched += tmp + ';';
        }
      }

      if (tmp = this.styles['#' + attrs.id]) matched += tmp + ';';
      return matched;
    }
  }]);

  return CssHandler;
}();

module.exports = CssHandler;

var CssParser =
/*#__PURE__*/
function () {
  function CssParser(data, init) {
    var _this2 = this;

    _classCallCheck(this, CssParser);

    _defineProperty(this, "section", function () {
      return _this2.data.substring(_this2.start, _this2.i);
    });

    _defineProperty(this, "isLetter", function (c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
    });

    this.data = data;
    this.floor = 0;
    this.i = 0;
    this.list = [];
    this.res = init;
    this.state = this.Space;
  }

  _createClass(CssParser, [{
    key: "parse",
    value: function parse() {
      for (var c; c = this.data[this.i]; this.i++) {
        this.state(c);
      }

      return this.res;
    }
  }, {
    key: "Space",
    // 状态机
    value: function Space(c) {
      if (c == '.' || c == '#' || this.isLetter(c)) {
        this.start = this.i;
        this.state = this.Name;
      } else if (c == '/' && this.data[this.i + 1] == '*') this.Comment();else if (!cfg.blankChar[c] && c != ';') this.state = this.Ignore;
    }
  }, {
    key: "Comment",
    value: function Comment() {
      this.i = this.data.indexOf('*/', this.i) + 1;
      if (!this.i) this.i = this.data.length;
      this.state = this.Space;
    }
  }, {
    key: "Ignore",
    value: function Ignore(c) {
      if (c == '{') this.floor++;else if (c == '}' && ! --this.floor) this.state = this.Space;
    }
  }, {
    key: "Name",
    value: function Name(c) {
      if (cfg.blankChar[c]) {
        this.list.push(this.section());
        this.state = this.NameSpace;
      } else if (c == '{') {
        this.list.push(this.section());
        this.Content();
      } else if (c == ',') {
        this.list.push(this.section());
        this.Comma();
      } else if (!this.isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_') this.state = this.Ignore;
    }
  }, {
    key: "NameSpace",
    value: function NameSpace(c) {
      if (c == '{') this.Content();else if (c == ',') this.Comma();else if (!cfg.blankChar[c]) this.state = this.Ignore;
    }
  }, {
    key: "Comma",
    value: function Comma() {
      while (cfg.blankChar[this.data[++this.i]]) {
        ;
      }

      if (this.data[this.i] == '{') this.Content();else {
        this.start = this.i--;
        this.state = this.Name;
      }
    }
  }, {
    key: "Content",
    value: function Content() {
      this.start = ++this.i;
      if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
      var content = this.section();

      for (var i = 0, item; item = this.list[i++];) {
        if (this.res[item]) this.res[item] += ';' + content;else this.res[item] = content;
      }

      this.list = [];
      this.state = this.Space;
    }
  }]);

  return CssParser;
}();

/***/ }),

/***/ 12:
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 128:
/*!********************************************!*\
  !*** ./src/components/Basic/Icon/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(__webpack_require__(/*! ./index.vue */ 129));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Icon: _index.default,
  'name': 'icon',
  'text': '图片',
  'category': 'basic',
  'description': '图标',
  'author': 'haoming'
};
exports.default = _default;

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 17));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({});

var storeContext = __webpack_require__(18);

storeContext.keys().forEach(function (modules) {
  store.registerModule(modules.replace(/(^\.\/)|(\.js$)/g, ''), storeContext(modules).default);
});
_vue.default.prototype.$store = store;
var _default = store;
exports.default = _default;

/***/ }),

/***/ 17:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 18:
/*!**************************************!*\
  !*** ./src/store/modules sync \.js$ ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./question.js": 19,
	"./target.js": 21,
	"./user.js": 23
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 18;

/***/ }),

/***/ 19:
/*!***************************************!*\
  !*** ./src/store/modules/question.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 8));

var _func = _interopRequireDefault(__webpack_require__(/*! _u/func */ 20));

var _mutations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  score: 0,
  questionList: [],
  collectList: []
};
var mutations = (_mutations = {}, _defineProperty(_mutations, "SET_SCORE", function SET_SCORE(state, data) {
  state.score = data;
}), _defineProperty(_mutations, "SET_QUESTION_LIST", function SET_QUESTION_LIST(state, data) {
  state.questionList = data;
}), _defineProperty(_mutations, "SET_COLLECT_LIST", function SET_COLLECT_LIST(state, data) {
  state.collectList = data;
}), _mutations);
var getters = {
  questionList: function questionList(state) {
    return state.questionList;
  },
  score: function score(state) {
    return state.score;
  }
};
var actions = {
  // 获取试卷题目
  getQuestionList: function () {
    var _getQuestionList = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref, paperId) {
      var commit, QuestionPaper, questionPaper, query, Question, res;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              QuestionPaper = new wx.BaaS.TableObject("question_paper");
              questionPaper = QuestionPaper.getWithoutData(paperId);
              query = new wx.BaaS.Query();
              Question = new wx.BaaS.TableObject("question");
              query.compare("paper", "=", questionPaper);
              _context.next = 8;
              return Question.setQuery(query).find();

            case 8:
              res = _context.sent;
              commit("SET_QUESTION_LIST", res.data.objects);
              return _context.abrupt("return", res.data.objects);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getQuestionList(_x, _x2) {
      return _getQuestionList.apply(this, arguments);
    }

    return getQuestionList;
  }(),
  // 获取收藏题目
  getCollectList: function () {
    var _getCollectList = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(_ref2, paperId) {
      var commit, QuestionCollect, query, QuestionPaper, questionPaper, res;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              QuestionCollect = new wx.BaaS.TableObject("question_collect");
              query = new wx.BaaS.Query(); // 查询指定试卷收藏题目

              if (paperId) {
                QuestionPaper = new wx.BaaS.TableObject("question_paper");
                questionPaper = QuestionPaper.getWithoutData(paperId);
                query.compare("paper", "=", questionPaper);
              }

              _context2.next = 6;
              return QuestionCollect.setQuery(query).expand("question").find();

            case 6:
              res = _context2.sent;
              commit("SET_COLLECT_LIST", res.data.objects);
              return _context2.abrupt("return", res.data.objects);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getCollectList(_x3, _x4) {
      return _getCollectList.apply(this, arguments);
    }

    return getCollectList;
  }(),
  // 获取试卷内容
  getPaperDetail: function () {
    var _getPaperDetail = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(_ref3, _ref4) {
      var commit, dispatch, paperId, questionList, collectList;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit, dispatch = _ref3.dispatch;
              paperId = _ref4.paperId;
              uni.showLoading({
                title: "加载中..."
              });
              _context3.next = 5;
              return dispatch("getQuestionList", paperId);

            case 5:
              questionList = _context3.sent;
              _context3.next = 8;
              return dispatch("getCollectList", paperId);

            case 8:
              collectList = _context3.sent;
              // 合并数据
              questionList = questionList.map(function (item) {
                collectList = collectList.filter(function (collectItem) {
                  if (item.id === collectItem.question.id) {
                    item = Object.assign({
                      selectOption: -1,
                      isCollected: true,
                      collectId: collectItem.id
                    }, item);
                  }

                  return item.id !== collectItem.question.id;
                });
                item = Object.assign({
                  selectOption: -1,
                  isCollected: false
                }, item);
                return item;
              });
              commit("SET_QUESTION_LIST", questionList);
              uni.hideLoading();

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getPaperDetail(_x5, _x6) {
      return _getPaperDetail.apply(this, arguments);
    }

    return getPaperDetail;
  }(),
  // 获取试卷结果
  getPaperResult: function () {
    var _getPaperResult = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(_ref5, _ref6) {
      var commit, dispatch, resultId, paperId, questionList, collectList, PaperResult, paperResult, wrongQuestions, score;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref5.commit, dispatch = _ref5.dispatch;
              resultId = _ref6.resultId, paperId = _ref6.paperId;
              uni.showLoading({
                title: "加载中..."
              });

              if (!(state.questionList.length === 0)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 6;
              return dispatch("getQuestionList", paperId);

            case 6:
              _context4.t0 = _context4.sent;
              _context4.next = 10;
              break;

            case 9:
              _context4.t0 = state.questionList;

            case 10:
              questionList = _context4.t0;

              if (!(state.collectList.length === 0)) {
                _context4.next = 17;
                break;
              }

              _context4.next = 14;
              return dispatch("getCollectList", paperId);

            case 14:
              _context4.t1 = _context4.sent;
              _context4.next = 18;
              break;

            case 17:
              _context4.t1 = state.collectList;

            case 18:
              collectList = _context4.t1;
              PaperResult = new wx.BaaS.TableObject("paper_result");
              _context4.next = 22;
              return PaperResult.get(resultId);

            case 22:
              paperResult = _context4.sent;
              wrongQuestions = paperResult.data.wrongQuestions; // 计算分数

              score = 100 * ((questionList.length - wrongQuestions.length) / questionList.length).toFixed(1);
              commit("SET_SCORE", score); // 合并数据

              questionList = questionList.map(function (item) {
                collectList = collectList.filter(function (collectItem) {
                  if (item.id === collectItem.question.id) {
                    item = Object.assign({
                      selectOption: -1,
                      isCollected: true,
                      collectId: collectItem.id
                    }, item);
                  }

                  return item.id !== collectItem.question.id;
                }); // 错题筛选

                wrongQuestions = wrongQuestions.filter(function (wrongItem) {
                  if (wrongItem.id === item.id) {
                    item = Object.assign({
                      selectOption: wrongItem.selectOption,
                      wrongSelectOption: wrongItem.selectOption,
                      isShowAnswer: true,
                      isWrong: true
                    }, item);
                  }

                  return wrongItem.id !== item.id;
                });
                item = Object.assign({
                  selectOption: item.rightOption,
                  isCollected: false,
                  isWrong: false
                }, item);
                return item;
              });
              uni.hideLoading();
              commit("SET_QUESTION_LIST", questionList);

            case 29:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getPaperResult(_x7, _x8) {
      return _getPaperResult.apply(this, arguments);
    }

    return getPaperResult;
  }(),
  // 设置收藏题目
  // TODO 增加多英语题干单一的判断, 根据返回的收藏列表
  onCollectQuestion: function () {
    var _onCollectQuestion = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(_ref7, _ref8) {
      var commit, state, questionIndex, paperId, questionList, canCollect, QuestionCollect, QuestionPaper, Question, questionPaper, question, MyRecord, res;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref7.commit, state = _ref7.state;
              questionIndex = _ref8.questionIndex, paperId = _ref8.paperId;
              questionList = state.questionList;
              canCollect = !questionList[questionIndex]["isCollected"];
              QuestionCollect = new wx.BaaS.TableObject("question_collect");
              QuestionPaper = new wx.BaaS.TableObject("question_paper");
              Question = new wx.BaaS.TableObject("question");

              if (!canCollect) {
                _context5.next = 21;
                break;
              }

              if (!_func.default.isEmpty(paperId)) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("return", uni.showToast("缺少关联试卷"));

            case 10:
              questionPaper = QuestionPaper.getWithoutData(paperId);
              question = Question.getWithoutData(questionList[questionIndex].id);
              MyRecord = QuestionCollect.create();
              MyRecord.set({
                paper: questionPaper,
                question: question
              });
              _context5.next = 16;
              return MyRecord.save();

            case 16:
              res = _context5.sent;
              questionList[questionIndex] = Object.assign(questionList[questionIndex], {
                isCollected: true,
                collectId: res.data.id
              });
              uni.showToast({
                title: "收藏成功!"
              });
              _context5.next = 24;
              break;

            case 21:
              // 取消收藏
              QuestionCollect.delete(questionList[questionIndex]["collectId"]);
              questionList[questionIndex] = Object.assign(questionList[questionIndex], {
                isCollected: false,
                collectId: null
              });
              uni.showToast({
                title: "已取消收藏!",
                icon: "none"
              });

            case 24:
              commit("SET_QUESTION_LIST", questionList);

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function onCollectQuestion(_x9, _x10) {
      return _onCollectQuestion.apply(this, arguments);
    }

    return onCollectQuestion;
  }(),
  // 设置选择选项
  onSelectOption: function onSelectOption(_ref9, _ref10) {
    var commit = _ref9.commit;
    var questionIndex = _ref10.questionIndex,
        optionIndex = _ref10.optionIndex;
    var questionList = state.questionList;
    questionList[questionIndex]["selectOption"] = optionIndex;
    uni.vibrateShort();
    commit("SET_QUESTION_LIST", questionList);
  }
};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***************************!*\
  !*** ./src/utils/func.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 通用工具类
 */
var func =
/*#__PURE__*/
function () {
  function func() {
    _classCallCheck(this, func);
  }

  _createClass(func, null, [{
    key: "notEmpty",

    /**
     * 不为空
     * @param val
     * @returns {boolean}
     */
    value: function notEmpty(val) {
      return !this.isEmpty(val);
    }
    /**
     * 是否为定义
     * @param val
     * @returns {boolean}
     */

  }, {
    key: "isUndefined",
    value: function isUndefined(val) {
      return val === null || typeof val === 'undefined';
    }
    /**
     * 为空
     * @param val
     * @returns {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(val) {
      if (val === null || typeof val === 'undefined' || JSON.stringify(val) === '{}' || typeof val === 'string' && val === '' && val !== 'undefined') {
        return true;
      }

      return false;
    }
    /**
     * 强转int型
     * @param val
     * @param defaultValue
     * @returns {number}
     */

  }, {
    key: "toInt",
    value: function toInt(val, defaultValue) {
      if (this.isEmpty(val)) {
        return defaultValue === undefined ? -1 : defaultValue;
      }

      var num = parseInt(val, 0);
      return Number.isNaN(num) ? defaultValue === undefined ? -1 : defaultValue : num;
    }
    /**
     * Json强转为Form类型
     * @param obj
     * @returns {FormData}
     */

  }, {
    key: "toFormData",
    value: function toFormData(obj) {
      var data = new FormData();
      Object.keys(obj).forEach(function (key) {
        data.append(key, Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]);
      });
      return data;
    }
    /**
     * date类转为字符串格式
     * @param date
     * @param format
     * @returns {null}
     */

  }, {
    key: "format",
    value: function format(date) {
      var _format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

      return date ? date.format(_format) : null;
    }
    /**
     * 根据逗号联合
     * @param arr
     * @returns {string}
     */

  }, {
    key: "join",
    value: function join(arr) {
      return arr ? arr.join(',') : '';
    }
    /**
     * 根据逗号分隔
     * @param str
     * @returns {string}
     */

  }, {
    key: "split",
    value: function split(str) {
      return str ? String(str).split(',') : '';
    }
  }]);

  return func;
}();

exports.default = func;

/***/ }),

/***/ 21:
/*!*************************************!*\
  !*** ./src/store/modules/target.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 8));

var _date = __webpack_require__(/*! _u/date */ 22);

var _func = _interopRequireDefault(__webpack_require__(/*! _u/func */ 20));

var _mutations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  userTarget: {},
  timeInterval: {}
};
var mutations = (_mutations = {}, _defineProperty(_mutations, "SET_USER_TARGET", function SET_USER_TARGET(state, data) {
  state.userTarget = data;
}), _defineProperty(_mutations, "SET_TIME_INTERVAL", function SET_TIME_INTERVAL(state, data) {
  state.timeInterval = data;
}), _mutations);
var getters = {
  remainDay: function remainDay(state) {
    if (_func.default.notEmpty(state.userTarget)) {
      // 返回目标时间与当前时间的间隔
      return (0, _date.dateDifference)(new Date(), state.userTarget.target.detailDate);
    } else {
      return "";
    }
  },
  targetYear: function targetYear(state) {
    if (_func.default.notEmpty(state.userTarget)) {
      return state.userTarget.target.year;
    } else {
      return "";
    }
  },
  timeInterval: function timeInterval(state) {
    return state.timeInterval;
  }
};
var actions = {
  getUserTarget: function getUserTarget(_ref) {
    var commit = _ref.commit;
    var UserTarget = new wx.BaaS.TableObject("user_target");
    UserTarget.expand("target").find().then(function (res) {
      if (res.data.objects.length !== 0) {
        commit("SET_USER_TARGET", res.data.objects[0]);
      }
    }).catch(console.error);
  },
  // 获取目标区间
  getTimeInterval: function getTimeInterval(_ref2) {
    var commit = _ref2.commit;
    var TargetTimes = new wx.BaaS.TableObject("target_year");
    TargetTimes.find().then(function (res) {
      if (res.statusCode === 200) {
        var timeArray = JSON.parse(JSON.stringify(res.data.objects));
        var time = {
          timeArray: timeArray,
          startTime: res.data.objects.shift(),
          endTime: res.data.objects.pop()
        };
        commit("SET_TIME_INTERVAL", time);
      }
    });
  },
  // 设置目标
  setTargetChange: function () {
    var _setTargetChange = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref3, target) {
      var commit, state, TargetTimes, UserTarget, targetTime, myRecord;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref3.commit, state = _ref3.state;
              TargetTimes = new wx.BaaS.TableObject("target_year");
              UserTarget = new wx.BaaS.TableObject("user_target");
              targetTime = TargetTimes.getWithoutData(target.id);
              myRecord = null; // 如果已存在目标年则更新, 没有则创建

              if (!_func.default.notEmpty(state.userTarget)) {
                _context.next = 12;
                break;
              }

              myRecord = UserTarget.getWithoutData(state.userTarget.id);
              myRecord.set("target", targetTime);
              _context.next = 10;
              return myRecord.update();

            case 10:
              _context.next = 16;
              break;

            case 12:
              myRecord = UserTarget.create();
              myRecord.set({
                target: targetTime
              });
              _context.next = 16;
              return myRecord.save();

            case 16:
              uni.showToast({
                title: _func.default.notEmpty(state.userTarget) ? "更新成功" : "创建成功"
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function setTargetChange(_x, _x2) {
      return _setTargetChange.apply(this, arguments);
    }

    return setTargetChange;
  }()
};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!***************************!*\
  !*** ./src/utils/date.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTime = parseTime;
exports.dateDifference = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 格式化时间戳为时间字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  var format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  var date;

  if (_typeof(time) === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }

    date = new Date(time);
  }

  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
    var value = formatObj[key]; // Note: getDay() returns 0 on Sunday

    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }

    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }

    return value || 0;
  });
  return time_str;
}
/**
 * 判断两个时间戳间隔时间
 * @param {(string|number)} faultDate
 * @param {(string|number)} completeTime
 * @returns {string}
 */


var dateDifference = function dateDifference(faultDate, completeTime) {
  var stime = new Date(faultDate).getTime();
  var etime = new Date(completeTime).getTime();
  var usedTime = etime - stime; //两个时间戳相差的毫秒数

  var days = Math.floor(usedTime / (24 * 3600 * 1000)); //计算出小时数

  var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数

  var hours = Math.floor(leave1 / (3600 * 1000)); //计算相差分钟数

  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数

  var minutes = Math.floor(leave2 / (60 * 1000)); // let time = days + "天"+hours+"时"+minutes+"分";

  var time = days;
  return time;
};

exports.dateDifference = dateDifference;

/***/ }),

/***/ 23:
/*!***********************************!*\
  !*** ./src/store/modules/user.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 8));

var _mutations_type = __webpack_require__(/*! ./../mutations_type */ 24);

var _date = __webpack_require__(/*! _u/date */ 22);

var _func = _interopRequireDefault(__webpack_require__(/*! _u/func */ 20));

var _mutations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  userInfo: {},
  isAuth: false,
  hasUserInfo: false
};
var mutations = (_mutations = {}, _defineProperty(_mutations, _mutations_type.SET_USERINFO, function (state, data) {
  state.userInfo = data;
}), _defineProperty(_mutations, _mutations_type.SET_ISAUTH, function (state, data) {
  state.isAuth = data;
}), _mutations);
var getters = {
  userInfo: function userInfo(state) {
    return state.userInfo;
  },
  userId: function userId(state) {
    return state.userInfo.userId;
  },
  isAuth: function isAuth(state) {
    return state.isAuth;
  }
};
var actions = {
  // 获取用户信息
  getUserInfo: function () {
    var _getUserInfo = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref) {
      var commit, user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.prev = 1;
              _context.next = 4;
              return wx.BaaS.auth.loginWithWechat();

            case 4:
              user = _context.sent;
              // user 为 currentUser 对象
              commit(_mutations_type.SET_USERINFO, {
                nickname: user.nickname,
                avatar: user.avatar,
                userId: user.user_id,
                created_at: user.created_at
              });
              commit(_mutations_type.SET_ISAUTH, user.is_authorized || false);
              return _context.abrupt("return", true);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              console.log('getUserInfo', _context.t0);
              commit(_mutations_type.SET_ISAUTH, false);
              return _context.abrupt("return", false);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10]]);
    }));

    function getUserInfo(_x) {
      return _getUserInfo.apply(this, arguments);
    }

    return getUserInfo;
  }(),
  // 微信用户授权
  authUserInfo: function () {
    var _authUserInfo = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(_ref2, userInfo) {
      var commit, res;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              uni.showLoading({
                title: '登录中...'
              });
              _context2.next = 4;
              return wx.BaaS.auth.loginWithWechat(userInfo, {
                syncUserProfile: 'overwrite'
              });

            case 4:
              res = _context2.sent;
              uni.hideLoading();
              commit(_mutations_type.SET_USERINFO, {
                nickname: res.nickname,
                avatar: res.avatar,
                userId: res.user_id,
                created_at: res.created_at
              });
              commit(_mutations_type.SET_ISAUTH, true);
              return _context2.abrupt("return", true);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function authUserInfo(_x2, _x3) {
      return _authUserInfo.apply(this, arguments);
    }

    return authUserInfo;
  }()
};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!*************************************!*\
  !*** ./src/store/mutations_type.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_ISAUTH = exports.SET_USERINFO = exports.SET_AVATAR = exports.SET_NICKNAME = exports.SET_OPENID = void 0;
var SET_OPENID = 'SET_OPENID';
exports.SET_OPENID = SET_OPENID;
var SET_NICKNAME = 'SET_NICKNAME';
exports.SET_NICKNAME = SET_NICKNAME;
var SET_AVATAR = 'SET_AVATAR';
exports.SET_AVATAR = SET_AVATAR;
var SET_USERINFO = 'SET_USERINFO';
exports.SET_USERINFO = SET_USERINFO;
var SET_ISAUTH = 'SET_ISAUTH';
exports.SET_ISAUTH = SET_ISAUTH;

/***/ }),

/***/ 25:
/*!******************************!*\
  !*** ./src/filters/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterUserLazyImg = filterUserLazyImg;
Object.defineProperty(exports, "parseTime", {
  enumerable: true,
  get: function get() {
    return _date.parseTime;
  }
});
Object.defineProperty(exports, "formatTime", {
  enumerable: true,
  get: function get() {
    return _date.formatTime;
  }
});

var _date = __webpack_require__(/*! _u/date */ 22);

function filterUserLazyImg(value) {
  return {
    src: value,
    error: '/img/head.png',
    loading: '/img/loading.gif'
  };
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!************************!*\
  !*** ./src/pages.json ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 64:
/*!*************************!*\
  !*** ./src/utils/wx.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoginModal = void 0;

var showLoginModal = function showLoginModal() {
  uni.showModal({
    title: '提示',
    content: '请先进行用户登录',
    success: function success(res) {
      if (res.confirm) {
        uni.redirectTo({
          url: '/pages/home/index'
        });
      }
    }
  });
};

exports.showLoginModal = showLoginModal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 8:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 9);


/***/ }),

/***/ 9:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 10);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map