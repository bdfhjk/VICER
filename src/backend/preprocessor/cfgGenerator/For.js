define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	body: true,
	pre_statement: true,
	condition: {
	    lvalue: false,
	    type: { type: 'int' }
	},
	post_statement: true
    };
    
    function For (paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var body = cfgHelper.noopIfEmpty(compSubtrees.body);
	var initiation = cfgHelper.noopIfEmpty(compSubtrees.pre_statement);
	var condition = compSubtrees.condition;
	var action = cfgHelper.noopIfEmpty(compSubtrees.post_statement);

	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});
	var stepInstr = new Cfg ({
	    type: 'STEP'
	});

	var result;
	
	if (!condition) { // infinite loop
	    result = initiation;

	    stepInstr.param = paramNode.loc;
	    result.mergeLeft(stepInstr);

	    result.mergeLeft(body);
	    result.mergeLeft(action);
	    result.mergeLeft(noopInstr);

	    result.graph[action.last].next = stepInstr.first;
	} else {
	    var branchInstr = new Cfg ({
		type: 'BRANCH',
		'true': body.graph.first,
		'false': noopInstr.graph.first
	    });

	    stepInstr.param = paramNode.condition.loc;
	    condition.mergeRight(stepInstr);

	    result = initiation;
	    result.mergeLeft(condition);
	    result.mergeLeft(branchInstr);
	    body.mergeLeft(action);
	    result.mergeTwoLeft(body, noopInstr);

	    result.graph[body.last].next = condition.first;
	}

	for (var node in result.graph) {
	    if (result.graph[node].type == 'BREAK') {
		result.graph[node].type = 'NOOP';
		result.graph[node].next = result.last;
	    } else if (result.graph[node].type == 'CONTINUE') {
		result.graph[node].type = 'NOOP';
		result.graph[node].next = action.first;
	    }
	}

	result.tvalue = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return For;
    });
});
