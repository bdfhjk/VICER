define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function If(paramNode) {
	var noopInstr = new Cfg({
	    type: 'NOOP'
	});

	var tt = cfgGenerator(paramNode.true);
	var ff = paramNode.false ? cfgGenerator(paramNode.false) : noopInstr;
	
	var condition = cfgGenerator(paramNode.condition);

	var branchInstr = new Cfg({
	    type: 'BRANCH',
	    'true': tt.graph.first,
	    'false': ff.graph.first
	});

	var result = condition;
	result.mergeLeft(branchInstr);
	result.mergeTwoLeft(tt, ff);

	for(var node in result.graph) {
	    if(result.graph[node].type == 'BREAK') {
		result.graph[node].type = 'NOOP';
		result.graph[node].next = result.last;
	    }
	}

	return condition;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return If;
    });
});
