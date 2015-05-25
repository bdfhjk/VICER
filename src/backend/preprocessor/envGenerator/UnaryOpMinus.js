define(['../envGeneratorHelper', './Generic'], function (envHelper, generic) {
    function UnaryOpMinus(ast, nameDict, prefix, globalContext, visit) {
	generic(ast, nameDict, prefix, globalContext, visit);

	ast.type = 'SUB';
	ast.left = {
	    type: 'INDENTIFIER',
	    tvalue: {
		'type': 'int'
	    },
	    value: envHelper.getOrSetConstantByValue(0, 'int', globalContext, prefix)
	};
	ast.right = ast.subexp;
	ast.subexp = null;
    }

    return UnaryOpMinus;
});
