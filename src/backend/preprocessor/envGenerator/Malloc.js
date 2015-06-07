define(['../envGeneratorHelper', './Generic'], function (envHelper, generic) {
    function Malloc(ast, nameDict, prefix, globalContext, visit) {
	ast.tvalue = envHelper.createEnvEntry(ast.tvalue);

	generic(ast, nameDict, prefix, globalContext, visit);
    }

    return Malloc;
});
	
