define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function If(paramNode) {
	var noopInstr = new Cfg({
	    type: 'NOOP'
	});

	console.log(paramNode);
	console.log(paramNode.true);
	console.log(paramNode.false);

	var tt = cfgGenerator(paramNode.true);
	console.log("TT");
	console.log(tt);
	var ff = paramNode.false ? cfgGenerator(paramNode.false) : noopInstr;
	
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
