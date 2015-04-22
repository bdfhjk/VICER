define([
    '../Cfg'
], function (Cfg) {
    function Identifier(paramNode) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: variableName
	});

	return resolveInstr;
    }

    return (function () {
	return Identifier;
    });
});
