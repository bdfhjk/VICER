define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Geq(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);

	var geqInstr = new Cfg({
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
