define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function Sub(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);
	if (!(left || right)) {
	    throw new Error('Something occured during processing node ' + paramNode);
	}

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var subInstr;
	if(left.type === 'pointer' || right.type === 'pointer') {
	    subInstr = new Cfg({
		type: 'PSUB'
	    });
	    left.type = 'pointer';
	} else {
	    subInstr = new Cfg({
		type: 'SUB'
	    });
	    left.type = 'value';
	}

	left.mergeLeft(right);
	left.mergeLeft(subInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Sub;
    });
});
