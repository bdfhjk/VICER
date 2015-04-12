define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Sub(paramNode, options) {
	var left = cfgGenerator(paramNode.left, options);
	var right = cfgGenerator(paramNode.right, options);
	if(!(left || right))
	    throw new Error('Something occured during processing node ' + paramNode);

	var subInstr = new Cfg({
	    type: 'SUB'
	});

	left.mergeLeft(right);
	left.mergeLeft(subInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Sub;
    });
});
