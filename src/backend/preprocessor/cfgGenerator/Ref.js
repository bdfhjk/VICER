define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Ref(paramNode) {
	var location = cfgGenerator(paramNode.expression);

	var refInstr = new Cfg ({
	    type: 'REF'
	});

	var result = location;
	result.mergeLeft(refInstr);

	result.type = 'pointer';

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Ref;
    });
});
