define(function () {
    function TypeMismatch (expected, got, operation) {
	this.expected = expected;
	this.got = got;
	this.operation = operation;
	this.message = operation + ': TYPE MISMATCH. EXPECTED ' + expected + ' GOT ' + got;
    }

    function NotAFunction (name) {
	this.name = name;
	this.message = name + ' IS NOT A FUNCTION';
    }

    function Unknown (name) {
	this.name = name;
	this.message = name + ': NAME UNKNOWN';
    }

    return {
	TypeMismatch: TypeMismatch,
	NotAFunction: NotAFunction,
	Unknown: Unknown
    };
});
