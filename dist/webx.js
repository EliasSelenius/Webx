"use strict";
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
                if (!Utils.DerivesFrom(type, Behavior)) {
                    console.error(name_1 + ' is not a valid behavior');
                    continue;
                }
                var inst = new type(v);
                var rawjsontxt = beh.substring(charindex, beh.length);
                if (!Utils.IsNullOrWhitespace(rawjsontxt)) {
                    var Json = JSON.parse(Utils.FixJson(rawjsontxt));
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
var Behavior = /** @class */ (function () {
    function Behavior(el) {
        this.element = el;
        //this.Start();
    }
    Behavior.prototype.Start = function () { };
    return Behavior;
}());
var Component = /** @class */ (function () {
    function Component() {
    }
    return Component;
}());
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
})(Utils || (Utils = {}));
