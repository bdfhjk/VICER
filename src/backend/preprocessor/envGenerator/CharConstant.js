define(['../envGeneratorHelper'], function (envHelper) {
    function CharConstant(ast, nameDict, prefix, globalContext, visit) {
	ast.type = 'INDENTIFIER';
	ast.value = envHelper.getOrSetConstantByValue(ast.value, 'char', globalContext, prefix);
	ast.tvalue = {
	    'type': 'char'
	};
    }

    return CharConstant;
});
