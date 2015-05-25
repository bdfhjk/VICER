define(['../envGeneratorHelper'], function (envHelper) {
    function Literal(ast, nameDict, prefix, globalContext, visit) {
	ast.type = 'UNARYOP_&';
	ast.subexp = {
	    type: 'INDENTIFIER',
	    tvalue: {
		'type': 'pointer',
		'of': {
		    'type': 'char'
		}
	    },
	    value: envHelper.getOrSetConstantByValue(ast.value, 'literal', globalContext, prefix)
	};
	ast.value = null;
    }

    return Literal;
});
