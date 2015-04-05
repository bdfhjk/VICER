define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Eq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

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
