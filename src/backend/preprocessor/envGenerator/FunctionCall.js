define(['../Errors', '../envGeneratorHelper', './Generic'], function (Errors, envHelper, generic) {
    function FunctionCall(ast, nameDict, prefix, globalContext, visit) {
	var decl = envHelper.getFunctionByName(ast.name, globalContext);
	if (!decl) {
	    if (envHelper.getEntityByName(ast.name, nameDict, globalContext)) {
		throw new Errors.NotAFunction(ast.name, ast);
	    } else {
		throw new Errors.Unknown(ast.name, ast);
	    }
	}

	generic(ast, nameDict, prefix, globalContext, visit);

	ast.declaration = decl;
    }

    return FunctionCall;
});
