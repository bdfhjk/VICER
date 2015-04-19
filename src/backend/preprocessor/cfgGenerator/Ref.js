define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Ref(paramNode, options) {
	var location = cfgGenerator(paramNode.expression, options);

	var refInstr = new Cfg ({
	    type: 'REF'
	});

	location.mergeLeft(refInstr);

	return location;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Ref;
    });
});
