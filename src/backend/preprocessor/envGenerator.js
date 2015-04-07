define(function () {
    var _ = require('underscore');
    
    var blocks, env, constants, constantsNum;

    var nonBlockEdges = [
	'value',
	'left',
	'right',
	'condition',
	'true',
	'false',
	'parameters',
	'body',
	'rexpression'
    ];

    var blockEdges = [
	'statements'
    ];
    
    function generateEnvironment(ast) {
	blocks = 0;
	env = {};
	constants = {};
	constantsNum = 0;
	var nameDict = {};
	var astParameters = ast.param_names;

	// add parameters to substitution, and add them to env
	for(var i = 0; i < astParameters.length; i++) {
	    nameDict[astParameters[i]] = ast.name + '_PARAMETER_' + astParameters[i];
	    env[nameDict[astParameters[i]]] = ast.prototype.param_tvalues[i].name;
	}

	// visit nodes
	ast.parameters = null;
	visitAst(ast, nameDict, ast.name);
	ast.parameters = astParameters;

	var result = {
	    env: env,
	    constants: constants
	};
	
	return result;
    }

    function visitAst(ast, nameDict, prefix) {
	console.log('VISITAST CALLED FOR TYPE ' + ast.type);
	nameDict = _.clone(nameDict); // possible stack overflow, if tree is deep

	// if an IMPLICIT_CAST, substitute variable if not global and die
	if(ast.type === 'IMPLICIT_CAST' && nameDict[ast.name]) {
	    console.log('IMPLICIT_CAST encountered, variable not global!');
	    console.log('ast.name = ' + ast.name);
	    console.log('nameDict[ast.name] = ' + nameDict[ast.name]);
	    ast.name = nameDict[ast.name];
	    return;
	}

	// substitute constants with implicit casts
	if(ast.type === 'CONSTANT') {
	    ast.type = 'IMPLICIT_CAST';
	    if(!constants[ast.value])
		constants[ast.value] = prefix + '_CONSTANT_' + constantsNum++;
	    ast.name = constants[ast.value];
	    ast.value = null;
	    return;
	}

	// if is compound_statement, visit declarations
	if(ast.declarations) {
	    for(var i = 0; i < ast.declarations.length; i++) {
		if(ast.declarations[i].type !== 'VARIABLE')
		    continue;
		var varName = ast.declarations[i].name;
		var newVarName = prefix + '_' + varName;
		nameDict[varName] = newVarName;

		var varEntry = {
		    type: ast.declarations[i].of.type
		};
		env[newVarName] = varEntry;
	    }
	}

	// visit non-block nodes - except blocks
	for(var nonB = 0; nonB < nonBlockEdges.length; nonB++) {
	    var nonBlockEdge = nonBlockEdges[nonB];
	    if(!ast[nonBlockEdge])
		continue;
	    if(Array.isArray(ast[nonBlockEdge])) {
		for(var l = 0; l < ast[nonBlockEdge].length; l++)
		    visitAst(ast[nonBlockEdge][l], nameDict, prefix);
	    } else
		visitAst(ast[nonBlockEdge], nameDict, prefix);
	}

	// visit block nodes
	blocks = 0;
	for(var b = 0; b < blockEdges.length; b++) {
	    var blockEdge = blockEdges[b];
	    if(!ast[blockEdge])
		continue;
	    console.log('ENTERING BLOCK_EDGE ' + blockEdge);
	    for(var k = 0; k < ast[blockEdge].length; k++) {
		var newPrefix = prefix + '_' + ast.type + blocks++;
		visitAst(ast[blockEdge][k], nameDict, newPrefix);
	    }
	}
    }

    return generateEnvironment;
});

