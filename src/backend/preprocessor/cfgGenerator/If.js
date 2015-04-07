define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function If(paramNode) {
	var noopInstr = new Cfg({
	    type: 'NOOP'
	});

	var tt = cfgGenerator(paramNode.true[0]);
	for(var i = 1; i < paramNode.true.length; i++)
	    tt.mergeLeft(cfgGenerator(paramNode.true[i]));
	
	var ff = noopInstr;
	if(paramNode.false) {
	    ff = cfgGenerator(paramNode.false[0]);
	    for(var j = 1; j < paramNode.false.length; j++)
		ff.mergeLeft(cfgGenerator(paramNode.false[j]));
	}

	var condition = cfgGenerator(paramNode.condition);

	var branchInstr = new Cfg({
	    type: 'BRANCH',
	    'true': tt.graph.first,
	    'false': ff.graph.first
	});

	condition.mergeLeft(branchInstr);
	condition.mergeTwoLeft(tt, ff);

	return condition;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return If;
    });
});
