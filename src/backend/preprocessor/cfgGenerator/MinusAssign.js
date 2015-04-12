define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function MinusAssign(paramNode) {
	var variableName = paramNode.name;
	var value = cfgGenerator(paramNode.value);

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: variableName
	});
	var resolveInstrBis = new Cfg({
	    type: 'RESOLVE',
	    param: variableName
	});
	var fetchInstr = new Cfg({
	    type: 'FETCH'
	});
	var subInstr = new Cfg({
	    type: 'SUB'
	});
	var assignInstr = new Cfg({
	    type: 'ASSIGN'
	});

	var result = resolveInstr;
	result.mergeLeft(resolveInstrBis);
	result.mergeLeft(value);
	result.mergeLeft(subInstr);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return MinusAssign;
    });
});
