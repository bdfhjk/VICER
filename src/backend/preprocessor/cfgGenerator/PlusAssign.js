define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function PlusAssign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left, { wantLocation: true });
	var rvalue = cfgGenerator(paramNode.right);

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
