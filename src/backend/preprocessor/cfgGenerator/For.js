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
	var body = compSubtrees.body;
	var initiation = compSubtrees.pre_statement;
	var condition = compSubtrees.condition;
	var action = compSubtrees.post_statement;

	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});
	var stepInstr = new Cfg ({
	    type: 'STEP',
	    param: paramNode.condition.loc
	});
	var branchInstr = new Cfg ({
	    type: 'BRANCH',
	    'true': body.graph.first,
	    'false': noopInstr.graph.first
	});

	condition.mergeRight(stepInstr);

	var result = initiation;
	result.mergeLeft(condition);
	result.mergeLeft(branchInstr);
	body.mergeLeft(action);
	result.mergeTwoLeft(body, noopInstr);

	result.graph[body.last].next = condition.first;

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
