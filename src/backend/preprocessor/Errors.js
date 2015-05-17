define(function () {
    function TypeMismatch (expected, got, operation) {
	this.expected = expected;
	this.got = got;
	this.operation = operation;
	this.message = operation + ': TYPE MISMATCH. EXPECTED ' + expected + ' GOT ' + got;
    }

    return {
	TypeMismatch: TypeMismatch
    };
});
