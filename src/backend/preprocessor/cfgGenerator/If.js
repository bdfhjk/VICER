define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function If (paramNode) {
	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});

	var tt = cfgGenerator(paramNode.true_body);
	var ff = paramNode.false_body ? cfgGenerator(paramNode.false_body) : noopInstr;
	
	var condition = cfgGenerator(paramNode.condition);
	var stepInstr = new Cfg({
	    type: 'STEP',
	    param: paramNode.condition.loc
	});
	CfgHelper.toValOrPtr(condition);
	condition.mergeRight(stepInstr);

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

	result.type = null;
	result.tvalue = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return If;
    });
});
