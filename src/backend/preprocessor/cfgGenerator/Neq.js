define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Neq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var notInstr = new Cfg({
	    type: 'NOT'
	});
	var eqInstr = new Cfg({
	    type: 'EQ'
	});

	left.mergeLeft(right);
	left.mergeLeft(eqInstr);
	left.mergeLeft(notInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Neq;
    });
});
