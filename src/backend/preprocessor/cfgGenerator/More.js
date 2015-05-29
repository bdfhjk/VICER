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

    function More(paramNode) {
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var left = compSubtrees.left;
	var right = compSubtrees.right;

	var notInstr = new Cfg ({
	    type: 'NOT'
	});
	var leqInstr = new Cfg ({
	    type: 'LEQ'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(leqInstr);
	result.mergeLeft(notInstr);

	result.lvalue = false;
	result.tvalue = { type: 'int' };

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return More;
    });
});
