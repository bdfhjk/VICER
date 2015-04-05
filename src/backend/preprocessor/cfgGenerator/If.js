define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function If(paramNode) {
	var tt = cfgGenerator(paramNode.true);
	var ff = cfgGenerator(paramNode.false);
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
