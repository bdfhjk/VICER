define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function For (paramNode, options) {
	var firstParam = paramNode.body[0];
	var body = cfgGenerator(firstParam, options);
	for (var i = 1; i < paramNode.body.length; i++) {
	    body.mergeLeft(cfgGenerator(paramNode.body[i], options));
	}
	var initiation = cfgGenerator(paramNode.preStatement, options);
	var condition = cfgGenerator(paramNode.condition, options);
	var action = cfgGenerator(paramNode.postStatement, options);

	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});
	var branchInstr = new Cfg ({
	    type: 'BRANCH',
	    'true': body.graph.first,
	    'false': noopInstr.graph.first
	});

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

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return For;
    });
});
