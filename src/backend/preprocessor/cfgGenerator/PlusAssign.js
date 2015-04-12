define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function PlusAssign(paramNode) {
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
	var addInstr = new Cfg({
	    type: 'ADD'
	});
	var assignInstr = new Cfg({
	    type: 'ASSIGN'
	});

	var result = resolveInstr;
	result.mergeLeft(resolveInstrBis);
	result.mergeLeft(value);
	result.mergeLeft(addInstr);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return PlusAssign;
    });
});
