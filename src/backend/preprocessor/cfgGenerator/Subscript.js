define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;

    function Subscript(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	if ((left.type !== 'pointer' && left.type !== 'array') &&
	    (right.type !== 'pointer' && right.type !== 'array')) {
	    throw new Errors.TypeMismatch(
		left.type + ',' + right.type,
		'(pointer/array, value)',
		'SUBSCRIPT');
	}

	var ll = (left.type === 'pointer' || left.type === 'array') ? left : right;
	var rr = (left.type === 'pointer' || left.type === 'array') ? right : left;

	if (rr.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		rr.tvalue.type,
		'int',
		'SUBSCRIPT');
	}

	var paddInstr = new Cfg ({
	    type: 'PADD'
	});
	var derefInstr = new Cfg({
	    type: 'DEREF'
	});

	var result = ll;
	result.mergeLeft(rr);
	result.mergeLeft(paddInstr);
	result.mergeLeft(derefInstr);

	result.type = 'locVal';
	result.tvalue = ll.tvalue.of;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Subscript;
    });
});
