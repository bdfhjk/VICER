define([
    '../Cfg',
], function (Cfg) {
    var cfgGenerator;
    
    function CompoundStatement(paramNode, options) {
	if (paramNode.statements.length === 0) {
	    var noopInstr = new Cfg({
		type: 'NOOP'
	    });

	    return noopInstr;
	}
	    
	var firstStatement = paramNode.statements[0];
	var result = cfgGenerator(firstStatement, options);
	for (var i = 1; i < paramNode.statements.length; i++) {
	    result.mergeLeft(cfgGenerator(paramNode.statements[i], options));
	}

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return CompoundStatement;
    });
});
