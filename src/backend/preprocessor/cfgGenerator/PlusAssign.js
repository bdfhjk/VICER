define([
    '../Cfg'
], function (Cfg) {
    var _ = require('underscore');
    var cfgGenerator;
    
    function PlusAssign(paramNode, options) {
	var lvalue = cfgGenerator(paramNode.left, _.extend(_.clone(options), { wantLocation: true }));
	var rvalue = cfgGenerator(paramNode.right, options);

	var fetchInstr = new Cfg({
	    type: 'FETCH'
	});
	var addInstr = new Cfg({
	    type: 'ADD'
	});
	var assignInstr = new Cfg({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(lvalue);
	result.mergeLeft(fetchInstr);
	result.mergeLeft(rvalue);
	result.mergeLeft(addInstr);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return PlusAssign;
    });
});
