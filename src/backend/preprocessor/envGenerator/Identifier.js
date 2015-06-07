define(['../Errors', '../envGeneratorHelper'], function (Errors, envHelper) {
    function Identifier(ast, nameDict, prefix, globalContext, visit) {
	var origName = ast.value;
	var variable = envHelper.getVariableByName(origName, nameDict, globalContext);
	if (!variable) {
	    throw new Errors.Unknown(origName, ast);
	}
	ast.value = variable.name;
	ast.tvalue = variable.type;
    }

    return Identifier;
});
	
