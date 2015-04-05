define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function Compare(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var compareInstr = new Cfg({
	    type: 'COMPARE',
	});

	left.mergeLeft(right);
	left.mergeLeft(compareInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Compare;
    });
});
