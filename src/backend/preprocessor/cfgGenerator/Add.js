define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Add(paramNode, options) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);
	if(!(left || right))
	    throw new Error('Something occured during processing node ' + paramNode);

	var addInstr = new Cfg({
	    type: 'ADD'
	});

	left.mergeLeft(right);
	left.mergeLeft(addInstr);

	if(options && options.wantLocation) {
	    var derefInstr = new Cfg({
		type: 'DEREF'
	    });

	    left.mergeLeft(derefInstr);
	}

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Add;
    });
});
