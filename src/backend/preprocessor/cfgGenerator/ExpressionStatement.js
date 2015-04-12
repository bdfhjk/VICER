define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function ExpressionStatement(paramNode, options) {
	var expression = cfgGenerator(paramNode.expression, options);

	return expression;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return ExpressionStatement;
    });
});
