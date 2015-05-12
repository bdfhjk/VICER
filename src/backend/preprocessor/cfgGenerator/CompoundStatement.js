define([
    '../Cfg',
], function (Cfg) {
    var cfgGenerator;
    
    function CompoundStatement(paramNode) {
	if (paramNode.statements.length === 0) {
	    var noopInstr = new Cfg({
		type: 'NOOP'
	    });

	    return noopInstr;
	}
	    
	var firstStep = new Cfg({
	    type: 'STEP',
	    param: paramNode.statements[0].loc
	});
	var firstStatement = paramNode.statements[0];
	var result = firstStep;
	result.mergeLeft(cfgGenerator(firstStatement));
	for (var i = 1; i < paramNode.statements.length; i++) {
	    var nextStep = new Cfg({
		type: 'STEP',
		param: paramNode.statements[i].loc
	    });
	    result.mergeLeft(nextStep);
	    result.mergeLeft(cfgGenerator(paramNode.statements[i]));
	}

	result.type = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return CompoundStatement;
    });
});
