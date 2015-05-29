define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;
    
    var decl = {
	subexp: {
	    lvalue: false,
	    type: { type: 'int' }
	}
    };

    function Not(paramNode) {
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var value = compSubtrees.subexp;

	var notInstr = new Cfg ({
	    type: 'NOT'
	});

	var result = value;
	result.mergeLeft(notInstr);

	result.lvalue = false;
	result.tvalue = { type: 'int' };

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Not;
    });
});
