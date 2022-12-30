var PetiteVue = (function (e) {
  "use strict";
  function t(e, t) {
    const n = Object.create(null),
      r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
  }
  function n(e) {
    if (p(e)) {
      const t = {};
      for (let r = 0; r < e.length; r++) {
        const s = e[r],
          i = n(m(s) ? o(s) : s);
        if (i) for (const e in i) t[e] = i[e];
      }
      return t;
    }
    if (v(e)) return e;
  }
  const r = /;(?![^(]*\))/g,
    s = /:(.+)/;
  function o(e) {
    const t = {};
    return (
      e.split(r).forEach((e) => {
        if (e) {
          const n = e.split(s);
          n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
      }),
      t
    );
  }
  function i(e) {
    let t = "";
    if (m(e)) t = e;
    else if (p(e))
      for (let n = 0; n < e.length; n++) {
        const r = i(e[n]);
        r && (t += r + " ");
      }
    else if (v(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  function c(e, t) {
    if (e === t) return !0;
    let n = d(e),
      r = d(t);
    if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
    if (((n = p(e)), (r = p(t)), n || r))
      return (
        !(!n || !r) &&
        (function (e, t) {
          if (e.length !== t.length) return !1;
          let n = !0;
          for (let r = 0; n && r < e.length; r++) n = c(e[r], t[r]);
          return n;
        })(e, t)
      );
    if (((n = v(e)), (r = v(t)), n || r)) {
      if (!n || !r) return !1;
      if (Object.keys(e).length !== Object.keys(t).length) return !1;
      for (const n in e) {
        const r = e.hasOwnProperty(n),
          s = t.hasOwnProperty(n);
        if ((r && !s) || (!r && s) || !c(e[n], t[n])) return !1;
      }
    }
    return String(e) === String(t);
  }
  function l(e, t) {
    return e.findIndex((e) => c(e, t));
  }
  const a = {},
    f = Object.prototype.hasOwnProperty,
    u = (e, t) => f.call(e, t),
    p = Array.isArray,
    h = (e) => "[object Map]" === b(e),
    d = (e) => e instanceof Date,
    m = (e) => "string" == typeof e,
    g = (e) => "symbol" == typeof e,
    v = (e) => null !== e && "object" == typeof e,
    y = Object.prototype.toString,
    b = (e) => y.call(e),
    x = (e) =>
      m(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
    _ = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    w = /-(\w)/g,
    k = _((e) => e.replace(w, (e, t) => (t ? t.toUpperCase() : ""))),
    $ = /\B([A-Z])/g,
    S = _((e) => e.replace($, "-$1").toLowerCase()),
    E = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    },
    O = new WeakMap(),
    A = [];
  let j;
  const P = Symbol(""),
    C = Symbol("");
  function N(e, t = a) {
    (function (e) {
      return e && !0 === e._isEffect;
    })(e) && (e = e.raw);
    const n = (function (e, t) {
      const n = function () {
        if (!n.active) return e();
        if (!A.includes(n)) {
          M(n);
          try {
            return L.push(B), (B = !0), A.push(n), (j = n), e();
          } finally {
            A.pop(), W(), (j = A[A.length - 1]);
          }
        }
      };
      return (
        (n.id = T++),
        (n.allowRecurse = !!t.allowRecurse),
        (n._isEffect = !0),
        (n.active = !0),
        (n.raw = e),
        (n.deps = []),
        (n.options = t),
        n
      );
    })(e, t);
    return t.lazy || n(), n;
  }
  function R(e) {
    e.active && (M(e), e.options.onStop && e.options.onStop(), (e.active = !1));
  }
  let T = 0;
  function M(e) {
    const { deps: t } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
    }
  }
  let B = !0;
  const L = [];
  function W() {
    const e = L.pop();
    B = void 0 === e || e;
  }
  function I(e, t, n) {
    if (!B || void 0 === j) return;
    let r = O.get(e);
    r || O.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = new Set())), s.has(j) || (s.add(j), j.deps.push(s));
  }
  function K(e, t, n, r, s, o) {
    const i = O.get(e);
    if (!i) return;
    const c = new Set(),
      l = (e) => {
        e &&
          e.forEach((e) => {
            (e !== j || e.allowRecurse) && c.add(e);
          });
      };
    if ("clear" === t) i.forEach(l);
    else if ("length" === n && p(e))
      i.forEach((e, t) => {
        ("length" === t || t >= r) && l(e);
      });
    else
      switch ((void 0 !== n && l(i.get(n)), t)) {
        case "add":
          p(e)
            ? x(n) && l(i.get("length"))
            : (l(i.get(P)), h(e) && l(i.get(C)));
          break;
        case "delete":
          p(e) || (l(i.get(P)), h(e) && l(i.get(C)));
          break;
        case "set":
          h(e) && l(i.get(P));
      }
    c.forEach((e) => {
      e.options.scheduler ? e.options.scheduler(e) : e();
    });
  }
  const V = t("__proto__,__v_isRef,__isVue"),
    z = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(g)
    ),
    F = Z(),
    q = Z(!0),
    H = J();
  function J() {
    const e = {};
    return (
      ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
        const n = Array.prototype[t];
        e[t] = function (...e) {
          const t = se(this);
          for (let n = 0, s = this.length; n < s; n++) I(t, 0, n + "");
          const r = n.apply(t, e);
          return -1 === r || !1 === r ? n.apply(t, e.map(se)) : r;
        };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
        const n = Array.prototype[t];
        e[t] = function (...e) {
          L.push(B), (B = !1);
          const t = n.apply(this, e);
          return W(), t;
        };
      }),
      e
    );
  }
  function Z(e = !1, t = !1) {
    return function (n, r, s) {
      if ("__v_isReactive" === r) return !e;
      if ("__v_isReadonly" === r) return e;
      if ("__v_raw" === r && s === (e ? (t ? ee : Y) : t ? X : Q).get(n))
        return n;
      const o = p(n);
      if (!e && o && u(H, r)) return Reflect.get(H, r, s);
      const i = Reflect.get(n, r, s);
      if (g(r) ? z.has(r) : V(r)) return i;
      if ((e || I(n, 0, r), t)) return i;
      if (oe(i)) {
        return !o || !x(r) ? i.value : i;
      }
      return v(i)
        ? e
          ? (function (e) {
              return re(e, !0, U, null, Y);
            })(i)
          : ne(i)
        : i;
    };
  }
  function D(e = !1) {
    return function (t, n, r, s) {
      let o = t[n];
      if (!e && ((r = se(r)), (o = se(o)), !p(t) && oe(o) && !oe(r)))
        return (o.value = r), !0;
      const i = p(t) && x(n) ? Number(n) < t.length : u(t, n),
        c = Reflect.set(t, n, r, s);
      return (
        t === se(s) &&
          (i
            ? ((e, t) => e !== t && (e == e || t == t))(r, o) &&
              K(t, "set", n, r)
            : K(t, "add", n, r)),
        c
      );
    };
  }
  const G = {
      get: F,
      set: D(),
      deleteProperty: function (e, t) {
        const n = u(e, t);
        e[t];
        const r = Reflect.deleteProperty(e, t);
        return r && n && K(e, "delete", t, void 0), r;
      },
      has: function (e, t) {
        const n = Reflect.has(e, t);
        return (g(t) && z.has(t)) || I(e, 0, t), n;
      },
      ownKeys: function (e) {
        return I(e, 0, p(e) ? "length" : P), Reflect.ownKeys(e);
      },
    },
    U = { get: q, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    Q = new WeakMap(),
    X = new WeakMap(),
    Y = new WeakMap(),
    ee = new WeakMap();
  function te(e) {
    return e.__v_skip || !Object.isExtensible(e)
      ? 0
      : (function (e) {
          switch (e) {
            case "Object":
            case "Array":
              return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
              return 2;
            default:
              return 0;
          }
        })(((e) => b(e).slice(8, -1))(e));
  }
  function ne(e) {
    return e && e.__v_isReadonly ? e : re(e, !1, G, null, Q);
  }
  function re(e, t, n, r, s) {
    if (!v(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const o = s.get(e);
    if (o) return o;
    const i = te(e);
    if (0 === i) return e;
    const c = new Proxy(e, 2 === i ? r : n);
    return s.set(e, c), c;
  }
  function se(e) {
    return (e && se(e.__v_raw)) || e;
  }
  function oe(e) {
    return Boolean(e && !0 === e.__v_isRef);
  }
  const ie = /^(spellcheck|draggable|form|list|type)$/,
    ce = ({ el: e, get: t, effect: n, arg: r, modifiers: s }) => {
      let o;
      "class" === r && (e._class = e.className),
        n(() => {
          let n = t();
          if (r) (null == s ? void 0 : s.camel) && (r = k(r)), le(e, r, n, o);
          else {
            for (const t in n) le(e, t, n[t], o && o[t]);
            for (const t in o) (n && t in n) || le(e, t, null);
          }
          o = n;
        });
    },
    le = (e, t, r, s) => {
      if ("class" === t)
        e.setAttribute("class", i(e._class ? [e._class, r] : r) || "");
      else if ("style" === t) {
        r = n(r);
        const { style: t } = e;
        if (r)
          if (m(r)) r !== s && (t.cssText = r);
          else {
            for (const e in r) fe(t, e, r[e]);
            if (s && !m(s)) for (const e in s) null == r[e] && fe(t, e, "");
          }
        else e.removeAttribute("style");
      } else
        e instanceof SVGElement || !(t in e) || ie.test(t)
          ? "true-value" === t
            ? (e._trueValue = r)
            : "false-value" === t
            ? (e._falseValue = r)
            : null != r
            ? e.setAttribute(t, r)
            : e.removeAttribute(t)
          : ((e[t] = r), "value" === t && (e._value = r));
    },
    ae = /\s*!important$/,
    fe = (e, t, n) => {
      p(n)
        ? n.forEach((n) => fe(e, t, n))
        : t.startsWith("--")
        ? e.setProperty(t, n)
        : ae.test(n)
        ? e.setProperty(S(t), n.replace(ae, ""), "important")
        : (e[t] = n);
    },
    ue = (e, t) => {
      const n = e.getAttribute(t);
      return null != n && e.removeAttribute(t), n;
    },
    pe = (e, t, n, r) => {
      e.addEventListener(t, n, r);
    };
  let he = !1;
  const de = [],
    me = Promise.resolve(),
    ge = (e) => me.then(e),
    ve = (e) => {
      de.includes(e) || de.push(e), he || ((he = !0), ge(ye));
    },
    ye = () => {
      for (let e = 0; e < de.length; e++) de[e]();
      (de.length = 0), (he = !1);
    },
    be =
      /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
    xe = ["ctrl", "shift", "alt", "meta"],
    _e = {
      stop: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      self: (e) => e.target !== e.currentTarget,
      ctrl: (e) => !e.ctrlKey,
      shift: (e) => !e.shiftKey,
      alt: (e) => !e.altKey,
      meta: (e) => !e.metaKey,
      left: (e) => "button" in e && 0 !== e.button,
      middle: (e) => "button" in e && 1 !== e.button,
      right: (e) => "button" in e && 2 !== e.button,
      exact: (e, t) => xe.some((n) => e[`${n}Key`] && !t[n]),
    },
    we = ({ el: e, get: t, exp: n, arg: r, modifiers: s }) => {
      if (!r) return;
      let o = be.test(n) ? t(`(e => ${n}(e))`) : t(`($event => { ${n} })`);
      if ("mounted" !== r) {
        if ("unmounted" === r) return () => o();
        if (s) {
          "click" === r &&
            (s.right && (r = "contextmenu"), s.middle && (r = "mouseup"));
          const e = o;
          o = (t) => {
            if (!("key" in t) || S(t.key) in s) {
              for (const e in s) {
                const n = _e[e];
                if (n && n(t, s)) return;
              }
              return e(t);
            }
          };
        }
        pe(e, r, o, s);
      } else ge(o);
    },
    ke = ({ el: e, get: t, effect: n }) => {
      n(() => {
        e.textContent = $e(t());
      });
    },
    $e = (e) =>
      null == e ? "" : v(e) ? JSON.stringify(e, null, 2) : String(e),
    Se = (e) => ("_value" in e ? e._value : e.value),
    Ee = (e, t) => {
      const n = t ? "_trueValue" : "_falseValue";
      return n in e ? e[n] : t;
    },
    Oe = (e) => {
      e.target.composing = !0;
    },
    Ae = (e) => {
      const t = e.target;
      t.composing && ((t.composing = !1), je(t, "input"));
    },
    je = (e, t) => {
      const n = document.createEvent("HTMLEvents");
      n.initEvent(t, !0, !0), e.dispatchEvent(n);
    },
    Pe = Object.create(null),
    Ce = (e, t, n) => Ne(e, `return(${t})`, n),
    Ne = (e, t, n) => {
      const r = Pe[t] || (Pe[t] = Re(t));
      try {
        return r(e, n);
      } catch (s) {
        console.error(s);
      }
    },
    Re = (e) => {
      try {
        return new Function("$data", "$el", `with($data){${e}}`);
      } catch (t) {
        return console.error(`${t.message} in expression: ${e}`), () => {};
      }
    },
    Te = {
      bind: ce,
      on: we,
      show: ({ el: e, get: t, effect: n }) => {
        const r = e.style.display;
        n(() => {
          e.style.display = t() ? r : "none";
        });
      },
      text: ke,
      html: ({ el: e, get: t, effect: n }) => {
        n(() => {
          e.innerHTML = t();
        });
      },
      model: ({ el: e, exp: t, get: n, effect: r, modifiers: s }) => {
        const o = e.type,
          i = n(`(val) => { ${t} = val }`),
          { trim: a, number: f = "number" === o } = s || {};
        if ("SELECT" === e.tagName) {
          const t = e;
          pe(e, "change", () => {
            const e = Array.prototype.filter
              .call(t.options, (e) => e.selected)
              .map((e) => (f ? E(Se(e)) : Se(e)));
            i(t.multiple ? e : e[0]);
          }),
            r(() => {
              const e = n(),
                r = t.multiple;
              for (let n = 0, s = t.options.length; n < s; n++) {
                const s = t.options[n],
                  o = Se(s);
                if (r)
                  p(e) ? (s.selected = l(e, o) > -1) : (s.selected = e.has(o));
                else if (c(Se(s), e))
                  return void (t.selectedIndex !== n && (t.selectedIndex = n));
              }
              r || -1 === t.selectedIndex || (t.selectedIndex = -1);
            });
        } else if ("checkbox" === o) {
          let t;
          pe(e, "change", () => {
            const t = n(),
              r = e.checked;
            if (p(t)) {
              const n = Se(e),
                s = l(t, n),
                o = -1 !== s;
              if (r && !o) i(t.concat(n));
              else if (!r && o) {
                const e = [...t];
                e.splice(s, 1), i(e);
              }
            } else i(Ee(e, r));
          }),
            r(() => {
              const r = n();
              p(r)
                ? (e.checked = l(r, Se(e)) > -1)
                : r !== t && (e.checked = c(r, Ee(e, !0))),
                (t = r);
            });
        } else if ("radio" === o) {
          let t;
          pe(e, "change", () => {
            i(Se(e));
          }),
            r(() => {
              const r = n();
              r !== t && (e.checked = c(r, Se(e)));
            });
        } else {
          const t = (e) => (a ? e.trim() : f ? E(e) : e);
          pe(e, "compositionstart", Oe),
            pe(e, "compositionend", Ae),
            pe(e, (null == s ? void 0 : s.lazy) ? "change" : "input", () => {
              e.composing || i(t(e.value));
            }),
            a &&
              pe(e, "change", () => {
                e.value = e.value.trim();
              }),
            r(() => {
              if (e.composing) return;
              const r = e.value,
                s = n();
              (document.activeElement === e && t(r) === s) ||
                (r !== s && (e.value = s));
            });
        }
      },
      effect: ({ el: e, ctx: t, exp: n, effect: r }) => {
        ge(() => r(() => Ne(t.scope, n, e)));
      },
    },
    Me = (e, t = {}) => {
      const n = e.scope,
        r = Object.create(n);
      Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)),
        (r.$refs = Object.create(n.$refs));
      const s = ne(
        new Proxy(r, {
          set: (e, t, r, o) =>
            o !== s || e.hasOwnProperty(t)
              ? Reflect.set(e, t, r, o)
              : Reflect.set(n, t, r),
        })
      );
      return { ...e, scope: s };
    },
    Be = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    Le = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    We = /^\(|\)$/g,
    Ie = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/,
    Ke = (e, t, n) => {
      const r = t.match(Be);
      if (!r) return;
      const s = e.nextSibling,
        o = e.parentElement,
        i = new Text("");
      o.insertBefore(i, e), o.removeChild(e);
      const c = r[2].trim();
      let l,
        a,
        f,
        u,
        h = r[1].trim().replace(We, "").trim(),
        d = !1,
        m = "key",
        g =
          e.getAttribute(m) ||
          e.getAttribute((m = ":key")) ||
          e.getAttribute((m = "v-bind:key"));
      g && (e.removeAttribute(m), "key" === m && (g = JSON.stringify(g))),
        (u = h.match(Le)) &&
          ((h = h.replace(Le, "").trim()),
          (a = u[1].trim()),
          u[2] && (f = u[2].trim())),
        (u = h.match(Ie)) &&
          ((l = u[1].split(",").map((e) => e.trim())), (d = "[" === h[0]));
      let y,
        b,
        x,
        _ = !1;
      const w = (e, t, r, s) => {
          const o = {};
          l ? l.forEach((e, n) => (o[e] = t[d ? n : e])) : (o[h] = t),
            s ? (a && (o[a] = s), f && (o[f] = r)) : a && (o[a] = r);
          const i = Me(n, o),
            c = g ? Ce(i.scope, g) : r;
          return e.set(c, r), { ctx: i, key: c };
        },
        k = ({ ctx: t, key: n }, r) => {
          const s = new Xe(e, t);
          return (s.key = n), s.insert(o, r), s;
        };
      return (
        n.effect(() => {
          const e = Ce(n.scope, c),
            t = x;
          if (
            (([b, x] = ((e) => {
              const t = new Map(),
                n = [];
              if (p(e))
                for (let r = 0; r < e.length; r++) n.push(w(t, e[r], r));
              else if ("number" == typeof e)
                for (let r = 0; r < e; r++) n.push(w(t, r + 1, r));
              else if (v(e)) {
                let r = 0;
                for (const s in e) n.push(w(t, e[s], r++, s));
              }
              return [n, t];
            })(e)),
            _)
          ) {
            const e = [];
            for (let t = 0; t < y.length; t++) x.has(y[t].key) || y[t].remove();
            let n = b.length;
            for (; n--; ) {
              const r = b[n],
                s = t.get(r.key),
                c = b[n + 1],
                l = c && t.get(c.key),
                a = null == l ? void 0 : y[l];
              if (null == s) e[n] = k(r, a ? a.el : i);
              else {
                const t = (e[n] = y[s]);
                Object.assign(t.ctx.scope, r.ctx.scope),
                  s !== n && y[s + 1] !== a && t.insert(o, a ? a.el : i);
              }
            }
            y = e;
          } else (y = b.map((e) => k(e, i))), (_ = !0);
        }),
        s
      );
    },
    Ve = ({
      el: e,
      ctx: {
        scope: { $refs: t },
      },
      get: n,
      effect: r,
    }) => {
      let s;
      return (
        r(() => {
          const r = n();
          (t[r] = e), s && r !== s && delete t[s], (s = r);
        }),
        () => {
          s && delete t[s];
        }
      );
    },
    ze = (e) => {
      const t = {
        ...e,
        scope: e ? e.scope : ne({}),
        dirs: e ? e.dirs : {},
        effects: [],
        blocks: [],
        cleanups: [],
        effect: (e) => {
          if (Je) return ve(e), e;
          const n = N(e, { scheduler: () => ve(n) });
          return t.effects.push(n), n;
        },
      };
      return t;
    },
    Fe = /^(?:v-|:|@)/,
    qe = /\.([\w-]+)/g,
    He = /\{\{([^]+?)\}\}/g;
  let Je = !1;
  const Ze = (e, t) => {
      const n = e.nodeType;
      if (1 === n) {
        const n = e;
        if (n.hasAttribute("v-pre")) return;
        let r;
        if ((r = ue(n, "v-if")))
          return ((e, t, n) => {
            const r = e.parentElement,
              s = new Comment("v-if");
            r.insertBefore(s, e);
            const o = [{ exp: t, el: e }];
            let i, c;
            for (
              ;
              (i = e.nextElementSibling) &&
              ((c = null), "" === ue(i, "v-else") || (c = ue(i, "v-else-if")));

            )
              r.removeChild(i), o.push({ exp: c, el: i });
            const l = e.nextSibling;
            let a;
            r.removeChild(e);
            let f = -1;
            const u = () => {
              a && (r.insertBefore(s, a.el), a.remove(), (a = void 0));
            };
            return (
              n.effect(() => {
                for (let e = 0; e < o.length; e++) {
                  const { exp: t, el: i } = o[e];
                  if (!t || Ce(n.scope, t))
                    return void (
                      e !== f &&
                      (u(),
                      (a = new Xe(i, n)),
                      a.insert(r, s),
                      r.removeChild(s),
                      (f = e))
                    );
                }
                (f = -1), u();
              }),
              l
            );
          })(n, r, t);
        if ((r = ue(n, "v-for"))) return Ke(n, r, t);
        if ((r = ue(n, "v-scope")) || "" === r) {
          const e = r ? Ce(t.scope, r) : {};
          (t = Me(t, e)), e.$template && Qe(n, e.$template);
        }
        const s = null != ue(n, "v-once");
        let o;
        s && (Je = !0), (r = ue(n, "ref")) && Ue(n, Ve, `"${r}"`, t), De(n, t);
        for (const { name: e, value: i } of [...n.attributes])
          Fe.test(e) &&
            "v-cloak" !== e &&
            ("v-model" === e ? (o = i) : Ge(n, e, i, t));
        o && Ge(n, "v-model", o, t), s && (Je = !1);
      } else if (3 === n) {
        const n = e.data;
        if (n.includes("{{")) {
          let r,
            s = [],
            o = 0;
          for (; (r = He.exec(n)); ) {
            const e = n.slice(o, r.index);
            e && s.push(JSON.stringify(e)),
              s.push(`$s(${r[1]})`),
              (o = r.index + r[0].length);
          }
          o < n.length && s.push(JSON.stringify(n.slice(o))),
            Ue(e, ke, s.join("+"), t);
        }
      } else 11 === n && De(e, t);
    },
    De = (e, t) => {
      let n = e.firstChild;
      for (; n; ) n = Ze(n, t) || n.nextSibling;
    },
    Ge = (e, t, n, r) => {
      let s,
        o,
        i,
        c = null;
      for (; (c = qe.exec(t)); )
        ((i || (i = {}))[c[1]] = !0), (t = t.slice(0, c.index));
      if (":" === t[0]) (s = ce), (o = t.slice(1));
      else if ("@" === t[0]) (s = we), (o = t.slice(1));
      else {
        const e = t.indexOf(":"),
          n = e > 0 ? t.slice(2, e) : t.slice(2);
        (s = Te[n] || r.dirs[n]), (o = e > 0 ? t.slice(e + 1) : void 0);
      }
      s &&
        (s === ce && "ref" === o && (s = Ve),
        Ue(e, s, n, r, o, i),
        e.removeAttribute(t));
    },
    Ue = (e, t, n, r, s, o) => {
      const i = t({
        el: e,
        get: (t = n) => Ce(r.scope, t, e),
        effect: r.effect,
        ctx: r,
        exp: n,
        arg: s,
        modifiers: o,
      });
      i && r.cleanups.push(i);
    },
    Qe = (e, t) => {
      if ("#" !== t[0]) e.innerHTML = t;
      else {
        const n = document.querySelector(t);
        e.appendChild(n.content.cloneNode(!0));
      }
    };
  class Xe {
    get el() {
      return this.start || this.template;
    }
    constructor(e, t, n = !1) {
      (this.isFragment = e instanceof HTMLTemplateElement),
        n
          ? (this.template = e)
          : this.isFragment
          ? (this.template = e.content.cloneNode(!0))
          : (this.template = e.cloneNode(!0)),
        n
          ? (this.ctx = t)
          : ((this.parentCtx = t), t.blocks.push(this), (this.ctx = ze(t))),
        Ze(this.template, this.ctx);
    }
    insert(e, t = null) {
      if (this.isFragment)
        if (this.start) {
          let n,
            r = this.start;
          for (
            ;
            r && ((n = r.nextSibling), e.insertBefore(r, t), r !== this.end);

          )
            r = n;
        } else
          (this.start = new Text("")),
            (this.end = new Text("")),
            e.insertBefore(this.end, t),
            e.insertBefore(this.start, this.end),
            e.insertBefore(this.template, this.end);
      else e.insertBefore(this.template, t);
    }
    remove() {
      if (
        (this.parentCtx &&
          ((e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1);
          })(this.parentCtx.blocks, this),
        this.start)
      ) {
        const e = this.start.parentNode;
        let t,
          n = this.start;
        for (; n && ((t = n.nextSibling), e.removeChild(n), n !== this.end); )
          n = t;
      } else this.template.parentNode.removeChild(this.template);
      this.teardown();
    }
    teardown() {
      this.ctx.blocks.forEach((e) => {
        e.teardown();
      }),
        this.ctx.effects.forEach(R),
        this.ctx.cleanups.forEach((e) => e());
    }
  }
  const Ye = (e) => {
    const t = ze();
    let n;
    return (
      e && (t.scope = ne(e)),
      (t.scope.$s = $e),
      (t.scope.$nextTick = ge),
      (t.scope.$refs = Object.create(null)),
      {
        directive(e, n) {
          return n ? ((t.dirs[e] = n), this) : t.dirs[e];
        },
        mount(e) {
          if ("string" == typeof e && !(e = document.querySelector(e))) return;
          let r;
          return (
            (r = (e = e || document.documentElement).hasAttribute("v-scope")
              ? [e]
              : [...e.querySelectorAll("[v-scope]")].filter(
                  (e) => !e.matches("[v-scope] [v-scope]")
                )),
            r.length || (r = [e]),
            (n = r.map((e) => new Xe(e, t, !0))),
            [e, ...e.querySelectorAll("[v-cloak]")].forEach((e) =>
              e.removeAttribute("v-cloak")
            ),
            this
          );
        },
        unmount() {
          n.forEach((e) => e.teardown());
        },
      }
    );
  };
  let et;
  return (
    (et = document.currentScript) && et.hasAttribute("init") && Ye().mount(),
    (e.createApp = Ye),
    (e.nextTick = ge),
    (e.reactive = ne),
    Object.defineProperty(e, "__esModule", { value: !0 }),
    (e[Symbol.toStringTag] = "Module"),
    e
  );
})({});
