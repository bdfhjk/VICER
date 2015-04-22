define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Geq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var geqInstr = new Cfg ({
	    type: 'GEQ'
	});

	left.mergeLeft(right);
	left.mergeLeft(geqInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Geq;
    });
});
