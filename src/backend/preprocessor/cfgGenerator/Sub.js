define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Sub(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var result = left;

	var subInstr;
	if(left.type === 'pointer' ^ right.type === 'pointer') {
	    var ll = left.type === 'pointer' ? left : right;
	    var rr = left.type === 'pointer' ? right : left;
	    subInstr = new Cfg({
		type: 'PSUB'
	    });
	    result.type = 'pointer';
	    result.tvalue = ll.tvalue;
	} else if (left.type === 'value' && right.type === 'value') {
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
