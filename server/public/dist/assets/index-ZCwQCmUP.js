var Vv = Object.defineProperty;
var Zv = (n, l, i) =>
  l in n
    ? Vv(n, l, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (n[l] = i);
var ic = (n, l, i) => Zv(n, typeof l != "symbol" ? l + "" : l, i);
(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const f of o)
      if (f.type === "childList")
        for (const h of f.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && s(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(o) {
    const f = {};
    return (
      o.integrity && (f.integrity = o.integrity),
      o.referrerPolicy && (f.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (f.credentials = "omit")
          : (f.credentials = "same-origin"),
      f
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const f = i(o);
    fetch(o.href, f);
  }
})();
function Kv(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var sc = { exports: {} },
  br = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ay;
function $v() {
  if (ay) return br;
  ay = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function i(s, o, f) {
    var h = null;
    if (
      (f !== void 0 && (h = "" + f),
      o.key !== void 0 && (h = "" + o.key),
      "key" in o)
    ) {
      f = {};
      for (var p in o) p !== "key" && (f[p] = o[p]);
    } else f = o;
    return (
      (o = f.ref),
      { $$typeof: n, type: s, key: h, ref: o !== void 0 ? o : null, props: f }
    );
  }
  return (br.Fragment = l), (br.jsx = i), (br.jsxs = i), br;
}
var ny;
function Jv() {
  return ny || ((ny = 1), (sc.exports = $v())), sc.exports;
}
var d = Jv(),
  uc = { exports: {} },
  ce = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ly;
function Pv() {
  if (ly) return ce;
  ly = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    x = Symbol.iterator;
  function w(N) {
    return N === null || typeof N != "object"
      ? null
      : ((N = (x && N[x]) || N["@@iterator"]),
        typeof N == "function" ? N : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    E = Object.assign,
    S = {};
  function R(N, V, W) {
    (this.props = N),
      (this.context = V),
      (this.refs = S),
      (this.updater = W || C);
  }
  (R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (N, V) {
      if (typeof N != "object" && typeof N != "function" && N != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, N, V, "setState");
    }),
    (R.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, "forceUpdate");
    });
  function O() {}
  O.prototype = R.prototype;
  function M(N, V, W) {
    (this.props = N),
      (this.context = V),
      (this.refs = S),
      (this.updater = W || C);
  }
  var B = (M.prototype = new O());
  (B.constructor = M), E(B, R.prototype), (B.isPureReactComponent = !0);
  var G = Array.isArray,
    q = { H: null, A: null, T: null, S: null, V: null },
    Z = Object.prototype.hasOwnProperty;
  function K(N, V, W, J, le, ge) {
    return (
      (W = ge.ref),
      { $$typeof: n, type: N, key: V, ref: W !== void 0 ? W : null, props: ge }
    );
  }
  function P(N, V) {
    return K(N.type, V, void 0, void 0, void 0, N.props);
  }
  function F(N) {
    return typeof N == "object" && N !== null && N.$$typeof === n;
  }
  function ee(N) {
    var V = { "=": "=0", ":": "=2" };
    return (
      "$" +
      N.replace(/[=:]/g, function (W) {
        return V[W];
      })
    );
  }
  var Ee = /\/+/g;
  function Te(N, V) {
    return typeof N == "object" && N !== null && N.key != null
      ? ee("" + N.key)
      : V.toString(36);
  }
  function it() {}
  function At(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (
          (typeof N.status == "string"
            ? N.then(it, it)
            : ((N.status = "pending"),
              N.then(
                function (V) {
                  N.status === "pending" &&
                    ((N.status = "fulfilled"), (N.value = V));
                },
                function (V) {
                  N.status === "pending" &&
                    ((N.status = "rejected"), (N.reason = V));
                }
              )),
          N.status)
        ) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function Le(N, V, W, J, le) {
    var ge = typeof N;
    (ge === "undefined" || ge === "boolean") && (N = null);
    var ue = !1;
    if (N === null) ue = !0;
    else
      switch (ge) {
        case "bigint":
        case "string":
        case "number":
          ue = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case l:
              ue = !0;
              break;
            case v:
              return (ue = N._init), Le(ue(N._payload), V, W, J, le);
          }
      }
    if (ue)
      return (
        (le = le(N)),
        (ue = J === "" ? "." + Te(N, 0) : J),
        G(le)
          ? ((W = ""),
            ue != null && (W = ue.replace(Ee, "$&/") + "/"),
            Le(le, V, W, "", function (Ea) {
              return Ea;
            }))
          : le != null &&
            (F(le) &&
              (le = P(
                le,
                W +
                  (le.key == null || (N && N.key === le.key)
                    ? ""
                    : ("" + le.key).replace(Ee, "$&/") + "/") +
                  ue
              )),
            V.push(le)),
        1
      );
    ue = 0;
    var vt = J === "" ? "." : J + ":";
    if (G(N))
      for (var Me = 0; Me < N.length; Me++)
        (J = N[Me]), (ge = vt + Te(J, Me)), (ue += Le(J, V, W, ge, le));
    else if (((Me = w(N)), typeof Me == "function"))
      for (N = Me.call(N), Me = 0; !(J = N.next()).done; )
        (J = J.value), (ge = vt + Te(J, Me++)), (ue += Le(J, V, W, ge, le));
    else if (ge === "object") {
      if (typeof N.then == "function") return Le(At(N), V, W, J, le);
      throw (
        ((V = String(N)),
        Error(
          "Objects are not valid as a React child (found: " +
            (V === "[object Object]"
              ? "object with keys {" + Object.keys(N).join(", ") + "}"
              : V) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return ue;
  }
  function U(N, V, W) {
    if (N == null) return N;
    var J = [],
      le = 0;
    return (
      Le(N, J, "", "", function (ge) {
        return V.call(W, ge, le++);
      }),
      J
    );
  }
  function $(N) {
    if (N._status === -1) {
      var V = N._result;
      (V = V()),
        V.then(
          function (W) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 1), (N._result = W));
          },
          function (W) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 2), (N._result = W));
          }
        ),
        N._status === -1 && ((N._status = 0), (N._result = V));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var te =
    typeof reportError == "function"
      ? reportError
      : function (N) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var V = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof N == "object" &&
                N !== null &&
                typeof N.message == "string"
                  ? String(N.message)
                  : String(N),
              error: N,
            });
            if (!window.dispatchEvent(V)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", N);
            return;
          }
          console.error(N);
        };
  function fe() {}
  return (
    (ce.Children = {
      map: U,
      forEach: function (N, V, W) {
        U(
          N,
          function () {
            V.apply(this, arguments);
          },
          W
        );
      },
      count: function (N) {
        var V = 0;
        return (
          U(N, function () {
            V++;
          }),
          V
        );
      },
      toArray: function (N) {
        return (
          U(N, function (V) {
            return V;
          }) || []
        );
      },
      only: function (N) {
        if (!F(N))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return N;
      },
    }),
    (ce.Component = R),
    (ce.Fragment = i),
    (ce.Profiler = o),
    (ce.PureComponent = M),
    (ce.StrictMode = s),
    (ce.Suspense = g),
    (ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
    (ce.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return q.H.useMemoCache(N);
      },
    }),
    (ce.cache = function (N) {
      return function () {
        return N.apply(null, arguments);
      };
    }),
    (ce.cloneElement = function (N, V, W) {
      if (N == null)
        throw Error(
          "The argument must be a React element, but you passed " + N + "."
        );
      var J = E({}, N.props),
        le = N.key,
        ge = void 0;
      if (V != null)
        for (ue in (V.ref !== void 0 && (ge = void 0),
        V.key !== void 0 && (le = "" + V.key),
        V))
          !Z.call(V, ue) ||
            ue === "key" ||
            ue === "__self" ||
            ue === "__source" ||
            (ue === "ref" && V.ref === void 0) ||
            (J[ue] = V[ue]);
      var ue = arguments.length - 2;
      if (ue === 1) J.children = W;
      else if (1 < ue) {
        for (var vt = Array(ue), Me = 0; Me < ue; Me++)
          vt[Me] = arguments[Me + 2];
        J.children = vt;
      }
      return K(N.type, le, void 0, void 0, ge, J);
    }),
    (ce.createContext = function (N) {
      return (
        (N = {
          $$typeof: h,
          _currentValue: N,
          _currentValue2: N,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (N.Provider = N),
        (N.Consumer = { $$typeof: f, _context: N }),
        N
      );
    }),
    (ce.createElement = function (N, V, W) {
      var J,
        le = {},
        ge = null;
      if (V != null)
        for (J in (V.key !== void 0 && (ge = "" + V.key), V))
          Z.call(V, J) &&
            J !== "key" &&
            J !== "__self" &&
            J !== "__source" &&
            (le[J] = V[J]);
      var ue = arguments.length - 2;
      if (ue === 1) le.children = W;
      else if (1 < ue) {
        for (var vt = Array(ue), Me = 0; Me < ue; Me++)
          vt[Me] = arguments[Me + 2];
        le.children = vt;
      }
      if (N && N.defaultProps)
        for (J in ((ue = N.defaultProps), ue))
          le[J] === void 0 && (le[J] = ue[J]);
      return K(N, ge, void 0, void 0, null, le);
    }),
    (ce.createRef = function () {
      return { current: null };
    }),
    (ce.forwardRef = function (N) {
      return { $$typeof: p, render: N };
    }),
    (ce.isValidElement = F),
    (ce.lazy = function (N) {
      return { $$typeof: v, _payload: { _status: -1, _result: N }, _init: $ };
    }),
    (ce.memo = function (N, V) {
      return { $$typeof: m, type: N, compare: V === void 0 ? null : V };
    }),
    (ce.startTransition = function (N) {
      var V = q.T,
        W = {};
      q.T = W;
      try {
        var J = N(),
          le = q.S;
        le !== null && le(W, J),
          typeof J == "object" &&
            J !== null &&
            typeof J.then == "function" &&
            J.then(fe, te);
      } catch (ge) {
        te(ge);
      } finally {
        q.T = V;
      }
    }),
    (ce.unstable_useCacheRefresh = function () {
      return q.H.useCacheRefresh();
    }),
    (ce.use = function (N) {
      return q.H.use(N);
    }),
    (ce.useActionState = function (N, V, W) {
      return q.H.useActionState(N, V, W);
    }),
    (ce.useCallback = function (N, V) {
      return q.H.useCallback(N, V);
    }),
    (ce.useContext = function (N) {
      return q.H.useContext(N);
    }),
    (ce.useDebugValue = function () {}),
    (ce.useDeferredValue = function (N, V) {
      return q.H.useDeferredValue(N, V);
    }),
    (ce.useEffect = function (N, V, W) {
      var J = q.H;
      if (typeof W == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return J.useEffect(N, V);
    }),
    (ce.useId = function () {
      return q.H.useId();
    }),
    (ce.useImperativeHandle = function (N, V, W) {
      return q.H.useImperativeHandle(N, V, W);
    }),
    (ce.useInsertionEffect = function (N, V) {
      return q.H.useInsertionEffect(N, V);
    }),
    (ce.useLayoutEffect = function (N, V) {
      return q.H.useLayoutEffect(N, V);
    }),
    (ce.useMemo = function (N, V) {
      return q.H.useMemo(N, V);
    }),
    (ce.useOptimistic = function (N, V) {
      return q.H.useOptimistic(N, V);
    }),
    (ce.useReducer = function (N, V, W) {
      return q.H.useReducer(N, V, W);
    }),
    (ce.useRef = function (N) {
      return q.H.useRef(N);
    }),
    (ce.useState = function (N) {
      return q.H.useState(N);
    }),
    (ce.useSyncExternalStore = function (N, V, W) {
      return q.H.useSyncExternalStore(N, V, W);
    }),
    (ce.useTransition = function () {
      return q.H.useTransition();
    }),
    (ce.version = "19.1.0"),
    ce
  );
}
var ry;
function Ts() {
  return ry || ((ry = 1), (uc.exports = Pv())), uc.exports;
}
var T = Ts();
const be = Kv(T);
var oc = { exports: {} },
  xr = {},
  cc = { exports: {} },
  fc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var iy;
function Fv() {
  return (
    iy ||
      ((iy = 1),
      (function (n) {
        function l(U, $) {
          var te = U.length;
          U.push($);
          e: for (; 0 < te; ) {
            var fe = (te - 1) >>> 1,
              N = U[fe];
            if (0 < o(N, $)) (U[fe] = $), (U[te] = N), (te = fe);
            else break e;
          }
        }
        function i(U) {
          return U.length === 0 ? null : U[0];
        }
        function s(U) {
          if (U.length === 0) return null;
          var $ = U[0],
            te = U.pop();
          if (te !== $) {
            U[0] = te;
            e: for (var fe = 0, N = U.length, V = N >>> 1; fe < V; ) {
              var W = 2 * (fe + 1) - 1,
                J = U[W],
                le = W + 1,
                ge = U[le];
              if (0 > o(J, te))
                le < N && 0 > o(ge, J)
                  ? ((U[fe] = ge), (U[le] = te), (fe = le))
                  : ((U[fe] = J), (U[W] = te), (fe = W));
              else if (le < N && 0 > o(ge, te))
                (U[fe] = ge), (U[le] = te), (fe = le);
              else break e;
            }
          }
          return $;
        }
        function o(U, $) {
          var te = U.sortIndex - $.sortIndex;
          return te !== 0 ? te : U.id - $.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            p = h.now();
          n.unstable_now = function () {
            return h.now() - p;
          };
        }
        var g = [],
          m = [],
          v = 1,
          x = null,
          w = 3,
          C = !1,
          E = !1,
          S = !1,
          R = !1,
          O = typeof setTimeout == "function" ? setTimeout : null,
          M = typeof clearTimeout == "function" ? clearTimeout : null,
          B = typeof setImmediate < "u" ? setImmediate : null;
        function G(U) {
          for (var $ = i(m); $ !== null; ) {
            if ($.callback === null) s(m);
            else if ($.startTime <= U)
              s(m), ($.sortIndex = $.expirationTime), l(g, $);
            else break;
            $ = i(m);
          }
        }
        function q(U) {
          if (((S = !1), G(U), !E))
            if (i(g) !== null) (E = !0), Z || ((Z = !0), Te());
            else {
              var $ = i(m);
              $ !== null && Le(q, $.startTime - U);
            }
        }
        var Z = !1,
          K = -1,
          P = 5,
          F = -1;
        function ee() {
          return R ? !0 : !(n.unstable_now() - F < P);
        }
        function Ee() {
          if (((R = !1), Z)) {
            var U = n.unstable_now();
            F = U;
            var $ = !0;
            try {
              e: {
                (E = !1), S && ((S = !1), M(K), (K = -1)), (C = !0);
                var te = w;
                try {
                  t: {
                    for (
                      G(U), x = i(g);
                      x !== null && !(x.expirationTime > U && ee());

                    ) {
                      var fe = x.callback;
                      if (typeof fe == "function") {
                        (x.callback = null), (w = x.priorityLevel);
                        var N = fe(x.expirationTime <= U);
                        if (((U = n.unstable_now()), typeof N == "function")) {
                          (x.callback = N), G(U), ($ = !0);
                          break t;
                        }
                        x === i(g) && s(g), G(U);
                      } else s(g);
                      x = i(g);
                    }
                    if (x !== null) $ = !0;
                    else {
                      var V = i(m);
                      V !== null && Le(q, V.startTime - U), ($ = !1);
                    }
                  }
                  break e;
                } finally {
                  (x = null), (w = te), (C = !1);
                }
                $ = void 0;
              }
            } finally {
              $ ? Te() : (Z = !1);
            }
          }
        }
        var Te;
        if (typeof B == "function")
          Te = function () {
            B(Ee);
          };
        else if (typeof MessageChannel < "u") {
          var it = new MessageChannel(),
            At = it.port2;
          (it.port1.onmessage = Ee),
            (Te = function () {
              At.postMessage(null);
            });
        } else
          Te = function () {
            O(Ee, 0);
          };
        function Le(U, $) {
          K = O(function () {
            U(n.unstable_now());
          }, $);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (U) {
            U.callback = null;
          }),
          (n.unstable_forceFrameRate = function (U) {
            0 > U || 125 < U
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (P = 0 < U ? Math.floor(1e3 / U) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return w;
          }),
          (n.unstable_next = function (U) {
            switch (w) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = w;
            }
            var te = w;
            w = $;
            try {
              return U();
            } finally {
              w = te;
            }
          }),
          (n.unstable_requestPaint = function () {
            R = !0;
          }),
          (n.unstable_runWithPriority = function (U, $) {
            switch (U) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                U = 3;
            }
            var te = w;
            w = U;
            try {
              return $();
            } finally {
              w = te;
            }
          }),
          (n.unstable_scheduleCallback = function (U, $, te) {
            var fe = n.unstable_now();
            switch (
              (typeof te == "object" && te !== null
                ? ((te = te.delay),
                  (te = typeof te == "number" && 0 < te ? fe + te : fe))
                : (te = fe),
              U)
            ) {
              case 1:
                var N = -1;
                break;
              case 2:
                N = 250;
                break;
              case 5:
                N = 1073741823;
                break;
              case 4:
                N = 1e4;
                break;
              default:
                N = 5e3;
            }
            return (
              (N = te + N),
              (U = {
                id: v++,
                callback: $,
                priorityLevel: U,
                startTime: te,
                expirationTime: N,
                sortIndex: -1,
              }),
              te > fe
                ? ((U.sortIndex = te),
                  l(m, U),
                  i(g) === null &&
                    U === i(m) &&
                    (S ? (M(K), (K = -1)) : (S = !0), Le(q, te - fe)))
                : ((U.sortIndex = N),
                  l(g, U),
                  E || C || ((E = !0), Z || ((Z = !0), Te()))),
              U
            );
          }),
          (n.unstable_shouldYield = ee),
          (n.unstable_wrapCallback = function (U) {
            var $ = w;
            return function () {
              var te = w;
              w = $;
              try {
                return U.apply(this, arguments);
              } finally {
                w = te;
              }
            };
          });
      })(fc)),
    fc
  );
}
var sy;
function Wv() {
  return sy || ((sy = 1), (cc.exports = Fv())), cc.exports;
}
var dc = { exports: {} },
  lt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var uy;
function Iv() {
  if (uy) return lt;
  uy = 1;
  var n = Ts();
  function l(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      g +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var s = {
      d: {
        f: i,
        r: function () {
          throw Error(l(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function f(g, m, v) {
    var x =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: x == null ? null : "" + x,
      children: g,
      containerInfo: m,
      implementation: v,
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, m) {
    if (g === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (lt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (lt.createPortal = function (g, m) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(l(299));
      return f(g, m, null, v);
    }),
    (lt.flushSync = function (g) {
      var m = h.T,
        v = s.p;
      try {
        if (((h.T = null), (s.p = 2), g)) return g();
      } finally {
        (h.T = m), (s.p = v), s.d.f();
      }
    }),
    (lt.preconnect = function (g, m) {
      typeof g == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        s.d.C(g, m));
    }),
    (lt.prefetchDNS = function (g) {
      typeof g == "string" && s.d.D(g);
    }),
    (lt.preinit = function (g, m) {
      if (typeof g == "string" && m && typeof m.as == "string") {
        var v = m.as,
          x = p(v, m.crossOrigin),
          w = typeof m.integrity == "string" ? m.integrity : void 0,
          C = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        v === "style"
          ? s.d.S(g, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: x,
              integrity: w,
              fetchPriority: C,
            })
          : v === "script" &&
            s.d.X(g, {
              crossOrigin: x,
              integrity: w,
              fetchPriority: C,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (lt.preinitModule = function (g, m) {
      if (typeof g == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var v = p(m.as, m.crossOrigin);
            s.d.M(g, {
              crossOrigin: v,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && s.d.M(g);
    }),
    (lt.preload = function (g, m) {
      if (
        typeof g == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var v = m.as,
          x = p(v, m.crossOrigin);
        s.d.L(g, v, {
          crossOrigin: x,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (lt.preloadModule = function (g, m) {
      if (typeof g == "string")
        if (m) {
          var v = p(m.as, m.crossOrigin);
          s.d.m(g, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else s.d.m(g);
    }),
    (lt.requestFormReset = function (g) {
      s.d.r(g);
    }),
    (lt.unstable_batchedUpdates = function (g, m) {
      return g(m);
    }),
    (lt.useFormState = function (g, m, v) {
      return h.H.useFormState(g, m, v);
    }),
    (lt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (lt.version = "19.1.0"),
    lt
  );
}
var oy;
function e1() {
  if (oy) return dc.exports;
  oy = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return n(), (dc.exports = Iv()), dc.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var cy;
function t1() {
  if (cy) return xr;
  cy = 1;
  var n = Wv(),
    l = Ts(),
    i = e1();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (f(e) !== e) throw Error(s(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (((r = u.return), r !== null)) {
          a = r;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === a) return p(u), e;
          if (c === r) return p(u), t;
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (a.return !== r.return) (a = u), (r = c);
      else {
        for (var y = !1, b = u.child; b; ) {
          if (b === a) {
            (y = !0), (a = u), (r = c);
            break;
          }
          if (b === r) {
            (y = !0), (r = u), (a = c);
            break;
          }
          b = b.sibling;
        }
        if (!y) {
          for (b = c.child; b; ) {
            if (b === a) {
              (y = !0), (a = c), (r = u);
              break;
            }
            if (b === r) {
              (y = !0), (r = c), (a = u);
              break;
            }
            b = b.sibling;
          }
          if (!y) throw Error(s(189));
        }
      }
      if (a.alternate !== r) throw Error(s(190));
    }
    if (a.tag !== 3) throw Error(s(188));
    return a.stateNode.current === a ? e : t;
  }
  function m(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = m(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign,
    x = Symbol.for("react.element"),
    w = Symbol.for("react.transitional.element"),
    C = Symbol.for("react.portal"),
    E = Symbol.for("react.fragment"),
    S = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    O = Symbol.for("react.provider"),
    M = Symbol.for("react.consumer"),
    B = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    q = Symbol.for("react.suspense"),
    Z = Symbol.for("react.suspense_list"),
    K = Symbol.for("react.memo"),
    P = Symbol.for("react.lazy"),
    F = Symbol.for("react.activity"),
    ee = Symbol.for("react.memo_cache_sentinel"),
    Ee = Symbol.iterator;
  function Te(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Ee && e[Ee]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var it = Symbol.for("react.client.reference");
  function At(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === it ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case E:
        return "Fragment";
      case R:
        return "Profiler";
      case S:
        return "StrictMode";
      case q:
        return "Suspense";
      case Z:
        return "SuspenseList";
      case F:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case C:
          return "Portal";
        case B:
          return (e.displayName || "Context") + ".Provider";
        case M:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case K:
          return (
            (t = e.displayName || null), t !== null ? t : At(e.type) || "Memo"
          );
        case P:
          (t = e._payload), (e = e._init);
          try {
            return At(e(t));
          } catch {}
      }
    return null;
  }
  var Le = Array.isArray,
    U = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = { pending: !1, data: null, method: null, action: null },
    fe = [],
    N = -1;
  function V(e) {
    return { current: e };
  }
  function W(e) {
    0 > N || ((e.current = fe[N]), (fe[N] = null), N--);
  }
  function J(e, t) {
    N++, (fe[N] = e.current), (e.current = t);
  }
  var le = V(null),
    ge = V(null),
    ue = V(null),
    vt = V(null);
  function Me(e, t) {
    switch ((J(ue, t), J(ge, e), J(le, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Am(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = Am(t)), (e = Cm(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    W(le), J(le, e);
  }
  function Ea() {
    W(le), W(ge), W(ue);
  }
  function Qs(e) {
    e.memoizedState !== null && J(vt, e);
    var t = le.current,
      a = Cm(t, e.type);
    t !== a && (J(ge, e), J(le, a));
  }
  function Xr(e) {
    ge.current === e && (W(le), W(ge)),
      vt.current === e && (W(vt), (mr._currentValue = te));
  }
  var Vs = Object.prototype.hasOwnProperty,
    Zs = n.unstable_scheduleCallback,
    Ks = n.unstable_cancelCallback,
    _p = n.unstable_shouldYield,
    Ep = n.unstable_requestPaint,
    Pt = n.unstable_now,
    Tp = n.unstable_getCurrentPriorityLevel,
    cf = n.unstable_ImmediatePriority,
    ff = n.unstable_UserBlockingPriority,
    Gr = n.unstable_NormalPriority,
    Np = n.unstable_LowPriority,
    df = n.unstable_IdlePriority,
    jp = n.log,
    Rp = n.unstable_setDisableYieldValue,
    wl = null,
    bt = null;
  function Ta(e) {
    if (
      (typeof jp == "function" && Rp(e),
      bt && typeof bt.setStrictMode == "function")
    )
      try {
        bt.setStrictMode(wl, e);
      } catch {}
  }
  var xt = Math.clz32 ? Math.clz32 : Cp,
    Op = Math.log,
    Ap = Math.LN2;
  function Cp(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Op(e) / Ap) | 0)) | 0;
  }
  var Qr = 256,
    Vr = 4194304;
  function en(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Zr(e, t, a) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0,
      c = e.suspendedLanes,
      y = e.pingedLanes;
    e = e.warmLanes;
    var b = r & 134217727;
    return (
      b !== 0
        ? ((r = b & ~c),
          r !== 0
            ? (u = en(r))
            : ((y &= b),
              y !== 0
                ? (u = en(y))
                : a || ((a = b & ~e), a !== 0 && (u = en(a)))))
        : ((b = r & ~c),
          b !== 0
            ? (u = en(b))
            : y !== 0
              ? (u = en(y))
              : a || ((a = r & ~e), a !== 0 && (u = en(a)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & c) === 0 &&
            ((c = u & -u),
            (a = t & -t),
            c >= a || (c === 32 && (a & 4194048) !== 0))
          ? t
          : u
    );
  }
  function _l(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mp(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function hf() {
    var e = Qr;
    return (Qr <<= 1), (Qr & 4194048) === 0 && (Qr = 256), e;
  }
  function mf() {
    var e = Vr;
    return (Vr <<= 1), (Vr & 62914560) === 0 && (Vr = 4194304), e;
  }
  function $s(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function El(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function Dp(e, t, a, r, u, c) {
    var y = e.pendingLanes;
    (e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0);
    var b = e.entanglements,
      _ = e.expirationTimes,
      z = e.hiddenUpdates;
    for (a = y & ~a; 0 < a; ) {
      var Y = 31 - xt(a),
        Q = 1 << Y;
      (b[Y] = 0), (_[Y] = -1);
      var L = z[Y];
      if (L !== null)
        for (z[Y] = null, Y = 0; Y < L.length; Y++) {
          var k = L[Y];
          k !== null && (k.lane &= -536870913);
        }
      a &= ~Q;
    }
    r !== 0 && yf(e, r, 0),
      c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(y & ~t));
  }
  function yf(e, t, a) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var r = 31 - xt(t);
    (e.entangledLanes |= t),
      (e.entanglements[r] = e.entanglements[r] | 1073741824 | (a & 4194090));
  }
  function pf(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var r = 31 - xt(a),
        u = 1 << r;
      (u & t) | (e[r] & t) && (e[r] |= t), (a &= ~u);
    }
  }
  function Js(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Ps(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function gf() {
    var e = $.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Pm(e.type));
  }
  function zp(e, t) {
    var a = $.p;
    try {
      return ($.p = e), t();
    } finally {
      $.p = a;
    }
  }
  var Na = Math.random().toString(36).slice(2),
    at = "__reactFiber$" + Na,
    ft = "__reactProps$" + Na,
    On = "__reactContainer$" + Na,
    Fs = "__reactEvents$" + Na,
    Up = "__reactListeners$" + Na,
    Lp = "__reactHandles$" + Na,
    vf = "__reactResources$" + Na,
    Tl = "__reactMarker$" + Na;
  function Ws(e) {
    delete e[at], delete e[ft], delete e[Fs], delete e[Up], delete e[Lp];
  }
  function An(e) {
    var t = e[at];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[On] || a[at])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (e = Um(e); e !== null; ) {
            if ((a = e[at])) return a;
            e = Um(e);
          }
        return t;
      }
      (e = a), (a = e.parentNode);
    }
    return null;
  }
  function Cn(e) {
    if ((e = e[at] || e[On])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Nl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Mn(e) {
    var t = e[vf];
    return (
      t ||
        (t = e[vf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function $e(e) {
    e[Tl] = !0;
  }
  var bf = new Set(),
    xf = {};
  function tn(e, t) {
    Dn(e, t), Dn(e + "Capture", t);
  }
  function Dn(e, t) {
    for (xf[e] = t, e = 0; e < t.length; e++) bf.add(t[e]);
  }
  var kp = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Sf = {},
    wf = {};
  function Bp(e) {
    return Vs.call(wf, e)
      ? !0
      : Vs.call(Sf, e)
        ? !1
        : kp.test(e)
          ? (wf[e] = !0)
          : ((Sf[e] = !0), !1);
  }
  function Kr(e, t, a) {
    if (Bp(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function $r(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function la(e, t, a, r) {
    if (r === null) e.removeAttribute(a);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + r);
    }
  }
  var Is, _f;
  function zn(e) {
    if (Is === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (Is = (t && t[1]) || ""),
          (_f =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
      }
    return (
      `
` +
      Is +
      e +
      _f
    );
  }
  var eu = !1;
  function tu(e, t) {
    if (!e || eu) return "";
    eu = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Q.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Q, []);
                } catch (k) {
                  var L = k;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (k) {
                  L = k;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (k) {
                L = k;
              }
              (Q = e()) &&
                typeof Q.catch == "function" &&
                Q.catch(function () {});
            }
          } catch (k) {
            if (k && L && typeof k.stack == "string") return [k.stack, L.stack];
          }
          return [null, null];
        },
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var c = r.DetermineComponentFrameRoot(),
        y = c[0],
        b = c[1];
      if (y && b) {
        var _ = y.split(`
`),
          z = b.split(`
`);
        for (
          u = r = 0;
          r < _.length && !_[r].includes("DetermineComponentFrameRoot");

        )
          r++;
        for (; u < z.length && !z[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (r === _.length || u === z.length)
          for (
            r = _.length - 1, u = z.length - 1;
            1 <= r && 0 <= u && _[r] !== z[u];

          )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (_[r] !== z[u]) {
            if (r !== 1 || u !== 1)
              do
                if ((r--, u--, 0 > u || _[r] !== z[u])) {
                  var Y =
                    `
` + _[r].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      Y.includes("<anonymous>") &&
                      (Y = Y.replace("<anonymous>", e.displayName)),
                    Y
                  );
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      (eu = !1), (Error.prepareStackTrace = a);
    }
    return (a = e ? e.displayName || e.name : "") ? zn(a) : "";
  }
  function Hp(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return zn(e.type);
      case 16:
        return zn("Lazy");
      case 13:
        return zn("Suspense");
      case 19:
        return zn("SuspenseList");
      case 0:
      case 15:
        return tu(e.type, !1);
      case 11:
        return tu(e.type.render, !1);
      case 1:
        return tu(e.type, !0);
      case 31:
        return zn("Activity");
      default:
        return "";
    }
  }
  function Ef(e) {
    try {
      var t = "";
      do (t += Hp(e)), (e = e.return);
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  function Ct(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Tf(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function qp(e) {
    var t = Tf(e) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var u = a.get,
        c = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (y) {
            (r = "" + y), c.call(this, y);
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (y) {
            r = "" + y;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Jr(e) {
    e._valueTracker || (e._valueTracker = qp(e));
  }
  function Nf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      r = "";
    return (
      e && (r = Tf(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Pr(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Yp = /[\n"\\]/g;
  function Mt(e) {
    return e.replace(Yp, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function au(e, t, a, r, u, c, y, b) {
    (e.name = ""),
      y != null &&
      typeof y != "function" &&
      typeof y != "symbol" &&
      typeof y != "boolean"
        ? (e.type = y)
        : e.removeAttribute("type"),
      t != null
        ? y === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Ct(t))
          : e.value !== "" + Ct(t) && (e.value = "" + Ct(t))
        : (y !== "submit" && y !== "reset") || e.removeAttribute("value"),
      t != null
        ? nu(e, y, Ct(t))
        : a != null
          ? nu(e, y, Ct(a))
          : r != null && e.removeAttribute("value"),
      u == null && c != null && (e.defaultChecked = !!c),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (e.name = "" + Ct(b))
        : e.removeAttribute("name");
  }
  function jf(e, t, a, r, u, c, y, b) {
    if (
      (c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.type = c),
      t != null || a != null)
    ) {
      if (!((c !== "submit" && c !== "reset") || t != null)) return;
      (a = a != null ? "" + Ct(a) : ""),
        (t = t != null ? "" + Ct(t) : a),
        b || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (r = r ?? u),
      (r = typeof r != "function" && typeof r != "symbol" && !!r),
      (e.checked = b ? e.checked : !!r),
      (e.defaultChecked = !!r),
      y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean" &&
        (e.name = y);
  }
  function nu(e, t, a) {
    (t === "number" && Pr(e.ownerDocument) === e) ||
      e.defaultValue === "" + a ||
      (e.defaultValue = "" + a);
  }
  function Un(e, t, a, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < a.length; u++) t["$" + a[u]] = !0;
      for (a = 0; a < e.length; a++)
        (u = t.hasOwnProperty("$" + e[a].value)),
          e[a].selected !== u && (e[a].selected = u),
          u && r && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + Ct(a), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === a) {
          (e[u].selected = !0), r && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Rf(e, t, a) {
    if (
      t != null &&
      ((t = "" + Ct(t)), t !== e.value && (e.value = t), a == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Ct(a) : "";
  }
  function Of(e, t, a, r) {
    if (t == null) {
      if (r != null) {
        if (a != null) throw Error(s(92));
        if (Le(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        a = r;
      }
      a == null && (a = ""), (t = a);
    }
    (a = Ct(t)),
      (e.defaultValue = a),
      (r = e.textContent),
      r === a && r !== "" && r !== null && (e.value = r);
  }
  function Ln(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Xp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Af(e, t, a) {
    var r = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? r
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : r
        ? e.setProperty(t, a)
        : typeof a != "number" || a === 0 || Xp.has(t)
          ? t === "float"
            ? (e.cssFloat = a)
            : (e[t] = ("" + a).trim())
          : (e[t] = a + "px");
  }
  function Cf(e, t, a) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (((e = e.style), a != null)) {
      for (var r in a)
        !a.hasOwnProperty(r) ||
          (t != null && t.hasOwnProperty(r)) ||
          (r.indexOf("--") === 0
            ? e.setProperty(r, "")
            : r === "float"
              ? (e.cssFloat = "")
              : (e[r] = ""));
      for (var u in t)
        (r = t[u]), t.hasOwnProperty(u) && a[u] !== r && Af(e, u, r);
    } else for (var c in t) t.hasOwnProperty(c) && Af(e, c, t[c]);
  }
  function lu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Gp = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Qp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Fr(e) {
    return Qp.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var ru = null;
  function iu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var kn = null,
    Bn = null;
  function Mf(e) {
    var t = Cn(e);
    if (t && (e = t.stateNode)) {
      var a = e[ft] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (au(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + Mt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var r = a[t];
              if (r !== e && r.form === e.form) {
                var u = r[ft] || null;
                if (!u) throw Error(s(90));
                au(
                  r,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (r = a[t]), r.form === e.form && Nf(r);
          }
          break e;
        case "textarea":
          Rf(e, a.value, a.defaultValue);
          break e;
        case "select":
          (t = a.value), t != null && Un(e, !!a.multiple, t, !1);
      }
    }
  }
  var su = !1;
  function Df(e, t, a) {
    if (su) return e(t, a);
    su = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (
        ((su = !1),
        (kn !== null || Bn !== null) &&
          (Li(), kn && ((t = kn), (e = Bn), (Bn = kn = null), Mf(t), e)))
      )
        for (t = 0; t < e.length; t++) Mf(e[t]);
    }
  }
  function jl(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var r = a[ft] || null;
    if (r === null) return null;
    a = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(s(231, t, typeof a));
    return a;
  }
  var ra = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    uu = !1;
  if (ra)
    try {
      var Rl = {};
      Object.defineProperty(Rl, "passive", {
        get: function () {
          uu = !0;
        },
      }),
        window.addEventListener("test", Rl, Rl),
        window.removeEventListener("test", Rl, Rl);
    } catch {
      uu = !1;
    }
  var ja = null,
    ou = null,
    Wr = null;
  function zf() {
    if (Wr) return Wr;
    var e,
      t = ou,
      a = t.length,
      r,
      u = "value" in ja ? ja.value : ja.textContent,
      c = u.length;
    for (e = 0; e < a && t[e] === u[e]; e++);
    var y = a - e;
    for (r = 1; r <= y && t[a - r] === u[c - r]; r++);
    return (Wr = u.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Ir(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ei() {
    return !0;
  }
  function Uf() {
    return !1;
  }
  function dt(e) {
    function t(a, r, u, c, y) {
      (this._reactName = a),
        (this._targetInst = u),
        (this.type = r),
        (this.nativeEvent = c),
        (this.target = y),
        (this.currentTarget = null);
      for (var b in e)
        e.hasOwnProperty(b) && ((a = e[b]), (this[b] = a ? a(c) : c[b]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? ei
          : Uf),
        (this.isPropagationStopped = Uf),
        this
      );
    }
    return (
      v(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = ei));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = ei));
        },
        persist: function () {},
        isPersistent: ei,
      }),
      t
    );
  }
  var an = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ti = dt(an),
    Ol = v({}, an, { view: 0, detail: 0 }),
    Vp = dt(Ol),
    cu,
    fu,
    Al,
    ai = v({}, Ol, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: hu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Al &&
              (Al && e.type === "mousemove"
                ? ((cu = e.screenX - Al.screenX), (fu = e.screenY - Al.screenY))
                : (fu = cu = 0),
              (Al = e)),
            cu);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : fu;
      },
    }),
    Lf = dt(ai),
    Zp = v({}, ai, { dataTransfer: 0 }),
    Kp = dt(Zp),
    $p = v({}, Ol, { relatedTarget: 0 }),
    du = dt($p),
    Jp = v({}, an, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Pp = dt(Jp),
    Fp = v({}, an, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Wp = dt(Fp),
    Ip = v({}, an, { data: 0 }),
    kf = dt(Ip),
    eg = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    tg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    ag = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ng(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = ag[e])
        ? !!t[e]
        : !1;
  }
  function hu() {
    return ng;
  }
  var lg = v({}, Ol, {
      key: function (e) {
        if (e.key) {
          var t = eg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Ir(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? tg[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: hu,
      charCode: function (e) {
        return e.type === "keypress" ? Ir(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Ir(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    rg = dt(lg),
    ig = v({}, ai, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Bf = dt(ig),
    sg = v({}, Ol, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: hu,
    }),
    ug = dt(sg),
    og = v({}, an, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    cg = dt(og),
    fg = v({}, ai, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    dg = dt(fg),
    hg = v({}, an, { newState: 0, oldState: 0 }),
    mg = dt(hg),
    yg = [9, 13, 27, 32],
    mu = ra && "CompositionEvent" in window,
    Cl = null;
  ra && "documentMode" in document && (Cl = document.documentMode);
  var pg = ra && "TextEvent" in window && !Cl,
    Hf = ra && (!mu || (Cl && 8 < Cl && 11 >= Cl)),
    qf = " ",
    Yf = !1;
  function Xf(e, t) {
    switch (e) {
      case "keyup":
        return yg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Gf(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var Hn = !1;
  function gg(e, t) {
    switch (e) {
      case "compositionend":
        return Gf(t);
      case "keypress":
        return t.which !== 32 ? null : ((Yf = !0), qf);
      case "textInput":
        return (e = t.data), e === qf && Yf ? null : e;
      default:
        return null;
    }
  }
  function vg(e, t) {
    if (Hn)
      return e === "compositionend" || (!mu && Xf(e, t))
        ? ((e = zf()), (Wr = ou = ja = null), (Hn = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Hf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var bg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Qf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!bg[e.type] : t === "textarea";
  }
  function Vf(e, t, a, r) {
    kn ? (Bn ? Bn.push(r) : (Bn = [r])) : (kn = r),
      (t = Xi(t, "onChange")),
      0 < t.length &&
        ((a = new ti("onChange", "change", null, a, r)),
        e.push({ event: a, listeners: t }));
  }
  var Ml = null,
    Dl = null;
  function xg(e) {
    Tm(e, 0);
  }
  function ni(e) {
    var t = Nl(e);
    if (Nf(t)) return e;
  }
  function Zf(e, t) {
    if (e === "change") return t;
  }
  var Kf = !1;
  if (ra) {
    var yu;
    if (ra) {
      var pu = "oninput" in document;
      if (!pu) {
        var $f = document.createElement("div");
        $f.setAttribute("oninput", "return;"),
          (pu = typeof $f.oninput == "function");
      }
      yu = pu;
    } else yu = !1;
    Kf = yu && (!document.documentMode || 9 < document.documentMode);
  }
  function Jf() {
    Ml && (Ml.detachEvent("onpropertychange", Pf), (Dl = Ml = null));
  }
  function Pf(e) {
    if (e.propertyName === "value" && ni(Dl)) {
      var t = [];
      Vf(t, Dl, e, iu(e)), Df(xg, t);
    }
  }
  function Sg(e, t, a) {
    e === "focusin"
      ? (Jf(), (Ml = t), (Dl = a), Ml.attachEvent("onpropertychange", Pf))
      : e === "focusout" && Jf();
  }
  function wg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ni(Dl);
  }
  function _g(e, t) {
    if (e === "click") return ni(t);
  }
  function Eg(e, t) {
    if (e === "input" || e === "change") return ni(t);
  }
  function Tg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var St = typeof Object.is == "function" ? Object.is : Tg;
  function zl(e, t) {
    if (St(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(e),
      r = Object.keys(t);
    if (a.length !== r.length) return !1;
    for (r = 0; r < a.length; r++) {
      var u = a[r];
      if (!Vs.call(t, u) || !St(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Ff(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Wf(e, t) {
    var a = Ff(e);
    e = 0;
    for (var r; a; ) {
      if (a.nodeType === 3) {
        if (((r = e + a.textContent.length), e <= t && r >= t))
          return { node: a, offset: t - e };
        e = r;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Ff(a);
    }
  }
  function If(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? If(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function ed(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Pr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Pr(e.document);
    }
    return t;
  }
  function gu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Ng = ra && "documentMode" in document && 11 >= document.documentMode,
    qn = null,
    vu = null,
    Ul = null,
    bu = !1;
  function td(e, t, a) {
    var r =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    bu ||
      qn == null ||
      qn !== Pr(r) ||
      ((r = qn),
      "selectionStart" in r && gu(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (Ul && zl(Ul, r)) ||
        ((Ul = r),
        (r = Xi(vu, "onSelect")),
        0 < r.length &&
          ((t = new ti("onSelect", "select", null, t, a)),
          e.push({ event: t, listeners: r }),
          (t.target = qn))));
  }
  function nn(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + e] = "webkit" + t),
      (a["Moz" + e] = "moz" + t),
      a
    );
  }
  var Yn = {
      animationend: nn("Animation", "AnimationEnd"),
      animationiteration: nn("Animation", "AnimationIteration"),
      animationstart: nn("Animation", "AnimationStart"),
      transitionrun: nn("Transition", "TransitionRun"),
      transitionstart: nn("Transition", "TransitionStart"),
      transitioncancel: nn("Transition", "TransitionCancel"),
      transitionend: nn("Transition", "TransitionEnd"),
    },
    xu = {},
    ad = {};
  ra &&
    ((ad = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Yn.animationend.animation,
      delete Yn.animationiteration.animation,
      delete Yn.animationstart.animation),
    "TransitionEvent" in window || delete Yn.transitionend.transition);
  function ln(e) {
    if (xu[e]) return xu[e];
    if (!Yn[e]) return e;
    var t = Yn[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in ad) return (xu[e] = t[a]);
    return e;
  }
  var nd = ln("animationend"),
    ld = ln("animationiteration"),
    rd = ln("animationstart"),
    jg = ln("transitionrun"),
    Rg = ln("transitionstart"),
    Og = ln("transitioncancel"),
    id = ln("transitionend"),
    sd = new Map(),
    Su =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Su.push("scrollEnd");
  function Xt(e, t) {
    sd.set(e, t), tn(t, [e]);
  }
  var ud = new WeakMap();
  function Dt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = ud.get(e);
      return a !== void 0
        ? a
        : ((t = { value: e, source: t, stack: Ef(t) }), ud.set(e, t), t);
    }
    return { value: e, source: t, stack: Ef(t) };
  }
  var zt = [],
    Xn = 0,
    wu = 0;
  function li() {
    for (var e = Xn, t = (wu = Xn = 0); t < e; ) {
      var a = zt[t];
      zt[t++] = null;
      var r = zt[t];
      zt[t++] = null;
      var u = zt[t];
      zt[t++] = null;
      var c = zt[t];
      if (((zt[t++] = null), r !== null && u !== null)) {
        var y = r.pending;
        y === null ? (u.next = u) : ((u.next = y.next), (y.next = u)),
          (r.pending = u);
      }
      c !== 0 && od(a, u, c);
    }
  }
  function ri(e, t, a, r) {
    (zt[Xn++] = e),
      (zt[Xn++] = t),
      (zt[Xn++] = a),
      (zt[Xn++] = r),
      (wu |= r),
      (e.lanes |= r),
      (e = e.alternate),
      e !== null && (e.lanes |= r);
  }
  function _u(e, t, a, r) {
    return ri(e, t, a, r), ii(e);
  }
  function Gn(e, t) {
    return ri(e, null, null, t), ii(e);
  }
  function od(e, t, a) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a);
    for (var u = !1, c = e.return; c !== null; )
      (c.childLanes |= a),
        (r = c.alternate),
        r !== null && (r.childLanes |= a),
        c.tag === 22 &&
          ((e = c.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = c),
        (c = c.return);
    return e.tag === 3
      ? ((c = e.stateNode),
        u &&
          t !== null &&
          ((u = 31 - xt(a)),
          (e = c.hiddenUpdates),
          (r = e[u]),
          r === null ? (e[u] = [t]) : r.push(t),
          (t.lane = a | 536870912)),
        c)
      : null;
  }
  function ii(e) {
    if (50 < ir) throw ((ir = 0), (Ao = null), Error(s(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var Qn = {};
  function Ag(e, t, a, r) {
    (this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function wt(e, t, a, r) {
    return new Ag(e, t, a, r);
  }
  function Eu(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function ia(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = wt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function cd(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function si(e, t, a, r, u, c) {
    var y = 0;
    if (((r = e), typeof e == "function")) Eu(e) && (y = 1);
    else if (typeof e == "string")
      y = Mv(e, a, le.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case F:
          return (e = wt(31, a, t, u)), (e.elementType = F), (e.lanes = c), e;
        case E:
          return rn(a.children, u, c, t);
        case S:
          (y = 8), (u |= 24);
          break;
        case R:
          return (
            (e = wt(12, a, t, u | 2)), (e.elementType = R), (e.lanes = c), e
          );
        case q:
          return (e = wt(13, a, t, u)), (e.elementType = q), (e.lanes = c), e;
        case Z:
          return (e = wt(19, a, t, u)), (e.elementType = Z), (e.lanes = c), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case O:
              case B:
                y = 10;
                break e;
              case M:
                y = 9;
                break e;
              case G:
                y = 11;
                break e;
              case K:
                y = 14;
                break e;
              case P:
                (y = 16), (r = null);
                break e;
            }
          (y = 29),
            (a = Error(s(130, e === null ? "null" : typeof e, ""))),
            (r = null);
      }
    return (
      (t = wt(y, a, t, u)), (t.elementType = e), (t.type = r), (t.lanes = c), t
    );
  }
  function rn(e, t, a, r) {
    return (e = wt(7, e, r, t)), (e.lanes = a), e;
  }
  function Tu(e, t, a) {
    return (e = wt(6, e, null, t)), (e.lanes = a), e;
  }
  function Nu(e, t, a) {
    return (
      (t = wt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Vn = [],
    Zn = 0,
    ui = null,
    oi = 0,
    Ut = [],
    Lt = 0,
    sn = null,
    sa = 1,
    ua = "";
  function un(e, t) {
    (Vn[Zn++] = oi), (Vn[Zn++] = ui), (ui = e), (oi = t);
  }
  function fd(e, t, a) {
    (Ut[Lt++] = sa), (Ut[Lt++] = ua), (Ut[Lt++] = sn), (sn = e);
    var r = sa;
    e = ua;
    var u = 32 - xt(r) - 1;
    (r &= ~(1 << u)), (a += 1);
    var c = 32 - xt(t) + u;
    if (30 < c) {
      var y = u - (u % 5);
      (c = (r & ((1 << y) - 1)).toString(32)),
        (r >>= y),
        (u -= y),
        (sa = (1 << (32 - xt(t) + u)) | (a << u) | r),
        (ua = c + e);
    } else (sa = (1 << c) | (a << u) | r), (ua = e);
  }
  function ju(e) {
    e.return !== null && (un(e, 1), fd(e, 1, 0));
  }
  function Ru(e) {
    for (; e === ui; )
      (ui = Vn[--Zn]), (Vn[Zn] = null), (oi = Vn[--Zn]), (Vn[Zn] = null);
    for (; e === sn; )
      (sn = Ut[--Lt]),
        (Ut[Lt] = null),
        (ua = Ut[--Lt]),
        (Ut[Lt] = null),
        (sa = Ut[--Lt]),
        (Ut[Lt] = null);
  }
  var st = null,
    ke = null,
    xe = !1,
    on = null,
    Ft = !1,
    Ou = Error(s(519));
  function cn(e) {
    var t = Error(s(418, ""));
    throw (Bl(Dt(t, e)), Ou);
  }
  function dd(e) {
    var t = e.stateNode,
      a = e.type,
      r = e.memoizedProps;
    switch (((t[at] = e), (t[ft] = r), a)) {
      case "dialog":
        ye("cancel", t), ye("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ye("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ur.length; a++) ye(ur[a], t);
        break;
      case "source":
        ye("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ye("error", t), ye("load", t);
        break;
      case "details":
        ye("toggle", t);
        break;
      case "input":
        ye("invalid", t),
          jf(
            t,
            r.value,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name,
            !0
          ),
          Jr(t);
        break;
      case "select":
        ye("invalid", t);
        break;
      case "textarea":
        ye("invalid", t), Of(t, r.value, r.defaultValue, r.children), Jr(t);
    }
    (a = r.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      r.suppressHydrationWarning === !0 ||
      Om(t.textContent, a)
        ? (r.popover != null && (ye("beforetoggle", t), ye("toggle", t)),
          r.onScroll != null && ye("scroll", t),
          r.onScrollEnd != null && ye("scrollend", t),
          r.onClick != null && (t.onclick = Gi),
          (t = !0))
        : (t = !1),
      t || cn(e);
  }
  function hd(e) {
    for (st = e.return; st; )
      switch (st.tag) {
        case 5:
        case 13:
          Ft = !1;
          return;
        case 27:
        case 3:
          Ft = !0;
          return;
        default:
          st = st.return;
      }
  }
  function Ll(e) {
    if (e !== st) return !1;
    if (!xe) return hd(e), (xe = !0), !1;
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type),
          (a =
            !(a !== "form" && a !== "button") || Zo(e.type, e.memoizedProps))),
        (a = !a)),
      a && ke && cn(e),
      hd(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((a = e.data), a === "/$")) {
              if (t === 0) {
                ke = Qt(e.nextSibling);
                break e;
              }
              t--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || t++;
          e = e.nextSibling;
        }
        ke = null;
      }
    } else
      t === 27
        ? ((t = ke), Ga(e.type) ? ((e = Po), (Po = null), (ke = e)) : (ke = t))
        : (ke = st ? Qt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function kl() {
    (ke = st = null), (xe = !1);
  }
  function md() {
    var e = on;
    return (
      e !== null &&
        (yt === null ? (yt = e) : yt.push.apply(yt, e), (on = null)),
      e
    );
  }
  function Bl(e) {
    on === null ? (on = [e]) : on.push(e);
  }
  var Au = V(null),
    fn = null,
    oa = null;
  function Ra(e, t, a) {
    J(Au, t._currentValue), (t._currentValue = a);
  }
  function ca(e) {
    (e._currentValue = Au.current), W(Au);
  }
  function Cu(e, t, a) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Mu(e, t, a, r) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var y = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var b = c;
          c = u;
          for (var _ = 0; _ < t.length; _++)
            if (b.context === t[_]) {
              (c.lanes |= a),
                (b = c.alternate),
                b !== null && (b.lanes |= a),
                Cu(c.return, a, e),
                r || (y = null);
              break e;
            }
          c = b.next;
        }
      } else if (u.tag === 18) {
        if (((y = u.return), y === null)) throw Error(s(341));
        (y.lanes |= a),
          (c = y.alternate),
          c !== null && (c.lanes |= a),
          Cu(y, a, e),
          (y = null);
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (((u = y.sibling), u !== null)) {
            (u.return = y.return), (y = u);
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function Hl(e, t, a, r) {
    e = null;
    for (var u = t, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(s(387));
        if (((y = y.memoizedProps), y !== null)) {
          var b = u.type;
          St(u.pendingProps.value, y.value) ||
            (e !== null ? e.push(b) : (e = [b]));
        }
      } else if (u === vt.current) {
        if (((y = u.alternate), y === null)) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(mr) : (e = [mr]));
      }
      u = u.return;
    }
    e !== null && Mu(t, e, a, r), (t.flags |= 262144);
  }
  function ci(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!St(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function dn(e) {
    (fn = e),
      (oa = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function nt(e) {
    return yd(fn, e);
  }
  function fi(e, t) {
    return fn === null && dn(e), yd(e, t);
  }
  function yd(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), oa === null)) {
      if (e === null) throw Error(s(308));
      (oa = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else oa = oa.next = t;
    return a;
  }
  var Cg =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, r) {
                  e.push(r);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                });
            };
          },
    Mg = n.unstable_scheduleCallback,
    Dg = n.unstable_NormalPriority,
    Ve = {
      $$typeof: B,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Du() {
    return { controller: new Cg(), data: new Map(), refCount: 0 };
  }
  function ql(e) {
    e.refCount--,
      e.refCount === 0 &&
        Mg(Dg, function () {
          e.controller.abort();
        });
  }
  var Yl = null,
    zu = 0,
    Kn = 0,
    $n = null;
  function zg(e, t) {
    if (Yl === null) {
      var a = (Yl = []);
      (zu = 0),
        (Kn = ko()),
        ($n = {
          status: "pending",
          value: void 0,
          then: function (r) {
            a.push(r);
          },
        });
    }
    return zu++, t.then(pd, pd), t;
  }
  function pd() {
    if (--zu === 0 && Yl !== null) {
      $n !== null && ($n.status = "fulfilled");
      var e = Yl;
      (Yl = null), (Kn = 0), ($n = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ug(e, t) {
    var a = [],
      r = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      e.then(
        function () {
          (r.status = "fulfilled"), (r.value = t);
          for (var u = 0; u < a.length; u++) (0, a[u])(t);
        },
        function (u) {
          for (r.status = "rejected", r.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        }
      ),
      r
    );
  }
  var gd = U.S;
  U.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      zg(e, t),
      gd !== null && gd(e, t);
  };
  var hn = V(null);
  function Uu() {
    var e = hn.current;
    return e !== null ? e : Ce.pooledCache;
  }
  function di(e, t) {
    t === null ? J(hn, hn.current) : J(hn, t.pool);
  }
  function vd() {
    var e = Uu();
    return e === null ? null : { parent: Ve._currentValue, pool: e };
  }
  var Xl = Error(s(460)),
    bd = Error(s(474)),
    hi = Error(s(542)),
    Lu = { then: function () {} };
  function xd(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function mi() {}
  function Sd(e, t, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(t) : a !== t && (t.then(mi, mi), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), _d(e), e);
      default:
        if (typeof t.status == "string") t.then(mi, mi);
        else {
          if (((e = Ce), e !== null && 100 < e.shellSuspendCounter))
            throw Error(s(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (r) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "fulfilled"), (u.value = r);
                }
              },
              function (r) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "rejected"), (u.reason = r);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), _d(e), e);
        }
        throw ((Gl = t), Xl);
    }
  }
  var Gl = null;
  function wd() {
    if (Gl === null) throw Error(s(459));
    var e = Gl;
    return (Gl = null), e;
  }
  function _d(e) {
    if (e === Xl || e === hi) throw Error(s(483));
  }
  var Oa = !1;
  function ku(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Bu(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function Aa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ca(e, t, a) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (Se & 2) !== 0)) {
      var u = r.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (r.pending = t),
        (t = ii(e)),
        od(e, null, a),
        t
      );
    }
    return ri(e, r, t, a), ii(e);
  }
  function Ql(e, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var r = t.lanes;
      (r &= e.pendingLanes), (a |= r), (t.lanes = a), pf(e, a);
    }
  }
  function Hu(e, t) {
    var a = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), a === r)) {
      var u = null,
        c = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var y = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          c === null ? (u = c = y) : (c = c.next = y), (a = a.next);
        } while (a !== null);
        c === null ? (u = c = t) : (c = c.next = t);
      } else u = c = t;
      (a = {
        baseState: r.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: r.shared,
        callbacks: r.callbacks,
      }),
        (e.updateQueue = a);
      return;
    }
    (e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t);
  }
  var qu = !1;
  function Vl() {
    if (qu) {
      var e = $n;
      if (e !== null) throw e;
    }
  }
  function Zl(e, t, a, r) {
    qu = !1;
    var u = e.updateQueue;
    Oa = !1;
    var c = u.firstBaseUpdate,
      y = u.lastBaseUpdate,
      b = u.shared.pending;
    if (b !== null) {
      u.shared.pending = null;
      var _ = b,
        z = _.next;
      (_.next = null), y === null ? (c = z) : (y.next = z), (y = _);
      var Y = e.alternate;
      Y !== null &&
        ((Y = Y.updateQueue),
        (b = Y.lastBaseUpdate),
        b !== y &&
          (b === null ? (Y.firstBaseUpdate = z) : (b.next = z),
          (Y.lastBaseUpdate = _)));
    }
    if (c !== null) {
      var Q = u.baseState;
      (y = 0), (Y = z = _ = null), (b = c);
      do {
        var L = b.lane & -536870913,
          k = L !== b.lane;
        if (k ? (pe & L) === L : (r & L) === L) {
          L !== 0 && L === Kn && (qu = !0),
            Y !== null &&
              (Y = Y.next =
                {
                  lane: 0,
                  tag: b.tag,
                  payload: b.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var se = e,
              re = b;
            L = t;
            var Re = a;
            switch (re.tag) {
              case 1:
                if (((se = re.payload), typeof se == "function")) {
                  Q = se.call(Re, Q, L);
                  break e;
                }
                Q = se;
                break e;
              case 3:
                se.flags = (se.flags & -65537) | 128;
              case 0:
                if (
                  ((se = re.payload),
                  (L = typeof se == "function" ? se.call(Re, Q, L) : se),
                  L == null)
                )
                  break e;
                Q = v({}, Q, L);
                break e;
              case 2:
                Oa = !0;
            }
          }
          (L = b.callback),
            L !== null &&
              ((e.flags |= 64),
              k && (e.flags |= 8192),
              (k = u.callbacks),
              k === null ? (u.callbacks = [L]) : k.push(L));
        } else
          (k = {
            lane: L,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null,
          }),
            Y === null ? ((z = Y = k), (_ = Q)) : (Y = Y.next = k),
            (y |= L);
        if (((b = b.next), b === null)) {
          if (((b = u.shared.pending), b === null)) break;
          (k = b),
            (b = k.next),
            (k.next = null),
            (u.lastBaseUpdate = k),
            (u.shared.pending = null);
        }
      } while (!0);
      Y === null && (_ = Q),
        (u.baseState = _),
        (u.firstBaseUpdate = z),
        (u.lastBaseUpdate = Y),
        c === null && (u.shared.lanes = 0),
        (Ha |= y),
        (e.lanes = y),
        (e.memoizedState = Q);
    }
  }
  function Ed(e, t) {
    if (typeof e != "function") throw Error(s(191, e));
    e.call(t);
  }
  function Td(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) Ed(a[e], t);
  }
  var Jn = V(null),
    yi = V(0);
  function Nd(e, t) {
    (e = ga), J(yi, e), J(Jn, t), (ga = e | t.baseLanes);
  }
  function Yu() {
    J(yi, ga), J(Jn, Jn.current);
  }
  function Xu() {
    (ga = yi.current), W(Jn), W(yi);
  }
  var Ma = 0,
    de = null,
    Ne = null,
    Xe = null,
    pi = !1,
    Pn = !1,
    mn = !1,
    gi = 0,
    Kl = 0,
    Fn = null,
    Lg = 0;
  function He() {
    throw Error(s(321));
  }
  function Gu(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!St(e[a], t[a])) return !1;
    return !0;
  }
  function Qu(e, t, a, r, u, c) {
    return (
      (Ma = c),
      (de = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (U.H = e === null || e.memoizedState === null ? oh : ch),
      (mn = !1),
      (c = a(r, u)),
      (mn = !1),
      Pn && (c = Rd(t, a, r, u)),
      jd(e),
      c
    );
  }
  function jd(e) {
    U.H = _i;
    var t = Ne !== null && Ne.next !== null;
    if (((Ma = 0), (Xe = Ne = de = null), (pi = !1), (Kl = 0), (Fn = null), t))
      throw Error(s(300));
    e === null ||
      Je ||
      ((e = e.dependencies), e !== null && ci(e) && (Je = !0));
  }
  function Rd(e, t, a, r) {
    de = e;
    var u = 0;
    do {
      if ((Pn && (Fn = null), (Kl = 0), (Pn = !1), 25 <= u))
        throw Error(s(301));
      if (((u += 1), (Xe = Ne = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        (c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0);
      }
      (U.H = Gg), (c = t(a, r));
    } while (Pn);
    return c;
  }
  function kg() {
    var e = U.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? $l(t) : t),
      (e = e.useState()[0]),
      (Ne !== null ? Ne.memoizedState : null) !== e && (de.flags |= 1024),
      t
    );
  }
  function Vu() {
    var e = gi !== 0;
    return (gi = 0), e;
  }
  function Zu(e, t, a) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a);
  }
  function Ku(e) {
    if (pi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      pi = !1;
    }
    (Ma = 0), (Xe = Ne = de = null), (Pn = !1), (Kl = gi = 0), (Fn = null);
  }
  function ht() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Xe === null ? (de.memoizedState = Xe = e) : (Xe = Xe.next = e), Xe;
  }
  function Ge() {
    if (Ne === null) {
      var e = de.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = Xe === null ? de.memoizedState : Xe.next;
    if (t !== null) (Xe = t), (Ne = e);
    else {
      if (e === null)
        throw de.alternate === null ? Error(s(467)) : Error(s(310));
      (Ne = e),
        (e = {
          memoizedState: Ne.memoizedState,
          baseState: Ne.baseState,
          baseQueue: Ne.baseQueue,
          queue: Ne.queue,
          next: null,
        }),
        Xe === null ? (de.memoizedState = Xe = e) : (Xe = Xe.next = e);
    }
    return Xe;
  }
  function $u() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $l(e) {
    var t = Kl;
    return (
      (Kl += 1),
      Fn === null && (Fn = []),
      (e = Sd(Fn, e, t)),
      (t = de),
      (Xe === null ? t.memoizedState : Xe.next) === null &&
        ((t = t.alternate),
        (U.H = t === null || t.memoizedState === null ? oh : ch)),
      e
    );
  }
  function vi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return $l(e);
      if (e.$$typeof === B) return nt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Ju(e) {
    var t = null,
      a = de.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var r = de.alternate;
      r !== null &&
        ((r = r.updateQueue),
        r !== null &&
          ((r = r.memoCache),
          r != null &&
            (t = {
              data: r.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = $u()), (de.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), r = 0; r < e; r++) a[r] = ee;
    return t.index++, a;
  }
  function fa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function bi(e) {
    var t = Ge();
    return Pu(t, Ne, e);
  }
  function Pu(e, t, a) {
    var r = e.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = a;
    var u = e.baseQueue,
      c = r.pending;
    if (c !== null) {
      if (u !== null) {
        var y = u.next;
        (u.next = c.next), (c.next = y);
      }
      (t.baseQueue = u = c), (r.pending = null);
    }
    if (((c = e.baseState), u === null)) e.memoizedState = c;
    else {
      t = u.next;
      var b = (y = null),
        _ = null,
        z = t,
        Y = !1;
      do {
        var Q = z.lane & -536870913;
        if (Q !== z.lane ? (pe & Q) === Q : (Ma & Q) === Q) {
          var L = z.revertLane;
          if (L === 0)
            _ !== null &&
              (_ = _.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Q === Kn && (Y = !0);
          else if ((Ma & L) === L) {
            (z = z.next), L === Kn && (Y = !0);
            continue;
          } else
            (Q = {
              lane: 0,
              revertLane: z.revertLane,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              _ === null ? ((b = _ = Q), (y = c)) : (_ = _.next = Q),
              (de.lanes |= L),
              (Ha |= L);
          (Q = z.action),
            mn && a(c, Q),
            (c = z.hasEagerState ? z.eagerState : a(c, Q));
        } else
          (L = {
            lane: Q,
            revertLane: z.revertLane,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            _ === null ? ((b = _ = L), (y = c)) : (_ = _.next = L),
            (de.lanes |= Q),
            (Ha |= Q);
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (_ === null ? (y = c) : (_.next = b),
        !St(c, e.memoizedState) && ((Je = !0), Y && ((a = $n), a !== null)))
      )
        throw a;
      (e.memoizedState = c),
        (e.baseState = y),
        (e.baseQueue = _),
        (r.lastRenderedState = c);
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function Fu(e) {
    var t = Ge(),
      a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var r = a.dispatch,
      u = a.pending,
      c = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var y = (u = u.next);
      do (c = e(c, y.action)), (y = y.next);
      while (y !== u);
      St(c, t.memoizedState) || (Je = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (a.lastRenderedState = c);
    }
    return [c, r];
  }
  function Od(e, t, a) {
    var r = de,
      u = Ge(),
      c = xe;
    if (c) {
      if (a === void 0) throw Error(s(407));
      a = a();
    } else a = t();
    var y = !St((Ne || u).memoizedState, a);
    y && ((u.memoizedState = a), (Je = !0)), (u = u.queue);
    var b = Md.bind(null, r, u, e);
    if (
      (Jl(2048, 8, b, [e]),
      u.getSnapshot !== t || y || (Xe !== null && Xe.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        Wn(9, xi(), Cd.bind(null, r, u, a, t), null),
        Ce === null)
      )
        throw Error(s(349));
      c || (Ma & 124) !== 0 || Ad(r, t, a);
    }
    return a;
  }
  function Ad(e, t, a) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = de.updateQueue),
      t === null
        ? ((t = $u()), (de.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e));
  }
  function Cd(e, t, a, r) {
    (t.value = a), (t.getSnapshot = r), Dd(t) && zd(e);
  }
  function Md(e, t, a) {
    return a(function () {
      Dd(t) && zd(e);
    });
  }
  function Dd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !St(e, a);
    } catch {
      return !0;
    }
  }
  function zd(e) {
    var t = Gn(e, 2);
    t !== null && jt(t, e, 2);
  }
  function Wu(e) {
    var t = ht();
    if (typeof e == "function") {
      var a = e;
      if (((e = a()), mn)) {
        Ta(!0);
        try {
          a();
        } finally {
          Ta(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fa,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Ud(e, t, a, r) {
    return (e.baseState = a), Pu(e, Ne, typeof r == "function" ? r : fa);
  }
  function Bg(e, t, a, r, u) {
    if (wi(e)) throw Error(s(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          c.listeners.push(y);
        },
      };
      U.T !== null ? a(!0) : (c.isTransition = !1),
        r(c),
        (a = t.pending),
        a === null
          ? ((c.next = t.pending = c), Ld(t, c))
          : ((c.next = a.next), (t.pending = a.next = c));
    }
  }
  function Ld(e, t) {
    var a = t.action,
      r = t.payload,
      u = e.state;
    if (t.isTransition) {
      var c = U.T,
        y = {};
      U.T = y;
      try {
        var b = a(u, r),
          _ = U.S;
        _ !== null && _(y, b), kd(e, t, b);
      } catch (z) {
        Iu(e, t, z);
      } finally {
        U.T = c;
      }
    } else
      try {
        (c = a(u, r)), kd(e, t, c);
      } catch (z) {
        Iu(e, t, z);
      }
  }
  function kd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (r) {
            Bd(e, t, r);
          },
          function (r) {
            return Iu(e, t, r);
          }
        )
      : Bd(e, t, a);
  }
  function Bd(e, t, a) {
    (t.status = "fulfilled"),
      (t.value = a),
      Hd(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Ld(e, a)));
  }
  function Iu(e, t, a) {
    var r = e.pending;
    if (((e.pending = null), r !== null)) {
      r = r.next;
      do (t.status = "rejected"), (t.reason = a), Hd(t), (t = t.next);
      while (t !== r);
    }
    e.action = null;
  }
  function Hd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function qd(e, t) {
    return t;
  }
  function Yd(e, t) {
    if (xe) {
      var a = Ce.formState;
      if (a !== null) {
        e: {
          var r = de;
          if (xe) {
            if (ke) {
              t: {
                for (var u = ke, c = Ft; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (((u = Qt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (c = u.data), (u = c === "F!" || c === "F" ? u : null);
              }
              if (u) {
                (ke = Qt(u.nextSibling)), (r = u.data === "F!");
                break e;
              }
            }
            cn(r);
          }
          r = !1;
        }
        r && (t = a[0]);
      }
    }
    return (
      (a = ht()),
      (a.memoizedState = a.baseState = t),
      (r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qd,
        lastRenderedState: t,
      }),
      (a.queue = r),
      (a = ih.bind(null, de, r)),
      (r.dispatch = a),
      (r = Wu(!1)),
      (c = lo.bind(null, de, !1, r.queue)),
      (r = ht()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (r.queue = u),
      (a = Bg.bind(null, de, u, c, a)),
      (u.dispatch = a),
      (r.memoizedState = e),
      [t, a, !1]
    );
  }
  function Xd(e) {
    var t = Ge();
    return Gd(t, Ne, e);
  }
  function Gd(e, t, a) {
    if (
      ((t = Pu(e, t, qd)[0]),
      (e = bi(fa)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var r = $l(t);
      } catch (y) {
        throw y === Xl ? hi : y;
      }
    else r = t;
    t = Ge();
    var u = t.queue,
      c = u.dispatch;
    return (
      a !== t.memoizedState &&
        ((de.flags |= 2048), Wn(9, xi(), Hg.bind(null, u, a), null)),
      [r, c, e]
    );
  }
  function Hg(e, t) {
    e.action = t;
  }
  function Qd(e) {
    var t = Ge(),
      a = Ne;
    if (a !== null) return Gd(t, a, e);
    Ge(), (t = t.memoizedState), (a = Ge());
    var r = a.queue.dispatch;
    return (a.memoizedState = e), [t, r, !1];
  }
  function Wn(e, t, a, r) {
    return (
      (e = { tag: e, create: a, deps: r, inst: t, next: null }),
      (t = de.updateQueue),
      t === null && ((t = $u()), (de.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((r = a.next), (a.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function xi() {
    return { destroy: void 0, resource: void 0 };
  }
  function Vd() {
    return Ge().memoizedState;
  }
  function Si(e, t, a, r) {
    var u = ht();
    (r = r === void 0 ? null : r),
      (de.flags |= e),
      (u.memoizedState = Wn(1 | t, xi(), a, r));
  }
  function Jl(e, t, a, r) {
    var u = Ge();
    r = r === void 0 ? null : r;
    var c = u.memoizedState.inst;
    Ne !== null && r !== null && Gu(r, Ne.memoizedState.deps)
      ? (u.memoizedState = Wn(t, c, a, r))
      : ((de.flags |= e), (u.memoizedState = Wn(1 | t, c, a, r)));
  }
  function Zd(e, t) {
    Si(8390656, 8, e, t);
  }
  function Kd(e, t) {
    Jl(2048, 8, e, t);
  }
  function $d(e, t) {
    return Jl(4, 2, e, t);
  }
  function Jd(e, t) {
    return Jl(4, 4, e, t);
  }
  function Pd(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Fd(e, t, a) {
    (a = a != null ? a.concat([e]) : null), Jl(4, 4, Pd.bind(null, t, e), a);
  }
  function eo() {}
  function Wd(e, t) {
    var a = Ge();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    return t !== null && Gu(t, r[1]) ? r[0] : ((a.memoizedState = [e, t]), e);
  }
  function Id(e, t) {
    var a = Ge();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    if (t !== null && Gu(t, r[1])) return r[0];
    if (((r = e()), mn)) {
      Ta(!0);
      try {
        e();
      } finally {
        Ta(!1);
      }
    }
    return (a.memoizedState = [r, t]), r;
  }
  function to(e, t, a) {
    return a === void 0 || (Ma & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = am()), (de.lanes |= e), (Ha |= e), a);
  }
  function eh(e, t, a, r) {
    return St(a, t)
      ? a
      : Jn.current !== null
        ? ((e = to(e, a, r)), St(e, t) || (Je = !0), e)
        : (Ma & 42) === 0
          ? ((Je = !0), (e.memoizedState = a))
          : ((e = am()), (de.lanes |= e), (Ha |= e), t);
  }
  function th(e, t, a, r, u) {
    var c = $.p;
    $.p = c !== 0 && 8 > c ? c : 8;
    var y = U.T,
      b = {};
    (U.T = b), lo(e, !1, t, a);
    try {
      var _ = u(),
        z = U.S;
      if (
        (z !== null && z(b, _),
        _ !== null && typeof _ == "object" && typeof _.then == "function")
      ) {
        var Y = Ug(_, r);
        Pl(e, t, Y, Nt(e));
      } else Pl(e, t, r, Nt(e));
    } catch (Q) {
      Pl(e, t, { then: function () {}, status: "rejected", reason: Q }, Nt());
    } finally {
      ($.p = c), (U.T = y);
    }
  }
  function qg() {}
  function ao(e, t, a, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = ah(e).queue;
    th(
      e,
      u,
      t,
      te,
      a === null
        ? qg
        : function () {
            return nh(e), a(r);
          }
    );
  }
  function ah(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: te,
      baseState: te,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fa,
        lastRenderedState: te,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: fa,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function nh(e) {
    var t = ah(e).next.queue;
    Pl(e, t, {}, Nt());
  }
  function no() {
    return nt(mr);
  }
  function lh() {
    return Ge().memoizedState;
  }
  function rh() {
    return Ge().memoizedState;
  }
  function Yg(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Nt();
          e = Aa(a);
          var r = Ca(t, e, a);
          r !== null && (jt(r, t, a), Ql(r, t, a)),
            (t = { cache: Du() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function Xg(e, t, a) {
    var r = Nt();
    (a = {
      lane: r,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      wi(e)
        ? sh(t, a)
        : ((a = _u(e, t, a, r)), a !== null && (jt(a, e, r), uh(a, t, r)));
  }
  function ih(e, t, a) {
    var r = Nt();
    Pl(e, t, a, r);
  }
  function Pl(e, t, a, r) {
    var u = {
      lane: r,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (wi(e)) sh(t, u);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var y = t.lastRenderedState,
            b = c(y, a);
          if (((u.hasEagerState = !0), (u.eagerState = b), St(b, y)))
            return ri(e, t, u, 0), Ce === null && li(), !1;
        } catch {
        } finally {
        }
      if (((a = _u(e, t, u, r)), a !== null))
        return jt(a, e, r), uh(a, t, r), !0;
    }
    return !1;
  }
  function lo(e, t, a, r) {
    if (
      ((r = {
        lane: 2,
        revertLane: ko(),
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      wi(e))
    ) {
      if (t) throw Error(s(479));
    } else (t = _u(e, a, r, 2)), t !== null && jt(t, e, 2);
  }
  function wi(e) {
    var t = e.alternate;
    return e === de || (t !== null && t === de);
  }
  function sh(e, t) {
    Pn = pi = !0;
    var a = e.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (e.pending = t);
  }
  function uh(e, t, a) {
    if ((a & 4194048) !== 0) {
      var r = t.lanes;
      (r &= e.pendingLanes), (a |= r), (t.lanes = a), pf(e, a);
    }
  }
  var _i = {
      readContext: nt,
      use: vi,
      useCallback: He,
      useContext: He,
      useEffect: He,
      useImperativeHandle: He,
      useLayoutEffect: He,
      useInsertionEffect: He,
      useMemo: He,
      useReducer: He,
      useRef: He,
      useState: He,
      useDebugValue: He,
      useDeferredValue: He,
      useTransition: He,
      useSyncExternalStore: He,
      useId: He,
      useHostTransitionStatus: He,
      useFormState: He,
      useActionState: He,
      useOptimistic: He,
      useMemoCache: He,
      useCacheRefresh: He,
    },
    oh = {
      readContext: nt,
      use: vi,
      useCallback: function (e, t) {
        return (ht().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: nt,
      useEffect: Zd,
      useImperativeHandle: function (e, t, a) {
        (a = a != null ? a.concat([e]) : null),
          Si(4194308, 4, Pd.bind(null, t, e), a);
      },
      useLayoutEffect: function (e, t) {
        return Si(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Si(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = ht();
        t = t === void 0 ? null : t;
        var r = e();
        if (mn) {
          Ta(!0);
          try {
            e();
          } finally {
            Ta(!1);
          }
        }
        return (a.memoizedState = [r, t]), r;
      },
      useReducer: function (e, t, a) {
        var r = ht();
        if (a !== void 0) {
          var u = a(t);
          if (mn) {
            Ta(!0);
            try {
              a(t);
            } finally {
              Ta(!1);
            }
          }
        } else u = t;
        return (
          (r.memoizedState = r.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u,
          }),
          (r.queue = e),
          (e = e.dispatch = Xg.bind(null, de, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ht();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = Wu(e);
        var t = e.queue,
          a = ih.bind(null, de, t);
        return (t.dispatch = a), [e.memoizedState, a];
      },
      useDebugValue: eo,
      useDeferredValue: function (e, t) {
        var a = ht();
        return to(a, e, t);
      },
      useTransition: function () {
        var e = Wu(!1);
        return (
          (e = th.bind(null, de, e.queue, !0, !1)),
          (ht().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, a) {
        var r = de,
          u = ht();
        if (xe) {
          if (a === void 0) throw Error(s(407));
          a = a();
        } else {
          if (((a = t()), Ce === null)) throw Error(s(349));
          (pe & 124) !== 0 || Ad(r, t, a);
        }
        u.memoizedState = a;
        var c = { value: a, getSnapshot: t };
        return (
          (u.queue = c),
          Zd(Md.bind(null, r, c, e), [e]),
          (r.flags |= 2048),
          Wn(9, xi(), Cd.bind(null, r, c, a, t), null),
          a
        );
      },
      useId: function () {
        var e = ht(),
          t = Ce.identifierPrefix;
        if (xe) {
          var a = ua,
            r = sa;
          (a = (r & ~(1 << (32 - xt(r) - 1))).toString(32) + a),
            (t = "«" + t + "R" + a),
            (a = gi++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "»");
        } else (a = Lg++), (t = "«" + t + "r" + a.toString(32) + "»");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: no,
      useFormState: Yd,
      useActionState: Yd,
      useOptimistic: function (e) {
        var t = ht();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = lo.bind(null, de, !0, a)),
          (a.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Ju,
      useCacheRefresh: function () {
        return (ht().memoizedState = Yg.bind(null, de));
      },
    },
    ch = {
      readContext: nt,
      use: vi,
      useCallback: Wd,
      useContext: nt,
      useEffect: Kd,
      useImperativeHandle: Fd,
      useInsertionEffect: $d,
      useLayoutEffect: Jd,
      useMemo: Id,
      useReducer: bi,
      useRef: Vd,
      useState: function () {
        return bi(fa);
      },
      useDebugValue: eo,
      useDeferredValue: function (e, t) {
        var a = Ge();
        return eh(a, Ne.memoizedState, e, t);
      },
      useTransition: function () {
        var e = bi(fa)[0],
          t = Ge().memoizedState;
        return [typeof e == "boolean" ? e : $l(e), t];
      },
      useSyncExternalStore: Od,
      useId: lh,
      useHostTransitionStatus: no,
      useFormState: Xd,
      useActionState: Xd,
      useOptimistic: function (e, t) {
        var a = Ge();
        return Ud(a, Ne, e, t);
      },
      useMemoCache: Ju,
      useCacheRefresh: rh,
    },
    Gg = {
      readContext: nt,
      use: vi,
      useCallback: Wd,
      useContext: nt,
      useEffect: Kd,
      useImperativeHandle: Fd,
      useInsertionEffect: $d,
      useLayoutEffect: Jd,
      useMemo: Id,
      useReducer: Fu,
      useRef: Vd,
      useState: function () {
        return Fu(fa);
      },
      useDebugValue: eo,
      useDeferredValue: function (e, t) {
        var a = Ge();
        return Ne === null ? to(a, e, t) : eh(a, Ne.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Fu(fa)[0],
          t = Ge().memoizedState;
        return [typeof e == "boolean" ? e : $l(e), t];
      },
      useSyncExternalStore: Od,
      useId: lh,
      useHostTransitionStatus: no,
      useFormState: Qd,
      useActionState: Qd,
      useOptimistic: function (e, t) {
        var a = Ge();
        return Ne !== null
          ? Ud(a, Ne, e, t)
          : ((a.baseState = e), [e, a.queue.dispatch]);
      },
      useMemoCache: Ju,
      useCacheRefresh: rh,
    },
    In = null,
    Fl = 0;
  function Ei(e) {
    var t = Fl;
    return (Fl += 1), In === null && (In = []), Sd(In, e, t);
  }
  function Wl(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Ti(e, t) {
    throw t.$$typeof === x
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function fh(e) {
    var t = e._init;
    return t(e._payload);
  }
  function dh(e) {
    function t(A, j) {
      if (e) {
        var D = A.deletions;
        D === null ? ((A.deletions = [j]), (A.flags |= 16)) : D.push(j);
      }
    }
    function a(A, j) {
      if (!e) return null;
      for (; j !== null; ) t(A, j), (j = j.sibling);
      return null;
    }
    function r(A) {
      for (var j = new Map(); A !== null; )
        A.key !== null ? j.set(A.key, A) : j.set(A.index, A), (A = A.sibling);
      return j;
    }
    function u(A, j) {
      return (A = ia(A, j)), (A.index = 0), (A.sibling = null), A;
    }
    function c(A, j, D) {
      return (
        (A.index = D),
        e
          ? ((D = A.alternate),
            D !== null
              ? ((D = D.index), D < j ? ((A.flags |= 67108866), j) : D)
              : ((A.flags |= 67108866), j))
          : ((A.flags |= 1048576), j)
      );
    }
    function y(A) {
      return e && A.alternate === null && (A.flags |= 67108866), A;
    }
    function b(A, j, D, X) {
      return j === null || j.tag !== 6
        ? ((j = Tu(D, A.mode, X)), (j.return = A), j)
        : ((j = u(j, D)), (j.return = A), j);
    }
    function _(A, j, D, X) {
      var I = D.type;
      return I === E
        ? Y(A, j, D.props.children, X, D.key)
        : j !== null &&
            (j.elementType === I ||
              (typeof I == "object" &&
                I !== null &&
                I.$$typeof === P &&
                fh(I) === j.type))
          ? ((j = u(j, D.props)), Wl(j, D), (j.return = A), j)
          : ((j = si(D.type, D.key, D.props, null, A.mode, X)),
            Wl(j, D),
            (j.return = A),
            j);
    }
    function z(A, j, D, X) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== D.containerInfo ||
        j.stateNode.implementation !== D.implementation
        ? ((j = Nu(D, A.mode, X)), (j.return = A), j)
        : ((j = u(j, D.children || [])), (j.return = A), j);
    }
    function Y(A, j, D, X, I) {
      return j === null || j.tag !== 7
        ? ((j = rn(D, A.mode, X, I)), (j.return = A), j)
        : ((j = u(j, D)), (j.return = A), j);
    }
    function Q(A, j, D) {
      if (
        (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
      )
        return (j = Tu("" + j, A.mode, D)), (j.return = A), j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case w:
            return (
              (D = si(j.type, j.key, j.props, null, A.mode, D)),
              Wl(D, j),
              (D.return = A),
              D
            );
          case C:
            return (j = Nu(j, A.mode, D)), (j.return = A), j;
          case P:
            var X = j._init;
            return (j = X(j._payload)), Q(A, j, D);
        }
        if (Le(j) || Te(j))
          return (j = rn(j, A.mode, D, null)), (j.return = A), j;
        if (typeof j.then == "function") return Q(A, Ei(j), D);
        if (j.$$typeof === B) return Q(A, fi(A, j), D);
        Ti(A, j);
      }
      return null;
    }
    function L(A, j, D, X) {
      var I = j !== null ? j.key : null;
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return I !== null ? null : b(A, j, "" + D, X);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case w:
            return D.key === I ? _(A, j, D, X) : null;
          case C:
            return D.key === I ? z(A, j, D, X) : null;
          case P:
            return (I = D._init), (D = I(D._payload)), L(A, j, D, X);
        }
        if (Le(D) || Te(D)) return I !== null ? null : Y(A, j, D, X, null);
        if (typeof D.then == "function") return L(A, j, Ei(D), X);
        if (D.$$typeof === B) return L(A, j, fi(A, D), X);
        Ti(A, D);
      }
      return null;
    }
    function k(A, j, D, X, I) {
      if (
        (typeof X == "string" && X !== "") ||
        typeof X == "number" ||
        typeof X == "bigint"
      )
        return (A = A.get(D) || null), b(j, A, "" + X, I);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case w:
            return (
              (A = A.get(X.key === null ? D : X.key) || null), _(j, A, X, I)
            );
          case C:
            return (
              (A = A.get(X.key === null ? D : X.key) || null), z(j, A, X, I)
            );
          case P:
            var he = X._init;
            return (X = he(X._payload)), k(A, j, D, X, I);
        }
        if (Le(X) || Te(X)) return (A = A.get(D) || null), Y(j, A, X, I, null);
        if (typeof X.then == "function") return k(A, j, D, Ei(X), I);
        if (X.$$typeof === B) return k(A, j, D, fi(j, X), I);
        Ti(j, X);
      }
      return null;
    }
    function se(A, j, D, X) {
      for (
        var I = null, he = null, ae = j, ie = (j = 0), Fe = null;
        ae !== null && ie < D.length;
        ie++
      ) {
        ae.index > ie ? ((Fe = ae), (ae = null)) : (Fe = ae.sibling);
        var ve = L(A, ae, D[ie], X);
        if (ve === null) {
          ae === null && (ae = Fe);
          break;
        }
        e && ae && ve.alternate === null && t(A, ae),
          (j = c(ve, j, ie)),
          he === null ? (I = ve) : (he.sibling = ve),
          (he = ve),
          (ae = Fe);
      }
      if (ie === D.length) return a(A, ae), xe && un(A, ie), I;
      if (ae === null) {
        for (; ie < D.length; ie++)
          (ae = Q(A, D[ie], X)),
            ae !== null &&
              ((j = c(ae, j, ie)),
              he === null ? (I = ae) : (he.sibling = ae),
              (he = ae));
        return xe && un(A, ie), I;
      }
      for (ae = r(ae); ie < D.length; ie++)
        (Fe = k(ae, A, ie, D[ie], X)),
          Fe !== null &&
            (e &&
              Fe.alternate !== null &&
              ae.delete(Fe.key === null ? ie : Fe.key),
            (j = c(Fe, j, ie)),
            he === null ? (I = Fe) : (he.sibling = Fe),
            (he = Fe));
      return (
        e &&
          ae.forEach(function ($a) {
            return t(A, $a);
          }),
        xe && un(A, ie),
        I
      );
    }
    function re(A, j, D, X) {
      if (D == null) throw Error(s(151));
      for (
        var I = null, he = null, ae = j, ie = (j = 0), Fe = null, ve = D.next();
        ae !== null && !ve.done;
        ie++, ve = D.next()
      ) {
        ae.index > ie ? ((Fe = ae), (ae = null)) : (Fe = ae.sibling);
        var $a = L(A, ae, ve.value, X);
        if ($a === null) {
          ae === null && (ae = Fe);
          break;
        }
        e && ae && $a.alternate === null && t(A, ae),
          (j = c($a, j, ie)),
          he === null ? (I = $a) : (he.sibling = $a),
          (he = $a),
          (ae = Fe);
      }
      if (ve.done) return a(A, ae), xe && un(A, ie), I;
      if (ae === null) {
        for (; !ve.done; ie++, ve = D.next())
          (ve = Q(A, ve.value, X)),
            ve !== null &&
              ((j = c(ve, j, ie)),
              he === null ? (I = ve) : (he.sibling = ve),
              (he = ve));
        return xe && un(A, ie), I;
      }
      for (ae = r(ae); !ve.done; ie++, ve = D.next())
        (ve = k(ae, A, ie, ve.value, X)),
          ve !== null &&
            (e &&
              ve.alternate !== null &&
              ae.delete(ve.key === null ? ie : ve.key),
            (j = c(ve, j, ie)),
            he === null ? (I = ve) : (he.sibling = ve),
            (he = ve));
      return (
        e &&
          ae.forEach(function (Qv) {
            return t(A, Qv);
          }),
        xe && un(A, ie),
        I
      );
    }
    function Re(A, j, D, X) {
      if (
        (typeof D == "object" &&
          D !== null &&
          D.type === E &&
          D.key === null &&
          (D = D.props.children),
        typeof D == "object" && D !== null)
      ) {
        switch (D.$$typeof) {
          case w:
            e: {
              for (var I = D.key; j !== null; ) {
                if (j.key === I) {
                  if (((I = D.type), I === E)) {
                    if (j.tag === 7) {
                      a(A, j.sibling),
                        (X = u(j, D.props.children)),
                        (X.return = A),
                        (A = X);
                      break e;
                    }
                  } else if (
                    j.elementType === I ||
                    (typeof I == "object" &&
                      I !== null &&
                      I.$$typeof === P &&
                      fh(I) === j.type)
                  ) {
                    a(A, j.sibling),
                      (X = u(j, D.props)),
                      Wl(X, D),
                      (X.return = A),
                      (A = X);
                    break e;
                  }
                  a(A, j);
                  break;
                } else t(A, j);
                j = j.sibling;
              }
              D.type === E
                ? ((X = rn(D.props.children, A.mode, X, D.key)),
                  (X.return = A),
                  (A = X))
                : ((X = si(D.type, D.key, D.props, null, A.mode, X)),
                  Wl(X, D),
                  (X.return = A),
                  (A = X));
            }
            return y(A);
          case C:
            e: {
              for (I = D.key; j !== null; ) {
                if (j.key === I)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === D.containerInfo &&
                    j.stateNode.implementation === D.implementation
                  ) {
                    a(A, j.sibling),
                      (X = u(j, D.children || [])),
                      (X.return = A),
                      (A = X);
                    break e;
                  } else {
                    a(A, j);
                    break;
                  }
                else t(A, j);
                j = j.sibling;
              }
              (X = Nu(D, A.mode, X)), (X.return = A), (A = X);
            }
            return y(A);
          case P:
            return (I = D._init), (D = I(D._payload)), Re(A, j, D, X);
        }
        if (Le(D)) return se(A, j, D, X);
        if (Te(D)) {
          if (((I = Te(D)), typeof I != "function")) throw Error(s(150));
          return (D = I.call(D)), re(A, j, D, X);
        }
        if (typeof D.then == "function") return Re(A, j, Ei(D), X);
        if (D.$$typeof === B) return Re(A, j, fi(A, D), X);
        Ti(A, D);
      }
      return (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
        ? ((D = "" + D),
          j !== null && j.tag === 6
            ? (a(A, j.sibling), (X = u(j, D)), (X.return = A), (A = X))
            : (a(A, j), (X = Tu(D, A.mode, X)), (X.return = A), (A = X)),
          y(A))
        : a(A, j);
    }
    return function (A, j, D, X) {
      try {
        Fl = 0;
        var I = Re(A, j, D, X);
        return (In = null), I;
      } catch (ae) {
        if (ae === Xl || ae === hi) throw ae;
        var he = wt(29, ae, null, A.mode);
        return (he.lanes = X), (he.return = A), he;
      } finally {
      }
    };
  }
  var el = dh(!0),
    hh = dh(!1),
    kt = V(null),
    Wt = null;
  function Da(e) {
    var t = e.alternate;
    J(Ze, Ze.current & 1),
      J(kt, e),
      Wt === null &&
        (t === null || Jn.current !== null || t.memoizedState !== null) &&
        (Wt = e);
  }
  function mh(e) {
    if (e.tag === 22) {
      if ((J(Ze, Ze.current), J(kt, e), Wt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Wt = e);
      }
    } else za();
  }
  function za() {
    J(Ze, Ze.current), J(kt, kt.current);
  }
  function da(e) {
    W(kt), Wt === e && (Wt = null), W(Ze);
  }
  var Ze = V(0);
  function Ni(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || Jo(a))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function ro(e, t, a, r) {
    (t = e.memoizedState),
      (a = a(r, t)),
      (a = a == null ? t : v({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var io = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var r = Nt(),
        u = Aa(r);
      (u.payload = t),
        a != null && (u.callback = a),
        (t = Ca(e, u, r)),
        t !== null && (jt(t, e, r), Ql(t, e, r));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var r = Nt(),
        u = Aa(r);
      (u.tag = 1),
        (u.payload = t),
        a != null && (u.callback = a),
        (t = Ca(e, u, r)),
        t !== null && (jt(t, e, r), Ql(t, e, r));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Nt(),
        r = Aa(a);
      (r.tag = 2),
        t != null && (r.callback = t),
        (t = Ca(e, r, a)),
        t !== null && (jt(t, e, a), Ql(t, e, a));
    },
  };
  function yh(e, t, a, r, u, c, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, c, y)
        : t.prototype && t.prototype.isPureReactComponent
          ? !zl(a, r) || !zl(u, c)
          : !0
    );
  }
  function ph(e, t, a, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, r),
      t.state !== e && io.enqueueReplaceState(t, t.state, null);
  }
  function yn(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var r in t) r !== "ref" && (a[r] = t[r]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = v({}, a));
      for (var u in e) a[u] === void 0 && (a[u] = e[u]);
    }
    return a;
  }
  var ji =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function gh(e) {
    ji(e);
  }
  function vh(e) {
    console.error(e);
  }
  function bh(e) {
    ji(e);
  }
  function Ri(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function xh(e, t, a) {
    try {
      var r = e.onCaughtError;
      r(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function so(e, t, a) {
    return (
      (a = Aa(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Ri(e, t);
      }),
      a
    );
  }
  function Sh(e) {
    return (e = Aa(e)), (e.tag = 3), e;
  }
  function wh(e, t, a, r) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = r.value;
      (e.payload = function () {
        return u(c);
      }),
        (e.callback = function () {
          xh(t, a, r);
        });
    }
    var y = a.stateNode;
    y !== null &&
      typeof y.componentDidCatch == "function" &&
      (e.callback = function () {
        xh(t, a, r),
          typeof u != "function" &&
            (qa === null ? (qa = new Set([this])) : qa.add(this));
        var b = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: b !== null ? b : "",
        });
      });
  }
  function Qg(e, t, a, r, u) {
    if (
      ((a.flags |= 32768),
      r !== null && typeof r == "object" && typeof r.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && Hl(t, a, u, !0),
        (a = kt.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 13:
            return (
              Wt === null ? Mo() : a.alternate === null && Be === 0 && (Be = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              r === Lu
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([r])) : t.add(r),
                  zo(e, r, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              r === Lu
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([r]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([r])) : a.add(r)),
                  zo(e, r, u)),
              !1
            );
        }
        throw Error(s(435, a.tag));
      }
      return zo(e, r, u), Mo(), !1;
    }
    if (xe)
      return (
        (t = kt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            r !== Ou && ((e = Error(s(422), { cause: r })), Bl(Dt(e, a))))
          : (r !== Ou && ((t = Error(s(423), { cause: r })), Bl(Dt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (r = Dt(r, a)),
            (u = so(e.stateNode, r, u)),
            Hu(e, u),
            Be !== 4 && (Be = 2)),
        !1
      );
    var c = Error(s(520), { cause: r });
    if (
      ((c = Dt(c, a)),
      rr === null ? (rr = [c]) : rr.push(c),
      Be !== 4 && (Be = 2),
      t === null)
    )
      return !0;
    (r = Dt(r, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = u & -u),
            (a.lanes |= e),
            (e = so(a.stateNode, r, e)),
            Hu(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (c = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (c !== null &&
                  typeof c.componentDidCatch == "function" &&
                  (qa === null || !qa.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = Sh(u)),
              wh(u, e, a, r),
              Hu(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var _h = Error(s(461)),
    Je = !1;
  function We(e, t, a, r) {
    t.child = e === null ? hh(t, null, a, r) : el(t, e.child, a, r);
  }
  function Eh(e, t, a, r, u) {
    a = a.render;
    var c = t.ref;
    if ("ref" in r) {
      var y = {};
      for (var b in r) b !== "ref" && (y[b] = r[b]);
    } else y = r;
    return (
      dn(t),
      (r = Qu(e, t, a, y, c, u)),
      (b = Vu()),
      e !== null && !Je
        ? (Zu(e, t, u), ha(e, t, u))
        : (xe && b && ju(t), (t.flags |= 1), We(e, t, r, u), t.child)
    );
  }
  function Th(e, t, a, r, u) {
    if (e === null) {
      var c = a.type;
      return typeof c == "function" &&
        !Eu(c) &&
        c.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = c), Nh(e, t, c, r, u))
        : ((e = si(a.type, null, r, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !po(e, u))) {
      var y = c.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : zl), a(y, r) && e.ref === t.ref)
      )
        return ha(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = ia(c, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Nh(e, t, a, r, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (zl(c, r) && e.ref === t.ref)
        if (((Je = !1), (t.pendingProps = r = c), po(e, u)))
          (e.flags & 131072) !== 0 && (Je = !0);
        else return (t.lanes = e.lanes), ha(e, t, u);
    }
    return uo(e, t, a, r, u);
  }
  function jh(e, t, a) {
    var r = t.pendingProps,
      u = r.children,
      c = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((r = c !== null ? c.baseLanes | a : a), e !== null)) {
          for (u = t.child = e.child, c = 0; u !== null; )
            (c = c | u.lanes | u.childLanes), (u = u.sibling);
          t.childLanes = c & ~r;
        } else (t.childLanes = 0), (t.child = null);
        return Rh(e, t, r, a);
      }
      if ((a & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && di(t, c !== null ? c.cachePool : null),
          c !== null ? Nd(t, c) : Yu(),
          mh(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Rh(e, t, c !== null ? c.baseLanes | a : a, a)
        );
    } else
      c !== null
        ? (di(t, c.cachePool), Nd(t, c), za(), (t.memoizedState = null))
        : (e !== null && di(t, null), Yu(), za());
    return We(e, t, u, a), t.child;
  }
  function Rh(e, t, a, r) {
    var u = Uu();
    return (
      (u = u === null ? null : { parent: Ve._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && di(t, null),
      Yu(),
      mh(t),
      e !== null && Hl(e, t, r, !0),
      null
    );
  }
  function Oi(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(s(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function uo(e, t, a, r, u) {
    return (
      dn(t),
      (a = Qu(e, t, a, r, void 0, u)),
      (r = Vu()),
      e !== null && !Je
        ? (Zu(e, t, u), ha(e, t, u))
        : (xe && r && ju(t), (t.flags |= 1), We(e, t, a, u), t.child)
    );
  }
  function Oh(e, t, a, r, u, c) {
    return (
      dn(t),
      (t.updateQueue = null),
      (a = Rd(t, r, a, u)),
      jd(e),
      (r = Vu()),
      e !== null && !Je
        ? (Zu(e, t, c), ha(e, t, c))
        : (xe && r && ju(t), (t.flags |= 1), We(e, t, a, c), t.child)
    );
  }
  function Ah(e, t, a, r, u) {
    if ((dn(t), t.stateNode === null)) {
      var c = Qn,
        y = a.contextType;
      typeof y == "object" && y !== null && (c = nt(y)),
        (c = new a(r, c)),
        (t.memoizedState =
          c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = io),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = r),
        (c.state = t.memoizedState),
        (c.refs = {}),
        ku(t),
        (y = a.contextType),
        (c.context = typeof y == "object" && y !== null ? nt(y) : Qn),
        (c.state = t.memoizedState),
        (y = a.getDerivedStateFromProps),
        typeof y == "function" && (ro(t, a, y, r), (c.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" &&
            typeof c.componentWillMount != "function") ||
          ((y = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" &&
            c.UNSAFE_componentWillMount(),
          y !== c.state && io.enqueueReplaceState(c, c.state, null),
          Zl(t, r, c, u),
          Vl(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == "function" && (t.flags |= 4194308),
        (r = !0);
    } else if (e === null) {
      c = t.stateNode;
      var b = t.memoizedProps,
        _ = yn(a, b);
      c.props = _;
      var z = c.context,
        Y = a.contextType;
      (y = Qn), typeof Y == "object" && Y !== null && (y = nt(Y));
      var Q = a.getDerivedStateFromProps;
      (Y =
        typeof Q == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function"),
        (b = t.pendingProps !== b),
        Y ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((b || z !== y) && ph(t, c, r, y)),
        (Oa = !1);
      var L = t.memoizedState;
      (c.state = L),
        Zl(t, r, c, u),
        Vl(),
        (z = t.memoizedState),
        b || L !== z || Oa
          ? (typeof Q == "function" && (ro(t, a, Q, r), (z = t.memoizedState)),
            (_ = Oa || yh(t, a, _, r, L, z, y))
              ? (Y ||
                  (typeof c.UNSAFE_componentWillMount != "function" &&
                    typeof c.componentWillMount != "function") ||
                  (typeof c.componentWillMount == "function" &&
                    c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == "function" &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = z)),
            (c.props = r),
            (c.state = z),
            (c.context = y),
            (r = _))
          : (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1));
    } else {
      (c = t.stateNode),
        Bu(e, t),
        (y = t.memoizedProps),
        (Y = yn(a, y)),
        (c.props = Y),
        (Q = t.pendingProps),
        (L = c.context),
        (z = a.contextType),
        (_ = Qn),
        typeof z == "object" && z !== null && (_ = nt(z)),
        (b = a.getDerivedStateFromProps),
        (z =
          typeof b == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((y !== Q || L !== _) && ph(t, c, r, _)),
        (Oa = !1),
        (L = t.memoizedState),
        (c.state = L),
        Zl(t, r, c, u),
        Vl();
      var k = t.memoizedState;
      y !== Q ||
      L !== k ||
      Oa ||
      (e !== null && e.dependencies !== null && ci(e.dependencies))
        ? (typeof b == "function" && (ro(t, a, b, r), (k = t.memoizedState)),
          (Y =
            Oa ||
            yh(t, a, Y, r, L, k, _) ||
            (e !== null && e.dependencies !== null && ci(e.dependencies)))
            ? (z ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" &&
                  c.componentWillUpdate(r, k, _),
                typeof c.UNSAFE_componentWillUpdate == "function" &&
                  c.UNSAFE_componentWillUpdate(r, k, _)),
              typeof c.componentDidUpdate == "function" && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (y === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (y === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = k)),
          (c.props = r),
          (c.state = k),
          (c.context = _),
          (r = Y))
        : (typeof c.componentDidUpdate != "function" ||
            (y === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (y === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return (
      (c = r),
      Oi(e, t),
      (r = (t.flags & 128) !== 0),
      c || r
        ? ((c = t.stateNode),
          (a =
            r && typeof a.getDerivedStateFromError != "function"
              ? null
              : c.render()),
          (t.flags |= 1),
          e !== null && r
            ? ((t.child = el(t, e.child, null, u)),
              (t.child = el(t, null, a, u)))
            : We(e, t, a, u),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = ha(e, t, u)),
      e
    );
  }
  function Ch(e, t, a, r) {
    return kl(), (t.flags |= 256), We(e, t, a, r), t.child;
  }
  var oo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function co(e) {
    return { baseLanes: e, cachePool: vd() };
  }
  function fo(e, t, a) {
    return (e = e !== null ? e.childLanes & ~a : 0), t && (e |= Bt), e;
  }
  function Mh(e, t, a) {
    var r = t.pendingProps,
      u = !1,
      c = (t.flags & 128) !== 0,
      y;
    if (
      ((y = c) ||
        (y =
          e !== null && e.memoizedState === null ? !1 : (Ze.current & 2) !== 0),
      y && ((u = !0), (t.flags &= -129)),
      (y = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (xe) {
        if ((u ? Da(t) : za(), xe)) {
          var b = ke,
            _;
          if ((_ = b)) {
            e: {
              for (_ = b, b = Ft; _.nodeType !== 8; ) {
                if (!b) {
                  b = null;
                  break e;
                }
                if (((_ = Qt(_.nextSibling)), _ === null)) {
                  b = null;
                  break e;
                }
              }
              b = _;
            }
            b !== null
              ? ((t.memoizedState = {
                  dehydrated: b,
                  treeContext: sn !== null ? { id: sa, overflow: ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (_ = wt(18, null, null, 0)),
                (_.stateNode = b),
                (_.return = t),
                (t.child = _),
                (st = t),
                (ke = null),
                (_ = !0))
              : (_ = !1);
          }
          _ || cn(t);
        }
        if (
          ((b = t.memoizedState),
          b !== null && ((b = b.dehydrated), b !== null))
        )
          return Jo(b) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        da(t);
      }
      return (
        (b = r.children),
        (r = r.fallback),
        u
          ? (za(),
            (u = t.mode),
            (b = Ai({ mode: "hidden", children: b }, u)),
            (r = rn(r, u, a, null)),
            (b.return = t),
            (r.return = t),
            (b.sibling = r),
            (t.child = b),
            (u = t.child),
            (u.memoizedState = co(a)),
            (u.childLanes = fo(e, y, a)),
            (t.memoizedState = oo),
            r)
          : (Da(t), ho(t, b))
      );
    }
    if (
      ((_ = e.memoizedState), _ !== null && ((b = _.dehydrated), b !== null))
    ) {
      if (c)
        t.flags & 256
          ? (Da(t), (t.flags &= -257), (t = mo(e, t, a)))
          : t.memoizedState !== null
            ? (za(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (za(),
              (u = r.fallback),
              (b = t.mode),
              (r = Ai({ mode: "visible", children: r.children }, b)),
              (u = rn(u, b, a, null)),
              (u.flags |= 2),
              (r.return = t),
              (u.return = t),
              (r.sibling = u),
              (t.child = r),
              el(t, e.child, null, a),
              (r = t.child),
              (r.memoizedState = co(a)),
              (r.childLanes = fo(e, y, a)),
              (t.memoizedState = oo),
              (t = u));
      else if ((Da(t), Jo(b))) {
        if (((y = b.nextSibling && b.nextSibling.dataset), y)) var z = y.dgst;
        (y = z),
          (r = Error(s(419))),
          (r.stack = ""),
          (r.digest = y),
          Bl({ value: r, source: null, stack: null }),
          (t = mo(e, t, a));
      } else if (
        (Je || Hl(e, t, a, !1), (y = (a & e.childLanes) !== 0), Je || y)
      ) {
        if (
          ((y = Ce),
          y !== null &&
            ((r = a & -a),
            (r = (r & 42) !== 0 ? 1 : Js(r)),
            (r = (r & (y.suspendedLanes | a)) !== 0 ? 0 : r),
            r !== 0 && r !== _.retryLane))
        )
          throw ((_.retryLane = r), Gn(e, r), jt(y, e, r), _h);
        b.data === "$?" || Mo(), (t = mo(e, t, a));
      } else
        b.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = _.treeContext),
            (ke = Qt(b.nextSibling)),
            (st = t),
            (xe = !0),
            (on = null),
            (Ft = !1),
            e !== null &&
              ((Ut[Lt++] = sa),
              (Ut[Lt++] = ua),
              (Ut[Lt++] = sn),
              (sa = e.id),
              (ua = e.overflow),
              (sn = t)),
            (t = ho(t, r.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (za(),
        (u = r.fallback),
        (b = t.mode),
        (_ = e.child),
        (z = _.sibling),
        (r = ia(_, { mode: "hidden", children: r.children })),
        (r.subtreeFlags = _.subtreeFlags & 65011712),
        z !== null ? (u = ia(z, u)) : ((u = rn(u, b, a, null)), (u.flags |= 2)),
        (u.return = t),
        (r.return = t),
        (r.sibling = u),
        (t.child = r),
        (r = u),
        (u = t.child),
        (b = e.child.memoizedState),
        b === null
          ? (b = co(a))
          : ((_ = b.cachePool),
            _ !== null
              ? ((z = Ve._currentValue),
                (_ = _.parent !== z ? { parent: z, pool: z } : _))
              : (_ = vd()),
            (b = { baseLanes: b.baseLanes | a, cachePool: _ })),
        (u.memoizedState = b),
        (u.childLanes = fo(e, y, a)),
        (t.memoizedState = oo),
        r)
      : (Da(t),
        (a = e.child),
        (e = a.sibling),
        (a = ia(a, { mode: "visible", children: r.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((y = t.deletions),
          y === null ? ((t.deletions = [e]), (t.flags |= 16)) : y.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function ho(e, t) {
    return (
      (t = Ai({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Ai(e, t) {
    return (
      (e = wt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function mo(e, t, a) {
    return (
      el(t, e.child, null, a),
      (e = ho(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Dh(e, t, a) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Cu(e.return, t, a);
  }
  function yo(e, t, a, r, u) {
    var c = e.memoizedState;
    c === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: a,
          tailMode: u,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = r),
        (c.tail = a),
        (c.tailMode = u));
  }
  function zh(e, t, a) {
    var r = t.pendingProps,
      u = r.revealOrder,
      c = r.tail;
    if ((We(e, t, r.children, a), (r = Ze.current), (r & 2) !== 0))
      (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Dh(e, a, t);
          else if (e.tag === 19) Dh(e, a, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    switch ((J(Ze, r), u)) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          (e = a.alternate),
            e !== null && Ni(e) === null && (u = a),
            (a = a.sibling);
        (a = u),
          a === null
            ? ((u = t.child), (t.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          yo(t, !1, u, a, c);
        break;
      case "backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (((e = u.alternate), e !== null && Ni(e) === null)) {
            t.child = u;
            break;
          }
          (e = u.sibling), (u.sibling = a), (a = u), (u = e);
        }
        yo(t, !0, a, null, c);
        break;
      case "together":
        yo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ha(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Ha |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Hl(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, a = ia(e, e.pendingProps), t.child = a, a.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (a = a.sibling = ia(e, e.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function po(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && ci(e)));
  }
  function Vg(e, t, a) {
    switch (t.tag) {
      case 3:
        Me(t, t.stateNode.containerInfo),
          Ra(t, Ve, e.memoizedState.cache),
          kl();
        break;
      case 27:
      case 5:
        Qs(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ra(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null
            ? (Da(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Mh(e, t, a)
              : (Da(t), (e = ha(e, t, a)), e !== null ? e.sibling : null);
        Da(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((r = (a & t.childLanes) !== 0),
          r || (Hl(e, t, a, !1), (r = (a & t.childLanes) !== 0)),
          u)
        ) {
          if (r) return zh(e, t, a);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          J(Ze, Ze.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), jh(e, t, a);
      case 24:
        Ra(t, Ve, e.memoizedState.cache);
    }
    return ha(e, t, a);
  }
  function Uh(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Je = !0;
      else {
        if (!po(e, a) && (t.flags & 128) === 0) return (Je = !1), Vg(e, t, a);
        Je = (e.flags & 131072) !== 0;
      }
    else (Je = !1), xe && (t.flags & 1048576) !== 0 && fd(t, oi, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var r = t.elementType,
            u = r._init;
          if (((r = u(r._payload)), (t.type = r), typeof r == "function"))
            Eu(r)
              ? ((e = yn(r, e)), (t.tag = 1), (t = Ah(null, t, r, e, a)))
              : ((t.tag = 0), (t = uo(null, t, r, e, a)));
          else {
            if (r != null) {
              if (((u = r.$$typeof), u === G)) {
                (t.tag = 11), (t = Eh(null, t, r, e, a));
                break e;
              } else if (u === K) {
                (t.tag = 14), (t = Th(null, t, r, e, a));
                break e;
              }
            }
            throw ((t = At(r) || r), Error(s(306, t, "")));
          }
        }
        return t;
      case 0:
        return uo(e, t, t.type, t.pendingProps, a);
      case 1:
        return (r = t.type), (u = yn(r, t.pendingProps)), Ah(e, t, r, u, a);
      case 3:
        e: {
          if ((Me(t, t.stateNode.containerInfo), e === null))
            throw Error(s(387));
          r = t.pendingProps;
          var c = t.memoizedState;
          (u = c.element), Bu(e, t), Zl(t, r, null, a);
          var y = t.memoizedState;
          if (
            ((r = y.cache),
            Ra(t, Ve, r),
            r !== c.cache && Mu(t, [Ve], a, !0),
            Vl(),
            (r = y.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: r, isDehydrated: !1, cache: y.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = Ch(e, t, r, a);
              break e;
            } else if (r !== u) {
              (u = Dt(Error(s(424)), t)), Bl(u), (t = Ch(e, t, r, a));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                ke = Qt(e.firstChild),
                  st = t,
                  xe = !0,
                  on = null,
                  Ft = !0,
                  a = hh(t, null, r, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((kl(), r === u)) {
              t = ha(e, t, a);
              break e;
            }
            We(e, t, r, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Oi(e, t),
          e === null
            ? (a = Hm(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : xe ||
                ((a = t.type),
                (e = t.pendingProps),
                (r = Qi(ue.current).createElement(a)),
                (r[at] = t),
                (r[ft] = e),
                et(r, a, e),
                $e(r),
                (t.stateNode = r))
            : (t.memoizedState = Hm(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Qs(t),
          e === null &&
            xe &&
            ((r = t.stateNode = Lm(t.type, t.pendingProps, ue.current)),
            (st = t),
            (Ft = !0),
            (u = ke),
            Ga(t.type) ? ((Po = u), (ke = Qt(r.firstChild))) : (ke = u)),
          We(e, t, t.pendingProps.children, a),
          Oi(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            xe &&
            ((u = r = ke) &&
              ((r = bv(r, t.type, t.pendingProps, Ft)),
              r !== null
                ? ((t.stateNode = r),
                  (st = t),
                  (ke = Qt(r.firstChild)),
                  (Ft = !1),
                  (u = !0))
                : (u = !1)),
            u || cn(t)),
          Qs(t),
          (u = t.type),
          (c = t.pendingProps),
          (y = e !== null ? e.memoizedProps : null),
          (r = c.children),
          Zo(u, c) ? (r = null) : y !== null && Zo(u, y) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = Qu(e, t, kg, null, null, a)), (mr._currentValue = u)),
          Oi(e, t),
          We(e, t, r, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            xe &&
            ((e = a = ke) &&
              ((a = xv(a, t.pendingProps, Ft)),
              a !== null
                ? ((t.stateNode = a), (st = t), (ke = null), (e = !0))
                : (e = !1)),
            e || cn(t)),
          null
        );
      case 13:
        return Mh(e, t, a);
      case 4:
        return (
          Me(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = el(t, null, r, a)) : We(e, t, r, a),
          t.child
        );
      case 11:
        return Eh(e, t, t.type, t.pendingProps, a);
      case 7:
        return We(e, t, t.pendingProps, a), t.child;
      case 8:
        return We(e, t, t.pendingProps.children, a), t.child;
      case 12:
        return We(e, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (r = t.pendingProps),
          Ra(t, t.type, r.value),
          We(e, t, r.children, a),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (r = t.pendingProps.children),
          dn(t),
          (u = nt(u)),
          (r = r(u)),
          (t.flags |= 1),
          We(e, t, r, a),
          t.child
        );
      case 14:
        return Th(e, t, t.type, t.pendingProps, a);
      case 15:
        return Nh(e, t, t.type, t.pendingProps, a);
      case 19:
        return zh(e, t, a);
      case 31:
        return (
          (r = t.pendingProps),
          (a = t.mode),
          (r = { mode: r.mode, children: r.children }),
          e === null
            ? ((a = Ai(r, a)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a))
            : ((a = ia(e.child, r)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a)),
          t
        );
      case 22:
        return jh(e, t, a);
      case 24:
        return (
          dn(t),
          (r = nt(Ve)),
          e === null
            ? ((u = Uu()),
              u === null &&
                ((u = Ce),
                (c = Du()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= a),
                (u = c)),
              (t.memoizedState = { parent: r, cache: u }),
              ku(t),
              Ra(t, Ve, u))
            : ((e.lanes & a) !== 0 && (Bu(e, t), Zl(t, null, null, a), Vl()),
              (u = e.memoizedState),
              (c = t.memoizedState),
              u.parent !== r
                ? ((u = { parent: r, cache: r }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  Ra(t, Ve, r))
                : ((r = c.cache),
                  Ra(t, Ve, r),
                  r !== u.cache && Mu(t, [Ve], a, !0))),
          We(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function ma(e) {
    e.flags |= 4;
  }
  function Lh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Qm(t))) {
      if (
        ((t = kt.current),
        t !== null &&
          ((pe & 4194048) === pe
            ? Wt !== null
            : ((pe & 62914560) !== pe && (pe & 536870912) === 0) || t !== Wt))
      )
        throw ((Gl = Lu), bd);
      e.flags |= 8192;
    }
  }
  function Ci(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? mf() : 536870912), (e.lanes |= t), (ll |= t));
  }
  function Il(e, t) {
    if (!xe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = e.tail;
          for (var r = null; a !== null; )
            a.alternate !== null && (r = a), (a = a.sibling);
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Ue(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      r = 0;
    if (t)
      for (var u = e.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (r |= u.subtreeFlags & 65011712),
          (r |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling);
    else
      for (u = e.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (r |= u.subtreeFlags),
          (r |= u.flags),
          (u.return = e),
          (u = u.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = a), t;
  }
  function Zg(e, t, a) {
    var r = t.pendingProps;
    switch ((Ru(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ue(t), null;
      case 1:
        return Ue(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (r = null),
          e !== null && (r = e.memoizedState.cache),
          t.memoizedState.cache !== r && (t.flags |= 2048),
          ca(Ve),
          Ea(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (Ll(t)
              ? ma(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), md())),
          Ue(t),
          null
        );
      case 26:
        return (
          (a = t.memoizedState),
          e === null
            ? (ma(t),
              a !== null ? (Ue(t), Lh(t, a)) : (Ue(t), (t.flags &= -16777217)))
            : a
              ? a !== e.memoizedState
                ? (ma(t), Ue(t), Lh(t, a))
                : (Ue(t), (t.flags &= -16777217))
              : (e.memoizedProps !== r && ma(t), Ue(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        Xr(t), (a = ue.current);
        var u = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== r && ma(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return Ue(t), null;
          }
          (e = le.current),
            Ll(t) ? dd(t) : ((e = Lm(u, r, a)), (t.stateNode = e), ma(t));
        }
        return Ue(t), null;
      case 5:
        if ((Xr(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && ma(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return Ue(t), null;
          }
          if (((e = le.current), Ll(t))) dd(t);
          else {
            switch (((u = Qi(ue.current)), e)) {
              case 1:
                e = u.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                e = u.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    e = u.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    e = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    (e = u.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof r.is == "string"
                        ? u.createElement("select", { is: r.is })
                        : u.createElement("select")),
                      r.multiple
                        ? (e.multiple = !0)
                        : r.size && (e.size = r.size);
                    break;
                  default:
                    e =
                      typeof r.is == "string"
                        ? u.createElement(a, { is: r.is })
                        : u.createElement(a);
                }
            }
            (e[at] = t), (e[ft] = r);
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) e.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                (u.child.return = u), (u = u.child);
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              (u.sibling.return = u.return), (u = u.sibling);
            }
            t.stateNode = e;
            e: switch ((et(e, a, r), a)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!r.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && ma(t);
          }
        }
        return Ue(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== r && ma(t);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (((e = ue.current), Ll(t))) {
            if (
              ((e = t.stateNode),
              (a = t.memoizedProps),
              (r = null),
              (u = st),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            (e[at] = t),
              (e = !!(
                e.nodeValue === a ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                Om(e.nodeValue, a)
              )),
              e || cn(t);
          } else (e = Qi(e).createTextNode(r)), (e[at] = t), (t.stateNode = e);
        }
        return Ue(t), null;
      case 13:
        if (
          ((r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = Ll(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(s(317));
              u[at] = t;
            } else
              kl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Ue(t), (u = !1);
          } else
            (u = md()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return t.flags & 256 ? (da(t), t) : (da(t), null);
        }
        if ((da(t), (t.flags & 128) !== 0)) return (t.lanes = a), t;
        if (
          ((a = r !== null), (e = e !== null && e.memoizedState !== null), a)
        ) {
          (r = t.child),
            (u = null),
            r.alternate !== null &&
              r.alternate.memoizedState !== null &&
              r.alternate.memoizedState.cachePool !== null &&
              (u = r.alternate.memoizedState.cachePool.pool);
          var c = null;
          r.memoizedState !== null &&
            r.memoizedState.cachePool !== null &&
            (c = r.memoizedState.cachePool.pool),
            c !== u && (r.flags |= 2048);
        }
        return (
          a !== e && a && (t.child.flags |= 8192),
          Ci(t, t.updateQueue),
          Ue(t),
          null
        );
      case 4:
        return Ea(), e === null && Yo(t.stateNode.containerInfo), Ue(t), null;
      case 10:
        return ca(t.type), Ue(t), null;
      case 19:
        if ((W(Ze), (u = t.memoizedState), u === null)) return Ue(t), null;
        if (((r = (t.flags & 128) !== 0), (c = u.rendering), c === null))
          if (r) Il(u, !1);
          else {
            if (Be !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = Ni(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      Il(u, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      Ci(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;

                  )
                    cd(a, e), (a = a.sibling);
                  return J(Ze, (Ze.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            u.tail !== null &&
              Pt() > zi &&
              ((t.flags |= 128), (r = !0), Il(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = Ni(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ci(t, e),
                Il(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !c.alternate &&
                  !xe)
              )
                return Ue(t), null;
            } else
              2 * Pt() - u.renderingStartTime > zi &&
                a !== 536870912 &&
                ((t.flags |= 128), (r = !0), Il(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = u.last),
              e !== null ? (e.sibling = c) : (t.child = c),
              (u.last = c));
        }
        return u.tail !== null
          ? ((t = u.tail),
            (u.rendering = t),
            (u.tail = t.sibling),
            (u.renderingStartTime = Pt()),
            (t.sibling = null),
            (e = Ze.current),
            J(Ze, r ? (e & 1) | 2 : e & 1),
            t)
          : (Ue(t), null);
      case 22:
      case 23:
        return (
          da(t),
          Xu(),
          (r = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== r && (t.flags |= 8192)
            : r && (t.flags |= 8192),
          r
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ue(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ue(t),
          (a = t.updateQueue),
          a !== null && Ci(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (r = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (r = t.memoizedState.cachePool.pool),
          r !== a && (t.flags |= 2048),
          e !== null && W(hn),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          ca(Ve),
          Ue(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Kg(e, t) {
    switch ((Ru(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          ca(Ve),
          Ea(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Xr(t), null;
      case 13:
        if (
          (da(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          kl();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return W(Ze), null;
      case 4:
        return Ea(), null;
      case 10:
        return ca(t.type), null;
      case 22:
      case 23:
        return (
          da(t),
          Xu(),
          e !== null && W(hn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return ca(Ve), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function kh(e, t) {
    switch ((Ru(t), t.tag)) {
      case 3:
        ca(Ve), Ea();
        break;
      case 26:
      case 27:
      case 5:
        Xr(t);
        break;
      case 4:
        Ea();
        break;
      case 13:
        da(t);
        break;
      case 19:
        W(Ze);
        break;
      case 10:
        ca(t.type);
        break;
      case 22:
      case 23:
        da(t), Xu(), e !== null && W(hn);
        break;
      case 24:
        ca(Ve);
    }
  }
  function er(e, t) {
    try {
      var a = t.updateQueue,
        r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            r = void 0;
            var c = a.create,
              y = a.inst;
            (r = c()), (y.destroy = r);
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (b) {
      Ae(t, t.return, b);
    }
  }
  function Ua(e, t, a) {
    try {
      var r = t.updateQueue,
        u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        r = c;
        do {
          if ((r.tag & e) === e) {
            var y = r.inst,
              b = y.destroy;
            if (b !== void 0) {
              (y.destroy = void 0), (u = t);
              var _ = a,
                z = b;
              try {
                z();
              } catch (Y) {
                Ae(u, _, Y);
              }
            }
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (Y) {
      Ae(t, t.return, Y);
    }
  }
  function Bh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Td(t, a);
      } catch (r) {
        Ae(e, e.return, r);
      }
    }
  }
  function Hh(e, t, a) {
    (a.props = yn(e.type, e.memoizedProps)), (a.state = e.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (r) {
      Ae(e, t, r);
    }
  }
  function tr(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof a == "function" ? (e.refCleanup = a(r)) : (a.current = r);
      }
    } catch (u) {
      Ae(e, t, u);
    }
  }
  function It(e, t) {
    var a = e.ref,
      r = e.refCleanup;
    if (a !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Ae(e, t, u);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          Ae(e, t, u);
        }
      else a.current = null;
  }
  function qh(e) {
    var t = e.type,
      a = e.memoizedProps,
      r = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && r.focus();
          break e;
        case "img":
          a.src ? (r.src = a.src) : a.srcSet && (r.srcset = a.srcSet);
      }
    } catch (u) {
      Ae(e, e.return, u);
    }
  }
  function go(e, t, a) {
    try {
      var r = e.stateNode;
      mv(r, e.type, a, t), (r[ft] = t);
    } catch (u) {
      Ae(e, e.return, u);
    }
  }
  function Yh(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ga(e.type)) ||
      e.tag === 4
    );
  }
  function vo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Yh(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && Ga(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function bo(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a
            ).insertBefore(e, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                  ? a.ownerDocument.body
                  : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = Gi));
    else if (
      r !== 4 &&
      (r === 27 && Ga(e.type) && ((a = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (bo(e, t, a), e = e.sibling; e !== null; )
        bo(e, t, a), (e = e.sibling);
  }
  function Mi(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (
      r !== 4 &&
      (r === 27 && Ga(e.type) && (a = e.stateNode), (e = e.child), e !== null)
    )
      for (Mi(e, t, a), e = e.sibling; e !== null; )
        Mi(e, t, a), (e = e.sibling);
  }
  function Xh(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var r = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      et(t, r, a), (t[at] = e), (t[ft] = a);
    } catch (c) {
      Ae(e, e.return, c);
    }
  }
  var ya = !1,
    qe = !1,
    xo = !1,
    Gh = typeof WeakSet == "function" ? WeakSet : Set,
    Pe = null;
  function $g(e, t) {
    if (((e = e.containerInfo), (Qo = Pi), (e = ed(e)), gu(e))) {
      if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var r = a.getSelection && a.getSelection();
          if (r && r.rangeCount !== 0) {
            a = r.anchorNode;
            var u = r.anchorOffset,
              c = r.focusNode;
            r = r.focusOffset;
            try {
              a.nodeType, c.nodeType;
            } catch {
              a = null;
              break e;
            }
            var y = 0,
              b = -1,
              _ = -1,
              z = 0,
              Y = 0,
              Q = e,
              L = null;
            t: for (;;) {
              for (
                var k;
                Q !== a || (u !== 0 && Q.nodeType !== 3) || (b = y + u),
                  Q !== c || (r !== 0 && Q.nodeType !== 3) || (_ = y + r),
                  Q.nodeType === 3 && (y += Q.nodeValue.length),
                  (k = Q.firstChild) !== null;

              )
                (L = Q), (Q = k);
              for (;;) {
                if (Q === e) break t;
                if (
                  (L === a && ++z === u && (b = y),
                  L === c && ++Y === r && (_ = y),
                  (k = Q.nextSibling) !== null)
                )
                  break;
                (Q = L), (L = Q.parentNode);
              }
              Q = k;
            }
            a = b === -1 || _ === -1 ? null : { start: b, end: _ };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Vo = { focusedElem: e, selectionRange: a }, Pi = !1, Pe = t;
      Pe !== null;

    )
      if (
        ((t = Pe), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (Pe = e);
      else
        for (; Pe !== null; ) {
          switch (((t = Pe), (c = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                (e = void 0),
                  (a = t),
                  (u = c.memoizedProps),
                  (c = c.memoizedState),
                  (r = a.stateNode);
                try {
                  var se = yn(a.type, u, a.elementType === a.type);
                  (e = r.getSnapshotBeforeUpdate(se, c)),
                    (r.__reactInternalSnapshotBeforeUpdate = e);
                } catch (re) {
                  Ae(a, a.return, re);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  $o(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      $o(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Pe = e);
            break;
          }
          Pe = t.return;
        }
  }
  function Qh(e, t, a) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        La(e, a), r & 4 && er(5, a);
        break;
      case 1:
        if ((La(e, a), r & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (y) {
              Ae(a, a.return, y);
            }
          else {
            var u = yn(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (y) {
              Ae(a, a.return, y);
            }
          }
        r & 64 && Bh(a), r & 512 && tr(a, a.return);
        break;
      case 3:
        if ((La(e, a), r & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Td(e, t);
          } catch (y) {
            Ae(a, a.return, y);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Xh(a);
      case 26:
      case 5:
        La(e, a), t === null && r & 4 && qh(a), r & 512 && tr(a, a.return);
        break;
      case 12:
        La(e, a);
        break;
      case 13:
        La(e, a),
          r & 4 && Kh(e, a),
          r & 64 &&
            ((e = a.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((a = nv.bind(null, a)), Sv(e, a))));
        break;
      case 22:
        if (((r = a.memoizedState !== null || ya), !r)) {
          (t = (t !== null && t.memoizedState !== null) || qe), (u = ya);
          var c = qe;
          (ya = r),
            (qe = t) && !c ? ka(e, a, (a.subtreeFlags & 8772) !== 0) : La(e, a),
            (ya = u),
            (qe = c);
        }
        break;
      case 30:
        break;
      default:
        La(e, a);
    }
  }
  function Vh(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Vh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ws(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var De = null,
    mt = !1;
  function pa(e, t, a) {
    for (a = a.child; a !== null; ) Zh(e, t, a), (a = a.sibling);
  }
  function Zh(e, t, a) {
    if (bt && typeof bt.onCommitFiberUnmount == "function")
      try {
        bt.onCommitFiberUnmount(wl, a);
      } catch {}
    switch (a.tag) {
      case 26:
        qe || It(a, t),
          pa(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        qe || It(a, t);
        var r = De,
          u = mt;
        Ga(a.type) && ((De = a.stateNode), (mt = !1)),
          pa(e, t, a),
          cr(a.stateNode),
          (De = r),
          (mt = u);
        break;
      case 5:
        qe || It(a, t);
      case 6:
        if (
          ((r = De),
          (u = mt),
          (De = null),
          pa(e, t, a),
          (De = r),
          (mt = u),
          De !== null)
        )
          if (mt)
            try {
              (De.nodeType === 9
                ? De.body
                : De.nodeName === "HTML"
                  ? De.ownerDocument.body
                  : De
              ).removeChild(a.stateNode);
            } catch (c) {
              Ae(a, t, c);
            }
          else
            try {
              De.removeChild(a.stateNode);
            } catch (c) {
              Ae(a, t, c);
            }
        break;
      case 18:
        De !== null &&
          (mt
            ? ((e = De),
              zm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                a.stateNode
              ),
              vr(e))
            : zm(De, a.stateNode));
        break;
      case 4:
        (r = De),
          (u = mt),
          (De = a.stateNode.containerInfo),
          (mt = !0),
          pa(e, t, a),
          (De = r),
          (mt = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        qe || Ua(2, a, t), qe || Ua(4, a, t), pa(e, t, a);
        break;
      case 1:
        qe ||
          (It(a, t),
          (r = a.stateNode),
          typeof r.componentWillUnmount == "function" && Hh(a, t, r)),
          pa(e, t, a);
        break;
      case 21:
        pa(e, t, a);
        break;
      case 22:
        (qe = (r = qe) || a.memoizedState !== null), pa(e, t, a), (qe = r);
        break;
      default:
        pa(e, t, a);
    }
  }
  function Kh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        vr(e);
      } catch (a) {
        Ae(t, t.return, a);
      }
  }
  function Jg(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Gh()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Gh()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function So(e, t) {
    var a = Jg(e);
    t.forEach(function (r) {
      var u = lv.bind(null, e, r);
      a.has(r) || (a.add(r), r.then(u, u));
    });
  }
  function _t(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var u = a[r],
          c = e,
          y = t,
          b = y;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (Ga(b.type)) {
                (De = b.stateNode), (mt = !1);
                break e;
              }
              break;
            case 5:
              (De = b.stateNode), (mt = !1);
              break e;
            case 3:
            case 4:
              (De = b.stateNode.containerInfo), (mt = !0);
              break e;
          }
          b = b.return;
        }
        if (De === null) throw Error(s(160));
        Zh(c, y, u),
          (De = null),
          (mt = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) $h(t, e), (t = t.sibling);
  }
  var Gt = null;
  function $h(e, t) {
    var a = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _t(t, e),
          Et(e),
          r & 4 && (Ua(3, e, e.return), er(3, e), Ua(5, e, e.return));
        break;
      case 1:
        _t(t, e),
          Et(e),
          r & 512 && (qe || a === null || It(a, a.return)),
          r & 64 &&
            ya &&
            ((e = e.updateQueue),
            e !== null &&
              ((r = e.callbacks),
              r !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? r : a.concat(r)))));
        break;
      case 26:
        var u = Gt;
        if (
          (_t(t, e),
          Et(e),
          r & 512 && (qe || a === null || It(a, a.return)),
          r & 4)
        ) {
          var c = a !== null ? a.memoizedState : null;
          if (((r = e.memoizedState), a === null))
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  (r = e.type),
                    (a = e.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (r) {
                    case "title":
                      (c = u.getElementsByTagName("title")[0]),
                        (!c ||
                          c[Tl] ||
                          c[at] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = u.createElement(r)),
                          u.head.insertBefore(
                            c,
                            u.querySelector("head > title")
                          )),
                        et(c, r, a),
                        (c[at] = e),
                        $e(c),
                        (r = c);
                      break e;
                    case "link":
                      var y = Xm("link", "href", u).get(r + (a.href || ""));
                      if (y) {
                        for (var b = 0; b < y.length; b++)
                          if (
                            ((c = y[b]),
                            c.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              c.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              c.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              c.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            y.splice(b, 1);
                            break t;
                          }
                      }
                      (c = u.createElement(r)),
                        et(c, r, a),
                        u.head.appendChild(c);
                      break;
                    case "meta":
                      if (
                        (y = Xm("meta", "content", u).get(
                          r + (a.content || "")
                        ))
                      ) {
                        for (b = 0; b < y.length; b++)
                          if (
                            ((c = y[b]),
                            c.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              c.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              c.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            y.splice(b, 1);
                            break t;
                          }
                      }
                      (c = u.createElement(r)),
                        et(c, r, a),
                        u.head.appendChild(c);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  (c[at] = e), $e(c), (r = c);
                }
                e.stateNode = r;
              } else Gm(u, e.type, e.stateNode);
            else e.stateNode = Ym(u, r, e.memoizedProps);
          else
            c !== r
              ? (c === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                r === null
                  ? Gm(u, e.type, e.stateNode)
                  : Ym(u, r, e.memoizedProps))
              : r === null &&
                e.stateNode !== null &&
                go(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        _t(t, e),
          Et(e),
          r & 512 && (qe || a === null || It(a, a.return)),
          a !== null && r & 4 && go(e, e.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (_t(t, e),
          Et(e),
          r & 512 && (qe || a === null || It(a, a.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            Ln(u, "");
          } catch (k) {
            Ae(e, e.return, k);
          }
        }
        r & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), go(e, u, a !== null ? a.memoizedProps : u)),
          r & 1024 && (xo = !0);
        break;
      case 6:
        if ((_t(t, e), Et(e), r & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          (r = e.memoizedProps), (a = e.stateNode);
          try {
            a.nodeValue = r;
          } catch (k) {
            Ae(e, e.return, k);
          }
        }
        break;
      case 3:
        if (
          ((Ki = null),
          (u = Gt),
          (Gt = Vi(t.containerInfo)),
          _t(t, e),
          (Gt = u),
          Et(e),
          r & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            vr(t.containerInfo);
          } catch (k) {
            Ae(e, e.return, k);
          }
        xo && ((xo = !1), Jh(e));
        break;
      case 4:
        (r = Gt),
          (Gt = Vi(e.stateNode.containerInfo)),
          _t(t, e),
          Et(e),
          (Gt = r);
        break;
      case 12:
        _t(t, e), Et(e);
        break;
      case 13:
        _t(t, e),
          Et(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (jo = Pt()),
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((e.updateQueue = null), So(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var _ = a !== null && a.memoizedState !== null,
          z = ya,
          Y = qe;
        if (
          ((ya = z || u),
          (qe = Y || _),
          _t(t, e),
          (qe = Y),
          (ya = z),
          Et(e),
          r & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (a === null || _ || ya || qe || pn(e)),
              a = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                _ = a = t;
                try {
                  if (((c = _.stateNode), u))
                    (y = c.style),
                      typeof y.setProperty == "function"
                        ? y.setProperty("display", "none", "important")
                        : (y.display = "none");
                  else {
                    b = _.stateNode;
                    var Q = _.memoizedProps.style,
                      L =
                        Q != null && Q.hasOwnProperty("display")
                          ? Q.display
                          : null;
                    b.style.display =
                      L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (k) {
                  Ae(_, _.return, k);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                _ = t;
                try {
                  _.stateNode.nodeValue = u ? "" : _.memoizedProps;
                } catch (k) {
                  Ae(_, _.return, k);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        r & 4 &&
          ((r = e.updateQueue),
          r !== null &&
            ((a = r.retryQueue),
            a !== null && ((r.retryQueue = null), So(e, a))));
        break;
      case 19:
        _t(t, e),
          Et(e),
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((e.updateQueue = null), So(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        _t(t, e), Et(e);
    }
  }
  function Et(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, r = e.return; r !== null; ) {
          if (Yh(r)) {
            a = r;
            break;
          }
          r = r.return;
        }
        if (a == null) throw Error(s(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              c = vo(e);
            Mi(e, c, u);
            break;
          case 5:
            var y = a.stateNode;
            a.flags & 32 && (Ln(y, ""), (a.flags &= -33));
            var b = vo(e);
            Mi(e, b, y);
            break;
          case 3:
          case 4:
            var _ = a.stateNode.containerInfo,
              z = vo(e);
            bo(e, z, _);
            break;
          default:
            throw Error(s(161));
        }
      } catch (Y) {
        Ae(e, e.return, Y);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Jh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Jh(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function La(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) Qh(e, t.alternate, t), (t = t.sibling);
  }
  function pn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ua(4, t, t.return), pn(t);
          break;
        case 1:
          It(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Hh(t, t.return, a),
            pn(t);
          break;
        case 27:
          cr(t.stateNode);
        case 26:
        case 5:
          It(t, t.return), pn(t);
          break;
        case 22:
          t.memoizedState === null && pn(t);
          break;
        case 30:
          pn(t);
          break;
        default:
          pn(t);
      }
      e = e.sibling;
    }
  }
  function ka(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate,
        u = e,
        c = t,
        y = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ka(u, c, a), er(4, c);
          break;
        case 1:
          if (
            (ka(u, c, a),
            (r = c),
            (u = r.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (z) {
              Ae(r, r.return, z);
            }
          if (((r = c), (u = r.updateQueue), u !== null)) {
            var b = r.stateNode;
            try {
              var _ = u.shared.hiddenCallbacks;
              if (_ !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < _.length; u++)
                  Ed(_[u], b);
            } catch (z) {
              Ae(r, r.return, z);
            }
          }
          a && y & 64 && Bh(c), tr(c, c.return);
          break;
        case 27:
          Xh(c);
        case 26:
        case 5:
          ka(u, c, a), a && r === null && y & 4 && qh(c), tr(c, c.return);
          break;
        case 12:
          ka(u, c, a);
          break;
        case 13:
          ka(u, c, a), a && y & 4 && Kh(u, c);
          break;
        case 22:
          c.memoizedState === null && ka(u, c, a), tr(c, c.return);
          break;
        case 30:
          break;
        default:
          ka(u, c, a);
      }
      t = t.sibling;
    }
  }
  function wo(e, t) {
    var a = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && ql(a));
  }
  function _o(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ql(e));
  }
  function ea(e, t, a, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Ph(e, t, a, r), (t = t.sibling);
  }
  function Ph(e, t, a, r) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ea(e, t, a, r), u & 2048 && er(9, t);
        break;
      case 1:
        ea(e, t, a, r);
        break;
      case 3:
        ea(e, t, a, r),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ql(e)));
        break;
      case 12:
        if (u & 2048) {
          ea(e, t, a, r), (e = t.stateNode);
          try {
            var c = t.memoizedProps,
              y = c.id,
              b = c.onPostCommit;
            typeof b == "function" &&
              b(
                y,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (_) {
            Ae(t, t.return, _);
          }
        } else ea(e, t, a, r);
        break;
      case 13:
        ea(e, t, a, r);
        break;
      case 23:
        break;
      case 22:
        (c = t.stateNode),
          (y = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? ea(e, t, a, r)
              : ar(e, t)
            : c._visibility & 2
              ? ea(e, t, a, r)
              : ((c._visibility |= 2),
                tl(e, t, a, r, (t.subtreeFlags & 10256) !== 0)),
          u & 2048 && wo(y, t);
        break;
      case 24:
        ea(e, t, a, r), u & 2048 && _o(t.alternate, t);
        break;
      default:
        ea(e, t, a, r);
    }
  }
  function tl(e, t, a, r, u) {
    for (u = u && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var c = e,
        y = t,
        b = a,
        _ = r,
        z = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          tl(c, y, b, _, u), er(8, y);
          break;
        case 23:
          break;
        case 22:
          var Y = y.stateNode;
          y.memoizedState !== null
            ? Y._visibility & 2
              ? tl(c, y, b, _, u)
              : ar(c, y)
            : ((Y._visibility |= 2), tl(c, y, b, _, u)),
            u && z & 2048 && wo(y.alternate, y);
          break;
        case 24:
          tl(c, y, b, _, u), u && z & 2048 && _o(y.alternate, y);
          break;
        default:
          tl(c, y, b, _, u);
      }
      t = t.sibling;
    }
  }
  function ar(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          r = t,
          u = r.flags;
        switch (r.tag) {
          case 22:
            ar(a, r), u & 2048 && wo(r.alternate, r);
            break;
          case 24:
            ar(a, r), u & 2048 && _o(r.alternate, r);
            break;
          default:
            ar(a, r);
        }
        t = t.sibling;
      }
  }
  var nr = 8192;
  function al(e) {
    if (e.subtreeFlags & nr)
      for (e = e.child; e !== null; ) Fh(e), (e = e.sibling);
  }
  function Fh(e) {
    switch (e.tag) {
      case 26:
        al(e),
          e.flags & nr &&
            e.memoizedState !== null &&
            zv(Gt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        al(e);
        break;
      case 3:
      case 4:
        var t = Gt;
        (Gt = Vi(e.stateNode.containerInfo)), al(e), (Gt = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = nr), (nr = 16777216), al(e), (nr = t))
            : al(e));
        break;
      default:
        al(e);
    }
  }
  function Wh(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function lr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          (Pe = r), em(r, e);
        }
      Wh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Ih(e), (e = e.sibling);
  }
  function Ih(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        lr(e), e.flags & 2048 && Ua(9, e, e.return);
        break;
      case 3:
        lr(e);
        break;
      case 12:
        lr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Di(e))
          : lr(e);
        break;
      default:
        lr(e);
    }
  }
  function Di(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          (Pe = r), em(r, e);
        }
      Wh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          Ua(8, t, t.return), Di(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), Di(t));
          break;
        default:
          Di(t);
      }
      e = e.sibling;
    }
  }
  function em(e, t) {
    for (; Pe !== null; ) {
      var a = Pe;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ua(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var r = a.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          ql(a.memoizedState.cache);
      }
      if (((r = a.child), r !== null)) (r.return = a), (Pe = r);
      else
        e: for (a = e; Pe !== null; ) {
          r = Pe;
          var u = r.sibling,
            c = r.return;
          if ((Vh(r), r === a)) {
            Pe = null;
            break e;
          }
          if (u !== null) {
            (u.return = c), (Pe = u);
            break e;
          }
          Pe = c;
        }
    }
  }
  var Pg = {
      getCacheForType: function (e) {
        var t = nt(Ve),
          a = t.data.get(e);
        return a === void 0 && ((a = e()), t.data.set(e, a)), a;
      },
    },
    Fg = typeof WeakMap == "function" ? WeakMap : Map,
    Se = 0,
    Ce = null,
    me = null,
    pe = 0,
    we = 0,
    Tt = null,
    Ba = !1,
    nl = !1,
    Eo = !1,
    ga = 0,
    Be = 0,
    Ha = 0,
    gn = 0,
    To = 0,
    Bt = 0,
    ll = 0,
    rr = null,
    yt = null,
    No = !1,
    jo = 0,
    zi = 1 / 0,
    Ui = null,
    qa = null,
    Ie = 0,
    Ya = null,
    rl = null,
    il = 0,
    Ro = 0,
    Oo = null,
    tm = null,
    ir = 0,
    Ao = null;
  function Nt() {
    if ((Se & 2) !== 0 && pe !== 0) return pe & -pe;
    if (U.T !== null) {
      var e = Kn;
      return e !== 0 ? e : ko();
    }
    return gf();
  }
  function am() {
    Bt === 0 && (Bt = (pe & 536870912) === 0 || xe ? hf() : 536870912);
    var e = kt.current;
    return e !== null && (e.flags |= 32), Bt;
  }
  function jt(e, t, a) {
    ((e === Ce && (we === 2 || we === 9)) || e.cancelPendingCommit !== null) &&
      (sl(e, 0), Xa(e, pe, Bt, !1)),
      El(e, a),
      ((Se & 2) === 0 || e !== Ce) &&
        (e === Ce &&
          ((Se & 2) === 0 && (gn |= a), Be === 4 && Xa(e, pe, Bt, !1)),
        ta(e));
  }
  function nm(e, t, a) {
    if ((Se & 6) !== 0) throw Error(s(327));
    var r = (!a && (t & 124) === 0 && (t & e.expiredLanes) === 0) || _l(e, t),
      u = r ? ev(e, t) : Do(e, t, !0),
      c = r;
    do {
      if (u === 0) {
        nl && !r && Xa(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), c && !Wg(a))) {
          (u = Do(e, t, !1)), (c = !1);
          continue;
        }
        if (u === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var y = 0;
          else
            (y = e.pendingLanes & -536870913),
              (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0);
          if (y !== 0) {
            t = y;
            e: {
              var b = e;
              u = rr;
              var _ = b.current.memoizedState.isDehydrated;
              if ((_ && (sl(b, y).flags |= 256), (y = Do(b, y, !1)), y !== 2)) {
                if (Eo && !_) {
                  (b.errorRecoveryDisabledLanes |= c), (gn |= c), (u = 4);
                  break e;
                }
                (c = yt),
                  (yt = u),
                  c !== null && (yt === null ? (yt = c) : yt.push.apply(yt, c));
              }
              u = y;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          sl(e, 0), Xa(e, t, 0, !0);
          break;
        }
        e: {
          switch (((r = e), (c = u), c)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Xa(r, t, Bt, !Ba);
              break e;
            case 2:
              yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((u = jo + 300 - Pt()), 10 < u)) {
            if ((Xa(r, t, Bt, !Ba), Zr(r, 0, !0) !== 0)) break e;
            r.timeoutHandle = Mm(
              lm.bind(null, r, a, yt, Ui, No, t, Bt, gn, ll, Ba, c, 2, -0, 0),
              u
            );
            break e;
          }
          lm(r, a, yt, Ui, No, t, Bt, gn, ll, Ba, c, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    ta(e);
  }
  function lm(e, t, a, r, u, c, y, b, _, z, Y, Q, L, k) {
    if (
      ((e.timeoutHandle = -1),
      (Q = t.subtreeFlags),
      (Q & 8192 || (Q & 16785408) === 16785408) &&
        ((hr = { stylesheets: null, count: 0, unsuspend: Dv }),
        Fh(t),
        (Q = Uv()),
        Q !== null))
    ) {
      (e.cancelPendingCommit = Q(
        fm.bind(null, e, t, c, a, r, u, y, b, _, Y, 1, L, k)
      )),
        Xa(e, c, y, !z);
      return;
    }
    fm(e, t, c, a, r, u, y, b, _);
  }
  function Wg(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var r = 0; r < a.length; r++) {
          var u = a[r],
            c = u.getSnapshot;
          u = u.value;
          try {
            if (!St(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Xa(e, t, a, r) {
    (t &= ~To),
      (t &= ~gn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      r && (e.warmLanes |= t),
      (r = e.expirationTimes);
    for (var u = t; 0 < u; ) {
      var c = 31 - xt(u),
        y = 1 << c;
      (r[c] = -1), (u &= ~y);
    }
    a !== 0 && yf(e, a, t);
  }
  function Li() {
    return (Se & 6) === 0 ? (sr(0), !1) : !0;
  }
  function Co() {
    if (me !== null) {
      if (we === 0) var e = me.return;
      else (e = me), (oa = fn = null), Ku(e), (In = null), (Fl = 0), (e = me);
      for (; e !== null; ) kh(e.alternate, e), (e = e.return);
      me = null;
    }
  }
  function sl(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && ((e.timeoutHandle = -1), pv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      Co(),
      (Ce = e),
      (me = a = ia(e.current, null)),
      (pe = t),
      (we = 0),
      (Tt = null),
      (Ba = !1),
      (nl = _l(e, t)),
      (Eo = !1),
      (ll = Bt = To = gn = Ha = Be = 0),
      (yt = rr = null),
      (No = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var u = 31 - xt(r),
          c = 1 << u;
        (t |= e[u]), (r &= ~c);
      }
    return (ga = t), li(), a;
  }
  function rm(e, t) {
    (de = null),
      (U.H = _i),
      t === Xl || t === hi
        ? ((t = wd()), (we = 3))
        : t === bd
          ? ((t = wd()), (we = 4))
          : (we =
              t === _h
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Tt = t),
      me === null && ((Be = 1), Ri(e, Dt(t, e.current)));
  }
  function im() {
    var e = U.H;
    return (U.H = _i), e === null ? _i : e;
  }
  function sm() {
    var e = U.A;
    return (U.A = Pg), e;
  }
  function Mo() {
    (Be = 4),
      Ba || ((pe & 4194048) !== pe && kt.current !== null) || (nl = !0),
      ((Ha & 134217727) === 0 && (gn & 134217727) === 0) ||
        Ce === null ||
        Xa(Ce, pe, Bt, !1);
  }
  function Do(e, t, a) {
    var r = Se;
    Se |= 2;
    var u = im(),
      c = sm();
    (Ce !== e || pe !== t) && ((Ui = null), sl(e, t)), (t = !1);
    var y = Be;
    e: do
      try {
        if (we !== 0 && me !== null) {
          var b = me,
            _ = Tt;
          switch (we) {
            case 8:
              Co(), (y = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              kt.current === null && (t = !0);
              var z = we;
              if (((we = 0), (Tt = null), ul(e, b, _, z), a && nl)) {
                y = 0;
                break e;
              }
              break;
            default:
              (z = we), (we = 0), (Tt = null), ul(e, b, _, z);
          }
        }
        Ig(), (y = Be);
        break;
      } catch (Y) {
        rm(e, Y);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (oa = fn = null),
      (Se = r),
      (U.H = u),
      (U.A = c),
      me === null && ((Ce = null), (pe = 0), li()),
      y
    );
  }
  function Ig() {
    for (; me !== null; ) um(me);
  }
  function ev(e, t) {
    var a = Se;
    Se |= 2;
    var r = im(),
      u = sm();
    Ce !== e || pe !== t
      ? ((Ui = null), (zi = Pt() + 500), sl(e, t))
      : (nl = _l(e, t));
    e: do
      try {
        if (we !== 0 && me !== null) {
          t = me;
          var c = Tt;
          t: switch (we) {
            case 1:
              (we = 0), (Tt = null), ul(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (xd(c)) {
                (we = 0), (Tt = null), om(t);
                break;
              }
              (t = function () {
                (we !== 2 && we !== 9) || Ce !== e || (we = 7), ta(e);
              }),
                c.then(t, t);
              break e;
            case 3:
              we = 7;
              break e;
            case 4:
              we = 5;
              break e;
            case 7:
              xd(c)
                ? ((we = 0), (Tt = null), om(t))
                : ((we = 0), (Tt = null), ul(e, t, c, 7));
              break;
            case 5:
              var y = null;
              switch (me.tag) {
                case 26:
                  y = me.memoizedState;
                case 5:
                case 27:
                  var b = me;
                  if (!y || Qm(y)) {
                    (we = 0), (Tt = null);
                    var _ = b.sibling;
                    if (_ !== null) me = _;
                    else {
                      var z = b.return;
                      z !== null ? ((me = z), ki(z)) : (me = null);
                    }
                    break t;
                  }
              }
              (we = 0), (Tt = null), ul(e, t, c, 5);
              break;
            case 6:
              (we = 0), (Tt = null), ul(e, t, c, 6);
              break;
            case 8:
              Co(), (Be = 6);
              break e;
            default:
              throw Error(s(462));
          }
        }
        tv();
        break;
      } catch (Y) {
        rm(e, Y);
      }
    while (!0);
    return (
      (oa = fn = null),
      (U.H = r),
      (U.A = u),
      (Se = a),
      me !== null ? 0 : ((Ce = null), (pe = 0), li(), Be)
    );
  }
  function tv() {
    for (; me !== null && !_p(); ) um(me);
  }
  function um(e) {
    var t = Uh(e.alternate, e, ga);
    (e.memoizedProps = e.pendingProps), t === null ? ki(e) : (me = t);
  }
  function om(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Oh(a, t, t.pendingProps, t.type, void 0, pe);
        break;
      case 11:
        t = Oh(a, t, t.pendingProps, t.type.render, t.ref, pe);
        break;
      case 5:
        Ku(t);
      default:
        kh(a, t), (t = me = cd(t, ga)), (t = Uh(a, t, ga));
    }
    (e.memoizedProps = e.pendingProps), t === null ? ki(e) : (me = t);
  }
  function ul(e, t, a, r) {
    (oa = fn = null), Ku(t), (In = null), (Fl = 0);
    var u = t.return;
    try {
      if (Qg(e, u, t, a, pe)) {
        (Be = 1), Ri(e, Dt(a, e.current)), (me = null);
        return;
      }
    } catch (c) {
      if (u !== null) throw ((me = u), c);
      (Be = 1), Ri(e, Dt(a, e.current)), (me = null);
      return;
    }
    t.flags & 32768
      ? (xe || r === 1
          ? (e = !0)
          : nl || (pe & 536870912) !== 0
            ? (e = !1)
            : ((Ba = e = !0),
              (r === 2 || r === 9 || r === 3 || r === 6) &&
                ((r = kt.current),
                r !== null && r.tag === 13 && (r.flags |= 16384))),
        cm(t, e))
      : ki(t);
  }
  function ki(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        cm(t, Ba);
        return;
      }
      e = t.return;
      var a = Zg(t.alternate, t, ga);
      if (a !== null) {
        me = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        me = t;
        return;
      }
      me = t = e;
    } while (t !== null);
    Be === 0 && (Be = 5);
  }
  function cm(e, t) {
    do {
      var a = Kg(e.alternate, e);
      if (a !== null) {
        (a.flags &= 32767), (me = a);
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        me = e;
        return;
      }
      me = e = a;
    } while (e !== null);
    (Be = 6), (me = null);
  }
  function fm(e, t, a, r, u, c, y, b, _) {
    e.cancelPendingCommit = null;
    do Bi();
    while (Ie !== 0);
    if ((Se & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= wu),
        Dp(e, a, c, y, b, _),
        e === Ce && ((me = Ce = null), (pe = 0)),
        (rl = t),
        (Ya = e),
        (il = a),
        (Ro = c),
        (Oo = u),
        (tm = r),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            rv(Gr, function () {
              return pm(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (r = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || r)
      ) {
        (r = U.T), (U.T = null), (u = $.p), ($.p = 2), (y = Se), (Se |= 4);
        try {
          $g(e, t, a);
        } finally {
          (Se = y), ($.p = u), (U.T = r);
        }
      }
      (Ie = 1), dm(), hm(), mm();
    }
  }
  function dm() {
    if (Ie === 1) {
      Ie = 0;
      var e = Ya,
        t = rl,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        (a = U.T), (U.T = null);
        var r = $.p;
        $.p = 2;
        var u = Se;
        Se |= 4;
        try {
          $h(t, e);
          var c = Vo,
            y = ed(e.containerInfo),
            b = c.focusedElem,
            _ = c.selectionRange;
          if (
            y !== b &&
            b &&
            b.ownerDocument &&
            If(b.ownerDocument.documentElement, b)
          ) {
            if (_ !== null && gu(b)) {
              var z = _.start,
                Y = _.end;
              if ((Y === void 0 && (Y = z), "selectionStart" in b))
                (b.selectionStart = z),
                  (b.selectionEnd = Math.min(Y, b.value.length));
              else {
                var Q = b.ownerDocument || document,
                  L = (Q && Q.defaultView) || window;
                if (L.getSelection) {
                  var k = L.getSelection(),
                    se = b.textContent.length,
                    re = Math.min(_.start, se),
                    Re = _.end === void 0 ? re : Math.min(_.end, se);
                  !k.extend && re > Re && ((y = Re), (Re = re), (re = y));
                  var A = Wf(b, re),
                    j = Wf(b, Re);
                  if (
                    A &&
                    j &&
                    (k.rangeCount !== 1 ||
                      k.anchorNode !== A.node ||
                      k.anchorOffset !== A.offset ||
                      k.focusNode !== j.node ||
                      k.focusOffset !== j.offset)
                  ) {
                    var D = Q.createRange();
                    D.setStart(A.node, A.offset),
                      k.removeAllRanges(),
                      re > Re
                        ? (k.addRange(D), k.extend(j.node, j.offset))
                        : (D.setEnd(j.node, j.offset), k.addRange(D));
                  }
                }
              }
            }
            for (Q = [], k = b; (k = k.parentNode); )
              k.nodeType === 1 &&
                Q.push({ element: k, left: k.scrollLeft, top: k.scrollTop });
            for (
              typeof b.focus == "function" && b.focus(), b = 0;
              b < Q.length;
              b++
            ) {
              var X = Q[b];
              (X.element.scrollLeft = X.left), (X.element.scrollTop = X.top);
            }
          }
          (Pi = !!Qo), (Vo = Qo = null);
        } finally {
          (Se = u), ($.p = r), (U.T = a);
        }
      }
      (e.current = t), (Ie = 2);
    }
  }
  function hm() {
    if (Ie === 2) {
      Ie = 0;
      var e = Ya,
        t = rl,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        (a = U.T), (U.T = null);
        var r = $.p;
        $.p = 2;
        var u = Se;
        Se |= 4;
        try {
          Qh(e, t.alternate, t);
        } finally {
          (Se = u), ($.p = r), (U.T = a);
        }
      }
      Ie = 3;
    }
  }
  function mm() {
    if (Ie === 4 || Ie === 3) {
      (Ie = 0), Ep();
      var e = Ya,
        t = rl,
        a = il,
        r = tm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ie = 5)
        : ((Ie = 0), (rl = Ya = null), ym(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (qa = null),
        Ps(a),
        (t = t.stateNode),
        bt && typeof bt.onCommitFiberRoot == "function")
      )
        try {
          bt.onCommitFiberRoot(wl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        (t = U.T), (u = $.p), ($.p = 2), (U.T = null);
        try {
          for (var c = e.onRecoverableError, y = 0; y < r.length; y++) {
            var b = r[y];
            c(b.value, { componentStack: b.stack });
          }
        } finally {
          (U.T = t), ($.p = u);
        }
      }
      (il & 3) !== 0 && Bi(),
        ta(e),
        (u = e.pendingLanes),
        (a & 4194090) !== 0 && (u & 42) !== 0
          ? e === Ao
            ? ir++
            : ((ir = 0), (Ao = e))
          : (ir = 0),
        sr(0);
    }
  }
  function ym(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ql(t)));
  }
  function Bi(e) {
    return dm(), hm(), mm(), pm();
  }
  function pm() {
    if (Ie !== 5) return !1;
    var e = Ya,
      t = Ro;
    Ro = 0;
    var a = Ps(il),
      r = U.T,
      u = $.p;
    try {
      ($.p = 32 > a ? 32 : a), (U.T = null), (a = Oo), (Oo = null);
      var c = Ya,
        y = il;
      if (((Ie = 0), (rl = Ya = null), (il = 0), (Se & 6) !== 0))
        throw Error(s(331));
      var b = Se;
      if (
        ((Se |= 4),
        Ih(c.current),
        Ph(c, c.current, y, a),
        (Se = b),
        sr(0, !1),
        bt && typeof bt.onPostCommitFiberRoot == "function")
      )
        try {
          bt.onPostCommitFiberRoot(wl, c);
        } catch {}
      return !0;
    } finally {
      ($.p = u), (U.T = r), ym(e, t);
    }
  }
  function gm(e, t, a) {
    (t = Dt(a, t)),
      (t = so(e.stateNode, t, 2)),
      (e = Ca(e, t, 2)),
      e !== null && (El(e, 2), ta(e));
  }
  function Ae(e, t, a) {
    if (e.tag === 3) gm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          gm(t, e, a);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (qa === null || !qa.has(r)))
          ) {
            (e = Dt(a, e)),
              (a = Sh(2)),
              (r = Ca(t, a, 2)),
              r !== null && (wh(a, r, t, e), El(r, 2), ta(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function zo(e, t, a) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Fg();
      var u = new Set();
      r.set(t, u);
    } else (u = r.get(t)), u === void 0 && ((u = new Set()), r.set(t, u));
    u.has(a) ||
      ((Eo = !0), u.add(a), (e = av.bind(null, e, t, a)), t.then(e, e));
  }
  function av(e, t, a) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ce === e &&
        (pe & a) === a &&
        (Be === 4 || (Be === 3 && (pe & 62914560) === pe && 300 > Pt() - jo)
          ? (Se & 2) === 0 && sl(e, 0)
          : (To |= a),
        ll === pe && (ll = 0)),
      ta(e);
  }
  function vm(e, t) {
    t === 0 && (t = mf()), (e = Gn(e, t)), e !== null && (El(e, t), ta(e));
  }
  function nv(e) {
    var t = e.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), vm(e, a);
  }
  function lv(e, t) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          u = e.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(t), vm(e, a);
  }
  function rv(e, t) {
    return Zs(e, t);
  }
  var Hi = null,
    ol = null,
    Uo = !1,
    qi = !1,
    Lo = !1,
    vn = 0;
  function ta(e) {
    e !== ol &&
      e.next === null &&
      (ol === null ? (Hi = ol = e) : (ol = ol.next = e)),
      (qi = !0),
      Uo || ((Uo = !0), sv());
  }
  function sr(e, t) {
    if (!Lo && qi) {
      Lo = !0;
      do
        for (var a = !1, r = Hi; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var y = r.suspendedLanes,
                b = r.pingedLanes;
              (c = (1 << (31 - xt(42 | e) + 1)) - 1),
                (c &= u & ~(y & ~b)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0);
            }
            c !== 0 && ((a = !0), wm(r, c));
          } else
            (c = pe),
              (c = Zr(
                r,
                r === Ce ? c : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== -1
              )),
              (c & 3) === 0 || _l(r, c) || ((a = !0), wm(r, c));
          r = r.next;
        }
      while (a);
      Lo = !1;
    }
  }
  function iv() {
    bm();
  }
  function bm() {
    qi = Uo = !1;
    var e = 0;
    vn !== 0 && (yv() && (e = vn), (vn = 0));
    for (var t = Pt(), a = null, r = Hi; r !== null; ) {
      var u = r.next,
        c = xm(r, t);
      c === 0
        ? ((r.next = null),
          a === null ? (Hi = u) : (a.next = u),
          u === null && (ol = a))
        : ((a = r), (e !== 0 || (c & 3) !== 0) && (qi = !0)),
        (r = u);
    }
    sr(e);
  }
  function xm(e, t) {
    for (
      var a = e.suspendedLanes,
        r = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;

    ) {
      var y = 31 - xt(c),
        b = 1 << y,
        _ = u[y];
      _ === -1
        ? ((b & a) === 0 || (b & r) !== 0) && (u[y] = Mp(b, t))
        : _ <= t && (e.expiredLanes |= b),
        (c &= ~b);
    }
    if (
      ((t = Ce),
      (a = pe),
      (a = Zr(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (r = e.callbackNode),
      a === 0 ||
        (e === t && (we === 2 || we === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        r !== null && r !== null && Ks(r),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((a & 3) === 0 || _l(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((r !== null && Ks(r), Ps(a))) {
        case 2:
        case 8:
          a = ff;
          break;
        case 32:
          a = Gr;
          break;
        case 268435456:
          a = df;
          break;
        default:
          a = Gr;
      }
      return (
        (r = Sm.bind(null, e)),
        (a = Zs(a, r)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      r !== null && r !== null && Ks(r),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Sm(e, t) {
    if (Ie !== 0 && Ie !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var a = e.callbackNode;
    if (Bi() && e.callbackNode !== a) return null;
    var r = pe;
    return (
      (r = Zr(
        e,
        e === Ce ? r : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      r === 0
        ? null
        : (nm(e, r, t),
          xm(e, Pt()),
          e.callbackNode != null && e.callbackNode === a
            ? Sm.bind(null, e)
            : null)
    );
  }
  function wm(e, t) {
    if (Bi()) return null;
    nm(e, t, !0);
  }
  function sv() {
    gv(function () {
      (Se & 6) !== 0 ? Zs(cf, iv) : bm();
    });
  }
  function ko() {
    return vn === 0 && (vn = hf()), vn;
  }
  function _m(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Fr("" + e);
  }
  function Em(e, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute("form", e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function uv(e, t, a, r, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var c = _m((u[ft] || null).action),
        y = r.submitter;
      y &&
        ((t = (t = y[ft] || null)
          ? _m(t.formAction)
          : y.getAttribute("formAction")),
        t !== null && ((c = t), (y = null)));
      var b = new ti("action", "action", null, r, u);
      e.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (vn !== 0) {
                  var _ = y ? Em(u, y) : new FormData(u);
                  ao(
                    a,
                    { pending: !0, data: _, method: u.method, action: c },
                    null,
                    _
                  );
                }
              } else
                typeof c == "function" &&
                  (b.preventDefault(),
                  (_ = y ? Em(u, y) : new FormData(u)),
                  ao(
                    a,
                    { pending: !0, data: _, method: u.method, action: c },
                    c,
                    _
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Bo = 0; Bo < Su.length; Bo++) {
    var Ho = Su[Bo],
      ov = Ho.toLowerCase(),
      cv = Ho[0].toUpperCase() + Ho.slice(1);
    Xt(ov, "on" + cv);
  }
  Xt(nd, "onAnimationEnd"),
    Xt(ld, "onAnimationIteration"),
    Xt(rd, "onAnimationStart"),
    Xt("dblclick", "onDoubleClick"),
    Xt("focusin", "onFocus"),
    Xt("focusout", "onBlur"),
    Xt(jg, "onTransitionRun"),
    Xt(Rg, "onTransitionStart"),
    Xt(Og, "onTransitionCancel"),
    Xt(id, "onTransitionEnd"),
    Dn("onMouseEnter", ["mouseout", "mouseover"]),
    Dn("onMouseLeave", ["mouseout", "mouseover"]),
    Dn("onPointerEnter", ["pointerout", "pointerover"]),
    Dn("onPointerLeave", ["pointerout", "pointerover"]),
    tn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    tn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    tn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    tn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    tn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    tn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var ur =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    fv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(ur)
    );
  function Tm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var r = e[a],
        u = r.event;
      r = r.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var y = r.length - 1; 0 <= y; y--) {
            var b = r[y],
              _ = b.instance,
              z = b.currentTarget;
            if (((b = b.listener), _ !== c && u.isPropagationStopped()))
              break e;
            (c = b), (u.currentTarget = z);
            try {
              c(u);
            } catch (Y) {
              ji(Y);
            }
            (u.currentTarget = null), (c = _);
          }
        else
          for (y = 0; y < r.length; y++) {
            if (
              ((b = r[y]),
              (_ = b.instance),
              (z = b.currentTarget),
              (b = b.listener),
              _ !== c && u.isPropagationStopped())
            )
              break e;
            (c = b), (u.currentTarget = z);
            try {
              c(u);
            } catch (Y) {
              ji(Y);
            }
            (u.currentTarget = null), (c = _);
          }
      }
    }
  }
  function ye(e, t) {
    var a = t[Fs];
    a === void 0 && (a = t[Fs] = new Set());
    var r = e + "__bubble";
    a.has(r) || (Nm(t, e, 2, !1), a.add(r));
  }
  function qo(e, t, a) {
    var r = 0;
    t && (r |= 4), Nm(a, e, r, t);
  }
  var Yi = "_reactListening" + Math.random().toString(36).slice(2);
  function Yo(e) {
    if (!e[Yi]) {
      (e[Yi] = !0),
        bf.forEach(function (a) {
          a !== "selectionchange" && (fv.has(a) || qo(a, !1, e), qo(a, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Yi] || ((t[Yi] = !0), qo("selectionchange", !1, t));
    }
  }
  function Nm(e, t, a, r) {
    switch (Pm(t)) {
      case 2:
        var u = Bv;
        break;
      case 8:
        u = Hv;
        break;
      default:
        u = tc;
    }
    (a = u.bind(null, t, a, e)),
      (u = void 0),
      !uu ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      r
        ? u !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: u })
          : e.addEventListener(t, a, !0)
        : u !== void 0
          ? e.addEventListener(t, a, { passive: u })
          : e.addEventListener(t, a, !1);
  }
  function Xo(e, t, a, r, u) {
    var c = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var y = r.tag;
        if (y === 3 || y === 4) {
          var b = r.stateNode.containerInfo;
          if (b === u) break;
          if (y === 4)
            for (y = r.return; y !== null; ) {
              var _ = y.tag;
              if ((_ === 3 || _ === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; b !== null; ) {
            if (((y = An(b)), y === null)) return;
            if (((_ = y.tag), _ === 5 || _ === 6 || _ === 26 || _ === 27)) {
              r = c = y;
              continue e;
            }
            b = b.parentNode;
          }
        }
        r = r.return;
      }
    Df(function () {
      var z = c,
        Y = iu(a),
        Q = [];
      e: {
        var L = sd.get(e);
        if (L !== void 0) {
          var k = ti,
            se = e;
          switch (e) {
            case "keypress":
              if (Ir(a) === 0) break e;
            case "keydown":
            case "keyup":
              k = rg;
              break;
            case "focusin":
              (se = "focus"), (k = du);
              break;
            case "focusout":
              (se = "blur"), (k = du);
              break;
            case "beforeblur":
            case "afterblur":
              k = du;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k = Lf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k = Kp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k = ug;
              break;
            case nd:
            case ld:
            case rd:
              k = Pp;
              break;
            case id:
              k = cg;
              break;
            case "scroll":
            case "scrollend":
              k = Vp;
              break;
            case "wheel":
              k = dg;
              break;
            case "copy":
            case "cut":
            case "paste":
              k = Wp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k = Bf;
              break;
            case "toggle":
            case "beforetoggle":
              k = mg;
          }
          var re = (t & 4) !== 0,
            Re = !re && (e === "scroll" || e === "scrollend"),
            A = re ? (L !== null ? L + "Capture" : null) : L;
          re = [];
          for (var j = z, D; j !== null; ) {
            var X = j;
            if (
              ((D = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                D === null ||
                A === null ||
                ((X = jl(j, A)), X != null && re.push(or(j, X, D))),
              Re)
            )
              break;
            j = j.return;
          }
          0 < re.length &&
            ((L = new k(L, se, null, a, Y)),
            Q.push({ event: L, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((L = e === "mouseover" || e === "pointerover"),
            (k = e === "mouseout" || e === "pointerout"),
            L &&
              a !== ru &&
              (se = a.relatedTarget || a.fromElement) &&
              (An(se) || se[On]))
          )
            break e;
          if (
            (k || L) &&
            ((L =
              Y.window === Y
                ? Y
                : (L = Y.ownerDocument)
                  ? L.defaultView || L.parentWindow
                  : window),
            k
              ? ((se = a.relatedTarget || a.toElement),
                (k = z),
                (se = se ? An(se) : null),
                se !== null &&
                  ((Re = f(se)),
                  (re = se.tag),
                  se !== Re || (re !== 5 && re !== 27 && re !== 6)) &&
                  (se = null))
              : ((k = null), (se = z)),
            k !== se)
          ) {
            if (
              ((re = Lf),
              (X = "onMouseLeave"),
              (A = "onMouseEnter"),
              (j = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((re = Bf),
                (X = "onPointerLeave"),
                (A = "onPointerEnter"),
                (j = "pointer")),
              (Re = k == null ? L : Nl(k)),
              (D = se == null ? L : Nl(se)),
              (L = new re(X, j + "leave", k, a, Y)),
              (L.target = Re),
              (L.relatedTarget = D),
              (X = null),
              An(Y) === z &&
                ((re = new re(A, j + "enter", se, a, Y)),
                (re.target = D),
                (re.relatedTarget = Re),
                (X = re)),
              (Re = X),
              k && se)
            )
              t: {
                for (re = k, A = se, j = 0, D = re; D; D = cl(D)) j++;
                for (D = 0, X = A; X; X = cl(X)) D++;
                for (; 0 < j - D; ) (re = cl(re)), j--;
                for (; 0 < D - j; ) (A = cl(A)), D--;
                for (; j--; ) {
                  if (re === A || (A !== null && re === A.alternate)) break t;
                  (re = cl(re)), (A = cl(A));
                }
                re = null;
              }
            else re = null;
            k !== null && jm(Q, L, k, re, !1),
              se !== null && Re !== null && jm(Q, Re, se, re, !0);
          }
        }
        e: {
          if (
            ((L = z ? Nl(z) : window),
            (k = L.nodeName && L.nodeName.toLowerCase()),
            k === "select" || (k === "input" && L.type === "file"))
          )
            var I = Zf;
          else if (Qf(L))
            if (Kf) I = Eg;
            else {
              I = wg;
              var he = Sg;
            }
          else
            (k = L.nodeName),
              !k ||
              k.toLowerCase() !== "input" ||
              (L.type !== "checkbox" && L.type !== "radio")
                ? z && lu(z.elementType) && (I = Zf)
                : (I = _g);
          if (I && (I = I(e, z))) {
            Vf(Q, I, a, Y);
            break e;
          }
          he && he(e, L, z),
            e === "focusout" &&
              z &&
              L.type === "number" &&
              z.memoizedProps.value != null &&
              nu(L, "number", L.value);
        }
        switch (((he = z ? Nl(z) : window), e)) {
          case "focusin":
            (Qf(he) || he.contentEditable === "true") &&
              ((qn = he), (vu = z), (Ul = null));
            break;
          case "focusout":
            Ul = vu = qn = null;
            break;
          case "mousedown":
            bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (bu = !1), td(Q, a, Y);
            break;
          case "selectionchange":
            if (Ng) break;
          case "keydown":
          case "keyup":
            td(Q, a, Y);
        }
        var ae;
        if (mu)
          e: {
            switch (e) {
              case "compositionstart":
                var ie = "onCompositionStart";
                break e;
              case "compositionend":
                ie = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ie = "onCompositionUpdate";
                break e;
            }
            ie = void 0;
          }
        else
          Hn
            ? Xf(e, a) && (ie = "onCompositionEnd")
            : e === "keydown" &&
              a.keyCode === 229 &&
              (ie = "onCompositionStart");
        ie &&
          (Hf &&
            a.locale !== "ko" &&
            (Hn || ie !== "onCompositionStart"
              ? ie === "onCompositionEnd" && Hn && (ae = zf())
              : ((ja = Y),
                (ou = "value" in ja ? ja.value : ja.textContent),
                (Hn = !0))),
          (he = Xi(z, ie)),
          0 < he.length &&
            ((ie = new kf(ie, e, null, a, Y)),
            Q.push({ event: ie, listeners: he }),
            ae
              ? (ie.data = ae)
              : ((ae = Gf(a)), ae !== null && (ie.data = ae)))),
          (ae = pg ? gg(e, a) : vg(e, a)) &&
            ((ie = Xi(z, "onBeforeInput")),
            0 < ie.length &&
              ((he = new kf("onBeforeInput", "beforeinput", null, a, Y)),
              Q.push({ event: he, listeners: ie }),
              (he.data = ae))),
          uv(Q, e, z, a, Y);
      }
      Tm(Q, t);
    });
  }
  function or(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Xi(e, t) {
    for (var a = t + "Capture", r = []; e !== null; ) {
      var u = e,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = jl(e, a)),
          u != null && r.unshift(or(e, u, c)),
          (u = jl(e, t)),
          u != null && r.push(or(e, u, c))),
        e.tag === 3)
      )
        return r;
      e = e.return;
    }
    return [];
  }
  function cl(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function jm(e, t, a, r, u) {
    for (var c = t._reactName, y = []; a !== null && a !== r; ) {
      var b = a,
        _ = b.alternate,
        z = b.stateNode;
      if (((b = b.tag), _ !== null && _ === r)) break;
      (b !== 5 && b !== 26 && b !== 27) ||
        z === null ||
        ((_ = z),
        u
          ? ((z = jl(a, c)), z != null && y.unshift(or(a, z, _)))
          : u || ((z = jl(a, c)), z != null && y.push(or(a, z, _)))),
        (a = a.return);
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var dv = /\r\n?/g,
    hv = /\u0000|\uFFFD/g;
  function Rm(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        dv,
        `
`
      )
      .replace(hv, "");
  }
  function Om(e, t) {
    return (t = Rm(t)), Rm(e) === t;
  }
  function Gi() {}
  function je(e, t, a, r, u, c) {
    switch (a) {
      case "children":
        typeof r == "string"
          ? t === "body" || (t === "textarea" && r === "") || Ln(e, r)
          : (typeof r == "number" || typeof r == "bigint") &&
            t !== "body" &&
            Ln(e, "" + r);
        break;
      case "className":
        $r(e, "class", r);
        break;
      case "tabIndex":
        $r(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        $r(e, a, r);
        break;
      case "style":
        Cf(e, r, c);
        break;
      case "data":
        if (t !== "object") {
          $r(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (
          r == null ||
          typeof r == "function" ||
          typeof r == "symbol" ||
          typeof r == "boolean"
        ) {
          e.removeAttribute(a);
          break;
        }
        (r = Fr("" + r)), e.setAttribute(a, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" &&
            (a === "formAction"
              ? (t !== "input" && je(e, t, "name", u.name, u, null),
                je(e, t, "formEncType", u.formEncType, u, null),
                je(e, t, "formMethod", u.formMethod, u, null),
                je(e, t, "formTarget", u.formTarget, u, null))
              : (je(e, t, "encType", u.encType, u, null),
                je(e, t, "method", u.method, u, null),
                je(e, t, "target", u.target, u, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(a);
          break;
        }
        (r = Fr("" + r)), e.setAttribute(a, r);
        break;
      case "onClick":
        r != null && (e.onclick = Gi);
        break;
      case "onScroll":
        r != null && ye("scroll", e);
        break;
      case "onScrollEnd":
        r != null && ye("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
          if (((a = r.__html), a != null)) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          r == null ||
          typeof r == "function" ||
          typeof r == "boolean" ||
          typeof r == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (a = Fr("" + r)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        r != null && typeof r != "function" && typeof r != "symbol"
          ? e.setAttribute(a, "" + r)
          : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r && typeof r != "function" && typeof r != "symbol"
          ? e.setAttribute(a, "")
          : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        r === !0
          ? e.setAttribute(a, "")
          : r !== !1 &&
              r != null &&
              typeof r != "function" &&
              typeof r != "symbol"
            ? e.setAttribute(a, r)
            : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        !isNaN(r) &&
        1 <= r
          ? e.setAttribute(a, r)
          : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r)
          ? e.removeAttribute(a)
          : e.setAttribute(a, r);
        break;
      case "popover":
        ye("beforetoggle", e), ye("toggle", e), Kr(e, "popover", r);
        break;
      case "xlinkActuate":
        la(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
        break;
      case "xlinkArcrole":
        la(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
        break;
      case "xlinkRole":
        la(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
        break;
      case "xlinkShow":
        la(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
        break;
      case "xlinkTitle":
        la(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
        break;
      case "xlinkType":
        la(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
        break;
      case "xmlBase":
        la(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
        break;
      case "xmlLang":
        la(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
        break;
      case "xmlSpace":
        la(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
        break;
      case "is":
        Kr(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = Gp.get(a) || a), Kr(e, a, r));
    }
  }
  function Go(e, t, a, r, u, c) {
    switch (a) {
      case "style":
        Cf(e, r, c);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
          if (((a = r.__html), a != null)) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof r == "string"
          ? Ln(e, r)
          : (typeof r == "number" || typeof r == "bigint") && Ln(e, "" + r);
        break;
      case "onScroll":
        r != null && ye("scroll", e);
        break;
      case "onScrollEnd":
        r != null && ye("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Gi);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!xf.hasOwnProperty(a))
          e: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (t = a.slice(2, u ? a.length - 7 : void 0)),
              (c = e[ft] || null),
              (c = c != null ? c[a] : null),
              typeof c == "function" && e.removeEventListener(t, c, u),
              typeof r == "function")
            ) {
              typeof c != "function" &&
                c !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, r, u);
              break e;
            }
            a in e
              ? (e[a] = r)
              : r === !0
                ? e.setAttribute(a, "")
                : Kr(e, a, r);
          }
    }
  }
  function et(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ye("error", e), ye("load", e);
        var r = !1,
          u = !1,
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var y = a[c];
            if (y != null)
              switch (c) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  je(e, t, c, y, a, null);
              }
          }
        u && je(e, t, "srcSet", a.srcSet, a, null),
          r && je(e, t, "src", a.src, a, null);
        return;
      case "input":
        ye("invalid", e);
        var b = (c = y = u = null),
          _ = null,
          z = null;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var Y = a[r];
            if (Y != null)
              switch (r) {
                case "name":
                  u = Y;
                  break;
                case "type":
                  y = Y;
                  break;
                case "checked":
                  _ = Y;
                  break;
                case "defaultChecked":
                  z = Y;
                  break;
                case "value":
                  c = Y;
                  break;
                case "defaultValue":
                  b = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null) throw Error(s(137, t));
                  break;
                default:
                  je(e, t, r, Y, a, null);
              }
          }
        jf(e, c, b, _, z, y, u, !1), Jr(e);
        return;
      case "select":
        ye("invalid", e), (r = y = c = null);
        for (u in a)
          if (a.hasOwnProperty(u) && ((b = a[u]), b != null))
            switch (u) {
              case "value":
                c = b;
                break;
              case "defaultValue":
                y = b;
                break;
              case "multiple":
                r = b;
              default:
                je(e, t, u, b, a, null);
            }
        (t = c),
          (a = y),
          (e.multiple = !!r),
          t != null ? Un(e, !!r, t, !1) : a != null && Un(e, !!r, a, !0);
        return;
      case "textarea":
        ye("invalid", e), (c = u = r = null);
        for (y in a)
          if (a.hasOwnProperty(y) && ((b = a[y]), b != null))
            switch (y) {
              case "value":
                r = b;
                break;
              case "defaultValue":
                u = b;
                break;
              case "children":
                c = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(s(91));
                break;
              default:
                je(e, t, y, b, a, null);
            }
        Of(e, r, u, c), Jr(e);
        return;
      case "option":
        for (_ in a)
          if (a.hasOwnProperty(_) && ((r = a[_]), r != null))
            switch (_) {
              case "selected":
                e.selected =
                  r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                je(e, t, _, r, a, null);
            }
        return;
      case "dialog":
        ye("beforetoggle", e), ye("toggle", e), ye("cancel", e), ye("close", e);
        break;
      case "iframe":
      case "object":
        ye("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < ur.length; r++) ye(ur[r], e);
        break;
      case "image":
        ye("error", e), ye("load", e);
        break;
      case "details":
        ye("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ye("error", e), ye("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in a)
          if (a.hasOwnProperty(z) && ((r = a[z]), r != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                je(e, t, z, r, a, null);
            }
        return;
      default:
        if (lu(t)) {
          for (Y in a)
            a.hasOwnProperty(Y) &&
              ((r = a[Y]), r !== void 0 && Go(e, t, Y, r, a, void 0));
          return;
        }
    }
    for (b in a)
      a.hasOwnProperty(b) && ((r = a[b]), r != null && je(e, t, b, r, a, null));
  }
  function mv(e, t, a, r) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          c = null,
          y = null,
          b = null,
          _ = null,
          z = null,
          Y = null;
        for (k in a) {
          var Q = a[k];
          if (a.hasOwnProperty(k) && Q != null)
            switch (k) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = Q;
              default:
                r.hasOwnProperty(k) || je(e, t, k, null, r, Q);
            }
        }
        for (var L in r) {
          var k = r[L];
          if (((Q = a[L]), r.hasOwnProperty(L) && (k != null || Q != null)))
            switch (L) {
              case "type":
                c = k;
                break;
              case "name":
                u = k;
                break;
              case "checked":
                z = k;
                break;
              case "defaultChecked":
                Y = k;
                break;
              case "value":
                y = k;
                break;
              case "defaultValue":
                b = k;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null) throw Error(s(137, t));
                break;
              default:
                k !== Q && je(e, t, L, k, r, Q);
            }
        }
        au(e, y, b, _, z, Y, c, u);
        return;
      case "select":
        k = y = b = L = null;
        for (c in a)
          if (((_ = a[c]), a.hasOwnProperty(c) && _ != null))
            switch (c) {
              case "value":
                break;
              case "multiple":
                k = _;
              default:
                r.hasOwnProperty(c) || je(e, t, c, null, r, _);
            }
        for (u in r)
          if (
            ((c = r[u]),
            (_ = a[u]),
            r.hasOwnProperty(u) && (c != null || _ != null))
          )
            switch (u) {
              case "value":
                L = c;
                break;
              case "defaultValue":
                b = c;
                break;
              case "multiple":
                y = c;
              default:
                c !== _ && je(e, t, u, c, r, _);
            }
        (t = b),
          (a = y),
          (r = k),
          L != null
            ? Un(e, !!a, L, !1)
            : !!r != !!a &&
              (t != null ? Un(e, !!a, t, !0) : Un(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        k = L = null;
        for (b in a)
          if (
            ((u = a[b]),
            a.hasOwnProperty(b) && u != null && !r.hasOwnProperty(b))
          )
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                je(e, t, b, null, r, u);
            }
        for (y in r)
          if (
            ((u = r[y]),
            (c = a[y]),
            r.hasOwnProperty(y) && (u != null || c != null))
          )
            switch (y) {
              case "value":
                L = u;
                break;
              case "defaultValue":
                k = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== c && je(e, t, y, u, r, c);
            }
        Rf(e, L, k);
        return;
      case "option":
        for (var se in a)
          if (
            ((L = a[se]),
            a.hasOwnProperty(se) && L != null && !r.hasOwnProperty(se))
          )
            switch (se) {
              case "selected":
                e.selected = !1;
                break;
              default:
                je(e, t, se, null, r, L);
            }
        for (_ in r)
          if (
            ((L = r[_]),
            (k = a[_]),
            r.hasOwnProperty(_) && L !== k && (L != null || k != null))
          )
            switch (_) {
              case "selected":
                e.selected =
                  L && typeof L != "function" && typeof L != "symbol";
                break;
              default:
                je(e, t, _, L, r, k);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var re in a)
          (L = a[re]),
            a.hasOwnProperty(re) &&
              L != null &&
              !r.hasOwnProperty(re) &&
              je(e, t, re, null, r, L);
        for (z in r)
          if (
            ((L = r[z]),
            (k = a[z]),
            r.hasOwnProperty(z) && L !== k && (L != null || k != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(s(137, t));
                break;
              default:
                je(e, t, z, L, r, k);
            }
        return;
      default:
        if (lu(t)) {
          for (var Re in a)
            (L = a[Re]),
              a.hasOwnProperty(Re) &&
                L !== void 0 &&
                !r.hasOwnProperty(Re) &&
                Go(e, t, Re, void 0, r, L);
          for (Y in r)
            (L = r[Y]),
              (k = a[Y]),
              !r.hasOwnProperty(Y) ||
                L === k ||
                (L === void 0 && k === void 0) ||
                Go(e, t, Y, L, r, k);
          return;
        }
    }
    for (var A in a)
      (L = a[A]),
        a.hasOwnProperty(A) &&
          L != null &&
          !r.hasOwnProperty(A) &&
          je(e, t, A, null, r, L);
    for (Q in r)
      (L = r[Q]),
        (k = a[Q]),
        !r.hasOwnProperty(Q) ||
          L === k ||
          (L == null && k == null) ||
          je(e, t, Q, L, r, k);
  }
  var Qo = null,
    Vo = null;
  function Qi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Am(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Cm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Zo(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ko = null;
  function yv() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Ko
        ? !1
        : ((Ko = e), !0)
      : ((Ko = null), !1);
  }
  var Mm = typeof setTimeout == "function" ? setTimeout : void 0,
    pv = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Dm = typeof Promise == "function" ? Promise : void 0,
    gv =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Dm < "u"
          ? function (e) {
              return Dm.resolve(null).then(e).catch(vv);
            }
          : Mm;
  function vv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ga(e) {
    return e === "head";
  }
  function zm(e, t) {
    var a = t,
      r = 0,
      u = 0;
    do {
      var c = a.nextSibling;
      if ((e.removeChild(a), c && c.nodeType === 8))
        if (((a = c.data), a === "/$")) {
          if (0 < r && 8 > r) {
            a = r;
            var y = e.ownerDocument;
            if ((a & 1 && cr(y.documentElement), a & 2 && cr(y.body), a & 4))
              for (a = y.head, cr(a), y = a.firstChild; y; ) {
                var b = y.nextSibling,
                  _ = y.nodeName;
                y[Tl] ||
                  _ === "SCRIPT" ||
                  _ === "STYLE" ||
                  (_ === "LINK" && y.rel.toLowerCase() === "stylesheet") ||
                  a.removeChild(y),
                  (y = b);
              }
          }
          if (u === 0) {
            e.removeChild(c), vr(t);
            return;
          }
          u--;
        } else
          a === "$" || a === "$?" || a === "$!"
            ? u++
            : (r = a.charCodeAt(0) - 48);
      else r = 0;
      a = c;
    } while (a);
    vr(t);
  }
  function $o(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          $o(a), Ws(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function bv(e, t, a, r) {
    for (; e.nodeType === 1; ) {
      var u = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (r) {
        if (!e[Tl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((c = e.getAttribute("rel")),
                c === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                c !== u.rel ||
                e.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((c = e.getAttribute("src")),
                (c !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  c &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === c) return e;
      } else return e;
      if (((e = Qt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function xv(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Jo(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function Sv(e, t) {
    var a = e.ownerDocument;
    if (e.data !== "$?" || a.readyState === "complete") t();
    else {
      var r = function () {
        t(), a.removeEventListener("DOMContentLoaded", r);
      };
      a.addEventListener("DOMContentLoaded", r), (e._reactRetry = r);
    }
  }
  function Qt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var Po = null;
  function Um(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (t === 0) return e;
          t--;
        } else a === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Lm(e, t, a) {
    switch (((t = Qi(a)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(s(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(s(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function cr(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ws(e);
  }
  var Ht = new Map(),
    km = new Set();
  function Vi(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var va = $.d;
  $.d = { f: wv, r: _v, D: Ev, C: Tv, L: Nv, m: jv, X: Ov, S: Rv, M: Av };
  function wv() {
    var e = va.f(),
      t = Li();
    return e || t;
  }
  function _v(e) {
    var t = Cn(e);
    t !== null && t.tag === 5 && t.type === "form" ? nh(t) : va.r(e);
  }
  var fl = typeof document > "u" ? null : document;
  function Bm(e, t, a) {
    var r = fl;
    if (r && typeof t == "string" && t) {
      var u = Mt(t);
      (u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        km.has(u) ||
          (km.add(u),
          (e = { rel: e, crossOrigin: a, href: t }),
          r.querySelector(u) === null &&
            ((t = r.createElement("link")),
            et(t, "link", e),
            $e(t),
            r.head.appendChild(t)));
    }
  }
  function Ev(e) {
    va.D(e), Bm("dns-prefetch", e, null);
  }
  function Tv(e, t) {
    va.C(e, t), Bm("preconnect", e, t);
  }
  function Nv(e, t, a) {
    va.L(e, t, a);
    var r = fl;
    if (r && e && t) {
      var u = 'link[rel="preload"][as="' + Mt(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + Mt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + Mt(a.imageSizes) + '"]'))
        : (u += '[href="' + Mt(e) + '"]');
      var c = u;
      switch (t) {
        case "style":
          c = dl(e);
          break;
        case "script":
          c = hl(e);
      }
      Ht.has(c) ||
        ((e = v(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : e,
            as: t,
          },
          a
        )),
        Ht.set(c, e),
        r.querySelector(u) !== null ||
          (t === "style" && r.querySelector(fr(c))) ||
          (t === "script" && r.querySelector(dr(c))) ||
          ((t = r.createElement("link")),
          et(t, "link", e),
          $e(t),
          r.head.appendChild(t)));
    }
  }
  function jv(e, t) {
    va.m(e, t);
    var a = fl;
    if (a && e) {
      var r = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + Mt(r) + '"][href="' + Mt(e) + '"]',
        c = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = hl(e);
      }
      if (
        !Ht.has(c) &&
        ((e = v({ rel: "modulepreload", href: e }, t)),
        Ht.set(c, e),
        a.querySelector(u) === null)
      ) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(dr(c))) return;
        }
        (r = a.createElement("link")),
          et(r, "link", e),
          $e(r),
          a.head.appendChild(r);
      }
    }
  }
  function Rv(e, t, a) {
    va.S(e, t, a);
    var r = fl;
    if (r && e) {
      var u = Mn(r).hoistableStyles,
        c = dl(e);
      t = t || "default";
      var y = u.get(c);
      if (!y) {
        var b = { loading: 0, preload: null };
        if ((y = r.querySelector(fr(c)))) b.loading = 5;
        else {
          (e = v({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
            (a = Ht.get(c)) && Fo(e, a);
          var _ = (y = r.createElement("link"));
          $e(_),
            et(_, "link", e),
            (_._p = new Promise(function (z, Y) {
              (_.onload = z), (_.onerror = Y);
            })),
            _.addEventListener("load", function () {
              b.loading |= 1;
            }),
            _.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            Zi(y, t, r);
        }
        (y = { type: "stylesheet", instance: y, count: 1, state: b }),
          u.set(c, y);
      }
    }
  }
  function Ov(e, t) {
    va.X(e, t);
    var a = fl;
    if (a && e) {
      var r = Mn(a).hoistableScripts,
        u = hl(e),
        c = r.get(u);
      c ||
        ((c = a.querySelector(dr(u))),
        c ||
          ((e = v({ src: e, async: !0 }, t)),
          (t = Ht.get(u)) && Wo(e, t),
          (c = a.createElement("script")),
          $e(c),
          et(c, "link", e),
          a.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        r.set(u, c));
    }
  }
  function Av(e, t) {
    va.M(e, t);
    var a = fl;
    if (a && e) {
      var r = Mn(a).hoistableScripts,
        u = hl(e),
        c = r.get(u);
      c ||
        ((c = a.querySelector(dr(u))),
        c ||
          ((e = v({ src: e, async: !0, type: "module" }, t)),
          (t = Ht.get(u)) && Wo(e, t),
          (c = a.createElement("script")),
          $e(c),
          et(c, "link", e),
          a.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        r.set(u, c));
    }
  }
  function Hm(e, t, a, r) {
    var u = (u = ue.current) ? Vi(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = dl(a.href)),
            (a = Mn(u).hoistableStyles),
            (r = a.get(t)),
            r ||
              ((r = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, r)),
            r)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          e = dl(a.href);
          var c = Mn(u).hoistableStyles,
            y = c.get(e);
          if (
            (y ||
              ((u = u.ownerDocument || u),
              (y = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(e, y),
              (c = u.querySelector(fr(e))) &&
                !c._p &&
                ((y.instance = c), (y.state.loading = 5)),
              Ht.has(e) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Ht.set(e, a),
                c || Cv(u, e, a, y.state))),
            t && r === null)
          )
            throw Error(s(528, ""));
          return y;
        }
        if (t && r !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = hl(a)),
              (a = Mn(u).hoistableScripts),
              (r = a.get(t)),
              r ||
                ((r = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, r)),
              r)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, e));
    }
  }
  function dl(e) {
    return 'href="' + Mt(e) + '"';
  }
  function fr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qm(e) {
    return v({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Cv(e, t, a, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (r.loading = 1)
      : ((t = e.createElement("link")),
        (r.preload = t),
        t.addEventListener("load", function () {
          return (r.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (r.loading |= 2);
        }),
        et(t, "link", a),
        $e(t),
        e.head.appendChild(t));
  }
  function hl(e) {
    return '[src="' + Mt(e) + '"]';
  }
  function dr(e) {
    return "script[async]" + e;
  }
  function Ym(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var r = e.querySelector('style[data-href~="' + Mt(a.href) + '"]');
          if (r) return (t.instance = r), $e(r), r;
          var u = v({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (e.ownerDocument || e).createElement("style")),
            $e(r),
            et(r, "style", u),
            Zi(r, a.precedence, e),
            (t.instance = r)
          );
        case "stylesheet":
          u = dl(a.href);
          var c = e.querySelector(fr(u));
          if (c) return (t.state.loading |= 4), (t.instance = c), $e(c), c;
          (r = qm(a)),
            (u = Ht.get(u)) && Fo(r, u),
            (c = (e.ownerDocument || e).createElement("link")),
            $e(c);
          var y = c;
          return (
            (y._p = new Promise(function (b, _) {
              (y.onload = b), (y.onerror = _);
            })),
            et(c, "link", r),
            (t.state.loading |= 4),
            Zi(c, a.precedence, e),
            (t.instance = c)
          );
        case "script":
          return (
            (c = hl(a.src)),
            (u = e.querySelector(dr(c)))
              ? ((t.instance = u), $e(u), u)
              : ((r = a),
                (u = Ht.get(c)) && ((r = v({}, a)), Wo(r, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                $e(u),
                et(u, "link", r),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((r = t.instance), (t.state.loading |= 4), Zi(r, a.precedence, e));
    return t.instance;
  }
  function Zi(e, t, a) {
    for (
      var r = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = r.length ? r[r.length - 1] : null,
        c = u,
        y = 0;
      y < r.length;
      y++
    ) {
      var b = r[y];
      if (b.dataset.precedence === t) c = b;
      else if (c !== u) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Fo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Wo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Ki = null;
  function Xm(e, t, a) {
    if (Ki === null) {
      var r = new Map(),
        u = (Ki = new Map());
      u.set(a, r);
    } else (u = Ki), (r = u.get(a)), r || ((r = new Map()), u.set(a, r));
    if (r.has(e)) return r;
    for (
      r.set(e, null), a = a.getElementsByTagName(e), u = 0;
      u < a.length;
      u++
    ) {
      var c = a[u];
      if (
        !(
          c[Tl] ||
          c[at] ||
          (e === "link" && c.getAttribute("rel") === "stylesheet")
        ) &&
        c.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var y = c.getAttribute(t) || "";
        y = e + y;
        var b = r.get(y);
        b ? b.push(c) : r.set(y, [c]);
      }
    }
    return r;
  }
  function Gm(e, t, a) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function Mv(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Qm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var hr = null;
  function Dv() {}
  function zv(e, t, a) {
    if (hr === null) throw Error(s(475));
    var r = hr;
    if (
      t.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var u = dl(a.href),
          c = e.querySelector(fr(u));
        if (c) {
          (e = c._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (r.count++, (r = $i.bind(r)), e.then(r, r)),
            (t.state.loading |= 4),
            (t.instance = c),
            $e(c);
          return;
        }
        (c = e.ownerDocument || e),
          (a = qm(a)),
          (u = Ht.get(u)) && Fo(a, u),
          (c = c.createElement("link")),
          $e(c);
        var y = c;
        (y._p = new Promise(function (b, _) {
          (y.onload = b), (y.onerror = _);
        })),
          et(c, "link", a),
          (t.instance = c);
      }
      r.stylesheets === null && (r.stylesheets = new Map()),
        r.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (r.count++,
          (t = $i.bind(r)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function Uv() {
    if (hr === null) throw Error(s(475));
    var e = hr;
    return (
      e.stylesheets && e.count === 0 && Io(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var a = setTimeout(function () {
              if ((e.stylesheets && Io(e, e.stylesheets), e.unsuspend)) {
                var r = e.unsuspend;
                (e.unsuspend = null), r();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(a);
              }
            );
          }
        : null
    );
  }
  function $i() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Io(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var Ji = null;
  function Io(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Ji = new Map()),
        t.forEach(Lv, e),
        (Ji = null),
        $i.call(e));
  }
  function Lv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Ji.get(e);
      if (a) var r = a.get(null);
      else {
        (a = new Map()), Ji.set(e, a);
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            c = 0;
          c < u.length;
          c++
        ) {
          var y = u[c];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
            (a.set(y.dataset.precedence, y), (r = y));
        }
        r && a.set(null, r);
      }
      (u = t.instance),
        (y = u.getAttribute("data-precedence")),
        (c = a.get(y) || r),
        c === r && a.set(null, u),
        a.set(y, u),
        this.count++,
        (r = $i.bind(this)),
        u.addEventListener("load", r),
        u.addEventListener("error", r),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var mr = {
    $$typeof: B,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function kv(e, t, a, r, u, c, y, b) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = $s(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = $s(0)),
      (this.hiddenUpdates = $s(null)),
      (this.identifierPrefix = r),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map());
  }
  function Vm(e, t, a, r, u, c, y, b, _, z, Y, Q) {
    return (
      (e = new kv(e, t, a, y, b, _, z, Q)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = wt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = Du()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: r, isDehydrated: a, cache: t }),
      ku(c),
      e
    );
  }
  function Zm(e) {
    return e ? ((e = Qn), e) : Qn;
  }
  function Km(e, t, a, r, u, c) {
    (u = Zm(u)),
      r.context === null ? (r.context = u) : (r.pendingContext = u),
      (r = Aa(t)),
      (r.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (r.callback = c),
      (a = Ca(e, r, t)),
      a !== null && (jt(a, e, t), Ql(a, e, t));
  }
  function $m(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ec(e, t) {
    $m(e, t), (e = e.alternate) && $m(e, t);
  }
  function Jm(e) {
    if (e.tag === 13) {
      var t = Gn(e, 67108864);
      t !== null && jt(t, e, 67108864), ec(e, 67108864);
    }
  }
  var Pi = !0;
  function Bv(e, t, a, r) {
    var u = U.T;
    U.T = null;
    var c = $.p;
    try {
      ($.p = 2), tc(e, t, a, r);
    } finally {
      ($.p = c), (U.T = u);
    }
  }
  function Hv(e, t, a, r) {
    var u = U.T;
    U.T = null;
    var c = $.p;
    try {
      ($.p = 8), tc(e, t, a, r);
    } finally {
      ($.p = c), (U.T = u);
    }
  }
  function tc(e, t, a, r) {
    if (Pi) {
      var u = ac(r);
      if (u === null) Xo(e, t, r, Fi, a), Fm(e, r);
      else if (Yv(u, e, t, a, r)) r.stopPropagation();
      else if ((Fm(e, r), t & 4 && -1 < qv.indexOf(e))) {
        for (; u !== null; ) {
          var c = Cn(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var y = en(c.pendingLanes);
                  if (y !== 0) {
                    var b = c;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; y; ) {
                      var _ = 1 << (31 - xt(y));
                      (b.entanglements[1] |= _), (y &= ~_);
                    }
                    ta(c), (Se & 6) === 0 && ((zi = Pt() + 500), sr(0));
                  }
                }
                break;
              case 13:
                (b = Gn(c, 2)), b !== null && jt(b, c, 2), Li(), ec(c, 2);
            }
          if (((c = ac(r)), c === null && Xo(e, t, r, Fi, a), c === u)) break;
          u = c;
        }
        u !== null && r.stopPropagation();
      } else Xo(e, t, r, null, a);
    }
  }
  function ac(e) {
    return (e = iu(e)), nc(e);
  }
  var Fi = null;
  function nc(e) {
    if (((Fi = null), (e = An(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (Fi = e), null;
  }
  function Pm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Tp()) {
          case cf:
            return 2;
          case ff:
            return 8;
          case Gr:
          case Np:
            return 32;
          case df:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lc = !1,
    Qa = null,
    Va = null,
    Za = null,
    yr = new Map(),
    pr = new Map(),
    Ka = [],
    qv =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Fm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Qa = null;
        break;
      case "dragenter":
      case "dragleave":
        Va = null;
        break;
      case "mouseover":
      case "mouseout":
        Za = null;
        break;
      case "pointerover":
      case "pointerout":
        yr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pr.delete(t.pointerId);
    }
  }
  function gr(e, t, a, r, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: r,
          nativeEvent: c,
          targetContainers: [u],
        }),
        t !== null && ((t = Cn(t)), t !== null && Jm(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function Yv(e, t, a, r, u) {
    switch (t) {
      case "focusin":
        return (Qa = gr(Qa, e, t, a, r, u)), !0;
      case "dragenter":
        return (Va = gr(Va, e, t, a, r, u)), !0;
      case "mouseover":
        return (Za = gr(Za, e, t, a, r, u)), !0;
      case "pointerover":
        var c = u.pointerId;
        return yr.set(c, gr(yr.get(c) || null, e, t, a, r, u)), !0;
      case "gotpointercapture":
        return (
          (c = u.pointerId), pr.set(c, gr(pr.get(c) || null, e, t, a, r, u)), !0
        );
    }
    return !1;
  }
  function Wm(e) {
    var t = An(e.target);
    if (t !== null) {
      var a = f(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = h(a)), t !== null)) {
            (e.blockedOn = t),
              zp(e.priority, function () {
                if (a.tag === 13) {
                  var r = Nt();
                  r = Js(r);
                  var u = Gn(a, r);
                  u !== null && jt(u, a, r), ec(a, r);
                }
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Wi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = ac(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var r = new a.constructor(a.type, a);
        (ru = r), a.target.dispatchEvent(r), (ru = null);
      } else return (t = Cn(a)), t !== null && Jm(t), (e.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function Im(e, t, a) {
    Wi(e) && a.delete(t);
  }
  function Xv() {
    (lc = !1),
      Qa !== null && Wi(Qa) && (Qa = null),
      Va !== null && Wi(Va) && (Va = null),
      Za !== null && Wi(Za) && (Za = null),
      yr.forEach(Im),
      pr.forEach(Im);
  }
  function Ii(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      lc ||
        ((lc = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, Xv)));
  }
  var es = null;
  function ey(e) {
    es !== e &&
      ((es = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        es === e && (es = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            r = e[t + 1],
            u = e[t + 2];
          if (typeof r != "function") {
            if (nc(r || a) === null) continue;
            break;
          }
          var c = Cn(a);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            ao(c, { pending: !0, data: u, method: a.method, action: r }, r, u));
        }
      }));
  }
  function vr(e) {
    function t(_) {
      return Ii(_, e);
    }
    Qa !== null && Ii(Qa, e),
      Va !== null && Ii(Va, e),
      Za !== null && Ii(Za, e),
      yr.forEach(t),
      pr.forEach(t);
    for (var a = 0; a < Ka.length; a++) {
      var r = Ka[a];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Ka.length && ((a = Ka[0]), a.blockedOn === null); )
      Wm(a), a.blockedOn === null && Ka.shift();
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (r = 0; r < a.length; r += 3) {
        var u = a[r],
          c = a[r + 1],
          y = u[ft] || null;
        if (typeof c == "function") y || ey(a);
        else if (y) {
          var b = null;
          if (c && c.hasAttribute("formAction")) {
            if (((u = c), (y = c[ft] || null))) b = y.formAction;
            else if (nc(u) !== null) continue;
          } else b = y.action;
          typeof b == "function" ? (a[r + 1] = b) : (a.splice(r, 3), (r -= 3)),
            ey(a);
        }
      }
  }
  function rc(e) {
    this._internalRoot = e;
  }
  (ts.prototype.render = rc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var a = t.current,
        r = Nt();
      Km(a, r, e, t, null, null);
    }),
    (ts.prototype.unmount = rc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          Km(e.current, 2, null, e, null, null), Li(), (t[On] = null);
        }
      });
  function ts(e) {
    this._internalRoot = e;
  }
  ts.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = gf();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Ka.length && t !== 0 && t < Ka[a].priority; a++);
      Ka.splice(a, 0, e), a === 0 && Wm(e);
    }
  };
  var ty = l.version;
  if (ty !== "19.1.0") throw Error(s(527, ty, "19.1.0"));
  $.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(s(188))
        : ((e = Object.keys(e).join(",")), Error(s(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? m(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Gv = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var as = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!as.isDisabled && as.supportsFiber)
      try {
        (wl = as.inject(Gv)), (bt = as);
      } catch {}
  }
  return (
    (xr.createRoot = function (e, t) {
      if (!o(e)) throw Error(s(299));
      var a = !1,
        r = "",
        u = gh,
        c = vh,
        y = bh,
        b = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (y = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (b = t.unstable_transitionCallbacks)),
        (t = Vm(e, 1, !1, null, null, a, r, u, c, y, b, null)),
        (e[On] = t.current),
        Yo(e),
        new rc(t)
      );
    }),
    (xr.hydrateRoot = function (e, t, a) {
      if (!o(e)) throw Error(s(299));
      var r = !1,
        u = "",
        c = gh,
        y = vh,
        b = bh,
        _ = null,
        z = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (r = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (y = a.onCaughtError),
          a.onRecoverableError !== void 0 && (b = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (_ = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (z = a.formState)),
        (t = Vm(e, 1, !0, t, a ?? null, r, u, c, y, b, _, z)),
        (t.context = Zm(null)),
        (a = t.current),
        (r = Nt()),
        (r = Js(r)),
        (u = Aa(r)),
        (u.callback = null),
        Ca(a, u, r),
        (a = r),
        (t.current.lanes = a),
        El(t, a),
        ta(t),
        (e[On] = t.current),
        Yo(e),
        new ts(t)
      );
    }),
    (xr.version = "19.1.0"),
    xr
  );
}
var fy;
function a1() {
  if (fy) return oc.exports;
  fy = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return n(), (oc.exports = t1()), oc.exports;
}
var n1 = a1(),
  Sr = {},
  dy;
function l1() {
  if (dy) return Sr;
  (dy = 1),
    Object.defineProperty(Sr, "__esModule", { value: !0 }),
    (Sr.parse = h),
    (Sr.serialize = m);
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    l = /^[\u0021-\u003A\u003C-\u007E]*$/,
    i =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    s = /^[\u0020-\u003A\u003D-\u007E]*$/,
    o = Object.prototype.toString,
    f = (() => {
      const w = function () {};
      return (w.prototype = Object.create(null)), w;
    })();
  function h(w, C) {
    const E = new f(),
      S = w.length;
    if (S < 2) return E;
    const R = (C == null ? void 0 : C.decode) || v;
    let O = 0;
    do {
      const M = w.indexOf("=", O);
      if (M === -1) break;
      const B = w.indexOf(";", O),
        G = B === -1 ? S : B;
      if (M > G) {
        O = w.lastIndexOf(";", M - 1) + 1;
        continue;
      }
      const q = p(w, O, M),
        Z = g(w, M, q),
        K = w.slice(q, Z);
      if (E[K] === void 0) {
        let P = p(w, M + 1, G),
          F = g(w, G, P);
        const ee = R(w.slice(P, F));
        E[K] = ee;
      }
      O = G + 1;
    } while (O < S);
    return E;
  }
  function p(w, C, E) {
    do {
      const S = w.charCodeAt(C);
      if (S !== 32 && S !== 9) return C;
    } while (++C < E);
    return E;
  }
  function g(w, C, E) {
    for (; C > E; ) {
      const S = w.charCodeAt(--C);
      if (S !== 32 && S !== 9) return C + 1;
    }
    return E;
  }
  function m(w, C, E) {
    const S = (E == null ? void 0 : E.encode) || encodeURIComponent;
    if (!n.test(w)) throw new TypeError(`argument name is invalid: ${w}`);
    const R = S(C);
    if (!l.test(R)) throw new TypeError(`argument val is invalid: ${C}`);
    let O = w + "=" + R;
    if (!E) return O;
    if (E.maxAge !== void 0) {
      if (!Number.isInteger(E.maxAge))
        throw new TypeError(`option maxAge is invalid: ${E.maxAge}`);
      O += "; Max-Age=" + E.maxAge;
    }
    if (E.domain) {
      if (!i.test(E.domain))
        throw new TypeError(`option domain is invalid: ${E.domain}`);
      O += "; Domain=" + E.domain;
    }
    if (E.path) {
      if (!s.test(E.path))
        throw new TypeError(`option path is invalid: ${E.path}`);
      O += "; Path=" + E.path;
    }
    if (E.expires) {
      if (!x(E.expires) || !Number.isFinite(E.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${E.expires}`);
      O += "; Expires=" + E.expires.toUTCString();
    }
    if (
      (E.httpOnly && (O += "; HttpOnly"),
      E.secure && (O += "; Secure"),
      E.partitioned && (O += "; Partitioned"),
      E.priority)
    )
      switch (
        typeof E.priority == "string" ? E.priority.toLowerCase() : void 0
      ) {
        case "low":
          O += "; Priority=Low";
          break;
        case "medium":
          O += "; Priority=Medium";
          break;
        case "high":
          O += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${E.priority}`);
      }
    if (E.sameSite)
      switch (
        typeof E.sameSite == "string" ? E.sameSite.toLowerCase() : E.sameSite
      ) {
        case !0:
        case "strict":
          O += "; SameSite=Strict";
          break;
        case "lax":
          O += "; SameSite=Lax";
          break;
        case "none":
          O += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${E.sameSite}`);
      }
    return O;
  }
  function v(w) {
    if (w.indexOf("%") === -1) return w;
    try {
      return decodeURIComponent(w);
    } catch {
      return w;
    }
  }
  function x(w) {
    return o.call(w) === "[object Date]";
  }
  return Sr;
}
l1();
var hy = "popstate";
function r1(n = {}) {
  function l(s, o) {
    let { pathname: f, search: h, hash: p } = s.location;
    return Rc(
      "",
      { pathname: f, search: h, hash: p },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default"
    );
  }
  function i(s, o) {
    return typeof o == "string" ? o : Rr(o);
  }
  return s1(l, i, null, n);
}
function ze(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
function qt(n, l) {
  if (!n) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function i1() {
  return Math.random().toString(36).substring(2, 10);
}
function my(n, l) {
  return { usr: n.state, key: n.key, idx: l };
}
function Rc(n, l, i = null, s) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? gl(l) : l),
    state: i,
    key: (l && l.key) || s || i1(),
  };
}
function Rr({ pathname: n = "/", search: l = "", hash: i = "" }) {
  return (
    l && l !== "?" && (n += l.charAt(0) === "?" ? l : "?" + l),
    i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i),
    n
  );
}
function gl(n) {
  let l = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && ((l.hash = n.substring(i)), (n = n.substring(0, i)));
    let s = n.indexOf("?");
    s >= 0 && ((l.search = n.substring(s)), (n = n.substring(0, s))),
      n && (l.pathname = n);
  }
  return l;
}
function s1(n, l, i, s = {}) {
  let { window: o = document.defaultView, v5Compat: f = !1 } = s,
    h = o.history,
    p = "POP",
    g = null,
    m = v();
  m == null && ((m = 0), h.replaceState({ ...h.state, idx: m }, ""));
  function v() {
    return (h.state || { idx: null }).idx;
  }
  function x() {
    p = "POP";
    let R = v(),
      O = R == null ? null : R - m;
    (m = R), g && g({ action: p, location: S.location, delta: O });
  }
  function w(R, O) {
    p = "PUSH";
    let M = Rc(S.location, R, O);
    m = v() + 1;
    let B = my(M, m),
      G = S.createHref(M);
    try {
      h.pushState(B, "", G);
    } catch (q) {
      if (q instanceof DOMException && q.name === "DataCloneError") throw q;
      o.location.assign(G);
    }
    f && g && g({ action: p, location: S.location, delta: 1 });
  }
  function C(R, O) {
    p = "REPLACE";
    let M = Rc(S.location, R, O);
    m = v();
    let B = my(M, m),
      G = S.createHref(M);
    h.replaceState(B, "", G),
      f && g && g({ action: p, location: S.location, delta: 0 });
  }
  function E(R) {
    return u1(R);
  }
  let S = {
    get action() {
      return p;
    },
    get location() {
      return n(o, h);
    },
    listen(R) {
      if (g) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(hy, x),
        (g = R),
        () => {
          o.removeEventListener(hy, x), (g = null);
        }
      );
    },
    createHref(R) {
      return l(o, R);
    },
    createURL: E,
    encodeLocation(R) {
      let O = E(R);
      return { pathname: O.pathname, search: O.search, hash: O.hash };
    },
    push: w,
    replace: C,
    go(R) {
      return h.go(R);
    },
  };
  return S;
}
function u1(n, l = !1) {
  let i = "http://localhost";
  typeof window < "u" &&
    (i =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    ze(i, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Rr(n);
  return (
    (s = s.replace(/ $/, "%20")),
    !l && s.startsWith("//") && (s = i + s),
    new URL(s, i)
  );
}
function a0(n, l, i = "/") {
  return o1(n, l, i, !1);
}
function o1(n, l, i, s) {
  let o = typeof l == "string" ? gl(l) : l,
    f = Sa(o.pathname || "/", i);
  if (f == null) return null;
  let h = n0(n);
  c1(h);
  let p = null;
  for (let g = 0; p == null && g < h.length; ++g) {
    let m = S1(f);
    p = b1(h[g], m, s);
  }
  return p;
}
function n0(n, l = [], i = [], s = "") {
  let o = (f, h, p) => {
    let g = {
      relativePath: p === void 0 ? f.path || "" : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f,
    };
    g.relativePath.startsWith("/") &&
      (ze(
        g.relativePath.startsWith(s),
        `Absolute route path "${g.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (g.relativePath = g.relativePath.slice(s.length)));
    let m = ba([s, g.relativePath]),
      v = i.concat(g);
    f.children &&
      f.children.length > 0 &&
      (ze(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
      ),
      n0(f.children, l, v, m)),
      !(f.path == null && !f.index) &&
        l.push({ path: m, score: g1(m, f.index), routesMeta: v });
  };
  return (
    n.forEach((f, h) => {
      var p;
      if (f.path === "" || !((p = f.path) != null && p.includes("?"))) o(f, h);
      else for (let g of l0(f.path)) o(f, h, g);
    }),
    l
  );
}
function l0(n) {
  let l = n.split("/");
  if (l.length === 0) return [];
  let [i, ...s] = l,
    o = i.endsWith("?"),
    f = i.replace(/\?$/, "");
  if (s.length === 0) return o ? [f, ""] : [f];
  let h = l0(s.join("/")),
    p = [];
  return (
    p.push(...h.map((g) => (g === "" ? f : [f, g].join("/")))),
    o && p.push(...h),
    p.map((g) => (n.startsWith("/") && g === "" ? "/" : g))
  );
}
function c1(n) {
  n.sort((l, i) =>
    l.score !== i.score
      ? i.score - l.score
      : v1(
          l.routesMeta.map((s) => s.childrenIndex),
          i.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var f1 = /^:[\w-]+$/,
  d1 = 3,
  h1 = 2,
  m1 = 1,
  y1 = 10,
  p1 = -2,
  yy = (n) => n === "*";
function g1(n, l) {
  let i = n.split("/"),
    s = i.length;
  return (
    i.some(yy) && (s += p1),
    l && (s += h1),
    i
      .filter((o) => !yy(o))
      .reduce((o, f) => o + (f1.test(f) ? d1 : f === "" ? m1 : y1), s)
  );
}
function v1(n, l) {
  return n.length === l.length && n.slice(0, -1).every((s, o) => s === l[o])
    ? n[n.length - 1] - l[l.length - 1]
    : 0;
}
function b1(n, l, i = !1) {
  let { routesMeta: s } = n,
    o = {},
    f = "/",
    h = [];
  for (let p = 0; p < s.length; ++p) {
    let g = s[p],
      m = p === s.length - 1,
      v = f === "/" ? l : l.slice(f.length) || "/",
      x = hs(
        { path: g.relativePath, caseSensitive: g.caseSensitive, end: m },
        v
      ),
      w = g.route;
    if (
      (!x &&
        m &&
        i &&
        !s[s.length - 1].route.index &&
        (x = hs(
          { path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 },
          v
        )),
      !x)
    )
      return null;
    Object.assign(o, x.params),
      h.push({
        params: o,
        pathname: ba([f, x.pathname]),
        pathnameBase: T1(ba([f, x.pathnameBase])),
        route: w,
      }),
      x.pathnameBase !== "/" && (f = ba([f, x.pathnameBase]));
  }
  return h;
}
function hs(n, l) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, s] = x1(n.path, n.caseSensitive, n.end),
    o = l.match(i);
  if (!o) return null;
  let f = o[0],
    h = f.replace(/(.)\/+$/, "$1"),
    p = o.slice(1);
  return {
    params: s.reduce((m, { paramName: v, isOptional: x }, w) => {
      if (v === "*") {
        let E = p[w] || "";
        h = f.slice(0, f.length - E.length).replace(/(.)\/+$/, "$1");
      }
      const C = p[w];
      return (
        x && !C ? (m[v] = void 0) : (m[v] = (C || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: f,
    pathnameBase: h,
    pattern: n,
  };
}
function x1(n, l = !1, i = !0) {
  qt(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [],
    o =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (h, p, g) => (
            s.push({ paramName: p, isOptional: g != null }),
            g ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    n.endsWith("*")
      ? (s.push({ paramName: "*" }),
        (o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
        ? (o += "\\/*$")
        : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, l ? void 0 : "i"), s]
  );
}
function S1(n) {
  try {
    return n
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      qt(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`
      ),
      n
    );
  }
}
function Sa(n, l) {
  if (l === "/") return n;
  if (!n.toLowerCase().startsWith(l.toLowerCase())) return null;
  let i = l.endsWith("/") ? l.length - 1 : l.length,
    s = n.charAt(i);
  return s && s !== "/" ? null : n.slice(i) || "/";
}
function w1(n, l = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = "",
  } = typeof n == "string" ? gl(n) : n;
  return {
    pathname: i ? (i.startsWith("/") ? i : _1(i, l)) : l,
    search: N1(s),
    hash: j1(o),
  };
}
function _1(n, l) {
  let i = l.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((o) => {
      o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function hc(n, l, i, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${l}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function E1(n) {
  return n.filter(
    (l, i) => i === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function $c(n) {
  let l = E1(n);
  return l.map((i, s) => (s === l.length - 1 ? i.pathname : i.pathnameBase));
}
function Jc(n, l, i, s = !1) {
  let o;
  typeof n == "string"
    ? (o = gl(n))
    : ((o = { ...n }),
      ze(
        !o.pathname || !o.pathname.includes("?"),
        hc("?", "pathname", "search", o)
      ),
      ze(
        !o.pathname || !o.pathname.includes("#"),
        hc("#", "pathname", "hash", o)
      ),
      ze(!o.search || !o.search.includes("#"), hc("#", "search", "hash", o)));
  let f = n === "" || o.pathname === "",
    h = f ? "/" : o.pathname,
    p;
  if (h == null) p = i;
  else {
    let x = l.length - 1;
    if (!s && h.startsWith("..")) {
      let w = h.split("/");
      for (; w[0] === ".."; ) w.shift(), (x -= 1);
      o.pathname = w.join("/");
    }
    p = x >= 0 ? l[x] : "/";
  }
  let g = w1(o, p),
    m = h && h !== "/" && h.endsWith("/"),
    v = (f || h === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (m || v) && (g.pathname += "/"), g;
}
var ba = (n) => n.join("/").replace(/\/\/+/g, "/"),
  T1 = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  N1 = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  j1 = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function R1(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
var r0 = ["POST", "PUT", "PATCH", "DELETE"];
new Set(r0);
var O1 = ["GET", ...r0];
new Set(O1);
var vl = T.createContext(null);
vl.displayName = "DataRouter";
var Ns = T.createContext(null);
Ns.displayName = "DataRouterState";
var i0 = T.createContext({ isTransitioning: !1 });
i0.displayName = "ViewTransition";
var A1 = T.createContext(new Map());
A1.displayName = "Fetchers";
var C1 = T.createContext(null);
C1.displayName = "Await";
var Kt = T.createContext(null);
Kt.displayName = "Navigation";
var Ur = T.createContext(null);
Ur.displayName = "Location";
var Yt = T.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Yt.displayName = "Route";
var Pc = T.createContext(null);
Pc.displayName = "RouteError";
function M1(n, { relative: l } = {}) {
  ze(
    bl(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = T.useContext(Kt),
    { hash: o, pathname: f, search: h } = Lr(n, { relative: l }),
    p = f;
  return (
    i !== "/" && (p = f === "/" ? i : ba([i, f])),
    s.createHref({ pathname: p, search: h, hash: o })
  );
}
function bl() {
  return T.useContext(Ur) != null;
}
function na() {
  return (
    ze(
      bl(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    T.useContext(Ur).location
  );
}
var s0 =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function u0(n) {
  T.useContext(Kt).static || T.useLayoutEffect(n);
}
function Rn() {
  let { isDataRoute: n } = T.useContext(Yt);
  return n ? K1() : D1();
}
function D1() {
  ze(
    bl(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = T.useContext(vl),
    { basename: l, navigator: i } = T.useContext(Kt),
    { matches: s } = T.useContext(Yt),
    { pathname: o } = na(),
    f = JSON.stringify($c(s)),
    h = T.useRef(!1);
  return (
    u0(() => {
      h.current = !0;
    }),
    T.useCallback(
      (g, m = {}) => {
        if ((qt(h.current, s0), !h.current)) return;
        if (typeof g == "number") {
          i.go(g);
          return;
        }
        let v = Jc(g, JSON.parse(f), o, m.relative === "path");
        n == null &&
          l !== "/" &&
          (v.pathname = v.pathname === "/" ? l : ba([l, v.pathname])),
          (m.replace ? i.replace : i.push)(v, m.state, m);
      },
      [l, i, f, o, n]
    )
  );
}
var z1 = T.createContext(null);
function U1(n) {
  let l = T.useContext(Yt).outlet;
  return l && T.createElement(z1.Provider, { value: n }, l);
}
function o0() {
  let { matches: n } = T.useContext(Yt),
    l = n[n.length - 1];
  return l ? l.params : {};
}
function Lr(n, { relative: l } = {}) {
  let { matches: i } = T.useContext(Yt),
    { pathname: s } = na(),
    o = JSON.stringify($c(i));
  return T.useMemo(() => Jc(n, JSON.parse(o), s, l === "path"), [n, o, s, l]);
}
function L1(n, l) {
  return c0(n, l);
}
function c0(n, l, i, s) {
  var O;
  ze(
    bl(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = T.useContext(Kt),
    { matches: f } = T.useContext(Yt),
    h = f[f.length - 1],
    p = h ? h.params : {},
    g = h ? h.pathname : "/",
    m = h ? h.pathnameBase : "/",
    v = h && h.route;
  {
    let M = (v && v.path) || "";
    f0(
      g,
      !v || M.endsWith("*") || M.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M === "/" ? "*" : `${M}/*`}">.`
    );
  }
  let x = na(),
    w;
  if (l) {
    let M = typeof l == "string" ? gl(l) : l;
    ze(
      m === "/" || ((O = M.pathname) == null ? void 0 : O.startsWith(m)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${M.pathname}" was given in the \`location\` prop.`
    ),
      (w = M);
  } else w = x;
  let C = w.pathname || "/",
    E = C;
  if (m !== "/") {
    let M = m.replace(/^\//, "").split("/");
    E = "/" + C.replace(/^\//, "").split("/").slice(M.length).join("/");
  }
  let S = a0(n, { pathname: E });
  qt(
    v || S != null,
    `No routes matched location "${w.pathname}${w.search}${w.hash}" `
  ),
    qt(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${w.pathname}${w.search}${w.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let R = Y1(
    S &&
      S.map((M) =>
        Object.assign({}, M, {
          params: Object.assign({}, p, M.params),
          pathname: ba([
            m,
            o.encodeLocation
              ? o.encodeLocation(M.pathname).pathname
              : M.pathname,
          ]),
          pathnameBase:
            M.pathnameBase === "/"
              ? m
              : ba([
                  m,
                  o.encodeLocation
                    ? o.encodeLocation(M.pathnameBase).pathname
                    : M.pathnameBase,
                ]),
        })
      ),
    f,
    i,
    s
  );
  return l && R
    ? T.createElement(
        Ur.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...w,
            },
            navigationType: "POP",
          },
        },
        R
      )
    : R;
}
function k1() {
  let n = Z1(),
    l = R1(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
        ? n.message
        : JSON.stringify(n),
    i = n instanceof Error ? n.stack : null,
    s = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: s },
    f = { padding: "2px 4px", backgroundColor: s },
    h = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", n),
    (h = T.createElement(
      T.Fragment,
      null,
      T.createElement("p", null, "💿 Hey developer 👋"),
      T.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        T.createElement("code", { style: f }, "ErrorBoundary"),
        " or",
        " ",
        T.createElement("code", { style: f }, "errorElement"),
        " prop on your route."
      )
    )),
    T.createElement(
      T.Fragment,
      null,
      T.createElement("h2", null, "Unexpected Application Error!"),
      T.createElement("h3", { style: { fontStyle: "italic" } }, l),
      i ? T.createElement("pre", { style: o }, i) : null,
      h
    )
  );
}
var B1 = T.createElement(k1, null),
  H1 = class extends T.Component {
    constructor(n) {
      super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        });
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, l) {
      return l.location !== n.location ||
        (l.revalidation !== "idle" && n.revalidation === "idle")
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : l.error,
            location: l.location,
            revalidation: n.revalidation || l.revalidation,
          };
    }
    componentDidCatch(n, l) {
      console.error(
        "React Router caught the following error during render",
        n,
        l
      );
    }
    render() {
      return this.state.error !== void 0
        ? T.createElement(
            Yt.Provider,
            { value: this.props.routeContext },
            T.createElement(Pc.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function q1({ routeContext: n, match: l, children: i }) {
  let s = T.useContext(vl);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = l.route.id),
    T.createElement(Yt.Provider, { value: n }, i)
  );
}
function Y1(n, l = [], i = null, s = null) {
  if (n == null) {
    if (!i) return null;
    if (i.errors) n = i.matches;
    else if (l.length === 0 && !i.initialized && i.matches.length > 0)
      n = i.matches;
    else return null;
  }
  let o = n,
    f = i == null ? void 0 : i.errors;
  if (f != null) {
    let g = o.findIndex(
      (m) => m.route.id && (f == null ? void 0 : f[m.route.id]) !== void 0
    );
    ze(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`
    ),
      (o = o.slice(0, Math.min(o.length, g + 1)));
  }
  let h = !1,
    p = -1;
  if (i)
    for (let g = 0; g < o.length; g++) {
      let m = o[g];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (p = g),
        m.route.id)
      ) {
        let { loaderData: v, errors: x } = i,
          w =
            m.route.loader &&
            !v.hasOwnProperty(m.route.id) &&
            (!x || x[m.route.id] === void 0);
        if (m.route.lazy || w) {
          (h = !0), p >= 0 ? (o = o.slice(0, p + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((g, m, v) => {
    let x,
      w = !1,
      C = null,
      E = null;
    i &&
      ((x = f && m.route.id ? f[m.route.id] : void 0),
      (C = m.route.errorElement || B1),
      h &&
        (p < 0 && v === 0
          ? (f0(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (w = !0),
            (E = null))
          : p === v &&
            ((w = !0), (E = m.route.hydrateFallbackElement || null))));
    let S = l.concat(o.slice(0, v + 1)),
      R = () => {
        let O;
        return (
          x
            ? (O = C)
            : w
              ? (O = E)
              : m.route.Component
                ? (O = T.createElement(m.route.Component, null))
                : m.route.element
                  ? (O = m.route.element)
                  : (O = g),
          T.createElement(q1, {
            match: m,
            routeContext: { outlet: g, matches: S, isDataRoute: i != null },
            children: O,
          })
        );
      };
    return i && (m.route.ErrorBoundary || m.route.errorElement || v === 0)
      ? T.createElement(H1, {
          location: i.location,
          revalidation: i.revalidation,
          component: C,
          error: x,
          children: R(),
          routeContext: { outlet: null, matches: S, isDataRoute: !0 },
        })
      : R();
  }, null);
}
function Fc(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function X1(n) {
  let l = T.useContext(vl);
  return ze(l, Fc(n)), l;
}
function G1(n) {
  let l = T.useContext(Ns);
  return ze(l, Fc(n)), l;
}
function Q1(n) {
  let l = T.useContext(Yt);
  return ze(l, Fc(n)), l;
}
function Wc(n) {
  let l = Q1(n),
    i = l.matches[l.matches.length - 1];
  return (
    ze(
      i.route.id,
      `${n} can only be used on routes that contain a unique "id"`
    ),
    i.route.id
  );
}
function V1() {
  return Wc("useRouteId");
}
function Z1() {
  var s;
  let n = T.useContext(Pc),
    l = G1("useRouteError"),
    i = Wc("useRouteError");
  return n !== void 0 ? n : (s = l.errors) == null ? void 0 : s[i];
}
function K1() {
  let { router: n } = X1("useNavigate"),
    l = Wc("useNavigate"),
    i = T.useRef(!1);
  return (
    u0(() => {
      i.current = !0;
    }),
    T.useCallback(
      async (o, f = {}) => {
        qt(i.current, s0),
          i.current &&
            (typeof o == "number"
              ? n.navigate(o)
              : await n.navigate(o, { fromRouteId: l, ...f }));
      },
      [n, l]
    )
  );
}
var py = {};
function f0(n, l, i) {
  !l && !py[n] && ((py[n] = !0), qt(!1, i));
}
T.memo($1);
function $1({ routes: n, future: l, state: i }) {
  return c0(n, void 0, i, l);
}
function gy({ to: n, replace: l, state: i, relative: s }) {
  ze(
    bl(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: o } = T.useContext(Kt);
  qt(
    !o,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: f } = T.useContext(Yt),
    { pathname: h } = na(),
    p = Rn(),
    g = Jc(n, $c(f), h, s === "path"),
    m = JSON.stringify(g);
  return (
    T.useEffect(() => {
      p(JSON.parse(m), { replace: l, state: i, relative: s });
    }, [p, m, s, l, i]),
    null
  );
}
function J1(n) {
  return U1(n.context);
}
function ut(n) {
  ze(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function P1({
  basename: n = "/",
  children: l = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: f = !1,
}) {
  ze(
    !bl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = n.replace(/^\/*/, "/"),
    p = T.useMemo(
      () => ({ basename: h, navigator: o, static: f, future: {} }),
      [h, o, f]
    );
  typeof i == "string" && (i = gl(i));
  let {
      pathname: g = "/",
      search: m = "",
      hash: v = "",
      state: x = null,
      key: w = "default",
    } = i,
    C = T.useMemo(() => {
      let E = Sa(g, h);
      return E == null
        ? null
        : {
            location: { pathname: E, search: m, hash: v, state: x, key: w },
            navigationType: s,
          };
    }, [h, g, m, v, x, w, s]);
  return (
    qt(
      C != null,
      `<Router basename="${h}"> is not able to match the URL "${g}${m}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    C == null
      ? null
      : T.createElement(
          Kt.Provider,
          { value: p },
          T.createElement(Ur.Provider, { children: l, value: C })
        )
  );
}
function F1({ children: n, location: l }) {
  return L1(Oc(n), l);
}
function Oc(n, l = []) {
  let i = [];
  return (
    T.Children.forEach(n, (s, o) => {
      if (!T.isValidElement(s)) return;
      let f = [...l, o];
      if (s.type === T.Fragment) {
        i.push.apply(i, Oc(s.props.children, f));
        return;
      }
      ze(
        s.type === ut,
        `[${typeof s.type == "string" ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        ze(
          !s.props.index || !s.props.children,
          "An index route cannot have child routes."
        );
      let h = {
        id: s.props.id || f.join("-"),
        caseSensitive: s.props.caseSensitive,
        element: s.props.element,
        Component: s.props.Component,
        index: s.props.index,
        path: s.props.path,
        loader: s.props.loader,
        action: s.props.action,
        hydrateFallbackElement: s.props.hydrateFallbackElement,
        HydrateFallback: s.props.HydrateFallback,
        errorElement: s.props.errorElement,
        ErrorBoundary: s.props.ErrorBoundary,
        hasErrorBoundary:
          s.props.hasErrorBoundary === !0 ||
          s.props.ErrorBoundary != null ||
          s.props.errorElement != null,
        shouldRevalidate: s.props.shouldRevalidate,
        handle: s.props.handle,
        lazy: s.props.lazy,
      };
      s.props.children && (h.children = Oc(s.props.children, f)), i.push(h);
    }),
    i
  );
}
var is = "get",
  ss = "application/x-www-form-urlencoded";
function js(n) {
  return n != null && typeof n.tagName == "string";
}
function W1(n) {
  return js(n) && n.tagName.toLowerCase() === "button";
}
function I1(n) {
  return js(n) && n.tagName.toLowerCase() === "form";
}
function eb(n) {
  return js(n) && n.tagName.toLowerCase() === "input";
}
function tb(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function ab(n, l) {
  return n.button === 0 && (!l || l === "_self") && !tb(n);
}
function Ac(n = "") {
  return new URLSearchParams(
    typeof n == "string" || Array.isArray(n) || n instanceof URLSearchParams
      ? n
      : Object.keys(n).reduce((l, i) => {
          let s = n[i];
          return l.concat(Array.isArray(s) ? s.map((o) => [i, o]) : [[i, s]]);
        }, [])
  );
}
function nb(n, l) {
  let i = Ac(n);
  return (
    l &&
      l.forEach((s, o) => {
        i.has(o) ||
          l.getAll(o).forEach((f) => {
            i.append(o, f);
          });
      }),
    i
  );
}
var ns = null;
function lb() {
  if (ns === null)
    try {
      new FormData(document.createElement("form"), 0), (ns = !1);
    } catch {
      ns = !0;
    }
  return ns;
}
var rb = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function mc(n) {
  return n != null && !rb.has(n)
    ? (qt(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ss}"`
      ),
      null)
    : n;
}
function ib(n, l) {
  let i, s, o, f, h;
  if (I1(n)) {
    let p = n.getAttribute("action");
    (s = p ? Sa(p, l) : null),
      (i = n.getAttribute("method") || is),
      (o = mc(n.getAttribute("enctype")) || ss),
      (f = new FormData(n));
  } else if (W1(n) || (eb(n) && (n.type === "submit" || n.type === "image"))) {
    let p = n.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = n.getAttribute("formaction") || p.getAttribute("action");
    if (
      ((s = g ? Sa(g, l) : null),
      (i = n.getAttribute("formmethod") || p.getAttribute("method") || is),
      (o =
        mc(n.getAttribute("formenctype")) ||
        mc(p.getAttribute("enctype")) ||
        ss),
      (f = new FormData(p, n)),
      !lb())
    ) {
      let { name: m, type: v, value: x } = n;
      if (v === "image") {
        let w = m ? `${m}.` : "";
        f.append(`${w}x`, "0"), f.append(`${w}y`, "0");
      } else m && f.append(m, x);
    }
  } else {
    if (js(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (i = is), (s = null), (o = ss), (h = n);
  }
  return (
    f && o === "text/plain" && ((h = f), (f = void 0)),
    { action: s, method: i.toLowerCase(), encType: o, formData: f, body: h }
  );
}
function Ic(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
async function sb(n, l) {
  if (n.id in l) return l[n.id];
  try {
    let i = await import(n.module);
    return (l[n.id] = i), i;
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function ub(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === "preload" &&
        typeof n.imageSrcSet == "string" &&
        typeof n.imageSizes == "string"
      : typeof n.rel == "string" && typeof n.href == "string";
}
async function ob(n, l, i) {
  let s = await Promise.all(
    n.map(async (o) => {
      let f = l.routes[o.route.id];
      if (f) {
        let h = await sb(f, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return hb(
    s
      .flat(1)
      .filter(ub)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" }
      )
  );
}
function vy(n, l, i, s, o, f) {
  let h = (g, m) => (i[m] ? g.route.id !== i[m].route.id : !0),
    p = (g, m) => {
      var v;
      return (
        i[m].pathname !== g.pathname ||
        (((v = i[m].route.path) == null ? void 0 : v.endsWith("*")) &&
          i[m].params["*"] !== g.params["*"])
      );
    };
  return f === "assets"
    ? l.filter((g, m) => h(g, m) || p(g, m))
    : f === "data"
      ? l.filter((g, m) => {
          var x;
          let v = s.routes[g.route.id];
          if (!v || !v.hasLoader) return !1;
          if (h(g, m) || p(g, m)) return !0;
          if (g.route.shouldRevalidate) {
            let w = g.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin
              ),
              currentParams: ((x = i[0]) == null ? void 0 : x.params) || {},
              nextUrl: new URL(n, window.origin),
              nextParams: g.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof w == "boolean") return w;
          }
          return !0;
        })
      : [];
}
function cb(n, l, { includeHydrateFallback: i } = {}) {
  return fb(
    n
      .map((s) => {
        let o = l.routes[s.route.id];
        if (!o) return [];
        let f = [o.module];
        return (
          o.clientActionModule && (f = f.concat(o.clientActionModule)),
          o.clientLoaderModule && (f = f.concat(o.clientLoaderModule)),
          i &&
            o.hydrateFallbackModule &&
            (f = f.concat(o.hydrateFallbackModule)),
          o.imports && (f = f.concat(o.imports)),
          f
        );
      })
      .flat(1)
  );
}
function fb(n) {
  return [...new Set(n)];
}
function db(n) {
  let l = {},
    i = Object.keys(n).sort();
  for (let s of i) l[s] = n[s];
  return l;
}
function hb(n, l) {
  let i = new Set();
  return (
    new Set(l),
    n.reduce((s, o) => {
      let f = JSON.stringify(db(o));
      return i.has(f) || (i.add(f), s.push({ key: f, link: o })), s;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var mb = new Set([100, 101, 204, 205]);
function yb(n, l) {
  let i =
    typeof n == "string"
      ? new URL(
          n,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : n;
  return (
    i.pathname === "/"
      ? (i.pathname = "_root.data")
      : l && Sa(i.pathname, l) === "/"
        ? (i.pathname = `${l.replace(/\/$/, "")}/_root.data`)
        : (i.pathname = `${i.pathname.replace(/\/$/, "")}.data`),
    i
  );
}
function d0() {
  let n = T.useContext(vl);
  return (
    Ic(
      n,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    n
  );
}
function pb() {
  let n = T.useContext(Ns);
  return (
    Ic(
      n,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    n
  );
}
var ef = T.createContext(void 0);
ef.displayName = "FrameworkContext";
function h0() {
  let n = T.useContext(ef);
  return (
    Ic(n, "You must render this element inside a <HydratedRouter> element"), n
  );
}
function gb(n, l) {
  let i = T.useContext(ef),
    [s, o] = T.useState(!1),
    [f, h] = T.useState(!1),
    {
      onFocus: p,
      onBlur: g,
      onMouseEnter: m,
      onMouseLeave: v,
      onTouchStart: x,
    } = l,
    w = T.useRef(null);
  T.useEffect(() => {
    if ((n === "render" && h(!0), n === "viewport")) {
      let S = (O) => {
          O.forEach((M) => {
            h(M.isIntersecting);
          });
        },
        R = new IntersectionObserver(S, { threshold: 0.5 });
      return (
        w.current && R.observe(w.current),
        () => {
          R.disconnect();
        }
      );
    }
  }, [n]),
    T.useEffect(() => {
      if (s) {
        let S = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(S);
        };
      }
    }, [s]);
  let C = () => {
      o(!0);
    },
    E = () => {
      o(!1), h(!1);
    };
  return i
    ? n !== "intent"
      ? [f, w, {}]
      : [
          f,
          w,
          {
            onFocus: wr(p, C),
            onBlur: wr(g, E),
            onMouseEnter: wr(m, C),
            onMouseLeave: wr(v, E),
            onTouchStart: wr(x, C),
          },
        ]
    : [!1, w, {}];
}
function wr(n, l) {
  return (i) => {
    n && n(i), i.defaultPrevented || l(i);
  };
}
function vb({ page: n, ...l }) {
  let { router: i } = d0(),
    s = T.useMemo(() => a0(i.routes, n, i.basename), [i.routes, n, i.basename]);
  return s ? T.createElement(xb, { page: n, matches: s, ...l }) : null;
}
function bb(n) {
  let { manifest: l, routeModules: i } = h0(),
    [s, o] = T.useState([]);
  return (
    T.useEffect(() => {
      let f = !1;
      return (
        ob(n, l, i).then((h) => {
          f || o(h);
        }),
        () => {
          f = !0;
        }
      );
    }, [n, l, i]),
    s
  );
}
function xb({ page: n, matches: l, ...i }) {
  let s = na(),
    { manifest: o, routeModules: f } = h0(),
    { basename: h } = d0(),
    { loaderData: p, matches: g } = pb(),
    m = T.useMemo(() => vy(n, l, g, o, s, "data"), [n, l, g, o, s]),
    v = T.useMemo(() => vy(n, l, g, o, s, "assets"), [n, l, g, o, s]),
    x = T.useMemo(() => {
      if (n === s.pathname + s.search + s.hash) return [];
      let E = new Set(),
        S = !1;
      if (
        (l.forEach((O) => {
          var B;
          let M = o.routes[O.route.id];
          !M ||
            !M.hasLoader ||
            ((!m.some((G) => G.route.id === O.route.id) &&
              O.route.id in p &&
              (B = f[O.route.id]) != null &&
              B.shouldRevalidate) ||
            M.hasClientLoader
              ? (S = !0)
              : E.add(O.route.id));
        }),
        E.size === 0)
      )
        return [];
      let R = yb(n, h);
      return (
        S &&
          E.size > 0 &&
          R.searchParams.set(
            "_routes",
            l
              .filter((O) => E.has(O.route.id))
              .map((O) => O.route.id)
              .join(",")
          ),
        [R.pathname + R.search]
      );
    }, [h, p, s, o, m, l, n, f]),
    w = T.useMemo(() => cb(v, o), [v, o]),
    C = bb(v);
  return T.createElement(
    T.Fragment,
    null,
    x.map((E) =>
      T.createElement("link", {
        key: E,
        rel: "prefetch",
        as: "fetch",
        href: E,
        ...i,
      })
    ),
    w.map((E) =>
      T.createElement("link", { key: E, rel: "modulepreload", href: E, ...i })
    ),
    C.map(({ key: E, link: S }) => T.createElement("link", { key: E, ...S }))
  );
}
function Sb(...n) {
  return (l) => {
    n.forEach((i) => {
      typeof i == "function" ? i(l) : i != null && (i.current = l);
    });
  };
}
var m0 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  m0 && (window.__reactRouterVersion = "7.6.2");
} catch {}
function wb({ basename: n, children: l, window: i }) {
  let s = T.useRef();
  s.current == null && (s.current = r1({ window: i, v5Compat: !0 }));
  let o = s.current,
    [f, h] = T.useState({ action: o.action, location: o.location }),
    p = T.useCallback(
      (g) => {
        T.startTransition(() => h(g));
      },
      [h]
    );
  return (
    T.useLayoutEffect(() => o.listen(p), [o, p]),
    T.createElement(P1, {
      basename: n,
      children: l,
      location: f.location,
      navigationType: f.action,
      navigator: o,
    })
  );
}
var y0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Rs = T.forwardRef(function (
    {
      onClick: l,
      discover: i = "render",
      prefetch: s = "none",
      relative: o,
      reloadDocument: f,
      replace: h,
      state: p,
      target: g,
      to: m,
      preventScrollReset: v,
      viewTransition: x,
      ...w
    },
    C
  ) {
    let { basename: E } = T.useContext(Kt),
      S = typeof m == "string" && y0.test(m),
      R,
      O = !1;
    if (typeof m == "string" && S && ((R = m), m0))
      try {
        let F = new URL(window.location.href),
          ee = m.startsWith("//") ? new URL(F.protocol + m) : new URL(m),
          Ee = Sa(ee.pathname, E);
        ee.origin === F.origin && Ee != null
          ? (m = Ee + ee.search + ee.hash)
          : (O = !0);
      } catch {
        qt(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let M = M1(m, { relative: o }),
      [B, G, q] = gb(s, w),
      Z = Tb(m, {
        replace: h,
        state: p,
        target: g,
        preventScrollReset: v,
        relative: o,
        viewTransition: x,
      });
    function K(F) {
      l && l(F), F.defaultPrevented || Z(F);
    }
    let P = T.createElement("a", {
      ...w,
      ...q,
      href: R || M,
      onClick: O || f ? l : K,
      ref: Sb(C, G),
      target: g,
      "data-discover": !S && i === "render" ? "true" : void 0,
    });
    return B && !S
      ? T.createElement(T.Fragment, null, P, T.createElement(vb, { page: M }))
      : P;
  });
Rs.displayName = "Link";
var Oe = T.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: f,
    to: h,
    viewTransition: p,
    children: g,
    ...m
  },
  v
) {
  let x = Lr(h, { relative: m.relative }),
    w = na(),
    C = T.useContext(Ns),
    { navigator: E, basename: S } = T.useContext(Kt),
    R = C != null && Cb(x) && p === !0,
    O = E.encodeLocation ? E.encodeLocation(x).pathname : x.pathname,
    M = w.pathname,
    B =
      C && C.navigation && C.navigation.location
        ? C.navigation.location.pathname
        : null;
  i ||
    ((M = M.toLowerCase()),
    (B = B ? B.toLowerCase() : null),
    (O = O.toLowerCase())),
    B && S && (B = Sa(B, S) || B);
  const G = O !== "/" && O.endsWith("/") ? O.length - 1 : O.length;
  let q = M === O || (!o && M.startsWith(O) && M.charAt(G) === "/"),
    Z =
      B != null &&
      (B === O || (!o && B.startsWith(O) && B.charAt(O.length) === "/")),
    K = { isActive: q, isPending: Z, isTransitioning: R },
    P = q ? l : void 0,
    F;
  typeof s == "function"
    ? (F = s(K))
    : (F = [
        s,
        q ? "active" : null,
        Z ? "pending" : null,
        R ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ee = typeof f == "function" ? f(K) : f;
  return T.createElement(
    Rs,
    {
      ...m,
      "aria-current": P,
      className: F,
      ref: v,
      style: ee,
      to: h,
      viewTransition: p,
    },
    typeof g == "function" ? g(K) : g
  );
});
Oe.displayName = "NavLink";
var _b = T.forwardRef(
  (
    {
      discover: n = "render",
      fetcherKey: l,
      navigate: i,
      reloadDocument: s,
      replace: o,
      state: f,
      method: h = is,
      action: p,
      onSubmit: g,
      relative: m,
      preventScrollReset: v,
      viewTransition: x,
      ...w
    },
    C
  ) => {
    let E = Ob(),
      S = Ab(p, { relative: m }),
      R = h.toLowerCase() === "get" ? "get" : "post",
      O = typeof p == "string" && y0.test(p),
      M = (B) => {
        if ((g && g(B), B.defaultPrevented)) return;
        B.preventDefault();
        let G = B.nativeEvent.submitter,
          q = (G == null ? void 0 : G.getAttribute("formmethod")) || h;
        E(G || B.currentTarget, {
          fetcherKey: l,
          method: q,
          navigate: i,
          replace: o,
          state: f,
          relative: m,
          preventScrollReset: v,
          viewTransition: x,
        });
      };
    return T.createElement("form", {
      ref: C,
      method: R,
      action: S,
      onSubmit: s ? g : M,
      ...w,
      "data-discover": !O && n === "render" ? "true" : void 0,
    });
  }
);
_b.displayName = "Form";
function Eb(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function p0(n) {
  let l = T.useContext(vl);
  return ze(l, Eb(n)), l;
}
function Tb(
  n,
  {
    target: l,
    replace: i,
    state: s,
    preventScrollReset: o,
    relative: f,
    viewTransition: h,
  } = {}
) {
  let p = Rn(),
    g = na(),
    m = Lr(n, { relative: f });
  return T.useCallback(
    (v) => {
      if (ab(v, l)) {
        v.preventDefault();
        let x = i !== void 0 ? i : Rr(g) === Rr(m);
        p(n, {
          replace: x,
          state: s,
          preventScrollReset: o,
          relative: f,
          viewTransition: h,
        });
      }
    },
    [g, p, m, i, s, l, n, o, f, h]
  );
}
function Nb(n) {
  qt(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let l = T.useRef(Ac(n)),
    i = T.useRef(!1),
    s = na(),
    o = T.useMemo(() => nb(s.search, i.current ? null : l.current), [s.search]),
    f = Rn(),
    h = T.useCallback(
      (p, g) => {
        const m = Ac(typeof p == "function" ? p(o) : p);
        (i.current = !0), f("?" + m, g);
      },
      [f, o]
    );
  return [o, h];
}
var jb = 0,
  Rb = () => `__${String(++jb)}__`;
function Ob() {
  let { router: n } = p0("useSubmit"),
    { basename: l } = T.useContext(Kt),
    i = V1();
  return T.useCallback(
    async (s, o = {}) => {
      let { action: f, method: h, encType: p, formData: g, body: m } = ib(s, l);
      if (o.navigate === !1) {
        let v = o.fetcherKey || Rb();
        await n.fetch(v, i, o.action || f, {
          preventScrollReset: o.preventScrollReset,
          formData: g,
          body: m,
          formMethod: o.method || h,
          formEncType: o.encType || p,
          flushSync: o.flushSync,
        });
      } else
        await n.navigate(o.action || f, {
          preventScrollReset: o.preventScrollReset,
          formData: g,
          body: m,
          formMethod: o.method || h,
          formEncType: o.encType || p,
          replace: o.replace,
          state: o.state,
          fromRouteId: i,
          flushSync: o.flushSync,
          viewTransition: o.viewTransition,
        });
    },
    [n, l, i]
  );
}
function Ab(n, { relative: l } = {}) {
  let { basename: i } = T.useContext(Kt),
    s = T.useContext(Yt);
  ze(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1),
    f = { ...Lr(n || ".", { relative: l }) },
    h = na();
  if (n == null) {
    f.search = h.search;
    let p = new URLSearchParams(f.search),
      g = p.getAll("index");
    if (g.some((v) => v === "")) {
      p.delete("index"),
        g.filter((x) => x).forEach((x) => p.append("index", x));
      let v = p.toString();
      f.search = v ? `?${v}` : "";
    }
  }
  return (
    (!n || n === ".") &&
      o.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (f.pathname = f.pathname === "/" ? i : ba([i, f.pathname])),
    Rr(f)
  );
}
function Cb(n, l = {}) {
  let i = T.useContext(i0);
  ze(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = p0("useViewTransitionState"),
    o = Lr(n, { relative: l.relative });
  if (!i.isTransitioning) return !1;
  let f = Sa(i.currentLocation.pathname, s) || i.currentLocation.pathname,
    h = Sa(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return hs(o.pathname, h) != null || hs(o.pathname, f) != null;
}
[...mb];
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mb = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  g0 = (...n) =>
    n
      .filter((l, i, s) => !!l && l.trim() !== "" && s.indexOf(l) === i)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Db = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zb = T.forwardRef(
  (
    {
      color: n = "currentColor",
      size: l = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: s,
      className: o = "",
      children: f,
      iconNode: h,
      ...p
    },
    g
  ) =>
    T.createElement(
      "svg",
      {
        ref: g,
        ...Db,
        width: l,
        height: l,
        stroke: n,
        strokeWidth: s ? (Number(i) * 24) / Number(l) : i,
        className: g0("lucide", o),
        ...p,
      },
      [
        ...h.map(([m, v]) => T.createElement(m, v)),
        ...(Array.isArray(f) ? f : [f]),
      ]
    )
);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ke = (n, l) => {
  const i = T.forwardRef(({ className: s, ...o }, f) =>
    T.createElement(zb, {
      ref: f,
      iconNode: l,
      className: g0(`lucide-${Mb(n)}`, s),
      ...o,
    })
  );
  return (i.displayName = `${n}`), i;
};
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ub = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  Lb = Ke("ArrowRight", Ub);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kb = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  Bb = Ke("CircleCheckBig", kb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hb = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  qb = Ke("CircleX", Hb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yb = [
    [
      "path",
      {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
        key: "c3ymky",
      },
    ],
  ],
  v0 = Ke("Heart", Yb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xb = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ],
  Gb = Ke("House", Xb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qb = [
    ["path", { d: "M10 18h4", key: "1ulq68" }],
    ["path", { d: "M11 6H3", key: "1u26ik" }],
    ["path", { d: "M15 6h6", key: "1jlkvy" }],
    ["path", { d: "M18 9V3", key: "xwwp7m" }],
    ["path", { d: "M7 12h8", key: "7a1bxv" }],
  ],
  Vb = Ke("ListFilterPlus", Qb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zb = [
    [
      "path",
      {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        key: "1lielz",
      },
    ],
  ],
  Kb = Ke("MessageSquare", Zb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $b = [
    [
      "path",
      {
        d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
        key: "e7tb2h",
      },
    ],
    ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
    ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
    ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }],
  ],
  Jb = Ke("PackageSearch", $b);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Pb = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu",
      },
    ],
  ],
  Fb = Ke("Pen", Pb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wb = [
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
    ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ],
  by = Ke("Search", Wb);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ib = [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  ex = Ke("Settings", Ib);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tx = [
    [
      "path",
      {
        d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",
        key: "hou9p0",
      },
    ],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ],
  ax = Ke("ShoppingBag", tx);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nx = [
    ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
    ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
    [
      "path",
      {
        d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
        key: "9zh506",
      },
    ],
  ],
  b0 = Ke("ShoppingCart", nx);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lx = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  Or = Ke("Star", lx);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rx = [
    ["path", { d: "M7 10v12", key: "1qc93n" }],
    [
      "path",
      {
        d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
        key: "emmmcr",
      },
    ],
  ],
  ix = Ke("ThumbsUp", rx);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sx = [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
  ],
  ux = Ke("Trash2", sx);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ox = [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ],
  cx = Ke("Trash", ox);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fx = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  dx = Ke("User", fx);
/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hx = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  x0 = Ke("X", hx);
function S0(n, l) {
  return function () {
    return n.apply(l, arguments);
  };
}
const { toString: mx } = Object.prototype,
  { getPrototypeOf: tf } = Object,
  { iterator: Os, toStringTag: w0 } = Symbol,
  As = ((n) => (l) => {
    const i = mx.call(l);
    return n[i] || (n[i] = i.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  $t = (n) => ((n = n.toLowerCase()), (l) => As(l) === n),
  Cs = (n) => (l) => typeof l === n,
  { isArray: xl } = Array,
  Ar = Cs("undefined");
function yx(n) {
  return (
    n !== null &&
    !Ar(n) &&
    n.constructor !== null &&
    !Ar(n.constructor) &&
    pt(n.constructor.isBuffer) &&
    n.constructor.isBuffer(n)
  );
}
const _0 = $t("ArrayBuffer");
function px(n) {
  let l;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (l = ArrayBuffer.isView(n))
      : (l = n && n.buffer && _0(n.buffer)),
    l
  );
}
const gx = Cs("string"),
  pt = Cs("function"),
  E0 = Cs("number"),
  Ms = (n) => n !== null && typeof n == "object",
  vx = (n) => n === !0 || n === !1,
  us = (n) => {
    if (As(n) !== "object") return !1;
    const l = tf(n);
    return (
      (l === null ||
        l === Object.prototype ||
        Object.getPrototypeOf(l) === null) &&
      !(w0 in n) &&
      !(Os in n)
    );
  },
  bx = $t("Date"),
  xx = $t("File"),
  Sx = $t("Blob"),
  wx = $t("FileList"),
  _x = (n) => Ms(n) && pt(n.pipe),
  Ex = (n) => {
    let l;
    return (
      n &&
      ((typeof FormData == "function" && n instanceof FormData) ||
        (pt(n.append) &&
          ((l = As(n)) === "formdata" ||
            (l === "object" &&
              pt(n.toString) &&
              n.toString() === "[object FormData]"))))
    );
  },
  Tx = $t("URLSearchParams"),
  [Nx, jx, Rx, Ox] = ["ReadableStream", "Request", "Response", "Headers"].map(
    $t
  ),
  Ax = (n) =>
    n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function kr(n, l, { allOwnKeys: i = !1 } = {}) {
  if (n === null || typeof n > "u") return;
  let s, o;
  if ((typeof n != "object" && (n = [n]), xl(n)))
    for (s = 0, o = n.length; s < o; s++) l.call(null, n[s], s, n);
  else {
    const f = i ? Object.getOwnPropertyNames(n) : Object.keys(n),
      h = f.length;
    let p;
    for (s = 0; s < h; s++) (p = f[s]), l.call(null, n[p], p, n);
  }
}
function T0(n, l) {
  l = l.toLowerCase();
  const i = Object.keys(n);
  let s = i.length,
    o;
  for (; s-- > 0; ) if (((o = i[s]), l === o.toLowerCase())) return o;
  return null;
}
const Sn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  N0 = (n) => !Ar(n) && n !== Sn;
function Cc() {
  const { caseless: n } = (N0(this) && this) || {},
    l = {},
    i = (s, o) => {
      const f = (n && T0(l, o)) || o;
      us(l[f]) && us(s)
        ? (l[f] = Cc(l[f], s))
        : us(s)
          ? (l[f] = Cc({}, s))
          : xl(s)
            ? (l[f] = s.slice())
            : (l[f] = s);
    };
  for (let s = 0, o = arguments.length; s < o; s++)
    arguments[s] && kr(arguments[s], i);
  return l;
}
const Cx = (n, l, i, { allOwnKeys: s } = {}) => (
    kr(
      l,
      (o, f) => {
        i && pt(o) ? (n[f] = S0(o, i)) : (n[f] = o);
      },
      { allOwnKeys: s }
    ),
    n
  ),
  Mx = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n),
  Dx = (n, l, i, s) => {
    (n.prototype = Object.create(l.prototype, s)),
      (n.prototype.constructor = n),
      Object.defineProperty(n, "super", { value: l.prototype }),
      i && Object.assign(n.prototype, i);
  },
  zx = (n, l, i, s) => {
    let o, f, h;
    const p = {};
    if (((l = l || {}), n == null)) return l;
    do {
      for (o = Object.getOwnPropertyNames(n), f = o.length; f-- > 0; )
        (h = o[f]), (!s || s(h, n, l)) && !p[h] && ((l[h] = n[h]), (p[h] = !0));
      n = i !== !1 && tf(n);
    } while (n && (!i || i(n, l)) && n !== Object.prototype);
    return l;
  },
  Ux = (n, l, i) => {
    (n = String(n)),
      (i === void 0 || i > n.length) && (i = n.length),
      (i -= l.length);
    const s = n.indexOf(l, i);
    return s !== -1 && s === i;
  },
  Lx = (n) => {
    if (!n) return null;
    if (xl(n)) return n;
    let l = n.length;
    if (!E0(l)) return null;
    const i = new Array(l);
    for (; l-- > 0; ) i[l] = n[l];
    return i;
  },
  kx = (
    (n) => (l) =>
      n && l instanceof n
  )(typeof Uint8Array < "u" && tf(Uint8Array)),
  Bx = (n, l) => {
    const s = (n && n[Os]).call(n);
    let o;
    for (; (o = s.next()) && !o.done; ) {
      const f = o.value;
      l.call(n, f[0], f[1]);
    }
  },
  Hx = (n, l) => {
    let i;
    const s = [];
    for (; (i = n.exec(l)) !== null; ) s.push(i);
    return s;
  },
  qx = $t("HTMLFormElement"),
  Yx = (n) =>
    n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, s, o) {
      return s.toUpperCase() + o;
    }),
  xy = (
    ({ hasOwnProperty: n }) =>
    (l, i) =>
      n.call(l, i)
  )(Object.prototype),
  Xx = $t("RegExp"),
  j0 = (n, l) => {
    const i = Object.getOwnPropertyDescriptors(n),
      s = {};
    kr(i, (o, f) => {
      let h;
      (h = l(o, f, n)) !== !1 && (s[f] = h || o);
    }),
      Object.defineProperties(n, s);
  },
  Gx = (n) => {
    j0(n, (l, i) => {
      if (pt(n) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
        return !1;
      const s = n[i];
      if (pt(s)) {
        if (((l.enumerable = !1), "writable" in l)) {
          l.writable = !1;
          return;
        }
        l.set ||
          (l.set = () => {
            throw Error("Can not rewrite read-only method '" + i + "'");
          });
      }
    });
  },
  Qx = (n, l) => {
    const i = {},
      s = (o) => {
        o.forEach((f) => {
          i[f] = !0;
        });
      };
    return xl(n) ? s(n) : s(String(n).split(l)), i;
  },
  Vx = () => {},
  Zx = (n, l) => (n != null && Number.isFinite((n = +n)) ? n : l);
function Kx(n) {
  return !!(n && pt(n.append) && n[w0] === "FormData" && n[Os]);
}
const $x = (n) => {
    const l = new Array(10),
      i = (s, o) => {
        if (Ms(s)) {
          if (l.indexOf(s) >= 0) return;
          if (!("toJSON" in s)) {
            l[o] = s;
            const f = xl(s) ? [] : {};
            return (
              kr(s, (h, p) => {
                const g = i(h, o + 1);
                !Ar(g) && (f[p] = g);
              }),
              (l[o] = void 0),
              f
            );
          }
        }
        return s;
      };
    return i(n, 0);
  },
  Jx = $t("AsyncFunction"),
  Px = (n) => n && (Ms(n) || pt(n)) && pt(n.then) && pt(n.catch),
  R0 = ((n, l) =>
    n
      ? setImmediate
      : l
        ? ((i, s) => (
            Sn.addEventListener(
              "message",
              ({ source: o, data: f }) => {
                o === Sn && f === i && s.length && s.shift()();
              },
              !1
            ),
            (o) => {
              s.push(o), Sn.postMessage(i, "*");
            }
          ))(`axios@${Math.random()}`, [])
        : (i) => setTimeout(i))(
    typeof setImmediate == "function",
    pt(Sn.postMessage)
  ),
  Fx =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Sn)
      : (typeof process < "u" && process.nextTick) || R0,
  Wx = (n) => n != null && pt(n[Os]),
  H = {
    isArray: xl,
    isArrayBuffer: _0,
    isBuffer: yx,
    isFormData: Ex,
    isArrayBufferView: px,
    isString: gx,
    isNumber: E0,
    isBoolean: vx,
    isObject: Ms,
    isPlainObject: us,
    isReadableStream: Nx,
    isRequest: jx,
    isResponse: Rx,
    isHeaders: Ox,
    isUndefined: Ar,
    isDate: bx,
    isFile: xx,
    isBlob: Sx,
    isRegExp: Xx,
    isFunction: pt,
    isStream: _x,
    isURLSearchParams: Tx,
    isTypedArray: kx,
    isFileList: wx,
    forEach: kr,
    merge: Cc,
    extend: Cx,
    trim: Ax,
    stripBOM: Mx,
    inherits: Dx,
    toFlatObject: zx,
    kindOf: As,
    kindOfTest: $t,
    endsWith: Ux,
    toArray: Lx,
    forEachEntry: Bx,
    matchAll: Hx,
    isHTMLForm: qx,
    hasOwnProperty: xy,
    hasOwnProp: xy,
    reduceDescriptors: j0,
    freezeMethods: Gx,
    toObjectSet: Qx,
    toCamelCase: Yx,
    noop: Vx,
    toFiniteNumber: Zx,
    findKey: T0,
    global: Sn,
    isContextDefined: N0,
    isSpecCompliantForm: Kx,
    toJSONObject: $x,
    isAsyncFn: Jx,
    isThenable: Px,
    setImmediate: R0,
    asap: Fx,
    isIterable: Wx,
  };
function oe(n, l, i, s, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = n),
    (this.name = "AxiosError"),
    l && (this.code = l),
    i && (this.config = i),
    s && (this.request = s),
    o && ((this.response = o), (this.status = o.status ? o.status : null));
}
H.inherits(oe, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: H.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const O0 = oe.prototype,
  A0 = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((n) => {
  A0[n] = { value: n };
});
Object.defineProperties(oe, A0);
Object.defineProperty(O0, "isAxiosError", { value: !0 });
oe.from = (n, l, i, s, o, f) => {
  const h = Object.create(O0);
  return (
    H.toFlatObject(
      n,
      h,
      function (g) {
        return g !== Error.prototype;
      },
      (p) => p !== "isAxiosError"
    ),
    oe.call(h, n.message, l, i, s, o),
    (h.cause = n),
    (h.name = n.name),
    f && Object.assign(h, f),
    h
  );
};
const Ix = null;
function Mc(n) {
  return H.isPlainObject(n) || H.isArray(n);
}
function C0(n) {
  return H.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function Sy(n, l, i) {
  return n
    ? n
        .concat(l)
        .map(function (o, f) {
          return (o = C0(o)), !i && f ? "[" + o + "]" : o;
        })
        .join(i ? "." : "")
    : l;
}
function e2(n) {
  return H.isArray(n) && !n.some(Mc);
}
const t2 = H.toFlatObject(H, {}, null, function (l) {
  return /^is[A-Z]/.test(l);
});
function Ds(n, l, i) {
  if (!H.isObject(n)) throw new TypeError("target must be an object");
  (l = l || new FormData()),
    (i = H.toFlatObject(
      i,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (S, R) {
        return !H.isUndefined(R[S]);
      }
    ));
  const s = i.metaTokens,
    o = i.visitor || v,
    f = i.dots,
    h = i.indexes,
    g = (i.Blob || (typeof Blob < "u" && Blob)) && H.isSpecCompliantForm(l);
  if (!H.isFunction(o)) throw new TypeError("visitor must be a function");
  function m(E) {
    if (E === null) return "";
    if (H.isDate(E)) return E.toISOString();
    if (!g && H.isBlob(E))
      throw new oe("Blob is not supported. Use a Buffer instead.");
    return H.isArrayBuffer(E) || H.isTypedArray(E)
      ? g && typeof Blob == "function"
        ? new Blob([E])
        : Buffer.from(E)
      : E;
  }
  function v(E, S, R) {
    let O = E;
    if (E && !R && typeof E == "object") {
      if (H.endsWith(S, "{}"))
        (S = s ? S : S.slice(0, -2)), (E = JSON.stringify(E));
      else if (
        (H.isArray(E) && e2(E)) ||
        ((H.isFileList(E) || H.endsWith(S, "[]")) && (O = H.toArray(E)))
      )
        return (
          (S = C0(S)),
          O.forEach(function (B, G) {
            !(H.isUndefined(B) || B === null) &&
              l.append(
                h === !0 ? Sy([S], G, f) : h === null ? S : S + "[]",
                m(B)
              );
          }),
          !1
        );
    }
    return Mc(E) ? !0 : (l.append(Sy(R, S, f), m(E)), !1);
  }
  const x = [],
    w = Object.assign(t2, {
      defaultVisitor: v,
      convertValue: m,
      isVisitable: Mc,
    });
  function C(E, S) {
    if (!H.isUndefined(E)) {
      if (x.indexOf(E) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      x.push(E),
        H.forEach(E, function (O, M) {
          (!(H.isUndefined(O) || O === null) &&
            o.call(l, O, H.isString(M) ? M.trim() : M, S, w)) === !0 &&
            C(O, S ? S.concat(M) : [M]);
        }),
        x.pop();
    }
  }
  if (!H.isObject(n)) throw new TypeError("data must be an object");
  return C(n), l;
}
function wy(n) {
  const l = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function (s) {
    return l[s];
  });
}
function af(n, l) {
  (this._pairs = []), n && Ds(n, this, l);
}
const M0 = af.prototype;
M0.append = function (l, i) {
  this._pairs.push([l, i]);
};
M0.toString = function (l) {
  const i = l
    ? function (s) {
        return l.call(this, s, wy);
      }
    : wy;
  return this._pairs
    .map(function (o) {
      return i(o[0]) + "=" + i(o[1]);
    }, "")
    .join("&");
};
function a2(n) {
  return encodeURIComponent(n)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function D0(n, l, i) {
  if (!l) return n;
  const s = (i && i.encode) || a2;
  H.isFunction(i) && (i = { serialize: i });
  const o = i && i.serialize;
  let f;
  if (
    (o
      ? (f = o(l, i))
      : (f = H.isURLSearchParams(l) ? l.toString() : new af(l, i).toString(s)),
    f)
  ) {
    const h = n.indexOf("#");
    h !== -1 && (n = n.slice(0, h)),
      (n += (n.indexOf("?") === -1 ? "?" : "&") + f);
  }
  return n;
}
class _y {
  constructor() {
    this.handlers = [];
  }
  use(l, i, s) {
    return (
      this.handlers.push({
        fulfilled: l,
        rejected: i,
        synchronous: s ? s.synchronous : !1,
        runWhen: s ? s.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(l) {
    this.handlers[l] && (this.handlers[l] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(l) {
    H.forEach(this.handlers, function (s) {
      s !== null && l(s);
    });
  }
}
const z0 = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  n2 = typeof URLSearchParams < "u" ? URLSearchParams : af,
  l2 = typeof FormData < "u" ? FormData : null,
  r2 = typeof Blob < "u" ? Blob : null,
  i2 = {
    isBrowser: !0,
    classes: { URLSearchParams: n2, FormData: l2, Blob: r2 },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  nf = typeof window < "u" && typeof document < "u",
  Dc = (typeof navigator == "object" && navigator) || void 0,
  s2 =
    nf &&
    (!Dc || ["ReactNative", "NativeScript", "NS"].indexOf(Dc.product) < 0),
  u2 =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  o2 = (nf && window.location.href) || "http://localhost",
  c2 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: nf,
        hasStandardBrowserEnv: s2,
        hasStandardBrowserWebWorkerEnv: u2,
        navigator: Dc,
        origin: o2,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  rt = { ...c2, ...i2 };
function f2(n, l) {
  return Ds(
    n,
    new rt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (i, s, o, f) {
          return rt.isNode && H.isBuffer(i)
            ? (this.append(s, i.toString("base64")), !1)
            : f.defaultVisitor.apply(this, arguments);
        },
      },
      l
    )
  );
}
function d2(n) {
  return H.matchAll(/\w+|\[(\w*)]/g, n).map((l) =>
    l[0] === "[]" ? "" : l[1] || l[0]
  );
}
function h2(n) {
  const l = {},
    i = Object.keys(n);
  let s;
  const o = i.length;
  let f;
  for (s = 0; s < o; s++) (f = i[s]), (l[f] = n[f]);
  return l;
}
function U0(n) {
  function l(i, s, o, f) {
    let h = i[f++];
    if (h === "__proto__") return !0;
    const p = Number.isFinite(+h),
      g = f >= i.length;
    return (
      (h = !h && H.isArray(o) ? o.length : h),
      g
        ? (H.hasOwnProp(o, h) ? (o[h] = [o[h], s]) : (o[h] = s), !p)
        : ((!o[h] || !H.isObject(o[h])) && (o[h] = []),
          l(i, s, o[h], f) && H.isArray(o[h]) && (o[h] = h2(o[h])),
          !p)
    );
  }
  if (H.isFormData(n) && H.isFunction(n.entries)) {
    const i = {};
    return (
      H.forEachEntry(n, (s, o) => {
        l(d2(s), o, i, 0);
      }),
      i
    );
  }
  return null;
}
function m2(n, l, i) {
  if (H.isString(n))
    try {
      return (l || JSON.parse)(n), H.trim(n);
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (i || JSON.stringify)(n);
}
const Br = {
  transitional: z0,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (l, i) {
      const s = i.getContentType() || "",
        o = s.indexOf("application/json") > -1,
        f = H.isObject(l);
      if ((f && H.isHTMLForm(l) && (l = new FormData(l)), H.isFormData(l)))
        return o ? JSON.stringify(U0(l)) : l;
      if (
        H.isArrayBuffer(l) ||
        H.isBuffer(l) ||
        H.isStream(l) ||
        H.isFile(l) ||
        H.isBlob(l) ||
        H.isReadableStream(l)
      )
        return l;
      if (H.isArrayBufferView(l)) return l.buffer;
      if (H.isURLSearchParams(l))
        return (
          i.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          l.toString()
        );
      let p;
      if (f) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return f2(l, this.formSerializer).toString();
        if ((p = H.isFileList(l)) || s.indexOf("multipart/form-data") > -1) {
          const g = this.env && this.env.FormData;
          return Ds(
            p ? { "files[]": l } : l,
            g && new g(),
            this.formSerializer
          );
        }
      }
      return f || o ? (i.setContentType("application/json", !1), m2(l)) : l;
    },
  ],
  transformResponse: [
    function (l) {
      const i = this.transitional || Br.transitional,
        s = i && i.forcedJSONParsing,
        o = this.responseType === "json";
      if (H.isResponse(l) || H.isReadableStream(l)) return l;
      if (l && H.isString(l) && ((s && !this.responseType) || o)) {
        const h = !(i && i.silentJSONParsing) && o;
        try {
          return JSON.parse(l);
        } catch (p) {
          if (h)
            throw p.name === "SyntaxError"
              ? oe.from(p, oe.ERR_BAD_RESPONSE, this, null, this.response)
              : p;
        }
      }
      return l;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: rt.classes.FormData, Blob: rt.classes.Blob },
  validateStatus: function (l) {
    return l >= 200 && l < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
H.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  Br.headers[n] = {};
});
const y2 = H.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  p2 = (n) => {
    const l = {};
    let i, s, o;
    return (
      n &&
        n
          .split(
            `
`
          )
          .forEach(function (h) {
            (o = h.indexOf(":")),
              (i = h.substring(0, o).trim().toLowerCase()),
              (s = h.substring(o + 1).trim()),
              !(!i || (l[i] && y2[i])) &&
                (i === "set-cookie"
                  ? l[i]
                    ? l[i].push(s)
                    : (l[i] = [s])
                  : (l[i] = l[i] ? l[i] + ", " + s : s));
          }),
      l
    );
  },
  Ey = Symbol("internals");
function _r(n) {
  return n && String(n).trim().toLowerCase();
}
function os(n) {
  return n === !1 || n == null ? n : H.isArray(n) ? n.map(os) : String(n);
}
function g2(n) {
  const l = Object.create(null),
    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; (s = i.exec(n)); ) l[s[1]] = s[2];
  return l;
}
const v2 = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function yc(n, l, i, s, o) {
  if (H.isFunction(s)) return s.call(this, l, i);
  if ((o && (l = i), !!H.isString(l))) {
    if (H.isString(s)) return l.indexOf(s) !== -1;
    if (H.isRegExp(s)) return s.test(l);
  }
}
function b2(n) {
  return n
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (l, i, s) => i.toUpperCase() + s);
}
function x2(n, l) {
  const i = H.toCamelCase(" " + l);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(n, s + i, {
      value: function (o, f, h) {
        return this[s].call(this, l, o, f, h);
      },
      configurable: !0,
    });
  });
}
let gt = class {
  constructor(l) {
    l && this.set(l);
  }
  set(l, i, s) {
    const o = this;
    function f(p, g, m) {
      const v = _r(g);
      if (!v) throw new Error("header name must be a non-empty string");
      const x = H.findKey(o, v);
      (!x || o[x] === void 0 || m === !0 || (m === void 0 && o[x] !== !1)) &&
        (o[x || g] = os(p));
    }
    const h = (p, g) => H.forEach(p, (m, v) => f(m, v, g));
    if (H.isPlainObject(l) || l instanceof this.constructor) h(l, i);
    else if (H.isString(l) && (l = l.trim()) && !v2(l)) h(p2(l), i);
    else if (H.isObject(l) && H.isIterable(l)) {
      let p = {},
        g,
        m;
      for (const v of l) {
        if (!H.isArray(v))
          throw TypeError("Object iterator must return a key-value pair");
        p[(m = v[0])] = (g = p[m])
          ? H.isArray(g)
            ? [...g, v[1]]
            : [g, v[1]]
          : v[1];
      }
      h(p, i);
    } else l != null && f(i, l, s);
    return this;
  }
  get(l, i) {
    if (((l = _r(l)), l)) {
      const s = H.findKey(this, l);
      if (s) {
        const o = this[s];
        if (!i) return o;
        if (i === !0) return g2(o);
        if (H.isFunction(i)) return i.call(this, o, s);
        if (H.isRegExp(i)) return i.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(l, i) {
    if (((l = _r(l)), l)) {
      const s = H.findKey(this, l);
      return !!(s && this[s] !== void 0 && (!i || yc(this, this[s], s, i)));
    }
    return !1;
  }
  delete(l, i) {
    const s = this;
    let o = !1;
    function f(h) {
      if (((h = _r(h)), h)) {
        const p = H.findKey(s, h);
        p && (!i || yc(s, s[p], p, i)) && (delete s[p], (o = !0));
      }
    }
    return H.isArray(l) ? l.forEach(f) : f(l), o;
  }
  clear(l) {
    const i = Object.keys(this);
    let s = i.length,
      o = !1;
    for (; s--; ) {
      const f = i[s];
      (!l || yc(this, this[f], f, l, !0)) && (delete this[f], (o = !0));
    }
    return o;
  }
  normalize(l) {
    const i = this,
      s = {};
    return (
      H.forEach(this, (o, f) => {
        const h = H.findKey(s, f);
        if (h) {
          (i[h] = os(o)), delete i[f];
          return;
        }
        const p = l ? b2(f) : String(f).trim();
        p !== f && delete i[f], (i[p] = os(o)), (s[p] = !0);
      }),
      this
    );
  }
  concat(...l) {
    return this.constructor.concat(this, ...l);
  }
  toJSON(l) {
    const i = Object.create(null);
    return (
      H.forEach(this, (s, o) => {
        s != null && s !== !1 && (i[o] = l && H.isArray(s) ? s.join(", ") : s);
      }),
      i
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([l, i]) => l + ": " + i).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(l) {
    return l instanceof this ? l : new this(l);
  }
  static concat(l, ...i) {
    const s = new this(l);
    return i.forEach((o) => s.set(o)), s;
  }
  static accessor(l) {
    const s = (this[Ey] = this[Ey] = { accessors: {} }).accessors,
      o = this.prototype;
    function f(h) {
      const p = _r(h);
      s[p] || (x2(o, h), (s[p] = !0));
    }
    return H.isArray(l) ? l.forEach(f) : f(l), this;
  }
};
gt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
H.reduceDescriptors(gt.prototype, ({ value: n }, l) => {
  let i = l[0].toUpperCase() + l.slice(1);
  return {
    get: () => n,
    set(s) {
      this[i] = s;
    },
  };
});
H.freezeMethods(gt);
function pc(n, l) {
  const i = this || Br,
    s = l || i,
    o = gt.from(s.headers);
  let f = s.data;
  return (
    H.forEach(n, function (p) {
      f = p.call(i, f, o.normalize(), l ? l.status : void 0);
    }),
    o.normalize(),
    f
  );
}
function L0(n) {
  return !!(n && n.__CANCEL__);
}
function Sl(n, l, i) {
  oe.call(this, n ?? "canceled", oe.ERR_CANCELED, l, i),
    (this.name = "CanceledError");
}
H.inherits(Sl, oe, { __CANCEL__: !0 });
function k0(n, l, i) {
  const s = i.config.validateStatus;
  !i.status || !s || s(i.status)
    ? n(i)
    : l(
        new oe(
          "Request failed with status code " + i.status,
          [oe.ERR_BAD_REQUEST, oe.ERR_BAD_RESPONSE][
            Math.floor(i.status / 100) - 4
          ],
          i.config,
          i.request,
          i
        )
      );
}
function S2(n) {
  const l = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return (l && l[1]) || "";
}
function w2(n, l) {
  n = n || 10;
  const i = new Array(n),
    s = new Array(n);
  let o = 0,
    f = 0,
    h;
  return (
    (l = l !== void 0 ? l : 1e3),
    function (g) {
      const m = Date.now(),
        v = s[f];
      h || (h = m), (i[o] = g), (s[o] = m);
      let x = f,
        w = 0;
      for (; x !== o; ) (w += i[x++]), (x = x % n);
      if (((o = (o + 1) % n), o === f && (f = (f + 1) % n), m - h < l)) return;
      const C = v && m - v;
      return C ? Math.round((w * 1e3) / C) : void 0;
    }
  );
}
function _2(n, l) {
  let i = 0,
    s = 1e3 / l,
    o,
    f;
  const h = (m, v = Date.now()) => {
    (i = v), (o = null), f && (clearTimeout(f), (f = null)), n.apply(null, m);
  };
  return [
    (...m) => {
      const v = Date.now(),
        x = v - i;
      x >= s
        ? h(m, v)
        : ((o = m),
          f ||
            (f = setTimeout(() => {
              (f = null), h(o);
            }, s - x)));
    },
    () => o && h(o),
  ];
}
const ms = (n, l, i = 3) => {
    let s = 0;
    const o = w2(50, 250);
    return _2((f) => {
      const h = f.loaded,
        p = f.lengthComputable ? f.total : void 0,
        g = h - s,
        m = o(g),
        v = h <= p;
      s = h;
      const x = {
        loaded: h,
        total: p,
        progress: p ? h / p : void 0,
        bytes: g,
        rate: m || void 0,
        estimated: m && p && v ? (p - h) / m : void 0,
        event: f,
        lengthComputable: p != null,
        [l ? "download" : "upload"]: !0,
      };
      n(x);
    }, i);
  },
  Ty = (n, l) => {
    const i = n != null;
    return [(s) => l[0]({ lengthComputable: i, total: n, loaded: s }), l[1]];
  },
  Ny =
    (n) =>
    (...l) =>
      H.asap(() => n(...l)),
  E2 = rt.hasStandardBrowserEnv
    ? ((n, l) => (i) => (
        (i = new URL(i, rt.origin)),
        n.protocol === i.protocol &&
          n.host === i.host &&
          (l || n.port === i.port)
      ))(
        new URL(rt.origin),
        rt.navigator && /(msie|trident)/i.test(rt.navigator.userAgent)
      )
    : () => !0,
  T2 = rt.hasStandardBrowserEnv
    ? {
        write(n, l, i, s, o, f) {
          const h = [n + "=" + encodeURIComponent(l)];
          H.isNumber(i) && h.push("expires=" + new Date(i).toGMTString()),
            H.isString(s) && h.push("path=" + s),
            H.isString(o) && h.push("domain=" + o),
            f === !0 && h.push("secure"),
            (document.cookie = h.join("; "));
        },
        read(n) {
          const l = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return l ? decodeURIComponent(l[3]) : null;
        },
        remove(n) {
          this.write(n, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function N2(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function j2(n, l) {
  return l ? n.replace(/\/?\/$/, "") + "/" + l.replace(/^\/+/, "") : n;
}
function B0(n, l, i) {
  let s = !N2(l);
  return n && (s || i == !1) ? j2(n, l) : l;
}
const jy = (n) => (n instanceof gt ? { ...n } : n);
function En(n, l) {
  l = l || {};
  const i = {};
  function s(m, v, x, w) {
    return H.isPlainObject(m) && H.isPlainObject(v)
      ? H.merge.call({ caseless: w }, m, v)
      : H.isPlainObject(v)
        ? H.merge({}, v)
        : H.isArray(v)
          ? v.slice()
          : v;
  }
  function o(m, v, x, w) {
    if (H.isUndefined(v)) {
      if (!H.isUndefined(m)) return s(void 0, m, x, w);
    } else return s(m, v, x, w);
  }
  function f(m, v) {
    if (!H.isUndefined(v)) return s(void 0, v);
  }
  function h(m, v) {
    if (H.isUndefined(v)) {
      if (!H.isUndefined(m)) return s(void 0, m);
    } else return s(void 0, v);
  }
  function p(m, v, x) {
    if (x in l) return s(m, v);
    if (x in n) return s(void 0, m);
  }
  const g = {
    url: f,
    method: f,
    data: f,
    baseURL: h,
    transformRequest: h,
    transformResponse: h,
    paramsSerializer: h,
    timeout: h,
    timeoutMessage: h,
    withCredentials: h,
    withXSRFToken: h,
    adapter: h,
    responseType: h,
    xsrfCookieName: h,
    xsrfHeaderName: h,
    onUploadProgress: h,
    onDownloadProgress: h,
    decompress: h,
    maxContentLength: h,
    maxBodyLength: h,
    beforeRedirect: h,
    transport: h,
    httpAgent: h,
    httpsAgent: h,
    cancelToken: h,
    socketPath: h,
    responseEncoding: h,
    validateStatus: p,
    headers: (m, v, x) => o(jy(m), jy(v), x, !0),
  };
  return (
    H.forEach(Object.keys(Object.assign({}, n, l)), function (v) {
      const x = g[v] || o,
        w = x(n[v], l[v], v);
      (H.isUndefined(w) && x !== p) || (i[v] = w);
    }),
    i
  );
}
const H0 = (n) => {
    const l = En({}, n);
    let {
      data: i,
      withXSRFToken: s,
      xsrfHeaderName: o,
      xsrfCookieName: f,
      headers: h,
      auth: p,
    } = l;
    (l.headers = h = gt.from(h)),
      (l.url = D0(
        B0(l.baseURL, l.url, l.allowAbsoluteUrls),
        n.params,
        n.paramsSerializer
      )),
      p &&
        h.set(
          "Authorization",
          "Basic " +
            btoa(
              (p.username || "") +
                ":" +
                (p.password ? unescape(encodeURIComponent(p.password)) : "")
            )
        );
    let g;
    if (H.isFormData(i)) {
      if (rt.hasStandardBrowserEnv || rt.hasStandardBrowserWebWorkerEnv)
        h.setContentType(void 0);
      else if ((g = h.getContentType()) !== !1) {
        const [m, ...v] = g
          ? g
              .split(";")
              .map((x) => x.trim())
              .filter(Boolean)
          : [];
        h.setContentType([m || "multipart/form-data", ...v].join("; "));
      }
    }
    if (
      rt.hasStandardBrowserEnv &&
      (s && H.isFunction(s) && (s = s(l)), s || (s !== !1 && E2(l.url)))
    ) {
      const m = o && f && T2.read(f);
      m && h.set(o, m);
    }
    return l;
  },
  R2 = typeof XMLHttpRequest < "u",
  O2 =
    R2 &&
    function (n) {
      return new Promise(function (i, s) {
        const o = H0(n);
        let f = o.data;
        const h = gt.from(o.headers).normalize();
        let { responseType: p, onUploadProgress: g, onDownloadProgress: m } = o,
          v,
          x,
          w,
          C,
          E;
        function S() {
          C && C(),
            E && E(),
            o.cancelToken && o.cancelToken.unsubscribe(v),
            o.signal && o.signal.removeEventListener("abort", v);
        }
        let R = new XMLHttpRequest();
        R.open(o.method.toUpperCase(), o.url, !0), (R.timeout = o.timeout);
        function O() {
          if (!R) return;
          const B = gt.from(
              "getAllResponseHeaders" in R && R.getAllResponseHeaders()
            ),
            q = {
              data:
                !p || p === "text" || p === "json"
                  ? R.responseText
                  : R.response,
              status: R.status,
              statusText: R.statusText,
              headers: B,
              config: n,
              request: R,
            };
          k0(
            function (K) {
              i(K), S();
            },
            function (K) {
              s(K), S();
            },
            q
          ),
            (R = null);
        }
        "onloadend" in R
          ? (R.onloadend = O)
          : (R.onreadystatechange = function () {
              !R ||
                R.readyState !== 4 ||
                (R.status === 0 &&
                  !(R.responseURL && R.responseURL.indexOf("file:") === 0)) ||
                setTimeout(O);
            }),
          (R.onabort = function () {
            R &&
              (s(new oe("Request aborted", oe.ECONNABORTED, n, R)), (R = null));
          }),
          (R.onerror = function () {
            s(new oe("Network Error", oe.ERR_NETWORK, n, R)), (R = null);
          }),
          (R.ontimeout = function () {
            let G = o.timeout
              ? "timeout of " + o.timeout + "ms exceeded"
              : "timeout exceeded";
            const q = o.transitional || z0;
            o.timeoutErrorMessage && (G = o.timeoutErrorMessage),
              s(
                new oe(
                  G,
                  q.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED,
                  n,
                  R
                )
              ),
              (R = null);
          }),
          f === void 0 && h.setContentType(null),
          "setRequestHeader" in R &&
            H.forEach(h.toJSON(), function (G, q) {
              R.setRequestHeader(q, G);
            }),
          H.isUndefined(o.withCredentials) ||
            (R.withCredentials = !!o.withCredentials),
          p && p !== "json" && (R.responseType = o.responseType),
          m && (([w, E] = ms(m, !0)), R.addEventListener("progress", w)),
          g &&
            R.upload &&
            (([x, C] = ms(g)),
            R.upload.addEventListener("progress", x),
            R.upload.addEventListener("loadend", C)),
          (o.cancelToken || o.signal) &&
            ((v = (B) => {
              R &&
                (s(!B || B.type ? new Sl(null, n, R) : B),
                R.abort(),
                (R = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(v),
            o.signal &&
              (o.signal.aborted ? v() : o.signal.addEventListener("abort", v)));
        const M = S2(o.url);
        if (M && rt.protocols.indexOf(M) === -1) {
          s(new oe("Unsupported protocol " + M + ":", oe.ERR_BAD_REQUEST, n));
          return;
        }
        R.send(f || null);
      });
    },
  A2 = (n, l) => {
    const { length: i } = (n = n ? n.filter(Boolean) : []);
    if (l || i) {
      let s = new AbortController(),
        o;
      const f = function (m) {
        if (!o) {
          (o = !0), p();
          const v = m instanceof Error ? m : this.reason;
          s.abort(
            v instanceof oe ? v : new Sl(v instanceof Error ? v.message : v)
          );
        }
      };
      let h =
        l &&
        setTimeout(() => {
          (h = null), f(new oe(`timeout ${l} of ms exceeded`, oe.ETIMEDOUT));
        }, l);
      const p = () => {
        n &&
          (h && clearTimeout(h),
          (h = null),
          n.forEach((m) => {
            m.unsubscribe
              ? m.unsubscribe(f)
              : m.removeEventListener("abort", f);
          }),
          (n = null));
      };
      n.forEach((m) => m.addEventListener("abort", f));
      const { signal: g } = s;
      return (g.unsubscribe = () => H.asap(p)), g;
    }
  },
  C2 = function* (n, l) {
    let i = n.byteLength;
    if (i < l) {
      yield n;
      return;
    }
    let s = 0,
      o;
    for (; s < i; ) (o = s + l), yield n.slice(s, o), (s = o);
  },
  M2 = async function* (n, l) {
    for await (const i of D2(n)) yield* C2(i, l);
  },
  D2 = async function* (n) {
    if (n[Symbol.asyncIterator]) {
      yield* n;
      return;
    }
    const l = n.getReader();
    try {
      for (;;) {
        const { done: i, value: s } = await l.read();
        if (i) break;
        yield s;
      }
    } finally {
      await l.cancel();
    }
  },
  Ry = (n, l, i, s) => {
    const o = M2(n, l);
    let f = 0,
      h,
      p = (g) => {
        h || ((h = !0), s && s(g));
      };
    return new ReadableStream(
      {
        async pull(g) {
          try {
            const { done: m, value: v } = await o.next();
            if (m) {
              p(), g.close();
              return;
            }
            let x = v.byteLength;
            if (i) {
              let w = (f += x);
              i(w);
            }
            g.enqueue(new Uint8Array(v));
          } catch (m) {
            throw (p(m), m);
          }
        },
        cancel(g) {
          return p(g), o.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  zs =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  q0 = zs && typeof ReadableStream == "function",
  z2 =
    zs &&
    (typeof TextEncoder == "function"
      ? (
          (n) => (l) =>
            n.encode(l)
        )(new TextEncoder())
      : async (n) => new Uint8Array(await new Response(n).arrayBuffer())),
  Y0 = (n, ...l) => {
    try {
      return !!n(...l);
    } catch {
      return !1;
    }
  },
  U2 =
    q0 &&
    Y0(() => {
      let n = !1;
      const l = new Request(rt.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (n = !0), "half";
        },
      }).headers.has("Content-Type");
      return n && !l;
    }),
  Oy = 64 * 1024,
  zc = q0 && Y0(() => H.isReadableStream(new Response("").body)),
  ys = { stream: zc && ((n) => n.body) };
zs &&
  ((n) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((l) => {
      !ys[l] &&
        (ys[l] = H.isFunction(n[l])
          ? (i) => i[l]()
          : (i, s) => {
              throw new oe(
                `Response type '${l}' is not supported`,
                oe.ERR_NOT_SUPPORT,
                s
              );
            });
    });
  })(new Response());
const L2 = async (n) => {
    if (n == null) return 0;
    if (H.isBlob(n)) return n.size;
    if (H.isSpecCompliantForm(n))
      return (
        await new Request(rt.origin, { method: "POST", body: n }).arrayBuffer()
      ).byteLength;
    if (H.isArrayBufferView(n) || H.isArrayBuffer(n)) return n.byteLength;
    if ((H.isURLSearchParams(n) && (n = n + ""), H.isString(n)))
      return (await z2(n)).byteLength;
  },
  k2 = async (n, l) => {
    const i = H.toFiniteNumber(n.getContentLength());
    return i ?? L2(l);
  },
  B2 =
    zs &&
    (async (n) => {
      let {
        url: l,
        method: i,
        data: s,
        signal: o,
        cancelToken: f,
        timeout: h,
        onDownloadProgress: p,
        onUploadProgress: g,
        responseType: m,
        headers: v,
        withCredentials: x = "same-origin",
        fetchOptions: w,
      } = H0(n);
      m = m ? (m + "").toLowerCase() : "text";
      let C = A2([o, f && f.toAbortSignal()], h),
        E;
      const S =
        C &&
        C.unsubscribe &&
        (() => {
          C.unsubscribe();
        });
      let R;
      try {
        if (
          g &&
          U2 &&
          i !== "get" &&
          i !== "head" &&
          (R = await k2(v, s)) !== 0
        ) {
          let q = new Request(l, { method: "POST", body: s, duplex: "half" }),
            Z;
          if (
            (H.isFormData(s) &&
              (Z = q.headers.get("content-type")) &&
              v.setContentType(Z),
            q.body)
          ) {
            const [K, P] = Ty(R, ms(Ny(g)));
            s = Ry(q.body, Oy, K, P);
          }
        }
        H.isString(x) || (x = x ? "include" : "omit");
        const O = "credentials" in Request.prototype;
        E = new Request(l, {
          ...w,
          signal: C,
          method: i.toUpperCase(),
          headers: v.normalize().toJSON(),
          body: s,
          duplex: "half",
          credentials: O ? x : void 0,
        });
        let M = await fetch(E);
        const B = zc && (m === "stream" || m === "response");
        if (zc && (p || (B && S))) {
          const q = {};
          ["status", "statusText", "headers"].forEach((F) => {
            q[F] = M[F];
          });
          const Z = H.toFiniteNumber(M.headers.get("content-length")),
            [K, P] = (p && Ty(Z, ms(Ny(p), !0))) || [];
          M = new Response(
            Ry(M.body, Oy, K, () => {
              P && P(), S && S();
            }),
            q
          );
        }
        m = m || "text";
        let G = await ys[H.findKey(ys, m) || "text"](M, n);
        return (
          !B && S && S(),
          await new Promise((q, Z) => {
            k0(q, Z, {
              data: G,
              headers: gt.from(M.headers),
              status: M.status,
              statusText: M.statusText,
              config: n,
              request: E,
            });
          })
        );
      } catch (O) {
        throw (
          (S && S(),
          O && O.name === "TypeError" && /Load failed|fetch/i.test(O.message)
            ? Object.assign(new oe("Network Error", oe.ERR_NETWORK, n, E), {
                cause: O.cause || O,
              })
            : oe.from(O, O && O.code, n, E))
        );
      }
    }),
  Uc = { http: Ix, xhr: O2, fetch: B2 };
H.forEach(Uc, (n, l) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: l });
    } catch {}
    Object.defineProperty(n, "adapterName", { value: l });
  }
});
const Ay = (n) => `- ${n}`,
  H2 = (n) => H.isFunction(n) || n === null || n === !1,
  X0 = {
    getAdapter: (n) => {
      n = H.isArray(n) ? n : [n];
      const { length: l } = n;
      let i, s;
      const o = {};
      for (let f = 0; f < l; f++) {
        i = n[f];
        let h;
        if (
          ((s = i),
          !H2(i) && ((s = Uc[(h = String(i)).toLowerCase()]), s === void 0))
        )
          throw new oe(`Unknown adapter '${h}'`);
        if (s) break;
        o[h || "#" + f] = s;
      }
      if (!s) {
        const f = Object.entries(o).map(
          ([p, g]) =>
            `adapter ${p} ` +
            (g === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let h = l
          ? f.length > 1
            ? `since :
` +
              f.map(Ay).join(`
`)
            : " " + Ay(f[0])
          : "as no adapter specified";
        throw new oe(
          "There is no suitable adapter to dispatch the request " + h,
          "ERR_NOT_SUPPORT"
        );
      }
      return s;
    },
    adapters: Uc,
  };
function gc(n) {
  if (
    (n.cancelToken && n.cancelToken.throwIfRequested(),
    n.signal && n.signal.aborted)
  )
    throw new Sl(null, n);
}
function Cy(n) {
  return (
    gc(n),
    (n.headers = gt.from(n.headers)),
    (n.data = pc.call(n, n.transformRequest)),
    ["post", "put", "patch"].indexOf(n.method) !== -1 &&
      n.headers.setContentType("application/x-www-form-urlencoded", !1),
    X0.getAdapter(n.adapter || Br.adapter)(n).then(
      function (s) {
        return (
          gc(n),
          (s.data = pc.call(n, n.transformResponse, s)),
          (s.headers = gt.from(s.headers)),
          s
        );
      },
      function (s) {
        return (
          L0(s) ||
            (gc(n),
            s &&
              s.response &&
              ((s.response.data = pc.call(n, n.transformResponse, s.response)),
              (s.response.headers = gt.from(s.response.headers)))),
          Promise.reject(s)
        );
      }
    )
  );
}
const G0 = "1.9.0",
  Us = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (n, l) => {
    Us[n] = function (s) {
      return typeof s === n || "a" + (l < 1 ? "n " : " ") + n;
    };
  }
);
const My = {};
Us.transitional = function (l, i, s) {
  function o(f, h) {
    return (
      "[Axios v" +
      G0 +
      "] Transitional option '" +
      f +
      "'" +
      h +
      (s ? ". " + s : "")
    );
  }
  return (f, h, p) => {
    if (l === !1)
      throw new oe(
        o(h, " has been removed" + (i ? " in " + i : "")),
        oe.ERR_DEPRECATED
      );
    return (
      i &&
        !My[h] &&
        ((My[h] = !0),
        console.warn(
          o(
            h,
            " has been deprecated since v" +
              i +
              " and will be removed in the near future"
          )
        )),
      l ? l(f, h, p) : !0
    );
  };
};
Us.spelling = function (l) {
  return (i, s) => (console.warn(`${s} is likely a misspelling of ${l}`), !0);
};
function q2(n, l, i) {
  if (typeof n != "object")
    throw new oe("options must be an object", oe.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(n);
  let o = s.length;
  for (; o-- > 0; ) {
    const f = s[o],
      h = l[f];
    if (h) {
      const p = n[f],
        g = p === void 0 || h(p, f, n);
      if (g !== !0)
        throw new oe("option " + f + " must be " + g, oe.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0) throw new oe("Unknown option " + f, oe.ERR_BAD_OPTION);
  }
}
const cs = { assertOptions: q2, validators: Us },
  aa = cs.validators;
let wn = class {
  constructor(l) {
    (this.defaults = l || {}),
      (this.interceptors = { request: new _y(), response: new _y() });
  }
  async request(l, i) {
    try {
      return await this._request(l, i);
    } catch (s) {
      if (s instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const f = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack
            ? f &&
              !String(s.stack).endsWith(f.replace(/^.+\n.+\n/, "")) &&
              (s.stack +=
                `
` + f)
            : (s.stack = f);
        } catch {}
      }
      throw s;
    }
  }
  _request(l, i) {
    typeof l == "string" ? ((i = i || {}), (i.url = l)) : (i = l || {}),
      (i = En(this.defaults, i));
    const { transitional: s, paramsSerializer: o, headers: f } = i;
    s !== void 0 &&
      cs.assertOptions(
        s,
        {
          silentJSONParsing: aa.transitional(aa.boolean),
          forcedJSONParsing: aa.transitional(aa.boolean),
          clarifyTimeoutError: aa.transitional(aa.boolean),
        },
        !1
      ),
      o != null &&
        (H.isFunction(o)
          ? (i.paramsSerializer = { serialize: o })
          : cs.assertOptions(
              o,
              { encode: aa.function, serialize: aa.function },
              !0
            )),
      i.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (i.allowAbsoluteUrls = !0)),
      cs.assertOptions(
        i,
        {
          baseUrl: aa.spelling("baseURL"),
          withXsrfToken: aa.spelling("withXSRFToken"),
        },
        !0
      ),
      (i.method = (i.method || this.defaults.method || "get").toLowerCase());
    let h = f && H.merge(f.common, f[i.method]);
    f &&
      H.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (E) => {
          delete f[E];
        }
      ),
      (i.headers = gt.concat(h, f));
    const p = [];
    let g = !0;
    this.interceptors.request.forEach(function (S) {
      (typeof S.runWhen == "function" && S.runWhen(i) === !1) ||
        ((g = g && S.synchronous), p.unshift(S.fulfilled, S.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function (S) {
      m.push(S.fulfilled, S.rejected);
    });
    let v,
      x = 0,
      w;
    if (!g) {
      const E = [Cy.bind(this), void 0];
      for (
        E.unshift.apply(E, p),
          E.push.apply(E, m),
          w = E.length,
          v = Promise.resolve(i);
        x < w;

      )
        v = v.then(E[x++], E[x++]);
      return v;
    }
    w = p.length;
    let C = i;
    for (x = 0; x < w; ) {
      const E = p[x++],
        S = p[x++];
      try {
        C = E(C);
      } catch (R) {
        S.call(this, R);
        break;
      }
    }
    try {
      v = Cy.call(this, C);
    } catch (E) {
      return Promise.reject(E);
    }
    for (x = 0, w = m.length; x < w; ) v = v.then(m[x++], m[x++]);
    return v;
  }
  getUri(l) {
    l = En(this.defaults, l);
    const i = B0(l.baseURL, l.url, l.allowAbsoluteUrls);
    return D0(i, l.params, l.paramsSerializer);
  }
};
H.forEach(["delete", "get", "head", "options"], function (l) {
  wn.prototype[l] = function (i, s) {
    return this.request(
      En(s || {}, { method: l, url: i, data: (s || {}).data })
    );
  };
});
H.forEach(["post", "put", "patch"], function (l) {
  function i(s) {
    return function (f, h, p) {
      return this.request(
        En(p || {}, {
          method: l,
          headers: s ? { "Content-Type": "multipart/form-data" } : {},
          url: f,
          data: h,
        })
      );
    };
  }
  (wn.prototype[l] = i()), (wn.prototype[l + "Form"] = i(!0));
});
let Y2 = class Q0 {
  constructor(l) {
    if (typeof l != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function (f) {
      i = f;
    });
    const s = this;
    this.promise.then((o) => {
      if (!s._listeners) return;
      let f = s._listeners.length;
      for (; f-- > 0; ) s._listeners[f](o);
      s._listeners = null;
    }),
      (this.promise.then = (o) => {
        let f;
        const h = new Promise((p) => {
          s.subscribe(p), (f = p);
        }).then(o);
        return (
          (h.cancel = function () {
            s.unsubscribe(f);
          }),
          h
        );
      }),
      l(function (f, h, p) {
        s.reason || ((s.reason = new Sl(f, h, p)), i(s.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(l) {
    if (this.reason) {
      l(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(l) : (this._listeners = [l]);
  }
  unsubscribe(l) {
    if (!this._listeners) return;
    const i = this._listeners.indexOf(l);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const l = new AbortController(),
      i = (s) => {
        l.abort(s);
      };
    return (
      this.subscribe(i),
      (l.signal.unsubscribe = () => this.unsubscribe(i)),
      l.signal
    );
  }
  static source() {
    let l;
    return {
      token: new Q0(function (o) {
        l = o;
      }),
      cancel: l,
    };
  }
};
function X2(n) {
  return function (i) {
    return n.apply(null, i);
  };
}
function G2(n) {
  return H.isObject(n) && n.isAxiosError === !0;
}
const Lc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Lc).forEach(([n, l]) => {
  Lc[l] = n;
});
function V0(n) {
  const l = new wn(n),
    i = S0(wn.prototype.request, l);
  return (
    H.extend(i, wn.prototype, l, { allOwnKeys: !0 }),
    H.extend(i, l, null, { allOwnKeys: !0 }),
    (i.create = function (o) {
      return V0(En(n, o));
    }),
    i
  );
}
const Ye = V0(Br);
Ye.Axios = wn;
Ye.CanceledError = Sl;
Ye.CancelToken = Y2;
Ye.isCancel = L0;
Ye.VERSION = G0;
Ye.toFormData = Ds;
Ye.AxiosError = oe;
Ye.Cancel = Ye.CanceledError;
Ye.all = function (l) {
  return Promise.all(l);
};
Ye.spread = X2;
Ye.isAxiosError = G2;
Ye.mergeConfig = En;
Ye.AxiosHeaders = gt;
Ye.formToJSON = (n) => U0(H.isHTMLForm(n) ? new FormData(n) : n);
Ye.getAdapter = X0.getAdapter;
Ye.HttpStatusCode = Lc;
Ye.default = Ye;
const {
    Axios: YE,
    AxiosError: XE,
    CanceledError: GE,
    isCancel: QE,
    CancelToken: VE,
    VERSION: ZE,
    all: KE,
    Cancel: $E,
    isAxiosError: JE,
    spread: PE,
    toFormData: FE,
    AxiosHeaders: WE,
    HttpStatusCode: IE,
    formToJSON: eT,
    getAdapter: tT,
    mergeConfig: aT,
  } = Ye,
  Qe = Ye.create({
    baseURL: "http://localhost:8000/api/v1",
    timeout: 3e4,
    headers: { Authorization: ` Bearer ${localStorage.getItem("token")}` },
  }),
  Q2 = "An internal error occurred",
  Wa = (n) => {
    const [l, i] = T.useState(null),
      [s, o] = T.useState(!0),
      [f, h] = T.useState(null),
      p = T.useCallback(async () => {
        var v, x;
        o(!0), h(null);
        const g = new AbortController(),
          m = g.signal;
        try {
          const w = await Qe.get(n, { signal: m });
          w.data && i(w.data);
        } catch (w) {
          h(
            ((x =
              (v = w == null ? void 0 : w.response) == null
                ? void 0
                : v.data) == null
              ? void 0
              : x.message) || Q2
          );
        } finally {
          o(!1);
        }
        return () => g.abort();
      }, [n]);
    return (
      T.useEffect(() => {
        p();
      }, [p]),
      { data: l, loading: s, error: f, refetch: p }
    );
  },
  ot = be.forwardRef(
    (
      {
        label: n = "",
        name: l = "",
        error: i = "",
        className: s = "",
        optional: o = "",
        ...f
      },
      h
    ) => {
      const p = T.useId();
      return d.jsxs("div", {
        className: "flex-1",
        children: [
          n &&
            d.jsxs("label", {
              htmlFor: `${p}-input`,
              className: "block text-sm capitalize my-1",
              children: [
                n,
                o &&
                  d.jsx("span", {
                    className:
                      "text-xs pl-1 lowercase font-light text-gray-500",
                    children: o,
                  }),
              ],
            }),
          d.jsx("input", {
            id: `${p}-input`,
            name: l,
            className: `peer border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 ${s}`,
            ref: h,
            required: !0,
            type: f.type || "text",
            ...f,
          }),
          i &&
            d.jsxs("p", {
              className:
                "invisible peer-invalid:visible pl-2 py-1 text-red-600 text-xs",
              children: ['Please provide a valid "', l, '"'],
            }),
        ],
      });
    }
  ),
  Ia = ({ className: n = "" }) =>
    d.jsx("div", {
      className: `flex items-center justify-center ${n || "min-h-screen"}`,
      children: d.jsxs("div", {
        className: "flex space-x-2",
        children: [
          d.jsx("div", {
            className: "w-3 h-3 bg-indigo-500 rounded-full animate-pulse",
          }),
          d.jsx("div", {
            className: "w-3 h-3 bg-indigo-500 rounded-full animate-pulse",
            style: { animationDelay: "0.2s" },
          }),
          d.jsx("div", {
            className: "w-3 h-3 bg-indigo-500 rounded-full animate-pulse",
            style: { animationDelay: "0.4s" },
          }),
        ],
      }),
    }),
  V2 = ({ page: n, totalPages: l, handlePageChange: i = () => {} }) => {
    const s = [];
    return (
      s.push(
        d.jsx(
          "button",
          {
            className: `svg-btn ${n === 1 ? "bg-indigo-600 text-white" : "border border-neutral-200 hover:bg-gray-50"} rounded-lg`,
            onClick: () => i(1),
            children: "1",
          },
          1
        )
      ),
      l >= 2 &&
        s.push(
          d.jsx(
            "button",
            {
              className: `svg-btn ${n === 2 ? "bg-indigo-600 text-white" : "border border-neutral-200 hover:bg-gray-50"} rounded-lg`,
              onClick: () => i(2),
              children: "2",
            },
            2
          )
        ),
      l > 2 &&
        n > 3 &&
        s.push(
          d.jsx(
            "span",
            {
              className: "svg-btn border border-neutral-200 rounded-lg",
              children: "...",
            },
            "ellipsis"
          )
        ),
      n > 2 &&
        n < l &&
        s.push(
          d.jsx(
            "button",
            {
              className: "svg-btn bg-indigo-600 text-white rounded-lg",
              onClick: () => i(n),
              children: n,
            },
            n
          )
        ),
      l > 2 &&
        s.push(
          d.jsx(
            "button",
            {
              className: `svg-btn ${n === l ? "bg-indigo-600 text-white" : "border border-neutral-200 hover:bg-gray-50"} rounded-lg`,
              onClick: () => i(l),
              children: l,
            },
            l
          )
        ),
      s
    );
  },
  Z2 = be.forwardRef(
    (
      {
        label: n,
        name: l,
        options: i = [{ value: "", label: "" }],
        className: s = "",
        ...o
      },
      f
    ) => {
      const h = T.useId();
      return d.jsxs("div", {
        children: [
          n &&
            d.jsx("label", {
              htmlFor: `${h}-input`,
              className: "block text-sm capitalize my-1",
              children: n,
            }),
          d.jsx("select", {
            id: `${h}-input`,
            name: l,
            className: `peer border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 ${s}`,
            ref: f,
            ...o,
            children: i.map((p) =>
              d.jsx("option", { value: p.value, children: p.label }, p.value)
            ),
          }),
        ],
      });
    }
  ),
  K2 = ({ rating: n, size: l = 14, totalStars: i = 5, className: s = "" }) =>
    d.jsx("div", {
      className: `flex gap-1 ${s}`,
      children: Array.from({ length: i }, (o, f) =>
        f < n
          ? d.jsx(
              Or,
              { size: l, className: "text-yellow-400", fill: "currentColor" },
              f
            )
          : d.jsx(Or, { size: 16, className: "text-gray-300" }, f)
      ),
    }),
  $2 = ({
    totalStars: n = 5,
    defaultRating: l = 0,
    onChange: i = () => {},
    className: s = "",
  }) => {
    const [o, f] = T.useState(null),
      [h, p] = T.useState();
    T.useEffect(() => {
      p(l);
    }, [l]);
    const g = (m) => {
      p(m + 1), i == null || i(m + 1);
    };
    return d.jsx("div", {
      className: `flex gap-1 cursor-pointer ${s}`,
      children: Array.from({ length: n }, (m, v) => {
        const x = (o ?? h) > v;
        return d.jsx(
          Or,
          {
            size: 26,
            onMouseEnter: () => f(v + 1),
            onMouseLeave: () => f(null),
            onClick: () => g(v),
            className: `transition-all ${x ? "text-yellow-400" : "text-gray-300"}`,
            fill: x ? "currentColor" : "none",
          },
          v
        );
      }),
    });
  },
  J2 = ({ src: n, placeholder: l, fallback: i, ...s }) => {
    const [o, f] = T.useState(l || ""),
      h = T.useRef(null);
    return (
      T.useEffect(() => {
        const p = new Image();
        p.src = n;
        const g = () => {
          f(n);
        };
        if (((p.onload = g), (p.onerror = () => i && f(i)), h.current)) {
          const m = new IntersectionObserver(
            (v) => {
              v[0].isIntersecting && (g(), m.disconnect());
            },
            { threshold: 0.1 }
          );
          return m.observe(h.current), () => m.disconnect();
        } else g();
      }, [n, i]),
      d.jsx("img", { ref: h, src: o, ...s })
    );
  },
  P2 = () =>
    d.jsxs("footer", {
      id: "footer",
      className: "bg-gray-900 text-gray-300",
      children: [
        d.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
          children: d.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
            children: [
              d.jsxs("div", {
                className: "space-y-4",
                children: [
                  d.jsx("h3", {
                    className: "text-xl font-bold text-white mb-4",
                    children: "Cartify",
                  }),
                  d.jsx("p", {
                    className: "text-sm",
                    children:
                      "Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.",
                  }),
                  d.jsxs("div", {
                    className: "flex space-x-4",
                    children: [
                      d.jsx("a", {
                        href: "#",
                        className:
                          "hover:text-white transition-colors duration-300",
                        children: d.jsx("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: d.jsx("path", {
                            d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                          }),
                        }),
                      }),
                      d.jsx("a", {
                        href: "#",
                        className:
                          "hover:text-white transition-colors duration-300",
                        children: d.jsx("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: d.jsx("path", {
                            d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                          }),
                        }),
                      }),
                      d.jsx("a", {
                        href: "#",
                        className:
                          "hover:text-white transition-colors duration-300",
                        children: d.jsxs("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: [
                            d.jsx("rect", {
                              x: "2",
                              y: "2",
                              width: "20",
                              height: "20",
                              rx: "5",
                              ry: "5",
                            }),
                            d.jsx("path", {
                              d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
                            }),
                            d.jsx("line", {
                              x1: "17.5",
                              y1: "6.5",
                              x2: "17.51",
                              y2: "6.5",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              d.jsxs("div", {
                children: [
                  d.jsx("h4", {
                    className: "text-lg font-semibold text-white mb-4",
                    children: "Quick Links",
                  }),
                  d.jsxs("ul", {
                    className: "space-y-2",
                    children: [
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Home",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Shop",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Categories",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Brands",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "About Us",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Contact",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              d.jsxs("div", {
                children: [
                  d.jsx("h4", {
                    className: "text-lg font-semibold text-white mb-4",
                    children: "Customer Service",
                  }),
                  d.jsxs("ul", {
                    className: "space-y-2",
                    children: [
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "My Account",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Track Order",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Wishlist",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Returns Policy",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "Shipping Info",
                        }),
                      }),
                      d.jsx("li", {
                        children: d.jsx("a", {
                          href: "#",
                          className:
                            "hover:text-white transition-colors duration-300",
                          children: "FAQs",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              d.jsxs("div", {
                children: [
                  d.jsx("h4", {
                    className: "text-lg font-semibold text-white mb-4",
                    children: "Newsletter",
                  }),
                  d.jsx("p", {
                    className: "text-sm mb-4",
                    children:
                      "Subscribe to our newsletter for the latest updates and exclusive offers.",
                  }),
                  d.jsx("form", {
                    className: "space-y-3",
                    children: d.jsxs("div", {
                      className: "flex",
                      children: [
                        d.jsx("input", {
                          type: "email",
                          placeholder: "Your email address",
                          className:
                            "w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 border-gray-700",
                        }),
                        d.jsx("button", {
                          type: "submit",
                          className:
                            "px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-300",
                          children: d.jsxs("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                              d.jsx("line", {
                                x1: "22",
                                y1: "2",
                                x2: "11",
                                y2: "13",
                              }),
                              d.jsx("polygon", {
                                points: "22 2 15 22 11 13 2 9 22 2",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
        d.jsx("div", {
          className: "border-t border-gray-800",
          children: d.jsx("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
            children: d.jsxs("div", {
              className: "md:flex md:items-center md:justify-between",
              children: [
                d.jsx("div", {
                  className: "text-sm",
                  children: d.jsx("p", {
                    children: "© 2024 Cartify. All rights reserved.",
                  }),
                }),
                d.jsx("div", {
                  className: "mt-4 md:mt-0",
                  children: d.jsxs("div", {
                    className: "flex space-x-6",
                    children: [
                      d.jsx("a", {
                        href: "#",
                        className:
                          "hover:text-white transition-colors duration-300",
                        children: "Privacy Policy",
                      }),
                      d.jsx("a", {
                        href: "#",
                        className:
                          "hover:text-white transition-colors duration-300",
                        children: "Terms of Service",
                      }),
                      d.jsx("a", {
                        href: "#",
                        className:
                          "hover:text-white transition-colors duration-300",
                        children: "Cookie Policy",
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
var vc = { exports: {} },
  bc = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dy;
function F2() {
  if (Dy) return bc;
  Dy = 1;
  var n = Ts();
  function l(g, m) {
    return (g === m && (g !== 0 || 1 / g === 1 / m)) || (g !== g && m !== m);
  }
  var i = typeof Object.is == "function" ? Object.is : l,
    s = n.useSyncExternalStore,
    o = n.useRef,
    f = n.useEffect,
    h = n.useMemo,
    p = n.useDebugValue;
  return (
    (bc.useSyncExternalStoreWithSelector = function (g, m, v, x, w) {
      var C = o(null);
      if (C.current === null) {
        var E = { hasValue: !1, value: null };
        C.current = E;
      } else E = C.current;
      C = h(
        function () {
          function R(q) {
            if (!O) {
              if (((O = !0), (M = q), (q = x(q)), w !== void 0 && E.hasValue)) {
                var Z = E.value;
                if (w(Z, q)) return (B = Z);
              }
              return (B = q);
            }
            if (((Z = B), i(M, q))) return Z;
            var K = x(q);
            return w !== void 0 && w(Z, K) ? ((M = q), Z) : ((M = q), (B = K));
          }
          var O = !1,
            M,
            B,
            G = v === void 0 ? null : v;
          return [
            function () {
              return R(m());
            },
            G === null
              ? void 0
              : function () {
                  return R(G());
                },
          ];
        },
        [m, v, x, w]
      );
      var S = s(g, C[0], C[1]);
      return (
        f(
          function () {
            (E.hasValue = !0), (E.value = S);
          },
          [S]
        ),
        p(S),
        S
      );
    }),
    bc
  );
}
var zy;
function W2() {
  return zy || ((zy = 1), (vc.exports = F2())), vc.exports;
}
var I2 = W2();
function eS(n) {
  n();
}
function tS() {
  let n = null,
    l = null;
  return {
    clear() {
      (n = null), (l = null);
    },
    notify() {
      eS(() => {
        let i = n;
        for (; i; ) i.callback(), (i = i.next);
      });
    },
    get() {
      const i = [];
      let s = n;
      for (; s; ) i.push(s), (s = s.next);
      return i;
    },
    subscribe(i) {
      let s = !0;
      const o = (l = { callback: i, next: null, prev: l });
      return (
        o.prev ? (o.prev.next = o) : (n = o),
        function () {
          !s ||
            n === null ||
            ((s = !1),
            o.next ? (o.next.prev = o.prev) : (l = o.prev),
            o.prev ? (o.prev.next = o.next) : (n = o.next));
        }
      );
    },
  };
}
var Uy = { notify() {}, get: () => [] };
function aS(n, l) {
  let i,
    s = Uy,
    o = 0,
    f = !1;
  function h(S) {
    v();
    const R = s.subscribe(S);
    let O = !1;
    return () => {
      O || ((O = !0), R(), x());
    };
  }
  function p() {
    s.notify();
  }
  function g() {
    E.onStateChange && E.onStateChange();
  }
  function m() {
    return f;
  }
  function v() {
    o++, i || ((i = n.subscribe(g)), (s = tS()));
  }
  function x() {
    o--, i && o === 0 && (i(), (i = void 0), s.clear(), (s = Uy));
  }
  function w() {
    f || ((f = !0), v());
  }
  function C() {
    f && ((f = !1), x());
  }
  const E = {
    addNestedSub: h,
    notifyNestedSubs: p,
    handleChangeWrapper: g,
    isSubscribed: m,
    trySubscribe: w,
    tryUnsubscribe: C,
    getListeners: () => s,
  };
  return E;
}
var nS = () =>
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  lS = nS(),
  rS = () => typeof navigator < "u" && navigator.product === "ReactNative",
  iS = rS(),
  sS = () => (lS || iS ? T.useLayoutEffect : T.useEffect),
  uS = sS(),
  xc = Symbol.for("react-redux-context"),
  Sc = typeof globalThis < "u" ? globalThis : {};
function oS() {
  if (!T.createContext) return {};
  const n = Sc[xc] ?? (Sc[xc] = new Map());
  let l = n.get(T.createContext);
  return l || ((l = T.createContext(null)), n.set(T.createContext, l)), l;
}
var Pa = oS();
function cS(n) {
  const { children: l, context: i, serverState: s, store: o } = n,
    f = T.useMemo(() => {
      const g = aS(o);
      return {
        store: o,
        subscription: g,
        getServerState: s ? () => s : void 0,
      };
    }, [o, s]),
    h = T.useMemo(() => o.getState(), [o]);
  uS(() => {
    const { subscription: g } = f;
    return (
      (g.onStateChange = g.notifyNestedSubs),
      g.trySubscribe(),
      h !== o.getState() && g.notifyNestedSubs(),
      () => {
        g.tryUnsubscribe(), (g.onStateChange = void 0);
      }
    );
  }, [f, h]);
  const p = i || Pa;
  return T.createElement(p.Provider, { value: f }, l);
}
var fS = cS;
function lf(n = Pa) {
  return function () {
    return T.useContext(n);
  };
}
var Z0 = lf();
function K0(n = Pa) {
  const l = n === Pa ? Z0 : lf(n),
    i = () => {
      const { store: s } = l();
      return s;
    };
  return Object.assign(i, { withTypes: () => i }), i;
}
var dS = K0();
function hS(n = Pa) {
  const l = n === Pa ? dS : K0(n),
    i = () => l().dispatch;
  return Object.assign(i, { withTypes: () => i }), i;
}
var $0 = hS(),
  mS = (n, l) => n === l;
function yS(n = Pa) {
  const l = n === Pa ? Z0 : lf(n),
    i = (s, o = {}) => {
      const { equalityFn: f = mS } =
          typeof o == "function" ? { equalityFn: o } : o,
        h = l(),
        { store: p, subscription: g, getServerState: m } = h;
      T.useRef(!0);
      const v = T.useCallback(
          {
            [s.name](w) {
              return s(w);
            },
          }[s.name],
          [s]
        ),
        x = I2.useSyncExternalStoreWithSelector(
          g.addNestedSub,
          p.getState,
          m || p.getState,
          v,
          f
        );
      return T.useDebugValue(x), x;
    };
  return Object.assign(i, { withTypes: () => i }), i;
}
var Zt = yS();
const ps = () => {
  const [n, l] = be.useState(!1),
    i = be.useRef(null);
  return (
    be.useEffect(() => {
      const s = (o) => {
        i.current && !i.current.contains(o.target) && l(!1);
      };
      return (
        document.addEventListener("mousedown", s),
        () => {
          document.removeEventListener("mousedown", s);
        }
      );
    }, []),
    { isOpen: n, setIsOpen: l, dropdownRef: i }
  );
};
function J0(n) {
  var l,
    i,
    s = "";
  if (typeof n == "string" || typeof n == "number") s += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var o = n.length;
      for (l = 0; l < o; l++)
        n[l] && (i = J0(n[l])) && (s && (s += " "), (s += i));
    } else for (i in n) n[i] && (s && (s += " "), (s += i));
  return s;
}
function _n() {
  for (var n, l, i = 0, s = "", o = arguments.length; i < o; i++)
    (n = arguments[i]) && (l = J0(n)) && (s && (s += " "), (s += l));
  return s;
}
function pS(n) {
  if (typeof document > "u") return;
  let l = document.head || document.getElementsByTagName("head")[0],
    i = document.createElement("style");
  (i.type = "text/css"),
    l.firstChild ? l.insertBefore(i, l.firstChild) : l.appendChild(i),
    i.styleSheet
      ? (i.styleSheet.cssText = n)
      : i.appendChild(document.createTextNode(n));
}
pS(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var Hr = (n) => typeof n == "number" && !isNaN(n),
  Tn = (n) => typeof n == "string",
  wa = (n) => typeof n == "function",
  gS = (n) => Tn(n) || Hr(n),
  kc = (n) => (Tn(n) || wa(n) ? n : null),
  vS = (n, l) => (n === !1 || (Hr(n) && n > 0) ? n : l),
  Bc = (n) => T.isValidElement(n) || Tn(n) || wa(n) || Hr(n);
function bS(n, l, i = 300) {
  let { scrollHeight: s, style: o } = n;
  requestAnimationFrame(() => {
    (o.minHeight = "initial"),
      (o.height = s + "px"),
      (o.transition = `all ${i}ms`),
      requestAnimationFrame(() => {
        (o.height = "0"), (o.padding = "0"), (o.margin = "0"), setTimeout(l, i);
      });
  });
}
function xS({
  enter: n,
  exit: l,
  appendPosition: i = !1,
  collapse: s = !0,
  collapseDuration: o = 300,
}) {
  return function ({
    children: f,
    position: h,
    preventExitTransition: p,
    done: g,
    nodeRef: m,
    isIn: v,
    playToast: x,
  }) {
    let w = i ? `${n}--${h}` : n,
      C = i ? `${l}--${h}` : l,
      E = T.useRef(0);
    return (
      T.useLayoutEffect(() => {
        let S = m.current,
          R = w.split(" "),
          O = (M) => {
            M.target === m.current &&
              (x(),
              S.removeEventListener("animationend", O),
              S.removeEventListener("animationcancel", O),
              E.current === 0 &&
                M.type !== "animationcancel" &&
                S.classList.remove(...R));
          };
        S.classList.add(...R),
          S.addEventListener("animationend", O),
          S.addEventListener("animationcancel", O);
      }, []),
      T.useEffect(() => {
        let S = m.current,
          R = () => {
            S.removeEventListener("animationend", R), s ? bS(S, g, o) : g();
          };
        v ||
          (p
            ? R()
            : ((E.current = 1),
              (S.className += ` ${C}`),
              S.addEventListener("animationend", R)));
      }, [v]),
      be.createElement(be.Fragment, null, f)
    );
  };
}
function Ly(n, l) {
  return {
    content: P0(n.content, n.props),
    containerId: n.props.containerId,
    id: n.props.toastId,
    theme: n.props.theme,
    type: n.props.type,
    data: n.props.data || {},
    isLoading: n.props.isLoading,
    icon: n.props.icon,
    reason: n.removalReason,
    status: l,
  };
}
function P0(n, l, i = !1) {
  return T.isValidElement(n) && !Tn(n.type)
    ? T.cloneElement(n, {
        closeToast: l.closeToast,
        toastProps: l,
        data: l.data,
        isPaused: i,
      })
    : wa(n)
      ? n({
          closeToast: l.closeToast,
          toastProps: l,
          data: l.data,
          isPaused: i,
        })
      : n;
}
function SS({ closeToast: n, theme: l, ariaLabel: i = "close" }) {
  return be.createElement(
    "button",
    {
      className: `Toastify__close-button Toastify__close-button--${l}`,
      type: "button",
      onClick: (s) => {
        s.stopPropagation(), n(!0);
      },
      "aria-label": i,
    },
    be.createElement(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 14 16" },
      be.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
      })
    )
  );
}
function wS({
  delay: n,
  isRunning: l,
  closeToast: i,
  type: s = "default",
  hide: o,
  className: f,
  controlledProgress: h,
  progress: p,
  rtl: g,
  isIn: m,
  theme: v,
}) {
  let x = o || (h && p === 0),
    w = {
      animationDuration: `${n}ms`,
      animationPlayState: l ? "running" : "paused",
    };
  h && (w.transform = `scaleX(${p})`);
  let C = _n(
      "Toastify__progress-bar",
      h
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      `Toastify__progress-bar-theme--${v}`,
      `Toastify__progress-bar--${s}`,
      { "Toastify__progress-bar--rtl": g }
    ),
    E = wa(f) ? f({ rtl: g, type: s, defaultClassName: C }) : _n(C, f),
    S = {
      [h && p >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
        h && p < 1
          ? null
          : () => {
              m && i();
            },
    };
  return be.createElement(
    "div",
    { className: "Toastify__progress-bar--wrp", "data-hidden": x },
    be.createElement("div", {
      className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${v} Toastify__progress-bar--${s}`,
    }),
    be.createElement("div", {
      role: "progressbar",
      "aria-hidden": x ? "true" : "false",
      "aria-label": "notification timer",
      className: E,
      style: w,
      ...S,
    })
  );
}
var _S = 1,
  F0 = () => `${_S++}`;
function ES(n, l, i) {
  let s = 1,
    o = 0,
    f = [],
    h = [],
    p = l,
    g = new Map(),
    m = new Set(),
    v = (M) => (m.add(M), () => m.delete(M)),
    x = () => {
      (h = Array.from(g.values())), m.forEach((M) => M());
    },
    w = ({ containerId: M, toastId: B, updateId: G }) => {
      let q = M ? M !== n : n !== 1,
        Z = g.has(B) && G == null;
      return q || Z;
    },
    C = (M, B) => {
      g.forEach((G) => {
        var q;
        (B == null || B === G.props.toastId) &&
          ((q = G.toggle) == null || q.call(G, M));
      });
    },
    E = (M) => {
      var B, G;
      (G = (B = M.props) == null ? void 0 : B.onClose) == null ||
        G.call(B, M.removalReason),
        (M.isActive = !1);
    },
    S = (M) => {
      if (M == null) g.forEach(E);
      else {
        let B = g.get(M);
        B && E(B);
      }
      x();
    },
    R = () => {
      (o -= f.length), (f = []);
    },
    O = (M) => {
      var B, G;
      let { toastId: q, updateId: Z } = M.props,
        K = Z == null;
      M.staleId && g.delete(M.staleId),
        (M.isActive = !0),
        g.set(q, M),
        x(),
        i(Ly(M, K ? "added" : "updated")),
        K && ((G = (B = M.props).onOpen) == null || G.call(B));
    };
  return {
    id: n,
    props: p,
    observe: v,
    toggle: C,
    removeToast: S,
    toasts: g,
    clearQueue: R,
    buildToast: (M, B) => {
      if (w(B)) return;
      let { toastId: G, updateId: q, data: Z, staleId: K, delay: P } = B,
        F = q == null;
      F && o++;
      let ee = {
        ...p,
        style: p.toastStyle,
        key: s++,
        ...Object.fromEntries(
          Object.entries(B).filter(([Te, it]) => it != null)
        ),
        toastId: G,
        updateId: q,
        data: Z,
        isIn: !1,
        className: kc(B.className || p.toastClassName),
        progressClassName: kc(B.progressClassName || p.progressClassName),
        autoClose: B.isLoading ? !1 : vS(B.autoClose, p.autoClose),
        closeToast(Te) {
          (g.get(G).removalReason = Te), S(G);
        },
        deleteToast() {
          let Te = g.get(G);
          if (Te != null) {
            if (
              (i(Ly(Te, "removed")),
              g.delete(G),
              o--,
              o < 0 && (o = 0),
              f.length > 0)
            ) {
              O(f.shift());
              return;
            }
            x();
          }
        },
      };
      (ee.closeButton = p.closeButton),
        B.closeButton === !1 || Bc(B.closeButton)
          ? (ee.closeButton = B.closeButton)
          : B.closeButton === !0 &&
            (ee.closeButton = Bc(p.closeButton) ? p.closeButton : !0);
      let Ee = { content: M, props: ee, staleId: K };
      p.limit && p.limit > 0 && o > p.limit && F
        ? f.push(Ee)
        : Hr(P)
          ? setTimeout(() => {
              O(Ee);
            }, P)
          : O(Ee);
    },
    setProps(M) {
      p = M;
    },
    setToggle: (M, B) => {
      let G = g.get(M);
      G && (G.toggle = B);
    },
    isToastActive: (M) => {
      var B;
      return (B = g.get(M)) == null ? void 0 : B.isActive;
    },
    getSnapshot: () => h,
  };
}
var ct = new Map(),
  Cr = [],
  Hc = new Set(),
  TS = (n) => Hc.forEach((l) => l(n)),
  W0 = () => ct.size > 0;
function NS() {
  Cr.forEach((n) => ep(n.content, n.options)), (Cr = []);
}
var jS = (n, { containerId: l }) => {
  var i;
  return (i = ct.get(l || 1)) == null ? void 0 : i.toasts.get(n);
};
function I0(n, l) {
  var i;
  if (l) return !!((i = ct.get(l)) != null && i.isToastActive(n));
  let s = !1;
  return (
    ct.forEach((o) => {
      o.isToastActive(n) && (s = !0);
    }),
    s
  );
}
function RS(n) {
  if (!W0()) {
    Cr = Cr.filter((l) => n != null && l.options.toastId !== n);
    return;
  }
  if (n == null || gS(n))
    ct.forEach((l) => {
      l.removeToast(n);
    });
  else if (n && ("containerId" in n || "id" in n)) {
    let l = ct.get(n.containerId);
    l
      ? l.removeToast(n.id)
      : ct.forEach((i) => {
          i.removeToast(n.id);
        });
  }
}
var OS = (n = {}) => {
  ct.forEach((l) => {
    l.props.limit &&
      (!n.containerId || l.id === n.containerId) &&
      l.clearQueue();
  });
};
function ep(n, l) {
  Bc(n) &&
    (W0() || Cr.push({ content: n, options: l }),
    ct.forEach((i) => {
      i.buildToast(n, l);
    }));
}
function AS(n) {
  var l;
  (l = ct.get(n.containerId || 1)) == null || l.setToggle(n.id, n.fn);
}
function tp(n, l) {
  ct.forEach((i) => {
    (l == null ||
      !(l != null && l.containerId) ||
      (l == null ? void 0 : l.containerId) === i.id) &&
      i.toggle(n, l == null ? void 0 : l.id);
  });
}
function CS(n) {
  let l = n.containerId || 1;
  return {
    subscribe(i) {
      let s = ES(l, n, TS);
      ct.set(l, s);
      let o = s.observe(i);
      return (
        NS(),
        () => {
          o(), ct.delete(l);
        }
      );
    },
    setProps(i) {
      var s;
      (s = ct.get(l)) == null || s.setProps(i);
    },
    getSnapshot() {
      var i;
      return (i = ct.get(l)) == null ? void 0 : i.getSnapshot();
    },
  };
}
function MS(n) {
  return (
    Hc.add(n),
    () => {
      Hc.delete(n);
    }
  );
}
function DS(n) {
  return n && (Tn(n.toastId) || Hr(n.toastId)) ? n.toastId : F0();
}
function qr(n, l) {
  return ep(n, l), l.toastId;
}
function Ls(n, l) {
  return { ...l, type: (l && l.type) || n, toastId: DS(l) };
}
function ks(n) {
  return (l, i) => qr(l, Ls(n, i));
}
function ne(n, l) {
  return qr(n, Ls("default", l));
}
ne.loading = (n, l) =>
  qr(
    n,
    Ls("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...l,
    })
  );
function zS(n, { pending: l, error: i, success: s }, o) {
  let f;
  l && (f = Tn(l) ? ne.loading(l, o) : ne.loading(l.render, { ...o, ...l }));
  let h = {
      isLoading: null,
      autoClose: null,
      closeOnClick: null,
      closeButton: null,
      draggable: null,
    },
    p = (m, v, x) => {
      if (v == null) {
        ne.dismiss(f);
        return;
      }
      let w = { type: m, ...h, ...o, data: x },
        C = Tn(v) ? { render: v } : v;
      return f ? ne.update(f, { ...w, ...C }) : ne(C.render, { ...w, ...C }), x;
    },
    g = wa(n) ? n() : n;
  return g.then((m) => p("success", s, m)).catch((m) => p("error", i, m)), g;
}
ne.promise = zS;
ne.success = ks("success");
ne.info = ks("info");
ne.error = ks("error");
ne.warning = ks("warning");
ne.warn = ne.warning;
ne.dark = (n, l) => qr(n, Ls("default", { theme: "dark", ...l }));
function US(n) {
  RS(n);
}
ne.dismiss = US;
ne.clearWaitingQueue = OS;
ne.isActive = I0;
ne.update = (n, l = {}) => {
  let i = jS(n, l);
  if (i) {
    let { props: s, content: o } = i,
      f = { delay: 100, ...s, ...l, toastId: l.toastId || n, updateId: F0() };
    f.toastId !== n && (f.staleId = n);
    let h = f.render || o;
    delete f.render, qr(h, f);
  }
};
ne.done = (n) => {
  ne.update(n, { progress: 1 });
};
ne.onChange = MS;
ne.play = (n) => tp(!0, n);
ne.pause = (n) => tp(!1, n);
function LS(n) {
  var l;
  let { subscribe: i, getSnapshot: s, setProps: o } = T.useRef(CS(n)).current;
  o(n);
  let f = (l = T.useSyncExternalStore(i, s, s)) == null ? void 0 : l.slice();
  function h(p) {
    if (!f) return [];
    let g = new Map();
    return (
      n.newestOnTop && f.reverse(),
      f.forEach((m) => {
        let { position: v } = m.props;
        g.has(v) || g.set(v, []), g.get(v).push(m);
      }),
      Array.from(g, (m) => p(m[0], m[1]))
    );
  }
  return {
    getToastToRender: h,
    isToastActive: I0,
    count: f == null ? void 0 : f.length,
  };
}
function kS(n) {
  let [l, i] = T.useState(!1),
    [s, o] = T.useState(!1),
    f = T.useRef(null),
    h = T.useRef({
      start: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      didMove: !1,
    }).current,
    {
      autoClose: p,
      pauseOnHover: g,
      closeToast: m,
      onClick: v,
      closeOnClick: x,
    } = n;
  AS({ id: n.toastId, containerId: n.containerId, fn: i }),
    T.useEffect(() => {
      if (n.pauseOnFocusLoss)
        return (
          w(),
          () => {
            C();
          }
        );
    }, [n.pauseOnFocusLoss]);
  function w() {
    document.hasFocus() || O(),
      window.addEventListener("focus", R),
      window.addEventListener("blur", O);
  }
  function C() {
    window.removeEventListener("focus", R),
      window.removeEventListener("blur", O);
  }
  function E(K) {
    if (n.draggable === !0 || n.draggable === K.pointerType) {
      M();
      let P = f.current;
      (h.canCloseOnClick = !0),
        (h.canDrag = !0),
        (P.style.transition = "none"),
        n.draggableDirection === "x"
          ? ((h.start = K.clientX),
            (h.removalDistance = P.offsetWidth * (n.draggablePercent / 100)))
          : ((h.start = K.clientY),
            (h.removalDistance =
              (P.offsetHeight *
                (n.draggablePercent === 80
                  ? n.draggablePercent * 1.5
                  : n.draggablePercent)) /
              100));
    }
  }
  function S(K) {
    let {
      top: P,
      bottom: F,
      left: ee,
      right: Ee,
    } = f.current.getBoundingClientRect();
    K.nativeEvent.type !== "touchend" &&
    n.pauseOnHover &&
    K.clientX >= ee &&
    K.clientX <= Ee &&
    K.clientY >= P &&
    K.clientY <= F
      ? O()
      : R();
  }
  function R() {
    i(!0);
  }
  function O() {
    i(!1);
  }
  function M() {
    (h.didMove = !1),
      document.addEventListener("pointermove", G),
      document.addEventListener("pointerup", q);
  }
  function B() {
    document.removeEventListener("pointermove", G),
      document.removeEventListener("pointerup", q);
  }
  function G(K) {
    let P = f.current;
    if (h.canDrag && P) {
      (h.didMove = !0),
        l && O(),
        n.draggableDirection === "x"
          ? (h.delta = K.clientX - h.start)
          : (h.delta = K.clientY - h.start),
        h.start !== K.clientX && (h.canCloseOnClick = !1);
      let F =
        n.draggableDirection === "x"
          ? `${h.delta}px, var(--y)`
          : `0, calc(${h.delta}px + var(--y))`;
      (P.style.transform = `translate3d(${F},0)`),
        (P.style.opacity = `${1 - Math.abs(h.delta / h.removalDistance)}`);
    }
  }
  function q() {
    B();
    let K = f.current;
    if (h.canDrag && h.didMove && K) {
      if (((h.canDrag = !1), Math.abs(h.delta) > h.removalDistance)) {
        o(!0), n.closeToast(!0), n.collapseAll();
        return;
      }
      (K.style.transition = "transform 0.2s, opacity 0.2s"),
        K.style.removeProperty("transform"),
        K.style.removeProperty("opacity");
    }
  }
  let Z = { onPointerDown: E, onPointerUp: S };
  return (
    p && g && ((Z.onMouseEnter = O), n.stacked || (Z.onMouseLeave = R)),
    x &&
      (Z.onClick = (K) => {
        v && v(K), h.canCloseOnClick && m(!0);
      }),
    {
      playToast: R,
      pauseToast: O,
      isRunning: l,
      preventExitTransition: s,
      toastRef: f,
      eventHandlers: Z,
    }
  );
}
var BS = typeof window < "u" ? T.useLayoutEffect : T.useEffect,
  Bs = ({ theme: n, type: l, isLoading: i, ...s }) =>
    be.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill:
        n === "colored" ? "currentColor" : `var(--toastify-icon-color-${l})`,
      ...s,
    });
function HS(n) {
  return be.createElement(
    Bs,
    { ...n },
    be.createElement("path", {
      d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
    })
  );
}
function qS(n) {
  return be.createElement(
    Bs,
    { ...n },
    be.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
    })
  );
}
function YS(n) {
  return be.createElement(
    Bs,
    { ...n },
    be.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
    })
  );
}
function XS(n) {
  return be.createElement(
    Bs,
    { ...n },
    be.createElement("path", {
      d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
    })
  );
}
function GS() {
  return be.createElement("div", { className: "Toastify__spinner" });
}
var qc = { info: qS, warning: HS, success: YS, error: XS, spinner: GS },
  QS = (n) => n in qc;
function VS({ theme: n, type: l, isLoading: i, icon: s }) {
  let o = null,
    f = { theme: n, type: l };
  return (
    s === !1 ||
      (wa(s)
        ? (o = s({ ...f, isLoading: i }))
        : T.isValidElement(s)
          ? (o = T.cloneElement(s, f))
          : i
            ? (o = qc.spinner())
            : QS(l) && (o = qc[l](f))),
    o
  );
}
var ZS = (n) => {
    let {
        isRunning: l,
        preventExitTransition: i,
        toastRef: s,
        eventHandlers: o,
        playToast: f,
      } = kS(n),
      {
        closeButton: h,
        children: p,
        autoClose: g,
        onClick: m,
        type: v,
        hideProgressBar: x,
        closeToast: w,
        transition: C,
        position: E,
        className: S,
        style: R,
        progressClassName: O,
        updateId: M,
        role: B,
        progress: G,
        rtl: q,
        toastId: Z,
        deleteToast: K,
        isIn: P,
        isLoading: F,
        closeOnClick: ee,
        theme: Ee,
        ariaLabel: Te,
      } = n,
      it = _n(
        "Toastify__toast",
        `Toastify__toast-theme--${Ee}`,
        `Toastify__toast--${v}`,
        { "Toastify__toast--rtl": q },
        { "Toastify__toast--close-on-click": ee }
      ),
      At = wa(S)
        ? S({ rtl: q, position: E, type: v, defaultClassName: it })
        : _n(it, S),
      Le = VS(n),
      U = !!G || !g,
      $ = { closeToast: w, type: v, theme: Ee },
      te = null;
    return (
      h === !1 ||
        (wa(h)
          ? (te = h($))
          : T.isValidElement(h)
            ? (te = T.cloneElement(h, $))
            : (te = SS($))),
      be.createElement(
        C,
        {
          isIn: P,
          done: K,
          position: E,
          preventExitTransition: i,
          nodeRef: s,
          playToast: f,
        },
        be.createElement(
          "div",
          {
            id: Z,
            tabIndex: 0,
            onClick: m,
            "data-in": P,
            className: At,
            ...o,
            style: R,
            ref: s,
            ...(P && { role: B, "aria-label": Te }),
          },
          Le != null &&
            be.createElement(
              "div",
              {
                className: _n("Toastify__toast-icon", {
                  "Toastify--animate-icon Toastify__zoom-enter": !F,
                }),
              },
              Le
            ),
          P0(p, n, !l),
          te,
          !n.customProgressBar &&
            be.createElement(wS, {
              ...(M && !U ? { key: `p-${M}` } : {}),
              rtl: q,
              theme: Ee,
              delay: g,
              isRunning: l,
              isIn: P,
              closeToast: w,
              hide: x,
              type: v,
              className: O,
              controlledProgress: U,
              progress: G || 0,
            })
        )
      )
    );
  },
  KS = (n, l = !1) => ({
    enter: `Toastify--animate Toastify__${n}-enter`,
    exit: `Toastify--animate Toastify__${n}-exit`,
    appendPosition: l,
  }),
  $S = xS(KS("bounce", !0)),
  JS = {
    position: "top-right",
    transition: $S,
    autoClose: 5e3,
    closeButton: !0,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    draggable: "touch",
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light",
    "aria-label": "Notifications Alt+T",
    hotKeys: (n) => n.altKey && n.code === "KeyT",
  };
function PS(n) {
  let l = { ...JS, ...n },
    i = n.stacked,
    [s, o] = T.useState(!0),
    f = T.useRef(null),
    { getToastToRender: h, isToastActive: p, count: g } = LS(l),
    { className: m, style: v, rtl: x, containerId: w, hotKeys: C } = l;
  function E(R) {
    let O = _n("Toastify__toast-container", `Toastify__toast-container--${R}`, {
      "Toastify__toast-container--rtl": x,
    });
    return wa(m)
      ? m({ position: R, rtl: x, defaultClassName: O })
      : _n(O, kc(m));
  }
  function S() {
    i && (o(!0), ne.play());
  }
  return (
    BS(() => {
      var R;
      if (i) {
        let O = f.current.querySelectorAll('[data-in="true"]'),
          M = 12,
          B = (R = l.position) == null ? void 0 : R.includes("top"),
          G = 0,
          q = 0;
        Array.from(O)
          .reverse()
          .forEach((Z, K) => {
            let P = Z;
            P.classList.add("Toastify__toast--stacked"),
              K > 0 && (P.dataset.collapsed = `${s}`),
              P.dataset.pos || (P.dataset.pos = B ? "top" : "bot");
            let F = G * (s ? 0.2 : 1) + (s ? 0 : M * K);
            P.style.setProperty("--y", `${B ? F : F * -1}px`),
              P.style.setProperty("--g", `${M}`),
              P.style.setProperty("--s", `${1 - (s ? q : 0)}`),
              (G += P.offsetHeight),
              (q += 0.025);
          });
      }
    }, [s, g, i]),
    T.useEffect(() => {
      function R(O) {
        var M;
        let B = f.current;
        C(O) &&
          ((M = B.querySelector('[tabIndex="0"]')) == null || M.focus(),
          o(!1),
          ne.pause()),
          O.key === "Escape" &&
            (document.activeElement === B ||
              (B != null && B.contains(document.activeElement))) &&
            (o(!0), ne.play());
      }
      return (
        document.addEventListener("keydown", R),
        () => {
          document.removeEventListener("keydown", R);
        }
      );
    }, [C]),
    be.createElement(
      "section",
      {
        ref: f,
        className: "Toastify",
        id: w,
        onMouseEnter: () => {
          i && (o(!1), ne.pause());
        },
        onMouseLeave: S,
        "aria-live": "polite",
        "aria-atomic": "false",
        "aria-relevant": "additions text",
        "aria-label": l["aria-label"],
      },
      h((R, O) => {
        let M = O.length ? { ...v } : { ...v, pointerEvents: "none" };
        return be.createElement(
          "div",
          {
            tabIndex: -1,
            className: E(R),
            "data-stacked": i,
            style: M,
            key: `c-${R}`,
          },
          O.map(({ content: B, props: G }) =>
            be.createElement(
              ZS,
              {
                ...G,
                stacked: i,
                collapseAll: S,
                isIn: p(G.toastId, G.containerId),
                key: `t-${G.key}`,
              },
              B
            )
          )
        );
      })
    )
  );
}
function tt(n) {
  return `Minified Redux error #${n}; visit https://redux.js.org/Errors?code=${n} for the full message or use the non-minified dev environment for full errors. `;
}
var FS = (typeof Symbol == "function" && Symbol.observable) || "@@observable",
  ky = FS,
  wc = () => Math.random().toString(36).substring(7).split("").join("."),
  WS = {
    INIT: `@@redux/INIT${wc()}`,
    REPLACE: `@@redux/REPLACE${wc()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${wc()}`,
  },
  gs = WS;
function rf(n) {
  if (typeof n != "object" || n === null) return !1;
  let l = n;
  for (; Object.getPrototypeOf(l) !== null; ) l = Object.getPrototypeOf(l);
  return Object.getPrototypeOf(n) === l || Object.getPrototypeOf(n) === null;
}
function ap(n, l, i) {
  if (typeof n != "function") throw new Error(tt(2));
  if (
    (typeof l == "function" && typeof i == "function") ||
    (typeof i == "function" && typeof arguments[3] == "function")
  )
    throw new Error(tt(0));
  if (
    (typeof l == "function" && typeof i > "u" && ((i = l), (l = void 0)),
    typeof i < "u")
  ) {
    if (typeof i != "function") throw new Error(tt(1));
    return i(ap)(n, l);
  }
  let s = n,
    o = l,
    f = new Map(),
    h = f,
    p = 0,
    g = !1;
  function m() {
    h === f &&
      ((h = new Map()),
      f.forEach((R, O) => {
        h.set(O, R);
      }));
  }
  function v() {
    if (g) throw new Error(tt(3));
    return o;
  }
  function x(R) {
    if (typeof R != "function") throw new Error(tt(4));
    if (g) throw new Error(tt(5));
    let O = !0;
    m();
    const M = p++;
    return (
      h.set(M, R),
      function () {
        if (O) {
          if (g) throw new Error(tt(6));
          (O = !1), m(), h.delete(M), (f = null);
        }
      }
    );
  }
  function w(R) {
    if (!rf(R)) throw new Error(tt(7));
    if (typeof R.type > "u") throw new Error(tt(8));
    if (typeof R.type != "string") throw new Error(tt(17));
    if (g) throw new Error(tt(9));
    try {
      (g = !0), (o = s(o, R));
    } finally {
      g = !1;
    }
    return (
      (f = h).forEach((M) => {
        M();
      }),
      R
    );
  }
  function C(R) {
    if (typeof R != "function") throw new Error(tt(10));
    (s = R), w({ type: gs.REPLACE });
  }
  function E() {
    const R = x;
    return {
      subscribe(O) {
        if (typeof O != "object" || O === null) throw new Error(tt(11));
        function M() {
          const G = O;
          G.next && G.next(v());
        }
        return M(), { unsubscribe: R(M) };
      },
      [ky]() {
        return this;
      },
    };
  }
  return (
    w({ type: gs.INIT }),
    { dispatch: w, subscribe: x, getState: v, replaceReducer: C, [ky]: E }
  );
}
function IS(n) {
  Object.keys(n).forEach((l) => {
    const i = n[l];
    if (typeof i(void 0, { type: gs.INIT }) > "u") throw new Error(tt(12));
    if (typeof i(void 0, { type: gs.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(tt(13));
  });
}
function ew(n) {
  const l = Object.keys(n),
    i = {};
  for (let f = 0; f < l.length; f++) {
    const h = l[f];
    typeof n[h] == "function" && (i[h] = n[h]);
  }
  const s = Object.keys(i);
  let o;
  try {
    IS(i);
  } catch (f) {
    o = f;
  }
  return function (h = {}, p) {
    if (o) throw o;
    let g = !1;
    const m = {};
    for (let v = 0; v < s.length; v++) {
      const x = s[v],
        w = i[x],
        C = h[x],
        E = w(C, p);
      if (typeof E > "u") throw (p && p.type, new Error(tt(14)));
      (m[x] = E), (g = g || E !== C);
    }
    return (g = g || s.length !== Object.keys(h).length), g ? m : h;
  };
}
function vs(...n) {
  return n.length === 0
    ? (l) => l
    : n.length === 1
      ? n[0]
      : n.reduce(
          (l, i) =>
            (...s) =>
              l(i(...s))
        );
}
function tw(...n) {
  return (l) => (i, s) => {
    const o = l(i, s);
    let f = () => {
      throw new Error(tt(15));
    };
    const h = { getState: o.getState, dispatch: (g, ...m) => f(g, ...m) },
      p = n.map((g) => g(h));
    return (f = vs(...p)(o.dispatch)), { ...o, dispatch: f };
  };
}
function aw(n) {
  return rf(n) && "type" in n && typeof n.type == "string";
}
var np = Symbol.for("immer-nothing"),
  By = Symbol.for("immer-draftable"),
  Rt = Symbol.for("immer-state");
function Vt(n, ...l) {
  throw new Error(
    `[Immer] minified error nr: ${n}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var pl = Object.getPrototypeOf;
function Nn(n) {
  return !!n && !!n[Rt];
}
function _a(n) {
  var l;
  return n
    ? lp(n) ||
        Array.isArray(n) ||
        !!n[By] ||
        !!((l = n.constructor) != null && l[By]) ||
        qs(n) ||
        Ys(n)
    : !1;
}
var nw = Object.prototype.constructor.toString();
function lp(n) {
  if (!n || typeof n != "object") return !1;
  const l = pl(n);
  if (l === null) return !0;
  const i = Object.hasOwnProperty.call(l, "constructor") && l.constructor;
  return i === Object
    ? !0
    : typeof i == "function" && Function.toString.call(i) === nw;
}
function bs(n, l) {
  Hs(n) === 0
    ? Reflect.ownKeys(n).forEach((i) => {
        l(i, n[i], n);
      })
    : n.forEach((i, s) => l(s, i, n));
}
function Hs(n) {
  const l = n[Rt];
  return l ? l.type_ : Array.isArray(n) ? 1 : qs(n) ? 2 : Ys(n) ? 3 : 0;
}
function Yc(n, l) {
  return Hs(n) === 2 ? n.has(l) : Object.prototype.hasOwnProperty.call(n, l);
}
function rp(n, l, i) {
  const s = Hs(n);
  s === 2 ? n.set(l, i) : s === 3 ? n.add(i) : (n[l] = i);
}
function lw(n, l) {
  return n === l ? n !== 0 || 1 / n === 1 / l : n !== n && l !== l;
}
function qs(n) {
  return n instanceof Map;
}
function Ys(n) {
  return n instanceof Set;
}
function bn(n) {
  return n.copy_ || n.base_;
}
function Xc(n, l) {
  if (qs(n)) return new Map(n);
  if (Ys(n)) return new Set(n);
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  const i = lp(n);
  if (l === !0 || (l === "class_only" && !i)) {
    const s = Object.getOwnPropertyDescriptors(n);
    delete s[Rt];
    let o = Reflect.ownKeys(s);
    for (let f = 0; f < o.length; f++) {
      const h = o[f],
        p = s[h];
      p.writable === !1 && ((p.writable = !0), (p.configurable = !0)),
        (p.get || p.set) &&
          (s[h] = {
            configurable: !0,
            writable: !0,
            enumerable: p.enumerable,
            value: n[h],
          });
    }
    return Object.create(pl(n), s);
  } else {
    const s = pl(n);
    if (s !== null && i) return { ...n };
    const o = Object.create(s);
    return Object.assign(o, n);
  }
}
function sf(n, l = !1) {
  return (
    Xs(n) ||
      Nn(n) ||
      !_a(n) ||
      (Hs(n) > 1 && (n.set = n.add = n.clear = n.delete = rw),
      Object.freeze(n),
      l && Object.entries(n).forEach(([i, s]) => sf(s, !0))),
    n
  );
}
function rw() {
  Vt(2);
}
function Xs(n) {
  return Object.isFrozen(n);
}
var iw = {};
function jn(n) {
  const l = iw[n];
  return l || Vt(0, n), l;
}
var Mr;
function ip() {
  return Mr;
}
function sw(n, l) {
  return {
    drafts_: [],
    parent_: n,
    immer_: l,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function Hy(n, l) {
  l &&
    (jn("Patches"),
    (n.patches_ = []),
    (n.inversePatches_ = []),
    (n.patchListener_ = l));
}
function Gc(n) {
  Qc(n), n.drafts_.forEach(uw), (n.drafts_ = null);
}
function Qc(n) {
  n === Mr && (Mr = n.parent_);
}
function qy(n) {
  return (Mr = sw(Mr, n));
}
function uw(n) {
  const l = n[Rt];
  l.type_ === 0 || l.type_ === 1 ? l.revoke_() : (l.revoked_ = !0);
}
function Yy(n, l) {
  l.unfinalizedDrafts_ = l.drafts_.length;
  const i = l.drafts_[0];
  return (
    n !== void 0 && n !== i
      ? (i[Rt].modified_ && (Gc(l), Vt(4)),
        _a(n) && ((n = xs(l, n)), l.parent_ || Ss(l, n)),
        l.patches_ &&
          jn("Patches").generateReplacementPatches_(
            i[Rt].base_,
            n,
            l.patches_,
            l.inversePatches_
          ))
      : (n = xs(l, i, [])),
    Gc(l),
    l.patches_ && l.patchListener_(l.patches_, l.inversePatches_),
    n !== np ? n : void 0
  );
}
function xs(n, l, i) {
  if (Xs(l)) return l;
  const s = l[Rt];
  if (!s) return bs(l, (o, f) => Xy(n, s, l, o, f, i)), l;
  if (s.scope_ !== n) return l;
  if (!s.modified_) return Ss(n, s.base_, !0), s.base_;
  if (!s.finalized_) {
    (s.finalized_ = !0), s.scope_.unfinalizedDrafts_--;
    const o = s.copy_;
    let f = o,
      h = !1;
    s.type_ === 3 && ((f = new Set(o)), o.clear(), (h = !0)),
      bs(f, (p, g) => Xy(n, s, o, p, g, i, h)),
      Ss(n, o, !1),
      i &&
        n.patches_ &&
        jn("Patches").generatePatches_(s, i, n.patches_, n.inversePatches_);
  }
  return s.copy_;
}
function Xy(n, l, i, s, o, f, h) {
  if (Nn(o)) {
    const p =
        f && l && l.type_ !== 3 && !Yc(l.assigned_, s) ? f.concat(s) : void 0,
      g = xs(n, o, p);
    if ((rp(i, s, g), Nn(g))) n.canAutoFreeze_ = !1;
    else return;
  } else h && i.add(o);
  if (_a(o) && !Xs(o)) {
    if (!n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1) return;
    xs(n, o),
      (!l || !l.scope_.parent_) &&
        typeof s != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(i, s) &&
        Ss(n, o);
  }
}
function Ss(n, l, i = !1) {
  !n.parent_ && n.immer_.autoFreeze_ && n.canAutoFreeze_ && sf(l, i);
}
function ow(n, l) {
  const i = Array.isArray(n),
    s = {
      type_: i ? 1 : 0,
      scope_: l ? l.scope_ : ip(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: l,
      base_: n,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let o = s,
    f = uf;
  i && ((o = [s]), (f = Dr));
  const { revoke: h, proxy: p } = Proxy.revocable(o, f);
  return (s.draft_ = p), (s.revoke_ = h), p;
}
var uf = {
    get(n, l) {
      if (l === Rt) return n;
      const i = bn(n);
      if (!Yc(i, l)) return cw(n, i, l);
      const s = i[l];
      return n.finalized_ || !_a(s)
        ? s
        : s === _c(n.base_, l)
          ? (Ec(n), (n.copy_[l] = Zc(s, n)))
          : s;
    },
    has(n, l) {
      return l in bn(n);
    },
    ownKeys(n) {
      return Reflect.ownKeys(bn(n));
    },
    set(n, l, i) {
      const s = sp(bn(n), l);
      if (s != null && s.set) return s.set.call(n.draft_, i), !0;
      if (!n.modified_) {
        const o = _c(bn(n), l),
          f = o == null ? void 0 : o[Rt];
        if (f && f.base_ === i)
          return (n.copy_[l] = i), (n.assigned_[l] = !1), !0;
        if (lw(i, o) && (i !== void 0 || Yc(n.base_, l))) return !0;
        Ec(n), Vc(n);
      }
      return (
        (n.copy_[l] === i && (i !== void 0 || l in n.copy_)) ||
          (Number.isNaN(i) && Number.isNaN(n.copy_[l])) ||
          ((n.copy_[l] = i), (n.assigned_[l] = !0)),
        !0
      );
    },
    deleteProperty(n, l) {
      return (
        _c(n.base_, l) !== void 0 || l in n.base_
          ? ((n.assigned_[l] = !1), Ec(n), Vc(n))
          : delete n.assigned_[l],
        n.copy_ && delete n.copy_[l],
        !0
      );
    },
    getOwnPropertyDescriptor(n, l) {
      const i = bn(n),
        s = Reflect.getOwnPropertyDescriptor(i, l);
      return (
        s && {
          writable: !0,
          configurable: n.type_ !== 1 || l !== "length",
          enumerable: s.enumerable,
          value: i[l],
        }
      );
    },
    defineProperty() {
      Vt(11);
    },
    getPrototypeOf(n) {
      return pl(n.base_);
    },
    setPrototypeOf() {
      Vt(12);
    },
  },
  Dr = {};
bs(uf, (n, l) => {
  Dr[n] = function () {
    return (arguments[0] = arguments[0][0]), l.apply(this, arguments);
  };
});
Dr.deleteProperty = function (n, l) {
  return Dr.set.call(this, n, l, void 0);
};
Dr.set = function (n, l, i) {
  return uf.set.call(this, n[0], l, i, n[0]);
};
function _c(n, l) {
  const i = n[Rt];
  return (i ? bn(i) : n)[l];
}
function cw(n, l, i) {
  var o;
  const s = sp(l, i);
  return s
    ? "value" in s
      ? s.value
      : (o = s.get) == null
        ? void 0
        : o.call(n.draft_)
    : void 0;
}
function sp(n, l) {
  if (!(l in n)) return;
  let i = pl(n);
  for (; i; ) {
    const s = Object.getOwnPropertyDescriptor(i, l);
    if (s) return s;
    i = pl(i);
  }
}
function Vc(n) {
  n.modified_ || ((n.modified_ = !0), n.parent_ && Vc(n.parent_));
}
function Ec(n) {
  n.copy_ || (n.copy_ = Xc(n.base_, n.scope_.immer_.useStrictShallowCopy_));
}
var fw = class {
  constructor(n) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (l, i, s) => {
        if (typeof l == "function" && typeof i != "function") {
          const f = i;
          i = l;
          const h = this;
          return function (g = f, ...m) {
            return h.produce(g, (v) => i.call(this, v, ...m));
          };
        }
        typeof i != "function" && Vt(6),
          s !== void 0 && typeof s != "function" && Vt(7);
        let o;
        if (_a(l)) {
          const f = qy(this),
            h = Zc(l, void 0);
          let p = !0;
          try {
            (o = i(h)), (p = !1);
          } finally {
            p ? Gc(f) : Qc(f);
          }
          return Hy(f, s), Yy(o, f);
        } else if (!l || typeof l != "object") {
          if (
            ((o = i(l)),
            o === void 0 && (o = l),
            o === np && (o = void 0),
            this.autoFreeze_ && sf(o, !0),
            s)
          ) {
            const f = [],
              h = [];
            jn("Patches").generateReplacementPatches_(l, o, f, h), s(f, h);
          }
          return o;
        } else Vt(1, l);
      }),
      (this.produceWithPatches = (l, i) => {
        if (typeof l == "function")
          return (h, ...p) => this.produceWithPatches(h, (g) => l(g, ...p));
        let s, o;
        return [
          this.produce(l, i, (h, p) => {
            (s = h), (o = p);
          }),
          s,
          o,
        ];
      }),
      typeof (n == null ? void 0 : n.autoFreeze) == "boolean" &&
        this.setAutoFreeze(n.autoFreeze),
      typeof (n == null ? void 0 : n.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(n.useStrictShallowCopy);
  }
  createDraft(n) {
    _a(n) || Vt(8), Nn(n) && (n = dw(n));
    const l = qy(this),
      i = Zc(n, void 0);
    return (i[Rt].isManual_ = !0), Qc(l), i;
  }
  finishDraft(n, l) {
    const i = n && n[Rt];
    (!i || !i.isManual_) && Vt(9);
    const { scope_: s } = i;
    return Hy(s, l), Yy(void 0, s);
  }
  setAutoFreeze(n) {
    this.autoFreeze_ = n;
  }
  setUseStrictShallowCopy(n) {
    this.useStrictShallowCopy_ = n;
  }
  applyPatches(n, l) {
    let i;
    for (i = l.length - 1; i >= 0; i--) {
      const o = l[i];
      if (o.path.length === 0 && o.op === "replace") {
        n = o.value;
        break;
      }
    }
    i > -1 && (l = l.slice(i + 1));
    const s = jn("Patches").applyPatches_;
    return Nn(n) ? s(n, l) : this.produce(n, (o) => s(o, l));
  }
};
function Zc(n, l) {
  const i = qs(n)
    ? jn("MapSet").proxyMap_(n, l)
    : Ys(n)
      ? jn("MapSet").proxySet_(n, l)
      : ow(n, l);
  return (l ? l.scope_ : ip()).drafts_.push(i), i;
}
function dw(n) {
  return Nn(n) || Vt(10, n), up(n);
}
function up(n) {
  if (!_a(n) || Xs(n)) return n;
  const l = n[Rt];
  let i;
  if (l) {
    if (!l.modified_) return l.base_;
    (l.finalized_ = !0), (i = Xc(n, l.scope_.immer_.useStrictShallowCopy_));
  } else i = Xc(n, !0);
  return (
    bs(i, (s, o) => {
      rp(i, s, up(o));
    }),
    l && (l.finalized_ = !1),
    i
  );
}
var Ot = new fw(),
  op = Ot.produce;
Ot.produceWithPatches.bind(Ot);
Ot.setAutoFreeze.bind(Ot);
Ot.setUseStrictShallowCopy.bind(Ot);
Ot.applyPatches.bind(Ot);
Ot.createDraft.bind(Ot);
Ot.finishDraft.bind(Ot);
function cp(n) {
  return ({ dispatch: i, getState: s }) =>
    (o) =>
    (f) =>
      typeof f == "function" ? f(i, s, n) : o(f);
}
var hw = cp(),
  mw = cp,
  yw =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? vs
              : vs.apply(null, arguments);
        },
  pw = (n) => n && typeof n.match == "function";
function jr(n, l) {
  function i(...s) {
    if (l) {
      let o = l(...s);
      if (!o) throw new Error(xa(0));
      return {
        type: n,
        payload: o.payload,
        ...("meta" in o && { meta: o.meta }),
        ...("error" in o && { error: o.error }),
      };
    }
    return { type: n, payload: s[0] };
  }
  return (
    (i.toString = () => `${n}`),
    (i.type = n),
    (i.match = (s) => aw(s) && s.type === n),
    i
  );
}
var fp = class Nr extends Array {
  constructor(...l) {
    super(...l), Object.setPrototypeOf(this, Nr.prototype);
  }
  static get [Symbol.species]() {
    return Nr;
  }
  concat(...l) {
    return super.concat.apply(this, l);
  }
  prepend(...l) {
    return l.length === 1 && Array.isArray(l[0])
      ? new Nr(...l[0].concat(this))
      : new Nr(...l.concat(this));
  }
};
function Gy(n) {
  return _a(n) ? op(n, () => {}) : n;
}
function ls(n, l, i) {
  return n.has(l) ? n.get(l) : n.set(l, i(l)).get(l);
}
function gw(n) {
  return typeof n == "boolean";
}
var vw = () =>
    function (l) {
      const {
        thunk: i = !0,
        immutableCheck: s = !0,
        serializableCheck: o = !0,
        actionCreatorCheck: f = !0,
      } = l ?? {};
      let h = new fp();
      return i && (gw(i) ? h.push(hw) : h.push(mw(i.extraArgument))), h;
    },
  bw = "RTK_autoBatch",
  Qy = (n) => (l) => {
    setTimeout(l, n);
  },
  xw =
    (n = { type: "raf" }) =>
    (l) =>
    (...i) => {
      const s = l(...i);
      let o = !0,
        f = !1,
        h = !1;
      const p = new Set(),
        g =
          n.type === "tick"
            ? queueMicrotask
            : n.type === "raf"
              ? typeof window < "u" && window.requestAnimationFrame
                ? window.requestAnimationFrame
                : Qy(10)
              : n.type === "callback"
                ? n.queueNotification
                : Qy(n.timeout),
        m = () => {
          (h = !1), f && ((f = !1), p.forEach((v) => v()));
        };
      return Object.assign({}, s, {
        subscribe(v) {
          const x = () => o && v(),
            w = s.subscribe(x);
          return (
            p.add(v),
            () => {
              w(), p.delete(v);
            }
          );
        },
        dispatch(v) {
          var x;
          try {
            return (
              (o = !((x = v == null ? void 0 : v.meta) != null && x[bw])),
              (f = !o),
              f && (h || ((h = !0), g(m))),
              s.dispatch(v)
            );
          } finally {
            o = !0;
          }
        },
      });
    },
  Sw = (n) =>
    function (i) {
      const { autoBatch: s = !0 } = i ?? {};
      let o = new fp(n);
      return s && o.push(xw(typeof s == "object" ? s : void 0)), o;
    };
function ww(n) {
  const l = vw(),
    {
      reducer: i = void 0,
      middleware: s,
      devTools: o = !0,
      preloadedState: f = void 0,
      enhancers: h = void 0,
    } = n || {};
  let p;
  if (typeof i == "function") p = i;
  else if (rf(i)) p = ew(i);
  else throw new Error(xa(1));
  let g;
  typeof s == "function" ? (g = s(l)) : (g = l());
  let m = vs;
  o && (m = yw({ trace: !1, ...(typeof o == "object" && o) }));
  const v = tw(...g),
    x = Sw(v);
  let w = typeof h == "function" ? h(x) : x();
  const C = m(...w);
  return ap(p, f, C);
}
function dp(n) {
  const l = {},
    i = [];
  let s;
  const o = {
    addCase(f, h) {
      const p = typeof f == "string" ? f : f.type;
      if (!p) throw new Error(xa(28));
      if (p in l) throw new Error(xa(29));
      return (l[p] = h), o;
    },
    addMatcher(f, h) {
      return i.push({ matcher: f, reducer: h }), o;
    },
    addDefaultCase(f) {
      return (s = f), o;
    },
  };
  return n(o), [l, i, s];
}
function _w(n) {
  return typeof n == "function";
}
function Ew(n, l) {
  let [i, s, o] = dp(l),
    f;
  if (_w(n)) f = () => Gy(n());
  else {
    const p = Gy(n);
    f = () => p;
  }
  function h(p = f(), g) {
    let m = [
      i[g.type],
      ...s.filter(({ matcher: v }) => v(g)).map(({ reducer: v }) => v),
    ];
    return (
      m.filter((v) => !!v).length === 0 && (m = [o]),
      m.reduce((v, x) => {
        if (x)
          if (Nn(v)) {
            const C = x(v, g);
            return C === void 0 ? v : C;
          } else {
            if (_a(v)) return op(v, (w) => x(w, g));
            {
              const w = x(v, g);
              if (w === void 0) {
                if (v === null) return v;
                throw Error(
                  "A case reducer on a non-draftable value must not return undefined"
                );
              }
              return w;
            }
          }
        return v;
      }, p)
    );
  }
  return (h.getInitialState = f), h;
}
var Tw = (n, l) => (pw(n) ? n.match(l) : n(l));
function Nw(...n) {
  return (l) => n.some((i) => Tw(i, l));
}
var jw = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Rw = (n = 21) => {
    let l = "",
      i = n;
    for (; i--; ) l += jw[(Math.random() * 64) | 0];
    return l;
  },
  Ow = ["name", "message", "stack", "code"],
  Tc = class {
    constructor(n, l) {
      ic(this, "_type");
      (this.payload = n), (this.meta = l);
    }
  },
  Vy = class {
    constructor(n, l) {
      ic(this, "_type");
      (this.payload = n), (this.meta = l);
    }
  },
  Aw = (n) => {
    if (typeof n == "object" && n !== null) {
      const l = {};
      for (const i of Ow) typeof n[i] == "string" && (l[i] = n[i]);
      return l;
    }
    return { message: String(n) };
  },
  Zy = "External signal was aborted",
  hp = (() => {
    function n(l, i, s) {
      const o = jr(l + "/fulfilled", (g, m, v, x) => ({
          payload: g,
          meta: {
            ...(x || {}),
            arg: v,
            requestId: m,
            requestStatus: "fulfilled",
          },
        })),
        f = jr(l + "/pending", (g, m, v) => ({
          payload: void 0,
          meta: {
            ...(v || {}),
            arg: m,
            requestId: g,
            requestStatus: "pending",
          },
        })),
        h = jr(l + "/rejected", (g, m, v, x, w) => ({
          payload: x,
          error: ((s && s.serializeError) || Aw)(g || "Rejected"),
          meta: {
            ...(w || {}),
            arg: v,
            requestId: m,
            rejectedWithValue: !!x,
            requestStatus: "rejected",
            aborted: (g == null ? void 0 : g.name) === "AbortError",
            condition: (g == null ? void 0 : g.name) === "ConditionError",
          },
        }));
      function p(g, { signal: m } = {}) {
        return (v, x, w) => {
          const C = s != null && s.idGenerator ? s.idGenerator(g) : Rw(),
            E = new AbortController();
          let S, R;
          function O(B) {
            (R = B), E.abort();
          }
          m &&
            (m.aborted
              ? O(Zy)
              : m.addEventListener("abort", () => O(Zy), { once: !0 }));
          const M = (async function () {
            var q, Z;
            let B;
            try {
              let K =
                (q = s == null ? void 0 : s.condition) == null
                  ? void 0
                  : q.call(s, g, { getState: x, extra: w });
              if ((Mw(K) && (K = await K), K === !1 || E.signal.aborted))
                throw {
                  name: "ConditionError",
                  message: "Aborted due to condition callback returning false.",
                };
              const P = new Promise((F, ee) => {
                (S = () => {
                  ee({ name: "AbortError", message: R || "Aborted" });
                }),
                  E.signal.addEventListener("abort", S);
              });
              v(
                f(
                  C,
                  g,
                  (Z = s == null ? void 0 : s.getPendingMeta) == null
                    ? void 0
                    : Z.call(
                        s,
                        { requestId: C, arg: g },
                        { getState: x, extra: w }
                      )
                )
              ),
                (B = await Promise.race([
                  P,
                  Promise.resolve(
                    i(g, {
                      dispatch: v,
                      getState: x,
                      extra: w,
                      requestId: C,
                      signal: E.signal,
                      abort: O,
                      rejectWithValue: (F, ee) => new Tc(F, ee),
                      fulfillWithValue: (F, ee) => new Vy(F, ee),
                    })
                  ).then((F) => {
                    if (F instanceof Tc) throw F;
                    return F instanceof Vy
                      ? o(F.payload, C, g, F.meta)
                      : o(F, C, g);
                  }),
                ]));
            } catch (K) {
              B =
                K instanceof Tc ? h(null, C, g, K.payload, K.meta) : h(K, C, g);
            } finally {
              S && E.signal.removeEventListener("abort", S);
            }
            return (
              (s &&
                !s.dispatchConditionRejection &&
                h.match(B) &&
                B.meta.condition) ||
                v(B),
              B
            );
          })();
          return Object.assign(M, {
            abort: O,
            requestId: C,
            arg: g,
            unwrap() {
              return M.then(Cw);
            },
          });
        };
      }
      return Object.assign(p, {
        pending: f,
        rejected: h,
        fulfilled: o,
        settled: Nw(h, o),
        typePrefix: l,
      });
    }
    return (n.withTypes = () => n), n;
  })();
function Cw(n) {
  if (n.meta && n.meta.rejectedWithValue) throw n.payload;
  if (n.error) throw n.error;
  return n.payload;
}
function Mw(n) {
  return n !== null && typeof n == "object" && typeof n.then == "function";
}
var Dw = Symbol.for("rtk-slice-createasyncthunk");
function zw(n, l) {
  return `${n}/${l}`;
}
function Uw({ creators: n } = {}) {
  var i;
  const l = (i = n == null ? void 0 : n.asyncThunk) == null ? void 0 : i[Dw];
  return function (o) {
    const { name: f, reducerPath: h = f } = o;
    if (!f) throw new Error(xa(11));
    const p =
        (typeof o.reducers == "function" ? o.reducers(kw()) : o.reducers) || {},
      g = Object.keys(p),
      m = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      v = {
        addCase(G, q) {
          const Z = typeof G == "string" ? G : G.type;
          if (!Z) throw new Error(xa(12));
          if (Z in m.sliceCaseReducersByType) throw new Error(xa(13));
          return (m.sliceCaseReducersByType[Z] = q), v;
        },
        addMatcher(G, q) {
          return m.sliceMatchers.push({ matcher: G, reducer: q }), v;
        },
        exposeAction(G, q) {
          return (m.actionCreators[G] = q), v;
        },
        exposeCaseReducer(G, q) {
          return (m.sliceCaseReducersByName[G] = q), v;
        },
      };
    g.forEach((G) => {
      const q = p[G],
        Z = {
          reducerName: G,
          type: zw(f, G),
          createNotation: typeof o.reducers == "function",
        };
      Hw(q) ? Yw(Z, q, v, l) : Bw(Z, q, v);
    });
    function x() {
      const [G = {}, q = [], Z = void 0] =
          typeof o.extraReducers == "function"
            ? dp(o.extraReducers)
            : [o.extraReducers],
        K = { ...G, ...m.sliceCaseReducersByType };
      return Ew(o.initialState, (P) => {
        for (let F in K) P.addCase(F, K[F]);
        for (let F of m.sliceMatchers) P.addMatcher(F.matcher, F.reducer);
        for (let F of q) P.addMatcher(F.matcher, F.reducer);
        Z && P.addDefaultCase(Z);
      });
    }
    const w = (G) => G,
      C = new Map(),
      E = new WeakMap();
    let S;
    function R(G, q) {
      return S || (S = x()), S(G, q);
    }
    function O() {
      return S || (S = x()), S.getInitialState();
    }
    function M(G, q = !1) {
      function Z(P) {
        let F = P[G];
        return typeof F > "u" && q && (F = ls(E, Z, O)), F;
      }
      function K(P = w) {
        const F = ls(C, q, () => new WeakMap());
        return ls(F, P, () => {
          const ee = {};
          for (const [Ee, Te] of Object.entries(o.selectors ?? {}))
            ee[Ee] = Lw(Te, P, () => ls(E, P, O), q);
          return ee;
        });
      }
      return {
        reducerPath: G,
        getSelectors: K,
        get selectors() {
          return K(Z);
        },
        selectSlice: Z,
      };
    }
    const B = {
      name: f,
      reducer: R,
      actions: m.actionCreators,
      caseReducers: m.sliceCaseReducersByName,
      getInitialState: O,
      ...M(h),
      injectInto(G, { reducerPath: q, ...Z } = {}) {
        const K = q ?? h;
        return (
          G.inject({ reducerPath: K, reducer: R }, Z), { ...B, ...M(K, !0) }
        );
      },
    };
    return B;
  };
}
function Lw(n, l, i, s) {
  function o(f, ...h) {
    let p = l(f);
    return typeof p > "u" && s && (p = i()), n(p, ...h);
  }
  return (o.unwrapped = n), o;
}
var Yr = Uw();
function kw() {
  function n(l, i) {
    return { _reducerDefinitionType: "asyncThunk", payloadCreator: l, ...i };
  }
  return (
    (n.withTypes = () => n),
    {
      reducer(l) {
        return Object.assign(
          {
            [l.name](...i) {
              return l(...i);
            },
          }[l.name],
          { _reducerDefinitionType: "reducer" }
        );
      },
      preparedReducer(l, i) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: l,
          reducer: i,
        };
      },
      asyncThunk: n,
    }
  );
}
function Bw({ type: n, reducerName: l, createNotation: i }, s, o) {
  let f, h;
  if ("reducer" in s) {
    if (i && !qw(s)) throw new Error(xa(17));
    (f = s.reducer), (h = s.prepare);
  } else f = s;
  o.addCase(n, f)
    .exposeCaseReducer(l, f)
    .exposeAction(l, h ? jr(n, h) : jr(n));
}
function Hw(n) {
  return n._reducerDefinitionType === "asyncThunk";
}
function qw(n) {
  return n._reducerDefinitionType === "reducerWithPrepare";
}
function Yw({ type: n, reducerName: l }, i, s, o) {
  if (!o) throw new Error(xa(18));
  const {
      payloadCreator: f,
      fulfilled: h,
      pending: p,
      rejected: g,
      settled: m,
      options: v,
    } = i,
    x = o(n, f, v);
  s.exposeAction(l, x),
    h && s.addCase(x.fulfilled, h),
    p && s.addCase(x.pending, p),
    g && s.addCase(x.rejected, g),
    m && s.addMatcher(x.settled, m),
    s.exposeCaseReducer(l, {
      fulfilled: h || rs,
      pending: p || rs,
      rejected: g || rs,
      settled: m || rs,
    });
}
function rs() {}
function xa(n) {
  return `Minified Redux Toolkit error #${n}; visit https://redux-toolkit.js.org/Errors?code=${n} for the full message or use the non-minified dev environment for full errors. `;
}
const Xw = { isAuthenticated: !1, user: null },
  mp = Yr({
    name: "auth",
    initialState: Xw,
    reducers: {
      login: (n, l) => {
        (n.isAuthenticated = !0), (n.user = l.payload);
      },
      logout: (n) => {
        (n.isAuthenticated = !1), (n.user = null);
      },
    },
  }),
  { login: Gw, logout: Qw } = mp.actions,
  Vw = mp.reducer,
  Zw = [
    { id: 1, name: "Carts", path: "/cart" },
    { id: 2, name: "Setting", path: "/setting" },
    { id: 3, name: "Favorite", path: "/favorite" },
    { id: 4, name: "Orders", path: "/orders" },
  ],
  Kw = () => {
    const [n, l] = T.useState(!1),
      { user: i } = Zt((m) => m.auth),
      { isOpen: s, setIsOpen: o, dropdownRef: f } = ps(),
      h = Rn(),
      p = $0(),
      g = async () => {
        var m, v;
        try {
          l(!0),
            (await Qe.post("/user/logout")).data &&
              (localStorage.removeItem("token"),
              p(Qw()),
              (window.location.href = "/"));
        } catch (x) {
          ne.error(
            ((v = (m = x.response) == null ? void 0 : m.data) == null
              ? void 0
              : v.message) || "Logout failed"
          );
        } finally {
          l(!1);
        }
      };
    return d.jsxs("div", {
      children: [
        d.jsx("div", {
          className: `absolute top-12 z-30 card w-40 duration-75 ease-in-out right-0 ${s ? "opacity-100" : "opacity-0 !-top-120"} ${!i && "hidden"}`,
          ref: f,
          children: d.jsxs("ul", {
            className: "w-full",
            children: [
              Zw.map((m) =>
                d.jsx(
                  "li",
                  {
                    children: d.jsx(Oe, {
                      to: m.path,
                      className: ({ isActive: v }) =>
                        `py-1.5 block text-left text-gray-700 pl-5 rounded-lg hover:bg-indigo-100 ${v ? "bg-indigo-100" : ""}`,
                      onClick: () => o(!1),
                      children: m.name,
                    }),
                  },
                  m.id
                )
              ),
              d.jsx("li", {
                children: d.jsx(Oe, {
                  to: "#",
                  onClick: g,
                  className:
                    "py-1.5 block mb-2 text-left !text-red-500 font-medium pl-5 rounded-lg hover:bg-indigo-100",
                  children: n ? "Loading..." : "Logout",
                }),
              }),
            ],
          }),
        }),
        d.jsx("img", {
          onClick: () => (i != null && i._id ? o(!0) : h("/login")),
          src:
            (i == null ? void 0 : i.avatar) ||
            "https://avatar.iran.liara.run/public",
          alt: "User",
          className:
            "min-w-9 min-h-9 h-9 w-9 rounded-full object-cover cursor-pointer bg-gray-500",
          loading: "lazy",
        }),
      ],
    });
  },
  $w = () => {
    var g, m;
    const { isOpen: n, setIsOpen: l, dropdownRef: i } = ps(),
      [s, o] = T.useState(""),
      { data: f } = Wa(`/product?title=${s}&limit=10`),
      h = Rn(),
      p = T.useCallback(
        (v) => {
          const x = new RegExp(`(${s})`, "gi");
          return v.replace(x, "<b>$1</b>");
        },
        [s]
      );
    return d.jsxs(d.Fragment, {
      children: [
        d.jsxs("button", {
          onClick: () => l(!n),
          title: "Search products",
          className:
            "cursor-pointer hover:text-indigo-600 flex gap-1 items-center",
          children: [
            d.jsx(by, { size: 22, className: "!text-slate-700" }),
            d.jsx("span", { className: "max-sm:hidden", children: "Search" }),
          ],
        }),
        d.jsxs("div", {
          className: `absolute top-12 z-30 card w-80 duration-75 ease-in-out right-0 ${n ? "opacity-100" : "opacity-0 !-top-120"}`,
          ref: i,
          children: [
            d.jsxs("div", {
              className:
                "flex items-center gap-4 border border-indigo-500 p-2 rounded-lg mb-2",
              children: [
                d.jsx(by, { size: 26 }),
                d.jsx("input", {
                  type: "text",
                  placeholder: "Search products...",
                  value: s,
                  onChange: (v) => o(v.target.value),
                  className: "border-none outline-none w-full",
                }),
                d.jsx(x0, {
                  size: 26,
                  className: "cursor-pointer hover:text-indigo-600",
                  onClick: () => {
                    o(""), l(!1);
                  },
                }),
              ],
            }),
            d.jsx("ul", {
              children:
                f &&
                ((g = f == null ? void 0 : f.items) == null
                  ? void 0
                  : g.length) > 0
                  ? (m = f == null ? void 0 : f.items) == null
                    ? void 0
                    : m.map((v) =>
                        d.jsx(
                          "li",
                          {
                            children: d.jsx("button", {
                              onClick: () => {
                                h(`/product/${v == null ? void 0 : v._id}`);
                              },
                              className:
                                "p-1.5 px-4 w-full text-left text-gray-700 rounded-lg text-sm hover:bg-indigo-100",
                              dangerouslySetInnerHTML: {
                                __html: p(v == null ? void 0 : v.title),
                              },
                            }),
                          },
                          v == null ? void 0 : v._id
                        )
                      )
                  : d.jsx("li", {
                      className: "py-1.5 block pl-5 text-sm",
                      children: "No results found",
                    }),
            }),
          ],
        }),
      ],
    });
  },
  Jw = () => {
    const n = na();
    return (
      T.useEffect(() => {
        window.scrollTo(0, 0);
      }, [n.pathname]),
      d.jsx("header", {
        className: "sticky top-0 left-0 w-full bg-slate-50 py-1 z-50 px-4",
        children: d.jsxs("div", {
          className: "flex justify-between w-full max-w-6xl mx-auto relative",
          children: [
            d.jsx(Oe, {
              to: "/",
              children: d.jsx("img", {
                src: "/logo.png",
                alt: "logo",
                width: 140,
              }),
            }),
            d.jsxs("div", {
              className: "flex items-center gap-5",
              children: [
                d.jsx(Oe, {
                  to: "/",
                  className: "max-sm:hidden",
                  children: "Home",
                }),
                d.jsx(Oe, {
                  to: "/product",
                  className: "max-sm:hidden",
                  children: "Product",
                }),
                d.jsx($w, {}),
                d.jsx(Kw, {}),
              ],
            }),
          ],
        }),
      })
    );
  },
  Pw = ({ isAuth: n }) =>
    n &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/register")
      ? d.jsx(gy, { to: "/" })
      : n
        ? d.jsx(J1, {})
        : d.jsx(gy, { to: "/login" }),
  yl = (n) => {
    const { response: l, request: i, message: s } = n;
    l
      ? ne.error(`${l.data.message || l.statusText} - ${l.status}`)
      : i
        ? ne.error("No response received from server")
        : ne.error(`Error: ${s}`);
  },
  yp = ({ id: n, className: l }) => {
    const i = Rn(),
      s = Zt((m) => m.auth.user),
      [o, f] = T.useState(!1),
      [h, p] = T.useState(!!(s != null && s.favorite.includes(n))),
      g = async (m) => {
        m.preventDefault();
        try {
          if ((f(!0), !(s != null && s._id))) return i("/login");
          const v = await Qe.patch(`/user/favorite/${n}`);
          if (v.data) {
            const x = v.data.favorites.includes(n);
            p(x), ne.success(`${x ? "Add Liked" : "Remove Liked"}`);
          }
        } catch (v) {
          yl(v);
        } finally {
          f(!1);
        }
      };
    return d.jsx("button", {
      onClick: g,
      className: `${l}`,
      title: "favorite",
      children: o
        ? d.jsx("div", {
            className: "flex items-center justify-center",
            children: d.jsx("div", {
              className:
                "animate-spin rounded-full border-t-2 border-blue-1 border-solid h-5 w-5",
            }),
          })
        : d.jsx(v0, { fill: `${h ? "red" : "#ff01"}`, stroke: "red" }),
    });
  },
  pp = ({ ...n }) =>
    d.jsxs("div", {
      className: "group card w-full",
      children: [
        d.jsxs("div", {
          className: "relative min-h-[200px]",
          children: [
            d.jsx(Oe, {
              to: `/product/${n._id}`,
              children: d.jsx(J2, {
                src: n.thumbnail || n.images[0],
                placeholder: "https://placehold.co/200x140",
                fallback: "/placeholder.jpg",
                alt: "Product",
                className:
                  "w-full max-h-[200px] object-contain transition-opacity duration-300 opacity-100",
                loading: "lazy",
              }),
            }),
            d.jsx("div", {
              className: "absolute top-2 right-1 space-y-2",
              children: d.jsx(yp, { id: n._id }),
            }),
            d.jsx("div", {
              className: "absolute top-2 left-1",
              children: d.jsxs("span", {
                className: "bg-red-500 text-white px-2 py-1 text-sm rounded",
                children: [n.discount, "%"],
              }),
            }),
          ],
        }),
        d.jsxs("div", {
          className: "capitalize text-gray-800 p-2",
          children: [
            d.jsxs("p", {
              className: "space-x-3 text-sm",
              children: [
                !!n.brand && d.jsx("span", { children: n.brand }),
                d.jsx("span", {
                  className:
                    "bg-indigo-900/10 px-3 rounded-2xl text-xs py-1 w-fit",
                  children: n.category,
                }),
              ],
            }),
            d.jsx("h3", {
              className: "font-medium line-clamp-1 mt-2",
              children: n.title,
            }),
            d.jsxs("p", {
              className: "flex mt-4 justify-between",
              children: [
                d.jsxs("span", {
                  className: "text-xl",
                  children: ["$", n.price],
                }),
                " ",
                d.jsxs("span", {
                  className: "flex gap-1 items-center",
                  children: [
                    n.rating,
                    " ",
                    d.jsx(Or, { className: "text-yellow-400", size: 18 }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  gp = 6048e5,
  Fw = 864e5,
  Ky = Symbol.for("constructDateFrom");
function Fa(n, l) {
  return typeof n == "function"
    ? n(l)
    : n && typeof n == "object" && Ky in n
      ? n[Ky](l)
      : n instanceof Date
        ? new n.constructor(l)
        : new Date(l);
}
function Jt(n, l) {
  return Fa(l || n, n);
}
let Ww = {};
function Gs() {
  return Ww;
}
function zr(n, l) {
  var p, g, m, v;
  const i = Gs(),
    s =
      (l == null ? void 0 : l.weekStartsOn) ??
      ((g = (p = l == null ? void 0 : l.locale) == null ? void 0 : p.options) ==
      null
        ? void 0
        : g.weekStartsOn) ??
      i.weekStartsOn ??
      ((v = (m = i.locale) == null ? void 0 : m.options) == null
        ? void 0
        : v.weekStartsOn) ??
      0,
    o = Jt(n, l == null ? void 0 : l.in),
    f = o.getDay(),
    h = (f < s ? 7 : 0) + f - s;
  return o.setDate(o.getDate() - h), o.setHours(0, 0, 0, 0), o;
}
function ws(n, l) {
  return zr(n, { ...l, weekStartsOn: 1 });
}
function vp(n, l) {
  const i = Jt(n, l == null ? void 0 : l.in),
    s = i.getFullYear(),
    o = Fa(i, 0);
  o.setFullYear(s + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const f = ws(o),
    h = Fa(i, 0);
  h.setFullYear(s, 0, 4), h.setHours(0, 0, 0, 0);
  const p = ws(h);
  return i.getTime() >= f.getTime()
    ? s + 1
    : i.getTime() >= p.getTime()
      ? s
      : s - 1;
}
function $y(n) {
  const l = Jt(n),
    i = new Date(
      Date.UTC(
        l.getFullYear(),
        l.getMonth(),
        l.getDate(),
        l.getHours(),
        l.getMinutes(),
        l.getSeconds(),
        l.getMilliseconds()
      )
    );
  return i.setUTCFullYear(l.getFullYear()), +n - +i;
}
function Iw(n, ...l) {
  const i = Fa.bind(
    null,
    l.find((s) => typeof s == "object")
  );
  return l.map(i);
}
function Jy(n, l) {
  const i = Jt(n, l == null ? void 0 : l.in);
  return i.setHours(0, 0, 0, 0), i;
}
function e_(n, l, i) {
  const [s, o] = Iw(i == null ? void 0 : i.in, n, l),
    f = Jy(s),
    h = Jy(o),
    p = +f - $y(f),
    g = +h - $y(h);
  return Math.round((p - g) / Fw);
}
function t_(n, l) {
  const i = vp(n, l),
    s = Fa(n, 0);
  return s.setFullYear(i, 0, 4), s.setHours(0, 0, 0, 0), ws(s);
}
function a_(n) {
  return (
    n instanceof Date ||
    (typeof n == "object" &&
      Object.prototype.toString.call(n) === "[object Date]")
  );
}
function n_(n) {
  return !((!a_(n) && typeof n != "number") || isNaN(+Jt(n)));
}
function l_(n, l) {
  const i = Jt(n, l == null ? void 0 : l.in);
  return i.setFullYear(i.getFullYear(), 0, 1), i.setHours(0, 0, 0, 0), i;
}
const r_ = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  },
  i_ = (n, l, i) => {
    let s;
    const o = r_[n];
    return (
      typeof o == "string"
        ? (s = o)
        : l === 1
          ? (s = o.one)
          : (s = o.other.replace("{{count}}", l.toString())),
      i != null && i.addSuffix
        ? i.comparison && i.comparison > 0
          ? "in " + s
          : s + " ago"
        : s
    );
  };
function Nc(n) {
  return (l = {}) => {
    const i = l.width ? String(l.width) : n.defaultWidth;
    return n.formats[i] || n.formats[n.defaultWidth];
  };
}
const s_ = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy",
  },
  u_ = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a",
  },
  o_ = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}",
  },
  c_ = {
    date: Nc({ formats: s_, defaultWidth: "full" }),
    time: Nc({ formats: u_, defaultWidth: "full" }),
    dateTime: Nc({ formats: o_, defaultWidth: "full" }),
  },
  f_ = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P",
  },
  d_ = (n, l, i, s) => f_[n];
function Er(n) {
  return (l, i) => {
    const s = i != null && i.context ? String(i.context) : "standalone";
    let o;
    if (s === "formatting" && n.formattingValues) {
      const h = n.defaultFormattingWidth || n.defaultWidth,
        p = i != null && i.width ? String(i.width) : h;
      o = n.formattingValues[p] || n.formattingValues[h];
    } else {
      const h = n.defaultWidth,
        p = i != null && i.width ? String(i.width) : n.defaultWidth;
      o = n.values[p] || n.values[h];
    }
    const f = n.argumentCallback ? n.argumentCallback(l) : l;
    return o[f];
  };
}
const h_ = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  m_ = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
  },
  y_ = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  p_ = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  g_ = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
  },
  v_ = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
  },
  b_ = (n, l) => {
    const i = Number(n),
      s = i % 100;
    if (s > 20 || s < 10)
      switch (s % 10) {
        case 1:
          return i + "st";
        case 2:
          return i + "nd";
        case 3:
          return i + "rd";
      }
    return i + "th";
  },
  x_ = {
    ordinalNumber: b_,
    era: Er({ values: h_, defaultWidth: "wide" }),
    quarter: Er({
      values: m_,
      defaultWidth: "wide",
      argumentCallback: (n) => n - 1,
    }),
    month: Er({ values: y_, defaultWidth: "wide" }),
    day: Er({ values: p_, defaultWidth: "wide" }),
    dayPeriod: Er({
      values: g_,
      defaultWidth: "wide",
      formattingValues: v_,
      defaultFormattingWidth: "wide",
    }),
  };
function Tr(n) {
  return (l, i = {}) => {
    const s = i.width,
      o = (s && n.matchPatterns[s]) || n.matchPatterns[n.defaultMatchWidth],
      f = l.match(o);
    if (!f) return null;
    const h = f[0],
      p = (s && n.parsePatterns[s]) || n.parsePatterns[n.defaultParseWidth],
      g = Array.isArray(p) ? w_(p, (x) => x.test(h)) : S_(p, (x) => x.test(h));
    let m;
    (m = n.valueCallback ? n.valueCallback(g) : g),
      (m = i.valueCallback ? i.valueCallback(m) : m);
    const v = l.slice(h.length);
    return { value: m, rest: v };
  };
}
function S_(n, l) {
  for (const i in n)
    if (Object.prototype.hasOwnProperty.call(n, i) && l(n[i])) return i;
}
function w_(n, l) {
  for (let i = 0; i < n.length; i++) if (l(n[i])) return i;
}
function __(n) {
  return (l, i = {}) => {
    const s = l.match(n.matchPattern);
    if (!s) return null;
    const o = s[0],
      f = l.match(n.parsePattern);
    if (!f) return null;
    let h = n.valueCallback ? n.valueCallback(f[0]) : f[0];
    h = i.valueCallback ? i.valueCallback(h) : h;
    const p = l.slice(o.length);
    return { value: h, rest: p };
  };
}
const E_ = /^(\d+)(th|st|nd|rd)?/i,
  T_ = /\d+/i,
  N_ = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  j_ = { any: [/^b/i, /^(a|c)/i] },
  R_ = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  O_ = { any: [/1/i, /2/i, /3/i, /4/i] },
  A_ = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  C_ = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  M_ = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  D_ = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  z_ = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  U_ = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  L_ = {
    ordinalNumber: __({
      matchPattern: E_,
      parsePattern: T_,
      valueCallback: (n) => parseInt(n, 10),
    }),
    era: Tr({
      matchPatterns: N_,
      defaultMatchWidth: "wide",
      parsePatterns: j_,
      defaultParseWidth: "any",
    }),
    quarter: Tr({
      matchPatterns: R_,
      defaultMatchWidth: "wide",
      parsePatterns: O_,
      defaultParseWidth: "any",
      valueCallback: (n) => n + 1,
    }),
    month: Tr({
      matchPatterns: A_,
      defaultMatchWidth: "wide",
      parsePatterns: C_,
      defaultParseWidth: "any",
    }),
    day: Tr({
      matchPatterns: M_,
      defaultMatchWidth: "wide",
      parsePatterns: D_,
      defaultParseWidth: "any",
    }),
    dayPeriod: Tr({
      matchPatterns: z_,
      defaultMatchWidth: "any",
      parsePatterns: U_,
      defaultParseWidth: "any",
    }),
  },
  k_ = {
    code: "en-US",
    formatDistance: i_,
    formatLong: c_,
    formatRelative: d_,
    localize: x_,
    match: L_,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
function B_(n, l) {
  const i = Jt(n, l == null ? void 0 : l.in);
  return e_(i, l_(i)) + 1;
}
function H_(n, l) {
  const i = Jt(n, l == null ? void 0 : l.in),
    s = +ws(i) - +t_(i);
  return Math.round(s / gp) + 1;
}
function bp(n, l) {
  var v, x, w, C;
  const i = Jt(n, l == null ? void 0 : l.in),
    s = i.getFullYear(),
    o = Gs(),
    f =
      (l == null ? void 0 : l.firstWeekContainsDate) ??
      ((x = (v = l == null ? void 0 : l.locale) == null ? void 0 : v.options) ==
      null
        ? void 0
        : x.firstWeekContainsDate) ??
      o.firstWeekContainsDate ??
      ((C = (w = o.locale) == null ? void 0 : w.options) == null
        ? void 0
        : C.firstWeekContainsDate) ??
      1,
    h = Fa((l == null ? void 0 : l.in) || n, 0);
  h.setFullYear(s + 1, 0, f), h.setHours(0, 0, 0, 0);
  const p = zr(h, l),
    g = Fa((l == null ? void 0 : l.in) || n, 0);
  g.setFullYear(s, 0, f), g.setHours(0, 0, 0, 0);
  const m = zr(g, l);
  return +i >= +p ? s + 1 : +i >= +m ? s : s - 1;
}
function q_(n, l) {
  var p, g, m, v;
  const i = Gs(),
    s =
      (l == null ? void 0 : l.firstWeekContainsDate) ??
      ((g = (p = l == null ? void 0 : l.locale) == null ? void 0 : p.options) ==
      null
        ? void 0
        : g.firstWeekContainsDate) ??
      i.firstWeekContainsDate ??
      ((v = (m = i.locale) == null ? void 0 : m.options) == null
        ? void 0
        : v.firstWeekContainsDate) ??
      1,
    o = bp(n, l),
    f = Fa((l == null ? void 0 : l.in) || n, 0);
  return f.setFullYear(o, 0, s), f.setHours(0, 0, 0, 0), zr(f, l);
}
function Y_(n, l) {
  const i = Jt(n, l == null ? void 0 : l.in),
    s = +zr(i, l) - +q_(i, l);
  return Math.round(s / gp) + 1;
}
function _e(n, l) {
  const i = n < 0 ? "-" : "",
    s = Math.abs(n).toString().padStart(l, "0");
  return i + s;
}
const Ja = {
    y(n, l) {
      const i = n.getFullYear(),
        s = i > 0 ? i : 1 - i;
      return _e(l === "yy" ? s % 100 : s, l.length);
    },
    M(n, l) {
      const i = n.getMonth();
      return l === "M" ? String(i + 1) : _e(i + 1, 2);
    },
    d(n, l) {
      return _e(n.getDate(), l.length);
    },
    a(n, l) {
      const i = n.getHours() / 12 >= 1 ? "pm" : "am";
      switch (l) {
        case "a":
        case "aa":
          return i.toUpperCase();
        case "aaa":
          return i;
        case "aaaaa":
          return i[0];
        case "aaaa":
        default:
          return i === "am" ? "a.m." : "p.m.";
      }
    },
    h(n, l) {
      return _e(n.getHours() % 12 || 12, l.length);
    },
    H(n, l) {
      return _e(n.getHours(), l.length);
    },
    m(n, l) {
      return _e(n.getMinutes(), l.length);
    },
    s(n, l) {
      return _e(n.getSeconds(), l.length);
    },
    S(n, l) {
      const i = l.length,
        s = n.getMilliseconds(),
        o = Math.trunc(s * Math.pow(10, i - 3));
      return _e(o, l.length);
    },
  },
  ml = {
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  Py = {
    G: function (n, l, i) {
      const s = n.getFullYear() > 0 ? 1 : 0;
      switch (l) {
        case "G":
        case "GG":
        case "GGG":
          return i.era(s, { width: "abbreviated" });
        case "GGGGG":
          return i.era(s, { width: "narrow" });
        case "GGGG":
        default:
          return i.era(s, { width: "wide" });
      }
    },
    y: function (n, l, i) {
      if (l === "yo") {
        const s = n.getFullYear(),
          o = s > 0 ? s : 1 - s;
        return i.ordinalNumber(o, { unit: "year" });
      }
      return Ja.y(n, l);
    },
    Y: function (n, l, i, s) {
      const o = bp(n, s),
        f = o > 0 ? o : 1 - o;
      if (l === "YY") {
        const h = f % 100;
        return _e(h, 2);
      }
      return l === "Yo"
        ? i.ordinalNumber(f, { unit: "year" })
        : _e(f, l.length);
    },
    R: function (n, l) {
      const i = vp(n);
      return _e(i, l.length);
    },
    u: function (n, l) {
      const i = n.getFullYear();
      return _e(i, l.length);
    },
    Q: function (n, l, i) {
      const s = Math.ceil((n.getMonth() + 1) / 3);
      switch (l) {
        case "Q":
          return String(s);
        case "QQ":
          return _e(s, 2);
        case "Qo":
          return i.ordinalNumber(s, { unit: "quarter" });
        case "QQQ":
          return i.quarter(s, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return i.quarter(s, { width: "narrow", context: "formatting" });
        case "QQQQ":
        default:
          return i.quarter(s, { width: "wide", context: "formatting" });
      }
    },
    q: function (n, l, i) {
      const s = Math.ceil((n.getMonth() + 1) / 3);
      switch (l) {
        case "q":
          return String(s);
        case "qq":
          return _e(s, 2);
        case "qo":
          return i.ordinalNumber(s, { unit: "quarter" });
        case "qqq":
          return i.quarter(s, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return i.quarter(s, { width: "narrow", context: "standalone" });
        case "qqqq":
        default:
          return i.quarter(s, { width: "wide", context: "standalone" });
      }
    },
    M: function (n, l, i) {
      const s = n.getMonth();
      switch (l) {
        case "M":
        case "MM":
          return Ja.M(n, l);
        case "Mo":
          return i.ordinalNumber(s + 1, { unit: "month" });
        case "MMM":
          return i.month(s, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return i.month(s, { width: "narrow", context: "formatting" });
        case "MMMM":
        default:
          return i.month(s, { width: "wide", context: "formatting" });
      }
    },
    L: function (n, l, i) {
      const s = n.getMonth();
      switch (l) {
        case "L":
          return String(s + 1);
        case "LL":
          return _e(s + 1, 2);
        case "Lo":
          return i.ordinalNumber(s + 1, { unit: "month" });
        case "LLL":
          return i.month(s, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return i.month(s, { width: "narrow", context: "standalone" });
        case "LLLL":
        default:
          return i.month(s, { width: "wide", context: "standalone" });
      }
    },
    w: function (n, l, i, s) {
      const o = Y_(n, s);
      return l === "wo"
        ? i.ordinalNumber(o, { unit: "week" })
        : _e(o, l.length);
    },
    I: function (n, l, i) {
      const s = H_(n);
      return l === "Io"
        ? i.ordinalNumber(s, { unit: "week" })
        : _e(s, l.length);
    },
    d: function (n, l, i) {
      return l === "do"
        ? i.ordinalNumber(n.getDate(), { unit: "date" })
        : Ja.d(n, l);
    },
    D: function (n, l, i) {
      const s = B_(n);
      return l === "Do"
        ? i.ordinalNumber(s, { unit: "dayOfYear" })
        : _e(s, l.length);
    },
    E: function (n, l, i) {
      const s = n.getDay();
      switch (l) {
        case "E":
        case "EE":
        case "EEE":
          return i.day(s, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return i.day(s, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return i.day(s, { width: "short", context: "formatting" });
        case "EEEE":
        default:
          return i.day(s, { width: "wide", context: "formatting" });
      }
    },
    e: function (n, l, i, s) {
      const o = n.getDay(),
        f = (o - s.weekStartsOn + 8) % 7 || 7;
      switch (l) {
        case "e":
          return String(f);
        case "ee":
          return _e(f, 2);
        case "eo":
          return i.ordinalNumber(f, { unit: "day" });
        case "eee":
          return i.day(o, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return i.day(o, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return i.day(o, { width: "short", context: "formatting" });
        case "eeee":
        default:
          return i.day(o, { width: "wide", context: "formatting" });
      }
    },
    c: function (n, l, i, s) {
      const o = n.getDay(),
        f = (o - s.weekStartsOn + 8) % 7 || 7;
      switch (l) {
        case "c":
          return String(f);
        case "cc":
          return _e(f, l.length);
        case "co":
          return i.ordinalNumber(f, { unit: "day" });
        case "ccc":
          return i.day(o, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return i.day(o, { width: "narrow", context: "standalone" });
        case "cccccc":
          return i.day(o, { width: "short", context: "standalone" });
        case "cccc":
        default:
          return i.day(o, { width: "wide", context: "standalone" });
      }
    },
    i: function (n, l, i) {
      const s = n.getDay(),
        o = s === 0 ? 7 : s;
      switch (l) {
        case "i":
          return String(o);
        case "ii":
          return _e(o, l.length);
        case "io":
          return i.ordinalNumber(o, { unit: "day" });
        case "iii":
          return i.day(s, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return i.day(s, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return i.day(s, { width: "short", context: "formatting" });
        case "iiii":
        default:
          return i.day(s, { width: "wide", context: "formatting" });
      }
    },
    a: function (n, l, i) {
      const o = n.getHours() / 12 >= 1 ? "pm" : "am";
      switch (l) {
        case "a":
        case "aa":
          return i.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return i
            .dayPeriod(o, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return i.dayPeriod(o, { width: "narrow", context: "formatting" });
        case "aaaa":
        default:
          return i.dayPeriod(o, { width: "wide", context: "formatting" });
      }
    },
    b: function (n, l, i) {
      const s = n.getHours();
      let o;
      switch (
        (s === 12
          ? (o = ml.noon)
          : s === 0
            ? (o = ml.midnight)
            : (o = s / 12 >= 1 ? "pm" : "am"),
        l)
      ) {
        case "b":
        case "bb":
          return i.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return i
            .dayPeriod(o, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return i.dayPeriod(o, { width: "narrow", context: "formatting" });
        case "bbbb":
        default:
          return i.dayPeriod(o, { width: "wide", context: "formatting" });
      }
    },
    B: function (n, l, i) {
      const s = n.getHours();
      let o;
      switch (
        (s >= 17
          ? (o = ml.evening)
          : s >= 12
            ? (o = ml.afternoon)
            : s >= 4
              ? (o = ml.morning)
              : (o = ml.night),
        l)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return i.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return i.dayPeriod(o, { width: "narrow", context: "formatting" });
        case "BBBB":
        default:
          return i.dayPeriod(o, { width: "wide", context: "formatting" });
      }
    },
    h: function (n, l, i) {
      if (l === "ho") {
        let s = n.getHours() % 12;
        return s === 0 && (s = 12), i.ordinalNumber(s, { unit: "hour" });
      }
      return Ja.h(n, l);
    },
    H: function (n, l, i) {
      return l === "Ho"
        ? i.ordinalNumber(n.getHours(), { unit: "hour" })
        : Ja.H(n, l);
    },
    K: function (n, l, i) {
      const s = n.getHours() % 12;
      return l === "Ko"
        ? i.ordinalNumber(s, { unit: "hour" })
        : _e(s, l.length);
    },
    k: function (n, l, i) {
      let s = n.getHours();
      return (
        s === 0 && (s = 24),
        l === "ko" ? i.ordinalNumber(s, { unit: "hour" }) : _e(s, l.length)
      );
    },
    m: function (n, l, i) {
      return l === "mo"
        ? i.ordinalNumber(n.getMinutes(), { unit: "minute" })
        : Ja.m(n, l);
    },
    s: function (n, l, i) {
      return l === "so"
        ? i.ordinalNumber(n.getSeconds(), { unit: "second" })
        : Ja.s(n, l);
    },
    S: function (n, l) {
      return Ja.S(n, l);
    },
    X: function (n, l, i) {
      const s = n.getTimezoneOffset();
      if (s === 0) return "Z";
      switch (l) {
        case "X":
          return Wy(s);
        case "XXXX":
        case "XX":
          return xn(s);
        case "XXXXX":
        case "XXX":
        default:
          return xn(s, ":");
      }
    },
    x: function (n, l, i) {
      const s = n.getTimezoneOffset();
      switch (l) {
        case "x":
          return Wy(s);
        case "xxxx":
        case "xx":
          return xn(s);
        case "xxxxx":
        case "xxx":
        default:
          return xn(s, ":");
      }
    },
    O: function (n, l, i) {
      const s = n.getTimezoneOffset();
      switch (l) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + Fy(s, ":");
        case "OOOO":
        default:
          return "GMT" + xn(s, ":");
      }
    },
    z: function (n, l, i) {
      const s = n.getTimezoneOffset();
      switch (l) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + Fy(s, ":");
        case "zzzz":
        default:
          return "GMT" + xn(s, ":");
      }
    },
    t: function (n, l, i) {
      const s = Math.trunc(+n / 1e3);
      return _e(s, l.length);
    },
    T: function (n, l, i) {
      return _e(+n, l.length);
    },
  };
function Fy(n, l = "") {
  const i = n > 0 ? "-" : "+",
    s = Math.abs(n),
    o = Math.trunc(s / 60),
    f = s % 60;
  return f === 0 ? i + String(o) : i + String(o) + l + _e(f, 2);
}
function Wy(n, l) {
  return n % 60 === 0
    ? (n > 0 ? "-" : "+") + _e(Math.abs(n) / 60, 2)
    : xn(n, l);
}
function xn(n, l = "") {
  const i = n > 0 ? "-" : "+",
    s = Math.abs(n),
    o = _e(Math.trunc(s / 60), 2),
    f = _e(s % 60, 2);
  return i + o + l + f;
}
const Iy = (n, l) => {
    switch (n) {
      case "P":
        return l.date({ width: "short" });
      case "PP":
        return l.date({ width: "medium" });
      case "PPP":
        return l.date({ width: "long" });
      case "PPPP":
      default:
        return l.date({ width: "full" });
    }
  },
  xp = (n, l) => {
    switch (n) {
      case "p":
        return l.time({ width: "short" });
      case "pp":
        return l.time({ width: "medium" });
      case "ppp":
        return l.time({ width: "long" });
      case "pppp":
      default:
        return l.time({ width: "full" });
    }
  },
  X_ = (n, l) => {
    const i = n.match(/(P+)(p+)?/) || [],
      s = i[1],
      o = i[2];
    if (!o) return Iy(n, l);
    let f;
    switch (s) {
      case "P":
        f = l.dateTime({ width: "short" });
        break;
      case "PP":
        f = l.dateTime({ width: "medium" });
        break;
      case "PPP":
        f = l.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        f = l.dateTime({ width: "full" });
        break;
    }
    return f.replace("{{date}}", Iy(s, l)).replace("{{time}}", xp(o, l));
  },
  G_ = { p: xp, P: X_ },
  Q_ = /^D+$/,
  V_ = /^Y+$/,
  Z_ = ["D", "DD", "YY", "YYYY"];
function K_(n) {
  return Q_.test(n);
}
function $_(n) {
  return V_.test(n);
}
function J_(n, l, i) {
  const s = P_(n, l, i);
  if ((console.warn(s), Z_.includes(n))) throw new RangeError(s);
}
function P_(n, l, i) {
  const s = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${l}\`) for formatting ${s} to the input \`${i}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const F_ = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  W_ = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  I_ = /^'([^]*?)'?$/,
  eE = /''/g,
  tE = /[a-zA-Z]/;
function Kc(n, l, i) {
  var v, x, w, C;
  const s = Gs(),
    o = s.locale ?? k_,
    f =
      s.firstWeekContainsDate ??
      ((x = (v = s.locale) == null ? void 0 : v.options) == null
        ? void 0
        : x.firstWeekContainsDate) ??
      1,
    h =
      s.weekStartsOn ??
      ((C = (w = s.locale) == null ? void 0 : w.options) == null
        ? void 0
        : C.weekStartsOn) ??
      0,
    p = Jt(n, i == null ? void 0 : i.in);
  if (!n_(p)) throw new RangeError("Invalid time value");
  let g = l
    .match(W_)
    .map((E) => {
      const S = E[0];
      if (S === "p" || S === "P") {
        const R = G_[S];
        return R(E, o.formatLong);
      }
      return E;
    })
    .join("")
    .match(F_)
    .map((E) => {
      if (E === "''") return { isToken: !1, value: "'" };
      const S = E[0];
      if (S === "'") return { isToken: !1, value: aE(E) };
      if (Py[S]) return { isToken: !0, value: E };
      if (S.match(tE))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            S +
            "`"
        );
      return { isToken: !1, value: E };
    });
  o.localize.preprocessor && (g = o.localize.preprocessor(p, g));
  const m = { firstWeekContainsDate: f, weekStartsOn: h, locale: o };
  return g
    .map((E) => {
      if (!E.isToken) return E.value;
      const S = E.value;
      ($_(S) || K_(S)) && J_(S, l, String(n));
      const R = Py[S[0]];
      return R(p, S, o.localize, m);
    })
    .join("");
}
function aE(n) {
  const l = n.match(I_);
  return l ? l[1].replace(eE, "'") : n;
}
const nE = ({ reviewId: n, likes: l, replies: i, openReply: s }) => {
    const o = Zt((v) => {
        var x, w;
        return (w =
          (x = v == null ? void 0 : v.auth) == null ? void 0 : x.user) == null
          ? void 0
          : w._id;
      }),
      [f, h] = T.useState(o ? (l == null ? void 0 : l.includes(o)) : !1),
      [p, g] = T.useState(l == null ? void 0 : l.length),
      m = async () => {
        var v, x;
        try {
          const w = await Qe.patch("/review/like", { reviewId: n });
          w.data && (h((C) => !C), g(w.data.likes));
        } catch (w) {
          ne.error(
            (x =
              (v = w == null ? void 0 : w.response) == null
                ? void 0
                : v.data) == null
              ? void 0
              : x.message
          );
        }
      };
    return d.jsxs("div", {
      className: "flex items-center gap-5",
      children: [
        d.jsxs("button", {
          onClick: m,
          className: "svg-btn text-xs flex gap-1 !w-16",
          children: [
            d.jsx(ix, { size: 16, color: f ? "#4F46E5" : "#111" }),
            " ",
            p,
          ],
        }),
        d.jsxs("button", {
          onClick: s,
          className: "svg-btn text-xs flex gap-1 !w-16",
          children: [d.jsx(Kb, { size: 16 }), i],
        }),
      ],
    });
  },
  lE = () => {
    const { id: n } = o0(),
      { data: l, refetch: i } = Wa(`/review/${n}`),
      [s, o] = be.useState(),
      [f, h] = T.useState({ comment: "", rating: 0 }),
      [p, g] = T.useState(null),
      [m, v] = T.useState(""),
      x = Zt((S) => {
        var R, O;
        return (O =
          (R = S == null ? void 0 : S.auth) == null ? void 0 : R.user) == null
          ? void 0
          : O._id;
      });
    T.useEffect(() => {
      (l == null ? void 0 : l.length) > 0 && o(l);
    }, [l]);
    const w = async (S) => {
        var R, O;
        try {
          (await Qe.delete(`/review/${S}`)).data && i();
        } catch (M) {
          ne.error(
            (O =
              (R = M == null ? void 0 : M.response) == null
                ? void 0
                : R.data) == null
              ? void 0
              : O.message
          );
        }
      },
      C = async (S) => {
        var R, O;
        if (m.trim()) {
          if (!x) return ne.error("Firstly login then write reply");
          try {
            const M = await Qe.post("/review/reply", {
              reviewId: S,
              comment: m,
            });
            M != null &&
              M.data &&
              (o(
                s.map((B) =>
                  B._id == S
                    ? {
                        ...B,
                        replies: [
                          ...B.replies,
                          {
                            fullName: "You",
                            comment: m,
                            createdAt: Date.now(),
                          },
                        ],
                      }
                    : B
                )
              ),
              v(""));
          } catch (M) {
            ne.error(
              (O =
                (R = M == null ? void 0 : M.response) == null
                  ? void 0
                  : R.data) == null
                ? void 0
                : O.message
            );
          }
        }
      },
      E = async () => {
        var S, R;
        if (!x) return ne.error("Firstly login then write comment");
        if (f.rating === 0 || !f.comment.trim())
          return ne.error("Please fill rating & comment");
        try {
          const O = await Qe.post("/review", { productId: n, ...f });
          O.data &&
            (o(O.data.reviews),
            h({ comment: "", rating: 0 }),
            ne.success("Review submitted successfully"));
        } catch (O) {
          ne.error(
            (R =
              (S = O == null ? void 0 : O.response) == null
                ? void 0
                : S.data) == null
              ? void 0
              : R.message
          );
        }
      };
    return d.jsxs("div", {
      className: "mx-auto px-3 py-5 max-w-6xl",
      children: [
        d.jsx("h2", {
          className: "text-2xl font-bold text-gray-800 uppercase mb-5",
          children: "Comment",
        }),
        d.jsxs("div", {
          className: "grid sm:grid-cols-2 gap-4",
          children: [
            d.jsxs("div", {
              className: "w-full card",
              children: [
                d.jsx("textarea", {
                  rows: 4,
                  className: "w-full outline-none p-2",
                  placeholder: "Write your review...",
                  value: f.comment,
                  onChange: (S) => h({ ...f, comment: S.target.value }),
                }),
                d.jsxs("div", {
                  className: "flex items-center w-full justify-between",
                  children: [
                    d.jsx($2, {
                      defaultRating: f.rating,
                      onChange: (S) => h({ ...f, rating: S }),
                    }),
                    d.jsxs("button", {
                      disabled: !f.comment.trim() || f.rating === 0,
                      onClick: E,
                      className:
                        "btn-primary flex gap-1 items-center disabled:opacity-50",
                      children: ["Add ", d.jsx(Lb, {})],
                    }),
                  ],
                }),
              ],
            }),
            s == null
              ? void 0
              : s.map((S) => {
                  var R, O, M, B, G, q;
                  return d.jsxs(
                    "div",
                    {
                      className: "w-full card space-y-4",
                      children: [
                        d.jsxs("div", {
                          children: [
                            d.jsxs("div", {
                              className: "flex gap-4 relative items-center",
                              children: [
                                d.jsx("img", {
                                  src:
                                    ((R = S == null ? void 0 : S.createdBy) ==
                                    null
                                      ? void 0
                                      : R.avatar) ||
                                    "https://avatar.iran.liara.run/public",
                                  alt: "Customer",
                                  className:
                                    "w-10 h-10 rounded-full object-cover transition-opacity duration-300 opacity-100",
                                  loading: "lazy",
                                }),
                                d.jsxs("div", {
                                  children: [
                                    d.jsx("h4", {
                                      className: "font-semibold",
                                      children:
                                        (O =
                                          S == null ? void 0 : S.createdBy) ==
                                        null
                                          ? void 0
                                          : O.fullName,
                                    }),
                                    d.jsx(K2, {
                                      rating: S == null ? void 0 : S.rating,
                                    }),
                                  ],
                                }),
                                ((M = S == null ? void 0 : S.createdBy) == null
                                  ? void 0
                                  : M._id) === x &&
                                  d.jsx("button", {
                                    onClick: () =>
                                      w(S == null ? void 0 : S._id),
                                    className:
                                      "absolute top-2 right-2 cursor-pointer svg-btn p-2 text-red-600",
                                    children: d.jsx(cx, {}),
                                  }),
                              ],
                            }),
                            d.jsx("p", {
                              className: "py-2",
                              children: S == null ? void 0 : S.comment,
                            }),
                            d.jsx("p", {
                              className: "text-gray-500 text-xs",
                              children: Kc(
                                new Date(S == null ? void 0 : S.createdAt),
                                "dd MMM yyyy, h:mm a"
                              ),
                            }),
                          ],
                        }),
                        d.jsx(nE, {
                          reviewId: S == null ? void 0 : S._id,
                          likes: S == null ? void 0 : S.likes,
                          replies:
                            (B = S == null ? void 0 : S.replies) == null
                              ? void 0
                              : B.length,
                          openReply: () => g(p === S._id ? null : S._id),
                        }),
                        p === S._id &&
                          d.jsxs("div", {
                            className: "items-center flex gap-2",
                            children: [
                              d.jsx("input", {
                                className:
                                  "border w-full border-indigo-300 px-4 py-2 rounded-lg text-sm",
                                placeholder: "Write a reply...",
                                value: m,
                                onChange: (Z) => v(Z.target.value),
                              }),
                              d.jsx("button", {
                                disabled: !m.trim(),
                                onClick: () => C(S._id),
                                className:
                                  "w-fit text-sm btn bg-indigo-600 text-white disabled:opacity-50",
                                children: "Reply",
                              }),
                            ],
                          }),
                        ((G = S == null ? void 0 : S.replies) == null
                          ? void 0
                          : G.length) > 0 &&
                          p === (S == null ? void 0 : S._id) &&
                          d.jsx("div", {
                            children:
                              (q = S == null ? void 0 : S.replies) == null
                                ? void 0
                                : q.map((Z, K) => {
                                    var P;
                                    return d.jsxs(
                                      "div",
                                      {
                                        className:
                                          "text-sm mb-3 flex gap-4 p-4 rounded-lg border border-gray-200",
                                        children: [
                                          d.jsxs("p", {
                                            className: "flex flex-col",
                                            children: [
                                              d.jsx("span", {
                                                className:
                                                  "font-semibold text-right",
                                                children:
                                                  ((P =
                                                    Z == null
                                                      ? void 0
                                                      : Z.createdBy) == null
                                                    ? void 0
                                                    : P.fullName) ||
                                                  (Z == null
                                                    ? void 0
                                                    : Z.fullName),
                                              }),
                                              d.jsx("span", {
                                                className:
                                                  "text-gray-500 text-xs",
                                                children: Kc(
                                                  new Date(
                                                    Z == null
                                                      ? void 0
                                                      : Z.createdAt
                                                  ),
                                                  "dd MMM, h:mm a"
                                                ),
                                              }),
                                            ],
                                          }),
                                          d.jsx("p", {
                                            className: "flex-1/2",
                                            children:
                                              Z == null ? void 0 : Z.comment,
                                          }),
                                        ],
                                      },
                                      K
                                    );
                                  }),
                          }),
                      ],
                    },
                    S == null ? void 0 : S._id
                  );
                }),
          ],
        }),
      ],
    });
  },
  e0 = ({ heading: n = "", items: l = [], slug: i = "" }) =>
    d.jsxs("div", {
      className: "relative mx-auto max-w-6xl sm:p-4 p-3",
      children: [
        d.jsx("h2", {
          className: "font-medium text-xl",
          children: n || "heading",
        }),
        l && (l == null ? void 0 : l.length) > 0
          ? d.jsx("div", {
              className:
                "w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden",
              children:
                l == null
                  ? void 0
                  : l.map((s) =>
                      d.jsxs(
                        Oe,
                        {
                          to: `/product?${i}=${s == null ? void 0 : s.title}`,
                          className: "snap-start min-w-[200px] ",
                          children: [
                            d.jsx("img", {
                              src:
                                (s == null ? void 0 : s.thumbnail) ||
                                "placeholder.jpg",
                              alt: "New Release 1",
                              className:
                                "w-full h-[180px] object-cover rounded",
                              loading: "lazy",
                            }),
                            d.jsx("h3", {
                              className:
                                "capitalize font-medium line-clamp-1 p-2",
                              children: s == null ? void 0 : s.title,
                            }),
                          ],
                        },
                        s == null ? void 0 : s._id
                      )
                    ),
            })
          : d.jsx(Ia, { className: "h-[200px]" }),
        d.jsx("div", {
          className:
            "absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100",
        }),
      ],
    }),
  rE = ({ productId: n, quantity: l, refetch: i }) => {
    const {
        _id: s,
        thumbnail: o,
        title: f,
        price: h,
        category: p,
        brand: g,
      } = n,
      m = async (v) => {
        try {
          (await Qe.delete(`/cart/${v}`)).data && i();
        } catch (x) {
          yl(x);
        }
      };
    return d.jsxs("div", {
      className: "flex items-start border-b border-gray-300 py-4",
      children: [
        d.jsx(Oe, {
          to: `/product/${s}`,
          className: "bg-gray-300",
          children: d.jsx("img", {
            src: o || "https://placehold.co/120x120",
            alt: "Product",
            className:
              "sm:w-32 sm:h-32 h-24 w-24 object-cover rounded transition-opacity duration-300 opacity-100",
            loading: "lazy",
          }),
        }),
        d.jsxs("div", {
          className: "flex-1 ml-6 relative",
          children: [
            d.jsx("h3", {
              className: "font-semibold",
              children: f || "Smartphone X Pro",
            }),
            d.jsxs("p", {
              className: "capitalize",
              children: [
                p,
                g &&
                  d.jsx("span", {
                    className: "py-1 px-2 rounded-xl ml-2 bg-gray-200 text-xs",
                    children: g,
                  }),
              ],
            }),
            d.jsxs("div", {
              className: "flex items-center my-1",
              children: [
                d.jsx("span", {
                  className: "text-sm text-gray-600",
                  children: "Unit Price:",
                }),
                d.jsxs("span", {
                  className: "ml-2 font-semibold",
                  children: ["$", h || 79.99, " x ", l],
                }),
              ],
            }),
            d.jsx("button", {
              onClick: () => m(s),
              className:
                "text-gray-400 absolute top-6 sm:right-5 right-1 cursor-pointer hover:text-red-600",
              children: d.jsx(x0, {}),
            }),
            d.jsxs("h3", {
              children: [
                "Totals: ",
                d.jsxs("span", {
                  className: "font-bold",
                  children: ["$", h * l],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  iE = () => {
    const n = [
        { id: 1, icon: "/spotlight/spotlight (1).jpeg" },
        { id: 2, icon: "/spotlight/spotlight (2).jpeg" },
        { id: 3, icon: "/spotlight/spotlight (3).jpeg" },
        { id: 4, icon: "/spotlight/spotlight (4).jpeg" },
        { id: 5, icon: "/spotlight/spotlight (5).jpeg" },
        { id: 6, icon: "/spotlight/spotlight (6).jpeg" },
        { id: 7, icon: "/spotlight/spotlight (7).jpeg" },
        { id: 8, icon: "/spotlight/spotlight (8).jpeg" },
        { id: 9, icon: "/spotlight/spotlight (9).jpeg" },
      ],
      [l] = T.useState(() => [...n].sort(() => Math.random() - 0.5));
    return d.jsxs("div", {
      className: "relative mx-auto max-w-6xl sm:p-4 p-3",
      children: [
        d.jsx("h2", {
          className: "font-medium text-xl",
          children: "Spotlight On",
        }),
        d.jsx("div", {
          className:
            "w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden",
          children: l.map((i) =>
            d.jsxs(
              Oe,
              {
                to: "/product",
                className: "snap-start",
                children: [
                  d.jsx("img", {
                    src: i.icon,
                    alt: `image-${i.id}`,
                    className: "object-cover min-w-[260px] rounded h-[180px]",
                  }),
                  d.jsxs("p", {
                    className: "p-2",
                    children: ["Up to ", i.id, "0% off on ₹999"],
                  }),
                ],
              },
              i.id
            )
          ),
        }),
        d.jsx("div", {
          className:
            "absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100",
        }),
      ],
    });
  },
  _s = () => {
    const n = [
        {
          id: 1,
          icon: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/theme-image-1672163850249.png",
          title: "100% Authentic",
          content: "All our products are directly sourced from brands",
        },
        {
          id: 2,
          icon: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/theme-image-1672160879402.png",
          title: "Free Shipping",
          content: "On all orders above ₹299",
        },
        {
          id: 3,
          icon: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/theme-image-1672160905809.png",
          title: "Certified Beauty Advisors",
          content: "Get expert consultations",
        },
        {
          id: 4,
          icon: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/theme-image-1672160946022.png",
          title: "Easy Returns",
          content: "Hassle-free pick-ups and refunds",
        },
      ],
      [l] = T.useState(() => [...n].sort(() => Math.random() - 0.5));
    return d.jsx("div", {
      className: "py-5",
      children: d.jsx("div", {
        className:
          "grid bg-pink-100 md:grid-cols-4 grid-cols-2 gap-4 mx-auto max-w-6xl p-5",
        children: l.map((i) =>
          d.jsxs(
            "div",
            {
              className: "space-y-3",
              children: [
                d.jsx("img", { src: i.icon, alt: `icon-${i.id}`, width: 30 }),
                d.jsx("h4", {
                  className: "font-medium mt-5",
                  children: i.title,
                }),
                d.jsx("p", {
                  className: "text-xs max-w-[200px]",
                  children: i.content,
                }),
              ],
            },
            i.id
          )
        ),
      }),
    });
  },
  of = () => {
    const n = [
        {
          id: 1,
          icon: "/new/new (1).jpeg",
          title: "Kevin Aucoin",
          content: "Studio-approved makeup for your vanity",
        },
        {
          id: 2,
          icon: "/new/new (2).jpeg",
          title: "Tira Merch",
          content: "Go beyond beauty with high-quality everyday essentials",
        },
        {
          id: 3,
          icon: "/new/new (3).jpeg",
          title: "Nuse",
          content: "Makeup with soft colours for fresh and natural look",
        },
      ],
      [l] = T.useState(() => [...n].sort(() => Math.random() - 0.5));
    return d.jsxs("div", {
      className: "sm:p-4 p-3 mx-auto max-w-6xl",
      children: [
        d.jsx("h2", {
          className: "font-medium text-xl mb-5",
          children: "New On Cartify",
        }),
        d.jsx("div", {
          className: "grid md:grid-cols-3 sm:grid-cols-2 gap-4",
          children: l.map((i) =>
            d.jsxs(
              Oe,
              {
                to: "/product",
                className: "w-full",
                children: [
                  d.jsx("img", {
                    src: i.icon,
                    alt: "images",
                    className: "w-full object-contain rounded",
                  }),
                  d.jsxs("div", {
                    className: "p-2 space-y-1 text-slate-700",
                    children: [
                      d.jsx("h5", {
                        className: "font-medium",
                        children: i.title,
                      }),
                      d.jsx("p", { className: "text-xs", children: i.content }),
                    ],
                  }),
                ],
              },
              i.id
            )
          ),
        }),
      ],
    });
  },
  Es = () => {
    const n = [
        { id: 1, icon: "/wishlist/wishlist_1.jpeg" },
        { id: 2, icon: "/wishlist/wishlist_2.jpeg" },
        { id: 3, icon: "/wishlist/wishlist_3.jpeg" },
        { id: 4, icon: "/wishlist/wishlist_4.jpeg" },
        { id: 5, icon: "/wishlist/wishlist_5.jpeg" },
      ],
      [l] = T.useState(() => [...n].sort(() => Math.random() - 0.5));
    return d.jsxs("div", {
      className: "relative mx-auto max-w-6xl sm:p-4 p-3",
      children: [
        d.jsx("h2", {
          className: "font-medium text-xl",
          children: "For Your Wishlist",
        }),
        d.jsx("div", {
          className:
            "w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden",
          children: l.map((i) =>
            d.jsxs(
              Oe,
              {
                to: "/product",
                className: "snap-start",
                children: [
                  d.jsx("img", {
                    src: i.icon,
                    alt: `image-${i.id}`,
                    className: "object-cover min-w-[300px] rounded h-[200px]",
                  }),
                  d.jsxs("p", {
                    className: "p-2 text-gray-700",
                    children: ["Up to 2", i.id, "% off"],
                  }),
                ],
              },
              i.id
            )
          ),
        }),
        d.jsx("div", {
          className:
            "absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100",
        }),
      ],
    });
  },
  sE = () =>
    d.jsx("footer", {
      className: "sm:hidden sticky bottom-0 left-0 w-full p-3 bg-slate-50",
      children: d.jsxs("div", {
        className: "flex items-center justify-between text-sm",
        children: [
          d.jsxs(Oe, {
            to: "/",
            className: "flex items-center justify-center flex-col",
            children: [d.jsx(Gb, {}), " Home"],
          }),
          d.jsxs(Oe, {
            to: "/product",
            className: "flex items-center justify-center flex-col",
            children: [d.jsx(ax, {}), " Product"],
          }),
          d.jsxs(Oe, {
            to: "/favorite",
            className: "flex items-center justify-center flex-col",
            children: [d.jsx(v0, {}), " Wishlist"],
          }),
          d.jsxs(Oe, {
            to: "/cart",
            className: "flex items-center justify-center flex-col",
            children: [d.jsx(b0, {}), " Cart"],
          }),
          d.jsxs(Oe, {
            to: "/setting",
            className: "flex items-center justify-center flex-col",
            children: [d.jsx(dx, {}), " Account"],
          }),
        ],
      }),
    }),
  uE = () => {
    var f;
    const { data: n, loading: l, refetch: i } = Wa("/cart"),
      s = ((f = n == null ? void 0 : n.data) == null ? void 0 : f.items) || [];
    if (l) return d.jsx(Ia, {});
    if ((s == null ? void 0 : s.length) === 0)
      return d.jsxs("div", {
        children: [
          d.jsx("div", {
            className: "flex items-center justify-center p-4",
            children: d.jsxs("div", {
              className: "p-8 max-w-md text-center",
              children: [
                d.jsx(b0, {
                  className: "w-20 h-20 text-gray-400 mb-4 mx-auto",
                }),
                d.jsx("h2", {
                  className: "text-2xl font-semibold mb-2",
                  children: "Your cart is empty",
                }),
                d.jsx("p", {
                  className: "text-gray-600 mb-6",
                  children:
                    "Looks like you haven’t added anything to your cart yet.",
                }),
                d.jsx(Oe, {
                  to: "/product",
                  className:
                    "bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition",
                  children: "Start Shopping",
                }),
              ],
            }),
          }),
          d.jsx(_s, {}),
          d.jsx(Es, {}),
        ],
      });
    const o =
      s &&
      (s == null
        ? void 0
        : s.reduce((h, p) => p.productId.price * p.quantity + h, 0));
    return d.jsxs("section", {
      className: "min-h-screen sm:p-4 p-3 max-w-6xl mx-auto",
      children: [
        d.jsxs("div", {
          className: "flex max-sm:flex-col gap-5",
          children: [
            d.jsx("div", {
              className: "md:flex-1 w-full",
              children:
                s && s.map((h) => d.jsx(rE, { ...h, refetch: i }, h._id)),
            }),
            d.jsxs("div", {
              className: "p-4 md:w-1/3 space-y-3 w-full",
              children: [
                d.jsx("h3", { children: "This Order shipping Fee!" }),
                d.jsxs("div", {
                  className: "flex justify-between font-semibold text-xl",
                  children: [
                    d.jsxs("span", {
                      children: ["(", s == null ? void 0 : s.length, ") Item"],
                    }),
                    d.jsxs("span", { children: ["$", o | 1] }),
                  ],
                }),
                d.jsxs("div", {
                  className: "flex justify-between",
                  children: [
                    d.jsx("span", { children: "Shipping:" }),
                    d.jsx("span", { children: "FREE" }),
                  ],
                }),
                d.jsxs("div", {
                  className: "flex justify-between",
                  children: [
                    d.jsx("span", { children: "Estimate Tax:" }),
                    d.jsx("span", { children: "$5" }),
                  ],
                }),
                d.jsxs("div", {
                  className: "flex justify-between font-semibold text-3xl",
                  children: [
                    d.jsx("span", { children: "Total:" }),
                    d.jsxs("span", {
                      children: ["$", ((o + 5) | 0).toFixed(2)],
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className: "flex gap-6 text-sm font-semibold mt-10",
                  children: [
                    d.jsx(Oe, {
                      to: "/product",
                      className: "text-red-600 btn text-nowrap border",
                      children: "Go Product",
                    }),
                    d.jsx(Oe, {
                      to: "/shipping",
                      className: "bg-indigo-600 text-white btn",
                      children: "Checkout Address",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        d.jsx(_s, {}),
        d.jsx(Es, {}),
      ],
    });
  },
  jc = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035845/cartify/f8tk0reewmiwhnhmoeyu.avif",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035857/cartify/g54f8fsgovvs6eocrg2t.jpg",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035857/cartify/f1nswsejcfriolo1tlxa.jpg",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035857/cartify/jzamllhecn4x1jk4n1vd.jpg",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035859/cartify/ryf2cqa2acp3k7mycum0.jpg",
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035861/cartify/vcb8fentke1pz0rsrcyw.jpg",
    },
  ],
  oE = () => {
    var o;
    const { list: n } = Zt((f) => f.categories),
      { list: l } = Zt((f) => f.brands),
      [i, s] = T.useState(0);
    return (
      T.useEffect(() => {
        const f = setInterval(() => {
          s((h) => (h + 1) % jc.length);
        }, 3e3);
        return () => clearInterval(f);
      }, [i]),
      d.jsxs("main", {
        className: "min-h-screen",
        children: [
          d.jsx("div", {
            className: "w-full max-w-6xl mx-auto",
            children: d.jsxs("div", {
              className: "h-full relative overflow-hidden",
              children: [
                d.jsx(Oe, {
                  to: "/product",
                  className: "",
                  children: d.jsx("img", {
                    src: (o = jc[i]) == null ? void 0 : o.image,
                    alt: "image",
                    className: "object-cover bg-right w-full max-sm:h-[40vh]",
                  }),
                }),
                d.jsx("div", {
                  className: "flex items-center justify-center py-2",
                  children: jc.map((f, h) =>
                    d.jsx(
                      "button",
                      {
                        className: `w-2 h-2 rounded-full mx-1 cursor-pointer ${i === h ? "bg-gray-800 w-10" : "bg-gray-300"}`,
                        onClick: () => s(h),
                      },
                      h
                    )
                  ),
                }),
              ],
            }),
          }),
          d.jsx(e0, {
            items: n == null ? void 0 : n.items,
            heading: "Categories",
            slug: "category",
          }),
          d.jsx(iE, {}),
          d.jsx(e0, {
            items: l == null ? void 0 : l.items,
            heading: "Brands",
            slug: "brand",
          }),
          d.jsx(of, {}),
          d.jsx(_s, {}),
          d.jsx(Es, {}),
        ],
      })
    );
  },
  cE = () => {
    const { id: n } = o0(),
      [l, i] = T.useState(null),
      [s, o] = T.useState(!0),
      [f, h] = T.useState("black"),
      [p, g] = T.useState(1);
    T.useEffect(() => {
      (async () => {
        try {
          o(!0);
          const x = await Qe.get(`/product/${n}`);
          x.data && i(x.data);
        } catch (x) {
          console.log(x);
        } finally {
          o(!1);
        }
      })();
    }, [n]);
    const m = async (v, x) => {
      try {
        (await Qe.post("/cart", { productId: v, quantity: x })).data &&
          ne.success("Add to cart success");
      } catch (w) {
        yl(w);
      }
    };
    return s
      ? d.jsx(Ia, {})
      : d.jsxs("section", {
          children: [
            d.jsx("div", {
              className: "mx-auto max-w-screen-lg p-4 text-gray-800",
              children: d.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                  d.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      d.jsx("div", {
                        className:
                          "aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg",
                        children: d.jsx("img", {
                          src:
                            (l == null ? void 0 : l.thumbnail) ||
                            "https://placehold.co/600x600",
                          alt: "Product",
                          className:
                            "object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100",
                          loading: "lazy",
                        }),
                      }),
                      d.jsx("div", {
                        className: "grid grid-cols-4 gap-4",
                        children: Array.from({ length: 4 }, (v, x) =>
                          d.jsx(
                            "button",
                            {
                              className:
                                "aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg",
                              children: d.jsx("img", {
                                src:
                                  (l == null ? void 0 : l.images[x]) ||
                                  "https://placehold.co/150x150",
                                alt: x + "_Product-images",
                                className:
                                  "object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100",
                                loading: "lazy",
                              }),
                            },
                            x
                          )
                        ),
                      }),
                    ],
                  }),
                  d.jsxs("div", {
                    className: "space-y-6",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("h1", {
                            className: "text-3xl font-bold mb-2",
                            children: l == null ? void 0 : l.title,
                          }),
                          d.jsxs("div", {
                            className: "flex items-center space-x-4",
                            children: [
                              d.jsxs("div", {
                                className: "flex items-center",
                                children: [
                                  d.jsx(Or, { className: "text-yellow-400" }),
                                  d.jsx("span", {
                                    className: "ml-2 text-sm ",
                                    children: "(128 reviews)",
                                  }),
                                ],
                              }),
                              d.jsx("span", {
                                className: "text-green-600",
                                children: "In Stock",
                              }),
                            ],
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          d.jsxs("div", {
                            className: "flex items-center",
                            children: [
                              d.jsxs("span", {
                                className: "text-3xl font-bold",
                                children: ["$", l == null ? void 0 : l.price],
                              }),
                              d.jsxs("span", {
                                className: "ml-4 text-lg  line-through",
                                children: [
                                  "$",
                                  (
                                    (l == null ? void 0 : l.price) /
                                    (1 -
                                      (l == null ? void 0 : l.discount) / 100)
                                  ).toFixed(2),
                                ],
                              }),
                              d.jsxs("span", {
                                className:
                                  "ml-2 bg-red-500 text-white px-2 py-1 text-sm rounded",
                                children: [
                                  l == null ? void 0 : l.discount,
                                  "% OFF",
                                ],
                              }),
                            ],
                          }),
                          d.jsx("p", {
                            className: "text-sm ",
                            children: "Price includes VAT",
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        children: [
                          d.jsx("h3", {
                            className: "font-semibold mb-3",
                            children: "Color",
                          }),
                          d.jsx("div", {
                            className: "flex space-x-3",
                            children: ["black", "blue", "gray"].map((v) =>
                              d.jsx(
                                "button",
                                {
                                  onClick: () => h(v),
                                  style: { background: v },
                                  className: `w-8 h-8 rounded-full cursor-pointer ${v === f && "ring-2 ring-offset-2 ring-black"}`,
                                },
                                v
                              )
                            ),
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        children: [
                          d.jsx("span", {
                            className: "text-xl capitalize",
                            children: l == null ? void 0 : l.brand,
                          }),
                          d.jsx("span", {
                            className:
                              "px-4 py-1 ml-4 capitalize rounded-lg bg-gray-100",
                            children: l == null ? void 0 : l.category,
                          }),
                          d.jsx("p", {
                            className: "pt-5",
                            children: l == null ? void 0 : l.description,
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        children: [
                          d.jsx("h3", {
                            className: "font-semibold mb-3",
                            children: "Quantity",
                          }),
                          d.jsxs("div", {
                            className: "flex items-center space-x-4",
                            children: [
                              d.jsxs("div", {
                                className:
                                  "flex items-center border rounded-lg border-gray-300",
                                children: [
                                  d.jsx("button", {
                                    onClick: () =>
                                      g((v) => (v === 1 ? 1 : v - 1)),
                                    className:
                                      "px-4 py-2 hover:bg-gray-100 cursor-pointer",
                                    children: "-",
                                  }),
                                  d.jsx("button", {
                                    className:
                                      "px-4 text-center border-x border-gray-300",
                                    children: p,
                                  }),
                                  d.jsx("button", {
                                    onClick: () =>
                                      g((v) =>
                                        v === (l == null ? void 0 : l.stock)
                                          ? l == null
                                            ? void 0
                                            : l.stock
                                          : v + 1
                                      ),
                                    className:
                                      "px-4 py-2 hover:bg-gray-100 cursor-pointer",
                                    children: "+",
                                  }),
                                ],
                              }),
                              d.jsxs("span", {
                                className: "text-sm ",
                                children: [
                                  (l == null ? void 0 : l.stock) - p,
                                  " items available",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        className: "flex space-x-4",
                        children: [
                          d.jsx("button", {
                            onClick: () =>
                              m((l == null ? void 0 : l._id) || "", p),
                            className:
                              "flex-1 bg-blue-600 max-w-56 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors",
                            children: "Add to Cart",
                          }),
                          d.jsx(yp, {
                            id: n || "",
                            className: "py-2 px-3 border rounded-lg",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            d.jsx(_s, {}),
            d.jsx(lE, {}),
            d.jsx(of, {}),
            d.jsx(Es, {}),
          ],
        });
  },
  fE = (n = "", l = 1500) => {
    const [i, s] = T.useState(n);
    return (
      T.useEffect(() => {
        const o = setTimeout(() => {
          s(n);
        }, l);
        return () => {
          clearTimeout(o);
        };
      }, [n, l]),
      i
    );
  },
  dE = [
    { label: "Title (A-Z)", value: "title-asc" },
    { label: "Title (Z-A)", value: "title-desc" },
    { label: "Price (Low to High)", value: "price-asc" },
    { label: "Price (High to Low)", value: "price-desc" },
  ],
  hE = [
    { label: "10 Items per Page", value: 10 },
    { label: "30 Items per Page", value: 30 },
    { label: "50 Items per Page", value: 50 },
    { label: "100 Items per Page", value: 100 },
  ],
  mE = [
    { _id: 1, title: "1.0 ★ below 2 to 1" },
    { _id: 2, title: "2.0 ★ below 3 to 2" },
    { _id: 3, title: "3.0 ★ below 4 to 3" },
    { _id: 4, title: "4.0 ★ below 5 to 4" },
    { _id: 5, title: "5.0 ★ below 5 to 4.5" },
  ],
  yE = () => {
    var At, Le;
    const [n] = Nb(),
      { list: l } = Zt((U) => U.categories),
      { list: i } = Zt((U) => U.brands),
      [s, o] = T.useState(10),
      [f, h] = T.useState(n.get("category") || ""),
      [p, g] = T.useState(n.get("brand") || ""),
      [m, v] = T.useState(0),
      [x, w] = T.useState(0),
      [C, E] = T.useState(1e5),
      [S, R] = T.useState("title-asc"),
      [O, M] = T.useState(1),
      [B, G] = T.useState(""),
      q = fE(B, 500),
      { isOpen: Z, setIsOpen: K, dropdownRef: P } = ps(),
      F = new URLSearchParams({
        ...(f && { category: f }),
        ...(p && { brand: p }),
        minPrice: x.toString(),
        maxPrice: C.toString(),
        ...(m && {
          minRating: (m === 5 ? m - 0.5 : m).toString(),
          maxRating: (m === 5 ? m : m + 1).toString(),
        }),
        sortBy: S.split("-")[0],
        order: S.split("-")[1],
        page: O,
        limit: s,
        title: q,
      }).toString(),
      { data: ee } = Wa(`/product?${F}`),
      Ee = (U) => {
        U >= 1 && U <= ((ee == null ? void 0 : ee.totalPages) || 1) && M(U);
      },
      Te = () => {
        const { isOpen: U, setIsOpen: $, dropdownRef: te } = ps();
        return d.jsxs("div", {
          className: "relative",
          ref: te,
          children: [
            d.jsxs("button", {
              onClick: () => $(!0),
              className:
                "btn border border-gray-300 !py-1.5 !flex items-center gap-1",
              children: ["Sort ", d.jsx(Vb, { size: 16 })],
            }),
            d.jsxs("div", {
              className: `absolute mt-1 z-20 card duration-300 ease-in ${U ? "right-0 opacity-100" : "right-80 sm:-right-80 opacity-0"}`,
              children: [
                dE.map((fe) =>
                  d.jsx(
                    "button",
                    {
                      onClick: () => R(fe.value),
                      className: `block text-left pl-4 text-nowrap hover:bg-indigo-100 rounded px-3 py-2 ${fe.value === S && "text-indigo-600"}`,
                      children: fe.label,
                    },
                    fe.label
                  )
                ),
                hE.map((fe) =>
                  d.jsx(
                    "button",
                    {
                      onClick: () => o(fe.value),
                      className: `block text-left pl-4 text-nowrap hover:bg-indigo-100 rounded px-3 py-2 ${fe.value == Number(s) && "text-indigo-600"}`,
                      children: fe.label,
                    },
                    fe.label
                  )
                ),
              ],
            }),
          ],
        });
      },
      it = be.useCallback(
        (U = [], $ = "", te = "", fe) =>
          (U == null ? void 0 : U.length) > 1 &&
          d.jsxs("div", {
            children: [
              d.jsx("h3", { className: "font-medium", children: $ }),
              d.jsx("ul", {
                children: U.map((N) =>
                  d.jsxs(
                    "label",
                    {
                      htmlFor: N.title,
                      className:
                        "flex items-center capitalize text-sm mb-1 cursor-pointer",
                      children: [
                        d.jsx("input", {
                          onChange: (V) => fe(V.target.checked ? N.title : ""),
                          value: te,
                          checked: te === N.title,
                          id: N.title,
                          name: N.title,
                          type: "checkbox",
                          className: "form-checkbox text-blue-600",
                        }),
                        d.jsx("span", {
                          className: "ml-2",
                          children: N.title.replace("-", " "),
                        }),
                      ],
                    },
                    N._id
                  )
                ),
              }),
            ],
          }),
        []
      );
    return d.jsx("section", {
      className: "p-2 max-w-6xl mx-auto",
      children: d.jsxs("div", {
        className: "lg:grid gap-5",
        style: { gridTemplateColumns: "1fr 3fr" },
        children: [
          d.jsx("div", {
            className: Z
              ? "fixed inset-0 bg-black/50 z-30 pt-20 duration-300 ease-in"
              : "w-full max-lg:hidden lg:sticky lg:h-fit lg:top-[54px]",
            children: d.jsxs("div", {
              ref: P,
              className: Z
                ? "!p-5 h-full text-gray-800 !rounded-2xl bg-white overflow-auto card flex flex-col gap-4"
                : "overflow-y-auto scrollbar card text-gray-800  flex flex-col gap-4",
              children: [
                d.jsxs("div", {
                  className: "flex justify-between",
                  children: [
                    d.jsx("h2", {
                      className: "font-bold text-lg",
                      children: "Filters",
                    }),
                    d.jsx("button", {
                      className: "text-sm text-red-600 font-bold",
                      onClick: () => {
                        o(10), h(""), g(""), E(1e5), w(0), v(0), G(""), M(1);
                      },
                      children: "Clear All",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  children: [
                    d.jsx("h3", {
                      className: "font-medium",
                      children: "Price Range",
                    }),
                    d.jsx("input", {
                      type: "range",
                      className: "w-full",
                      min: 0,
                      max: 1e5,
                      step: "10",
                      onChange: (U) => E(parseInt(U.target.value)),
                    }),
                    d.jsxs("div", {
                      className: "flex gap-5 justify-between text-sm",
                      children: [
                        d.jsx("input", {
                          type: "number",
                          className: "w-full px-2 py-1 border rounded",
                          placeholder: "Min",
                          value: x,
                          onChange: (U) => w(parseInt(U.target.value)),
                        }),
                        d.jsx("input", {
                          type: "number",
                          className: "w-full px-2 py-1 border rounded",
                          placeholder: "Max",
                          value: C,
                          onChange: (U) => E(parseInt(U.target.value)),
                        }),
                      ],
                    }),
                  ],
                }),
                it(l == null ? void 0 : l.items, "Category", f, h),
                it(i == null ? void 0 : i.items, "Brand", p, g),
                d.jsxs("div", {
                  children: [
                    d.jsx("h3", {
                      className: "font-medium",
                      children: "Rating",
                    }),
                    d.jsx("ul", {
                      className:
                        "max-h-[200px] overflow-y-auto w-full scrollbar-hidden",
                      children: mE.map((U) =>
                        d.jsxs(
                          "label",
                          {
                            htmlFor: U._id,
                            className:
                              "flex items-center gap-2 capitalize text-sm cursor-pointer",
                            children: [
                              d.jsx("input", {
                                onChange: ($) =>
                                  v($.target.checked ? U._id : 0),
                                value: m,
                                checked: m === U._id,
                                id: U._id,
                                name: U._id,
                                type: "checkbox",
                                className: "form-checkbox text-blue-600",
                              }),
                              d.jsx("span", {
                                className: "ml-2",
                                children: U.title,
                              }),
                            ],
                          },
                          U._id
                        )
                      ),
                    }),
                  ],
                }),
              ],
            }),
          }),
          d.jsxs("div", {
            className: "flex-1 flex flex-col gap-4 overflow-hidden",
            children: [
              d.jsxs("div", {
                className: "flex sm:gap-4 gap-2 flex-wrap items-center",
                children: [
                  d.jsx(ot, {
                    name: "search",
                    value: B,
                    onChange: (U) => G(U.target.value),
                    type: "text",
                    className: "w-full min-w-[300px] pl-4",
                    placeholder: "Search...",
                  }),
                  d.jsxs("button", {
                    onClick: () => K(!Z),
                    className:
                      "border rounded-lg border-gray-300 !py-1.5 px-4 ! flex items-center gap-1 lg:hidden",
                    children: ["Filter", d.jsx(ex, { size: 16 })],
                  }),
                  d.jsx(Te, {}),
                ],
              }),
              !(ee != null && ee.totalItems) &&
                d.jsx(Ia, { className: "h-[70vh]" }),
              d.jsx("div", {
                className: "grid sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4",
                children:
                  ((At = ee == null ? void 0 : ee.items) == null
                    ? void 0
                    : At.length) &&
                  ((Le = ee == null ? void 0 : ee.items) == null
                    ? void 0
                    : Le.map((U) =>
                        d.jsx(pp, { ...U }, U == null ? void 0 : U._id)
                      )),
              }),
              d.jsxs("div", {
                className:
                  "flex  gap-4 flex-wrap justify-between items-center card",
                children: [
                  d.jsxs("h2", {
                    children: [
                      "Showing ",
                      (O - 1) * s + 1,
                      " to",
                      " ",
                      Math.min(
                        O * s,
                        (ee == null ? void 0 : ee.totalItems) || 0
                      ),
                      " of",
                      " ",
                      ee == null ? void 0 : ee.totalItems,
                    ],
                  }),
                  d.jsxs("div", {
                    className: "flex gap-2 items-center",
                    children: [
                      d.jsx("button", {
                        className: `svg-btn !w-14 border border-neutral-200 rounded-lg hover:bg-gray-50 ${O === 1 && "hidden"}`,
                        onClick: () => Ee(O - 1),
                        children: "Prev",
                      }),
                      d.jsx(V2, {
                        handlePageChange: Ee,
                        page: (ee == null ? void 0 : ee.page) || 1,
                        totalPages: (ee == null ? void 0 : ee.totalPages) || 1,
                      }),
                      d.jsx("button", {
                        className: `svg-btn !w-14 border border-neutral-200 rounded-lg hover:bg-gray-50 ${O === (ee == null ? void 0 : ee.totalPages) && "hidden"}`,
                        onClick: () => Ee(O + 1),
                        children: "Next",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  pE = () => {
    const n = async (l) => {
      l.preventDefault();
      const i = l.target.email.value,
        s = l.target.password.value;
      if (!i || !s) return ne.error("please fill the valid inputs");
      try {
        const { data: o } = await Qe.post("/user/sign-in", {
          email: i,
          password: s,
        });
        o &&
          (ne.success("user login succeeded"),
          localStorage.setItem("token", o.accessToken),
          (window.location.href = "/"));
      } catch (o) {
        ne.error(o == null ? void 0 : o.message);
      }
    };
    return d.jsx("section", {
      className: "flex items-center justify-center p-4 min-h-[80vh]",
      children: d.jsx("div", {
        className: "w-full max-w-md space-y-8",
        children: d.jsxs("div", {
          className: "bg-white p-8 rounded-lg border border-gray-200",
          children: [
            d.jsxs("div", {
              className: "text-center mb-8",
              children: [
                d.jsx("h2", {
                  className: "text-2xl font-bold text-gray-900",
                  children: "Welcome back",
                }),
                d.jsx("p", {
                  className: "text-gray-600 mt-2",
                  children: "Sign in to your account",
                }),
              ],
            }),
            d.jsxs("form", {
              onSubmit: n,
              className: "space-y-4",
              children: [
                d.jsx(ot, {
                  defaultValue: "guest-user@gmail.com",
                  name: "email",
                  type: "email",
                  label: "Email",
                  autoComplete: "off",
                  required: !0,
                }),
                d.jsx(ot, {
                  defaultValue: "12345",
                  name: "password",
                  type: "text",
                  label: "Password",
                  autoComplete: "off",
                  required: !0,
                }),
                d.jsx("button", {
                  type: "submit",
                  className:
                    "w-full mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                  children: "Login",
                }),
              ],
            }),
            d.jsxs("p", {
              className: "mt-6 text-center text-sm",
              children: [
                "Don't have an account?",
                d.jsx(Oe, {
                  to: "/register",
                  className:
                    "text-indigo-600 mx-2 font-medium underline hover:text-indigo-500",
                  children: "Register",
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  gE = () => {
    const n = Rn(),
      l = async (i) => {
        i.preventDefault();
        const s = i.target.email.value,
          o = i.target.password.value,
          f = i.target.confirmPassword.value,
          h = i.target.fullName.value;
        try {
          if (o !== f) return ne.error("please check your password");
          (
            await Qe.post("/user/sign-up", {
              email: s,
              password: o,
              fullName: h,
              role: "customer",
            })
          ).data && (ne.success("User register succeeded"), n("/login"));
        } catch (p) {
          ne.error(p == null ? void 0 : p.message);
        }
      };
    return d.jsx("section", {
      className: "flex items-center justify-center p-4 min-h-[80vh]",
      children: d.jsx("div", {
        className: "w-full max-w-md space-y-8",
        children: d.jsxs("div", {
          className: "bg-white p-8 rounded-lg border border-gray-200",
          children: [
            d.jsxs("div", {
              className: "text-center mb-8",
              children: [
                d.jsx("h2", {
                  className: "text-2xl font-bold text-gray-900",
                  children: "Create account",
                }),
                d.jsx("p", {
                  className: "text-gray-600 mt-2",
                  children: "Sign up for a new account",
                }),
              ],
            }),
            d.jsxs("form", {
              onSubmit: l,
              className: "space-y-4",
              children: [
                d.jsx(ot, {
                  name: "fullName",
                  type: "text",
                  label: "fullName",
                }),
                d.jsx(ot, { name: "email", type: "email", label: "Email" }),
                d.jsx(ot, {
                  name: "password",
                  type: "text",
                  label: "Password",
                }),
                d.jsx(ot, {
                  name: "confirmPassword",
                  type: "text",
                  label: "Confirm Password",
                }),
                d.jsx("button", {
                  type: "submit",
                  className:
                    "w-full mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                  children: "Create account",
                }),
              ],
            }),
            d.jsxs("p", {
              className: "mt-6 text-center text-sm",
              children: [
                "Already have an account?",
                d.jsx(Oe, {
                  to: "/login",
                  className:
                    "text-indigo-600 mx-2 font-medium underline hover:text-indigo-500",
                  children: "Login",
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  vE = () =>
    d.jsx("div", {
      className: "flex items-center justify-center min-h-screen",
      children: d.jsx("div", {
        children: d.jsx(Oe, { to: "/admin", children: "Home" }),
      }),
    }),
  bE = () =>
    d.jsxs("div", {
      className: "p-4 flex flex-col gap-10 mx-auto max-w-screen-sm",
      children: [d.jsx(xE, {}), d.jsx(SE, {})],
    }),
  xE = () => {
    const n = Zt((h) => h.auth.user),
      [l, i] = T.useState((n == null ? void 0 : n.avatar) || ""),
      [s, o] = T.useState(!1),
      f = async (h) => {
        o(!0);
        try {
          if (h.target.files && h.target.files[0]) {
            const p = new FormData();
            p.append("avatar", h.target.files[0]);
            const g = await Qe.post("/user/avatar", p);
            g.data &&
              (ne.success("upload avatar image succeed"), i(g.data.avatar));
          }
        } catch (p) {
          console.log(p), ne.error("Something went wrong");
        } finally {
          o(!1);
        }
      };
    return d.jsxs("div", {
      className: "card",
      children: [
        d.jsx("h2", {
          className: "text-lg font-bold pb-4",
          children: "Profile Avatar",
        }),
        d.jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            d.jsx("div", {
              className:
                "w-32 relative h-32 rounded-full mb-4 overflow-hidden border",
              children: l
                ? d.jsx("img", {
                    src: l.toString(),
                    alt: "Profile",
                    className: "w-full h-full object-cover",
                    loading: "lazy",
                  })
                : d.jsx("img", {
                    src:
                      (n == null ? void 0 : n.avatar) ||
                      "https://avatar.iran.liara.run/public",
                    alt: "Profile",
                    className:
                      "w-full h-full object-cover transition-opacity duration-300 opacity-100",
                    loading: "lazy",
                  }),
            }),
            d.jsx("label", {
              htmlFor: "upload-avatar",
              className: "btn-primary",
              children: s ? "Uploading..." : "Upload Avatar",
            }),
            d.jsx(ot, {
              onChange: f,
              type: "file",
              id: "upload-avatar",
              className: "hidden",
            }),
          ],
        }),
      ],
    });
  },
  SE = () => {
    const n = Zt((w) => w.auth.user),
      [l, i] = T.useState(!1),
      [s, o] = T.useState({
        fullName: (n == null ? void 0 : n.fullName) || "",
        email: (n == null ? void 0 : n.email) || "",
      }),
      [f, h] = T.useState({ oldPassword: "", newPassword: "" }),
      [p, g] = T.useState(!1),
      m = (w) => {
        const { name: C, value: E } = w.target;
        o({ ...s, [C]: E });
      },
      v = async (w) => {
        w.preventDefault();
        try {
          i(!0),
            (await Qe.patch("/user/update", s)).data &&
              ne.success("user update success");
        } catch (C) {
          console.log(C), ne.error("user update failed");
        } finally {
          i(!1);
        }
      },
      x = async (w) => {
        w.preventDefault(), g(!0);
        try {
          (await Qe.post("/user/password", { ...f })).data &&
            ne.success("password update success");
        } catch (C) {
          ne.error(JSON.stringify(C.response.data.message));
        } finally {
          g(!1);
        }
      };
    return d.jsxs("div", {
      children: [
        d.jsxs("form", {
          className: "grid gap-4 flex-1 card mb-4",
          onSubmit: v,
          children: [
            d.jsx("h2", {
              className: "text-lg font-bold pt-4 pb-2",
              children: "User Information",
            }),
            d.jsx(ot, {
              value: s.fullName,
              onChange: m,
              name: "fullName",
              label: "fullName",
              required: !0,
            }),
            d.jsx(ot, {
              value: s.email,
              onChange: m,
              name: "email",
              label: "email",
              required: !0,
            }),
            d.jsx("button", {
              className: "btn bg-indigo-600 text-white disabled:bg-indigo-300",
              disabled:
                l ||
                ((n == null ? void 0 : n.email) === s.email &&
                  (n == null ? void 0 : n.fullName) === s.fullName),
              children: l ? "Saving..." : "Save Changes",
            }),
          ],
        }),
        d.jsxs("form", {
          onSubmit: x,
          className: "space-y-3 card flex flex-col",
          children: [
            d.jsx("h2", {
              className: "text-lg font-bold pt-4 pb-2",
              children: "Password Change",
            }),
            d.jsx(ot, {
              name: "oldPassword",
              label: "oldPassword",
              value: f.oldPassword,
              onChange: (w) => h({ ...f, oldPassword: w.target.value }),
            }),
            d.jsx(ot, {
              name: "newPassword",
              label: "newPassword",
              value: f.newPassword,
              onChange: (w) => h({ ...f, newPassword: w.target.value }),
            }),
            d.jsx("button", {
              className: "btn bg-indigo-600 text-white disabled:bg-indigo-300",
              type: "submit",
              disabled: p || f.newPassword.length < 5,
              children: p ? "Saving..." : "Save Change",
            }),
          ],
        }),
      ],
    });
  },
  wE = () => {
    const { data: n, loading: l } = Wa("/user/favorite");
    return l
      ? d.jsx(Ia, {})
      : d.jsxs("div", {
          children: [
            d.jsxs("div", {
              className: "relative mx-auto max-w-6xl sm:p-4 p-3",
              children: [
                d.jsx("h2", {
                  className: "font-medium text-xl my-5",
                  children: "Favorite Item Gallery",
                }),
                (n == null ? void 0 : n.length) > 0
                  ? d.jsx("div", {
                      className:
                        "grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full",
                      children:
                        n == null
                          ? void 0
                          : n.map((i) => d.jsx(pp, { ...i }, i.id)),
                    })
                  : d.jsxs("div", {
                      className: "py-10 text-center space-y-4",
                      children: [
                        d.jsx("p", {
                          className: "",
                          children: "Your favorite is empty.",
                        }),
                        d.jsx(Oe, {
                          to: "/product",
                          className: "btn border text-indigo-600",
                          children: "Go to Products",
                        }),
                      ],
                    }),
              ],
            }),
            d.jsx(of, {}),
          ],
        });
  },
  _E = () =>
    d.jsx("div", {
      className: "min-h-screen flex items-center justify-center p-6",
      children: d.jsxs("div", {
        className: "bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center",
        children: [
          d.jsx(qb, { className: "text-red-500 w-16 h-16 mx-auto mb-4" }),
          d.jsx("h1", {
            className: "text-2xl font-bold mb-2",
            children: "Payment Failed",
          }),
          d.jsx("p", {
            className: "text-gray-600 mb-6",
            children:
              "Oops! Something went wrong. Your payment was not successful.",
          }),
          d.jsx(Rs, {
            to: "/",
            className:
              "inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl transition",
            children: "Try Again",
          }),
        ],
      }),
    }),
  EE = () =>
    d.jsx("div", {
      className: "min-h-screen flex items-center justify-center p-6",
      children: d.jsxs("div", {
        className: "bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center",
        children: [
          d.jsx(Bb, { className: "text-green-500 w-16 h-16 mx-auto mb-4" }),
          d.jsx("h1", {
            className: "text-2xl font-bold mb-2",
            children: "Payment Successful!",
          }),
          d.jsx("p", {
            className: "text-gray-600 mb-6",
            children:
              "Thank you for your purchase. Your order has been placed successfully.",
          }),
          d.jsx(Rs, {
            to: "/",
            className:
              "inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition",
            children: "Continue Shopping",
          }),
        ],
      }),
    }),
  TE = () =>
    d.jsx("div", {
      className: "min-h-screen flex items-center justify-center p-6",
      children: d.jsxs("div", {
        className: "bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center",
        children: [
          d.jsx(Jb, { className: "w-20 h-20 text-gray-400 mb-4 mx-auto" }),
          d.jsx("h2", {
            className: "text-2xl font-semibold mb-2",
            children: "No Orders Yet",
          }),
          d.jsx("p", {
            className: "text-gray-600 mb-6",
            children:
              "You haven’t placed any orders. Start shopping to place your first order.",
          }),
          d.jsx(Oe, {
            to: "/",
            className:
              "bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition",
            children: "Shop Now",
          }),
        ],
      }),
    }),
  NE = () => {
    const { data: n, loading: l } = Wa("/order");
    return (n == null ? void 0 : n.length) === 0
      ? d.jsx(TE, {})
      : d.jsx("div", {
          children: d.jsxs("div", {
            className: "p-2 min-h-screen",
            children: [
              d.jsx("h1", {
                className: "text-2xl font-bold mb-6",
                children: "My Orders",
              }),
              l
                ? d.jsx(Ia, {})
                : d.jsx("div", {
                    className:
                      "grid lg:grid-cols-3 sm:grid-cols-2 border-2 border-gray-300",
                    children:
                      n == null
                        ? void 0
                        : n.map((i) => {
                            var s, o;
                            return d.jsxs(
                              "div",
                              {
                                className:
                                  "bg-white p-4 border border-gray-300",
                                children: [
                                  d.jsxs("div", {
                                    className: "text-sm mb-2 space-x-2",
                                    children: [
                                      d.jsx("span", { children: "Order ID:" }),
                                      d.jsx("span", {
                                        className: "font-mono",
                                        children: i._id,
                                      }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className:
                                      "text-sm flex text-gray-700 mb-2 space-x-2",
                                    children: [
                                      d.jsx("span", { children: "Products:" }),
                                      d.jsx("span", {
                                        children:
                                          (s = i == null ? void 0 : i.items) ==
                                          null
                                            ? void 0
                                            : s.map((f, h) =>
                                                d.jsxs(
                                                  Oe,
                                                  {
                                                    to: `/product/${f.productId._id}`,
                                                    className:
                                                      "border-b block w-fit",
                                                    children: [
                                                      f.productId.title,
                                                      " x",
                                                      f.quantity,
                                                      h < i.items.length - 1
                                                        ? ", "
                                                        : "",
                                                    ],
                                                  },
                                                  h
                                                )
                                              ),
                                      }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className:
                                      "text-sm text-gray-600 mb-2 space-x-2",
                                    children: [
                                      d.jsx("span", { children: "Status:" }),
                                      d.jsx("span", {
                                        className: `font-semibold capitalize ${i.status === "pending" ? "text-yellow-500" : "text-green-600"}`,
                                        children: i.status,
                                      }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className:
                                      "text-sm text-gray-600 mb-2 space-x-2",
                                    children: [
                                      d.jsx("span", { children: "Total:" }),
                                      d.jsxs("strong", {
                                        children: [
                                          (o = i == null ? void 0 : i.items) ==
                                          null
                                            ? void 0
                                            : o
                                                .reduce(
                                                  (f, h) =>
                                                    h.productId.price *
                                                      h.quantity +
                                                    f,
                                                  0
                                                )
                                                .toFixed(2),
                                          " ",
                                          "Rs. /-",
                                        ],
                                      }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className:
                                      "text-sm text-gray-600 mb-2 space-x-2",
                                    children: [
                                      d.jsx("span", { children: "Date:" }),
                                      d.jsx("span", {
                                        children: Kc(
                                          new Date(i.createdAt || Date.now()),
                                          "dd MMM yyyy h:mma"
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              i._id
                            );
                          }),
                  }),
            ],
          }),
        });
  },
  jE = () => {
    const { data: n, refetch: l, loading: i } = Wa("/address"),
      [s, o] = T.useState(!1),
      f =
        n == null ? void 0 : n.find((C) => (C == null ? void 0 : C.isDefault)),
      { user: h } = Zt((C) => C.auth),
      [p, g] = T.useState({
        addressLine: (f == null ? void 0 : f.addressLine) || "",
        city: (f == null ? void 0 : f.city) || "",
        postalCode: (f == null ? void 0 : f.postalCode) || "",
        countryCode: (f == null ? void 0 : f.countryCode) || "IN",
        isDefault: (f == null ? void 0 : f.isDefault) || !1,
        isEdit: !1,
      }),
      m = async (C) => {
        C.preventDefault();
        try {
          if ((o(!0), !p.addressLine || !p.city || !p.postalCode))
            throw new Error("please fill all filed");
          const E = p != null && p._id ? "patch" : "post",
            S = p != null && p._id ? `/address/${p._id}` : "/address";
          (await Qe[E](S, { ...p, countryCode: "IN" })).data &&
            (g({ isEdit: !1 }), l());
        } catch (E) {
          yl(E);
        } finally {
          o(!1);
        }
      },
      v = async (C) => {
        try {
          (await Qe.delete(`/address/${C}`)).data && l();
        } catch (E) {
          yl(E);
        }
      },
      x = async () => {
        var C;
        try {
          if (!p._id) return ne.error("user address not define");
          const E = await Qe.post("/stripe/stripe-checkout", {
            userId: h._id,
            addressId: p == null ? void 0 : p._id,
          });
          E.data &&
            (window.location.href = (C = E.data) == null ? void 0 : C.url);
        } catch (E) {
          yl(E);
        }
      },
      w = (C) => {
        const { type: E, name: S, value: R, checked: O } = C.target;
        g({ ...p, [S]: E === "checkbox" ? O : R });
      };
    return i
      ? d.jsx(Ia, {})
      : d.jsxs("div", {
          className: "p-4 min-h-screen mx-auto max-w-6xl",
          children: [
            !p.isEdit &&
              d.jsx("div", {
                className:
                  "border border-gray-300 cursor-pointer card mb-5 relative max-w-3xl",
                onClick: () => g({ isEdit: !0 }),
                children: d.jsx("h2", {
                  className: "font-semibold pl-2",
                  children: "Add New Address",
                }),
              }),
            !p.isEdit &&
              (n == null
                ? void 0
                : n.map((C) =>
                    d.jsxs(
                      "div",
                      {
                        className: "relative mb-5 max-w-3xl",
                        children: [
                          d.jsxs("div", {
                            onClick: () => g(C),
                            className: `capitalize !pl-5 border border-gray-300 cursor-pointer card ${C._id === p._id && "!bg-indigo-100 border !border-indigo-300"}`,
                            children: [
                              d.jsx("h4", {
                                className: "font-semibold",
                                children: C.addressLine,
                              }),
                              d.jsxs("p", {
                                children: [
                                  C.city,
                                  ", ",
                                  C.postalCode,
                                  ", India",
                                ],
                              }),
                            ],
                          }),
                          d.jsx("button", {
                            onClick: () => g({ ...p, isEdit: !0 }),
                            className: "svg-btn p-2 absolute right-10 top-5",
                            children: d.jsx(Fb, {}),
                          }),
                          d.jsx("button", {
                            onClick: () => v(C._id),
                            className:
                              "svg-btn p-2 absolute right-0 top-5 text-red-600",
                            children: d.jsx(ux, {}),
                          }),
                        ],
                      },
                      C._id
                    )
                  )),
            d.jsxs("div", {
              className: "flex gap-5 text-sm font-semibold mt-10 mb-5",
              children: [
                d.jsx(Oe, {
                  to: "/cart",
                  className: "bg-slate-800 border btn text-nowrap text-white",
                  children: "Go Back",
                }),
                !p.isEdit &&
                  (p == null ? void 0 : p._id) &&
                  d.jsx("button", {
                    className: "bg-indigo-600 btn text-nowrap text-white",
                    onClick: x,
                    children: "Save & Checkout",
                  }),
              ],
            }),
            p.isEdit &&
              d.jsxs("form", {
                className: "space-y-4",
                onSubmit: m,
                children: [
                  d.jsx(ot, {
                    label: "AddressLine",
                    name: "addressLine",
                    value: p.addressLine,
                    onChange: w,
                  }),
                  d.jsx(ot, {
                    label: "City",
                    name: "city",
                    value: p.city,
                    onChange: w,
                  }),
                  d.jsxs("div", {
                    className: "flex gap-4",
                    children: [
                      d.jsx(ot, {
                        label: "Postal code",
                        name: "postalCode",
                        type: "number",
                        min: 6,
                        max: 6,
                        value: p.postalCode,
                        onChange: w,
                      }),
                      d.jsx(Z2, {
                        label: "Country",
                        name: "countryCode",
                        options: [{ value: "IN", label: " India " }],
                        value: p.countryCode,
                        onChange: w,
                      }),
                    ],
                  }),
                  d.jsxs("label", {
                    htmlFor: "address default",
                    className: "flex gap-2",
                    children: [
                      d.jsx("input", {
                        type: "checkbox",
                        name: "isDefault",
                        id: "address default",
                        value: p.isDefault,
                        checked: p.isDefault,
                        onChange: w,
                      }),
                      d.jsx("span", { children: "Default Address" }),
                    ],
                  }),
                  d.jsxs("div", {
                    className: "flex gap-5 mt-5",
                    children: [
                      d.jsx("button", {
                        onClick: () => g({ isEdit: !1 }),
                        type: "button",
                        className: "bg-red-600 btn text-nowrap text-white",
                        children: "Cancel",
                      }),
                      d.jsx("button", {
                        type: "submit",
                        className: "bg-indigo-600 btn text-nowrap text-white",
                        onClick: m,
                        children: s ? "Loading..." : "Save Address",
                      }),
                    ],
                  }),
                ],
              }),
          ],
        });
  },
  fs = hp(
    "categories/fetchCategories",
    async () => (await Qe.get("/category")).data
  ),
  RE = Yr({
    name: "categories",
    initialState: { list: [], loading: !1, error: null },
    reducers: {},
    extraReducers: (n) => {
      n.addCase(fs.pending, (l) => {
        l.loading = !0;
      })
        .addCase(fs.fulfilled, (l, i) => {
          (l.loading = !1), (l.list = i.payload);
        })
        .addCase(fs.rejected, (l, i) => {
          (l.loading = !1), (l.error = i.error.message);
        });
    },
  }),
  OE = RE.reducer,
  ds = hp("brands/fetchBrands", async () => (await Qe.get("/brand")).data),
  AE = Yr({
    name: "brands",
    initialState: { list: [], loading: !1, error: null },
    reducers: {},
    extraReducers: (n) => {
      n.addCase(ds.pending, (l) => {
        l.loading = !0;
      })
        .addCase(ds.fulfilled, (l, i) => {
          (l.loading = !1), (l.list = i.payload);
        })
        .addCase(ds.rejected, (l, i) => {
          (l.loading = !1), (l.error = i.error.message);
        });
    },
  }),
  CE = AE.reducer,
  ME = () => {
    const { data: n, loading: l } = Wa("/user/current-user"),
      i = $0();
    let s = n == null ? void 0 : n._id;
    return (
      T.useEffect(() => {
        s && i(Gw(n));
      }, [n, s, i]),
      T.useEffect(() => {
        i(fs()), i(ds());
      }, [i]),
      l
        ? d.jsx(Ia, {})
        : d.jsx("div", {
            className: "bg-slate-50 text-slate-700",
            children: d.jsxs(wb, {
              children: [
                d.jsx(Jw, {}),
                d.jsxs(F1, {
                  children: [
                    d.jsx(ut, { path: "/", element: d.jsx(oE, {}) }),
                    d.jsx(ut, { path: "/product", element: d.jsx(yE, {}) }),
                    d.jsx(ut, { path: "/product/:id", element: d.jsx(cE, {}) }),
                    d.jsx(ut, { path: "/login", element: d.jsx(pE, {}) }),
                    d.jsx(ut, { path: "/register", element: d.jsx(gE, {}) }),
                    d.jsxs(ut, {
                      element: d.jsx(Pw, { isAuth: s }),
                      children: [
                        d.jsx(ut, { path: "/cart", element: d.jsx(uE, {}) }),
                        d.jsx(ut, {
                          path: "/shipping",
                          element: d.jsx(jE, {}),
                        }),
                        d.jsx(ut, { path: "/setting", element: d.jsx(bE, {}) }),
                        d.jsx(ut, {
                          path: "/favorite",
                          element: d.jsx(wE, {}),
                        }),
                        d.jsx(ut, {
                          path: "/order/failed",
                          element: d.jsx(_E, {}),
                        }),
                        d.jsx(ut, {
                          path: "/order/success",
                          element: d.jsx(EE, {}),
                        }),
                        d.jsx(ut, { path: "/orders", element: d.jsx(NE, {}) }),
                      ],
                    }),
                    d.jsx(ut, { path: "*", element: d.jsx(vE, {}) }),
                  ],
                }),
                d.jsx(P2, {}),
                d.jsx(sE, {}),
              ],
            }),
          })
    );
  },
  DE = () => {
    try {
      const n = localStorage.getItem("cart");
      return n ? JSON.parse(n).items : [];
    } catch (n) {
      return console.warn("Could not load state from localStorage", n), [];
    }
  },
  zE = { items: DE() },
  Sp = Yr({
    name: "cart",
    initialState: zE,
    reducers: {
      addItem: (n, l) => {
        const i = l.payload,
          s = n.items.find((o) => o._id === i._id);
        s ? (s.quantity += 1) : n.items.push({ ...i, quantity: 1, flag: !0 }),
          localStorage.setItem("cart", JSON.stringify(n));
      },
      removeItem: (n, l) => {
        (n.items = n.items.filter((i) => i._id !== l.payload)),
          localStorage.setItem("cart", JSON.stringify(n));
      },
      updateItemQuantity: (n, l) => {
        const { _id: i, quantity: s } = l.payload,
          o = n.items.find((f) => f._id === i);
        o && (o.quantity = s), localStorage.setItem("cart", JSON.stringify(n));
      },
      increaseQuantity: (n, l) => {
        const i = n.items.find((s) => s._id === l.payload);
        i && (i.quantity += 1), localStorage.setItem("cart", JSON.stringify(n));
      },
      decreaseQuantity: (n, l) => {
        const i = n.items.find((s) => s._id === l.payload);
        i && i.quantity > 1 && (i.quantity -= 1),
          localStorage.setItem("cart", JSON.stringify(n));
      },
      clearCart: (n) => {
        (n.items = []), localStorage.setItem("cart", JSON.stringify(n));
      },
      moveToCart: (n, l) => {
        const i = n.items.find((s) => s._id === l.payload);
        i && (i.flag = !i.flag),
          localStorage.setItem("cart", JSON.stringify(n));
      },
    },
  }),
  {
    addItem: nT,
    removeItem: lT,
    updateItemQuantity: rT,
    increaseQuantity: iT,
    decreaseQuantity: sT,
    clearCart: uT,
    moveToCart: oT,
  } = Sp.actions,
  UE = Sp.reducer,
  t0 = {
    shippingAddress: null,
    shippingMethod: null,
    paymentMethod: null,
    steps: 0,
    tax: null,
    payment: null,
  },
  wp = Yr({
    name: "checkout",
    initialState: t0,
    reducers: {
      setShippingAddress: (n, l) => {
        n.shippingAddress = l.payload;
      },
      setShippingMethod: (n, l) => {
        n.shippingMethod = l.payload;
      },
      setPaymentMethod: (n, l) => {
        n.paymentMethod = l.payload;
      },
      setSteps: (n, l) => {
        n.steps = l.payload;
      },
      setTax: (n, l) => {
        n.tax = l.payload;
      },
      setPayment: (n, l) => {
        n.payment = l.payload;
      },
      resetCheckout: () => t0,
    },
  }),
  {
    setShippingAddress: cT,
    setShippingMethod: fT,
    setPaymentMethod: dT,
    resetCheckout: hT,
    setSteps: mT,
    setTax: yT,
    setPayment: pT,
  } = wp.actions,
  LE = wp.reducer,
  kE = ww({
    reducer: { auth: Vw, cart: UE, categories: OE, brands: CE, checkout: LE },
  });
n1.createRoot(document.getElementById("root")).render(
  d.jsx(T.StrictMode, {
    children: d.jsxs(fS, {
      store: kE,
      children: [d.jsx(ME, {}), d.jsx(PS, {})],
    }),
  })
);
