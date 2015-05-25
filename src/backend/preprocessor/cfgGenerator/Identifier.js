define([
    '../Cfg',
], function (Cfg) {
    function Identifier(paramNode) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: variableName
	});

	var result = resolveInstr;

	result.lvalue = true;
	result.tvalue = paramNode.tvalue;

	return result;
    }

    return (function () {
	return Identifier;
    });
});
