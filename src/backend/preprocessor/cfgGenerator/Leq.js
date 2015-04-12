define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Leq(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);

	var leqInstr = new Cfg({
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
