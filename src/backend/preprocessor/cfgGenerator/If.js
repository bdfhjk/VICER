define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function If (paramNode, options) {
	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});

	var tt = cfgGenerator(paramNode.true_body, options);
	var ff = paramNode.false_body ? cfgGenerator(paramNode.false_body, options) : noopInstr;
	
	var condition = cfgGenerator(paramNode.condition);

	var branchInstr = new Cfg ({
	    type: 'BRANCH',
	    'true': tt.graph.first,
	    'false': ff.graph.first
	});

	var result = condition;
	result.mergeLeft(branchInstr);
	result.mergeTwoLeft(tt, ff);

	for (var node in result.graph) {
	    if (result.graph[node].type == 'BREAK') {
		result.graph[node].type = 'NOOP';
		result.graph[node].next = result.last;
	    }
	}

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return If;
    });
});
