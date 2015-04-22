define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Less(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var lessInstr = new Cfg ({
	    type: 'LESS'
	});

	left.mergeLeft(right);
	left.mergeLeft(lessInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Less;
    });
});
