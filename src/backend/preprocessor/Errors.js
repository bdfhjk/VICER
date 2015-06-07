define(function () {
    function TypeMismatch (expected, got, node) {
	this.expected = expected;
	this.got = got;
	this.location = node.loc;
	//this.stack = new Error().stack;
	this.message = 'TYPE MISMATCH. EXPECTED ' +
	    prettyPrint(expected) +
	    ' GOT ' +
	    prettyPrint(got);
    }

    function NotAFunction (name, node) {
	this.name = name;
	this.location = node.loc;
	this.message = name + ' IS NOT A FUNCTION';
    }

    function Unknown (name, node) {
	this.name = name;
	this.location = node.loc;
	this.message = name + ': NAME UNKNOWN';
    }

    function Overflow (type, node) {
	this.name = name;
	this.location = node.loc;
	this.message = type + ' OVERFLOW';
    }

    function WrongArgNum(expected, got, funName, node) {
	this.expected = expected;
	this.got = got;
	this.funName = funName;
	this.location = node.loc;
	this.message = 'WRONG ARGUMENT NUMBER. FUNCTION ' + funName + ' EXPECTED ' + expected + ' GOT ' + got;
    }

    function ExpectedLvalue(node) {
	this.location = node.loc;
	this.message = 'EXPECTED LVALUE';
    }

    function prettyPrint(obj) {
	return JSON.stringify(obj, null, 2);
    }

    return {
	TypeMismatch: TypeMismatch,
	NotAFunction: NotAFunction,
	Unknown: Unknown,
	Overflow: Overflow,
	WrongArgNum: WrongArgNum,
	ExpectedLvalue: ExpectedLvalue
    };
});
