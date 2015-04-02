define(function() {
    function verify(type, validator) {
        return function(val) {
            if (typeof val !== type || (validator && !validator(val))) {
                throw new Error("Value from stack is not of expected type or format.");
            }
            return val;
        };
    }

    return {
        verifyInt: verify('number', function(num) { return num === Math.round(num); }),
        verifyPtr: function() { throw new Error("not implemented"); },
        verifyLoc: verify('number')
    };
});