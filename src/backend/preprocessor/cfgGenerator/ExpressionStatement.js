define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function ExpressionStatement(paramNode) {
	if (!paramNode.expression) {
	    return new Cfg({
		type: 'NOOP'
	    });
	} else {
	    return cfgGenerator(paramNode.expression);
	}
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return ExpressionStatement;
    });
});
