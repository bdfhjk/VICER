define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function ExpressionStatement(paramNode) {
	var expression = cfgGenerator(paramNode.expression);

	expression.type = null;

	return expression;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return ExpressionStatement;
    });
});
