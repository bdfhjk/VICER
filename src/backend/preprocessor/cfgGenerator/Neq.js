define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Neq(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);

	var notInstr = new Cfg ({
	    type: 'NOT'
	});
	var eqInstr = new Cfg ({
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
