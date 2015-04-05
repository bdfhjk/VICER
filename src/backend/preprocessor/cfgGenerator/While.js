define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function While(paramNode) {
	var body = cfgGenerator(paramNode.body);
	var condition = cfgGenerator(paramNode.condition);

	var noopInstr = new Cfg({
	    type: 'NOOP'
	});
	var branchInstr = new Cfg({
	    type: 'BRANCH',
	    'true': body.graph.first,
	    'false': noopInstr.graph.first
	});

	condition.mergeLeft(branchInstr);
	condition.mergeTwoLeft(body, noopInstr);

	condition.graph[body.last].next = condition.first;

	return condition;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return While;
    });
});
