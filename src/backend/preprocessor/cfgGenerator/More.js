define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function More(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);

	var notInstr = new Cfg({
	    type: 'NOT'
	});
	var leqInstr = new Cfg({
	    type: 'LEQ'
	});

	left.mergeLeft(right);
	left.mergeLeft(leqInstr);
	left.mergeLeft(notInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return More;
    });
});
