var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
function DeprecatedMethod(description) {
    return function (originalMethod, context) {
        if (context.kind !== 'method')
            throw new Error('Method-only decorator!');
        function replacementMethod() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var message = "".concat(context.name.toString(), " is deprecated, because ").concat(description.reason, ".");
            description.replaceMethod
                ? console.log("".concat(message, " Use ").concat(description.replaceMethod, " instead."))
                : console.log(message);
            return originalMethod.apply(this, args);
        }
        return replacementMethod;
    };
}
function MinStringLength(minValue) {
    return function (originalMethod, context) {
        if (context.kind !== 'setter')
            throw new Error('Setter-only decorator!');
        function replacementSetter(value) {
            if (value.length < minValue) {
                return console.log("Length can not be less than ".concat(minValue.toString()));
            }
            ;
            return originalMethod.apply(this, [value]);
        }
        return replacementSetter;
    };
}
function MaxStringLength(maxValue) {
    return function (originalMethod, context) {
        if (context.kind !== 'setter')
            throw new Error('Setter-only decorator!');
        function replacementSetter(value) {
            if (value.length > maxValue) {
                return console.log("Length can not be more than ".concat(maxValue.toString()));
            }
            ;
            return originalMethod.apply(this, [value]);
        }
        return replacementSetter;
    };
}
function Email(originalMethod, context) {
    if (context.kind !== 'setter')
        throw new Error('Setter-only decorator!');
    function replacementSetter(value) {
        if (!value.includes('@') || value.includes('.ru')) {
            console.log('Invalid email entered.');
        }
        ;
        return originalMethod.apply(this, [value]);
    }
    return replacementSetter;
}
var Test = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _test_decorators;
    var _test2_decorators;
    var _set_testString_decorators;
    return _a = /** @class */ (function () {
            function Test() {
                this._testString = (__runInitializers(this, _instanceExtraInitializers), '');
            }
            Test.prototype.test = function () { };
            Test.prototype.test2 = function () { };
            Object.defineProperty(Test.prototype, "testString", {
                get: function () {
                    return this._testString;
                },
                set: function (value) {
                    this._testString = value;
                },
                enumerable: false,
                configurable: true
            });
            return Test;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _test_decorators = [DeprecatedMethod({ reason: "It's life!" })];
            _test2_decorators = [DeprecatedMethod({ reason: "It's life!", replaceMethod: '[some another method]' })];
            _set_testString_decorators = [MinStringLength(22), MaxStringLength(25), Email];
            __esDecorate(_a, null, _test_decorators, { kind: "method", name: "test", static: false, private: false, access: { has: function (obj) { return "test" in obj; }, get: function (obj) { return obj.test; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _test2_decorators, { kind: "method", name: "test2", static: false, private: false, access: { has: function (obj) { return "test2" in obj; }, get: function (obj) { return obj.test2; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_testString_decorators, { kind: "setter", name: "testString", static: false, private: false, access: { has: function (obj) { return "testString" in obj; }, set: function (obj, value) { obj.testString = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var test = new Test();
test.test();
test.test2();
test.testString = 'Some too normale string';
console.log(test.testString);
test.testString = 'Some too short string';
console.log(test.testString);
test.testString = 'Some too loooooooooooong string';
console.log(test.testString);
