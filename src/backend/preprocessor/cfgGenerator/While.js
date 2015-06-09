define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	condition: {
	    lvalue: false,
	    type: { type: 'int' }
	},
	body: true
    };
    
    function While(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var body = cfgHelper.noopIfEmpty(compSubtrees.body);
	var condition = compSubtrees.condition;

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

	var result = stepInstr;
	result.mergeLeft(condition);
	result.mergeLeft(branchInstr);
	result.mergeTwoLeft(body, noopInstr);

	result.graph[body.last].next = result.first;

	for (var node in result.graph) {
	    if (result.graph[node].type == 'BREAK') {
		result.graph[node].type = 'NOOP';
		result.graph[node].next = result.last;
	    } else if (result.graph[node].type == 'CONTINUE') {
		result.graph[node].type = 'NOOP';
		result.graph[node].next = result.first;
	    }
	}

	result.tvalue = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return While;
    });
});
