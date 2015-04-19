define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function While(paramNode, options) {
	var body = cfgGenerator(paramNode.body, options);
	var condition = cfgGenerator(paramNode.condition, options);

	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});
	var branchInstr = new Cfg ({
	    type: 'BRANCH',
	    'true': body.graph.first,
	    'false': noopInstr.graph.first
	});

	var result = condition;
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

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return While;
    });
});
