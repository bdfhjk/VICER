define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Deref(paramNode, options) {
	var location = cfgGenerator(paramNode.expression, options);

	var derefInstr = new Cfg ({
	    type: 'DEREF'
	});

	location.mergeLeft(derefInstr);

	return location;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Deref;
    });
});
