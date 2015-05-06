define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Less(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);

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
