define([
    'lodash',
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (_, Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Assign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left);
	var rvalue = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(rvalue);

	if (lvalue.type === 'locVal') {
	    if (rvalue.type !== 'value') {
		throw new Errors.TypeMismatch(
		    'value',
		    rvalue.type,
		    'ASSIGN');
	    }
	    if (lvalue.tvalue.type !== rvalue.tvalue.type) {
		throw new Errors.TypeMismatch(
		    lvalue.tvalue.type,
		    rvalue.tvalue.type,
		    'ASSIGN'
		);
	    }
	} else if (lvalue.type === 'locPtr') {
	    if (rvalue.type !== 'pointer') {
		throw new Errors.TypeMismatch(
		    'pointer',
		    rvalue.type,
		    'ASSIGN'
		);
	    }
	    if (lvalue.tvalue.of.type !== rvalue.tvalue.of.type) {
		throw new Errors.TypeMismatch(
		    lvalue.tvalue.of.type,
		    rvalue.tvalue.of.type,
		    'ASSIGN'
		);
	    }
	} else {
	    throw new Errors.TypeMismatch(
		'locVal || locPtr',
		lvalue.type,
		'ASSIGN');
	}

	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(rvalue);
	result.mergeLeft(assignInstr);

	result.type = null;
	result.tvalue = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Assign;
    });
});
