define([
    '../Cfg'
], function (Cfg) {
    var _ = require('underscore');
    var cfgGenerator;
    
    function MinusAssign(paramNode, options) {
	var lvalue = cfgGenerator(paramNode.left, _.extend(_.clone(options), { wantLocation: true}));
	var value = cfgGenerator(paramNode.right, options);

	var fetchInstr = new Cfg({
	    type: 'FETCH'
	});
	var subInstr = new Cfg({
	    type: 'SUB'
	});
	var assignInstr = new Cfg({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(lvalue);
	result.mergeLeft(fetchInstr);
	result.mergeLeft(rvalue);
	result.mergeLeft(subInstr);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return MinusAssign;
    });
});
