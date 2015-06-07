define(['../envGeneratorHelper'], function (envHelper) {
    var sizeofType = {
	'pointer': 4,
	'int': 4,
	'char': 1
    };

    function Sizeof(ast, nameDict, prefix, globalContext, visit) {
	var properType = envHelper.createEnvEntry(ast.value);
	ast.type = 'INDENTIFIER';
	ast.value = envHelper.getOrSetConstantByValue(sizeofType[properType.type], 'int', globalContext, prefix);

	ast.tvalue = {
	    type: 'int'
	};
    }

    return Sizeof;
});
