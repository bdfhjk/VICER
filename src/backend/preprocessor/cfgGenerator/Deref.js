define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Deref(paramNode) {
	var location = cfgGenerator(paramNode.expression);

	var derefInstr = new Cfg ({
	    type: 'DEREF'
	});

	var result = location;
	result.mergeLeft(derefInstr);

	result.type = 'location';

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Deref;
    });
});
