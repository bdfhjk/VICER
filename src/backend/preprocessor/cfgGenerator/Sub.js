define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Sub(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);
	if (!(left || right)) {
	    throw new Error('Something occured during processing node ' + paramNode);
	}

	var subInstr = new Cfg ({
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
