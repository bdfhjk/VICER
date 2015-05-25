define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	subexp: {
	    lvalue: false,
	    type: { type: 'pointer' }
	}
    };
    
    function Deref(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var location = compSubtrees.subexp;

	var derefInstr = new Cfg ({
	    type: 'DEREF'
	});

	var result = location;
	result.mergeLeft(derefInstr);

	result.lvalue = true;
	result.tvalue = location.tvalue.of;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Deref;
    });
});
