define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function While(paramNode) {
	var body = cfgGenerator(paramNode.body);
	var condition = cfgGenerator(paramNode.condition);
	CfgHelper.toValOrPtr(condition);

	if (condition.type !== 'value' || condition.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		condition.tvalue.type,
		'int',
		'WHILE');
	}

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

	result.type = null;
	result.tvalue = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return While;
    });
});
