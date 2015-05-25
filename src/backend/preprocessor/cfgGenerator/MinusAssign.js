define([
    'lodash',
    '../Cfg',
    '../cfgHelper'
], function (_, Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	left: {
	    lvalue: true,
	    type: { type: 'int' }
	},
	right: {
	    lvalue: false,
	    type: { type: 'int' }
	}
    };
    
    function MinusAssign(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var lvalue = compSubtrees.left;
	var rvalue = compSubtrees.right;

	var lrvalue = lvalue.copy();
	var fetchInstr = new Cfg ({
	    type: 'FETCH'
	});
	lrvalue.mergeLeft(fetchInstr);

	var subInstr = new Cfg ({
	    type: 'SUB'
	});
	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(lrvalue);
	result.mergeLeft(rvalue);
	result.mergeLeft(subInstr);
	result.mergeLeft(assignInstr);

	result.lvalue = false;
	result.tvalue = { type: 'int' };

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return MinusAssign;
    });
});
