define([
    '../Cfg',
], function (Cfg) {
    var cfgGenerator;
    
    function CompoundStatement(paramNode, options) {
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
