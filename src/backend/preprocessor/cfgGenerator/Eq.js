define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Eq(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);

	var eqInstr = new Cfg({
	    type: 'EQ',
	});

	left.mergeLeft(right);
	left.mergeLeft(eqInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Eq;
    });
});
