define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	left: {
	    lvalue: false,
	    type: { type: 'pointer' }
	},
	right: {
	    lvalue: false,
	    type: { type: 'int' }
	}
    };

    function Subscript(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var left = compSubtrees.left;
	var right = compSubtrees.right;

	var paddInstr = new Cfg ({
	    type: 'PADD'
	});
	var derefInstr = new Cfg({
	    type: 'DEREF'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(paddInstr);
	result.mergeLeft(derefInstr);

	result.lvalue = true;
	result.tvalue = left.lvalue.of;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Subscript;
    });
});
