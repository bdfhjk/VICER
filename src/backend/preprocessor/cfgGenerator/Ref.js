define([
    '../Cfg',
    '../cfgHelper'
], function (Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	subexp: {
	    lvalue: true
	}
    };

    function Ref(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var location = compSubtrees.subexp;

	var refInstr = new Cfg ({
	    type: 'REF'
	});

	var result = location;
	result.mergeLeft(refInstr);

	result.lvalue = false;
	result.tvalue = {
	    type: 'pointer',
	    of: location.tvalue
	};

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Ref;
    });
});
