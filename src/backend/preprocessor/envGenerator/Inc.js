define(['../envGeneratorHelper', './Generic'], function (envHelper, generic) {
    function Inc(ast, nameDict, prefix, globalContext, visit) {
	generic(ast, nameDict, prefix, globalContext, visit);
	
	ast.type = 'ASSIGN';
	ast.left = ast.subexp;
	ast.right = {
	    type: 'ADD',
	    left: ast.subexp,
	    right: {
		type: 'INDENTIFIER',
		tvalue: {
		    'type': 'int'
		},
		value: envHelper.getOrSetConstantByValue(1, 'int', globalContext, prefix)
	    }
	};
	ast.subexp = null;
    }

    return Inc;
});
