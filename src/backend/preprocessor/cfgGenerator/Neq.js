define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	left: {
	    lvalue: false,
	    type: [
		{ type: 'int' },
		{ type: 'char' },
		{ type: 'pointer' }
	    ]
	},
	right: {
	    lvalue: false,
	    type: [
		{ type: 'int' },
		{ type: 'char' },
		{ type: 'pointer' }
	    ]
	}
    };

    function Neq(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var left = compSubtrees.left;
	var right = compSubtrees.right;

	var notInstr = new Cfg ({
	    type: 'NOT'
	});
	var eqInstr = new Cfg ({
	    type: 'EQ'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(eqInstr);
	result.mergeLeft(notInstr);

	result.tvalue = { type: 'int' };
	result.lvalue = false;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Neq;
    });
});
