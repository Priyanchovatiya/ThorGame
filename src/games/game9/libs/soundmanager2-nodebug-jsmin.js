(function(a, c) {
    function b(a0, bI) {
        function aZ(h) {
            return aN.preferFlash && bq && !aN.ignoreFlash && aN.flash[h] !== c && aN.flash[h];
        }

        function aF(h) {
            return function(k) {
                var j = this._s;
                return !j || !j._a ? null : h.call(this, k);
            };
        }
        this.setupOptions = {
            url: a0 || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1000,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !0,
            noSWFCache: !1
        };
        this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onposition: null,
            onstop: null,
            onfailure: null,
            onfinish: null,
            multiShot: !0,
            multiShotEvents: !1,
            position: null,
            pan: 0,
            stream: !0,
            to: null,
            type: null,
            usePolicyFile: !1,
            volume: 100
        };
        this.flash9Options = {
            isMovieStar: null,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null,
            onconnect: null,
            duration: null
        };
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a", "m4b"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: !1
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: !1
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: !1
            }
        };
        this.movieID = "sm2-container";
        this.id = bI || "sm2movie";
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.versionNumber = "V2.97a.20130101";
        this.altURL = this.movieURL = this.version = null;
        this.enabled = this.swfLoaded = !1;
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.didFlashBlock = this.muted = !1;
        this.filePattern = null;
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        };
        this.features = {
            buffering: !1,
            peakData: !1,
            waveformData: !1,
            eqData: !1,
            movieStar: !1
        };
        this.sandbox = {};
        this.html5 = {
            usingFlash: null
        };
        this.flash = {};
        this.ignoreFlash = this.html5Only = !1;
        var bL, aN = this,
            bA = null,
            aL = null,
            aY, aA = navigator.userAgent,
            bx = a.location.href.toString(),
            aG = document,
            be, bm, aJ, aH, az = [],
            bd = !1,
            bc = !1,
            aI = !1,
            ay = !1,
            aj = !1,
            a8, ax, I, aX, bK, bp, bo, bl, aO, bz, aW, bk, aV, aM, bj, al, a7, ac, aU, bi, am, bM, ad, bC, bN, a6 = null,
            br = null,
            av, aP, bh, aT, aR, bg, aB, a5 = !1,
            an = !1,
            bD, bs, aQ, bB = 0,
            a3 = null,
            bv, ao = [],
            aw = null,
            af, a4, a1, aq, ae, e, f, aE, ah = Array.prototype.slice,
            au = !1,
            bE, bq, bt, bF, at, aD = aA.match(/(ipad|iphone|ipod)/i),
            bu = aA.match(/android/i),
            ap = aA.match(/msie/i),
            i = aA.match(/webkit/i),
            bJ = aA.match(/safari/i) && !aA.match(/chrome/i),
            by = aA.match(/opera/i),
            bf = aA.match(/(mobile|pre\/|xoom)/i) || aD || bu,
            aS = !bx.match(/usehtml5audio/i) && !bx.match(/sm2\-ignorebadua/i) && bJ && !aA.match(/silk/i) && aA.match(/OS X 10_6_([3-7])/i),
            aK = aG.hasFocus !== c ? aG.hasFocus() : null,
            ai = bJ && (aG.hasFocus === c || !aG.hasFocus()),
            ar = !ai,
            ag = /(mp3|mp4|mpa|m4a|m4b)/i,
            ak = aG.location ? aG.location.protocol.match(/http/i) : null,
            g = !ak ? "http://" : "",
            bG = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            bn = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
            bH = RegExp("\\.(" + bn.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.useAltURL = !ak;
        var ab;
        try {
            ab = Audio !== c && (by && opera !== c && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== c;
        } catch (a9) {
            ab = !1;
        }
        this.hasHTML5 = ab;
        this.setup = function(h) {
            var j = !aN.url;
            h !== c && (aI && aw && aN.ok() && (h.flashVersion !== c || h.url !== c || h.html5Test !== c)) && bg(av("setupLate"));
            I(h);
            j && (a7 && h.url !== c) && aN.beginDelayedInit();
            !a7 && (h.url !== c && "complete" === aG.readyState) && setTimeout(bj, 1);
            return aN;
        };
        this.supported = this.ok = function() {
            return aw ? aI && !ay : aN.useHTML5Audio && aN.hasHTML5;
        };
        this.getMovie = function(h) {
            return aY(h) || aG[h] || a[h];
        };
        this.createSound = function(h, l) {
            function m() {
                j = aT(j);
                aN.sounds[j.id] = new bL(j);
                aN.soundIDs.push(j.id);
                return aN.sounds[j.id];
            }
            var j, k = null;
            if (!aI || !aN.ok()) {
                return bg(void 0), !1;
            }
            l !== c && (h = {
                id: h,
                url: l
            });
            j = ax(h);
            j.url = bv(j.url);
            if (aB(j.id, !0)) {
                return aN.sounds[j.id];
            }
            a4(j) ? (k = m(), k._setup_html5(j)) : (8 < aH && null === j.isMovieStar && (j.isMovieStar = !(!j.serverURL && !(j.type && j.type.match(bG) || j.url.match(bH)))), j = aR(j, void 0), k = m(), 8 === aH ? aL._createSound(j.id, j.loops || 1, j.usePolicyFile) : (aL._createSound(j.id, j.url, j.usePeakData, j.useWaveformData, j.useEQData, j.isMovieStar, j.isMovieStar ? j.bufferTime : !1, j.loops || 1, j.serverURL, j.duration || null, j.autoPlay, !0, j.autoLoad, j.usePolicyFile), j.serverURL || (k.connected = !0, j.onconnect && j.onconnect.apply(k))), !j.serverURL && (j.autoLoad || j.autoPlay) && k.load(j));
            !j.serverURL && j.autoPlay && k.play();
            return k;
        };
        this.destroySound = function(h, k) {
            if (!aB(h)) {
                return !1;
            }
            var l = aN.sounds[h],
                j;
            l._iO = {};
            l.stop();
            l.unload();
            for (j = 0; j < aN.soundIDs.length; j++) {
                if (aN.soundIDs[j] === h) {
                    aN.soundIDs.splice(j, 1);
                    break;
                }
            }
            k || l.destruct(!0);
            delete aN.sounds[h];
            return !0;
        };
        this.load = function(h, j) {
            return !aB(h) ? !1 : aN.sounds[h].load(j);
        };
        this.unload = function(h) {
            return !aB(h) ? !1 : aN.sounds[h].unload();
        };
        this.onposition = this.onPosition = function(h, k, l, j) {
            return !aB(h) ? !1 : aN.sounds[h].onposition(k, l, j);
        };
        this.clearOnPosition = function(h, j, k) {
            return !aB(h) ? !1 : aN.sounds[h].clearOnPosition(j, k);
        };
        this.start = this.play = function(h, j) {
            var k = !1;
            return !aI || !aN.ok() ? (bg("soundManager.play(): " + av(!aI ? "notReady" : "notOK")), k) : !aB(h) ? (j instanceof Object || (j = {
                url: j
            }), j && j.url && (j.id = h, k = aN.createSound(j).play()), k) : aN.sounds[h].play(j);
        };
        this.setPosition = function(h, j) {
            return !aB(h) ? !1 : aN.sounds[h].setPosition(j);
        };
        this.stop = function(h) {
            return !aB(h) ? !1 : aN.sounds[h].stop();
        };
        this.stopAll = function() {
            for (var h in aN.sounds) {
                aN.sounds.hasOwnProperty(h) && aN.sounds[h].stop();
            }
        };
        this.pause = function(h) {
            return !aB(h) ? !1 : aN.sounds[h].pause();
        };
        this.pauseAll = function() {
            var h;
            for (h = aN.soundIDs.length - 1; 0 <= h; h--) {
                aN.sounds[aN.soundIDs[h]].pause();
            }
        };
        this.resume = function(h) {
            return !aB(h) ? !1 : aN.sounds[h].resume();
        };
        this.resumeAll = function() {
            var h;
            for (h = aN.soundIDs.length - 1; 0 <= h; h--) {
                aN.sounds[aN.soundIDs[h]].resume();
            }
        };
        this.togglePause = function(h) {
            return !aB(h) ? !1 : aN.sounds[h].togglePause();
        };
        this.setPan = function(h, j) {
            return !aB(h) ? !1 : aN.sounds[h].setPan(j);
        };
        this.setVolume = function(h, j) {
            return !aB(h) ? !1 : aN.sounds[h].setVolume(j);
        };
        this.mute = function(h) {
            var j = 0;
            h instanceof String && (h = null);
            if (h) {
                return !aB(h) ? !1 : aN.sounds[h].mute();
            }
            for (j = aN.soundIDs.length - 1; 0 <= j; j--) {
                aN.sounds[aN.soundIDs[j]].mute();
            }
            return aN.muted = !0;
        };
        this.muteAll = function() {
            aN.mute();
        };
        this.unmute = function(h) {
            h instanceof String && (h = null);
            if (h) {
                return !aB(h) ? !1 : aN.sounds[h].unmute();
            }
            for (h = aN.soundIDs.length - 1; 0 <= h; h--) {
                aN.sounds[aN.soundIDs[h]].unmute();
            }
            aN.muted = !1;
            return !0;
        };
        this.unmuteAll = function() {
            aN.unmute();
        };
        this.toggleMute = function(h) {
            return !aB(h) ? !1 : aN.sounds[h].toggleMute();
        };
        this.getMemoryUse = function() {
            var h = 0;
            aL && 8 !== aH && (h = parseInt(aL._getMemoryUse(), 10));
            return h;
        };
        this.disable = function(h) {
            var j;
            h === c && (h = !1);
            if (ay) {
                return !1;
            }
            ay = !0;
            for (j = aN.soundIDs.length - 1; 0 <= j; j--) {
                ad(aN.sounds[aN.soundIDs[j]]);
            }
            a8(h);
            aE.remove(a, "load", bo);
            return !0;
        };
        this.canPlayMIME = function(h) {
            var j;
            aN.hasHTML5 && (j = a1({
                type: h
            }));
            !j && aw && (j = h && aN.ok() ? !!(8 < aH && h.match(bG) || h.match(aN.mimePattern)) : null);
            return j;
        };
        this.canPlayURL = function(h) {
            var j;
            aN.hasHTML5 && (j = a1({
                url: h
            }));
            !j && aw && (j = h && aN.ok() ? !!h.match(aN.filePattern) : null);
            return j;
        };
        this.canPlayLink = function(h) {
            return h.type !== c && h.type && aN.canPlayMIME(h.type) ? !0 : aN.canPlayURL(h.href);
        };
        this.getSoundById = function(h) {
            if (!h) {
                throw Error("soundManager.getSoundById(): sID is null/_undefined");
            }
            return aN.sounds[h];
        };
        this.onready = function(h, j) {
            if ("function" === typeof h) {
                j || (j = a), bK("onready", h, j), bp();
            } else {
                throw av("needFunction", "onready");
            }
            return !0;
        };
        this.ontimeout = function(h, j) {
            if ("function" === typeof h) {
                j || (j = a), bK("ontimeout", h, j), bp({
                    type: "ontimeout"
                });
            } else {
                throw av("needFunction", "ontimeout");
            }
            return !0;
        };
        this._wD = this._writeDebug = function() {
            return !0;
        };
        this._debug = function() {};
        this.reboot = function(h, m) {
            var n, j, l;
            for (n = aN.soundIDs.length - 1; 0 <= n; n--) {
                aN.sounds[aN.soundIDs[n]].destruct();
            }
            if (aL) {
                try {
                    ap && (br = aL.innerHTML), a6 = aL.parentNode.removeChild(aL);
                } catch (k) {}
            }
            br = a6 = aw = aL = null;
            aN.enabled = a7 = aI = a5 = an = bd = bc = ay = au = aN.swfLoaded = !1;
            aN.soundIDs = [];
            aN.sounds = {};
            if (h) {
                az = [];
            } else {
                for (n in az) {
                    if (az.hasOwnProperty(n)) {
                        j = 0;
                        for (l = az[n].length; j < l; j++) {
                            az[n][j].fired = !1;
                        }
                    }
                }
            }
            aN.html5 = {
                usingFlash: null
            };
            aN.flash = {};
            aN.html5Only = !1;
            aN.ignoreFlash = !1;
            a.setTimeout(function() {
                aM();
                m || aN.beginDelayedInit();
            }, 20);
            return aN;
        };
        this.reset = function() {
            return aN.reboot(!0, !0);
        };
        this.getMoviePercent = function() {
            return aL && "PercentLoaded" in aL ? aL.PercentLoaded() : null;
        };
        this.beginDelayedInit = function() {
            aj = !0;
            bj();
            setTimeout(function() {
                if (an) {
                    return !1;
                }
                aU();
                aV();
                return an = !0;
            }, 20);
            bl();
        };
        this.destruct = function() {
            aN.disable(!0);
        };
        bL = function(B) {
            var z, A, C = this,
                y, G, x, D, v, t, k = !1,
                w = [],
                p = 0,
                F, E, h = null;
            A = z = null;
            this.sID = this.id = B.id;
            this.url = B.url;
            this._iO = this.instanceOptions = this.options = ax(B);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this.isHTML5 = !1;
            this._a = null;
            this.id3 = {};
            this._debug = function() {};
            this.load = function(j) {
                var m = null;
                j !== c ? C._iO = ax(j, C.options) : (j = C.options, C._iO = j, h && h !== C.url && (C._iO.url = C.url, C.url = null));
                C._iO.url || (C._iO.url = C.url);
                C._iO.url = bv(C._iO.url);
                j = C.instanceOptions = C._iO;
                if (j.url === C.url && 0 !== C.readyState && 2 !== C.readyState) {
                    return 3 === C.readyState && j.onload && j.onload.apply(C, [!!C.duration]), C;
                }
                C.loaded = !1;
                C.readyState = 1;
                C.playState = 0;
                C.id3 = {};
                if (a4(j)) {
                    m = C._setup_html5(j), m._called_load || (C._html5_canplay = !1, C.url !== j.url && (C._a.src = j.url, C.setPosition(0)), C._a.autobuffer = "auto", C._a.preload = "auto", C._a._called_load = !0, j.autoPlay && C.play());
                } else {
                    try {
                        C.isHTML5 = !1, C._iO = aR(aT(j)), j = C._iO, 8 === aH ? aL._load(C.id, j.url, j.stream, j.autoPlay, j.usePolicyFile) : aL._load(C.id, j.url, !!j.stream, !!j.autoPlay, j.loops || 1, !!j.autoLoad, j.usePolicyFile);
                    } catch (l) {
                        bi({
                            type: "SMSOUND_LOAD_JS_EXCEPTION",
                            fatal: !0
                        });
                    }
                }
                C.url = j.url;
                return C;
            };
            this.unload = function() {
                0 !== C.readyState && (C.isHTML5 ? (D(), C._a && (C._a.pause(), ae(C._a, "about:blank"), h = "about:blank")) : 8 === aH ? aL._unload(C.id, "about:blank") : aL._unload(C.id), y());
                return C;
            };
            this.destruct = function(j) {
                C.isHTML5 ? (D(), C._a && (C._a.pause(), ae(C._a), au || x(), C._a._s = null, C._a = null)) : (C._iO.onfailure = null, aL._destroySound(C.id));
                j || aN.destroySound(C.id, !0);
            };
            this.start = this.play = function(j, n) {
                var l, m;
                m = !0;
                m = null;
                n = n === c ? !0 : n;
                j || (j = {});
                C.url && (C._iO.url = C.url);
                C._iO = ax(C._iO, C.options);
                C._iO = ax(j, C._iO);
                C._iO.url = bv(C._iO.url);
                C.instanceOptions = C._iO;
                if (C._iO.serverURL && !C.connected) {
                    return C.getAutoPlay() || C.setAutoPlay(!0), C;
                }
                a4(C._iO) && (C._setup_html5(C._iO), v());
                1 === C.playState && !C.paused && ((l = C._iO.multiShot) || (m = C));
                if (null !== m) {
                    return m;
                }
                j.url && j.url !== C.url && C.load(C._iO);
                C.loaded || (0 === C.readyState ? (C.isHTML5 || (C._iO.autoPlay = !0), C.load(C._iO), C.instanceOptions = C._iO) : 2 === C.readyState && (m = C));
                if (null !== m) {
                    return m;
                }!C.isHTML5 && (9 === aH && 0 < C.position && C.position === C.duration) && (j.position = 0);
                if (C.paused && 0 <= C.position && (!C._iO.serverURL || 0 < C.position)) {
                    C.resume();
                } else {
                    C._iO = ax(j, C._iO);
                    if (null !== C._iO.from && null !== C._iO.to && 0 === C.instanceCount && 0 === C.playState && !C._iO.serverURL) {
                        l = function() {
                            C._iO = ax(j, C._iO);
                            C.play(C._iO);
                        };
                        if (C.isHTML5 && !C._html5_canplay) {
                            C.load({
                                oncanplay: l
                            }), m = !1;
                        } else {
                            if (!C.isHTML5 && !C.loaded && (!C.readyState || 2 !== C.readyState)) {
                                C.load({
                                    onload: l
                                }), m = !1;
                            }
                        }
                        if (null !== m) {
                            return m;
                        }
                        C._iO = E();
                    }(!C.instanceCount || C._iO.multiShotEvents || !C.isHTML5 && 8 < aH && !C.getAutoPlay()) && C.instanceCount++;
                    C._iO.onposition && 0 === C.playState && t(C);
                    C.playState = 1;
                    C.paused = !1;
                    C.position = C._iO.position !== c && !isNaN(C._iO.position) ? C._iO.position : 0;
                    C.isHTML5 || (C._iO = aR(aT(C._iO)));
                    C._iO.onplay && n && (C._iO.onplay.apply(C), k = !0);
                    C.setVolume(C._iO.volume, !0);
                    C.setPan(C._iO.pan, !0);
                    C.isHTML5 ? (v(), m = C._setup_html5(), C.setPosition(C._iO.position), m.play()) : (m = aL._start(C.id, C._iO.loops || 1, 9 === aH ? C._iO.position : C._iO.position / 1000, C._iO.multiShot), 9 === aH && !m && C._iO.onplayerror && C._iO.onplayerror.apply(C));
                }
                return C;
            };
            this.stop = function(j) {
                var l = C._iO;
                1 === C.playState && (C._onbufferchange(0), C._resetOnPosition(0), C.paused = !1, C.isHTML5 || (C.playState = 0), F(), l.to && C.clearOnPosition(l.to), C.isHTML5 ? C._a && (j = C.position, C.setPosition(0), C.position = j, C._a.pause(), C.playState = 0, C._onTimer(), D()) : (aL._stop(C.id, j), l.serverURL && C.unload()), C.instanceCount = 0, C._iO = {}, l.onstop && l.onstop.apply(C));
                return C;
            };
            this.setAutoPlay = function(j) {
                C._iO.autoPlay = j;
                C.isHTML5 || (aL._setAutoPlay(C.id, j), j && !C.instanceCount && 1 === C.readyState && C.instanceCount++);
            };
            this.getAutoPlay = function() {
                return C._iO.autoPlay;
            };
            this.setPosition = function(j) {
                j === c && (j = 0);
                var m = C.isHTML5 ? Math.max(j, 0) : Math.min(C.duration || C._iO.duration, Math.max(j, 0));
                C.position = m;
                j = C.position / 1000;
                C._resetOnPosition(C.position);
                C._iO.position = m;
                if (C.isHTML5) {
                    if (C._a && C._html5_canplay && C._a.currentTime !== j) {
                        try {
                            C._a.currentTime = j, (0 === C.playState || C.paused) && C._a.pause();
                        } catch (l) {}
                    }
                } else {
                    j = 9 === aH ? C.position : j, C.readyState && 2 !== C.readyState && aL._setPosition(C.id, j, C.paused || !C.playState, C._iO.multiShot);
                }
                C.isHTML5 && C.paused && C._onTimer(!0);
                return C;
            };
            this.pause = function(j) {
                if (C.paused || 0 === C.playState && 1 !== C.readyState) {
                    return C;
                }
                C.paused = !0;
                C.isHTML5 ? (C._setup_html5().pause(), D()) : (j || j === c) && aL._pause(C.id, C._iO.multiShot);
                C._iO.onpause && C._iO.onpause.apply(C);
                return C;
            };
            this.resume = function() {
                var j = C._iO;
                if (!C.paused) {
                    return C;
                }
                C.paused = !1;
                C.playState = 1;
                C.isHTML5 ? (C._setup_html5().play(), v()) : (j.isMovieStar && !j.serverURL && C.setPosition(C.position), aL._pause(C.id, j.multiShot));
                !k && j.onplay ? (j.onplay.apply(C), k = !0) : j.onresume && j.onresume.apply(C);
                return C;
            };
            this.togglePause = function() {
                if (0 === C.playState) {
                    return C.play({
                        position: 9 === aH && !C.isHTML5 ? C.position : C.position / 1000
                    }), C;
                }
                C.paused ? C.resume() : C.pause();
                return C;
            };
            this.setPan = function(j, l) {
                j === c && (j = 0);
                l === c && (l = !1);
                C.isHTML5 || aL._setPan(C.id, j);
                C._iO.pan = j;
                l || (C.pan = j, C.options.pan = j);
                return C;
            };
            this.setVolume = function(j, l) {
                j === c && (j = 100);
                l === c && (l = !1);
                C.isHTML5 ? C._a && (C._a.volume = Math.max(0, Math.min(1, j / 100))) : aL._setVolume(C.id, aN.muted && !C.muted || C.muted ? 0 : j);
                C._iO.volume = j;
                l || (C.volume = j, C.options.volume = j);
                return C;
            };
            this.mute = function() {
                C.muted = !0;
                C.isHTML5 ? C._a && (C._a.muted = !0) : aL._setVolume(C.id, 0);
                return C;
            };
            this.unmute = function() {
                C.muted = !1;
                var j = C._iO.volume !== c;
                C.isHTML5 ? C._a && (C._a.muted = !1) : aL._setVolume(C.id, j ? C._iO.volume : C.options.volume);
                return C;
            };
            this.toggleMute = function() {
                return C.muted ? C.unmute() : C.mute();
            };
            this.onposition = this.onPosition = function(j, m, l) {
                w.push({
                    position: parseInt(j, 10),
                    method: m,
                    scope: l !== c ? l : C,
                    fired: !1
                });
                return C;
            };
            this.clearOnPosition = function(l, j) {
                var m, l = parseInt(l, 10);
                if (isNaN(l)) {
                    return !1;
                }
                for (m = 0; m < w.length; m++) {
                    if (l === w[m].position && (!j || j === w[m].method)) {
                        w[m].fired && p--, w.splice(m, 1);
                    }
                }
            };
            this._processOnPosition = function() {
                var j, l;
                j = w.length;
                if (!j || !C.playState || p >= j) {
                    return !1;
                }
                for (j -= 1; 0 <= j; j--) {
                    l = w[j], !l.fired && C.position >= l.position && (l.fired = !0, p++, l.method.apply(l.scope, [l.position]));
                }
                return !0;
            };
            this._resetOnPosition = function(l) {
                var j, m;
                j = w.length;
                if (!j) {
                    return !1;
                }
                for (j -= 1; 0 <= j; j--) {
                    m = w[j], m.fired && l <= m.position && (m.fired = !1, p--);
                }
                return !0;
            };
            E = function() {
                var j = C._iO,
                    q = j.from,
                    m = j.to,
                    n, l;
                l = function() {
                    C.clearOnPosition(m, l);
                    C.stop();
                };
                n = function() {
                    if (null !== m && !isNaN(m)) {
                        C.onPosition(m, l);
                    }
                };
                null !== q && !isNaN(q) && (j.position = q, j.multiShot = !1, n());
                return j;
            };
            t = function() {
                var j, l = C._iO.onposition;
                if (l) {
                    for (j in l) {
                        if (l.hasOwnProperty(j)) {
                            C.onPosition(parseInt(j, 10), l[j]);
                        }
                    }
                }
            };
            F = function() {
                var j, l = C._iO.onposition;
                if (l) {
                    for (j in l) {
                        l.hasOwnProperty(j) && C.clearOnPosition(parseInt(j, 10));
                    }
                }
            };
            v = function() {
                C.isHTML5 && bD(C);
            };
            D = function() {
                C.isHTML5 && bs(C);
            };
            y = function(j) {
                j || (w = [], p = 0);
                k = !1;
                C._hasTimer = null;
                C._a = null;
                C._html5_canplay = !1;
                C.bytesLoaded = null;
                C.bytesTotal = null;
                C.duration = C._iO && C._iO.duration ? C._iO.duration : null;
                C.durationEstimate = null;
                C.buffered = [];
                C.eqData = [];
                C.eqData.left = [];
                C.eqData.right = [];
                C.failures = 0;
                C.isBuffering = !1;
                C.instanceOptions = {};
                C.instanceCount = 0;
                C.loaded = !1;
                C.metadata = {};
                C.readyState = 0;
                C.muted = !1;
                C.paused = !1;
                C.peakData = {
                    left: 0,
                    right: 0
                };
                C.waveformData = {
                    left: [],
                    right: []
                };
                C.playState = 0;
                C.position = null;
                C.id3 = {};
            };
            y();
            this._onTimer = function(j) {
                var n, m = !1,
                    l = {};
                if (C._hasTimer || j) {
                    if (C._a && (j || (0 < C.playState || 1 === C.readyState) && !C.paused)) {
                        n = C._get_html5_duration(), n !== z && (z = n, C.duration = n, m = !0), C.durationEstimate = C.duration, n = 1000 * C._a.currentTime || 0, n !== A && (A = n, m = !0), (m || j) && C._whileplaying(n, l, l, l, l);
                    }
                    return m;
                }
            };
            this._get_html5_duration = function() {
                var j = C._iO;
                return (j = C._a && C._a.duration ? 1000 * C._a.duration : j && j.duration ? j.duration : null) && !isNaN(j) && Infinity !== j ? j : null;
            };
            this._apply_loop = function(l, j) {
                l.loop = 1 < j ? "loop" : "";
            };
            this._setup_html5 = function(j) {
                var j = ax(C._iO, j),
                    q = decodeURI,
                    m = au ? bA : C._a,
                    n = q(j.url),
                    l;
                au ? n === bE && (l = !0) : n === h && (l = !0);
                if (m) {
                    if (m._s) {
                        if (au) {
                            m._s && (m._s.playState && !l) && m._s.stop();
                        } else {
                            if (!au && n === q(h)) {
                                return C._apply_loop(m, j.loops), m;
                            }
                        }
                    }
                    l || (y(!1), m.src = j.url, bE = h = C.url = j.url, m._called_load = !1);
                } else {
                    C._a = j.autoLoad || j.autoPlay ? new Audio(j.url) : by && 10 > opera.version() ? new Audio(null) : new Audio, m = C._a, m._called_load = !1, au && (bA = m);
                }
                C.isHTML5 = !0;
                C._a = m;
                m._s = C;
                G();
                C._apply_loop(m, j.loops);
                j.autoLoad || j.autoPlay ? C.load() : (m.autobuffer = !1, m.preload = "auto");
                return m;
            };
            G = function() {
                if (C._a._added_events) {
                    return !1;
                }
                var j;
                C._a._added_events = !0;
                for (j in at) {
                    at.hasOwnProperty(j) && C._a && C._a.addEventListener(j, at[j], !1);
                }
                return !0;
            };
            x = function() {
                var j;
                C._a._added_events = !1;
                for (j in at) {
                    at.hasOwnProperty(j) && C._a && C._a.removeEventListener(j, at[j], !1);
                }
            };
            this._onload = function(j) {
                j = !!j || !C.isHTML5 && 8 === aH && C.duration;
                C.loaded = j;
                C.readyState = j ? 3 : 2;
                C._onbufferchange(0);
                C._iO.onload && C._iO.onload.apply(C, [j]);
                return !0;
            };
            this._onbufferchange = function(j) {
                if (0 === C.playState || j && C.isBuffering || !j && !C.isBuffering) {
                    return !1;
                }
                C.isBuffering = 1 === j;
                C._iO.onbufferchange && C._iO.onbufferchange.apply(C);
                return !0;
            };
            this._onsuspend = function() {
                C._iO.onsuspend && C._iO.onsuspend.apply(C);
                return !0;
            };
            this._onfailure = function(j, m, l) {
                C.failures++;
                if (C._iO.onfailure && 1 === C.failures) {
                    C._iO.onfailure(C, j, m, l);
                }
            };
            this._onfinish = function() {
                var j = C._iO.onfinish;
                C._onbufferchange(0);
                C._resetOnPosition(0);
                C.instanceCount && (C.instanceCount--, C.instanceCount || (F(), C.playState = 0, C.paused = !1, C.instanceCount = 0, C.instanceOptions = {}, C._iO = {}, D(), C.isHTML5 && (C.position = 0)), (!C.instanceCount || C._iO.multiShotEvents) && j && j.apply(C));
            };
            this._whileloading = function(j, q, m, n) {
                var l = C._iO;
                C.bytesLoaded = j;
                C.bytesTotal = q;
                C.duration = Math.floor(m);
                C.bufferLength = n;
                C.durationEstimate = !C.isHTML5 && !l.isMovieStar ? l.duration ? C.duration > l.duration ? C.duration : l.duration : parseInt(C.bytesTotal / C.bytesLoaded * C.duration, 10) : C.duration;
                C.isHTML5 || (C.buffered = [{
                    start: 0,
                    end: C.duration
                }]);
                (3 !== C.readyState || C.isHTML5) && l.whileloading && l.whileloading.apply(C);
            };
            this._whileplaying = function(j, r, n, q, m) {
                var l = C._iO;
                if (isNaN(j) || null === j) {
                    return !1;
                }
                C.position = Math.max(0, j);
                C._processOnPosition();
                !C.isHTML5 && 8 < aH && (l.usePeakData && (r !== c && r) && (C.peakData = {
                    left: r.leftPeak,
                    right: r.rightPeak
                }), l.useWaveformData && (n !== c && n) && (C.waveformData = {
                    left: n.split(","),
                    right: q.split(",")
                }), l.useEQData && (m !== c && m && m.leftEQ) && (j = m.leftEQ.split(","), C.eqData = j, C.eqData.left = j, m.rightEQ !== c && m.rightEQ && (C.eqData.right = m.rightEQ.split(","))));
                1 === C.playState && (!C.isHTML5 && (8 === aH && !C.position && C.isBuffering) && C._onbufferchange(0), l.whileplaying && l.whileplaying.apply(C));
                return !0;
            };
            this._oncaptiondata = function(j) {
                C.captiondata = j;
                C._iO.oncaptiondata && C._iO.oncaptiondata.apply(C, [j]);
            };
            this._onmetadata = function(j, q) {
                var m = {},
                    n, l;
                n = 0;
                for (l = j.length; n < l; n++) {
                    m[j[n]] = q[n];
                }
                C.metadata = m;
                C._iO.onmetadata && C._iO.onmetadata.apply(C);
            };
            this._onid3 = function(j, q) {
                var m = [],
                    n, l;
                n = 0;
                for (l = j.length; n < l; n++) {
                    m[j[n]] = q[n];
                }
                C.id3 = ax(C.id3, m);
                C._iO.onid3 && C._iO.onid3.apply(C);
            };
            this._onconnect = function(j) {
                j = 1 === j;
                if (C.connected = j) {
                    C.failures = 0, aB(C.id) && (C.getAutoPlay() ? C.play(c, C.getAutoPlay()) : C._iO.autoLoad && C.load()), C._iO.onconnect && C._iO.onconnect.apply(C, [j]);
                }
            };
            this._ondataerror = function() {
                0 < C.playState && C._iO.ondataerror && C._iO.ondataerror.apply(C);
            };
        };
        ac = function() {
            return aG.body || aG._docElement || aG.getElementsByTagName("div")[0];
        };
        aY = function(h) {
            return aG.getElementById(h);
        };
        ax = function(h, l) {
            var m = h || {},
                j, k;
            j = l === c ? aN.defaultOptions : l;
            for (k in j) {
                j.hasOwnProperty(k) && m[k] === c && (m[k] = "object" !== typeof j[k] || null === j[k] ? j[k] : ax(m[k], j[k]));
            }
            return m;
        };
        aX = {
            onready: 1,
            ontimeout: 1,
            defaultOptions: 1,
            flash9Options: 1,
            movieStarOptions: 1
        };
        I = function(j, n) {
            var p, k = !0,
                m = n !== c,
                l = aN.setupOptions;
            for (p in j) {
                if (j.hasOwnProperty(p)) {
                    if ("object" !== typeof j[p] || null === j[p] || j[p] instanceof Array || j[p] instanceof RegExp) {
                        m && aX[n] !== c ? aN[n][p] = j[p] : l[p] !== c ? (aN.setupOptions[p] = j[p], aN[p] = j[p]) : aX[p] === c ? (bg(av(aN[p] === c ? "setupUndef" : "setupError", p), 2), k = !1) : aN[p] instanceof Function ? aN[p].apply(aN, j[p] instanceof Array ? j[p] : [j[p]]) : aN[p] = j[p];
                    } else {
                        if (aX[p] === c) {
                            bg(av(aN[p] === c ? "setupUndef" : "setupError", p), 2), k = !1;
                        } else {
                            return I(j[p], p);
                        }
                    }
                }
            }
            return k;
        };
        var a2 = function(h) {
                var h = ah.call(h),
                    j = h.length;
                o ? (h[1] = "on" + h[1], 3 < j && h.pop()) : 3 === j && h.push(!1);
                return h;
            },
            aC = function(h, l) {
                var k = h.shift(),
                    j = [bw[l]];
                if (o) {
                    k[j](h[0], h[1]);
                } else {
                    k[j].apply(k, h);
                }
            },
            o = a.attachEvent,
            bw = {
                add: o ? "attachEvent" : "addEventListener",
                remove: o ? "detachEvent" : "removeEventListener"
            };
        aE = {
            add: function() {
                aC(a2(arguments), "add");
            },
            remove: function() {
                aC(a2(arguments), "remove");
            }
        };
        at = {
            abort: aF(function() {}),
            canplay: aF(function() {
                var h = this._s,
                    k;
                if (h._html5_canplay) {
                    return !0;
                }
                h._html5_canplay = !0;
                h._onbufferchange(0);
                k = h._iO.position !== c && !isNaN(h._iO.position) ? h._iO.position / 1000 : null;
                if (h.position && this.currentTime !== k) {
                    try {
                        this.currentTime = k;
                    } catch (j) {}
                }
                h._iO._oncanplay && h._iO._oncanplay();
            }),
            canplaythrough: aF(function() {
                var h = this._s;
                h.loaded || (h._onbufferchange(0), h._whileloading(h.bytesLoaded, h.bytesTotal, h._get_html5_duration()), h._onload(!0));
            }),
            ended: aF(function() {
                this._s._onfinish();
            }),
            error: aF(function() {
                this._s._onload(!1);
            }),
            loadeddata: aF(function() {
                var h = this._s;
                !h._loaded && !bJ && (h.duration = h._get_html5_duration());
            }),
            loadedmetadata: aF(function() {}),
            loadstart: aF(function() {
                this._s._onbufferchange(1);
            }),
            play: aF(function() {
                this._s._onbufferchange(0);
            }),
            playing: aF(function() {
                this._s._onbufferchange(0);
            }),
            progress: aF(function(h) {
                var n = this._s,
                    m, j, l = 0,
                    l = h.target.buffered;
                m = h.loaded || 0;
                var k = h.total || 1;
                n.buffered = [];
                if (l && l.length) {
                    m = 0;
                    for (j = l.length; m < j; m++) {
                        n.buffered.push({
                            start: 1000 * l.start(m),
                            end: 1000 * l.end(m)
                        });
                    }
                    l = 1000 * (l.end(0) - l.start(0));
                    m = l / (1000 * h.target.duration);
                }
                isNaN(m) || (n._onbufferchange(0), n._whileloading(m, k, n._get_html5_duration()), m && (k && m === k) && at.canplaythrough.call(this, h));
            }),
            ratechange: aF(function() {}),
            suspend: aF(function(h) {
                var j = this._s;
                at.progress.call(this, h);
                j._onsuspend();
            }),
            stalled: aF(function() {}),
            timeupdate: aF(function() {
                this._s._onTimer();
            }),
            waiting: aF(function() {
                this._s._onbufferchange(1);
            })
        };
        a4 = function(h) {
            return h.serverURL || h.type && aZ(h.type) ? !1 : h.type ? a1({
                type: h.type
            }) : a1({
                url: h.url
            }) || aN.html5Only;
        };
        ae = function(h, j) {
            h && (h.src = j, h._called_load = !1);
            au && (bE = null);
        };
        a1 = function(h) {
            if (!aN.useHTML5Audio || !aN.hasHTML5) {
                return !1;
            }
            var k = h.url || null,
                h = h.type || null,
                l = aN.audioFormats,
                j;
            if (h && aN.html5[h] !== c) {
                return aN.html5[h] && !aZ(h);
            }
            if (!aq) {
                aq = [];
                for (j in l) {
                    l.hasOwnProperty(j) && (aq.push(j), l[j].related && (aq = aq.concat(l[j].related)));
                }
                aq = RegExp("\\.(" + aq.join("|") + ")(\\?.*)?$", "i");
            }
            j = k ? k.toLowerCase().match(aq) : null;
            !j || !j.length ? h && (k = h.indexOf(";"), j = (-1 !== k ? h.substr(0, k) : h).substr(6)) : j = j[1];
            j && aN.html5[j] !== c ? k = aN.html5[j] && !aZ(j) : (h = "audio/" + j, k = aN.html5.canPlayType({
                type: h
            }), k = (aN.html5[j] = k) && aN.html5[h] && !aZ(h));
            return k;
        };
        f = function() {
            function j(q) {
                var h, s, r = h = !1;
                if (!n || "function" !== typeof n.canPlayType) {
                    return h;
                }
                if (q instanceof Array) {
                    h = 0;
                    for (s = q.length; h < s; h++) {
                        if (aN.html5[q[h]] || n.canPlayType(q[h]).match(aN.html5Test)) {
                            r = !0, aN.html5[q[h]] = !0, aN.flash[q[h]] = !!q[h].match(ag);
                        }
                    }
                    h = r;
                } else {
                    q = n && "function" === typeof n.canPlayType ? n.canPlayType(q) : !1, h = !(!q || !q.match(aN.html5Test));
                }
                return h;
            }
            if (!aN.useHTML5Audio || !aN.hasHTML5) {
                return !1;
            }
            var n = Audio !== c ? by && 10 > opera.version() ? new Audio(null) : new Audio : null,
                p, k, m = {},
                l;
            l = aN.audioFormats;
            for (p in l) {
                if (l.hasOwnProperty(p) && (k = "audio/" + p, m[p] = j(l[p].type), m[k] = m[p], p.match(ag) ? (aN.flash[p] = !0, aN.flash[k] = !0) : (aN.flash[p] = !1, aN.flash[k] = !1), l[p] && l[p].related)) {
                    for (k = l[p].related.length - 1; 0 <= k; k--) {
                        m["audio/" + l[p].related[k]] = m[p], aN.html5[l[p].related[k]] = m[p], aN.flash[l[p].related[k]] = m[p];
                    }
                }
            }
            m.canPlayType = n ? j : null;
            aN.html5 = ax(aN.html5, m);
            return !0;
        };
        bk = {};
        av = function() {};
        aT = function(h) {
            8 === aH && (1 < h.loops && h.stream) && (h.stream = !1);
            return h;
        };
        aR = function(h) {
            if (h && !h.usePolicyFile && (h.onid3 || h.usePeakData || h.useWaveformData || h.useEQData)) {
                h.usePolicyFile = !0;
            }
            return h;
        };
        bg = function() {};
        be = function() {
            return !1;
        };
        ad = function(h) {
            for (var j in h) {
                h.hasOwnProperty(j) && "function" === typeof h[j] && (h[j] = be);
            }
        };
        bC = function(h) {
            h === c && (h = !1);
            (ay || h) && aN.disable(h);
        };
        bN = function(h) {
            var j = null;
            if (h) {
                if (h.match(/\.swf(\?.*)?$/i)) {
                    if (j = h.substr(h.toLowerCase().lastIndexOf(".swf?") + 4)) {
                        return h;
                    }
                } else {
                    h.lastIndexOf("/") !== h.length - 1 && (h += "/");
                }
            }
            h = (h && -1 !== h.lastIndexOf("/") ? h.substr(0, h.lastIndexOf("/") + 1) : "./") + aN.movieURL;
            aN.noSWFCache && (h += "?ts=" + (new Date).getTime());
            return h;
        };
        bz = function() {
            aH = parseInt(aN.flashVersion, 10);
            8 !== aH && 9 !== aH && (aN.flashVersion = aH = 8);
            var h = aN.debugMode || aN.debugFlash ? "_debug.swf" : ".swf";
            aN.useHTML5Audio && (!aN.html5Only && aN.audioFormats.mp4.required && 9 > aH) && (aN.flashVersion = aH = 9);
            aN.version = aN.versionNumber + (aN.html5Only ? " (HTML5-only mode)" : 9 === aH ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            8 < aH ? (aN.defaultOptions = ax(aN.defaultOptions, aN.flash9Options), aN.features.buffering = !0, aN.defaultOptions = ax(aN.defaultOptions, aN.movieStarOptions), aN.filePatterns.flash9 = RegExp("\\.(mp3|" + bn.join("|") + ")(\\?.*)?$", "i"), aN.features.movieStar = !0) : aN.features.movieStar = !1;
            aN.filePattern = aN.filePatterns[8 !== aH ? "flash9" : "flash8"];
            aN.movieURL = (8 === aH ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", h);
            aN.features.peakData = aN.features.waveformData = aN.features.eqData = 8 < aH;
        };
        am = function(h, j) {
            if (!aL) {
                return !1;
            }
            aL._setPolling(h, j);
        };
        bM = function() {
            aN.debugURLParam.test(bx) && (aN.debugMode = !0);
        };
        aB = this.getSoundById;
        bh = function() {
            var h = [];
            aN.debugMode && h.push("sm2_debug");
            aN.debugFlash && h.push("flash_debug");
            aN.useHighPerformance && h.push("high_performance");
            return h.join(" ");
        };
        aP = function() {
            av("fbHandler");
            var h = aN.getMoviePercent(),
                j = {
                    type: "FLASHBLOCK"
                };
            if (aN.html5Only) {
                return !1;
            }
            aN.ok() ? aN.oMC && (aN.oMC.className = [bh(), "movieContainer", "swf_loaded" + (aN.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (aw && (aN.oMC.className = bh() + " movieContainer " + (null === h ? "swf_timedout" : "swf_error")), aN.didFlashBlock = !0, bp({
                type: "ontimeout",
                ignoreInit: !0,
                error: j
            }), bi(j));
        };
        bK = function(h, k, j) {
            az[h] === c && (az[h] = []);
            az[h].push({
                method: k,
                scope: j || null,
                fired: !1
            });
        };
        bp = function(h) {
            h || (h = {
                type: aN.ok() ? "onready" : "ontimeout"
            });
            if (!aI && h && !h.ignoreInit || "ontimeout" === h.type && (aN.ok() || ay && !h.ignoreInit)) {
                return !1;
            }
            var m = {
                    success: h && h.ignoreInit ? aN.ok() : !ay
                },
                n = h && h.type ? az[h.type] || [] : [],
                j = [],
                l, m = [m],
                k = aw && !aN.ok();
            h.error && (m[0].error = h.error);
            h = 0;
            for (l = n.length; h < l; h++) {
                !0 !== n[h].fired && j.push(n[h]);
            }
            if (j.length) {
                h = 0;
                for (l = j.length; h < l; h++) {
                    j[h].scope ? j[h].method.apply(j[h].scope, m) : j[h].method.apply(this, m), k || (j[h].fired = !0);
                }
            }
            return !0;
        };
        bo = function() {
            a.setTimeout(function() {
                aN.useFlashBlock && aP();
                bp();
                "function" === typeof aN.onload && aN.onload.apply(a);
                aN.waitForWindowLoad && aE.add(a, "load", bo);
            }, 1);
        };
        bt = function() {
            if (bq !== c) {
                return bq;
            }
            var j = !1,
                p = navigator,
                n = p.plugins,
                k, m = a.ActiveXObject;
            if (n && n.length) {
                (p = p.mimeTypes) && (p["application/x-shockwave-flash"] && p["application/x-shockwave-flash"].enabledPlugin && p["application/x-shockwave-flash"].enabledPlugin.description) && (j = !0);
            } else {
                if (m !== c && !aA.match(/MSAppHost/i)) {
                    try {
                        k = new m("ShockwaveFlash.ShockwaveFlash");
                    } catch (l) {}
                    j = !!k;
                }
            }
            return bq = j;
        };
        af = function() {
            var h, j, k = aN.audioFormats;
            if (aD && aA.match(/os (1|2|3_0|3_1)/i)) {
                aN.hasHTML5 = !1, aN.html5Only = !0, aN.oMC && (aN.oMC.style.display = "none");
            } else {
                if (aN.useHTML5Audio && (!aN.html5 || !aN.html5.canPlayType)) {
                    aN.hasHTML5 = !1;
                }
            }
            if (aN.useHTML5Audio && aN.hasHTML5) {
                for (j in k) {
                    if (k.hasOwnProperty(j) && (k[j].required && !aN.html5.canPlayType(k[j].type) || aN.preferFlash && (aN.flash[j] || aN.flash[k[j].type]))) {
                        h = !0;
                    }
                }
            }
            aN.ignoreFlash && (h = !1);
            aN.html5Only = aN.hasHTML5 && aN.useHTML5Audio && !h;
            return !aN.html5Only;
        };
        bv = function(h) {
            var k, l, j = 0;
            if (h instanceof Array) {
                k = 0;
                for (l = h.length; k < l; k++) {
                    if (h[k] instanceof Object) {
                        if (aN.canPlayMIME(h[k].type)) {
                            j = k;
                            break;
                        }
                    } else {
                        if (aN.canPlayURL(h[k])) {
                            j = k;
                            break;
                        }
                    }
                }
                h[j].url && (h[j] = h[j].url);
                h = h[j];
            }
            return h;
        };
        bD = function(h) {
            h._hasTimer || (h._hasTimer = !0, !bf && aN.html5PollingInterval && (null === a3 && 0 === bB && (a3 = a.setInterval(aQ, aN.html5PollingInterval)), bB++));
        };
        bs = function(h) {
            h._hasTimer && (h._hasTimer = !1, !bf && aN.html5PollingInterval && bB--);
        };
        aQ = function() {
            var h;
            if (null !== a3 && !bB) {
                return a.clearInterval(a3), a3 = null, !1;
            }
            for (h = aN.soundIDs.length - 1; 0 <= h; h--) {
                aN.sounds[aN.soundIDs[h]].isHTML5 && aN.sounds[aN.soundIDs[h]]._hasTimer && aN.sounds[aN.soundIDs[h]]._onTimer();
            }
        };
        bi = function(h) {
            h = h !== c ? h : {};
            "function" === typeof aN.onerror && aN.onerror.apply(a, [{
                type: h.type !== c ? h.type : null
            }]);
            h.fatal !== c && h.fatal && aN.disable();
        };
        bF = function() {
            if (!aS || !bt()) {
                return !1;
            }
            var h = aN.audioFormats,
                j, k;
            for (k in h) {
                if (h.hasOwnProperty(k) && ("mp3" === k || "mp4" === k)) {
                    if (aN.html5[k] = !1, h[k] && h[k].related) {
                        for (j = h[k].related.length - 1; 0 <= j; j--) {
                            aN.html5[h[k].related[j]] = !1;
                        }
                    }
                }
            }
        };
        this._setSandboxType = function() {};
        this._externalInterfaceOK = function() {
            if (aN.swfLoaded) {
                return !1;
            }
            aN.swfLoaded = !0;
            ai = !1;
            aS && bF();
            setTimeout(aJ, ap ? 100 : 1);
        };
        aU = function(z, x) {
            function y(j, h) {
                return '<param name="' + j + '" value="' + h + '" />';
            }
            if (bd && bc) {
                return !1;
            }
            if (aN.html5Only) {
                return bz(), aN.oMC = aY(aN.movieID), aJ(), bc = bd = !0, !1;
            }
            var A = x || aN.url,
                w = aN.altURL || A,
                v = ac(),
                u = bh(),
                s = null,
                s = aG.getElementsByTagName("html")[0],
                t, q, r, s = s && s.dir && s.dir.match(/rtl/i),
                z = z === c ? aN.id : z;
            bz();
            aN.url = bN(ak ? A : w);
            x = aN.url;
            aN.wmode = !aN.wmode && aN.useHighPerformance ? "transparent" : aN.wmode;
            if (null !== aN.wmode && (aA.match(/msie 8/i) || !ap && !aN.useHighPerformance) && navigator.platform.match(/win32|win64/i)) {
                ao.push(bk.spcWmode), aN.wmode = null;
            }
            v = {
                name: z,
                id: z,
                src: x,
                quality: "high",
                allowScriptAccess: aN.allowScriptAccess,
                bgcolor: aN.bgColor,
                pluginspage: g + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: aN.wmode,
                hasPriority: "true"
            };
            aN.debugFlash && (v.FlashVars = "debug=1");
            aN.wmode || delete v.wmode;
            if (ap) {
                A = aG.createElement("div"), q = ['<object id="' + z + '" data="' + x + '" type="' + v.type + '" title="' + v.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + g + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', y("movie", x), y("AllowScriptAccess", aN.allowScriptAccess), y("quality", v.quality), aN.wmode ? y("wmode", aN.wmode) : "", y("bgcolor", aN.bgColor), y("hasPriority", "true"), aN.debugFlash ? y("FlashVars", v.FlashVars) : "", "</object>"].join("");
            } else {
                for (t in A = aG.createElement("embed"), v) {
                    v.hasOwnProperty(t) && A.setAttribute(t, v[t]);
                }
            }
            bM();
            u = bh();
            if (v = ac()) {
                if (aN.oMC = aY(aN.movieID) || aG.createElement("div"), aN.oMC.id) {
                    r = aN.oMC.className, aN.oMC.className = (r ? r + " " : "movieContainer") + (u ? " " + u : ""), aN.oMC.appendChild(A), ap && (t = aN.oMC.appendChild(aG.createElement("div")), t.className = "sm2-object-box", t.innerHTML = q), bc = !0;
                } else {
                    aN.oMC.id = aN.movieID;
                    aN.oMC.className = "movieContainer " + u;
                    t = u = null;
                    aN.useFlashBlock || (aN.useHighPerformance ? u = {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    } : (u = {
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        top: "-9999px",
                        left: "-9999px"
                    }, s && (u.left = Math.abs(parseInt(u.left, 10)) + "px")));
                    i && (aN.oMC.style.zIndex = 10000);
                    if (!aN.debugFlash) {
                        for (r in u) {
                            u.hasOwnProperty(r) && (aN.oMC.style[r] = u[r]);
                        }
                    }
                    try {
                        ap || aN.oMC.appendChild(A), v.appendChild(aN.oMC), ap && (t = aN.oMC.appendChild(aG.createElement("div")), t.className = "sm2-object-box", t.innerHTML = q), bc = !0;
                    } catch (l) {
                        throw Error(av("domError") + " \n" + l.toString());
                    }
                }
            }
            return bd = !0;
        };
        aV = function() {
            if (aN.html5Only) {
                return aU(), !1;
            }
            if (aL || !aN.url) {
                return !1;
            }
            aL = aN.getMovie(aN.id);
            aL || (a6 ? (ap ? aN.oMC.innerHTML = br : aN.oMC.appendChild(a6), a6 = null, bd = !0) : aU(aN.id, aN.url), aL = aN.getMovie(aN.id));
            "function" === typeof aN.oninitmovie && setTimeout(aN.oninitmovie, 1);
            return !0;
        };
        bl = function() {
            setTimeout(aO, 1000);
        };
        aO = function() {
            var h, j = !1;
            if (!aN.url || a5) {
                return !1;
            }
            a5 = !0;
            aE.remove(a, "load", bl);
            if (ai && !aK) {
                return !1;
            }
            aI || (h = aN.getMoviePercent(), 0 < h && 100 > h && (j = !0));
            setTimeout(function() {
                h = aN.getMoviePercent();
                if (j) {
                    return a5 = !1, a.setTimeout(bl, 1), !1;
                }!aI && ar && (null === h ? aN.useFlashBlock || 0 === aN.flashLoadTimeout ? aN.useFlashBlock && aP() : bp({
                    type: "ontimeout",
                    ignoreInit: !0
                }) : 0 !== aN.flashLoadTimeout && bC(!0));
            }, aN.flashLoadTimeout);
        };
        aW = function() {
            if (aK || !ai) {
                return aE.remove(a, "focus", aW), !0;
            }
            aK = ar = !0;
            a5 = !1;
            bl();
            aE.remove(a, "focus", aW);
            return !0;
        };
        a8 = function(h) {
            if (aI) {
                return !1;
            }
            if (aN.html5Only) {
                return aI = !0, bo(), !0;
            }
            var j = !0,
                k;
            if (!aN.useFlashBlock || !aN.flashLoadTimeout || aN.getMoviePercent()) {
                aI = !0, ay && (k = {
                    type: !bq && aw ? "NO_FLASH" : "INIT_TIMEOUT"
                });
            }
            if (ay || h) {
                aN.useFlashBlock && aN.oMC && (aN.oMC.className = bh() + " " + (null === aN.getMoviePercent() ? "swf_timedout" : "swf_error")), bp({
                    type: "ontimeout",
                    error: k,
                    ignoreInit: !0
                }), bi(k), j = !1;
            }
            ay || (aN.waitForWindowLoad && !aj ? aE.add(a, "load", bo) : bo());
            return j;
        };
        bm = function() {
            var h, j = aN.setupOptions;
            for (h in j) {
                j.hasOwnProperty(h) && (aN[h] === c ? aN[h] = j[h] : aN[h] !== j[h] && (aN.setupOptions[h] = aN[h]));
            }
        };
        aJ = function() {
            if (aI) {
                return !1;
            }
            if (aN.html5Only) {
                return aI || (aE.remove(a, "load", aN.beginDelayedInit), aN.enabled = !0, a8()), !0;
            }
            aV();
            try {
                aL._externalInterfaceTest(!1), am(!0, aN.flashPollingInterval || (aN.useHighPerformance ? 10 : 50)), aN.debugMode || aL._disableDebug(), aN.enabled = !0, aN.html5Only || aE.add(a, "unload", be);
            } catch (h) {
                return bi({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }), bC(!0), a8(), !1;
            }
            a8();
            aE.remove(a, "load", aN.beginDelayedInit);
            return !0;
        };
        bj = function() {
            if (a7) {
                return !1;
            }
            a7 = !0;
            bm();
            bM();
            !bq && aN.hasHTML5 && aN.setup({
                useHTML5Audio: !0,
                preferFlash: !1
            });
            f();
            aN.html5.usingFlash = af();
            aw = aN.html5.usingFlash;
            !bq && aw && (ao.push(bk.needFlash), aN.setup({
                flashLoadTimeout: 1
            }));
            aG.removeEventListener && aG.removeEventListener("DOMContentLoaded", bj, !1);
            aV();
            return !0;
        };
        e = function() {
            "complete" === aG.readyState && (bj(), aG.detachEvent("onreadystatechange", e));
            return !0;
        };
        al = function() {
            aj = !0;
            aE.remove(a, "load", al);
        };
        aM = function() {
            if (bf && (aN.setupOptions.useHTML5Audio = !0, aN.setupOptions.preferFlash = !1, aD || bu && !aA.match(/android\s2\.3/i))) {
                aD && (aN.ignoreFlash = !0), au = !0;
            }
        };
        aM();
        bt();
        aE.add(a, "focus", aW);
        aE.add(a, "load", bl);
        aE.add(a, "load", al);
        aG.addEventListener ? aG.addEventListener("DOMContentLoaded", bj, !1) : aG.attachEvent ? aG.attachEvent("onreadystatechange", e) : bi({
            type: "NO_DOM2_EVENTS",
            fatal: !0
        });
    }
    var d = null;
    if (void 0 === a.SM2_DEFER || !SM2_DEFER) {
        d = new b;
    }
    a.SoundManager = b;
    a.soundManager = d;
})(window);