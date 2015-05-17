define([
    'lodash',
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (_, Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Add(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var types = ['int'];
	var wrongType;

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var addInstr;
	var result = left;
	if (left.type === 'pointer' ^ right.type === 'pointer') {
	    var ll = left.type === 'pointer' ? left : right;
	    var rr = left.type === 'pointer' ? right : left;
	    if (!(_.contains(types, rr.tvalue.type) && _.contains(types, ll.tvalue.of.type))) {
		wrongType = _.contains(types, rr.tvalue.type) ? ll.tvalue.of.type : rr.tvalue.type;
		throw new Errors.TypeMismatch(
		    types.join(),
		    wrongType,
		    'ADD');
	    }
	    if (rr.tvalue.type !== ll.tvalue.of.type) {
		throw new Errors.TypeMismatch(
		    ll.tvalue.of.type,
		    rr.tvalue.type,
		    'ADD');
	    }

	    addInstr = new Cfg({
		type: 'PADD'
	    });
	    result.type = 'pointer';
	    result.tvalue = ll.tvalue;
	} else if (left.type === 'value' && right.type === 'value') {
	    if (!(_.contains(types, left.tvalue.type) && _.contains(types, right.tvalue.type))) {
		wrongType = _.contains(types, right.tvalue.type) ? left.tvalue.type : right.tvalue.type;
		throw new Errors.TypeMismatch(
		    types.join(),
		    wrongType,
		    'ADD');
	    }
	    if (left.tvalue.type !== right.tvalue.type) {
		throw new Errors.TypeMismatch(
		    left.tvalue.type,
		    right.tvalue.type,
		    'ADD');
	    }

	    addInstr = new Cfg({
		type: 'ADD'
	    });
	    result.type = 'value';
	    result.tvalue = left.tvalue;
	} else {
	    throw new Errors.TypeMismatch(
		'(pointer, value) || (value, value)',
		'(' + left.type + ', ' + right.type + ')',
		'ADD'
	    );
	}

	result.mergeLeft(right);
	result.mergeLeft(addInstr);

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Add;
    });
});
