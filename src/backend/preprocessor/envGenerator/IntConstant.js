define(['../Errors', '../envGeneratorHelper'], function (Errors, envHelper) {
    function IntConstant(ast, nameDict, prefix, globalContext, visit) {
	var INT_MIN = globalContext.stdlibConstantsValues.INT_MIN;
	var INT_MAX = globalContext.stdlibConstantsValues.INT_MAX;
	if (ast.value > INT_MAX || ast.value < INT_MIN) {
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
