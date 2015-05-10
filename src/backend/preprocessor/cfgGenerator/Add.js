define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function Add(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);
	if (!(left || right)) {
	    throw new Error('Something occured during processing node ' + paramNode);
	}

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var addInstr;
	if(left.type === 'pointer' || right.type === 'pointer') {
	    addInstr = new Cfg({
		type: 'PADD'
	    });
	    left.type = 'pointer';
	} else {
	    addInstr = new Cfg({
		type: 'ADD'
	    });
	    left.type = 'value';
	}

	left.mergeLeft(right);
	left.mergeLeft(addInstr);

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Add;
    });
});
