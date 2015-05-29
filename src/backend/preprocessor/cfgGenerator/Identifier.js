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

	if (paramNode.tvalue.type === 'array') {
	    var refInstr = new Cfg ({
		type: 'REF'
	    });
	    result.mergeLeft(refInstr);
	    result.lvalue = false;
	} else {
	    result.lvalue = true;
	}

	result.tvalue = paramNode.tvalue;

	return result;
    }

    return (function () {
	return Identifier;
    });
});
