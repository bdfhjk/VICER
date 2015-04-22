define([
    '../Cfg'
], function (Cfg) {
    function Identifier(paramNode) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: variableName
	});

	resolveInstr.type = 'location';

	return resolveInstr;
    }

    return (function () {
	return Identifier;
    });
});
