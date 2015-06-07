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

    function Malloc(paramNode) {
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var size = compSubtrees.subexp;
	var tvalue = {
	    type: 'pointer',
	    of: paramNode.tvalue
	};

	var mallocInstr = new Cfg ({
	    type: 'MALLOC',
	    tvalue: tvalue
	});

	var result = size;
	result.mergeLeft(mallocInstr);

	result.lvalue = false;
	result.tvalue = tvalue;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Malloc;
    });
});
