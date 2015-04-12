define([
    '../Cfg'
], function (Cfg) {
    var _ = require('underscore');
    var cfgGenerator;
    
    function Assign(paramNode, options) {
	var lvalue = cfgGenerator(paramNode.left, _.extend(_.clone(options), { wantLocation: true }));
	var rvalue = cfgGenerator(paramNode.right, options);

	var assignInstr = new Cfg({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(rvalue);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Assign;
    });
});
