"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('webx loaded...');
window.onload = function () {
    // look for behavior attributes
    var all = document.body.querySelectorAll('*');
    all.forEach(function (v, index) {
        var at = v.getAttribute('behavior');
        if (at !== null) {
            var behaviors = at.split(';');
            for (var _i = 0, behaviors_1 = behaviors; _i < behaviors_1.length; _i++) {
                var beh = behaviors_1[_i];
                var charindex = beh.indexOf('{');
                if (charindex === -1) {
                    charindex = beh.length;
                }
                var name_1 = beh.substring(0, charindex);
                var namepath = name_1.split('.');
                var type = window[namepath[0]];
                for (var _a = 0, _b = namepath.slice(1); _a < _b.length; _a++) {
                    var seg = _b[_a];
                    type = type[seg];
                }
                if (!webx.Utils.DerivesFrom(type, webx.Behavior)) {
                    console.error(name_1 + ' is not a valid behavior');
                    continue;
                }
                var inst = new type(v);
                var rawjsontxt = beh.substring(charindex, beh.length);
                if (!webx.Utils.IsNullOrWhitespace(rawjsontxt)) {
                    var Json = JSON.parse(webx.Utils.FixJson(rawjsontxt));
                    for (var key in Json) {
                        if (Json.hasOwnProperty(key) && inst.hasOwnProperty(key)) {
                            inst[key] = Json[key];
                        }
                        else {
                            console.error(key + ' is not a valid property in ' + name_1);
                        }
                    }
                }
                inst.Start();
                //console.log(inst);
            }
        }
    });
};
var webx;
(function (webx) {
    // wrapper class for HTMLElement.
    // this class adds extra data to an HTMLElement
    var Taghandle = /** @class */ (function () {
        function Taghandle(el) {
            this.behaviors = [];
            this.refs = {};
            this.el = el;
            this.UpdateRefs();
        }
        Taghandle.prototype.UpdateRefs = function () {
            var _this = this;
            var all = this.el.querySelectorAll('*');
            all.forEach(function (e) {
                var at = e.getAttribute('ref');
                if (at) {
                    _this.refs[at] = webx.Manager.DOMHandlers.FetchHandleOf(e);
                }
            });
        };
        return Taghandle;
    }());
    webx.Taghandle = Taghandle;
    // any class that is somehow assosiated with an HTML DOM element will extend this class
    // it adds reference to the wrapper class for that DOM element
    // and exposes wrapper methods for DOM manipulation
    var TaghandleUser = /** @class */ (function () {
        function TaghandleUser(el) {
            this.tag = webx.Manager.DOMHandlers.FetchHandleOf(el);
            this.tag.UpdateRefs();
        }
        Object.defineProperty(TaghandleUser.prototype, "el", {
            get: function () {
                return this.tag.el;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaghandleUser.prototype, "refs", {
            get: function () {
                return this.tag.refs;
            },
            enumerable: true,
            configurable: true
        });
        return TaghandleUser;
    }());
    webx.TaghandleUser = TaghandleUser;
})(webx || (webx = {}));
/// <reference path="../Taghandle.ts" />
var webx;
(function (webx) {
    var Behavior = /** @class */ (function (_super) {
        __extends(Behavior, _super);
        function Behavior(el) {
            var _this = _super.call(this, el) || this;
            _this.tag.behaviors.push(_this);
            return _this;
            //this.Start();
        }
        Behavior.prototype.Start = function () { };
        return Behavior;
    }(webx.TaghandleUser));
    webx.Behavior = Behavior;
})(webx || (webx = {}));
var webx;
(function (webx) {
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component(el) {
            return _super.call(this, el) || this;
        }
        Component.prototype.Start = function () { };
        return Component;
    }(webx.TaghandleUser));
    webx.Component = Component;
})(webx || (webx = {}));
var webx;
(function (webx) {
    var Manager;
    (function (Manager) {
        var Components;
        (function (Components) {
            var Templates = {};
            Components.Init = function (type, templatename) {
                var compName = (templatename ? templatename : type.prototype.constructor.name);
                fetch(compName + '.html')
                    .then(function (r) {
                    return r.text();
                })
                    .then(function (r) {
                    console.log(r);
                    Templates[compName] = { type: type, template: r };
                }, function (r) {
                    console.log("dwadwad");
                });
            };
            Components.InitAllInDOM = function () {
                var _loop_1 = function (key) {
                    if (Templates.hasOwnProperty(key)) {
                        var allelms = document.body.querySelectorAll(key);
                        allelms.forEach(function (e) {
                            var c = new Templates[key].type(e);
                            c.el.innerHTML = Templates[key].template;
                            c.tag.UpdateRefs();
                            c.Start();
                        });
                    }
                };
                for (var key in Templates) {
                    _loop_1(key);
                }
            };
            window.addEventListener('load', Components.InitAllInDOM);
        })(Components = Manager.Components || (Manager.Components = {}));
    })(Manager = webx.Manager || (webx.Manager = {}));
})(webx || (webx = {}));
var webx;
(function (webx) {
    var Manager;
    (function (Manager) {
        var DOMHandlers;
        (function (DOMHandlers) {
            var Taghandles = [];
            DOMHandlers.FetchHandleOf = function (el) {
                var tag;
                tag = Taghandles.filter(function (e) { return e.el == el; })[0];
                if (!tag) {
                    console.log('new Tag Insted....');
                    tag = new webx.Taghandle(el);
                    Taghandles.push(tag);
                }
                return tag;
            };
        })(DOMHandlers = Manager.DOMHandlers || (Manager.DOMHandlers = {}));
    })(Manager = webx.Manager || (webx.Manager = {}));
})(webx || (webx = {}));
var webx;
(function (webx) {
    var Utils;
    (function (Utils) {
        Utils.IsNullOrWhitespace = function (str) {
            return (str === null) || (str.match(/^\s*$/) !== null);
        };
        Utils.FixJson = function (json) {
            return json
                // replace colon inside double quote
                .replace(/:\s*"([^"]*)"/g, function (match, val) {
                return ': "' + val.replace(/:/g, '@colon@') + '"';
            })
                // replace colon inside single quote
                .replace(/:\s*'([^']*)'/g, function (match, val) {
                return ': "' + val.replace(/:/g, '@colon@') + '"';
            })
                // place double quotes around key strings
                .replace(/['"]?(\w+)['"]?\s*:/g, '"$1":')
                // replace @colon@ with :
                .replace(/@colon@/g, ':');
        };
        Utils.DerivesFrom = function (a, b) {
            return (a && b) && typeof b === 'function' && (a.prototype instanceof b);
        };
    })(Utils = webx.Utils || (webx.Utils = {}));
})(webx || (webx = {}));
