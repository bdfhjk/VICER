define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;
    
    var decl = {
	left: {
	    lvalue: false,
	    type: { type: 'int' }
	},
	right: {
	    lvalue: false,
	    type: { type: 'int' }
	}
    };

    function BitwiseAnd (paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var left = compSubtrees.left;
	var right = compSubtrees.right;

	var andInstr = new Cfg ({
	    type: 'BITWISEAND',
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(andInstr);

	result.lvalue = false;
	result.tvalue = { type: 'int' };

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return BitwiseAnd;
    });
});
