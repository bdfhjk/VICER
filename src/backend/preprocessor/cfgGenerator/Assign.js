define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Assign(paramNode) {
	var variableName = paramNode.name;
	var value = cfgGenerator(paramNode.value);

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: variableName
	});
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
