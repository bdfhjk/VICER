define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Leq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var leqInstr = new Cfg ({
	    type: 'LEQ'
	});

	left.mergeLeft(right);
	left.mergeLeft(leqInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Leq;
    });
});
