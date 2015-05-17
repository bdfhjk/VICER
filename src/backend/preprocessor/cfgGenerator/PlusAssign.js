define([
    'lodash',
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (_, Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function PlusAssign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left);
	var lrvalue = lvalue.copy();
	var rvalue = cfgGenerator(paramNode.right);

	var types = ['int', 'char'];

	CfgHelper.toValOrPtr(lrvalue);
	CfgHelper.toValOrPtr(rvalue);

	if (lvalue.type !== 'locVal') {
	    throw new Errors.TypeMismatch(
		lvalue.type,
		'locVal',
		'+=');
	}
	if (lrvalue.type !== 'value') {
	    throw new Errors.TypeMismatch(
		lrvalue.type,
		'value',
		'+=');
	}
	if (rvalue.type !== 'value' || rvalue.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		rvalue.tvalue.type,
		'int',
		'+=');
	}
	if (!(_.contains(types, lvalue.tvalue.type))) {
	    throw new Errors.TypeMismatch(
		lvalue.tvalue.type,
		types.join(),
		'+=');
	}

	var addInstr = new Cfg ({
	    type: 'ADD'
	});
	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(lrvalue);
	result.mergeLeft(rvalue);
	result.mergeLeft(addInstr);
	result.mergeLeft(assignInstr);

	result.type = null;
	result.tvalue = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return PlusAssign;
    });
});
