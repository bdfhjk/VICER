define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	true_body: true,
	condition: {
	    lvalue: false,
	    type: { type: 'int' }
	}
    };
    
    function If (paramNode) {
	if (paramNode.false_body) {
	    decl.false_body = true;
	}
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var noopInstr = new Cfg ({
	    type: 'NOOP'
	});

	var tt = compSubtrees.true_body;
	var ff = paramNode.false_body ? compSubtrees.false_body : noopInstr;
	
	var condition = compSubtrees.condition;
	var stepInstr = new Cfg({
	    type: 'STEP',
	    param: paramNode.condition.loc
	});

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

	result.tvalue = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return If;
    });
});
