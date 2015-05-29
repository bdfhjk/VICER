define(['lodash', '../envGeneratorHelper', '../nameHelper'], function (_, envHelper, nameHelper) {
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

    function Generic(ast, nameDict, prefix, globalContext, visit) {
	if (!ast) {
	    return;
	}
	
	_.each(ast.declarations, function (decl) {
	    var newName = nameHelper.getVariableName(prefix, decl.name);
	    nameDict[decl.name] = newName;

	    if (decl.type === 'declaration') {
		globalContext.env[newName] = envHelper.createEnvEntry(decl.tvalue);
	    } else {
		globalContext.env[newName] = {
		    type: 'array',
		    of: envHelper.createEnvEntry(decl.tvalue),
		    size: decl.size
		};
	    }
	});

	_.each(nonBlockEdges, function (edge) {
	    var compEdge = ast[edge];
	    if (!compEdge) {
		return;
	    }
	    if (Array.isArray(compEdge)) {
		_.each(compEdge, function (subexp) {
		    visit(subexp, nameDict, prefix, globalContext);
		});
	    } else {
		visit(compEdge, nameDict, prefix, globalContext);
	    }
	});

	var blocks = 0;
	_.each(blockEdges, function (edge) {
	    var compEdge = ast[edge];
	    if (!compEdge) {
		return;
	    }
	    _.each(compEdge, function (subexp) {
		var newPrefix = nameHelper.getBlockPrefix(prefix, ast.type, blocks++);
		visit(subexp, nameDict, newPrefix, globalContext);
	    });
	});
    }

    return Generic;
});
