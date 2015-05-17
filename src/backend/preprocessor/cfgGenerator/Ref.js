define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Ref(paramNode) {
	var location = cfgGenerator(paramNode.subexp);

	var refInstr = new Cfg ({
	    type: 'REF'
	});

	var result = location;
	result.mergeLeft(refInstr);

	result.type = 'pointer';
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
