/* curtin-library.bitbucket.org/virtual-bookshelf/LICENSE */(function($) {
  var D = 1 < window.devicePixelRatio ? window.devicePixelRatio : 1;
  function E() {
    return(new Date).getTime()
  }
  var H = "Webkit Moz O Ms Khtml webkit moz o ms khtml".split(" ");
  function I(b, a) {
    if (b)
      for (var c = 1; c < arguments.length; ++c) {
        var g = arguments[c];
        if (g in b)
          return g;
        for (var g = g.slice(0, 1).toUpperCase() + g.slice(1), p = 0; p < H.length; ++p) {
          var q = H[p] + g;
          if (q in b)
            return q
        }
      }
  }
  function J(b, a, c) {
    b.each(function() {
      var b = I(this.style, a);
      b && (this.style[b] = c)
    })
  }
  var K = function() {
    var b = I(window, "requestAnimationFrame");
    return b ? function(a) {
      return window[b](a)
    } : function(a) {
      return window.setTimeout(a, 1)
    }
  }(), aa = function() {
    var b = I(window, "cancelAnimationFrame", "cancelRequestAnimationFrame") || "clearTimeout";
    return function(a) {
      window[b](a)
    }
  }();
  function ba(b) {
    b && b.remove && b.remove()
  }
  function ca(b) {
    this.a = b
  }
  ca.prototype.next = function() {
    this.a = 279470273 * this.a % 4294967291;
    return this.a / 4294967291
  };
  var L = "ontouchstart"in window, da = 100, ea = 500, ka = "mouseup dragstart losecapture", la = "mouseup dragstart mousemove";
  function ma(b, a) {
    function c(a) {
      return b && v[a.type].apply(this, arguments)
    }
    function g(a) {
      a({pageX: f[f.length - 1].x, pageY: f[f.length - 1].y, e: l.x, P: l.y, K: m, R: A})
    }
    function p() {
      u && (u = !1, d && (d.unbind(ka, c), d.get(0).releaseCapture(), d = void 0), $(window).unbind(la, c))
    }
    function q(a, g) {
      e = a;
      l = {x: g.pageX, y: g.pageY, time: E()};
      f = [l];
      A = m = 0;
      L || u || (u = !0, h && !d && (d = b, d.bind(ka, c), d.get(0).setCapture(!1)), $(window).bind(la, c))
    }
    function r(a) {
      var c = f[f.length - 1];
      a = {x: a.pageX, y: a.pageY, time: E()};
      for (f.push(a); 2 < f.length && a.time -
              f[0].time > da; )
        f.shift();
      var b = f[0];
      if (a.time - b.time >= ea)
        f.shift(), A = m = 0;
      else {
        var d = a.time - b.time;
        0 < d && (m = (a.x - b.x) / d, A = (a.y - b.y) / d)
      }
      return a.x != c.x || a.y != c.y
    }
    function t(c, b) {
      if (r(c)) {
        var d = f[f.length - 1];
        if (!n) {
          var m = 6 <= Math.abs(d.x - l.x), d = 6 <= Math.abs(d.y - l.y);
          a.r && m || a.s && d ? n = !0 : L && (!a.r && m || !a.s && d) && s(c, !0)
        }
        n && b.preventDefault();
        void 0 !== e && g(a.I)
      }
    }
    function s(c, b) {
      p();
      e = void 0;
      z && (n ? setTimeout(z, 1) : z(), z = null);
      n = !1;
      c && r(c);
      b && (A = m = 0);
      g(a.H)
    }
    function k(c) {
      var b = C;
      C = {pageX: c.pageX, pageY: c.pageY};
      (b ? a.F : a.G)({pageX: c.pageX, pageY: c.pageY})
    }
    var h = b.get(0).setCapture && b.get(0).releaseCapture, e, n, u, d, l, f, m, A, C, z = null, v = {}, w = Infinity;
    v.touchstart = function(c) {
      if (void 0 !== e) {
        for (var b = c.touches || c.originalEvent.touches, d = !1, f = 0; f < b.length && !(d = b[f].identifier == e); ++f)
          ;
        d || s(void 0, !0)
      }
      void 0 !== e || c.defaultPrevented || (c = (c.changedTouches || c.originalEvent.changedTouches)[0], q(c.identifier, c), g(a.t))
    };
    v.touchmove = function(a) {
      for (var c = a.changedTouches || a.originalEvent.changedTouches, b = 0; b < c.length; ++b) {
        var d =
                c[b];
        if (d.identifier == e) {
          t(d, a);
          break
        }
      }
    };
    v.touchend = function(a) {
      for (var c = a.changedTouches || a.originalEvent.changedTouches, b = 0; b < c.length; ++b) {
        var d = c[b];
        if (d.identifier == e) {
          s(d, "touchcancel" == a.type);
          break
        }
      }
    };
    v.touchcancel = v.touchend;
    v.mouseenter = function(a) {
      d || k(a)
    };
    v.mouseleave = function() {
      d || C && (C = void 0)
    };
    v.mousedown = function(c) {
      if (1 == c.which && void 0 === e && !c.defaultPrevented) {
        q("mouse", c);
        e = "mouse";
        g(a.t);
        if (c.target && !z) {
          var b = $(c.target), d = function(a) {
            a.stopPropagation();
            return!1
          };
          z = function() {
            b.unbind("click",
                    d)
          };
          b.bind("click", d)
        }
        return!1
      }
    };
    v.mousemove = function(a) {
      "mouse" == e ? (h && ($(a.target).closest(b).length ? k(a) : C && (C = void 0)), t(a, a)) : void 0 === e && k(a)
    };
    v.mouseup = function(a) {
      1 == a.which && "mouse" == e && s(a, !1)
    };
    v.dragstart = function() {
      return!1
    };
    v.mousewheel = v.DOMMouseScroll = function(c) {
      var b = c.originalEvent;
      if (!b.defaultPrevented) {
        var d = -b.detail || b.wheelDelta / 120 || 0, f = 0, m = d;
        void 0 !== b.axis && b.axis === b.HORIZONTAL_AXIS ? (m = 0, f = d) : void 0 !== b.wheelDeltaX && void 0 !== b.wheelDeltaY && (f = b.wheelDeltaX / 120, m = b.wheelDeltaY /
                120);
        0 != d && (w = Math.max(1, Math.min(Math.abs(d), w)), a.J({L: d, M: f, N: m, step: d / w, u: f / w, Q: m / w}), c.preventDefault())
      }
    };
    v.losecapture = v.contextmenu = function() {
      void 0 !== e && s(void 0, !0)
    };
    v.selectstart = function() {
      return!1
    };
    this.remove = function() {
      L ? b.unbind("touchstart touchmove touchend touchcancel", c) : b.unbind("mousedown mouseenter mouseleave mousemove contextmenu mousewheel DOMMouseScroll selectstart", c);
      p();
      z && (z(), z = null)
    };
    L ? b.bind("touchstart touchmove touchend touchcancel", c) : b.bind("mousedown mouseenter mouseleave mousemove contextmenu mousewheel DOMMouseScroll selectstart",
            c)
  }
  ;
  var O;
  function P(b) {
    this.element = b;
    this.a = this.element.get(0);
    O(this.a)
  }
  function Q(b, a, c, g, p) {
    this.element = b;
    this.a = this.element.get(0);
    this.x = a;
    this.y = c;
    this.width = g;
    this.height = p;
    O(this.a)
  }
  (function() {
    var b = $("<div>").get(0).style, a = I(b, "transform"), c = I(b, "transformOrigin");
    O = c ? function(a) {
      a.style.position = "absolute";
      a.style[c] = "0 0";
      a.style.left = 0;
      a.style.top = 0
    } : function(a) {
      a.style.position = "absolute"
    };
    a && c && I(b, "perspective") ? (P.prototype.b = function(c, b) {
      this.a.style[a] = "translate3d(" + c.toFixed(3) + "px," + b.toFixed(3) + "px,0)"
    }, Q.prototype.b = function(c, b, q, r, t) {
      this.a.style[a] = "translate3d(" + (c + this.x * r).toFixed(3) + "px," + (b + this.y * t).toFixed(3) + "px,0) scale3d(" + r.toFixed(3) + "," + t.toFixed(3) +
              ",1)";
      this.a.style.zIndex = Math.floor(q)
    }) : (P.prototype.b = function(a, c) {
      this.a.style.left = Math.round(a) + "px";
      this.a.style.top = Math.round(c) + "px"
    }, Q.prototype.b = function(a, c, b, r, t) {
      a += this.x * r;
      c += this.y * t;
      r = a + this.width * r;
      t = c + this.height * t;
      a = Math.round(a);
      c = Math.round(c);
      this.a.style.left = a + "px";
      this.a.style.top = c + "px";
      this.a.style.width = Math.round(r - a) + "px";
      this.a.style.height = Math.round(t - c) + "px";
      this.a.style.zIndex = Math.floor(b)
    })
  })();
  function R(b, a, c) {
    function g(a, m) {
      d.splice(m, 0, this);
      this.id = a;
      this.a = [];
      this.loaded = !1;
      this.h = this.next = null;
      this.width = 0;
      var e = this;
      l.loadSegment(a, f, function(a) {
        if (!e.A) {
          var x = a.length;
          e.j = a;
          e.next = a.next;
          e.h = a.prev;
          e.next != e || x || delete e.next;
          e.h != e || x || delete e.h;
          e.b && e.b.remove();
          e.b = c.l(a, b);
          e.loaded = !0;
          e.width = x * c.c;
          if (m == d.length - 1)
            for (x = 0; x < a.length; ++x)
              e.a.push(l.createItem(e.j, x, f));
          else
            for (x = a.length - 1; 0 <= x; --x)
              e.a[x] = l.createItem(e.j, x, f);
          for (x = 0; x < e.a.length; ++x)
            e.b.m(e.a[x], x);
          e.q();
          B = null;
          u()
        }
      });
      this.loaded || (this.width = c.c, this.b = c.k(b), this.q())
    }
    function p(a, c, b) {
      r();
      a = Math.round(d[0].x + a);
      for (var e = 0; e < d.length; ++e) {
        var f = d[e];
        f.e = f.x;
        f.d = a;
        a += f.width
      }
      u();
      C = E();
      z = c;
      v = b;
      m = K(t)
    }
    function q() {
      for (var a = 0; a < d.length; ++a) {
        var c = d[a];
        c.x = c.e = c.d
      }
      u();
      e()
    }
    function r() {
      clearTimeout(F);
      F = void 0;
      aa(m);
      m = void 0
    }
    function t() {
      m = void 0;
      var a = E() - C;
      if (a >= z)
        q();
      else {
        v(a);
        var a = c.marginWidth, b = c.f - c.marginWidth;
        if (d[0].x > a) {
          for (b = 0; b < d.length; ++b) {
            var e = d[b];
            e.d = a;
            a += e.width
          }
          q()
        } else if (d[d.length -
                1].x + d[d.length - 1].width < b) {
          a = b;
          for (b = d.length - 1; 0 <= b; --b)
            e = d[b], a -= e.width, e.d = a;
          q()
        } else
          m = K(t)
      }
      n()
    }
    function s(a) {
      y = a;
      fa = 0 < y ? -1 : 1;
      a = 0.5 * y * y / (0 > y ? -w : w);
      if (pa) {
        var b = d[0].x - c.marginWidth + a;
        a += Math.round(b / c.c) * c.c - b
      }
      b = (d[0].x - c.marginWidth) / c.c;
      if (0 > a) {
        var b = Math.ceil(b) - b, e = Math.ceil(b - a / c.c);
        e > M && (a = (b - M) * c.c)
      } else
        b -= Math.floor(b), e = Math.ceil(b + a / c.c), e > M && (a = (M - b) * c.c);
      0 != a && (y = Math.sqrt(Math.abs(2 * a * w)), 0 > a && (y = -y), p(a, y / (0 > y ? -w : w), k))
    }
    function k(a) {
      for (var c = 0 > y ? -w : w, b = 0; b < d.length; ++b) {
        var e =
                d[b];
        e.x = e.e + y * a - 0.5 * c * a * a
      }
    }
    function h(a) {
      a = 0.5 * (1 - Math.cos(a / z * Math.PI));
      for (var b = 0; b < d.length; ++b) {
        var c = d[b];
        c.x = c.e + a * (c.d - c.e)
      }
    }
    function e() {
      void 0 === m && (void 0 === F && 0 < d.length && !G && null != ga) && (F = window.setTimeout(function() {
        F = void 0;
        var a = (c.marginWidth - d[0].x) % c.c, b = 0.25 * c.i;
        if (0 > fa) {
          for (; a <= b; )
            a += c.c;
          a += 0 * c.c
        } else {
          for (; a >= - b; )
            a -= c.c;
          a -= 0 * c.c
        }
        p(a, oa, h)
      }, ga))
    }
    function n() {
      for (var a = 0; a < d.length; ++a)
        d[a].v()
    }
    function u() {
      void 0 === A && (A = setTimeout(function() {
        A = void 0;
        if (d.length) {
          for (var a = c.f,
                  b = d[0], e = d[d.length - 1]; Math.max(b.x, b.d) + b.width < - ha; )
            d.shift().remove(), b = d[0];
          for (; Math.min(e.x, e.d) > a + ha; )
            d.pop().remove(), e = d[d.length - 1];
          Math.max(b.x, b.d) > -ia && null != b.h && new g(b.h, 0);
          Math.min(e.x, e.d) + e.width < a + ia && null != e.next && new g(e.next, d.length)
        }
      }, 1))
    }
    var d = [], l = a.stream, f, m, A, C, z, v, w = a.drag || 0.0020, y, F, fa = 0 > a.stepDirection ? -1 : 1, ga = "stepInterval"in a ? a.stepInterval : 3E3, oa = "stepDuration"in a ? a.stepDuration : 1E3, G, ja = "preload"in a ? a.preload : 20, ia = c.c * ja, ha = 3 * c.c * ja / 2, B = a.startItem, T = null,
            pa = a.rounding, N = a.maxThrowVelocity || 4, M = a.maxThrowItems || Infinity;
    g.prototype.q = function() {
      var a = d[1], b = d[d.length - 2];
      if (this.loaded && null !== B) {
        if ("function" == typeof B)
          for (a = B, B = null, b = 0; b < this.a.length; ++b)
            if (a(this.a[b])) {
              B = b;
              break
            }
        0 <= B && B < this.a.length ? this.x = (c.f - c.c) / 2 - B * c.c : this.x = c.marginWidth;
        this.d = this.e = this.x;
        B = null
      } else
        this == d[0] && a && a.loaded ? (this.x = a.x - this.width, this.e = a.e - this.width, this.d = a.d - this.width) : this == d[d.length - 1] && b && b.loaded ? (this.x = b.x + b.width, this.e = b.e + b.width, this.d =
                b.d + b.width) : this.d = this.e = this.x = c.marginWidth;
      this.v()
    };
    g.prototype.v = function() {
      this.b.g(this.x);
      var b = Math.floor((c.f / 2 - this.x) / c.c);
      if (0 <= b && (b < this.a.length && this.a[b] != T) && (T = this.a[b], a.onItemFocused))
        a.onItemFocused(T, this.id, b)
    };
    g.prototype.remove = function() {
      this.A = !0;
      this.b && this.b.remove();
      for (delete this.j; this.a.length; )
        ba(this.a.pop())
    };
    this.remove = function() {
      clearTimeout(A);
      A = void 0;
      for (r(); 0 < d.length; )
        ba(d.pop())
    };
    this.refresh = function() {
      void 0 === m && (n(), u())
    };
    this.a = function(a) {
      if (!G &&
              0 < d.length) {
        var b = 0 < a ? c.f + c.c - c.i - c.marginWidth : c.marginWidth;
        a = (0 < a ? Math.floor : Math.ceil)((d[0].d - b) / c.c - a + (0 < a ? 1 : -1) * c.p) * c.c + b - d[0].x;
        b = Math.sqrt(Math.abs(2 * a * w));
        0 > a && (b = -b);
        s(b)
      }
    };
    this.b = function(a) {
      this.a(a * Math.max(1, Math.floor((c.f - 2 * c.marginWidth) / c.c)))
    };
    f = {itemWidth: c.C || c.i, itemHeight: c.B || c.n, itemSpacing: c.c, refresh: this.refresh};
    new g(a.startSegment || 0, 0);
    u();
    new ma(b, {r: !0, s: !1, t: function() {
        if (G = 1 < d.length || d[0].loaded) {
          r();
          for (var a = y = 0; a < d.length; ++a) {
            var b = d[a];
            b.e = b.d = b.x
          }
        }
      }, I: function(a) {
        if (G) {
          a =
                  a.pageX - a.e;
          var b = c.f, e = d[0], f = e.e;
          null != e.h && (f -= c.c);
          var m = d[d.length - 1], e = m.e + m.width;
          null != m.next && (e += c.c);
          m = c.marginWidth;
          a = Math.max(a, b - c.marginWidth - e);
          a = Math.min(a, m - f);
          for (b = 0; b < d.length; ++b)
            f = d[b], f.x = f.d = f.e + a;
          n();
          u()
        }
      }, H: function(a) {
        G && (s(Math.max(-N, Math.min(a.K, N))), G = !1, e())
      }, J: function(a) {
        if (!G && 0 < d.length) {
          a = d[0].d - d[0].x + (Math.abs(a.step) >= Math.abs(a.u) ? a.step : a.u) * c.c;
          var b = Math.sqrt(Math.abs(2 * a * w));
          0 > a && (b = -b);
          s(Math.max(-N, Math.min(b, N)))
        }
      }, G: function() {
      }, O: function() {
      }, F: function() {
        clearTimeout(F);
        F = void 0;
        e()
      }});
    e()
  }
  ;
  function S(b, a) {
    function c() {
      q.onload = null;
      q.onerror = null;
      p.width = a.itemWidth;
      p.height = Math.round(this.height * a.itemWidth / this.width);
      p.height > a.itemHeight && (p.width = Math.round(this.width * a.itemHeight / this.height), p.height = a.itemHeight);
      g.width(p.width).height(p.height).append($(q).css({width: "100%", height: "100%", border: "none"}));
      a.refresh()
    }
    var g = $("<a>").attr("href", b.link).attr("target", b.target).attr("title", b.title).css("display", "inline-block");
    this.element = g;
    this.height = this.width = 0;
    this.data =
            b;
    var p = this, q = new Image;
    q.onload = c;
    q.onerror = c;
    q.src = b.image
  }
  ;
  var na = $.browser.msie && /^[1-8]\./.test($.browser.version), U, V = [];
  function W() {
    U = null;
    try {
      V.shift()()
    } finally {
      V.length && (U = setTimeout(W, 1))
    }
  }
  ;
  function X(b, a) {
    a = a || {};
    this.b = b;
    this.a = {D: !("looping"in a) || a.looping, o: a.itemType || S}
  }
  X.prototype.loadSegment = function(b, a, c) {
    a = this.a.D ? b : void 0;
    c({id: b, prev: a, next: a, length: this.b.length})
  };
  X.prototype.createItem = function(b, a, c) {
    return new this.a.o(this.b[a], c)
  };
  function Y(b, a) {
    a = a || {};
    this.b = b;
    this.a = {o: a.itemType || S}
  }
  Y.prototype.loadSegment = function(b, a, c) {
    $.getJSON(this.b + b, function(a) {
      c({id: b, prev: a.prev, next: a.next, length: a.items.length, w: a.items})
    })
  };
  Y.prototype.createItem = function(b, a, c) {
    return new this.a.o(b.w[a], c)
  };
  var Z = window.VirtualBookshelf || (window.VirtualBookshelf = {});
  Z.Bookshelf = function(b, a) {
    function c(a, b) {
      this.element = $("<div>").css({width: a.length * t + "px", height: r + "px"});
      this.a = new P(this.element);
      b.append(this.element)
    }
    b = $(b);
    J(b, "userSelect", "none");
    b.css("overflow", "hidden");
    /^(absolute|fixed)$/.test(b.css("position")) || b.css("position", "relative");
    var g = a.spacing || 1, p = b.width(), q = b.height(), r = a.itemHeight || q, t = a.itemWidth || r * (a.itemAspect || 1), q = a.marginWidth || 0, s = Math.round(t * g);
    c.prototype.g = function(a) {
      this.a.b(Math.round(a * D) / D, 0)
    };
    c.prototype.m = function(a,
            b) {
      this.element.append($(a.element).css("position", "absolute").css("left", Math.round(s * b) + "px"))
    };
    c.prototype.remove = function() {
      this.element.remove()
    };
    var k = {i: t, n: r, c: s, f: p, marginWidth: q, p: 0.9, l: function(a, b) {
        return new c(a, b)
      }, k: function(a) {
        a = new c({length: 1}, a);
        a.element.append($("<div>").css({width: t + "px", height: r + "px"}));
        return a
      }}, h = new R(b, a, k);
    this.remove = function() {
      h.remove();
      h = void 0
    };
    this.refresh = function() {
      k.f = p = b.width();
      h.refresh()
    };
    this.step = function(a) {
      h.a(a)
    };
    this.stepPage = function(a) {
      h.b(a)
    }
  };
  Z.Carousel = function(b, a) {
    function c(a, b) {
      this.b = b;
      this.a = [];
      this.visible = !1
    }
    function g(a, b) {
      this.element = $(a.element).hide();
      this.b = a;
      this.visible = !1;
      this.a = new Q(this.element, 0, 0, 0, 0);
      b.append(this.element)
    }
    b = $(b);
    J(b, "userSelect", "none");
    b.css("user-select", "none");
    /^(absolute|fixed)$/.test(b.css("position")) || b.css("position", "relative");
    var p = a.spacing || 1.2, q = a.tilt || 0, r = "perspective"in a ? a.perspective : 1, t = b.width(), s = b.height(), k = a.itemHeight || s, h = a.itemWidth || k * (a.itemAspect || 1), e = h * p, n = "fade"in
            a ? a.fade : 0.1, u = p * t / 2, d = Math.PI * u;
    "startItem"in a || (a.startItem = Math.ceil(d / 2 / e));
    c.prototype.g = function(a) {
      this.visible || (this.visible = a < d && a > -this.a.length * e);
      if (this.visible) {
        for (var b, c = 0; c < this.a.length; ++c) {
          var n = this.a[c];
          n.g(a + e * c);
          b = b || n.visible
        }
        this.visible = b
      }
    };
    c.prototype.m = function(a, b) {
      this.a[b] = new g(a, this.b)
    };
    c.prototype.remove = function() {
      for (var a = 0; a < this.a.length; ++a)
        this.a[a].element.remove()
    };
    g.prototype.g = function(a) {
      a = (e + a) / (e + d);
      var b = 0 < a && 1 > a;
      if (b) {
        var c = a * Math.PI, g = 1 - Math.sin(c),
                l = 1 / (1 + r * g), c = t / 2 - l * u * Math.cos(c), p = s * q * g, w = this.b.width, y = this.b.height;
        this.a.x = (h - w) / 2;
        this.a.y = k - y;
        this.a.width = w;
        this.a.height = y;
        this.a.b(c - l * h / 2, p + k - l * k, 1E3 * (1 - g), l, l);
        this.element.css("opacity", (a < n ? a / n : a > 1 - n ? (1 - a) / n : 1).toFixed(3))
      }
      this.visible != b && (this.visible = b, this.element.toggle(b))
    };
    var l = new R(b, a, {i: h, n: k, c: e, f: d, marginWidth: (d - e) / 2, p: 0.5, l: function(a, b) {
        return new c(0, b)
      }, k: function(a) {
        return new c(0, a)
      }});
    this.remove = function() {
      l.remove();
      l = void 0
    };
    this.refresh = function() {
      l.refresh()
    };
    this.step = function(a) {
      l.a(a)
    }
  };
  Z.Train = function(b, a) {
    function c(a, b) {
      this.b = b;
      this.a = [];
      this.visible = !1
    }
    function g(a, b) {
      this.element = $(a.element).hide();
      this.b = a;
      this.visible = !1;
      this.a = new Q(this.element, 0, 0, 0, 0);
      b.append(this.element)
    }
    b = $(b);
    J(b, "userSelect", "none");
    b.css("user-select", "none");
    b.css("overflow", "hidden");
    /^absolute|fixed$/.test(b.css("position")) || b.css("position", "relative");
    var p = a.spacing || 1.1, q = b.width(), r = b.height(), t = a.itemHeight || r, s = a.itemWidth || t * (a.itemAspect || 0.8), k = s * (a.unfocusedScale || 0.2), h = k * p, e =
            "unfocusedOpacity"in a ? a.unfocusedOpacity : 0.5, n = "transitionOverlap"in a ? a.transitionOverlap : 0.15, u = "transitionFade"in a ? a.transitionFade : 0.2, d = "focusedPosition"in a ? a.focusedPosition : 0.5, l = q * (1 + 2 * Math.abs(d - 0.5));
    "startItem"in a || (a.startItem = Math.ceil(l / 2 / h));
    "maxThrowVelocity"in a || (a.maxThrowVelocity = 1);
    "rounding"in a || (a.rounding = !0);
    c.prototype.g = function(a) {
      this.visible || (this.visible = a < l && a > -this.a.length * h);
      if (this.visible) {
        for (var b, c = 0; c < this.a.length; ++c) {
          var d = this.a[c];
          d.g(a + h * c);
          b = b ||
                  d.visible
        }
        this.visible = b
      }
    };
    c.prototype.m = function(a, b) {
      this.a[b] = new g(a, this.b)
    };
    c.prototype.remove = function() {
      for (var a = 0; a < this.a.length; ++a)
        this.a[a].element.remove()
    };
    g.prototype.g = function(a) {
      var b = (h + a) / (h + l);
      if (b = 0 < b && 1 > b) {
        var c = this.b.width, f = this.b.height;
        this.a.x = -c / 2;
        this.a.y = 0;
        this.a.width = c;
        this.a.height = f;
        var c = Math.max(0, 1 - Math.abs(a - (l - h) / 2) / ((1 + n) * h / 2)), c = 0.5 * (1 - Math.cos(c * Math.PI)), g = (1 - c) * (k / s) + c;
        a += h / 2;
        0.5 > d && (a += q - l);
        this.a.b(a, (r - g * f) / 2, 1E3 * c, g, g);
        a = c / u;
        a = Math.min(1, e * (1 - a) +
                a);
        this.element.css("opacity", a.toFixed(3))
      }
      this.visible != b && (this.visible = b, this.element.toggle(b))
    };
    var f = new R(b, a, {i: k, n: t, c: h, C: s, B: t, f: l, marginWidth: (l - h) / 2, p: 0.5, l: function(a, b) {
        return new c(0, b)
      }, k: function(a) {
        return new c(0, a)
      }});
    this.remove = function() {
      f.remove();
      f = void 0
    };
    this.refresh = function() {
      f.refresh()
    };
    this.step = function(a) {
      f.a(a)
    }
  };
  Z.ArrayStream = X;
  Z.JSONStream = Y;
  Z.FadeTransition = function(b, a, c, g) {
    function p(a, b) {
      a.css("opacity", Math.max(0.01, Math.min(b, 1)))
    }
    function q() {
      l = d = void 0;
      var f = E();
      u && (n && (f < e ? p(h, (e - f) / a) : (h.remove(), n = !1)), n || (h = u, u = void 0, e = Math.max(f, Math.max(f, k) + c) + g));
      h && !u && f >= e - g && (n || (h = $(h)), p(h, 1 - (e - f) / g), n || (b.append(h), n = !0));
      s && (f < k ? p(s, (k - f) / a) : (s.remove(), s = void 0));
      s || f >= e - g && f < e ? d = K(q) : f < e && (l = setTimeout(q, e - g - f))
    }
    function r() {
      clearTimeout(l);
      l = void 0;
      aa(d);
      d = void 0
    }
    c = c || 0;
    g = 0 <= g ? g : a;
    var t = E(), s, k = t, h, e = t, n, u, d, l;
    this.show = function(b) {
      r();
      if (!u) {
        var c = E();
        e = c + Math.min(1, 1 - (e - c) / g) * a
      }
      u = b;
      s || (n && (s = h, k = e, n = !1), h = void 0);
      q()
    };
    this.remove = r
  };
  Z.SimpleItem = S;
  Z.SubstituteImage = function(b, a, c, g, p, q, r) {
    function t(a) {
      if (na) {
        var b = a.position();
        a.before($('<div class="shelf-ie-box-shadow">').css({left: b.left - 5 + "px", top: b.top - 4 + "px", width: a.outerWidth() + "px", height: a.outerHeight() + "px"}))
      } else
        J(a, "boxShadow", r.boxShadow)
    }
    function s() {
      var a = new ca(c), n = "rgb(#,#,#)".replace(/#/g, function() {
        return Math.floor(256 * (0.4 + 0.4 * a.next()))
      }), n = $('<div class="shelf-image-substitute">').css("background-color", n);
      b.append(n);
      var h, d = n.width(), l = n.height(), f = $('<div class="shelf-image-authors static">');
      if (q)
        for (var m = 0; m < q.length; ++m)
          f.append($("<div>").text(q[m]));
      n.append(f);
      for (h = r.authorsFontSize; 1 < h && (f.outerHeight() > r.authorsMaxHeight || f.outerWidth() > d); )
        --h, f.css("font-size", h + "px");
      f.removeClass("static");
      var k, s = 0;
      if (p) {
        k = $('<div class="shelf-image-subtitle">').text(p);
        n.prepend("<br>").prepend(k);
        for (h = r.subtitleFontSize; 1 < h && (k.outerHeight() > r.subtitleMaxHeight || k.outerWidth() > d); )
          --h, k.css("font-size", h + "px");
        s = k.outerHeight()
      }
      m = $('<div class="shelf-image-title">').text(g);
      n.prepend("<br>").prepend(m);
      h = r.titleFontSize;
      for (var z = l - f.outerHeight() - s; 1 < h && (m.outerHeight() > z || m.outerWidth() > d); )
        --h, n.css("font-size", h + "px");
      d = m.outerHeight() + s;
      l = Math.floor(Math.max(0, Math.min(0.2 * (l - d), (l - f.outerHeight() - d) / 2)));
      m.css("top", l + "px");
      k && k.css("top", l + "px");
      na && (n.addClass("shelf-ie-no-text-shadow"), m.prepend($('<div class="shelf-ie-text-shadow">').text(g)), k && k.prepend($('<div class="shelf-ie-text-shadow">').text(p)), f.prepend($('<div class="shelf-ie-text-shadow">').append(f.children().clone())));
      t(n);
      n.prepend($('<div class="shelf-image-bg">').css("background-image", 'url("' + r.background + '")'))
    }
    if (a) {
      var k = new Image, h = function() {
        k.onload = null;
        k.onerror = null;
        setTimeout(function() {
          var a = k.width, c = k.height;
          if (1 < a && 1 < c) {
            var g = $(k), d = b.width(), h = b.height();
            c > h && (a = Math.round(a * h / c), c = h);
            a > d && (c = Math.round(c * d / a), a = d);
            g.css({width: a.toFixed() + "px", height: c.toFixed() + "px", position: "relative", top: (h - c).toFixed() + "px"});
            b.append(g);
            t(g)
          } else
            V.push(s), U || (U = setTimeout(W, 1))
        }, 1)
      };
      k.onload = h;
      k.onerror = h;
      k.src = a
    } else
      V.push(s), U || (U = setTimeout(W, 1))
  };
})(jQuery)
