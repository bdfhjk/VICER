define(['../envGeneratorHelper'], function (envHelper) {
    function IntConstant(ast, nameDict, prefix, globalContext, visit) {
	ast.type = 'INDENTIFIER';
	ast.value = envHelper.getOrSetConstantByValue(ast.value, 'int', globalContext, prefix);
	ast.tvalue = {
	    'type': 'int'
	};
    }

    return IntConstant;
});
