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
	result.type = (CfgHelper.getNodeVal(paramNode) === 'value') ? 'locVal' : 'locPtr';
	result.tvalue = paramNode.tvalue;

	return result;
    }

    return (function () {
	return Identifier;
    });
});
