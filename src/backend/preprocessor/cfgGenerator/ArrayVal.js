define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function ArrayVal(paramNode, options) {
	var index = cfgGenerator(paramNode.index);
	var name = paramNode.name;

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: name
	});
	var fetchInstr = new Cfg({
	    type: 'FETCH'
	});
	var paddInstr = new Cfg({
	    type: 'PADD'
	});
	var derefInstr = new Cfg({
	    type: 'DEREF'
	});

	var result = resolveInstr;
	result.mergeLeft(fetchInstr);
	result.mergeLeft(index);
	result.mergeLeft(paddInstr);
	result.mergeLeft(derefInstr);

	if(!options || !options.wantLocation) {
	    var fetchInstrBis = new Cfg({
		type: 'FETCH'
	    });

	    result.mergeLeft(fetchInstrBis);
	}

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return ArrayVal;
    });
});
