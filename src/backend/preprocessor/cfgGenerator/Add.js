define([
    'lodash',
    '../Errors',
    '../Cfg',
    '../cfgHelper'
], function (_, Errors, Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	left: {
	    lvalue: false,
	    type: [
		{ type: 'int' },
		{ type: 'pointer' }
	    ]
	},
	right: {
	    lvalue: false,
	    type: [
		{ type: 'int' },
		{ type: 'pointer' }
	    ]
	}
    };
    
    function Add(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var left = compSubtrees.left;
	var right = compSubtrees.right;

	if (cfgHelper.matchTypes(left.tvalue, { type: 'pointer' }) &&
	    cfgHelper.matchTypes(right.tvalue, { type: 'pointer' })) {
	    throw new Errors.TypeMismatch(
		'pointer, int/char',
		'pointer, pointer',
		paramNode
	    );
	}

	var addInstr;

	if (cfgHelper.matchTypes(left.tvalue, { type: 'pointer' }) ^
	    cfgHelper.matchTypes(right.tvalue, { type: 'pointer'})) {
	    // swap, because we have to have pointer on the left side
	    if (!cfgHelper.matchTypes(left.tvalue, { type: 'pointer' })) {
		var tmp = left;
		left = right;
		right = tmp;
	    }
	    addInstr = new Cfg({
		type: 'PADD'
	    });
	} else {
	    addInstr = new Cfg({
		type: 'ADD'
	    });
	}

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(addInstr);

	result.lvalue = false;
	result.tvalue = left.tvalue;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Add;
    });
});
