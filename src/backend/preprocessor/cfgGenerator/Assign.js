define([
    '../Cfg'
], function (Cfg) {
    var _ = require('underscore');
    var cfgGenerator;
    
    function Assign(paramNode, options) {
	var lvalue = cfgGenerator(paramNode.left, _.extend(options, { wantLocation: true }));
	var rvalue = cfgGenerator(paramNode.right, options);

	var assignInstr = new Cfg({
	    type: 'ASSIGN'
	});

	var result = resolveInstr;
	result.mergeLeft(value);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Assign;
    });
});
