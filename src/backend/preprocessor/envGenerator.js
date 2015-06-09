define(['lodash', './nameHelper', './envGeneratorHelper', './envGenerator/envVisitor'], function (_, nameHelper, envHelper, envVisitor) {
    function generateEnvironment(ast, constants, globals, decls, stdlibConstantsValues) {
	// declare some helper variables to make the code more readable
	var funcName = ast.declaration.name;

	// declare start values of computed objects
	var globalContext = envHelper.generateGlobalContext({}, constants, globals, decls, funcName, stdlibConstantsValues);
	var nameDict = {};

	// associate param types with their respective names
	var astParameters = _.zip(ast.declaration.param_names, ast.declaration.param_tvalues);

	// add parameters to substitution, and add them to env
	_.each(astParameters, function (parameter) {
	    var name = parameter[0];
	    var type = parameter[1];

	    nameDict[name] = nameHelper.getParameterName(funcName, name);
	    globalContext.env[nameDict[name]] = envHelper.createEnvEntry(type);
	});

	// visit nodes
	envVisitor(ast, nameDict, funcName, globalContext);

	var result = {
	    env: globalContext.env,
	    constants: globalContext.constants
	};
	
	return result;
    }

    return generateEnvironment;
});

