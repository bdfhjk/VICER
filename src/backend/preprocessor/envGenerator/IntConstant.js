define(['../Errors', '../envGeneratorHelper'], function (Errors, envHelper) {
    var MAX_INT = (2 << 32) - 1;
    var MIN_INT = -MAX_INT;

    function IntConstant(ast, nameDict, prefix, globalContext, visit) {
	if (ast.value > MAX_INT || ast.value < MIN_INT) {
	    throw new Errors.Overflow('int', ast);
	}
	ast.type = 'INDENTIFIER';
	ast.value = envHelper.getOrSetConstantByValue(ast.value, 'int', globalContext, prefix);
	ast.tvalue = {
	    'type': 'int'
	};
    }

    return IntConstant;
});
