define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    function Identifier(paramNode) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: variableName
	});

	var result = resolveInstr;
	result.type = CfgHelper.getNodeVal(paramNode);
	if (result.type === 'pointer') {
	    result.type = 'locPtr';
	} else if (result.type === 'value') {
	    result.type = 'locVal';
	} else {
	    var refInstr = new Cfg ({
		type: 'REF'
	    });
	    result.mergeLeft(refInstr);
	    result.type = 'pointer';
	}
	result.tvalue = paramNode.tvalue;

	return result;
    }

    return (function () {
	return Identifier;
    });
});
