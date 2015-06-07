define(function() {
    var coercers = {
        int: function coerceInt(value) {
            var rounded = value % 4294967296;
            return rounded < 2147483648 ? rounded : -4294967296 + rounded;
        },
        char: function coerceChar(value) {
            var rounded = value % 256;
            return rounded < 128 ? rounded : -256 + rounded;
        },
        default: function id(value) {
            return value;
        }
    };

    var verifiers = {
        int: function verifyInt(value) {
            return typeof value === "number";
        },
        char: function verifyInt(value) {
            return typeof value === "number";
        },
        pointer: function verifyPtr(value) {
            return "base" in value && "offset" in value;
        },
        default: function noop() { return true; }
    };

    function verifyType(value, type) {
        var verifier = verifiers[type] || verifiers.default;
        return verifier(value);
    }

    return function coerceValue(value, type) {
        if (!verifyType(value, type)) {
            throw new Error("Invalid memory operation: " + value + " is not a " + type);
        }
        var coercer = coercers[type] || coercers.default;
        return coercer(value);
    };
});