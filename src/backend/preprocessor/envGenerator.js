define(['lodash'], function (_) {
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
	'true_body',
	'false_body',
	'body',
	'rexpression',
	'expression'
    ];

    var blockEdges = [
	'statements',
	'parameters',
    ];
    
    function generateEnvironment(ast, globals) {
	blocks = 0;
	env = {};
	constants = {};
	constantsNum = 0;
	var nameDict = {};
	var astParameters = ast.declaration.param_names;

	// add parameters to substitution, and add them to env
	for (var i = 0; i < astParameters.length; i++) {
	    nameDict[astParameters[i]] = ast.declaration.name + '_PARAMETER_' + astParameters[i];
	    env[nameDict[astParameters[i]]] = createEnvEntry(ast.declaration.param_tvalues[i]);
	}

	// add globals to env
	for (var varName in globals) {
	    nameDict[varName] = varName;
	    env[varName] = globals[varName];
	}

	// visit nodes
	ast.declaration.parameters = null;
	visitAst(ast, nameDict, ast.declaration.name);
	ast.declaration.parameters = astParameters;

	// delete globals from env
	for (var globName in globals) {
	    delete env[globName];
	}

	var result = {
	    env: env,
	    constants: constants
	};
	
	return result;
    }

    function visitAst(ast, nameDict, prefix) {
	nameDict = _.clone(nameDict); // possible stack overflow, if tree is deep

	// if an IDENTIFIER, substitute variable if not a constant
	if (ast.type === 'INDENTIFIER' && nameDict[ast.value]) {
	    ast.value = nameDict[ast.value];
	    ast.tvalue = env[ast.value];
	    return;
	}

	// substitute constants with implicit casts
	if (ast.type === 'CONSTANT' || ast.type === 'STRING_LITERAL') {
	    ast.tvalue = createEnvEntry(ENV_TEMPLATES[ast.type]);
	    ast.type = 'INDENTIFIER';
	    if (!constants[ast.value]) {
		constants[ast.value] = prefix + '_CONSTANT_' + constantsNum++;
	    }
	    ast.value = constants[ast.value];
	    return;
	}

	// process POST_INC and PRE_INC
	if (ast.type === 'POST_INC' || ast.type === 'PRE_INC') {
	    if (!constants[1]) {
		constants[1] = prefix + '_CONSTANT_' + constantsNum++;
	    }
	    ast.type = 'ASSIGN';
	    ast.left = {
		type: 'INDENTIFIER',
		value: ast.subexp.value // must be an identifier
	    };
	    ast.right = {
		type: 'ADD',
		left: ast.subexp,
		right: {
		    type: 'INDENTIFIER',
		    value: constants[1]
		}
	    };
	    ast.subexp = null;
	}

	// process UNARY_OP_-
	if (ast.type === 'UNARYOP_-') {
	    if (!constants[0]) {
		constants[0] = prefix + '_CONSTANT_' + constantsNum++;
	    }
	    ast.type = 'SUB';
	    ast.left = {
		type: 'INDENTIFIER',
		value: constants[0]
	    };
	    ast.right = ast.subexp;
	    ast.subexp = null;
	}

	// if is compound_statement, visit declarations
	if (ast.declarations) {
	    for (var i = 0; i < ast.declarations.length; i++) {
		if (ast.declarations[i].type !== 'declaration') {
		    continue;
		}
		var varName = ast.declarations[i].name;
		var newVarName = prefix + '_' + varName;
		nameDict[varName] = newVarName;

		var tvalue = ast.declarations[i].tvalue;
		env[newVarName] = createEnvEntry(tvalue);
	    }
	}

	// visit non-block nodes - except blocks
	for (var nonB = 0; nonB < nonBlockEdges.length; nonB++) {
	    var nonBlockEdge = nonBlockEdges[nonB];
	    if (!ast[nonBlockEdge]) {
		continue;
	    }
	    if (Array.isArray(ast[nonBlockEdge])) {
		for (var l = 0; l < ast[nonBlockEdge].length; l++)
		    visitAst(ast[nonBlockEdge][l], nameDict, prefix);
	    } else
		visitAst(ast[nonBlockEdge], nameDict, prefix);
	}

	// visit block nodes
	blocks = 0;
	for (var b = 0; b < blockEdges.length; b++) {
	    var blockEdge = blockEdges[b];
	    if (!ast[blockEdge]) {
		continue;
	    }
	    for (var k = 0; k < ast[blockEdge].length; k++) {
		var newPrefix = prefix + '_' + ast.type + blocks++;
		visitAst(ast[blockEdge][k], nameDict, newPrefix);
	    }
	}
    }

    function createEnvEntry(tvalue) {
	if (tvalue.type === 'concrete_type') {
	    return {
		type: tvalue.name
	    };
	} else if (tvalue.type === 'pointer') {
	    return {
		type: 'pointer',
		of: {
		    type: tvalue.tvalue.name
		}
	    };
	} else {
	    throw new Error('Wrong declaration type: ' + tvalue.type);
	}
    }
	

    var ENV_TEMPLATES = {
	CONSTANT: {
	    type: 'concrete_type',
	    name: 'INT'
	},
	STRING_LITERAL: {
	    type: 'pointer',
	    tvalue: {
		type: 'concrete_type',
		value: 'CHAR'
	    }
	}
    };

    return generateEnvironment;
});

