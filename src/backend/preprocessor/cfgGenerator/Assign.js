define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Assign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left, { wantLocation: true });
	var rvalue = cfgGenerator(paramNode.right);

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
