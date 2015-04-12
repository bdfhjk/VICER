define(function () {
    var _ = require('underscore');
    
    var blocks, env, constants, constantsNum;

    var nonBlockEdges = [
	'value',
	'left',
	'right',
	'condition',
	'pre_statement',
	'post_statement',
	'subexp',
	'index',
	'true',
	'false',
	'body',
	'rexpression'
    ];

    var blockEdges = [
	'statements',
	'parameters',
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
	nameDict = _.clone(nameDict); // possible stack overflow, if tree is deep

	// if an IDENTIFIER, substitute variable if not global and die
	if(ast.type === 'IDENTIFIER' && nameDict[ast.value]) {
	    ast.value = nameDict[ast.value];
	    if(env[ast.value].isPointer)
		ast.isPointer = true;
	}

	// substitute constants with implicit casts
	if(ast.type === 'CONSTANT') {
	    ast.type = 'IDENTIFIER';
	    if(!constants[ast.value])
		constants[ast.value] = prefix + '_CONSTANT_' + constantsNum++;
	    ast.value = constants[ast.value];
	    return;
	}

	// if is compound_statement, visit declarations
	if(ast.declarations) {
	    for(var i = 0; i < ast.declarations.length; i++) {
		if(ast.declarations[i].type !== 'declaration')
		    continue;
		var varName = ast.declarations[i].name;
		var newVarName = prefix + '_' + varName;
		nameDict[varName] = newVarName;

		var tvalue = ast.declarations[i].tvalue;
		var varEntry;
		if(tvalue.type === 'concrete_type') {
		    varEntry = {
			type: tvalue.name
		    };
		} else if(tvalue.type === 'pointer') {
		    varEntry = {
			type: 'pointer',
			of: tvalue.tvalue.name // make it recursive
		    };
		}
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
	    for(var k = 0; k < ast[blockEdge].length; k++) {
		var newPrefix = prefix + '_' + ast.type + blocks++;
		visitAst(ast[blockEdge][k], nameDict, newPrefix);
	    }
	}
    }

    return generateEnvironment;
});

