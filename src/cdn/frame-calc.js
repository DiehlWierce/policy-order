! function(e) {
    function t() {
        function t() {
            // var e = "#frame-calculator_wrap{font-size: 0 !important; line-height: 0 !important;}.frame-scroll-locked * {z-index: auto !important;} .frame-fixed-header {top: 0 !important; left: 0 !important; z-index: 9999 !important; position: fixed !important; width: 100% !important;}.frame-fixed-footer {bottom: 0 !important; left: 0 !important; z-index: 9999 !important; position: fixed !important; width: 100% !important;}body.frame-scroll-locked{overflow:hidden!important;position:fixed!important;width: 100%!important;margin:0!important}#frame-calculator{transition: height 0.5s ease;display:block;overflow:hidden;background:#f5f5f5;border-top:4px solid #0ab0ee;border-bottom:4px solid #0ab0ee;width:1px!important;min-width:100%!important;overflow:hidden;overflow-x:hidden;overflow-y:hidden;min-height:225px}#frame-calculator.red-style{border-top:4px solid #f55b65;border-bottom:4px solid #f55b65}#frame-calculator.moex-style{border-top:2px solid #C71C2C;border-bottom:2px solid #C71C2C}#frame-calculator.onlinestrah-style{border-top:4px solid #21BA45;border-bottom:4px solid #21BA45}#frame-calculator.green-style{border-top:4px solid #00d1ac;border-bottom:4px solid #00d1ac}#frame-calculator.green_light-style{border-top:4px solid #10b600;border-bottom:4px solid #10b600}#frame-calculator.black-style{border-top:4px solid #242424;border-bottom:4px solid #242424}#frame-calculator.brokers-style{border-top:4px solid #cf9d41;border-bottom:4px solid #cf9d41}#frame-calculator_wrap.opened{position:fixed;left:0;top:0;width:100%!important;height:100%!important;z-index:999999 !important;border:0!important}#frame-calculator_wrap.opened #frame-calculator{width:100%!important;height:100%!important;border-top:0;overflow:auto;border-bottom:0}#frame-calculator-btn{position:fixed;bottom:0;z-index:9999;height:70px;width:430px;box-shadow:0 -8px 32px rgba(0,0,0,.2);background:url(https://partners.frame.ru/calc_iframe/icons/btn.jpg) center center no-repeat;cursor:pointer}#frame-calculator-btn.static{opacity:0;bottom:-70px}#frame-calculator.no-border{border-top: 0 !important;border-bottom: 0 !important}",
            //     t = document.getElementsByTagName("head")[0],
            //     a = document.createElement("style");
            // a.setAttribute("type", "text/css"), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e)), t.appendChild(a);
            // var r = "https://partners.inguru.ru/calc_iframe";
            // var o = document.createElement("iframe");
            // o.frameBorder = 0;
            // o.width = "100%";
            // o.id = "frame-calculator";
            // o.setAttribute("src", r);
            // o.setAttribute("name", "frameCalculator");
            // o.setAttribute("scrolling", "no");
            // var l = document.getElementById("frame-calculator_wrap").getAttribute("data-style");
            // l && o.setAttribute("class", l + "-style");
            // document.getElementById("frame-calculator_wrap").getAttribute("data-noBorder") && o.setAttribute("class", "no-border");
            // document.getElementById("frame-calculator_wrap").appendChild(o);
            // var h = document.getElementById("frame-calculator_wrap").offsetWidth;
        }

        function a() {
            var t = document.getElementById("frame-calculator"),
                a = document.createElement("a");
            a.id = "frame-calculator-btn", a.style.left = d(t) + t.offsetWidth / 2 - 215 + "px", a.onclick = function() {
                e.frames.inguruCalculator.postMessage("btnClick", "*")
            }, e.addEventListener("scroll", o), document.getElementById("frame-calculator_wrap").appendChild(a), o()
        }

        function r() {
            var t = document.getElementById("frame-calculator_wrap"),
                a = document.getElementById("frame-calculator-btn");
            a && t && t.removeChild(a), e.removeEventListener("scroll", o)
        }

        function o() {
            var t = document.getElementById("frame-calculator"),
                a = i(t) + 200,
                r = document.getElementById("frame-calculator-btn"),
                o = i(t) + t.offsetHeight - 71,
                l = e.pageYOffset + s();
            !g && (l >= o || a >= l) ? (g = !0, r.classList.add("static")) : g && o > l && l > a && (g = !1, r.classList.remove("static"))
        }

        function l(t) {
            var a, r = document.getElementById("frame-calculator"),
                o = document.getElementById("frame-calculator_wrap"),
                l = e.frames.frameCalculator;
            t ? (o.classList.add("opened"), a = o.offsetWidth, r.style.width = a + "px", l.postMessage(a, "*"), n(!0)) : (o.classList.remove("opened"), r.style.width = h + "px", l.postMessage(h, "*"), o.setAttribute("style", ""), n(!1), c())
        }

        function n(e) {
            if (e) {
                var t = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
                0 != t && (v = t), document.body.classList.add("frame-scroll-locked")
            } else document.body.classList.remove("frame-scroll-locked"), 0 != v && (document.body ? document.documentElement.scrollTop = v : document.body.parentNode && (document.body.parentNode.scrollTop = v))
        }

        function c() {
            var t = e.frames.frameCalculator;
            t.postMessage("resize", "*")
        }

        function d(e) {
            if (e) {
                var t = 0;
                do t += e.offsetLeft; while (e = e.offsetParent);
                return t
            }
        }

        function i(e) {
            if (e) {
                var t = 0;
                do t += e.offsetTop; while (e = e.offsetParent);
                return t
            }
        }

        function s() {
            return e.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }

        function m(e, t) {
            var a = document.getElementById("frame-calculator"),
                r = a.offsetHeight ? a.offsetHeight : a.clientHeight,
                o = r >= s() ? i(a) + r - s() : i(a),
                l = i(a),
                n = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                c = r <= s() ? i(a) : Math.min(o, Math.max(l, e + i(a))),
                d = c > n ? c - n : n - c,
                u = 0 != Math.round(d / 25) ? Math.round(d / 25) : 1,
                f = c > n ? n + u : n - u,
                p = 10,
                g = 0;
            if (c == n) return setTimeout("window.scrollTo(0, " + c + ")", 10), void(t || setTimeout(m(e, !0), 400));
            if (c > n)
                for (var b = n; c > b; b += u) setTimeout("window.scrollTo(0, " + f + ")", g * p), f += u, f >= c && (f = c, t || setTimeout(m(e, !0), 400)), g++;
            else
                for (var b = n; b > c; b -= u) setTimeout("window.scrollTo(0, " + f + ")", g * p), f -= u, c >= f && (f = c, t || setTimeout(m(e, !0), 400)), g++
        }

        function u(e, t, a) {
            for (var r = 0, o = e.length; o > r; r++)
                if (e[r][a] === t) return r;
            return -1
        }

        function f(e, t) {
            var a = u(b, e, "name");
            a >= 0 && b[a] && b[a].cb && "function" == typeof b[a].cb && b[a].cb(t)
        }
        var p = {},
            g = !1,
            b = [],
            h = 0,
            y = setInterval(function() {
                document.getElementById("frame-calculator_wrap") && (clearTimeout(y), t())
            }, 100);
        e.addEventListener("message", function(t) {
            if (t.data && ("string" == typeof t.data || "number" == typeof t.data))
                if ("openCalculator" === t.data) l(!0);
                else if ("closeCalculator" === t.data) l(!1);
                else if ("ready" === t.data) {
                    f("ready");
                    var o = localStorage.getItem("__user_tracker_adv_p_id", null) || document.getElementById("frame-calculator_wrap").getAttribute("adv_p_id") || document.getElementById("frame-calculator_wrap").getAttribute("adv-p-id") || document.getElementById("frame-calculator_wrap").getAttribute("data-id");
                    if (e.frames.frameCalculator.postMessage("referrer:" + (localStorage.getItem("__user_tracker_referrer", null) || document.referrer || e.location), "*"), e.frames.frameCalculator.postMessage("adv_p_id:" + o, "*"), e.frames.frameCalculator.postMessage("url:http://www.inguru.ru", "*"), e.frames.frameCalculator.postMessage("p_url:" + e.location.href.replace(e.location.hash, ""), "*"), e.location.search) {
                        var n = e.location.search.substring(1);
                        n.toString().indexOf("eosagoSucces=") >= 0 && (n = n.replace(/\_/gi, "&"), e.frames.frameCalculator.postMessage("eosago_success:" + n, "*"))
                    }
                    if (e.location.hash) {
                        var c = e.location.hash.substring(1);
                        if (c.toString().indexOf("frame_vechile=") >= 0) {
                            var d = c.substring(15);
                            e.frames.frameCalculator.postMessage("vechile:" + d, "*")
                        }
                        if (c.toString().indexOf("frame_brand=") >= 0) {
                            var i = c.substring(13);
                            e.frames.frameCalculator.postMessage("brand:" + i, "*")
                        }
                        c.toString().indexOf("eosago_success=") >= 0 && e.frames.frameCalculator.postMessage("eosago_success:" + e.location.hash, "*")
                    }
                    document.getElementById("frame-calculator_wrap").getAttribute("data-static") && e.frames.frameCalculator.postMessage("static", "*"), document.getElementById("frame-calculator_wrap").getAttribute("data-auto") && e.frames.frameCalculator.postMessage("autoComplete", "*")
                } else if (isNaN(t.data))
                    if ("checkType" === t.data) {
                        var s = document.getElementById("frame-calculator_wrap").getAttribute("type") || document.getElementById("frame-calculator_wrap").getAttribute("data-type"),
                            u = document.getElementById("frame-calculator_wrap").getAttribute("oneType") || document.getElementById("frame-calculator_wrap").getAttribute("data-one");
                        s && e.frames.frameCalculator.postMessage(s + (u ? "_one" : ""), "*")
                    } else if ("checkLinkBan" === t.data) e.frames.frameCalculator.postMessage("disableLink", "*");
                    else if ("checkStyle" === t.data) {
                        var p = document.getElementById("frame-calculator_wrap").getAttribute("data-style");
                        p = p ? p : "default", e.frames.frameCalculator.postMessage("style:" + p, "*")
                    } else if (t.data && t.data.indexOf("goToUrl") >= 0) {
                        var g = JSON.parse(t.data.substring(8));
                        if (g && g.url) {
                            var b = document.createElement("a");
                            b.href = g.url, b.style.display = "none", g.targetBlank && (b.target = "_blank"), document.body.appendChild(b), b.click(), document.body.removeChild(b)
                        }
                    } else if (t.data.indexOf("scroll:") >= 0) m(parseInt(t.data.substring(7)));
                    else if (t.data && t.data.toString().indexOf("cb") >= 0 && t.data.toString().indexOf("value") >= 0) {
                        var h = JSON.parse(t.data);
                        h && "object" == typeof h && h.cb && f(h.cb, h.value)
                    } else t.data && t.data.toString().indexOf("scrollBtnFn") >= 0 ? a() : t.data && t.data.toString().indexOf("removeScrollBtnFn") >= 0 && r();
                else {
                    var y = document.getElementById("frame-calculator");
                    y.style.height = t.data + "px"
                }
        }, !1);
        var v = 0;
        return p = {
            setCallback: function(e, t) {
                var a = u(b, e, "name");
                a >= 0 ? b[a].cb = t : b.push({
                    name: e,
                    cb: t
                })
            }
        }
    }
    "undefined" == typeof e.insuranceCalculator && (e.insuranceCalculator = t()), "undefined" == typeof e.insuranceСalculator && (e.insuranceСalculator = {
        setCallback: function(e, t) {
            insuranceCalculator.setCallback(e, t)
        }
    })
}(window);
