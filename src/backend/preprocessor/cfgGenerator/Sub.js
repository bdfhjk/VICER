define([
    'lodash',
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (_, Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Sub(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	var types = ['int'];
	var wrongType;

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var subInstr;
	var result = left;
	if(left.type === 'pointer' ^ right.type === 'pointer') {
	    var ll = left.type === 'pointer' ? left : right;
	    var rr = left.type === 'pointer' ? right : left;
	    if (!(_.contains(types, rr.tvalue.type) && _.contains(types, ll.tvalue.of.type))) {
		wrongType = _.contains(types, rr.tvalue.type) ? ll.tvalue.of.type : rr.tvalue.type;
		throw new Errors.TypeMismatch(
		    types.join(),
		    wrongType,
		    'SUB');
	    }
	    if (rr.tvalue.type !== ll.tvalue.of.type) {
		throw new Errors.TypeMismatch(
		    ll.tvalue.of.type,
		    rr.tvalue.type,
		    'SUB');
	    }

	    subInstr = new Cfg({
		type: 'PSUB'
	    });
	    result.type = 'pointer';
	    result.tvalue = ll.tvalue;
	} else if (left.type === 'value' && right.type === 'value') {
	    if (!(_.contains(types, left.tvalue.type) && _.contains(types, right.tvalue.type))) {
		wrongType = _.contains(types, right.tvalue.type) ? left.tvalue.type : right.tvalue.type;
		throw new Errors.TypeMismatch(
		    types.join(),
		    wrongType,
		    'SUB');
	    }
	    if (left.tvalue.type !== right.tvalue.type) {
		throw new Errors.TypeMismatch(
		    left.tvalue.type,
		    right.tvalue.type,
		    'ADD');
	    }
	    subInstr = new Cfg({
		type: 'SUB'
	    });

	    result.type = 'value';
	    result.tvalue = left.tvalue;
	} else {
	    throw new Errors.TypeMismatch(
		'(pointer, value) || (value, value)',
		'(' + left.type + ', ' + right.type + ')',
		'SUB'
	    );
	}

	result.mergeLeft(right);
	result.mergeLeft(subInstr);

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Sub;
    });
});
