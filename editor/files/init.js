if (!STK) var STK = function() {
		var a = {},
			b = "theia",
			c = [],
			d = 200,
			e;
		a[b] = {
			IE: /msie/i.test(navigator.userAgent),
			E: function(a) {
				return typeof a == "string" ? document.getElementById(a) : a
			},
			C: function(a) {
				var b;
				a = a.toUpperCase();
				a == "TEXT" ? b = document.createTextNode("") : a == "BUFFER" ? b = document.createDocumentFragment() : b = document.createElement(a);
				return b
			},
			log: function() {
				var a, b = arguments,
					f = b.length,
					g = [].slice.apply(b, [0, f]),
					h = "error",
					i;
				while (g[--f]) if (g[f] instanceof Error) {
					a = g.splice(f, 1)[0];
					break
				}
				if (!a) {
					a = new Error;
					h = "log"
				}
				i = [g, h, (new Date).getTime(), a.message, a.stack];
				if (e) try {
					e.apply(null, i)
				} catch (j) {} else {
					c.length >= d && c.shift();
					c.push(i)
				}
			},
			_regLogFn: function(a) {
				e = a
			},
			_clearLogList: function() {
				return c.splice(0, c.length)
			}
		};
		var f = a[b];
		f.register = function(c, d, e) {
			if (!e || typeof e != "string") e = b;
			a[e] || (a[e] = {});
			var f = a[e],
				g = c.split("."),
				h = f,
				i = null;
			while (i = g.shift()) if (g.length) {
				h[i] === undefined && (h[i] = {});
				h = h[i]
			} else if (h[i] === undefined) try {
				if (e && e !== b) {
					if (c === "core.util.listener") {
						h[i] = a[b].core.util.listener;
						return !0
					}
					if (c === "core.util.connect") {
						h[i] = a[b].core.util.connect;
						return !0
					}
				}
				h[i] = d(f);
				return !0
			} catch (j) {
				setTimeout(function() {
					console.log(j)
				}, 0)
			}
			return !1
		};
		f.unRegister = function(c, d) {
			if (!d || typeof d != "string") d = b;
			var e = a[d],
				f = c.split("."),
				g = e,
				h = null;
			while (h = f.shift()) if (f.length) {
				if (g[h] === undefined) return !1;
				g = g[h]
			} else if (g[h] !== undefined) {
				delete g[h];
				return !0
			}
			return !1
		};
		f.regShort = function(a, b) {
			if (f[a] !== undefined) throw "[" + a + "] : short : has been register";
			f[a] = b
		};
		f.shortRegister = function(c, d, e) {
			if (!e || typeof e != "string") e = b;
			var f = a[e],
				g = c.split(".");
			if (!d) return !1;
			if (f[d]) return !1;
			var h = f,
				i = null;
			while (i = g.shift()) if (g.length) {
				if (h[i] === undefined) return !1;
				h = h[i]
			} else if (h[i] !== undefined) {
				if (f[d]) return !1;
				f[d] = h[i];
				return !0
			}
			return !1
		};
		f.getPKG = function(c) {
			if (!c || typeof c != "string") c = b;
			return a[c]
		};
		return f
	}();
STK.register("core.ani.algorithm", function(a) {
	var b = {
		linear: function(a, b, c, d, e) {
			return c * a / d + b
		},
		easeincubic: function(a, b, c, d, e) {
			return c * (a /= d) * a * a + b
		},
		easeoutcubic: function(a, b, c, d, e) {
			return (a /= d / 2) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
		},
		easeinoutcubic: function(a, b, c, d, e) {
			e == undefined && (e = 1.70158);
			return c * (a /= d) * a * ((e + 1) * a - e) + b
		},
		easeinback: function(a, b, c, d, e) {
			e == undefined && (e = 1.70158);
			return c * (a /= d) * a * ((e + 1) * a - e) + b
		},
		easeoutback: function(a, b, c, d, e) {
			e == undefined && (e = 1.70158);
			return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
		},
		easeinoutback: function(a, b, c, d, e) {
			e == undefined && (e = 1.70158);
			return (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
		}
	};
	return {
		addAlgorithm: function(a, c) {
			if (b[a]) throw "[core.ani.tweenValue] this algorithm :" + a + "already exist";
			b[a] = c
		},
		compute: function(a, c, d, e, f, g, h) {
			if (typeof b[a] != "function") throw "[core.ani.tweenValue] this algorithm :" + a + "do not exist";
			return b[a](e, c, d, f, g, h)
		}
	}
});
STK.register("core.func.empty", function() {
	return function() {}
});
STK.register("core.obj.parseParam", function(a) {
	return function(a, b, c) {
		var d, e = {};
		b = b || {};
		for (d in a) {
			e[d] = a[d];
			b[d] != null && (c ? a.hasOwnProperty(d) && (e[d] = b[d]) : e[d] = b[d])
		}
		return e
	}
});
STK.register("core.ani.tweenArche", function(a) {
	return function(b, c) {
		var d, e, f, g, h, i, j, k;
		e = {};
		d = a.core.obj.parseParam({
			animationType: "linear",
			distance: 1,
			duration: 500,
			callback: a.core.func.empty,
			algorithmParams: {},
			extra: 5,
			delay: 25
		}, c);
		var l = function() {
				f = +(new Date) - g;
				if (f < d.duration) {
					h = a.core.ani.algorithm.compute(d.animationType, 0, d.distance, f, d.duration, d.extra, d.algorithmParams);
					b(h);
					i = setTimeout(l, d.delay)
				} else {
					k = "stop";
					d.callback()
				}
			};
		k = "stop";
		e.getStatus = function() {
			return k
		};
		e.play = function() {
			g = +(new Date);
			h = null;
			l();
			k = "play";
			return e
		};
		e.stop = function() {
			clearTimeout(i);
			k = "stop";
			return e
		};
		e.resume = function() {
			if (j) {
				g += +(new Date) - j;
				l()
			}
			return e
		};
		e.pause = function() {
			clearTimeout(i);
			j = +(new Date);
			k = "pause";
			return e
		};
		e.destroy = function() {
			clearTimeout(i);
			j = 0;
			k = "stop"
		};
		return e
	}
});
STK.register("core.dom.getStyle", function(a) {
	function b() {
		return "y" in b ? b.y : b.y = "filters" in a.C("div")
	}
	return function(a, c) {
		if (!b()) {
			c == "float" && (c = "cssFloat");
			try {
				var d = document.defaultView.getComputedStyle(a, "")
			} catch (e) {}
			return a.style[c] || d ? d[c] : null
		}
		switch (c) {
		case "opacity":
			var f = 100;
			try {
				f = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
			} catch (e) {
				try {
					f = a.filters("alpha").opacity
				} catch (e) {}
			}
			return f / 100;
		case "float":
			c = "styleFloat";
		default:
			var g = a.currentStyle ? a.currentStyle[c] : null;
			return a.style[c] || g
		}
	}
});
STK.register("core.util.browser", function(a) {
	var b = navigator.userAgent.toLowerCase(),
		c = window.external || "",
		d, e, f, g, h, i = function(a) {
			var b = 0;
			return parseFloat(a.replace(/\./g, function() {
				return b++ == 1 ? "" : "."
			}))
		};
	try {
		/windows|win32/i.test(b) ? h = "windows" : /macintosh/i.test(b) ? h = "macintosh" : /rhino/i.test(b) && (h = "rhino");
		if ((e = b.match(/applewebkit\/([^\s]*)/)) && e[1]) {
			d = "webkit";
			g = i(e[1])
		} else if ((e = b.match(/presto\/([\d.]*)/)) && e[1]) {
			d = "presto";
			g = i(e[1])
		} else if (e = b.match(/msie\s([^;]*)/)) {
			d = "trident";
			g = 1;
			(e = b.match(/trident\/([\d.]*)/)) && e[1] && (g = i(e[1]))
		} else if (/gecko/.test(b)) {
			d = "gecko";
			g = 1;
			(e = b.match(/rv:([\d.]*)/)) && e[1] && (g = i(e[1]))
		}
		/world/.test(b) ? f = "world" : /360se/.test(b) ? f = "360" : /maxthon/.test(b) || typeof c.max_version == "number" ? f = "maxthon" : /tencenttraveler\s([\d.]*)/.test(b) ? f = "tt" : /se\s([\d.]*)/.test(b) && (f = "sogou")
	} catch (j) {}
	var k = {
		OS: h,
		CORE: d,
		Version: g,
		EXTRA: f ? f : !1,
		IE: /msie/.test(b),
		OPERA: /opera/.test(b),
		MOZ: /gecko/.test(b) && !/(compatible|webkit)/.test(b),
		IE5: /msie 5 /.test(b),
		IE55: /msie 5.5/.test(b),
		IE6: /msie 6/.test(b),
		IE7: /msie 7/.test(b),
		IE8: /msie 8/.test(b),
		IE9: /msie 9/.test(b),
		IE10: /msie 10/.test(b),
		SAFARI: !/chrome\/([\d.]*)/.test(b) && /\/([\da-f.]*) safari/.test(b),
		CHROME: /chrome\/([\d.]*)/.test(b),
		IPAD: /\(ipad/i.test(b),
		IPHONE: /\(iphone/i.test(b),
		ITOUCH: /\(itouch/i.test(b),
		MOBILE: /mobile/i.test(b)
	};
	return k
});
STK.register("core.dom.cssText", function(a) {
	var b = function(a) {
			var b = 0,
				c = [],
				d = "close",
				e = !1,
				f = null,
				g = function(d) {
					c.push({
						type: "info",
						content: a.slice(0, b)
					});
					c.push({
						type: "sign",
						content: a.slice(b, b + 1)
					});
					a = a.slice(b + 1);
					b = 0
				};
			while (a) {
				var h = a.charAt(b);
				switch (h) {
				case ":":
					if (!e && d === "close") {
						c.push({
							type: "attr",
							content: a.slice(0, b)
						});
						c.push({
							type: "sign",
							content: a.slice(b, b + 1)
						});
						a = a.slice(b + 1);
						b = 0;
						d = "open";
						break
					}
					b += 1;
					break;
				case ";":
					if (!e) {
						if (d === "open") {
							c.push({
								type: "info",
								content: a.slice(0, b)
							});
							c.push({
								type: "sign",
								content: a.slice(b, b + 1)
							})
						}
						a = a.slice(b + 1);
						b = 0;
						d = "close";
						break
					}
					b += 1;
					break;
				case '"':
				case "'":
					if (e) {
						if (h === f) {
							e = !e;
							f = null
						}
					} else {
						e = !e;
						f = h
					}
					b += 1;
					break;
				case " ":
				case "!":
				case ",":
				case "(":
				case ")":
					g(h);
					break;
				case "":
					c.push({
						type: "info",
						content: a.slice(0, b)
					});
					a = "";
					b = 0;
					break;
				default:
					b += 1
				}
			}
			return c
		},
		c = function(a) {
			var b = {},
				c;
			for (var d = 0, e = a.length; d < e; d += 1) if (a[d].type === "attr") {
				c = a[d].content;
				b[c] = ""
			} else {
				if (a[d].type === "sign" && a[d].content === ";") {
					c = null;
					continue
				}
				if (a[d].type === "sign" && a[d].content === ":") continue;
				c !== null && (b[c] += a[d].content)
			}
			return b
		},
		d = {
			webkit: "-webkit-",
			presto: "-o-",
			trident: "-ms-",
			gecko: "-moz-"
		}[a.core.util.browser.CORE],
		e = ["transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function"],
		f = function(a) {
			for (var b = 0, c = e.length; b < c; b += 1) if (a === e[b]) return !0;
			return !1
		};
	return function(a) {
		var e = c(b(a || "")),
			g = function(a, b) {
				a = a.toLowerCase();
				e[a] = b;
				f(a) && (e[d + a] = b);
				return h
			},
			h = {
				push: g,
				remove: function(a) {
					a = a.toLowerCase();
					e[a] && delete e[a];
					f(a) && e[d + a] && delete e[d + a];
					return h
				},
				merge: function(a) {
					var d = c(b(a || ""));
					for (var e in d) g(e, d[e])
				},
				getCss: function() {
					var a = [];
					for (var b in e) a.push(b + ":" + e[b]);
					return a.join(";")
				}
			};
		return h
	}
});
STK.register("core.func.getType", function(a) {
	return function(a) {
		var b;
		return ((b = typeof a) == "object" ? a == null && "null" || Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase()
	}
});
STK.register("core.arr.isArray", function(a) {
	return function(a) {
		return Object.prototype.toString.call(a) === "[object Array]"
	}
});
STK.register("core.arr.foreach", function(a) {
	var b = function(a, b) {
			var c = [];
			for (var d = 0, e = a.length; d < e; d += 1) {
				var f = b(a[d], d);
				if (f === !1) break;
				f !== null && (c[d] = f)
			}
			return c
		},
		c = function(a, b) {
			var c = {};
			for (var d in a) {
				var e = b(a[d], d);
				if (e === !1) break;
				e !== null && (c[d] = e)
			}
			return c
		};
	return function(d, e) {
		return a.core.arr.isArray(d) || d.length && d[0] !== undefined ? b(d, e) : typeof d == "object" ? c(d, e) : null
	}
});
STK.register("core.arr.indexOf", function(a) {
	return function(a, b) {
		if (b.indexOf) return b.indexOf(a);
		for (var c = 0, d = b.length; c < d; c++) if (b[c] === a) return c;
		return -1
	}
});
STK.register("core.arr.inArray", function(a) {
	return function(b, c) {
		return a.core.arr.indexOf(b, c) > -1
	}
});
STK.register("core.dom.isNode", function(a) {
	return function(a) {
		return a != undefined && Boolean(a.nodeName) && Boolean(a.nodeType)
	}
});
STK.register("core.json.merge", function(a) {
	var b = function(b) {
			return b === undefined ? !0 : b === null ? !0 : a.core.arr.inArray(typeof b, ["number", "string", "function", "boolean"]) ? !0 : a.core.dom.isNode(b) ? !0 : !1
		},
		c = function(d, e, f) {
			if (b(f)) d[e] = f;
			else {
				if (a.core.arr.isArray(f)) {
					a.core.arr.isArray(d[e]) || (d[e] = []);
					for (var g = 0, h = f.length; g < h; g += 1) c(d[e], g, f[g]);
					return
				}
				if (typeof f == "object") {
					if (b(d[e]) || a.core.arr.isArray(d[e])) d[e] = {};
					for (var i in f) c(d[e], i, f[i]);
					return
				}
			}
		},
		d = function(a, b, d) {
			var e = {};
			if (d) {
				for (var f in a) c(e, f, a[f]);
				for (var f in b) c(e, f, b[f])
			} else {
				for (var f in a) e[f] = a[f];
				for (var f in b) e[f] = b[f]
			}
			return e
		};
	return function(b, c, e) {
		var f = a.core.obj.parseParam({
			isDeep: !1
		}, e);
		return d(b, c, f.isDeep)
	}
});
STK.register("core.util.color", function(a) {
	var b = /^#([a-fA-F0-9]{3,8})$/,
		c = /^rgb[a]?\s*\((\s*([0-9]{1,3})\s*,){2,3}(\s*([0-9]{1,3})\s*)\)$/,
		d = /([0-9]{1,3})/ig,
		e = /([a-fA-F0-9]{2})/ig,
		f = a.core.arr.foreach,
		g = function(a) {
			var g = [],
				h = [];
			if (b.test(a)) {
				h = a.match(b);
				h[1].length <= 4 ? g = f(h[1].split(""), function(a, b) {
					return parseInt(a + a, 16)
				}) : h[1].length <= 8 && (g = f(h[1].match(e), function(a, b) {
					return parseInt(a, 16)
				}));
				return g
			}
			if (c.test(a)) {
				h = a.match(d);
				g = f(h, function(a, b) {
					return parseInt(a, 10)
				});
				return g
			}
			return !1
		};
	return function(a, b) {
		var c = g(a);
		if (!c) return !1;
		var d = {};
		d.getR = function() {
			return c[0]
		};
		d.getG = function() {
			return c[1]
		};
		d.getB = function() {
			return c[2]
		};
		d.getA = function() {
			return c[3]
		};
		return d
	}
});
STK.register("core.ani.tween", function(a) {
	var b = a.core.ani.tweenArche,
		c = a.core.arr.foreach,
		d = a.core.dom.getStyle,
		e = a.core.func.getType,
		f = a.core.obj.parseParam,
		g = a.core.json.merge,
		h = a.core.util.color,
		i = function(a) {
			var b = /(-?\d\.?\d*)([a-z%]*)/i.exec(a),
				c = [0, "px"];
			if (b) {
				b[1] && (c[0] = b[1] - 0);
				b[2] && (c[1] = b[2])
			}
			return c
		},
		j = function(a) {
			for (var b = 0, c = a.length; b < c; b += 1) {
				var d = a.charCodeAt(b);
				if (d > 64 && d < 90) {
					var e = a.substr(0, b),
						f = a.substr(b, 1),
						g = a.slice(b + 1);
					return e + "-" + f.toLowerCase() + g
				}
			}
			return a
		},
		k = function(a, b, c) {
			var f = d(a, c);
			if (e(f) === "undefined" || f === "auto") {
				c === "height" && (f = a.offsetHeight);
				c === "width" && (f = a.offsetWidth)
			}
			var g = {
				start: f,
				end: b,
				unit: "",
				key: c,
				defaultColor: !1
			};
			if (e(b) === "number") {
				var j = [0, "px"];
				e(f) === "number" ? j[0] = f : j = i(f);
				g.start = j[0];
				g.unit = j[1]
			}
			if (e(b) === "string") {
				var k, l;
				k = h(b);
				if (k) {
					l = h(f);
					l || (l = h("#fff"));
					g.start = l;
					g.end = k;
					g.defaultColor = !0
				}
			}
			a = null;
			return g
		},
		l = null,
		m = function() {
			if (l !== null) return l;
			if ("y" in m) return m.y;
			l = m.y = "filters" in a.C("div");
			return l
		},
		n = {
			opacity: function(a, b, c, d) {
				var e = a * (c - b) + b,
					f = {};
				m() ? f.filter = "alpha(opacity=" + e * 100 + ")" : f.opacity = Math.max(Math.min(1, e), 0);
				f.zoom = 1;
				return f
			},
			defaultColor: function(a, b, c, d, e) {
				var f = Math.max(0, Math.min(255, Math.ceil(a * (c.getR() - b.getR()) + b.getR()))),
					g = Math.max(0, Math.min(255, Math.ceil(a * (c.getG() - b.getG()) + b.getG()))),
					h = Math.max(0, Math.min(255, Math.ceil(a * (c.getB() - b.getB()) + b.getB()))),
					i = {};
				i[j(e)] = "#" + (f < 16 ? "0" : "") + f.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (h < 16 ? "0" : "") + h.toString(16);
				return i
			},
			"default": function(a, b, c, d, e) {
				var f = a * (c - b) + b,
					g = {};
				g[j(e)] = f + d;
				return g
			}
		};
	return function(d, e) {
		var h, i, j, l, m, o, p, q, r, s;
		e = e || {};
		i = f({
			animationType: "linear",
			duration: 500,
			algorithmParams: {},
			extra: 5,
			delay: 25
		}, e);
		i.distance = 1;
		var t, u;
		i.callback = function() {
			u = e.end || a.core.func.empty;
			t = e.tween || a.core.func.empty;
			return function() {
				l(1);
				p();
				u(d)
			}
		}();
		j = g(n, e.propertys || {});
		o = null;
		m = {};
		r = [];
		l = function(a) {
			var b = [],
				e = c(m, function(b, c) {
					var d;
					j[c] ? d = j[c] : b.defaultColor ? d = j.defaultColor : d = j["default"];
					var e = d(a, b.start, b.end, b.unit, b.key);
					for (var f in e) o.push(f, e[f]);
					try {
						t(a)
					} catch (g) {}
				});
			d.style.cssText = o.getCss()
		};
		p = function() {
			var a;
			while (a = r.shift()) try {
				a.fn();
				if (a.type === "play") break;
				if (a.type === "destroy") break
			} catch (b) {}
		};
		s = b(l, i);
		var v = function(a) {
				s.getStatus() !== "play" ? d = a : r.push({
					fn: v,
					type: "setNode"
				})
			},
			w = function(b) {
				if (s.getStatus() !== "play") {
					m = c(b, function(a, b) {
						return k(d, a, b)
					});
					o = a.core.dom.cssText(d.style.cssText + (e.staticStyle || ""));
					s.play()
				} else r.push({
					fn: function() {
						w(b)
					},
					type: "play"
				})
			},
			x = function() {
				if (s.getStatus() !== "play") {
					s.destroy();
					d = null;
					h = null;
					i = null;
					j = null;
					l = null;
					m = null;
					o = null;
					p = null;
					q = null;
					r = null
				} else r.push({
					fn: x,
					type: "destroy"
				})
			};
		h = {};
		h.play = function(a) {
			w(a);
			return h
		};
		h.stop = function() {
			s.stop();
			return h
		};
		h.pause = function() {
			s.pause();
			return h
		};
		h.resume = function() {
			s.resume();
			return h
		};
		h.finish = function(a) {
			w(a);
			x();
			return h
		};
		h.setNode = function(a) {
			v(a);
			return h
		};
		h.destroy = function() {
			x();
			return h
		};
		return h
	}
});
STK.register("core.dom.hasClassName", function(a) {
	return function(a, b) {
		return (new RegExp("(^|\\s)" + b + "($|\\s)")).test(a.className)
	}
});
STK.register("core.str.trim", function(a) {
	return function(a) {
		if (typeof a != "string") return "";
		var b = a.length,
			c = 0,
			d = /(\u3000|\s|\t|\u00A0)/;
		while (c < b) {
			if (!d.test(a.charAt(c))) break;
			c += 1
		}
		while (b > c) {
			if (!d.test(a.charAt(b - 1))) break;
			b -= 1
		}
		return a.slice(c, b)
	}
});
STK.register("core.dom.addClassName", function(a) {
	return function(b, c) {
		b.nodeType === 1 && (a.core.dom.hasClassName(b, c) || (b.className = a.core.str.trim(b.className) + " " + c))
	}
});
STK.register("core.dom.removeClassName", function(a) {
	return function(b, c) {
		b.nodeType === 1 && a.core.dom.hasClassName(b, c) && (b.className = b.className.replace(new RegExp("(^|\\s)" + c + "($|\\s)"), " "))
	}
});
STK.register("core.evt.addEvent", function(a) {
	return function(b, c, d) {
		b = a.E(b);
		if (b == null) return !1;
		if (typeof d != "function") return !1;
		b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d;
		return !0
	}
});
STK.register("core.evt.removeEvent", function(a) {
	return function(b, c, d) {
		b = a.E(b);
		if (b == null) return !1;
		if (typeof d != "function") return !1;
		b.removeEventListener ? b.removeEventListener(c, d, !1) : b.detachEvent && b.detachEvent("on" + c, d);
		b["on" + c] = null;
		return !0
	}
});
STK.register("core.evt.eventName", function(a) {
	var b = {
		WebkitTransition: "webkitTransitionEnd",
		MozTransition: "transitionend",
		OTransition: "oTransitionEnd",
		msTransition: "MSTransitionEnd",
		transition: "transitionend"
	};
	return function(c) {
		if (c === "mousewheel") return "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
		if (c === "transitionend") {
			var d = a.C("div");
			for (var e in b) if (e in d.style) return b[e]
		}
		return c
	}
});
STK.register("core.ani.transition", function(a) {
	var b = function() {
			var a = document.createElement("style"),
				b = "STK_transition_" + +(new Date),
				c = null,
				d = {};
			a.setAttribute("type", "text/css");
			a.setAttribute("id", b);
			document.head.appendChild(a);
			for (var e = 0, f = document.styleSheets.length; e < f; e += 1) if (document.styleSheets[e].ownerNode.id === b) {
				c = document.styleSheets[e];
				break
			}
			d.getCssSheet = function() {
				return c
			};
			d.addRule = function(a, b) {
				var d = c.rules || c.cssRules;
				c.addRule ? c.addRule(a, b, d.length) : c.insertRule && c.insertRule(a + " {" + b + "}", d.length)
			};
			d.destory = function() {
				document.head.removeChild(a);
				a = null;
				c = null;
				b = null
			};
			return d
		},
		c = a.core.evt.eventName("transitionend");
	return function(d, e) {
		var f = a.core.obj.parseParam({
			target: "",
			duration: 500,
			timingFn: [0, 0, 1, 1],
			callback: function() {}
		}, e),
			g = "all " + f.duration + "ms cubic-bezier(" + f.timingFn.join(",") + ")",
			h = a.core.dom.cssText(d.style.cssText),
			i = "test",
			j = b();
		h.merge(f.target);
		h.push("transition", g);
		j.addRule("." + i, h.getCss());
		a.core.evt.addEvent(d, c, function() {
			a.core.evt.removeEvent(d, c, arguments.callee);
			d.style.cssText = h.remove("transition").getCss();
			a.core.dom.removeClassName(d, i);
			j.destory();
			g = null;
			h = null;
			i = null;
			j = null;
			f.callback(d);
			f = null
		});
		a.core.dom.addClassName(d, i);
		d.style.cssText = ""
	}
});
STK.register("core.arr.findout", function(a) {
	return function(b, c) {
		if (!a.core.arr.isArray(b)) throw "the findout function needs an array as first parameter";
		var d = [];
		for (var e = 0, f = b.length; e < f; e += 1) b[e] === c && d.push(e);
		return d
	}
});
STK.register("core.arr.clear", function(a) {
	return function(b) {
		if (!a.core.arr.isArray(b)) throw "the clear function needs an array as first parameter";
		var c = [];
		for (var d = 0, e = b.length; d < e; d += 1) a.core.arr.findout([undefined, null, ""], b[d]).length || c.push(b[d]);
		return c
	}
});
STK.register("core.arr.copy", function(a) {
	return function(b) {
		if (!a.core.arr.isArray(b)) throw "the copy function needs an array as first parameter";
		return b.slice(0)
	}
});
STK.register("core.arr.hasby", function(a) {
	return function(b, c) {
		if (!a.core.arr.isArray(b)) throw "the hasBy function needs an array as first parameter";
		var d = [];
		for (var e = 0, f = b.length; e < f; e += 1) c(b[e], e) && d.push(e);
		return d
	}
});
STK.register("core.arr.unique", function(a) {
	return function(b) {
		if (!a.core.arr.isArray(b)) throw "the unique function needs an array as first parameter";
		var c = [];
		for (var d = 0, e = b.length; d < e; d += 1) a.core.arr.indexOf(b[d], c) === -1 && c.push(b[d]);
		return c
	}
});
STK.register("core.dom.addHTML", function(a) {
	return function(a, b) {
		if (a.insertAdjacentHTML) a.insertAdjacentHTML("BeforeEnd", b);
		else {
			var c = a.ownerDocument.createRange();
			c.setStartBefore(a);
			var d = c.createContextualFragment(b);
			a.appendChild(d)
		}
	}
});
STK.register("core.dom.sizzle", function(a) {
	function c(a, b, c, d, e, f) {
		for (var g = 0, h = d.length; g < h; g++) {
			var i = d[g];
			if (i) {
				i = i[a];
				var j = !1;
				while (i) {
					if (i.sizcache === c) {
						j = d[i.sizset];
						break
					}
					if (i.nodeType === 1 && !f) {
						i.sizcache = c;
						i.sizset = g
					}
					if (i.nodeName.toLowerCase() === b) {
						j = i;
						break
					}
					i = i[a]
				}
				d[g] = j
			}
		}
	}
	function b(a, b, c, d, e, f) {
		for (var g = 0, h = d.length; g < h; g++) {
			var j = d[g];
			if (j) {
				j = j[a];
				var k = !1;
				while (j) {
					if (j.sizcache === c) {
						k = d[j.sizset];
						break
					}
					if (j.nodeType === 1) {
						if (!f) {
							j.sizcache = c;
							j.sizset = g
						}
						if (typeof b != "string") {
							if (j === b) {
								k = !0;
								break
							}
						} else if (i.filter(b, [j]).length > 0) {
							k = j;
							break
						}
					}
					j = j[a]
				}
				d[g] = k
			}
		}
	}
	var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		e = 0,
		f = Object.prototype.toString,
		g = !1,
		h = !0;
	[0, 0].sort(function() {
		h = !1;
		return 0
	});
	var i = function(a, b, c, e) {
			c = c || [];
			b = b || document;
			var g = b;
			if (b.nodeType !== 1 && b.nodeType !== 9) return [];
			if (!a || typeof a != "string") return c;
			var h = [],
				l, m, o, p, r = !0,
				s = i.isXML(b),
				t = a,
				u, v, w, x;
			do {
				d.exec("");
				l = d.exec(t);
				if (l) {
					t = l[3];
					h.push(l[1]);
					if (l[2]) {
						p = l[3];
						break
					}
				}
			} while (l);
			if (h.length > 1 && k.exec(a)) if (h.length === 2 && j.relative[h[0]]) m = q(h[0] + h[1], b);
			else {
				m = j.relative[h[0]] ? [b] : i(h.shift(), b);
				while (h.length) {
					a = h.shift();
					j.relative[a] && (a += h.shift());
					m = q(a, m)
				}
			} else {
				if (!e && h.length > 1 && b.nodeType === 9 && !s && j.match.ID.test(h[0]) && !j.match.ID.test(h[h.length - 1])) {
					u = i.find(h.shift(), b, s);
					b = u.expr ? i.filter(u.expr, u.set)[0] : u.set[0]
				}
				if (b) {
					u = e ? {
						expr: h.pop(),
						set: n(e)
					} : i.find(h.pop(), h.length === 1 && (h[0] === "~" || h[0] === "+") && b.parentNode ? b.parentNode : b, s);
					m = u.expr ? i.filter(u.expr, u.set) : u.set;
					h.length > 0 ? o = n(m) : r = !1;
					while (h.length) {
						v = h.pop();
						w = v;
						j.relative[v] ? w = h.pop() : v = "";
						w == null && (w = b);
						j.relative[v](o, w, s)
					}
				} else o = h = []
			}
			o || (o = m);
			o || i.error(v || a);
			if (f.call(o) === "[object Array]") if (!r) c.push.apply(c, o);
			else if (b && b.nodeType === 1) for (x = 0; o[x] != null; x++) o[x] && (o[x] === !0 || o[x].nodeType === 1 && i.contains(b, o[x])) && c.push(m[x]);
			else for (x = 0; o[x] != null; x++) o[x] && o[x].nodeType === 1 && c.push(m[x]);
			else n(o, c);
			if (p) {
				i(p, g, c, e);
				i.uniqueSort(c)
			}
			return c
		};
	i.uniqueSort = function(a) {
		if (p) {
			g = h;
			a.sort(p);
			if (g) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
		}
		return a
	};
	i.matches = function(a, b) {
		return i(a, null, null, b)
	};
	i.find = function(a, b, c) {
		var d;
		if (!a) return [];
		for (var e = 0, f = j.order.length; e < f; e++) {
			var g = j.order[e],
				h;
			if (h = j.leftMatch[g].exec(a)) {
				var i = h[1];
				h.splice(1, 1);
				if (i.substr(i.length - 1) !== "\\") {
					h[1] = (h[1] || "").replace(/\\/g, "");
					d = j.find[g](h, b, c);
					if (d != null) {
						a = a.replace(j.match[g], "");
						break
					}
				}
			}
		}
		d || (d = b.getElementsByTagName("*"));
		return {
			set: d,
			expr: a
		}
	};
	i.filter = function(a, b, c, d) {
		var e = a,
			f = [],
			g = b,
			h, k, l = b && b[0] && i.isXML(b[0]);
		while (a && b.length) {
			for (var m in j.filter) if ((h = j.leftMatch[m].exec(a)) != null && h[2]) {
				var n = j.filter[m],
					o, p, q = h[1];
				k = !1;
				h.splice(1, 1);
				if (q.substr(q.length - 1) === "\\") continue;
				g === f && (f = []);
				if (j.preFilter[m]) {
					h = j.preFilter[m](h, g, c, f, d, l);
					if (!h) k = o = !0;
					else if (h === !0) continue
				}
				if (h) for (var r = 0;
				(p = g[r]) != null; r++) if (p) {
					o = n(p, h, r, g);
					var s = d ^ !! o;
					if (c && o != null) s ? k = !0 : g[r] = !1;
					else if (s) {
						f.push(p);
						k = !0
					}
				}
				if (o !== undefined) {
					c || (g = f);
					a = a.replace(j.match[m], "");
					if (!k) return [];
					break
				}
			}
			if (a === e) if (k == null) i.error(a);
			else break;
			e = a
		}
		return g
	};
	i.error = function(a) {
		throw "Syntax error, unrecognized expression: " + a
	};
	var j = {
		order: ["ID", "NAME", "TAG"],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
		leftMatch: {},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		attrHandle: {
			href: function(a) {
				return a.getAttribute("href")
			}
		},
		relative: {
			"+": function(a, b) {
				var c = typeof b == "string",
					d = c && !/\W/.test(b),
					e = c && !d;
				d && (b = b.toLowerCase());
				for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
					while ((h = h.previousSibling) && h.nodeType !== 1);
					a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
				}
				e && i.filter(b, a, !0)
			},
			">": function(a, b) {
				var c = typeof b == "string",
					d, e = 0,
					f = a.length;
				if (c && !/\W/.test(b)) {
					b = b.toLowerCase();
					for (; e < f; e++) {
						d = a[e];
						if (d) {
							var g = d.parentNode;
							a[e] = g.nodeName.toLowerCase() === b ? g : !1
						}
					}
				} else {
					for (; e < f; e++) {
						d = a[e];
						d && (a[e] = c ? d.parentNode : d.parentNode === b)
					}
					c && i.filter(b, a, !0)
				}
			},
			"": function(a, d, f) {
				var g = e++,
					h = b,
					i;
				if (typeof d == "string" && !/\W/.test(d)) {
					d = d.toLowerCase();
					i = d;
					h = c
				}
				h("parentNode", d, g, a, i, f)
			},
			"~": function(a, d, f) {
				var g = e++,
					h = b,
					i;
				if (typeof d == "string" && !/\W/.test(d)) {
					d = d.toLowerCase();
					i = d;
					h = c
				}
				h("previousSibling", d, g, a, i, f)
			}
		},
		find: {
			ID: function(a, b, c) {
				if (typeof b.getElementById != "undefined" && !c) {
					var d = b.getElementById(a[1]);
					return d ? [d] : []
				}
			},
			NAME: function(a, b) {
				if (typeof b.getElementsByName != "undefined") {
					var c = [],
						d = b.getElementsByName(a[1]);
					for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
					return c.length === 0 ? null : c
				}
			},
			TAG: function(a, b) {
				return b.getElementsByTagName(a[1])
			}
		},
		preFilter: {
			CLASS: function(a, b, c, d, e, f) {
				a = " " + a[1].replace(/\\/g, "") + " ";
				if (f) return a;
				for (var g = 0, h;
				(h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
				return !1
			},
			ID: function(a) {
				return a[1].replace(/\\/g, "")
			},
			TAG: function(a, b) {
				return a[1].toLowerCase()
			},
			CHILD: function(a) {
				if (a[1] === "nth") {
					var b = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
					a[2] = b[1] + (b[2] || 1) - 0;
					a[3] = b[3] - 0
				}
				a[0] = e++;
				return a
			},
			ATTR: function(a, b, c, d, e, f) {
				var g = a[1].replace(/\\/g, "");
				!f && j.attrMap[g] && (a[1] = j.attrMap[g]);
				a[2] === "~=" && (a[4] = " " + a[4] + " ");
				return a
			},
			PSEUDO: function(a, b, c, e, f) {
				if (a[1] === "not") if ((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3])) a[3] = i(a[3], null, null, b);
				else {
					var g = i.filter(a[3], b, c, !0 ^ f);
					c || e.push.apply(e, g);
					return !1
				} else if (j.match.POS.test(a[0]) || j.match.CHILD.test(a[0])) return !0;
				return a
			},
			POS: function(a) {
				a.unshift(!0);
				return a
			}
		},
		filters: {
			enabled: function(a) {
				return a.disabled === !1 && a.type !== "hidden"
			},
			disabled: function(a) {
				return a.disabled === !0
			},
			checked: function(a) {
				return a.checked === !0
			},
			selected: function(a) {
				a.parentNode.selectedIndex;
				return a.selected === !0
			},
			parent: function(a) {
				return !!a.firstChild
			},
			empty: function(a) {
				return !a.firstChild
			},
			has: function(a, b, c) {
				return !!i(c[3], a).length
			},
			header: function(a) {
				return /h\d/i.test(a.nodeName)
			},
			text: function(a) {
				return "text" === a.type
			},
			radio: function(a) {
				return "radio" === a.type
			},
			checkbox: function(a) {
				return "checkbox" === a.type
			},
			file: function(a) {
				return "file" === a.type
			},
			password: function(a) {
				return "password" === a.type
			},
			submit: function(a) {
				return "submit" === a.type
			},
			image: function(a) {
				return "image" === a.type
			},
			reset: function(a) {
				return "reset" === a.type
			},
			button: function(a) {
				return "button" === a.type || a.nodeName.toLowerCase() === "button"
			},
			input: function(a) {
				return /input|select|textarea|button/i.test(a.nodeName)
			}
		},
		setFilters: {
			first: function(a, b) {
				return b === 0
			},
			last: function(a, b, c, d) {
				return b === d.length - 1
			},
			even: function(a, b) {
				return b % 2 === 0
			},
			odd: function(a, b) {
				return b % 2 === 1
			},
			lt: function(a, b, c) {
				return b < c[3] - 0
			},
			gt: function(a, b, c) {
				return b > c[3] - 0
			},
			nth: function(a, b, c) {
				return c[3] - 0 === b
			},
			eq: function(a, b, c) {
				return c[3] - 0 === b
			}
		},
		filter: {
			PSEUDO: function(a, b, c, d) {
				var e = b[1],
					f = j.filters[e];
				if (f) return f(a, c, b, d);
				if (e === "contains") return (a.textContent || a.innerText || i.getText([a]) || "").indexOf(b[3]) >= 0;
				if (e === "not") {
					var g = b[3];
					for (var h = 0, k = g.length; h < k; h++) if (g[h] === a) return !1;
					return !0
				}
				i.error("Syntax error, unrecognized expression: " + e)
			},
			CHILD: function(a, b) {
				var c = b[1],
					d = a;
				switch (c) {
				case "only":
				case "first":
					while (d = d.previousSibling) if (d.nodeType === 1) return !1;
					if (c === "first") return !0;
					d = a;
				case "last":
					while (d = d.nextSibling) if (d.nodeType === 1) return !1;
					return !0;
				case "nth":
					var e = b[2],
						f = b[3];
					if (e === 1 && f === 0) return !0;
					var g = b[0],
						h = a.parentNode;
					if (h && (h.sizcache !== g || !a.nodeIndex)) {
						var i = 0;
						for (d = h.firstChild; d; d = d.nextSibling) d.nodeType === 1 && (d.nodeIndex = ++i);
						h.sizcache = g
					}
					var j = a.nodeIndex - f;
					return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
				}
			},
			ID: function(a, b) {
				return a.nodeType === 1 && a.getAttribute("id") === b
			},
			TAG: function(a, b) {
				return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
			},
			CLASS: function(a, b) {
				return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
			},
			ATTR: function(a, b) {
				var c = b[1],
					d = j.attrHandle[c] ? j.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
					e = d + "",
					f = b[2],
					g = b[4];
				return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
			},
			POS: function(a, b, c, d) {
				var e = b[2],
					f = j.setFilters[e];
				if (f) return f(a, c, b, d)
			}
		}
	};
	i.selectors = j;
	var k = j.match.POS,
		l = function(a, b) {
			return "\\" + (b - 0 + 1)
		};
	for (var m in j.match) {
		j.match[m] = new RegExp(j.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source);
		j.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + j.match[m].source.replace(/\\(\d+)/g, l))
	}
	var n = function(a, b) {
			a = Array.prototype.slice.call(a, 0);
			if (b) {
				b.push.apply(b, a);
				return b
			}
			return a
		};
	try {
		Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
	} catch (o) {
		n = function(a, b) {
			var c = b || [],
				d = 0;
			if (f.call(a) === "[object Array]") Array.prototype.push.apply(c, a);
			else if (typeof a.length == "number") for (var e = a.length; d < e; d++) c.push(a[d]);
			else for (; a[d]; d++) c.push(a[d]);
			return c
		}
	}
	var p;
	document.documentElement.compareDocumentPosition ? p = function(a, b) {
		if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
			a == b && (g = !0);
			return a.compareDocumentPosition ? -1 : 1
		}
		var c = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		c === 0 && (g = !0);
		return c
	} : "sourceIndex" in document.documentElement ? p = function(a, b) {
		if (!a.sourceIndex || !b.sourceIndex) {
			a == b && (g = !0);
			return a.sourceIndex ? -1 : 1
		}
		var c = a.sourceIndex - b.sourceIndex;
		c === 0 && (g = !0);
		return c
	} : document.createRange && (p = function(a, b) {
		if (!a.ownerDocument || !b.ownerDocument) {
			a == b && (g = !0);
			return a.ownerDocument ? -1 : 1
		}
		var c = a.ownerDocument.createRange(),
			d = b.ownerDocument.createRange();
		c.setStart(a, 0);
		c.setEnd(a, 0);
		d.setStart(b, 0);
		d.setEnd(b, 0);
		var e = c.compareBoundaryPoints(Range.START_TO_END, d);
		e === 0 && (g = !0);
		return e
	});
	i.getText = function(a) {
		var b = "",
			c;
		for (var d = 0; a[d]; d++) {
			c = a[d];
			c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += i.getText(c.childNodes))
		}
		return b
	};
	(function() {
		var a = document.createElement("div"),
			b = "script" + (new Date).getTime();
		a.innerHTML = "<a name='" + b + "'/>";
		var c = document.documentElement;
		c.insertBefore(a, c.firstChild);
		if (document.getElementById(b)) {
			j.find.ID = function(a, b, c) {
				if (typeof b.getElementById != "undefined" && !c) {
					var d = b.getElementById(a[1]);
					return d ? d.id === a[1] || typeof d.getAttributeNode != "undefined" && d.getAttributeNode("id").nodeValue === a[1] ? [d] : undefined : []
				}
			};
			j.filter.ID = function(a, b) {
				var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
				return a.nodeType === 1 && c && c.nodeValue === b
			}
		}
		c.removeChild(a);
		c = a = null
	})();
	(function() {
		var a = document.createElement("div");
		a.appendChild(document.createComment(""));
		a.getElementsByTagName("*").length > 0 && (j.find.TAG = function(a, b) {
			var c = b.getElementsByTagName(a[1]);
			if (a[1] === "*") {
				var d = [];
				for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
				c = d
			}
			return c
		});
		a.innerHTML = "<a href='#'></a>";
		a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (j.attrHandle.href = function(a) {
			return a.getAttribute("href", 2)
		});
		a = null
	})();
	document.querySelectorAll &&
	function() {
		var a = i,
			b = document.createElement("div");
		b.innerHTML = "<p class='TEST'></p>";
		if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
			i = function(b, c, d, e) {
				c = c || document;
				if (!e && c.nodeType === 9 && !i.isXML(c)) try {
					return n(c.querySelectorAll(b), d)
				} catch (f) {}
				return a(b, c, d, e)
			};
			for (var c in a) i[c] = a[c];
			b = null
		}
	}();
	(function() {
		var a = document.createElement("div");
		a.innerHTML = "<div class='test e'></div><div class='test'></div>";
		if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
			a.lastChild.className = "e";
			if (a.getElementsByClassName("e").length === 1) return;
			j.order.splice(1, 0, "CLASS");
			j.find.CLASS = function(a, b, c) {
				if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
			};
			a = null
		}
	})();
	i.contains = document.compareDocumentPosition ?
	function(a, b) {
		return !!(a.compareDocumentPosition(b) & 16)
	} : function(a, b) {
		return a !== b && (a.contains ? a.contains(b) : !0)
	};
	i.isXML = function(a) {
		var b = (a ? a.ownerDocument || a : 0).documentElement;
		return b ? b.nodeName !== "HTML" : !1
	};
	var q = function(a, b) {
			var c = [],
				d = "",
				e, f = b.nodeType ? [b] : b;
			while (e = j.match.PSEUDO.exec(a)) {
				d += e[0];
				a = a.replace(j.match.PSEUDO, "")
			}
			a = j.relative[a] ? a + "*" : a;
			for (var g = 0, h = f.length; g < h; g++) i(a, f[g], c);
			return i.filter(d, c)
		};
	return i
});
STK.register("core.dom.builder", function(a) {
	return function(b, c) {
		var d = typeof b == "string",
			e = b;
		if (d) {
			e = a.C("div");
			e.innerHTML = b
		}
		var f, g;
		f = {};
		if (c) for (j in selectorList) f[j] = a.core.dom.sizzle(c[j].toString(), e);
		else {
			g = a.core.dom.sizzle("[node-type]", e);
			for (var h = 0, i = g.length; h < i; h += 1) {
				var j = g[h].getAttribute("node-type");
				f[j] || (f[j] = []);
				f[j].push(g[h])
			}
		}
		var k = b;
		if (d) {
			k = a.C("buffer");
			while (e.childNodes[0]) k.appendChild(e.childNodes[0])
		}
		return {
			box: k,
			list: f
		}
	}
});
STK.register("core.dom.setStyle", function(a) {
	function b() {
		return "y" in b ? b.y : b.y = "filters" in a.C("div")
	}
	return function(a, c, d) {
		if (b()) switch (c) {
		case "opacity":
			a.style.filter = "alpha(opacity=" + d * 100 + ")";
			if (!a.currentStyle || !a.currentStyle.hasLayout) a.style.zoom = 1;
			break;
		case "float":
			c = "styleFloat";
		default:
			a.style[c] = d
		} else {
			c == "float" && (c = "cssFloat");
			a.style[c] = d
		}
	}
});
STK.register("core.dom.insertAfter", function(a) {
	return function(a, b) {
		var c = b.parentNode;
		c.lastChild == b ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
	}
});
STK.register("core.dom.insertBefore", function(a) {
	return function(a, b) {
		var c = b.parentNode;
		c.insertBefore(a, b)
	}
});
STK.register("core.dom.trimNode", function(a) {
	return function(a) {
		var b = a.childNodes;
		for (var c = b.length - 1; c >= 0; c -= 1) b[c] && (b[c].nodeType == 3 || b[c].nodeType == 8) && a.removeChild(b[c])
	}
});
STK.register("core.dom.removeNode", function(a) {
	return function(b) {
		b = a.E(b) || b;
		try {
			b.parentNode.removeChild(b)
		} catch (c) {}
	}
});
STK.register("core.evt.fireEvent", function(a) {
	return function(b, c) {
		var d = a.E(b);
		if (d.addEventListener) {
			var e = document.createEvent("HTMLEvents");
			e.initEvent(c, !0, !0);
			d.dispatchEvent(e)
		} else d.fireEvent("on" + c)
	}
});
STK.register("core.util.scrollPos", function(a) {
	return function(a) {
		a = a || document;
		var b = a.documentElement,
			c = a.body;
		return {
			top: Math.max(window.pageYOffset || 0, b.scrollTop, c.scrollTop),
			left: Math.max(window.pageXOffset || 0, b.scrollLeft, c.scrollLeft)
		}
	}
});
STK.register("core.dom.position", function(a) {
	var b = function(b) {
			var c, d, e, f, g, h;
			c = b.getBoundingClientRect();
			d = a.core.util.scrollPos();
			e = b.ownerDocument.body;
			f = b.ownerDocument.documentElement;
			g = f.clientTop || e.clientTop || 0;
			h = f.clientLeft || e.clientLeft || 0;
			return {
				l: parseInt(c.left + d.left - h, 10) || 0,
				t: parseInt(c.top + d.top - g, 10) || 0
			}
		},
		c = function(b, c) {
			var d, e;
			d = [b.offsetLeft, b.offsetTop];
			e = b.offsetParent;
			if (e !== b && e !== c) while (e) {
				d[0] += e.offsetLeft;
				d[1] += e.offsetTop;
				e = e.offsetParent
			}
			if (a.core.util.browser.OPERA != -1 || a.core.util.browser.SAFARI != -1 && b.style.position == "absolute") {
				d[0] -= document.body.offsetLeft;
				d[1] -= document.body.offsetTop
			}
			b.parentNode ? e = b.parentNode : e = null;
			while (e && !/^body|html$/i.test(e.tagName) && e !== c) {
				if (e.style.display.search(/^inline|table-row.*$/i)) {
					d[0] -= e.scrollLeft;
					d[1] -= e.scrollTop
				}
				e = e.parentNode
			}
			return {
				l: parseInt(d[0], 10),
				t: parseInt(d[1], 10)
			}
		};
	return function(d, e) {
		if (d == document.body) return !1;
		if (d.parentNode == null) return !1;
		if (d.style.display == "none") return !1;
		var f = a.core.obj.parseParam({
			parent: null
		}, e);
		if (d.getBoundingClientRect) {
			if (f.parent) {
				var g = b(d),
					h = b(f.parent);
				return {
					l: g.l - h.l,
					t: g.t - h.t
				}
			}
			return b(d)
		}
		return c(d, f.parent || document.body)
	}
});
STK.register("core.dom.setXY", function(a) {
	return function(b, c) {
		var d = a.core.dom.getStyle(b, "position");
		if (d == "static") {
			a.core.dom.setStyle(b, "position", "relative");
			d = "relative"
		}
		var e = a.core.dom.position(b);
		if (e != !1) {
			var f = {
				l: parseInt(a.core.dom.getStyle(b, "left"), 10),
				t: parseInt(a.core.dom.getStyle(b, "top"), 10)
			};
			isNaN(f.l) && (f.l = d == "relative" ? 0 : b.offsetLeft);
			isNaN(f.t) && (f.t = d == "relative" ? 0 : b.offsetTop);
			c.l != null && (b.style.left = c.l - e.l + f.l + "px");
			c.t != null && (b.style.top = c.t - e.t + f.t + "px")
		}
	}
});
STK.register("core.str.encodeHTML", function(a) {
	return function(a) {
		if (typeof a != "string") throw "encodeHTML need a string as parameter";
		return a.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, "&#32;")
	}
});
STK.register("core.str.decodeHTML", function(a) {
	return function(a) {
		if (typeof a != "string") throw "decodeHTML need a string as parameter";
		return a.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/&#32;/g, " ").replace(/&amp;/g, "&")
	}
});
STK.register("core.dom.cascadeNode", function(a) {
	return function(b) {
		var c = {},
			d = b.style.display || "";
		d = d === "none" ? "" : d;
		var e = [];
		c.setStyle = function(e, f) {
			a.core.dom.setStyle(b, e, f);
			e === "display" && (d = f === "none" ? "" : f);
			return c
		};
		c.insertAfter = function(d) {
			a.core.dom.insertAfter(d, b);
			return c
		};
		c.insertBefore = function(d) {
			a.core.dom.insertBefore(d, b);
			return c
		};
		c.addClassName = function(d) {
			a.core.dom.addClassName(b, d);
			return c
		};
		c.removeClassName = function(d) {
			a.core.dom.removeClassName(b, d);
			return c
		};
		c.trimNode = function() {
			a.core.dom.trimNode(b);
			return c
		};
		c.removeNode = function() {
			a.core.dom.removeNode(b);
			return c
		};
		c.on = function(d, f) {
			for (var g = 0, h = e.length; g < h; g += 1) if (e[g].fn === f && e[g].type === d) return c;
			e.push({
				fn: f,
				type: d
			});
			a.core.evt.addEvent(b, d, f);
			return c
		};
		c.unon = function(d, f) {
			for (var g = 0, h = e.length; g < h; g += 1) if (e[g].fn === f && e[g].type === d) {
				a.core.evt.removeEvent(b, f, d);
				e.splice(g, 1);
				break
			}
			return c
		};
		c.fire = function(d) {
			a.core.evt.fireEvent(d, b);
			return c
		};
		c.appendChild = function(a) {
			b.appendChild(a);
			return c
		};
		c.removeChild = function(a) {
			b.removeChild(a);
			return c
		};
		c.toggle = function() {
			b.style.display === "none" ? b.style.display = d : b.style.display = "none";
			return c
		};
		c.show = function() {
			b.style.display === "none" && (d === "none" ? b.style.display = "" : b.style.display = d);
			return c
		};
		c.hidd = function() {
			b.style.display !== "none" && (b.style.display = "none");
			return c
		};
		c.hide = c.hidd;
		c.scrollTo = function(a, d) {
			a === "left" && (b.scrollLeft = d);
			a === "top" && (b.scrollTop = d);
			return c
		};
		c.replaceChild = function(a, d) {
			b.replaceChild(a, d);
			return c
		};
		c.position = function(c) {
			c !== undefined && a.core.dom.setXY(b, c);
			return a.core.dom.position(b)
		};
		c.setPosition = function(d) {
			d !== undefined && a.core.dom.setXY(b, d);
			return c
		};
		c.getPosition = function(c) {
			return a.core.dom.position(b)
		};
		c.html = function(a) {
			a !== undefined && (b.innerHTML = a);
			return b.innerHTML
		};
		c.setHTML = function(a) {
			a !== undefined && (b.innerHTML = a);
			return c
		};
		c.getHTML = function() {
			return b.innerHTML
		};
		c.text = function(c) {
			c !== undefined && (b.innerHTML = a.core.str.encodeHTML(c));
			return a.core.str.decodeHTML(b.innerHTML)
		};
		c.ttext = c.text;
		c.setText = function(d) {
			d !== undefined && (b.innerHTML = a.core.str.encodeHTML(d));
			return c
		};
		c.getText = function() {
			return a.core.str.decodeHTML(b.innerHTML)
		};
		c.get = function(c) {
			return c === "node" ? b : a.core.dom.getStyle(b, c)
		};
		c.getStyle = function(c) {
			return a.core.dom.getStyle(b, c)
		};
		c.getOriginNode = function() {
			return b
		};
		c.destroy = function() {
			for (var c = 0, f = e; c < f; c += 1) a.core.evt.removeEvent(b, e[c].fn, e[c].type);
			d = null;
			e = null;
			b = null
		};
		return c
	}
});
STK.register("core.dom.contains", function(a) {
	return function(a, b) {
		if (a === b) return !1;
		if (a.compareDocumentPosition) return (a.compareDocumentPosition(b) & 16) === 16;
		if (a.contains && b.nodeType === 1) return a.contains(b);
		while (b = b.parentNode) if (a === b) return !0;
		return !1
	}
});
STK.register("core.dom.dir", function(a) {
	var b = {
		parent: "parentNode",
		next: "nextSibling",
		prev: "previousSibling"
	},
		c = function(c, d) {
			d = a.core.obj.parseParam({
				dir: "parent",
				expr: undefined,
				endpoint: document,
				matchAll: !1
			}, d);
			var e = b[d.dir],
				f = d.expr,
				g = d.endpoint,
				h = !! d.matchAll;
			if (!c) throw "core.dom.dir: el is undefined.";
			if (!e) throw "core.dom.dir: spec.dir is undefined.";
			var i = [],
				j = c[e];
			while (j) {
				if (j.nodeType == 1) if (!f || a.core.dom.sizzle.matches(f, [j]).length > 0) {
					i.push(j);
					if (!h) break
				}
				if (j == g) break;
				j = j[e]
			}
			return i
		};
	c.parent = function(a, b) {
		b = b || {};
		b.dir = "parent";
		return c(a, b)
	};
	c.prev = function(a, b) {
		b = b || {};
		b.dir = "prev";
		return c(a, b)
	};
	c.next = function(a, b) {
		b = b || {};
		b.dir = "next";
		return c(a, b)
	};
	return c
});
STK.register("core.dom.firstChild", function(a) {
	var b = a.core.dom.dir;
	return function(a) {
		if (a.firstElementChild) return a.firstElementChild;
		var c = a.firstChild;
		c && c.nodeType != 1 && (c = b.next(c)[0]);
		return c
	}
});
STK.register("core.util.hideContainer", function(a) {
	var b, c = function() {
			if (!b) {
				b = a.C("div");
				b.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
				document.getElementsByTagName("head")[0].appendChild(b)
			}
		},
		d = {
			appendChild: function(d) {
				if (a.core.dom.isNode(d)) {
					c();
					b.appendChild(d)
				}
			},
			removeChild: function(c) {
				a.core.dom.isNode(c) && b && b.removeChild(c)
			}
		};
	return d
});
STK.register("core.dom.getSize", function(a) {
	var b = function(b) {
			if (!a.core.dom.isNode(b)) throw "core.dom.getSize need Element as first parameter";
			return {
				width: b.offsetWidth,
				height: b.offsetHeight
			}
		},
		c = function(a) {
			var c = null;
			if (a.style.display === "none") {
				a.style.visibility = "hidden";
				a.style.display = "";
				c = b(a);
				a.style.display = "none";
				a.style.visibility = "visible"
			} else c = b(a);
			return c
		};
	return function(b) {
		var d = {};
		if (!b.parentNode) {
			a.core.util.hideContainer.appendChild(b);
			d = c(b);
			a.core.util.hideContainer.removeChild(b)
		} else d = c(b);
		return d
	}
});
STK.register("core.dom.insertHTML", function(a) {
	return function(b, c, d) {
		b = a.E(b) || document.body;
		d = d ? d.toLowerCase() : "beforeend";
		if (b.insertAdjacentHTML) {
			switch (d) {
			case "beforebegin":
				b.insertAdjacentHTML("BeforeBegin", c);
				return b.previousSibling;
			case "afterbegin":
				b.insertAdjacentHTML("AfterBegin", c);
				return b.firstChild;
			case "beforeend":
				b.insertAdjacentHTML("BeforeEnd", c);
				return b.lastChild;
			case "afterend":
				b.insertAdjacentHTML("AfterEnd", c);
				return b.nextSibling
			}
			throw 'Illegal insertion point -> "' + d + '"'
		}
		var e = b.ownerDocument.createRange(),
			f;
		switch (d) {
		case "beforebegin":
			e.setStartBefore(b);
			f = e.createContextualFragment(c);
			b.parentNode.insertBefore(f, b);
			return b.previousSibling;
		case "afterbegin":
			if (b.firstChild) {
				e.setStartBefore(b.firstChild);
				f = e.createContextualFragment(c);
				b.insertBefore(f, b.firstChild);
				return b.firstChild
			}
			b.innerHTML = c;
			return b.firstChild;
		case "beforeend":
			if (b.lastChild) {
				e.setStartAfter(b.lastChild);
				f = e.createContextualFragment(c);
				b.appendChild(f);
				return b.lastChild
			}
			b.innerHTML = c;
			return b.lastChild;
		case "afterend":
			e.setStartAfter(b);
			f = e.createContextualFragment(c);
			b.parentNode.insertBefore(f, b.nextSibling);
			return b.nextSibling
		}
		throw 'Illegal insertion point -> "' + d + '"'
	}
});
STK.register("core.dom.insertElement", function(a) {
	return function(b, c, d) {
		b = a.E(b) || document.body;
		d = d ? d.toLowerCase() : "beforeend";
		switch (d) {
		case "beforebegin":
			b.parentNode.insertBefore(c, b);
			break;
		case "afterbegin":
			b.insertBefore(c, b.firstChild);
			break;
		case "beforeend":
			b.appendChild(c);
			break;
		case "afterend":
			b.nextSibling ? b.parentNode.insertBefore(c, b.nextSibling) : b.parentNode.appendChild(c)
		}
	}
});
STK.register("core.dom.ready", function(a) {
	var b = [],
		c = !1,
		d = a.core.func.getType,
		e = a.core.util.browser,
		f = a.core.evt.addEvent,
		g = function() {
			return !c && document.readyState === "complete" ? !0 : c
		},
		h = function() {
			if (c != !0) {
				c = !0;
				for (var a = 0, e = b.length; a < e; a++) if (d(b[a]) === "function") try {
					b[a].call()
				} catch (f) {}
				b = []
			}
		},
		i = function() {
			if (g()) h();
			else {
				try {
					document.documentElement.doScroll("left")
				} catch (a) {
					setTimeout(arguments.callee, 25);
					return
				}
				h()
			}
		},
		j = function() {
			g() ? h() : setTimeout(arguments.callee, 25)
		},
		k = function() {
			f(document, "DOMContentLoaded", h)
		},
		l = function() {
			f(window, "load", h)
		};
	if (!g()) {
		a.IE && window === window.top && i();
		k();
		j();
		l()
	}
	return function(a) {
		g() ? d(a) === "function" && a.call() : b.push(a)
	}
});
STK.register("core.dom.isDomReady", function(a) {
	var b = !1;
	a.core.dom.ready(function() {
		b = !0
	});
	return function() {
		return b
	}
});
STK.register("core.dom.lastChild", function(a) {
	var b = a.core.dom.dir;
	return function(a) {
		if (a.lastElementChild) return a.lastElementChild;
		var c = a.lastChild;
		c && c.nodeType != 1 && (c = b.prev(c)[0]);
		return c
	}
});
STK.register("core.dom.neighbor", function(a) {
	function b(b, c) {
		a.log("warning", b, c)
	}
	var c = function(b, c, d) {
			return b && a.core.dom.dir(b, {
				dir: c,
				expr: d
			})[0]
		},
		d = function(d) {
			var e = d,
				f = {
					getCurrent: function() {
						return e
					},
					setCurrent: function(a) {
						a && (e = a);
						return f
					},
					finish: function() {
						var a = e;
						e = null;
						return a
					},
					parent: function(a) {
						var d = c(e, "parent", a);
						d ? e = d : b("parent", a);
						return f
					},
					child: function(c) {
						var d = c ? a.core.dom.sizzle(c, e)[0] : a.core.dom.firstChild(e);
						d ? e = d : b("child", c);
						return f
					},
					firstChild: function() {
						var c = a.core.dom.firstChild(e);
						c ? e = c : b("firstChild");
						return f
					},
					lastChild: function() {
						var c = a.core.dom.lastChild(e);
						c ? e = c : b("lastChild");
						return f
					},
					prev: function(a) {
						var d = c(e, "prev", a);
						d ? e = d : b("prev", a);
						return f
					},
					next: function(a) {
						var d = c(e, "next", a);
						d ? e = d : b("next", a);
						return f
					},
					destroy: function() {
						e = null
					}
				};
			return f
		};
	return d
});
STK.register("core.dom.next", function(a) {
	return function(a) {
		var b = a.nextSibling;
		while (b && b.nodeType !== 1) b = b.nextSibling;
		return b
	}
});
STK.register("core.dom.prev", function(a) {
	return function(a) {
		var b = a.previousSibling;
		while (b && b.nodeType !== 1) b = b.previousSibling;
		return b
	}
});
STK.register("core.dom.replaceNode", function(a) {
	return function(a, b) {
		if (a == null || b == null) throw "replaceNode need node as paramster";
		b.parentNode.replaceChild(a, b)
	}
});
STK.register("core.dom.selector", function(a) {
	var b = function(b, c, d, e) {
			var f = [];
			if (typeof b == "string") {
				var g = a.core.dom.sizzle(b, c, d, e);
				for (var h = 0, i = g.length; h < i; h += 1) f[h] = g[h]
			} else if (a.core.dom.isNode(b)) c ? a.core.dom.contains(c, b) && (f = [b]) : f = [b];
			else if (a.core.arr.isArray(b)) if (c) for (var h = 0, i = b.length; h < i; h += 1) a.core.dom.contains(c, b[h]) && f.push(b[h]);
			else f = b;
			return f
		};
	return function(c, d, e, f) {
		var g = b.apply(window, arguments);
		g.on = function(b, c) {
			for (var d = 0, e = g.length; d < e; d += 1) a.core.evt.addEvent(g[d], b, c);
			return g
		};
		g.css = function(b, c) {
			for (var d = 0, e = g.length; d < e; d += 1) a.core.dom.setStyle(g[d], b, c);
			return g
		};
		g.show = function() {
			for (var a = 0, b = g.length; a < b; a += 1) g[a].style.display = "";
			return g
		};
		g.hidd = function() {
			for (var a = 0, b = g.length; a < b; a += 1) g[a].style.display = "none";
			return g
		};
		g.hide = g.hidd;
		return g
	}
});
STK.register("core.dom.selectText", function(a) {
	return function(a, b) {
		var c = b.start,
			d = b.len || 0;
		a.focus();
		if (a.setSelectionRange) a.setSelectionRange(c, c + d);
		else if (a.createTextRange) {
			var e = a.createTextRange();
			e.collapse(1);
			e.moveStart("character", c);
			e.moveEnd("character", d);
			e.select()
		}
	}
});
STK.register("core.dom.setStyles", function(a) {
	return function(b, c, d) {
		if (!a.core.arr.isArray(b)) var b = [b];
		for (var e = 0, f = b.length; e < f; e++) a.core.dom.setStyle(b[e], c, d);
		return b
	}
});
STK.register("core.dom.textSelectArea", function(a) {
	return function(a) {
		var b = {
			start: 0,
			len: 0
		};
		if (typeof a.selectionStart == "number") {
			b.start = a.selectionStart;
			b.len = a.selectionEnd - a.selectionStart
		} else if (typeof document.selection != "undefined") {
			var c = document.selection.createRange();
			if (a.tagName === "INPUT") var d = a.createTextRange();
			else if (a.tagName === "TEXTAREA") {
				var d = c.duplicate();
				d.moveToElementText(a)
			}
			d.setEndPoint("EndToStart", c);
			b.start = d.text.length;
			b.len = c.text.length;
			var e = 0;
			d.moveEnd("character", a.value.length - b.start);
			d.moveStart("character", b.start);
			for (var f = b.start; f < a.value.length; f += 1) {
				if (!(d.compareEndPoints("StartToStart", c) < 0)) break;
				d.moveStart("character", 1);
				e += 2
			}
			b.start += e;
			c = null;
			d = null
		}
		return b
	}
});
STK.register("core.dom.toggleClassName", function(a) {
	return function(b, c) {
		a.core.dom.hasClassName(b, c) ? a.core.dom.removeClassName(b, c) : a.core.dom.addClassName(b, c)
	}
});
STK.register("core.util.getUniqueKey", function(a) {
	var b = (new Date).getTime().toString(),
		c = 1;
	return function() {
		return b + c++
	}
});
STK.register("core.dom.uniqueID", function(a) {
	return function(b) {
		return b && (b.uniqueID || (b.uniqueID = a.core.util.getUniqueKey()))
	}
});
STK.register("core.evt.custEvent", function(a) {
	var b = "__custEventKey__",
		c = 1,
		d = {},
		e = function(a, c) {
			var e = typeof a == "number" ? a : a[b];
			return e && d[e] && {
				obj: typeof c == "string" ? d[e][c] : d[e],
				key: e
			}
		},
		f = {},
		g = function(a, b, c, d, f) {
			if (a && typeof b == "string" && c) {
				var g = e(a, b);
				if (!g || !g.obj) throw "custEvent (" + b + ") is undefined !";
				g.obj.push({
					fn: c,
					data: d,
					once: f
				});
				return g.key
			}
		},
		h = function(b, c, d, f) {
			var g = !0,
				h = function() {
					g = !1
				};
			if (b && typeof c == "string") {
				var i = e(b, c),
					j;
				if (i && (j = i.obj)) {
					d = typeof d != "undefined" && [].concat(d) || [];
					for (var k = j.length - 1; k > -1 && j[k]; k--) {
						var l = j[k].fn,
							m = j[k].once;
						if (l && l.apply) try {
							l.apply(b, [{
								obj: b,
								type: c,
								data: j[k].data,
								preventDefault: h
							}].concat(d));
							m && j.splice(k, 1)
						} catch (n) {
							a.log("[error][custEvent]" + n.message, n, n.stack)
						}
					}
					g && a.core.func.getType(f) === "function" && f();
					return i.key
				}
			}
		},
		i = {
			define: function(a, e) {
				if (a && e) {
					var f = typeof a == "number" ? a : a[b] || (a[b] = c++),
						g = d[f] || (d[f] = {});
					e = [].concat(e);
					for (var h = 0; h < e.length; h++) g[e[h]] || (g[e[h]] = []);
					return f
				}
			},
			undefine: function(a, c) {
				if (a) {
					var e = typeof a == "number" ? a : a[b];
					if (e && d[e]) if (c) {
						c = [].concat(c);
						for (var f = 0; f < c.length; f++) c[f] in d[e] && delete d[e][c[f]]
					} else delete d[e]
				}
			},
			add: function(a, b, c, d) {
				return g(a, b, c, d, !1)
			},
			once: function(a, b, c, d) {
				return g(a, b, c, d, !0)
			},
			remove: function(b, c, d) {
				if (b) {
					var f = e(b, c),
						g, h;
					if (f && (g = f.obj)) {
						if (a.core.arr.isArray(g)) if (d) {
							var i = 0;
							while (g[i]) {
								if (g[i].fn === d) break;
								i++
							}
							g.splice(i, 1)
						} else g.splice(0, g.length);
						else for (var i in g) g[i] = [];
						return f.key
					}
				}
			},
			fire: function(a, b, c, d) {
				return h(a, b, c, d)
			},
			hook: function(a, e, g) {
				if (!(!a || !e || !g)) {
					var j = [],
						k = a[b],
						l = k && d[k],
						m, n = e[b] || (e[b] = c++),
						o;
					if (l) {
						o = f[k + "_" + n] || (f[k + "_" + n] = {});
						var p = function(a) {
								var b = !0;
								h(e, o[a.type].type, Array.prototype.slice.apply(arguments, [1, arguments.length]), function() {
									b = !1
								});
								b && a.preventDefault()
							};
						for (var q in g) {
							var r = g[q];
							if (!o[q]) if (m = l[q]) {
								m.push({
									fn: p,
									data: undefined
								});
								o[q] = {
									fn: p,
									type: r
								};
								j.push(r)
							}
						}
						i.define(e, j)
					}
				}
			},
			unhook: function(a, c, d) {
				if (!(!a || !c || !d)) {
					var e = a[b],
						g = c[b],
						h = f[e + "_" + g];
					if (h) for (var j in d) {
						var k = d[j];
						h[j] && i.remove(a, j, h[j].fn)
					}
				}
			},
			destroy: function() {
				d = {};
				c = 1;
				f = {}
			}
		};
	return i
});
STK.register("core.json.queryToJson", function(a) {
	return function(b, c) {
		var d = a.core.str.trim(b).split("&"),
			e = {},
			f = function(a) {
				return c ? decodeURIComponent(a) : a
			};
		for (var g = 0, h = d.length; g < h; g++) if (d[g]) {
			var i = d[g].split("="),
				j = i[0],
				k = i[1];
			if (i.length < 2) {
				k = j;
				j = "$nullName"
			}
			if (!e[j]) e[j] = f(k);
			else {
				a.core.arr.isArray(e[j]) != !0 && (e[j] = [e[j]]);
				e[j].push(f(k))
			}
		}
		return e
	}
});
STK.register("core.evt.getEvent", function(a) {
	return function() {
		return document.addEventListener ?
		function() {
			var a = arguments.callee,
				b;
			do {
				b = a.arguments[0];
				if (b && (b.constructor == Event || b.constructor == MouseEvent || b.constructor == KeyboardEvent)) return b
			} while (a = a.caller);
			return b
		} : function(a, b, c) {
			return window.event
		}
	}()
});
STK.register("core.evt.fixEvent", function(a) {
	var b = "clientX clientY pageX pageY screenX screenY".split(" ");
	return function(b) {
		b = b || a.core.evt.getEvent();
		b.target || (b.target = b.srcElement || document);
		if (b.pageX == null && b.clientX != null) {
			var c = document.documentElement,
				d = document.body;
			b.pageX = b.clientX + (c.scrollLeft || d && d.scrollLeft || 0) - (c.clientLeft || d && d.clientLeft || 0);
			b.pageY = b.clientY + (c.scrollTop || d && d.scrollTop || 0) - (c.clientTop || d && d.clientTop || 0)
		}!b.which && b.button && (b.button & 1 ? b.which = 1 : b.button & 4 ? b.which = 2 : b.button & 2 && (b.which = 3));
		b.relatedTarget === undefined && (b.relatedTarget = b.fromElement || b.toElement);
		if (b.layerX == null && b.offsetX != null) {
			b.layerX = b.offsetX;
			b.layerY = b.offsetY
		}
		return b
	}
});
STK.register("core.obj.isEmpty", function(a) {
	return function(a, b) {
		for (var c in a) if (b || a.hasOwnProperty(c)) return !1;
		return !0
	}
});
STK.register("core.evt.delegatedEvent", function(a) {
	var b = function(b, c) {
			for (var d = 0, e = b.length; d < e; d += 1) if (a.core.dom.contains(b[d], c)) return !0;
			return !1
		};
	return function(c, d) {
		if (!a.core.dom.isNode(c)) throw "core.evt.delegatedEvent need an Element as first Parameter";
		d || (d = []);
		a.core.arr.isArray(d) && (d = [d]);
		var e = {},
			f = function(b) {
				var c = a.core.evt.fixEvent(b),
					d = c.target,
					e = b.type;
				g(d, e, c)
			},
			g = function(f, g, h) {
				var i = null,
					j = function() {
						var b, d, e;
						b = f.getAttribute("action-target");
						if (b) {
							d = a.core.dom.sizzle(b, c);
							d.length && (e = h.target = d[0])
						}
						j = a.core.func.empty;
						return e
					},
					k = function() {
						var b = j() || f;
						return e[g] && e[g][i] ? e[g][i]({
							evt: h,
							el: b,
							box: c,
							data: a.core.json.queryToJson(b.getAttribute("action-data") || "")
						}) : !0
					};
				if (b(d, f)) return !1;
				if (!a.core.dom.contains(c, f)) return !1;
				while (f && f !== c) {
					if (f.nodeType === 1) {
						i = f.getAttribute("action-type");
						if (i && k() === !1) break
					}
					f = f.parentNode
				}
			},
			h = {};
		h.add = function(b, d, g) {
			if (!e[d]) {
				e[d] = {};
				a.core.evt.addEvent(c, d, f)
			}
			var h = e[d];
			h[b] = g
		};
		h.remove = function(b, d) {
			if (e[d]) {
				delete e[d][b];
				if (a.core.obj.isEmpty(e[d])) {
					delete e[d];
					a.core.evt.removeEvent(c, d, f)
				}
			}
		};
		h.pushExcept = function(a) {
			d.push(a)
		};
		h.removeExcept = function(a) {
			if (!a) d = [];
			else for (var b = 0, c = d.length; b < c; b += 1) d[b] === a && d.splice(b, 1)
		};
		h.clearExcept = function(a) {
			d = []
		};
		h.fireAction = function(b, d, f, g) {
			var h = "";
			g && g.actionData && (h = g.actionData);
			e[d] && e[d][b] && e[d][b]({
				evt: f,
				el: null,
				box: c,
				data: a.core.json.queryToJson(h),
				fireFrom: "fireAction"
			})
		};
		h.fireInject = function(b, d, f) {
			var g = b.getAttribute("action-type"),
				h = b.getAttribute("action-data");
			g && e[d] && e[d][g] && e[d][g]({
				evt: f,
				el: b,
				box: c,
				data: a.core.json.queryToJson(h || ""),
				fireFrom: "fireInject"
			})
		};
		h.fireDom = function(a, b, c) {
			g(a, b, c || {})
		};
		h.destroy = function() {
			for (var b in e) {
				for (var d in e[b]) delete e[b][d];
				delete e[b];
				a.core.evt.removeEvent(c, b, f)
			}
		};
		return h
	}
});
STK.register("core.evt.getActiveElement", function(a) {
	return function() {
		try {
			var b = a.core.evt.getEvent();
			return document.activeElement ? document.activeElement : b.explicitOriginalTarget
		} catch (c) {
			return document.body
		}
	}
});
STK.register("core.evt.hasEvent", function(a) {
	var b = {};
	return function(c, d) {
		if (typeof d != "string") throw new Error("[STK.core.evt.hasEvent] tagName is not a String!");
		d = d.toLowerCase();
		c = "on" + c;
		if (b[d] && b[d][c] !== undefined) return b[d][c];
		var e = a.C(d),
			f = c in e;
		if (!f) {
			e.setAttribute(c, "return;");
			f = typeof e[c] == "function"
		}
		b[d] || (b[d] = {});
		b[d][c] = f;
		e = null;
		return f
	}
});
STK.register("core.evt.hitTest", function(a) {
	function b(b) {
		var c = STK.E(b),
			d = a.core.dom.position(c),
			e = {
				left: d.l,
				top: d.t,
				right: d.l + c.offsetWidth,
				bottom: d.t + c.offsetHeight
			};
		return e
	}
	return function(c, d) {
		var e = b(c);
		if (d == null) d = a.core.evt.getEvent();
		else {
			if (d.nodeType == 1) {
				var f = b(d);
				return e.right > f.left && e.left < f.right && e.bottom > f.top && e.top < f.bottom ? !0 : !1
			}
			if (d.clientX == null) throw "core.evt.hitTest: [" + d + ":oEvent] is not a valid value"
		}
		var g = a.core.util.scrollPos(),
			h = d.clientX + g.left,
			i = d.clientY + g.top;
		return h >= e.left && h <= e.right && i >= e.top && i <= e.bottom
	}
});
STK.register("core.evt.stopEvent", function(a) {
	return function(b) {
		b = b || a.core.evt.getEvent();
		if (b.preventDefault) {
			b.preventDefault();
			b.stopPropagation()
		} else {
			b.cancelBubble = !0;
			b.returnValue = !1
		}
		return !1
	}
});
STK.register("core.evt.preventDefault", function(a) {
	return function(b) {
		b = b || a.core.evt.getEvent();
		b.preventDefault ? b.preventDefault() : b.returnValue = !1
	}
});
STK.register("core.evt.hotKey", function(a) {
	var b = a.core.dom.uniqueID,
		c = {
			reg1: /^keypress|keydown|keyup$/,
			keyMap: {
				27: "esc",
				9: "tab",
				32: "space",
				10: "enter",
				13: "enter",
				8: "backspace",
				145: "scrollclock",
				20: "capslock",
				144: "numlock",
				19: "pause",
				45: "insert",
				36: "home",
				46: "delete",
				35: "end",
				33: "pageup",
				34: "pagedown",
				37: "left",
				38: "up",
				39: "right",
				40: "down",
				112: "f1",
				113: "f2",
				114: "f3",
				115: "f4",
				116: "f5",
				117: "f6",
				118: "f7",
				119: "f8",
				120: "f9",
				121: "f10",
				122: "f11",
				123: "f12",
				191: "/",
				17: "ctrl",
				16: "shift",
				109: "-",
				107: "=",
				219: "[",
				221: "]",
				220: "\\",
				222: "'",
				187: "=",
				188: ",",
				189: "-",
				190: ".",
				191: "/",
				96: "0",
				97: "1",
				98: "2",
				99: "3",
				100: "4",
				101: "5",
				102: "6",
				103: "7",
				104: "8",
				105: "9",
				106: "*",
				110: ".",
				111: "/"
			},
			keyEvents: {}
		};
	c.preventDefault = function() {
		this.returnValue = !1
	};
	c.handler = function(a) {
		a = a || window.event;
		a.target || (a.target = a.srcElement || document);
		!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode) && (a.which = a.charCode || a.keyCode);
		a.preventDefault || (a.preventDefault = c.preventDefault);
		var d = b(this),
			e, f;
		if (d && (e = c.keyEvents[d]) && (f = e[a.type])) {
			var g;
			switch (a.type) {
			case "keypress":
				if (a.ctrlKey || a.altKey) return;
				a.which == 13 && (g = c.keyMap[13]);
				a.which == 32 && (g = c.keyMap[32]);
				a.which >= 33 && a.which <= 126 && (g = String.fromCharCode(a.which));
				break;
			case "keyup":
			case "keydown":
				c.keyMap[a.which] && (g = c.keyMap[a.which]);
				g || (a.which >= 48 && a.which <= 57 ? g = String.fromCharCode(a.which) : a.which >= 65 && a.which <= 90 && (g = String.fromCharCode(a.which + 32)));
				if (g && a.type == "keydown") {
					e.linkedKey += e.linkedKey ? ">" + g : g;
					a.altKey && (g = "alt+" + g);
					a.shiftKey && (g = "shift+" + g);
					a.ctrlKey && (g = "ctrl+" + g)
				}
			}
			var h = /^select|textarea|input$/.test(a.target.nodeName.toLowerCase());
			if (g) {
				var i = [],
					j = !1;
				if (e.linkedKey && e.linkKeyStr) if (e.linkKeyStr.indexOf(" " + e.linkedKey) != -1) {
					if (e.linkKeyStr.indexOf(" " + e.linkedKey + " ") != -1) {
						i = i.concat(f[e.linkedKey]);
						e.linkedKey = ""
					}
					j = !0
				} else e.linkedKey = "";
				j || (i = i.concat(f[g]));
				for (var k = 0; k < i.length; k++) i[k] && (!i[k].disableInInput || !h) && i[k].fn.apply(this, [a, i[k].key])
			}
		}
	};
	var d = function(b, d, e, f) {
			var g = {};
			if (!a.core.dom.isNode(b) || a.core.func.getType(e) !== "function") return g;
			if (typeof d != "string" || !(d = d.replace(/\s*/g, ""))) return g;
			f || (f = {});
			f.disableInInput || (f.disableInInput = !1);
			f.type || (f.type = "keypress");
			f.type = f.type.replace(/\s*/g, "");
			if (!c.reg1.test(f.type) || f.disableInInput && /^select|textarea|input$/.test(b.nodeName.toLowerCase())) return g;
			if (d.length > 1 || f.type != "keypress") d = d.toLowerCase();
			if (!/(^(\+|>)$)|(^([^\+>]+)$)/.test(d)) {
				var h = "";
				if (/((ctrl)|(shift)|(alt))\+(\+|([^\+]+))$/.test(d)) {
					d.indexOf("ctrl+") != -1 && (h += "ctr+");
					d.indexOf("shift+") != -1 && (h += "shift+");
					d.indexOf("alt+") != -1 && (h += "alt+");
					h += d.match(/\+(([^\+]+)|(\+))$/)[1]
				} else if (!/(^>)|(>$)|>>/.test(d) && d.length > 2) g.linkFlag = !0;
				else return g;
				f.type = "keydown"
			}
			g.keys = d;
			g.fn = e;
			g.opt = f;
			return g
		},
		e = {
			add: function(f, g, h, i) {
				if (a.core.arr.isArray(g)) for (var j = 0; j < g.length; j++) e.add(f, g[j], h, i);
				else {
					var k = d(f, g, h, i);
					if (!k.keys) return;
					g = k.keys;
					h = k.fn;
					i = k.opt;
					var l = k.linkFlag,
						m = b(f);
					c.keyEvents[m] || (c.keyEvents[m] = {
						linkKeyStr: "",
						linkedKey: ""
					});
					c.keyEvents[m].handler || (c.keyEvents[m].handler = function() {
						c.handler.apply(f, arguments)
					});
					l && c.keyEvents[m].linkKeyStr.indexOf(" " + g + " ") == -1 && (c.keyEvents[m].linkKeyStr += " " + g + " ");
					var n = i.type;
					if (!c.keyEvents[m][n]) {
						c.keyEvents[m][n] = {};
						a.core.evt.addEvent(f, n, c.keyEvents[m].handler)
					}
					c.keyEvents[m][n][g] || (c.keyEvents[m][n][g] = []);
					c.keyEvents[m][n][g].push({
						fn: h,
						disableInInput: i.disableInInput,
						key: g
					})
				}
			},
			remove: function(f, g, h, i) {
				if (a.core.arr.isArray(g)) for (var j = 0; j < g.length; j++) e.remove(f, g[j], h, i);
				else {
					var k = d(f, g, h, i);
					if (!k.keys) return;
					g = k.keys;
					h = k.fn;
					i = k.opt;
					var l = k.linkFlag,
						m = b(f),
						n, o, p, q = i.type;
					if (m && (n = c.keyEvents[m]) && (o = n[q]) && n.handler && (p = o[g])) {
						for (var j = 0; j < p.length;) p[j].fn === h ? p.splice(j, 1) : j++;
						p.length < 1 && delete o[g];
						var r = !1;
						for (var s in o) {
							r = !0;
							break
						}
						if (!r) {
							a.core.evt.removeEvent(f, q, n.handler);
							delete n[q]
						}
						l && n.linkKeyStr && (n.linkKeyStr = n.linkKeyStr.replace(" " + g + " ", ""))
					}
				}
			}
		};
	return e
});
STK.register("core.func.bind", function(a) {
	return function(b, c, d) {
		d = a.core.arr.isArray(d) ? d : [d];
		return function() {
			return c.apply(b, d)
		}
	}
});
STK.register("core.func.memorize", function(a) {
	return function(a, b) {
		if (typeof a != "function") throw "core.func.memorize need a function as first parameter";
		b = b || {};
		var c = {};
		b.timeout && setInterval(function() {
			c = {}
		}, b.timeout);
		return function() {
			var d = Array.prototype.join.call(arguments, "_");
			d in c || (c[d] = a.apply(b.context || {}, arguments));
			return c[d]
		}
	}
});
STK.register("core.func.methodBefore", function(a) {
	return function() {
		var b = !1,
			c = [],
			d = {};
		d.add = function(d, e) {
			var f = a.core.obj.parseParam({
				args: [],
				pointer: window,
				top: !1
			}, e);
			f.top == !0 ? c.unshift([d, f.args, f.pointer]) : c.push([d, f.args, f.pointer]);
			return !b
		};
		d.start = function() {
			var a, d, e, f, g;
			if (b != !0) {
				b = !0;
				for (a = 0, d = c.length; a < d; a++) {
					e = c[a][0];
					f = c[a][1];
					g = c[a][2];
					e.apply(g, f)
				}
			}
		};
		d.reset = function() {
			c = [];
			b = !1
		};
		d.getList = function() {
			return c
		};
		return d
	}
});
STK.register("core.func.timedChunk", function(a) {
	var b = {
		process: function(a) {
			typeof a == "function" && a()
		},
		context: {},
		callback: null,
		delay: 25,
		execTime: 50
	};
	return function(c, d) {
		if (!a.core.arr.isArray(c)) throw "core.func.timedChunk need an array as first parameter";
		var e = c.concat(),
			f = a.core.obj.parseParam(b, d),
			g = null,
			h = function() {
				var a = +(new Date);
				do f.process.call(f.context, e.shift());
				while (e.length > 0 && +(new Date) - a < f.execTime);
				e.length <= 0 ? f.callback && f.callback(c) : setTimeout(arguments.callee, f.delay)
			};
		g = setTimeout(h, f.delay)
	}
});
STK.register("core.io.getXHR", function(a) {
	return function() {
		var a = !1;
		try {
			a = new XMLHttpRequest
		} catch (b) {
			try {
				a = new ActiveXObject("Msxml2.XMLHTTP")
			} catch (c) {
				try {
					a = new ActiveXObject("Microsoft.XMLHTTP")
				} catch (d) {
					a = !1
				}
			}
		}
		return a
	}
});
STK.register("core.str.parseURL", function(a) {
	return function(a) {
		var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
			c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"],
			d = b.exec(a),
			e = {};
		for (var f = 0, g = c.length; f < g; f += 1) e[c[f]] = d[f] || "";
		return e
	}
});
STK.register("core.json.jsonToQuery", function(a) {
	var b = function(b, c) {
			b = b == null ? "" : b;
			b = a.core.str.trim(b.toString());
			return c ? encodeURIComponent(b) : b
		};
	return function(a, c) {
		var d = [];
		if (typeof a == "object") for (var e in a) {
			if (e === "$nullName") {
				d = d.concat(a[e]);
				continue
			}
			if (a[e] instanceof Array) for (var f = 0, g = a[e].length; f < g; f++) d.push(e + "=" + b(a[e][f], c));
			else typeof a[e] != "function" && d.push(e + "=" + b(a[e], c))
		}
		return d.length ? d.join("&") : ""
	}
});
STK.register("core.util.URL", function(a) {
	return function(b, c) {
		var d = a.core.obj.parseParam({
			isEncodeQuery: !1,
			isEncodeHash: !1
		}, c || {}),
			e = {},
			f = a.core.str.parseURL(b),
			g = a.core.json.queryToJson(f.query),
			h = a.core.json.queryToJson(f.hash);
		e.setParam = function(a, b) {
			g[a] = b;
			return this
		};
		e.getParam = function(a) {
			return g[a]
		};
		e.setParams = function(a) {
			for (var b in a) e.setParam(b, a[b]);
			return this
		};
		e.setHash = function(a, b) {
			h[a] = b;
			return this
		};
		e.getHash = function(a) {
			return h[a]
		};
		e.valueOf = e.toString = function() {
			var b = [],
				c = a.core.json.jsonToQuery(g, d.isEncodeQuery),
				e = a.core.json.jsonToQuery(h, d.isEncodeQuery);
			if (f.scheme != "") {
				b.push(f.scheme + ":");
				b.push(f.slash)
			}
			if (f.host != "") {
				b.push(f.host);
				if (f.port != "") {
					b.push(":");
					b.push(f.port)
				}
			}
			b.push("/");
			b.push(f.path);
			c != "" && b.push("?" + c);
			e != "" && b.push("#" + e);
			return b.join("")
		};
		return e
	}
});
STK.register("core.json.strToJson", function($) {
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	return function(text, reviver) {
		function walk(a, b) {
			var c, d, e = a[b];
			if (e && typeof e == "object") for (c in e) if (Object.prototype.hasOwnProperty.call(e, c)) {
				d = walk(e, c);
				d !== undefined ? e[c] = d : delete e[c]
			}
			return reviver.call(a, b, e)
		}
		if (window.JSON && window.JSON.parse) return window.JSON.parse(text, reviver);
		var j;
		text = String(text);
		cx.lastIndex = 0;
		cx.test(text) && (text = text.replace(cx, function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
			j = eval("(" + text + ")");
			return typeof reviver == "function" ? walk({
				"": j
			}, "") : j
		}
		throw new SyntaxError("JSON.parse")
	}
});
STK.register("core.io.ajax", function($) {
	return function(oOpts) {
		var opts = $.core.obj.parseParam({
			url: "",
			charset: "UTF-8",
			timeout: 3e4,
			args: {},
			onComplete: null,
			onTimeout: $.core.func.empty,
			uniqueID: null,
			onFail: $.core.func.empty,
			method: "get",
			asynchronous: !0,
			header: {},
			isEncode: !1,
			responseType: "json"
		}, oOpts);
		if (opts.url == "") throw "ajax need url in parameters object";
		var tm, trans = $.core.io.getXHR(),
			cback = function() {
				if (trans.readyState == 4) {
					clearTimeout(tm);
					var data = "";
					if (opts.responseType === "xml") data = trans.responseXML;
					else if (opts.responseType === "text") data = trans.responseText;
					else try {
						trans.responseText && typeof trans.responseText == "string" ? data = eval("(" + trans.responseText + ")") : data = {}
					} catch (exp) {
						data = opts.url + "return error : data error"
					}
					trans.status == 200 ? opts.onComplete != null && opts.onComplete(data) : trans.status != 0 && opts.onFail != null && opts.onFail(data, trans)
				} else opts.onTraning != null && opts.onTraning(trans)
			};
		trans.onreadystatechange = cback;
		opts.header["Content-Type"] || (opts.header["Content-Type"] = "application/x-www-form-urlencoded");
		opts.header["X-Requested-With"] || (opts.header["X-Requested-With"] = "XMLHttpRequest");
		if (opts.method.toLocaleLowerCase() == "get") {
			var url = $.core.util.URL(opts.url, {
				isEncodeQuery: opts.isEncode
			});
			url.setParams(opts.args);
			url.setParam("__rnd", (new Date).valueOf());
			trans.open(opts.method, url.toString(), opts.asynchronous);
			try {
				for (var k in opts.header) trans.setRequestHeader(k, opts.header[k])
			} catch (exp) {}
			trans.send("")
		} else {
			trans.open(opts.method, opts.url, opts.asynchronous);
			try {
				for (var k in opts.header) trans.setRequestHeader(k, opts.header[k])
			} catch (exp) {}
			trans.send($.core.json.jsonToQuery(opts.args, opts.isEncode))
		}
		opts.timeout && (tm = setTimeout(function() {
			try {
				trans.abort();
				opts.onTimeout({}, trans);
				opts.onFail({}, trans)
			} catch (a) {}
		}, opts.timeout));
		return trans
	}
});
STK.register("core.io.scriptLoader", function(a) {
	var b = {},
		c = {
			url: "",
			charset: "UTF-8",
			timeout: 3e4,
			args: {},
			onComplete: a.core.func.empty,
			onTimeout: a.core.func.empty,
			isEncode: !1,
			uniqueID: null
		};
	return function(d) {
		var e, f, g = a.core.obj.parseParam(c, d);
		if (g.url == "") throw "scriptLoader: url is null";
		var h = g.uniqueID || a.core.util.getUniqueKey();
		e = b[h];
		if (e != null && a.IE != !0) {
			a.core.dom.removeNode(e);
			e = null
		}
		e == null && (e = b[h] = a.C("script"));
		e.charset = g.charset;
		e.id = "scriptRequest_script_" + h;
		e.type = "text/javascript";
		g.onComplete != null && (a.IE ? e.onreadystatechange = function() {
			if (e.readyState.toLowerCase() == "loaded" || e.readyState.toLowerCase() == "complete") {
				try {
					clearTimeout(f);
					document.getElementsByTagName("head")[0].removeChild(e);
					e.onreadystatechange = null
				} catch (a) {}
				g.onComplete()
			}
		} : e.onload = function() {
			try {
				clearTimeout(f);
				a.core.dom.removeNode(e)
			} catch (b) {}
			g.onComplete()
		});
		e.src = a.core.util.URL(g.url, {
			isEncodeQuery: g.isEncode
		}).setParams(g.args).toString();
		document.getElementsByTagName("head")[0].appendChild(e);
		g.timeout > 0 && (f = setTimeout(function() {
			try {
				document.getElementsByTagName("head")[0].removeChild(e)
			} catch (a) {}
			g.onTimeout()
		}, g.timeout));
		return e
	}
});
STK.register("core.io.jsonp", function(a) {
	return function(b) {
		var c = a.core.obj.parseParam({
			url: "",
			charset: "UTF-8",
			timeout: 3e4,
			args: {},
			onComplete: null,
			onTimeout: null,
			responseName: null,
			isEncode: !1,
			varkey: "callback"
		}, b),
			d = -1,
			e = c.responseName || "STK_" + a.core.util.getUniqueKey();
		c.args[c.varkey] = e;
		var f = c.onComplete,
			g = c.onTimeout;
		window[e] = function(a) {
			if (d != 2 && f != null) {
				d = 1;
				f(a)
			}
		};
		c.onComplete = null;
		c.onTimeout = function() {
			if (d != 1 && g != null) {
				d = 2;
				g()
			}
		};
		return a.core.io.scriptLoader(c)
	}
});
STK.register("core.util.templet", function(a) {
	return function(a, b) {
		return a.replace(/#\{(.+?)\}/ig, function() {
			var a = arguments[1].replace(/\s/ig, ""),
				c = arguments[0],
				d = a.split("||");
			for (var e = 0, f = d.length; e < f; e += 1) {
				if (/^default:.*$/.test(d[e])) {
					c = d[e].replace(/^default:/, "");
					break
				}
				if (b[d[e]] !== undefined) {
					c = b[d[e]];
					break
				}
			}
			return c
		})
	}
});
STK.register("core.io.getIframeTrans", function(a) {
	var b = '<iframe id="#{id}" name="#{id}" height="0" width="0" frameborder="no"></iframe>';
	return function(c) {
		var d, e, f;
		e = a.core.obj.parseParam({
			id: "STK_iframe_" + a.core.util.getUniqueKey()
		}, c);
		f = {};
		d = a.C("DIV");
		d.innerHTML = a.core.util.templet(b, e);
		a.core.util.hideContainer.appendChild(d);
		f.getId = function() {
			return e.id
		};
		f.destroy = function() {
			d.innerHTML = "";
			try {
				d.getElementsByTagName("iframe")[0].src = "about:blank"
			} catch (b) {}
			a.core.util.hideContainer.removeChild(d);
			d = null
		};
		return f
	}
});
STK.register("core.io.require", function(a) {
	var b = "http://js.t.sinajs.cn/STK/js/",
		c = function(a, b) {
			var c = b.split("."),
				d = a,
				e = null;
			while (e = c.shift()) {
				d = d[e];
				if (d === undefined) return !1
			}
			return !0
		},
		d = [],
		e = function(b) {
			if (a.core.arr.indexOf(b, d) !== -1) return !1;
			d.push(b);
			a.core.io.scriptLoader({
				url: b,
				callback: function() {
					a.core.arr.foreach(d, function(a, c) {
						if (a === b) {
							d.splice(c, 1);
							return !1
						}
					})
				}
			});
			return !1
		},
		f = function(d, f, g) {
			var h = null;
			for (var i = 0, j = d.length; i < j; i += 1) {
				var k = d[i];
				typeof k == "string" ? c(a, k) || e(b + k.replace(/\./ig, "/") + ".js") : c(window, k.NS) || e(k.url)
			}
			var l = function() {
					for (var b = 0, e = d.length; b < e; b += 1) {
						var i = d[b];
						if (typeof i == "string") {
							if (!c(a, i)) {
								h = setTimeout(l, 25);
								return !1
							}
						} else if (!c(window, i.NS)) {
							h = setTimeout(l, 25);
							return !1
						}
					}
					clearTimeout(h);
					f.apply({}, [].concat(g))
				};
			h = setTimeout(l, 25)
		};
	f.setBaseURL = function(a) {
		if (typeof a != "string") throw "[STK.kit.extra.require.setBaseURL] need string as frist parameter";
		b = a
	};
	return f
});
STK.register("core.io.ijax", function(a) {
	return function(b) {
		var c, d, e, f, g, h, i;
		c = a.core.obj.parseParam({
			url: "",
			form: null,
			args: {},
			uniqueID: null,
			timeout: 3e4,
			onComplete: a.core.func.empty,
			onTimeout: a.core.func.empty,
			onFail: a.core.func.empty,
			asynchronous: !0,
			isEncode: !0,
			abaurl: null,
			responseName: null,
			varkey: "callback",
			abakey: "callback"
		}, b);
		i = {};
		if (c.url == "") throw "ijax need url in parameters object";
		if (!c.form) throw "ijax need form in parameters object";
		d = a.core.io.getIframeTrans();
		e = c.responseName || "STK_ijax_" + a.core.util.getUniqueKey();
		h = {};
		h[c.varkey] = e;
		if (c.abaurl) {
			c.abaurl = a.core.util.URL(c.abaurl).setParams(h);
			h = {};
			h[c.abakey] = c.abaurl.toString()
		}
		c.url = a.core.util.URL(c.url, {
			isEncodeQuery: c.isEncode
		}).setParams(h).setParams(c.args);
		g = function() {
			window[e] = null;
			d.destroy();
			d = null;
			clearTimeout(f)
		};
		f = setTimeout(function() {
			try {
				c.onTimeout();
				c.onFail()
			} catch (a) {} finally {
				g()
			}
		}, c.timeout);
		window[e] = function(a, b) {
			try {
				c.onComplete(a, b)
			} catch (d) {} finally {
				g()
			}
		};
		c.form.action = c.url.toString();
		c.form.target = d.getId();
		c.form.submit();
		i.abort = g;
		return i
	}
});
STK.register("core.json.clone", function(a) {
	function b(a) {
		var c;
		if (a instanceof Array) {
			c = [];
			var d = a.length;
			while (d--) c[d] = b(a[d]);
			return c
		}
		if (a instanceof Object) {
			c = {};
			for (var e in a) c[e] = b(a[e]);
			return c
		}
		return a
	}
	return b
});
STK.register("core.json.include", function(a) {
	return function(a, b) {
		for (var c in b) if (typeof b[c] == "object") if (b[c] instanceof Array) {
			if (!(a[c] instanceof Array)) return !1;
			if (b[c].length !== a[c].length) return !1;
			for (var d = 0, e = b[c].length; d < e; d += 1) if (!arguments.callee(b[c][d], a[c][d])) return !1
		} else {
			if (typeof a[c] != "object") return !1;
			if (!arguments.callee(b[c], a[c])) return !1
		} else if (typeof b[c] == "number" || typeof b[c] == "string") {
			if (b[c] !== a[c]) return !1
		} else if (b[c] !== undefined && b[c] !== null) {
			if (a[c] === undefined || a[c] === null) return !1;
			if (!b[c].toString || !a[c].toString) throw "json1[k] or json2[k] do not have toString method";
			if (b[c].toString() !== a[c].toString()) return !1
		}
		return !0
	}
});
STK.register("core.json.compare", function(a) {
	return function(b, c) {
		return a.core.json.include(b, c) && a.core.json.include(c, b) ? !0 : !1
	}
});
STK.register("core.json.jsonToStr", function(a) {
	function d(a) {
		return a < 10 ? "0" + a : a
	}
	function c(a) {
		f.lastIndex = 0;
		return f.test(a) ? '"' + a.replace(f, function(a) {
			var b = i[a];
			return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}
	function b(a, d) {
		var e, f, i, k, l = g,
			m, n = d[a];
		n && typeof n == "object" && typeof n.toJSON == "function" && (n = n.toJSON(a));
		typeof j == "function" && (n = j.call(d, a, n));
		switch (typeof n) {
		case "string":
			return c(n);
		case "number":
			return isFinite(n) ? String(n) : "null";
		case "boolean":
		case "null":
			return String(n);
		case "object":
			if (!n) return "null";
			g += h;
			m = [];
			if (Object.prototype.toString.apply(n) === "[object Array]") {
				k = n.length;
				for (e = 0; e < k; e += 1) m[e] = b(e, n) || "null";
				i = m.length === 0 ? "[]" : g ? "[\n" + g + m.join(",\n" + g) + "\n" + l + "]" : "[" + m.join(",") + "]";
				g = l;
				return i
			}
			if (j && typeof j == "object") {
				k = j.length;
				for (e = 0; e < k; e += 1) {
					f = j[e];
					if (typeof f == "string") {
						i = b(f, n);
						i && m.push(c(f) + (g ? ": " : ":") + i)
					}
				}
			} else for (f in n) if (Object.hasOwnProperty.call(n, f)) {
				i = b(f, n);
				i && m.push(c(f) + (g ? ": " : ":") + i)
			}
			i = m.length === 0 ? "{}" : g ? "{\n" + g + m.join(",\n" + g) + "\n" + l + "}" : "{" + m.join(",") + "}";
			g = l;
			return i
		}
	}
	if (typeof Date.prototype.toJSON != "function") {
		Date.prototype.toJSON = function(a) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
			return this.valueOf()
		}
	}
	var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		g, h, i = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		j;
	return function(a, c, d) {
		if (window.JSON && window.JSON.stringify) return window.JSON.stringify(a, c, d);
		var e;
		g = "";
		h = "";
		if (typeof d == "number") for (e = 0; e < d; e += 1) h += " ";
		else typeof d == "string" && (h = d);
		j = c;
		if (!c || typeof c == "function" || typeof c == "object" && typeof c.length == "number") return b("", {
			"": a
		});
		throw new Error("JSON.stringify")
	}
});
STK.register("core.obj.beget", function(a) {
	var b = function() {};
	return function(a) {
		b.prototype = a;
		return new b
	}
});
STK.register("core.obj.cascade", function(a) {
	return function(a, b) {
		for (var c = 0, d = b.length; c < d; c += 1) {
			if (typeof a[b[c]] != "function") throw "cascade need function list as the second paramsters";
			a[b[c]] = function(b) {
				return function() {
					b.apply(a, arguments);
					return a
				}
			}(a[b[c]])
		}
	}
});
STK.register("core.obj.clear", function(a) {
	return function(a) {
		var b, c = {};
		for (b in a) a[b] != null && (c[b] = a[b]);
		return c
	}
});
STK.register("core.obj.cut", function(a) {
	return function(b, c) {
		var d = {};
		if (!a.core.arr.isArray(c)) throw "core.obj.cut need array as second parameter";
		for (var e in b) a.core.arr.inArray(e, c) || (d[e] = b[e]);
		return d
	}
});
STK.register("core.obj.sup", function(a) {
	return function(a, b) {
		var c = {};
		for (var d = 0, e = b.length; d < e; d += 1) {
			if (typeof a[b[d]] != "function") throw "super need function list as the second paramsters";
			c[b[d]] = function(b) {
				return function() {
					return b.apply(a, arguments)
				}
			}(a[b[d]])
		}
		return c
	}
});
STK.register("core.str.bLength", function(a) {
	return function(a) {
		if (!a) return 0;
		var b = a.match(/[^\x00-\xff]/g);
		return a.length + (b ? b.length : 0)
	}
});
STK.register("core.str.dbcToSbc", function(a) {
	return function(a) {
		return a.replace(/[\uff01-\uff5e]/g, function(a) {
			return String.fromCharCode(a.charCodeAt(0) - 65248)
		}).replace(/\u3000/g, " ")
	}
});
STK.register("core.str.parseHTML", function(a) {
	return function(a) {
		var b = /[^<>]+|<(\/?)([A-Za-z0-9]+)([^<>]*)>/g,
			c, d, e = [];
		while (c = b.exec(a)) {
			var f = [];
			for (d = 0; d < c.length; d += 1) f.push(c[d]);
			e.push(f)
		}
		return e
	}
});
STK.register("core.str.leftB", function(a) {
	return function(b, c) {
		var d = b.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
		b = b.slice(0, d.slice(0, c).replace(/\*\*/g, " ").replace(/\*/g, "").length);
		a.core.str.bLength(b) > c && c > 0 && (b = b.slice(0, b.length - 1));
		return b
	}
});
STK.register("core.str.queryString", function(a) {
	return function(b, c) {
		var d = a.core.obj.parseParam({
			source: window.location.search.substr(1),
			split: "&"
		}, c),
			e = (new RegExp("(^|" + d.split + ")" + b + "=([^\\" + d.split + "]*)(\\" + d.split + "|$)", "gi")).exec(d.source),
			f;
		return (f = e) ? f[2] : null
	}
});
STK.register("core.util.cookie", function(a) {
	var b = {
		set: function(b, c, d) {
			var e = [],
				f, g, h = a.core.obj.parseParam({
					expire: null,
					path: "/",
					domain: null,
					secure: null,
					encode: !0
				}, d);
			h.encode == !0 && (c = escape(c));
			e.push(b + "=" + c);
			h.path != null && e.push("path=" + h.path);
			h.domain != null && e.push("domain=" + h.domain);
			h.secure != null && e.push(h.secure);
			if (h.expire != null) {
				f = new Date;
				g = f.getTime() + h.expire * 36e5;
				f.setTime(g);
				e.push("expires=" + f.toGMTString())
			}
			document.cookie = e.join(";")
		},
		get: function(a) {
			a = a.replace(/([\.\[\]\$])/g, "\\$1");
			var b = new RegExp(a + "=([^;]*)?;", "i"),
				c = document.cookie + ";",
				d = c.match(b);
			return d ? d[1] || "" : ""
		},
		remove: function(a, c) {
			c = c || {};
			c.expire = -10;
			b.set(a, "", c)
		}
	};
	return b
});
STK.register("core.util.connect", function(a) {
	var b = {},
		c = {},
		d = 0,
		e = function(a, b) {
			return Object.prototype.hasOwnProperty.call(a, b)
		},
		f = function() {
			return ++d + "" + (new Date).getTime()
		},
		g = function(b, d, f, g) {
			if (!e(c, b)) return !1;
			var h = c[b];
			if (!e(h.callback, d)) return !1;
			var i = h.callback[d].onSuccess,
				j = h.callback[d].onError,
				k = a.core.json.jsonToStr(g || {});
			setTimeout(function() {
				var b = a.core.json.strToJson(k);
				if (f) {
					b.type = "error";
					j(b, d)
				} else i(b, d)
			}, 0);
			delete h.callback[d];
			return !0
		};
	b.request = function(b) {
		var d = b.sid;
		if (!d || typeof d != "string") return -1;
		if (!e(c, d)) return -1;
		var h = c[d],
			i = f(),
			j = a.core.json.jsonToStr(b.data || {});
		h.callback[i] = {
			onSuccess: b.onSuccess || a.core.func.empty,
			onError: b.onError || a.core.func.empty
		};
		var k = function(a) {
				g(d, i, a.error, a.data)
			};
		setTimeout(function() {
			h.handle(k, a.core.json.strToJson(j), i)
		}, 0);
		return i
	};
	b.create = function(b) {
		if (!b) return !1;
		var d = b.sid;
		if (!d || typeof d != "string") return !1;
		if (e(c, d)) return !1;
		var f = b.handle;
		if (typeof f != "function") return !1;
		c[d] = {
			handle: f,
			onAbort: b.onAbort || a.core.func.empty,
			callback: {}
		};
		return !0
	};
	b.abort = function(a) {
		if (!a) return !1;
		for (var b in c) {
			var d = c[b];
			if (e(d.callback, a)) {
				setTimeout(function() {
					d.onAbort(a)
				}, 0);
				delete d.callback[a];
				return !0
			}
		}
		return !1
	};
	b.destory = function(a) {
		if (!a || typeof a != "string") return !1;
		if (!e(c, a)) return !1;
		for (var b in c[a].callback) try {
			c[a].callback[b].onError({
				type: "destroy"
			}, b)
		} catch (d) {}
		delete c[a];
		return !0
	};
	return b
});
STK.register("core.util.drag", function(a) {
	var b = function(a) {
			a.cancelBubble = !0;
			return !1
		},
		c = function(b, c) {
			b.clientX = c.clientX;
			b.clientY = c.clientY;
			b.pageX = c.clientX + a.core.util.scrollPos().left;
			b.pageY = c.clientY + a.core.util.scrollPos().top;
			return b
		};
	return function(d, e) {
		if (!a.core.dom.isNode(d)) throw "core.util.drag need Element as first parameter";
		var f = a.core.obj.parseParam({
			actRect: [],
			actObj: {}
		}, e),
			g = {},
			h = a.core.evt.custEvent.define(f.actObj, "dragStart"),
			i = a.core.evt.custEvent.define(f.actObj, "dragEnd"),
			j = a.core.evt.custEvent.define(f.actObj, "draging"),
			k = function(d) {
				var e = c({}, d);
				document.body.onselectstart = function() {
					return !1
				};
				a.core.evt.addEvent(document, "mousemove", l);
				a.core.evt.addEvent(document, "mouseup", m);
				a.core.evt.addEvent(document, "click", b, !0);
				if (d.preventDefault) {
					d.preventDefault();
					d.stopPropagation()
				}
				a.core.evt.custEvent.fire(h, "dragStart", e);
				return !1
			},
			l = function(b) {
				var d = c({}, b);
				b.cancelBubble = !0;
				a.core.evt.custEvent.fire(h, "draging", d)
			},
			m = function(d) {
				var e = c({}, d);
				document.body.onselectstart = function() {
					return !0
				};
				a.core.evt.removeEvent(document, "mousemove", l);
				a.core.evt.removeEvent(document, "mouseup", m);
				a.core.evt.removeEvent(document, "click", b, !0);
				a.core.evt.custEvent.fire(h, "dragEnd", e)
			};
		a.core.evt.addEvent(d, "mousedown", k);
		g.destroy = function() {
			a.core.evt.removeEvent(d, "mousedown", k);
			f = null
		};
		g.getActObj = function() {
			return f.actObj
		};
		return g
	}
});
STK.register("core.util.easyTemplate", function(a) {
	var b = function(a, c) {
			if (!a) return "";
			if (a !== b.template) {
				b.template = a;
				b.aStatement = b.parsing(b.separate(a))
			}
			var d = b.aStatement,
				e = function(a) {
					a && (c = a);
					return arguments.callee
				};
			e.toString = function() {
				return (new Function(d[0], d[1]))(c)
			};
			return e
		};
	b.separate = function(a) {
		var b = /\\'/g,
			c = a.replace(/(<(\/?)#(.*?(?:\(.*?\))*)>)|(')|([\r\n\t])|(\$\{([^\}]*?)\})/g, function(a, c, d, e, f, g, h, i) {
				if (c) return "{|}" + (d ? "-" : "+") + e + "{|}";
				if (f) return "\\'";
				if (g) return "";
				if (h) return "'+(" + i.replace(b, "'") + ")+'"
			});
		return c
	};
	b.parsing = function(a) {
		var b, c, d, e, f, g, h, i = ["var aRet = [];"];
		h = a.split(/\{\|\}/);
		var j = /\s/;
		while (h.length) {
			d = h.shift();
			if (!d) continue;
			f = d.charAt(0);
			if (f !== "+" && f !== "-") {
				d = "'" + d + "'";
				i.push("aRet.push(" + d + ");");
				continue
			}
			e = d.split(j);
			switch (e[0]) {
			case "+et":
				b = e[1];
				c = e[2];
				i.push('aRet.push("<!--' + b + ' start-->");');
				break;
			case "-et":
				i.push('aRet.push("<!--' + b + ' end-->");');
				break;
			case "+if":
				e.splice(0, 1);
				i.push("if" + e.join(" ") + "{");
				break;
			case "+elseif":
				e.splice(0, 1);
				i.push("}else if" + e.join(" ") + "{");
				break;
			case "-if":
				i.push("}");
				break;
			case "+else":
				i.push("}else{");
				break;
			case "+list":
				i.push("if(" + e[1] + ".constructor === Array){with({i:0,l:" + e[1] + ".length," + e[3] + "_index:0," + e[3] + ":null}){for(i=l;i--;){" + e[3] + "_index=(l-i-1);" + e[3] + "=" + e[1] + "[" + e[3] + "_index];");
				break;
			case "-list":
				i.push("}}}");
				break;
			default:
			}
		}
		i.push('return aRet.join("");');
		return [c, i.join("")]
	};
	return b
});
STK.register("core.util.htmlParser", function(a) {
	var b = function(a) {
			var b = {},
				c = a.split(",");
			for (var d = 0; d < c.length; d++) b[c[d]] = !0;
			return b
		},
		c = /^<(\w+)((?:\s+[\w-\:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		d = /^<\/(\w+)[^>]*>/,
		e = /([\w|\-]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
		f = b("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
		g = b("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul"),
		h = b("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
		i = b("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
		j = b("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
		k = b("script,style"),
		l = function(a, b) {
			var l, m, n, o = [],
				p = a,
				q = function(c, d, k, l) {
					if (g[d]) while (o.last() && h[o.last()]) r("", o.last());
					i[d] && o.last() == d && r("", d);
					l = f[d] || !! l;
					l || o.push(d);
					var m = [];
					if (c === "textarea") {
						var n = a.match(/^(.*)<\/textarea[^>]*>/);
						m.push({
							name: "text",
							value: a.slice(0, n[0].length)
						});
						a = a.substring(n[0].length)
					}
					if (b.start && typeof b.start == "function") {
						k.replace(e, function(a, b) {
							var c = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : j[b] ? b : "";
							m.push({
								name: b,
								value: c,
								escaped: c.replace(/(^|[^\\])"/g, '$1\\"')
							})
						});
						b.start(d, m, l)
					}
				},
				r = function(a, c) {
					if (!c) var d = 0;
					else for (var d = o.length - 1; d >= 0; d--) if (o[d] == c) break;
					if (d >= 0) {
						for (var e = o.length - 1; e >= d; e--) b.end && typeof b.end == "function" && b.end(o[e]);
						o.length = d
					}
				};
			o.last = function() {
				return this[this.length - 1]
			};
			while (a) {
				m = !0;
				if (!o.last() || !k[o.last()]) {
					if (a.indexOf("<!--") === 0) {
						l = a.indexOf("-->");
						if (l >= 0) {
							b.comment && typeof b.comment == "function" && b.comment(a.substring(4, l));
							a = a.substring(l + 3);
							m = !1
						}
					} else if (a.indexOf("</") === 0) {
						n = a.match(d);
						if (n) {
							a = a.substring(n[0].length);
							n[0].replace(d, r);
							m = !1
						}
					} else if (a.indexOf("<") === 0) {
						n = a.match(c);
						if (n) {
							a = a.substring(n[0].length);
							n[0].replace(c, q);
							m = !1
						}
					}
					if (m) {
						l = a.indexOf("<");
						var s = l < 0 ? a : a.substring(0, l);
						a = l < 0 ? "" : a.substring(l);
						b.chars && typeof b.chars == "function" && b.chars(s)
					}
				} else {
					a = a.replace(new RegExp("(.*)</" + o.last() + "[^>]*>"), function(a, c) {
						c = c.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1");
						b.chars && typeof b.chars == "function" && b.chars(c);
						return ""
					});
					r("", o.last())
				}
				if (a == p) throw "Parse Error: " + a;
				p = a
			}
			r()
		};
	return l
});
STK.register("core.util.nameValue", function(a) {
	return function(b) {
		var c = b.getAttribute("name"),
			d = b.getAttribute("type"),
			e = b.tagName,
			f = {
				name: c,
				value: ""
			},
			g = function(b) {
				b === !1 ? f = !1 : f.value ? f.value = [a.core.str.trim(b || "")].concat(f.value) : f.value = a.core.str.trim(b || "")
			};
		if ( !! b.disabled || !c) return !1;
		switch (e) {
		case "INPUT":
			d == "radio" || d == "checkbox" ? b.checked ? g(b.value) : g(!1) : d == "reset" || d == "submit" || d == "image" ? g(!1) : g(b.value);
			break;
		case "SELECT":
			if (b.multiple) {
				var h = b.options;
				for (var i = 0, j = h.length; i < j; i++) h[i].selected && g(h[i].value)
			} else g(b.value);
			break;
		case "TEXTAREA":
			g(b.value || b.getAttribute("value") || !1);
			break;
		case "BUTTON":
		default:
			g(b.value || b.getAttribute("value") || b.innerHTML || !1)
		}
		return f
	}
});
STK.register("core.util.htmlToJson", function(a) {
	return function(b, c, d) {
		var e = {};
		c = c || ["INPUT", "TEXTAREA", "BUTTON", "SELECT"];
		if (!b || !c) return !1;
		var f = a.core.util.nameValue;
		for (var g = 0, h = c.length; g < h; g++) {
			var i = b.getElementsByTagName(c[g]);
			for (var j = 0, k = i.length; j < k; j++) {
				var l = f(i[j]);
				if (!l || d && l.value === "") continue;
				e[l.name] ? e[l.name] instanceof Array ? e[l.name] = e[l.name].concat(l.value) : e[l.name] = [e[l.name]].concat(l.value) : e[l.name] = l.value
			}
		}
		return e
	}
});
STK.register("core.util.jobsM", function(a) {
	return function() {
		var b = [],
			c = {},
			d = !1,
			e = {},
			f = function(b) {
				var d = b.name,
					e = b.func,
					f = +(new Date);
				if (!c[d]) try {
					e(a);
					e[d] = !0
				} catch (g) {
					a.log("[error][jobs]" + d)
				}
			},
			g = function(b) {
				if (b.length) {
					a.core.func.timedChunk(b, {
						process: f,
						callback: arguments.callee
					});
					b.splice(0, b.length)
				} else d = !1
			};
		e.register = function(a, c) {
			b.push({
				name: a,
				func: c
			})
		};
		e.start = function() {
			if (d) return !0;
			d = !0;
			g(b)
		};
		e.load = function() {};
		a.core.dom.ready(e.start);
		return e
	}()
});
STK.register("core.util.language", function(a) {
	return function(a, b) {
		var c = [];
		for (var d = 2, e = arguments.length; d < e; d += 1) c.push(arguments[d]);
		return a.replace(/#L\{((.*?)(?:[^\\]))\}/ig, function() {
			var a = arguments[1],
				d;
			b && b[a] !== undefined ? d = b[a] : d = a;
			c.length && (d = d.replace(/(\%s)/ig, function() {
				var a = c.shift();
				return a !== undefined ? a : arguments[0]
			}));
			return d
		})
	}
});
STK.register("core.util.listener", function(a) {
	return function() {
		var a = {},
			b = [],
			c, d = function() {
				if (b.length != 0) {
					clearTimeout(c);
					var a = b.splice(0, 1)[0];
					try {
						a.func.apply(a.func, [].concat(a.data))
					} catch (e) {}
					c = setTimeout(d, 25)
				}
			};
		return {
			register: function(b, c, d) {
				a[b] = a[b] || {};
				a[b][c] = a[b][c] || [];
				a[b][c].push(d)
			},
			fire: function(c, e, f) {
				var g, h, i;
				if (a[c] && a[c][e] && a[c][e].length > 0) {
					g = a[c][e];
					g.data_cache = f;
					for (h = 0, i = g.length; h < i; h++) b.push({
						channel: c,
						evt: e,
						func: g[h],
						data: f
					});
					d()
				}
			},
			remove: function(b, c, d) {
				if (a[b] && a[b][c]) for (var e = 0, f = a[b][c].length; e < f; e++) if (a[b][c][e] === d) {
					a[b][c].splice(e, 1);
					break
				}
			},
			list: function() {
				return a
			},
			cache: function(b, c) {
				if (a[b] && a[b][c]) return a[b][c].data_cache
			}
		}
	}()
});
STK.register("core.util.pageletM", function(a) {
	var b = "",
		c = "";
	if (typeof $CONFIG != "undefined") {
		b = $CONFIG.jsPath || b;
		c = $CONFIG.cssPath || c
	}
	var d = a.core.arr.indexOf,
		e = {},
		f, g = {},
		h = {},
		i = {},
		j = {},
		k, l;
	if (a.IE) {
		k = {};
		l = function() {
			var b, c, d;
			for (b in k) if (k[b].length < 31) {
				d = a.E(b);
				break
			}
			if (!d) {
				b = "style_" + a.core.util.getUniqueKey(), d = document.createElement("style");
				d.setAttribute("type", "text/css");
				d.setAttribute("id", b);
				document.getElementsByTagName("head")[0].appendChild(d);
				k[b] = []
			}
			return {
				styleID: b,
				styleSheet: d.styleSheet || d.sheet
			}
		}
	}
	var m = function(b, c) {
			i[b] = {
				cssURL: c
			};
			if (a.IE) {
				var d = l();
				d.styleSheet.addImport(c);
				k[d.styleID].push(b);
				i[b].styleID = d.styleID
			} else {
				var e = a.C("link");
				e.setAttribute("rel", "Stylesheet");
				e.setAttribute("type", "text/css");
				e.setAttribute("charset", "utf-8");
				e.setAttribute("href", c);
				e.setAttribute("id", b);
				document.getElementsByTagName("head")[0].appendChild(e)
			}
		},
		n = {},
		o = function(b, c) {
			var d = a.E(b);
			if (d) {
				c(d);
				n[b] && delete n[b];
				for (var e in n) o(e, n[e])
			} else n[b] = c
		},
		p = function(b) {
			if (a.IE) {
				var c = i[b].styleID,
					f = k[c],
					g = a.E(c),
					h;
				if ((h = d(b, f)) > -1) {
					(g.styleSheet || g.sheet).removeImport(h);
					f.splice(h, 1)
				}
			} else a.core.dom.removeNode(a.E(b));
			delete e[i[b].cssURL];
			delete i[b]
		},
		q = function(b, d, e) {
			for (var f in j) a.E(f) || delete j[f];
			j[b] = {
				js: {},
				css: {}
			};
			if (e) for (var f = 0, g = e.length; f < g; ++f) j[b].css[c + e[f]] = 1
		},
		r = function() {
			for (var a in i) {
				var b = !1,
					c = i[a].cssURL;
				for (var d in j) if (j[d].css[c]) {
					b = !0;
					break
				}
				b || p(a)
			}
		},
		s = function(a, b) {
			var c = e[a] || (e[a] = {
				loaded: !1,
				list: []
			});
			if (c.loaded) {
				b(a);
				return !1
			}
			c.list.push(b);
			return c.list.length > 1 ? !1 : !0
		},
		t = function(a) {
			var b = e[a].list;
			if (b) {
				for (var c = 0; c < b.length; c++) b[c](a);
				e[a].loaded = !0;
				delete e[a].list
			}
		},
		u = function(b) {
			var d = b.url,
				e = b.load_ID,
				f = b.complete,
				g = b.pid,
				h = c + d,
				i = "css_" + a.core.util.getUniqueKey();
			if ( !! s(h, f)) {
				m(i, h);
				var j = a.C("div");
				j.id = e;
				a.core.util.hideContainer.appendChild(j);
				var k = 3e3,
					l = function() {
						if (parseInt(a.core.dom.getStyle(j, "height")) == 42) {
							a.core.util.hideContainer.removeChild(j);
							t(h)
						} else if (--k > 0) setTimeout(l, 10);
						else {
							a.log(h + "timeout!");
							a.core.util.hideContainer.removeChild(j);
							t(h);
							p(i);
							m(i, h)
						}
					};
				setTimeout(l, 50)
			}
		},
		v = function(c, d) {
			var f = b + c;
			!s(f, d) || a.core.io.scriptLoader({
				url: f,
				onComplete: function() {
					t(f)
				},
				onTimeout: function() {
					a.log(f + "timeout!");
					delete e[f]
				}
			})
		},
		w = function(a, b) {
			g[a] || (g[a] = b)
		},
		x = function(b) {
			if (b) if (g[b]) try {
				h[b] || (h[b] = g[b](a))
			} catch (c) {
				a.log(b, c, c.stack)
			} else a.log("start:ns=" + b + " ,have not been registed");
			else {
				var d = [];
				for (b in g) d.push(b);
				a.core.func.timedChunk(d, {
					process: function(b) {
						try {
							h[b] || (h[b] = g[b](a))
						} catch (c) {
							a.log(b, c, c.stack)
						}
					}
				})
			}
		},
		y = function(b) {
			var c = 1,
				d, e, f, g, h, i, j;
			b = b || {};
			e = b.pid;
			f = b.html;
			h = b.js ? [].concat(b.js) : [];
			g = b.css ? [].concat(b.css) : [];
			if (e == undefined) a.log("node pid[" + e + "] is undefined");
			else {
				q(e, h, g);
				i = function() {
					--c > 0 || o(e, function(a) {
						f != undefined && (a.innerHTML = f);
						h.length > 0 && j();
						r()
					})
				};
				j = function(a) {
					h.length > 0 && v(h.shift(), j);
					if (a && a.indexOf("/pl/") != -1) {
						var b = a.replace(/^.*?\/(pl\/.*)\.js\??.*$/, "$1").replace(/\//g, ".");
						z(b);
						x(b)
					}
				};
				if (g.length > 0) {
					c += g.length;
					for (var k = 0, l; l = g[k]; k++) u({
						url: l,
						load_ID: "js_" + l.replace(/^\/?(.*)\.css\??.*$/i, "$1").replace(/\//g, "_"),
						complete: i,
						pid: e
					})
				}
				i()
			}
		},
		z = function(b) {
			if (b) {
				if (h[b]) {
					a.log("destroy:" + b);
					try {
						h[b].destroy()
					} catch (c) {
						a.log(c, c.stack)
					}
					delete h[b]
				}
			} else {
				for (b in h) {
					a.log("destroy:" + b);
					try {
						h[b] && h[b].destroy && h[b].destroy()
					} catch (c) {
						a.log(b, c, c.stack)
					}
				}
				h = {}
			}
		},
		A = {
			register: w,
			start: x,
			view: y,
			clear: z,
			destroy: function() {
				A.clear();
				e = {};
				h = {};
				g = {};
				f = undefined
			}
		};
	a.core.dom.ready(function() {
		a.core.evt.addEvent(window, "unload", function() {
			a.core.evt.removeEvent(window, "unload", arguments.callee);
			A.destroy()
		})
	});
	return A
});
STK.register("core.util.winSize", function(a) {
	return function(a) {
		var b, c, d;
		a ? d = a.document : d = document;
		if (d.compatMode === "CSS1Compat") {
			b = d.documentElement.clientWidth;
			c = d.documentElement.clientHeight
		} else if (self.innerHeight) {
			a ? d = a.self : d = self;
			b = d.innerWidth;
			c = d.innerHeight
		} else if (d.documentElement && d.documentElement.clientHeight) {
			b = d.documentElement.clientWidth;
			c = d.documentElement.clientHeight
		} else if (d.body) {
			b = d.body.clientWidth;
			c = d.body.clientHeight
		}
		return {
			width: b,
			height: c
		}
	}
});
STK.register("core.util.pageSize", function(a) {
	return function(b) {
		var c;
		b ? c = b.document : c = document;
		var d = c.compatMode == "CSS1Compat" ? c.documentElement : c.body,
			e, f, g, h;
		if (window.innerHeight && window.scrollMaxY) {
			e = d.scrollWidth;
			f = window.innerHeight + window.scrollMaxY
		} else if (d.scrollHeight > d.offsetHeight) {
			e = d.scrollWidth;
			f = d.scrollHeight
		} else {
			e = d.offsetWidth;
			f = d.offsetHeight
		}
		var i = a.core.util.winSize(b);
		f < i.height ? g = i.height : g = f;
		e < i.width ? h = i.width : h = e;
		return {
			page: {
				width: h,
				height: g
			},
			win: {
				width: i.width,
				height: i.height
			}
		}
	}
});
STK.register("core.util.queue", function(a) {
	return function() {
		var a = {},
			b = [];
		a.add = function(c) {
			b.push(c);
			return a
		};
		a.get = function() {
			return b.length > 0 ? b.shift() : !1
		};
		return a
	}
});
STK.register("core.util.timer", function(a) {
	return function() {
		var a = {},
			b = {},
			c = 0,
			d = null,
			e = !1,
			f = 25,
			g = function() {
				for (var c in b) b[c].pause || b[c].fun();
				return a
			};
		a.add = function(d) {
			if (typeof d != "function") throw "The timer needs add a function as a parameters";
			var e = "" + (new Date).getTime() + Math.random() * Math.pow(10, 17);
			b[e] = {
				fun: d,
				pause: !1
			};
			c <= 0 && a.start();
			c++;
			return e
		};
		a.remove = function(d) {
			if (b[d]) {
				delete b[d];
				c--
			}
			c <= 0 && a.stop();
			return a
		};
		a.pause = function(c) {
			b[c] && (b[c].pause = !0);
			return a
		};
		a.play = function(c) {
			b[c] && (b[c].pause = !1);
			return a
		};
		a.stop = function() {
			clearInterval(d);
			d = null;
			return a
		};
		a.start = function() {
			d = setInterval(g, f);
			return a
		};
		a.loop = g;
		a.get = function(a) {
			if (a === "delay") return f;
			if (a === "functionList") return b
		};
		a.set = function(a, b) {
			a === "delay" && typeof b == "number" && (f = Math.max(25, Math.min(b, 200)))
		};
		return a
	}()
});
STK.register("core.util.scrollTo", function(a) {
	return function(b, c) {
		if (!a.core.dom.isNode(b)) throw "core.dom.isNode need element as the first parameter";
		var d = a.core.obj.parseParam({
			box: document.documentElement,
			top: 0,
			step: 2,
			onMoveStop: null
		}, c);
		d.step = Math.max(2, Math.min(10, d.step));
		var e = [],
			f = a.core.dom.position(b),
			g;
		d.box == document.documentElement ? g = {
			t: 0
		} : g = a.core.dom.position(d.box);
		var h = Math.max(0, (f ? f.t : 0) - (g ? g.t : 0) - d.top),
			i = d.box === document.documentElement ? d.box.scrollTop || document.body.scrollTop || window.pageYOffset : d.box.scrollTop;
		while (Math.abs(i - h) > d.step && i >= 0) {
			e.push(Math.round(i + (h - i) * d.step / 10));
			i = e[e.length - 1]
		}
		e.length || e.push(h);
		var j = a.core.util.timer.add(function() {
			if (e.length) d.box === document.documentElement ? window.scrollTo(0, e.shift()) : d.box.scrollTop = e.shift();
			else {
				d.box === document.documentElement ? window.scrollTo(0, h) : d.box.scrollTop = h;
				a.core.util.timer.remove(j);
				typeof d.onMoveStop == "function" && d.onMoveStop()
			}
		})
	}
});
STK.register("core.util.stack", function(a) {
	return function() {
		var a = {},
			b = [];
		a.add = function(c) {
			b.push(c);
			return a
		};
		a.get = function() {
			return b.length > 0 ? b.pop() : !1
		};
		return a
	}
});
STK.register("core.util.swf", function(a) {
	function b(b, c) {
		var d = a.core.obj.parseParam({
			id: "swf_" + parseInt(Math.random() * 1e4, 10),
			width: 1,
			height: 1,
			attrs: {},
			paras: {},
			flashvars: {},
			html: ""
		}, c);
		if (b == null) throw "swf: [sURL] 未定义";
		var e, f = [],
			g = [];
		for (e in d.attrs) g.push(e + '="' + d.attrs[e] + '" ');
		var h = [];
		for (e in d.flashvars) h.push(e + "=" + d.flashvars[e]);
		d.paras.flashvars = h.join("&");
		if (a.IE) {
			f.push('<object width="' + d.width + '" height="' + d.height + '" id="' + d.id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');
			f.push(g.join(""));
			f.push('><param name="movie" value="' + b + '" />');
			for (e in d.paras) f.push('<param name="' + e + '" value="' + d.paras[e] + '" />');
			f.push("</object>")
		} else {
			f.push('<embed width="' + d.width + '" height="' + d.height + '" id="' + d.id + '" src="' + b + '" type="application/x-shockwave-flash" ');
			f.push(g.join(""));
			for (e in d.paras) f.push(e + '="' + d.paras[e] + '" ');
			f.push(" />")
		}
		d.html = f.join("");
		return d
	}
	var c = {};
	c.create = function(c, d, e) {
		var f = a.E(c);
		if (f == null) throw "swf: [" + c + "] 未找到";
		var g = b(d, e);
		f.innerHTML = g.html;
		return a.E(g.id)
	};
	c.html = function(a, c) {
		var d = b(a, c);
		return d.html
	};
	c.check = function() {
		var b = -1;
		if (a.IE) try {
			var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			b = c.GetVariable("$version")
		} catch (d) {} else navigator.plugins["Shockwave Flash"] && (b = navigator.plugins["Shockwave Flash"].description);
		return b
	};
	return c
});
STK.register("core.util.storage", function(a) {
	var b = window.localStorage;
	if (b) return {
		get: function(a) {
			return unescape(b.getItem(a))
		},
		set: function(a, c, d) {
			b.setItem(a, escape(c))
		},
		del: function(a) {
			b.removeItem(a)
		},
		clear: function() {
			b.clear()
		},
		getAll: function() {
			var a = b.length,
				c = null,
				d = [];
			for (var e = 0; e < a; e++) {
				c = b.key(e);
				d.push(c + "=" + b.getItem(c))
			}
			return d.join("; ")
		}
	};
	if (window.ActiveXObject) {
		var c = document.documentElement,
			d = "localstorage";
		try {
			c.addBehavior("#default#userdata");
			c.save("localstorage")
		} catch (e) {}
		return {
			set: function(a, b) {
				c.setAttribute(a, b);
				c.save(d)
			},
			get: function(a) {
				c.load(d);
				return c.getAttribute(a)
			},
			del: function(a) {
				c.removeAttribute(a);
				c.save(d)
			}
		}
	}
	return {
		get: function(a) {
			var b = document.cookie.split("; "),
				c = b.length,
				d = [];
			for (var e = 0; e < c; e++) {
				d = b[e].split("=");
				if (a === d[0]) return unescape(d[1])
			}
			return null
		},
		set: function(a, b, c) {
			if (!(c && c instanceof Date)) {
				c = new Date;
				c.setDate(c.getDate() + 1)
			}
			document.cookie = a + "=" + escape(b) + "; expires=" + c.toGMTString()
		},
		del: function(a) {
			document.cookie = a + "=''; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
		},
		clear: function() {
			var a = document.cookie.split("; "),
				b = a.length,
				c = [];
			for (var d = 0; d < b; d++) {
				c = a[d].split("=");
				this.deleteKey(c[0])
			}
		},
		getAll: function() {
			return unescape(document.cookie.toString())
		}
	}
});
(function() {
	var a = STK.core,
		b = {
			tween: "core.ani.tween",
			tweenArche: "core.ani.tweenArche",
			arrCopy: "core.arr.copy",
			arrClear: "core.arr.clear",
			hasby: "core.arr.hasby",
			unique: "core.arr.unique",
			foreach: "core.arr.foreach",
			isArray: "core.arr.isArray",
			inArray: "core.arr.inArray",
			arrIndexOf: "core.arr.indexOf",
			findout: "core.arr.findout",
			domNext: "core.dom.next",
			domPrev: "core.dom.prev",
			isNode: "core.dom.isNode",
			addHTML: "core.dom.addHTML",
			insertHTML: "core.dom.insertHTML",
			setXY: "core.dom.setXY",
			contains: "core.dom.contains",
			position: "core.dom.position",
			trimNode: "core.dom.trimNode",
			insertAfter: "core.dom.insertAfter",
			insertBefore: "core.dom.insertBefore",
			removeNode: "core.dom.removeNode",
			replaceNode: "core.dom.replaceNode",
			Ready: "core.dom.ready",
			setStyle: "core.dom.setStyle",
			setStyles: "core.dom.setStyles",
			getStyle: "core.dom.getStyle",
			addClassName: "core.dom.addClassName",
			hasClassName: "core.dom.hasClassName",
			removeClassName: "core.dom.removeClassName",
			builder: "core.dom.builder",
			cascadeNode: "core.dom.cascadeNode",
			selector: "core.dom.selector",
			sizzle: "core.dom.sizzle",
			addEvent: "core.evt.addEvent",
			custEvent: "core.evt.custEvent",
			removeEvent: "core.evt.removeEvent",
			fireEvent: "core.evt.fireEvent",
			fixEvent: "core.evt.fixEvent",
			getEvent: "core.evt.getEvent",
			stopEvent: "core.evt.stopEvent",
			delegatedEvent: "core.evt.delegatedEvent",
			preventDefault: "core.evt.preventDefault",
			hotKey: "core.evt.hotKey",
			memorize: "core.func.memorize",
			bind: "core.func.bind",
			getType: "core.func.getType",
			methodBefore: "core.func.methodBefore",
			timedChunk: "core.func.timedChunk",
			funcEmpty: "core.func.empty",
			ajax: "core.io.ajax",
			jsonp: "core.io.jsonp",
			ijax: "core.io.ijax",
			scriptLoader: "core.io.scriptLoader",
			require: "core.io.require",
			jsonInclude: "core.json.include",
			jsonCompare: "core.json.compare",
			jsonClone: "core.json.clone",
			jsonToQuery: "core.json.jsonToQuery",
			queryToJson: "core.json.queryToJson",
			jsonToStr: "core.json.jsonToStr",
			strToJson: "core.json.strToJson",
			objIsEmpty: "core.obj.isEmpty",
			beget: "core.obj.beget",
			cascade: "core.obj.cascade",
			objSup: "core.obj.sup",
			parseParam: "core.obj.parseParam",
			bLength: "core.str.bLength",
			dbcToSbc: "core.str.dbcToSbc",
			leftB: "core.str.leftB",
			trim: "core.str.trim",
			encodeHTML: "core.str.encodeHTML",
			decodeHTML: "core.str.decodeHTML",
			parseURL: "core.str.parseURL",
			parseHTML: "core.str.parseHTML",
			queryString: "core.str.queryString",
			htmlToJson: "core.util.htmlToJson",
			cookie: "core.util.cookie",
			drag: "core.util.drag",
			timer: "core.util.timer",
			jobsM: "core.util.jobsM",
			listener: "core.util.listener",
			winSize: "core.util.winSize",
			pageSize: "core.util.pageSize",
			templet: "core.util.templet",
			queue: "core.util.queue",
			stack: "core.util.stack",
			swf: "core.util.swf",
			URL: "core.util.URL",
			scrollPos: "core.util.scrollPos",
			scrollTo: "core.util.scrollTo",
			getUniqueKey: "core.util.getUniqueKey",
			storage: "core.util.storage",
			pageletM: "core.util.pageletM"
		};
	for (var c in b) STK.shortRegister(b[c], c, "theia")
})();
(function(a) {
	var b = {},
		c = function(a) {
			return b[a]
		},
		d = function(e) {
			if (!b[e]) {
				var g = {
					exports: {}
				};
				try {
					a[e].call(g.exports, g, g.exports, d, c)
				} catch (h) {}
				b[e] = g.exports
			}
			return b[e]
		};
	return d("/ui")
})({
	"/ui": function(a, b, c, d) {
		function h(a, b) {
			function e(a) {
				return g.notice(a.msg).on("hide", a.hideCallback)
			}
			function d(a) {
				var b = g.tipConfirm(a.msg).on("hide", a.hideCallback).ok(a.okCallback).cancel(a.cancelCallback);
				return {
					setLayerXY: function(a) {
						return b.beside(a)
					},
					aniShow: function() {},
					aniHide: function() {},
					destroy: function() {}
				}
			}
			function c(a) {
				var b = g.tipAlert(a.msg).on("hide", a.hideCallback);
				return {
					setLayerXY: function(a) {
						return b.beside(a)
					},
					aniShow: function() {},
					aniHide: function() {},
					destroy: function() {}
				}
			}
			switch (a) {
			case "alert":
				return c(b);
			case "confirm":
				return d(b);
			case "lite":
				return e(b)
			}
		}
		var e = c("/css"),
			f = c("/helpers/toFunction"),
			g = {
				mlayer: f(c("/Class_mlayer"), "mlayer"),
				layer: f(c("/Class_layer"), "layer"),
				dialog: f(c("/Class_dialog"), "dialog"),
				alert: f(c("/Class_alert"), "alert"),
				confirm: f(c("/Class_confirm"), "confirm"),
				notice: f(c("/Class_notice"), "notice"),
				bubble: f(c("/Class_bubble"), "bubble"),
				card: f(c("/Class_card"), "card"),
				tipAlert: f(c("/Class_tipAlert"), "tipAlert"),
				tipConfirm: f(c("/Class_tipConfirm"), "tipConfirm"),
				mask: c("/mask"),
				scrollView: c("/Widget_scrollView"),
				badge: c("/Widget_badge"),
				suggest: c("/Widget_suggest"),
				effect: e.effect
			};
		g.focusHistory = c("/core/utils/focusHistory");
		g.mod = {
			layer: g.mlayer,
			suggest: c("/core/utils/suggest"),
			tab: c("/core/utils/tab")
		};
		g.tip = h;
		g.slider = c("/core/utils/slider");
		g.calendar = c("/calendar");
		typeof STK == "object" ? STK && STK.register("ui", function() {
			return g
		}) : window.UI = g
	},
	"/css": function(a, b, c, d) {
		function t(a, b, c, d, e) {
			function h(b) {
				i(a, x, h);
				clearTimeout(f);
				m(g, function(b) {
					l(a, b)
				});
				d && d()
			}
			var f, g, e = typeof arguments[arguments.length - 1] == "boolean" ? arguments[arguments.length - 1] : !1;
			if (typeof c == "function") {
				d = c;
				c = undefined
			}
			if (!v) n(function() {
				d && d()
			});
			else {
				c = c || "normal";
				b = b || "shake";
				g = ["UI_animated", "UI_speed_" + c, "UI_ani_" + b];
				j(a, x, h);
				f = setTimeout(h, p(c) + 100);
				e === !0 ? n(function() {
					m(g, function(b) {
						k(a, b)
					})
				}) : m(g, function(b) {
					k(a, b)
				})
			}
		}
		function s(a, b, c) {
			a.insertRule ? a.insertRule(b + " {" + c + "}", 0) : a.addRule(b, c, 1)
		}
		function r() {
			var a = document.body.style,
				b = a.WebkitAnimation !== undefined ? "-webkit-" : a.webkitAnimation !== undefined ? "-webkit-" : a.MozAnimation !== undefined ? "-moz-" : a.OAnimation !== undefined ? "-o-" : a.msAnimation !== undefined ? "-ms-" : a.animation !== undefined ? "" : !1;
			return b
		}
		function q() {
			var a = g("div"),
				b = g("div"),
				c;
			a.style.cssText = "width:50px;overflow:auto;height:50px;position:absolute;top:-100px;";
			b.style.cssText = "height:100px;";
			document.body.insertBefore(a, document.body.firstChild).appendChild(b);
			c = a.offsetWidth - b.offsetWidth;
			h(a);
			a = b = null;
			q = function() {
				return c
			};
			return c
		}
		function p(a) {
			return typeof a == "number" ? a : {
				fast: 200,
				normal: 500,
				slow: 1e3
			}[a] || 500
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.C,
			h = e.removeNode,
			i = e.removeEvent,
			j = e.addEvent,
			k = e.addClassName,
			l = e.removeClassName,
			m = e.foreach,
			n = f.setImmediate,
			o = {
				".UI_frame": "position:fixed;top:0;left:0;right:0;bottom:0;overflow-y:scroll;-webkit-overflow-scrolling: touch;",
				".UI_freezed": "overflow-y:hidden;",
				".UI_freezed .WB_miniblog": "overflow-y:scroll;",
				".UI_autoHeight .UI_autoHeightCtnt": "overflow:hidden;height:0;",
				".UI_autoHeight.UI_autoHeight_animated": "-v-transition:top 0.2s ease",
				".UI_autoHeight.UI_autoHeight_animated .UI_autoResizeCtnt": "-v-transition:height 0.2s ease",
				".UI_autoHeight.UI_autoHeightCtnt": "overflow:hidden;height:0;",
				".UI_autoHeight.UI_autoHeight_animated.UI_autoResizeCtnt": "-v-transition:height 0.2s ease, top 0.2s ease",
				".UI_scrolling": "-v-user-select:none",
				".UI_scrollView .UI_scrollContainer": "overflow:hidden;width:100%;height:100%;position:relative;_background:url(about:blank);",
				".UI_scrollView .UI_scrollContent": "position:relative;height:100%;width:100%;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch;margin-right:-30px;padding-right:30px;",
				".UI_badge": "display:inline-block;vertical-align:middle;overflow:hidden;",
				".UI_animated": "-v-animation-fill-mode: both;",
				".UI_animated.UI_speed_normal": "-v-animation-duration:  0.5s;",
				".UI_animated.UI_speed_fast": "-v-animation-duration:  0.2s;",
				".UI_animated.UI_speed_slow": "-v-animation-duration:  1s;"
			},
			u = document.getElementsByTagName("head")[0].appendChild(g("style"));
		u = u.sheet ? u.sheet : u.styleSheet;
		var v = r(),
			w = /\-v\-/g,
			x = {
				"-webkit-": "webkitAnimationEnd",
				"-moz-": "animationend",
				"-o-": "OAnimationEnd",
				"-ms-": "msAnimationEnd",
				"": "animationend"
			}[v],
			y = {
				"-webkit-": "webkitTransitionEnd",
				"-moz-": "transitionend",
				"-o-": "OTransitionEnd",
				"-ms-": "msTransitionEnd",
				"": "transitionend"
			}[v];
		for (var z in o) s(u, z, o[z].replace(w, v || ""));
		b.transitionend = y;
		b.animationend = x;
		b.effectSuport = !! v;
		b.effect = t;
		b.scrollWidth = q
	},
	"/$": function(a, b, c, d) {
		a.exports = [d("/core/theia") || STK, c("/core/utils/index")]
	},
	"/core/utils/index": function(a, b, c, d) {
		a.exports = {
			count: c("/core/utils/count"),
			cssText: c("/core/utils/cssText"),
			drag: c("/core/utils/drag"),
			extend: c("/core/utils/extend"),
			fix: c("/core/utils/fix"),
			language: c("/core/utils/language"),
			layoutPos: c("/core/utils/layoutPos"),
			merge: c("/core/utils/merge"),
			parseDOM: c("/core/utils/parseDOM"),
			proxy: c("/core/utils/proxy"),
			rects: c("/core/utils/rects"),
			smartInput: c("/core/utils/smartInput"),
			textareaUtils: c("/core/utils/textareaUtils"),
			textSelection: c("/core/utils/textSelection"),
			setImmediate: c("/core/utils/setImmediate")
		}
	},
	"/core/utils/count": function(a, b, c, d) {
		function f(a) {
			var b = 41,
				c = 140,
				d = 20,
				f = a,
				g = a.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [],
				h = 0;
			for (var i = 0, j = g.length; i < j; i++) {
				var k = e.core.str.bLength(g[i]);
				if (/^(http:\/\/t.cn)/.test(g[i])) continue;
				/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= b ? k : k <= c ? d : k - c + d : h += k <= c ? d : k - c + d;
				f = f.replace(g[i], "")
			}
			var l = Math.ceil((h + e.core.str.bLength(f)) / 2);
			return l
		}
		var e = d("/core/theia") || STK;
		a.exports = function(a) {
			a = a.replace(/\r\n/g, "\n");
			return f(a)
		}
	},
	"/core/utils/cssText": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = function(a, b) {
				var c = (a + ";" + b).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"),
					d;
				while (c && (d = c.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i))) c = c.replace(d[1] + d[2] + d[3], "");
				return c
			};
		a.exports = function(a) {
			a = a || "";
			var b = [],
				c = {
					push: function(a, d) {
						b.push(a + ":" + d);
						return c
					},
					remove: function(a) {
						for (var d = 0; d < b.length; d++) b[d].indexOf(a + ":") == 0 && b.splice(d, 1);
						return c
					},
					getStyleList: function() {
						return b.slice()
					},
					getCss: function() {
						return f(a, b.join(";"))
					}
				};
			return c
		}
	},
	"/core/utils/drag": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		a.exports = function(a, b) {
			var c, d, f, g, h, i, j, k, l = function() {
					m();
					n()
				},
				m = function() {
					c = e.parseParam({
						moveDom: a,
						perchStyle: "border:solid #999999 2px;",
						dragtype: null,
						actObj: {},
						pagePadding: [5, 5, 5, 5]
					}, b);
					f = c.moveDom;
					d = {};
					g = {};
					h = e.drag(a, {
						actObj: c.actObj
					});
					if (c.dragtype === "perch") {
						i = e.C("div");
						j = !1;
						k = !1;
						f = i
					}
					a.style.cursor = "move"
				},
				n = function() {
					e.custEvent.add(c.actObj, "dragStart", o);
					e.custEvent.add(c.actObj, "dragEnd", p);
					e.custEvent.add(c.actObj, "draging", q)
				},
				o = function(b, d) {
					document.body.style.cursor = "move";
					var f = e.core.util.pageSize().page;
					g = e.core.dom.position(c.moveDom);
					g.pageX = d.pageX;
					g.pageY = d.pageY;
					g.height = c.moveDom.offsetHeight;
					g.width = c.moveDom.offsetWidth;
					g.pageHeight = f.height;
					g.pageWidth = f.width;
					if (c.dragtype === "perch") {
						var h = [];
						h.push(c.perchStyle);
						h.push("position:absolute");
						h.push("z-index:" + (c.moveDom.style.zIndex + 10));
						h.push("width:" + c.moveDom.offsetWidth + "px");
						h.push("height:" + c.moveDom.offsetHeight + "px");
						h.push("left:" + g.l + "px");
						h.push("top:" + g.t + "px");
						i.style.cssText = h.join(";");
						k = !0;
						setTimeout(function() {
							if (k) {
								document.body.appendChild(i);
								j = !0
							}
						}, 100)
					}
					a.setCapture !== undefined && a.setCapture()
				},
				p = function(b, d) {
					document.body.style.cursor = "auto";
					a.setCapture !== undefined && a.releaseCapture();
					if (c.dragtype === "perch") {
						k = !1;
						c.moveDom.style.top = i.style.top;
						c.moveDom.style.left = i.style.left;
						if (j) {
							document.body.removeChild(i);
							j = !1
						}
					}
				},
				q = function(a, b) {
					var d = g.t + (b.pageY - g.pageY),
						e = g.l + (b.pageX - g.pageX),
						h = d + g.height,
						i = e + g.width,
						j = g.pageHeight - c.pagePadding[2],
						k = g.pageWidth - c.pagePadding[1];
					if (h < j && d > 0) f.style.top = d + "px";
					else {
						var l;
						h >= j && (l = j - g.height);
						if (d < 0 + c.pagePadding[3] || l < 0 + c.pagePadding[3]) l = c.pagePadding[3];
						f.style.top = l + "px"
					}
					if (i < k && e > 0) f.style.left = e + "px";
					else {
						var m;
						i >= k && (m = k - g.width);
						if (e < 0 + c.pagePadding[0] || m < 0 + c.pagePadding[0]) m = c.pagePadding[0];
						f.style.left = m + "px"
					}
				};
			l();
			d.destroy = function() {
				document.body.style.cursor = "auto";
				typeof f.setCapture == "function" && f.releaseCapture();
				if (c.dragtype === "perch") {
					k = !1;
					if (j) {
						document.body.removeChild(i);
						j = !1
					}
				}
				e.custEvent.remove(c.actObj, "dragStart", o);
				e.custEvent.remove(c.actObj, "dragEnd", p);
				e.custEvent.remove(c.actObj, "draging", q);
				h.destroy && h.destroy();
				c = null;
				f = null;
				g = null;
				h = null;
				i = null;
				j = null;
				k = null
			};
			d.getActObj = function() {
				return c.actObj
			};
			return d
		}
	},
	"/core/utils/extend": function(a, b, c, d) {
		function e(a) {
			var b = arguments.length,
				c = 1,
				d;
			while (c < b) {
				d = arguments[c++];
				for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e])
			}
			return a
		}
		a.exports = e
	},
	"/core/utils/fix": function(a, b, c, d) {
		function j(a, b, c) {
			if ( !! h(a)) {
				var d = "fixed",
					g, i, j, k, l = a.offsetWidth,
					m = a.offsetHeight,
					n = e.core.util.winSize(),
					o = 0,
					p = 0,
					q = e.core.dom.cssText(a.style.cssText);
				if (!f) {
					d = "absolute";
					var r = e.core.util.scrollPos();
					o = g = r.top;
					p = i = r.left;
					switch (b) {
					case "lt":
						g += c[1];
						i += c[0];
						break;
					case "lb":
						g += n.height - m - c[1];
						i += c[0];
						break;
					case "rt":
						g += c[1];
						i += n.width - l - c[0];
						break;
					case "rb":
						g += n.height - m - c[1];
						i += n.width - l - c[0];
						break;
					case "c":
					default:
						g += (n.height - m) / 2 + c[1];
						i += (n.width - l) / 2 + c[0]
					}
					j = k = ""
				} else {
					g = k = c[1];
					i = j = c[0];
					switch (b) {
					case "lt":
						k = j = "";
						break;
					case "lb":
						g = j = "";
						break;
					case "rt":
						i = k = "";
						break;
					case "rb":
						g = i = "";
						break;
					case "c":
					default:
						g = (n.height - m) / 2 + c[1];
						i = (n.width - l) / 2 + c[0];
						k = j = ""
					}
				}
				if (b == "c") {
					g < o && (g = o);
					i < p && (i = p)
				}
				q.push("position", d).push("top", g + "px").push("left", i + "px").push("right", j + "px").push("bottom", k + "px");
				a.style.cssText = q.getCss()
			}
		}
		function i(a) {
			a = e.core.arr.isArray(a) ? a : [0, 0];
			for (var b = 0; b < 2; b++) typeof a[b] != "number" && (a[b] = 0);
			return a
		}
		function h(a) {
			return e.core.dom.getStyle(a, "display") != "none"
		}
		var e = d("/core/theia") || STK,
			f = !(e.core.util.browser.IE6 || document.compatMode !== "CSS1Compat" && e.IE),
			g = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
		a.exports = function(a, b, c) {
			var d, h, k = !0,
				l;
			if (e.core.dom.isNode(a) && g.test(b)) {
				var m = {
					getNode: function() {
						return a
					},
					isFixed: function() {
						return k
					},
					setFixed: function(b) {
						(k = !! b) && j(a, d, h);
						return this
					},
					setAlign: function(b, c) {
						if (g.test(b)) {
							d = b;
							h = i(c);
							k && j(a, d, h)
						}
						return this
					},
					destroy: function() {
						f || f && e.core.evt.removeEvent(window, "scroll", n);
						e.core.evt.removeEvent(window, "resize", n);
						e.core.evt.custEvent.undefine(l)
					}
				};
				l = e.core.evt.custEvent.define(m, "beforeFix");
				m.setAlign(b, c);

				function n(b) {
					b = b || window.event;
					e.core.evt.custEvent.fire(l, "beforeFix", b.type);
					k && (!f || d == "c") && j(a, d, h)
				}
				f || e.core.evt.addEvent(window, "scroll", n);
				e.core.evt.addEvent(window, "resize", n);
				return m
			}
		}
	},
	"/core/utils/language": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		window.$LANG || (window.$LANG = {});
		a.exports = function(a) {
			var b = [].splice.call(arguments, 1, arguments.length),
				c = [a, $LANG].concat(b),
				d = e.core.util.language.apply(this, c);
			return d
		}
	},
	"/core/utils/layoutPos": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		a.exports = function(a, b, c) {
			if (!e.isNode(b)) throw "kit.dom.layerOutElement need element as first parameter";
			if (b === document.body) return !1;
			if (!b.parentNode) return !1;
			if (b.style.display === "none") return !1;
			var d, f, g, h, i, j, k, l;
			d = e.parseParam({
				pos: "left-bottom",
				offsetX: 0,
				offsetY: 0,
				appendTo: undefined
			}, c);
			if (d.appendTo) {
				j = e.getStyle(d.appendTo, "position");
				l = d.appendTo === document.body || j === "absolute" || j === "fixed" || j === "relative";
				l || (d.appendTo = undefined)
			}
			if (d.appendTo) {
				f = d.appendTo;
				f.appendChild(a)
			} else {
				f = b;
				if (!f) return !1;
				while (f !== document.body) {
					f = f.parentNode;
					if (f.style.display === "none") return !1;
					j = e.getStyle(f, "position");
					k = f.getAttribute("layout-shell");
					if (j === "absolute" || j === "fixed") {
						if (k === "false") continue;
						break
					}
					if (k === "true" && j === "relative") break
				}
				f.appendChild(a)
			}
			g = e.position(b, {
				parent: f
			});
			h = {
				w: b.offsetWidth,
				h: b.offsetHeight
			};
			i = d.pos.split("-");
			i[0] === "left" ? a.style.left = g.l + d.offsetX + "px" : i[0] === "right" ? a.style.left = g.l + h.w + d.offsetX + "px" : i[0] === "center" && (a.style.left = g.l + h.w / 2 + d.offsetX + "px");
			i[1] === "top" ? a.style.top = g.t + d.offsetY + "px" : i[1] === "bottom" ? a.style.top = g.t + h.h + d.offsetY + "px" : i[1] === "middle" && (a.style.top = g.t + h.h / 2 + d.offsetY + "px");
			return !0
		}
	},
	"/core/utils/merge": function(a, b, c, d) {
		a.exports = function(a, b) {
			var c = {};
			for (var d in a) c[d] = a[d];
			for (var d in b) c[d] = b[d];
			return c
		}
	},
	"/core/utils/parseDOM": function(a, b, c, d) {
		a.exports = function(a) {
			for (var b in a) a[b] && a[b].length == 1 && (a[b] = a[b][0]);
			return a
		}
	},
	"/core/utils/proxy": function(a, b, c, d) {
		function e(a, b) {
			var c = [].slice.call(arguments, 2);
			return function() {
				return a.apply(b, [].slice.call(arguments).concat(c))
			}
		}
		a.exports = e
	},
	"/core/utils/rects": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = e.core.util.browser,
			g = {},
			h = 5,
			i = 20,
			j = {
				t: function(a, b) {
					return a.t > b.h
				},
				b: function(a, b) {
					return a.b > b.h
				},
				l: function(a, b) {
					return a.l > b.w
				},
				r: function(a, b) {
					return a.r > b.w
				}
			},
			k = {
				domSize: function(a) {
					var b = e.core.dom.getSize(a);
					return {
						w: Math.max(b.width, e.getStyle(a, "width").replace(/px|auto/gi, "")),
						h: Math.max(b.height, e.getStyle(a, "height").replace(/px|auto/gi, ""))
					}
				},
				mouseXY: function(a) {
					var b = {
						x: a.pageX,
						y: a.pageY
					};
					if (f.IE6 || f.IE7) {
						var c = e.core.util.scrollPos();
						b.x = b.x + c.left;
						b.y = b.y + c.top
					}
					return b
				},
				getRows: function(a) {
					var b = a.getClientRects();
					if (f.IE6 || f.IE7) {
						var c = [],
							d = {},
							e;
						for (var g = 0, h = b.length; g < h; g++) {
							var i = b[g];
							d[i.top] || (d[i.top] = []);
							d[i.top].push(i)
						}
						for (var j in d) {
							var k = d[j],
								h = k.length,
								l = k[0];
							h > 1 && (l.right = k[h - 1].right);
							c.push(l)
						}
						b = c
					}
					return b
				},
				getTextRect: function(a, b) {
					var c = e.parseParam({
						evt: ""
					}, b),
						d = e.core.util.scrollPos(),
						f;
					if (!a.getClientRects) {
						var g = k.domSize(a);
						return {
							width: g.w,
							height: g.h,
							left: "",
							right: "",
							top: "",
							bottom: ""
						}
					}
					var h = {
						rows: k.getRows(a)
					},
						i = k.mouseXY(c.evt),
						j = {
							x: i.x - d.left,
							y: i.y - d.top
						};
					for (var l = 0, m = h.rows.length; l < m; l++) {
						var n = h.rows[l];
						l == 0 && (f = n);
						if (j.y > n.top && j.y < n.bottom) {
							f = n;
							break
						}
					}
					if (e.IE) {
						var g = k.domSize(a);
						f = e.parseParam({
							width: g.w,
							height: g.h,
							left: "",
							right: "",
							top: "",
							bottom: ""
						}, f)
					}
					return f
				},
				getDistance: function(a, b) {
					var c = e.core.util.winSize(),
						d = k.getTextRect(a, b);
					return {
						win: c,
						rect: d,
						w: d.width,
						h: d.height,
						t: d.top,
						l: d.left,
						r: c.width - d.right,
						b: c.height - d.bottom
					}
				},
				getSeat: function(a, b, c) {
					var d = e.parseParam({
						distance: i,
						priority: "trbl"
					}, c),
						f = k.getDistance(a, c),
						g = k.domSize(b);
					f.area = "b";
					var h = d.priority.split("");
					for (var l = 0, m = h.length; l < m; l++) {
						var n = h[l];
						if (!j[n]) throw 'priority error, random use "tbrl" combination';
						if (j[n](f, g)) {
							f.area = n;
							break
						}
					}
					return f
				},
				setArrow: function(a) {
					var b = e.parseParam({
						evt: "",
						node: "",
						layer: "",
						arrow: "",
						priority: "trbl",
						css_t: "W_arrow_bor W_arrow_bor_b",
						css_r: "W_arrow_bor W_arrow_bor_l",
						css_b: "W_arrow_bor W_arrow_bor_t",
						css_l: "W_arrow_bor W_arrow_bor_r",
						offset: h,
						distance: 0
					}, a);
					if (!b.node) throw "target node is undefined";
					if (!b.layer) throw "layer node is undefined";
					if (!b.arrow) throw "arrow node is undefined";
					var c = k.getSeat(b.node, b.layer, b),
						d = c.area,
						f = c.rect;
					b.arrow.className = b["css_" + d];
					b.arrow.style.cssText = "";
					var g = k.domSize(b.layer),
						i = e.winSize().width,
						j = e.winSize().height,
						l = e.scrollPos();
					window.navigator.userAgent.indexOf("iPad") > -1 && window.navigator.userAgent.indexOf("Version/7.0") > -1 && (l.top = 0);
					var m = 5,
						n = 16,
						o, p, q, r, s, t, u = 0;
					if (d == "t" || d == "b") {
						b.distance += (f.right - f.left) / 2;
						f.left < i / 3 ? u = (.5 - 1 / 3) * g.w : f.left > i / 3 * 2 && (u = (.5 - 2 / 3) * g.w);
						f.left + b.distance + g.w / 2 + u > i - m * 2 ? q = l.left + i - m - g.w : f.left + b.distance - g.w / 2 + u < m ? q = l.left + m : q = l.left + f.left + b.distance - g.w / 2 + u;
						d == "t" ? r = f.top + l.top - b.offset - g.h : d == "b" && (r = f.bottom + l.top + b.offset);
						s = f.left + l.left + b.distance - q - n / 2
					}
					if (d == "l" || d == "r") {
						if (f.left < i / 2) {
							d = "r";
							b.arrow.className = b["css_" + d]
						} else if (f.left > i / 2) {
							d = "l";
							b.arrow.className = b["css_" + d]
						}
						b.distance += (f.bottom - f.top) / 2;
						f.top < j / 3 ? u = (.5 - 1 / 3) * g.h : f.top > j / 3 * 2 && (u = (.5 - 2 / 3) * g.h);
						f.top + b.distance + g.h / 2 + u > j - m * 2 ? r = l.top + j - m - g.h : f.top + b.distance - g.h / 2 + u < m ? r = l.top + m : r = f.top + l.top + b.distance - g.h / 2 + u;
						d == "l" ? q = f.left + l.left - b.offset - g.w : d == "r" && (q = f.right + l.left + b.offset);
						t = f.top + l.top + b.distance - r - n / 2
					}
					b.layer.style.left = q + "px";
					b.layer.style.top = r + "px";
					if (s != undefined) {
						s < 10 && (s = 10);
						s > g.w - n - 10 && (s = g.w - n - 10);
						b.arrow.style.left = s + "px"
					} else if (t != undefined) {
						t < 0 && (t = 0);
						t > g.h && (t = g.h);
						b.arrow.style.top = t + "px"
					}
					return d
				},
				setLayer: function(a) {
					var b = e.parseParam({
						evt: "",
						node: "",
						layer: "",
						priority: "btrl",
						offsetX: 0,
						offsetY: 0
					}, a);
					if (!b.node) throw "target node is undefined";
					if (!b.layer) throw "layer node is undefined";
					var c = k.getSeat(b.node, b.layer, b),
						d = c.area,
						f = c.rect,
						g = k.domSize(b.layer),
						h = e.scrollPos(),
						i, j, l, m = e.winSize().width,
						n = g.w;
					if (d == "t" || d == "b") {
						i = d == "t" ? f.top + h.top - g.h + b.offsetY : f.bottom + h.top - b.offsetY;
						j = f.left + h.left + b.offsetX;
						l = f.right + h.left - n + b.distance;
						l > 0 && j + n > m + h.left && (j = l)
					} else {
						i = f.top + h.top + b.offsetY;
						j = d == "r" ? f.right + h.left - b.offsetX : f.left + h.left - g.w + b.offsetX
					}
					b.layer.style.top = i + "px";
					b.layer.style.left = j + "px";
					return d
				}
			};
		g.getTextRect = k.getTextRect;
		g.getDistance = k.getDistance;
		g.getSeat = k.getSeat;
		g.setArrow = k.setArrow;
		g.setLayer = k.setLayer;
		a.exports = g
	},
	"/core/utils/smartInput": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = c("/core/utils/textSelection");
		a.exports = function(a, b) {
			var c, d, g, h, i, j, k, l, m, n = "stop",
				o, p, q, r, s;
			c = e.parseParam({
				notice: "",
				currentClass: null,
				noticeClass: null,
				noticeStyle: null,
				maxLength: null,
				needLazyInput: !1,
				LazyInputDelay: 200
			}, b);
			d = e.cascadeNode(a);
			i = f(a);
			e.custEvent.define(d, "enter");
			e.custEvent.define(d, "ctrlEnter");
			e.custEvent.define(d, "lazyInput");
			g = function() {
				c.maxLength && e.bLength(a.value) > c.maxLength && (a.value = e.leftB(a.value, c.maxLength))
			};
			p = function() {
				if (a.value === c.notice) {
					a.value = "";
					c.noticeClass != null && e.removeClassName(a, c.noticeClass)
				}
				c.currentClass != null && e.addClassName(a.parentNode, c.currentClass)
			};
			q = function() {
				if (a.value === "") {
					a.value = c.notice;
					c.noticeClass != null && e.addClassName(a, c.noticeClass)
				}
				c.currentClass != null && e.removeClassName(a.parentNode, c.currentClass)
			};
			h = function() {
				g();
				return a.value === c.notice ? "" : a.value
			};
			r = function(a) {
				a.keyCode === 13 && e.custEvent.fire(d, "enter", h())
			};
			s = function(a) {
				(a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey && e.custEvent.fire(d, "ctrlEnter", h())
			};
			j = function() {
				if (n === "stop") {
					m = setInterval(l, c.LazyInputDelay);
					n = "sleep"
				}
			};
			k = function() {
				clearInterval(m);
				n = "stop"
			};
			l = function() {
				if (o === a.value) if (n === "weakup") {
					e.custEvent.fire(d, "lazyInput", a.value);
					n = "sleep"
				} else n === "waiting" && (n = "weakup");
				else n = "waiting";
				o = a.value
			};
			if (c.needLazyInput) {
				e.addEvent(a, "focus", j);
				e.addEvent(a, "blur", k)
			}
			e.addEvent(a, "focus", p);
			e.addEvent(a, "blur", q);
			e.addEvent(a, "keyup", g);
			e.addEvent(a, "keydown", r);
			e.addEvent(a, "keydown", s);
			d.getValue = h;
			d.setValue = function(b) {
				a.value = b;
				g();
				return d
			};
			d.setNotice = function(a) {
				c.notice = a;
				return d
			};
			d.setNoticeClass = function(a) {
				c.noticeClass = a;
				return d
			};
			d.setNoticeStyle = function(a) {
				c.noticeStyle = a;
				return d
			};
			d.setMaxLength = function(a) {
				c.maxLength = a;
				return d
			};
			d.restart = function() {
				q()
			};
			d.startLazyInput = j;
			d.stopLazyInput = k;
			d.setCursor = i.setCursor;
			d.getCursor = i.getCursor;
			d.insertCursor = i.insertCursor;
			d.insertText = i.insertText;
			d.destroy = function() {
				if (c.needLazyInput) {
					e.removeEvent(a, "focus", p);
					e.removeEvent(a, "blur", q)
				}
				k();
				e.removeEvent(a, "focus", p);
				e.removeEvent(a, "blur", q);
				e.removeEvent(a, "keyup", g);
				e.removeEvent(a, "keydown", r);
				e.removeEvent(a, "keydown", s);
				e.custEvent.undefine(d, "enter");
				e.custEvent.undefine(d, "ctrlEnter");
				e.custEvent.undefine(d, "lazyInput");
				i.destroy();
				d = null
			};
			return d
		}
	},
	"/core/utils/textSelection": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		a.exports = function(a, b) {
			var c, d;
			c = {};
			d = e.parseParam({}, b);
			var f = function(b) {
					return e.core.dom.selectText(a, b)
				},
				g = function() {
					a.__areaQuery = e.jsonToQuery(e.core.dom.textSelectArea(a))
				},
				h = function() {
					a.__areaQuery = !1
				};
			e.addEvent(a, "beforedeactivate", g);
			e.addEvent(a, "active", h);
			var i = function() {
					var b = null;
					try {
						b = e.core.dom.textSelectArea(a)
					} catch (c) {
						b = e.queryToJson(a.__areaQuery)
					}
					b.start === 0 && b.len === 0 && a.__areaQuery && (b = e.queryToJson(a.__areaQuery));
					b.start = parseInt(b.start, 10);
					b.len = parseInt(b.len, 10);
					return b
				},
				j = function(b, c) {
					var d = a.value,
						e = c.start,
						f = c.len || 0,
						g = d.slice(0, e),
						h = d.slice(e + f, d.length);
					a.value = g + b + h;
					d = null;
					g = null;
					h = null;
					var e = null,
						f = null
				};
			c.setCursor = function(a) {
				f(a)
			};
			c.getCursor = function() {
				return i()
			};
			c.insertCursor = function(a) {
				var b = i();
				j(a, b);
				b.len = a.length;
				f(b)
			};
			c.TempletCursor = function(b) {
				var c, d, g;
				c = i();
				c.len > 0 ? d = a.value.substr(c.start, c.len) : d = "";
				g = e.templet(b, {
					origin: d
				});
				j(g, c);
				c.start = c.start + b.indexOf("#{origin");
				c.len = g.length - b.replace(/#\{[origin].+?\}/, "").length;
				f(c)
			};
			c.insertText = j;
			c.destroy = function() {
				e.removeEvent(a, "beforedeactivate", g);
				e.removeEvent(a, "active", h);
				a = null
			};
			return c
		}
	},
	"/core/utils/textareaUtils": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = {},
			g = document.selection;
		f.selectionStart = function(a) {
			if (!g) try {
				return a.selectionStart
			} catch (b) {
				return 0
			}
			var c = g.createRange(),
				d, e, f = 0,
				h = document.body.createTextRange();
			try {
				h.moveToElementText(a)
			} catch (b) {}
			for (f; h.compareEndPoints("StartToStart", c) < 0; f++) h.moveStart("character", 1);
			return f
		};
		f.selectionBefore = function(a) {
			return a.value.slice(0, f.selectionStart(a))
		};
		f.selectText = function(a, b, c) {
			a.focus();
			if (!g) a.setSelectionRange(b, c);
			else {
				var d = a.createTextRange();
				d.collapse(1);
				d.moveStart("character", b);
				d.moveEnd("character", c - b);
				d.select()
			}
		};
		f.insertText = function(a, b, c, d) {
			a.focus();
			d = d || 0;
			if (!g) {
				var e = a.value,
					h = c - d,
					i = h + b.length;
				a.value = e.slice(0, h) + b + e.slice(c, e.length);
				f.selectText(a, i, i)
			} else {
				var j = g.createRange();
				j.moveStart("character", -d);
				j.text = b
			}
		};
		f.replaceText = function(a, b) {
			a.focus();
			var c = a.value,
				d = f.getSelectedText(a),
				e = d.length;
			if (d.length == 0) f.insertText(a, b, f.getCursorPos(a));
			else {
				var h = f.getCursorPos(a);
				if (!g) {
					var j = h + d.length;
					a.value = c.slice(0, h) + b + c.slice(h + e, c.length);
					f.setCursor(a, h + b.length);
					return
				}
				var i = g.createRange();
				i.text = b;
				f.setCursor(a, h + b.length)
			}
		};
		f.getCursorPos = function(a) {
			var b = 0;
			if (e.core.util.browser.IE) {
				a.focus();
				var c = null;
				c = g.createRange();
				var d = c.duplicate();
				d.moveToElementText(a);
				d.setEndPoint("EndToEnd", c);
				a.selectionStartIE = d.text.length - c.text.length;
				a.selectionEndIE = a.selectionStartIE + c.text.length;
				b = a.selectionStartIE
			} else if (a.selectionStart || a.selectionStart == "0") b = a.selectionStart;
			return b
		};
		f.getSelectedText = function(a) {
			var b = "",
				c = function(a) {
					return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
				};
			window.getSelection ? b = c(a) : b = g.createRange().text;
			return b
		};
		f.setCursor = function(a, b, c) {
			b = b == null ? a.value.length : b;
			c = c == null ? 0 : c;
			a.focus();
			if (a.createTextRange) {
				var d = a.createTextRange();
				d.move("character", b);
				d.moveEnd("character", c);
				d.select()
			} else a.setSelectionRange(b, b + c)
		};
		f.unCoverInsertText = function(a, b, c) {
			c = c == null ? {} : c;
			c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
			c.rccl = c.rccl == null ? 0 : c.rccl * 1;
			var d = a.value,
				e = d.slice(0, c.rcs),
				f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
			a.value = e + b + f;
			this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
		};
		a.exports = f
	},
	"/core/utils/setImmediate": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = function() {
				return window.setImmediate ? window.setImmediate : "onreadystatechange" in document.createElement("script") ?
				function(a) {
					function b() {
						c.onreadystatechange = null;
						e.removeNode(c);
						a()
					}
					var c = document.createElement("script");
					c.onreadystatechange = b;
					document.documentElement.appendChild(c)
				} : window.postMessage ?
				function(a) {
					function c(d) {
						if (d.data === b) {
							window.removeEventListener("message", c, !0);
							a()
						}
					}
					var b = "UI_setImmediate_" + e.getUniqueKey();
					window.addEventListener("message", c, !0);
					window.postMessage(b, "*")
				} : window.setTimeout
			}();
		a.exports = f
	},
	"/helpers/toFunction": function(a, b, c, d) {
		function p(a, b) {
			function c(c, d) {
				return new a(o(b, c, d))
			}
			c.constructor = a;
			return c
		}
		function o(a, b, c) {
			c = c || {};
			if (n(b) === m) return g(c, c);
			if (a === "alert" || a === "confirm" || a === "notice" || a === "tipAlert" || a === "tipConfirm") {
				if (n(b) === l) return g(c, b);
				c.notice = b;
				return c
			}
			if (n(b) === k && (b = h(b)) && b.indexOf("<") !== 0) {
				c.id = b;
				c.node = i(b);
				return c
			}
			if (n(b) === k && (b = h(b)) && b.indexOf("<") === 0) {
				c.template = b;
				return c
			}
			if (j(b)) {
				c.node = b;
				return c
			}
			return n(b) === l && !j(b) ? g(c, b) : c
		}
		function n(a) {
			return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.core.json.merge,
			h = e.trim,
			i = e.E,
			j = e.isNode,
			k = "string",
			l = "object",
			m = "undefined";
		a.exports = p
	},
	"/Class_mlayer": function(a, b, c, d) {
		function N(a) {
			var b = C(k(a));
			return {
				node: B(b.box),
				nodes: j(b.list)
			}
		}
		function M(a) {
			var b = document.createDocumentFragment();
			b.appendChild(a);
			return {
				node: a,
				nodes: j(C(b).list)
			}
		}
		function L(a, b) {
			a.style.top = b.top + "px";
			a.style.left = b.left + "px"
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = c("/templates/layer.html"),
			h = c("/css"),
			i = f.layoutPos,
			j = f.parseDOM,
			k = f.language,
			l = f.fix,
			m = f.drag,
			n = f.extend,
			o = f.proxy,
			p = f.setImmediate,
			q = e.addEvent,
			r = e.removeEvent,
			s = e.stopEvent,
			t = e.fixEvent,
			u = e.addClassName,
			v = e.removeClassName,
			w = e.custEvent,
			x = e.core.json.merge,
			y = e.core.dom.position,
			z = e.core.dom.getSize,
			A = e.core.dom.setXY,
			B = e.core.dom.firstChild,
			C = e.builder,
			D = e.removeNode,
			E = e.contains,
			F = e.core.util.winSize,
			G = e.core.util.scrollPos,
			H = e.delegatedEvent,
			I = e.isNode,
			J = "string",
			K = "node-type",
			O = c("/Class_base").extend({
				init: function(a) {
					O.__super__.init.apply(this, arguments);
					w.define(this, ["show", "shown", "beforeShow", "hide", "hidden", "beforeHide"]);
					var b = this._;
					b.node ? n(b, M(b.node)) : n(b, N(b.template));
					b.node.id = b.id;
					b.dEvent = H(b.node);
					if (b.draggable) {
						var c = b.draggable === !0 ? b.node : this.getDomList(!0)[b.draggable];
						c && (b.drag = m(c, {
							actObj: b.node,
							moveDom: b.node,
							pagePadding: b.draggPadding
						}))
					}
					if (b.stopClickPropagation) {
						b.proxyStopClickPropagation = function(a) {
							s(a)
						};
						q(b.node, "click", b.proxyStopClickPropagation)
					}
					b.proxyClickBlankToHide = o(function(a) {
						a = t(a);
						try {
							b.node != a.target && !E(b.node, a.target) && this.hide()
						} catch (a) {}
					}, this);
					if (b.heightWithAni) {
						u(b.node, "UI_autoHeight");
						u(this.getDomList(!0).autoHeight || b.node, "UI_autoHeightCtnt")
					}
				},
				startBoxClose: function() {
					var a = this._;
					a.clickBlankToHide = !0;
					if (this.getState()) {
						r(document, "click", a.proxyClickBlankToHide);
						q(document, "click", a.proxyClickBlankToHide)
					}
				},
				stopBoxClose: function() {
					var a = this._;
					a.clickBlankToHide = !1;
					r(document, "click", a.proxyClickBlankToHide)
				},
				on: function(a, b, c) {
					arguments.length > 2 ? this._.dEvent.add(a, b, c) : O.__super__.on.apply(this, arguments);
					return this
				},
				off: function(a, b, c) {
					arguments.length > 2 ? this._.dEvent.remove(a, b, c) : O.__super__.off.apply(this, arguments);
					return this
				},
				trigger: function(a, b, c) {
					I(a) ? this._.dEvent.fireDom(a, b, c) : O.__super__.trigger.apply(this, arguments);
					return this
				},
				dEvent: function() {
					return this._.dEvent
				},
				autoHeight: function(a) {
					if (this._.heightWithAni) {
						function b() {
							r(c, h.transitionend, b);
							r(d, h.transitionend, b);
							clearTimeout(i);
							v(c, "UI_autoHeight_animated");
							v(d, "UI_autoHeight_animated")
						}
						var c = this._.node,
							d = this.getDomList(!0).autoHeight || c,
							e = d.offsetHeight,
							f;
						d.style.height = "auto";
						f = d.offsetHeight;
						d.style.height = "auto";
						d.style.height = e + "px";
						var g, i;
						switch (a) {
						case "top":
							g = 0;
							break;
						case "bottom":
							g = e - f;
							break;
						case "center":
						case "middle":
						default:
							g = (e - f) / 2
						}
						setTimeout(function() {
							u(c, "UI_autoHeight_animated");
							u(d, "UI_autoHeight_animated");
							q(c, h.transitionend, b);
							q(d, h.transitionend, b);
							i = setTimeout(b, 250);
							c.style.top = parseInt(c.style.top) + g + "px";
							d.style.height = f + "px"
						}, 10)
					}
					return this
				},
				show: function(a) {
					var b = this._;
					if ( !! b) {
						a = I(a) ? a : b.node;
						r(document, "click", b.proxyClickBlankToHide);
						this.trigger("beforeShow");
						delete b.hidding;
						b.appendTo.appendChild(a);
						this.trigger("show");
						if (b.showWithAni) {
							var c = b.showWithAni.split(":");
							h.effect(b.node, c[0], c[1], o(function() {
								this.trigger("shown")
							}, this))
						} else this.trigger("shown");
						if (b.heightWithAni) {
							var d = this.getDomList(!0).autoHeight || b.node;
							if (d) {
								d.style.height = "auto";
								d.style.height = d.offsetHeight + "px"
							}
						}
						b.clickBlankToHide && setTimeout(o(function() {
							q(document, "click", b.proxyClickBlankToHide)
						}, this), 100);
						return this
					}
				},
				hide: function(a) {
					var b = this._;
					if ( !! b) {
						a = I(a) ? a : b.node;
						this.trigger("beforeHide");
						b.hidding = !0;
						var c = o(function() {
							if (b.hidding === !0) {
								D(a);
								delete b.hidding
							}
							this.trigger("hidden")
						}, this);
						if (b.hideWithAni) {
							var d = b.hideWithAni.split(":");
							h.effect(b.node, d[0], d[1], c);
							this.trigger("hide")
						} else {
							this.trigger("hide");
							p(c)
						}
						b.clickBlankToHide && r(document, "click", b.proxyClickBlankToHide);
						b.autoRelease && setTimeout(o(this.destroy, this), 5e3);
						return this
					}
				},
				setTop: function(a) {
					return this.show(a)
				},
				getDomList: function(a) {
					var b = this._;
					if (a) {
						var c = b.node.getAttribute(K),
							d = C(b.node).list;
						c && (d[c] === undefined ? d[c] = [b.node] : d[c].push(b.node));
						b.nodes = j(d)
					}
					return b.nodes
				},
				getState: function() {
					return !!this._ && E(document.body, this._.node) && this._.node.style.visibility != "hidden"
				},
				getID: function() {
					return this._.node.id
				},
				getOuter: function() {
					return this._.node
				},
				getBox: function() {
					return this._.node
				},
				html: function(a, b) {
					b = b || this._.node;
					b.innerHTML = "";
					typeof a === J ? b.innerHTML = a || "" : b.appendChild(a);
					return this
				},
				setPosition: function(a) {
					a.top = a.t = a.top || a.t || 0;
					a.left = a.l = a.left || a.l || 0;
					this._.node.parentNode === document.body ? L(this._.node, a) : A(this._.node, a);
					return this
				},
				getPosition: function(a) {
					var b = this._,
						c = z(b.node),
						d = y(b.node);
					switch (a) {
					case "topright":
						d.l = d.left = d.left + c.width;
						break;
					case "bottomleft":
						d.t = d.top = d.top + c.height;
						break;
					case "bottomright":
						d.l = d.left = d.left + c.width;
						d.t = d.top = d.top + c.height;
						break;
					default:
					}
					return d
				},
				setLayoutPos: function(a, b) {
					i(this._.node, a, b);
					return this
				},
				beside: function(a, b) {
					b = b || {};
					var c = b.pos || "bottom-middle",
						d = c.split("-"),
						e = this.getSize(),
						f = d[0],
						g = d[1],
						h = b.offsetX || 0,
						i = b.offsetY || 0;
					switch (f) {
					case "top":
						i -= e.height;
						break;
					case "left":
						h -= e.width
					}
					switch (g) {
					case "right":
						if (f === "top" || f === "bottom") h -= e.width;
						break;
					case "bottom":
						if (f === "left" || f === "right") i -= e.height;
						break;
					case "middle":
						if (f === "left" || f === "right") i -= e.height / 2;
						if (f === "top" || f === "bottom") h -= e.width / 2
					}
					c = {
						"top-left": "left-top",
						"top-right": "right-top",
						"top-middle": "center-top",
						"top-center": "center-top",
						"right-top": "right-top",
						"right-bottom": "right-bottom",
						"right-middle": "right-middle",
						"right-center": "right-middle",
						"bottom-left": "left-bottom",
						"bottom-right": "right-bottom",
						"bottom-middle": "center-bottom",
						"bottom-center": "center-bottom",
						"left-top": "left-top",
						"left-bottom": "left-bottom",
						"left-middle": "left-middle",
						"left-center": "left-middle"
					}[c];
					return this.setLayoutPos(a, {
						pos: c,
						offsetX: h,
						offsetY: i,
						appendTo: b.appendTo
					})
				},
				setMiddle: function() {
					var a = F(),
						b = this.getSize(),
						c = G(),
						d = Math.max((a.height - b.height) / 2, 0) + c.top,
						e = Math.max((a.width - b.width) / 2, 0) + c.left;
					return this.setPosition({
						top: d,
						left: e
					})
				},
				setAlign: function(a) {
					a = x({
						type: "c",
						offset: [0, 0]
					}, a);
					this._.domFix = l(this._.node, a.type, a.offset);
					return this
				},
				getSize: function() {
					return z(this._.node)
				},
				setIndex: function(a) {
					this._.node.style.zIndex = a;
					return this
				},
				destroy: function() {
					var a = this._;
					if (a) {
						a.node && D(a.node);
						a.dEvent && a.dEvent.destroy();
						a.domFix && a.domFix.destroy();
						a.drag && a.drag.destroy();
						this._.proxyStopClickPropagation && r(a.node, "click", this._.proxyStopClickPropagation);
						this._.proxyClickBlankToHide && r(document, "click", this._.proxyClickBlankToHide);
						a.domFix = a.drag = a.dEvent = null;
						O.__super__.destroy.apply(this, arguments)
					}
				}
			});
		O.defalutOpts = n({}, O.defalutOpts, {
			id: "layer_" + e.core.util.getUniqueKey(),
			node: null,
			template: g,
			appendTo: document.body,
			draggable: !1,
			draggPadding: [5, 5, 5, 5],
			showWithAni: "fadeInDown:fast",
			hideWithAni: "fadeOutUp:fast",
			heightWithAni: !1,
			stopClickPropagation: !1,
			clickBlankToHide: !1,
			autoRelease: !1
		});
		a.exports = O
	},
	"/templates/layer.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer"></div>'
	},
	"/Class_base": function(a, b, c, d) {
		function k() {
			this.init.apply(this, arguments)
		}
		function j(a, b) {
			var c = this,
				d;
			a && a.hasOwnProperty("constructor") ? d = a.constructor : d = function() {
				return c.apply(this, arguments)
			};
			h(d, c, b);
			var e = function() {
					this.constructor = d
				};
			e.prototype = c.prototype;
			d.prototype = new e;
			a && h(d.prototype, a);
			d.__super__ = c.prototype;
			return d
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.core.json.merge,
			h = f.extend,
			i = e.custEvent;
		h(k.prototype, {
			init: function(a) {
				this._ = g(this.constructor.defalutOpts, a)
			},
			destroy: function() {
				i.undefine(this);
				this._ = null
			}
		}, {
			on: function(a, b) {
				i.define(this, a);
				i.add(this, a, b);
				return this
			},
			once: function(a, b) {
				i.define(this, a);
				i.once(this, a, b);
				return this
			},
			off: function(a, b) {
				i.remove(this, a, b);
				return this
			},
			trigger: function(a, b) {
				i.fire(this, a, b);
				return this
			}
		});
		k.extend = j;
		k.defalutOpts = {};
		a.exports = k
	},
	"/Class_layer": function(a, b, c, d) {
		function D() {
			q(w, y)
		}
		function C() {
			p(w, y)
		}
		function B() {
			return r(w, y)
		}
		function A() {
			var a;
			while (a = v[v.length - 1]) {
				if (a && a.getState()) return a;
				a.pop()
			}
			return null
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = c("/mask"),
			h = c("/css"),
			i = e.C,
			j = e.builder,
			k = e.core.dom.firstChild,
			l = e.scrollPos,
			m = e.removeNode,
			n = e.foreach,
			o = e.arrIndexOf,
			p = e.addClassName,
			q = e.removeClassName,
			r = e.core.dom.hasClassName,
			s = e.hotKey,
			t = f.extend,
			u = f.proxy,
			v = [],
			w = document.body,
			x = document.documentElement,
			y = "UI_freezed",
			z = "px";
		s.add(document.documentElement, "esc", function() {
			var a = A();
			a && a.hide()
		}, {
			type: "keyup",
			disableInInput: !0
		});
		var E = c("/Class_mlayer").extend({
			init: function() {
				E.__super__.init.apply(this, arguments);
				this.on("show", u(function() {
					this._.showWithSetMiddle && this.setMiddle();
					this._.needMask && g.showUnderNode(this._.node)
				}, this));
				this.on("beforeShow", function() {
					this._.lastFocus = document.activeElement
				});
				this.on("hidden", function() {
					this._.lastFocus.focus();
					delete this._.lastFocus
				})
			},
			show: function() {
				E.__super__.show.apply(this, arguments);
				if (!this._.focusNode) {
					this._.focusNode = i("div");
					this._.focusNode.setAttribute("tabIndex", "0")
				}
				this._.node.firstChild ? this._.node.insertBefore(this._.focusNode, this._.node.firstChild).focus() : this._.node.appendChild(this._.focusNode).focus();
				v.push(this);
				return this
			},
			hide: function() {
				var a = this.getState();
				E.__super__.hide.apply(this, arguments);
				if (a) {
					this._.needMask && g.back();
					v.splice(o(this, v), 1)
				}
				return this
			},
			setTop: function() {
				return E.__super__.setTop.apply(this, [this._.frame])
			},
			isFreeze: function() {
				return r(this._.frame, y)
			},
			freeze: function() {
				var a = this._.frame;
				if (this.isFreeze() !== !0 && !$IE6) {
					a.style.top = -scrollTop(a) + z;
					p(a, y);
					setScrollTop(a, 0);
					return this
				}
			},
			unfreeze: function() {
				var a = this._.frame,
					b;
				if (this.isFreeze() !== !1 && !$IE6) {
					b = -parseInt(a.style.top);
					q(a, y);
					a.style.top = "";
					setScrollTop(a, b);
					return this
				}
			}
		});
		E.defalutOpts = t({}, E.defalutOpts, {
			needMask: !0,
			showWithAni: "bounceIn:fast",
			hideWithAni: "bounceOut:fast",
			showWithSetMiddle: !0
		});
		a.exports = E
	},
	"/mask": function(a, b, c, d) {
		function t(a) {
			var b;
			(b = a.getAttribute(m)) || a.setAttribute(m, b = e.getUniqueKey());
			return a.tagName.toLowerCase() + "[" + m + '="' + b + '"]'
		}
		function s(a, b) {
			var c;
			(c = a.getAttribute(n)) || a.setAttribute(n, c = e.jsonToQuery(b));
			return e.queryToJson(c)
		}
		function r() {
			i = e.C("div");
			var a = '<div node-type="outer">';
			e.core.util.browser.IE6 && (a += '<div style="position:absolute;width:100%;height:100%;"></div>');
			a += "</div>";
			i = e.builder(a).list.outer[0];
			//document.body.appendChild(i);
			l = !0;
			k = g(i, "lt");
			var b = function() {
					var a = e.core.util.winSize();
					i.style.cssText = e.core.dom.cssText(i.style.cssText).push("width", a.width + 20 + "px").push("height", a.height + "px").getCss()
				};
			q.add(k, "beforeFix", b);
			b()
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = f.fix,
			h, i, j = [],
			k, l = !1,
			m = "stk-mask-key",
			n = "stk-mask-options-key",
			o = e.core.dom.setStyle,
			p = e.core.dom.getStyle,
			q = e.core.evt.custEvent,
			u = {
				getNode: function() {
					return i
				},
				show: function(a, b) {
					clearTimeout(h);
					if (l) {
						a = e.core.obj.parseParam({
							opacity: .3,
							background: "#000000",
							zIndex: "999"
						}, a);
						i.style.background = a.background;
						o(i, "opacity", a.opacity);
						o(i, "zIndex", a.zIndex);
						i.style.display = "";
						k.setAlign("lt");
						b && b(a)
					} else {
						r();
						u.show(a, b)
					}
					return u
				},
				hide: function() {
					h = setTimeout(function() {
						i.style.display = "none"
					}, 10);
					j = [];
					return u
				},
				showUnderNode: function(a, b) {
					e.isNode(a) && u.show(b, function(b) {
						s(a, b);
						o(i, "zIndex", p(a, "zIndex"));
						var c = t(a),
							d = e.core.arr.indexOf(c, j);
						d != -1 && j.splice(d, 1);
						j.push(c);
						e.core.dom.insertElement(a, i, "beforebegin")
					});
					return u
				},
				back: function() {
					if (j.length < 1) return u;
					var a, b;
					j.pop();
					if (j.length < 1) u.hide();
					else if ((b = j[j.length - 1]) && (a = e.sizzle(b, document.body)[0])) {
						var c = s(a);
						o(i, "zIndex", p(a, "zIndex"));
						o(i, "opacity", c.opacity);
						e.core.dom.insertElement(a, i, "beforebegin")
					} else u.back();
					return u
				},
				resetSize: function() {
					var a = e.core.util.winSize();
					i.style.cssText = e.core.dom.cssText(i.style.cssText).push("width", a.width + "px").push("height", a.height + 22 + "px").getCss();
					return u
				},
				destroy: function() {
					q.remove(k);
					i.style.display = "none"
				}
			};
		a.exports = u
	},
	"/Class_dialog": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.IE,
			h = f.extend,
			i = c("/templates/dialog.html"),
			j = f.proxy,
			k = e.addEvent,
			l = e.removeEvent,
			m = e.core.json.merge,
			n = e.core.dom.insertElement,
			o = c("/Class_layer").extend({
				init: function(a) {
					o.__super__.init.apply(this, arguments);
					this._.title && this.setTitle(this._.title);
					this._.content && this.setContent(this._.content);
					this._.proxyClose = j(this.hide, this);
					this.getDomList().close && k(this.getDomList().close, "click", this._.proxyClose)
				},
				setTitle: function(a) {
					return this.html(a || "", this.getDomList(!0).title)
				},
				setContent: function(a) {
					return this.html(a || "", this.getDomList(!0).inner)
				},
				appendChild: function(a) {
					this.getDomList(!0).inner.appendChild(a);
					return this
				},
				insertElement: function(a, b) {
					n(this.getDomList(!0).inner, a, b);
					return this
				},
				hide: function() {
					if (this.getState() && typeof this._.beforeHideFn == "function" && this._.beforeHideFn() === !1) return !1;
					return o.__super__.hide.apply(this, arguments)
				},
				clearContent: function() {
					return this.setContent("")
				},
				setBeforeHideFn: function(a) {
					this._.beforeHideFn = a;
					return this
				},
				clearBeforeHideFn: function() {
					this._.beforeHideFn = null;
					return this
				},
				rebindClose: function() {
					this.getDomList().close && l(this.getDomList().close, "click", this._.proxyClose);
					if (this.getDomList(!0).close) {
						l(this.getDomList().close, "click", this._.proxyClose);
						k(this.getDomList().close, "click", this._.proxyClose)
					}
					return this
				},
				destroy: function() {
					if (this._) {
						this.getDomList(!0).close && this._.proxyClose && l(this.getDomList().close, "click", this._.proxyClose);
						return o.__super__.destroy.apply(this, arguments)
					}
				}
			});
		o.defalutOpts = h({}, o.defalutOpts, {
			template: i,
			draggable: "title"
		});
		a.exports = o
	},
	"/templates/dialog.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer">\n\t<div class="content" node-type="autoHeight">\n\t\t<div node-type="title" class="W_layer_title"></div>\n\t\t<div class="W_layer_close"><a node-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner"></div>\n\t</div>\n</div>'
	},
	"/Class_alert": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.foreach,
			h = e.funcEmpty,
			i = e.custEvent,
			j = f.language,
			k = f.proxy,
			l = f.extend,
			m = c("/templates/alert.html"),
			n = c("/jsons/icons.json"),
			o = c("/helpers/render"),
			p = c("/Class_dialog").extend({
				init: function(a) {
					p.__super__.init.apply(this, arguments);
					i.define(this, ["ok"]);
					this._.textSmall && (this._.notice = [this._.notice, this._.textSmall]);
					this._.notice = [].concat(this._.notice);
					this.setTitle(this._.title);
					this.setNotice(this._.notice);
					this.setIcon(this._.icon);
					this.ok(this._.okText, this._.OK);
					this.on("ok", "click", k(function() {
						this._.alertIsOK = !0;
						this.hide()
					}, this));
					this.show()
				},
				setTitle: function(a) {
					p.__super__.setTitle.apply(this, arguments);
					this.getDomList().title.style.borderBottomStyle = a === "&nbsp;" ? "none" : "solid"
				},
				setNotice: function(a) {
					var b = "";
					g([].concat(a), function(a, c) {
						var d = c === 0 ? "S_txt1" : "S_txt2";
						b += o('<p class="{className}" style="text-align: center;">{text}</p>', {
							className: d,
							text: a || ""
						})
					});
					this.getDomList(!0).text.innerHTML = b;
					return this
				},
				setIcon: function(a) {
					this.getDomList(!0).icon.innerHTML = n[a] || "";
					return this
				},
				ok: function(a, b) {
					if (typeof a == "function") {
						b = a;
						a = undefined
					}
					typeof a == "string" && (this._.okText = "<span>" + a + "</span>");
					this.getDomList(!0).ok.innerHTML = this._.okText;
					this.on("ok", b || h);
					return this
				},
				show: function() {
					var a = p.__super__.show.apply(this, arguments);
					this.getDomList(!0).ok.focus();
					return a
				},
				hide: function() {
					this._.alertIsOK && this.trigger("ok");
					p.__super__.hide.apply(this, arguments);
					setTimeout(k(this.destroy, this), 2e3);
					return this
				}
			});
		p.defalutOpts = l({}, p.defalutOpts, {
			template: m,
			title: "&nbsp;",
			okText: j("确定"),
			icon: "succB"
		});
		a.exports = p
	},
	"/templates/alert.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer">\n\t<div class="content">\n\t\t<div node-type="title" class="W_layer_title"></div>\n\t\t<div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point" >\n\t\t\t\t<dl class="point clearfix">\n\t\t\t\t\t<dt node-type="icon"></dt>\n\t\t\t\t\t<dd node-type="text"></dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="W_layer_btn S_bg1">\n\t\t\t<a href="javascript:void(0);" class="W_btn_b btn_34px" action-type="ok" node-type="ok"></a>\n\t\t</div>\n\t</div>\n</div>'
	},
	"/jsons/icons.json": function(a, b, c, d) {
		a.exports = {
			succ: '<span class="W_icon icon_succ"></span>',
			succM: '<span class="W_icon icon_succM"></span>',
			succB: '<span class="W_icon icon_succB"></span>',
			delS: '<span class="W_icon icon_delS"></span>',
			delM: '<span class="W_icon icon_delM"></span>',
			delB: '<span class="W_icon icon_delB"></span>',
			errorS: '<span class="W_icon icon_errorS"></span>',
			errorM: '<span class="W_icon icon_errorM"></span>',
			errorB: '<span class="W_icon icon_errorB"></span>',
			askS: '<span class="W_icon icon_askS"></span>',
			questionM: '<span class="W_icon icon_questionM"></span>',
			questionB: '<span class="W_icon icon_questionB"></span>',
			warnS: '<span class="W_icon icon_warnS"></span>',
			warnM: '<span class="W_icon icon_warnM"></span>',
			warnB: '<span class="W_icon icon_warnB"></span>',
			rederrorS: '<span class="W_icon icon_rederrorS"></span>',
			rederrorM: '<span class="W_icon icon_rederrorM"></span>',
			rederrorB: '<span class="W_icon icon_rederrorB"></span>'
		}
	},
	"/helpers/render": function(a, b, c, d) {
		function e(a, b) {
			return a.replace(/\{([0-9a-zA-Z_]+)\}/g, function(a, c) {
				return b[c]
			})
		}
		a.exports = e
	},
	"/Class_confirm": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.foreach,
			h = e.custEvent,
			i = e.funcEmpty,
			j = f.language,
			k = f.proxy,
			l = f.extend,
			m = c("/templates/confirm.html"),
			n = c("/jsons/icons.json"),
			o = c("/helpers/render"),
			p = c("/Class_dialog").extend({
				init: function() {
					p.__super__.init.apply(this, arguments);
					h.define(this, ["ok", "cancel"]);
					this._.textSmall && (this._.notice = [this._.notice, this._.textSmall]);
					this._.notice = [].concat(this._.notice);
					this.setTitle(this._.title);
					this.setNotice(this._.notice);
					this.setIcon(this._.icon);
					this.ok(this._.okText, this._.OK);
					this.cancel(this._.cancelText, this._.cancel);
					this.on("ok", "click", k(function() {
						this._.confirmIsOK = !0;
						this.hide()
					}, this));
					this.on("cancel", "click", k(this.hide, this));
					this.show()
				},
				setTitle: function(a) {
					p.__super__.setTitle.apply(this, arguments);
					this.getDomList().title.style.borderBottomStyle = a === "&nbsp;" ? "none" : "solid"
				},
				setNotice: function(a) {
					var b = "";
					g([].concat(a), function(a, c) {
						var d = c === 0 ? "S_txt1" : "S_txt2";
						b += o('<p class="{className}">{text}</p>', {
							className: d,
							text: a || ""
						})
					});
					this.getDomList(!0).text.innerHTML = b;
					return this
				},
				setIcon: function(a) {
					this.getDomList(!0).icon.innerHTML = n[a] || "";
					return this
				},
				ok: function(a, b) {
					if (typeof a == "function") {
						b = a;
						a = undefined
					}
					typeof a == "string" && (this._.okText = "<span>" + a + "</span>");
					this.getDomList(!0).ok.innerHTML = this._.okText;
					this.on("ok", b || i);
					return this
				},
				cancel: function(a, b) {
					if (typeof a == "function") {
						b = a;
						a = undefined
					}
					typeof a == "string" && (this._.cancelText = "<span>" + a + "</span>");
					this.getDomList(!0).cancel.innerHTML = this._.cancelText;
					this.on("cancel", b || i);
					return this
				},
				show: function() {
					var a = p.__super__.show.apply(this, arguments);
					this.getDomList(!0).ok.focus();
					return a
				},
				hide: function() {
					this._.confirmIsOK ? this.trigger("ok") : this.trigger("cancel");
					p.__super__.hide.apply(this, arguments);
					setTimeout(k(this.destroy, this), 2e3);
					return this
				}
			});
		p.defalutOpts = l({}, p.defalutOpts, {
			template: m,
			title: "&nbsp;",
			okText: j("确定"),
			cancelText: j("取消"),
			icon: "questionB"
		});
		a.exports = p
	},
	"/templates/confirm.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer">\n\t<div class="content">\n\t\t<div node-type="title" class="W_layer_title"></div>\n\t\t<div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point" >\n\t\t\t\t<dl class="point clearfix">\n\t\t\t\t\t<dt node-type="icon"></dt>\n\t\t\t\t\t<dd node-type="text"></dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="W_layer_btn S_bg1">\n\t\t\t<a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok" action-type="ok"></a>\n\t\t\t<a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel" action-type="cancel"></a>\n\t\t</div>\n\t</div>\n</div>\n'
	},
	"/Class_notice": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.foreach,
			h = e.funcEmpty,
			i = f.language,
			j = f.proxy,
			k = f.extend,
			l = c("/jsons/icons.json"),
			m = c("/templates/notice.html"),
			n = c("/helpers/render"),
			o = c("/Class_layer").extend({
				init: function(a) {
					o.__super__.init.apply(this, arguments);
					if (this._textLarge || this._textSmall) this._.notice = [this._textLarge, this._textSmall];
					this._.notice = [].concat(this._.notice);
					this.setNotice(this._.notice);
					this.setIcon(this._.icon);
					this.show().setMiddle();
					setTimeout(j(this.hide, this), this._.hideDelay)
				},
				setNotice: function(a) {
					var b = "";
					g([].concat(a), function(a, c) {
						var d = c === 0 ? "S_txt1" : "S_txt2";
						b += n('<p class="{className}">{text}</p>', {
							className: d,
							text: a || ""
						})
					});
					this.getDomList(!0).text.innerHTML = b;
					return this
				},
				setIcon: function(a) {
					this.getDomList(!0).icon.innerHTML = l[a] || "";
					return this
				},
				hide: function() {
					o.__super__.hide.apply(this, arguments);
					setTimeout(j(this.destroy, this), 2e3);
					return this
				}
			});
		o.defalutOpts = k({}, o.defalutOpts, {
			template: m,
			icon: "succB",
			hideDelay: 1e3
		});
		a.exports = o
	},
	"/templates/notice.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer">\n\t<div class="content">\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point" >\n\t\t\t\t<dl class="point clearfix">\n\t\t\t\t\t<dt node-type="icon"></dt>\n\t\t\t\t\t<dd node-type="text"></dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>'
	},
	"/Class_bubble": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.C,
			h = e.replaceNode,
			i = e.core.dom.getSize,
			j = e.isNode,
			k = e.funcEmpty,
			l = e.getStyle,
			m = e.position,
			n = e.contains,
			i = e.core.dom.getSize,
			o = e.core.dom.insertElement,
			p = e.removeEvent,
			q = e.addEvent,
			r = f.proxy,
			s = f.extend,
			t = c("/templates/bubble.html"),
			u = 14,
			v = c("/Class_mlayer").extend({
				init: function() {
					v.__super__.init.apply(this, arguments);
					this._.proxyClose = r(this.hide, this);
					this.getDomList().close && q(this.getDomList().close, "click", this._.proxyClose);
					this.on("show", r(function() {
						this._.showWithSetWidth && !this.getBox().style.width.length && this.fixWidth()
					}, this))
				},
				setContent: function(a) {
					return this.html(a || "", this.getDomList(!0).inner)
				},
				fixWidth: function() {
					var a = this.getBox();
					if (n(document.body, a)) {
						var b = e.C("span");
						h(b, a);
						document.body.appendChild(a);
						this.getBox().style.width = "";
						this.getBox().style.width = this.getBox().offsetWidth + 1 + "px";
						h(a, b)
					}
				},
				appendChild: function(a) {
					this.getDomList(!0).inner.appendChild(a);
					return this
				},
				insertElement: function(a, b) {
					o(this.getDomList(!0).inner, a, b);
					return this
				},
				clearContent: function() {
					return this.setContent("")
				},
				setArrow: function(a, b, c) {
					var d, e, f = this.getDomList(!0).arrow,
						g = this.getSize(),
						h = {
							left: "right",
							top: "bottom",
							right: "left",
							bottom: "top"
						};
					switch (a) {
					case "top":
						d = "W_arrow_bor W_arrow_bor_t";
						e = "left";
						break;
					case "right":
						d = "W_arrow_bor W_arrow_bor_r";
						e = "top";
						break;
					case "bottom":
						d = "W_arrow_bor W_arrow_bor_b";
						e = "left";
						break;
					case "left":
						d = "W_arrow_bor W_arrow_bor_l";
						e = "top"
					}
					if (d) {
						f.className = d;
						if (b !== undefined) {
							g = g[{
								left: "width",
								top: "height"
							}[e]];
							b = parseFloat(b);
							f.style.top = f.style.right = f.style.bottom = f.style.left = "";
							c && (e = h[e]);
							f.style[e] = Math.min(Math.max(b, 0), g - u) + "px";
							f.style[h[e]] = "auto"
						}
					}
					return this
				},
				beside: function(a, b) {
					b = b || {};
					var c = b.pos || "top-middle",
						d = c.split("-"),
						e = b.offsetX || 0,
						f = b.offsetY || 0,
						g, h, i = this.getSize();
					switch (d[0]) {
					case "top":
						g = "bottom";
						f -= u;
						switch (d[1]) {
						case "left":
							h = 10;
							break;
						case "right":
							h = -10;
							break;
						case "middle":
							h = (i.width - u) / 2
						}
						break;
					case "right":
						g = "left";
						e += u;
						switch (d[1]) {
						case "top":
							h = 10;
							break;
						case "bottom":
							h = -10;
							break;
						case "middle":
							h = (i.height - u) / 2
						}
						break;
					case "bottom":
						g = "top";
						f += u;
						switch (d[1]) {
						case "left":
							h = 10;
							break;
						case "right":
							h = -10;
							break;
						case "middle":
							h = (i.width - u) / 2
						}
						break;
					case "left":
						g = "right";
						e -= u;
						switch (d[1]) {
						case "top":
							h = 10;
							break;
						case "bottom":
							h = -10;
							break;
						case "middle":
							h = (i.height - u) / 2
						}
					}
					this.setArrow(g, Math.abs(h), h < 0);
					v.__super__.beside.apply(this, [a,
					{
						pos: c,
						offsetX: e,
						offsetY: f,
						appendTo: b.appendTo
					}]);
					return this
				},
				setAlignPos: function(a, b, c) {
					var d = this.getBox(),
						f = this.getDomList(!0).arrow;
					c = s({
						offset: {
							left: 0,
							top: 0
						},
						arrowOffset: 0,
						align: "left",
						fail: r(function() {
							this.beside(a, {
								pos: "bottom-middle"
							})
						}, this)
					}, c);
					if ( !! j(a) && !! j(b)) {
						var g = a,
							h;
						while (g !== document.body) {
							g = g.parentNode;
							if (g.style.display === "none") return !1;
							h = e.getStyle(g, "position");
							shellAttr = g.getAttribute("layout-shell");
							if (h === "absolute" || h === "fixed") {
								if (shellAttr === "false") continue;
								break
							}
							if (shellAttr === "true" && h === "relative") break
						}
						g.appendChild(d);
						h = m(g);
						h || (h = {
							l: 0,
							t: 0
						});
						var k = m(b),
							l = m(a),
							n = i(a),
							o = 6,
							p, q, t, v = c.offset,
							w = c.arrowOffset,
							x = i(d),
							y = i(b),
							z = 2;
						if (c.align === "left") {
							if (x.width < l.l - k.l + Math.ceil(n.width / 2)) {
								c.fail();
								return
							}
						} else if (k.l + y.width - l.l - Math.ceil(n.width / 2) > x.width) {
							c.fail();
							return
						}
						c.align === "left" ? p = k.l - z : c.align === "center" ? p = k.l + y.width - x.width / 2 + z : p = k.l + y.width - x.width + z;
						q = l.t + n.height + o;
						t = l.l + Math.ceil((n.width - u) / 2) - p;
						q -= h.t;
						p -= h.l;
						q += v.top;
						p += v.left;
						t += w;
						d.style.left = p + "px";
						d.style.top = q + "px";
						f && (f.style.left = t + "px");
						return this
					}
				},
				rebindClose: function() {
					this.getDomList().close && p(this.getDomList().close, "click", this._.proxyClose);
					if (this.getDomList(!0).close) {
						p(this.getDomList().close, "click", this._.proxyClose);
						q(this.getDomList().close, "click", this._.proxyClose)
					}
					return this
				},
				destroy: function() {
					if (this._) {
						this.getDomList(!0).close && this._.proxyClose && p(this.getDomList().close, "click", this._.proxyClose);
						return v.__super__.destroy.apply(this, arguments)
					}
				}
			});
		v.defalutOpts = s({}, v.defalutOpts, {
			template: t,
			showWithAni: "fadeInUp:fast",
			hideWithAni: "fadeOutDown:fast",
			showWithSetWidth: !0
		});
		a.exports = v
	},
	"/templates/bubble.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer W_layer_pop">\n\t<div class="content">\n\t<div class="W_layer_close"><a href="javascript:void(0)" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point"></div>\n\t\t</div>\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
	},
	"/Class_card": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = f.rects,
			h = f.setImmediate,
			i = f.proxy,
			j = f.extend,
			k = c("/css"),
			l = {
				t: ["showWithAniOnTop", "hideWithAniOnTop"],
				r: ["showWithAniOnRight", "hideWithAniOnRight"],
				b: ["showWithAniOnBottom", "hideWithAniOnBottom"],
				l: ["showWithAniOnLeft", "hideWithAniOnLeft"]
			},
			m = c("/Class_bubble").extend({
				showByTarget: function(a, b) {
					this._.lastTarget = a;
					var c = this.getState(),
						d, e;
					document.body.appendChild(this.getBox());
					this._.lastPos = d = g.setArrow({
						evt: b,
						node: a,
						layer: this.getBox(),
						arrow: this.getDomList(!0).arrow,
						priority: this._.priority
					});
					if (!c) {
						this._.showWithAni = this._[l[d] && l[d][0]];
						this.show()
					}
					return this
				},
				hide: function() {
					var a = l[this._.lastPos] && l[this._.lastPos][1];
					this._.hideWithAni = this._[a];
					m.__super__.hide.apply(this, arguments)
				},
				setPriority: function(a) {
					this._.priority = a;
					return this
				},
				lastTarget: function(a) {
					return this._.lastTarget
				}
			});
		m.defalutOpts = j({}, m.defalutOpts, {
			lastPos: null,
			lastTarget: null,
			priority: "tbrl",
			showWithAniOnTop: "fadeInUp:fast",
			showWithAniOnRight: "fadeInRight:fast",
			showWithAniOnBottom: "fadeInDown:fast",
			hideWithAniOnLeft: "fadeOutLeft:fast",
			hideWithAniOnTop: "fadeOutDown:fast",
			hideWithAniOnRight: "fadeOutLeft:fast",
			hideWithAniOnBottom: "fadeOutUp:fast",
			hideWithAniOnLeft: "fadeOutRight:fast"
		});
		a.exports = m
	},
	"/Class_tipAlert": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.foreach,
			h = e.funcEmpty,
			i = e.core.dom.uniqueID,
			j = f.language,
			k = f.proxy,
			l = f.extend,
			m = c("/templates/tipAlert.html"),
			n = c("/jsons/icons.json"),
			o = c("/helpers/render"),
			p = {},
			q = c("/Class_bubble").extend({
				init: function(a) {
					q.__super__.init.apply(this, arguments);
					if (this._textLarge || this._textSmall) this._.notice = [this._textLarge, this._textSmall];
					this._.notice = [].concat(this._.notice);
					this.setNotice(this._.notice);
					this.setIcon(this._.icon);
					this._.autoHide && setTimeout(k(this.hide, this), this._.hideDelay);
					this.show()
				},
				setNotice: function(a) {
					var b = "";
					g([].concat(a), k(function(a, c) {
						c === 0 ? this.getDomList().text.innerHTML = a + (this._.autoHide ? "" : ' <a node-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a>') : b += o('<p class="sub_txt S_txt2">{text}</p>', {
							text: a || ""
						})
					}, this));
					this.getDomList().otherText.innerHTML = b;
					this.rebindClose();
					this.fixWidth();
					return this
				},
				beside: function(a) {
					var b = i(a);
					this._.besideDOM = b;
					if (p[b]) try {
						p[b].hide()
					} catch (c) {}
					p[b] = this;
					return q.__super__.beside.apply(this, arguments)
				},
				setIcon: function(a) {
					this.getDomList(!0).icon.innerHTML = n[a] || "";
					return this
				},
				hide: function() {
					this._ && this._.besideDOM && p[this._.besideDOM] === this && delete p[this._.besideDOM];
					q.__super__.hide.apply(this, arguments);
					setTimeout(k(this.destroy, this), 2e3);
					return this
				}
			});
		q.defalutOpts = l({}, q.defalutOpts, {
			template: m,
			icon: "succ",
			autoHide: !0,
			stopClickPropagation: !0,
			hideDelay: 1e3
		});
		a.exports = q
	},
	"/templates/tipAlert.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer W_layer_pop">\n\t<div class="content layer_mini_info">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon"></span>\n\t\t\t<span node-type="text"></span>\n\t\t</p>\n\t\t<div node-type="otherText"></div>\n\t\t\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
	},
	"/Class_tipConfirm": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.foreach,
			h = e.funcEmpty,
			i = e.core.dom.uniqueID,
			j = e.custEvent,
			k = f.language,
			l = f.proxy,
			m = f.extend,
			n = c("/templates/tipConfirm.html"),
			o = c("/jsons/icons.json"),
			p = c("/helpers/render"),
			q = {},
			r = c("/Class_bubble").extend({
				init: function(a) {
					r.__super__.init.apply(this, arguments);
					j.define(this, ["ok", "cancel"]);
					if (this._textLarge || this._textSmall) this._.notice = [this._textLarge, this._textSmall];
					this._.notice = [].concat(this._.notice);
					this.setNotice(this._.notice);
					this.setIcon(this._.icon);
					this.ok(this._.okText, this._.ok);
					this.cancel(this._.cancelText, this._.cancel);
					this.on("ok", "click", l(function() {
						this._.confirmIsOK = !0;
						this.hide()
					}, this));
					this.on("cancel", "click", l(this.hide, this));
					this.show()
				},
				setNotice: function(a) {
					var b = "";
					g([].concat(a), l(function(a, c) {
						c === 0 ? this.getDomList(!0).text.innerHTML = a : b += p('<p class="sub_txt S_txt2">{text}</p>', {
							text: a || ""
						})
					}, this));
					this.getDomList(!0).otherText.innerHTML = b;
					this.fixWidth();
					return this
				},
				ok: function(a, b) {
					if (typeof a == "function") {
						b = a;
						a = undefined
					}
					typeof a == "string" && (this._.okText = "<span>" + a + "</span>");
					this.getDomList(!0).ok.innerHTML = this._.okText;
					this.on("ok", b || h);
					this.fixWidth();
					return this
				},
				cancel: function(a, b) {
					if (typeof a == "function") {
						b = a;
						a = undefined
					}
					typeof a == "string" && (this._.cancelText = "<span>" + a + "</span>");
					this.getDomList(!0).cancel.innerHTML = this._.cancelText;
					this.on("cancel", b || h);
					this.fixWidth();
					return this
				},
				setIcon: function(a) {
					this.getDomList(!0).icon.innerHTML = o[a] || "";
					return this
				},
				show: function() {
					var a = r.__super__.show.apply(this, arguments);
					setTimeout(l(function() {
						this.getDomList(!0).ok.focus()
					}, this), 100);
					return a
				},
				beside: function(a) {
					var b = i(a);
					this._.besideDOM = b;
					if (q[b]) try {
						q[b].hide()
					} catch (c) {}
					q[b] = this;
					return r.__super__.beside.apply(this, arguments)
				},
				hide: function() {
					q[this._.besideDOM] === this && delete q[this._.besideDOM];
					this._.confirmIsOK ? this.trigger("ok") : this.trigger("cancel");
					r.__super__.hide.apply(this, arguments);
					setTimeout(l(this.destroy, this), 2e3);
					return this
				}
			});
		r.defalutOpts = m({}, r.defalutOpts, {
			template: n,
			icon: "askS",
			okText: k("确定"),
			cancelText: k("取消"),
			stopClickPropagation: !0
		});
		a.exports = r
	},
	"/templates/tipConfirm.html": function(a, b, c, d) {
		a.exports = '<div class="W_layer W_layer_pop">\n\t<div class="content layer_mini_opt">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon"></span>\n\t\t\t<span node-type="text"></span>\n\t\t</p>\n\t\t<div node-type="otherText"></div>\n\t\t<p class="btn">\n\t\t\t<a href="javascript:void(0);" node-type="ok" action-type="ok" class="W_btn_a"></a>\n\t\t\t<a href="javascript:void(0);" node-type="cancel" action-type="cancel" class="W_btn_b"></a>\n\t\t</p>\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
	},
	"/Widget_scrollView": function(a, b, c, d) {
		function t(a) {
			function E() {
				m(b.content, "scroll", D);
				m(b.barContainer, "mousedown", z);
				m(document, "mousemove", A);
				m(document, "mouseup", B);
				n(b.container);
				n(b.barContainer);
				clearInterval(t);
				while (u = b.container.firstChild) a.appendChild(u)
			}
			function D() {
				try {
					var a = g.scrollWidth();
					q && C(b.content) && (a = 0);
					b.content.style.width = b.container.offsetWidth + a + "px";
					b.barContent.style.height = x() / w() * 100 + "%";
					b.barContent.style.top = v() / w() * 100 + "%";
					b.barContainer.style.visibility = (f = w() > x()) ? "" : "hidden"
				} catch (c) {}
			}
			function C(a) {
				return e.getStyle(a, "position") === "absolute" ? !0 : a === document.body ? !1 : a.parentNode ? C(a.parentNode) : !1
			}
			function B(a) {
				d = !1;
				j(document.body, "UI_scrolling")
			}
			function A(a) {
				a = o(a);
				d === !0 && v((a.clientY - h) / b.barContainer.offsetHeight * w())
			}
			function z(a) {
				a = o(a);
				var c = a.target;
				if (a.which === 1) {
					i(document.body, "UI_scrolling");
					if (c === b.barContent) {
						d = !0;
						h = a.clientY - parseInt(b.barContent.style.top, 10) / 100 * b.barContainer.offsetHeight
					} else b.barContent.getBoundingClientRect().top < a.clientY ? v(v() + w() * .1) : v(v() - w() * .1)
				}
			}
			function y(a) {
				if (f) {
					a = o(a);
					var b = -a.wheelDelta;
					isNaN(b) && (b = a.deltaY);
					var c = b < 0,
						d = b > 0;
					(c && v() <= 0 || d && w() - v() - x() <= 0) && p(a)
				}
			}
			function x() {
				return b.content.offsetHeight
			}
			function w() {
				return b.content.scrollHeight
			}
			function v(a) {
				return arguments.length > 0 ? b.content.scrollTop = a : b.content.scrollTop
			}
			var b = r(k(s).list),
				c, d = !1,
				f = !1,
				h, t;
			for (c in b) b.hasOwnProperty(c) && b[c].removeAttribute("node-type");
			var u;
			while (u = a.firstChild) b.content.appendChild(u);
			i(a, "UI_scrollView");
			a.appendChild(b.container);
			a.appendChild(b.barContainer);
			l(b.content, "scroll", D);
			l(b.barContainer, "mousedown", z);
			l(document, "mousemove", A);
			l(document, "mouseup", B);
			l(b.content, "mousewheel", y);
			l(b.content, "DOMMouseScroll", y);
			t = setInterval(function() {
				try {
					b.container.scrollLeft = 0
				} catch (a) {}
			}, 1e3);
			D();
			return {
				reset: D,
				destroy: E,
				scrollHeight: w,
				scrollTop: v,
				offsetHeight: x,
				scrollEl: b.content
			}
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = c("/css"),
			h = e.C,
			i = e.addClassName,
			j = e.removeClassName,
			k = e.builder,
			l = e.addEvent,
			m = e.removeEvent,
			n = e.removeNode,
			o = e.fixEvent,
			p = e.stopEvent,
			q = e.core.util.browser.IE6 || e.core.util.browser.IE7,
			r = f.parseDOM,
			s = c("/templates/scrollview.html");
		a.exports = t
	},
	"/templates/scrollview.html": function(a, b, c, d) {
		a.exports = '<div class="UI_scrollContainer" node-type="container">\n\t<div class="UI_scrollContent" node-type="content"></div>\n</div>\n<div class="UI_scrollBar W_scroll_y S_bg1" node-type="barContainer"><div class="bar S_txt2_bg" node-type="barContent" style="top:0%; height:0;"></div></div>'
	},
	"/Widget_badge": function(a, b, c, d) {
		function m(a, b, c) {
			if (h.effectSuport) {
				var d = a.innerHTML,
					e = b;
				c && (d = [e, e = d][0]);
				var f = parseInt(g(a, "line-height")),
					m = i(l(k, {
						oldValue: d,
						newValue: e,
						height: (f || a.offsetHeight) - 1
					})),
					n = m.list.t[0],
					o = m.box;
				a.innerHTML = "";
				a.appendChild(o);
				n.style.lineHeight = n.parentNode.offsetHeight + "px";
				h.effect(n, c ? "badgeDown" : "badgeUp", "fast", function() {
					j(a, n) && (a.innerHTML = b)
				})
			} else a.innerHTML = b
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = e.getStyle,
			h = c("/css"),
			i = e.builder,
			j = e.contains,
			k = c("/templates/badge.html"),
			l = c("/helpers/render");
		a.exports = m
	},
	"/templates/badge.html": function(a, b, c, d) {
		a.exports = '<span class="UI_badge" style="height:{height}px"><span class="UI_badge" node-type="t">{oldValue}<br/>{newValue}</span></span>'
	},
	"/Widget_suggest": function(a, b, c, d) {
		function z(a) {
			var b = a.length;
			while (b--) if (l(a[b], "cur")) return a[b];
			return null
		}
		var e = c("/$")[0],
			f = c("/$")[1],
			g = c("/Class_mlayer"),
			h = c("/css"),
			i = e.C,
			j = e.addClassName,
			k = e.removeClassName,
			l = e.core.dom.hasClassName,
			m = e.addEvent,
			n = e.removeEvent,
			o = e.builder,
			p = e.foreach,
			q = e.fixEvent,
			r = e.preventDefault,
			s = e.stopEvent,
			t = e.getUniqueKey,
			u = e.custEvent,
			v = f.parseDOM,
			w = f.extend,
			x = f.proxy,
			y = {
				ENTER: 13,
				ESC: 27,
				UP: 38,
				DOWN: 40,
				LEFT: 37,
				RIGHT: 39
			},
			A = c("/Class_mlayer").extend({
				init: function() {
					A.__super__.init.apply(this, arguments);
					u.define(this, ["suggest", "submit"]);
					var a = this._,
						b = a.input,
						c = a.proxyShow = x(this.show, this),
						d = a.proxyHide = x(this.hide, this),
						e = a.proxyKey = x(function(a) {
							a = q(a);
							var c, d;
							if ((c = this.getDomList().list.childNodes) && c.length) {
								d = z(c);
								switch (a.keyCode) {
								case y.ENTER:
									d && (b.value = decodeURIComponent(d.getAttribute("value")));
									b.blur();
									this.trigger("submit", [b.value]);
									r(a);
									break;
								case y.ESC:
									b.blur();
									s(a);
									break;
								case y.UP:
									var e = d ? d.previousSibling : c[c.length - 1];
									d && k(d, "cur");
									e && j(e, "cur");
									b.value = e ? decodeURIComponent(e.getAttribute("value")) : b._value;
									s(a);
									break;
								case y.DOWN:
									var e = d ? d.nextSibling : c[0];
									d && k(d, "cur");
									e && j(e, "cur");
									b.value = e ? decodeURIComponent(e.getAttribute("value")) : b._value;
									s(a);
									break;
								case y.LEFT:
								case y.RIGHT:
									break;
								default:
									setTimeout(function() {
										b._value = b.value
									})
								}
							}
						}, this),
						f = a.proxyOnkeydownIE9 = x(function() {
							var a = window.event.keyCode;
							(a == 8 || a == 46) && c
						}, this);
					m(b, "focus", c);
					m(b, "blur", d);
					m(b, "keydown", e);
					window.addEventListener ? b.addEventListener("input", c, !1) : b.attachEvent("onpropertychange", c);
					if (window.VBArray && window.addEventListener && window.attachEvent) {
						b.attachEvent("onkeydown", f);
						b.attachEvent("oncut", c)
					}
					this.on("select", "click", x(function(a) {
						b.value = decodeURIComponent(a.el.getAttribute("value"));
						this.trigger("submit", [b.value])
					}, this));
					b.setAttribute("autocomplete", "off");
					b._value = b.value
				},
				html: function(a) {
					return A.__super__.html.apply(this, [a, this.getDomList().list])
				},
				show: function() {
					function b(b, c) {
						if (this._.input != document.activeElement) return this.hide();
						if (c != this._.lastkey) return this;
						if (!b || b.length <= 0) return this.hide();
						var d = "";
						p(b, function(a, b) {
							a = [].concat(a);
							a[1] = a[1] || a[0];
							d += '<li action-type="select" value="' + encodeURIComponent(a[1]) + '"><a href="javascript:void(0);">' + a[0] + "</a></li>"
						});
						A.__super__.show.apply(this, a);
						this.beside(this._.input, {
							pos: this._.pos,
							offsetX: this._.offsetX,
							offsetY: this._.offsetY
						});
						var e = this._.width || this._.input.offsetWidth - 6;
						this._.node.style.cssText += ";min-width:" + e + "px;_width:" + e + "px;";
						this.html(d);
						j(this._.node, "UI_autoHeight");
						this.autoHeight();
						return this
					}
					var a = arguments;
					if (this._.input != document.activeElement) return this;
					this.trigger("suggest", [this._.input.value, x(b, this, this._.lastkey = t())]);
					return this
				},
				hide: function() {
					this.getBox().style.height = "";
					setTimeout(x(function() {
						this.html("");
						A.__super__.hide.apply(this, arguments)
					}, this), 200);
					return this
				},
				destroy: function() {
					var a = this._,
						b = a.input;
					n(b, "focus", a.proxyShow);
					n(b, "blur", a.proxyHide);
					n(b, "keydown", a.proxyKey);
					window.addEventListener ? b.removeEventListener("input", a.proxyShow, !1) : b.detachEvent("onpropertychange", a.proxyShow);
					if (window.VBArray && window.addEventListener && window.attachEvent) {
						b.detachEvent("onkeydown", a.proxyOnkeydownIE9);
						b.detachEvent("oncut", a.proxyShow)
					}
					return A.__super__.destroy.apply(this, arguments)
				}
			});
		A.defalutOpts = w({}, A.defalutOpts);
		A.defalutOpts.template = '<div class="layer_menu_list" style="overflow:hidden;"><ul node-type="list"></ul></div>';
		A.defalutOpts.pos = "bottom-left";
		A.defalutOpts.offsetX = 0;
		A.defalutOpts.offsetY = 0;
		A.defalutOpts.width = !1;
		A.defalutOpts.showWithAni = null;
		A.defalutOpts.hideWithAni = null;
		A.defalutOpts.heightWidthAni = !0;
		a.exports = function(a, b) {
			b = b || {};
			a && (b.input = a);
			return new A(b)
		}
	},
	"/core/utils/focusHistory": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		a.exports = function(a, b) {
			var c = [],
				d = function(a) {
					if (!a || a == document.body) return !1;
					if (a.getAttribute("action-history")) {
						var b = e.core.json.queryToJson(a.getAttribute("action-history"));
						if (b && b.rec && b.rec == 1) return a
					}
					return arguments.callee(a.parentNode)
				},
				f = function(a) {
					var a = e.fixEvent(a),
						b = d(a.target);
					b && g.push(b)
				},
				g = {
					push: function(a) {
						c.push(a);
						c.length > 3 && c.shift()
					},
					focusback: function(a) {
						var b = c.pop();
						if ( !! b) {
							b.getAttribute("tabIndex") || b.setAttribute("tabIndex", "0");
							setTimeout(function() {
								b.focus()
							}, 200)
						}
					},
					destroy: function() {
						e.removeEvent(document.body, "click", f);
						c = null
					}
				},
				h = function() {
					e.addEvent(document.body, "click", f)
				};
			h();
			return g
		}
	},
	"/core/utils/suggest": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = null,
			g = e.custEvent,
			h = g.define,
			i = g.fire,
			j = g.add,
			k = e.addEvent,
			l = e.removeEvent,
			m = e.stopEvent,
			n = [],
			o = {},
			p = {
				ENTER: 13,
				ESC: 27,
				UP: 38,
				DOWN: 40,
				TAB: 9
			},
			q = function(a) {
				var b = -1,
					c = [],
					d = a.textNode,
					f = a.uiNode,
					g = e.core.evt.delegatedEvent(f),
					n = h(d, ["open", "close", "indexChange", "onSelect", "onIndexChange", "onClose", "onOpen", "openSetFlag"]);
				n.setFlag = o;
				var o = function(b) {
						a.flag = b
					},
					q = function() {
						return e.sizzle(["[action-type=", a.actionType, "]"].join(""), f)
					},
					r = function() {
						b = -1;
						l(d, "keydown", s);
						g.destroy()
					},
					s = function(c) {
						var f, g;
						if ( !! (f = c) && !! (g = f.keyCode)) {
							if (g == p.ENTER) {
								i(n, "onSelect", [b, d, a.flag]);
								e.preventDefault()
							}
							if (g == p.UP) {
								m();
								var h = q().length;
								b = b < 1 ? h - 1 : b - 1;
								i(n, "onIndexChange", [b]);
								return !1
							}
							if (g == p.DOWN) {
								m();
								var h = q().length;
								b = b == h - 1 ? 0 : b + 1;
								i(n, "onIndexChange", [b]);
								return !1
							}
							if (g == p.ESC) {
								m();
								r();
								i(n, "onClose");
								return !1
							}
							if (g == p.TAB) {
								r();
								i(n, "onClose");
								return !1
							}
						}
					},
					t = function(b) {
						i(n, "onSelect", [e.core.arr.indexOf(b.el, q()), d, a.flag])
					},
					u = function(a) {
						b = e.core.arr.indexOf(a.el, q());
						i(n, "onIndexChange", [e.core.arr.indexOf(a.el, q())])
					};
				j(n, "open", function(b, c) {
					d = c;
					r();
					k(c, "keydown", s);
					g.add(a.actionType, "mouseover", u);
					g.add(a.actionType, "click", t);
					i(n, "onOpen", [a.flag])
				});
				j(n, "openSetFlag", function(a, b) {
					o(b)
				});
				j(n, "close", function() {
					r();
					i(n, "onClose", [a.flag])
				});
				j(n, "indexChange", function(c, d) {
					b = d;
					i(n, "onIndexChange", [b, a.flag])
				});
				return n
			},
			r = function(a) {
				var b = a.textNode,
					c = e.core.arr.indexOf(b, n);
				if (!o[c]) {
					n[c = n.length] = b;
					o[c] = q(a)
				}
				return o[c]
			};
		a.exports = function(a) {
			if ( !! a.textNode && !! a.uiNode) {
				a = e.parseParam({
					textNode: f,
					uiNode: f,
					actionType: "item",
					actionData: "index",
					flag: ""
				}, a);
				return r(a)
			}
		}
	},
	"/core/utils/tab": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		a.exports = function(a) {
			var b = {},
				c, d, f, g, h, i = {},
				j = null,
				k = {
					selectTab: function(a) {
						if (!i[a]) {
							e.custEvent.fire(m, "tabInit", a);
							i[a] = !0
						}
						k.showTab(a);
						j && e.custEvent.fire(m, "tabOut", j);
						e.custEvent.fire(m, "tabIn", a);
						j = a
					},
					showTab: function(a) {
						if (j) {
							d[j][0].className = b.defaultClassName;
							d[j][1] && e.core.dom.setStyle(d[j][1], "display", "none")
						}
						d[a][0].className = b.currentClassName;
						d[a][1] && e.core.dom.setStyle(d[a][1], "display", "")
					}
				},
				l = {
					tabSwitch: function(a) {
						var b = a.el,
							c = b.getAttribute("node-type") || "";
						c != j && k.selectTab(c)
					}
				},
				m = {
					getOuter: function() {
						return g
					},
					getDEvent: function() {
						return h
					},
					getDom: function(a) {
						return d[a] ? d[a] : null
					},
					setContent: function(a, b) {
						typeof b == "string" ? d[a].innerHTML = b : e.isNode(b) && d[a].appendChild(b)
					},
					destroy: function() {
						h.destroy();
						i = null
					}
				},
				n = {
					init: function() {
						n.pars();
						n.build();
						n.bind();
						k.selectTab(b.currentTab)
					},
					pars: function() {
						b = e.core.obj.parseParam({
							templete: "",
							currentTab: "tab1",
							eventType: "click",
							currentClassName: "pftb_lk current S_line5 S_txt1 S_bg5",
							defaultClassName: "pftb_lk S_line5 S_txt1 S_bg1"
						}, a || {})
					},
					build: function() {
						c = e.core.dom.builder(b.templete);
						d = c.list;
						f = d.content[0];
						g = c.list.tabs[0]
					},
					bind: function() {
						e.custEvent.define(m, ["tabInit", "tabIn", "tabOut"]);
						h = e.core.evt.delegatedEvent(g);
						h.add("tab", b.eventType, l.tabSwitch)
					}
				};
			n.init();
			return m
		}
	},
	"/core/utils/slider": function(a, b, c, d) {
		var e = d("/core/theia") || STK,
			f = c("/core/utils/children"),
			g = c("/core/utils/parseDOM");
		a.exports = function(a, b) {
			e.core.dom.isNode(a) || e.log("[kit.extra.slider]: node is not a Node!");
			var c = {},
				d = {},
				h, i, j, k, l, m, n = !1,
				o = !1,
				p = e.core.dom.setStyle,
				q = {
					isMouseLeaveOrEnter: function(a, b) {
						if (a && a.type != "mouseout" && a.type != "mouseover") return !1;
						var c = a.relatedTarget ? a.relatedTarget : a.type == "mouseout" ? a.toElement : a.fromElement;
						while (c && c != b) c = c.parentNode;
						return c != b
					},
					onMouseover: function(a) {
						q.isMouseLeaveOrEnter(a, i) && clearInterval(l)
					},
					onMouseout: function(a) {
						q.isMouseLeaveOrEnter(a, i) && (!n || b.autoRun) && (l = setInterval(t.autoSlideLeft, b.speed_banner))
					}
				},
				r = {
					choice: function(a) {
						var d = a.data;
						n = !0;
						o = !0;
						var g = f(i),
							h = a.el;
						e.core.arr.foreach(g, function(a, c) {
							if (a != h) e.core.dom.removeClassName(a, b.className);
							else if (e.hasClassName(a, b.className)) {
								e.core.dom.removeClassName(a, b.className);
								n = !1;
								o = !1
							} else e.core.dom.addClassName(a, b.className)
						});
						e.core.evt.custEvent.fire(c, "choice", d)
					},
					clickLeft: function() {
						d.newTime = new Date;
						d.stepTime = d.newTime - d.oldTime;
						d.stepTime > 300 ? d.stepTime = b.speed_tween_fast : d.stepTime = 50;
						d.oldTime = d.newTime;
						clearInterval(l);
						t.handleSlideRight(d.stepTime);
						if (!n || b.autoRun == 0) l = setInterval(t.autoSlideLeft, b.speed_banner)
					},
					clickRight: function() {
						d.newTime = new Date;
						d.stepTime = d.newTime - d.oldTime;
						d.stepTime > 300 ? d.stepTime = b.speed_tween_fast : d.stepTime = 50;
						d.oldTime = d.newTime;
						clearInterval(l);
						t.autoSlideLeft(d.stepTime);
						if (!n || b.autoRun == 0) l = setInterval(t.autoSlideLeft, b.speed_banner)
					}
				},
				s = {
					slideDot: function(a, c) {
						clearInterval(l);
						var d = c.toPage - c.currentPage > 0 ? c.toPage - c.currentPage : c.totalPage - c.currentPage + c.toPage,
							f = (b.eleWidth + b.eleMargin) * Math.abs(d),
							g = c.speed || b.speed_tween;
						k = e.core.ani.tween(i, {
							animationType: b.tween_algorithm,
							duration: g,
							end: function() {
								for (var a = 0, b = d; a < b; a++) {
									var c = e.core.dom.firstChild(i);
									e.core.dom.insertElement(i, c, "beforeend")
								}
								p(i, "left", "0px")
							}
						}).play({
							left: -f
						});
						l = setInterval(t.autoSlideLeft, b.speed_banner)
					}
				},
				t = {
					autoSlideLeft: function(a) {
						t.animate("left", function() {
							for (var a = 0, c = b.num_everyTurn; a < c; a++) {
								var d = e.core.dom.firstChild(i);
								e.core.dom.insertElement(i, d, "beforeend")
							}
							p(i, "left", "0px")
						}, a);
						e.core.evt.custEvent.fire(c, "left")
					},
					handleSlideRight: function(a) {
						for (var d = 0, f = b.num_everyTurn; d < f; d++) {
							var g = e.core.dom.lastChild(i);
							e.core.dom.insertElement(i, g, "afterbegin")
						}
						p(i, "left", -(m - b.fix_right) + "px");
						t.animate("right", function() {}, a);
						e.core.evt.custEvent.fire(c, "right")
					},
					animate: function(a, c, d) {
						a = a == "left" ? m : 0;
						d = d || b.speed_tween;
						k = e.core.ani.tween(i, {
							animationType: b.tween_algorithm,
							duration: d,
							end: c
						}).play({
							left: -a
						})
					}
				},
				u = {
					init: function() {
						u.pars();
						u.build();
						u.bind();
						if (b.num_all > b.num_everyTurn) {
							if (b.num_all < 2 * b.num_everyTurn) {
								var a = 2 * b.num_everyTurn - b.num_all;
								for (var c = 0, d = a; c < d; c++) {
									var g = f(i)[c],
										h = g.cloneNode(!0);
									e.core.dom.insertElement(i, h, "beforeend")
								}
								var j = (b.eleWidth + b.eleMargin) * 2 * b.num_everyTurn + b.fix;
								p(i, "width", j + "px")
							}
							b.autoRun && (l = setInterval(t.autoSlideLeft, b.speed_banner))
						}
					},
					pars: function() {
						b = e.core.obj.parseParam({
							speed_banner: 3e3,
							speed_tween: 500,
							speed_tween_fast: 300,
							tween_algorithm: "easeoutcubic",
							num_everyTurn: 1,
							eleMargin: 0,
							fix: 0,
							fix_right: 0,
							actionType: "choice",
							className: "current",
							autoRun: !0
						}, b || {});
						h = g(e.builder(a).list);
						i = h.innerSlide;
						b.num_all = f(i).length;
						b.eleWidth = e.core.dom.firstChild(i).offsetWidth;
						d.oldTime = new Date
					},
					build: function() {
						i.style.left || p(i, "left", "0px");
						p(i, "position", "relative");
						var a = (b.eleWidth + b.eleMargin) * b.num_all + b.fix;
						p(i, "width", a + "px");
						m = (b.eleWidth + b.eleMargin) * b.num_everyTurn
					},
					bind: function() {
						e.addEvent(i, "mouseover", q.onMouseover);
						e.addEvent(i, "mouseout", q.onMouseout);
						j = e.core.evt.delegatedEvent(a);
						j.add("prev", "click", r.clickLeft);
						j.add("next", "click", r.clickRight);
						b.actionType && j.add(b.actionType, "click", r.choice);
						e.core.evt.custEvent.define(c, ["left", "right", "choice", "changePage"]);
						e.core.evt.custEvent.add(c, "changePage", s.slideDot)
					},
					destroy: function() {
						clearInterval(l);
						k.destroy();
						e.removeEvent(i, "mouseover", q.onMouseover);
						e.removeEvent(i, "mouseout", q.onMouseout);
						e.core.evt.custEvent.remove(c);
						j.destroy()
					}
				};
			u.init();
			c.destroy = u.destroy;
			return c
		}
	},
	"/core/utils/children": function(a, b, c, d) {
		var e = d("/core/theia") || STK;
		a.exports = function(a) {
			if (!e.core.dom.isNode(a)) throw "Parameter must be an HTMLEelement!";
			var b = [];
			for (var c = 0, d = a.childNodes.length; c < d; c++) a.childNodes[c].nodeType == 1 && b.push(a.childNodes[c]);
			return b
		}
	},
	"/calendar": function(a, b, c, d) {
		var e = c("/$")[0],
			f = c("/$")[1].language,
			g = c("/Class_mlayer"),
			h = c("/templates/calendar.html");
		a.exports = function(a) {
			var b = {},
				c, d = {
					id: "",
					data: {},
					chooseDate: "",
					source: null,
					calNode: null,
					layer: null,
					today: {},
					showDate: {},
					start: null,
					end: null,
					count: null,
					firstWeek: null,
					format: [],
					years: [],
					changeDom: {},
					defaultStartDate: new Date(2009, 7, 16, 0, 0, 0, 0),
					daysOfMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
					dateOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
				},
				i = {
					close: function() {
						e.core.evt.stopEvent();
						e.removeEvent(document.body, "click", i.close);
						d.layer.hide()
					},
					changeYear: function(a) {
						a = e.fixEvent(a);
						var b = a.target,
							c = b.value;
						if (c != d.showDate.year) {
							d.showDate.year = c;
							c == d.start.year && (d.showDate.month = d.start.month);
							c == d.end.year && (d.showDate.month = d.end.month);
							k.getCurrentMonthInfo(d.data.hidePastMonth);
							l.drawCal()
						}
					},
					changeMonth: function(a) {
						a = e.fixEvent(a);
						var b = a.target,
							c = b.value;
						if (c != d.showDate.month) {
							d.showDate.month = c * 1;
							k.getCurrentMonthInfo(d.data.hidePastMonth);
							l.drawCal()
						}
					}
				},
				j = {
					date: function(a) {
						var c = a.el.title;
						c = c.replace(/(\d+)/g, function(a, b) {
							return b.length == 1 ? "0" + b : b
						});
						d.chooseDate = c;
						e.custEvent.fire(b, "choose", {
							date: c
						});
						if (d.callback && typeof d.callback == "function") {
							var f = {};
							f.start = d.data.start;
							f.end = d.data.end;
							d.callback(c, f)
						}
					}
				},
				k = {
					parseDate: function(a) {
						var b, c, d, e, f = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/,
							g, h;
						if (!a) b = new Date;
						else if (typeof a == "string" && f.test(a)) {
							b = a.match(f);
							c = b[1] * 1;
							d = b[2] * 1 - 1;
							e = b[3] * 1;
							b = new Date(c, d, e, 0, 0, 0, 0)
						} else a.constructor == Date ? b = a : typeof a == "object" ? b = new Date(a.year, a.month, a.date, 0, 0, 0, 0) : typeof a == "string" ? b = new Date(a) : b = new Date;
						h = {
							year: b.getFullYear(),
							month: b.getMonth(),
							date: b.getDate()
						};
						g = k.getMaxDays(h.year, h.month);
						h.max = g;
						return h
					},
					getMaxDays: function(a, b) {
						return b == 1 ? a % 4 == 0 && a % 100 != 0 || a % 400 == 0 ? 29 : 28 : d.daysOfMonth[b]
					},
					getStartAndEndDays: function(a) {
						if (a) {
							d.start = a.start != null ? a.start : d.defaultStartDate;
							d.end = a.end != null ? a.end : new Date;
							d.start.toString().indexOf("-") != -1 && (d.start = d.start.replace(/-/g, "/"));
							d.end.toString().indexOf("-") != -1 && (d.end = d.end.replace(/-/g, "/"));
							d.defaultStartDate = new Date(d.start)
						} else {
							d.start = d.defaultStartDate;
							d.end = new Date
						}
						d.start = k.parseDate(d.start);
						d.end = k.parseDate(d.end)
					},
					getCurrentMonthInfo: function() {
						var a = d.showDate,
							b = a.year,
							c = a.month,
							f = a.date,
							g = new Date(b, c, 1, 0, 0, 0, 0);
						d.count = k.getMaxDays(b, c);
						d.firstWeek = g.getDay();
						var h = e.core.arr.copy(d.dateOfMonth),
							i = d.firstWeek == 0 ? [] : Array(d.firstWeek).join().split(",");
						d.format = i.concat(h.splice(0, d.count))
					},
					drawYear: function() {
						var a = d.defaultStartDate.getFullYear(),
							b = (new Date((new Date(d.end.year, d.end.month, d.end.date)).getTime())).getFullYear(),
							c = b - a,
							e = 0;
						d.years = [];
						while (e <= c) {
							d.years.push(a + e);
							e++
						}
					},
					getDate: function() {
						return d.chooseDate
					},
					getDateOffset: function(a) {
						var b = a;
						return (new Date(b.year, b.month, b.date)).getTime()
					}
				},
				l = {
					drawCal: function(a) {
						d.data = {
							today: d.today,
							showDate: d.showDate,
							start: d.start,
							end: d.end,
							dates: d.format,
							years: d.years,
							hidePastMonth: a,
							currDate: k.getMaxDays()
						};
						d.data.showDateOffset = k.getDateOffset(d.showDate);
						d.data.startOffset = k.getDateOffset(d.start);
						d.data.endOffset = k.getDateOffset(d.end);
						d.data.datesOffset = [];
						for (var b = 0, c = d.data.dates.length; b < c; b++) {
							var i = {
								year: d.showDate.year,
								month: d.showDate.month,
								date: d.data.dates[b]
							};
							d.data.datesOffset.push({
								d: d.data.dates[b],
								dOffset: k.getDateOffset(i)
							})
						}
						if (!d.layer) {
							var j = new g({
								id: "calendar_layer" + e.getUniqueKey(),
								showWithAni: null,
								hideWithAni: null
							});
							j.html(f(e.core.util.easyTemplate(h, d.data).toString()));
							d.calNode = j.getBox();
							d.calNode.className = "pc_caldr W_layer";
							d.layer = j;
							l.bind();
							l.bindMonthYear()
						} else {
							d.layer.html(f(e.core.util.easyTemplate(h, d.data).toString()));
							l.removeMonthYear();
							l.bindMonthYear()
						}
						e.core.evt.stopEvent()
					},
					show: function(a, c) {
						e.core.evt.stopEvent();
						d.layer.show();
						d.layer.beside(a, c);
						e.addEvent(document.body, "click", i.close);
						return b
					},
					hide: function() {
						e.removeEvent(document.body, "click", i.close);
						d.layer.hide();
						return b
					},
					state: function() {
						return d.layer.getState()
					},
					bind: function() {
						c = e.delegatedEvent(d.calNode);
						c.add("date", "click", j.date);
						e.custEvent.define(b, ["choose"])
					},
					bindMonthYear: function() {
						var a = d.layer.getDomList(!0);
						d.changeDom.year = a.year;
						d.changeDom.month = a.month;
						e.addEvent(d.changeDom.year, "change", i.changeYear);
						e.addEvent(d.changeDom.month, "change", i.changeMonth)
					},
					removeMonthYear: function() {
						d.changeDom && d.changeDom.year && e.removeEvent(d.changeDom.year, "change", i.changeYear);
						d.changeDom && d.changeDom.month && e.removeEvent(d.changeDom.month, "change", i.changeMonth)
					}
				},
				m = {
					init: function() {
						m.pars();
						m.build();
						m.bind()
					},
					pars: function() {
						d.callback = a.callback;
						d.currentDate = a.currentDate
					},
					build: function() {
						d.today = k.parseDate();
						for (var b in d.today) d.showDate[b] = d.today[b];
						k.getStartAndEndDays(a);
						k.getCurrentMonthInfo();
						k.drawYear();
						l.drawCal(a.hidePastMonth)
					},
					bind: function() {
						e.addEvent(d.calNode, "click", function() {
							e.core.evt.stopEvent()
						})
					},
					destroy: function() {
						d.layer && d.layer.destroy();
						d.layer = null;
						l.removeMonthYear()
					}
				};
			m.init();
			b.show = l.show;
			b.hide = l.hide;
			b.state = l.state;
			b.getDate = k.getDate;
			b.destroy = m.destroy;
			return b
		}
	},
	"/templates/calendar.html": function(a, b, c, d) {
		a.exports = '<#et userlist data>\n\t<div class="selector">\n\t\t<select node-type="month" class="month htc_select">\n\t\t<#if (data.hidePastMonth)>\n\t\t\t<#if (!(data.start.year == data.showDate.year&& data.currDate.month>0))><option value="0" ${data.showDate.month==0?\\\'selected=""\\\':\\\'\\\'}>#L{一月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>1)||(data.end.year == data.showDate.year&& data.currDate.month<1)))><option value="1" ${data.showDate.month==1?\\\'selected=""\\\':\\\'\\\'}>#L{二月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>2)||(data.end.year == data.showDate.year&& data.currDate.month<2)))><option value="2" ${data.showDate.month==2?\\\'selected=""\\\':\\\'\\\'}>#L{三月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>3)||(data.end.year == data.showDate.year&& data.currDate.month<3)))><option value="3" ${data.showDate.month==3?\\\'selected=""\\\':\\\'\\\'}>#L{四月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>4)||(data.end.year == data.showDate.year&& data.currDate.month<4)))><option value="4" ${data.showDate.month==4?\\\'selected=""\\\':\\\'\\\'}>#L{五月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>5)||(data.end.year == data.showDate.year&& data.currDate.month<5)))><option value="5" ${data.showDate.month==5?\\\'selected=""\\\':\\\'\\\'}>#L{六月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>6)||(data.end.year == data.showDate.year&& data.currDate.month<6)))><option value="6" ${data.showDate.month==6?\\\'selected=""\\\':\\\'\\\'}>#L{七月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>7)||(data.end.year == data.showDate.year&& data.currDate.month<7)))><option value="7" ${data.showDate.month==7?\\\'selected=""\\\':\\\'\\\'}>#L{八月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>8)||(data.end.year == data.showDate.year&& data.currDate.month<8)))><option value="8" ${data.showDate.month==8?\\\'selected=""\\\':\\\'\\\'}>#L{九月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>9)||(data.end.year == data.showDate.year&& data.currDate.month<9)))><option value="9" ${data.showDate.month==9?\\\'selected=""\\\':\\\'\\\'}>#L{十月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>10)||(data.end.year == data.showDate.year&& data.currDate.month<10)))><option value="10" ${data.showDate.month==10?\\\'selected=""\\\':\\\'\\\'}>#L{十一月}</option></#if>\n\t\t\t<#if (!(data.end.year == data.showDate.year&& data.currDate.month<11))><option value="11" ${data.showDate.month==11?\\\'selected=""\\\':\\\'\\\'}>#L{十二月}</option></#if>\n\t\t<#else>\n\t\t\t<option value="0"  ${data.showDate.month==0?\\\'selected=""\\\':\\\'\\\'}>#L{一月}</option>\n\t\t\t<option value="1"  ${data.showDate.month==1?\\\'selected=""\\\':\\\'\\\'}>#L{二月}</option>\n\t\t\t<option value="2"  ${data.showDate.month==2?\\\'selected=""\\\':\\\'\\\'}>#L{三月}</option>\n\t\t\t<option value="3"  ${data.showDate.month==3?\\\'selected=""\\\':\\\'\\\'}>#L{四月}</option>\n\t\t\t<option value="4"  ${data.showDate.month==4?\\\'selected=""\\\':\\\'\\\'}>#L{五月}</option>\n\t\t\t<option value="5"  ${data.showDate.month==5?\\\'selected=""\\\':\\\'\\\'}>#L{六月}</option>\n\t\t\t<option value="6"  ${data.showDate.month==6?\\\'selected=""\\\':\\\'\\\'}>#L{七月}</option>\n\t\t\t<option value="7"  ${data.showDate.month==7?\\\'selected=""\\\':\\\'\\\'}>#L{八月}</option>\n\t\t\t<option value="8"  ${data.showDate.month==8?\\\'selected=""\\\':\\\'\\\'}>#L{九月}</option>\n\t\t\t<option value="9"  ${data.showDate.month==9?\\\'selected=""\\\':\\\'\\\'}>#L{十月}</option>\n\t\t\t<option value="10" ${data.showDate.month==10?\\\'selected=""\\\':\\\'\\\'}>#L{十一月}</option>\n\t\t\t<option value="11" ${data.showDate.month==11?\\\'selected=""\\\':\\\'\\\'}>#L{十二月}</option>\n\t\t</#if>\n\t\t</select>\n\t\t<select node-type="year" class="year htc_select">\n\t\t\t<#list data.years as year>\n\t\t\t\t<option value="${year}"${(data.showDate.year==year)?\\\' selected=""\\\':""}>${year}</option>\n\t\t\t</#list>\n\t\t</select>\n\t</div>\n\t<ul class="weeks">\n\t\t<li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li>\n\t</ul>\n\t<ul class="days">\n\t<#list data.datesOffset as list>\n\t\t<li>\n\t\t<#if (list!="")>\n\t\t\t<#if (data.startOffset <= list.dOffset && list.dOffset <=data.endOffset)>\n\t\t\t\t<a action-type="date" href="#date" onclick="return false;" \n\t\t\t\t\ttitle="${data.showDate.year}-${data.showDate.month+1}-${list.d}"\n\t\t\t\t\tyear="${data.showDate.year}" month="${data.showDate.month+1}" day="${list.d}"\n\t\t\t\t\t${(data.today.year==data.showDate.year&&data.today.month==data.showDate.month&&list.d==data.showDate.date)?\\\' class="day"\\\':\\\'\\\'}><strong>${list.d}</strong></a>\n\t\t\t<#else>\n\t\t\t\t${list.d}\n\t\t\t</#if>\n\t\t</#if> \n\t\t</li>\n\t</#list>\n\t</ul>\n</#et>'
	}
});
!
function(a) {
	function b(d) {
		if (c[d]) return c[d].exports;
		var f = c[d] = {
			exports: {},
			id: d,
			loaded: !1
		};
		return a[d].call(f.exports, f, f.exports, b), f.loaded = !0, f.exports
	}
	var c = {};
	return b.m = a, b.c = c, b.p = "", b(0)
}([function(a, b, c) {
	var d = c(1);
	STK && STK.register("lib.rteditor.editor", function() {
		return d
	})
}, function(a, b, c) {
	(function(d) {
		function f(a, b) {
			try {
				document.execCommand("MultipleSelection", null, !0)
			} catch (c) {}
			return h.init(), this.version = "1.1.2", this.rangy = h, this.plugins = {}, this.cache = {
				undo: [],
				redo: []
			}, this.wraper = {}, this.opts = d.extend(!0, this.opts, g, b), this.$container = d(a), this.container = a, this.opts.debug && (window.$$rangy = h, window.$$jquery = d, window.$$editor = this), this.initModules(), this.initPlugins(), this.log(this.opts), this
		}
		"use strict";
		var g = c(3),
			h = c(4),
			i = b.DEFAULT_PLUGINS = {
				formatting: c(5),
				image: c(7),
				rules: c(9)
			},
			j = b.DEFAULT_MODULES = {
				core: c(10),
				selection: c(11),
				caret: c(12),
				buffer: c(13),
				keys: c(14),
				drag: c(15),
				paste: c(16),
				parser: c(17)
			},
			k = b.DEFAULT_OPTIONS = {
				debug: !1,
				removeEmptyTag: !0,
				scrollView: document.body,
				defaultImageCaption: "点击添加图片标题",
				defaultInvisibleSpace: "​",
				plugins: i,
				modules: j
			},
			l = function(a, b, c) {
				d.each(c, function(c, f) {
					b[c] || (b[c] = {}), d.each(f(a, b[c]), function(a, e) {
						d.isFunction(e) && (b[c][a] = e)
					}), "init" in b[c] && d(document).on("ready", b[c].init)
				})
			};
		f.fn = f.prototype = {
			opts: k,
			keyCode: g.KEY_CODES,
			log: function() {
				try {
					this.opts.debug && console && console.log && console.log.apply(console, arguments)
				} catch (a) {}
			},
			initPlugins: function() {
				l(this, this.plugins, this.opts.plugins)
			},
			initModules: function() {
				l(this, this, this.opts.modules)
			}
		}, f.fn.on = function(a, b, c, d) {
			this.$container.on(a, b, c, d)
		}, f.fn.fire = function(a, b) {
			this.$container.trigger(a, b)
		}, d.fn.editor = function(a) {
			var b = Array.prototype.slice.call(arguments, 1),
				c = [];
			return "string" == typeof a ? this.each(function() {
				var f = d.data(this, "editor"),
					g = f;
				if (d.each(a.split("."), function(a, b) {
					"undefined" != typeof g[b] && (g = g[b])
				}), void 0 !== g && d.isFunction(g)) {
					var h = g.apply(f, b);
					void 0 !== h && h !== f && c.push(h)
				}
			}) : this.each(function() {
				d.data(this, "editor", {}), d.data(this, "editor", new f(this, a))
			}), c.length ? 1 === c.length ? c[0] : val : this
		}, a.exports = d
	}).call(b, c(2))
}, function(a, b, c) {
	var d, e;
	!
	function(b, c) {
		"object" == typeof a && "object" == typeof a.exports ? a.exports = b.document ? c(b, !0) : function(a) {
			if (!a.document) throw new Error("jQuery requires a window with a document");
			return c(a)
		} : c(b)
	}("undefined" != typeof window ? window : this, function(c, f) {
		function bi(a) {
			return bu.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
		}
		function bh() {
			try {
				return new c.ActiveXObject("Microsoft.XMLHTTP")
			} catch (a) {}
		}
		function bg() {
			try {
				return new c.XMLHttpRequest
			} catch (a) {}
		}
		function bf(a, b, c, d) {
			var e;
			if (bu.isArray(b)) bu.each(b, function(b, e) {
				c || dk.test(a) ? d(a, e) : bf(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
			});
			else if (c || "object" !== bu.type(b)) d(a, b);
			else for (e in b) bf(a + "[" + e + "]", b[e], c, d)
		}
		function be(a) {
			for (; a && 1 === a.nodeType;) {
				if ("none" === bd(a) || "hidden" === a.type) return !0;
				a = a.parentNode
			}
			return !1
		}
		function bd(a) {
			return a.style && a.style.display || bu.css(a, "display")
		}
		function bc(a, b, c, d) {
			var e, f, g, h, i, j = {},
				k = a.dataTypes.slice();
			if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
			for (f = k.shift(); f;) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;
			else if ("*" !== i && i !== f) {
				if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
					g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
					break
				}
				if (g !== !0) if (g && a["throws"]) b = g(b);
				else try {
					b = g(b)
				} catch (l) {
					return {
						state: "parsererror",
						error: g ? l : "No conversion from " + i + " to " + f
					}
				}
			}
			return {
				state: "success",
				data: b
			}
		}
		function bb(a, b, c) {
			for (var d, e, f, g, h = a.contents, i = a.dataTypes;
			"*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
			if (e) for (g in h) if (h[g] && h[g].test(e)) {
				i.unshift(g);
				break
			}
			if (i[0] in c) f = i[0];
			else {
				for (g in c) {
					if (!i[0] || a.converters[g + " " + i[0]]) {
						f = g;
						break
					}
					d || (d = g)
				}
				f = f || d
			}
			return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
		}
		function ba(a, b) {
			var c, d, e = bu.ajaxSettings.flatOptions || {};
			for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
			return c && bu.extend(!0, a, c), a
		}
		function _(a, b, c, d) {
			function e(h) {
				var i;
				return f[h] = !0, bu.each(a[h] || [], function(a, h) {
					var j = h(b, c, d);
					return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
				}), i
			}
			var f = {},
				g = a === df;
			return e(b.dataTypes[0]) || !f["*"] && e("*")
		}
		function $(a) {
			return function(b, c) {
				"string" != typeof b && (c = b, b = "*");
				var d, e = 0,
					f = b.toLowerCase().match(bK) || [];
				if (bu.isFunction(c)) for (; d = f[e++];)"+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
			}
		}
		function Z(a) {
			return bu.attr(a, "class") || ""
		}
		function Y(a, b, c) {
			var d, e, f = 0,
				g = Y.prefilters.length,
				h = bu.Deferred().always(function() {
					delete i.elem
				}),
				i = function() {
					if (e) return !1;
					for (var b = cG || T(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
					return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
				},
				j = h.promise({
					elem: a,
					props: bu.extend({}, b),
					opts: bu.extend(!0, {
						specialEasing: {},
						easing: bu.easing._default
					}, c),
					originalProperties: b,
					originalOptions: c,
					startTime: cG || T(),
					duration: c.duration,
					tweens: [],
					createTween: function(b, c) {
						var d = bu.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
						return j.tweens.push(d), d
					},
					stop: function(b) {
						var c = 0,
							d = b ? j.tweens.length : 0;
						if (e) return this;
						for (e = !0; d > c; c++) j.tweens[c].run(1);
						return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
					}
				}),
				k = j.props;
			for (X(k, j.opts.specialEasing); g > f; f++) if (d = Y.prefilters[f].call(j, a, k, j.opts)) return bu.isFunction(d.stop) && (bu._queueHooks(j.elem, j.opts.queue).stop = bu.proxy(d.stop, d)), d;
			return bu.map(k, V, j), bu.isFunction(j.opts.start) && j.opts.start.call(a, j), bu.fx.timer(bu.extend(i, {
				elem: a,
				anim: j,
				queue: j.opts.queue
			})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
		}
		function X(a, b) {
			var c, d, e, f, g;
			for (c in a) if (d = bu.camelCase(c), e = b[d], f = a[c], bu.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = bu.cssHooks[d], g && "expand" in g) {
				f = g.expand(f), delete a[d];
				for (c in f) c in a || (a[c] = f[c], b[c] = e)
			} else b[d] = e
		}
		function W(a, b, c) {
			var d, e, f, g, h, i, j, k, l = this,
				m = {},
				n = a.style,
				o = a.nodeType && bT(a),
				p = bu._data(a, "fxshow");
			c.queue || (h = bu._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
				h.unqueued || i()
			}), h.unqueued++, l.always(function() {
				l.always(function() {
					h.unqueued--, bu.queue(a, "fx").length || h.empty.fire()
				})
			})), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = bu.css(a, "display"), k = "none" === j ? bu._data(a, "olddisplay") || L(a.nodeName) : j, "inline" === k && "none" === bu.css(a, "float") && (bs.inlineBlockNeedsLayout && "inline" !== L(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", bs.shrinkWrapBlocks() || l.always(function() {
				n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
			}));
			for (d in b) if (e = b[d], cI.exec(e)) {
				if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
					if ("show" !== e || !p || void 0 === p[d]) continue;
					o = !0
				}
				m[d] = p && p[d] || bu.style(a, d)
			} else j = void 0;
			if (bu.isEmptyObject(m))"inline" === ("none" === j ? L(a.nodeName) : j) && (n.display = j);
			else {
				p ? "hidden" in p && (o = p.hidden) : p = bu._data(a, "fxshow", {}), f && (p.hidden = !o), o ? bu(a).show() : l.done(function() {
					bu(a).hide()
				}), l.done(function() {
					var b;
					bu._removeData(a, "fxshow");
					for (b in m) bu.style(a, b, m[b])
				});
				for (d in m) g = V(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
			}
		}
		function V(a, b, c) {
			for (var d, e = (Y.tweeners[b] || []).concat(Y.tweeners["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
		}
		function U(a, b) {
			var c, d = {
				height: a
			},
				e = 0;
			for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = bS[e], d["margin" + c] = d["padding" + c] = a;
			return b && (d.opacity = d.width = a), d
		}
		function T() {
			return c.setTimeout(function() {
				cG = void 0
			}), cG = bu.now()
		}
		function S(a, b, c, d, e) {
			return new S.prototype.init(a, b, c, d, e)
		}
		function R(a, b, d) {
			var e = !0,
				f = "width" === b ? a.offsetWidth : a.offsetHeight,
				g = cv(a),
				h = bs.boxSizing && "border-box" === bu.css(a, "boxSizing", !1, g);
			if (bk.msFullscreenElement && c.top !== c && a.getClientRects().length && (f = Math.round(100 * a.getBoundingClientRect()[b])), 0 >= f || null == f) {
				if (f = cw(a, b, g), (0 > f || null == f) && (f = a.style[b]), cs.test(f)) return f;
				e = h && (bs.boxSizingReliable() || f === a.style[b]), f = parseFloat(f) || 0
			}
			return f + Q(a, b, d || (h ? "border" : "content"), e, g) + "px"
		}
		function Q(a, b, c, d, e) {
			for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += bu.css(a, c + bS[f], !0, e)), d ? ("content" === c && (g -= bu.css(a, "padding" + bS[f], !0, e)), "margin" !== c && (g -= bu.css(a, "border" + bS[f] + "Width", !0, e))) : (g += bu.css(a, "padding" + bS[f], !0, e), "padding" !== c && (g += bu.css(a, "border" + bS[f] + "Width", !0, e)));
			return g
		}
		function P(a, b, c) {
			var d = cB.exec(b);
			return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
		}
		function O(a, b) {
			for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = bu._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && bT(d) && (f[g] = bu._data(d, "olddisplay", L(d.nodeName)))) : (e = bT(d), (c && "none" !== c || !e) && bu._data(d, "olddisplay", e ? c : bu.css(d, "display"))));
			for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
			return a
		}
		function N(a) {
			if (a in cF) return a;
			for (var b = a.charAt(0).toUpperCase() + a.slice(1), c = cE.length; c--;) if (a = cE[c] + b, a in cF) return a
		}
		function M(a, b) {
			return {
				get: function() {
					return a() ? void delete this.get : (this.get = b).apply(this, arguments)
				}
			}
		}
		function L(a) {
			var b = bk,
				c = cq[a];
			return c || (c = K(a, b), "none" !== c && c || (cp = (cp || bu("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (cp[0].contentWindow || cp[0].contentDocument).document, b.write(), b.close(), c = K(a, b), cp.detach()), cq[a] = c), c
		}
		function K(a, b) {
			var c = bu(b.createElement(a)).appendTo(b.body),
				d = bu.css(c[0], "display");
			return c.detach(), d
		}
		function J(a, b, c) {
			for (var d, e = b ? bu.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || bu.cleanData(v(d)), d.parentNode && (c && bu.contains(d.ownerDocument, d) && w(v(d, "script")), d.parentNode.removeChild(d));
			return a
		}
		function I(a, b, c, d) {
			b = bm.apply([], b);
			var e, f, g, h, i, j, k = 0,
				l = a.length,
				m = l - 1,
				n = b[0],
				o = bu.isFunction(n);
			if (o || l > 1 && "string" == typeof n && !bs.checkClone && ck.test(n)) return a.each(function(e) {
				var f = a.eq(e);
				o && (b[0] = n.call(this, e, f.html())), I(f, b, c, d)
			});
			if (l && (j = y(b, a[0].ownerDocument, !1, a, d), e = j.firstChild, 1 === j.childNodes.length && (j = e), e || d)) {
				for (h = bu.map(v(j, "script"), E), g = h.length; l > k; k++) f = j, k !== m && (f = bu.clone(f, !0, !0), g && bu.merge(h, v(f, "script"))), c.call(a[k], f, k);
				if (g) for (i = h[h.length - 1].ownerDocument, bu.map(h, F), k = 0; g > k; k++) f = h[k], bX.test(f.type || "") && !bu._data(f, "globalEval") && bu.contains(i, f) && (f.src ? bu._evalUrl && bu._evalUrl(f.src) : bu.globalEval((f.text || f.textContent || f.innerHTML || "").replace(cm, "")));
				j = e = null
			}
			return a
		}
		function H(a, b) {
			var c, d, e;
			if (1 === b.nodeType) {
				if (c = b.nodeName.toLowerCase(), !bs.noCloneEvent && b[bu.expando]) {
					e = bu._data(b);
					for (d in e.events) bu.removeEvent(b, d, e.handle);
					b.removeAttribute(bu.expando)
				}
				"script" === c && b.text !== a.text ? (E(b).text = a.text, F(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), bs.html5Clone && a.innerHTML && !bu.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && bV.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
			}
		}
		function G(a, b) {
			if (1 === b.nodeType && bu.hasData(a)) {
				var c, d, e, f = bu._data(a),
					g = bu._data(b, f),
					h = f.events;
				if (h) {
					delete g.handle, g.events = {};
					for (c in h) for (d = 0, e = h[c].length; e > d; d++) bu.event.add(b, c, h[c][d])
				}
				g.data && (g.data = bu.extend({}, g.data))
			}
		}
		function F(a) {
			var b = cl.exec(a.type);
			return b ? a.type = b[1] : a.removeAttribute("type"), a
		}
		function E(a) {
			return a.type = (null !== bu.find.attr(a, "type")) + "/" + a.type, a
		}
		function D(a, b) {
			return bu.nodeName(a, "table") && bu.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
		}
		function C(a, b, c, d, e, f) {
			var g, h;
			if ("object" == typeof b) {
				"string" != typeof c && (d = d || c, c = void 0);
				for (h in b) C(a, h, c, d, b[h], f);
				return a
			}
			if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = A;
			else if (!e) return a;
			return 1 === f && (g = e, e = function(a) {
				return bu().off(a), g.apply(this, arguments)
			}, e.guid = g.guid || (g.guid = bu.guid++)), a.each(function() {
				bu.event.add(this, b, e, d, c)
			})
		}
		function B() {
			try {
				return bk.activeElement
			} catch (a) {}
		}
		function A() {
			return !1
		}
		function z() {
			return !0
		}
		function y(a, b, c, d, e) {
			for (var f, g, h, i, j, k, l, m = a.length, n = u(b), o = [], p = 0; m > p; p++) if (g = a[p], g || 0 === g) if ("object" === bu.type(g)) bu.merge(o, g.nodeType ? [g] : g);
			else if (b_.test(g)) {
				for (i = i || n.appendChild(b.createElement("div")), j = (bW.exec(g) || ["", ""])[1].toLowerCase(), l = b$[j] || b$._default, i.innerHTML = l[1] + bu.htmlPrefilter(g) + l[2], f = l[0]; f--;) i = i.lastChild;
				if (!bs.leadingWhitespace && bY.test(g) && o.push(b.createTextNode(bY.exec(g)[0])), !bs.tbody) for (g = "table" !== j || ca.test(g) ? "<table>" !== l[1] || ca.test(g) ? 0 : i : i.firstChild, f = g && g.childNodes.length; f--;) bu.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k);
				for (bu.merge(o, i.childNodes), i.textContent = ""; i.firstChild;) i.removeChild(i.firstChild);
				i = n.lastChild
			} else o.push(b.createTextNode(g));
			for (i && n.removeChild(i), bs.appendChecked || bu.grep(v(o, "input"), x), p = 0; g = o[p++];) if (d && bu.inArray(g, d) > -1) e && e.push(g);
			else if (h = bu.contains(g.ownerDocument, g), i = v(n.appendChild(g), "script"), h && w(i), c) for (f = 0; g = i[f++];) bX.test(g.type || "") && c.push(g);
			return i = null, n
		}
		function x(a) {
			bV.test(a.type) && (a.defaultChecked = a.checked)
		}
		function w(a, b) {
			for (var c, d = 0; null != (c = a[d]); d++) bu._data(c, "globalEval", !b || bu._data(b[d], "globalEval"))
		}
		function v(a, b) {
			var c, d, e = 0,
				f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
			if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || bu.nodeName(d, b) ? f.push(d) : bu.merge(f, v(d, b));
			return void 0 === b || b && bu.nodeName(a, b) ? bu.merge([a], f) : f
		}
		function u(a) {
			var b = bZ.split("|"),
				c = a.createDocumentFragment();
			if (c.createElement) for (; b.length;) c.createElement(b.pop());
			return c
		}
		function s(a, b, c, d) {
			var e, f = 1,
				g = 20,
				h = d ?
			function() {
				return d.cur()
			} : function() {
				return bu.css(a, b, "")
			}, i = h(), j = c && c[3] || (bu.cssNumber[b] ? "" : "px"), k = (bu.cssNumber[b] || "px" !== j && +i) && bR.exec(bu.css(a, b));
			if (k && k[3] !== j) {
				j = j || k[3], c = c || [], k = +i || 1;
				do f = f || ".5", k /= f, bu.style(a, b, k + j);
				while (f !== (f = h() / i) && 1 !== f && --g)
			}
			return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
		}
		function q(a, b, c) {
			if (bN(a)) {
				var d, e, f = a.nodeType,
					g = f ? bu.cache : a,
					h = f ? a[bu.expando] : bu.expando;
				if (g[h]) {
					if (b && (d = c ? g[h] : g[h].data)) {
						bu.isArray(b) ? b = b.concat(bu.map(b, bu.camelCase)) : b in d ? b = [b] : (b = bu.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
						for (; e--;) delete d[b[e]];
						if (c ? !n(d) : !bu.isEmptyObject(d)) return
					}(c || (delete g[h].data, n(g[h]))) && (f ? bu.cleanData([a], !0) : bs.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0)
				}
			}
		}
		function p(a, b, c, d) {
			if (bN(a)) {
				var e, f, g = bu.expando,
					h = a.nodeType,
					i = h ? bu.cache : a,
					j = h ? a[g] : a[g] && g;
				if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = bj.pop() || bu.guid++ : g), i[j] || (i[j] = h ? {} : {
					toJSON: bu.noop
				}), "object" != typeof b && "function" != typeof b || (d ? i[j] = bu.extend(i[j], b) : i[j].data = bu.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[bu.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[bu.camelCase(b)])) : e = f, e
			}
		}
		function n(a) {
			var b;
			for (b in a) if (("data" !== b || !bu.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
			return !0
		}
		function m(a, b, c) {
			if (void 0 === c && 1 === a.nodeType) {
				var d = "data-" + b.replace(bP, "-$1").toLowerCase();
				if (c = a.getAttribute(d), "string" == typeof c) {
					try {
						c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : bO.test(c) ? bu.parseJSON(c) : c
					} catch (e) {}
					bu.data(a, b, c)
				} else c = void 0
			}
			return c
		}
		function l() {
			(bk.addEventListener || "load" === c.event.type || "complete" === bk.readyState) && (k(), bu.ready())
		}
		function k() {
			bk.addEventListener ? (bk.removeEventListener("DOMContentLoaded", l), c.removeEventListener("load", l)) : (bk.detachEvent("onreadystatechange", l), c.detachEvent("onload", l))
		}
		function j(a) {
			var b = {};
			return bu.each(a.match(bK) || [], function(a, c) {
				b[c] = !0
			}), b
		}
		function i(a, b) {
			do a = a[b];
			while (a && 1 !== a.nodeType);
			return a
		}
		function h(a, b, c) {
			if (bu.isFunction(b)) return bu.grep(a, function(a, d) {
				return !!b.call(a, d, a) !== c
			});
			if (b.nodeType) return bu.grep(a, function(a) {
				return a === b !== c
			});
			if ("string" == typeof b) {
				if (bE.test(b)) return bu.filter(b, a, c);
				b = bu.filter(b, a)
			}
			return bu.grep(a, function(a) {
				return bu.inArray(a, b) > -1 !== c
			})
		}
		function g(a) {
			var b = !! a && "length" in a && a.length,
				c = bu.type(a);
			return "function" === c || bu.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
		}
		var bj = [],
			bk = c.document,
			bl = bj.slice,
			bm = bj.concat,
			bn = bj.push,
			bo = bj.indexOf,
			bp = {},
			bq = bp.toString,
			br = bp.hasOwnProperty,
			bs = {},
			bt = "1.12.3",
			bu = function(a, b) {
				return new bu.fn.init(a, b)
			},
			bv = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			bw = /^-ms-/,
			bx = /-([\da-z])/gi,
			by = function(a, b) {
				return b.toUpperCase()
			};
		bu.fn = bu.prototype = {
			jquery: bt,
			constructor: bu,
			selector: "",
			length: 0,
			toArray: function() {
				return bl.call(this)
			},
			get: function(a) {
				return null != a ? 0 > a ? this[a + this.length] : this[a] : bl.call(this)
			},
			pushStack: function(a) {
				var b = bu.merge(this.constructor(), a);
				return b.prevObject = this, b.context = this.context, b
			},
			each: function(a) {
				return bu.each(this, a)
			},
			map: function(a) {
				return this.pushStack(bu.map(this, function(b, c) {
					return a.call(b, c, b)
				}))
			},
			slice: function() {
				return this.pushStack(bl.apply(this, arguments))
			},
			first: function() {
				return this.eq(0)
			},
			last: function() {
				return this.eq(-1)
			},
			eq: function(a) {
				var b = this.length,
					c = +a + (0 > a ? b : 0);
				return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
			},
			end: function() {
				return this.prevObject || this.constructor()
			},
			push: bn,
			sort: bj.sort,
			splice: bj.splice
		}, bu.extend = bu.fn.extend = function() {
			var a, b, c, d, e, f, g = arguments[0] || {},
				h = 1,
				i = arguments.length,
				j = !1;
			for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || bu.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g !== c && (j && c && (bu.isPlainObject(c) || (b = bu.isArray(c))) ? (b ? (b = !1, f = a && bu.isArray(a) ? a : []) : f = a && bu.isPlainObject(a) ? a : {}, g[d] = bu.extend(j, f, c)) : void 0 !== c && (g[d] = c));
			return g
		}, bu.extend({
			expando: "jQuery" + (bt + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function(a) {
				throw new Error(a)
			},
			noop: function() {},
			isFunction: function(a) {
				return "function" === bu.type(a)
			},
			isArray: Array.isArray ||
			function(a) {
				return "array" === bu.type(a)
			},
			isWindow: function(a) {
				return null != a && a == a.window
			},
			isNumeric: function(a) {
				var b = a && a.toString();
				return !bu.isArray(a) && b - parseFloat(b) + 1 >= 0
			},
			isEmptyObject: function(a) {
				var b;
				for (b in a) return !1;
				return !0
			},
			isPlainObject: function(a) {
				var b;
				if (!a || "object" !== bu.type(a) || a.nodeType || bu.isWindow(a)) return !1;
				try {
					if (a.constructor && !br.call(a, "constructor") && !br.call(a.constructor.prototype, "isPrototypeOf")) return !1
				} catch (c) {
					return !1
				}
				if (!bs.ownFirst) for (b in a) return br.call(a, b);
				for (b in a);
				return void 0 === b || br.call(a, b)
			},
			type: function(a) {
				return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? bp[bq.call(a)] || "object" : typeof a
			},
			globalEval: function(a) {
				a && bu.trim(a) && (c.execScript ||
				function(a) {
					c.eval.call(c, a)
				})(a)
			},
			camelCase: function(a) {
				return a.replace(bw, "ms-").replace(bx, by)
			},
			nodeName: function(a, b) {
				return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
			},
			each: function(a, b) {
				var c, d = 0;
				if (g(a)) for (c = a.length; c > d && b.call(a[d], d, a[d]) !== !1; d++);
				else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
				return a
			},
			trim: function(a) {
				return null == a ? "" : (a + "").replace(bv, "")
			},
			makeArray: function(a, b) {
				var c = b || [];
				return null != a && (g(Object(a)) ? bu.merge(c, "string" == typeof a ? [a] : a) : bn.call(c, a)), c
			},
			inArray: function(a, b, c) {
				var d;
				if (b) {
					if (bo) return bo.call(b, a, c);
					for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c
				}
				return -1
			},
			merge: function(a, b) {
				for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++];
				if (c !== c) for (; void 0 !== b[d];) a[e++] = b[d++];
				return a.length = e, a
			},
			grep: function(a, b, c) {
				for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
				return e
			},
			map: function(a, b, c) {
				var d, e, f = 0,
					h = [];
				if (g(a)) for (d = a.length; d > f; f++) e = b(a[f], f, c), null != e && h.push(e);
				else for (f in a) e = b(a[f], f, c), null != e && h.push(e);
				return bm.apply([], h)
			},
			guid: 1,
			proxy: function(a, b) {
				var c, d, e;
				return "string" == typeof b && (e = a[b], b = a, a = e), bu.isFunction(a) ? (c = bl.call(arguments, 2), d = function() {
					return a.apply(b || this, c.concat(bl.call(arguments)))
				}, d.guid = a.guid = a.guid || bu.guid++, d) : void 0
			},
			now: function() {
				return +(new Date)
			},
			support: bs
		}), "function" == typeof Symbol && (bu.fn[Symbol.iterator] = bj[Symbol.iterator]), bu.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
			bp["[object " + b + "]"] = b.toLowerCase()
		});
		var bz = function(a) {
				function t(a, c) {
					var e = c.length > 0,
						f = a.length > 0,
						g = function(d, g, h, i, j) {
							var k, l, m, n = 0,
								o = "0",
								p = d && [],
								r = [],
								s = C,
								t = d || f && w.find.TAG("*", j),
								u = P += null == s ? 1 : Math.random() || .1,
								v = t.length;
							for (j && (C = g === G || g || j); o !== v && null != (k = t[o]); o++) {
								if (f && k) {
									for (l = 0, g || k.ownerDocument === G || (F(k), h = !I); m = a[l++];) if (m(k, g || G, h)) {
										i.push(k);
										break
									}
									j && (P = u)
								}
								e && ((k = !m && k) && n--, d && p.push(k))
							}
							if (n += o, e && o !== n) {
								for (l = 0; m = c[l++];) m(p, r, g, h);
								if (d) {
									if (n > 0) for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
									r = q(r)
								}
								$.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
							}
							return j && (P = u, C = s), p
						};
					return e ? d(g) : g
				}
				function s(a) {
					for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
						return a === b
					}, g, !0), j = n(function(a) {
						return ba(b, a) > -1
					}, g, !0), k = [function(a, c, d) {
						var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
						return b = null, e
					}]; e > h; h++) if (c = w.relative[a[h].type]) k = [n(o(k), c)];
					else {
						if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
							for (d = ++h; e > d && !w.relative[a[d].type]; d++);
							return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
								value: " " === a[h - 2].type ? "*" : ""
							})).replace(bh, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
						}
						k.push(c)
					}
					return o(k)
				}
				function r(a, b, c, e, f, g) {
					return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
						var j, k, l, m = [],
							n = [],
							o = g.length,
							r = d || p(b || "*", h.nodeType ? [h] : h, []),
							s = !a || !d && b ? r : q(r, m, a, h, i),
							t = c ? f || (d ? a : o || e) ? [] : g : s;
						if (c && c(s, t, h, i), e) for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
						if (d) {
							if (f || a) {
								if (f) {
									for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
									f(null, t = [], j, i)
								}
								for (k = t.length; k--;)(l = t[k]) && (j = f ? ba(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
							}
						} else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
					})
				}
				function q(a, b, c, d, e) {
					for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
					return g
				}
				function p(a, c, d) {
					for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
					return d
				}
				function o(a) {
					return a.length > 1 ?
					function(b, c, d) {
						for (var e = a.length; e--;) if (!a[e](b, c, d)) return !1;
						return !0
					} : a[0]
				}
				function n(a, b, c) {
					var d = b.dir,
						e = c && "parentNode" === d,
						f = Q++;
					return b.first ?
					function(b, c, f) {
						for (; b = b[d];) if (1 === b.nodeType || e) return a(b, c, f)
					} : function(b, c, g) {
						var h, i, j, k = [P, f];
						if (g) {
							for (; b = b[d];) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
						} else for (; b = b[d];) if (1 === b.nodeType || e) {
							if (j = b[N] || (b[N] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === P && h[1] === f) return k[2] = h[2];
							if (i[d] = k, k[2] = a(b, c, g)) return !0
						}
					}
				}
				function m(a) {
					for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
					return d
				}
				function l() {}
				function k(a) {
					return a && "undefined" != typeof a.getElementsByTagName && a
				}
				function j(a) {
					return d(function(b) {
						return b = +b, d(function(c, d) {
							for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
						})
					})
				}
				function i(a) {
					return function(b) {
						var c = b.nodeName.toLowerCase();
						return ("input" === c || "button" === c) && b.type === a
					}
				}
				function h(a) {
					return function(b) {
						var c = b.nodeName.toLowerCase();
						return "input" === c && b.type === a
					}
				}
				function g(a, b) {
					var c = b && a,
						d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
					if (d) return d;
					if (c) for (; c = c.nextSibling;) if (c === b) return -1;
					return a ? 1 : -1
				}
				function f(a, b) {
					for (var c = a.split("|"), d = c.length; d--;) w.attrHandle[c[d]] = b
				}
				function e(a) {
					var b = G.createElement("div");
					try {
						return !!a(b)
					} catch (c) {
						return !1
					} finally {
						b.parentNode && b.parentNode.removeChild(b), b = null
					}
				}
				function d(a) {
					return a[N] = !0, a
				}
				function c() {
					function a(c, d) {
						return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
					}
					var b = [];
					return a
				}
				function b(a, b, c, d) {
					var e, f, g, h, i, j, l, n, o = b && b.ownerDocument,
						p = b ? b.nodeType : 9;
					if (c = c || [], "string" != typeof a || !a || 1 !== p && 9 !== p && 11 !== p) return c;
					if (!d && ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, I)) {
						if (11 !== p && (j = br.exec(a))) if (e = j[1]) {
							if (9 === p) {
								if (!(g = b.getElementById(e))) return c;
								if (g.id === e) return c.push(g), c
							} else if (o && (g = o.getElementById(e)) && M(b, g) && g.id === e) return c.push(g), c
						} else {
							if (j[2]) return $.apply(c, b.getElementsByTagName(a)), c;
							if ((e = j[3]) && v.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c
						}
						if (v.qsa && !T[a + " "] && (!J || !J.test(a))) {
							if (1 !== p) o = b, n = a;
							else if ("object" !== b.nodeName.toLowerCase()) {
								for ((h = b.getAttribute("id")) ? h = h.replace(bt, "\\$&") : b.setAttribute("id", h = N), l = z(a), f = l.length, i = bm.test(h) ? "#" + h : "[id='" + h + "']"; f--;) l[f] = i + " " + m(l[f]);
								n = l.join(","), o = bs.test(a) && k(b.parentNode) || b
							}
							if (n) try {
								return $.apply(c, o.querySelectorAll(n)), c
							} catch (q) {} finally {
								h === N && b.removeAttribute("id")
							}
						}
					}
					return B(a.replace(bh, "$1"), b, c, d)
				}
				var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
					O = a.document,
					P = 0,
					Q = 0,
					R = c(),
					S = c(),
					T = c(),
					U = function(a, b) {
						return a === b && (E = !0), 0
					},
					V = 1 << 31,
					W = {}.hasOwnProperty,
					X = [],
					Y = X.pop,
					Z = X.push,
					$ = X.push,
					_ = X.slice,
					ba = function(a, b) {
						for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
						return -1
					},
					bb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
					bc = "[\\x20\\t\\r\\n\\f]",
					bd = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
					be = "\\[" + bc + "*(" + bd + ")(?:" + bc + "*([*^$|!~]?=)" + bc + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + bd + "))|)" + bc + "*\\]",
					bf = ":(" + bd + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + be + ")*)|.*)\\)|)",
					bg = new RegExp(bc + "+", "g"),
					bh = new RegExp("^" + bc + "+|((?:^|[^\\\\])(?:\\\\.)*)" + bc + "+$", "g"),
					bi = new RegExp("^" + bc + "*," + bc + "*"),
					bj = new RegExp("^" + bc + "*([>+~]|" + bc + ")" + bc + "*"),
					bk = new RegExp("=" + bc + "*([^\\]'\"]*?)" + bc + "*\\]", "g"),
					bl = new RegExp(bf),
					bm = new RegExp("^" + bd + "$"),
					bn = {
						ID: new RegExp("^#(" + bd + ")"),
						CLASS: new RegExp("^\\.(" + bd + ")"),
						TAG: new RegExp("^(" + bd + "|[*])"),
						ATTR: new RegExp("^" + be),
						PSEUDO: new RegExp("^" + bf),
						CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + bc + "*(even|odd|(([+-]|)(\\d*)n|)" + bc + "*(?:([+-]|)" + bc + "*(\\d+)|))" + bc + "*\\)|)", "i"),
						bool: new RegExp("^(?:" + bb + ")$", "i"),
						needsContext: new RegExp("^" + bc + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + bc + "*((?:-\\d)?\\d*)" + bc + "*\\)|)(?=[^-]|$)", "i")
					},
					bo = /^(?:input|select|textarea|button)$/i,
					bp = /^h\d$/i,
					bq = /^[^{]+\{\s*\[native \w/,
					br = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
					bs = /[+~]/,
					bt = /'|\\/g,
					bu = new RegExp("\\\\([\\da-f]{1,6}" + bc + "?|(" + bc + ")|.)", "ig"),
					bv = function(a, b, c) {
						var d = "0x" + b - 65536;
						return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
					},
					bw = function() {
						F()
					};
				try {
					$.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
				} catch (bx) {
					$ = {
						apply: X.length ?
						function(a, b) {
							Z.apply(a, _.call(b))
						} : function(a, b) {
							for (var c = a.length, d = 0; a[c++] = b[d++];);
							a.length = c - 1
						}
					}
				}
				v = b.support = {}, y = b.isXML = function(a) {
					var b = a && (a.ownerDocument || a).documentElement;
					return b ? "HTML" !== b.nodeName : !1
				}, F = b.setDocument = function(a) {
					var b, c, d = a ? a.ownerDocument || a : O;
					return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = G.documentElement, I = !y(G), (c = G.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", bw, !1) : c.attachEvent && c.attachEvent("onunload", bw)), v.attributes = e(function(a) {
						return a.className = "i", !a.getAttribute("className")
					}), v.getElementsByTagName = e(function(a) {
						return a.appendChild(G.createComment("")), !a.getElementsByTagName("*").length
					}), v.getElementsByClassName = bq.test(G.getElementsByClassName), v.getById = e(function(a) {
						return H.appendChild(a).id = N, !G.getElementsByName || !G.getElementsByName(N).length
					}), v.getById ? (w.find.ID = function(a, b) {
						if ("undefined" != typeof b.getElementById && I) {
							var c = b.getElementById(a);
							return c ? [c] : []
						}
					}, w.filter.ID = function(a) {
						var b = a.replace(bu, bv);
						return function(a) {
							return a.getAttribute("id") === b
						}
					}) : (delete w.find.ID, w.filter.ID = function(a) {
						var b = a.replace(bu, bv);
						return function(a) {
							var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
							return c && c.value === b
						}
					}), w.find.TAG = v.getElementsByTagName ?
					function(a, b) {
						return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
					} : function(a, b) {
						var c, d = [],
							e = 0,
							f = b.getElementsByTagName(a);
						if ("*" === a) {
							for (; c = f[e++];) 1 === c.nodeType && d.push(c);
							return d
						}
						return f
					}, w.find.CLASS = v.getElementsByClassName &&
					function(a, b) {
						return "undefined" != typeof b.getElementsByClassName && I ? b.getElementsByClassName(a) : void 0
					}, K = [], J = [], (v.qsa = bq.test(G.querySelectorAll)) && (e(function(a) {
						H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + bc + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + bc + "*(?:value|" + bb + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
					}), e(function(a) {
						var b = G.createElement("input");
						b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + bc + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
					})), (v.matchesSelector = bq.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
						v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", bf)
					}), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = bq.test(H.compareDocumentPosition), M = b || bq.test(H.contains) ?
					function(a, b) {
						var c = 9 === a.nodeType ? a.documentElement : a,
							d = b && b.parentNode;
						return a === d || !! d && 1 === d.nodeType && !! (c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d))
					} : function(a, b) {
						if (b) for (; b = b.parentNode;) if (b === a) return !0;
						return !1
					}, U = b ?
					function(a, b) {
						if (a === b) return E = !0, 0;
						var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
						return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === G || a.ownerDocument === O && M(O, a) ? -1 : b === G || b.ownerDocument === O && M(O, b) ? 1 : D ? ba(D, a) - ba(D, b) : 0 : 4 & c ? -1 : 1)
					} : function(a, b) {
						if (a === b) return E = !0, 0;
						var c, d = 0,
							e = a.parentNode,
							f = b.parentNode,
							h = [a],
							i = [b];
						if (!e || !f) return a === G ? -1 : b === G ? 1 : e ? -1 : f ? 1 : D ? ba(D, a) - ba(D, b) : 0;
						if (e === f) return g(a, b);
						for (c = a; c = c.parentNode;) h.unshift(c);
						for (c = b; c = c.parentNode;) i.unshift(c);
						for (; h[d] === i[d];) d++;
						return d ? g(h[d], i[d]) : h[d] === O ? -1 : i[d] === O ? 1 : 0
					}, G) : G
				}, b.matches = function(a, c) {
					return b(a, null, null, c)
				}, b.matchesSelector = function(a, c) {
					if ((a.ownerDocument || a) !== G && F(a), c = c.replace(bk, "='$1']"), v.matchesSelector && I && !T[c + " "] && (!K || !K.test(c)) && (!J || !J.test(c))) try {
						var d = L.call(a, c);
						if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
					} catch (e) {}
					return b(c, G, null, [a]).length > 0
				}, b.contains = function(a, b) {
					return (a.ownerDocument || a) !== G && F(a), M(a, b)
				}, b.attr = function(a, b) {
					(a.ownerDocument || a) !== G && F(a);
					var c = w.attrHandle[b.toLowerCase()],
						d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
					return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
				}, b.error = function(a) {
					throw new Error("Syntax error, unrecognized expression: " + a)
				}, b.uniqueSort = function(a) {
					var b, c = [],
						d = 0,
						e = 0;
					if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
						for (; b = a[e++];) b === a[e] && (d = c.push(e));
						for (; d--;) a.splice(c[d], 1)
					}
					return D = null, a
				}, x = b.getText = function(a) {
					var b, c = "",
						d = 0,
						e = a.nodeType;
					if (e) {
						if (1 === e || 9 === e || 11 === e) {
							if ("string" == typeof a.textContent) return a.textContent;
							for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
						} else if (3 === e || 4 === e) return a.nodeValue
					} else for (; b = a[d++];) c += x(b);
					return c
				}, w = b.selectors = {
					cacheLength: 50,
					createPseudo: d,
					match: bn,
					attrHandle: {},
					find: {},
					relative: {
						">": {
							dir: "parentNode",
							first: !0
						},
						" ": {
							dir: "parentNode"
						},
						"+": {
							dir: "previousSibling",
							first: !0
						},
						"~": {
							dir: "previousSibling"
						}
					},
					preFilter: {
						ATTR: function(a) {
							return a[1] = a[1].replace(bu, bv), a[3] = (a[3] || a[4] || a[5] || "").replace(bu, bv), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
						},
						CHILD: function(a) {
							return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
						},
						PSEUDO: function(a) {
							var b, c = !a[6] && a[2];
							return bn.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && bl.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
						}
					},
					filter: {
						TAG: function(a) {
							var b = a.replace(bu, bv).toLowerCase();
							return "*" === a ?
							function() {
								return !0
							} : function(a) {
								return a.nodeName && a.nodeName.toLowerCase() === b
							}
						},
						CLASS: function(a) {
							var b = R[a + " "];
							return b || (b = new RegExp("(^|" + bc + ")" + a + "(" + bc + "|$)")) && R(a, function(a) {
								return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
							})
						},
						ATTR: function(a, c, d) {
							return function(e) {
								var f = b.attr(e, a);
								return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(bg, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
							}
						},
						CHILD: function(a, b, c, d, e) {
							var f = "nth" !== a.slice(0, 3),
								g = "last" !== a.slice(-4),
								h = "of-type" === b;
							return 1 === d && 0 === e ?
							function(a) {
								return !!a.parentNode
							} : function(b, c, i) {
								var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
									q = b.parentNode,
									r = h && b.nodeName.toLowerCase(),
									s = !i && !h,
									t = !1;
								if (q) {
									if (f) {
										for (; p;) {
											for (m = b; m = m[p];) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
											o = p = "only" === a && !o && "nextSibling"
										}
										return !0
									}
									if (o = [g ? q.firstChild : q.lastChild], g && s) {
										for (m = q, l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === P && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();) if (1 === m.nodeType && ++t && m === b) {
											k[a] = [P, n, t];
											break
										}
									} else if (s && (m = b, l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === P && j[1], t = n), t === !1) for (;
									(m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [P, t]), m !== b)););
									return t -= e, t === d || t % d === 0 && t / d >= 0
								}
							}
						},
						PSEUDO: function(a, c) {
							var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
							return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
								for (var d, e = f(a, c), g = e.length; g--;) d = ba(a, e[g]), a[d] = !(b[d] = e[g])
							}) : function(a) {
								return f(a, 0, e)
							}) : f
						}
					},
					pseudos: {
						not: d(function(a) {
							var b = [],
								c = [],
								e = A(a.replace(bh, "$1"));
							return e[N] ? d(function(a, b, c, d) {
								for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
							}) : function(a, d, f) {
								return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
							}
						}),
						has: d(function(a) {
							return function(c) {
								return b(a, c).length > 0
							}
						}),
						contains: d(function(a) {
							return a = a.replace(bu, bv), function(b) {
								return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
							}
						}),
						lang: d(function(a) {
							return bm.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(bu, bv).toLowerCase(), function(b) {
								var c;
								do
								if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
								while ((b = b.parentNode) && 1 === b.nodeType);
								return !1
							}
						}),
						target: function(b) {
							var c = a.location && a.location.hash;
							return c && c.slice(1) === b.id
						},
						root: function(a) {
							return a === H
						},
						focus: function(a) {
							return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !! (a.type || a.href || ~a.tabIndex)
						},
						enabled: function(a) {
							return a.disabled === !1
						},
						disabled: function(a) {
							return a.disabled === !0
						},
						checked: function(a) {
							var b = a.nodeName.toLowerCase();
							return "input" === b && !! a.checked || "option" === b && !! a.selected
						},
						selected: function(a) {
							return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
						},
						empty: function(a) {
							for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
							return !0
						},
						parent: function(a) {
							return !w.pseudos.empty(a)
						},
						header: function(a) {
							return bp.test(a.nodeName)
						},
						input: function(a) {
							return bo.test(a.nodeName)
						},
						button: function(a) {
							var b = a.nodeName.toLowerCase();
							return "input" === b && "button" === a.type || "button" === b
						},
						text: function(a) {
							var b;
							return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
						},
						first: j(function() {
							return [0]
						}),
						last: j(function(a, b) {
							return [b - 1]
						}),
						eq: j(function(a, b, c) {
							return [0 > c ? c + b : c]
						}),
						even: j(function(a, b) {
							for (var c = 0; b > c; c += 2) a.push(c);
							return a
						}),
						odd: j(function(a, b) {
							for (var c = 1; b > c; c += 2) a.push(c);
							return a
						}),
						lt: j(function(a, b, c) {
							for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
							return a
						}),
						gt: j(function(a, b, c) {
							for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
							return a
						})
					}
				}, w.pseudos.nth = w.pseudos.eq;
				for (u in {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) w.pseudos[u] = h(u);
				for (u in {
					submit: !0,
					reset: !0
				}) w.pseudos[u] = i(u);
				return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
					var d, e, f, g, h, i, j, k = S[a + " "];
					if (k) return c ? 0 : k.slice(0);
					for (h = a, i = [], j = w.preFilter; h;) {
						d && !(e = bi.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = bj.exec(h)) && (d = e.shift(), f.push({
							value: d,
							type: e[0].replace(bh, " ")
						}), h = h.slice(d.length));
						for (g in w.filter)!(e = bn[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
							value: d,
							type: g,
							matches: e
						}), h = h.slice(d.length));
						if (!d) break
					}
					return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
				}, A = b.compile = function(a, b) {
					var c, d = [],
						e = [],
						f = T[a + " "];
					if (!f) {
						for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
						f = T(a, t(e, d)), f.selector = a
					}
					return f
				}, B = b.select = function(a, b, c, d) {
					var e, f, g, h, i, j = "function" == typeof a && a,
						l = !d && z(a = j.selector || a);
					if (c = c || [], 1 === l.length) {
						if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
							if (b = (w.find.ID(g.matches[0].replace(bu, bv), b) || [])[0], !b) return c;
							j && (b = b.parentNode), a = a.slice(f.shift().value.length)
						}
						for (e = bn.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);) if ((i = w.find[h]) && (d = i(g.matches[0].replace(bu, bv), bs.test(f[0].type) && k(b.parentNode) || b))) {
							if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
							break
						}
					}
					return (j || A(a, l))(d, b, !I, c, !b || bs.test(a) && k(b.parentNode) || b), c
				}, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !! E, F(), v.sortDetached = e(function(a) {
					return 1 & a.compareDocumentPosition(G.createElement("div"))
				}), e(function(a) {
					return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
				}) || f("type|href|height|width", function(a, b, c) {
					return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
				}), v.attributes && e(function(a) {
					return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
				}) || f("value", function(a, b, c) {
					return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
				}), e(function(a) {
					return null == a.getAttribute("disabled")
				}) || f(bb, function(a, b, c) {
					var d;
					return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
				}), b
			}(c);
		bu.find = bz, bu.expr = bz.selectors, bu.expr[":"] = bu.expr.pseudos, bu.uniqueSort = bu.unique = bz.uniqueSort, bu.text = bz.getText, bu.isXMLDoc = bz.isXML, bu.contains = bz.contains;
		var bA = function(a, b, c) {
				for (var d = [], e = void 0 !== c;
				(a = a[b]) && 9 !== a.nodeType;) if (1 === a.nodeType) {
					if (e && bu(a).is(c)) break;
					d.push(a)
				}
				return d
			},
			bB = function(a, b) {
				for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
				return c
			},
			bC = bu.expr.match.needsContext,
			bD = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
			bE = /^.[^:#\[\.,]*$/;
		bu.filter = function(a, b, c) {
			var d = b[0];
			return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? bu.find.matchesSelector(d, a) ? [d] : [] : bu.find.matches(a, bu.grep(b, function(a) {
				return 1 === a.nodeType
			}))
		}, bu.fn.extend({
			find: function(a) {
				var b, c = [],
					d = this,
					e = d.length;
				if ("string" != typeof a) return this.pushStack(bu(a).filter(function() {
					for (b = 0; e > b; b++) if (bu.contains(d[b], this)) return !0
				}));
				for (b = 0; e > b; b++) bu.find(a, d[b], c);
				return c = this.pushStack(e > 1 ? bu.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
			},
			filter: function(a) {
				return this.pushStack(h(this, a || [], !1))
			},
			not: function(a) {
				return this.pushStack(h(this, a || [], !0))
			},
			is: function(a) {
				return !!h(this, "string" == typeof a && bC.test(a) ? bu(a) : a || [], !1).length
			}
		});
		var bF, bG = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
			bH = bu.fn.init = function(a, b, c) {
				var d, e;
				if (!a) return this;
				if (c = c || bF, "string" == typeof a) {
					if (d = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : bG.exec(a), !d || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
					if (d[1]) {
						if (b = b instanceof bu ? b[0] : b, bu.merge(this, bu.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : bk, !0)), bD.test(d[1]) && bu.isPlainObject(b)) for (d in b) bu.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
						return this
					}
					if (e = bk.getElementById(d[2]), e && e.parentNode) {
						if (e.id !== d[2]) return bF.find(a);
						this.length = 1, this[0] = e
					}
					return this.context = bk, this.selector = a, this
				}
				return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : bu.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(bu) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), bu.makeArray(a, this))
			};
		bH.prototype = bu.fn, bF = bu(bk);
		var bI = /^(?:parents|prev(?:Until|All))/,
			bJ = {
				children: !0,
				contents: !0,
				next: !0,
				prev: !0
			};
		bu.fn.extend({
			has: function(a) {
				var b, c = bu(a, this),
					d = c.length;
				return this.filter(function() {
					for (b = 0; d > b; b++) if (bu.contains(this, c[b])) return !0
				})
			},
			closest: function(a, b) {
				for (var c, d = 0, e = this.length, f = [], g = bC.test(a) || "string" != typeof a ? bu(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && bu.find.matchesSelector(c, a))) {
					f.push(c);
					break
				}
				return this.pushStack(f.length > 1 ? bu.uniqueSort(f) : f)
			},
			index: function(a) {
				return a ? "string" == typeof a ? bu.inArray(this[0], bu(a)) : bu.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
			},
			add: function(a, b) {
				return this.pushStack(bu.uniqueSort(bu.merge(this.get(), bu(a, b))))
			},
			addBack: function(a) {
				return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
			}
		}), bu.each({
			parent: function(a) {
				var b = a.parentNode;
				return b && 11 !== b.nodeType ? b : null
			},
			parents: function(a) {
				return bA(a, "parentNode")
			},
			parentsUntil: function(a, b, c) {
				return bA(a, "parentNode", c)
			},
			next: function(a) {
				return i(a, "nextSibling")
			},
			prev: function(a) {
				return i(a, "previousSibling")
			},
			nextAll: function(a) {
				return bA(a, "nextSibling")
			},
			prevAll: function(a) {
				return bA(a, "previousSibling")
			},
			nextUntil: function(a, b, c) {
				return bA(a, "nextSibling", c)
			},
			prevUntil: function(a, b, c) {
				return bA(a, "previousSibling", c)
			},
			siblings: function(a) {
				return bB((a.parentNode || {}).firstChild, a)
			},
			children: function(a) {
				return bB(a.firstChild)
			},
			contents: function(a) {
				return bu.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : bu.merge([], a.childNodes)
			}
		}, function(a, b) {
			bu.fn[a] = function(c, d) {
				var e = bu.map(this, b, c);
				return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = bu.filter(d, e)), this.length > 1 && (bJ[a] || (e = bu.uniqueSort(e)), bI.test(a) && (e = e.reverse())), this.pushStack(e)
			}
		});
		var bK = /\S+/g;
		bu.Callbacks = function(a) {
			a = "string" == typeof a ? j(a) : bu.extend({}, a);
			var b, c, d, e, f = [],
				g = [],
				h = -1,
				i = function() {
					for (e = a.once, d = b = !0; g.length; h = -1) for (c = g.shift(); ++h < f.length;) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
					a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
				},
				k = {
					add: function() {
						return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
							bu.each(b, function(b, c) {
								bu.isFunction(c) ? a.unique && k.has(c) || f.push(c) : c && c.length && "string" !== bu.type(c) && d(c)
							})
						}(arguments), c && !b && i()), this
					},
					remove: function() {
						return bu.each(arguments, function(a, b) {
							for (var c;
							(c = bu.inArray(b, f, c)) > -1;) f.splice(c, 1), h >= c && h--
						}), this
					},
					has: function(a) {
						return a ? bu.inArray(a, f) > -1 : f.length > 0
					},
					empty: function() {
						return f && (f = []), this
					},
					disable: function() {
						return e = g = [], f = c = "", this
					},
					disabled: function() {
						return !f
					},
					lock: function() {
						return e = !0, c || k.disable(), this
					},
					locked: function() {
						return !!e
					},
					fireWith: function(a, c) {
						return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
					},
					fire: function() {
						return k.fireWith(this, arguments), this
					},
					fired: function() {
						return !!d
					}
				};
			return k
		}, bu.extend({
			Deferred: function(a) {
				var b = [
					["resolve", "done", bu.Callbacks("once memory"), "resolved"],
					["reject", "fail", bu.Callbacks("once memory"), "rejected"],
					["notify", "progress", bu.Callbacks("memory")]
				],
					c = "pending",
					d = {
						state: function() {
							return c
						},
						always: function() {
							return e.done(arguments).fail(arguments), this
						},
						then: function() {
							var a = arguments;
							return bu.Deferred(function(c) {
								bu.each(b, function(b, f) {
									var g = bu.isFunction(a[b]) && a[b];
									e[f[1]](function() {
										var a = g && g.apply(this, arguments);
										a && bu.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
									})
								}), a = null
							}).promise()
						},
						promise: function(a) {
							return null != a ? bu.extend(a, d) : d
						}
					},
					e = {};
				return d.pipe = d.then, bu.each(b, function(a, f) {
					var g = f[2],
						h = f[3];
					d[f[1]] = g.add, h && g.add(function() {
						c = h
					}, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
						return e[f[0] + "With"](this === e ? d : this, arguments), this
					}, e[f[0] + "With"] = g.fireWith
				}), d.promise(e), a && a.call(e, e), e
			},
			when: function(a) {
				var b, c, d, e = 0,
					f = bl.call(arguments),
					g = f.length,
					h = 1 !== g || a && bu.isFunction(a.promise) ? g : 0,
					i = 1 === h ? a : bu.Deferred(),
					j = function(a, c, d) {
						return function(e) {
							c[a] = this, d[a] = arguments.length > 1 ? bl.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
						}
					};
				if (g > 1) for (b = Array(g), c = Array(g), d = Array(g); g > e; e++) f[e] && bu.isFunction(f[e].promise) ? f[e].promise().progress(j(e, c, b)).done(j(e, d, f)).fail(i.reject) : --h;
				return h || i.resolveWith(d, f), i.promise()
			}
		});
		var bL;
		bu.fn.ready = function(a) {
			return bu.ready.promise().done(a), this
		}, bu.extend({
			isReady: !1,
			readyWait: 1,
			holdReady: function(a) {
				a ? bu.readyWait++ : bu.ready(!0)
			},
			ready: function(a) {
				(a === !0 ? --bu.readyWait : bu.isReady) || (bu.isReady = !0, a !== !0 && --bu.readyWait > 0 || (bL.resolveWith(bk, [bu]), bu.fn.triggerHandler && (bu(bk).triggerHandler("ready"), bu(bk).off("ready"))))
			}
		}), bu.ready.promise = function(a) {
			if (!bL) if (bL = bu.Deferred(), "complete" === bk.readyState || "loading" !== bk.readyState && !bk.documentElement.doScroll) c.setTimeout(bu.ready);
			else if (bk.addEventListener) bk.addEventListener("DOMContentLoaded", l), c.addEventListener("load", l);
			else {
				bk.attachEvent("onreadystatechange", l), c.attachEvent("onload", l);
				var b = !1;
				try {
					b = null == c.frameElement && bk.documentElement
				} catch (d) {}
				b && b.doScroll && !
				function e() {
					if (!bu.isReady) {
						try {
							b.doScroll("left")
						} catch (a) {
							return c.setTimeout(e, 50)
						}
						k(), bu.ready()
					}
				}()
			}
			return bL.promise(a)
		}, bu.ready.promise();
		var bM;
		for (bM in bu(bs)) break;
		bs.ownFirst = "0" === bM, bs.inlineBlockNeedsLayout = !1, bu(function() {
			var a, b, c, d;
			c = bk.getElementsByTagName("body")[0], c && c.style && (b = bk.createElement("div"), d = bk.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", bs.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
		}), function() {
			var a = bk.createElement("div");
			bs.deleteExpando = !0;
			try {
				delete a.test
			} catch (b) {
				bs.deleteExpando = !1
			}
			a = null
		}();
		var bN = function(a) {
				var b = bu.noData[(a.nodeName + " ").toLowerCase()],
					c = +a.nodeType || 1;
				return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
			},
			bO = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			bP = /([A-Z])/g;
		bu.extend({
			cache: {},
			noData: {
				"applet ": !0,
				"embed ": !0,
				"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			},
			hasData: function(a) {
				return a = a.nodeType ? bu.cache[a[bu.expando]] : a[bu.expando], !! a && !n(a)
			},
			data: function(a, b, c) {
				return p(a, b, c)
			},
			removeData: function(a, b) {
				return q(a, b)
			},
			_data: function(a, b, c) {
				return p(a, b, c, !0)
			},
			_removeData: function(a, b) {
				return q(a, b, !0)
			}
		}), bu.fn.extend({
			data: function(a, b) {
				var c, d, e, f = this[0],
					g = f && f.attributes;
				if (void 0 === a) {
					if (this.length && (e = bu.data(f), 1 === f.nodeType && !bu._data(f, "parsedAttrs"))) {
						for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = bu.camelCase(d.slice(5)), m(f, d, e[d])));
						bu._data(f, "parsedAttrs", !0)
					}
					return e
				}
				return "object" == typeof a ? this.each(function() {
					bu.data(this, a)
				}) : arguments.length > 1 ? this.each(function() {
					bu.data(this, a, b)
				}) : f ? m(f, a, bu.data(f, a)) : void 0
			},
			removeData: function(a) {
				return this.each(function() {
					bu.removeData(this, a)
				})
			}
		}), bu.extend({
			queue: function(a, b, c) {
				var d;
				return a ? (b = (b || "fx") + "queue", d = bu._data(a, b), c && (!d || bu.isArray(c) ? d = bu._data(a, b, bu.makeArray(c)) : d.push(c)), d || []) : void 0
			},
			dequeue: function(a, b) {
				b = b || "fx";
				var c = bu.queue(a, b),
					d = c.length,
					e = c.shift(),
					f = bu._queueHooks(a, b),
					g = function() {
						bu.dequeue(a, b)
					};
				"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
			},
			_queueHooks: function(a, b) {
				var c = b + "queueHooks";
				return bu._data(a, c) || bu._data(a, c, {
					empty: bu.Callbacks("once memory").add(function() {
						bu._removeData(a, b + "queue"), bu._removeData(a, c)
					})
				})
			}
		}), bu.fn.extend({
			queue: function(a, b) {
				var c = 2;
				return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? bu.queue(this[0], a) : void 0 === b ? this : this.each(function() {
					var c = bu.queue(this, a, b);
					bu._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && bu.dequeue(this, a)
				})
			},
			dequeue: function(a) {
				return this.each(function() {
					bu.dequeue(this, a)
				})
			},
			clearQueue: function(a) {
				return this.queue(a || "fx", [])
			},
			promise: function(a, b) {
				var c, d = 1,
					e = bu.Deferred(),
					f = this,
					g = this.length,
					h = function() {
						--d || e.resolveWith(f, [f])
					};
				for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = bu._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
				return h(), e.promise(b)
			}
		}), function() {
			var a;
			bs.shrinkWrapBlocks = function() {
				if (null != a) return a;
				a = !1;
				var b, c, d;
				return c = bk.getElementsByTagName("body")[0], c && c.style ? (b = bk.createElement("div"), d = bk.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(bk.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
			}
		}();
		var bQ = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			bR = new RegExp("^(?:([+-])=|)(" + bQ + ")([a-z%]*)$", "i"),
			bS = ["Top", "Right", "Bottom", "Left"],
			bT = function(a, b) {
				return a = b || a, "none" === bu.css(a, "display") || !bu.contains(a.ownerDocument, a)
			},
			bU = function(a, b, c, d, e, f, g) {
				var h = 0,
					i = a.length,
					j = null == c;
				if ("object" === bu.type(c)) {
					e = !0;
					for (h in c) bU(a, b, h, c[h], !0, f, g)
				} else if (void 0 !== d && (e = !0, bu.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
					return j.call(bu(a), c)
				})), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
				return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
			},
			bV = /^(?:checkbox|radio)$/i,
			bW = /<([\w:-]+)/,
			bX = /^$|\/(?:java|ecma)script/i,
			bY = /^\s+/,
			bZ = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
		!
		function() {
			var a = bk.createElement("div"),
				b = bk.createDocumentFragment(),
				c = bk.createElement("input");
			a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", bs.leadingWhitespace = 3 === a.firstChild.nodeType, bs.tbody = !a.getElementsByTagName("tbody").length, bs.htmlSerialize = !! a.getElementsByTagName("link").length, bs.html5Clone = "<:nav></:nav>" !== bk.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, b.appendChild(c), bs.appendChecked = c.checked, a.innerHTML = "<textarea>x</textarea>", bs.noCloneChecked = !! a.cloneNode(!0).lastChild.defaultValue, b.appendChild(a), c = bk.createElement("input"), c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), a.appendChild(c), bs.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, bs.noCloneEvent = !! a.addEventListener, a[bu.expando] = 1, bs.attributes = !a.getAttribute(bu.expando)
		}();
		var b$ = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: bs.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		};
		b$.optgroup = b$.option, b$.tbody = b$.tfoot = b$.colgroup = b$.caption = b$.thead, b$.th = b$.td;
		var b_ = /<|&#?\w+;/,
			ca = /<tbody/i;
		!
		function() {
			var a, b, d = bk.createElement("div");
			for (a in {
				submit: !0,
				change: !0,
				focusin: !0
			}) b = "on" + a, (bs[a] = b in c) || (d.setAttribute(b, "t"), bs[a] = d.attributes[b].expando === !1);
			d = null
		}();
		var cb = /^(?:input|select|textarea)$/i,
			cc = /^key/,
			cd = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			ce = /^(?:focusinfocus|focusoutblur)$/,
			cf = /^([^.]*)(?:\.(.+)|)/;
		bu.event = {
			global: {},
			add: function(a, b, c, d, e) {
				var f, g, h, i, j, k, l, m, n, o, p, q = bu._data(a);
				if (q) {
					for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = bu.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
						return "undefined" == typeof bu || a && bu.event.triggered === a.type ? void 0 : bu.event.dispatch.apply(k.elem, arguments)
					}, k.elem = a), b = (b || "").match(bK) || [""], h = b.length; h--;) f = cf.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = bu.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = bu.event.special[n] || {}, l = bu.extend({
						type: n,
						origType: p,
						data: d,
						handler: c,
						guid: c.guid,
						selector: e,
						needsContext: e && bu.expr.match.needsContext.test(e),
						namespace: o.join(".")
					}, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), bu.event.global[n] = !0);
					a = null
				}
			},
			remove: function(a, b, c, d, e) {
				var f, g, h, i, j, k, l, m, n, o, p, q = bu.hasData(a) && bu._data(a);
				if (q && (k = q.events)) {
					for (b = (b || "").match(bK) || [""], j = b.length; j--;) if (h = cf.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
						for (l = bu.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
						i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || bu.removeEvent(a, n, q.handle), delete k[n])
					} else for (n in k) bu.event.remove(a, n + b[j], c, d, !0);
					bu.isEmptyObject(k) && (delete q.handle, bu._removeData(a, "events"))
				}
			},
			trigger: function(a, b, d, e) {
				var f, g, h, i, j, k, l, m = [d || bk],
					n = br.call(a, "type") ? a.type : a,
					o = br.call(a, "namespace") ? a.namespace.split(".") : [];
				if (h = k = d = d || bk, 3 !== d.nodeType && 8 !== d.nodeType && !ce.test(n + bu.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, a = a[bu.expando] ? a : new bu.Event(n, "object" == typeof a && a), a.isTrigger = e ? 2 : 3, a.namespace = o.join("."), a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = d), b = null == b ? [a] : bu.makeArray(b, [a]), j = bu.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, b) !== !1)) {
					if (!e && !j.noBubble && !bu.isWindow(d)) {
						for (i = j.delegateType || n, ce.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
						k === (d.ownerDocument || bk) && m.push(k.defaultView || k.parentWindow || c)
					}
					for (l = 0;
					(h = m[l++]) && !a.isPropagationStopped();) a.type = l > 1 ? i : j.bindType || n, f = (bu._data(h, "events") || {})[a.type] && bu._data(h, "handle"), f && f.apply(h, b), f = g && h[g], f && f.apply && bN(h) && (a.result = f.apply(h, b), a.result === !1 && a.preventDefault());
					if (a.type = n, !e && !a.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), b) === !1) && bN(d) && g && d[n] && !bu.isWindow(d)) {
						k = d[g], k && (d[g] = null), bu.event.triggered = n;
						try {
							d[n]()
						} catch (p) {}
						bu.event.triggered = void 0, k && (d[g] = k)
					}
					return a.result
				}
			},
			dispatch: function(a) {
				a = bu.event.fix(a);
				var b, c, d, e, f, g = [],
					h = bl.call(arguments),
					i = (bu._data(this, "events") || {})[a.type] || [],
					j = bu.event.special[a.type] || {};
				if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
					for (g = bu.event.handlers.call(this, a, i), b = 0;
					(e = g[b++]) && !a.isPropagationStopped();) for (a.currentTarget = e.elem, c = 0;
					(f = e.handlers[c++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(f.namespace) || (a.handleObj = f, a.data = f.data, d = ((bu.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
					return j.postDispatch && j.postDispatch.call(this, a), a.result
				}
			},
			handlers: function(a, b) {
				var c, d, e, f, g = [],
					h = b.delegateCount,
					i = a.target;
				if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
					for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? bu(e, this).index(i) > -1 : bu.find(e, this, null, [i]).length), d[e] && d.push(f);
					d.length && g.push({
						elem: i,
						handlers: d
					})
				}
				return h < b.length && g.push({
					elem: this,
					handlers: b.slice(h)
				}), g
			},
			fix: function(a) {
				if (a[bu.expando]) return a;
				var b, c, d, e = a.type,
					f = a,
					g = this.fixHooks[e];
				for (g || (this.fixHooks[e] = g = cd.test(e) ? this.mouseHooks : cc.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new bu.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
				return a.target || (a.target = f.srcElement || bk), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !! a.metaKey, g.filter ? g.filter(a, f) : a
			},
			props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(a, b) {
					return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(a, b) {
					var c, d, e, f = b.button,
						g = b.fromElement;
					return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || bk, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
				}
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					trigger: function() {
						if (this !== B() && this.focus) try {
							return this.focus(), !1
						} catch (a) {}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function() {
						return this === B() && this.blur ? (this.blur(), !1) : void 0
					},
					delegateType: "focusout"
				},
				click: {
					trigger: function() {
						return bu.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
					},
					_default: function(a) {
						return bu.nodeName(a.target, "a")
					}
				},
				beforeunload: {
					postDispatch: function(a) {
						void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
					}
				}
			},
			simulate: function(a, b, c) {
				var d = bu.extend(new bu.Event, c, {
					type: a,
					isSimulated: !0
				});
				bu.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault()
			}
		}, bu.removeEvent = bk.removeEventListener ?
		function(a, b, c) {
			a.removeEventListener && a.removeEventListener(b, c)
		} : function(a, b, c) {
			var d = "on" + b;
			a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
		}, bu.Event = function(a, b) {
			return this instanceof bu.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? z : A) : this.type = a, b && bu.extend(this, b), this.timeStamp = a && a.timeStamp || bu.now(), void(this[bu.expando] = !0)) : new bu.Event(a, b)
		}, bu.Event.prototype = {
			constructor: bu.Event,
			isDefaultPrevented: A,
			isPropagationStopped: A,
			isImmediatePropagationStopped: A,
			preventDefault: function() {
				var a = this.originalEvent;
				this.isDefaultPrevented = z, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
			},
			stopPropagation: function() {
				var a = this.originalEvent;
				this.isPropagationStopped = z, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
			},
			stopImmediatePropagation: function() {
				var a = this.originalEvent;
				this.isImmediatePropagationStopped = z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
			}
		}, bu.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function(a, b) {
			bu.event.special[a] = {
				delegateType: b,
				bindType: b,
				handle: function(a) {
					var c, d = this,
						e = a.relatedTarget,
						f = a.handleObj;
					return e && (e === d || bu.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
				}
			}
		}), bs.submit || (bu.event.special.submit = {
			setup: function() {
				return bu.nodeName(this, "form") ? !1 : void bu.event.add(this, "click._submit keypress._submit", function(a) {
					var b = a.target,
						c = bu.nodeName(b, "input") || bu.nodeName(b, "button") ? bu.prop(b, "form") : void 0;
					c && !bu._data(c, "submit") && (bu.event.add(c, "submit._submit", function(a) {
						a._submitBubble = !0
					}), bu._data(c, "submit", !0))
				})
			},
			postDispatch: function(a) {
				a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && bu.event.simulate("submit", this.parentNode, a))
			},
			teardown: function() {
				return bu.nodeName(this, "form") ? !1 : void bu.event.remove(this, "._submit")
			}
		}), bs.change || (bu.event.special.change = {
			setup: function() {
				return cb.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (bu.event.add(this, "propertychange._change", function(a) {
					"checked" === a.originalEvent.propertyName && (this._justChanged = !0)
				}), bu.event.add(this, "click._change", function(a) {
					this._justChanged && !a.isTrigger && (this._justChanged = !1), bu.event.simulate("change", this, a)
				})), !1) : void bu.event.add(this, "beforeactivate._change", function(a) {
					var b = a.target;
					cb.test(b.nodeName) && !bu._data(b, "change") && (bu.event.add(b, "change._change", function(a) {
						!this.parentNode || a.isSimulated || a.isTrigger || bu.event.simulate("change", this.parentNode, a)
					}), bu._data(b, "change", !0))
				})
			},
			handle: function(a) {
				var b = a.target;
				return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
			},
			teardown: function() {
				return bu.event.remove(this, "._change"), !cb.test(this.nodeName)
			}
		}), bs.focusin || bu.each({
			focus: "focusin",
			blur: "focusout"
		}, function(a, b) {
			var c = function(a) {
					bu.event.simulate(b, a.target, bu.event.fix(a))
				};
			bu.event.special[b] = {
				setup: function() {
					var d = this.ownerDocument || this,
						e = bu._data(d, b);
					e || d.addEventListener(a, c, !0), bu._data(d, b, (e || 0) + 1)
				},
				teardown: function() {
					var d = this.ownerDocument || this,
						e = bu._data(d, b) - 1;
					e ? bu._data(d, b, e) : (d.removeEventListener(a, c, !0), bu._removeData(d, b))
				}
			}
		}), bu.fn.extend({
			on: function(a, b, c, d) {
				return C(this, a, b, c, d)
			},
			one: function(a, b, c, d) {
				return C(this, a, b, c, d, 1)
			},
			off: function(a, b, c) {
				var d, e;
				if (a && a.preventDefault && a.handleObj) return d = a.handleObj, bu(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
				if ("object" == typeof a) {
					for (e in a) this.off(e, b, a[e]);
					return this
				}
				return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = A), this.each(function() {
					bu.event.remove(this, a, c, b)
				})
			},
			trigger: function(a, b) {
				return this.each(function() {
					bu.event.trigger(a, b, this)
				})
			},
			triggerHandler: function(a, b) {
				var c = this[0];
				return c ? bu.event.trigger(a, b, c, !0) : void 0
			}
		});
		var cg = / jQuery\d+="(?:null|\d+)"/g,
			ch = new RegExp("<(?:" + bZ + ")[\\s/>]", "i"),
			ci = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
			cj = /<script|<style|<link/i,
			ck = /checked\s*(?:[^=]|=\s*.checked.)/i,
			cl = /^true\/(.*)/,
			cm = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
			cn = u(bk),
			co = cn.appendChild(bk.createElement("div"));
		bu.extend({
			htmlPrefilter: function(a) {
				return a.replace(ci, "<$1></$2>")
			},
			clone: function(a, b, c) {
				var d, e, f, g, h, i = bu.contains(a.ownerDocument, a);
				if (bs.html5Clone || bu.isXMLDoc(a) || !ch.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (co.innerHTML = a.outerHTML, co.removeChild(f = co.firstChild)), !(bs.noCloneEvent && bs.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || bu.isXMLDoc(a))) for (d = v(f), h = v(a), g = 0; null != (e = h[g]); ++g) d[g] && H(e, d[g]);
				if (b) if (c) for (h = h || v(a), d = d || v(f), g = 0; null != (e = h[g]); g++) G(e, d[g]);
				else G(a, f);
				return d = v(f, "script"), d.length > 0 && w(d, !i && v(a, "script")), d = h = e = null, f
			},
			cleanData: function(a, b) {
				for (var c, d, e, f, g = 0, h = bu.expando, i = bu.cache, j = bs.attributes, k = bu.event.special; null != (c = a[g]); g++) if ((b || bN(c)) && (e = c[h], f = e && i[e])) {
					if (f.events) for (d in f.events) k[d] ? bu.event.remove(c, d) : bu.removeEvent(c, d, f.handle);
					i[e] && (delete i[e], j || "undefined" == typeof c.removeAttribute ? c[h] = void 0 : c.removeAttribute(h), bj.push(e))
				}
			}
		}), bu.fn.extend({
			domManip: I,
			detach: function(a) {
				return J(this, a, !0)
			},
			remove: function(a) {
				return J(this, a)
			},
			text: function(a) {
				return bU(this, function(a) {
					return void 0 === a ? bu.text(this) : this.empty().append((this[0] && this[0].ownerDocument || bk).createTextNode(a))
				}, null, a, arguments.length)
			},
			append: function() {
				return I(this, arguments, function(a) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var b = D(this, a);
						b.appendChild(a)
					}
				})
			},
			prepend: function() {
				return I(this, arguments, function(a) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var b = D(this, a);
						b.insertBefore(a, b.firstChild)
					}
				})
			},
			before: function() {
				return I(this, arguments, function(a) {
					this.parentNode && this.parentNode.insertBefore(a, this)
				})
			},
			after: function() {
				return I(this, arguments, function(a) {
					this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
				})
			},
			empty: function() {
				for (var a, b = 0; null != (a = this[b]); b++) {
					for (1 === a.nodeType && bu.cleanData(v(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
					a.options && bu.nodeName(a, "select") && (a.options.length = 0)
				}
				return this
			},
			clone: function(a, b) {
				return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
					return bu.clone(this, a, b)
				})
			},
			html: function(a) {
				return bU(this, function(a) {
					var b = this[0] || {},
						c = 0,
						d = this.length;
					if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(cg, "") : void 0;
					if ("string" == typeof a && !cj.test(a) && (bs.htmlSerialize || !ch.test(a)) && (bs.leadingWhitespace || !bY.test(a)) && !b$[(bW.exec(a) || ["", ""])[1].toLowerCase()]) {
						a = bu.htmlPrefilter(a);
						try {
							for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (bu.cleanData(v(b, !1)), b.innerHTML = a);
							b = 0
						} catch (e) {}
					}
					b && this.empty().append(a)
				}, null, a, arguments.length)
			},
			replaceWith: function() {
				var a = [];
				return I(this, arguments, function(b) {
					var c = this.parentNode;
					bu.inArray(this, a) < 0 && (bu.cleanData(v(this)), c && c.replaceChild(b, this))
				}, a)
			}
		}), bu.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(a, b) {
			bu.fn[a] = function(a) {
				for (var c, d = 0, e = [], f = bu(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), bu(f[d])[b](c), bn.apply(e, c.get());
				return this.pushStack(e)
			}
		});
		var cp, cq = {
			HTML: "block",
			BODY: "block"
		},
			cr = /^margin/,
			cs = new RegExp("^(" + bQ + ")(?!px)[a-z%]+$", "i"),
			ct = function(a, b, c, d) {
				var e, f, g = {};
				for (f in b) g[f] = a.style[f], a.style[f] = b[f];
				e = c.apply(a, d || []);
				for (f in b) a.style[f] = g[f];
				return e
			},
			cu = bk.documentElement;
		!
		function() {
			function a() {
				var a, k, l = bk.documentElement;
				l.appendChild(i), j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", b = e = h = !1, d = g = !0, c.getComputedStyle && (k = c.getComputedStyle(j), b = "1%" !== (k || {}).top, h = "2px" === (k || {}).marginLeft, e = "4px" === (k || {
					width: "4px"
				}).width, j.style.marginRight = "50%", d = "4px" === (k || {
					marginRight: "4px"
				}).marginRight, a = j.appendChild(bk.createElement("div")), a.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", j.style.width = "1px", g = !parseFloat((c.getComputedStyle(a) || {}).marginRight), j.removeChild(a)), j.style.display = "none", f = 0 === j.getClientRects().length, f && (j.style.display = "", j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = j.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", f = 0 === a[0].offsetHeight, f && (a[0].style.display = "", a[1].style.display = "none", f = 0 === a[0].offsetHeight)), l.removeChild(i)
			}
			var b, d, e, f, g, h, i = bk.createElement("div"),
				j = bk.createElement("div");
			j.style && (j.style.cssText = "float:left;opacity:.5", bs.opacity = "0.5" === j.style.opacity, bs.cssFloat = !! j.style.cssFloat, j.style.backgroundClip = "content-box", j.cloneNode(!0).style.backgroundClip = "", bs.clearCloneStyle = "content-box" === j.style.backgroundClip, i = bk.createElement("div"), i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", j.innerHTML = "", i.appendChild(j), bs.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing, bu.extend(bs, {
				reliableHiddenOffsets: function() {
					return null == b && a(), f
				},
				boxSizingReliable: function() {
					return null == b && a(), e
				},
				pixelMarginRight: function() {
					return null == b && a(), d
				},
				pixelPosition: function() {
					return null == b && a(), b
				},
				reliableMarginRight: function() {
					return null == b && a(), g
				},
				reliableMarginLeft: function() {
					return null == b && a(), h
				}
			}))
		}();
		var cv, cw, cx = /^(top|right|bottom|left)$/;
		c.getComputedStyle ? (cv = function(a) {
			var b = a.ownerDocument.defaultView;
			return b && b.opener || (b = c), b.getComputedStyle(a)
		}, cw = function(a, b, c) {
			var d, e, f, g, h = a.style;
			return c = c || cv(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || bu.contains(a.ownerDocument, a) || (g = bu.style(a, b)), c && !bs.pixelMarginRight() && cs.test(g) && cr.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 === g ? g : g + ""
		}) : cu.currentStyle && (cv = function(a) {
			return a.currentStyle
		}, cw = function(a, b, c) {
			var d, e, f, g, h = a.style;
			return c = c || cv(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), cs.test(g) && !cx.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
		});
		var cy = /alpha\([^)]*\)/i,
			cz = /opacity\s*=\s*([^)]*)/i,
			cA = /^(none|table(?!-c[ea]).+)/,
			cB = new RegExp("^(" + bQ + ")(.*)$", "i"),
			cC = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			cD = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			cE = ["Webkit", "O", "Moz", "ms"],
			cF = bk.createElement("div").style;
		bu.extend({
			cssHooks: {
				opacity: {
					get: function(a, b) {
						if (b) {
							var c = cw(a, "opacity");
							return "" === c ? "1" : c
						}
					}
				}
			},
			cssNumber: {
				animationIterationCount: !0,
				columnCount: !0,
				fillOpacity: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {
				"float": bs.cssFloat ? "cssFloat" : "styleFloat"
			},
			style: function(a, b, c, d) {
				if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
					var e, f, g, h = bu.camelCase(b),
						i = a.style;
					if (b = bu.cssProps[h] || (bu.cssProps[h] = N(h) || h), g = bu.cssHooks[b] || bu.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
					if (f = typeof c, "string" === f && (e = bR.exec(c)) && e[1] && (c = s(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (bu.cssNumber[h] ? "" : "px")), bs.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
						i[b] = c
					} catch (j) {}
				}
			},
			css: function(a, b, c, d) {
				var e, f, g, h = bu.camelCase(b);
				return b = bu.cssProps[h] || (bu.cssProps[h] = N(h) || h), g = bu.cssHooks[b] || bu.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = cw(a, b, d)), "normal" === f && b in cD && (f = cD[b]), "" === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f
			}
		}), bu.each(["height", "width"], function(a, b) {
			bu.cssHooks[b] = {
				get: function(a, c, d) {
					return c ? cA.test(bu.css(a, "display")) && 0 === a.offsetWidth ? ct(a, cC, function() {
						return R(a, b, d)
					}) : R(a, b, d) : void 0
				},
				set: function(a, c, d) {
					var e = d && cv(a);
					return P(a, c, d ? Q(a, b, d, bs.boxSizing && "border-box" === bu.css(a, "boxSizing", !1, e), e) : 0)
				}
			}
		}), bs.opacity || (bu.cssHooks.opacity = {
			get: function(a, b) {
				return cz.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
			},
			set: function(a, b) {
				var c = a.style,
					d = a.currentStyle,
					e = bu.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
					f = d && d.filter || c.filter || "";
				c.zoom = 1, (b >= 1 || "" === b) && "" === bu.trim(f.replace(cy, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = cy.test(f) ? f.replace(cy, e) : f + " " + e)
			}
		}), bu.cssHooks.marginRight = M(bs.reliableMarginRight, function(a, b) {
			return b ? ct(a, {
				display: "inline-block"
			}, cw, [a, "marginRight"]) : void 0
		}), bu.cssHooks.marginLeft = M(bs.reliableMarginLeft, function(a, b) {
			return b ? (parseFloat(cw(a, "marginLeft")) || (bu.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - ct(a, {
				marginLeft: 0
			}, function() {
				return a.getBoundingClientRect().left
			}) : 0)) + "px" : void 0
		}), bu.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(a, b) {
			bu.cssHooks[a + b] = {
				expand: function(c) {
					for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + bS[d] + b] = f[d] || f[d - 2] || f[0];
					return e
				}
			}, cr.test(a) || (bu.cssHooks[a + b].set = P)
		}), bu.fn.extend({
			css: function(a, b) {
				return bU(this, function(a, b, c) {
					var d, e, f = {},
						g = 0;
					if (bu.isArray(b)) {
						for (d = cv(a), e = b.length; e > g; g++) f[b[g]] = bu.css(a, b[g], !1, d);
						return f
					}
					return void 0 !== c ? bu.style(a, b, c) : bu.css(a, b)
				}, a, b, arguments.length > 1)
			},
			show: function() {
				return O(this, !0)
			},
			hide: function() {
				return O(this)
			},
			toggle: function(a) {
				return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
					bT(this) ? bu(this).show() : bu(this).hide()
				})
			}
		}), bu.Tween = S, S.prototype = {
			constructor: S,
			init: function(a, b, c, d, e, f) {
				this.elem = a, this.prop = c, this.easing = e || bu.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (bu.cssNumber[c] ? "" : "px")
			},
			cur: function() {
				var a = S.propHooks[this.prop];
				return a && a.get ? a.get(this) : S.propHooks._default.get(this)
			},
			run: function(a) {
				var b, c = S.propHooks[this.prop];
				return this.options.duration ? this.pos = b = bu.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : S.propHooks._default.set(this), this
			}
		}, S.prototype.init.prototype = S.prototype, S.propHooks = {
			_default: {
				get: function(a) {
					var b;
					return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = bu.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
				},
				set: function(a) {
					bu.fx.step[a.prop] ? bu.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[bu.cssProps[a.prop]] && !bu.cssHooks[a.prop] ? a.elem[a.prop] = a.now : bu.style(a.elem, a.prop, a.now + a.unit)
				}
			}
		}, S.propHooks.scrollTop = S.propHooks.scrollLeft = {
			set: function(a) {
				a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
			}
		}, bu.easing = {
			linear: function(a) {
				return a
			},
			swing: function(a) {
				return .5 - Math.cos(a * Math.PI) / 2
			},
			_default: "swing"
		}, bu.fx = S.prototype.init, bu.fx.step = {};
		var cG, cH, cI = /^(?:toggle|show|hide)$/,
			cJ = /queueHooks$/;
		bu.Animation = bu.extend(Y, {
			tweeners: {
				"*": [function(a, b) {
					var c = this.createTween(a, b);
					return s(c.elem, a, bR.exec(b), c), c
				}]
			},
			tweener: function(a, b) {
				bu.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(bK);
				for (var c, d = 0, e = a.length; e > d; d++) c = a[d], Y.tweeners[c] = Y.tweeners[c] || [], Y.tweeners[c].unshift(b)
			},
			prefilters: [W],
			prefilter: function(a, b) {
				b ? Y.prefilters.unshift(a) : Y.prefilters.push(a)
			}
		}), bu.speed = function(a, b, c) {
			var d = a && "object" == typeof a ? bu.extend({}, a) : {
				complete: c || !c && b || bu.isFunction(a) && a,
				duration: a,
				easing: c && b || b && !bu.isFunction(b) && b
			};
			return d.duration = bu.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in bu.fx.speeds ? bu.fx.speeds[d.duration] : bu.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
				bu.isFunction(d.old) && d.old.call(this), d.queue && bu.dequeue(this, d.queue)
			}, d
		}, bu.fn.extend({
			fadeTo: function(a, b, c, d) {
				return this.filter(bT).css("opacity", 0).show().end().animate({
					opacity: b
				}, a, c, d)
			},
			animate: function(a, b, c, d) {
				var e = bu.isEmptyObject(a),
					f = bu.speed(b, c, d),
					g = function() {
						var b = Y(this, bu.extend({}, a), f);
						(e || bu._data(this, "finish")) && b.stop(!0)
					};
				return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
			},
			stop: function(a, b, c) {
				var d = function(a) {
						var b = a.stop;
						delete a.stop, b(c)
					};
				return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
					var b = !0,
						e = null != a && a + "queueHooks",
						f = bu.timers,
						g = bu._data(this);
					if (e) g[e] && g[e].stop && d(g[e]);
					else for (e in g) g[e] && g[e].stop && cJ.test(e) && d(g[e]);
					for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
					!b && c || bu.dequeue(this, a)
				})
			},
			finish: function(a) {
				return a !== !1 && (a = a || "fx"), this.each(function() {
					var b, c = bu._data(this),
						d = c[a + "queue"],
						e = c[a + "queueHooks"],
						f = bu.timers,
						g = d ? d.length : 0;
					for (c.finish = !0, bu.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
					for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
					delete c.finish
				})
			}
		}), bu.each(["toggle", "show", "hide"], function(a, b) {
			var c = bu.fn[b];
			bu.fn[b] = function(a, d, e) {
				return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(U(b, !0), a, d, e)
			}
		}), bu.each({
			slideDown: U("show"),
			slideUp: U("hide"),
			slideToggle: U("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(a, b) {
			bu.fn[a] = function(a, c, d) {
				return this.animate(b, a, c, d)
			}
		}), bu.timers = [], bu.fx.tick = function() {
			var a, b = bu.timers,
				c = 0;
			for (cG = bu.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
			b.length || bu.fx.stop(), cG = void 0
		}, bu.fx.timer = function(a) {
			bu.timers.push(a), a() ? bu.fx.start() : bu.timers.pop()
		}, bu.fx.interval = 13, bu.fx.start = function() {
			cH || (cH = c.setInterval(bu.fx.tick, bu.fx.interval))
		}, bu.fx.stop = function() {
			c.clearInterval(cH), cH = null
		}, bu.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, bu.fn.delay = function(a, b) {
			return a = bu.fx ? bu.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, d) {
				var e = c.setTimeout(b, a);
				d.stop = function() {
					c.clearTimeout(e)
				}
			})
		}, function() {
			var a, b = bk.createElement("input"),
				c = bk.createElement("div"),
				d = bk.createElement("select"),
				e = d.appendChild(bk.createElement("option"));
			c = bk.createElement("div"), c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], b.setAttribute("type", "checkbox"), c.appendChild(b), a = c.getElementsByTagName("a")[0], a.style.cssText = "top:1px", bs.getSetAttribute = "t" !== c.className, bs.style = /top/.test(a.getAttribute("style")), bs.hrefNormalized = "/a" === a.getAttribute("href"), bs.checkOn = !! b.value, bs.optSelected = e.selected, bs.enctype = !! bk.createElement("form").enctype, d.disabled = !0, bs.optDisabled = !e.disabled, b = bk.createElement("input"), b.setAttribute("value", ""), bs.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), bs.radioValue = "t" === b.value
		}();
		var cK = /\r/g,
			cL = /[\x20\t\r\n\f]+/g;
		bu.fn.extend({
			val: function(a) {
				var b, c, d, e = this[0];
				if (arguments.length) return d = bu.isFunction(a), this.each(function(c) {
					var e;
					1 === this.nodeType && (e = d ? a.call(this, c, bu(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : bu.isArray(e) && (e = bu.map(e, function(a) {
						return null == a ? "" : a + ""
					})), b = bu.valHooks[this.type] || bu.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
				});
				if (e) return b = bu.valHooks[e.type] || bu.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(cK, "") : null == c ? "" : c)
			}
		}), bu.extend({
			valHooks: {
				option: {
					get: function(a) {
						var b = bu.find.attr(a, "value");
						return null != b ? b : bu.trim(bu.text(a)).replace(cL, " ")
					}
				},
				select: {
					get: function(a) {
						for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], (c.selected || i === e) && (bs.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !bu.nodeName(c.parentNode, "optgroup"))) {
							if (b = bu(c).val(), f) return b;
							g.push(b)
						}
						return g
					},
					set: function(a, b) {
						for (var c, d, e = a.options, f = bu.makeArray(b), g = e.length; g--;) if (d = e[g], bu.inArray(bu.valHooks.option.get(d), f) > -1) try {
							d.selected = c = !0
						} catch (h) {
							d.scrollHeight
						} else d.selected = !1;
						return c || (a.selectedIndex = -1), e
					}
				}
			}
		}), bu.each(["radio", "checkbox"], function() {
			bu.valHooks[this] = {
				set: function(a, b) {
					return bu.isArray(b) ? a.checked = bu.inArray(bu(a).val(), b) > -1 : void 0
				}
			}, bs.checkOn || (bu.valHooks[this].get = function(a) {
				return null === a.getAttribute("value") ? "on" : a.value
			})
		});
		var cM, cN, cO = bu.expr.attrHandle,
			cP = /^(?:checked|selected)$/i,
			cQ = bs.getSetAttribute,
			cR = bs.input;
		bu.fn.extend({
			attr: function(a, b) {
				return bU(this, bu.attr, a, b, arguments.length > 1)
			},
			removeAttr: function(a) {
				return this.each(function() {
					bu.removeAttr(this, a)
				})
			}
		}), bu.extend({
			attr: function(a, b, c) {
				var d, e, f = a.nodeType;
				if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? bu.prop(a, b, c) : (1 === f && bu.isXMLDoc(a) || (b = b.toLowerCase(), e = bu.attrHooks[b] || (bu.expr.match.bool.test(b) ? cN : cM)), void 0 !== c ? null === c ? void bu.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = bu.find.attr(a, b), null == d ? void 0 : d))
			},
			attrHooks: {
				type: {
					set: function(a, b) {
						if (!bs.radioValue && "radio" === b && bu.nodeName(a, "input")) {
							var c = a.value;
							return a.setAttribute("type", b), c && (a.value = c), b
						}
					}
				}
			},
			removeAttr: function(a, b) {
				var c, d, e = 0,
					f = b && b.match(bK);
				if (f && 1 === a.nodeType) for (; c = f[e++];) d = bu.propFix[c] || c, bu.expr.match.bool.test(c) ? cR && cQ || !cP.test(c) ? a[d] = !1 : a[bu.camelCase("default-" + c)] = a[d] = !1 : bu.attr(a, c, ""), a.removeAttribute(cQ ? c : d)
			}
		}), cN = {
			set: function(a, b, c) {
				return b === !1 ? bu.removeAttr(a, c) : cR && cQ || !cP.test(c) ? a.setAttribute(!cQ && bu.propFix[c] || c, c) : a[bu.camelCase("default-" + c)] = a[c] = !0, c
			}
		}, bu.each(bu.expr.match.bool.source.match(/\w+/g), function(a, b) {
			var c = cO[b] || bu.find.attr;
			cR && cQ || !cP.test(b) ? cO[b] = function(a, b, d) {
				var e, f;
				return d || (f = cO[b], cO[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, cO[b] = f), e
			} : cO[b] = function(a, b, c) {
				return c ? void 0 : a[bu.camelCase("default-" + b)] ? b.toLowerCase() : null
			}
		}), cR && cQ || (bu.attrHooks.value = {
			set: function(a, b, c) {
				return bu.nodeName(a, "input") ? void(a.defaultValue = b) : cM && cM.set(a, b, c)
			}
		}), cQ || (cM = {
			set: function(a, b, c) {
				var d = a.getAttributeNode(c);
				return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
			}
		}, cO.id = cO.name = cO.coords = function(a, b, c) {
			var d;
			return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
		}, bu.valHooks.button = {
			get: function(a, b) {
				var c = a.getAttributeNode(b);
				return c && c.specified ? c.value : void 0
			},
			set: cM.set
		}, bu.attrHooks.contenteditable = {
			set: function(a, b, c) {
				cM.set(a, "" === b ? !1 : b, c)
			}
		}, bu.each(["width", "height"], function(a, b) {
			bu.attrHooks[b] = {
				set: function(a, c) {
					return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
				}
			}
		})), bs.style || (bu.attrHooks.style = {
			get: function(a) {
				return a.style.cssText || void 0
			},
			set: function(a, b) {
				return a.style.cssText = b + ""
			}
		});
		var cS = /^(?:input|select|textarea|button|object)$/i,
			cT = /^(?:a|area)$/i;
		bu.fn.extend({
			prop: function(a, b) {
				return bU(this, bu.prop, a, b, arguments.length > 1)
			},
			removeProp: function(a) {
				return a = bu.propFix[a] || a, this.each(function() {
					try {
						this[a] = void 0, delete this[a]
					} catch (b) {}
				})
			}
		}), bu.extend({
			prop: function(a, b, c) {
				var d, e, f = a.nodeType;
				if (3 !== f && 8 !== f && 2 !== f) return 1 === f && bu.isXMLDoc(a) || (b = bu.propFix[b] || b, e = bu.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
			},
			propHooks: {
				tabIndex: {
					get: function(a) {
						var b = bu.find.attr(a, "tabindex");
						return b ? parseInt(b, 10) : cS.test(a.nodeName) || cT.test(a.nodeName) && a.href ? 0 : -1
					}
				}
			},
			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		}), bs.hrefNormalized || bu.each(["href", "src"], function(a, b) {
			bu.propHooks[b] = {
				get: function(a) {
					return a.getAttribute(b, 4)
				}
			}
		}), bs.optSelected || (bu.propHooks.selected = {
			get: function(a) {
				var b = a.parentNode;
				return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
			},
			set: function(a) {
				var b = a.parentNode;
				b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
			}
		}), bu.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
			bu.propFix[this.toLowerCase()] = this
		}), bs.enctype || (bu.propFix.enctype = "encoding");
		var cU = /[\t\r\n\f]/g;
		bu.fn.extend({
			addClass: function(a) {
				var b, c, d, e, f, g, h, i = 0;
				if (bu.isFunction(a)) return this.each(function(b) {
					bu(this).addClass(a.call(this, b, Z(this)))
				});
				if ("string" == typeof a && a) for (b = a.match(bK) || []; c = this[i++];) if (e = Z(c), d = 1 === c.nodeType && (" " + e + " ").replace(cU, " ")) {
					for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
					h = bu.trim(d), e !== h && bu.attr(c, "class", h)
				}
				return this
			},
			removeClass: function(a) {
				var b, c, d, e, f, g, h, i = 0;
				if (bu.isFunction(a)) return this.each(function(b) {
					bu(this).removeClass(a.call(this, b, Z(this)))
				});
				if (!arguments.length) return this.attr("class", "");
				if ("string" == typeof a && a) for (b = a.match(bK) || []; c = this[i++];) if (e = Z(c), d = 1 === c.nodeType && (" " + e + " ").replace(cU, " ")) {
					for (g = 0; f = b[g++];) for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
					h = bu.trim(d), e !== h && bu.attr(c, "class", h)
				}
				return this
			},
			toggleClass: function(a, b) {
				var c = typeof a;
				return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : bu.isFunction(a) ? this.each(function(c) {
					bu(this).toggleClass(a.call(this, c, Z(this), b), b)
				}) : this.each(function() {
					var b, d, e, f;
					if ("string" === c) for (d = 0, e = bu(this), f = a.match(bK) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
					else void 0 !== a && "boolean" !== c || (b = Z(this), b && bu._data(this, "__className__", b), bu.attr(this, "class", b || a === !1 ? "" : bu._data(this, "__className__") || ""))
				})
			},
			hasClass: function(a) {
				var b, c, d = 0;
				for (b = " " + a + " "; c = this[d++];) if (1 === c.nodeType && (" " + Z(c) + " ").replace(cU, " ").indexOf(b) > -1) return !0;
				return !1
			}
		}), bu.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
			bu.fn[b] = function(a, c) {
				return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
			}
		}), bu.fn.extend({
			hover: function(a, b) {
				return this.mouseenter(a).mouseleave(b || a)
			}
		});
		var cV = c.location,
			cW = bu.now(),
			cX = /\?/,
			cY = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
		bu.parseJSON = function(a) {
			if (c.JSON && c.JSON.parse) return c.JSON.parse(a + "");
			var b, d = null,
				e = bu.trim(a + "");
			return e && !bu.trim(e.replace(cY, function(a, c, e, f) {
				return b && c && (d = 0), 0 === d ? a : (b = e || c, d += !f - !e, "")
			})) ? Function("return " + e)() : bu.error("Invalid JSON: " + a)
		}, bu.parseXML = function(a) {
			var b, d;
			if (!a || "string" != typeof a) return null;
			try {
				c.DOMParser ? (d = new c.DOMParser, b = d.parseFromString(a, "text/xml")) : (b = new c.ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a))
			} catch (e) {
				b = void 0
			}
			return b && b.documentElement && !b.getElementsByTagName("parsererror").length || bu.error("Invalid XML: " + a), b
		};
		var cZ = /#.*$/,
			c$ = /([?&])_=[^&]*/,
			c_ = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
			da = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			db = /^(?:GET|HEAD)$/,
			dc = /^\/\//,
			dd = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
			de = {},
			df = {},
			dg = "*/".concat("*"),
			dh = cV.href,
			di = dd.exec(dh.toLowerCase()) || [];
		bu.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: dh,
				type: "GET",
				isLocal: da.test(di[1]),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": dg,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": bu.parseJSON,
					"text xml": bu.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function(a, b) {
				return b ? ba(ba(a, bu.ajaxSettings), b) : ba(bu.ajaxSettings, a)
			},
			ajaxPrefilter: $(de),
			ajaxTransport: $(df),
			ajax: function(a, b) {
				function d(a, b, d, e) {
					var f, l, s, t, v, x = b;
					2 !== u && (u = 2, i && c.clearTimeout(i), k = void 0, h = e || "", w.readyState = a > 0 ? 4 : 0, f = a >= 200 && 300 > a || 304 === a, d && (t = bb(m, w, d)), t = bc(m, t, w, f), f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (bu.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (bu.etag[g] = v)), 204 === a || "HEAD" === m.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, f = !s)) : (s = x, !a && x || (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (b || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = void 0, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --bu.active || bu.event.trigger("ajaxStop")))
				}
				"object" == typeof a && (b = a, a = void 0), b = b || {};
				var e, f, g, h, i, j, k, l, m = bu.ajaxSetup({}, b),
					n = m.context || m,
					o = m.context && (n.nodeType || n.jquery) ? bu(n) : bu.event,
					p = bu.Deferred(),
					q = bu.Callbacks("once memory"),
					r = m.statusCode || {},
					s = {},
					t = {},
					u = 0,
					v = "canceled",
					w = {
						readyState: 0,
						getResponseHeader: function(a) {
							var b;
							if (2 === u) {
								if (!l) for (l = {}; b = c_.exec(h);) l[b[1].toLowerCase()] = b[2];
								b = l[a.toLowerCase()]
							}
							return null == b ? null : b
						},
						getAllResponseHeaders: function() {
							return 2 === u ? h : null
						},
						setRequestHeader: function(a, b) {
							var c = a.toLowerCase();
							return u || (a = t[c] = t[c] || a, s[a] = b), this
						},
						overrideMimeType: function(a) {
							return u || (m.mimeType = a), this
						},
						statusCode: function(a) {
							var b;
							if (a) if (2 > u) for (b in a) r[b] = [r[b], a[b]];
							else w.always(a[w.status]);
							return this
						},
						abort: function(a) {
							var b = a || v;
							return k && k.abort(b), d(0, b), this
						}
					};
				if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || dh) + "").replace(cZ, "").replace(dc, di[1] + "//"), m.type = b.method || b.type || m.method || m.type, m.dataTypes = bu.trim(m.dataType || "*").toLowerCase().match(bK) || [""], null == m.crossDomain && (e = dd.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === di[1] && e[2] === di[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (di[3] || ("http:" === di[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = bu.param(m.data, m.traditional)), _(de, m, b, w), 2 === u) return w;
				j = bu.event && m.global, j && 0 === bu.active++ && bu.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !db.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (cX.test(g) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = c$.test(g) ? g.replace(c$, "$1_=" + cW++) : g + (cX.test(g) ? "&" : "?") + "_=" + cW++)), m.ifModified && (bu.lastModified[g] && w.setRequestHeader("If-Modified-Since", bu.lastModified[g]), bu.etag[g] && w.setRequestHeader("If-None-Match", bu.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || b.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + dg + "; q=0.01" : "") : m.accepts["*"]);
				for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
				if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && 2 !== u) {
					v = "abort";
					for (f in {
						success: 1,
						error: 1,
						complete: 1
					}) w[f](m[f]);
					if (k = _(df, m, b, w)) {
						if (w.readyState = 1, j && o.trigger("ajaxSend", [w, m]), 2 === u) return w;
						m.async && m.timeout > 0 && (i = c.setTimeout(function() {
							w.abort("timeout")
						}, m.timeout));
						try {
							u = 1, k.send(s, d)
						} catch (x) {
							if (2 > u) d(-1, x);
							else throw x
						}
					} else d(-1, "No Transport");
					return w
				}
				return w.abort()
			},
			getJSON: function(a, b, c) {
				return bu.get(a, b, c, "json")
			},
			getScript: function(a, b) {
				return bu.get(a, void 0, b, "script")
			}
		}), bu.each(["get", "post"], function(a, b) {
			bu[b] = function(a, c, d, e) {
				return bu.isFunction(c) && (e = e || d, d = c, c = void 0), bu.ajax(bu.extend({
					url: a,
					type: b,
					dataType: e,
					data: c,
					success: d
				}, bu.isPlainObject(a) && a))
			}
		}), bu._evalUrl = function(a) {
			return bu.ajax({
				url: a,
				type: "GET",
				dataType: "script",
				cache: !0,
				async: !1,
				global: !1,
				"throws": !0
			})
		}, bu.fn.extend({
			wrapAll: function(a) {
				if (bu.isFunction(a)) return this.each(function(b) {
					bu(this).wrapAll(a.call(this, b))
				});
				if (this[0]) {
					var b = bu(a, this[0].ownerDocument).eq(0).clone(!0);
					this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
						for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
						return a
					}).append(this)
				}
				return this
			},
			wrapInner: function(a) {
				return bu.isFunction(a) ? this.each(function(b) {
					bu(this).wrapInner(a.call(this, b))
				}) : this.each(function() {
					var b = bu(this),
						c = b.contents();
					c.length ? c.wrapAll(a) : b.append(a)
				})
			},
			wrap: function(a) {
				var b = bu.isFunction(a);
				return this.each(function(c) {
					bu(this).wrapAll(b ? a.call(this, c) : a)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					bu.nodeName(this, "body") || bu(this).replaceWith(this.childNodes)
				}).end()
			}
		}), bu.expr.filters.hidden = function(a) {
			return bs.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : be(a)
		}, bu.expr.filters.visible = function(a) {
			return !bu.expr.filters.hidden(a)
		};
		var dj = /%20/g,
			dk = /\[\]$/,
			dl = /\r?\n/g,
			dm = /^(?:submit|button|image|reset|file)$/i,
			dn = /^(?:input|select|textarea|keygen)/i;
		bu.param = function(a, b) {
			var c, d = [],
				e = function(a, b) {
					b = bu.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
				};
			if (void 0 === b && (b = bu.ajaxSettings && bu.ajaxSettings.traditional), bu.isArray(a) || a.jquery && !bu.isPlainObject(a)) bu.each(a, function() {
				e(this.name, this.value)
			});
			else for (c in a) bf(c, a[c], b, e);
			return d.join("&").replace(dj, "+")
		}, bu.fn.extend({
			serialize: function() {
				return bu.param(this.serializeArray())
			},
			serializeArray: function() {
				return this.map(function() {
					var a = bu.prop(this, "elements");
					return a ? bu.makeArray(a) : this
				}).filter(function() {
					var a = this.type;
					return this.name && !bu(this).is(":disabled") && dn.test(this.nodeName) && !dm.test(a) && (this.checked || !bV.test(a))
				}).map(function(a, b) {
					var c = bu(this).val();
					return null == c ? null : bu.isArray(c) ? bu.map(c, function(a) {
						return {
							name: b.name,
							value: a.replace(dl, "\r\n")
						}
					}) : {
						name: b.name,
						value: c.replace(dl, "\r\n")
					}
				}).get()
			}
		}), bu.ajaxSettings.xhr = void 0 !== c.ActiveXObject ?
		function() {
			return this.isLocal ? bh() : bk.documentMode > 8 ? bg() : /^(get|post|head|put|delete|options)$/i.test(this.type) && bg() || bh()
		} : bg;
		var dp = 0,
			dq = {},
			dr = bu.ajaxSettings.xhr();
		c.attachEvent && c.attachEvent("onunload", function() {
			for (var a in dq) dq[a](void 0, !0)
		}), bs.cors = !! dr && "withCredentials" in dr, dr = bs.ajax = !! dr, dr && bu.ajaxTransport(function(a) {
			if (!a.crossDomain || bs.cors) {
				var b;
				return {
					send: function(d, e) {
						var f, g = a.xhr(),
							h = ++dp;
						if (g.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (f in a.xhrFields) g[f] = a.xhrFields[f];
						a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType), a.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
						for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
						g.send(a.hasContent && a.data || null), b = function(c, d) {
							var f, i, j;
							if (b && (d || 4 === g.readyState)) if (delete dq[h], b = void 0, g.onreadystatechange = bu.noop, d) 4 !== g.readyState && g.abort();
							else {
								j = {}, f = g.status, "string" == typeof g.responseText && (j.text = g.responseText);
								try {
									i = g.statusText
								} catch (k) {
									i = ""
								}
								f || !a.isLocal || a.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404
							}
							j && e(f, i, j, g.getAllResponseHeaders())
						}, a.async ? 4 === g.readyState ? c.setTimeout(b) : g.onreadystatechange = dq[h] = b : b()
					},
					abort: function() {
						b && b(void 0, !0)
					}
				}
			}
		}), bu.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function(a) {
					return bu.globalEval(a), a
				}
			}
		}), bu.ajaxPrefilter("script", function(a) {
			void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
		}), bu.ajaxTransport("script", function(a) {
			if (a.crossDomain) {
				var b, c = bk.head || bu("head")[0] || bk.documentElement;
				return {
					send: function(d, e) {
						b = bk.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
							(c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
						}, c.insertBefore(b, c.firstChild)
					},
					abort: function() {
						b && b.onload(void 0, !0)
					}
				}
			}
		});
		var ds = [],
			dt = /(=)\?(?=&|$)|\?\?/;
		bu.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var a = ds.pop() || bu.expando + "_" + cW++;
				return this[a] = !0, a
			}
		}), bu.ajaxPrefilter("json jsonp", function(a, b, d) {
			var e, f, g, h = a.jsonp !== !1 && (dt.test(a.url) ? "url" : "string" == typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && dt.test(a.data) && "data");
			return h || "jsonp" === a.dataTypes[0] ? (e = a.jsonpCallback = bu.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(dt, "$1" + e) : a.jsonp !== !1 && (a.url += (cX.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function() {
				return g || bu.error(e + " was not called"), g[0]
			}, a.dataTypes[0] = "json", f = c[e], c[e] = function() {
				g = arguments
			}, d.always(function() {
				void 0 === f ? bu(c).removeProp(e) : c[e] = f, a[e] && (a.jsonpCallback = b.jsonpCallback, ds.push(e)), g && bu.isFunction(f) && f(g[0]), g = f = void 0
			}), "script") : void 0
		}), bu.parseHTML = function(a, b, c) {
			if (!a || "string" != typeof a) return null;
			"boolean" == typeof b && (c = b, b = !1), b = b || bk;
			var d = bD.exec(a),
				e = !c && [];
			return d ? [b.createElement(d[1])] : (d = y([a], b, e), e && e.length && bu(e).remove(), bu.merge([], d.childNodes))
		};
		var du = bu.fn.load;
		bu.fn.load = function(a, b, c) {
			if ("string" != typeof a && du) return du.apply(this, arguments);
			var d, e, f, g = this,
				h = a.indexOf(" ");
			return h > -1 && (d = bu.trim(a.slice(h, a.length)), a = a.slice(0, h)), bu.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && bu.ajax({
				url: a,
				type: e || "GET",
				dataType: "html",
				data: b
			}).done(function(a) {
				f = arguments, g.html(d ? bu("<div>").append(bu.parseHTML(a)).find(d) : a)
			}).always(c &&
			function(a, b) {
				g.each(function() {
					c.apply(this, f || [a.responseText, b, a])
				})
			}), this
		}, bu.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
			bu.fn[b] = function(a) {
				return this.on(b, a)
			}
		}), bu.expr.filters.animated = function(a) {
			return bu.grep(bu.timers, function(b) {
				return a === b.elem
			}).length
		}, bu.offset = {
			setOffset: function(a, b, c) {
				var d, e, f, g, h, i, j, k = bu.css(a, "position"),
					l = bu(a),
					m = {};
				"static" === k && (a.style.position = "relative"), h = l.offset(), f = bu.css(a, "top"), i = bu.css(a, "left"), j = ("absolute" === k || "fixed" === k) && bu.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), bu.isFunction(b) && (b = b.call(a, c, bu.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
			}
		}, bu.fn.extend({
			offset: function(a) {
				if (arguments.length) return void 0 === a ? this : this.each(function(b) {
					bu.offset.setOffset(this, a, b)
				});
				var b, c, d = {
					top: 0,
					left: 0
				},
					e = this[0],
					f = e && e.ownerDocument;
				if (f) return b = f.documentElement, bu.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), c = bi(f), {
					top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
					left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
				}) : d
			},
			position: function() {
				if (this[0]) {
					var a, b, c = {
						top: 0,
						left: 0
					},
						d = this[0];
					return "fixed" === bu.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), bu.nodeName(a[0], "html") || (c = a.offset()), c.top += bu.css(a[0], "borderTopWidth", !0), c.left += bu.css(a[0], "borderLeftWidth", !0)), {
						top: b.top - c.top - bu.css(d, "marginTop", !0),
						left: b.left - c.left - bu.css(d, "marginLeft", !0)
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var a = this.offsetParent; a && !bu.nodeName(a, "html") && "static" === bu.css(a, "position");) a = a.offsetParent;
					return a || cu
				})
			}
		}), bu.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(a, b) {
			var c = /Y/.test(b);
			bu.fn[a] = function(d) {
				return bU(this, function(a, d, e) {
					var f = bi(a);
					return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? bu(f).scrollLeft() : e, c ? e : bu(f).scrollTop()) : a[d] = e)
				}, a, d, arguments.length, null)
			}
		}), bu.each(["top", "left"], function(a, b) {
			bu.cssHooks[b] = M(bs.pixelPosition, function(a, c) {
				return c ? (c = cw(a, b), cs.test(c) ? bu(a).position()[b] + "px" : c) : void 0
			})
		}), bu.each({
			Height: "height",
			Width: "width"
		}, function(a, b) {
			bu.each({
				padding: "inner" + a,
				content: b,
				"": "outer" + a
			}, function(c, d) {
				bu.fn[d] = function(d, e) {
					var f = arguments.length && (c || "boolean" != typeof d),
						g = c || (d === !0 || e === !0 ? "margin" : "border");
					return bU(this, function(b, c, d) {
						var e;
						return bu.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? bu.css(b, c, g) : bu.style(b, c, d, g)
					}, b, f ? d : void 0, f, null)
				}
			})
		}), bu.fn.extend({
			bind: function(a, b, c) {
				return this.on(a, null, b, c)
			},
			unbind: function(a, b) {
				return this.off(a, null, b)
			},
			delegate: function(a, b, c, d) {
				return this.on(b, a, c, d)
			},
			undelegate: function(a, b, c) {
				return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
			}
		}), bu.fn.size = function() {
			return this.length
		}, bu.fn.andSelf = bu.fn.addBack, d = [], e = function() {
			return bu
		}.apply(b, d), void 0 === e || !(a.exports = e);
		var dv = c.jQuery,
			dw = c.$;
		return bu.noConflict = function(a) {
			return c.$ === bu && (c.$ = dw), a && c.jQuery === bu && (c.jQuery = dv), bu
		}, f || (c.jQuery = c.$ = bu), bu
	})
}, function(a, b) {
	"use strict";
	var c = {
		BACKSPACE: 8,
		DELETE: 46,
		UP: 38,
		DOWN: 40,
		ENTER: 13,
		SPACE: 32,
		ESC: 27,
		TAB: 9,
		CTRL: 17,
		META: 91,
		SHIFT: 16,
		ALT: 18,
		RIGHT: 39,
		LEFT: 37,
		LEFT_WIN: 91
	},
		d = {
			StartTag: 0,
			EndTag: 1,
			Comment: 2,
			Character: 3,
			Doctype: 4
		},
		e = {
			DataState: 0,
			TagOpenState: 1,
			EndTagOpenState: 2,
			TagNameState: 3,
			CommentStartState: 4,
			CommentStartDashState: 5,
			CommentState: 6,
			CommentEndDashState: 7,
			CommentEndState: 8,
			BeforeAttributeNameState: 9,
			AttributeNameState: 10,
			AfterAttributeNameState: 11,
			BeforeAttributeValueState: 12,
			AttributeValueDoubleQuotedState: 13,
			AttributeValueSingleQuotedState: 14,
			AttributeValueUnquotedState: 15,
			AfterAttributeValueQuotedState: 16,
			RCDATAState: 17,
			RAWTEXTState: 18,
			ScriptDataState: 19,
			RCDATALessThanSignState: 20,
			RCDATAEndTagOpenState: 21,
			RCDATAEndTagNameState: 22,
			RAWTEXTLessThanSignState: 23,
			RAWTEXTEndTagOpenState: 24,
			RAWTEXTEndTagNameState: 25,
			ScriptDataLessThanSignState: 26,
			ScriptDataEndTagOpenState: 27,
			ScriptDataEndTagNameState: 28,
			DOCTYPEState: 29,
			BeforeDOCTYPENameState: 30,
			DOCTYPENameState: 31,
			AfterDOCTYPENameState: 32,
			AfterDOCTYPEPublicKeywordState: 33,
			BeforeDOCTYPEPublicIdentifierState: 34,
			DOCTYPEPublicIdentifierDoubleQuotedState: 35,
			DOCTYPEPublicIdentifierSingleQuotedState: 36,
			AfterDOCTYPEPublicIdentifierState: 37,
			BetweenDOCTYPEPublicAndSystemIdentifiersState: 38,
			AfterDOCTYPESystemKeywordState: 38,
			BeforeDOCTYPESystemIdentifierState: 40,
			DOCTYPESystemIdentifierDoubleQuotedState: 41,
			DOCTYPESystemIdentifierSingleQuotedState: 42,
			AfterDOCTYPESystemIdentifierState: 43,
			BogusDOCTYPEState: 44
		},
		f = {
			area: !0,
			base: !0,
			basefont: !0,
			br: !0,
			col: !0,
			frame: !0,
			hr: !0,
			img: !0,
			input: !0,
			isindex: !0,
			link: !0,
			meta: !0,
			param: !0
		},
		g = {
			title: e.RCDATAState,
			textarea: e.RCDATAState,
			pre: e.RCDATAState,
			style: e.RAWTEXTState,
			xmp: e.RAWTEXTState,
			iframe: e.RAWTEXTState,
			noembed: e.RAWTEXTState,
			noframes: e.RAWTEXTState,
			noscript: e.RAWTEXTState,
			script: e.ScriptDataState
		},
		h = {
			li: !0,
			dt: !0,
			dd: !0,
			caption: !0,
			thead: !0,
			tbody: !0,
			tfoot: !0,
			colgroup: !0,
			col: !0
		},
		i = {
			li: !0,
			dt: !0,
			dd: !0,
			caption: !0,
			thead: !0,
			tbody: !0,
			tfoot: !0,
			colgroup: !0,
			col: !0,
			ol: !0,
			ul: !0,
			dl: !0,
			table: !0,
			blockquote: !0
		},
		j = {
			h1: !0,
			h2: !0,
			h3: !0,
			h4: !0,
			h5: !0,
			h6: !0,
			p: !0,
			dt: !0,
			address: !0,
			caption: !0
		},
		k = {
			a: !0,
			abbr: !0,
			acronym: !0,
			b: !0,
			bdo: !0,
			big: !0,
			br: !0,
			cite: !0,
			code: !0,
			dfn: !0,
			em: !0,
			font: !0,
			i: !0,
			img: !0,
			input: !0,
			kbd: !0,
			label: !0,
			q: !0,
			s: !0,
			samp: !0,
			select: !0,
			small: !0,
			span: !0,
			strike: !0,
			strong: !0,
			sub: !0,
			sup: !0,
			textarea: !0,
			tt: !0,
			u: !0,
			"var": !0,
			del: !0
		},
		l = {
			dl: {},
			br: {},
			figure: {
				tagName: "p"
			},
			style: !1,
			script: !1,
			header: !1,
			footer: !1,
			figcaption: !1,
			iframe: {
				toughAttributes: [{
					name: "contenteditable",
					value: "false"
				}]
			},
			blockquote: {},
			fieldset: {},
			ul: {},
			ol: {},
			li: {},
			card: {},
			people: {},
			p: {},
			h1: {},
			h2: {},
			i: {
				toughAttributes: [{
					name: "class",
					value: "italic"
				}]
			},
			strong: {
				toughAttributes: [{
					name: "class",
					value: "bold"
				}]
			},
			del: {
				toughAttributes: [{
					name: "class",
					value: "italic"
				}]
			},
			u: {
				toughAttributes: [{
					name: "class",
					value: "underline"
				}]
			},
			div: {
				tagName: "p"
			},
			pre: {
				tagName: "p"
			},
			code: {
				tagName: "p"
			},
			h3: {
				tagName: "h2"
			},
			h4: {
				tagName: "h2"
			},
			h5: {
				tagName: "h2"
			},
			h6: {
				tagName: "h2"
			},
			em: {
				tagName: "i"
			},
			b: {
				tagName: "strong"
			},
			hr: {},
			font: {
				attributes: {
					color: !0
				},
				toughAttributes: [{
					name: "class",
					value: "font"
				}]
			},
			img: {
				attributes: {
					src: /^(http|https):\/\//,
					alt: !0
				}
			},
			a: {
				attributes: {
					href: /^(http|https):\/\//
				}
			}
		},
		m = ["justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "bold", "italic", "underline", "strikethrough"],
		n = ["p", "h1", "h2", "blockquote"],
		o = {
			p: ["li", "ol", "ul"],
			h1: ["*"],
			h2: ["*"],
			ol: ["ul"],
			ul: ["ol"],
			blockquote: ["li", "ol", "ul"],
			li: ["li", "ol", "ul"]
		};
	b.KEY_CODES = c, b.STRUCTURED_TAGS = h, b.STRUCTURED_BLOCK_TAGS = i, b.TERMINAL_BLOCK_TAGS = j, b.INLINE_TAGS = k, b.HTML_TOKEN_ENUM = d, b.TOKEN_STATE_ENUM = e, b.IGNORE_CLOSE_TAGS = f, b.TAG_STATE = g, b.ALLOW_TAGS = l, b.RANGE_EXEC_STATES = m, b.BLOCK_EXEC_STATES = n, b.CLEAR_MAP = o
}, function(a, b, c) {
	var d, e;
	!
	function(f, g) {
		d = f, e = "function" == typeof d ? d.call(b, c, b, a) : d, void 0 === e || !(a.exports = e)
	}(function() {
		function s() {}
		function r() {}
		function q(a, b, c) {
			var d = new p(a, b, function(b) {
				if (!b.initialized) {
					b.initialized = !0;
					try {
						c(H, b), b.supported = !0
					} catch (d) {
						var e = "Module '" + a + "' failed to load: " + k(d);
						g(e), d.stack && g(d.stack)
					}
				}
			});
			return E[a] = d, d
		}
		function p(a, b, c) {
			this.name = a, this.dependencies = b, this.initialized = !1, this.supported = !1, this.initializer = c
		}
		function o(a) {
			a = a || window, l();
			for (var b = 0, c = L.length; c > b; ++b) L[b](a)
		}
		function n(a, b, c, d) {
			a[b] = function() {
				return m(b, c, d), a[c].apply(a, G.toArray(arguments))
			}
		}
		function m(a, b, c) {
			c && (a += " in module " + c.name), H.warn("DEPRECATED: " + a + " is deprecated. Please use " + b + " instead.")
		}
		function l() {
			if (F && !H.initialized) {
				var b, c = !1,
					d = !1;
				a(document, "createRange") && (b = document.createRange(), A(b, x) && C(b, w) && (c = !0));
				var h = f(document);
				if (!h || "body" != h.nodeName.toLowerCase()) return void i("No body element found");
				if (h && a(h, "createTextRange") && (b = h.createTextRange(), e(b) && (d = !0)), !c && !d) return void i("Neither Range nor TextRange are available");
				H.initialized = !0, H.features = {
					implementsDomRange: c,
					implementsTextRange: d
				};
				var j, l;
				for (var m in E)(j = E[m]) instanceof p && j.init(j, H);
				for (var n = 0, o = K.length; o > n; ++n) try {
					K[n](H)
				} catch (q) {
					l = "Rangy init listener threw an exception. Continuing. Detail: " + k(q), g(l)
				}
			}
		}
		function k(a) {
			return a.message || a.description || String(a)
		}
		function j(a) {
			h("Rangy warning: " + a, H.config.alertOnWarn)
		}
		function i(a) {
			H.initialized = !0, H.supported = !1, h("Rangy is not supported in this environment. Reason: " + a, H.config.alertOnFail)
		}
		function h(a, b) {
			F && b ? alert(a) : g(a)
		}
		function g(b) {
			typeof console != v && a(console, "log") && console.log(b)
		}
		function f(a) {
			return b(a, "body") ? a.body : a.getElementsByTagName("body")[0]
		}
		function e(a) {
			return a && A(a, z) && C(a, y)
		}
		function d(a) {
			return function(b, c) {
				for (var d = c.length; d--;) if (!a(b, c[d])) return !1;
				return !0
			}
		}
		function c(a, b) {
			return typeof a[b] != v
		}
		function b(a, b) {
			return typeof a[b] == t && !! a[b]
		}
		function a(a, b) {
			var c = typeof a[b];
			return c == u || c == t && !! a[b] || "unknown" == c
		}
		var t = "object",
			u = "function",
			v = "undefined",
			w = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"],
			x = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"],
			y = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"],
			z = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select", "setEndPoint", "getBoundingClientRect"],
			A = d(a),
			B = d(b),
			C = d(c),
			D = [].forEach ?
		function(a, b) {
			a.forEach(b)
		} : function(a, b) {
			for (var c = 0, d = a.length; d > c; ++c) b(a[c], c)
		}, E = {}, F = typeof window != v && typeof document != v, G = {
			isHostMethod: a,
			isHostObject: b,
			isHostProperty: c,
			areHostMethods: A,
			areHostObjects: B,
			areHostProperties: C,
			isTextRange: e,
			getBody: f,
			forEach: D
		}, H = {
			version: "1.3.0",
			initialized: !1,
			isBrowser: F,
			supported: !0,
			util: G,
			features: {},
			modules: E,
			config: {
				alertOnFail: !1,
				alertOnWarn: !1,
				preferTextRange: !1,
				autoInitialize: typeof rangyAutoInitialize == v ? !0 : rangyAutoInitialize
			}
		};
		H.fail = i, H.warn = j;
		var I;
		({}).hasOwnProperty ? (G.extend = I = function(a, b, c) {
			var d, e;
			for (var f in b) b.hasOwnProperty(f) && (d = a[f], e = b[f], c && null !== d && "object" == typeof d && null !== e && "object" == typeof e && I(d, e, !0), a[f] = e);
			return b.hasOwnProperty("toString") && (a.toString = b.toString), a
		}, G.createOptions = function(a, b) {
			var c = {};
			return I(c, b), a && I(c, a), c
		}) : i("hasOwnProperty not supported"), F || i("Rangy can only run in a browser"), function() {
			var a;
			if (F) {
				var b = document.createElement("div");
				b.appendChild(document.createElement("span"));
				var c = [].slice;
				try {
					1 == c.call(b.childNodes, 0)[0].nodeType && (a = function(a) {
						return c.call(a, 0)
					})
				} catch (d) {}
			}
			a || (a = function(a) {
				for (var b = [], c = 0, d = a.length; d > c; ++c) b[c] = a[c];
				return b
			}), G.toArray = a
		}();
		var J;
		F && (a(document, "addEventListener") ? J = function(a, b, c) {
			a.addEventListener(b, c, !1)
		} : a(document, "attachEvent") ? J = function(a, b, c) {
			a.attachEvent("on" + b, c)
		} : i("Document does not have required addEventListener or attachEvent method"), G.addListener = J);
		var K = [];
		G.deprecationNotice = m, G.createAliasForDeprecatedMethod = n, H.init = l, H.addInitListener = function(a) {
			H.initialized ? a(H) : K.push(a)
		};
		var L = [];
		H.addShimListener = function(a) {
			L.push(a)
		}, F && (H.shim = H.createMissingNativeApi = o, n(H, "createMissingNativeApi", "shim")), p.prototype = {
			init: function() {
				for (var a, b, c = this.dependencies || [], d = 0, e = c.length; e > d; ++d) {
					if (b = c[d], a = E[b], !(a && a instanceof p)) throw new Error("required module '" + b + "' not found");
					if (a.init(), !a.supported) throw new Error("required module '" + b + "' not supported")
				}
				this.initializer(this)
			},
			fail: function(a) {
				throw this.initialized = !0, this.supported = !1, new Error(a)
			},
			warn: function(a) {
				H.warn("Module " + this.name + ": " + a)
			},
			deprecationNotice: function(a, b) {
				H.warn("DEPRECATED: " + a + " in module " + this.name + " is deprecated. Please use " + b + " instead")
			},
			createError: function(a) {
				return new Error("Error in Rangy " + this.name + " module: " + a)
			}
		}, H.createModule = function(a) {
			var b, c;
			2 == arguments.length ? (b = arguments[1], c = []) : (b = arguments[2], c = arguments[1]);
			var d = q(a, c, b);
			H.initialized && H.supported && d.init()
		}, H.createCoreModule = function(a, b, c) {
			q(a, b, c)
		}, H.RangePrototype = r, H.rangePrototype = new r, H.selectionPrototype = new s, H.createCoreModule("DomUtil", [], function(a, b) {
			function E(a) {
				this.code = this[a], this.codeName = a, this.message = "DOMException: " + this.codeName
			}
			function D(a, b) {
				this.node = a, this.offset = b
			}
			function C(a) {
				return new B(a)
			}
			function B(a) {
				this.root = a, this._next = a
			}
			function A(a) {
				return a.parentNode.removeChild(a)
			}
			function z(a, b, c) {
				var d = H(a),
					e = a.createElement("div");
				e.contentEditable = "" + !! c, b && (e.innerHTML = b);
				var f = d.firstChild;
				return f ? d.insertBefore(e, f) : d.appendChild(e), e
			}
			function y(a) {
				for (var b, c = o(a).createDocumentFragment(); b = a.firstChild;) c.appendChild(b);
				return c
			}
			function x(a) {
				if (!a) return "[No node]";
				if (L && w(a)) return "[Broken node]";
				if (k(a)) return '"' + a.data + '"';
				if (1 == a.nodeType) {
					var b = a.id ? ' id="' + a.id + '"' : "";
					return "<" + a.nodeName + b + ">[index:" + e(a) + ",length:" + a.childNodes.length + "][" + (a.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]"
				}
				return a.nodeName
			}
			function w(a) {
				var b;
				try {
					return b = a.parentNode, !1
				} catch (c) {
					return !0
				}
			}
			function v(a, c, d, f) {
				var h, i, k, l, m;
				if (a == d) return c === f ? 0 : f > c ? -1 : 1;
				if (h = j(d, a, !0)) return c <= e(h) ? -1 : 1;
				if (h = j(a, d, !0)) return e(h) < f ? -1 : 1;
				if (i = g(a, d), !i) throw new Error("comparePoints error: nodes have no common ancestor");
				if (k = a === i ? i : j(a, i, !0), l = d === i ? i : j(d, i, !0), k === l) throw b.createError("comparePoints got to case 4 and childA and childB are the same!");
				for (m = i.firstChild; m;) {
					if (m === k) return -1;
					if (m === l) return 1;
					m = m.nextSibling
				}
			}
			function u(a) {
				for (var b; b = a.parentNode;) a = b;
				return a
			}
			function t(a, b, c) {
				var d;
				if (a ? G.isHostProperty(a, "nodeType") ? d = 1 == a.nodeType && "iframe" == a.tagName.toLowerCase() ? q(a) : o(a) : s(a) && (d = a.document) : d = document, !d) throw b.createError(c + "(): Parameter must be a Window object or DOM node");
				return d
			}
			function s(a) {
				return a && G.isHostMethod(a, "setTimeout") && G.isHostObject(a, "document")
			}
			function r(a) {
				if (typeof a.contentWindow != F) return a.contentWindow;
				if (typeof a.contentDocument != F) return a.contentDocument.defaultView;
				throw b.createError("getIframeWindow: No Window object found for iframe element")
			}
			function q(a) {
				if (typeof a.contentDocument != F) return a.contentDocument;
				if (typeof a.contentWindow != F) return a.contentWindow.document;
				throw b.createError("getIframeDocument: No Document object found for iframe element")
			}
			function p(a) {
				var c = o(a);
				if (typeof c.defaultView != F) return c.defaultView;
				if (typeof c.parentWindow != F) return c.parentWindow;
				throw b.createError("Cannot get a window object for node")
			}
			function o(a) {
				if (9 == a.nodeType) return a;
				if (typeof a.ownerDocument != F) return a.ownerDocument;
				if (typeof a.document != F) return a.document;
				if (a.parentNode) return o(a.parentNode);
				throw b.createError("getDocument: no document found for node")
			}
			function n(a, b, c) {
				var d = a.cloneNode(!1);
				if (d.deleteData(0, b), a.deleteData(b, a.length - b), m(d, a), c) for (var f, g = 0; f = c[g++];) f.node == a && f.offset > b ? (f.node = d, f.offset -= b) : f.node == a.parentNode && f.offset > e(a) && ++f.offset;
				return d
			}
			function m(a, b) {
				var c = b.nextSibling,
					d = b.parentNode;
				return c ? d.insertBefore(a, c) : d.appendChild(a), a
			}
			function l(a) {
				if (!a) return !1;
				var b = a.nodeType;
				return 3 == b || 8 == b
			}
			function k(a) {
				var b = a.nodeType;
				return 3 == b || 4 == b || 8 == b
			}
			function j(a, b, c) {
				for (var d, e = c ? a : a.parentNode; e;) {
					if (d = e.parentNode, d === b) return e;
					e = d
				}
				return null
			}
			function i(a, b) {
				return h(a, b, !0)
			}
			function h(a, b, c) {
				for (var d = c ? b : b.parentNode; d;) {
					if (d === a) return !0;
					d = d.parentNode
				}
				return !1
			}
			function g(a, b) {
				var c, d = [];
				for (c = a; c; c = c.parentNode) d.push(c);
				for (c = b; c; c = c.parentNode) if (K(d, c)) return c;
				return null
			}
			function f(a) {
				switch (a.nodeType) {
				case 7:
				case 10:
					return 0;
				case 3:
				case 8:
					return a.length;
				default:
					return a.childNodes.length
				}
			}
			function e(a) {
				for (var b = 0; a = a.previousSibling;)++b;
				return b
			}
			function d(a) {
				var b = a.parentNode;
				return 1 == b.nodeType ? b : null
			}
			function c(a) {
				var b;
				return typeof a.namespaceURI == F || null === (b = a.namespaceURI) || "http://www.w3.org/1999/xhtml" == b
			}
			var F = "undefined",
				G = a.util,
				H = G.getBody;
			G.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || b.fail("document missing a Node creation method"), G.isHostMethod(document, "getElementsByTagName") || b.fail("document missing getElementsByTagName method");
			var I = document.createElement("div");
			G.areHostMethods(I, ["insertBefore", "appendChild", "cloneNode"] || !G.areHostObjects(I, ["previousSibling", "nextSibling", "childNodes", "parentNode"])) || b.fail("Incomplete Element implementation"), G.isHostProperty(I, "innerHTML") || b.fail("Element is missing innerHTML property");
			var J = document.createTextNode("test");
			G.areHostMethods(J, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] || !G.areHostObjects(I, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) || !G.areHostProperties(J, ["data"])) || b.fail("Incomplete Text Node implementation");
			var K = function(a, b) {
					for (var c = a.length; c--;) if (a[c] === b) return !0;
					return !1
				},
				L = !1;
			!
			function() {
				var b = document.createElement("b");
				b.innerHTML = "1";
				var c = b.firstChild;
				b.innerHTML = "<br />", L = w(c), a.features.crashyTextNodes = L
			}();
			var M;
			typeof window.getComputedStyle != F ? M = function(a, b) {
				return p(a).getComputedStyle(a, null)[b]
			} : typeof document.documentElement.currentStyle != F ? M = function(a, b) {
				return a.currentStyle ? a.currentStyle[b] : ""
			} : b.fail("No means of obtaining computed style properties found"), B.prototype = {
				_current: null,
				hasNext: function() {
					return !!this._next
				},
				next: function() {
					var a, b, c = this._current = this._next;
					if (this._current) if (a = c.firstChild) this._next = a;
					else {
						for (b = null; c !== this.root && !(b = c.nextSibling);) c = c.parentNode;
						this._next = b
					}
					return this._current
				},
				detach: function() {
					this._current = this._next = this.root = null
				}
			}, D.prototype = {
				equals: function(a) {
					return !!a && this.node === a.node && this.offset == a.offset
				},
				inspect: function() {
					return "[DomPosition(" + x(this.node) + ":" + this.offset + ")]"
				},
				toString: function() {
					return this.inspect()
				}
			}, E.prototype = {
				INDEX_SIZE_ERR: 1,
				HIERARCHY_REQUEST_ERR: 3,
				WRONG_DOCUMENT_ERR: 4,
				NO_MODIFICATION_ALLOWED_ERR: 7,
				NOT_FOUND_ERR: 8,
				NOT_SUPPORTED_ERR: 9,
				INVALID_STATE_ERR: 11,
				INVALID_NODE_TYPE_ERR: 24
			}, E.prototype.toString = function() {
				return this.message
			}, a.dom = {
				arrayContains: K,
				isHtmlNamespace: c,
				parentElement: d,
				getNodeIndex: e,
				getNodeLength: f,
				getCommonAncestor: g,
				isAncestorOf: h,
				isOrIsAncestorOf: i,
				getClosestAncestorIn: j,
				isCharacterDataNode: k,
				isTextOrCommentNode: l,
				insertAfter: m,
				splitDataNode: n,
				getDocument: o,
				getWindow: p,
				getIframeWindow: r,
				getIframeDocument: q,
				getBody: H,
				isWindow: s,
				getContentDocument: t,
				getRootContainer: u,
				comparePoints: v,
				isBrokenNode: w,
				inspectNode: x,
				getComputedStyleProperty: M,
				createTestElement: z,
				removeNode: A,
				fragmentFromNodeChildren: y,
				createIterator: C,
				DomPosition: D
			}, a.DOMException = E
		}), H.createCoreModule("DomRange", ["DomUtil"], function(a, b) {
			function I(a) {
				this.startContainer = a, this.startOffset = 0, this.endContainer = a, this.endOffset = 0, this.document = a, G(this)
			}
			function H(a, b, c, d, e) {
				a.startContainer = b, a.startOffset = c, a.endContainer = d, a.endOffset = e, a.document = J.getDocument(b), G(a)
			}
			function G(a) {
				a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset, a.commonAncestorContainer = a.collapsed ? a.startContainer : J.getCommonAncestor(a.startContainer, a.endContainer)
			}
			function F(b, d) {
				function i(a, b, c) {
					var e = a.startContainer,
						f = a.startOffset;
					b === a.endContainer && c === a.endOffset || (W(b) == W(e) && -1 != R(b, c, e, f) || (e = b, f = c), d(a, e, f, b, c))
				}
				function h(a, b, c) {
					var e = a.endContainer,
						f = a.endOffset;
					b === a.startContainer && c === a.startOffset || (W(b) == W(e) && 1 != R(b, c, e, f) || (e = b, f = c), d(a, b, c, e, f))
				}
				function e(a, b) {
					return function(c) {
						s(c, Z), s(W(c), $);
						var d = (a ? f : g)(c);
						(b ? h : i)(this, d.node, d.offset)
					}
				}
				var j = function() {};
				j.prototype = a.rangePrototype, b.prototype = new j, K.extend(b.prototype, {
					setStart: function(a, b) {
						r(a, !0), t(a, b), h(this, a, b)
					},
					setEnd: function(a, b) {
						r(a, !0), t(a, b), i(this, a, b)
					},
					setStartAndEnd: function() {
						var a = arguments,
							b = a[0],
							c = a[1],
							e = b,
							f = c;
						switch (a.length) {
						case 3:
							f = a[2];
							break;
						case 4:
							e = a[2], f = a[3]
						}
						d(this, b, c, e, f)
					},
					setBoundary: function(a, b, c) {
						this["set" + (c ? "Start" : "End")](a, b)
					},
					setStartBefore: e(!0, !0),
					setStartAfter: e(!1, !0),
					setEndBefore: e(!0, !1),
					setEndAfter: e(!1, !1),
					collapse: function(a) {
						z(this), a ? d(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : d(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
					},
					selectNodeContents: function(a) {
						r(a, !0), d(this, a, 0, a, U(a))
					},
					selectNode: function(a) {
						r(a, !1), s(a, Z);
						var b = f(a),
							c = g(a);
						d(this, b.node, b.offset, c.node, c.offset)
					},
					extractContents: E(m, d),
					deleteContents: E(l, d),
					canSurroundContents: function() {
						z(this), v(this.startContainer), v(this.endContainer);
						var a = new p(this, !0),
							b = a._first && c(a._first, this) || a._last && c(a._last, this);
						return a.detach(), !b
					},
					splitBoundaries: function() {
						A(this)
					},
					splitBoundariesPreservingPositions: function(a) {
						A(this, a)
					},
					normalizeBoundaries: function() {
						z(this);
						var a, b = this.startContainer,
							c = this.startOffset,
							e = this.endContainer,
							f = this.endOffset,
							g = function(a) {
								var b = a.nextSibling;
								b && b.nodeType == a.nodeType && (e = a, f = a.length, a.appendData(b.data), Y(b))
							},
							h = function(a) {
								var d = a.previousSibling;
								if (d && d.nodeType == a.nodeType) {
									b = a;
									var g = a.length;
									if (c = d.length, a.insertData(0, d.data), Y(d), b == e) f += c, e = b;
									else if (e == a.parentNode) {
										var h = O(a);
										f == h ? (e = a, f = g) : f > h && f--
									}
								}
							},
							i = !0;
						if (N(e)) f == e.length ? g(e) : 0 == f && (a = e.previousSibling, a && a.nodeType == e.nodeType && (f = a.length, b == e && (i = !1), a.appendData(e.data), Y(e), e = a));
						else {
							if (f > 0) {
								var j = e.childNodes[f - 1];
								j && N(j) && g(j)
							}
							i = !this.collapsed
						}
						if (i) {
							if (N(b)) 0 == c ? h(b) : c == b.length && (a = b.nextSibling, a && a.nodeType == b.nodeType && (e == a && (e = b, f += b.length), b.appendData(a.data), Y(a)));
							else if (c < b.childNodes.length) {
								var k = b.childNodes[c];
								k && N(k) && h(k)
							}
						} else b = e, c = f;
						d(this, b, c, e, f)
					},
					collapseToPoint: function(a, b) {
						r(a, !0), t(a, b), this.setStartAndEnd(a, b)
					}
				}), D(b)
			}
			function E(a, b) {
				return function() {
					z(this);
					var c, d, e = this.startContainer,
						f = this.startOffset,
						h = this.commonAncestorContainer,
						i = new p(this, !0);
					e !== h && (c = T(e, h, !0), d = g(c), e = d.node, f = d.offset), k(i, v), i.reset();
					var j = a(i);
					return i.detach(), b(this, e, f, e, f), j
				}
			}
			function D(a) {
				C(a), C(a.prototype)
			}
			function C(a) {
				a.START_TO_START = bk, a.START_TO_END = bl, a.END_TO_END = bm, a.END_TO_START = bn, a.NODE_BEFORE = bo, a.NODE_AFTER = bp, a.NODE_BEFORE_AND_AFTER = bq, a.NODE_INSIDE = br
			}
			function B(a) {
				z(a);
				var b = a.commonAncestorContainer.parentNode.cloneNode(!1);
				return b.appendChild(a.cloneContents()), b.innerHTML
			}
			function A(a, b) {
				z(a);
				var c = a.startContainer,
					d = a.startOffset,
					e = a.endContainer,
					f = a.endOffset,
					g = c === e;
				N(e) && f > 0 && f < e.length && S(e, f, b), N(c) && d > 0 && d < c.length && (c = S(c, d, b), g ? (f -= d, e = c) : e == c.parentNode && f >= O(c) && f++, d = 0), a.setStartAndEnd(c, d, e, f)
			}
			function z(a) {
				if (!y(a)) throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: (" + a.inspect() + ")")
			}
			function y(a) {
				return !!a.startContainer && !! a.endContainer && (!X || !J.isBrokenNode(a.startContainer) && !J.isBrokenNode(a.endContainer)) && W(a.startContainer) == W(a.endContainer) && x(a.startContainer, a.startOffset) && x(a.endContainer, a.endOffset)
			}
			function x(a, b) {
				return b <= (N(a) ? a.length : a.childNodes.length)
			}
			function w(a, b) {
				if (!a) throw new M(b)
			}
			function v(a) {
				if (bd(a, !0)) throw new M("NO_MODIFICATION_ALLOWED_ERR")
			}
			function u(a, b) {
				if (bc(a, !0) !== bc(b, !0)) throw new M("WRONG_DOCUMENT_ERR")
			}
			function t(a, b) {
				if (0 > b || b > (N(a) ? a.length : a.childNodes.length)) throw new M("INDEX_SIZE_ERR")
			}
			function s(a, b) {
				if (!V(b, a.nodeType)) throw new M("INVALID_NODE_TYPE_ERR")
			}
			function r(a, b) {
				if (be(a, b)) throw new M("INVALID_NODE_TYPE_ERR")
			}
			function q(a) {
				return function(b, c) {
					for (var d, e = c ? b : b.parentNode; e;) {
						if (d = e.nodeType, V(a, d)) return e;
						e = e.parentNode
					}
					return null
				}
			}
			function p(a, b) {
				if (this.range = a, this.clonePartiallySelectedTextNodes = b, !a.collapsed) {
					this.sc = a.startContainer, this.so = a.startOffset, this.ec = a.endContainer, this.eo = a.endOffset;
					var c = a.commonAncestorContainer;
					this.sc === this.ec && N(this.sc) ? (this.isSingleCharacterDataNode = !0, this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc !== c || N(this.sc) ? T(this.sc, c, !0) : this.sc.childNodes[this.so], this._last = this.ec !== c || N(this.ec) ? T(this.ec, c, !0) : this.ec.childNodes[this.eo - 1])
				}
			}
			function o(a) {
				var b = "undefined" == typeof a.getName ? "Range" : a.getName();
				return "[" + b + "(" + J.inspectNode(a.startContainer) + ":" + a.startOffset + ", " + J.inspectNode(a.endContainer) + ":" + a.endOffset + ")]"
			}
			function n(a, b, c) {
				var d, e = !! b && !! b.length,
					f = !! c;
				e && (d = new RegExp("^(" + b.join("|") + ")$"));
				var g = [];
				return k(new p(a, !1), function(b) {
					if ((!e || d.test(b.nodeType)) && (!f || c(b))) {
						var h = a.startContainer;
						if (b != h || !N(h) || a.startOffset != h.length) {
							var i = a.endContainer;
							b == i && N(i) && 0 == a.endOffset || g.push(b)
						}
					}
				}), g
			}
			function m(a) {
				for (var b, c, e = d(a.range).createDocumentFragment(); b = a.next();) {
					if (a.isPartiallySelectedSubtree() ? (b = b.cloneNode(!1), c = a.getSubtreeIterator(), b.appendChild(m(c)), c.detach()) : a.remove(), 10 == b.nodeType) throw new M("HIERARCHY_REQUEST_ERR");
					e.appendChild(b)
				}
				return e
			}
			function l(a) {
				for (var b; a.next();) a.isPartiallySelectedSubtree() ? (b = a.getSubtreeIterator(), l(b), b.detach()) : a.remove()
			}
			function k(a, b, c) {
				var d, e;
				c = c || {
					stop: !1
				};
				for (var f, g; f = a.next();) if (a.isPartiallySelectedSubtree()) {
					if (b(f) === !1) return void(c.stop = !0);
					if (g = a.getSubtreeIterator(), k(g, b, c), g.detach(), c.stop) return
				} else for (d = J.createIterator(f); e = d.next();) if (b(e) === !1) return void(c.stop = !0)
			}
			function j(a) {
				for (var b, c, e, f = d(a.range).createDocumentFragment(); c = a.next();) {
					if (b = a.isPartiallySelectedSubtree(), c = c.cloneNode(!b), b && (e = a.getSubtreeIterator(), c.appendChild(j(e)), e.detach()), 10 == c.nodeType) throw new M("HIERARCHY_REQUEST_ERR");
					f.appendChild(c)
				}
				return f
			}
			function i(a, b, c) {
				if (z(a), z(b), d(b) != d(a)) throw new M("WRONG_DOCUMENT_ERR");
				var e = R(a.startContainer, a.startOffset, b.endContainer, b.endOffset),
					f = R(a.endContainer, a.endOffset, b.startContainer, b.startOffset);
				return c ? 0 >= e && f >= 0 : 0 > e && f > 0
			}
			function h(a, b, c) {
				var d = 11 == a.nodeType ? a.firstChild : a;
				return N(b) ? c == b.length ? J.insertAfter(a, b) : b.parentNode.insertBefore(a, 0 == c ? b : S(b, c)) : c >= b.childNodes.length ? b.appendChild(a) : b.insertBefore(a, b.childNodes[c]), d
			}
			function g(a) {
				return new L(a.parentNode, O(a) + 1)
			}
			function f(a) {
				return new L(a.parentNode, O(a))
			}
			function e(a) {
				return W(a.startContainer)
			}
			function d(a) {
				return a.document || Q(a.startContainer)
			}
			function c(a, b) {
				return 3 != a.nodeType && (P(a, b.startContainer) || P(a, b.endContainer))
			}
			var J = a.dom,
				K = a.util,
				L = J.DomPosition,
				M = a.DOMException,
				N = J.isCharacterDataNode,
				O = J.getNodeIndex,
				P = J.isOrIsAncestorOf,
				Q = J.getDocument,
				R = J.comparePoints,
				S = J.splitDataNode,
				T = J.getClosestAncestorIn,
				U = J.getNodeLength,
				V = J.arrayContains,
				W = J.getRootContainer,
				X = a.features.crashyTextNodes,
				Y = J.removeNode;
			p.prototype = {
				_current: null,
				_next: null,
				_first: null,
				_last: null,
				isSingleCharacterDataNode: !1,
				reset: function() {
					this._current = null, this._next = this._first
				},
				hasNext: function() {
					return !!this._next
				},
				next: function() {
					var a = this._current = this._next;
					return a && (this._next = a !== this._last ? a.nextSibling : null, N(a) && this.clonePartiallySelectedTextNodes && (a === this.ec && (a = a.cloneNode(!0)).deleteData(this.eo, a.length - this.eo), this._current === this.sc && (a = a.cloneNode(!0)).deleteData(0, this.so))), a
				},
				remove: function() {
					var a, b, c = this._current;
					!N(c) || c !== this.sc && c !== this.ec ? c.parentNode && Y(c) : (a = c === this.sc ? this.so : 0, b = c === this.ec ? this.eo : c.length, a != b && c.deleteData(a, b - a))
				},
				isPartiallySelectedSubtree: function() {
					var a = this._current;
					return c(a, this.range)
				},
				getSubtreeIterator: function() {
					var a;
					if (this.isSingleCharacterDataNode) a = this.range.cloneRange(), a.collapse(!1);
					else {
						a = new I(d(this.range));
						var b = this._current,
							c = b,
							e = 0,
							f = b,
							g = U(b);
						P(b, this.sc) && (c = this.sc, e = this.so), P(b, this.ec) && (f = this.ec, g = this.eo), H(a, c, e, f, g)
					}
					return new p(a, this.clonePartiallySelectedTextNodes)
				},
				detach: function() {
					this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
				}
			};
			var Z = [1, 3, 4, 5, 7, 8, 10],
				$ = [2, 9, 11],
				_ = [5, 6, 10, 12],
				ba = [1, 3, 4, 5, 7, 8, 10, 11],
				bb = [1, 3, 4, 5, 7, 8],
				bc = q([9, 11]),
				bd = q(_),
				be = q([6, 10, 12]),
				bf = document.createElement("style"),
				bg = !1;
			try {
				bf.innerHTML = "<b>x</b>", bg = 3 == bf.firstChild.nodeType
			} catch (bh) {}
			a.features.htmlParsingConforms = bg;
			var bi = bg ?
			function(a) {
				var b = this.startContainer,
					c = Q(b);
				if (!b) throw new M("INVALID_STATE_ERR");
				var d = null;
				return 1 == b.nodeType ? d = b : N(b) && (d = J.parentElement(b)), d = null === d || "HTML" == d.nodeName && J.isHtmlNamespace(Q(d).documentElement) && J.isHtmlNamespace(d) ? c.createElement("body") : d.cloneNode(!1), d.innerHTML = a, J.fragmentFromNodeChildren(d)
			} : function(a) {
				var b = d(this),
					c = b.createElement("body");
				return c.innerHTML = a, J.fragmentFromNodeChildren(c)
			}, bj = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"], bk = 0, bl = 1, bm = 2, bn = 3, bo = 0, bp = 1, bq = 2, br = 3;
			K.extend(a.rangePrototype, {
				compareBoundaryPoints: function(a, b) {
					z(this), u(this.startContainer, b.startContainer);
					var c, d, e, f, g = a == bn || a == bk ? "start" : "end",
						h = a == bl || a == bk ? "start" : "end";
					return c = this[g + "Container"], d = this[g + "Offset"], e = b[h + "Container"], f = b[h + "Offset"], R(c, d, e, f)
				},
				insertNode: function(a) {
					if (z(this), s(a, ba), v(this.startContainer), P(a, this.startContainer)) throw new M("HIERARCHY_REQUEST_ERR");
					var b = h(a, this.startContainer, this.startOffset);
					this.setStartBefore(b)
				},
				cloneContents: function() {
					z(this);
					var a, b;
					if (this.collapsed) return d(this).createDocumentFragment();
					if (this.startContainer === this.endContainer && N(this.startContainer)) return a = this.startContainer.cloneNode(!0), a.data = a.data.slice(this.startOffset, this.endOffset), b = d(this).createDocumentFragment(), b.appendChild(a), b;
					var c = new p(this, !0);
					return a = j(c), c.detach(), a
				},
				canSurroundContents: function() {
					z(this), v(this.startContainer), v(this.endContainer);
					var a = new p(this, !0),
						b = a._first && c(a._first, this) || a._last && c(a._last, this);
					return a.detach(), !b
				},
				surroundContents: function(a) {
					if (s(a, bb), !this.canSurroundContents()) throw new M("INVALID_STATE_ERR");
					var b = this.extractContents();
					if (a.hasChildNodes()) for (; a.lastChild;) a.removeChild(a.lastChild);
					h(a, this.startContainer, this.startOffset), a.appendChild(b), this.selectNode(a)
				},
				cloneRange: function() {
					z(this);
					for (var a, b = new I(d(this)), c = bj.length; c--;) a = bj[c], b[a] = this[a];
					return b
				},
				toString: function() {
					z(this);
					var a = this.startContainer;
					if (a === this.endContainer && N(a)) return 3 == a.nodeType || 4 == a.nodeType ? a.data.slice(this.startOffset, this.endOffset) : "";
					var b = [],
						c = new p(this, !0);
					return k(c, function(a) {
						3 != a.nodeType && 4 != a.nodeType || b.push(a.data)
					}), c.detach(), b.join("")
				},
				compareNode: function(a) {
					z(this);
					var b = a.parentNode,
						c = O(a);
					if (!b) throw new M("NOT_FOUND_ERR");
					var d = this.comparePoint(b, c),
						e = this.comparePoint(b, c + 1);
					return 0 > d ? e > 0 ? bq : bo : e > 0 ? bp : br
				},
				comparePoint: function(a, b) {
					return z(this), w(a, "HIERARCHY_REQUEST_ERR"), u(a, this.startContainer), R(a, b, this.startContainer, this.startOffset) < 0 ? -1 : R(a, b, this.endContainer, this.endOffset) > 0 ? 1 : 0
				},
				createContextualFragment: bi,
				toHtml: function() {
					return B(this)
				},
				intersectsNode: function(a, b) {
					if (z(this), W(a) != e(this)) return !1;
					var c = a.parentNode,
						d = O(a);
					if (!c) return !0;
					var f = R(c, d, this.endContainer, this.endOffset),
						g = R(c, d + 1, this.startContainer, this.startOffset);
					return b ? 0 >= f && g >= 0 : 0 > f && g > 0
				},
				isPointInRange: function(a, b) {
					return z(this), w(a, "HIERARCHY_REQUEST_ERR"), u(a, this.startContainer), R(a, b, this.startContainer, this.startOffset) >= 0 && R(a, b, this.endContainer, this.endOffset) <= 0
				},
				intersectsRange: function(a) {
					return i(this, a, !1)
				},
				intersectsOrTouchesRange: function(a) {
					return i(this, a, !0)
				},
				intersection: function(a) {
					if (this.intersectsRange(a)) {
						var b = R(this.startContainer, this.startOffset, a.startContainer, a.startOffset),
							c = R(this.endContainer, this.endOffset, a.endContainer, a.endOffset),
							d = this.cloneRange();
						return -1 == b && d.setStart(a.startContainer, a.startOffset), 1 == c && d.setEnd(a.endContainer, a.endOffset), d
					}
					return null
				},
				union: function(a) {
					if (this.intersectsOrTouchesRange(a)) {
						var b = this.cloneRange();
						return -1 == R(a.startContainer, a.startOffset, this.startContainer, this.startOffset) && b.setStart(a.startContainer, a.startOffset), 1 == R(a.endContainer, a.endOffset, this.endContainer, this.endOffset) && b.setEnd(a.endContainer, a.endOffset), b
					}
					throw new M("Ranges do not intersect")
				},
				containsNode: function(a, b) {
					return b ? this.intersectsNode(a, !1) : this.compareNode(a) == br
				},
				containsNodeContents: function(a) {
					return this.comparePoint(a, 0) >= 0 && this.comparePoint(a, U(a)) <= 0
				},
				containsRange: function(a) {
					var b = this.intersection(a);
					return null !== b && a.equals(b)
				},
				containsNodeText: function(a) {
					var b = this.cloneRange();
					b.selectNode(a);
					var c = b.getNodes([3]);
					if (c.length > 0) {
						b.setStart(c[0], 0);
						var d = c.pop();
						return b.setEnd(d, d.length), this.containsRange(b)
					}
					return this.containsNodeContents(a)
				},
				getNodes: function(a, b) {
					return z(this), n(this, a, b)
				},
				getDocument: function() {
					return d(this)
				},
				collapseBefore: function(a) {
					this.setEndBefore(a), this.collapse(!1)
				},
				collapseAfter: function(a) {
					this.setStartAfter(a), this.collapse(!0)
				},
				getBookmark: function(b) {
					var c = d(this),
						e = a.createRange(c);
					b = b || J.getBody(c), e.selectNodeContents(b);
					var f = this.intersection(e),
						g = 0,
						h = 0;
					return f && (e.setEnd(f.startContainer, f.startOffset), g = e.toString().length, h = g + f.toString().length), {
						start: g,
						end: h,
						containerNode: b
					}
				},
				moveToBookmark: function(a) {
					var b = a.containerNode,
						c = 0;
					this.setStart(b, 0), this.collapse(!0);
					for (var d, e, f, g, h = [b], i = !1, j = !1; !j && (d = h.pop());) if (3 == d.nodeType) e = c + d.length, !i && a.start >= c && a.start <= e && (this.setStart(d, a.start - c), i = !0), i && a.end >= c && a.end <= e && (this.setEnd(d, a.end - c), j = !0), c = e;
					else for (g = d.childNodes, f = g.length; f--;) h.push(g[f])
				},
				getName: function() {
					return "DomRange"
				},
				equals: function(a) {
					return I.rangesEqual(this, a)
				},
				isValid: function() {
					return y(this)
				},
				inspect: function() {
					return o(this)
				},
				detach: function() {}
			}), F(I, H), K.extend(I, {
				rangeProperties: bj,
				RangeIterator: p,
				copyComparisonConstants: D,
				createPrototypeRange: F,
				inspect: o,
				toHtml: B,
				getRangeDocument: d,
				rangesEqual: function(a, b) {
					return a.startContainer === b.startContainer && a.startOffset === b.startOffset && a.endContainer === b.endContainer && a.endOffset === b.endOffset
				}
			}), a.DomRange = I
		}), H.createCoreModule("WrappedRange", ["DomRange"], function(a, b) {
			var c, d, e = a.dom,
				f = a.util,
				g = e.DomPosition,
				h = a.DomRange,
				i = e.getBody,
				j = e.getContentDocument,
				k = e.isCharacterDataNode;
			if (a.features.implementsDomRange && !
			function() {
				function g(a, b, c, d, e) {
					var f = a.startContainer !== b || a.startOffset != c,
						g = a.endContainer !== d || a.endOffset != e,
						h = !a.equals(a.nativeRange);
					(f || g || h) && (a.setEnd(d, e), a.setStart(b, c))
				}
				function d(a) {
					for (var b, c = m.length; c--;) b = m[c], a[b] = a.nativeRange[b];
					a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset
				}
				var k, l, m = h.rangeProperties;
				c = function(a) {
					if (!a) throw b.createError("WrappedRange: Range must be specified");
					this.nativeRange = a, d(this)
				}, h.createPrototypeRange(c, g), k = c.prototype, k.selectNode = function(a) {
					this.nativeRange.selectNode(a), d(this)
				}, k.cloneContents = function() {
					return this.nativeRange.cloneContents()
				}, k.surroundContents = function(a) {
					this.nativeRange.surroundContents(a), d(this)
				}, k.collapse = function(a) {
					this.nativeRange.collapse(a), d(this)
				}, k.cloneRange = function() {
					return new c(this.nativeRange.cloneRange())
				}, k.refresh = function() {
					d(this)
				}, k.toString = function() {
					return this.nativeRange.toString()
				};
				var n = document.createTextNode("test");
				i(document).appendChild(n);
				var o = document.createRange();
				o.setStart(n, 0), o.setEnd(n, 0);
				try {
					o.setStart(n, 1), k.setStart = function(a, b) {
						this.nativeRange.setStart(a, b), d(this)
					}, k.setEnd = function(a, b) {
						this.nativeRange.setEnd(a, b), d(this)
					}, l = function(a) {
						return function(b) {
							this.nativeRange[a](b), d(this)
						}
					}
				} catch (p) {
					k.setStart = function(a, b) {
						try {
							this.nativeRange.setStart(a, b)
						} catch (c) {
							this.nativeRange.setEnd(a, b), this.nativeRange.setStart(a, b)
						}
						d(this)
					}, k.setEnd = function(a, b) {
						try {
							this.nativeRange.setEnd(a, b)
						} catch (c) {
							this.nativeRange.setStart(a, b), this.nativeRange.setEnd(a, b)
						}
						d(this)
					}, l = function(a, b) {
						return function(c) {
							try {
								this.nativeRange[a](c)
							} catch (e) {
								this.nativeRange[b](c), this.nativeRange[a](c)
							}
							d(this)
						}
					}
				}
				k.setStartBefore = l("setStartBefore", "setEndBefore"), k.setStartAfter = l("setStartAfter", "setEndAfter"), k.setEndBefore = l("setEndBefore", "setStartBefore"), k.setEndAfter = l("setEndAfter", "setStartAfter"), k.selectNodeContents = function(a) {
					this.setStartAndEnd(a, 0, e.getNodeLength(a))
				}, o.selectNodeContents(n), o.setEnd(n, 3);
				var q = document.createRange();
				q.selectNodeContents(n), q.setEnd(n, 4), q.setStart(n, 2), -1 == o.compareBoundaryPoints(o.START_TO_END, q) && 1 == o.compareBoundaryPoints(o.END_TO_START, q) ? k.compareBoundaryPoints = function(a, b) {
					return b = b.nativeRange || b, a == b.START_TO_END ? a = b.END_TO_START : a == b.END_TO_START && (a = b.START_TO_END), this.nativeRange.compareBoundaryPoints(a, b)
				} : k.compareBoundaryPoints = function(a, b) {
					return this.nativeRange.compareBoundaryPoints(a, b.nativeRange || b)
				};
				var r = document.createElement("div");
				r.innerHTML = "123";
				var s = r.firstChild,
					t = i(document);
				t.appendChild(r), o.setStart(s, 1), o.setEnd(s, 2), o.deleteContents(), "13" == s.data && (k.deleteContents = function() {
					this.nativeRange.deleteContents(), d(this)
				}, k.extractContents = function() {
					var a = this.nativeRange.extractContents();
					return d(this), a
				}), t.removeChild(r), t = null, f.isHostMethod(o, "createContextualFragment") && (k.createContextualFragment = function(a) {
					return this.nativeRange.createContextualFragment(a)
				}), i(document).removeChild(n), k.getName = function() {
					return "WrappedRange"
				}, a.WrappedRange = c, a.createNativeRange = function(a) {
					return a = j(a, b, "createNativeRange"), a.createRange()
				}
			}(), a.features.implementsTextRange) {
				var l = function(a) {
						var b = a.parentElement(),
							c = a.duplicate();
						c.collapse(!0);
						var d = c.parentElement();
						c = a.duplicate(), c.collapse(!1);
						var f = c.parentElement(),
							g = d == f ? d : e.getCommonAncestor(d, f);
						return g == b ? g : e.getCommonAncestor(b, g)
					},
					m = function(a) {
						return 0 == a.compareEndPoints("StartToEnd", a)
					},
					n = function(a, b, c, d, f) {
						var h = a.duplicate();
						h.collapse(c);
						var i = h.parentElement();
						if (e.isOrIsAncestorOf(b, i) || (i = b), !i.canHaveHTML) {
							var j = new g(i.parentNode, e.getNodeIndex(i));
							return {
								boundaryPosition: j,
								nodeInfo: {
									nodeIndex: j.offset,
									containerElement: j.node
								}
							}
						}
						var l = e.getDocument(i).createElement("span");
						l.parentNode && e.removeNode(l);
						for (var m, n, o, p, q, r = c ? "StartToStart" : "StartToEnd", s = f && f.containerElement == i ? f.nodeIndex : 0, t = i.childNodes.length, u = t, v = u;;) {
							if (v == t ? i.appendChild(l) : i.insertBefore(l, i.childNodes[v]), h.moveToElementText(l), m = h.compareEndPoints(r, a), 0 == m || s == u) break;
							if (-1 == m) {
								if (u == s + 1) break;
								s = v
							} else u = u == s + 1 ? s : v;
							v = Math.floor((s + u) / 2), i.removeChild(l)
						}
						if (q = l.nextSibling, -1 == m && q && k(q)) {
							h.setEndPoint(c ? "EndToStart" : "EndToEnd", a);
							var w;
							if (/[\r\n]/.test(q.data)) {
								var x = h.duplicate(),
									y = x.text.replace(/\r\n/g, "\r").length;
								for (w = x.moveStart("character", y); - 1 == (m = x.compareEndPoints("StartToEnd", x));) w++, x.moveStart("character", 1)
							} else w = h.text.length;
							p = new g(q, w)
						} else n = (d || !c) && l.previousSibling, o = (d || c) && l.nextSibling, p = o && k(o) ? new g(o, 0) : n && k(n) ? new g(n, n.data.length) : new g(i, e.getNodeIndex(l));
						return e.removeNode(l), {
							boundaryPosition: p,
							nodeInfo: {
								nodeIndex: v,
								containerElement: i
							}
						}
					},
					o = function(a, b) {
						var c, d, f, g, h = a.offset,
							j = e.getDocument(a.node),
							l = i(j).createTextRange(),
							m = k(a.node);
						return m ? (c = a.node, d = c.parentNode) : (g = a.node.childNodes, c = h < g.length ? g[h] : null, d = a.node), f = j.createElement("span"), f.innerHTML = "&#feff;", c ? d.insertBefore(f, c) : d.appendChild(f), l.moveToElementText(f), l.collapse(!b), d.removeChild(f), m && l[b ? "moveStart" : "moveEnd"]("character", h), l
					};
				d = function(a) {
					this.textRange = a, this.refresh()
				}, d.prototype = new h(document), d.prototype.refresh = function() {
					var a, b, c, d = l(this.textRange);
					m(this.textRange) ? b = a = n(this.textRange, d, !0, !0).boundaryPosition : (c = n(this.textRange, d, !0, !1), a = c.boundaryPosition, b = n(this.textRange, d, !1, !1, c.nodeInfo).boundaryPosition), this.setStart(a.node, a.offset), this.setEnd(b.node, b.offset)
				}, d.prototype.getName = function() {
					return "WrappedTextRange"
				}, h.copyComparisonConstants(d);
				var p = function(a) {
						if (a.collapsed) return o(new g(a.startContainer, a.startOffset), !0);
						var b = o(new g(a.startContainer, a.startOffset), !0),
							c = o(new g(a.endContainer, a.endOffset), !1),
							d = i(h.getRangeDocument(a)).createTextRange();
						return d.setEndPoint("StartToStart", b), d.setEndPoint("EndToEnd", c), d
					};
				if (d.rangeToTextRange = p, d.prototype.toTextRange = function() {
					return p(this)
				}, a.WrappedTextRange = d, !a.features.implementsDomRange || a.config.preferTextRange) {
					var q = function(a) {
							return a("return this;")()
						}(Function);
					"undefined" == typeof q.Range && (q.Range = d), a.createNativeRange = function(a) {
						return a = j(a, b, "createNativeRange"), i(a).createTextRange()
					}, a.WrappedRange = d
				}
			}
			a.createRange = function(c) {
				return c = j(c, b, "createRange"), new a.WrappedRange(a.createNativeRange(c))
			}, a.createRangyRange = function(a) {
				return a = j(a, b, "createRangyRange"), new h(a)
			}, f.createAliasForDeprecatedMethod(a, "createIframeRange", "createRange"), f.createAliasForDeprecatedMethod(a, "createIframeRangyRange", "createRangyRange"), a.addShimListener(function(b) {
				var c = b.document;
				"undefined" == typeof c.createRange && (c.createRange = function() {
					return a.createRange(c)
				}), c = b = null
			})
		}), H.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(a, b) {
			function x(a) {
				var b = [],
					c = new I(a.anchorNode, a.anchorOffset),
					d = new I(a.focusNode, a.focusOffset),
					e = "function" == typeof a.getName ? a.getName() : "Selection";
				if ("undefined" != typeof a.rangeCount) for (var f = 0, g = a.rangeCount; g > f; ++f) b[f] = F.inspect(a.getRangeAt(f));
				return "[" + e + "(Ranges: " + b.join(", ") + ")(anchor: " + c.inspect() + ", focus: " + d.inspect() + "]"
			}
			function w(b) {
				return function(c, d) {
					var e;
					this.rangeCount ? (e = this.getRangeAt(0), e["set" + (b ? "Start" : "End")](c, d)) : (e = a.createRange(this.win.document), e.setStartAndEnd(c, d)), this.setSingleRange(e, this.isBackward())
				}
			}
			function v(a, b) {
				if (a.win.document != L(b)) throw new H("WRONG_DOCUMENT_ERR")
			}
			function u(a, c) {
				for (var d, e = L(c[0].startContainer), f = M(e).createControlRange(), g = 0, h = c.length; h > g; ++g) {
					d = m(c[g]);
					try {
						f.add(d)
					} catch (i) {
						throw b.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")
					}
				}
				f.select(), p(a)
			}
			function t(a, b) {
				for (var c, d, e = bb.length; e--;) if (c = bb[e], d = c.selection, "deleteAll" == b) s(d);
				else if (c.win == a) return "delete" == b ? (bb.splice(e, 1), !0) : d;
				return "deleteAll" == b && (bb.length = 0), null
			}
			function s(a) {
				a.win = a.anchorNode = a.focusNode = a._ranges = null, a.rangeCount = a.anchorOffset = a.focusOffset = 0, a.detached = !0
			}
			function r(a, b, c) {
				this.nativeSelection = a, this.docSelection = b, this._ranges = [], this.win = c, this.refresh()
			}
			function q(a, c) {
				for (var d = a.docSelection.createRange(), e = m(c), f = L(d.item(0)), g = M(f).createControlRange(), h = 0, i = d.length; i > h; ++h) g.add(d.item(h));
				try {
					g.add(e)
				} catch (j) {
					throw b.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")
				}
				g.select(), p(a)
			}
			function p(b) {
				if (b._ranges.length = 0, "None" == b.docSelection.type) j(b);
				else {
					var c = b.docSelection.createRange();
					if (n(c)) o(b, c);
					else {
						b.rangeCount = c.length;
						for (var d, e = L(c.item(0)), f = 0; f < b.rangeCount; ++f) d = a.createRange(e), d.selectNode(c.item(f)), b._ranges.push(d);
						b.isCollapsed = 1 == b.rangeCount && b._ranges[0].collapsed, h(b, b._ranges[b.rangeCount - 1], !1)
					}
				}
			}
			function o(a, b) {
				var c = new G(b);
				a._ranges = [c], h(a, c, !1), a.rangeCount = 1, a.isCollapsed = c.collapsed
			}
			function n(a) {
				return !!a && "undefined" != typeof a.text
			}
			function m(a) {
				var c = a.getNodes();
				if (!l(c)) throw b.createError("getSingleElementFromRange: range " + a.inspect() + " did not consist of a single element");
				return c[0]
			}
			function l(a) {
				if (!a.length || 1 != a[0].nodeType) return !1;
				for (var b = 1, c = a.length; c > b; ++b) if (!C.isAncestorOf(a[0], a[b])) return !1;
				return !0
			}
			function k(b) {
				var c;
				return b instanceof F ? (c = a.createNativeRange(b.getDocument()), c.setEnd(b.endContainer, b.endOffset), c.setStart(b.startContainer, b.startOffset)) : b instanceof G ? c = b.nativeRange : J.implementsDomRange && b instanceof C.getWindow(b.startContainer).Range && (c = b), c
			}
			function j(a) {
				a.anchorNode = a.focusNode = null, a.anchorOffset = a.focusOffset = 0, a.rangeCount = 0, a.isCollapsed = !0, a._ranges.length = 0
			}
			function i(a) {
				var b = a.nativeSelection;
				a.anchorNode = b.anchorNode, a.anchorOffset = b.anchorOffset, a.focusNode = b.focusNode, a.focusOffset = b.focusOffset
			}
			function h(a, b, c) {
				var d = c ? "end" : "start",
					e = c ? "start" : "end";
				a.anchorNode = b[d + "Container"], a.anchorOffset = b[d + "Offset"], a.focusNode = b[e + "Container"], a.focusOffset = b[e + "Offset"]
			}
			function g(a) {
				var b = !1;
				return a.anchorNode && (b = 1 == C.comparePoints(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset)), b
			}
			function f(a) {
				return d(a, "getDocSelection").document.selection
			}
			function e(a) {
				return d(a, "getWinSelection").getSelection()
			}
			function d(a, c) {
				if (a) {
					if (C.isWindow(a)) return a;
					if (a instanceof r) return a.win;
					var d = C.getContentDocument(a, b, c);
					return C.getWindow(d)
				}
				return window
			}
			function c(a) {
				return "string" == typeof a ? /^backward(s)?$/i.test(a) : !! a
			}
			a.config.checkSelectionRanges = !0;
			var y, z, A = "boolean",
				B = "number",
				C = a.dom,
				D = a.util,
				E = D.isHostMethod,
				F = a.DomRange,
				G = a.WrappedRange,
				H = a.DOMException,
				I = C.DomPosition,
				J = a.features,
				K = "Control",
				L = C.getDocument,
				M = C.getBody,
				N = F.rangesEqual,
				O = E(window, "getSelection"),
				P = D.isHostObject(document, "selection");
			J.implementsWinGetSelection = O, J.implementsDocSelection = P;
			var Q = P && (!O || a.config.preferTextRange);
			if (Q) y = f, a.isSelectionValid = function(a) {
				var b = d(a, "isSelectionValid").document,
					c = b.selection;
				return "None" != c.type || L(c.createRange().parentElement()) == b
			};
			else {
				if (!O) return b.fail("Neither document.selection or window.getSelection() detected."), !1;
				y = e, a.isSelectionValid = function() {
					return !0
				}
			}
			a.getNativeSelection = y;
			var R = y();
			if (!R) return b.fail("Native selection was null (possibly issue 138?)"), !1;
			var S = a.createNativeRange(document),
				T = M(document),
				U = D.areHostProperties(R, ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);
			J.selectionHasAnchorAndFocus = U;
			var V = E(R, "extend");
			J.selectionHasExtend = V;
			var W = typeof R.rangeCount == B;
			J.selectionHasRangeCount = W;
			var X = !1,
				Y = !0,
				Z = V ?
			function(b, c) {
				var d = F.getRangeDocument(c),
					e = a.createRange(d);
				e.collapseToPoint(c.endContainer, c.endOffset), b.addRange(k(e)), b.extend(c.startContainer, c.startOffset)
			} : null;
			D.areHostMethods(R, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof R.rangeCount == B && J.implementsDomRange && !
			function() {
				var b = window.getSelection();
				if (b) {
					for (var c = b.rangeCount, d = c > 1, e = [], f = g(b), h = 0; c > h; ++h) e[h] = b.getRangeAt(h);
					var i = C.createTestElement(document, "", !1),
						j = i.appendChild(document.createTextNode("   ")),
						k = document.createRange();
					if (k.setStart(j, 1), k.collapse(!0), b.removeAllRanges(), b.addRange(k), Y = 1 == b.rangeCount, b.removeAllRanges(), !d) {
						var l = window.navigator.appVersion.match(/Chrome\/(.*?) /);
						if (l && parseInt(l[1]) >= 36) X = !1;
						else {
							var m = k.cloneRange();
							k.setStart(j, 0), m.setEnd(j, 3), m.setStart(j, 2), b.addRange(k), b.addRange(m), X = 2 == b.rangeCount
						}
					}
					for (C.removeNode(i), b.removeAllRanges(), h = 0; c > h; ++h) 0 == h && f ? Z ? Z(b, e[h]) : (a.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend"), b.addRange(e[h])) : b.addRange(e[h])
				}
			}(), J.selectionSupportsMultipleRanges = X, J.collapsedNonEditableSelectionsSupported = Y;
			var $, _ = !1;
			T && E(T, "createControlRange") && ($ = T.createControlRange(), D.areHostProperties($, ["item", "add"]) && (_ = !0)), J.implementsControlRange = _, z = U ?
			function(a) {
				return a.anchorNode === a.focusNode && a.anchorOffset === a.focusOffset
			} : function(a) {
				return a.rangeCount ? a.getRangeAt(a.rangeCount - 1).collapsed : !1
			};
			var ba;
			E(R, "getRangeAt") ? ba = function(a, b) {
				try {
					return a.getRangeAt(b)
				} catch (c) {
					return null
				}
			} : U && (ba = function(b) {
				var c = L(b.anchorNode),
					d = a.createRange(c);
				return d.setStartAndEnd(b.anchorNode, b.anchorOffset, b.focusNode, b.focusOffset), d.collapsed !== this.isCollapsed && d.setStartAndEnd(b.focusNode, b.focusOffset, b.anchorNode, b.anchorOffset), d
			}), r.prototype = a.selectionPrototype;
			var bb = [],
				bc = function(a) {
					if (a && a instanceof r) return a.refresh(), a;
					a = d(a, "getNativeSelection");
					var b = t(a),
						c = y(a),
						e = P ? f(a) : null;
					return b ? (b.nativeSelection = c, b.docSelection = e, b.refresh()) : (b = new r(c, e, a), bb.push({
						win: a,
						selection: b
					})), b
				};
			a.getSelection = bc, D.createAliasForDeprecatedMethod(a, "getIframeSelection", "getSelection");
			var bd = r.prototype;
			if (!Q && U && D.areHostMethods(R, ["removeAllRanges", "addRange"])) {
				bd.removeAllRanges = function() {
					this.nativeSelection.removeAllRanges(), j(this)
				};
				var be = function(a, b) {
						Z(a.nativeSelection, b), a.refresh()
					};
				W ? bd.addRange = function(b, d) {
					if (_ && P && this.docSelection.type == K) q(this, b);
					else if (c(d) && V) be(this, b);
					else {
						var e;
						X ? e = this.rangeCount : (this.removeAllRanges(), e = 0);
						var f = k(b).cloneRange();
						try {
							this.nativeSelection.addRange(f)
						} catch (g) {}
						if (this.rangeCount = this.nativeSelection.rangeCount, this.rangeCount == e + 1) {
							if (a.config.checkSelectionRanges) {
								var i = ba(this.nativeSelection, this.rangeCount - 1);
								i && !N(i, b) && (b = new G(i))
							}
							this._ranges[this.rangeCount - 1] = b, h(this, b, bh(this.nativeSelection)), this.isCollapsed = z(this)
						} else this.refresh()
					}
				} : bd.addRange = function(a, b) {
					c(b) && V ? be(this, a) : (this.nativeSelection.addRange(k(a)), this.refresh())
				}, bd.setRanges = function(a) {
					if (_ && P && a.length > 1) u(this, a);
					else {
						this.removeAllRanges();
						for (var b = 0, c = a.length; c > b; ++b) this.addRange(a[b])
					}
				}
			} else {
				if (!(E(R, "empty") && E(S, "select") && _ && Q)) return b.fail("No means of selecting a Range or TextRange was found"), !1;
				bd.removeAllRanges = function() {
					try {
						if (this.docSelection.empty(), "None" != this.docSelection.type) {
							var a;
							if (this.anchorNode) a = L(this.anchorNode);
							else if (this.docSelection.type == K) {
								var b = this.docSelection.createRange();
								b.length && (a = L(b.item(0)))
							}
							if (a) {
								var c = M(a).createTextRange();
								c.select(), this.docSelection.empty()
							}
						}
					} catch (d) {}
					j(this)
				}, bd.addRange = function(b) {
					this.docSelection.type == K ? q(this, b) : (a.WrappedTextRange.rangeToTextRange(b).select(), this._ranges[0] = b, this.rangeCount = 1, this.isCollapsed = this._ranges[0].collapsed, h(this, b, !1))
				}, bd.setRanges = function(a) {
					this.removeAllRanges();
					var b = a.length;
					b > 1 ? u(this, a) : b && this.addRange(a[0])
				}
			}
			bd.getRangeAt = function(a) {
				if (0 > a || a >= this.rangeCount) throw new H("INDEX_SIZE_ERR");
				return this._ranges[a].cloneRange()
			};
			var bf;
			if (Q) bf = function(b) {
				var c;
				a.isSelectionValid(b.win) ? c = b.docSelection.createRange() : (c = M(b.win.document).createTextRange(), c.collapse(!0)), b.docSelection.type == K ? p(b) : n(c) ? o(b, c) : j(b)
			};
			else if (E(R, "getRangeAt") && typeof R.rangeCount == B) bf = function(b) {
				if (_ && P && b.docSelection.type == K) p(b);
				else if (b._ranges.length = b.rangeCount = b.nativeSelection.rangeCount, b.rangeCount) {
					for (var c = 0, d = b.rangeCount; d > c; ++c) b._ranges[c] = new a.WrappedRange(b.nativeSelection.getRangeAt(c));
					h(b, b._ranges[b.rangeCount - 1], bh(b.nativeSelection)), b.isCollapsed = z(b)
				} else j(b)
			};
			else {
				if (!U || typeof R.isCollapsed != A || typeof S.collapsed != A || !J.implementsDomRange) return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"), !1;
				bf = function(a) {
					var b, c = a.nativeSelection;
					c.anchorNode ? (b = ba(c, 0), a._ranges = [b], a.rangeCount = 1, i(a), a.isCollapsed = z(a)) : j(a)
				}
			}
			bd.refresh = function(a) {
				var b = a ? this._ranges.slice(0) : null,
					c = this.anchorNode,
					d = this.anchorOffset;
				if (bf(this), a) {
					var e = b.length;
					if (e != this._ranges.length) return !0;
					if (this.anchorNode != c || this.anchorOffset != d) return !0;
					for (; e--;) if (!N(b[e], this._ranges[e])) return !0;
					return !1
				}
			};
			var bg = function(a, b) {
					var c = a.getAllRanges();
					a.removeAllRanges();
					for (var d = 0, e = c.length; e > d; ++d) N(b, c[d]) || a.addRange(c[d]);
					a.rangeCount || j(a)
				};
			_ && P ? bd.removeRange = function(a) {
				if (this.docSelection.type == K) {
					for (var b, c = this.docSelection.createRange(), d = m(a), e = L(c.item(0)), f = M(e).createControlRange(), g = !1, h = 0, i = c.length; i > h; ++h) b = c.item(h), b !== d || g ? f.add(c.item(h)) : g = !0;
					f.select(), p(this)
				} else bg(this, a)
			} : bd.removeRange = function(a) {
				bg(this, a)
			};
			var bh;
			!Q && U && J.implementsDomRange ? (bh = g, bd.isBackward = function() {
				return bh(this)
			}) : bh = bd.isBackward = function() {
				return !1
			}, bd.isBackwards = bd.isBackward, bd.toString = function() {
				for (var a = [], b = 0, c = this.rangeCount; c > b; ++b) a[b] = "" + this._ranges[b];
				return a.join("")
			}, bd.collapse = function(b, c) {
				v(this, b);
				var d = a.createRange(b);
				d.collapseToPoint(b, c), this.setSingleRange(d), this.isCollapsed = !0
			}, bd.collapseToStart = function() {
				if (!this.rangeCount) throw new H("INVALID_STATE_ERR");
				var a = this._ranges[0];
				this.collapse(a.startContainer, a.startOffset)
			}, bd.collapseToEnd = function() {
				if (!this.rangeCount) throw new H("INVALID_STATE_ERR");
				var a = this._ranges[this.rangeCount - 1];
				this.collapse(a.endContainer, a.endOffset)
			}, bd.selectAllChildren = function(b) {
				v(this, b);
				var c = a.createRange(b);
				c.selectNodeContents(b), this.setSingleRange(c)
			}, bd.deleteFromDocument = function() {
				if (_ && P && this.docSelection.type == K) {
					for (var a, b = this.docSelection.createRange(); b.length;) a = b.item(0), b.remove(a), C.removeNode(a);
					this.refresh()
				} else if (this.rangeCount) {
					var c = this.getAllRanges();
					if (c.length) {
						this.removeAllRanges();
						for (var d = 0, e = c.length; e > d; ++d) c[d].deleteContents();
						this.addRange(c[e - 1])
					}
				}
			}, bd.eachRange = function(a, b) {
				for (var c = 0, d = this._ranges.length; d > c; ++c) if (a(this.getRangeAt(c))) return b
			}, bd.getAllRanges = function() {
				var a = [];
				return this.eachRange(function(b) {
					a.push(b)
				}), a
			}, bd.setSingleRange = function(a, b) {
				this.removeAllRanges(), this.addRange(a, b)
			}, bd.callMethodOnEachRange = function(a, b) {
				var c = [];
				return this.eachRange(function(d) {
					c.push(d[a].apply(d, b || []))
				}), c
			}, bd.setStart = w(!0), bd.setEnd = w(!1), a.rangePrototype.select = function(a) {
				bc(this.getDocument()).setSingleRange(this, a)
			}, bd.changeEachRange = function(a) {
				var b = [],
					c = this.isBackward();
				this.eachRange(function(c) {
					a(c), b.push(c)
				}), this.removeAllRanges(), c && 1 == b.length ? this.addRange(b[0], "backward") : this.setRanges(b)
			}, bd.containsNode = function(a, b) {
				return this.eachRange(function(c) {
					return c.containsNode(a, b)
				}, !0) || !1
			}, bd.getBookmark = function(a) {
				return {
					backward: this.isBackward(),
					rangeBookmarks: this.callMethodOnEachRange("getBookmark", [a])
				}
			}, bd.moveToBookmark = function(b) {
				for (var c, d, e = [], f = 0; c = b.rangeBookmarks[f++];) d = a.createRange(this.win), d.moveToBookmark(c), e.push(d);
				b.backward ? this.setSingleRange(e[0], "backward") : this.setRanges(e)
			}, bd.saveRanges = function() {
				return {
					backward: this.isBackward(),
					ranges: this.callMethodOnEachRange("cloneRange")
				}
			}, bd.restoreRanges = function(a) {
				this.removeAllRanges();
				for (var b, c = 0; b = a.ranges[c]; ++c) this.addRange(b, a.backward && 0 == c)
			}, bd.toHtml = function() {
				var a = [];
				return this.eachRange(function(b) {
					a.push(F.toHtml(b))
				}), a.join("")
			}, J.implementsTextRange && (bd.getNativeTextRange = function() {
				var c;
				if (c = this.docSelection) {
					var d = c.createRange();
					if (n(d)) return d;
					throw b.createError("getNativeTextRange: selection is a control selection")
				}
				if (this.rangeCount > 0) return a.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));
				throw b.createError("getNativeTextRange: selection contains no range")
			}), bd.getName = function() {
				return "WrappedSelection"
			}, bd.inspect = function() {
				return x(this)
			}, bd.detach = function() {
				t(this.win, "delete"), s(this)
			}, r.detachAll = function() {
				t(null, "deleteAll")
			}, r.inspect = x, r.isDirectionBackward = c, a.Selection = r, a.selectionPrototype = bd, a.addShimListener(function(a) {
				"undefined" == typeof a.getSelection && (a.getSelection = function() {
					return bc(a)
				}), a = null
			})
		});
		var M = !1,
			N = function(a) {
				M || (M = !0, !H.initialized && H.config.autoInitialize && l())
			};
		return F && ("complete" == document.readyState ? N() : (a(document, "addEventListener") && document.addEventListener("DOMContentLoaded", N, !1), J(window, "load", N))), H
	}, this)
}, function(a, b, c) {
	(function(b) {
		c(6), a.exports = function(a, c) {
			var d, e, f, g, h;
			return {
				init: function() {
					a.log("plugins.formatting::init"), d = a.rangy.createClassApplier("bold", {
						elementTagName: "strong",
						applyToEditableOnly: !0,
						removeEmptyElements: !0
					}), e = a.rangy.createClassApplier("underline", {
						elementTagName: "u",
						applyToEditableOnly: !0,
						removeEmptyElements: !0
					}), f = a.rangy.createClassApplier("italic", {
						elementTagName: "i",
						applyToEditableOnly: !0,
						removeEmptyElements: !0
					}), g = a.rangy.createClassApplier("del", {
						elementTagName: "del",
						applyToEditableOnly: !0,
						removeEmptyElements: !0
					}), h = a.rangy.createClassApplier("font", {
						elementTagName: "font",
						applyToEditableOnly: !0,
						removeEmptyElements: !0,
						elementProperties: {
							color: ""
						}
					}), a.on("editor.formatting.range", c.range), a.on("editor.formatting.block", c.block), a.on("mousedown mouseup", c.stop), a.on("mouseup keyup mouseout", c.listener)
				},
				stop: function(c) {
					var d = c.target;
					if (!b.contains(a.container, d)) return !1;
					var e = a.core.findRoot(d);
					return a.core.isBlockNode(e) ? a.core.isNonEditableNode(e) ? !1 : a.core.isIgnoreCloseNode() ? !1 : void 0 : !1
				},
				range: function(b, d) {
					a.caret.restore(), a.buffer.setUndo(), c[d.type] && (c[d.type](d.props), a.caret.save(), c.fireRangeInfo())
				},
				block: function(b, d) {
					c[d.type] && (a.caret.restore(), a.buffer.setUndo(), c[d.type](), c.fireBlockInfo())
				},
				wrapWith: function(d, e) {
					void 0 === e && (a.selection.get(), e = a.core.getRoot()), e || (e = a.core.getEmptyP(), a.range.insertNode(e), a.caret.setStart(e));
					var f = b(a.range.startContainer).closest(d, a.container),
						g = document.createElement(d),
						h = a.core.applyCaret(e);
					if (!f.length) {
						if (b(e).replaceWith(g), 3 === e.nodeType && g.appendChild(e), a.core.isStructuredNode(e) && a.core.isStructuredBlockNode(g)) g.appendChild(e);
						else for (; e.firstChild;) g.appendChild(e.firstChild);
						return c.clearNonInline(g), h(g), g
					}
				},
				fireBlockInfo: function() {
					a.selection.get();
					var d = a.range.startContainer,
						e = a.core.findRoot(d);
					if (e && a.core.isBlockNode(e)) {
						var f = {
							container: e,
							$container: b(e),
							states: c.getStates(),
							range: a.range
						};
						b.extend(f, f.$container.position()), a.fire("editor.change.block", f)
					}
				},
				fireRangeInfo: function() {
					a.selection.get();
					var d = a.range.startContainer;
					d = 1 === d.nodeType ? d : d.parentNode;
					var e = {
						container: d,
						$container: b(d),
						states: c.getStates(),
						range: a.range
					};
					b.extend(e, e.$container.position()), a.fire("editor.change.range", e)
				},
				getStates: function() {
					var c = [],
						d = a.core.getRoot();
					return b.each(a.opts.RANGE_EXEC_STATES, function(b, d) {
						try {
							a.range.getDocument().queryCommandState(d) && c.push(d)
						} catch (e) {}
					}), b.each(a.opts.BLOCK_EXEC_STATES, function(a, b) {
						d && d.tagName && d.tagName === b.toUpperCase() && c.push(b)
					}), c
				},
				listener: function(a) {
					c.fireRangeInfo(), c.fireBlockInfo(), c.clear()
				},
				clearNonInline: function(c, d) {
					for (var e, f = b(c.childNodes).toArray(), g = a.core.getClearMap(c); e = f.pop();) {
						var h = b(e),
							i = e.parentNode;
						if (1 === e.nodeType) for (var j = e.childNodes.length, k = 0; j > k;) f.push(e.childNodes[k]), k++;
						if (b.contains(c, i)) {
							var l = i.tagName.toLocaleLowerCase(),
								m = g && (~g.indexOf("*") || ~g.indexOf(l)),
								n = a.core.isStructuredBlockNode(i) && a.core.isTerminalBlockNode(c),
								o = !a.opts.ALLOW_TAGS[l];
							if (m || a.core.isTerminalBlockNode(i) || n || o) {
								h.insertAfter(i), f.push(e), i.hasChildNodes() || b(i).remove(), d && d();
								continue
							}
						}
					}
				},
				clear: function() {
					a.selection.get();
					var b = a.core.findRoot(a.range.startContainer);
					if (!a.core.isNonEditableNode(b) && a.core.isBlockNode(b)) {
						var d = a.core.applyCaret(b);
						c.clearNonInline(b, function() {
							d(b)
						})
					}
				},
				ol: function() {
					c.wrapWith("li"), c.wrapWith("ol")
				},
				ul: function() {
					c.wrapWith("li"), c.wrapWith("ul")
				},
				h1: function() {
					c.wrapWith("h1")
				},
				h2: function() {
					c.wrapWith("h2")
				},
				p: function() {
					c.wrapWith("p")
				},
				blockquote: function() {
					c.wrapWith("blockquote")
				},
				u: function() {
					e.toggleSelection()
				},
				i: function() {
					f.toggleSelection()
				},
				strong: function() {
					d.toggleSelection()
				},
				del: function() {
					g.toggleSelection()
				},
				color: function(a) {
					h.undoToSelection(), void 0 !== a && (h.elementProperties = a, h.applyToSelection())
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	var d, e, f;
	!
	function(g, h) {
		e = [c(4)], d = g, f = "function" == typeof d ? d.apply(b, e) : d, void 0 === f || !(a.exports = f)
	}(function(a) {
		return a.createModule("ClassApplier", ["WrappedSelection"], function(a, b) {
			function K(a, b, c) {
				return new J(a, b, c)
			}
			function J(a, b, e) {
				var f, g, h, i, k = this;
				k.cssClass = k.className = a;
				var l = null,
					m = {};
				if ("object" == typeof b && null !== b) {
					for ("undefined" != typeof b.elementTagName && (b.elementTagName = b.elementTagName.toLowerCase()), e = b.tagNames, l = b.elementProperties, m = b.elementAttributes, g = 0; i = Z[g++];) b.hasOwnProperty(i) && (k[i] = b[i]);
					f = b.normalize
				} else f = b;
				k.normalize = "undefined" == typeof f ? !0 : normnormalizealize, k.attrExceptions = [];
				var n = document.createElement(k.elementTagName);
				k.elementProperties = k.copyPropertiesToElement(l, n, !0), c(m, function(a, b) {
					k.attrExceptions.push(a), m[a] = "" + b
				}), k.elementAttributes = m, k.elementSortedClassName = k.elementProperties.hasOwnProperty("className") ? j(k.elementProperties.className + " " + a) : a, k.applyToAnyTagName = !1;
				var o = typeof e;
				if ("string" == o)"*" == e ? k.applyToAnyTagName = !0 : k.tagNames = d(e.toLowerCase()).split(/\s*,\s*/);
				else if ("object" == o && "number" == typeof e.length) for (k.tagNames = [], g = 0, h = e.length; h > g; ++g)"*" == e[g] ? k.applyToAnyTagName = !0 : k.tagNames.push(e[g].toLowerCase());
				else k.tagNames = [k.elementTagName]
			}
			function I(a) {
				this.isElementMerge = 1 == a.nodeType, this.textNodes = [];
				var b = this.isElementMerge ? a.lastChild : a;
				b && (this.textNodes[0] = b)
			}
			function H(a) {
				var b = a ? "nextSibling" : "previousSibling";
				return function(c, d) {
					var e = c.parentNode,
						f = c[b];
					if (f) {
						if (f && 3 == f.nodeType) return f
					} else if (d && (f = e[b], f && 1 == f.nodeType && G(e, f))) {
						var g = f[a ? "firstChild" : "lastChild"];
						if (g && 3 == g.nodeType) return g
					}
					return null
				}
			}
			function G(a, b) {
				return a.namespaceURI == b.namespaceURI && a.tagName.toLowerCase() == b.tagName.toLowerCase() && l(a, b) && w(a, b) && "inline" == T(a, "display") && "inline" == T(b, "display")
			}
			function F(a, c, d, e) {
				var f, g, h = 0 == d;
				if (L.isAncestorOf(c, a)) return a;
				if (L.isCharacterDataNode(c)) {
					var i = L.getNodeIndex(c);
					if (0 == d) d = i;
					else {
						if (d != c.length) throw b.createError("splitNodeAt() should not be called with offset in the middle of a data node (" + d + " in " + c.data);
						d = i + 1
					}
					c = c.parentNode
				}
				if (E(c, d)) {
					f = c.cloneNode(!1), g = c.parentNode, f.id && f.removeAttribute("id");
					for (var j, k = 0; j = c.childNodes[d];) q(j, f, k++, e);
					return q(f, g, L.getNodeIndex(c) + 1, e), c == a ? f : F(a, g, L.getNodeIndex(f), e)
				}
				if (a != c) {
					f = c.parentNode;
					var l = L.getNodeIndex(c);
					return h || l++, F(a, f, l, e)
				}
				return a
			}
			function E(a, b) {
				return L.isCharacterDataNode(a) ? 0 == b ? !! a.previousSibling : b == a.length ? !! a.nextSibling : !0 : b > 0 && b < a.childNodes.length
			}
			function D(a, b) {
				for (var c, d, e, f = 0, g = a.length; g > f; ++f) c = a[f], d = b[2 * f], e = b[2 * f + 1], c.setStartAndEnd(d.node, d.offset, e.node, e.offset)
			}
			function C(a) {
				var b, c, d = [];
				for (b = 0; c = a[b++];) d.push(new M(c.startContainer, c.startOffset), new M(c.endContainer, c.endOffset));
				return d
			}
			function B(a) {
				if (0 == a.data.length) return !0;
				if (W.test(a.data)) return !1;
				var b = T(a.parentNode, "whiteSpace");
				switch (b) {
				case "pre":
				case "pre-wrap":
				case "-moz-pre-wrap":
					return !1;
				case "pre-line":
					if (/[\r\n]/.test(a.data)) return !1
				}
				return A(a.previousSibling) || A(a.nextSibling)
			}
			function A(a) {
				return a && 1 == a.nodeType && !V.test(T(a, "display"))
			}
			function z(a) {
				return (U(a) || 1 != a.nodeType && U(a.parentNode)) && !y(a)
			}
			function y(a) {
				var b;
				return a && 1 == a.nodeType && ((b = a.parentNode) && 9 == b.nodeType && "on" == b.designMode || U(a) && !U(a.parentNode))
			}
			function x(a, b) {
				for (var c, d = 0, e = a.attributes.length; e > d; ++d) if (c = a.attributes[d].name, (!b || !N(b, c)) && a.attributes[d].specified && "class" != c) return !0;
				return !1
			}
			function w(a, b) {
				if (a.attributes.length != b.attributes.length) return !1;
				for (var c, d, e, f = 0, g = a.attributes.length; g > f; ++f) if (c = a.attributes[f], e = c.name, "class" != e) {
					if (d = b.attributes.getNamedItem(e), null === c != (null === d)) return !1;
					if (c.specified != d.specified) return !1;
					if (c.specified && c.nodeValue !== d.nodeValue) return !1
				}
				return !0
			}
			function v(a) {
				for (var b, c = a.getNodes([3]), d = 0;
				(b = c[d]) && !u(a, b);)++d;
				for (var e = c.length - 1;
				(b = c[e]) && !u(a, b);)--e;
				return c.slice(d, e + 1)
			}
			function u(a, b) {
				var c = a.cloneRange();
				c.selectNodeContents(b);
				var d = c.intersection(a),
					e = d ? d.toString() : "";
				return "" != e
			}
			function t(a, b) {
				return s(a, a.parentNode, L.getNodeIndex(a), !0, b)
			}
			function s(a, b, c, d, e) {
				for (var f, g = []; f = a.firstChild;) q(f, b, c++, e), g.push(f);
				return d && r(a, e), g
			}
			function r(a, b) {
				var c = a.parentNode,
					d = L.getNodeIndex(a);
				P(b, function(a) {
					p(a, c, d)
				}), L.removeNode(a)
			}
			function q(a, b, c, d) {
				-1 == c && (c = b.childNodes.length);
				var e = a.parentNode,
					f = L.getNodeIndex(a);
				P(d, function(a) {
					o(a, e, f, b, c)
				}), b.childNodes.length == c ? b.appendChild(a) : b.insertBefore(a, b.childNodes[c])
			}
			function p(a, b, c) {
				a.node == b && a.offset > c && --a.offset
			}
			function o(a, b, c, d, e) {
				var f = a.node,
					g = a.offset,
					h = f,
					i = g;
				f == d && g > e && ++i, f != b || g != c && g != c + 1 || (h = d, i += e - c), f == b && g > c + 1 && --i, a.node = h, a.offset = i
			}
			function n(a) {
				var b = a.parentNode;
				return b && 1 == b.nodeType && !/^(textarea|style|script|select|iframe)$/i.test(b.nodeName)
			}
			function m(a, b) {
				for (var c = b.split(/\s+/), e = 0, g = c.length; g > e; ++e) if (!f(a, d(c[e]))) return !1;
				return !0
			}
			function l(a, b) {
				return k(a) == k(b)
			}
			function k(a) {
				return j(h(a))
			}
			function j(a) {
				return a && a.split(/\s+/).sort().join(" ")
			}
			function h(a) {
				var b = "string" == typeof a.className;
				return b ? a.className : a.getAttribute("class")
			}
			function g(a, b) {
				if ("object" == typeof a.classList) a.classList.add(b);
				else {
					var c = "string" == typeof a.className,
						d = c ? a.className : a.getAttribute("class");
					d ? e(d, b) || (d += " " + b) : d = b, c ? a.className = d : a.setAttribute("class", d)
				}
			}
			function f(a, b) {
				if ("object" == typeof a.classList) return a.classList.contains(b);
				var c = "string" == typeof a.className,
					d = c ? a.className : a.getAttribute("class");
				return e(d, b)
			}
			function e(a, b) {
				return !!a && (new RegExp("(?:^|\\s)" + b + "(?:\\s|$)")).test(a)
			}
			function d(a) {
				return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
			}
			function c(a, b) {
				for (var c in a) if (a.hasOwnProperty(c) && b(c, a[c]) === !1) return !1;
				return !0
			}
			var L = a.dom,
				M = L.DomPosition,
				N = L.arrayContains,
				O = a.util,
				P = O.forEach,
				Q = "span",
				R = O.isHostMethod(document, "createElementNS"),
				S = function() {
					function a(a, b, c) {
						return b && c ? " " : ""
					}
					return function(b, c) {
						if ("object" == typeof b.classList) b.classList.remove(c);
						else {
							var d = "string" == typeof b.className,
								e = d ? b.className : b.getAttribute("class");
							e = e.replace(new RegExp("(^|\\s)" + c + "(\\s|$)"), a), d ? b.className = e : b.setAttribute("class", e)
						}
					}
				}(),
				T = L.getComputedStyleProperty,
				U = function() {
					var a = document.createElement("div");
					return "boolean" == typeof a.isContentEditable ?
					function(a) {
						return a && 1 == a.nodeType && a.isContentEditable
					} : function(a) {
						return a && 1 == a.nodeType && "false" != a.contentEditable ? "true" == a.contentEditable || U(a.parentNode) : !1
					}
				}(),
				V = /^inline(-block|-table)?$/i,
				W = /[^\r\n\t\f \u200B]/,
				X = H(!1),
				Y = H(!0);
			I.prototype = {
				doMerge: function(a) {
					var b = this.textNodes,
						c = b[0];
					if (b.length > 1) {
						var d, e = L.getNodeIndex(c),
							f = [],
							g = 0;
						P(b, function(b, h) {
							d = b.parentNode, h > 0 && (d.removeChild(b), d.hasChildNodes() || L.removeNode(d), a && P(a, function(a) {
								a.node == b && (a.node = c, a.offset += g), a.node == d && a.offset > e && (--a.offset, a.offset == e + 1 && h < len - 1 && (a.node = c, a.offset = g))
							})), f[h] = b.data, g += b.data.length
						}), c.data = f.join("")
					}
					return c.data
				},
				getLength: function() {
					for (var a = this.textNodes.length, b = 0; a--;) b += this.textNodes[a].length;
					return b
				},
				toString: function() {
					var a = [];
					return P(this.textNodes, function(b, c) {
						a[c] = "'" + b.data + "'"
					}), "[Merge(" + a.join(",") + ")]"
				}
			};
			var Z = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly", "useExistingElements", "removeEmptyElements", "onElementCreate"],
				$ = {};
			J.prototype = {
				elementTagName: Q,
				elementProperties: {},
				elementAttributes: {},
				ignoreWhiteSpace: !0,
				applyToEditableOnly: !1,
				useExistingElements: !0,
				removeEmptyElements: !0,
				onElementCreate: null,
				copyPropertiesToElement: function(a, b, c) {
					var d, e, f, h, i, k, l = {};
					for (var m in a) if (a.hasOwnProperty(m)) if (h = a[m], i = b[m], "className" == m) g(b, h), g(b, this.className), b[m] = j(b[m]), c && (l[m] = h);
					else if ("style" == m) {
						e = i, c && (l[m] = f = {});
						for (d in a[m]) a[m].hasOwnProperty(d) && (e[d] = h[d], c && (f[d] = e[d]));
						this.attrExceptions.push(m)
					} else b[m] = h, c && (l[m] = b[m], k = $.hasOwnProperty(m) ? $[m] : m, this.attrExceptions.push(k));
					return c ? l : ""
				},
				copyAttributesToElement: function(a, b) {
					for (var c in a) a.hasOwnProperty(c) && !/^class(?:Name)?$/i.test(c) && b.setAttribute(c, a[c])
				},
				appliesToElement: function(a) {
					return N(this.tagNames, a.tagName.toLowerCase())
				},
				getEmptyElements: function(a) {
					var b = this;
					return a.getNodes([1], function(a) {
						return b.appliesToElement(a) && !a.hasChildNodes()
					})
				},
				hasClass: function(a) {
					return 1 == a.nodeType && (this.applyToAnyTagName || this.appliesToElement(a)) && f(a, this.className)
				},
				getSelfOrAncestorWithClass: function(a) {
					for (; a;) {
						if (this.hasClass(a)) return a;
						a = a.parentNode
					}
					return null
				},
				isModifiable: function(a) {
					return !this.applyToEditableOnly || z(a)
				},
				isIgnorableWhiteSpaceNode: function(a) {
					return this.ignoreWhiteSpace && a && 3 == a.nodeType && B(a)
				},
				postApply: function(a, b, c, d) {
					var e, f, g = a[0],
						h = a[a.length - 1],
						j = [],
						k = g,
						l = h,
						m = 0,
						n = h.length;
					P(a, function(a) {
						f = X(a, !d), f ? (e || (e = new I(f), j.push(e)), e.textNodes.push(a), a === g && (k = e.textNodes[0], m = k.length), a === h && (l = e.textNodes[0], n = e.getLength())) : e = null
					});
					var o = Y(h, !d);
					if (o && (e || (e = new I(h), j.push(e)), e.textNodes.push(o)), j.length) {
						for (i = 0, len = j.length; i < len; ++i) j[i].doMerge(c);
						b.setStartAndEnd(k, m, l, n)
					}
				},
				createContainer: function(a) {
					var b, c = L.getDocument(a),
						d = R && !L.isHtmlNamespace(a) && (b = a.namespaceURI) ? c.createElementNS(a.namespaceURI, this.elementTagName) : c.createElement(this.elementTagName);
					return this.copyPropertiesToElement(this.elementProperties, d, !1), this.copyAttributesToElement(this.elementAttributes, d), g(d, this.className), this.onElementCreate && this.onElementCreate(d, this), d
				},
				elementHasProperties: function(a, b) {
					var d = this;
					return c(b, function(b, c) {
						if ("className" == b) return m(a, c);
						if ("object" == typeof c) {
							if (!d.elementHasProperties(a[b], c)) return !1
						} else if (a[b] !== c) return !1
					})
				},
				elementHasAttributes: function(a, b) {
					return c(b, function(b, c) {
						return a.getAttribute(b) !== c ? !1 : void 0
					})
				},
				applyToTextNode: function(a, b) {
					if (n(a)) {
						var c = a.parentNode;
						if (1 == c.childNodes.length && this.useExistingElements && this.appliesToElement(c) && this.elementHasProperties(c, this.elementProperties) && this.elementHasAttributes(c, this.elementAttributes)) g(c, this.className);
						else {
							var d = a.parentNode,
								e = this.createContainer(d);
							d.insertBefore(e, a), e.appendChild(a)
						}
					}
				},
				isRemovable: function(a) {
					return a.tagName.toLowerCase() == this.elementTagName && k(a) == this.elementSortedClassName && this.elementHasProperties(a, this.elementProperties) && !x(a, this.attrExceptions) && this.elementHasAttributes(a, this.elementAttributes) && this.isModifiable(a)
				},
				isEmptyContainer: function(a) {
					var b = a.childNodes.length;
					return 1 == a.nodeType && this.isRemovable(a) && (0 == b || 1 == b && this.isEmptyContainer(a.firstChild))
				},
				removeEmptyContainers: function(a) {
					var b = this,
						c = a.getNodes([1], function(a) {
							return b.isEmptyContainer(a)
						}),
						d = [a],
						e = C(d);
					P(c, function(a) {
						r(a, e)
					}), D(d, e)
				},
				undoToTextNode: function(a, b, c, d) {
					if (!b.containsNode(c)) {
						var e = b.cloneRange();
						e.selectNode(c), e.isPointInRange(b.endContainer, b.endOffset) && (F(c, b.endContainer, b.endOffset, d), b.setEndAfter(c)), e.isPointInRange(b.startContainer, b.startOffset) && (c = F(c, b.startContainer, b.startOffset, d))
					}
					this.isRemovable(c) ? t(c, d) : S(c, this.className)
				},
				splitAncestorWithClass: function(a, b, c) {
					var d = this.getSelfOrAncestorWithClass(a);
					d && F(d, a, b, c)
				},
				undoToAncestor: function(a, b) {
					this.isRemovable(a) ? t(a, b) : S(a, this.className)
				},
				applyToRange: function(a, b) {
					var c = this;
					b = b || [];
					var d = C(b || []);
					a.splitBoundariesPreservingPositions(d), c.removeEmptyElements && c.removeEmptyContainers(a);
					var e = v(a);
					if (e.length) {
						P(e, function(a) {
							c.isIgnorableWhiteSpaceNode(a) || c.getSelfOrAncestorWithClass(a) || !c.isModifiable(a) || c.applyToTextNode(a, d)
						});
						var f = e[e.length - 1];
						a.setStartAndEnd(e[0], 0, f, f.length), c.normalize && c.postApply(e, a, d, !1), D(b, d)
					}
					var h = c.getEmptyElements(a);
					P(h, function(a) {
						g(a, c.className)
					})
				},
				applyToRanges: function(a) {
					for (var b = a.length; b--;) this.applyToRange(a[b], a);
					return a
				},
				applyToSelection: function(b) {
					var c = a.getSelection(b);
					c.setRanges(this.applyToRanges(c.getAllRanges()))
				},
				undoToRange: function(a, b) {
					var c = this;
					b = b || [];
					var d = C(b);
					a.splitBoundariesPreservingPositions(d), c.removeEmptyElements && c.removeEmptyContainers(a, d);
					var e, f, g = v(a),
						h = g[g.length - 1];
					if (g.length) {
						c.splitAncestorWithClass(a.endContainer, a.endOffset, d), c.splitAncestorWithClass(a.startContainer, a.startOffset, d);
						for (var i = 0, j = g.length; j > i; ++i) e = g[i], f = c.getSelfOrAncestorWithClass(e), f && c.isModifiable(e) && c.undoToAncestor(f, d);
						a.setStartAndEnd(g[0], 0, h, h.length), c.normalize && c.postApply(g, a, d, !0), D(b, d)
					}
					var k = c.getEmptyElements(a);
					P(k, function(a) {
						S(a, c.className)
					})
				},
				undoToRanges: function(a) {
					for (var b = a.length; b--;) this.undoToRange(a[b], a);
					return a
				},
				undoToSelection: function(b) {
					var c = a.getSelection(b),
						d = a.getSelection(b).getAllRanges();
					this.undoToRanges(d), c.setRanges(d)
				},
				isAppliedToRange: function(a) {
					if (a.collapsed || "" == a.toString()) return !!this.getSelfOrAncestorWithClass(a.commonAncestorContainer);
					var b = a.getNodes([3]);
					if (b.length) for (var c, d = 0; c = b[d++];) if (!this.isIgnorableWhiteSpaceNode(c) && u(a, c) && this.isModifiable(c) && !this.getSelfOrAncestorWithClass(c)) return !1;
					return !0
				},
				isAppliedToRanges: function(a) {
					var b = a.length;
					if (0 == b) return !1;
					for (; b--;) if (!this.isAppliedToRange(a[b])) return !1;
					return !0
				},
				isAppliedToSelection: function(b) {
					var c = a.getSelection(b);
					return this.isAppliedToRanges(c.getAllRanges())
				},
				toggleRange: function(a) {
					this.isAppliedToRange(a) ? this.undoToRange(a) : this.applyToRange(a)
				},
				toggleSelection: function(a) {
					this.isAppliedToSelection(a) ? this.undoToSelection(a) : this.applyToSelection(a)
				},
				getElementsWithClassIntersectingRange: function(a) {
					var b = [],
						c = this;
					return a.getNodes([3], function(a) {
						var d = c.getSelfOrAncestorWithClass(a);
						d && !N(b, d) && b.push(d)
					}), b
				},
				detach: function() {}
			}, J.util = {
				hasClass: f,
				addClass: g,
				removeClass: S,
				getClass: h,
				hasSameClasses: l,
				hasAllClasses: m,
				replaceWithOwnChildren: t,
				elementsHaveSameNonClassAttributes: w,
				elementHasNonClassAttributes: x,
				splitNodeAt: F,
				isEditableElement: U,
				isEditingHost: y,
				isEditable: z
			}, a.CssClassApplier = a.ClassApplier = J, a.createClassApplier = K, O.createAliasForDeprecatedMethod(a, "createCssClassApplier", "createClassApplier", b)
		}), a
	}, this)
}, function(a, b, c) {
	(function(b) {
		var d = c(8);
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("plugins::image::init"), a.on("click", "figcaption", c.imageChangeCaption), a.on("click", "footer", c.imageRemove), a.wraper.img = c.wrapImage
				},
				imageChangeCaption: function(c) {
					var f = b(c.currentTarget),
						g = f.parents("figure"),
						h = b("img", g),
						i = function(c) {
							c = b.trim(c), h.attr("alt", c), c || (c = a.opts.defaultImageCaption), f.html(d(c))
						};
					i.data = {
						alt: h.attr("alt")
					}, a.fire("editor.image.beforeChangeCaption", i)
				},
				imageRemove: function(c) {
					a.fire("editor.image.remove", function(d) {
						d && (b(c.currentTarget).parents("figure").remove(), a.caret.restore())
					})
				},
				wrapImage: function(c) {
					var d = b('<figure class="card-img" onselectstart="return false;" contenteditable="false"><header class="toolbar"><span></span><span></span><span></span><span>&nbsp;</span></header><img src="http://ww2.sinaimg.cn/orj480/58088323gw1f33ag5dhg3j21kk0zeth9.jpg"/><footer data-action="image_del" class="toolbar">移除 </footer><figcaption data-action="image_caption">' + (b(c).attr("alt") || a.opts.defaultImageCaption || "") + "</figcaption></figure>");
					return b(c).replaceWith(d), b("img", d).replaceWith(c), d
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		"use strict";
		for (var c = ["<", ">", "&", "'", '"'], d = new RegExp(c.join("|"), "gm"), f = {}, g = 0; g < c.length; g++) f[c[g]] = "&#" + c[g].charCodeAt(0) + ";";
		a.exports = function(a) {
			return "string" === b.type(a) ? a.replace(d, function(a) {
				return f[a]
			}) : ""
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		c(8);
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("plugins::rules::init"), a.on("editor.insertHTML editor.setContent", c.breakBlock), a.on("editor.insertHTML editor.setContent", c.breakImage), a.on("editor.insertHTML editor.setContent", c.breakCard), a.on("editor.insertHTML editor.setContent", c.wrapFirst), a.on("editor.insertHTML editor.setContent", c.clearEmpty), c.initialize(), c.breakBlock(), c.breakImage(), c.breakCard(), c.clearEmpty(), c.wrapFirst()
				},
				initialize: function() {
					if (!b.trim(a.core.getText())) {
						var c = a.core.getEmptyP();
						a.container.appendChild(c), a.caret.setStart(c)
					}
				},
				breakBlock: function() {
					var c = [];
					b.each(a.opts.TERMINAL_BLOCK_TAGS, function(a) {
						c.push(a)
					});
					var d = b(c.join(","), a.container);
					b.each(d, function(b, c) {
						c.parentNode !== a.container && a.core.breakBlockNode(c)
					})
				},
				breakImage: function() {
					var c = b("img", a.container).toArray();
					b.each(c, function(c, d) {
						b(d).parents("figure").length || a.core.breakBlockNode(d)
					})
				},
				breakCard: function() {
					var c = b("card", parent).toArray();
					b.each(c, function(b, c) {
						a.core.breakBlockNode(c)
					})
				},
				wrapFirst: function() {
					var c, d = b(a.container.childNodes).toArray(),
						f = 0,
						g = d.length;
					for (f; g > f; f++) if (c = d[f]) {
						var h = b(c);
						if (a.core.isTextNode(c)) {
							if (b.trim(h.text())) {
								h.wrap("<p></p>");
								continue
							}
							h.remove()
						} else if (!a.core.isBlockNode(c) && !a.core.isNonEditableNode(c)) {
							var i = a.wraper[c.tagName.toLocaleLowerCase()];
							if (c && i) {
								i(c);
								continue
							}
							h.wrap("<p></p>")
						}
					}
				},
				clearEmpty: function() {
					a.core.clearEmpty(a.container)
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("module.core::init"), a.container.focus(), a.on("focus", c.onFocus), a.on("blur", c.onBlur)
				},
				browser: function(a) {
					var b = navigator.userAgent.toLowerCase(),
						c = /(opr)[\/]([\w.]+)/.exec(b) || /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || b.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(b) || b.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
					return "safari" == a ? "undefined" != typeof c[3] ? "safari" == c[3] : !1 : "version" == a ? c[2] : "webkit" == a ? "chrome" == c[1] || "opr" == c[1] || "webkit" == c[1] : "rv" == c[1] ? "msie" == a : "opr" == c[1] ? "webkit" == a : a == c[1]
				},
				getEmptyP: function(b) {
					b = void 0 === b ? a.opts.defaultInvisibleSpace : "";
					var c = document.createElement("p");
					return c.innerHTML = b, c
				},
				isNonEditableNode: function(a) {
					return !!a && 1 === a.nodeType && "false" === a.getAttribute("contenteditable")
				},
				parentIsEditor: function(a) {
					return !!a && !! a.parentNode && c.isEditor(a.parentNode)
				},
				isEditor: function(b) {
					return !!b && b === a.container
				},
				walkChild: function(a, c, d) {
					if (1 === a.nodeType || 11 === a.nodeType) {
						var e = b(a.childNodes).toArray(),
							f = e.length,
							g = 0;
						for (d && e.reverse(), g; f > g; g++) {
							var h = c(e[g]);
							if (void 0 !== h) return h
						}
					}
				},
				getClearMap: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", a.opts.CLEAR_MAP[b.toLocaleLowerCase()]
				},
				clearEmpty: function(d) {
					var f = function(d) {
							var g = b(d);
							return 1 !== d.nodeType || a.core.isIgnoreCloseNode(d) || (c.isNonEditableNode(d) || a.core.walkChild(d, f), d.hasChildNodes() || c.isNonEditableNode(d)) ? void(3 !== d.nodeType || b.trim(d.nodeValue) || g.remove()) : void g.remove()
						};
					a.core.walkChild(d, f)
				},
				isBlockNode: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", b = b.toLocaleLowerCase(), !! a.opts.TERMINAL_BLOCK_TAGS[b] || !! a.opts.STRUCTURED_BLOCK_TAGS[b]
				},
				isStructuredBlockNode: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", !! a.opts.STRUCTURED_BLOCK_TAGS[b.toLocaleLowerCase()]
				},
				isTerminalBlockNode: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", !! a.opts.TERMINAL_BLOCK_TAGS[b.toLocaleLowerCase()]
				},
				isStructuredNode: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", !! a.opts.STRUCTURED_TAGS[b.toLocaleLowerCase()]
				},
				isIgnoreCloseNode: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", !! a.opts.IGNORE_CLOSE_TAGS[b.toLocaleLowerCase()]
				},
				isInlineNode: function(b) {
					return b && "object" == typeof b && (b = b.tagName), b += "", !! a.opts.INLINE_TAGS[b.toLocaleLowerCase()]
				},
				isTextNode: function(a) {
					return a && "object" == typeof a && "nodeType" in a && 3 === a.nodeType
				},
				getFragment: function(a) {
					var c = b("<div>")[0];
					"object" == typeof a ? c.appendChild(a) : c.innerHTML = a + "";
					for (var d = document.createDocumentFragment(); c.firstChild;) d.appendChild(c.firstChild);
					return d
				},
				focus: function() {
					a.container.focus(), a.caret.restore()
				},
				onFocus: function(b) {
					a.caret.restore()
				},
				onBlur: function(b) {
					a.caret.save()
				},
				hasBlockParent: function(d) {
					for (var f = d; b.contains(a.container, f);) {
						if (c.isBlockNode(f)) return !0;
						f = f.parentNode
					}
					return !1
				},
				hasBlockChild: function(a) {
					var b = c.walkChild(a, function(a) {
						return c.isBlockNode(a) ? !0 : void 0
					});
					return !!b
				},
				insertHTML: function(d) {
					var f = a.parser.parseHTML(d);
					if (f) {
						a.caret.restore(), a.buffer.setUndo(), a.selection.get();
						var f = a.parser.parseHTML(d);
						if (f) {
							var g = c.getFragment(f),
								h = g.lastChild,
								i = document.createElement("div");
							a.range.collapsed || a.range.deleteContents(), a.range.insertNode(i), c.hasBlockParent(a.range.startContainer) && c.hasBlockChild(g) && c.breakBlockNode(i), a.caret.setBefore(i), a.selection.get(), a.range.insertNode(g), a.caret.setEnd(h), a.caret.save(), b(i).remove(), a.fire("editor.insertHTML")
						}
					}
				},
				findRoot: function(c, d) {
					for (var f; b.contains(a.container, c);) {
						if (d && d.toUpperCase() === c.tagName) return c;
						f = c, c = c.parentNode
					}
					return f
				},
				breakBlockNode: function(b) {
					var d = c.findRoot(b);
					if (d !== b) {
						var f = a.selection.createRange();
						f.setStartAfter(b), f.setEndAfter(d);
						var g = f.extractContents();
						a.caret.setAfter(d), a.range.insertNode(b), a.caret.setAfter(b), a.range.insertNode(g)
					}
				},
				getText: function() {
					return b(c.getContent()).text()
				},
				getContent: function() {
					return a.parser.parseHTML(a.$container.html())
				},
				setContent: function(d) {
					if (c.focus(), a.buffer.setUndo(), d = a.parser.parseHTML(d), b.trim(d)) a.$container.html(d);
					else {
						a.$container.html("");
						var f = a.core.getEmptyP();
						a.container.appendChild(f), a.caret.setStart(f)
					}
					a.fire("editor.setContent")
				},
				getRoot: function() {
					a.selection.get();
					var b = a.range.startContainer;
					b === a.container && (b = a.container.childNodes[a.range.startOffset]);
					var d = c.findRoot(b);
					return d
				},
				getOffsetOfNode: function(c) {
					a.selection.get();
					var d = a.range.cloneRange();
					return d.selectNodeContents(c), d.setEnd(a.range.endContainer, a.range.endOffset), b.trim(d.toString()).length
				},
				getPrevBlock: function() {
					var a = c.getRoot();
					if (a) for (; a.previousSibling;) if (a = a.previousSibling, c.isBlockNode(a) && !c.isNonEditableNode(a)) return a
				},
				getNextBlock: function() {
					var a = c.getRoot();
					if (a) for (; a.nextSibling;) if (a = a.nextSibling, c.isBlockNode(a) && !c.isNonEditableNode(a)) return a
				},
				isUnselectNode: function(a) {
					return !c.isBlockNode(root) || c.isNonEditableNode(root)
				},
				isStartOfRoot: function() {
					var a = c.getRoot();
					if (!a) return !1;
					var b = c.getOffsetOfNode(a);
					return 0 === b
				},
				isEndOfRoot: function() {
					var a = c.getRoot();
					if (!a) return !1;
					var d = c.getOffsetOfNode(a),
						e = b.trim(b(a).text()).replace(/\n\r\n/g, "");
					return d == e.length
				},
				applyCaret: function(c) {
					var d = a.caret.save(c);
					return function(c) {
						b.each(d.rangeBookmarks, function(a, b) {
							b.containerNode = c
						}), a.caret.restore(d)
					}
				},
				replaceNodeWithTagName: function(a, c) {
					var d = document.createElement(c);
					for (b(a).replaceWith(d); a.firstChild;) d.appendChild(a.firstChild);
					return d
				},
				reset: function() {
					a.buffer.clear(), a.core.setContent("")
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("modules.selection::init")
				},
				get: function() {
					return a.sel = a.rangy.getSelection(a.container), a.sel.rangeCount ? void(a.range = a.sel.getRangeAt(0)) : void(b.contains(a.container, a.sel.anchorNode) && (a.range = a.rangy.createRange(a.container), a.caret.setStart(a.container)))
				},
				createRange: function() {
					return a.rangy.createRange(a.container)
				},
				addRange: function(b) {
					try {
						a.sel.removeAllRanges()
					} catch (c) {}
					var d = a.rangy.getSelection();
					a.range = b || a.range, d.addRange(a.range)
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("modules.caret::init")
				},
				set: function(b, c, d, f) {
					a.core.isBlockNode(b.tagName) && "" === b.innerHTML && (b.innerHTML = a.opts.invisibleSpace), a.selection.get();
					try {
						a.range.setStart(b, c), a.range.setEnd(d, f)
					} catch (g) {}
					a.selection.addRange()
				},
				getOffsetOfElement: function(c) {
					a.selection.get();
					var d = a.range.cloneRange();
					return d.selectNodeContents(c), d.setEnd(a.range.endContainer, a.range.endOffset), b.trim(d.toString()).length
				},
				setStart: function(b) {
					var c = a.selection.createRange();
					c.selectNodeContents(b), c.collapse(!0), a.selection.addRange(c)
				},
				setEnd: function(b) {
					var c = a.selection.createRange();
					c.selectNodeContents(b), c.collapse(!1), a.selection.addRange(c)
				},
				setBefore: function(b) {
					var c = a.selection.createRange();
					c.setStartBefore(b), c.setEndBefore(b), c.collapse(!0), a.selection.addRange(c)
				},
				setAfter: function(b) {
					var c = a.selection.createRange();
					c.setStartAfter(b), c.setEndAfter(b), c.collapse(!1), a.selection.addRange(c)
				},
				save: function(c) {
					return a.selection.get(), c ? a.sel.getBookmark(c) : void(b.contains(a.container, a.range.startContainer) && (a.savedRanges = a.range.cloneRange()))
				},
				restore: function(b) {
					return a.core.browser("mozilla") && a.container.focus(), b ? void a.sel.moveToBookmark(b) : void(a.savedRanges && (a.selection.addRange(a.savedRanges), a.range = a.savedRanges))
				}
			}
		}
	}).call(b, c(2))
}, function(a, b) {
	a.exports = function(a, b) {
		return {
			init: function() {
				a.log("modules.buffer::init")
			},
			clear: function() {
				a.cache.undo = [], a.cache.redo = []
			},
			setRedo: function() {
				var b = {
					caret: a.caret.save(a.container),
					content: a.$container.html()
				};
				a.cache.redo.push(b)
			},
			setUndo: function() {
				var b = {
					caret: a.caret.save(a.container),
					content: a.$container.html()
				};
				a.cache.undo.push(b), a.cache.undo.length > 100 && a.cache.undo.shift()
			},
			undo: function() {
				if (a.cache.undo.length) {
					b.setRedo();
					var c = a.cache.undo.pop();
					a.$container.html(c.content), a.caret.restore(c.caret)
				}
			},
			redo: function() {
				if (a.cache.redo.length) {
					b.setUndo();
					var c = a.cache.redo.pop();
					a.$container.html(c.content), a.caret.restore(c.caret)
				}
			}
		}
	}
}, function(a, b, c) {
	(function(b) {
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("modules.keys::init"), a.on("keydown", c.down), a.on("keyup", c.up)
				},
				down: function(c) {
					var d = a.core.getRoot(),
						f = c.ctrlKey || c.metaKey;
					if (f) {
						if (90 === c.keyCode) return c.shiftKey ? (a.buffer.redo(), !1) : (a.buffer.undo(), !1);
						if (89 === c.keyCode) return a.buffer.redo(), !1
					} else if (c.keyCode !== a.opts.KEY_CODES.DELETE) if (c.keyCode !== a.opts.KEY_CODES.BACKSPACE) {
						if (c.keyCode === a.opts.KEY_CODES.TAB) {
							a.buffer.setUndo();
							var g = b("<div>&nbsp;&nbsp;&nbsp;&nbsp;</div>"),
								h = g[0].firstChild;
							return a.range.insertNode(h), a.caret.setEnd(h), !1
						}
						if (c.keyCode !== a.opts.KEY_CODES.UP) if (c.keyCode !== a.opts.KEY_CODES.DOWN) if (c.keyCode !== a.opts.KEY_CODES.ENTER || c.shiftKey) {
							if (d) {
								if (a.buffer.setUndo(), d && "BR" === d.tagName) {
									var i = a.core.getEmptyP();
									return b(d).replaceWith(i), void a.caret.setStart(i)
								}
								if (d && 3 === d.nodeType || 0 > m) {
									var i = a.core.getEmptyP(),
										j = a.core.applyCaret(d);
									return b(d).replaceWith(i), b(i).prepend(d), void j(d)
								}
							} else if (!d) {
								a.buffer.setUndo();
								var i = a.core.getEmptyP(),
									k = a.range.cloneRange();
								k.collapse(!0), k.insertNode(i), a.selection.addRange(k), a.caret.setStart(i)
							}
						} else {
							a.buffer.setUndo();
							var l = a.core.getNextBlock();
							if (a.core.isEndOfRoot()) {
								if (!l) {
									var i = a.core.getEmptyP();
									return a.container.appendChild(i), a.caret.setStart(i), !1
								}
								if (d && "BLOCKQUOTE" === d.tagName) {
									var i = a.core.getEmptyP();
									return b(i).insertAfter(d), a.caret.setStart(i), !1
								}
							}
							if (d && "BLOCKQUOTE" === d.tagName) {
								a.selection.get();
								var k = a.selection.createRange();
								k.selectNodeContents(d);
								var m = a.range.compareBoundaryPoints(Range.START_TO_START, k),
									n = a.range.startContainer,
									o = a.range.startOffset,
									p = a.range.cloneRange();
								p.selectNodeContents(d), p.setStart(n, o);
								var q = p.extractContents(),
									r = document.createElement("blockquote");
								return r.appendChild(q), b(r).insertAfter(d), a.caret.setStart(r), !1
							}
						} else {
							var l = a.core.getNextBlock();
							if (!l) {
								var i = a.core.getEmptyP();
								return a.container.appendChild(i), a.caret.setStart(i), !1
							}
						} else {
							var s = a.core.getPrevBlock(),
								u = a.container.firstChild;
							if (!s && a.container.firstChild && (!a.core.isBlockNode(u) || a.core.isNonEditableNode(u))) {
								var i = a.core.getEmptyP();
								return b(a.container).prepend(i), a.caret.setStart(i), !1
							}
						}
					} else {
						if (a.buffer.setUndo(), a.core.isStartOfRoot() && d && d.previousSibling && ("HR" === d.previousSibling.tagName || a.core.isNonEditableNode(d.previousSibling) || !a.core.isBlockNode(d.previousSibling))) return d.previousSibling.parentNode.removeChild(d.previousSibling), !1;
						if (!d) {
							var i = a.core.getEmptyP();
							return a.range.insertNode(i), a.caret.setStart(i), !1
						}
					} else if (a.buffer.setUndo(), a.core.isEndOfRoot() && d && d.nextSibling && !a.core.isBlockNode(d.nextSibling)) return nextSibling.parentNode.removeChild(d.nextSibling), !1
				},
				up: function(b) {
					var c = a.core.getRoot();
					if (c) {
						var d = a.selection.createRange();
						d.selectNodeContents(c);
						var f = a.range.compareBoundaryPoints(Range.START_TO_START, d);
						if (b.keyCode !== a.opts.KEY_CODES.DOWN && b.keyCode !== a.opts.KEY_CODES.RIGHT) {
							if (b.keyCode !== a.opts.KEY_CODES.UP && b.keyCode !== a.opts.KEY_CODES.LEFT) {
								if (!(!c || a.core.isBlockNode(c) || a.core.isNonEditableNode(c)) && 1 === c.nodeType) {
									var g = a.core.applyCaret(c),
										h = a.core.replaceNodeWithTagName(c, "p");
									g(h)
								}
							} else if (!a.core.isBlockNode(c) || a.core.isNonEditableNode(c) || 0 > f) {
								var i = a.core.getPrevBlock();
								if (i) return a.caret.setEnd(i), !1
							}
						} else {
							if (a.core.isNonEditableNode(c) || !a.core.isBlockNode(c)) {
								var j = a.core.getNextBlock();
								if (j) return a.caret.setStart(j), !1
							}
							if (a.core.isBlockNode(c) && 0 > f) return a.caret.setStart(c), !1
						}
					}
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		a.exports = function(a, c) {
			return {
				init: function() {
					a.log("modules.drag::init"), a.on("drop", c.onDrag), a.on("dragover", c.onDragover), a.on("dragleave", c.onDragLeave)
				},
				onDrag: function(c) {
					var d = c.originalEvent.dataTransfer;
					if (!d) return !1;
					if (~b(d.types).toArray().indexOf("text/html") && d.setData) return !1;
					var f = d.files;
					if (0 == f.length) return !1;
					var g = 0,
						h = f.length;
					for (g; h > g; g++) if (!~f[g].type.indexOf("image")) return a.fire("editor.drag.typeError", f[g]), !1;
					return a.fire("editor.drag.imageFileList", [f]), !1
				},
				onDragover: function(a) {},
				onDragLeave: function(a) {
					return !1
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	(function(b) {
		"use strict";
		var c;
		a.exports = function(a, d) {
			return {
				init: function() {
					a.log("modules.paste::init"), a.$container.on("paste", d.onPatse)
				},
				createPasteBox: function() {
					var c = b("<div>");
					return c.css("left", 0), c.css("top", 0), c.css("position", "fixed"), c.css("visibility", "hidden"), c.css("overflow", "hidden"), c.css("width", "1px"), c.css("height", "1px"), c.attr("contenteditable", "true"), a.$container.append(c), c[0].focus(), c
				},
				onPatse: function(f) {
					var g = f.originalEvent.clipboardData || window.clipboardData;
					if (a.caret.save(), g) {
						if (!(g.types && g.types.length || g.files && g.files.length)) return !1;
						var h = b(g.types).toArray();
						if (~h.toString().indexOf("image/")) return !1;
						if (~h.indexOf("text/html")) {
							var i = g.getData("text/html");
							return a.core.insertHTML(i), !1
						}
					}
					var j = d.createPasteBox();
					clearTimeout(c), c = setTimeout(function() {
						a.core.focus();
						var b = a.parser.parseHTML(j[0].innerHTML);
						j.remove(), a.core.insertHTML(b)
					}, 1)
				}
			}
		}
	}).call(b, c(2))
}, function(a, b, c) {
	var d = c(18);
	a.exports = function(a) {
		return d(a.opts)
	}
}, function(a, b, c) {
	var d = c(3),
		e = c(19),
		f = c(20),
		g = c(21);
	a.exports = function(a) {
		var b = {},
			c = /#\{.*?\}/g,
			h = function(b, e) {
				var f = b.token,
					g = b.value,
					h = a.ALLOW_TAGS[g],
					i = [];
				if (b.isInvalidate = !1, b.isStartTag = f === d.HTML_TOKEN_ENUM.StartTag, b.isEndTag = f === d.HTML_TOKEN_ENUM.EndTag, b.isTextNode = f === d.HTML_TOKEN_ENUM.Character, b.excludes = [], b.conflicts = [], b.isTextNode) return b.isNeedEscape = "needEscape" in b, b;
				if (h && (b.isStartTag || b.isEndTag) && (h.tagName && (g = b.value = h.tagName), h = a.ALLOW_TAGS[g], b.isIgnoreCloseTag = !! d.IGNORE_CLOSE_TAGS[g]), void 0 !== h) {
					if (h === !1) {
						if (b.isIgnoreCloseTag) return void(e[0] && "needEscape" in e[0] && e.shift());
						b.isInvalidate = !0
					}
					if (b.isStartTag) {
						for (var j = 0; j < b.attributes.length; j++) {
							var k, l = b.attributes[j];
							if (h && h.attributes && (k = h.attributes[l.name])) {
								if (k instanceof RegExp && !k.test(l.value)) {
									if (h.removeInvalidate && h.removeInvalidate[l.name]) {
										b.isInvalidate = !0;
										break
									}
									continue
								}
								"string" == typeof k && (l.value = k.replace(c, l.value || "")), i.push(l)
							}
						}
						h.toughAttributes && h.toughAttributes.length && (i = i.concat(h.toughAttributes))
					}
					return b.isInlineTag = !! h.inline, b.excludes = h.excludes || [], b.conflicts = h.conflicts || [], b.isBlock = !! d.TERMINAL_BLOCK_TAGS[g] || !! d.STRUCTURED_BLOCK_TAGS[g], b.attributes = i, b
				}
			};
		return b.previousBlock = function(a) {
			for (var b = a; b = b.previousNode;) if (b.isBlockTag) return b
		}, b.walkTokenData = function(a, c, d) {
			var e, f, g = [],
				i = void 0 === c ? [] : [c];
			for (void 0 === d && (d = 0); a[0];) if (e = h(a.shift(), a), e && (!e.isIgnoreCloseTag || !e.isInvalidate)) {
				if (e.isEndTag && !e.isIgnoreCloseTag) return i.push(e), {
					childNodes: c && c.isInvalidate ? [] : i,
					afterNodes: c && c.isInvalidate ? [] : g
				};
				if (e.previousNode = f, f = e, !e.isStartTag || e.isIgnoreCloseTag) 0 !== d ? !b.previousBlock(e) && !g.length || c.isStructuredBlockTag ? i = i.concat(e) : g = g.concat(e) : (g = g.concat(e), i = i.concat(g), g = []);
				else {
					var j = b.walkTokenData(a, e, d + 1);
					if (c) {
						if (!c.isStructuredBlockTag) {
							if (e.isBlockTag && (c.isInlineTag || c.isTerminalBlockTags) || b.previousBlock(e)) {
								g = g.concat(j.childNodes, j.afterNodes);
								continue
							}
							if (!c.isStructuredBlockTag && j.afterNodes.length) {
								i = i.concat(j.childNodes), g = g.concat(j.afterNodes);
								continue
							}
						}
						i = i.concat(g, j.childNodes, j.afterNodes);
						continue
					}
					i = i.concat(g, j.childNodes, j.afterNodes), g = []
				}
			}
			return {
				childNodes: i,
				afterNodes: g
			}
		}, b.parseHTML = function(a) {
			var c = e(a),
				d = f(c),
				h = b.walkTokenData(d),
				j = document.createElement("div");
			return h = h.childNodes.concat(h.afterNodes), h = g(h), j.innerHTML = h, j.innerHTML
		}, b.html = g, b.reader = e, b.scaner = f, b.constans = d, b
	}
}, function(a, b) {
	function c(a) {
		if ("string" != typeof a) throw "参数错误";
		var b = -1,
			c = a.length,
			d = 0,
			e = 0,
			f = function() {
				return a.charAt(b)
			},
			g = function() {
				return e++, b++, k() && (e = 0, d++), a.charAt(b)
			},
			h = function(c) {
				return e--, b--, c && a.charAt(b)
			},
			i = function(d) {
				"number" != typeof d && (d = 0);
				var e = b + d;
				return 0 > e && (e = 0), e >= c && (e = c), a.charAt(e)
			},
			j = function() {
				return b >= c
			},
			k = function() {
				var a = f();
				return 10 === a.charCodeAt(0) ? !0 : 13 === a.charCodeAt(0) ? !0 : 13 === a.charCodeAt(0) && 10 === i(1).charCodeAt(0)
			},
			l = function() {
				return 9 === f().charCodeAt(0)
			},
			m = function() {
				return 32 === f().charCodeAt(0)
			},
			n = function() {
				return 12288 === f().charCodeAt(0)
			},
			o = function() {
				return 39 === f().charCodeAt(0)
			},
			p = function() {
				return 34 === f().charCodeAt(0)
			},
			q = function() {
				return !(m() || l() || k())
			},
			r = function() {
				return d + 1
			},
			s = function() {
				return e + 1
			};
		return {
			nextChar: g,
			prevChar: h,
			offsetChar: i,
			isNewLine: k,
			isTabChar: l,
			isSpaceChar: m,
			isWordChar: q,
			isFullWidthSace: n,
			isSingleQuotes: o,
			isDoubleQuotes: p,
			isInputEnd: j,
			getLineNumber: r,
			getCharNumber: s
		}
	}
	a.exports = c
}, function(a, b, c) {
	function d(a) {
		i = g.DataState;
		for (var b = []; j(a, b););
		return b
	}
	var e = c(3),
		f = e.HTML_TOKEN_ENUM,
		g = e.TOKEN_STATE_ENUM,
		h = e.TAG_STATE,
		i = g.DataState,
		j = function(a, b) {
			for (var c, d = "", e = 0, j = 0, k = "", l = "", m = {
				name: "",
				pid: "",
				sid: ""
			}; !a.isInputEnd();) {
				var n = a.nextChar();
				switch (i) {
				case g.DataState:
					if ("<" === n) {
						var o = a.offsetChar(1);
						if (!a.isWordChar(o)) {
							d += n;
							continue
						}
						return i = g.TagOpenState, "" !== d && b.push({
							token: f.Character,
							value: d,
							cchar: a.getCharNumber() - 1,
							cline: a.getLineNumber()
						}), !0
					}
					d += n;
					break;
				case g.TagOpenState:
					if (a.isWordChar()) if ("!" === n) {
						k = "";
						for (var p = 0; 7 > p; ++p) k += a.nextChar();
						if ("doctype" === k.toLowerCase()) i = g.DOCTYPEState;
						else {
							for (var p = 0; 7 > p; ++p) a.prevChar();
							"-" === a.offsetChar(1) && "-" === a.offsetChar(2) ? i = g.CommentStartState : (i = g.TagNameState, a.prevChar())
						}
					} else i = g.TagNameState, a.prevChar();
					break;
				case g.TagNameState:
					if (a.isSpaceChar() || a.isTabChar() || a.isNewLine()) return i = g.BeforeAttributeNameState, b.push({
						token: f.StartTag,
						value: d.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber(),
						attributes: []
					}), !0;
					if (">" === n) return b.push({
						token: f.StartTag,
						value: d.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber(),
						attributes: []
					}), c = b[b.length - 1], i = c.value in h ? h[c.value] : g.DataState, !0;
					"/" === n ? i = g.EndTagOpenState : d += n;
					break;
				case g.BeforeAttributeNameState:
					if (">" === n) return c = b[b.length - 1], i = c.value in h ? h[c.value] : g.DataState, !0;
					if (!a.isWordChar() || "/" == n) continue;
					d += n, i = g.AttributeNameState;
					break;
				case g.AttributeNameState:
					if ("=" === n || a.isSpaceChar() || a.isTabChar() || a.isNewLine()) i = g.BeforeAttributeValueState, e = b.length - 1, b[e].attributes.push({
						name: d.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber(),
						value: ""
					}), d = "";
					else {
						if (">" === n) return i = g.DataState, e = b.length - 1, b[e].attributes.push({
							name: d.toLowerCase(),
							cchar: a.getCharNumber() - 1,
							cline: a.getLineNumber(),
							value: ""
						}), !0;
						d += n
					}
					break;
				case g.BeforeAttributeValueState:
					oc = a.offsetChar(-1), "=" == oc ? a.isSingleQuotes() ? i = g.AttributeValueSingleQuotedState : a.isDoubleQuotes() ? i = g.AttributeValueDoubleQuotedState : (i = g.AttributeValueUnquotedState, a.prevChar()) : "=" === n ? i = g.BeforeAttributeValueState : ">" === n ? (c = b[b.length - 1], i = c.value in h ? h[c.value] : g.DataState) : a.isWordChar() && (a.prevChar(), i = g.AttributeNameState);
					break;
				case g.AttributeValueUnquotedState:
					a.isWordChar() && ">" != n ? d += n : (d.length > 0 && (a.isSpaceChar() || a.isTabChar()) || a.isNewLine() || ">" == n) && (i = g.AfterAttributeValueQuotedState, e = b.length - 1, j = b[e].attributes.length - 1, b[e].attributes[j].quotes = "", b[e].attributes[j].value = d, b[e].attributes[j].cchar = a.getCharNumber() - 1, b[e].attributes[j].cline = a.getLineNumber(), d = "", a.prevChar());
					break;
				case g.AttributeValueDoubleQuotedState:
					a.isDoubleQuotes() ? (i = g.AfterAttributeValueQuotedState, e = b.length - 1, j = b[e].attributes.length - 1, b[e].attributes[j].quotes = '"', b[e].attributes[j].value = d, b[e].attributes[j].cchar = a.getCharNumber() - 1, b[e].attributes[j].cline = a.getLineNumber(), d = "") : d += n;
					break;
				case g.AttributeValueSingleQuotedState:
					a.isSingleQuotes() ? (i = g.AfterAttributeValueQuotedState, e = b.length - 1, j = b[e].attributes.length - 1, b[e].attributes[j].quotes = "'", b[e].attributes[j].value = d, b[e].attributes[j].cchar = a.getCharNumber() - 1, b[e].attributes[j].cline = a.getLineNumber(), d = "") : d += n;
					break;
				case g.AfterAttributeValueQuotedState:
					if (">" === n) return c = b[b.length - 1], i = c.value in h ? h[c.value] : g.DataState, !0;
					i = g.BeforeAttributeNameState;
					break;
				case g.EndTagOpenState:
					if (">" === n) return i = g.DataState, b.push({
						token: f.EndTag,
						value: d.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber()
					}), !0;
					d += n;
					break;
				case g.RCDATAState:
					"<" === n ? (k += n, i = g.RCDATALessThanSignState) : d += n;
					break;
				case g.RCDATALessThanSignState:
					"/" === n ? (k += n, i = g.RCDATAEndTagOpenState) : (i = g.RCDATAState, d += "<" + n, k = "");
					break;
				case g.RCDATAEndTagOpenState:
					k += n, l += n, a.isWordChar() && ">" !== a.offsetChar(1) || (i = g.RCDATAEndTagNameState);
					break;
				case g.RCDATAEndTagNameState:
					if (c = b[b.length - 1], c.value === l) return "" != d && b.push({
						token: f.Character,
						value: d,
						needEscape: !0,
						cchar: a.getCharNumber() - l.length - 3,
						cline: a.getLineNumber()
					}), b.push({
						token: f.EndTag,
						value: l.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber()
					}), i = g.DataState, !0;
					k += n, d += k, k = "", l = "", i = g.RCDATAState;
					break;
				case g.RAWTEXTState:
					"<" === n ? (k += n, i = g.RAWTEXTLessThanSignState) : d += n;
					break;
				case g.RAWTEXTLessThanSignState:
					"/" === n ? (k += n, i = g.RAWTEXTEndTagOpenState) : (i = g.RAWTEXTState, d += "<" + n, k = "");
					break;
				case g.RAWTEXTEndTagOpenState:
					k += n, l += n, a.isWordChar() && ">" !== a.offsetChar(1) || (i = g.RAWTEXTEndTagNameState);
					break;
				case g.RAWTEXTEndTagNameState:
					if (c = b[b.length - 1], c.value === l) return "" != d && b.push({
						token: f.Character,
						value: d,
						needEscape: !1,
						cchar: a.getCharNumber() - l.length - 3,
						cline: a.getLineNumber()
					}), b.push({
						token: f.EndTag,
						value: l.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber()
					}), i = g.DataState, !0;
					k += n, d += k, k = "", l = "", i = g.RAWTEXTState;
					break;
				case g.ScriptDataState:
					"<" === n ? (k += n, i = g.ScriptDataLessThanSignState) : d += n;
					break;
				case g.ScriptDataLessThanSignState:
					"/" === n ? (k += n, i = g.ScriptDataEndTagOpenState) : (i = g.ScriptDataState, d += "<" + n, k = "");
					break;
				case g.ScriptDataEndTagOpenState:
					k += n, l += n, a.isWordChar() && ">" !== a.offsetChar(1) || (i = g.ScriptDataEndTagNameState);
					break;
				case g.ScriptDataEndTagNameState:
					if (c = b[b.length - 1], c.value === l) return "" != d && b.push({
						token: f.Character,
						value: d,
						needEscape: !1,
						cchar: a.getCharNumber() - l.length - 3,
						cline: a.getLineNumber()
					}), b.push({
						token: f.EndTag,
						value: l.toLowerCase(),
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber()
					}), i = g.DataState, !0;
					k += n, d += k, k = "", l = "", i = g.ScriptDataState;
					break;
				case g.CommentStartState:
					"-" === n && (i = g.CommentStartDashState);
					break;
				case g.CommentStartDashState:
					"-" === n && (i = g.CommentState);
					break;
				case g.CommentState:
					"-" === n && "-" == a.offsetChar(1) ? i = g.CommentEndDashState : d += n;
					break;
				case g.CommentEndDashState:
					"-" === n && ">" == a.offsetChar(1) && (i = g.CommentEndState);
					break;
				case g.CommentEndState:
					return i = g.DataState, b.push({
						token: f.Comment,
						value: d,
						cchar: a.getCharNumber() - d.length - 3,
						cline: a.getLineNumber()
					}), !0;
				case g.DOCTYPEState:
					if (!a.isWordChar()) {
						i = g.BeforeDOCTYPENameState;
						continue
					}
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
					i = g.BogusDOCTYPEState;
					break;
				case g.BeforeDOCTYPENameState:
					if (a.isSpaceChar()) continue;
					if (a.isWordChar()) {
						i = g.DOCTYPENameState, a.prevChar();
						continue
					}
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
					break;
				case g.DOCTYPENameState:
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
					if (a.isWordChar()) {
						m.name += n;
						continue
					}
					i = g.AfterDOCTYPENameState;
					break;
				case g.AfterDOCTYPENameState:
					if (!a.isWordChar()) continue;
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
					k = "", k += n;
					for (var p = 0; 5 > p; ++p) k += a.nextChar();
					if ("public" === k.toLowerCase()) {
						i = g.AfterDOCTYPEPublicKeywordState;
						continue
					}
					if ("system" === k.toLowerCase()) {
						i = g.AfterDOCTYPESystemKeywordState;
						continue
					}
					i = g.BogusDOCTYPEState;
					for (var p = 0; 5 > p; ++p) a.prevChar();
					break;
				case g.AfterDOCTYPEPublicKeywordState:
					if (!a.isWordChar()) {
						i = g.BeforeDOCTYPEPublicIdentifierState;
						continue
					}
					">" === n && (i = g.BogusDOCTYPEState);
					break;
				case g.BeforeDOCTYPEPublicIdentifierState:
					if (a.isSingleQuotes()) {
						i = g.DOCTYPEPublicIdentifierSingleQuotedState;
						continue
					}
					if (a.isDoubleQuotes()) {
						i = g.DOCTYPEPublicIdentifierDoubleQuotedState;
						continue
					}
					">" === n && (i = g.BogusDOCTYPEState);
					break;
				case g.DOCTYPEPublicIdentifierDoubleQuotedState:
					if (">" === n && (i = g.BogusDOCTYPEState), a.isDoubleQuotes()) {
						i = g.AfterDOCTYPEPublicIdentifierState;
						continue
					}
					a.isWordChar() && (m.pid += n);
					break;
				case g.DOCTYPEPublicIdentifierSingleQuotedState:
					if (">" === n && (i = g.BogusDOCTYPEState), a.isSingleQuotes()) {
						i = g.AfterDOCTYPEPublicIdentifierState;
						continue
					}
					a.isWordChar() && (m.pid += n);
					break;
				case g.AfterDOCTYPEPublicIdentifierState:
					if (!a.isWordChar()) {
						i = g.BetweenDOCTYPEPublicAndSystemIdentifiersState;
						continue
					}
					i = g.BogusDOCTYPEState;
					break;
				case g.BetweenDOCTYPEPublicAndSystemIdentifiersState:
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
					if (a.isSingleQuotes()) {
						i = g.DOCTYPESystemIdentifierSingleQuotedState;
						continue
					}
					if (a.isDoubleQuotes()) {
						i = g.DOCTYPESystemIdentifierDoubleQuotedState;
						continue
					}
					break;
				case g.AfterDOCTYPESystemKeywordState:
					if (!a.isWordChar()) {
						i = g.BeforeDOCTYPESystemKeywordState;
						continue
					}
					">" === n && (i = g.BogusDOCTYPEState);
					break;
				case g.BeforeDOCTYPESystemIdentifierState:
					if (a.isSingleQuotes()) {
						i = g.DOCTYPESystemIdentifierSingleQuotedState;
						continue
					}
					if (a.isDoubleQuotes()) {
						i = g.DOCTYPESystemIdentifierDoubleQuotedState;
						continue
					}
					i = g.BogusDOCTYPEState;
					break;
				case g.DOCTYPESystemIdentifierDoubleQuotedState:
					if (">" === n && (i = g.BogusDOCTYPEState), a.isDoubleQuotes()) {
						i = g.AfterDOCTYPESystemIdentifierState;
						continue
					}
					a.isWordChar() && (m.sid += n);
					break;
				case g.DOCTYPESystemIdentifierSingleQuotedState:
					if (">" === n && (i = g.BogusDOCTYPEState), a.isSingleQuotes()) {
						i = g.AfterDOCTYPESystemIdentifierState;
						continue
					}
					a.isWordChar() && (m.sid += n);
					break;
				case g.AfterDOCTYPESystemIdentifierState:
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
					i = g.BogusDOCTYPEState;
					break;
				case g.BogusDOCTYPEState:
					if (">" === n) {
						i = g.DataState, b.push({
							token: f.Doctype,
							name: m.name,
							pid: m.pid,
							sid: m.sid,
							cchar: a.getCharNumber(),
							cline: a.getLineNumber()
						});
						continue
					}
				}
			}
			return 0 == b.length && "" != d ? (b.push({
				token: f.Character,
				value: d,
				needEscape: !1,
				cchar: 1,
				cline: 1
			}), !1) : "" !== d ? (b.push({
				token: f.Character,
				value: d,
				cchar: a.getCharNumber() - 1,
				cline: a.getLineNumber()
			}), !1) : !1
		};
	a.exports = d
}, function(a, b, c) {
	function d(a) {
		if (!a) return !1;
		var b = "",
			c = a.length;
		if (0 == c) return "";
		for (var d = 0; c > d; ++d) {
			var e, j = a[d],
				k = j.token;
			switch (k) {
			case g.StartTag:
				b += "<" + j.value;
				for (var l = 0, m = j.attributes.length; m > l; ++l) {
					var n = j.attributes[l];
					n.value ? (e = n.quotes || '"', b += " " + n.name + "=" + e + n.value + e) : b += " " + n.name
				}
				b += h[j.value] ? " />" : ">";
				break;
			case g.EndTag:
				b += h[j.value] ? "<" + j.value + " />" : "</" + j.value + ">";
				break;
			case g.Comment:
				break;
			case g.Doctype:
				b += "<!DOCTYPE" + j.name, j.pid && "" != j.pid && (b += ' PUBLIC "' + j.pid + '"'), j.sid && "" != j.sid && (b += ' "' + j.sid + '"'), b += ">";
				break;
			case g.Character:
				b += j.needEscape ? f(j.value) : j.value
			}
		}
		return b
	}
	var e = c(3),
		f = c(8),
		g = e.HTML_TOKEN_ENUM,
		h = e.IGNORE_CLOSE_TAGS;
	a.exports = d
}]);
STK.register("lib.rteditor.plugins.baseStyles", function(a) {
	var b = {
		"*": "*"
	};
	return function(a, b) {
		function g() {
			f()
		}
		function f() {
			for (var a in e)(function(a) {
				d.add(a, "click", function(b) {
					!b || !b.el || b.el.parentNode._disabled || e[a](b)
				})
			})(a)
		}
		var c = {},
			d = b.dEvent,
			e = {
				bold: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "strong"
					})
				},
				italic: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "i"
					})
				},
				underline: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "u"
					})
				},
				strikethrough: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "del"
					})
				},
				blockquote: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "blockquote"
					})
				},
				insertorderedlist: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "ol"
					})
				},
				insertunorderedlist: function(b) {
					a.editor("fire", "editor.formatting.range", {
						type: "ul"
					})
				}
			};
		g();
		return c
	}
});
STK.register("lib.kit.extra.RGB2Hex", function(a) {
	return function(a) {
		if (/^#[0-9a-fA-F]{3,6}/.test(a)) return a;
		var b = a.match(/^rgb\s*\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*)\)/);
		if (!b || b.length < 4) return "#333";
		var c = [(b[1] >> 0).toString(16), (b[2] >> 0).toString(16), (b[3] >> 0).toString(16)];
		for (var d = 0; d < 3; ++d) c[d].length < 2 && (c[d] = "0" + c[d]);
		return "#" + c.join("")
	}
});
STK.register("lib.rteditor.plugins.fontcolor", function(a) {
	var b = '<div class="W_layer W_layer_pop"><div class="content" node-type="inner"><div class="layer_longwb_color"><h2 action-type="color" unselectable="on" color="#333333"><span><i style="background:#333333;"></i></span>去除颜色</h2><div node-type="allcolor"><h3>标准色</h3><ul class="clearfix"><li><a href="javascript:;" action-type="color" unselectable="on" color="#717071" ><i style="background:#717071;"></i></a></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#c9c9c9" ><i style="background:#c9c9c9;"></i></a></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#ff8a78" ><i style="background:#ff8a78;"></i></a></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#fec467" ><i style="background:#fec467;"></i></a></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#7cd7a3" ><i style="background:#7cd7a3;"></i></a></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#5bc9ea" ><i style="background:#5bc9ea;"></i></a></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#c893eb" ><i style="background:#c893eb;"></i></a></li></ul><h3>主题颜色</h3><ul class="clearfix" style="height:auto;"><li><a href="javascript:;" action-type="color" unselectable="on" color="#333333"><i style="background:#333333;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#717071" class="f"><i style="background:#717071;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#b5b5b5"><i style="background:#b5b5b5;"></i></a></span></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#808080"><i style="background:#808080;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#c9c9c9" class="f"><i style="background:#c9c9c9;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#e3e3e3"><i style="background:#e3e3e3;"></i></a></span></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#d24a35"><i style="background:#d24a35;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#ff8a78" class="f"><i style="background:#ff8a78;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#ffc3b9"><i style="background:#ffc3b9;"></i></a></span></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#d49225"><i style="background:#d49225;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#fec467" class="f"><i style="background:#fec467;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#fee0b1"><i style="background:#fee0b1;"></i></a></span></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#42ac6f"><i style="background:#42ac6f;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#7cd7a3" class="f"><i style="background:#7cd7a3;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#bbeacf"><i style="background:#bbeacf;"></i></a></span></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#1f9dc4"><i style="background:#1f9dc4;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#5bc9ea" class="f"><i style="background:#5bc9ea;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#aae3f4"><i style="background:#aae3f4;"></i></a></span></li><li><a href="javascript:;" action-type="color" unselectable="on" color="#9053b9"><i style="background:#9053b9;"></i></a><span><a href="javascript:;" action-type="color" unselectable="on" color="#c893eb" class="f"><i style="background:#c893eb;"></i></a><a href="javascript:;" action-type="color" unselectable="on" color="#e2c7f4"><i style="background:#e2c7f4;"></i></a></span></li></ul></div></div> </div></div>',
		c = a.lib.kit.extra.RGB2Hex;
	return function(d, e) {
		function r() {
			l();
			q()
		}
		function q() {
			e.dEvent.add("showfontcolor", "click", m);
			e.dEvent.add("applyfontcolor", "click", o);
			i.add("color", "click", n);
			k = a.sizzle("[action-type=applyfontcolor]", e.menu)[0].children[0]
		}
		function p() {
			g.hide()
		}
		function o(b) {
			if (!(!b || !b.el || b.el.parentNode._disabled)) {
				p();
				var e = a.core.dom.getStyle(k, "borderBottomColor");
				e = c(e);
				d.editor("fire", "editor.formatting.range", {
					type: "color",
					props: {
						color: e
					}
				})
			}
		}
		function n(b) {
			p();
			var c = b.el.getAttribute("color");
			if ( !! /#[a-fA-F0-9]{3,6}/.test(c)) {
				a.core.dom.setStyle(k, "borderBottomColor", c);
				d.editor("fire", "editor.formatting.range", {
					type: "color",
					props: {
						color: c
					}
				})
			}
		}
		function m(b) {
			if (!(!b || !b.el || b.el.parentNode._disabled)) {
				a.addClassName(b.el.parentNode, "more_opt");
				var c = {
					font: "*"
				};
				g.show().beside(k).on("hide", function() {
					a.removeClassName(b.el.parentNode, "more_opt")
				})
			}
		}
		function l() {
			g = a.ui.mlayer(b, {
				clickBlankToHide: !0,
				showWithAni: "fadeInDown:fast",
				hideWithAni: "fadeOutUp:fast",
				showWithSetWidth: !1
			});
			h = g.getBox();
			i = a.delegatedEvent(h)
		}
		var f = {},
			g, h, i, j = d.opts.container,
			k;
		r();
		f.destroy = function() {
			e.dEvent.remove("showfontcolor", "click", m);
			e.dEvent.remove("applyfontcolor", "click", o);
			i.remove("color", "click", n)
		};
		return f
	}
});
STK.register("lib.rteditor.plugins.fontsize", function(a) {
	var b = '<div  class="layer_menu_list"><ul node-type="inner" style="height: auto; margin: 0;"><li style="font-size:26px;"><a action-type="selectfontsize" unselectable="on" href="javascript:;">大标题</a></li><li style="font-size:22px;"><a action-type="selectfontsize" unselectable="on" href="javascript:;">小标题</a></li><li style="font-size:16px;"><a action-type="selectfontsize" unselectable="on" href="javascript:;">正文</a></li></ul></div>',
		c = a.sizzle("[node-type=toolbar] ul ul li");
	return function(c, d) {
		function p() {
			k();
			o()
		}
		function o() {
			d.dEvent.add("fontsize", "click", l);
			h.add("selectfontsize", "click", m)
		}
		function n() {
			f.hide()
		}
		function m(a) {
			if (!(!a || !a.el || a.el.parentNode._disabled)) {
				i.children[0].innerHTML = a.el.innerHTML;
				var b = a.el.innerHTML;
				if (!b) return;
				var d = j[b];
				c.editor("fire", "editor.formatting.range", {
					type: d
				});
				n()
			}
		}
		function l(b) {
			!b || !b.el || b.el.parentNode._disabled || f.show().beside(b.el, {
				pos: "bottom-left"
			}).on("hide", function() {
				a.removeClassName(b.el.parentNode, "more_opt")
			})
		}
		function k() {
			f = a.ui.mlayer(b, {
				clickBlankToHide: !0,
				showWithAni: "fadeInDown:fast",
				hideWithAni: "fadeOutUp:fast",
				showWithSetWidth: !1
			});
			g = f.getBox();
			h = a.delegatedEvent(g);
			i = a.sizzle('[action-type="fontsize"]')[0]
		}
		var e = {},
			f, g, h, i, j = {
				"大标题": "h1",
				"小标题": "h2",
				"正文": "p"
			};
		p();
		e.destroy = function() {
			d.dEvent.remove("fontsize", "click", l);
			h.remove("selectfontsize", "click", m)
		};
		return e
	}
});
STK.register("lib.rteditor.plugins.line", function(a) {
	return function(a, b) {
		function f() {
			e()
		}
		function e() {
			b.dEvent.add("line", "click", d)
		}
		function d(b) {
			!b || !b.el || b.el.parentNode._disabled || a.editor("core.insertHTML", "<p>​</p><hr><p>​</p>")
		}
		var c = {};
		f();
		c.destroy = function() {
			b.dEvent.remove("line", "click", d)
		};
		return c
	}
});
STK.register("lib.kit.extra.language", function(a) {
	window.$LANG || (window.$LANG = {});
	return function(b) {
		var c = [].splice.call(arguments, 1, arguments.length),
			d = [b, $LANG].concat(c),
			e = a.core.util.language.apply(this, d);
		return e
	}
});
STK.register("lib.kit.extra.shine", function(a) {
	var b = function(a) {
			return a.slice(0, a.length - 1).concat(a.concat([]).reverse())
		};
	return function(c, d) {
		var e = a.parseParam({
			start: "#fff",
			color: "#fbb",
			times: 2,
			step: 5,
			length: 4
		}, d),
			f = e.start.split(""),
			g = e.color.split(""),
			h = [];
		for (var i = 0; i < e.step; i += 1) {
			var j = f[0];
			for (var k = 1; k < e.length; k += 1) {
				var l = parseInt(f[k], 16),
					m = parseInt(g[k], 16);
				j += Math.floor(parseInt(l + (m - l) * i / e.step, 10)).toString(16)
			}
			h.push(j)
		}
		for (var i = 0; i < e.times; i += 1) h = b(h);
		var n = !1,
			o = a.timer.add(function() {
				if (!h.length) a.timer.remove(o);
				else {
					if (n) {
						n = !1;
						return
					}
					n = !0;
					c.style.backgroundColor = h.pop()
				}
			})
	}
});
STK.register("lib.rteditor.helpers.inputText", function(a) {
	var b = a.lib.kit.extra.language,
		c = {
			8: "BackSpace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift_L",
			17: "Control_L",
			18: "Alt_L",
			19: "Pause",
			20: "Caps_Lock",
			27: "Escape",
			32: "Space",
			33: "Prior",
			34: "Next",
			35: "End",
			36: "Home",
			37: "Left",
			38: "Up",
			39: "Right",
			40: "Down",
			41: "Select",
			42: "Print",
			43: "Execute",
			45: "Insert",
			46: "Delete",
			47: "Help",
			65: "a",
			66: "b",
			67: "c",
			68: "d",
			69: "e",
			70: "f",
			71: "g",
			72: "h",
			73: "i",
			74: "j",
			75: "k",
			76: "l",
			77: "m",
			78: "n",
			79: "o",
			80: "p",
			81: "q",
			82: "r",
			83: "s",
			84: "t",
			85: "u",
			86: "v",
			87: "w",
			88: "x",
			89: "y",
			90: "z"
		};
	return function(b, d) {
		function l() {
			a.trim(b.value) == "" && e.setValue(j());
			f.blurClass && a.addClassName(b, f.blurClass);
			f.focusClass && a.removeClassName(b, f.focusClass)
		}
		function k() {
			var b = e.getValue(),
				c = a.core.str.bLength(b) / 2;
			if (c > f.maxLength) {
				e.setValue(a.core.str.leftB(b, f.maxLength * 2));
				g = setTimeout(k, i);
				a.custEvent.fire(e, "fill", b)
			} else {
				if (h != b) {
					h = b;
					a.custEvent.fire(e, "change", b)
				}
				g = setTimeout(k, i)
			}
		}
		function j() {
			return f.placeholder
		}
		if ( !! a.isNode(b)) {
			if (b.tagName != "INPUT" && b.tagName != "TEXTAREA") return;
			if (b.tagName === "INPUT" && b.type != "text") return;
			var e = {},
				f, g, h = "",
				i = 200,
				m = function() {
					f = a.parseParam({
						maxLength: 200,
						placeholder: "",
						disabledClass: "",
						hoverClass: "",
						focusClass: "",
						blurClass: "S_txt2",
						disabled: !1
					}, d)
				},
				n = {
					focus: function(c) {
						if (!f.disabled) {
							e.getValue() == "" && e.setValue("");
							f.focusClass && a.addClassName(b, f.focusClass);
							f.blurClass && a.removeClassName(b, f.blurClass);
							b.focus();
							a.custEvent.fire(e, "focus");
							setTimeout(k, i)
						}
					},
					blur: function(c) {
						f.disabled || setTimeout(function() {
							b.blur();
							a.custEvent.fire(e, "blur");
							var c = a.trim(e.getValue());
							if (c == "") {
								e.setValue(j());
								f.focusClass && a.removeClassName(b, f.focusClass);
								f.blurClass && a.addClassName(b, f.blurClass);
								clearTimeout(g)
							}
						}, 200)
					},
					hover: function(c) {
						f.disabled || a.addClassName(b, f.hoverClass)
					},
					out: function(c) {
						f.disabled || a.removeClassName(b, f.hoverClass)
					},
					keyDown: function(b) {
						if (!f.disabled) {
							var d = {
								keyCode: b.keyCode
							};
							c[b.keyCode] && (d[c[b.keyCode]] = !0);
							a.custEvent.fire(e, "keydown", d)
						}
					}
				},
				o = function() {
					a.core.evt.addEvent(b, "focus", n.focus);
					a.core.evt.addEvent(b, "blur", n.blur);
					a.core.evt.addEvent(b, "keydown", n.keyDown);
					if (f.hoverClass) {
						a.core.evt.addEvent(b, "mouseover", n.hover);
						a.core.evt.addEvent(b, "mouseout", n.out)
					}
				},
				p = function() {
					a.custEvent.define(e, "change");
					a.custEvent.define(e, "focus");
					a.custEvent.define(e, "blur");
					a.custEvent.define(e, "keydown");
					a.custEvent.define(e, "fill")
				},
				q = function() {
					a.core.evt.removeEvent(b, "focus", n.focus);
					a.core.evt.removeEvent(b, "blur", n.blur);
					a.core.evt.removeEvent(b, "keydown", n.keyDown);
					if (f.hoverClass) {
						a.core.evt.removeEvent(b, "mouseover", n.hover);
						a.core.evt.removeEvent(b, "mouseout", n.out)
					}
				},
				r = function() {
					q()
				},
				s = function() {
					m();
					o();
					t();
					p();
					l()
				},
				t = function() {
					e.destroy = r;
					e.node = b;
					e.focus = function() {
						f.disabled || b.focus()
					};
					e.blur = function() {
						f.disabled || n.blur()
					};
					e.select = function() {
						f.disabled || b.select()
					};
					e.setDisabled = function() {
						f.focusClass && a.removeClassName(b, f.focusClass);
						f.disabledClass && a.addClassName(b, f.disabledClass);
						b.disabled = f.disabled = !0
					};
					e.setEnabled = function() {
						f.disabledClass && a.removeClassName(b, f.disabledClass);
						b.disabled = f.disabled = !1
					};
					e.getDisabled = function() {
						return f.disabled
					};
					e.getValue = function() {
						return b.value === f.placeholder ? "" : b.value
					};
					e.setValue = function(a) {
						b.value = a
					};
					e.flash = function() {
						f.disabled || a.lib.kit.extra.shine(b)
					};
					e.setMaxLength = function(a) {
						if ( !! a) {
							a = parseFloat(a);
							if (isNaN(a) || a <= 0) return;
							f.maxLength = a
						}
					};
					e.getMaxLength = function(a) {
						return f.maxLength
					};
					f.disabled ? e.setDisabled() : e.setEnabled()
				};
			s();
			return e
		}
	}
});
STK.register("lib.rteditor.plugins.linkDialog", function(a) {
	var b = a.ui.dialog,
		c = a.lib.rteditor.helpers.inputText,
		d = '\t\t<div class="layer_addlink">\t\t\t<dl class="f_normal clearfix">\t\t\t<dt class="f_tit">链接地址:<span class="S_txt2" style="font-size: 12px"></span></dt>\t\t\t<dd class="f_con"> \t\t\t<div class="input_outer W_input_focus"><input type="text" class="W_input"></div>\t\t\t</dd>\t\t\t</dl>\t\t\t<dl class="f_normal clearfix">\t\t\t<dt class="f_tit">文字描述:</dt>\t\t\t<dd class="f_con"> \t\t\t<div class="input_outer W_input_focus"><input type="text" class="W_input"></div>\t\t\t</dd>\t\t\t</dl>\t\t</div>\t\t<div class="W_layer_btn S_bg1">\t\t\t<a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok" action-type="ok"><span>确定</span></a>\t\t\t<a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel" action-type="cancel"><span>取消</span></a>\t\t</div>',
		e = "W_btn_a_disable",
		f = /^http[s]?\:\/\//i,
		g = /^http[s]?:\/\/[0-9a-zA-Z_!~*'().;?:@&= $,%#-.]+?\..+\w$/i;
	return function(e) {
		function s() {
			a.core.evt.removeEvent(j.ok, "click", m.ok);
			a.core.evt.removeEvent(j.cancel, "click", m.cancel);
			h.off("hide", s);
			k.destroy();
			l.destroy()
		}
		function r() {
			p();
			n();
			o();
			q()
		}
		function q() {
			h.show()
		}
		function p() {
			h = b();
			h.setTitle("请输入超链接");
			h.setContent(d);
			i = h.getBox();
			var e = a.sizzle("input", i);
			k = c(e[0], {
				placeholder: "http://",
				maxLength: 3e3
			});
			l = c(e[1], {
				placeholder: "文字描述",
				maxLength: 300
			});
			h.show()
		}
		function o() {
			a.core.evt.addEvent(j.ok, "click", m.ok);
			a.core.evt.addEvent(j.cancel, "click", m.cancel);
			h.on("hide", s)
		}
		function n() {
			j.ok = a.sizzle("[node-type=ok]", i)[0];
			j.cancel = a.sizzle("[node-type=cancel]", i)[0];
			j.linkTxt = a.sizzle("dt > span", i)[0]
		}
		var h, i, j = {},
			k, l, m = {
				close: function() {
					h.destroy();
					s()
				},
				ok: function() {
					var b = a.trim(k.getValue());
					f.test(b) || (b = "http://" + b);
					if (!g.test(b)) {
						j.linkTxt.innerHTML = "链接地址格式输入有误";
						k.flash()
					} else {
						var c = {
							url: a.encodeHTML(b),
							txt: a.encodeHTML(l.getValue())
						};
						c.txt = c.txt || c.url;
						h.hide();
						e && e(c)
					}
				},
				cancel: function() {
					h.hide()
				}
			};
		r()
	}
});
STK.register("lib.rteditor.plugins.link", function(a) {
	var b = a.lib.rteditor.plugins.linkDialog;
	return function(a, c) {
		function g() {
			f()
		}
		function f() {
			c.dEvent.add("link", "click", e)
		}
		function e(c) {
			!c || !c.el || c.el.parentNode._disabled || b(function(b) {
				var c = '<a href="' + b.url + '" target="_blank" >' + b.txt + "</a>";
				a.editor("core.insertHTML", c)
			})
		}
		var d = {};
		g();
		d.destroy = function() {
			c.dEvent.remove("link", "click", e)
		};
		return d
	}
});
STK.register("lib.kit.dom.parentElementBy", function(a) {
	return function(a, b, c) {
		if (!a || !b) throw new Error("传入的参数为空");
		var d = 0,
			e;
		a = a.parentNode;
		while (a && a.parentNode) {
			d++;
			e = c(a);
			if (e === !1) return !1;
			if (e === !0) return a;
			if (e === b) return null;
			a = a.parentNode;
			if (d > 3e4) return !1
		}
		return null
	}
});
STK.register("lib.kit.extra.upload", function(a) {
	function i(b, c, g, h) {
		var i = a.C("form");
		i.method = "post";
		i.setAttribute("enctype", "multipart/form-data");
		i.style.cssText = "position: fixed;left:0;top:0;width:1px;height:1px;overflow:hidden;visibility:hidden;";
		a.insertBefore(i, document.body.firstChild);
		i.appendChild(b);
		var j = "fid" + (new Date).getTime(),
			k = e;
		k += a.jsonToQuery(d(c));
		$.ajaxFileUpload
		(
			{
				url: e, //用于文件上传的服务器端请求地址
				secureuri: false, //是否需要安全协议，一般设置为false
				fileElementId: 'upload_pic', //文件上传域的ID
				dataType: 'json', //返回值类型 一般设置为json
				success: function (data, status)  //服务器成功响应处理函数
				{
					$('input[name='+upload_pic+']').remove();
					$('#editor ').append('<figure class="card-img" onselectstart="return false;" contenteditable="false"><img src="'+data.upload_pic.name+'"></figure>');
				},
				error: function (data, status, e)//服务器响应失败处理函数
				{
					alert(e);
				}
			}
		)
		// $.post(e,{},function(ajax_result){$('#editor ').append('<figure class="card-img" onselectstart="return false;" contenteditable="false"><img src="'+ajax_result+'"></figure>')});
		return;
		var l = a.lib.kit.io.ijax({
			url: k,
			varkey: "callback",
			abaurl: f,
			abakey: "cb",
			timeout: 3e5,
			onComplete: function(b) {
				if (!b || b.ret < 0) switch (Math.abs(b.ret)) {
				case 1:
					b.message = "#L{没有登录}";
					break;
				case 4:
				case 9:
					b.message = "#L{请上传5M以内的JPG、GIF、PNG图片。}";
					break;
				default:
					b.message = "#L{上传图片超时}"
				}
				h(b, j);
				a.removeNode(i)
			},
			onFail: function() {
				h({
					message: "#L{上传图片超时}"
				}, j);
				a.removeNode(i)
			}
		});
		g && g(j);
		l.request(i)
	}
	function h(b, c, g, h) {
		var i = a.C("form");
		i.method = "post";
		i.setAttribute("enctype", "application/x-www-form-urlencoded");
		i.innerHTML = '<input name="b64_data" type="hidden" value="' + b + '">';
		i.style.cssText = "position: fixed;left:0;top:0;width:1px;height:1px;overflow:hidden;visibility:hidden;";
		a.insertBefore(i, document.body.firstChild);
		var j = e + "data=base64&";
		j += a.jsonToQuery(d(c));
		var k = a.lib.kit.io.ijax({
			url: j,
			varkey: "callback",
			abaurl: f,
			abakey: "cb",
			timeout: 3e5,
			onComplete: function(b) {
				if (!b || b.ret < 0) switch (Math.abs(b.ret)) {
				case 1:
					b.message = "#L{没有登录}";
					break;
				case 4:
				case 9:
					b.message = "#L{请上传5M以内的JPG、GIF、PNG图片。}";
					break;
				default:
					b.message = "#L{上传图片超时}"
				}
				g(b, h);
				a.removeNode(i)
			},
			onFail: function() {
				g({
					message: "#L{上传图片超时}"
				}, h);
				a.removeNode(i)
			}
		});
		k.request(i)
	}
	function g(b, c, d, e) {
		var f = b.files;
		if (f.length == 1) i(b, c, d, e);
		else {
			a.removeNode(b);
			for (var g = 0, j; j = f[g]; g++) {
				var k = new FileReader,
					l = "fid" + (new Date).getTime();
				k.onload = function(a) {
					return function() {
						var b = this.result.split(",")[1];
						h(b, c, e, a)
					}
				}(l);
				k.readAsDataURL(j);
				d && d(l)
			}
		}
	}
	function d(b) {
		var c = {
			url: 0,
			markpos: 1,
			logo: "",
			nick: 0
		};
		if (!b) return c;
		var d = $CONFIG.watermark;
		if (!d || typeof d != "object") return c;
		var e = a.parseParam(c, d);
		return e
	}
	function c() {
		return window.File && window.FileList && window.FileReader && window.Blob ? !0 : !1
	}
	var b = {},
		e = "http://test/editor/files/upload.php",
		f = "http://weibo.com/ttarticle/p/spublishupload";
	b.uploadMultifile = g;
	b.uploadBase64 = h;
	b.uploadSinglefile = i;
	b.init = function(b, d, e, f) {
		b.onchange = function() {
			if (b.value !== "") {
				var h = b.cloneNode(!0);
				a.insertBefore(h, this);
				h.onchange = this.onchange;
				c() ? g(this, d, e, f) : i(this, d, e, f)
			}
		}
	};
	return b
});
STK.register("lib.kit.extra.crc32", function(a) {
	return function(a, b) {
		function c(a) {
			a = a.replace(/\r\n/g, "\n");
			var b = "";
			for (var c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				if (d < 128) b += String.fromCharCode(d);
				else if (d > 127 && d < 2048) {
					b += String.fromCharCode(d >> 6 | 192);
					b += String.fromCharCode(d & 63 | 128)
				} else {
					b += String.fromCharCode(d >> 12 | 224);
					b += String.fromCharCode(d >> 6 & 63 | 128);
					b += String.fromCharCode(d & 63 | 128)
				}
			}
			return b
		}
		a = c(a);
		var d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D",
			b;
		typeof b == "undefined" && (b = 0);
		var e = 0,
			f = 0;
		b = b ^ -1;
		for (var g = 0, h = a.length; g < h; g++) {
			f = (b ^ a.charCodeAt(g)) & 255;
			e = "0x" + d.substr(f * 9, 8);
			b = b >>> 8 ^ e
		}
		var i = b ^ -1;
		i < 0 && (i = 4294967296 + i);
		return i
	}
});
STK.register("lib.kit.extra.imageURL", function(a) {
	return function(b, c) {
		function f(a) {
			a = (a + "").replace(/[^a-f0-9]/gi, "");
			return parseInt(a, 16)
		}
		var d = {
			size: "small"
		};
		if (typeof b == "string") {
			d = a.core.obj.parseParam(d, c);
			var e = d.size,
				g = {
					ss: {
						middle: "&690",
						bmiddle: "&690",
						small: "&690",
						thumbnail: "&690",
						square: "&690",
						orignal: "&690",
						thumb180: "&690",
						mw1024: "&690"
					},
					ww: {
						middle: "bmiddle",
						large: "large",
						bmiddle: "bmiddle",
						small: "small",
						thumbnail: "thumbnail",
						square: "square",
						orignal: "large",
						thumb180: "thumb180",
						mw690: "mw690",
						mw1024: "mw1024"
					}
				},
				h = b.charAt(9) == "w",
				i = b.charAt(21) == "g" ? ".gif" : ".jpg",
				j = h ? a.lib.kit.extra.crc32(b) % 4 + 1 : f(b.substr(19, 2)) % 16 + 1,
				k = "http://" + (h ? "ww" : "ss") + j + ".sinaimg.cn/" + (h ? g.ww[e] : e) + "/" + b + (h ? i : "") + (h ? "" : g.ss[e]);
			return k
		}
	}
});
STK.register("lib.rteditor.plugins.imgAltDialog", function(a) {
	var b = a.ui.dialog,
		c = a.lib.rteditor.helpers.inputText,
		d = '   <div class="layer_addlink">     <dl class="f_normal clearfix">     <dd class="f_con">       <div class="input_outer W_input_focus"><textarea class="W_input" style="height: 50px;"></textarea></div>     </dd>   </div>   <div class="W_layer_btn S_bg1">     <a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok" action-type="ok"><span>确定</span></a>     <a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel" action-type="cancel"><span>取消</span></a>   </div>',
		e = "W_btn_a_disable";
	return function(e, f) {
		function q() {
			a.core.evt.removeEvent(i.ok, "click", k.ok);
			a.core.evt.removeEvent(i.cancel, "click", k.cancel);
			g.off("hide", q);
			j.destroy()
		}
		function p() {
			n();
			l();
			m();
			o()
		}
		function o() {
			g.show()
		}
		function n() {
			g = b();
			g.setTitle("请填写图片说明");
			g.setContent(d);
			h = g.getBox();
			var f = a.sizzle("textarea", h);
			j = c(f[0], {
				placeholder: "图片文字描述",
				maxLength: 40
			});
			e && j.setValue(e);
			g.show();
			try {
				setTimeout(j.focus, 100)
			} catch (i) {}
		}
		function m() {
			a.core.evt.addEvent(i.ok, "click", k.ok);
			a.core.evt.addEvent(i.cancel, "click", k.cancel);
			g.on("hide", q)
		}
		function l() {
			i.ok = a.sizzle("[node-type=ok]", h)[0];
			i.cancel = a.sizzle("[node-type=cancel]", h)[0]
		}
		var g, h, i = {},
			j;
		e = e || "";
		var k = {
			close: function() {
				g.destroy();
				q()
			},
			ok: function() {
				var b = a.trim(j.getValue());
				g.hide();
				f && f(b)
			},
			cancel: function() {
				g.hide()
			}
		};
		p()
	}
});
STK.register("lib.rteditor.plugins.image", function(a) {
	var b = a.lib.kit.extra.language,
		c = a.lib.rteditor.plugins.imgAltDialog,
		d = a.ui.confirm;
	return function(e, f) {
		function u() {
			m();
			t()
		}
		function t() {
			h.type = "file";
			h.name = "upload_pic";
			h.id="upload_pic";
			h.multiple = !0;
			h.accept = "image/*";
			j.appendChild(h);
			a.lib.kit.extra.upload.init(h, !0, r, s)
		}
		function s(c, d) {
			var f = document.getElementById(d);
			if (c.message) {
				i(b(c.message), {
					icon: "warnB"
				}).ok(b("#L{我知道了}"));
				f && f.parentNode.removeChild(f)
			} else {
				var g = a.lib.kit.extra.imageURL(c.pid, {
					size: "large"
				}),
					h = new Image;
				h.src = g;
				f && f.parentNode && a.replaceNode(h, f);
				var j = h.previousSibling,
					k = h.nextSibling;
				j ? (j.tagName == "FIGURE" && j.getAttribute("class") == "card-img" || j.tagName == "IFRAME" && j.getAttribute("card-box-loading") == "card-box-loading") && a.insertHTML(h, "<p><br></p>", "BeforeBegin") : a.insertHTML(h, "<p><br></p>", "BeforeBegin");
				k ? (k && k.tagName == "FIGURE" && k.getAttribute("class") == "card-img" || k.tagName == "IFRAME" && k.getAttribute("card-box-loading") == "card-box-loading") && a.insertHTML(h, "<p><br></p>", "AfterEnd") : a.insertHTML(h, "<p><br></p>", "AfterEnd");
				e.editor("fire", "editor.insertHTML");
				h.onerror = function() {
					i("图片加载失败", {
						icon: "errorB"
					}).ok(b("#L{我知道了}"))
				}
			}
		}
		function r(a) {
			e.editor("core.insertHTML", '<p id="' + a + '" img-box-loading="img-box-loading" style="text-align:center;" contenteditable="false"><i class="W_loading_big">​</i></p>​');
			return !0
		}
		function o(a, b) {
			d(["确定移除该图片吗？", "该图片将会从现有编辑的内容中移除"]).ok(function() {
				b(!0)
			})
		}
		function n(a, b) {
			var d = b.data.alt;
			c(d, function(a) {
				b(a)
			})
		}
		function m() {
			f.dEvent.add("image", "click", l);
			e.editor("on", "editor.image.beforeChangeCaption", n);
			e.editor("on", "editor.image.remove", o);
			e.editor("on", "editor.drag.typeError", function(a, b) {
				i("文件::" + b.name + " 不是一个合法的图片！", {
					icon: "warnB"
				}).ok("我知道了")
			});
			e.editor("on", "editor.drag.imageFileList", function(b, c) {
				var d = c;
				for (var e = 0, f; f = d[e]; e++) {
					var g = new FileReader,
						h = "fid" + (new Date).getTime();
					g.onload = function(b) {
						return function() {
							var c = this.result.split(",")[1];
							a.lib.kit.extra.upload.uploadBase64(c, 0, s, b)
						}
					}(h);
					g.readAsDataURL(f);
					r(h)
				}
				return !1
			});
			e.on("paste", function(b) {
				var c, d, e;
				if (b && b.originalEvent && (c = b.originalEvent.clipboardData) && (d = c.items) && (e = d[0]) && e.kind == "file" && e.type.match(/^image\//i)) {
					var f = e.getAsFile(),
						g = new FileReader,
						h = "fid" + (new Date).getTime();
					g.onload = function(b) {
						return function() {
							var c = this.result.split(",")[1];
							a.lib.kit.extra.upload.uploadBase64(c, 0, s, b)
						}
					}(h);
					g.readAsDataURL(f);
					r(h);
					return !1
				}
			});
			e.on("dragover", function(a) {
				a.preventDefault();
				e.css({
					border: "1px dotted #ccc",
					"background-color": "#eee"
				})
			});
			e.on("dragenter", function(a) {
				a.preventDefault();
				e.css({
					border: "1px dotted #ccc",
					"background-color": "#eee"
				})
			});
			e.on("dragleave", function(a) {
				a.preventDefault();
				e.css({
					border: "",
					"background-color": ""
				})
			});
			e.on("drop", function(a) {
				a.preventDefault();
				e.css({
					border: "",
					"background-color": ""
				})
			})
		}
		function l(b) {
			(!b || !b.el || b.el.parentNode._disabled) && a.core.evt.stopEvent()
		}
		var g = {},
			h = a.C("input"),
			i = a.ui.alert,
			j = e.opts.imgBtn.firstChild,
			k, p = function(b) {
				var c = q(b);
				if (!k) {
					k = !0;
					tipbubble = a.ui.bubble(b, {
						clickBlankToHide: !0,
						showWithAni: "fadeInDown:fast",
						hideWithAni: "fadeOutUp:fast",
						showWithSetWidth: !1
					}).on("hide", function() {
						k = !1
					});
					setTimeout(function() {
						tipbubble.show();
						tipbubble.setAlignPos(f.imgBtn, f.container, {
							align: "right",
							arrowOffset: 0,
							refer: f.container,
							useAlign: !0
						});
						setTimeout(function() {
							tipbubble.hide()
						}, 3e3)
					}, 100)
				}
			},
			q = function(a) {
				var a = a || "抱歉，由于格式不兼容丢失部分图片内容，试试本地上传吧！",
					b = '<div class="W_layer_tips" style="position:absolute;"><div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div><div class="content"><div class="txt"><p>' + a + "</p>" + "</div>" + "</div>" + '<div class="W_layer_arrow"><span node-type="arrow" class="W_arrow_bor W_arrow_bor_t"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div>' + "</div>" + "";
				return b
			};
		u();
		g.destroy = function() {
			a.core.evt.removeEvent(h, "click", l)
		};
		return g
	}
});
STK.register("lib.rteditor.helpers.parseCard", function(a) {
	function h(a) {
		var c = a.opts.container,
			d = f(a);
		return b - d
	}
	function g(a) {
		var c = a.opts.container,
			d = e(a);
		return b - d
	}
	function f(b) {
		var c = b.opts.container,
			d = a.sizzle("iframe[data-card-type=product]", c);
		return !d || !d.length ? 0 : d.length | 0
	}
	function e(b) {
		var c = b.opts.container,
			d = a.sizzle("iframe[data-card-type=video]", c);
		return !d || !d.length ? 0 : d.length | 0
	}
	function d(b) {
		var c = b.opts.container,
			d = a.sizzle("iframe[data-card-id]", c);
		return !d || !d.length ? 0 : d.length | 0
	}
	var b = 5,
		c = 5; -
	function() {
		var b = ["card"];
		for (var c = 0, d = b.length; c < d; ++c) a.C(b[c])
	}();
	return {
		getCardCount: d,
		getVideoCardCount: e,
		getRemainingVideoCardCount: g,
		getRemainingProductCardCount: h,
		VIDEO_CARD_MAX: b,
		GOODS_CARD_MAX: c
	}
});
STK.register("lib.rteditor.plugins.videoDialog", function(a) {
	var b = a.ui.dialog,
		c = a.lib.rteditor.helpers.inputText,
		d = '\t\t<div class="layer_videolink">\t\t\t<dl class="f_normal clearfix">\t\t\t<dt class="f_tit">链接地址：</dt>\t\t\t<dd class="f_con"> \t\t\t<div class="input_outer W_input_focus"><input type="text" class="W_input"></div>\t\t\t</dd>\t\t\t</dl>\t\t\t<div class="f_normal clearfix">\t\t\t  <dd class="f_con"><span class="S_txt2" node-type="msg">目前支持<em class="S_spetxt">秒拍</em>视频 </span>         <span class="S_txt2" node-type="videoNum"></span> </dd>\t\t\t</div>\t\t</div>\t\t<div class="W_layer_btn S_bg1 clearfix">\t\t\t<a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok" action-type="ok"><span>确定</span></a>\t\t\t<a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel" action-type="cancel"><span>取消</span></a>\t\t</div>',
		e = "W_btn_a_disable",
		f = /^http[s]?\:\/\/.{3,}/,
		g = /^http[s]?:\/\/[0-9a-zA-Z_!~*'().;?:@&= $,%#-.]+?\..+\w$/i;
	return function(e, h) {
		function v() {
			a.core.evt.removeEvent(k.ok, "click", p.ok);
			a.core.evt.removeEvent(k.cancel, "click", p.cancel);
			i.off("hide", v);
			l.destroy()
		}
		function u() {
			s();
			q();
			r();
			t()
		}
		function t() {
			i.show()
		}
		function s() {
			i = b();
			i.setTitle("请输入视频链接");
			i.setContent(d);
			j = i.getBox();
			var f = a.sizzle("[node-type=videoNum]", j)[0];
			f.innerHTML = '（还可以插入 <em class="S_spetxt">' + e + "</em> 部视频）";
			var g = a.sizzle("input", j);
			l = c(g[0], {
				placeholder: "请输入视频播放页地址",
				maxLength: 3e3
			});
			i.show()
		}
		function r() {
			a.core.evt.addEvent(k.ok, "click", p.ok);
			a.core.evt.addEvent(k.cancel, "click", p.cancel);
			i.on("hide", v)
		}
		function q() {
			k.msg = a.sizzle("[node-type=msg]", j)[0];
			k.ok = a.sizzle("[node-type=ok]", j)[0];
			k.cancel = a.sizzle("[node-type=cancel]", j)[0]
		}
		function o(a) {
			l.flash();
			var b = a.msg || n;
			k.msg.innerHTML = b;
			m = !1
		}
		var i, j, k = {},
			l, m = !1,
			n = "视频解析失败！",
			p = {
				close: function() {
					i.destroy();
					v()
				},
				ok: function() {
					if (!m) {
						var b = a.trim(l.getValue());
						f.test(b) || (b = "http://" + b);
						if (!g.test(b)) {
							l.flash();
							return
						}
						f.test(b) || (b = "http://" + b);
						var c = {
							url: encodeURIComponent(b)
						};
						m = !0;
						a.conf.trans.article.request("video", {
							onSuccess: function(a) {
								m = !1;
								i.hide();
								h(a.data.id)
							},
							onFail: o,
							onError: o
						}, c)
					}
				},
				cancel: function() {
					i.hide()
				}
			};
		u()
	}
});
STK.register("lib.rteditor.plugins.video", function(a) {
	var b = a.lib.rteditor.helpers.isImgBoxInput,
		c = a.lib.rteditor.helpers.parseCard,
		d = a.lib.rteditor.plugins.videoDialog,
		e = a.ui.alert;
	return function(b, f) {
		function j() {
			i()
		}
		function i() {
			f.dEvent.add("video", "click", h)
		}
		function h(f) {
			if (!(!f || !f.el || f.el.parentNode._disabled)) {
				var g = c.getRemainingVideoCardCount(b);
				if (g <= 0) {
					e("最多只能插入 " + c.VIDEO_CARD_MAX + " 部视频", {
						icon: "rederrorB"
					});
					return
				}
				d(g, function(c) {
					var d = "fid" + (new Date).getTime();
					b.editor("core.insertHTML", '<p id="' + d + '" card-box-loading="card-box-loading" style="text-align:center;" contenteditable="false"><i class="W_loading_big">​</i></p>');
					var e = document.getElementById(d),
						f = "video",
						g = "http://weibo.com/ttarticle/p/cardiframe?type=" + f + "&id=" + c,
						h = {
							url: g,
							id: c || "",
							type: "video",
							height: "400"
						},
						i = a.C("iframe");
					i.setAttribute("data-card-id", h.id);
					i.setAttribute("data-card-type", h.type);
					i.setAttribute("src", h.url);
					i.setAttribute("width", "100%");
					i.setAttribute("height", h.height);
					i.setAttribute("class", "iframe_video");
					i.setAttribute("scrolling", "no");
					i.setAttribute("frameborder", "no");
					i.setAttribute("allowtransparency", "yes");
					i.setAttribute("contenteditable", "false");
					i.innerHTML = "​";
					e && e.parentNode && e.parentNode.removeChild && a.replaceNode(i, e);
					var j = i.previousSibling,
						k = i.nextSibling;
					j ? (j && j.tagName == "FIGURE" && j.getAttribute("class") == "card-img" || j.tagName == "IFRAME" && j.getAttribute("card-box-loading") == "card-box-loading") && a.insertHTML(i, "<p><br></p>", "BeforeBegin") : a.insertHTML(i, "<p><br></p>", "BeforeBegin");
					k ? (k && k.tagName == "FIGURE" && k.getAttribute("class") == "card-img" || k.tagName == "IFRAME" && k.getAttribute("card-box-loading") == "card-box-loading") && a.insertHTML(i, "<p><br></p>", "AfterEnd") : a.insertHTML(i, "<p><br></p>", "AfterEnd");
					b.editor("fire", "editor.insertHTML")
				})
			}
		}
		var g = {};
		j();
		g.destroy = function() {
			f.dEvent.remove("video", "click", h)
		};
		return g
	}
});
STK.register("lib.rteditor.plugins.fullscreen", function(a) {
	var b = !1;
	return function(c, d) {
		function j() {
			h();
			i()
		}
		function i() {
			d.dEvent.add("fullscreen", "click", g)
		}
		function h() {
			f.page = a.sizzle("[node-type=page]")[0]
		}
		function g(c) {
			var d = a.core.dom;
			if (!b) {
				d.removeClassName(f.page, "clearfix");
				d.addClassName(f.page, "WB_editor_max");
				c.el.title = "退出全屏";
				b = !0
			} else {
				d.removeClassName(f.page, "WB_editor_max");
				d.addClassName(f.page, "clearfix");
				c.el.title = "全屏编辑";
				b = !1
			}
		}
		var e = {},
			f = {};
		j();
		e.destroy = function() {
			d.dEvent.remove("fullscreen", "click", g)
		};
		return e
	}
});
STK.register("lib.rteditor.plugins.payLine", function(a) {
	function d(d, e) {
		function n() {
			clearInterval(h);
			h = 0
		}
		function m() {
			h = setInterval(function() {
				var c = a.sizzle(b, g);
				if (!c || !c.length && i) {
					a.custEvent.fire(f, "cancelPay");
					i = !1
				} else {
					var d = c.length;
					if (!i && d) {
						a.custEvent.fire(f, "addPay");
						i = !0
					}
					for (var e = 1; e < d; ++e) {
						var h = c[e];
						h.parentNode.removeChild(h)
					}
				}
			}, 500)
		}
		function l(c) {
			var d = a.sizzle(b, g),
				e = d.length;
			if (e != 0) {
				for (var h = 0; h < e; ++h) {
					var i = d[h];
					i.parentNode.removeChild(i)
				}
				a.custEvent.fire(f, "cancelPay")
			}
		}
		function k(e) {
			var f = a.sizzle(b, g);
			if (!(f.length > 0)) {
				d.editor("core.insertHTML", "<p><br></p>" + c + "<p><br></p>");
				i = !0
			}
		}
		function j() {
			var c = a.sizzle(b, g);
			return !!c.length
		}
		var f = {},
			g = d.opts.container,
			h, i = j();
		a.custEvent.define(f, "cancelPay");
		a.custEvent.define(f, "addPay");
		f.add = k;
		f.remove = l;
		f.payLineHTML = c;
		f.autoDetection = m;
		f.stopDetection = n;
		f.hasPayLine = j;
		return f
	}
	var b = "fieldset[data-pay=pay_line]",
		c = '<fieldset class="line" data-pay="pay_line" contenteditable="false">​</fieldset>';
	d.payLineHTML = c;
	d.paySelectorTxt = b;
	return d
});
STK.register("lib.kit.extra.paging", function(a) {
	return function(b) {
		var c = {},
			d = a.parseParam({
				totalItem: 180,
				maxItem: 10,
				maxPage: 6,
				currentPage: 0,
				showLast: !1,
				disabledClass: "page_dis",
				selectClass: "S_bg1",
				omitTemplete: '<a href="javascript:" class="page S_txt2 page_dis">...</a>'
			}, b);
		c.pageCount = Math.ceil(d.totalItem * 1 / (d.maxItem * 1));
		c.currentPage = d.currentPage * 1 || 1;
		c.currentPage = Math.max(Math.min(c.currentPage, c.pageCount), 1);
		c.renderItem = function(a) {
			return '<a href="javascript:" action-type="page" action-data="pageNumber=' + a + '" class="page S_txt1 ' + (a === c.currentPage ? d.selectClass : "") + '">' + a + "</a>"
		};
		c.renderPrev = function() {
			return '<a href="javascript:" action-type="page" action-data="pageNumber=' + Math.max(c.currentPage - 1, 1) + '" class="page prev S_txt1 S_line1 ' + (c.currentPage < 2 ? "page_dis" : "") + '">上一页</a>'
		};
		c.renderNext = function() {
			return '<a href="javascript:" action-type="page" action-data="pageNumber=' + Math.min(c.currentPage + 1, c.pageCount) + '" class="page next S_txt1 S_line1 ' + (c.currentPage > c.pageCount - 1 ? "page_dis" : "") + '">下一页</a>'
		};
		c.render = function() {
			var a = c.renderPrev();
			if (c.pageCount > d.maxPage) {
				a += c.renderItem(1);
				if (c.currentPage < d.maxPage) {
					for (var b = 2; b <= d.maxPage; b++) a += c.renderItem(b);
					a += d.omitTemplete
				} else if (c.currentPage >= d.maxPage && c.currentPage <= c.pageCount - d.maxPage) {
					a += d.omitTemplete;
					var e = Math.floor((d.maxPage - 1) / 2);
					for (var b = c.currentPage - e; b <= c.currentPage + e; b++) a += c.renderItem(b);
					a += d.omitTemplete
				} else {
					a += d.omitTemplete;
					for (var b = c.pageCount - d.maxPage; b < c.pageCount; b++) a += c.renderItem(b)
				}
				a += c.renderItem(c.pageCount)
			} else for (var b = 1; b <= c.pageCount; b++) a += c.renderItem(b);
			a += c.renderNext();
			return a
		};
		c.setPage = function(a) {
			a = Math.max(Math.min(a, c.pageCount), 1);
			c.currentPage = a;
			return c.render()
		};
		c.next = function() {
			var a = Math.min(c.currentPage + 1, c.pageCount);
			c.currentPage = a;
			return c.render()
		};
		c.prev = function(a) {
			var b = Math.max(c.currentPage - 1, 1);
			c.currentPage = b;
			return c.render()
		};
		return c
	}
});
STK.register("lib.kit.io.ajax", function(a) {
	var b = function(b, c, d) {
			c = c | 0 || 1;
			d = d || "fail";
			var e = b.args;
			e.__rnd && delete e.__rnd;
			(new Image).src = "http://weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d;
			(new Image).src = "http://s1.sinaedge.com/whb.gif?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
		};
	return function(c) {
		var d = {},
			e = [],
			f = null,
			g = !1,
			h = a.parseParam({
				url: "",
				method: "get",
				responseType: "json",
				timeout: 3e4,
				onTraning: a.funcEmpty,
				isEncode: !0
			}, c);
		h.onComplete = function(a) {
			g = !1;
			c.onComplete(a, h.args);
			setTimeout(i, 0)
		};
		h.onFail = function(a) {
			g = !1;
			if (typeof c.onFail == "function") try {
				c.onFail(a, h.args)
			} catch (d) {}
			setTimeout(i, 0);
			try {
				b(h)
			} catch (d) {}
		};
		h.onTimeout = function(a) {
			try {
				b(h);
				c.onTimeout(a)
			} catch (d) {}
		};
		var i = function() {
				if ( !! e.length) {
					if (g === !0) return;
					g = !0;
					h.args = e.shift();
					if (h.method.toLowerCase() == "post") {
						var b = a.core.util.URL(h.url);
						b.setParam("__rnd", +(new Date));
						h.url = b.toString()
					}
					f = a.ajax(h)
				}
			},
			j = function(a) {
				while (e.length) e.shift();
				g = !1;
				if (f) try {
					f.abort()
				} catch (b) {}
				f = null
			};
		d.request = function(a) {
			a || (a = {});
			c.noQueue && j();
			if (!c.uniqueRequest || !f) {
				e.push(a);
				a._t = 0;
				i()
			}
		};
		d.abort = j;
		return d
	}
});
STK.register("lib.kit.io.jsonp", function(a) {
	return function(b) {
		var c = a.parseParam({
			url: "",
			method: "get",
			responseType: "json",
			varkey: "_v",
			timeout: 3e4,
			onComplete: a.funcEmpty,
			onTraning: a.funcEmpty,
			onFail: a.funcEmpty,
			isEncode: !0
		}, b),
			d = [],
			e = {},
			f = !1,
			g = function() {
				if ( !! d.length) {
					if (f === !0) return;
					f = !0;
					e.args = d.shift();
					e.onComplete = function(a) {
						f = !1;
						c.onComplete(a, e.args);
						setTimeout(g, 0)
					};
					e.onFail = function(a) {
						f = !1;
						c.onFail(a);
						setTimeout(g, 0)
					};
					a.jsonp(a.core.json.merge(c, {
						args: e.args,
						onComplete: function(a) {
							e.onComplete(a)
						},
						onFail: function(a) {
							try {
								e.onFail(a)
							} catch (b) {}
						}
					}))
				}
			},
			h = {};
		h.request = function(a) {
			a || (a = {});
			d.push(a);
			a._t = 1;
			g()
		};
		h.abort = function(a) {
			while (d.length) d.shift();
			f = !1;
			e = null
		};
		return h
	}
});
STK.register("lib.kit.io.ijax", function(a) {
	return function(b) {
		var c = a.parseParam({
			url: "",
			timeout: 3e4,
			isEncode: !0,
			abaurl: null,
			responseName: null,
			varkey: "callback",
			abakey: "callback"
		}, b),
			d = [],
			e = null,
			f = !1;
		c.onComplete = function(a, d) {
			f = !1;
			b.onComplete(a, c.form, d);
			c.form = null;
			c.args = null;
			setTimeout(g, 0)
		};
		c.onFail = function(a, d) {
			f = !1;
			b.onFail(a, c.form, d);
			c.form = null;
			c.args = null;
			setTimeout(g, 0)
		};
		var g = function() {
				var b;
				if ( !! d.length) {
					if (f === !0) return;
					f = !0;
					b = d.shift();
					c.args = b.args;
					c.form = b.form;
					e = a.ijax(c)
				}
			},
			h = function(a) {
				while (d.length) d.shift();
				f = !1;
				if (e) try {
					e.abort()
				} catch (b) {}
				e = null
			},
			i = {};
		i.request = function(c, e) {
			if (!a.isNode(c)) throw "[lib.kit.io.ijax.request] need a form as first parameter";
			e || (e = {});
			b.noQueue && h();
			d.push({
				form: c,
				args: e
			});
			g()
		};
		i.abort = h;
		return i
	}
});
STK.register("lib.kit.io.inter", function(a) {
	var b = a.core.json.merge;
	return function() {
		var c = {},
			d = {},
			e = {},
			f = function(a, b) {
				return function(c, d) {
					try {
						b.onComplete(c, d)
					} catch (f) {}
					try {
						c.code === "100000" ? b.onSuccess(c, d) : b.onError(c, d)
					} catch (f) {}
					for (var g in e[a]) try {
						e[a][g](c, d)
					} catch (f) {}
				}
			},
			g = function(a, b, c) {
				return function(d) {
					try {
						b.onComplete(d, c)
					} catch (f) {}
					try {
						d.code === "100000" ? b.onSuccess(d, c) : b.onError(d, c)
					} catch (f) {}
					for (var g in e[a]) try {
						e[a][g](d, c)
					} catch (f) {}
				}
			};
		c.register = function(a, b) {
			if (typeof d[a] != "undefined") throw a + " registered";
			d[a] = b;
			e[a] = {}
		};
		c.addHook = function(b, c) {
			var d = a.core.util.getUniqueKey();
			e[b][d] = c;
			return d
		};
		c.rmHook = function(a, b) {
			e[a] && e[a][b] && delete e[a][b]
		};
		c.getTrans = function(c, e) {
			var g = b(d[c], e);
			g.onComplete = f(c, e);
			g.url += (g.url.indexOf("?") >= 0 ? "&" : "?") + "ajwvr=6";
			g.withDomain && (g.url += "&domain=" + $CONFIG.domain);
			var h = d[c].requestMode,
				i = "ajax";
			if (h === "jsonp" || h === "ijax") i = h;
			return a.lib.kit.io[i](g)
		};
		c.request = function(c, e, f) {
			var h = b(d[c], e);
			h.onComplete = g(c, e, f);
			h.url += (h.url.indexOf("?") >= 0 ? "&" : "?") + "ajwvr=6";
			h.withDomain && (h.url += "&domain=" + $CONFIG.domain);
			h = a.core.obj.cut(h, ["noqueue"]);
			h.args = f;
			var i = d[c].requestMode;
			return i === "jsonp" ? a.jsonp(h) : i === "ijax" ? a.ijax(h) : a.ajax(h)
		};
		return c
	}
});
STK.register("conf.trans.article", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("deldraft", {
		url: "/ttarticle/p/aj/deldraft",
		method: "post"
	});
	c("draft", {
		url: "/ttarticle/p/aj/draft",
		method: "post"
	});
	c("getdraft", {
		url: "/ttarticle/p/aj/getdraft",
		method: "post"
	});
	c("getdraftlist", {
		url: "/ttarticle/p/aj/getdraftlist",
		method: "post"
	});
	c("publish", {
		url: "/ttarticle/p/aj/publish",
		method: "post"
	});
	c("video", {
		url: "/ttarticle/p/aj/video",
		method: "post"
	});
	c("productlist", {
		url: "/ttarticle/p/aj/productlist",
		method: "get"
	});
	c("product", {
		url: "/ttarticle/p/aj/product",
		method: "post"
	});
	c("similarity", {
		url: "/ttarticle/p/aj/original",
		method: "post"
	});
	return b
});
STK.register("lib.rteditor.plugins.productDialog", function(a) {
	var b = a.ui.dialog,
		c = a.lib.rteditor.helpers.inputText,
		d, e, f = /^http[s]?:\/\/[0-9a-zA-Z_!~*'().;?:@&= $,%#-.]+?\..+\w$/i,
		g = '<div class="W_layer_close"><a href="#" class="W_ficon ficon_close S_ficon" action-type="cancel">X</a></div><div class="layer_commodity"><ul class="pt_ul clearfix" node-type="product_list" style="display:none;transition: height 1s linear;"></ul><div node-type="loading" style="width: 100%; padding:35.5px 0; text-align: center"><i class="W_loading_big"></i></div><div class="pt_ma" node-type="empty" style="display: none"><div class="W_f14">快去手机上创建自己的商品吧</div><div class="ma ma_hover"><img src="http://ww4.sinaimg.cn/large/56e89fd7jw1f5zcmnx4rsj208c08c0tt.jpg" alt="" width="185" style="width: 185px;height: 185px" height="185"><span class="bg"></span></div><!-- 需要出现浮层的时候增加样式名ma_hover --><div class="S_txt2">从微博手机客户端同步登录自己的帐号，并在首页右上角"雷达"进入扫一扫，<br>扫码创建自己的商品</div></div><div node-type="error" style="display: none"><div class="WB_empty"><div class="WB_innerwrap"><div class="empty_con clearfix"><p class="icon_bed"><i class="W_icon icon_warnB"></i></p><p class="text"><span node-type="error_msg">商品列表获取失败</span><a node="retry" action-type="retry" href="javascript:">点击重试</a></p></div></div></div></div><div class="W_pages" node-type="paging"></div><dl class="f_normal clearfix"><dt class="f_tit">商品链接：</dt><dd class="f_con"><div class="input_outer W_input_focus"><input type="text" node-type="pasteProduct" class="W_input" value=""></div></dd></dl></div><div class="W_layer_btn S_bg1"><a href="javascript:" node-type="ok" action-type="ok" class="W_btn_a btn_34px W_btn_a_disable">确定</a><a action-type="cancel" href="javascript:" class="W_btn_b btn_34px">取消</a></div>',
		h = '<#et data data><#list data.items as list><li class="pt_li" node-type="product-card-tiem" action-type="product-item-item" action-data="id=${list.id}"><div class="pic_box ${list.class}"><a href="javascript:"><img src="${list.pic}" alt="" style="user-select: none" class="pic"></a><div class="markup_choose"><i class="bg"></i></div></div><div class="info_box"><div class="title" node-type="product-card-tiem-title">${list.title}</div><div class="price W_autocut S_spetxt"  node-type="product-card-tiem-price">${list.price}</div></div></li></#list></#et>',
		i = "W_btn_a_disable",
		j = /^http[s]?\:\/\/.{3,}/,
		f = /^http[s]?:\/\/[0-9a-zA-Z_!~*'().;?:@&= $,%#-.]+?\..+\w$/i,
		j = /^http[s]?\:\/\//i;
	return function(i, k) {
		function z() {
			r.remove("page", "click", t.reloadPage);
			r.remove("product-item-item", "mouseover", t.itemOver);
			r.remove("product-item-item", "mouseout", t.itemOut);
			r.remove("product-item-item", "click", t.itemClick);
			r.remove("ok", "click", t.ok);
			r.remove("cancel", "click", t.cancel);
			a.removeEvent(o, "keyup");
			a.custEvent.remove(o, "blur");
			a.core.evt.removeEvent(n.ok, "click", t.ok);
			a.core.evt.removeEvent(n.cancel, "click", t.cancel);
			l.off("hide", z);
			o.destroy()
		}
		function y() {
			w();
			u();
			v();
			x()
		}
		function x() {
			e = null;
			t.okDisabled(!0);
			t.loadProduct()
		}
		function w() {
			l = b();
			l.setTitle("选择商品");
			l.setContent(g);
			m = l.getBox();
			n.pasteProduct = a.sizzle("[node-type=pasteProduct]", m)[0];
			o = c(n.pasteProduct, {
				maxLength: 9999,
				focusClass: "W_input_focus",
				placeholder: "支持微博橱窗商品插入"
			});
			l.show()
		}
		function v() {
			r = a.delegatedEvent(m);
			r.add("page", "click", t.reloadPage);
			r.add("product-item-item", "mouseover", t.itemOver);
			r.add("product-item-item", "mouseout", t.itemOut);
			r.add("product-item-item", "click", t.itemClick);
			r.add("ok", "click", t.ok);
			r.add("cancel", "click", t.cancel);
			r.add("retry", "click", t.loadProduct);
			a.addEvent(n.pasteProduct, "keyup", t.keyup);
			a.custEvent.add(o, "blur", t.blur);
			l.on("hide", z)
		}
		function u() {
			n.msg = a.sizzle("[node-type=msg]", m)[0];
			n.loading = a.sizzle("[node-type=loading]", m)[0];
			n.ok = a.sizzle("[node-type=ok]", m)[0];
			n.cancel = a.sizzle("[node-type=cancel]", m)[0];
			n.productList = a.sizzle("[node-type=product_list]", m)[0];
			n.paging = a.sizzle("[node-type=paging]", m)[0];
			n.pastePanel = a.sizzle("[node-type=pastePanel]", m)[0];
			n.error = a.sizzle("[node-type=error]", m)[0];
			n.errorMsg = a.sizzle("[node-type=error_msg]", m)[0];
			n.empty = a.sizzle("[node-type=empty]", m)[0]
		}
		var l, m, n = {},
			o, p = !0,
			q = "商品链接解析失败！",
			r, s = "loading",
			t = {
				close: function() {
					l.destroy();
					z()
				},
				parseURLFail: function(b, c) {
					var d = b.msg || q;
					c && o.flash();
					a.ui.alert(d, {
						icon: "warnB"
					});
					t.okDisabled(!1)
				},
				reloadPage: function(a) {
					var b = 1;
					a !== undefined && (b = a.data.pageNumber);
					t.loadPage(b)
				},
				loadProductFail: function(b) {
					var c = b.msg || "商品列表获取失败",
						d = a.sizzle("[node-type=loading]", m);
					if (d && (d = d[0])) {
						n.errorMsg.innerHTML = c;
						t.updateStatus("error")
					}
				},
				loadPage: function(b) {
					a.conf.trans.article.request("productlist", {
						onSuccess: function(c) {
							var f = c.data;
							d = a.lib.kit.extra.paging({
								totalItem: f.total,
								maxItem: f.maxItem,
								maxPage: 6,
								currentPage: b,
								disabledClass: "page_dis",
								selectClass: "S_bg1"
							});
							if (!(f.total * 1)) {
								t.updateStatus("empty");
								l.show()
							} else {
								for (var g = 0; g < f.items.length; g++) {
									var h = f.items[g];
									h.width && h.height && (f.items[g]["class"] = h.width > h.height ? "W_piccut_h" : "W_piccut_v")
								}
								t.renderProduct(f.items);
								n.paging.innerHTML = d.render();
								a.setStyle(n.pasteProduct, "opacity", 1);
								o.setEnabled();
								e = null;
								t.checkValue(function() {
									t.okDisabled(!0)
								}, function() {
									t.okDisabled(!1)
								});
								if (s === "loading") {
									t.updateStatus("productList");
									l.show()
								}
							}
						},
						onFail: t.loadProductFail,
						onError: t.loadProductFail
					}, {
						page: b
					})
				},
				loadProduct: function() {
					t.updateStatus("loading");
					t.loadPage(1)
				},
				ok: function() {
					if (!p) {
						if (e) {
							t.okDisabled(!1);
							l.hide();
							k(e);
							return
						}
						var b = a.trim(o.getValue());
						t.checkValue(function() {
							var c = {
								url: encodeURIComponent(b)
							};
							t.okDisabled(!0);
							a.conf.trans.article.request("product", {
								onSuccess: function(a) {
									t.okDisabled(!1);
									l.hide();
									k(a.data.id)
								},
								onFail: function(a) {
									t.parseURLFail(a, !0)
								},
								onError: function(a) {
									t.parseURLFail(a, !0)
								}
							}, c)
						})
					}
				},
				cancel: function() {
					l.hide()
				},
				okDisabled: function(b) {
					if (b === !0) {
						p = !0;
						a.addClassName(n.ok, "W_btn_a_disable")
					} else {
						p = !1;
						a.removeClassName(n.ok, "W_btn_a_disable")
					}
				},
				itemOver: function(b) {
					a.hasClassName(b.el, "choosed") || a.addClassName(b.el, "hover")
				},
				itemOut: function(b) {
					a.hasClassName(b.el, "choosed") || a.removeClassName(b.el, "hover")
				},
				itemReset: function(b) {
					var c = a.sizzle("[action-type=product-item-item]", l.getBox());
					a.foreach(c, function(c) {
						a.removeClassName(c, "hover");
						a.removeClassName(c, "choosed");
						b && b(c)
					})
				},
				checkValue: function(a, b) {
					var c = o.getValue();
					if (e) {
						t.okDisabled(!1);
						return !0
					}
					j.test(c) || (c = "http://" + c);
					if (!f.test(c)) {
						typeof b == "function" && b();
						t.okDisabled(!0);
						return !1
					}
					typeof a == "function" && a();
					t.okDisabled(!1);
					return !0
				},
				updateStatus: function(b) {
					s = b;
					a.setStyle(n.loading, "display", b === "loading" ? "" : "none");
					a.setStyle(n.productList, "display", b === "productList" ? "" : "none");
					a.setStyle(n.error, "display", b === "error" ? "" : "none");
					a.setStyle(n.paging, "display", b === "productList" ? "" : "none");
					a.setStyle(n.empty, "display", b === "empty" ? "" : "none")
				},
				itemClick: function(b) {
					var c = a.hasClassName(b.el, "choosed");
					t.itemReset();
					if (!c) {
						a.addClassName(b.el, "choosed");
						o.setDisabled();
						t.okDisabled(!1);
						e = b.data.id
					} else {
						e = null;
						t.checkValue(o.setEnabled, o.setEnabled)
					}
				},
				renderProduct: function(b) {
					n.productList.innerHTML = a.core.util.easyTemplate(h, {
						items: b
					}).toString()
				},
				keyup: function() {
					t.checkValue(function() {
						e = null;
						t.itemReset()
					})
				},
				blur: function() {
					t.checkValue(function() {
						e = null;
						handler.itemReset()
					})
				}
			};
		y()
	}
});
STK.register("lib.rteditor.plugins.product", function(a) {
	var b = a.lib.kit.extra.language,
		c = a.lib.rteditor.plugins.productDialog,
		d = a.ui.confirm,
		e = a.lib.rteditor.helpers.parseCard;
	return function(b, d) {
		function i() {
			h()
		}
		function h() {
			d.dEvent.add("product", "click", g)
		}
		function g(d) {
			if (!(!d || !d.el || d.el.parentNode._disabled)) {
				var f = e.getRemainingProductCardCount(b);
				if (f <= 0) {
					a.ui.alert("最多只能插入 " + e.GOODS_CARD_MAX + " 个商品", {
						icon: "rederrorB"
					});
					return
				}
				c(f, function(a) {
					var c = "product",
						d = "http://weibo.com/ttarticle/p/cardiframe?type=" + c + "&id=" + a,
						e = {
							url: d,
							id: a || "",
							type: c,
							height: "424"
						},
						f = ["<p>​</p><iframe ", 'data-card-id="', e.id, '" ', 'data-card-type="', e.type, '" ', 'src="', e.url, '" ', 'width="100%" height="', e.height, '" ', 'class="iframe_commodity" ', 'scrolling="no" frameborder="no" ', 'allowtransparency="yes" ', 'contenteditable="false">', "​</iframe><p>​</p>"].join("");
					b.editor("core.insertHTML", f);
					return
				})
			}
		}
		var f = {};
		i();
		f.init = i;
		f.destroy = function() {};
		return f
	}
});
STK.register("conf.trans.publisher", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("publish", {
		url: "/aj/mblog/add",
		method: "post"
	});
	c("publishPage", {
		url: "/p/aj/v6/mblog/add",
		method: "post",
		withDomain: !0
	});
	c("publishPro", {
		url: "/aj/mblog/add",
		method: "post"
	});
	c("interactive", {
		url: "/aj/mblog/interactive",
		method: "post"
	});
	c("timingPublish", {
		url: "/aj/mblog/addtime",
		method: "post"
	});
	c("getpublish", {
		url: "/p/aj/v6/publish",
		method: "get"
	});
	c("reviewadd", {
		url: "/p/aj/review/add",
		method: "post"
	});
	c("follow", {
		url: "/aj/f/followed",
		method: "post"
	});
	c("proxy", {
		url: "/p/aj/proxy",
		method: "post"
	});
	c("pagepublish", {
		url: "/p/aj/v6/mblog/add?domain=100505",
		method: "post"
	});
	c("getreview", {
		url: "/aj/review/list",
		method: "get"
	});
	c("getscore", {
		url: "/aj/review/info",
		method: "get"
	});
	c("reviewsug", {
		url: "/aj/review/search",
		method: "get"
	});
	return b
});
STK.register("lib.kit.extra.listener", function(a) {
	var b = {},
		c = {};
	c.define = function(c, d) {
		if (b[c] != null) throw "lib.kit.extra.listener.define: 频道已被占用";
		b[c] = d;
		var e = {};
		e.register = function(d, e) {
			if (b[c] == null) throw "lib.kit.extra.listener.define: 频道未定义";
			a.listener.register(c, d, e)
		};
		e.fire = function(d, e) {
			if (b[c] == null) throw "commonlistener.define: 频道未定义";
			a.listener.fire(c, d, e)
		};
		e.remove = function(b, d) {
			a.listener.remove(c, b, d)
		};
		e.cache = function(b) {
			return a.listener.cache(c, b)
		};
		return e
	};
	return c
});
STK.register("conf.channel.feed", function(a) {
	var b = ["forward", "publish", "comment", "delete", "refresh", "reply", "feedTagUpdate", "feedTagMoreUpdate", "qfaceAdd", "qfaceCount", "timeFeedPublish"];
	return a.lib.kit.extra.listener.define("conf.channel.feed", b)
});
STK.register("lib.kit.dom.parentAttr", function(a) {
	return function(a, b, c) {
		var d;
		if (a && b) {
			c = c || document.body;
			while (a && a != c && !(d = a.getAttribute(b))) a = a.parentNode
		}
		return d
	}
});
STK.register("lib.kit.extra.merge", function(a) {
	return function(a, b) {
		var c = {};
		for (var d in a) c[d] = a[d];
		for (var d in b) c[d] = b[d];
		return c
	}
});
STK.register("lib.kit.extra.getDiss", function(a) {
	return function() {
		var b = {},
			c = 0,
			d = {
				location: $CONFIG.location || ""
			};
		arguments[0] && !a.core.dom.isNode(arguments[0]) && (b = arguments[c++]);
		b = a.lib.kit.extra.merge(b, d);
		if (!arguments[c]) return b;
		b = a.lib.kit.extra.merge(b, a.core.json.queryToJson(a.lib.kit.dom.parentAttr(arguments[c++], "diss-data", arguments[c]) || ""));
		return b
	}
});
STK.register("lib.publisher.widget.count", function(a) {
	function b(b) {
		var c = 41,
			d = 140,
			e = 20,
			f = b,
			g = b.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [],
			h = 0;
		for (var i = 0, j = g.length; i < j; i++) {
			var k = a.core.str.bLength(g[i]);
			if (/^(http:\/\/t.cn)/.test(g[i])) continue;
			/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
			f = f.replace(g[i], "")
		}
		var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
		return l
	}
	return function(a) {
		a = a.replace(/\r\n/g, "\n");
		return b(a)
	}
});
STK.register("lib.dialog.loginLayer", function(a) {
	var b, c = "http://tjs.sjs.sinajs.cn/t5/register/js/page/remote/loginLayer.js";
	return function(d) {
		d = a.core.obj.parseParam({
			lang: "zh-cn",
			loginSuccessUrl: encodeURIComponent(window.location.href),
			currentTab: ""
		}, d || {});
		if (window.WBtopGlobal_loginLayer) WBtopGlobal_loginLayer(d);
		else {
			if (b) return;
			b = !0;
			a.core.io.scriptLoader({
				url: c,
				onComplete: function() {
					b = !1;
					window.WBtopGlobal_loginLayer(d)
				},
				timeout: 1e4,
				onTimeout: function() {
					b = !1
				}
			})
		}
	}
});
STK.register("lib.kit.io.cssLoader", function(a) {
	var b = "",
		c = "http://img.t.sinajs.cn/t4/",
		d = "http://timg.sjs.sinajs.cn/t4/";
	if (typeof $CONFIG != "undefined") {
		c = $CONFIG.cssPath || c;
		b = $CONFIG.version || ""
	}
	var e = {};
	return function(f, g, h, i, j) {
		i = i || b;
		h = h ||
		function() {};
		var k = function(a, b) {
				var c = e[a] || (e[a] = {
					loaded: !1,
					list: []
				});
				if (c.loaded) {
					b(a);
					return !1
				}
				c.list.push(b);
				return c.list.length > 1 ? !1 : !0
			},
			l = function(a) {
				var b = e[a].list;
				for (var c = 0; c < b.length; c++) b[c](a);
				e[a].loaded = !0;
				delete e[a].list
			};
		if ( !! k(f, h)) {
			var m;
			j ? m = d + f : m = c + f + "?version=" + i;
			var n = a.C("link");
			n.setAttribute("rel", "Stylesheet");
			n.setAttribute("type", "text/css");
			n.setAttribute("charset", "utf-8");
			n.setAttribute("href", m);
			document.getElementsByTagName("head")[0].appendChild(n);
			var o = a.C("div");
			o.id = g;
			a.core.util.hideContainer.appendChild(o);
			var p = 3e3,
				q = function() {
					if (parseInt(a.core.dom.getStyle(o, "height")) == 42) {
						a.core.util.hideContainer.removeChild(o);
						l(f)
					} else if (--p > 0) setTimeout(q, 10);
					else {
						a.log(f + "timeout!");
						a.core.util.hideContainer.removeChild(o);
						delete e[f]
					}
				};
			setTimeout(q, 50)
		}
	}
});
STK.register("lib.dialog.authentication", function(a) {
	return function(b) {
		var c = a.lib.kit.extra.language,
			d = a.core.util.browser;
		b = a.parseParam({
			src: "http://weibo.com/a/verify/realname?stage=home_verification",
			icon: "warn",
			isHold: !0,
			width: "380px",
			height: "240px",
			title: c("#L{帐号验证}")
		}, b || {});
		var e = {},
			f, g, h = !1,
			i = "tblog_checkfailed_reform",
			j = {
				init: function() {
					f = a.ui.dialog(b);
					var c = [];
					c.push('<iframe id="account_authentication" name="account_authentication" node-type="frame" width="' + b.width + '" height="' + b.height + '" allowtransparency="true" scrolling="no" frameborder="0" src=""></iframe>');
					var d = a.builder(c.join(""));
					f.setTitle(b.title);
					f.setContent(d.box);
					var e = f.getDomList()
				},
				show: function() {
					try {
						window.SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_box")
					} catch (c) {}
					h || a.lib.kit.io.cssLoader("style/css/module/layer/layer_check_identity.css", "js_style_css_module_layer_check_identity", function() {
						h = !0
					});
					f.show().setMiddle();
					g = a.E("account_authentication");
					var d = decodeURIComponent(b.src) + "&rnd=";
					g.attachEvent ? g.attachEvent("onload", function() {
						g.height = b.height;
						f.setMiddle()
					}) : g.onload = function() {
						g.height = b.height;
						f.setMiddle()
					};
					g.src = d + a.core.util.getUniqueKey()
				},
				destroy: function() {},
				hook: function(a, b) {
					try {
						a == "100000" ? j.verifySucc() : j.verifyFail()
					} catch (c) {}
				},
				verifySucc: function() {
					window.SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_success");
					f.hide();
					var b = {
						title: c("#L{提示}"),
						icon: "success",
						OK: function() {
							window.SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_play");
							history.go(0)
						},
						OKText: c("#L{进入首页}"),
						msg: c("#L{恭喜，您的身份已验证成功，马上进入微博。}")
					},
						d = a.ui.alert(b.msg, b);
					a.custEvent.add(d, "hide", function() {
						history.go(0)
					})
				},
				verifyFail: function() {
					window.SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_twotimes");
					f.hide();
					var b = {
						title: c("#L{提示}"),
						icon: "warn",
						OK: function() {
							SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_triple");
							j.show()
						},
						OKText: c("#L{再次验证}"),
						msg: c("#L{抱歉，您的身份信息不准确，请再次验证。<br/>}") + '<a class="S_spetxt" suda-data="key=tblog_checkfailed_reform&value=checkfailed_havealook" href="http://weibo.com">' + c("#L{您也可以先体验微博，随后再验证身份信息>>}") + "</a>"
					},
						d = a.ui.alert(b.msg, b);
					a.custEvent.add(d, "hide", function() {
						history.go(0)
					})
				}
			};
		j.init();
		e.destroy = j.destory;
		e.show = j.show;
		window.App = window.App || {};
		window.App.checkRealName = j.hook;
		return e
	}
});
STK.register("lib.dialog.ioError", function(a) {
	var b = a.lib.kit.extra.language,
		c, d;
	return function(d, e, f) {
		var g = {},
			h, i, j = function() {},
			k = {
				init: function() {
					k.data()
				},
				data: function() {
					i = a.parseParam({
						auto: !0,
						call: j,
						ok: j,
						cancel: j,
						beside: null
					}, f);
					h = a.parseParam({
						location: "",
						oKText: b("#L{确 定}"),
						cancelText: b("#L{取 消}"),
						suda: ""
					}, e.data);
					h.msg = e.msg || b("#L{系统繁忙}");
					e.data && e.data.OKText && (h.okText = e.data.OKText);
					h.OK = function() {
						a.preventDefault();
						var b = a.queryToJson(h.suda || "");
						b = b.ok || {};
						window.SUDA && SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
						i.ok();
						h.location && (window.location.href = h.location)
					};
					h.cancel = function() {
						a.preventDefault();
						var b = a.queryToJson(h.suda || "");
						b = b.cancel || {};
						window.SUDA && SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
						i.cancel()
					}
				},
				run: function() {
					var a = l[e.code] || l[100001];
					return a() || i.call(h, e)
				},
				destroy: function() {
					c && c.destroy()
				}
			},
			l = {
				100001: function() {
					i.beside ? a.ui.tipAlert(h.msg, a.core.json.merge(h, {
						autoHide: !1,
						icon: "warnS"
					})).beside(i.beside) : a.ui.alert(h.msg.split("\\n"), a.core.json.merge(h, {
						icon: "warnB"
					}))
				},
				100002: function() {
					a.lib.dialog.loginLayer({
						lang: window.$CONFIG && window.$CONFIG.lang || "zh-cn"
					})
				},
				100003: function() {
					i.beside ? a.ui.tipConfirm(h.msg, h).beside(i.beside) : a.ui.confirm(h.msg.split("\n"), h)
				},
				100004: function() {
					c || (c = a.lib.dialog.authentication());
					c.show()
				},
				100008: function() {
					a.lib.dialog.loginLayer({
						lang: window.$CONFIG && window.$CONFIG.lang || "zh-cn"
					})
				}
			};
		k.init();
		g.getdata = function() {
			return h
		};
		g.getAction = function(a) {
			return a ? l[a] : l
		};
		g.getCode = function() {
			return e.code || ""
		};
		g.run = k.run;
		i.auto && k.run();
		return g
	}
});
STK.register("conf.trans.validateCode", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("checkValidate", {
		url: "/aj/pincode/verified",
		method: "post"
	});
	return b
});
STK.register("lib.dialog.validateCode", function(a) {
	var b = window.$LANG,
		c = a.lib.kit.extra.language,
		d = "/aj/pincode/pin?_wv=5&type=rule&lang=" + $CONFIG.lang + "&ts=",
		e = {
			dialog_html: '<div class="layer_point layer_verification"><div class="clearfix"><div class="v_img W_fl"><img height="25" width="250" class="yzm_img"/></div><div class="v_change W_fl"><a href="javascript:void(0);" class="yzm_change" action-type="yzm_change"><span class="W_ficon ficon_rotate S_ficon">e</span><span class="font S_txt1">#L{换一组}</span></a></div></div><div class="v_text yzm_wng"><span class="v_text">#L{请输入上面问题的答案}：</span><input type="text" class="yzm_input ontext W_input" action-type="yzm_input"/></div><div class="W_layer W_layer_pop yzm_error" style="display:none;top:70px;left:200px;"><div class="content layer_mini_info"><p class="main_txt"><i class="W_icon icon_rederrorS"></i><span class="txt S_txt1"></span><a class="W_ficon ficon_close S_ficon yzm_hideError">X</a></p><div class="W_layer_arrow"><span class="W_arrow_bor W_arrow_bor_b"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div></div></div><div class="W_layer_btn S_bg1"><a class="W_btn_a btn_34px yzm_submit" href="javascript:void(0);" action-type="yzm_submit">#L{确定}</a><a class="W_btn_b btn_34px yzm_cancel" href="javascript:void(0);" action-type="yzm_cancel" action-data="value=frombtn">#L{取消}</a></div>'
		},
		f;
	return function() {
		if (f) return f;
		var b = {},
			g = {},
			h, i, j, k, l = function() {
				g.yzm_error.innerHTML = "";
				g.yzm_error_layer.style.display = "none";
				a.removeClassName(g.yzm_wng, "v_wrong")
			},
			m = function(b) {
				g.yzm_error.innerHTML = b;
				g.yzm_error_layer.style.display = "";
				a.addClassName(g.yzm_wng, "v_wrong")
			},
			n = function() {
				a.lib.kit.io.cssLoader("style/css/module/layer/layer_verifycode.css", "js_style_css_module_layer_layer_verifycode", function() {
					h || o();
					l();
					h.setTop();
					h.show();
					t.changesrc();
					h.setMiddle();
					g.input_text.value = "";
					a.hotKey.add(document.documentElement, ["esc"], t.closeDialog, {
						type: "keyup",
						disableInInput: !0
					})
				})
			},
			o = function() {
				h = a.ui.dialog({
					isHold: !0
				});
				h.setTitle(c("#L{请输入验证码}"));
				h.setContent(c(e.dialog_html));
				h.on("hide", t.closeEvt);
				var b = h.getBox();
				s(b);
				u()
			},
			p = function(b) {
				a.conf.trans.validateCode.request("checkValidate", {
					onError: function() {
						m(c("#L{验证码错误}"));
						t.changesrc();
						j = !1;
						g.input_text.value = ""
					},
					onFail: function() {
						m(c("#L{验证码错误}"));
						t.changesrc();
						g.input_text.value = "";
						j = !1
					},
					onSuccess: function(b, c) {
						j = !1;
						var d = b.data.retcode;
						l();
						g.input_text.value = "";
						h.hide();
						var e = i.requestAjax,
							f = a.lib.kit.extra.merge(i.param, {
								retcode: d
							});
						e.request(f)
					}
				}, b)
			},
			q = function() {},
			r = function() {},
			s = function(b) {
				g.vImg = a.core.dom.sizzle("img.yzm_img", b)[0];
				g.yzm_change = a.core.dom.sizzle("a.yzm_change", b)[0];
				g.yzm_submit = a.core.dom.sizzle("a.yzm_submit", b)[0];
				g.yzm_cancel = a.core.dom.sizzle("a.yzm_cancel", b)[0];
				g.input_text = a.core.dom.sizzle("input.yzm_input", b)[0];
				g.yzm_wng = a.core.dom.sizzle("div.yzm_wng", b)[0];
				g.yzm_error = a.core.dom.sizzle("div.yzm_error span.txt", b)[0];
				g.yzm_error_layer = a.core.dom.sizzle("div.yzm_error", b)[0];
				g.yzm_hideError = a.core.dom.sizzle(".yzm_hideError", b)[0]
			},
			t = {
				enter: function() {
					a.fireEvent(g.yzm_submit, "click")
				},
				changesrc: function() {
					var b = d + a.getUniqueKey();
					g.vImg.setAttribute("src", b);
					try {
						g.yzm_change.blur()
					} catch (c) {}
				},
				checkValidateCode: function() {
					l();
					var b = a.core.str.trim(g.input_text.value);
					b ? j || p({
						secode: b,
						type: "rule"
					}) : m(c("#L{请输入验证码}"));
					try {
						g.yzm_submit.blur()
					} catch (d) {}
				},
				closeEvt: function() {
					typeof i == "object" && i.onRelease && typeof i.onRelease == "function" && i.onRelease();
					a.hotKey.remove(document.documentElement, ["esc"], t.closeDialog, {
						type: "keyup"
					})
				},
				closeDialog: function(b) {
					typeof b == "object" && b.el && h.hide();
					typeof i == "object" && i.onRelease && typeof i.onRelease == "function" && i.onRelease();
					a.hotKey.remove(document.documentElement, ["esc"], t.closeDialog, {
						type: "keyup"
					});
					try {
						a.preventDefault()
					} catch (c) {}
				},
				onFocus: function(b) {
					b = a.core.evt.getEvent();
					var c = b.target || b.srcElement,
						d = c.value;
					d || l()
				}
			},
			u = function() {
				var b = h.getBox();
				k = a.core.evt.delegatedEvent(b);
				k.add("yzm_change", "click", function() {
					t.changesrc();
					a.preventDefault()
				});
				k.add("yzm_submit", "click", function() {
					t.checkValidateCode();
					a.preventDefault()
				});
				k.add("yzm_cancel", "click", t.closeDialog);
				a.core.evt.addEvent(g.yzm_hideError, "click", l);
				a.core.evt.addEvent(g.input_text, "focus", t.onFocus);
				a.core.evt.addEvent(g.input_text, "blur", t.onFocus);
				a.hotKey.add(g.input_text, ["enter"], t.enter, {
					type: "keyup"
				})
			},
			v = function() {
				if (h) {
					k.destroy();
					a.core.evt.removeEvent(g.yzm_hideError, "click", l);
					a.core.evt.removeEvent(g.input_text, "focus", t.onFocus);
					a.core.evt.removeEvent(g.input_text, "blur", t.onFocus);
					h && h.destroy && h.destroy()
				}
				j = h = f = null
			},
			w = function(a, b, c) {
				if (a.code == "100027") {
					i = c;
					n()
				} else if (a.code === "100000") try {
					var d = c.onSuccess;
					d && d(a, b)
				} catch (e) {} else try {
					var d = c.onError;
					d && d(a, b)
				} catch (e) {}
			};
		r();
		r = null;
		b.destroy = v;
		b.validateIntercept = w;
		b.addUnloadEvent = function() {
			h && a.core.evt.addEvent(window, "unload", v)
		};
		f = b;
		return b
	}
});
STK.register("lib.editor.plugin.count", function(a) {
	function e(a, b) {
		if (!a.textEl) throw "[editor plugin count]: plz check nodeList"
	}
	function d(a, b) {
		var d = c(a),
			e = Math.abs(b - d),
			f;
		d > b || d < 1 ? f = {
			wordsnum: d,
			vnum: e,
			overflow: !0
		} : d == 0 ? f = {
			wordsnum: d,
			vnum: e,
			overflow: !0
		} : f = {
			wordsnum: d,
			vnum: e,
			overflow: !1
		};
		return f
	}
	function c(b) {
		var c = 41,
			d = 140,
			e = 20,
			f = b,
			g = b.match(/(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\,\:;@&=\?~#%]*)*/gi) || [],
			h = 0;
		for (var i = 0, j = g.length; i < j; i++) {
			var k = a.core.str.bLength(g[i]);
			if (/^(http:\/\/t.cn)/.test(g[i])) continue;
			/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
			f = f.replace(g[i], "")
		}
		var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
		return l
	}
	var b;
	return function(c) {
		var f = c.nodeList,
			g, h = c.opts,
			i = a.lib.kit.extra.language;
		b = h.limitNum;
		e(f);
		a.core.evt.custEvent.define(c, "textNum");
		a.custEvent.define(c, "keyUpCount");
		var j = f.textEl,
			k = f.num;
		a.addEvent(j, "focus", function() {
			g = setInterval(function() {
				l()
			}, 200)
		});
		a.addEvent(j, "blur", function() {
			clearInterval(g)
		});
		var l = function() {
				var b = a.core.str.trim(j.value).length == 0 ? a.core.str.trim(j.value) : j.value,
					e = c && c.opts && c.opts.extendText;
				b = b.replace(/\r\n/g, "\n");
				var f = d(b, h.limitNum);
				b.length >= 0 && j.focus ? f.overflow && f.wordsnum != 0 ? k.innerHTML = (e ? i(e) : "") + i("#L{已经超过%s字}", '<span class="S_error">' + f.vnum + "</span>") : k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入%s字}", "<span>" + f.vnum + "</span>") : b.length === 0 && (k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入%s字}", "<span>" + f.vnum + "</span>"));
				a.core.evt.custEvent.fire(c, "textNum", {
					count: f.wordsnum,
					isOver: f.overflow
				})
			};
		STK.core.evt.addEvent(j, "keyup", l);
		a.custEvent.add(c, "keyUpCount", l)
	}
});
STK.register("conf.trans.at", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("followList", {
		url: "/aj/mblog/attention"
	});
	c("topicList", {
		url: "/aj/mblog/topic"
	});
	c("stockList", {
		url: "/aj/mblog/stock"
	});
	return b
});
STK.register("lib.kit.dom.layoutPos", function(a) {
	return function(b, c, d) {
		if (!a.isNode(c)) throw "lib.kit.dom.layerOutElement need element as first parameter";
		if (c === document.body) return !1;
		if (!c.parentNode) return !1;
		if (c.style.display === "none") return !1;
		var e, f, g, h, i, j, k;
		e = a.parseParam({
			pos: "left-bottom",
			offsetX: 0,
			offsetY: 0
		}, d);
		f = c;
		if (!f) return !1;
		while (f !== document.body) {
			f = f.parentNode;
			if (f.style.display === "none") return !1;
			j = a.getStyle(f, "position");
			k = f.getAttribute("layout-shell");
			if (j === "absolute" || j === "fixed") break;
			if (k === "true" && j === "relative") break
		}
		f.appendChild(b);
		g = a.position(c, {
			parent: f
		});
		h = {
			w: c.offsetWidth,
			h: c.offsetHeight
		};
		i = e.pos.split("-");
		i[0] === "left" ? b.style.left = g.l + e.offsetX + "px" : i[0] === "right" ? b.style.left = g.l + h.w + e.offsetX + "px" : i[0] === "center" && (b.style.left = g.l + h.w / 2 + e.offsetX + "px");
		i[1] === "top" ? b.style.top = g.t + e.offsetY + "px" : i[1] === "bottom" ? b.style.top = g.t + h.h + e.offsetY + "px" : i[1] === "middle" && (b.style.top = g.t + h.h / 2 + e.offsetY + "px");
		return !0
	}
});
STK.register("lib.kit.extra.textareaUtils", function(a) {
	var b = {},
		c = document.selection;
	b.selectionStart = function(a) {
		if (!c) try {
			return a.selectionStart
		} catch (b) {
			return 0
		}
		var d = c.createRange(),
			e, f, g = 0,
			h = document.body.createTextRange();
		try {
			h.moveToElementText(a)
		} catch (b) {}
		for (g; h.compareEndPoints("StartToStart", d) < 0; g++) h.moveStart("character", 1);
		return g
	};
	b.selectionBefore = function(a) {
		return a.value.slice(0, b.selectionStart(a))
	};
	b.selectText = function(a, b, d) {
		a.focus();
		if (!c) a.setSelectionRange(b, d);
		else {
			var e = a.createTextRange();
			e.collapse(1);
			e.moveStart("character", b);
			e.moveEnd("character", d - b);
			e.select()
		}
	};
	b.insertText = function(a, d, e, f) {
		a.focus();
		f = f || 0;
		if (!c) {
			var g = a.value,
				h = e - f,
				i = h + d.length;
			a.value = g.slice(0, h) + d + g.slice(e, g.length);
			b.selectText(a, i, i)
		} else {
			var j = c.createRange();
			j.moveStart("character", -f);
			j.text = d
		}
	};
	b.replaceText = function(a, d) {
		a.focus();
		var e = a.value,
			f = b.getSelectedText(a),
			g = f.length;
		if (f.length == 0) b.insertText(a, d, b.getCursorPos(a));
		else {
			var h = b.getCursorPos(a);
			if (!c) {
				var j = h + f.length;
				a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
				b.setCursor(a, h + d.length);
				return
			}
			var i = c.createRange();
			i.text = d;
			b.setCursor(a, h + d.length)
		}
	};
	b.getCursorPos = function(a) {
		var b = 0;
		if (STK.core.util.browser.IE) {
			a.focus();
			var d = null;
			d = c.createRange();
			var e = d.duplicate();
			e.moveToElementText(a);
			e.setEndPoint("EndToEnd", d);
			a.selectionStartIE = e.text.length - d.text.length;
			a.selectionEndIE = a.selectionStartIE + d.text.length;
			b = a.selectionStartIE
		} else if (a.selectionStart || a.selectionStart == "0") b = a.selectionStart;
		return b
	};
	b.getSelectedText = function(a) {
		var b = "",
			d = function(a) {
				return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
			};
		window.getSelection ? b = d(a) : b = c.createRange().text;
		return b
	};
	b.setCursor = function(a, b, c) {
		b = b == null ? a.value.length : b;
		c = c == null ? 0 : c;
		a.focus();
		if (a.createTextRange) {
			var d = a.createTextRange();
			d.move("character", b);
			d.moveEnd("character", c);
			d.select()
		} else a.setSelectionRange && a.setSelectionRange(b, b + c)
	};
	b.unCoverInsertText = function(a, b, c) {
		c = c == null ? {} : c;
		c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
		c.rccl = c.rccl == null ? 0 : c.rccl * 1;
		var d = a.value,
			e = d.slice(0, c.rcs),
			f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
		a.value = e + b + f;
		this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
	};
	return b
});
STK.register("lib.kit.dom.isTurnoff", function(a) {
	return function(a) {
		return !a.parentNode || a.parentNode.nodeType == 11 || !! a.disabled
	}
});
STK.register("lib.kit.dom.cssText", function(a) {
	var b = function(a, b) {
			var c = (a + ";" + b).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"),
				d;
			while (c && (d = c.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i))) c = c.replace(d[1] + d[2] + d[3], "");
			return c
		};
	return function(a) {
		a = a || "";
		var c = [],
			d = {
				push: function(a, b) {
					c.push(a + ":" + b);
					return d
				},
				remove: function(a) {
					for (var b = 0; b < c.length; b++) c[b].indexOf(a + ":") == 0 && c.splice(b, 1);
					return d
				},
				getStyleList: function() {
					return c.slice()
				},
				getCss: function() {
					return b(a, c.join(";"))
				}
			};
		return d
	}
});
STK.register("lib.editor.at", function(a) {
	var b = a.lib.kit.dom.cssText,
		c = a.lib.kit.dom.isTurnoff,
		d = a.lib.kit.extra.textareaUtils,
		e = window,
		f = document,
		g = a.core.util.browser,
		h = "",
		i = d.selectionStart,
		j, k, l, m, n, o = function() {
			var a = {
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"\\": "&#92;",
				"&": "&amp;",
				"'": "&#039;",
				"\r": "",
				"\n": "<br>",
				" ": (navigator.userAgent.match(/.+(?:ie) ([\d.]+)/i) || [8])[1] < 8 ? ['<pre style="overflow:hidden;display:inline;', h, 'word-wrap:break-word;"> </pre>'].join("") : ['<span style="white-space:pre-wrap;', h, '"> </span>'].join("")
			};
			return function(b) {
				var c = b.replace(/(<|>|\"|\\|&|\'|\n|\r| )/g, function(b) {
					return a[b]
				});
				return c
			}
		}(),
		p = function() {
			var c = [],
				d = j.textEl.style.cssText,
				e;
			a.foreach(["margin", "padding", "border"], function(b) {
				a.foreach(["Top", "Left", "Bottom", "Right"], function(d) {
					var e;
					b != "border" ? e = c.push(b, "-", d.toLowerCase(), ":", a.getStyle(j.textEl, b + d), ";") : a.foreach(["Style", "Width"], function(e) {
						c.push(b, "-", d.toLowerCase(), "-", e.toLowerCase(), ":", a.getStyle(j.textEl, [b, d, e].join("")), ";")
					})
				})
			});
			c.push("font-size:" + a.getStyle(j.textEl, "fontSize") + ";");
			return b([d, c.join(""), h, "\n\t\tword-wrap: break-word;\n\t\tline-height: 18px;\n\t\toverflow-y:auto;\n\t\toverflow-x:hidden;\n\t\toutline:none;\n\t"].join("")).getCss()
		},
		q = function() {
			var b = a.builder(['<div node-type="wrap" style="display:none;">', '<span node-type="before"></span>', '<span node-type="flag"></span>', '<span node-type="after"></span>', "</div>"].join("")).list,
				c = b.wrap[0],
				d = b.flag[0],
				e = b.after[0],
				h = b.before[0],
				i = 0,
				k, l, m, q = function(a) {
					return g.MOZ ? -2 : g.MOBILE && g.SAFARI && (g.IPAD || g.ITOUCH || g.IPHONE) ? -2 : 0
				};
			return {
				bind: function() {
					if (l !== j.textEl) {
						n = a.position(j.textEl);
						var b = ["left:", n.l, "px;top:", n.t + 20, "px;"].join("");
						l = j.textEl;
						var d = p();
						l.style.cssText = d;
						m = [b, d, "\n\t\t\t\tposition:absolute;\n\t\t\t\tfilter:alpha(opacity=0);\n\t\t\t\topacity:0;\n\t\t\t\tz-index:-1000;\n\t\t\t"].join("");
						c.style.cssText = m;
						if (!i) {
							i = 1;
							f.body.appendChild(c)
						}
					}
				},
				content: function(b, f, g, i) {
					c.style.cssText = [m, "\n\t\t\t\twidth:", (parseInt(a.getStyle(l, "width")) || l.offsetWidth) + q(), "px;\n\t\t\t\theight:", parseInt(a.getStyle(l, "height")) || l.offsetHeight, "px;\n\t\t\t\toverflow-x:hidden;\n\t\t\t\toverflow-y:", /webkit/i.test(navigator.userAgent) ? "hidden" : a.getStyle(l, "overflowY"), ";\n\t\t\t"].join("");
					h.innerHTML = o(b);
					d.innerHTML = o(f) || "&thinsp;";
					e.innerHTML = o([g, i].join(""));
					clearTimeout(k);
					k = setTimeout(function() {
						var b = a.position(d);
						a.custEvent.fire(j.eId, "at", {
							t: b.t - l.scrollTop - n.t,
							l: b.l - n.l,
							fl: b.l,
							key: g,
							flag: f,
							textarea: j.textEl
						})
					}, 30)
				},
				hide: function() {
					c.style.display = "none"
				},
				show: function() {
					c.style.display = ""
				}
			}
		}(),
		r = function() {
			if (c(j.textEl)) clearInterval(k);
			else {
				var b = j.textEl.value.replace(/\r/g, ""),
					d = i(j.textEl);
				if (d < 0 || d == m) return;
				m = d;
				var e = b.slice(0, d),
					f = e.match(new RegExp(["(", j.flag, ")([a-z/[A-Z0-9/\\]一-龥_-]{0,20})$"].join("")));
				if (!f) {
					a.custEvent.fire(j.eId, "hidden");
					return
				}
				var g = b.slice(d);
				e = e.slice(0, -f[0].length);
				q.content(e, f[1], f[2], g)
			}
		};
	return function(b) {
		if ( !! b && !! b.textEl) {
			b = a.parseParam({
				textEl: null,
				flag: "@",
				eId: a.custEvent.define({}, ["at", "hidden"])
			}, b);
			var c = function() {
					if ( !! j) {
						clearInterval(k);
						a.removeEvent(j.textEl, "blur", c);
						q.hide()
					}
				},
				d = function() {
					c();
					j = b;
					m = null;
					q.bind();
					q.show();
					k = setInterval(r, 200);
					a.addEvent(b.textEl, "blur", c)
				};
			a.addEvent(b.textEl, "focus", d);
			return b.eId
		}
	}
});
STK.register("lib.editor.plugin.at", function(a) {
	var b = a.lib.kit.extra.language,
		c = '<div class="layer_menu_list"><ul node-type="suggestWrap"></ul></div>',
		d = '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.screen_name}" value="${list.screen_name}" ><a href="javascript:void(0);">${list.screen_name}<#if (list.remark)>(${list.remark})</#if></a></li><#if (list.count)><span>${list.count}</span></#if></#list></#et>',
		e = '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.topic}" value="${list.topic}" ><a href="javascript:void(0);">${list.topic}</a></li></#list></#et>',
		f = '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.stock}" value="${list.stock}" ><a href="javascript:void(0);">${list.stock}</a></li></#list></#et>',
		g = {
			"@": {
				trans: "followList",
				itemTemplate: d,
				title: {
					normal: b("#L{选择昵称或轻敲空格完成输入}"),
					more: b("#L{选择最近@的人或直接输入}"),
					no: b("#L{轻敲空格完成输入}")
				},
				needClose: !1
			},
			"#": {
				trans: "topicList",
				itemTemplate: e,
				title: {
					normal: b("#L{想用什么话题？}")
				},
				needClose: !0
			},
			$: {
				trans: "stockList",
				itemTemplate: f,
				title: {
					normal: b("#L{输入股票名/股票代码}")
				},
				needClose: !0
			}
		},
		h = function(a) {
			return "\\" + a
		},
		i, j, k, l, m, n, o, p, q = !1,
		r = 0,
		s = function() {
			setTimeout(function() {
				a.custEvent.fire(i, "close")
			}, 200)
		},
		t = function() {
			m.style.display = "none"
		},
		u = function() {
			a.custEvent.add(i, "onIndexChange", function(a, b) {
				A(b)
			});
			a.custEvent.add(i, "onSelect", function(b, c, d, e) {
				r = 0;
				a.core.evt.stopEvent();
				var f = p[c].getAttribute("value") + "";
				e === "@" && (f = f.replace(/\(.*\)/, ""));
				try {
					d.focus()
				} catch (j) {}
				var k = a.lib.kit.extra.textareaUtils;
				k.replaceText(d, "");
				var l = k.selectionStart(d) * 1,
					m = new RegExp(h(e) + "([a-z/[A-Z0-9/\\]一-龥_-]{0,20})$"),
					n = d.value.replace(/\r+/g, "").slice(0, l).match(m),
					o = d.value.slice(l, l + 1);
				n = n && n[1] ? n[1].length : 0;
				g[e].needClose ? typeof o != "undefined" && o != e && (f = f + e + " ") : f = f + " ";
				k.insertText(d, f, l, n);
				var q = k.getCursorPos(d);
				if (g[e].needClose && o == e) {
					k.setCursor(d, q + 1);
					k.insertText(d, " ", q + 1, 0)
				}
				q = k.getCursorPos(d);
				var s = k.getSelectedText(d),
					t = s == "" || s == null ? 0 : s.length;
				d.setAttribute("range", q + "&" + t);
				a.custEvent.fire(i, "close")
			});
			a.addEvent(k.textEl, "blur", s);
			a.custEvent.add(i, "onClose", t);
			a.custEvent.add(i, "onOpen", function(b, c) {
				l.style.display = "";
				m.style.display = "";
				q = !0;
				setTimeout(function() {
					a.custEvent.fire(i, "indexChange", 0)
				}, 100)
			})
		},
		v = function(b) {
			a.custEvent.remove(b);
			a.removeEvent(k.textEl, "blur", s)
		},
		w = function(b, c, d) {
			var e = g[b].title,
				f = g[b].itemTemplate;
			e.more && e.no ? c.data && c.data.length > 0 ? c.title = d == "" ? e.more : e.normal : c.title = e.no : c.title = e.normal;
			return a.core.util.easyTemplate(f, c)
		},
		x = function() {
			a.core.evt.custEvent.add(j, "hidden", function(b, c) {
				a.custEvent.fire(i, "close")
			});
			a.core.evt.custEvent.add(j, "at", function(b, c) {
				n = c.key;
				var d = c.flag;
				if (n.length == 0 && !(d in g) || c.textarea && !c.textarea.value) a.custEvent.fire(i, "close");
				else var e = a.conf.trans.at.request(g[d].trans, {
					onSuccess: function(b, e) {
						var f = w(d, b, n);
						a.custEvent.fire(i, "openSetFlag", d);
						a.custEvent.fire(i, "open", c.textarea);
						var g = a.core.dom.builder(f),
							h = g.box;
						l.innerHTML = h;
						m.style.cssText = ["z-index:11001;background-color:#ffffff;position:absolute;"].join("");
						var j = c.l;
						document.body.clientWidth < c.fl + a.core.dom.getSize(m).width && c.fl > a.core.dom.getSize(m).width && (j = c.l - a.core.dom.getSize(m).width);
						var k = 0;
						a.winSize().height - c.textarea.getBoundingClientRect().bottom < 200 ? k = -l.offsetHeight - 4 : k = c.t;
						a.lib.kit.dom.layoutPos(m, c.textarea, {
							pos: "left-top",
							offsetX: j,
							offsetY: k
						})
					},
					onError: function() {
						a.custEvent.fire(i, "close")
					}
				}, {
					q: encodeURIComponent(n)
				})
			})
		},
		y = function() {
			o = k.textEl;
			var b = [];
			for (var c in g) b.push(h(c));
			b = "[" + b.join("|") + "]";
			j = a.lib.editor.at({
				textEl: o,
				flag: b
			})
		},
		z = function(b) {
			r = 0;
			m && (m.style.display = "none");
			m && (m.innerHTML = "");
			a.removeNode(m);
			m = STK.C("div");
			document.body.appendChild(m);
			if (m.innerHTML.length == 0) {
				m.innerHTML = c;
				l = a.core.dom.sizzle('[node-type="suggestWrap"]', m)[0];
				m.style.display = "none"
			}
			if (i) {
				a.custEvent.fire(i, "close");
				v(i)
			}
			i = a.ui.mod.suggest({
				textNode: b,
				uiNode: l,
				actionType: "item",
				actionData: "value",
				flag: "@"
			});
			u()
		},
		A = function(b) {
			p = a.sizzle("li[class!=suggest_title]", l);
			p && p[0] && a.core.dom.removeClassName(p[r], "cur");
			a.core.dom.addClassName(p[b], "cur");
			r = b
		};
	return function(a, b) {
		k = a.nodeList;
		var c = {};
		c.init = function() {
			y();
			z(k.textEl);
			x()
		};
		return c
	}
});
STK.register("lib.editor.plugin.sucTip", function(a) {
	return function(b, c) {
		var d = b.nodeList,
			e = {},
			f = function(c) {
				var c = c || {},
					e = a.core.obj.parseParam({
						className: "send_succpic",
						innerHTML: "",
						delay: 2
					}, c);
				d.successTip.className = e.className;
				d.successTip.innerHTML = e.innerHTML;
				a.core.evt.custEvent.fire(b, "setSucTipDelay", e.delay)
			},
			g = function(a) {
				if (!a || !a.getTime) a = new Date;
				var b = {
					year: a.getFullYear(),
					mouth: a.getMonth() + 1,
					date: a.getDate(),
					hours: a.getHours(),
					minutes: a.getMinutes(),
					seconds: a.getSeconds()
				};
				return b
			},
			h = {
				theEnd: function(a, b) {
					var c = g(b.time);
					if (c.year == 2012 && c.mouth == 12 && c.date == 21 && c.hours >= 10) {
						var d = !1;
						c.seconds % 5 == 0 && (d = !0);
						b.text.indexOf("末日") != -1 && (d = !0);
						b.text.indexOf("玛雅") != -1 && (d = !0);
						b.text.indexOf("登船") != -1 && (d = !0);
						d ? f({
							className: "send_success_over2",
							innerHTML: '<a target="_blank" href="http://huati.weibo.com/z/2013/"></a>',
							delay: 3
						}) : f()
					} else c.year == 2012 && c.mouth == 12 && c.date == 22 && c.hours <= 14 ? f({
						className: "send_success_over1",
						innerHTML: '<a target="_blank" href="http://huati.weibo.com/z/2013/"></a>',
						delay: 3
					}) : f({})
				}
			},
			i = function() {
				a.core.evt.custEvent.define(b, "theEnd");
				a.core.evt.custEvent.add(b, "theEnd", h.theEnd)
			},
			j = function() {
				i()
			};
		e.init = j;
		return e
	}
});
STK.register("lib.publisher.source.formdata", function(a) {
	return function(b) {
		function g() {
			var c = {},
				d = a.sizzle("[name]", b);
			for (var e in d) {
				var f = d[e].getAttribute("name"),
					g = d[e].getAttribute("value");
				f && g && (c[f] = g)
			}
			return c
		}
		function f(c) {
			var d = a.sizzle('[name="' + c + '"]', b);
			d[0] && a.removeNode(d[0])
		}
		function e(c, d) {
			var e = a.sizzle('[name="' + c + '"]', b);
			e[0] && e[0].setAttribute("value", d)
		}
		function d(c) {
			var d = a.sizzle('[name="' + c + '"]', b);
			return d[0] ? d[0].getAttribute("value") : "ABSENT"
		}
		if (!b) return !1;
		var c = {},
			b = b;
		c = {
			get: d,
			set: e,
			del: f,
			read: g,
			node: b
		};
		return c
	}
});
STK.register("lib.kit.extra.refreshpl", function(a) {
	return function(b, c) {
		function g(c, e) {
			var g = f(b);
			if ( !! g) {
				var h = FM.getURL().path,
					i = a.queryToJson(FM.getURL().query);
				i.pids = g;
				var j = a.jsonToQuery(i),
					k = "";
				if (d) {
					i = i ? i : "";
					k = h + "?" + j + "#_0";
					FM.setState(k, e)
				} else {
					k = h + "?" + i;
					window.location.href = k
				}
			}
		}
		function f(b) {
			var c = [];
			a.foreach(a.sizzle(b), function(a, b) {
				c.push(e(a))
			});
			return c[0] ? c.join("|") : !1
		}
		function e(a) {
			return !a || a == document.body ? !1 : a.id ? a.id : e(a.parentNode)
		}
		var d = $CONFIG.bigpipe === "true";
		g(c || {})
	}
});
STK.register("lib.editor.plugin.score", function(a) {
	return function(b, c) {
		function s(b, c) {
			if (q !== b || r !== c) {
				var i = b % 1 != 0,
					j = b / 1 | 0,
					l = -1;
				c && (l = i ? j : j - 1);
				a.foreach(k, function(a, b) {
					var c = f;
					if (j) {
						c = l === b ? e : d;
						j -= 1
					} else if (i) {
						c = l === b ? h : g;
						i = !1
					}
					a.className = c
				});
				q = b;
				r = c
			}
		}
		if ( !! (b && b.nodeList && b.nodeList.score)) {
			var d = "s_star_a",
				e = "l_star_a",
				f = "s_star_b",
				g = "s_star_c",
				h = "l_star_b",
				i = {},
				j = b.nodeList.reviewadd,
				k = a.sizzle("a", j),
				l = 0;
			a.foreach(k, function(b) {
				switch (a.trim(b.className)) {
				case d:
					l += 1;
					break;
				case g:
				case h:
					l += .5
				}
			});
			var m = a.delegatedEvent(b.nodeList.score),
				n = a.lib.publisher.source.formdata(b.nodeList.extradata),
				o = a.lib.kit.extra.language,
				p = {.5: o("#L{很差}"),
					1: o("#L{很差}"),
					1.5: o("#L{一般}"),
					2: o("#L{一般}"),
					2.5: o("#L{还行}"),
					3: o("#L{还行}"),
					3.5: o("#L{不错}"),
					4: o("#L{不错}"),
					4.5: o("#L{怒赞}"),
					5: o("#L{怒赞}")
				},
				q, r, t = {
					reviewadd: function(c) {
						var c = a.fixEvent(c),
							d = a.position(j),
							e = {
								height: j.offsetHeight,
								width: j.offsetWidth
							};
						if (c.pageY > d.t && c.pageY < d.t + e.height && c.pageX > d.l && c.pageX < d.l + e.width) {
							var f = c.pageX - d.l,
								g = Math.floor(f / e.width * 10 + 1) / 2;
							s(g, !0);
							b.nodeList.score_title && (b.nodeList.score_title.innerHTML = p[g])
						} else {
							s(l);
							b.nodeList.score_title && (b.nodeList.score_title.innerHTML = p[l] || "&nbsp;")
						}
					},
					add: function(c) {
						var d = a.position(j),
							e = c.data,
							f = c.evt.pageX - d.l,
							g = {
								height: j.offsetHeight,
								width: j.offsetWidth
							};
						e.score = Math.floor(f / g.width * 10 + 1) / 2;
						a.conf.trans.publisher.getTrans("reviewadd", {
							onSuccess: function(c) {
								l = e.score;
								s(l, !0);
								c.data.score_title && b.nodeList.score_title && (b.nodeList.score_title.innerHTML = c.data.score_title);
								n.set("score", e.score);
								c.data.prefixtext && n.set("prefixtext", c.data.prefixtext);
								c.data.refreshpl && a.lib.kit.extra.refreshpl('[node-type="' + c.data.refreshpl + '"]');
								a.custEvent.fire(b, "keyUpCount")
							},
							onError: function(b) {
								a.lib.dialog.ioError(b.code, b)
							},
							onFail: function() {
								a.lib.dialog.ioError(json.code, json)
							}
						}).request(e)
					}
				},
				u = function() {
					a.addEvent(document.body, "mousemove", t.reviewadd);
					m.add("reviewadd", "click", t.add)
				},
				v = function() {
					u()
				};
			v();
			i.destroy = function() {
				a.removeEvent(document.body, "mousemove", t.reviewadd);
				m.remove("reviewadd", "click", t.add)
			};
			return i
		}
	}
});
STK.register("conf.trans.face", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("face", {
		url: "/aj/mblog/face?type=face&_wv=5"
	});
	c("magicFace", {
		url: "/aj/mblog/face?type=ani&_wv=5"
	});
	return b
});
STK.register("lib.face.face", function(a) {
	function h(b) {
		if (f.length) {
			b(f);
			return !0
		}
		a.conf.trans.face.request("face", {
			onSuccess: function(a, c) {
				f = [];
				a.data.usual.norm && f.push({
					name: g,
					hotmap: a.data.usual.hot.slice(0, 12),
					map: a.data.usual.norm
				});
				for (var d in a.data.more) a.data.more.hasOwnProperty(d) && f.push({
					name: d,
					map: a.data.more[d]
				});
				b(f)
			},
			onError: function(b, c) {
				a.lib.dialog.ioError(b.code, b)
			}
		}, {});
		return !1
	}
	var b = a.lib.kit.extra.language,
		c = ["first", "second", "third", "fouth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"],
		d = {
			"默认": "default",
			"浪小花": "langxiaohua",
			"暴走漫画": "baozou",
			"小恐龙": "konglong",
			"冷兔": "lengtu",
			"明星表情": "star",
			"郭斯特": "ghost",
			"癫当": "diandang",
			"阿狸": "ali",
			"BOBO和TOTO": "boto",
			"搞怪": "gaoguai",
			"小纯洁": "chunjie",
			"罗小黑": "xiaohei",
			"白骨精": "baigujing",
			"hello菜菜": "hello",
			"面瘫萝卜": "miantan",
			"阿拉兔": "alatu",
			"小幺鸡": "yaoji",
			"心情": "mood",
			"摩丝摩丝": "mosi",
			"桂宝": "guibao",
			"懒猫猫": "lanmaomao",
			"彼尔德": "bierde",
			"天气": "weather",
			"休闲": "relax",
			"炮炮兵": "paopao",
			"哎呦熊": "eiyou",
			"块猫": "kuaimao",
			"柏夫": "baifu",
			"萌萌": "mengmeng",
			"管不着": "guanbuzhe",
			"臭臭": "chouchou",
			nonopanda: "nonopanda",
			"恐龙宝贝": "konglongbaobei",
			"影子": "shadow",
			"大耳兔": "daertu",
			"哈皮兔": "hapitu",
			"星座": "xingzuo",
			"爱心": "aixin",
			"张小盒": "zhangxiaohe",
			"悠嘻猴": "youxihou",
			"小新小浪": "xinlang",
			"大熊": "daxiong",
			"蘑菇点点": "mogu",
			"酷库熊": "kuku"
		},
		e = '<div class="W_layer W_layer_pop"><div class="content"><div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div><div class="layer_faces"><div class="WB_minitab"><ul class="minitb_ul S_line1 S_bg1 clearfix"><li class="minitb_item S_line1" node-type="tab"><a href="javascript:void(0);" class="minitb_lk S_txt1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><span class="cur_block"></span></li><li class="minitb_item S_line1" node-type="tab"><a href="javascript:void(0);" class="minitb_lk S_txt1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><span class="cur_block"></span></li><li class="minitb_item S_line1" node-type="tab"><a href="javascript:void(0);" class="minitb_lk S_txt1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><span class="cur_block"></span></li><li class="minitb_item S_line1" node-type="tab"><a href="javascript:void(0);" class="minitb_lk S_txt1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><span class="cur_block"></span></li><li class="minitb_item S_line1" node-type="tab"><a href="javascript:void(0);" class="minitb_lk S_txt1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><span class="cur_block"></span></li></ul><ul class="W_fr minitb_ul S_line1 S_bg1 clearfix"><li class="minitb_more S_line1" node-type="prev" action-type="prev"> <a href="javascript:void(0);" class="minitb_lk S_txt1"><i class="W_ficon ficon_arrow_left_lite S_ficon">j</i></a></li><li class="minitb_more S_line1" node-type="next" action-type="next"> <a href="javascript:void(0);" class="minitb_lk S_txt1"><i class="W_ficon ficon_arrow_right_lite S_ficon">i</i></a></li></ul></div><div class="faces_list_box"><div class="faces_list" node-type="scrollView"><div node-type="list"></div></div></div></div><div class="W_layer_arrow"><span class="W_arrow_bor" node-type="arrow"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div></div>',
		f = [],
		g = b("#L{默认}");
	return function(b, f) {
		var g = a.ui.bubble(e, {
			clickBlankToHide: !0,
			stopClickPropagation: !0,
			autoRelease: !0,
			showWithAni: "fadeInDown:fast",
			hideWithAni: "fadeOutUp:fast"
		});
		a.custEvent.define(g, "insert");
		var i = g.getDomList(!0).list,
			j = [].concat(g.getDomList(!0).tab),
			k, l = 0,
			m = 0;
		h(function(b) {
			function e() {
				a.foreach(j, function(c, d) {
					d = d + m;
					a.removeClassName(c, "current");
					if (b[d]) {
						if (d === l) {
							a.addClassName(c, "current");
							c.innerHTML = '<a href="javascript:void(0);" class="minitb_lk S_txt1 S_bg2" action-type="tab" action-data="index=' + d + '">' + b[d].name + '</a><span class="cur_block"></span>'
						} else c.innerHTML = '<a href="javascript:void(0);" class="minitb_lk S_txt1" action-type="tab" action-data="index=' + d + '">' + b[d].name + '</a><span class="cur_block"></span>';
						c.title = b[d].name
					} else {
						c.innerHTML = '<a href="javascript:void(0);" class="minitb_lk S_txt1"></a><span class="cur_block"></span>';
						c.title = ""
					}
					c.offsetWidth
				});
				m <= 0 ? a.addClassName(g.getDomList().prev, "W_btn_b_disable") : a.removeClassName(g.getDomList().prev, "W_btn_b_disable");
				m >= b.length - 5 ? a.addClassName(g.getDomList().next, "W_btn_b_disable") : a.removeClassName(g.getDomList().next, "W_btn_b_disable")
			}
			g.on("tab", "click", function(e) {
				l = e.data.index | 0;
				a.foreach(j, function(b, c) {
					a.removeClassName(b, "current");
					a.removeClassName(b.firstChild, "S_bg2")
				});
				a.addClassName(e.el.parentNode, "current");
				a.addClassName(e.el, "S_bg2");
				var f = "",
					h;
				if (b[l].hotmap) {
					f += '<ul class="faces_list_hot clearfix">';
					a.foreach([].concat(b[l].hotmap), function(a, b) {
						h = 'suda="key=mainpub_default_expr&value=' + c[b] + '"';
						f += '<li action-type="select" action-data="insert=' + encodeURIComponent(a.phrase) + '" title="' + a.phrase.replace(/\[|\]/g, "") + '" ' + h + '><img src="' + a.icon + '"/></li>'
					});
					f += "</ul>"
				}
				f += "<ul>";
				a.foreach([].concat(b[l].map), function(a) {
					h = 'suda="key=pub_expression&value=' + d[b[l].name] + '"';
					f += '<li action-type="select" action-data="insert=' + encodeURIComponent(a.phrase) + '" title="' + a.phrase.replace(/\[|\]/g, "") + '" ' + h + '><img src="' + a.icon + '"/></li>'
				});
				f += "</ul>";
				i.innerHTML = f;
				i.offsetWidth;
				k || (k = a.ui.scrollView(g.getDomList(!0).scrollView));
				setTimeout(function() {
					k.reset();
					k.scrollTop(0)
				})
			});
			g.on("prev", "click", function(a) {
				m = Math.max(m - 5, 0);
				e()
			});
			g.on("next", "click", function(a) {
				m = Math.min(m + 5, b.length - 5);
				e()
			});
			g.on("select", "click", function(b) {
				var c = a.sizzle("img", b.el)[0].getAttribute("src");
				g.trigger("insert", {
					value: decodeURIComponent(b.data.insert),
					url: c
				});
				var d = b.el.getAttribute("suda");
				if (d) {
					d = a.queryToJson(d);
					window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(d.key, d.value)
				}
			});
			g.on("beforeHide", function() {
				k.scrollEl.style.overflowY = "hidden"
			});
			g.on("hide", function() {
				if (k) {
					k.destroy();
					k = null
				}
			});
			e();
			g.trigger(j[0].firstChild, "click", null)
		});
		g.getBub = function() {
			return g
		};
		f.refer ? g.show().setArrow("top").setAlignPos(b, f.refer, f) : g.show().beside(b, f);
		return g
	}
});
STK.register("lib.publisher.widget.face", function(a) {
	var b = a.lib.face.face;
	return function(c, d) {
		var e = {},
			f, g;
		d = a.core.json.merge({
			t: 0,
			l: -15,
			refer: c.nodeList.textEl,
			useAlign: !0,
			arrowOffset: 2,
			clickToHide: !1
		}, d || {});
		var h = function(a, b) {
				var e = c.API.getCurrentLogType();
				c.API.addShortUrlLog(e);
				c.API.insertText(b.value);
				d.clickToHide && f.getBub().hide()
			},
			i = function() {
				a.core.evt.preventDefault();
				var g, i = a.fixEvent(a.getEvent()).target;
				g = i;
				f = b(g, d);
				a.custEvent.add(f, "insert", h);
				a.custEvent.define(c, "close");
				a.custEvent.add(c, "close", e.hide);
				a.custEvent.add(f, "hide", function() {
					a.custEvent.remove(f, "hide", arguments.callee);
					a.custEvent.remove(f, "insert", h);
					a.custEvent.remove(c, "close", e.hide)
				})
			};
		e.init = function(b, d, e) {
			c = b;
			g = d;
			a.addEvent(b.nodeList[g], "click", i)
		};
		e.show = i;
		e.hide = function() {
			f && f.getBub().hide()
		};
		e.destroy = function() {
			c = null
		};
		return e
	}
});
STK.register("conf.trans.topic", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("getTopic", {
		url: "/aj/v6/mblog/trend"
	});
	return b
});
STK.register("lib.topic.publishTopicBubble", function(a) {
	var b = a.lib.kit.extra.language,
		c = b('<div class="W_layer W_layer_pop"><div class="content"><div class="W_layer_title"><div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div></div><div class="layer_send_topic"><div class="layer_send_btn clearfix"><ul class="clearfix"><li class="S_line2 li_s3"><a href="javascript:void(0);" action-type="blank_topic" action-data="text=##L{在这里输入你想要说的话题}#" class="W_btn_l"><span class="btn_45px"><em class="W_ficon ficon_add_topic S_ficon">Î</em>#L{插入话题}</span></a></li></ul></div><div class="topic_box"><div class="tit">#L{热门推荐}：</div><ul class="topic_ul clearfix" node-type="topic_list"></ul></div></div><div class="W_layer_arrow"><span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div></div>'),
		d, e, f, g, h, i = {},
		j = function() {
			f = a.ui.bubble(c, {
				showWithAni: "fadeInDown:fast",
				hideWithAni: "fadeOutUp:fast",
				clickBlankToHide: !0,
				showWithSetWidth: !1
			});
			d = f.getDomList(!0);
			g = f.getBox();
			h = d.topic_list;
			n();
			var b = a.conf.trans.topic.request("getTopic", {
				onComplete: function(a, b) {
					l(a.data)
				}
			}, {})
		},
		k = function() {
			j();
			m.add();
			a.custEvent.add(f, "hidden", function(b) {
				return function() {
					a.custEvent.remove(b, "hidden", arguments.callee);
					m.destroy();
					b && b.destroy && b.destroy()
				}
			}(f))
		},
		l = function(a) {
			h.innerHTML = a
		},
		m = {
			add: function() {
				a.custEvent.add(i, "hide", function() {
					f.hide()
				})
			},
			destroy: function() {
				a.custEvent.remove(i, "blank_topic");
				a.custEvent.remove(i, "hide");
				a.custEvent.remove(i, "insert")
			}
		},
		n = function() {
			a.custEvent.define(i, "blank_topic");
			a.custEvent.define(i, "insert");
			a.custEvent.define(i, "hide");
			var b = STK.core.evt.delegatedEvent(g);
			b.add("add_topic", "click", function(b) {
				a.preventDefault(b.evt);
				a.custEvent.fire(i, "insert", {
					value: b.data.text
				})
			});
			b.add("blank_topic", "click", function(b) {
				a.preventDefault(b.evt);
				a.custEvent.fire(i, "blank_topic", {
					value: b.data.text
				})
			})
		};
	i.getBub = function() {
		return f
	};
	return function(b, c) {
		if (!a.isNode(b)) throw "common.bubble.topic need el as first parameter!";
		k();
		f.show().setArrow("top").setAlignPos(b, c.refer);
		return i
	}
});
STK.register("lib.publisher.widget.topic", function(a) {
	return function(b) {
		var c = {},
			d, e, f = !1,
			g = a.lib.kit.extra.textareaUtils,
			h = {
				text: "#在这里输入你想要说的话题#"
			},
			i = function(a, d) {
				b.API.insertText(d.value);
				c.hide()
			},
			j = function(a, d) {
				var e = d.value,
					f = b.nodeList.textEl,
					h = f.value,
					i = e.length;
				if (h.indexOf(e) != -1) {
					var j = h.indexOf(e);
					g.setCursor(f, j + 1 + i)
				} else {
					b.API.insertText(e + " ");
					var k = g.getCursorPos(f);
					g.setCursor(f, k)
				}
				c.hide();
				var l = b.API.getCurrentLogType();
				b.API.addShortUrlLog(l)
			},
			k = function(a, d) {
				var e = g.getSelectedText(b.nodeList.textEl),
					f = e.length * 1;
				if (f == 0 || h.text.indexOf(e) > -1) j(a, d);
				else {
					var i = "#" + e + "#";
					g.replaceText(b.nodeList.textEl, i);
					c.hide()
				}
			},
			l = function() {
				a.custEvent.add(d, "insert", j);
				a.custEvent.add(d, "blank_topic", k);
				a.custEvent.add(b, "close", c.hide);
				a.custEvent.add(d, "hide", function() {
					a.custEvent.remove(d, "blank_topic");
					a.custEvent.remove(d, "hide", arguments.callee);
					a.custEvent.remove(d, "insert");
					a.custEvent.remove(b, "close")
				})
			},
			m = function() {
				a.core.evt.preventDefault();
				var c, e = a.fixEvent(a.getEvent()).target;
				a.contains(b.nodeList.widget, e) ? c = e : c = b.nodeList.more;
				d = a.lib.topic.publishTopicBubble(c, {
					refer: b.nodeList.textEl
				});
				f || l()
			};
		c.init = function(c, d, f) {
			b = c;
			e = d;
			a.addEvent(c.nodeList[e], "click", m)
		};
		c.clear = function() {};
		c.show = m;
		c.hide = function() {
			d && d.getBub().hide()
		};
		c.destroy = function() {
			b = null
		};
		return c
	}
});
STK.register("lib.publisher.widget.settime", function(a) {
	function f(a, b) {
		return (Array(b).join(0) + a).slice(-b)
	}
	var b = a.lib.kit.extra.language,
		c = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
		d = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
		e = b('<#et settimetip data><div class="set_timer S_line1 S_bg1 clearfix" node-type="settime" style="display: none;"><span class="set_date_txt W_fl">#L{发布时间：}</span><div class="set_data_mod W_fl S_line3 clearfix" action-type="settime_data" action-data="start=${data.startDate}&end=${data.endDate}"><input type="text" value="${data.startDate}" class="ipt W_fl" readonly="true" node-type="settime_data"> <i class="icon_calendar W_fr"></i></div><select class="sel_time S_line1 W_fl" action-type="settime_hour" node-type="settime_hour"><#list data.hourList as eachHour><option value="${eachHour}" <#if (eachHour_index == data.hour)>selected="true"</#if> >${eachHour}</option></#list></select><span class="set_time_txt W_fl">#L{时}</span><select class="sel_time S_line1 W_fl" action-type="settime_min" node-type="settime_min"><#list data.minuteList as eachMinute><option value="${eachMinute}" <#if (eachMinute_index == data.minute)>selected="true"</#if> >${eachMinute}</option></#list></select><span class="set_time_txt W_fl">#L{分}</span><a title="#L{取消发布定时微博}" href="javascript:void()" action-type="close" class="W_ficon ficon_close S_ficon">X</a><a target="_top" href="http://weibo.com/${data.uid}/profile?profile_ftype=1&timefeed=1" node-type="timing_blog_manage" class="rt_txt W_fr">#L{管理待发布微博}</a></div></#et>');
	return function(b) {
		var g = {},
			h, i = function() {
				b.nodeList.settime ||
				function() {
					var g = new Date(+(new Date) + 3e5),
						h = new Date(+g + 1728e5),
						i = a.builder(a.core.util.easyTemplate(e, {
							hourList: c,
							minuteList: d,
							startDate: [g.getFullYear(), f(g.getMonth() + 1, 2), f(g.getDate(), 2)].join("-"),
							endDate: [h.getFullYear(), f(h.getMonth() + 1, 2), f(h.getDate(), 2)].join("-"),
							hour: g.getHours(),
							minute: g.getMinutes(),
							uid: $CONFIG.uid
						}).toString()).list;
					b.nodeList.textElDiv.appendChild(i.settime[0]);
					for (var j in i) b.nodeList[j] || (b.nodeList[j] = i[j][0])
				}();
				b.nodeList.settime.style.display = "";
				a.addClassName(b.nodeList.textElDiv, "input_set_timer");
				var g = a.delegatedEvent(b.nodeList.settime),
					i = {
						settime_date: function(c) {
							var d = (c.data.end || "").split(" ")[0],
								e = (c.data.start || "").split(" ")[0];
							!h && (h = a.ui.calendar({
								start: e || mTime().ymd,
								end: d,
								callback: function(a) {
									b.nodeList.settime_data.value = a;
									i.changed();
									h.hide()
								}
							}));
							h.show(c.el, {
								appendTo: document.body,
								pos: "bottom-left"
							})
						},
						settime_hour: function() {},
						settime_min: function() {},
						changed: function() {
							var a = b.nodeList.settime_data.value + " " + b.nodeList.settime_hour.value + ":" + b.nodeList.settime_min.value;
							b.nodeList.textEl.setAttribute("settime", a)
						},
						reset: function() {
							a.removeClassName(b.nodeList.textElDiv, "input_set_timer");
							b.nodeList.textEl.setAttribute("settime", "")
						},
						close: function() {
							i.reset()
						}
					},
					j = function() {
						g.add("settime_data", "click", i.settime_date);
						g.add("close", "click", i.close);
						a.addEvent(b.nodeList.settime_data, "change", i.changed);
						a.addEvent(b.nodeList.settime_hour, "change", i.changed);
						a.addEvent(b.nodeList.settime_min, "change", i.changed);
						a.core.evt.custEvent.define(b, "resettime");
						a.core.evt.custEvent.add(b, "resettime", i.reset)
					};
				j();
				i.changed()
			};
		g.init = function(c, d, e) {
			b = c;
			aim = d;
			a.addEvent(c.nodeList[aim], "click", i)
		};
		g.destroy = function() {};
		g.show = i;
		return g
	}
});
STK.register("lib.publisher.widget.widgetloader", function(a) {
	return function(b, c) {
		var d = a.lib.publisher.widget;
		c = a.parseParam({
			widget: b.nodeList.widget,
			devent: ""
		}, c || {});
		var e = {},
			f, g, h, i = {
				list: ["face", "topic", "settime"],
				entity: {},
				widgetList: {},
				func: function(a) {
					return function(c) {
						c.data.isimage ? b.API.setImageLogType(c.data.log) : b.API.setCurrentLogType(c.data.log);
						i.widgetList[a] || (i.widgetList[a] = d[a](b));
						i.widgetList[a].show()
					}
				}
			},
			j = {
				init: function() {
					j.bind()
				},
				bind: function() {
					a.custEvent.define(b, "close");
					f = c.devent ? c.devent : a.delegatedEvent(c.widget);
					for (var e = 0, j = i.list.length; e < j; e++) {
						var k = i.list[e];
						i.entity[k] = i.func(k);
						f.add(k, "click", i.entity[k])
					}
					g = d.plugin(b, c);
					h = d.imgPreview(b)
				},
				close: function() {
					a.custEvent.fire(b, "close", {
						type: "publish"
					})
				},
				destroy: function() {
					for (var a = 0, b = i.list.length; a < b; a++) {
						var c = i.list[a];
						f.remove(c, "click", i.entity[c])
					}
					for (var d in i.widgetList) i.widgetList[d].destroy && i.widgetList[d].destroy();
					g.destroy();
					h.destroy()
				}
			};
		j.init();
		e.close = j.close;
		e.destroy = j.destroy;
		return e
	}
});
STK.register("lib.editor.plugin.morePlugin", function(a) {
	var b = a.lib.kit.extra.language;
	return function(b) {
		var c = {},
			d, e, f, g, h = !1,
			i = {
				number: 4,
				defNumber: 2
			},
			j = {
				list: [],
				data: {},
				add: function(a) {
					var b = a.type;
					j.data[b] = a
				},
				destroy: function() {
					j.list = [];
					j.data = {}
				}
			},
			k, l = {
				init: function() {
					var c = a.queryToJson(b.nodeList.widget.getAttribute("node-data") || "");
					i = a.parseParam(i, c);
					l.buildMenu()
				},
				showMenu: function(b) {
					e.style.display = "";
					e.style.zIndex = "10000";
					var c = a.position(b),
						d = a.core.dom.getSize(b);
					a.core.dom.setXY(e, {
						t: c.t + d.height + 3,
						l: c.l - 5
					});
					a.ui.effect(e, "fadeInDown", "fast");
					window.SUDA && SUDA.uaTrack && SUDA.uaTrack("tblog_home_edit", 'unfold_more"')
				},
				hideMenu: function() {
					a.ui.effect(e, "fadeOutUp", "fast", function() {
						e.style.display = "none"
					})
				},
				buildMenu: function() {
					e = b.nodeList.morePlugin;
					if ( !! e) {
						document.body.appendChild(e);
						e.style.position = "absolute";
						a.lib.publisher.widget.widgetloader(b, {
							widget: e
						});
						l.menuEvt()
					}
				},
				menuEvt: function() {
					a.addEvent(e, "click", l.hideMenu)
				},
				destroy: function() {
					a.removeEvent(e, "click", l.hideMenu);
					d && d.destroy()
				}
			};
		l.init();
		c.menu = e;
		c.show = l.showMenu;
		c.hide = l.hideMenu;
		c.destroy = l.destroy;
		return c
	}
});
STK.register("lib.kit.dom.firstChild", function(a) {
	var b = a.core.dom.next;
	return function(a) {
		var c = a.firstChild;
		c && c.nodeType != 1 && (c = b(c));
		return c
	}
});
STK.register("lib.kit.dom.parseDOM", function(a) {
	return function(a) {
		for (var b in a) a[b] && a[b].length == 1 && (a[b] = a[b][0]);
		return a
	}
});
STK.register("lib.editor.count", function(a) {
	function b(b) {
		var c = 41,
			d = 140,
			e = 20,
			f = b,
			g = b.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [],
			h = 0;
		for (var i = 0, j = g.length; i < j; i++) {
			var k = a.core.str.bLength(g[i]);
			if (/^(http:\/\/t.cn)/.test(g[i])) continue;
			/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
			f = f.replace(g[i], "")
		}
		var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
		return l
	}
	return function(a) {
		a = a.replace(/\r\n/g, "\n");
		return b(a)
	}
});
STK.register("lib.editor.editor", function(a) {
	var b = a.addEvent,
		c = a.removeEvent,
		d = a.custEvent,
		e = a.getStyle,
		f = a.setStyle,
		g = a.lib.kit.dom.parseDOM,
		h = a.lib.kit.extra.textareaUtils,
		i = a.lib.editor.count;
	return function(e, f) {
		var j = {},
			f = f,
			k = {},
			l = "",
			m = "",
			n = "",
			o = {
				reset: function() {
					k.textEl.value = "";
					d.fire(j, "changed");
					k.textEl.removeAttribute("extra");
					l = m = n = ""
				},
				delWords: function(a) {
					var b = o.getWords();
					if (!(b.indexOf(a) > -1)) return !1;
					k.textEl.value = "";
					q.textInput(b.replace(a, ""))
				},
				getWords: function() {
					return a.core.str.trim(k.textEl.value)
				},
				getExtra: function() {
					var b, c = k.textEl.getAttribute("extra") || "";
					c != null && (b = a.core.str.trim(c));
					return b
				},
				focus: function(a, b) {
					if (typeof a != "undefined") h.setCursor(k.textEl, a, b);
					else {
						var c = k.textEl.value.length;
						h.setCursor(k.textEl, c)
					}
					p.cacheCurPos()
				},
				blur: function() {
					k.textEl.blur()
				},
				addExtraInfo: function(a) {
					typeof a == "string" && k.textEl.setAttribute("extra", a)
				},
				disableEditor: function(a) {
					c(k.textEl, "mouseup", p.cacheCurPos);
					if (a === !0) k.textEl.setAttribute("disabled", "disabled");
					else {
						b(k.textEl, "mouseup", p.cacheCurPos);
						k.textEl.removeAttribute("disabled")
					}
				},
				getCurPos: function() {
					var a = k.textEl.getAttribute("range") || "0&0";
					return a.split("&")
				},
				count: function() {
					var b = a.core.str.trim(k.textEl.value).length == 0 ? a.core.str.trim(k.textEl.value) : k.textEl.value;
					return i(b)
				},
				addShortUrlLog: function(b) {
					b = b && a.trim(b);
					if (b) {
						var c = new RegExp("^" + b + "$|" + "_" + b + "$|^" + b + "_|" + "_" + b + "_");
						c.test(l) || (l ? l = l + "_" + b : l = b)
					}
				},
				getShortUrlLog: function() {
					return l
				},
				setCurrentLogType: function(a) {
					m = a
				},
				getCurrentLogType: function() {
					return m
				},
				setImageLogType: function(a) {
					n = a
				},
				getImageLogType: function() {
					return n
				}
			},
			p = {
				textElFocus: function() {
					k.recommendTopic && a.core.dom.setStyle(k.recommendTopic, "display", "none");
					d.fire(j, "focus");
					k.num && a.core.dom.setStyle(k.num, "display", "");
					o.getWords() == f.tipText && o.delWords(f.tipText)
				},
				textElBlur: function() {
					setTimeout(function() {
						if (k.textEl.value.length === 0) {
							k.recommendTopic && a.core.dom.setStyle(k.recommendTopic, "display", "");
							k.num && k.recommendTopic && a.core.dom.setStyle(k.num, "display", "none");
							typeof f.tipText != "undefined" && (k.textEl.value = f.tipText)
						}
						d.fire(j, "blur")
					}, 50)
				},
				cacheCurPos: function() {
					var b = h.getSelectedText(k.textEl),
						c = b == "" || b == null ? 0 : b.length,
						d = a.core.dom.textSelectArea(k.textEl).start,
						e = d + "&" + c;
					k.textEl.setAttribute("range", e)
				}
			},
			q = {
				textChanged: function() {
					d.fire(j, "keyUpCount")
				},
				textInput: function(a, b) {
					var c = o.getCurPos(),
						b = c[0],
						e = c[1];
					o.getWords() == f.tipText && a != f.tipText && o.delWords(f.tipText);
					h.unCoverInsertText(k.textEl, a, {
						rcs: c[0],
						rccl: c[1]
					});
					p.cacheCurPos();
					d.fire(j, "changed")
				}
			},
			r = {},
			s = function() {
				v();
				w()
			},
			t = function() {
				x();
				z();
				A();
				u()
			},
			u = function() {
				f.storeWords ? k.textEl.value.length == 0 && q.textInput(f.storeWords) : f.tipText && (k.textEl.value = f.tipText)
			},
			v = function() {
				if (!e) throw "node is not defined in module editor"
			},
			w = function() {
				var b = a.core.dom.builder(e).list;
				k = g(b);
				if (!k.widget) throw "can not find nodes.widget in module editor"
			},
			x = function() {
				var a = k.textEl;
				b(a, "focus", p.textElFocus);
				b(a, "blur", p.textElBlur);
				b(a, "mouseup", p.cacheCurPos);
				b(a, "keyup", p.cacheCurPos)
			},
			y = function() {
				d.define(j, ["changed", "focus", "blur"])
			},
			z = function() {
				y();
				d.add(j, "changed", q.textChanged)
			},
			A = function() {},
			B = function() {
				d.remove(j);
				d.undefine(j);
				var a = k.textEl;
				c(a, "focus", p.textElFocus);
				c(a, "blur", p.textElBlur);
				c(a, "mouseup", p.cacheCurPos);
				c(a, "keyup", p.cacheCurPos)
			};
		s();
		var C = {
			reset: o.reset,
			getWords: o.getWords,
			getExtra: o.getExtra,
			delWords: o.delWords,
			focus: o.focus,
			blur: o.blur,
			insertText: q.textInput,
			check: q.textChanged,
			addExtraInfo: o.addExtraInfo,
			disableEditor: o.disableEditor,
			getCurPos: o.getCurPos,
			count: o.count,
			textElFocus: p.textElFocus,
			cacheCurPos: p.cacheCurPos,
			addShortUrlLog: o.addShortUrlLog,
			getShortUrlLog: o.getShortUrlLog,
			setCurrentLogType: o.setCurrentLogType,
			getCurrentLogType: o.getCurrentLogType,
			setImageLogType: o.setImageLogType,
			getImageLogType: o.getImageLogType
		};
		j.destroy = B;
		j.API = C;
		j.nodeList = k;
		j.init = t;
		j.opts = f;
		return j
	}
});
STK.register("lib.editor.base", function(a) {
	var b = a.lib.editor.service,
		c = a.lib.editor.plugin,
		d;
	return function(b, e) {
		var f = {},
			g, h, i, j;
		e = a.lib.kit.extra.merge({
			limitNum: 140
		}, e);
		var k = function(b) {
				var c = a.fixEvent(b).target;
				if (a.contains(i.nodeList.more, c) || c == i.nodeList.more) {
					l.showMenu();
					var d = a.lib.kit.dom.firstChild(i.nodeList.more);
					d && a.addClassName(d, "W_arrow_turn")
				} else {
					l.hideMenu();
					var d = a.lib.kit.dom.firstChild(i.nodeList.more);
					d && a.removeClassName(d, "W_arrow_turn")
				}
			},
			l = {
				init: function() {
					l.build();
					l.bind()
				},
				build: function() {
					i = a.lib.editor.editor(b, e);
					d = i.nodeList;
					j = c.at(i, e);
					(typeof e.count == "undefined" || e.count == "enable") && c.count(i);
					var f = c.sucTip(i, e),
						g = c.score(i, e);
					h = c.morePlugin(i, e);
					j.init();
					i.init();
					f.init()
				},
				bind: function() {
					i.nodeList.more && a.addEvent(document.body, "click", k)
				},
				showMenu: function() {
					h.show(i.nodeList.more)
				},
				hideMenu: function() {
					h.hide()
				},
				destroy: function() {
					i.destroy && i.destroy();
					j.destroy && j.destroy();
					h.destroy()
				},
				closeWidget: function() {}
			};
		l.init();
		f.editor = i;
		f.nodeList = d;
		f.destroy = l.destroy;
		f.closeWidget = l.closeWidget;
		return f
	}
});
STK.register("conf.trans.publishTo", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("list", {
		url: "/aj/f/group/list",
		method: "get"
	});
	c("chatlist", {
		url: "/aj/f/groupchat/list",
		method: "get"
	});
	return b
});
STK.register("lib.kit.extra.actionData", function(a) {
	return function(b) {
		return {
			set: function(c, d) {
				if ( !! a.isNode(b)) {
					var e = a.queryToJson(b.getAttribute("action-data") || "") || {};
					e[c] = d;
					b.setAttribute("action-data", a.jsonToQuery(e))
				}
			},
			del: function(c) {
				if ( !! a.isNode(b)) {
					var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
					delete d[c];
					b.setAttribute("action-data", a.jsonToQuery(d))
				}
			},
			get: function(c) {
				if (!a.isNode(b)) return "";
				var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
				return d[c] || ""
			}
		}
	}
});
STK.register("lib.publisher.widget.keyboardCapture", function(a) {
	var b = {
		13: "enter",
		27: "esc",
		32: "space",
		38: "up",
		40: "down",
		9: "tab"
	};
	return function(c, d) {
		d = d || {};
		var e = {},
			f, g = {
				keydown: function(c) {
					d.stopScroll && a.stopEvent();
					var f, g; !! (f = c) && !! (g = f.keyCode) && b[g] && a.custEvent.fire(e, b[g])
				}
			},
			h = {
				init: function() {
					h.pars();
					h.bind()
				},
				pars: function() {},
				bind: function() {
					for (var b in g) a.addEvent(c, b, g[b])
				},
				getKey: function(a) {
					return b[a]
				},
				destroy: function() {
					for (var b in g) a.removeEvent(c, b, g[b])
				}
			};
		h.init();
		e.getKey = h.getKey;
		e.destroy = h.destroy;
		return e
	}
});
STK.register("lib.kit.dom.textSelection", function(a) {
	return function(b, c) {
		var d, e;
		d = {};
		e = a.parseParam({}, c);
		var f = function(c) {
				return a.core.dom.selectText(b, c)
			},
			g = function() {
				b.__areaQuery = a.jsonToQuery(a.core.dom.textSelectArea(b))
			},
			h = function() {
				b.__areaQuery = !1
			};
		a.addEvent(b, "beforedeactivate", g);
		a.addEvent(b, "active", h);
		var i = function() {
				var c = null;
				try {
					c = a.core.dom.textSelectArea(b)
				} catch (d) {
					c = a.queryToJson(b.__areaQuery)
				}
				c.start === 0 && c.len === 0 && b.__areaQuery && (c = a.queryToJson(b.__areaQuery));
				c.start = parseInt(c.start, 10);
				c.len = parseInt(c.len, 10);
				return c
			},
			j = function(a, c) {
				var d = b.value,
					e = c.start,
					f = c.len || 0,
					g = d.slice(0, e),
					h = d.slice(e + f, d.length);
				b.value = g + a + h;
				d = null;
				g = null;
				h = null;
				var e = null,
					f = null
			};
		d.setCursor = function(a) {
			f(a)
		};
		d.getCursor = function() {
			return i()
		};
		d.insertCursor = function(a) {
			var b = i();
			j(a, b);
			b.len = a.length;
			f(b)
		};
		d.TempletCursor = function(c) {
			var d, e, g;
			d = i();
			d.len > 0 ? e = b.value.substr(d.start, d.len) : e = "";
			g = a.templet(c, {
				origin: e
			});
			j(g, d);
			d.start = d.start + c.indexOf("#{origin");
			d.len = g.length - c.replace(/#\{[origin].+?\}/, "").length;
			f(d)
		};
		d.insertText = j;
		d.destroy = function() {
			a.removeEvent(b, "beforedeactivate", g);
			a.removeEvent(b, "active", h);
			b = null
		};
		return d
	}
});
STK.register("lib.kit.dom.smartInput", function(a) {
	return function(b, c) {
		var d, e, f, g, h, i, j, k, l, m = "stop",
			n, o, p, q, r;
		d = a.parseParam({
			notice: "",
			currentClass: null,
			noticeClass: null,
			noticeStyle: null,
			maxLength: null,
			needLazyInput: !1,
			LazyInputDelay: 200
		}, c);
		e = a.cascadeNode(b);
		h = a.lib.kit.dom.textSelection(b);
		a.custEvent.define(e, "enter");
		a.custEvent.define(e, "ctrlEnter");
		a.custEvent.define(e, "lazyInput");
		f = function() {
			d.maxLength && a.bLength(b.value) > d.maxLength && (b.value = a.leftB(b.value, d.maxLength))
		};
		o = function() {
			if (b.value === d.notice) {
				b.value = "";
				d.noticeClass != null && a.removeClassName(b, d.noticeClass)
			}
			d.currentClass != null && a.addClassName(b.parentNode, d.currentClass)
		};
		p = function() {
			if (b.value === "") {
				b.value = d.notice;
				d.noticeClass != null && a.addClassName(b, d.noticeClass)
			}
			d.currentClass != null && a.removeClassName(b.parentNode, d.currentClass)
		};
		g = function() {
			f();
			return b.value === d.notice ? "" : b.value
		};
		q = function(b) {
			b.keyCode === 13 && a.custEvent.fire(e, "enter", g())
		};
		r = function(b) {
			(b.keyCode === 13 || b.keyCode === 10) && b.ctrlKey && a.custEvent.fire(e, "ctrlEnter", g())
		};
		i = function() {
			if (m === "stop") {
				l = setInterval(k, d.LazyInputDelay);
				m = "sleep"
			}
		};
		j = function() {
			clearInterval(l);
			m = "stop"
		};
		k = function() {
			if (n === b.value) if (m === "weakup") {
				a.custEvent.fire(e, "lazyInput", b.value);
				m = "sleep"
			} else m === "waiting" && (m = "weakup");
			else m = "waiting";
			n = b.value
		};
		if (d.needLazyInput) {
			a.addEvent(b, "focus", i);
			a.addEvent(b, "blur", j)
		}
		a.addEvent(b, "focus", o);
		a.addEvent(b, "blur", p);
		a.addEvent(b, "keyup", f);
		a.addEvent(b, "keydown", q);
		a.addEvent(b, "keydown", r);
		e.getValue = g;
		e.setValue = function(a) {
			b.value = a;
			f();
			return e
		};
		e.setNotice = function(a) {
			d.notice = a;
			return e
		};
		e.setNoticeClass = function(a) {
			d.noticeClass = a;
			return e
		};
		e.setNoticeStyle = function(a) {
			d.noticeStyle = a;
			return e
		};
		e.setMaxLength = function(a) {
			d.maxLength = a;
			return e
		};
		e.restart = function() {
			p()
		};
		e.startLazyInput = i;
		e.stopLazyInput = j;
		e.setCursor = h.setCursor;
		e.getCursor = h.getCursor;
		e.insertCursor = h.insertCursor;
		e.insertText = h.insertText;
		e.destroy = function() {
			if (d.needLazyInput) {
				a.removeEvent(b, "focus", o);
				a.removeEvent(b, "blur", p)
			}
			j();
			a.removeEvent(b, "focus", o);
			a.removeEvent(b, "blur", p);
			a.removeEvent(b, "keyup", f);
			a.removeEvent(b, "keydown", q);
			a.removeEvent(b, "keydown", r);
			a.custEvent.undefine(e, "enter");
			a.custEvent.undefine(e, "ctrlEnter");
			a.custEvent.undefine(e, "lazyInput");
			h.destroy();
			e = null
		};
		return e
	}
});
STK.register("conf.trans.groupMember", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("create", {
		url: "/aj/groupchat/create",
		method: "post"
	});
	c("update", {
		url: "/aj/groupchat/edit",
		method: "post"
	});
	c("userList", {
		url: "/aj/relation/groupallmembers",
		method: "get"
	});
	c("info", {
		url: "/aj/groupchat/query",
		method: "get"
	});
	c("setSummary", {
		url: "/aj/groupchat/setsummary",
		method: "post"
	});
	c("setAdmin", {
		url: "/aj/groupchat/setadmin",
		method: "post"
	});
	c("unsetAdmin", {
		url: "/aj/groupchat/unsetadmin",
		method: "post"
	});
	c("suggest", {
		url: "/aj/groupchat/attention",
		method: "get"
	});
	c("groupList", {
		url: "/aj/relation/grouplist",
		method: "get"
	});
	c("check", {
		url: "/aj/groupchat/getuser",
		method: "get"
	});
	c("getUser", {
		url: "/aj/groupchat/getlist",
		method: "get"
	});
	c("noticeClear", {
		url: "/aj/groupchat/clearnotice",
		method: "post"
	});
	c("agreeJoin", {
		url: "/aj/groupchat/allowjoinin",
		method: "post"
	});
	c("applyJoin", {
		url: "/aj/groupchat/applyjoinin",
		method: "post"
	});
	return b
});
STK.register("lib.group.groupMember", function(a) {
	var b = '<#et data data><#if (!data.islist)><div node-type="group_fan_tool"><div class="webim_tab_hd" node-type="group_fan_filternav"><div class="hd_mod S_line1 clearfix"><h3 class="W_fl W_fb">#L{最近联系人}</h3><div class="W_fr" ><a href="javascript:void(0);" action-type="group_fans_filter" suda-data="key=button_build_group&value=screen_fans"  action-data="type=2">#L{筛选粉丝}</a></div></div></div><div  node-type="group_fan_nav" style="display:none;"><div class="webim_tab_hd hd_two S_line1"><div class="back"><a href="javascript:void(0);" suda-data="key=button_build_group&value=back" action-type="group_fan_back" action-data="type=1" class="S_txt1"><em class="W_ficon ficon_back S_ficon">«</em></a></div><p class="title W_fb">#L{筛选粉丝}</p></div><div class="webim_tab_btn"><div class="WB_minitab"><ul class="minitb_ul S_line1 S_bg1 clearfix"><li class="minitb_item current S_line1" action-type="group_fan_tab" suda-data="key=button_build_group&value=intera_group"  node-type="group_fan_tab" action-data="type=2"><a href="javascript:void(0);" class="minitb_lk S_txt1 S_bg2" node-type="group_fan_tabtext">#L{忠诚度}</a><span class="cur_block"></span></li><li class="minitb_item S_line1" action-type="group_fan_tab" suda-data="key=button_build_group&value=fans" node-type="group_fan_tab" action-data="type=3"><a href="javascript:void(0);" class="minitb_lk S_txt1" node-type="group_fan_tabtext">#L{粉丝数}</a><span class="cur_block"></span></li></ul></div></div></div></div><div class="webim_tab_bd" ><div class="webim_contacts_group" node-type="group_fan_scrollC"><ul class="webim_contacts_list" node-type="group_list_c"></#if><#list data.list as item><li class="contacts SW_fun_bg clearfix" action-type="add_group_member"  action-data="uid=${item.id}&screen_name=<#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if>&profile_image_url=${item.profile_image_url}"><div class="head W_fl"><img width="30" height="30"  src="${item.profile_image_url}"></div><p class="name W_autocut W_fl S_txt1 W_f14"><#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if></p><div class="icon_mod W_fl"><#if (data.verified && data.verified_type == 0)><i title="微博个人认证" class="W_icon icon_approve"></i></#if></div><div class="icon_add W_fr"><a href="javascript:void(0);"   class="W_ficon ficon_add S_ficon">+</a></div></li></#list><#if (!data.islist)></ul></div></div></#if></#et>';
	return function(c, d) {
		var e = {
			offest: 50,
			isloading: !1,
			trans: "",
			page: 1,
			isEnd: !1,
			extraParam: {}
		},
			f = a.lib.kit.extra.language;
		d = a.parseParam({
			isAjax: !0,
			members: ""
		}, d || {});
		var g = {},
			h, i, j, k = a.conf.trans.groupMember,
			l = {
				getData: function() {
					i && clearInterval(i);
					e.trans && e.trans.abort();
					e.isloading = !0;
					var c = e.extraParam;
					c.page = e.page;
					e.trans = k.getTrans("getUser", {
						onSuccess: function(c) {
							var d = {
								list: c.data.users,
								islist: !0
							},
								g = a.core.util.easyTemplate(f(b), d).toString();
							e.isloading = !1;
							h.group_list_c.innerHTML = g;
							uiscroll.reset();
							i = setInterval(l.srcollEvent, 200)
						},
						onFail: function() {
							e.isloading = !1
						},
						onError: function() {
							e.isloading = !1
						}
					}).request(c)
				},
				srcollEvent: function() {
					if (!e.isloading) {
						if (e.isEnd) {
							clearInterval(i);
							return
						}
						if (uiscroll.scrollHeight() - uiscroll.offsetHeight() - uiscroll.scrollTop() <= e.offest) {
							e.isloading = !0;
							e.page = e.page + 1;
							e.trans && e.trans.abort();
							var c = e.extraParam;
							c.page = e.page;
							e.trans = k.getTrans("getUser", {
								onSuccess: function(c) {
									var d = {
										list: c.data.users,
										islist: !0
									},
										g = a.core.util.easyTemplate(f(b), d).toString();
									e.isloading = !1;
									a.core.dom.insertHTML(h.group_list_c, g, "beforeend");
									e.page >= c.data.total_page && (e.isEnd = !0)
								},
								onFail: function() {
									e.page = e.page - 1;
									e.isloading = !1
								},
								onError: function() {
									e.page = e.page - 1;
									e.isloading = !1
								}
							}).request(c)
						}
					}
				},
				addGroupMember: function(b) {
					a.custEvent.fire(g, "addMember", b.data)
				},
				addGroupInject: function(a) {
					return !1
				},
				groupFanBack: function(a) {
					h.group_fan_filternav.style.display = "";
					h.group_fan_nav.style.display = "none";
					e.page = 1;
					e.isloading = !1;
					e.isEnd = !1;
					e.extraParam = a.data;
					l.setListHeight();
					l.getData()
				},
				tabDomchange: function(b) {
					var c;
					a.foreach(h.group_fan_tab, function(b, d) {
						c = a.sizzle('[node-type="group_fan_tabtext"]', b)[0];
						c && a.core.dom.removeClassName(c, "S_bg2");
						a.core.dom.removeClassName(b, "current")
					});
					c = a.sizzle('[node-type="group_fan_tabtext"]', b)[0];
					a.core.dom.addClassName(b, "current");
					c && a.core.dom.addClassName(c, "S_bg2")
				},
				groupFanTab: function(b) {
					if (!a.core.dom.hasClassName(b.el, "current")) {
						l.tabDomchange(b.el);
						e.page = 1;
						e.isloading = !1;
						e.isEnd = !1;
						e.extraParam = b.data;
						l.setListHeight();
						l.getData()
					}
				},
				groupFansFilter: function(a) {
					h.group_fan_filternav.style.display = "none";
					h.group_fan_nav.style.display = "";
					e.page = 1;
					e.isloading = !1;
					e.isEnd = !1;
					e.extraParam = a.data;
					l.setListHeight();
					l.tabDomchange(h.group_fan_tab[0]);
					l.getData()
				},
				setListHeight: function() {
					var a = h.group_fan_tool.offsetHeight;
					h.group_fan_scrollC.style.height = d.height - a + "px"
				}
			},
			m = function() {
				h = a.lib.kit.dom.parseDOM(a.builder(c).list)
			},
			n = function() {
				var b = a.delegatedEvent(c);
				a.custEvent.define(g, ["addMember", "addGroup", "getUserInfo"]);
				b.add("add_group_member", "click", l.addGroupMember);
				b.add("add_group_inject", "click", l.addGroupInject);
				b.add("group_fans_filter", "click", l.groupFansFilter);
				b.add("group_fan_tab", "click", l.groupFanTab);
				b.add("group_fan_back", "click", l.groupFanBack)
			},
			o = function() {
				n();
				k.getTrans("getUser", {
					onSuccess: function(d) {
						var j = {
							list: d.data.users
						},
							k = a.core.util.easyTemplate(f(b), j).toString(),
							n = {
								currUser: d.data.viewer,
								addUser: d.data.members
							};
						a.custEvent.fire(g, "getUserInfo", n);
						c.innerHTML = k;
						m();
						l.setListHeight();
						uiscroll = a.ui.scrollView(h.group_fan_scrollC);
						e.page >= d.data.total_page && (e.isEnd = !0);
						i = setInterval(l.srcollEvent, 200)
					},
					onFail: function() {},
					onError: function() {}
				}).request({
					page: 1,
					members: d.members
				})
			};
		o();
		g.setHeight = function(a) {
			d.height = a;
			l.setListHeight();
			uiscroll.reset()
		};
		g.destroy = function() {
			i && clearInterval(i);
			dEvent.destroy()
		};
		return g
	}
});
STK.register("lib.group.gmemberSelect", function(a) {
	return function(b) {
		var c = a.lib.kit.extra.language,
			d = {
				ENTER: 13,
				ESC: 27,
				UP: 38,
				DOWN: 40,
				LEFT: 37,
				RIGHT: 39
			},
			e = 500,
			f = "",
			g, h, i, j, k = !1,
			l, m = '<div class="W_layer"><div class="content group_content"><div class="W_layer_hd"><div class="h_name_box clearfix" node-type="groupNamePanel"><p class="h_name W_fl W_autocut W_f14" node-type="titleText"></p><div class="h_change W_fl" action-type="editGroupName" suda-data="key=button_build_group&value=rev_name_group"  node-type="editGroupName" title="#L{修改群名称}"><em class="W_ficon ficon_edit S_ficon">7</em><span>#L{修改群名称}</span></div></div><div class="h_change_box clearfix" node-type="editGroupFrom" style="display:none;"><input name="" type="text" node-type="group_edit_input"  class="W_input W_fl" value="#L{输入群名称}"><a href="javascript:void(0);" class="W_btn_a W_fl" action-type="subimtEditGroup">#L{保存名称}</a><a href="javascript:void(0);" class="W_btn_b W_fl" action-type="cannelEditGroup">#L{取消}</a></div><div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div></div><div class="layer_msg_group"><ul class="group_nav S_line1 clearfix"><li class="W_fl S_line1 S_bg1 g_first">#L{添加群成员}</li><li class="W_fl S_bg1">已有成员 ( <span class="online" node-type="group_all_count">0</span>/<span class="all" node-type="maxConut">500</span> )<a href="http://weibo.com/" class="group_nav_href" node-type="batManage" style="display:none;">#L{批量管理}</a> </li></ul><div class="group_members clearfix"><div class="add_box S_bg1 W_fl"><div class="a_serch"><span class="WB_search_s"><input type="text" value="#L{查找联系人}"  class="W_input" node-type="group_search_input"><span class="pos"><a href="javascript:void(0);" title="#L{查找联系人}" class="W_ficon ficon_search S_ficon">f</a></span></span></div><div class="webim_contacts_bd" node-type="groupSelect"><div  node-type="groupMember"></div><div class="webim_tab_bd"><div node-type="searchLists" style="display:none;"></div></div></div></div><div class="existing_box W_fl"><div class="webim_contacts_bd" node-type="existing_box"><div class="webim_tab_bd"><div node-type="addUserLists" style="display:none;"><div class="webim_contacts_group mt10"><div class="webim_group_title webim_existing_title"><a href="javascript:void(0);" class="group_title_cont S_txt1"><span class="name" node-type="addUserCount"></span></a></div><ul class="webim_contacts_list" node-type="addUserListsContain"></ul></div><div class="W_layer_line S_line2" node-type="line" style="display:none;"></div></div><div class="webim_contacts_group mt10" node-type="joinMemberList"></div><div node-type="joinMemberListContain"></div></div></div></div></div></div><div class="W_layer_btn S_line1 S_bg1"><a href="javascript:void(0);" node-type="editsubmitBtn" action-type="groupPostSubmit" class="W_btn_a btn_34px W_btn_a_disable">#L{确定}</a><a href="javascript:void(0);" action-type="groupPostCannel" class="W_btn_b btn_34px">#L{取消}</a></div></div></div>',
			n = '<ul class="webim_contacts_list">#L{%s}</ul>',
			o = '<#et data data><#list data as item><li class="contacts SW_fun_bg clearfix" node-type="userItem" action-type="addMember" action-data="uid=<#if (item.id)>${item.id}<#else>${item.uid}</#if>&screen_name=<#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if>&profile_image_url=${item.profile_image_url}"><div class="head W_fl"><img width="30" height="30"  src="${item.profile_image_url}"></div><p class="name W_autocut W_fl S_txt1 W_f14"><#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if></p><div class="icon_mod W_fl"><#if (data.verified && data.verified_type == 0)><i title="微博个人认证" class="W_icon icon_approve"></i></#if></div><div class="icon_add W_fr"><a href="javascript:void(0);"  action-data="uid=<#if (item.id)>${item.id}<#else>${item.uid}</#if>&screen_name=<#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if>&profile_image_url=${item.profile_image_url}" class="W_ficon ficon_add S_ficon">+</a></div></li></#list></#et>',
			p = c('<#et data data><#list data as item><li class="contacts <#if (!item.nopower)> SW_fun_bg</#if> clearfix" node-type="addUserItem"><div class="head W_fl"><img width="30" height="30"  src="${item.profile_image_url}"></div><p class="name W_autocut W_fl S_txt1 W_f14"><#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if></p><div class="icon_mod W_fl"><#if (item.verified && item.verified_type == 0)><i title="微博个人认证" class="W_icon icon_approve"></i></#if></div><#if (item.is_owner)><div class="main W_fr"><a href="javascript:void(0);" class="icon_group icon_main" title="#L{群主}"></a></div><#elseif (item.is_admin)><#if (!item.nopower)><div class="close W_fr"><a href="javascript:void(0);" class="icon_group icon_admin" title="#L{群管理员}"></a><a href="javascript:void(0);" action-data="uid=<#if (item.id)>${item.id}<#else>${item.uid}</#if>&screen_name=<#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if>&profile_image_url="${item.profile_image_url}" class="W_ficon ficon_close S_ficon"<#if (item.actiontype)> action-type="${item.actiontype}" <#else> action-type="kickMember" </#if> >X</a></div><#else><div class="main W_fr"><a href="javascript:void(0);" class="icon_group icon_admin" title="#L{群管理员}"></a></div></#if><#else><div class="close W_fr"><a href="javascript:void(0);" action-data="uid=<#if (item.id)>${item.id}<#else>${item.uid}</#if>&screen_name=<#if (item.remark)>${item.remark}<#else>${item.screen_name}</#if>&profile_image_url="${item.profile_image_url}" class="W_ficon ficon_close S_ficon"<#if (item.actiontype)> action-type="${item.actiontype}" <#else> action-type="kickMember" </#if> >X</a></div></#if></li></#list></#et>'),
			q = c('<#et data data><li class="contacts  clearfix" node-type="addUserItem"><div class="head W_fl"><img width="30" height="30" src="${data.profile_image_url}"></div><p class="name W_autocut W_fl S_txt1 W_f14">${data.screen_name}</p><div class="icon_mod W_fl"><#if (data.verified && data.verified_type == 0)><i title="微博个人认证" class="W_icon icon_approve"></i></#if></div><div class="main W_fr"><a href="javascript:void(0);" class="icon_group icon_main" title="#L{群主}"></a></div><div class="close W_fr"></div></li></#et>'),
			r = {},
			s = a.ui.dialog(c(m)),
			t = "";
		b = a.parseParam({
			gid: "",
			addUsers: "",
			minNum: 3,
			extraData: {},
			addSuccessCallback: "",
			editSuccessCallback: ""
		}, b);
		var u = -1,
			v = [],
			w = [],
			x = [],
			y = [],
			z, A = {},
			B, C, D, E, F, G = b.gid,
			H = a.conf.trans.groupMember,
			I, J, K = {
				editGroupName: function() {
					D.groupNamePanel.style.display = "none";
					D.editGroupFrom.style.display = "";
					E.value = z ? a.decodeHTML(z) : t
				},
				cannelEditGroup: function() {
					D.groupNamePanel.style.display = "";
					D.editGroupFrom.style.display = "none"
				},
				subimtEditGroup: function() {
					var b = F.getValue();
					if (!b) a.ui.tipAlert("请输入群名称!").beside(E).on("hide", function() {
						E.foucs()
					});
					else {
						k = !0;
						D.groupNamePanel.style.display = "";
						D.editGroupFrom.style.display = "none";
						if (b == t) return;
						z = b.substring(0, 16);
						D.titleText.innerHTML = a.encodeHTML(z);
						K.updateGroupName()
					}
				},
				groupPostCannel: function(a) {
					s.hide()
				},
				checkIsOk: function() {
					if (!k && b.extraData && b.extraData.page_id) {
						var d = D.editGroupFrom.style.display == "",
							e = d ? E : D.editGroupName,
							f = d ? c("#L{昵称还没保存哦}") : c("#L{请先换个好点的昵称吧}");
						a.ui.tipAlert(f).beside(e, {
							pos: "bottom-middle",
							appendTo: document.body,
							offsetY: d ? -10 : -20
						});
						return !1
					}
					if (D.editGroupFrom.style.display == "") {
						a.ui.tipAlert(c("#L{昵称还没保存哦}")).beside(E, {
							pos: "bottom-middle",
							appendTo: document.body,
							offsetY: -10
						});
						return !1
					}
					return !0
				},
				groupPostSubmit: function(c) {
					if (!a.hasClassName(c.el, "W_btn_a_disable") && !! K.checkIsOk()) {
						var d = b.extraData;
						if (G) {
							d = a.lib.kit.extra.merge(d, {
								join_uids: x.join(","),
								kick_uids: w.join(","),
								name: z,
								gid: G
							});
							var e = d.name;
							k || delete d.name;
							H.getTrans("update", {
								onSuccess: function(c) {
									c.data.name = e;
									a.custEvent.fire(r, "editSuccess", c.data);
									s.hide();
									try {
										b.editSuccessCallback && b.editSuccessCallback(c.data)
									} catch (d) {}
									K.errorBack(c)
								},
								onFail: function(b) {
									a.lib.dialog.ioError(b.code, b)
								},
								onError: function(b) {
									a.lib.dialog.ioError(b.code, b)
								}
							}).request(d)
						} else {
							d = a.lib.kit.extra.merge(d, {
								name: z ? z : t,
								members: y.join(",")
							});
							var e = d.name;
							k || delete d.name;
							H.getTrans("create", {
								onSuccess: function(c) {
									c.data.name = e;
									a.custEvent.fire(r, "addSuccess", c.data);
									s.hide();
									try {
										b.addSuccessCallback && b.addSuccessCallback(c.data)
									} catch (d) {}
									K.errorBack(c)
								},
								onFail: function(b) {
									a.lib.dialog.ioError(b.code, b)
								},
								onError: function(b) {
									a.lib.dialog.ioError(b.code, b)
								}
							}).request(d)
						}
					}
				},
				errorBack: function(b) {
					var d = b.data,
						e = ["error_uids", "exceed_uids", "unspported_uids"],
						f = [c("#L{还不是你的粉丝，暂时无法加群。}"), c("#L{群成员已满，操作失败。}"), c("#L{不支持群聊的用户。}")],
						g = [],
						h = 1;
					for (var i = 0; i < e.length; i++) if (d[e[i]]) {
						g.push(h + "." + d[e[i]].join(" ") + " " + f[i] + "<br>");
						h++
					}
					h > 1 && a.ui.alert(g.join(""))
				},
				removeIndexElement: function(b, c) {
					var d = a.core.arr.indexOf(b, c);
					d != -1 && c.splice(d, 1)
				},
				getCurItem: function(b) {
					var c = b.length;
					while (c--) if (a.hasClassName(b[c], "cur")) return b[c];
					return null
				},
				groupSuggest: function(b) {
					var c = a.fixEvent().keyCode,
						e = D.searchLists;
					if (c == d.UP || c == d.DOWN || c == d.ENTER) {
						a.preventDefault(b);
						var f = a.sizzle("[node-type='userItem']", e),
							g = f.length,
							h = K.getCurItem(f);
						if (c == d.UP) {
							u = u < 1 ? g - 1 : u - 1;
							h && a.removeClassName(h, "cur");
							a.addClassName(f[u], "cur")
						} else if (c == d.DOWN) {
							u = u >= g - 1 ? 0 : u + 1;
							h && a.removeClassName(h, "cur");
							f[u] && a.addClassName(f[u], "cur")
						} else if (c == d.ENTER) {
							var i = h && a.queryToJson(h.getAttribute("action-data"));
							i && K.addGroupMember(undefined, i)
						}
					}
				},
				groupinputclick: function(a) {
					window.SUDA && window.SUDA.uaTrack("button_build_group", "search_box")
				},
				groupinputkeyup: function(b) {
					var e = a.trim(B.getValue()),
						f = a.fixEvent().keyCode;
					if (f == d.UP || f == d.LEFT || f == d.DOWN || f == d.RIGHT || f == d.ENTER) a.preventDefault(b);
					else if (e) {
						i && clearTimeout(i);
						j && j.abort && j.abort();
						i = setTimeout(function() {
							j = H.getTrans("suggest", {
								onSuccess: function(b) {
									u = -1;
									var d = a.core.util.easyTemplate(o, b.data).toString();
									d = c(n, d);
									D.groupMember.style.display = "none";
									D.searchLists.innerHTML = d;
									D.searchLists.style.display = ""
								},
								onFail: function() {},
								onError: function() {}
							}).request({
								q: e
							})
						}, 200)
					} else {
						i && clearTimeout(i);
						j && j.abort && j.abort();
						D.groupMember.style.display = "";
						D.searchLists.innerHTML = "";
						D.searchLists.style.display = "none"
					}
				},
				kickMember: function(b) {
					var c = b.data,
						d = a.core.arr.indexOf(c.uid, y);
					if (d != -1) {
						y.splice(d, 1);
						K.removeIndexElement(c.screen_name, v);
						K.removeIndexElement(c.uid, x);
						K.removeIndexElement(c.uid, y);
						w.push(c.uid)
					}
					var e = a.lib.kit.dom.parentElementBy(b.el, document.body, function(a) {
						if (a.getAttribute("node-type") == "addUserItem") return !0
					});
					e && a.removeNode(e);
					var f = a.sizzle("[node-type='addUserItem']", D.joinMemberListContain).length;
					K.updateGroupName()
				},
				addMember: function(b) {
					var c = b.data.uid;
					b.data.actiontype = "removeMember";
					if (y.length > e - 1) a.ui.tipAlert("群人数已达上限!", {
						icon: "rederrorS",
						hideDelay: 2e3
					}).beside(b.el);
					else if (!a.inArray(c, y)) {
						y.push(c);
						x.push(c);
						v.push(b.data.screen_name);
						K.addMemberFunc([b.data]);
						K.updateGroupName();
						if (D.groupMember.style.display == "none") {
							C.value = "";
							C.blur();
							D.groupMember.style.display = "";
							D.searchLists.innerHTML = "";
							D.searchLists.style.display = "none"
						}
					}
				},
				addMemberFunc: function(b) {
					var d = a.core.util.easyTemplate(p, b).toString();
					D.addUserLists.style.display = "";
					a.insertHTML(D.addUserListsContain, d, "afterbegin");
					var e = a.sizzle("[node-type='addUserItem']", D.addUserListsContain).length;
					D.addUserCount.innerHTML = c("#L{新加成员（%s）}", e);
					e > 0 && D.addUserCount.style.display == ""
				},
				removeMember: function(b) {
					var d = b.data;
					K.removeIndexElement(d.uid, y);
					K.removeIndexElement(d.screen_name, v);
					K.removeIndexElement(d.uid, x);
					var e = a.lib.kit.dom.parentElementBy(b.el, document.body, function(a) {
						if (a.getAttribute("node-type") == "addUserItem") return !0
					});
					e && a.removeNode(e);
					var f = a.sizzle("[node-type='addUserItem']", D.addUserListsContain).length;
					f != 0 && (D.addUserCount.innerHTML = c("#L{新加成员（%s）}", f));
					f == 0 && (D.addUserLists.style.display = "none");
					K.updateGroupName()
				},
				addGroupMember: function(b, c) {
					c.actiontype = "removeMember";
					var d = c.uid + "";
					if (!a.inArray(d, y)) {
						y.push(d);
						x.push(d);
						v.push(c.screen_name);
						K.addMemberFunc([c])
					}
					K.updateGroupName()
				},
				updateGroupName: function() {
					D.group_all_count.innerHTML = y.length + (G ? 0 : 1);
					l && l.reset();
					if (G) w.length == 0 && x.length == 0 && f == z ? !a.hasClassName(D.editsubmitBtn, "W_btn_a_disable") && a.addClassName(D.editsubmitBtn, "W_btn_a_disable") : a.hasClassName(D.editsubmitBtn, "W_btn_a_disable") && a.removeClassName(D.editsubmitBtn, "W_btn_a_disable");
					else {
						var d = b.minNum - 1;
						d = d > 0 ? d : 2;
						x.length >= d && D.titleText.innerHTML != "" ? a.hasClassName(D.editsubmitBtn, "W_btn_a_disable") && a.removeClassName(D.editsubmitBtn, "W_btn_a_disable") : !a.hasClassName(D.editsubmitBtn, "W_btn_a_disable") && a.addClassName(D.editsubmitBtn, "W_btn_a_disable")
					}
					if (!z) {
						var e = v.length,
							g = c("#L{新建群}");
						t = g;
						e > 0 && (g = "");
						for (var h = 0; h < e && h < 4; h++) g = g + v[h] + "、";
						e == 1 && (g = g.substring(0, g.length - 1));
						t = g.substring(0, 16);
						D.titleText.innerHTML = t
					}
				},
				addGroupAllFunc: function(b) {
					var d = b.length,
						f, g = [];
					for (var h = 0; h < d; h++) {
						var i = b[h];
						f = i.id + "";
						if (y.length >= e) break;
						if (!a.inArray(f, y)) {
							i.actiontype = "removeMember";
							g.push(i);
							y.push(f);
							x.push(f);
							v.push(i.screen_name)
						}
					}
					K.addMemberFunc(g);
					K.updateGroupName()
				},
				groupEditInputKeyup: function() {
					var b = F.getValue(),
						c = a.trim(b);
					c != b && F.setValue(c.substring(0, 16))
				},
				addUserByName: function() {
					var b = B.getValue(),
						c = a.sizzle("[node-type='userItem']", D.searchLists),
						d = K.getCurItem(c);
					if (!d) {
						if (y.length > e - 1) {
							a.ui.tipAlert("群成员已满!", {
								icon: "rederrorS",
								hideDelay: 2e3
							}).beside(C);
							return
						}
						var f = {
							nick: b
						};
						H.getTrans("check", {
							onSuccess: function(a) {
								K.addGroupMember(undefined, a.data);
								C.value = "";
								C.blur();
								D.groupMember.style.display = "";
								D.searchLists.innerHTML = "";
								D.searchLists.style.display = "none"
							},
							onError: function(b) {
								a.ui.tipAlert(b.msg, {
									icon: "rederrorS",
									hideDelay: 2e3
								}).beside(C)
							},
							onFail: function(a) {}
						}).request(f)
					}
				},
				setUserInfo: function(b, d) {
					if (!G && !! d) {
						var e = d.currUser,
							f = d.addUser,
							g = a.core.util.easyTemplate(q, e).toString();
						K.addGroupAllFunc(f);
						D.addUserLists.style.display = "";
						a.insertHTML(D.addUserListsContain, g, "afterbegin");
						var h = a.sizzle("[node-type='addUserItem']", D.addUserListsContain).length;
						D.addUserCount.innerHTML = c("#L{新加成员（%s）}", h);
						h > 0 && D.addUserCount.style.display == ""
					}
				},
				hideDialog: function() {
					a.custEvent.fire(r, "hide")
				}
			},
			L = function() {
				C = s.getDomList().group_search_input;
				E = s.getDomList().group_edit_input;
				D = s.getDomList();
				s.on("editGroupName", "click", K.editGroupName);
				s.on("cannelEditGroup", "click", K.cannelEditGroup);
				s.on("groupPostSubmit", "click", K.groupPostSubmit);
				s.on("kickMember", "click", K.kickMember);
				s.on("groupPostCannel", "click", K.groupPostCannel);
				s.on("removeMember", "click", K.removeMember);
				s.on("addMember", "click", K.addMember);
				s.on("subimtEditGroup", "click", K.subimtEditGroup);
				a.custEvent.define(r, ["addSuccess", "editSuccess", "hide"])
			},
			M = function() {
				var b = {
					gid: G
				};
				H.getTrans("info", {
					onSuccess: function(b) {
						function j() {
							var c = b.data.admins,
								e = d,
								f = {};
							a.foreach(e, function(a) {
								f[a.uid] = a
							});
							a.foreach(c, function(a) {
								f[a].is_admin = 1
							});
							e = [];
							a.foreach(f, function(a) {
								e.push(a)
							});
							e.sort(function(a, b) {
								return (b.is_admin | 0) - (a.is_admin | 0)
							});
							e.sort(function(a, b) {
								return (b.is_owner | 0) - (a.is_owner | 0)
							});
							d = e;
							e = f = null
						}
						z = b.data.name;
						f = z;
						var d = b.data.members || [],
							g = d.length,
							h = b.data.is_owner == 1,
							i = a.inArray(parseInt($CONFIG.uid), b.data.admins);
						j();
						var k;
						for (var m = 0; m < g; m++) {
							k = d[m];
							y.push(k.uid + "");
							v.push(k.remark ? k.remark : k.screen_name);
							d[m].nopower = !0;
							h ? d[m].nopower = !1 : i && !d[m].is_owner && !d[m].is_admin && (d[m].nopower = !1)
						}
						if (h || i) {
							var o = "http://weibo.com/p/230491" + G + "/members?from=managelayer";
							if (D.batManage) {
								D.batManage.setAttribute("href", o);
								D.batManage.style.display = ""
							}
						}
						e = parseInt(b.data.max_member) || e;
						D.maxConut.innerHTML = e;
						D.line.style.display = "";
						var q = a.core.util.easyTemplate(p, d).toString();
						q = c(n, q);
						D.titleText.innerHTML = z;
						D.joinMemberListContain.innerHTML = q;
						!l && (l = a.ui.scrollView(D.existing_box));
						l && l.reset();
						!h && !i && (D.editGroupName.style.display = "none");
						K.updateGroupName()
					},
					onFail: function(a) {},
					onError: function(a) {}
				}).request(b)
			},
			N = function() {
				B = a.lib.kit.dom.smartInput(C, {
					notice: C.defaultValue
				});
				F = a.lib.kit.dom.smartInput(E, {
					notice: E.defaultValue
				});
				a.custEvent.add(B, "enter", K.addUserByName);
				a.addEvent(C, "keydown", K.groupSuggest);
				a.addEvent(C, "keyup", K.groupinputkeyup);
				a.addEvent(C, "click", K.groupinputclick);
				a.addEvent(E, "keyup", K.groupEditInputKeyup);
				a.addEvent(s, "hide", K.hideDialog);
				G ? M() : K.updateGroupName();
				J = a.lib.group.groupMember(s.getDomList().groupMember, {
					members: b.addUsers
				});
				a.custEvent.add(J, "addMember", K.addGroupMember);
				a.custEvent.add(J, "getUserInfo", K.setUserInfo)
			},
			O = function() {
				L();
				N();
				s.on("shown", function() {
					var b = D.groupSelect.offsetHeight,
						c = D.existing_box.offsetHeight;
					D.searchLists.style.height = b + "px";
					!l && (l = a.ui.scrollView(D.existing_box));
					l && l.reset();
					J.setHeight(b)
				}).on("hide", function() {
					r.destroy()
				}).show()
			};
		O();
		r.destroy = function() {
			a.custEvent.undefine(r, ["addSuccess", "editSuccess", "hide"]);
			a.removeEvent(C, "keydown", K.groupSuggest);
			a.removeEvent(C, "keyup", K.groupinputkeyup);
			a.removeEvent(E, "keyup", K.groupEditInputKeyup);
			a.custEvent.remove(B, "enter", K.addUserByName);
			a.removeEvent(C, "click", K.groupinputclick);
			J.destroy();
			F.destroy();
			B.destroy();
			l.destroy()
		};
		return r
	}
});
STK.register("lib.publisher.source.publishTo", function(a) {
	var b = a.lib.kit.extra.language,
		c = a.core.util.templet,
		d = a.core.util.easyTemplate,
		e;
	return function(c) {
		var d, f, g = c && c.editorWrapEl,
			h = c && c.textEl,
			i = c && c.trans || a.conf.trans.publishTo,
			j = c && c.transName || "chatlist",
			k = {},
			l = [],
			m, n = {},
			o = c.isforward,
			p, q = !1,
			r, s, t, u = function() {
				if (!a.isNode(g)) throw "publishTo need a wrapper node to parseDOM"
			},
			v = a.getUniqueKey(),
			w = function(a) {
				var b = [],
					c;
				b.push('<div style="position: absolute;display:none;z-index:29999;outline:none;" hideFocus="true" node-type="publishTo" class="layer_menu_list" tabindex="10">');
				b.push('<ul id="' + v + '">');
				b.push('<li action-type="select" rank="0"><a title="#L{公开-你发表的微博可以被大家公开查看哦}" suda-data="key=tblog_edit_exposure&value=edit_public" href="javascript:void(0)" action-data="rank=0&text=#L{公开}&rankid=" action-type="publishTo"><i class="W_icon icon_type_public"></i>#L{公开}</a></li>');
				b.push('<li action-type="select" rank="6"><a title="#L{好友圈-发表的微博只有你的好友才能看到}" href="javascript:void(0)" action-data="rank=6&text=#L{好友圈}&rankid=" action-type="publishTo"><i class="W_icon icon_type_friends"></i>#L{好友圈}</a></li>');
				b.push('<li action-type="select" rank="1"><a title="#L{仅自己可见-发表的微博只有自己才能看到}" suda-data="key=tblog_edit_exposure&value=edit_private" href="javascript:void(0)" action-data="rank=1&text=#L{仅自己可见}&rankid=" action-type="publishTo"><i class="W_icon icon_type_self"></i>#L{仅自己可见}</a></li>');
				b.push('<li class="line S_line1"></li>');
				b.push('<li action-type="select"><a action-type="more" title="#L{群可见-发表的微博所有群成员都可以看到}" href="javascript:void(0);"><i class="W_icon icon_type_group_v2"></i>#L{群可见}</a></li>');
				b.push("</ul></div>");
				return b.join("")
			},
			x = function(a) {
				var b = [],
					c = a.length,
					d;
				c > 6 ? b.push('<ul class="scroll_bar W_scroll" id="' + v + '">') : b.push('<ul class="scroll_bar W_scroll" id="' + v + '" style="">');
				for (var e = 0; e < c; e++) {
					d = a[e];
					b.push('<li action-type="select"><a action-type="publishTo" action-data="rank=7&text=' + d.gname + "&rankid=" + d.gid + '" title="' + d.gname + '" href="javascript:void(0);" onclick="return false;"><em class="S_txt1">' + d.gname + "</em>");
					b.push('<span class="qunlist_right" action-type="setting" suda-data="key=adm_group&value=mail_publish"><em class="W_ficon ficon_setup S_ficon">J</em></span></a></li>')
				}
				b.push("</ul>");
				b.push('<ul><li class="line S_line1"></li>');
				b.push('<li  class="lotopt"><a href="javascript:void(0)" onclick="return false;" action-type="back">#L{返回}</a>');
				b.push('<a href="javascript:void(0);"suda－data="key=build_group&value=mail_publish"  action-data="minNum=2" action-type="createGroup" class="right"><em class="W_ficon ficon_add S_ficon">+</em><em class="S_txt1">#L{新建群}</em></a></li>');
				b.push("</ul>");
				return b.join("")
			},
			y = function() {
				f = a.lib.kit.dom.parseDOM(a.builder(g).list);
				f.wrap || (f.wrap = g);
				r = f.wrap.className;
				f.submit && (s = f.submit.innerHTML)
			},
			z = function() {
				d = function() {
					var c = {},
						d, k, n, o, u = f.showPublishTo;
					k = d = u && u.getAttribute("action-data") && a.core.json.queryToJson(u.getAttribute("action-data")) || {
						rank: "all",
						rankid: ""
					};
					c.node = a.core.evt.delegatedEvent(g);
					var y = !1,
						z = {
							hotKeyChangeRank: function(c, f) {
								var g = f.match(/\d+/);
								if (g && g[0]) {
									var h = parseInt(g[0], 10) - 1,
										i = [{
											rank: 0,
											rankid: "",
											text: b("#L{公开}"),
											title: b("#L{公开-你发表的微博可以被大家公开查看哦}")
										}, {
											rank: 6,
											rankid: "",
											text: b("#L{好友圈}"),
											title: b("#L{好友圈-发表的微博只有你的好友才能看到}")
										}, {
											rank: 1,
											rankid: "",
											text: b("#L{仅自己可见}"),
											title: b("#L{仅自己可见-发表的微博只有自己才能看到}")
										}],
										j = function() {
											a.foreach(k, function(a) {
												a.rank = 7;
												a.rankid = a.gid;
												a.text = a.gname;
												a.title = a.gname
											});
											i = i.concat(k);
											var b = window.$CONFIG && window.$CONFIG.miyou == "1";
											b || i.splice(1, 1);
											if (i[h]) {
												d = i[h];
												E.btnContent(d.text);
												E.btnTitle(d.title);
												y = !1;
												a.custEvent.fire(E, "changeRank", d)
											}
										},
										k = function() {
											if (e) return a.core.arr.copy(e);
											F.group.request(function(b) {
												k = a.core.arr.copy(b);
												j()
											});
											return null
										}();
									k && j()
								}
							}
						},
						A = function() {
							c.node.add("showPublishTo", "click", E.show)
						},
						B = function() {
							F.normal.bind();
							F.group.bind();
							C.bind()
						},
						C = {
							keyboardManager: null,
							keyTypes: ["up", "down", "esc", "enter"],
							getIndex: function(b) {
								var c = C.getList(),
									d = C.lastCur,
									e;
								a.foreach(c, function(a, b) {
									if (d === a) {
										e = b;
										return !1
									}
								});
								b > 0 ? e++ : e--;
								e >= c.length ? e = 0 : e < 0 && (e = c.length - 1);
								return e
							},
							up: function() {
								q = !0;
								var a = C.getIndex(-1),
									b = C.getList()[a];
								C.setCur(b, a);
								q = !1
							},
							down: function() {
								q = !0;
								var a = C.getIndex(1),
									b = C.getList()[a];
								C.setCur(b, a);
								q = !1
							},
							enter: function() {
								var b = C.lastCur;
								if (!b.getAttribute("action-type") || b.getAttribute("action-type") == "select") b = a.sizzle("[action-type]", b)[0];
								b && c.layer.fireDom(b, "click", null)
							},
							esc: function() {
								E.hide()
							},
							bind: function() {
								C.keyboardManager = a.lib.publisher.widget.keyboardCapture(f.publishTo, {
									stopScroll: !0
								});
								a.custEvent.define(C.keyboardManager, C.keyTypes);
								for (var b = 0, c = C.keyTypes.length; b < c; b++) {
									var d = C.keyTypes[b];
									a.custEvent.add(C.keyboardManager, d, C[d])
								}
							},
							list: null,
							lastCur: null,
							focusPublishTo: function() {
								f.publishTo.focus();
								var b = this.getList(!0),
									c = a.sizzle('li[rank="' + d.rank + '"]', f.publishTo)[0];
								this.setCur(c || b[0], 0)
							},
							setCur: function(b, c, d) {
								this.lastCur && a.removeClassName(this.lastCur, "cur");
								a.addClassName(b, "cur");
								this.lastCur = b;
								var e = a.E(v);
								if (a.contains(e, b)) {
									var f = function(b) {
											return a.core.dom.getSize(b).height + (parseFloat(a.core.dom.getStyle(b, "marginTop")) || 0) + (parseFloat(a.core.dom.getStyle(b, "marginBottom")) || 0)
										},
										g = c + 1,
										h = Math.max(f(b), f(a.sizzle("a", b)[0]));
									if (d) return;
									g > 6 ? e.scrollTop = (g - 6) * h : e.scrollTop = 0
								}
							},
							getList: function(b) {
								if (b || !this.list) {
									var c = a.sizzle("li", f.publishTo),
										d = [];
									a.foreach(c, function(b) {
										a.getStyle(b, "display") != "none" && b.className != "line" && d.push(b)
									});
									this.list = d
								}
								return this.list
							}
						},
						D = {
							setPos: function() {
								var b = a.core.dom.getSize;
								document.body.appendChild(f.publishTo);
								var c = b(f.showPublishTo).width - b(f.publishTo).width;
								a.lib.kit.dom.layoutPos(f.publishTo, f.showPublishTo, {
									offsetX: c + 2,
									offsetY: 2
								})
							},
							overHandler: function(b) {
								if (!q) {
									var c = a.sizzle("[action-type=select]", f.publishTo);
									index = a.core.arr.indexOf(b.el, c);
									list = a.sizzle(".cur", f.publishTo);
									list && list[0] && a.core.dom.removeClassName(list[0], "cur");
									a.core.dom.addClassName(c[index], "cur");
									C.setCur(c[index], index, !0)
								}
							},
							init: function() {
								c.layer = a.core.evt.delegatedEvent(f.publishTo);
								c.closeFriend = a.core.evt.delegatedEvent(f.publishTo)
							},
							show: function() {
								var b = a.getStyle(f.publishTo, "display") != "none";
								a.setStyle(f.publishTo, "display", "");
								D.setPos();
								C.focusPublishTo();
								b || a.ui.effect(f.publishTo, "fadeInDown", "fast");
								if (!m) {
									m = 1;
									D.bindBodyEvt()
								}
								return !1
							},
							hide: function() {
								!f.publishTo || a.ui.effect(f.publishTo, "fadeOutUp", "fast", function() {
									a.setStyle(f.publishTo, "display", "none");
									y = !1;
									if (m) {
										m = 0;
										D.removeBodyEvt()
									}
								})
							},
							autoHide: function(b) {
								b = a.core.evt.fixEvent(b);
								f.showPublishTo !== b.target && !a.core.dom.contains(f.showPublishTo, b.target) && !a.core.dom.contains(f.publishTo, b.target) && E.hide()
							},
							content: function(a) {
								if (typeof a == "undefined") return f.publishTo.innerHTML;
								f.publishTo.innerHTML = a
							},
							bindBodyEvt: function() {
								a.addEvent(document.body, "click", D.autoHide)
							},
							removeBodyEvt: function() {
								a.removeEvent(document.body, "click", D.autoHide)
							}
						},
						E = {
							enable: function() {
								f.showPublishTo.setAttribute("action-type", "showPublishTo")
							},
							disable: function() {
								f.showPublishTo.setAttribute("action-type", "")
							},
							miYouStyle: function(a, c) {
								var d = "2",
									e = $CONFIG.lang == "zh-cn" ? "" : "_CHT";
								d == c.rank ? f.submit.innerHTML = b('<span class="btn_30px">#L{好友发布}</span>') : f.submit.innerHTML = s
							},
							show: function() {
								var b = function() {
										a.custEvent.fire(E, "show");
										y ? F.group.show() : F.normal.show()
									};
								if (f.publishTo) {
									var c = a.getStyle(f.publishTo, "display");
									if (c === "none") b();
									else {
										a.setStyle(f.publishTo, "display", "none");
										y = !1
									}
								} else b();
								a.preventDefault()
							},
							btnContent: function(b) {
								b && (n.innerHTML = a.encodeHTML(b))
							},
							btnTitle: function(a) {
								a && f.showPublishTo.setAttribute("title", a)
							},
							hide: function() {
								D.hide()
							},
							toggle: function() {
								y || (f.publishTo.style.display == "none" ? E.show() : E.hide())
							},
							rank: function() {
								return d
							},
							reset: function() {
								E.enable();
								f.wrap.className = r;
								f.submit.innerHTML = s;
								E.btnContent(o.content);
								E.btnTitle(o.title);
								d = null;
								y = !1;
								d = k
							},
							destroy: function() {
								try {
									for (var b in c) c[b].destroy()
								} catch (d) {}
								l.length && a.hotKey.remove(h, l, z.hotKeyChangeRank);
								a.removeNode(f.publishTo);
								a.custEvent.undefine(E);
								if (C.keyboardManager) {
									C.keyboardManager.destroy();
									a.custEvent.undefine(C.keyboardManager, C.keyTypes)
								}
							},
							changeRank: function(b) {
								b = b > 0 ? b - 1 : 0;
								var c = a.sizzle('a[action-type="publishTo"]', f.publishTo)[b];
								if (c) {
									F.normal.changeRank({
										el: c,
										data: a.core.json.queryToJson(c.getAttribute("action-data") || "")
									});
									var d = c.getAttribute("suda-data");
									if (d) {
										var e = d.match(/key=(.+?)&value=(.+)/);
										e && e.length === 3 && window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(e[1], e[2])
									}
								}
							},
							getDomHeight: function() {
								return f.publishTo.style.display == "none" ? {
									width: 0,
									heigth: 0
								} : a.core.dom.getSize(f.publishTo)
							},
							bindAltKey: function() {
								if (a.isNode(h)) {
									var b = a.core.util.browser.OS === "macintosh";
									if (b) for (var c = 1; c <= 9; c++) l.push("ctrl+" + c);
									else for (var c = 1; c <= 9; c++) l.push("alt+" + c);
									a.hotKey.add(h, l, z.hotKeyChangeRank)
								}
							}
						},
						F = {
							normal: {
								bind: function() {
									c.layer.add("publishTo", "click", F.normal.changeRank);
									c.layer.add("more", "click", F.normal.more);
									c.layer.add("select", "mousemove", D.overHandler)
								},
								getList: function() {
									D.content(p)
								},
								more: function() {
									F.group.show();
									y = !0;
									a.core.evt.stopEvent()
								},
								show: function() {
									var a = function() {
											if (!f.publishTo) {
												G();
												D.init();
												B()
											}
											F.normal.getList();
											D.show()
										};
									e ? a() : F.group.request(a)
								},
								editGroupCallback: function(b) {
									F.group.request(function(b) {
										groups = a.core.arr.copy(b);
										F.group.cache = null
									})
								},
								changeRank: function(c) {
									try {
										a.preventDefault(c.evt)
									} catch (e) {}
									var g = a.fixEvent().target,
										h = !1;
									if (g.getAttribute("action-type") == "setting") h = !0;
									else {
										var i = a.lib.kit.dom.parentElementBy(g, f.publishTo, function(a) {
											if (a.getAttribute("action-type") == "setting") return !0
										});
										i && (h = !0)
									}
									if (h) {
										var j = c.data.rankid.split(":")[1];
										E.hide();
										t = a.lib.group.gmemberSelect({
											gid: j,
											editSuccessCallback: F.normal.editGroupCallback
										})
									} else {
										d = c.data;
										var k = c.data.text;
										E.btnContent(k);
										E.btnTitle(c.el.getAttribute("title"));
										d.rank == "group" ? F.group.show() : E.hide();
										a.custEvent.fire(E, "changeRank", d);
										c.data.rank == "6" ? f.submit.innerHTML = b("#L{好友发布}") : f.submit.innerHTML = b("#L{发布}")
									}
								}
							},
							group: {
								request: function(b) {
									i.request(j, {
										onSuccess: function(a) {
											var c = a.data.length;
											for (var d = 0; d < c; d++) a.data[d].index = d + 1;
											e = a.data;
											b && b(e)
										},
										onError: function(b) {
											a.lib.dialog.ioError(b.code, b)
										}
									}, {})
								},
								bind: function() {
									c.layer.add("back", "click", F.group.back);
									c.layer.add("createGroup", "click", F.group.createGroup)
								},
								getList: function() {
									if (!F.group.cache) {
										var a = b(x(e));
										F.group.cache = a;
										D.content(F.group.cache)
									} else D.content(F.group.cache)
								},
								show: function() {
									F.group.getList();
									D.show()
								},
								back: function() {
									var b = a.core.evt.fixEvent();
									a.core.evt.stopEvent(b);
									y = !1;
									F.normal.show()
								},
								groupSelectCallback: function(b) {
									d = {
										rank: 7,
										rankid: b.page_objectid,
										text: b.name,
										title: b.name
									};
									var c = b.name;
									E.btnContent(c);
									E.btnTitle(c);
									a.custEvent.fire(E, "changeRank", d);
									F.group.request(function(b) {
										groups = a.core.arr.copy(b);
										F.group.cache = null
									})
								},
								createGroup: function(b) {
									E.hide();
									var c = b.data;
									c.extraData = {
										fromapp: 1
									};
									c.addSuccessCallback = F.group.groupSelectCallback;
									t = a.lib.group.gmemberSelect(c)
								}
							}
						},
						G = function(c) {
							var d = b(w(c));
							f.publishTo = a.insertHTML(document.body, d, "beforeend");
							p = f.publishTo.innerHTML
						},
						H = function() {
							if (!a.isNode(f.showPublishTo)) return 0;
							n = f.publishTotext;
							o = {
								content: n.innerHTML,
								title: f.showPublishTo.getAttribute("title")
							};
							A();
							return 1
						},
						I = H();
					a.custEvent.define(E, ["show", "hide", "changeRank"]);
					return I ? E : null
				}();
				d && d.bindAltKey && d.bindAltKey()
			},
			A = function() {
				u();
				y();
				z()
			};
		A();
		return d
	}
});
STK.register("lib.publisher.source.shine", function(a) {
	var b = function(a) {
			return a.slice(0, a.length - 1).concat(a.concat([]).reverse())
		};
	return function(c, d) {
		var e = a.parseParam({
			start: "#fff",
			color: "#fbb",
			times: 2,
			step: 5,
			length: 4
		}, d),
			f = e.start.split(""),
			g = e.color.split(""),
			h = [];
		for (var i = 0; i < e.step; i += 1) {
			var j = f[0];
			for (var k = 1; k < e.length; k += 1) {
				var l = parseInt(f[k], 16),
					m = parseInt(g[k], 16);
				j += Math.floor(parseInt(l + (m - l) * i / e.step, 10)).toString(16)
			}
			h.push(j)
		}
		for (var i = 0; i < e.times; i += 1) h = b(h);
		var n = !1,
			o = a.timer.add(function() {
				if (!h.length) a.timer.remove(o);
				else {
					if (n) {
						n = !1;
						return
					}
					n = !0;
					c.style.backgroundColor = h.pop()
				}
			})
	}
});
STK.register("lib.kit.extra.keySubmit", function(a) {
	function f(c, e) {
		var f = a.core.dom.uniqueID(c);
		if (f in b) {
			var g = a.core.arr.indexOf(e, b[f]);
			g >= 0 && b[f].splice(g, 1);
			if (b[f].length == 0) {
				delete b[f];
				a.removeEvent(c, "keydown", d)
			}
		}
	}
	function e(c, e) {
		var f = a.core.dom.uniqueID(c);
		if (f in b) a.core.arr.inArray(e, b[f]) || b[f].push(e);
		else {
			b[f] = [e];
			a.addEvent(c, "keydown", d)
		}
	}
	function d(d) {
		d = a.fixEvent(d);
		var e = a.core.dom.uniqueID(d.target),
			f = d.keyCode === 13 || d.keyCode === 10;
		f && (c && d.metaKey || !c && d.ctrlKey) && b[e] && a.foreach(b[e], function(a) {
			a(d)
		})
	}
	var b = {},
		c = a.core.util.browser.OS === "macintosh";
	return {
		on: e,
		off: f
	}
});
STK.register("lib.publisher.publisher", function(a) {
	var b = {
		title: "#L{有什么新鲜事想告诉大家}"
	},
		c = a.lib.kit.extra.language,
		d = a.lib.publisher.widget.widgetloader,
		e = a.ui.confirm,
		f = "#在这里输入你想要说的话题#",
		g = '<i class="W_icon icon_rederrorS"></i>提醒：进行声明的原创文章将会获得更多曝光资源';
	return function(b) {
		var e = {
			limitNum: 120,
			extendText: ""
		},
			f = {},
			h, i = !0,
			j, k, l, m, n, o, p, q, r, s;
		h = a.parseParam({
			trans: a.conf.trans.publisher,
			transName: "publish",
			node: null,
			styleId: "1",
			maxLength: 120,
			appkey: "",
			pid: "",
			info: "",
			content: "",
			extraUrl: "",
			extraSend: {},
			dialog: !1,
			storage: !0,
			asyncBeforePublish: undefined,
			draft_id: "",
			draft_title: "",
			draft_writer: "",
			draft_image: "",
			draft_summary: "",
			draft_content: "",
			draft_free_content: "",
			pay_setting: "{}",
			follow_to_read: "0",
			isWemedia: 0,
			topic_id: !1,
			extparams: !1
		}, b);
		var t = h.maxLength,
			u;
		h.extraSend.location = h.extraSend.location || $CONFIG.location || "";
		o = a.custEvent.define(f, ["publish", "share"]);
		var v = {
			key: "publisher_" + $CONFIG.uid,
			write: function(a) {
				if (h.storage != !1) {
					var a = a || m.API.getWords() || "";
					STK.core.util.storage.set(v.key, a)
				}
			},
			read: function() {
				if (h.storage == !1) return null;
				var a = STK.core.util.storage.get(v.key);
				return a != "null" && a != null && a.length != 0 ? a : null
			},
			del: function() {
				h.storage != !1 && STK.core.util.storage.del(v.key)
			}
		},
			w = function() {
				var b = k.textEl;
				i ? j === "error" && a.lib.publisher.source.shine(b) : x()
			},
			x = function() {
				if (!a.hasClassName(k.submit, "W_btn_a_disable")) {
					a.core.dom.addClassName(k.submit, "W_btn_a_disable");
					i = !0;
					j = "loading";
					var b = a.lib.kit.extra.getDiss(y(), k.submit);
					b = a.lib.kit.extra.merge(b, a.queryToJson(k.submit.getAttribute("action-data") || ""));
					u && (b = a.lib.kit.extra.merge(b, u.read()));
					b.pub_type = "dialog";
					b.draft_id = h.draft_id;
					b.draft_title = h.draft_title;
					b.draft_writer = h.draft_writer;
					b.draft_image = h.draft_image;
					b.draft_summary = h.draft_summary;
					b.draft_content = h.draft_content;
					b.draft_free_content = h.draft_free_content;
					b.draft_content = h.draft_content;
					b.pay_setting = h.pay_setting;
					var c = k.followToRead;
					if (c) {
						var d = c.getElementsByTagName("input");
						for (var e = 0; e < d.length; e++) d[e].checked && (b.follow_to_read = d[e].value)
					}
					k.topic && k.topic.checked && (b.sync_wb = !0);
					!h.topic_id || (b.topic_id = h.topic_id);
					h.extparams && (b.extparams = h.extparams);
					r && r.disable();
					var f = function(b) {
							n.request(b);
							if (k.followpresenter && k.followpresenter.checked == !0) {
								var c = a.queryToJson(k.followpresenter.getAttribute("action-data") || "");
								h.trans.getTrans("follow", {}).request(c)
							}
						};
					h.asyncBeforePublish ? h.asyncBeforePublish(b, {
						success: function(a) {
							f(a)
						},
						fail: function() {
							k.submit && a.core.dom.removeClassName(k.submit, "W_btn_a_disable");
							r && r.enable();
							i = !1;
							j = ""
						}
					}) : f(b)
				}
			},
			y = function() {
				var b = m.API.getWords();
				p && b.indexOf(p) === -1 && (b = b + p);
				var c = {};
				c = a.core.json.merge(c, h.extraSend);
				c.appkey = h.appkey;
				c.style_type = h.styleId;
				c.pic_id = h.pid;
				c.text = b;
				c.pdetail = $CONFIG.page_id || "";
				c.location = $CONFIG.location || "";
				var d = m.API.getExtra();
				if (d) if (d.indexOf("=") < 0) c.pic_id = m.API.getExtra() || "";
				else {
					var e = d,
						f = a.core.json.queryToJson(e);
					for (var g in f) c[g] = f[g]
				}
				if (r && r.rank) {
					var i = r.rank();
					c.rank = i.rank;
					c.rankid = i.rankid
				}
				var j = !1;
				if (m.nodeList.textEl && m.nodeList.textEl.getAttribute("settime")) {
					c.addtime = m.nodeList.textEl.getAttribute("settime");
					c.module = "autopub";
					j = !0
				}
				m.nodeList.textEl && m.nodeList.textEl.getAttribute("tags") && (c.photo_tag = m.nodeList.textEl.getAttribute("tags"));
				m.nodeList.textEl && m.nodeList.textEl.getAttribute("taginfos") && (c.photo_taginfo = m.nodeList.textEl.getAttribute("taginfos"));
				k.rightsAgree && (c.is_original = k.rightsAgree.checked ? 1 : 0);
			},
			z = function(a) {
				if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
					w();
					m.API.blur()
				}
			},
			A = function(b, d) {
				function r() {
					i = !1;
					a.removeClassName(k.submit, "W_btn_a_disable")
				}
				function q() {
					i = !0;
					a.addClassName(k.submit, "W_btn_a_disable")
				}
				v.write(a.core.str.trim(k.textEl.value) ? k.textEl.value : "");
				var f = u && u.get("extraurl") || "";
				f === "ABSENT" && (f = "");
				var g = u && u.get("prefixtext") || "";
				g === "ABSENT" && (g = "");
				var h = u && u.get("score"),
					j = "#L{还可以输入%s字}",
					l = "#L{已超出%s字}",
					m = j,
					n = !0,
					o = 0,
					p = e.extendText ? c(e.extendText) : "";
				e.limitNum = t - a.lib.publisher.widget.count(f + g);
				n = (o = e.limitNum - d.count) >= 0;
				if (d.count === 0) {
					m = j;
					q()
				} else if (n) {
					m = j;
					r()
				} else {
					m = l;
					q()
				}
				k.num.innerHTML = p + c(m, n ? "<span>" + Math.abs(o) + "</span>" : '<span class="S_error">' + Math.abs(o) + "</span>");
				u && u.get("score") !== "ABSENT" && u.get("score") == 0 && q()
			},
			B = function(b, d) {
				m.API.blur();
				j = "";
				k.successTip.style.display = "";
				k.textEl.value = "";
				var f = a.sizzle(".W_icon", k.successTip)[0],
					g = a.sizzle(".txt", k.successTip)[0];
				g.style.display = "none";
				a.ui.effect(f, "flipInY", "normal");
				setTimeout(function() {
					g.style.display = "";
					a.ui.effect(g, "fadeInRight", "normal")
				}, 50);
				setTimeout(function() {
					i = !1;
					a.ui.effect(k.successTip, "fadeOut", "fast", function() {
						k.successTip.style.display = "none"
					});
					var b = m.API.count();
					b > 0 ? a.core.dom.removeClassName(k.submit, "W_btn_a_disable") : k.submit && a.core.dom.addClassName(k.submit, "W_btn_a_disable");
					k.num.innerHTML = (e.extendText ? c(e.extendText) : "") + c("#L{还可以输入%s字}", "<span>" + (e.limitNum - b) + "</span>")
				}, 2e3);
				a.custEvent.fire(o, "publish", [b.data, d]);
				a.custEvent.fire(o, "share");
				setTimeout(function() {
					b.data.feedtype == "timefeed" ? a.conf.channel.feed.fire("timeFeedPublish", [b.data.html, d]) : a.conf.channel.feed.fire("publish", [b.data, d])
				}, 1500);
				a.core.dom.addClassName(k.submit, "W_btn_a_disable");
				r && r.reset && r.reset();
				v.del();
				s && s.close && s.close();
				m.nodeList.textEl && m.nodeList.textEl.getAttribute("tags") && m.nodeList.textEl.removeAttribute("tags")
			},
			C = function(b, d) {
				i = !1;
				j = "";
				b.msg = b.msg || c("操作失败");
				a.lib.dialog.ioError(b.code, b);
				k.submit && a.core.dom.removeClassName(k.submit, "W_btn_a_disable");
				r && r.enable()
			},
			D = function() {
				a.removeClassName(k.textEl.parentNode, "clicked")
			},
			E = function() {
				a.addClassName(k.textEl.parentNode, "clicked")
			},
			F = function(b) {
				b = a.parseParam({
					appkey: "",
					content: "",
					info: "",
					pid: "",
					extraSend: {}
				}, b);
				h.extraSend = b.extraSend;
				h.extraSend.location = h.extraSend.location || $CONFIG.location || "";
				h.pid = b.pid;
				if ( !! a.contains(document.body, k.textEl)) {
					k.textEl.defaultValue && (k.textEl.value = k.textEl.defaultValue);
					b.content && (k.textEl.value = b.content);
					k.textEl.setAttribute("content", b.content);
					k.info && (k.info.innerHTML = b.info);
					b.appkey && (h.appkey = b.appkey);
					var d = m.API.count();
					if (d > 0) {
						i = !1;
						j = "";
						a.core.dom.removeClassName(k.submit, "W_btn_a_disable")
					} else {
						i = !0;
						j = "error";
						a.core.dom.addClassName(k.submit, "W_btn_a_disable")
					}
					if (u && u.get("score") !== "ABSENT" && u.get("score") == 0) {
						i = !0;
						a.core.dom.addClassName(k.submit, "W_btn_a_disable")
					}
					k.num.innerHTML = (e.extendText ? c(e.extendText) : "") + c("#L{还可以输入%s字}", "<span>" + (e.limitNum - d) + "</span>");
					s && s.close && s.close();
					G()
				}
			},
			G = function() {
				!h.isWemedia || h.trans.getTrans("similarity", {
					onComplete: function(b) {
						var c = b.data;
						if ( !! c && "is_original" in c) {
							a.setStyle(k.rightsRemind, "display", "");
							if (c.is_original) {
								k.rightsRemind.innerHTML = g + "!";
								return
							}
							var d = c.title,
								e = c.url;
							if (d && e) {
								k.similarArticle.innerHTML = "《" + c.title + "》";
								k.similarArticle.href = c.url || "#";
								return
							}
							H(b)
						} else H(b, c)
					},
					onFail: H,
					onTimeout: H
				}).request({
					id: h.draft_id
				})
			},
			H = function(b) {
				k.rightsRemind.innerHTML = g;
				a.setStyle(k.rightsRemind, "display", "")
			},
			I = function() {
				i = !1
			},
			J = function(b) {
				var c = a.core.dom.textSelectArea(b),
					d = c.start || b.value.length,
					e = c.len || 0,
					f = d + "&" + e;
				b.setAttribute("range", f)
			},
			K = function() {
				l = a.lib.editor.base(h.node, e);
				m = l.editor;
				k = m.nodeList;
				h.dialog === "true" && k.textEl.setAttribute("phototag", "false");
				u = a.lib.publisher.source.formdata(k.extradata);
				var b = u && u.get("extraurl") || "";
				b === "ABSENT" && (b = "");
				var c = u && u.get("prefixtext") || "";
				c === "ABSENT" && (c = "");
				e.limitNum = e.limitNum - a.lib.publisher.widget.count(b + c);
				try {
					J(k.textEl)
				} catch (d) {}
				k.wrap && (r = a.lib.publisher.source.publishTo({
					editorWrapEl: k.wrap,
					textEl: k.textEl
				}));
				q = a.lib.dialog.validateCode();
				v.read() && setTimeout(function() {
					if (a.trim(k.textEl.value).length === 0 || k.textEl.defaultValue && k.textEl.value === k.textEl.defaultValue) {
						k.textEl.value = "";
						m.API.insertText(v.read());
						k.textEl.focus()
					}
				})
			},
			L = "",
			M = function(b) {
				if ( !! k && !! k.feedconfig) {
					if (a.core.dom.hasClassName(k.feedconfig, "send_weibo_simple") && a.core.dom.hasClassName(k.feedconfig, "send_weibo_simple_remark_fold")) {
						a.removeClassName(k.feedconfig, "send_weibo_simple_remark_fold");
						L = "send_weibo_simple_remark_fold"
					}
					if (a.core.dom.hasClassName(k.feedconfig, "send_weibo_simple") && a.core.dom.hasClassName(k.feedconfig, "send_weibo_simple_fold")) {
						a.removeClassName(k.feedconfig, "send_weibo_simple_fold");
						L = "send_weibo_simple_fold"
					}
				}
			},
			N = function(b) {
				if ( !! k && !! k.feedconfig) {
					var b = a.fixEvent(b),
						c = b.target;
					a.core.dom.hasClassName(k.feedconfig, "send_weibo_simple") && !a.core.dom.hasClassName(k.feedconfig, L) && c !== k.feedconfig && (a.core.dom.hasClassName(c, "WB_miniblog_fb") || a.core.dom.hasClassName(c, "WB_frame_c")) && a.addClassName(k.feedconfig, L)
				}
			},
			O = function() {
				a.addEvent(k.submit, "click", w);
				a.lib.kit.extra.keySubmit.on(k.textEl, w);
				a.custEvent.add(m, "blur", D);
				a.custEvent.add(m, "focus", E);
				a.addEvent(k.feedconfig, "click", M);
				a.addEvent(document.body, "click", N)
			},
			P = function() {
				r && r.miYouStyle.apply(null, arguments)
			},
			Q = function() {
				a.custEvent.add(m, "textNum", A);
				r && a.custEvent.add(r, "changeRank", P)
			},
			R = function() {
				u && u.get("api") && u.get("api") !== "ABSENT" && (h.transName = "proxy");
				n = h.trans.getTrans(h.transName, {
					onComplete: function(b, c) {
						var d = {
							onSuccess: B,
							onError: C,
							requestAjax: n,
							param: y(),
							onRelease: function() {
								i = !1;
								j = "";
								k.submit && a.core.dom.removeClassName(k.submit, "W_btn_a_disable");
								r && r.enable()
							}
						};
						q.validateIntercept(b, c, d)
					},
					onFail: C,
					onTimeout: C
				})
			},
			S = function() {
				K();
				O();
				Q();
				R();
				try {
					F(h)
				} catch (a) {}
				try {
					s = d(m)
				} catch (a) {}
			},
			T = function() {
				r && r.reset && r.reset();
				r && r.hide && r.hide();
				s && s.close && s.close()
			},
			U = function(a) {
				m.API.addExtraInfo(a)
			},
			V = function(a) {
				m.API.disableEditor(a)
			},
			W = function() {
				k && k.submit && a.removeEvent(k.submit, "click", w);
				k && k.textEl && a.lib.kit.extra.keySubmit.off(k.textEl, w);
				a.custEvent.remove(m, "textNum", A);
				a.custEvent.remove(m, "blur", D);
				a.custEvent.remove(m, "focus", E);
				a.removeEvent(k.feedconfig, "click", M);
				a.removeEvent(document.body, "click", N);
				r && a.custEvent.remove(r, "changeRank", P);
				a.custEvent.undefine(o, "publish");
				q && q.destroy && q.destroy();
				r && r.destroy && r.destroy();
				s && s.destroy && s.destroy();
				k = null;
				n = null;
				i = !1;
				for (var b in f) delete f[b];
				f = null
			};
		S();
		f.publishTo = r;
		f.close = T;
		f.editor = m;
		f.rend = F;
		f.unrend = I;
		f.addExtraInfo = U;
		f.disableEditor = V;
		f.destroy = W;
		return f
	}
});
STK.register("lib.publisher.publisherDialog", function(a) {
	var b = '<#et temp data><div class="detail" node-type="outer"><div class="send_weibo clearfix" node-type="wrap"><div class="title_area clearfix"><div class="title" node-type="info"></div><div class="num S_txt2" node-type="num">#L{还可以输入}<span>140</span>#L{字}</div><div class="key S_textb"></div></div><div class="input" node-type="textElDiv"><textarea placeholder="" class="W_input" name="" node-type="textEl" range="26&amp;0"></textarea><div class="send_succpic" style="display:none" node-type="successTip"><span class="W_icon icon_succB"></span><span class="txt">发布成功</span></div><form style="display:none;" node-type="extradata"></form></div><div class="func_area clearfix"><div class="func" <#if (data.topic_id)>style="width: auto;"</#if> ><#if (data.topic_id)><span class="opt"><label class="W_label"><input node-type="topic" type="checkbox" value="${data.topic_id}" class="W_checkbox" checked><span>同步到微博</span></label></span></#if><a href="javascript:void(0);" node-type="prev" class="W_btn_b btn_30px">上一步</a><a href="javascript:void(0)" class="W_btn_a btn_30px" node-type="submit">#L{发布}</a></div><div class="kind" node-type="widget"><#if (data.face)><a href="javascript:void(0);" class="S_txt1" action-type="face" action-data="type=500&amp;action=1&amp;log=face&amp;cate=1" title="#L{表情}" node-type="smileyBtn" suda-uatrack="key=tblog_home_edit&amp;value=phiz_button"><em class="W_ficon ficon_face">o</em>表情</a></#if></div></div></div><#if (data.isWemedia)><div class="W_layer_btn_v2 S_bg1"><div><label class="W_label"><input node-type="rightsAgree" type="checkbox" value="" class="W_checkbox"><span>我同意<a href="http://weibo.com/ttarticle/p/show?id=2309403965998205109836" target="_blank">《文章原创声明须知》</a>，并声明本文是原创作品</span></label><a href="http://weibo.com/ttarticle/p/show?id=2309403965998205109836" target="_blank" class="W_icon icon_warnS"></a></div><div class="tips" node-type="rightsRemind" style="display:none"><i class="W_icon icon_rederrorS"></i>提醒：本文与微博文库中的<a href="javascript:" node-type="similarArticle" target="_blank" ></a>相似度达80%以上！</div></div></#if><#if (data.isFollowToRead)><div class="W_layer_btn_v2 S_bg1" node-type="followToRead"><div class="opt">#L{阅读权限}：<label for="ss1" class="W_label"><input name="follow_to_read" type="radio" checked value="1" class="W_radio"><span>仅粉丝可阅读全文（非粉丝只能阅读50%）</span></label><label for="ss2" class="W_label"><input name="follow_to_read" type="radio" value="0" class="W_radio"><span>所有人可阅读全文</span></label></div></div></#if></div></#et>',
		c = {
			title: "#L{有什么新鲜事想告诉大家?}"
		},
		d = a.lib.kit.extra.language,
		e = a.lib.publisher.publisher,
		f = a.core.util.easyTemplate,
		g = window.$CONFIG || {},
		h = a.ui.tipAlert,
		i = {
			limitNum: 140,
			extendText: '<a target="_blank" class="S_txt2" href="http://weibo.com/z/guize/gongyue.html">#L{发言请遵守社区公约}</a>，'
		};
	return function(j) {
		var k = {},
			l, m;
		conf = a.parseParam({
			trans: a.conf.trans.article,
			transName: "publish",
			template: d(b),
			appkey: "",
			styleId: "1",
			face: !0,
			image: !0,
			pid: "",
			content: "",
			info: "",
			title: d(c.title),
			extraUrl: "",
			extraSend: {},
			html: null,
			dialog: "true",
			storage: !1,
			asyncBeforePublish: undefined,
			draft_id: "",
			draft_title: "",
			draft_writer: "",
			draft_image: "",
			draft_summary: "",
			draft_content: "",
			draft_free_content: "",
			pay_setting: "{}",
			isWemedia: 0,
			topic_id: !1,
			extparams: !1,
			isFollowToRead: !1
		}, j);
		conf.extraSend.location = conf.extraSend.location || g.location || "";
		var n = f(d(conf.template), conf).toString();
		conf.html && (n = conf.html);
		conf.editorOpts = i;
		a.custEvent.define(k, ["show", "hide", "publishShare"]);
		var o = function(b) {
				var e = a.parseParam({
					appkey: "",
					content: "",
					info: "",
					pid: "",
					title: d(c.title),
					extraSend: {}
				}, b);
				e.extraSend.location = e.extraSend.location || g.location || "";
				m.setTitle(e.title);
				m.show();
				a.custEvent.add(m, "hidden", s);
				l.rend(e);
				l.editor.API.focus();
				a.custEvent.fire(k, "show");
				a.core.evt.addEvent(m._.nodes.prev, "click", s)
			},
			p = function() {
				setTimeout(s, 1500)
			},
			q = function(b, c, d) {
				a.custEvent.fire(k, "publishShare", [c, d])
			},
			r = function() {
				a.custEvent.add(l, "publish", p);
				a.custEvent.add(l, "publish", q)
			},
			s = function() {
				a.custEvent.remove(m, "hidden", s);
				l.close();
				m.hide();
				a.custEvent.fire(k, "hide")
			},
			t = function() {
				a.core.evt.removeEvent(m._.nodes.prev, "click", s);
				a.custEvent.remove(l, "publish", p);
				l.destroy();
				m.destroy()
			},
			u = function() {
				if (!m) {
					m = a.ui.dialog();
					m.setContent(n)
				}
				conf.node = m.getBox();
				l = e(conf);
				a.custEvent.hook(l, k, {
					publish: "publish",
					hide: "hide"
				});
				r();
				o(conf);
				var b = a.sizzle("input[name=follow_to_read]", m.getBox());
				b[0] && !a.core.util.cookie.get("AFTR") && setTimeout(function() {
					var c = h("选择“仅粉丝可阅读全文”可以大大增加粉丝数量哦", {
						icon: "rederrorS",
						autoHide: !1
					});
					c.beside(b[0]);
					c.on("hide", function() {
						a.core.util.cookie.set("AFTR", 1)
					})
				}, 1e3)
			};
		u();
		k.dialog = m;
		k.publishTo = l.publishTo;
		k.addExtraInfo = l.addExtraInfo;
		k.disableEditor = l.disableEditor;
		k.show = o;
		k.hide = s;
		k.destroy = t;
		return k
	}
});
STK.register("lib.rteditor.init", function(a) {
	function f(a, b) {
		if (Array.prototype.indexOf) return a.indexOf(b);
		for (var c = 0, d = a.length; c < d; ++c) if (a[c] === b) return c;
		return -1
	}
	var b = a.lib.rteditor.plugins,
		c = a.lib.publisher.publisherDialog,
		d = a.lib.rteditor.editor,
		e = a.lib.kit.extra.RGB2Hex;
	return function(c, g) {
		function I() {
			t.editor("off", "editor.change.range", buttonsState);
			for (var a in w) w[a].destroy && w[a].destroy();
			editor.destroy && editor.destroy()
		}
		function H() {
			w();
			G();
			return t
		}
		function G() {
			var b = a.sizzle("[node-type=toolbar]");
			r = a.sizzle("[action-type]", b);
			r.colorline = a.sizzle('[action-type="applyfontcolor"]')[0].children[0];
			for (var c = 0, d = r.length; c < d; ++c) {
				var e = r[c];
				if (a.IE9 && e.getAttribute("action-type") == "image" || e.getAttribute("action-type") == "image") continue;
				a.addEvent(e, "mousedown", function(b) {
					a.stopEvent(b)
				});
				e.setAttribute("unselectable", "on")
			}
			t.editor("on", "editor.change.range", F);
			t.editor("on", "editor.change.block", E)
		}
		function F(a, b) {
			D(b);
			x(b)
		}
		function E(a, b) {
			D(b);
			B(b);
			x(b)
		}
		function D(a) {
			v(!1);
			A();
			var b = a.states;
			for (var c = 0, d = b.length; c < d; ++c) {
				var e = b[c];
				f(q, e) > -1 && y(e)
			}
		}
		function C(b) {
			var c = b.$container.css("color");
			c = e(c);
			a.core.dom.setStyle(r.colorline, "borderBottomColor", c)
		}
		function B(b) {
			var c = b.states,
				d = ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
				e;
			for (var g = 0, h = c.length; g < h; ++g) {
				e = c[g];
				if (f(d, e) > -1) break
			}
			var i = a.sizzle("[action-type=fontsize] span", m)[0],
				j = {
					p: "正文",
					h2: "小标题",
					h1: "大标题"
				};
			if (i) {
				var k = j[e] || j.p;
				i.innerHTML = k
			}
		}
		function A() {
			for (name in u) u.hasOwnProperty(name) && a.removeClassName(u[name], "curr")
		}
		function z(b) {
			u[b] && a.removeClassName(u[b], "curr")
		}
		function y(b) {
			u[b] && a.addClassName(u[b], "curr")
		}
		function x(a) {
			var b = {
				bold: !0,
				italic: !0,
				strikethrough: !0,
				applyfontcolor: !0,
				showfontcolor: !0,
				link: !0,
				line: !0,
				image: !0,
				video: !0,
				product: !0
			},
				c = {
					h1: !0,
					h2: !0,
					h3: !0,
					h4: !0,
					h5: !0,
					h6: !0
				},
				d = a.states;
			for (var e = 0, f = d.length; e < f; ++e) {
				var g = d[e];
				if (c[g]) {
					v(!0, b);
					return !0
				}
			}
			var h = a.range.cloneContents(),
				i = h.childNodes,
				j = ["H1", "H2"];
			for (var e = 0; e < i.length; e++) {
				var k = i[e];
				if (k.nodeType === 1 && ~j.indexOf(k.tagName)) {
					v(!0, b);
					return
				}
			}
			return !1
		}
		function w() {
			h.push(b.baseStyles(t, g));
			h.push(b.fontcolor(t, g));
			h.push(b.fontsize(t, g));
			h.push(b.line(t, g));
			h.push(b.link(t, g));
			h.push(b.image(t, g));
			h.push(b.video(t, g));
			h.push(b.fullscreen(t, g));
			h.push(b.product(t, g));
			t.plugins = b
		}
		function v(b, c) {
			for (var d = 0, e = n.length - 1; d < e; ++d) {
				var f = n[d],
					g = f.children[0],
					h = g.getAttribute("action-type");
				if (c && !c[h]) continue;
				if (b) {
					a.core.dom.addClassName(f, "disable");
					f._disabled = !0
				} else {
					a.core.dom.removeClassName(f, "disable");
					f._disabled = !1
				}
			}
		}
		var h = [],
			i = {},
			j = a.sizzle('[node-type="title"]')[0],
			k = a.sizzle('[node-type="draft"]')[0],
			l = a.sizzle('[action-type="image"]')[0],
			m = a.sizzle("[node-type=toolbar]")[0],
			n = a.sizzle("[node-type=toolbar] ul ul li"),
			o = a.delegatedEvent(c),
			p = window.$CONFIG || {},
			q = "insertorderedlist,insertunorderedlist,bold,italic,underline,strikethrough,blockquote,p,h1,h2,h3,h4,h5,h6".split(","),
			r = {},
			s = !0;
		g = a.parseParam({
			dEvent: o,
			titleNode: j,
			draftNode: k,
			imgBtn: l,
			container: a.sizzle("#editor")[0],
			maxChar: 3e4
		}, g);
		var t = d(g.container).editor({
			ALLOW_TAGS: {
				img: {
					removeInvalidate: {
						src: !0
					},
					attributes: {
						src: /^http[s]?:\/\/[0-9a-zA-Z_!~*'().;?:@&= $,%#-.]+?\..+\w$/i
					}
				},
				iframe: {
					toughAttributes: [{
						name: "contenteditable",
						value: "false"
					}],
					removeInvalidate: {
						src: !0
					},
					attributes: {
						"data-card-id": !0,
						"data-card-type": /^[a-zA-Z0-9]+$/,
						src: /^http[s]?\:\/\/(weibo|www[.]weibo)[.]com\//i,
						width: !0,
						height: !0,
						"class": /^iframe_/i,
						scrolling: /^no$/i,
						frameborder: /^no$/i,
						allowtransparency: /^yes$/i,
						contenteditable: /^false$/i
					}
				},
				p: {
					attributes: {
						id: /^fid\d+/,
						"img-box-loading": /^img-box-loading$/i,
						style: /^text-align:center;$/i,
						contenteditable: /^false$/i
					}
				},
				i: {
					attributes: {
						"class": /^W_loading_big$/i,
						contenteditable: /^false$/i
					}
				},
				hr: {
					attributes: {
						contenteditable: /^false$/i
					}
				},
				fieldset: {
					toughAttributes: [{
						name: "contenteditable",
						value: "false"
					}],
					attributes: {
						"class": /^line$/,
						"data-pay": /^pay_line$/,
						contenteditable: /^false$/
					}
				}
			},
			TERMINAL_BLOCK_TAGS: {
				fieldset: !0,
				iframe: !0,
				hr: !0
			},
			defaultImageCaption: "点击此处添加图片说明文字",
			debug: !1
		});
		t.opts = g;
		var u = function() {
				var b = {},
					c = a.sizzle("[action-type]", m);
				for (var d = 0, e = c.length; d < e; ++d) {
					var f = c[d];
					b[f.getAttribute("action-type")] = f.parentNode
				}
				return b
			}();
		i.init = H;
		i.destroy = I;
		return i
	}
});
STK.register("lib.kit.extra.asyncThrottle", function(a) {
	var b = 300;
	return function(a, c, d) {
		c = c | 0;
		c = c || b;
		var e = 0;
		return function() {
			if (!e) {
				var b = arguments;
				e = setTimeout(function() {
					a.apply(d, b);
					e = 0
				}, c)
			}
		}
	}
});
STK.register("lib.kit.extra.formatDate", function(a) {
	return function b(a, b) {
		var c = {
			"M+": a.getMonth() + 1,
			"d+": a.getDate(),
			"h+": a.getHours(),
			"m+": a.getMinutes(),
			"s+": a.getSeconds(),
			"q+": Math.floor((a.getMonth() + 3) / 3),
			S: a.getMilliseconds()
		};
		/(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (var d in c)(new RegExp("(" + d + ")")).test(b) && (b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
		return b
	}
});
STK.register("page.publish.draftBox", function(a) {
	var b = a.ui.confirm,
		c = a.ui.notice,
		d = a.ui.mask,
		e = a.delegatedEvent,
		f = a.lib.kit.extra.actionData,
		g = a.lib.kit.extra.asyncThrottle,
		h = a.core.util.easyTemplate,
		i = window,
		j = '<#et draftList data><li action-type="draftList" unselectable="on" action-data="id=${data.id}">  <div class="bor">    <div class="tit W_autocut W_f14" action-type="draftTitle">无标题</div>    <div class="status clearfix">      <div class="W_fl S_txt2"><span class="time">${data.time}</span><span class="step" action-type="state" unselectable="on"></span></div>      <div class="W_fr S_txt3"></div>    </div>    <a href="javascript:" class="del" action-type="delDraft" action-data="id=${data.id}" unselectable="on"><em class="W_ficon ficon_dustbin">%</em></a>  </div> </li></#et>';
	return function() {
		function C() {
			n.remove("draftList", "click", t.selectedDraft);
			n.remove("delDraft", "click", t.delDraft);
			a.core.evt.removeEvent(l.createArticle, "click", t.createArticle);
			a.core.evt.removeEvent(i, "resize", o);
			a.core.evt.removeEvent(l.draftBox, "mousewheel", t.mouseScroll)
		}
		function B() {
			w();
			y();
			A();
			t.winResize();
			z();
			return k
		}
		function A() {
			n = e(l.draftBox);
			n.add("draftList", "click", t.selectedDraft);
			n.add("delDraft", "click", t.delDraft);
			a.core.evt.addEvent(l.createArticle, "click", t.createArticle);
			o = g(t.winResize);
			a.core.evt.addEvent(i, "resize", o);
			a.core.evt.addEvent(l.draftBox, "mousewheel", t.mouseScroll)
		}
		function z(b) {
			var c = a.sizzle("[action-type=draftList]", l.draftBox);
			if (c[0]) t.selectedDraft({
				el: c[0]
			});
			else {
				if (b) {
					b();
					return
				}
				t.createArticle()
			}
		}
		function y() {
			l.draftBox = a.sizzle("[node-type=draftBox]")[0];
			l.createArticle = a.sizzle("[node-type=createArticle]")[0];
			l.editorBar = a.sizzle("[node-type=editorBar]")[0];
			l.createArticleBox = a.sizzle("[node-type=createArticleBox]")[0];
			l.createDarftBtnHeight = l.createArticleBox.offsetHeight
		}
		function x(a) {
			var b = a.parentNode;
			while (b && b.tagName != "BODY") {
				if (b.tagName == "LI" && b.getAttribute("action-type") == "draftList") return b;
				b = b.parentNode
			}
			return !1
		}
		function w() {
			a.custEvent.define(k, "saveDraft");
			a.custEvent.define(k, "selectedDraft");
			a.custEvent.define(k, "createDraft");
			a.custEvent.define(k, "delDraft");
			a.custEvent.define(k, "disabled")
		}
		function v(a) {
			a.msg && c(a.msg, {
				icon: "rederrorS"
			})
		}
		function u(b) {
			d.show({
				opacity: .1
			});
			var c = f(b);
			p && a.removeClassName(p, m);
			a.addClassName(b, m);
			p = b;
			a.conf.trans.article.request("getdraft", {
				onSuccess: function(b) {
					a.custEvent.fire(k, "selectedDraft", b.data)
				},
				onFail: v,
				onError: v
			}, {
				id: c.get("id")
			})
		}
		var k = {},
			l = {},
			m = "curr",
			n, o, p, q, r = 5,
			s = "最大草稿个数达到上限",
			t = {
				selectedDraft: function(b) {
					var c = b.el;
					if (p !== c) {
						a.setStyle(l.draftBox.parentNode, "zIndex", 999);
						d.show({
							opacity: .1
						});
						if (p) {
							q = c;
							a.custEvent.fire(k, "saveDraft");
							return
						}
						u(c)
					}
				},
				delDraft: function(c) {
					d.show({
						opacity: .1
					});
					b("确定要删除这篇草稿吗？", {
						icon: "warnB",
						OK: function() {
							var b = f(c.el);
							a.conf.trans.article.request("deldraft", {
								onSuccess: function(b) {
									var d = x(c.el);
									if ( !! d) {
										d.style.overflow = "hidden";
										a.core.ani.tween(d, {
											animationType: "easeoutcubic",
											duration: 300,
											end: function() {
												d.parentNode.removeChild(d);
												if (p === d) {
													p = null;
													z(function() {
														a.custEvent.fire(k, "disabled");
														a.setStyle(l.draftBox.parentNode, "zIndex", 1e3)
													})
												}
											}
										}).play({
											height: 0,
											paddingTop: 0
										})
									}
								},
								onFail: v,
								onError: v
							}, {
								id: b.get("id")
							})
						}
					});
					return !1
				},
				createArticle: function(b) {
					a.setStyle(l.draftBox.parentNode, "zIndex", 999);
					if (k.getDraftNum() >= r) c(s, {
						icon: "rederrorS"
					});
					else {
						d.show({
							opacity: .1
						});
						var e = l.draftBox.children[0];
						a.conf.trans.article.request("draft", {
							onSuccess: function(b) {
								var c = h(j, b.data);
								a.core.dom.insertHTML(e, c, "AfterBegin");
								var d = e.children[0];
								t.selectedDraft({
									el: d
								})
							},
							onFail: v,
							onError: v
						})
					}
				},
				winResize: function() {
					var b = l.editorBar.offsetHeight - l.createDarftBtnHeight | 0;
					b = b < 0 ? 0 : b;
					a.core.dom.setStyle(l.draftBox, "height", b + "px")
				},
				mouseScroll: function(b) {
					a.core.evt.stopEvent(b);
					var c = b.delta || b.wheelDelta;
					l.draftBox.scrollTop -= c
				}
			};
		k.getDraftNum = function() {
			return a.sizzle("[action-type=draftList]", l.draftBox).length || 0
		};
		k.updateSelectedDraftTitle = function(b) {
			if ( !! p) {
				var c = a.sizzle("[action-type=draftTitle]", p)[0];
				c.innerHTML = a.core.str.encodeHTML(a.trim(b) || "无标题")
			}
		};
		k.updateSelectedDraftDate = function() {
			if ( !! p) {
				var b = a.sizzle("[action-type=updateTime]", p)[0],
					c = a.lib.kit.extra.formatDate(new Date, "yyyy-MM-dd hh:mm:ss");
				if (!b) return;
				b.innerHTML = a.core.str.encodeHTML(c)
			}
		};
		k.updateSelectedDraftState = function(b) {
			if ( !! p) {
				var c = a.sizzle("[action-type=state]", p)[0];
				if (!c) return;
				c.innerHTML = b
			}
		};
		k.selecteDraft = function() {
			!q || u(q)
		};
		k.getId = function() {
			if ( !! p) {
				var a = f(selectedDraftNode).get("id");
				return a
			}
		};
		k.init = B;
		k.destroy = C;
		return k
	}
});
STK.register("lib.kit.extra.Reader", function(a) {
	function b(a) {
		if (typeof a != "string") throw "Input stream is not a string!";
		var b = -1,
			c = a.length,
			d = 0,
			e = 0,
			f = function() {
				return a.charAt(b)
			},
			g = function() {
				e++;
				b++;
				if (k()) {
					e = 0;
					d++
				}
				return a.charAt(b)
			},
			h = function(c) {
				e--;
				b--;
				return c && a.charAt(b)
			},
			i = function(d) {
				typeof d != "number" && (d = 0);
				var e = b + d;
				e < 0 && (e = 0);
				e >= c && (e = c);
				return a.charAt(e)
			},
			j = function() {
				return b >= c ? !0 : !1
			},
			k = function(a) {
				a = a || f();
				return a.charCodeAt(0) === 10 ? !0 : a.charCodeAt(0) === 13 ? !0 : a.charCodeAt(0) === 13 && i(1).charCodeAt(0) === 10 ? !0 : !1
			},
			l = function(a) {
				a = a || f();
				return a.charCodeAt(0) === 9 ? !0 : !1
			},
			m = function(a) {
				a = a || f();
				return a.charCodeAt(0) === 32 ? !0 : !1
			},
			n = function(a) {
				a = a || f();
				return a.charCodeAt(0) === 12288 ? !0 : !1
			},
			o = function() {
				return f().charCodeAt(0) === 39 ? !0 : !1
			},
			p = function() {
				return f().charCodeAt(0) === 34 ? !0 : !1
			},
			q = function(a) {
				return !(m(a) || l(a) || k(a))
			},
			r = function() {
				return d + 1
			},
			s = function() {
				return e + 1
			};
		return {
			nextChar: g,
			prevChar: h,
			offsetChar: i,
			isNewLine: k,
			isTabChar: l,
			isSpaceChar: m,
			isWordChar: q,
			isFullWidthSace: n,
			isSingleQuotes: o,
			isDoubleQuotes: p,
			isInputEnd: j,
			getLineNumber: r,
			getCharNumber: s
		}
	}
	return b
});
STK.register("lib.kit.extra.HTMLTokenizer", function(a) {
	function g(a) {
		var g = c.DataState,
			h = function(a, e) {
				var f = "",
					h = 0,
					i = 0,
					j, k = "",
					l = "",
					m = {
						name: "",
						pid: "",
						sid: ""
					};
				while (!a.isInputEnd()) {
					var n = a.nextChar();
					switch (g) {
					case c.DataState:
						if ("<" === n) {
							var o = a.offsetChar(1);
							if (!a.isWordChar(o)) {
								f += n;
								continue
							}
							g = c.TagOpenState;
							f !== "" && e.push({
								token: b.Character,
								value: f,
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber()
							});
							return !0
						}
						f += n;
						break;
					case c.TagOpenState:
						if (a.isWordChar()) if ("!" === n) {
							k = "";
							for (var p = 0; p < 7; ++p) k += a.nextChar();
							if ("doctype" === k.toLowerCase()) g = c.DOCTYPEState;
							else {
								for (var p = 0; p < 7; ++p) a.prevChar();
								if (a.offsetChar(1) === "-" && a.offsetChar(2) === "-") g = c.CommentStartState;
								else {
									g = c.TagNameState;
									a.prevChar()
								}
							}
						} else {
							g = c.TagNameState;
							a.prevChar()
						}
						break;
					case c.TagNameState:
						if (a.isSpaceChar() || a.isTabChar() || a.isNewLine()) {
							g = c.BeforeAttributeNameState;
							e.push({
								token: b.StartTag,
								value: f.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber(),
								attributes: []
							});
							return !0
						}
						if (">" === n) {
							e.push({
								token: b.StartTag,
								value: f.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber(),
								attributes: []
							});
							j = e[e.length - 1];
							j.value in d ? g = d[j.value] : g = c.DataState;
							return !0
						}
						"/" === n ? g = c.EndTagOpenState : f += n;
						break;
					case c.BeforeAttributeNameState:
						if (">" === n) {
							j = e[e.length - 1];
							j.value in d ? g = d[j.value] : g = c.DataState;
							return !0
						}
						if (!a.isWordChar() || "/" == n) continue;
						f += n;
						g = c.AttributeNameState;
						break;
					case c.AttributeNameState:
						if ("=" === n || a.isSpaceChar() || a.isTabChar() || a.isNewLine()) {
							g = c.BeforeAttributeValueState;
							h = e.length - 1;
							e[h].attributes.push({
								name: f.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber(),
								value: ""
							});
							f = ""
						} else {
							if (">" === n) {
								g = c.DataState;
								h = e.length - 1;
								e[h].attributes.push({
									name: f.toLowerCase(),
									cchar: a.getCharNumber() - 1,
									cline: a.getLineNumber(),
									value: ""
								});
								return !0
							}
							f += n
						}
						break;
					case c.BeforeAttributeValueState:
						oc = a.offsetChar(-1);
						if (oc == "=") if (a.isSingleQuotes()) g = c.AttributeValueSingleQuotedState;
						else if (a.isDoubleQuotes()) g = c.AttributeValueDoubleQuotedState;
						else {
							g = c.AttributeValueUnquotedState;
							a.prevChar()
						} else if ("=" === n) g = c.BeforeAttributeValueState;
						else if (">" === n) {
							j = e[e.length - 1];
							j.value in d ? g = d[j.value] : g = c.DataState
						} else if (a.isWordChar()) {
							a.prevChar();
							g = c.AttributeNameState
						}
						break;
					case c.AttributeValueUnquotedState:
						if (a.isWordChar() && n != ">") f += n;
						else if (f.length > 0 && (a.isSpaceChar() || a.isTabChar()) || a.isNewLine() || n == ">") {
							g = c.AfterAttributeValueQuotedState;
							h = e.length - 1;
							i = e[h].attributes.length - 1;
							e[h].attributes[i].quotes = "";
							e[h].attributes[i].value = f;
							e[h].attributes[i].cchar = a.getCharNumber() - 1;
							e[h].attributes[i].cline = a.getLineNumber();
							f = "";
							a.prevChar()
						}
						break;
					case c.AttributeValueDoubleQuotedState:
						if (a.isDoubleQuotes()) {
							g = c.AfterAttributeValueQuotedState;
							h = e.length - 1;
							i = e[h].attributes.length - 1;
							e[h].attributes[i].quotes = '"';
							e[h].attributes[i].value = f;
							e[h].attributes[i].cchar = a.getCharNumber() - 1;
							e[h].attributes[i].cline = a.getLineNumber();
							f = ""
						} else f += n;
						break;
					case c.AttributeValueSingleQuotedState:
						if (a.isSingleQuotes()) {
							g = c.AfterAttributeValueQuotedState;
							h = e.length - 1;
							i = e[h].attributes.length - 1;
							e[h].attributes[i].quotes = "'";
							e[h].attributes[i].value = f;
							e[h].attributes[i].cchar = a.getCharNumber() - 1;
							e[h].attributes[i].cline = a.getLineNumber();
							f = ""
						} else f += n;
						break;
					case c.AfterAttributeValueQuotedState:
						if (">" === n) {
							j = e[e.length - 1];
							j.value in d ? g = d[j.value] : g = c.DataState;
							return !0
						}
						g = c.BeforeAttributeNameState;
						break;
					case c.EndTagOpenState:
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.EndTag,
								value: f.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber()
							});
							return !0
						}
						f += n;
						break;
					case c.RCDATAState:
						if ("<" === n) {
							k += n;
							g = c.RCDATALessThanSignState
						} else f += n;
						break;
					case c.RCDATALessThanSignState:
						if ("/" === n) {
							k += n;
							g = c.RCDATAEndTagOpenState
						} else {
							g = c.RCDATAState;
							f += "<" + n;
							k = ""
						}
						break;
					case c.RCDATAEndTagOpenState:
						k += n;
						l += n;
						if (!a.isWordChar() || ">" === a.offsetChar(1)) g = c.RCDATAEndTagNameState;
						break;
					case c.RCDATAEndTagNameState:
						j = e[e.length - 1];
						if (j.value === l) {
							f != "" && e.push({
								token: b.Character,
								value: f,
								needEscape: !0,
								cchar: a.getCharNumber() - l.length - 3,
								cline: a.getLineNumber()
							});
							e.push({
								token: b.EndTag,
								value: l.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber()
							});
							g = c.DataState;
							return !0
						}
						k += n;
						f += k;
						k = "";
						l = "";
						g = c.RCDATAState;
						break;
					case c.RAWTEXTState:
						if ("<" === n) {
							k += n;
							g = c.RAWTEXTLessThanSignState
						} else f += n;
						break;
					case c.RAWTEXTLessThanSignState:
						if ("/" === n) {
							k += n;
							g = c.RAWTEXTEndTagOpenState
						} else {
							g = c.RAWTEXTState;
							f += "<" + n;
							k = ""
						}
						break;
					case c.RAWTEXTEndTagOpenState:
						k += n;
						l += n;
						if (!a.isWordChar() || ">" === a.offsetChar(1)) g = c.RAWTEXTEndTagNameState;
						break;
					case c.RAWTEXTEndTagNameState:
						j = e[e.length - 1];
						if (j.value === l) {
							f != "" && e.push({
								token: b.Character,
								value: f,
								needEscape: !1,
								cchar: a.getCharNumber() - l.length - 3,
								cline: a.getLineNumber()
							});
							e.push({
								token: b.EndTag,
								value: l.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber()
							});
							g = c.DataState;
							return !0
						}
						k += n;
						f += k;
						k = "";
						l = "";
						g = c.RAWTEXTState;
						break;
					case c.ScriptDataState:
						if ("<" === n) {
							k += n;
							g = c.ScriptDataLessThanSignState
						} else f += n;
						break;
					case c.ScriptDataLessThanSignState:
						if ("/" === n) {
							k += n;
							g = c.ScriptDataEndTagOpenState
						} else {
							g = c.ScriptDataState;
							f += "<" + n;
							k = ""
						}
						break;
					case c.ScriptDataEndTagOpenState:
						k += n;
						l += n;
						if (!a.isWordChar() || ">" === a.offsetChar(1)) g = c.ScriptDataEndTagNameState;
						break;
					case c.ScriptDataEndTagNameState:
						j = e[e.length - 1];
						if (j.value === l) {
							f != "" && e.push({
								token: b.Character,
								value: f,
								needEscape: !1,
								cchar: a.getCharNumber() - l.length - 3,
								cline: a.getLineNumber()
							});
							e.push({
								token: b.EndTag,
								value: l.toLowerCase(),
								cchar: a.getCharNumber() - 1,
								cline: a.getLineNumber()
							});
							g = c.DataState;
							return !0
						}
						k += n;
						f += k;
						k = "";
						l = "";
						g = c.ScriptDataState;
						break;
					case c.CommentStartState:
						"-" === n && (g = c.CommentStartDashState);
						break;
					case c.CommentStartDashState:
						"-" === n && (g = c.CommentState);
						break;
					case c.CommentState:
						"-" === n && "-" == a.offsetChar(1) ? g = c.CommentEndDashState : f += n;
						break;
					case c.CommentEndDashState:
						"-" === n && ">" == a.offsetChar(1) && (g = c.CommentEndState);
						break;
					case c.CommentEndState:
						g = c.DataState;
						e.push({
							token: b.Comment,
							value: f,
							cchar: a.getCharNumber() - f.length - 3,
							cline: a.getLineNumber()
						});
						return !0;
					case c.DOCTYPEState:
						if (!a.isWordChar()) {
							g = c.BeforeDOCTYPENameState;
							continue
						}
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
						g = c.BogusDOCTYPEState;
						break;
					case c.BeforeDOCTYPENameState:
						if (a.isSpaceChar()) continue;
						if (a.isWordChar()) {
							g = c.DOCTYPENameState;
							a.prevChar();
							continue
						}
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
						break;
					case c.DOCTYPENameState:
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
						if (a.isWordChar()) {
							m.name += n;
							continue
						}
						g = c.AfterDOCTYPENameState;
						break;
					case c.AfterDOCTYPENameState:
						if (!a.isWordChar()) continue;
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
						k = "";
						k += n;
						for (var p = 0; p < 5; ++p) k += a.nextChar();
						if ("public" === k.toLowerCase()) {
							g = c.AfterDOCTYPEPublicKeywordState;
							continue
						}
						if ("system" === k.toLowerCase()) {
							g = c.AfterDOCTYPESystemKeywordState;
							continue
						}
						g = c.BogusDOCTYPEState;
						for (var p = 0; p < 5; ++p) a.prevChar();
						break;
					case c.AfterDOCTYPEPublicKeywordState:
						if (!a.isWordChar()) {
							g = c.BeforeDOCTYPEPublicIdentifierState;
							continue
						}
						">" === n && (g = c.BogusDOCTYPEState);
						break;
					case c.BeforeDOCTYPEPublicIdentifierState:
						if (a.isSingleQuotes()) {
							g = c.DOCTYPEPublicIdentifierSingleQuotedState;
							continue
						}
						if (a.isDoubleQuotes()) {
							g = c.DOCTYPEPublicIdentifierDoubleQuotedState;
							continue
						}
						">" === n && (g = c.BogusDOCTYPEState);
						break;
					case c.DOCTYPEPublicIdentifierDoubleQuotedState:
						">" === n && (g = c.BogusDOCTYPEState);
						if (a.isDoubleQuotes()) {
							g = c.AfterDOCTYPEPublicIdentifierState;
							continue
						}
						a.isWordChar() && (m.pid += n);
						break;
					case c.DOCTYPEPublicIdentifierSingleQuotedState:
						">" === n && (g = c.BogusDOCTYPEState);
						if (a.isSingleQuotes()) {
							g = c.AfterDOCTYPEPublicIdentifierState;
							continue
						}
						a.isWordChar() && (m.pid += n);
						break;
					case c.AfterDOCTYPEPublicIdentifierState:
						if (!a.isWordChar()) {
							g = c.BetweenDOCTYPEPublicAndSystemIdentifiersState;
							continue
						}
						g = c.BogusDOCTYPEState;
						break;
					case c.BetweenDOCTYPEPublicAndSystemIdentifiersState:
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
						if (a.isSingleQuotes()) {
							g = c.DOCTYPESystemIdentifierSingleQuotedState;
							continue
						}
						if (a.isDoubleQuotes()) {
							g = c.DOCTYPESystemIdentifierDoubleQuotedState;
							continue
						}
						break;
					case c.AfterDOCTYPESystemKeywordState:
						if (!a.isWordChar()) {
							g = c.BeforeDOCTYPESystemKeywordState;
							continue
						}
						">" === n && (g = c.BogusDOCTYPEState);
						break;
					case c.BeforeDOCTYPESystemIdentifierState:
						if (a.isSingleQuotes()) {
							g = c.DOCTYPESystemIdentifierSingleQuotedState;
							continue
						}
						if (a.isDoubleQuotes()) {
							g = c.DOCTYPESystemIdentifierDoubleQuotedState;
							continue
						}
						g = c.BogusDOCTYPEState;
						break;
					case c.DOCTYPESystemIdentifierDoubleQuotedState:
						">" === n && (g = c.BogusDOCTYPEState);
						if (a.isDoubleQuotes()) {
							g = c.AfterDOCTYPESystemIdentifierState;
							continue
						}
						a.isWordChar() && (m.sid += n);
						break;
					case c.DOCTYPESystemIdentifierSingleQuotedState:
						">" === n && (g = c.BogusDOCTYPEState);
						if (a.isSingleQuotes()) {
							g = c.AfterDOCTYPESystemIdentifierState;
							continue
						}
						a.isWordChar() && (m.sid += n);
						break;
					case c.AfterDOCTYPESystemIdentifierState:
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
						g = c.BogusDOCTYPEState;
						break;
					case c.BogusDOCTYPEState:
						if (">" === n) {
							g = c.DataState;
							e.push({
								token: b.Doctype,
								name: m.name,
								pid: m.pid,
								sid: m.sid,
								cchar: a.getCharNumber(),
								cline: a.getLineNumber()
							});
							continue
						}
					}
				}
				if (e.length == 0 && f != "") {
					e.push({
						token: b.Character,
						value: f,
						needEscape: !1,
						cchar: 1,
						cline: 1
					});
					return !1
				}
				if (f !== "") {
					e.push({
						token: b.Character,
						value: f,
						cchar: a.getCharNumber() - 1,
						cline: a.getLineNumber()
					});
					return !1
				}
				return !1
			},
			i = function() {
				g = c.DataState;
				var b = [];
				while (h(a, b));
				return b
			},
			j = function(a) {
				if (!a) return !1;
				var c = "",
					d = a.length;
				if (d == 0) return "";
				for (var e = 0; e < d; ++e) {
					var f = a[e];
					if (!f) continue;
					var g = f.token;
					g == b.Character && (f.needEscape ? c += p(f.value) : c += f.value)
				}
				return c
			},
			k = function(a) {
				if (!a) return !1;
				var c = "",
					d = a.length;
				if (d == 0) return "";
				for (var f = 0; f < d; ++f) {
					var g = a[f];
					if (!g) continue;
					var h = g.token,
						i;
					switch (h) {
					case b.StartTag:
						c += "<" + g.value;
						for (var j = 0, k = g.attributes.length; j < k; ++j) {
							var l = g.attributes[j];
							if (!l.value) c += " " + l.name;
							else {
								i = l.quotes || '"';
								c += " " + l.name + "=" + i + l.value + i
							}
						}
						e[g.value] ? c += " />" : c += ">";
						break;
					case b.EndTag:
						e[g.value] ? c += "<" + g.value + " />" : c += "</" + g.value + ">";
						break;
					case b.Comment:
						break;
					case b.Doctype:
						c += "<!DOCTYPE" + g.name;
						g.pid && g.pid != "" && (c += ' PUBLIC "' + g.pid + '"');
						g.sid && g.sid != "" && (c += ' "' + g.sid + '"');
						c += ">";
						break;
					case b.Character:
						g.needEscape ? c += p(g.value) : c += g.value
					}
				}
				return c
			},
			l = function(a, c) {
				if (!a) return !1;
				var d = a.length;
				if (d == 0) return !1;
				var g = [],
					h = [];
				for (var i = 0; i < d; ++i) {
					var j = a[i];
					if (!j) continue;
					var k = j.token,
						l = j.value;
					if (k === b.StartTag) {
						e[l] || g.unshift(l);
						continue
					}
					if (k === b.EndTag) {
						if (c) {
							g[0] === l ? g.shift(0) : h.push(j);
							continue
						}
						g[0] == l ? g.shift(0) : f[g[0]] ? g.shift(0) : h.push(j)
					}
				}
				return h
			},
			m = function(a, c) {
				c || (c = {
					"*": "",
					href: "javascript:"
				});
				var d = a.length;
				if (d == 0) return !1;
				var e = [];
				for (var f = 0; f < d; ++f) {
					var g = a[f];
					if (!g) continue;
					var h = g.token;
					if (h != b.StartTag || !g.attributes) {
						e.push(g);
						continue
					}
					var i = [],
						j = g.attributes;
					for (var k = 0, l = j.length; k < l; ++k) {
						g.attributes = i;
						var m = j[k],
							n = m.value.toLowerCase();
						(!c["*"] || n.indexOf(c["*"]) == -1) && (!c[m.name] || m.value == "" || n.indexOf(c[m.name]) == -1) && i.push(m)
					}
					e.push(g)
				}
				return e
			},
			n = function(a, c) {
				c || (c = {
					tags: {
						p: !0,
						a: !0,
						span: !0,
						br: !0,
						textarea: !0
					},
					attrs: {
						"*": {
							"class": !0,
							id: !0,
							mid: !0,
							isforward: !0,
							"action-type": !0,
							"action-data": !0
						},
						img: {
							src: !0
						},
						div: {
							"diss-data": !0
						},
						script: {
							type: !0
						}
					}
				});
				var e = a.length;
				if (e == 0) return !1;
				var f = [];
				for (var g = 0; g < e; ++g) {
					var h = a[g];
					if (!h) continue;
					var i = h.token,
						j = h.value,
						k;
					if (i != b.StartTag && i != b.EndTag && !h.needEscape) {
						f.push(h);
						continue
					}
					if (i === b.StartTag || i === b.EndTag) if (c.tags && !c.tags[j]) {
						f.push(h);
						j in d && c.tags && !c.tags[j] && a[g + 1].token == b.Character && f.push(a[g + 1])
					} else c.tags || f.push(h);
					if (i === b.StartTag && c.attrs) {
						var l = h.attributes;
						h.fliterAttrs = [];
						for (var m = 0, n = l.length; m < n; ++m) {
							k = l[m];
							if (c.attrs["*"]) {
								if (!c.attrs[j] && !c.attrs["*"][k.name]) {
									h.fliterAttrs.push(k);
									continue
								}
								if (c.attrs[j] && !c.attrs["*"][k.name] && !c.attrs[j][k.name]) {
									h.fliterAttrs.push(k);
									continue
								}
							} else c.attrs[j] && !c.attrs[j][k.name] && h.fliterAttrs.push(k)
						}
						h.attributes = h.fliterAttrs;
						delete h.fliterAttrs;
						continue
					}
				}
				return f
			},
			o = function(a, c) {
				c || (c = {
					"*": {
						"class": !0,
						id: !0,
						"action-type": !0,
						"action-data": !0
					},
					p: {
						"node-type": !0
					},
					div: {
						mid: !0
					},
					span: {
						"node-type": !0
					},
					br: {},
					textarea: {},
					script: {
						type: !0
					}
				});
				var e = a.length;
				if (e == 0) return !1;
				var f = [];
				for (var g = 0; g < e; ++g) {
					var h = a[g];
					if (!h) continue;
					var i = h.token,
						j = h.value,
						k;
					if (i === b.StartTag && c[j]) {
						var l = h.attributes;
						f.push(h);
						j in d && a[g + 1].token == b.Character && f.push(a[g + 1]);
						if (!l) continue;
						h.newAttrs = [];
						for (var m = 0, n = l.length; m < n; ++m) {
							k = l[m];
							if (c[j] && c[j][k.name] || c["*"] && c["*"][k.name]) {
								h.newAttrs.push(k);
								continue
							}
							k && c[j][k.name] && h.newAttrs.push(k)
						}
						h.attributes = h.newAttrs;
						delete h.newAttrs;
						continue
					}
					if (i === b.EndTag && c[j]) {
						f.push(h);
						continue
					}
					if (i === b.Character && !h.needEscape) {
						f.push(h);
						continue
					}
				}
				return f
			},
			p = function(a) {
				if (typeof a != "string") throw "args one is not string!";
				var b = "&#",
					c = ";",
					d = "";
				for (var e = 0, f = a.length; e < f; ++e) d += b + a.charCodeAt(e) + c;
				return d
			};
		return {
			HTMLTokeEnum: b,
			scanner: i,
			toHTML: k,
			toText: j,
			tabClosedCheck: l,
			HTMLSelector: o,
			HTMLFilter: n,
			HTMLAttrValFilter: m
		}
	}
	var b = {
		StartTag: 0,
		EndTag: 1,
		Comment: 2,
		Character: 3,
		Doctype: 4
	},
		c = {
			DataState: 0,
			TagOpenState: 1,
			EndTagOpenState: 2,
			TagNameState: 3,
			CommentStartState: 4,
			CommentStartDashState: 5,
			CommentState: 6,
			CommentEndDashState: 7,
			CommentEndState: 8,
			BeforeAttributeNameState: 9,
			AttributeNameState: 10,
			AfterAttributeNameState: 11,
			BeforeAttributeValueState: 12,
			AttributeValueDoubleQuotedState: 13,
			AttributeValueSingleQuotedState: 14,
			AttributeValueUnquotedState: 15,
			AfterAttributeValueQuotedState: 16,
			RCDATAState: 17,
			RAWTEXTState: 18,
			ScriptDataState: 19,
			RCDATALessThanSignState: 20,
			RCDATAEndTagOpenState: 21,
			RCDATAEndTagNameState: 22,
			RAWTEXTLessThanSignState: 23,
			RAWTEXTEndTagOpenState: 24,
			RAWTEXTEndTagNameState: 25,
			ScriptDataLessThanSignState: 26,
			ScriptDataEndTagOpenState: 27,
			ScriptDataEndTagNameState: 28,
			DOCTYPEState: 29,
			BeforeDOCTYPENameState: 30,
			DOCTYPENameState: 31,
			AfterDOCTYPENameState: 32,
			AfterDOCTYPEPublicKeywordState: 33,
			BeforeDOCTYPEPublicIdentifierState: 34,
			DOCTYPEPublicIdentifierDoubleQuotedState: 35,
			DOCTYPEPublicIdentifierSingleQuotedState: 36,
			AfterDOCTYPEPublicIdentifierState: 37,
			BetweenDOCTYPEPublicAndSystemIdentifiersState: 38,
			AfterDOCTYPESystemKeywordState: 38,
			BeforeDOCTYPESystemIdentifierState: 40,
			DOCTYPESystemIdentifierDoubleQuotedState: 41,
			DOCTYPESystemIdentifierSingleQuotedState: 42,
			AfterDOCTYPESystemIdentifierState: 43,
			BogusDOCTYPEState: 44
		},
		d = {
			title: c.RCDATAState,
			textarea: c.RCDATAState,
			pre: c.RCDATAState,
			style: c.RAWTEXTState,
			xmp: c.RAWTEXTState,
			iframe: c.RAWTEXTState,
			noembed: c.RAWTEXTState,
			noframes: c.RAWTEXTState,
			noscript: c.RAWTEXTState,
			script: c.ScriptDataState
		},
		e = {
			area: !0,
			base: !0,
			basefont: !0,
			br: !0,
			col: !0,
			frame: !0,
			hr: !0,
			img: !0,
			input: !0,
			isindex: !0,
			link: !0,
			meta: !0,
			param: !0
		},
		f = {
			body: !0,
			colgroup: !0,
			dd: !0,
			dt: !0,
			head: !0,
			html: !0,
			li: !0,
			option: !0,
			p: !0,
			tbody: !0,
			td: !0,
			tfoot: !0,
			th: !0,
			thead: !0,
			tr: !0
		};
	g.HTMLTokeEnum = b;
	return g
});
STK.register("lib.rteditor.helpers.clearHTML", function(a) {
	function m(a, b) {
		var c = a.toText(b.pay);
		c = c.replace(e, "").replace(/\u32\n\r/g, "").replace(/\&nbsp\;/g, "");
		return c
	}
	function l(a) {
		var b = {
			free: [],
			pay: []
		};
		if (!a || !a.length) return b;
		var c = 0,
			e = 0,
			f = !1;
		for (var g = 0, h = a.length; g < h; ++g) {
			var i = a[g];
			if (!i) continue;
			var j = i.token,
				k = i.value;
			if (j == d.StartTag && k === "fieldset") {
				var l = i.attributes;
				for (var m = 0, n = l.length; m < n; ++m) {
					attr = l[m];
					if (attr.name == "data-pay" && attr.value == "pay_line") {
						f = !0;
						c = g;
						continue
					}
				}
			}
			if (f && j == d.EndTag && k === "fieldset" && g > c) {
				e = g;
				break
			}
		}
		if (g == h - 1) {
			b.free = a;
			return b
		}
		if (c >= e) {
			b.free = a;
			return b
		}
		b.free = a.slice(0, c);
		b.pay = a.slice(e + 1, h);
		return b
	}
	function k(a) {
		if (!a || !a.length) return [];
		for (var b = 0, c = a.length; b < c; ++b) {
			var e = a[b];
			if (!e) continue;
			if (e.token != d.StartTag || e.value != "img") continue;
			var f = e.attributes;
			for (var g = 0, h = f.length; g < h; ++g) {
				attr = f[g];
				attr.name == "alt" && (attr.value = attr.value.replace(/&amp;/g, "&"))
			}
		}
		return a
	}
	function j(a) {
		if (!a || !a.length) return [];
		var b = !1;
		for (var c = 0, e = a.length; c < e; ++c) {
			var f = a[c];
			if (!f) continue;
			var g = f.token,
				h = f.value;
			if (!b && g == d.StartTag && h == "iframe") {
				f.value = "card";
				b = !0;
				continue
			}
			if (b && g == d.EndTag && h == "iframe") {
				f.value = "card";
				b = !1;
				continue
			}
		}
		return a
	}
	function i(a) {
		var b = ["a", "font"];
		for (var c = 0, d = b.length; c < d; ++c) a = g(b[c], a)
	}
	function h(a) {
		var b = ["h1", "h2", "h3", "h4", "h5", "h6", "a"];
		for (var c = 0, d = b.length; c < d; ++c) a = g(b[c], a);
		return a
	}
	function g(a, b) {
		var c = !1,
			e = 0;
		if (!b || !b.length) return [];
		var f = [];
		for (var g = 0, h = b.length; g < h; ++g) {
			var i = b[g];
			if (!i) continue;
			var j = i.token,
				k = i.value;
			if (j === d.Character) {
				f.push(i);
				continue
			}
			if (!c && j == d.StartTag && k === a) {
				f.push(i);
				e++;
				c = !0;
				continue
			}
			if (!c && j == d.StartTag) {
				f.push(i);
				continue
			}
			if (!c && j == d.EndTag) {
				f.push(i);
				continue
			}
			if (c && j == d.StartTag && k === a) {
				e++;
				continue
			}
			if (c && j == d.StartTag) continue;
			if (c && j == d.EndTag) {
				if (k === a && e == 1) {
					f.push(i);
					c = !1;
					e = 0;
					continue
				}
				if (k === a && e > 1) {
					e--;
					continue
				}
				if (k === a && e < 1) {
					e = 0;
					continue
				}
			}
		}
		return f
	}
	var b = a.lib.kit.extra.Reader,
		c = a.lib.kit.extra.HTMLTokenizer,
		d = c.HTMLTokeEnum,
		e = /\u200B/g,
		f = {
			font: {
				color: !0
			},
			p: {},
			h1: {},
			h2: {},
			em: {},
			i: {},
			b: {},
			strong: {},
			s: {},
			strike: {},
			del: {},
			a: {
				href: !0
			},
			img: {
				src: !0,
				alt: !0
			},
			ul: {},
			ol: {},
			li: {},
			blockquote: {},
			br: {},
			hr: {},
			fieldset: {
				"class": !0,
				"data-pay": !0
			},
			iframe: {
				"data-card-id": !0,
				"data-card-type": !0
			},
			card: {
				"data-card-id": !0,
				"data-card-type": !0
			}
		};
	return function(a) {
		var d = b(a),
			g = c(d),
			i = g.scanner();
		i = g.HTMLSelector(i, f);
		i = j(i);
		i = h(i);
		i = k(i);
		var n = l(i);
		return {
			content: n,
			freeHTML: g.toHTML(n.free),
			payHTML: g.toHTML(n.pay),
			freeText: g.toText(n.free).replace(e, ""),
			payText: m(g, n)
		}
	}
});
STK.register("lib.rteditor.helpers.html2markdown", function(a) {
	function g(a, b, c) {
		if (!b) return "";
		if (!a || !a.length) return "";
		var d = a[b].attributes,
			e = d.length;
		if (!d || !e) return "";
		for (var f = 0; f < e; ++f) if (d[f].name === c) return d[f].value;
		return !1
	}
	function f(a, b, d) {
		if (!a || !a.length) return "";
		var e = a.length;
		for (var f = b; f < e; ++f) {
			var g = a[f],
				h = g.token,
				i = g.value;
			if (h === c.EndTag && i === d) break
		}
		var j = a.slice(b, f),
			k = "";
		for (var l = 0, e = j.length; l < e; ++l) {
			var g = j[l],
				h = g.token,
				i = g.value;
			if (h != c.Character) continue;
			k += i
		}
		return {
			txt: k,
			i: f
		}
	}
	function e(a, b) {
		if (!a || !a.length) return "";
		var d = a.length,
			e = "";
		for (var f = b + 1; f < d; ++f) {
			var g = a[f],
				h = g.token,
				i = g.value;
			if (h != c.Character) break;
			e += i
		}
		return e
	}
	var b = a.lib.kit.extra.HTMLTokenizer,
		c = b.HTMLTokeEnum,
		d = a.core.util.templet;
	return function(a) {
		if (!a || !a.length) return "";
		var b = [],
			h = a.length,
			i = {
				em: {
					s: "*",
					e: "*"
				},
				i: {
					s: "*",
					e: "*"
				},
				b: {
					s: "**",
					e: "**"
				},
				strong: {
					s: "**",
					e: "**"
				},
				s: {
					s: "~~",
					e: "~~"
				},
				del: {
					s: "~~",
					e: "~~"
				},
				strike: {
					s: "~~",
					e: "~~"
				},
				h1: {
					s: "\n# ",
					e: " #\n"
				},
				h2: {
					s: "\n## ",
					e: " ##\n"
				}
			},
			j = {
				hr: "\n --- \n",
				p: "\n",
				br: "\n",
				div: "\n\n"
			},
			k = [],
			l = 1,
			m = !1;
		for (var n = 0; n < h; ++n) {
			var o = a[n];
			if (!o) continue;
			var p = o.token,
				q = o.value;
			if (p === c.Character) {
				var r = o.value;
				r = r.replace(/\[/g, "#&91;").replace(/\]/g, "#&93;").replace(/\>/g, "&lt;").replace(/\</g, "#&gt;");
				b.push(r);
				continue
			}
			if (p === c.EndTag) {
				var s = q,
					t = i[s];
				t && b.push(t.e);
				if (s === "ul" && k[k.length - 1] == "ul") {
					k.pop();
					l = 1;
					continue
				}
				if (s === "ol" && k[k.length - 1] == "ol") {
					k.pop();
					l = 1;
					continue
				}
				if (s === "font") {
					b.push("[/font]");
					continue
				}
				s === "blockquote" && (m = !1);
				continue
			}
			if (p === c.StartTag) {
				var s = q,
					u = j[s],
					t = i[s];
				u && (m ? b.push(u + "> ") : b.push(u));
				t && b.push(t.s);
				if (s === "a") {
					var v = f(a, n, "a"),
						w = v.txt,
						x = g(a, n, "href");
					if (!x) continue;
					b.push(d("[#{value}](#{href})", {
						value: w || x,
						href: x
					}));
					n = v.i;
					continue
				}
				if (s === "img") {
					var y = g(a, n, "alt"),
						z = g(a, n, "src");
					if (!z) continue;
					y = y || z;
					b.push(d("![#{alt}](#{src})", {
						alt: y || z,
						src: z
					}));
					continue
				}
				if (s === "ol") {
					k.push("ol");
					continue
				}
				if (s === "ul") {
					k.push("ul");
					continue
				}
				if (s === "li") {
					var w = e(a, n);
					if (k[k.length - 1] == "ol") {
						m ? b.push("\n> " + l + ". " + w) : b.push("\n" + l + ". " + w);
						l++;
						continue
					}
					if (k[k.length - 1] == "ul") {
						m ? b.push("\n> - " + w) : b.push("\n- " + w);
						continue
					}
					continue
				}
				if (s === "font") {
					b.push(d('[font color="#{color}"]#{txt}', {
						color: g(a, n, "color") || "",
						txt: e(a, n) || ""
					}));
					continue
				}
				s === "blockquote" && (m = !0)
			}
		}
		return b.join("")
	}
});
STK.register("lib.rteditor.helpers.parseIframeToCard", function(a) {
	return function b(a) {
		var b = /<iframe.*?(?: |\t|\r|\n)?card=[\'\"]?(.+?)[\'\"]?(?:(?: |\t|\r|\n)+.*?)?>(.*?)<\/iframe.*?>/ig,
			c = [];
		a = a.replace(b, function(a, b) {
			c.push(b);
			return '<card id="' + b + '"></card>'
		});
		return {
			html: a,
			ids: c
		}
	}
});
STK.register("lib.rteditor.uploadHeader", function(a) {
	var b = a.ui.alert,
		c = a.lib.kit.extra.language,
		d = a.lib.kit.extra.imageURL,
		e = 1e3,
		f = 562,
		g = function(a) {
			a = a + "";
			if (a.length >= 32 && a[22] >= "1") return {
				w: parseInt(a.substr(23, 3), 36),
				h: parseInt(a.substr(26, 3), 36)
			}
		},
		h = function(b, c) {
			var e = g(b),
				f = a.C("img");
			f.width = e.w;
			f.height = e.h;
			f.style.cssText = "position:absolute;top:0px;left:0px;";
			f.ondragstart = function() {
				return !1
			};
			f.onselectstart = function() {
				return !1
			};
			f.onload = c;
			f.src = d(b, {
				size: "large"
			});
			return f
		};
	return {
		init: function(d, g) {
			var i, j = {},
				k = {
					start: {},
					end: {},
					delta: {}
				},
				l = {
					value: ""
				},
				m = a.sizzle(".picbox", d)[0],
				n = a.sizzle(".W_loading_big", d)[0],
				o = a.sizzle(".txtbox", d)[0],
				p = a.sizzle(".upload", d)[0],
				q = a.sizzle(".optbox", d)[0],
				r = a.sizzle("input[type=file]", d),
				s = a.parseParam({
					maxW: e,
					maxH: f
				}, g);
			a.setStyle(d, "transition", "height linear .2s");
			var t = function() {
					l.value = i.src.replace("large", ["crop", Math.floor(Math.abs(j.x) / j.per), Math.floor(Math.abs(j.y) / j.per), Math.floor(s.maxW / j.per), Math.floor(s.maxH / j.per), s.maxW, s.maxH].join("."))
				},
				u = function(a, b) {
					j.realW = a.width;
					j.realH = a.height;
					j.x = 0;
					j.y = 0;
					if (e / j.realW * j.realH > f) {
						j.per = s.maxW / j.realW;
						j.w = s.maxW;
						j.h = j.per * j.realH;
						a.width = j.w;
						a.height = j.h
					} else {
						j.per = s.maxH / j.realH;
						j.h = s.maxH;
						j.w = j.per * j.realW;
						a.width = j.w;
						a.height = j.h
					}
					if (b) {
						b = b.split(".");
						j.x = b[1] * j.per * -1;
						j.y = b[2] * j.per * -1;
						a.style.left = j.x + "px";
						a.style.top = j.y + "px"
					}
				},
				v = function(a) {
					n.style.display = a ? "" : "none";
					o.style.display = a ? "none" : ""
				},
				w = function() {
					v(0);
					m.innerHTML = "";
					p.style.display = "";
					o.style.display = "";
					m.style.display = "none";
					q.style.display = "none";
					d.className = "main_toppic"
				},
				x = function() {
					v(1);
					m.innerHTML = "";
					m.style.display = "";
					q.style.display = "";
					p.style.display = "none";
					o.style.display = "none";
					d.className = "main_toppic main_toppic_v2 main_toppic_cursor"
				},
				y = function(a) {
					if (a.message) {
						v(0);
						b(c(a.message), {
							icon: "warnB"
						}).ok(c("#L{我知道了}"))
					} else if (a.pid) {
						i = h(a.pid, function() {
							v(0)
						});
						u(i);
						t();
						x();
						m.appendChild(i)
					}
				},
				z = function(b) {
					b = a.fixEvent(b);
					var c, d;
					k.delta.x = b.pageX - k.end.x;
					k.delta.y = b.pageY - k.end.y;
					k.end.x = b.pageX;
					k.end.y = b.pageY;
					c = j.x + k.delta.x;
					d = j.y + k.delta.y;
					if (c + j.w >= s.maxW && c <= 0) {
						j.x = c;
						i.style.left = j.x + "px"
					}
					if (d + j.h >= s.maxH && d <= 0) {
						j.y = d;
						i.style.top = j.y + "px"
					}
					t()
				},
				A = function(b) {
					a.removeEvent(m, "mousemove", z);
					a.removeEvent(m, "mouseup", A)
				},
				B = function(b) {
					k.start.x = k.end.x = b.pageX;
					k.start.y = k.end.y = b.pageY;
					a.addEvent(m, "mousemove", z);
					a.addEvent(m, "mouseup", A)
				};
			a.addEvent(m, "mousedown", B);
			a.addEvent(m, "mouseout", A);
			q.ondragstart = q.onselectstart = function() {
				return !1
			};
			for (var C = 0; C < r.length; C++) a.lib.kit.extra.upload.init(r[C], !1, function() {
				v(1);
				return !0
			}, y);
			l.setValue = function(a) {
				if (!a) {
					w();
					l.value = ""
				} else {
					x();
					var b = a.match(/crop(\.\d*){6}/),
						c = a.substring(a.lastIndexOf("/") + 1, a.lastIndexOf("."));
					i = h(c, function() {
						v(0)
					});
					u(i, b && b[0]);
					m.appendChild(i);
					l.value = a
				}
			};
			return l
		}
	}
});
STK.register("conf.trans.global", function(a) {
	var b = a.lib.kit.io.inter(),
		c = b.register;
	c("language", {
		url: "/aj/user/lang",
		method: "post"
	});
	c("followList", {
		url: "/aj/mblog/attention"
	});
	c("topicList", {
		url: "/aj/mblog/topic"
	});
	c("myFollowList", {
		url: "/aj/relation/attention"
	});
	c("closetipsbar", {
		url: "/aj/tipsbar/closetipsbar",
		method: "post"
	});
	c("weiqunnew", {
		url: "/ajm/weiqun?action=aj_remindunread"
	});
	c("quiet_suggest", {
		url: "/aj/f/lenovo?ct=10&_wv=5",
		method: "get"
	});
	c("like_object", {
		url: "/p/aj/like/update",
		method: "post",
		withDomain: !0
	});
	c("like_weibo", {
		url: "/p/aj/like/set",
		method: "post",
		withDomain: !0
	});
	c("take", {
		url: "/p/aj/general/button",
		method: "get"
	});
	c("pageTabDelete", {
		url: "/p/aj/tab/delete",
		method: "post"
	});
	c("getenvelope", {
		url: "/p/aj/proxy",
		method: "get"
	});
	c("rss", {
		url: "/p/aj/proxy",
		method: "get"
	});
	return b
});
STK.register("page.publish.previewDialog", function(a) {
	var b = a.ui.dialog,
		c = a.core.util.browser,
		d = c.IE5 || c.IE55 || c.IE6 || c.IE7 || c.IE8,
		e = window,
		f = document.body,
		g = a.delegatedEvent,
		h = '<iframe width="1030" height="#{h}" frameborder="no" scrolling="yes" src="/ttarticle/p/preview?id=#{id}"></iframe>',
		i = '<div class="W_layer_btn_v3"><a href="javascript:" class="W_btn_b" action-type="close">继续编辑</a><a href="javascript:" class="W_btn_a" action-type="next">下一步</a></div>';
	return function(c) {
		function p() {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
			k = b();
			o(k);
			k.setTitle("文章预览");
			var d = l() - 40 || 570,
				e = a.core.util.templet(h, {
					id: c,
					h: d
				});
			k.setContent(e);
			k.show();
			k.on("hide", function() {
				document.documentElement.style.overflow = "";
				document.body.style.overflow = "";
				j.remove("close", "click", m);
				j.remove("next", "click", n)
			});
			a.custEvent.define(f, "publish")
		}
		function o(b) {
			var c = b._.nodes,
				d = c.autoHeight,
				e = c.close,
				f = c.title;
			e.parentNode.removeChild(e);
			a.insertHTML(f, i, "afterend");
			j = g(d);
			j.add("close", "click", m);
			j.add("next", "click", n)
		}
		function n() {
			k.hide();
			a.custEvent.fire(f, "publish")
		}
		function m() {
			k.hide()
		}
		function l() {
			return d ? document.documentElement.clientHeight : e.innerHeight
		}
		var f = {},
			j, k;
		p();
		return f
	}
});
STK.register("page.publish.allRightsReserved", function(a) {
	var b = a.ui.dialog,
		c = a.delegatedEvent,
		d = '<div class="layer_original">    <p>微博签约自媒体的文章可以进行原创声明啦！<br>原创声明的文章可以享受 <span class="W_fb">额外的的曝光资源！</span></p>    <p>当您发布文章时，我们会对您的文章内容在微博平台进行相似度查询，</p>    <p>如果您所发布的文章为转载，建议不要添加原创声明。<br>否则将视为违规虚假声明，站方将会视违规情况严重程度，进行相应的处罚。<br>详情请点击:<a href="http://weibo.com/ttarticle/p/show?id=2309403965998205109836" target="_blank">《文章原创声明须知》</a></p></div><div class="W_layer_btn S_bg1"><a href="javascript:" action-type="agree" class="W_btn_a btn_34px">知道了</a></div>',
		e = "头条文章原创声明";
	return function(f) {
		function n() {
			var c = m($CONFIG.wemedia);
			if (!c) f();
			else {
				if (a.cookie.get(j)) {
					f();
					return
				}
				i = b();
				l(i);
				i.setTitle(e);
				i.setContent(d);
				i.show();
				i.on("hide", function() {
					h.remove("agree", "click", k)
				})
			}
		}
		function m(a) {
			typeof a == "string" && (a = parseInt(a, 10) | 0);
			return !!a
		}
		function l(a) {
			var b = a._.nodes,
				d = b.autoHeight;
			h = c(d);
			h.add("agree", "click", k)
		}
		function k() {
			a.cookie.set(j, !0);
			i.hide();
			f()
		}
		var g = {},
			h, i, j = "weibo_article_rights_agree";
		f = typeof f == "function" ? f : a.core.func.empty;
		n();
		return g
	}
});
STK.register("page.publish.autoSave", function(a) {
	return function(b, c) {
		function i() {
			a.addEvent(d.container, "keydown", g);
			a.addEvent(d.titleNode, "keydown", g);
			f = h()
		}
		function h() {
			function f(a) {
				var d = a.keyCode ? a.keyCode : a.which ? a.which : a.charCode;
				if (d !== 16 && d !== 17 && d !== 18 && d !== 91) {
					clearTimeout(e);
					e = setTimeout(function() {
						b.save()
					}, c)
				}
			}
			var e;
			a.addEvent(d.container, "keydown", f);
			a.addEvent(d.titleNode, "keydown", f);
			return {
				saved: function() {
					clearTimeout(e)
				},
				destroy: function() {
					a.removeEvent(d.container, "keydown", f);
					a.removeEvent(d.titleNode, "keydown", f)
				}
			}
		}
		function g(c) {
			var d = c.keyCode ? c.keyCode : c.which ? c.which : c.charCode,
				e = d == 83 && (a.core.util.browser.OS === "macintosh" ? c.metaKey : c.ctrlKey);
			if (e) {
				a.stopEvent(c);
				if (b.isUploading) return;
				b.save();
				f && f.saved()
			}
		}
		if ( !! b) {
			c = c || 12e4;
			var d = b.editorInstance.opts,
				e = d.titleNode,
				f;
			i();
			return f
		}
	}
});
STK.register("page.publish.rteditor", function(a) {
	var b = a.ui.alert,
		c = a.lib.publisher.publisherDialog,
		d = a.lib.rteditor.helpers.clearHTML,
		e = a.lib.rteditor.helpers.html2markdown,
		f = a.lib.rteditor.helpers.parseIframeToCard,
		g = a.lib.rteditor.helpers.inputText,
		h = a.page.publish.previewDialog,
		i = a.page.publish.allRightsReserved,
		j = a.page.publish.autoSave,
		k = a.core.str.encodeHTML,
		l = a.lib.kit.extra.asyncThrottle,
		m = a.ui.notice,
		n = a.ui.mask,
		o = window,
		p = o.document.body,
		q = document.documentElement,
		r = a.core.util.browser,
		s = r.IE5 || r.IE55 || r.IE6 || r.IE7 || r.IE8;
	return function(e) {
		function bw() {
			bv();
			bj();
			bn();
			bk();
			w = j(f, 5e3);
			n.show({
				opacity: 0
			});
			return f
		}
		function bv() {
			y.mainBox = a.sizzle("[node-type=main_box]")[0]
		}
		function bu(a) {
			Z && Z.hide();
			Y && Y.hide();
			a.msg && m(a.msg, {
				icon: "rederrorS"
			})
		}
		function bt(b) {
			for (var c = 0, d = P.length - 1; c < d; ++c) {
				var e = P[c];
				if (b) {
					a.core.dom.addClassName(e, "disable");
					e._disabled = !0
				} else {
					a.core.dom.removeClassName(e, "disable");
					e._disabled = !1
				}
			}
		}
		function bs() {
			br(H, T.getValue());
			br(I, U.getValue());
			br(J, V.getValue());
			try {
				T.focus()
			} catch (a) {}
			try {
				U.focus()
			} catch (a) {}
			try {
				V.focus()
			} catch (a) {}
			V.blur()
		}
		function br(b, c) {
			var d = a.core.str.bLength(c) / 2 | 0;
			b && (b.innerHTML = d)
		}
		function bq(a) {
			a ? x.add() : x.remove()
		}
		function bp(a, b) {
			var c = /<img/ig.test(a),
				d = /<card/ig.test(a),
				e = /<hr/ig.test(a),
				f = /<fieldset/ig.test(a),
				g = /<li/ig.test(a),
				h = /<blockquote/ig.test(a);
			b = b.replace(/\u200B/, "");
			return !c && !d && !e && !f && !g && !h && b == ""
		}
		function bo(a, b) {
			var c = /<img/ig.test(a),
				d = /<card/ig.test(a);
			return !c && !d && b == ""
		}
		function bn() {
			T = g(C, {
				maxLength: 32,
				focusClass: "W_input_focus",
				placeholder: "请输入标题"
			});
			U = g(D, {
				maxLength: 24,
				focusClass: "W_input_focus",
				placeholder: "请输入作者微博昵称（选填）"
			});
			V = g(E, {
				maxLength: 44,
				focusClass: "W_input_focus",
				placeholder: "请输入导语（选填）"
			});
			a.custEvent.add(T, "change", function(b, c) {
				a.custEvent.fire(f, "titleChange", c);
				br(H, c)
			});
			a.custEvent.add(U, "change", function(a, b) {
				br(I, b)
			});
			a.custEvent.add(V, "change", function(a, b) {
				br(J, b)
			});
			a.custEvent.add(T, "keydown", function(b, c) {
				!c.Enter || (a.getStyle(D.parentNode, "display") == "none" ? V.focus() : U.focus())
			});
			a.custEvent.add(U, "keydown", function(a, b) {
				b.Enter && V.focus()
			});
			a.custEvent.add(V, "keydown", function(a, b) {
				b.Enter && p.editor("fire", "focus")
			});
			a.custEvent.add(T, "focus", function() {
				a.core.dom.setStyle(K, "display", "");
				bt(!0)
			});
			a.custEvent.add(U, "focus", function() {
				a.core.dom.setStyle(E.parentNode, "position", "static");
				a.core.dom.setStyle(L, "display", "");
				bt(!0)
			});
			a.custEvent.add(V, "focus", function() {
				a.core.dom.setStyle(M, "display", "");
				bt(!0)
			});
			a.custEvent.add(T, "blur", function() {
				a.core.dom.setStyle(K, "display", "none")
			});
			a.custEvent.add(U, "blur", function() {
				a.core.dom.setStyle(E.parentNode, "position", "");
				a.core.dom.setStyle(L, "display", "none")
			});
			a.custEvent.add(V, "blur", function() {
				a.core.dom.setStyle(M, "display", "none")
			});
			a.ui.suggest(D).on("suggest", function(b, c, d) {
				a.conf.trans.global.request("followList", {
					onSuccess: function(b) {
						var c = [];
						a.foreach(b.data, function(a) {
							var b = a.remark ? "(" + a.remark + ")" : "";
							c.push([a.screen_name + b, a.screen_name])
						});
						d(c)
					},
					onFail: bu,
					onError: bu
				}, {
					q: c
				})
			});
			p = a.lib.rteditor.init(B, {
				titleNode: C,
				draftNode: G,
				imgBtn: O,
				container: a.sizzle("#editor")[0]
			}).init();
			k = p.opts;
			f.editorInstance = p;
			window.editorInstance = p;
			p.editor("on", "focus", function() {
				var b = a.trim(p.editor("core.getText"));
				a.core.dom.hasClassName(k.container, A) && a.core.dom.removeClassName(k.container, A);
				bt(!1)
			});
			p.editor("on", "blur", function() {
				var b = a.trim(p.editor("core.getText")),
					c = p.editor("core.getContent");
				bp(c, b) && !a.core.dom.hasClassName(k.container, A) && a.core.dom.addClassName(k.container, A)
			});
			x = p.plugins.payLine(p, k);
			x.autoDetection();
			a.custEvent.add(x, "cancelPay", function() {
				o.paysetComponent && o.paysetComponent.closePay()
			});
			a.custEvent.add(x, "addPay", function() {
				o.paysetComponent && o.paysetComponent.openPay()
			})
		}
		function bm(b) {
			document.body.scrollTop = 0;
			r = b.id || "";
			T.setValue(b.title || "");
			U.setValue(b.writer || "");
			V.setValue(b.summary || "");
			R.setValue(b.image || "");
			var c = "",
				d = p.plugins.payLine.payLineHTML;
			!b.free_content || b.free_content == "" ? c = b.content || "" : c = b.free_content + d + b.content;
			p.editor("core.setContent", c);
			p.editor("buffer.clear");
			c != "" && a.core.dom.removeClassName(k.container, A);
			bs()
		}
		function bl() {
			n.show({
				opacity: .1
			});
			document.body.scrollTop = 0;
			r = "";
			T.setValue("");
			U.setValue("");
			V.setValue("");
			R.setValue("");
			p.editor("core.setContent", "");
			bs();
			o.focus()
		}
		function bk() {
			k.dEvent.add("publish", "click", be.publish);
			k.dEvent.add("preview", "click", be.preview);
			k.dEvent.add("save", "click", be.save);
			_ = l(be.winResize, 300);
			a.addEvent(o, "resize", _)
		}
		function bj() {
			a.custEvent.define(f, "titleChange");
			a.custEvent.define(f, "saveing");
			a.custEvent.define(f, "saved");
			a.custEvent.define(f, "disable")
		}
		function bi() {
			var a = o.paysetComponent && o.paysetComponent.getPayInfo(r);
			if ( !! a) {
				var b = p.editor("core.getContent"),
					c = "",
					e = "",
					f = d(b);
				a.ispay && (e = f.payHTML);
				c = f.freeHTML;
				e || o.paysetComponent && o.paysetComponent.closePay();
				return {
					businessData: a,
					freeContent: c,
					payContent: e,
					freeText: f.freeText,
					payText: f.payText
				}
			}
		}
		function bh(b) {
			Y && Y.hide();
			Y = !1;
			F.focus();
			w && w.saved();
			var c = h(b);
			a.custEvent.add(c, "publish", function() {
				X = !0;
				be.publish()
			})
		}
		function bg() {
			function b() {
				var b = T.getValue(),
					d = bi();
				if ( !! d) {
					var e = a.queryToJson(a.parseURL(location.href).query),
						f = e.topic_id,
						g = e.extparams,
						h = {
							title: "快来发微博，把文章分享给粉丝们吧！",
							content: "发布了头条文章：《" + b + "》 ",
							storage: !0,
							draft_id: r,
							draft_title: encodeURIComponent(b),
							draft_writer: encodeURIComponent(U.getValue()),
							draft_image: encodeURIComponent(R.value),
							draft_summary: encodeURIComponent(V.getValue()),
							draft_content: "",
							pay_setting: a.jsonToStr(d.businessData),
							isWemedia: bf($CONFIG.wemedia),
							topic_id: f || !1,
							extparams: g || !1
						};
					if (!d.payContent) {
						h.draft_content = encodeURIComponent(d.freeContent);
						h.isFollowToRead = bf($CONFIG.follow_to_read)
					} else {
						h.draft_content = encodeURIComponent(d.payContent);
						h.draft_free_content = encodeURIComponent(d.freeContent)
					}
					var i = c(h);
					a.custEvent.add(i, "publishShare", be.reload)
				}
			}
			if ( !! r) {
				Z && Z.hide();
				Z = !1;
				i(b)
			}
		}
		function bf(a) {
			typeof a == "string" && (a = parseInt(a, 10) | 0);
			return !!a
		}
		function bd() {
			return s ? q.clientHeight : o.innerHeight
		}
		var f = {},
			k, p, r, t, u, v, w, x, y = {},
			z = !1,
			A = "placeholder",
			B = a.sizzle("[node-type=containerBox]")[0],
			C = a.sizzle("input[node-type=title]")[0],
			D = a.sizzle("input[node-type=author]")[0],
			E = a.sizzle("input[node-type=intro]")[0],
			F = a.sizzle("input[node-type=hidden]")[0],
			G = a.sizzle('[node-type="draft"]')[0],
			H = a.sizzle("span[node-type=titleLabel]")[0],
			I = a.sizzle("span[node-type=authorLabel]")[0],
			J = a.sizzle("span[node-type=introLabel]")[0],
			K = a.sizzle("span", C.parentNode)[0],
			L = a.sizzle("span", D.parentNode)[0],
			M = a.sizzle("span", E.parentNode)[0],
			N = a.sizzle("[action-type=save]")[0],
			O = a.sizzle('[action-type="image"]')[0],
			P = a.sizzle("[node-type=toolbar] ul ul li"),
			Q = a.sizzle(".main_toppic")[0],
			R = a.lib.rteditor.uploadHeader.init(Q),
			S = a.lib.kit.extra.actionData,
			T, U, V, W = !1,
			X = !1,
			Y, Z, _, ba, bb = 1e4,
			bc = "付费打赏数据错误！请刷新页面后重试。",
			be = {
				publish: function(b, c) {
					if (a.trim(R.value) == "") m("还没有添加封面图", {
						icon: "warnB"
					});
					else {
						if (a.trim(T.getValue()) == "") {
							k.titleNode.focus();
							m("请输入文章标题", {
								icon: "warnB"
							});
							return
						}
						var d = a.trim(p.editor("core.getText"));
						if (d.replace(/\u200b/, "") == "" && a.core.dom.hasClassName(k.container, A)) {
							p.editor("fire", "focus");
							m("请输入正文", {
								icon: "warnB"
							});
							return
						}
						var e = bi();
						if (!e) return;
						var g = (e.freeContent + e.payContent).length;
						if (g > k.maxChar) {
							p.editor("fire", "focus");
							m("文章内容超长， 请删减", {
								icon: "warnB"
							});
							return
						}
						var h = e.freeText,
							i = e.freeContent;
						if (e.businessData.ispay && bo(i, h)) {
							m("请输入免费阅读内容", {
								icon: "warnB"
							});
							return
						}
						var j = e.payText,
							l = e.payContent;
						if (e.businessData.ispay && bo(l, j)) {
							m("请输入付费阅读内容", {
								icon: "warnB"
							});
							return
						}
						if (X) {
							bg();
							X = !1;
							return
						}
						v = !0;
						f.save();
						w && w.saved()
					}
				},
				preview: function(a, b) {
					if (!r) m("还没有选择任意草稿呢~", {
						icon: "rederrorB"
					});
					else {
						u = !0;
						f.save()
					}
				},
				save: function(a, b) {
					f.save();
					w && w.saved()
				},
				reload: function() {
					z = !0;
					m(["发布完成！", "当前草稿将丢弃"]);
					setTimeout(function() {
						location.reload()
					}, 2e3)
				},
				winResize: function() {
					var b = bd(),
						c = o.paysetComponent && o.paysetComponent.getViewHeight();
					c || (c = 0);
					b = b - c - 60 - 6;
					b < 0 && (b = 0);
					a.setStyle(y.mainBox, "height", b + "px")
				}
			};
		f.save = function(b) {
			function h() {
				a.conf.trans.article.request("draft", {
					onSuccess: function() {
						f.isUploading = !1;
						n.hide();
						N.innerHTML = "保存";
						a.custEvent.fire(f, "saved", {
							val: "",
							hasWatiingSelectNode: b
						});
						if (u) {
							bh(r);
							u = !1
						} else if (v) {
							bg();
							v = !1;
							return
						}
					},
					onFail: function(b) {
						n.hide();
						f.isUploading = !1;
						bu(b);
						a.custEvent.fire(f, "saved", {
							val: ""
						});
						N.innerHTML = "保存"
					},
					onError: function(b) {
						n.hide();
						f.isUploading = !1;
						bu(b);
						a.custEvent.fire(f, "saved", {
							val: ""
						});
						N.innerHTML = "保存"
					}
				}, g)
			}
			if (!f.onSet) {
				if (!r) return;
				f.isUploading = !0;
				var c = bi();
				if (!c) return;
				var d = (c.freeContent + c.payContent).length;
				if (d > k.maxChar) {
					m("文章内容超长， 请删减", {
						icon: "warnB"
					});
					return
				}
				u && (Y = m("正在保存中，预览效果马上显示……", {
					icon: "",
					hideDelay: 999999
				}));
				v && (Z = m("正在保存中，请稍候……", {
					icon: "",
					hideDelay: 999999
				}));
				N.innerHTML = "保存中...";
				a.custEvent.fire(f, "saveing", {
					val: "保存中..."
				});
				var e = {
					pid: c.businessData.pid
				},
					g = {
						id: r,
						title: encodeURIComponent(T.getValue()),
						writer: encodeURIComponent(U.getValue()),
						image: encodeURIComponent(R.value),
						summary: encodeURIComponent(V.getValue()),
						content: "",
						pay_setting: a.jsonToStr(e)
					};
				if (!c.payContent) g.content = encodeURIComponent(c.freeContent);
				else {
					g.content = encodeURIComponent(c.payContent);
					g.free_content = encodeURIComponent(c.freeContent)
				}
				h();
				return
			}
		};
		f.setValue = function(a) {
			if (ba) {
				clearTimeout(ba);
				ba = !1
			}
			if (!f.isUploading) {
				bm(a);
				f.onSet = !0;
				var c = {},
					d = a.pay_setting;
				d.pay && d.reward && !d.pid ? c.historyInfo = d : d.pid && (c.pid = d.pid);
				c.changePay = bq;
				c.articleId = r;
				c.finished = function() {
					if (ba) {
						clearTimeout(ba);
						_();
						f.onSet = !1;
						n.hide()
					}
				};
				c.haspay = x.hasPayLine();
				o.paysetComponent && o.paysetComponent.initView(c);
				ba = setTimeout(function() {
					ba = !1;
					f.onSet = !1;
					b(bc, {
						icon: "rederrorB"
					})
				}, bb)
			}
		};
		f.editorDisabled = function() {
			bl()
		};
		f.init = bw;
		return f
	}
});
STK.register("page.publish.init", function(a) {
	var b = a.page.publish.rteditor().init(),
		c = a.page.publish.draftBox().init();
	a.custEvent.add(b, "titleChange", function(a, b) {
		c.updateSelectedDraftTitle(b);
		c.updateSelectedDraftDate()
	});
	a.custEvent.add(b, "saveing", function(a, b) {
		c.updateSelectedDraftState(b.val)
	});
	a.custEvent.add(b, "saved", function(a, b) {
		c.updateSelectedDraftState(b.val);
		b.hasWatiingSelectNode && c.selecteDraft()
	});
	a.custEvent.add(c, "createDraft", function(a, d) {
		c.getId() && b.save();
		b.setValue({
			id: d.id,
			title: "",
			writer: "",
			image: "",
			summary: "",
			content: ""
		})
	});
	a.custEvent.add(c, "saveDraft", function(a, c) {
		b.save(!0)
	});
	a.custEvent.add(c, "selectedDraft", function(a, c) {
		b.setValue(c)
	});
	a.custEvent.add(c, "disabled", function(a, c) {
		b.editorDisabled()
	})
});