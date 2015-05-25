define(['../envGeneratorHelper', './Generic'], function (envHelper, generic) {
    function Return(ast, nameDict, prefix, globalContext, visit) {
	generic(ast, nameDict, prefix, globalContext, visit);

	var decl = envHelper.getFunctionByName(globalContext.funcName, globalContext);
	ast.declaration = decl;
    }

    return Return;
});
