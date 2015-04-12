define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Pointer(paramNode) {
	var location = cfgGenerator(paramNode.expression);

	var derefInstr = new Cfg({
	    type: 'DEREF'
	});

	location.mergeLeft(derefInstr);

	return location;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Pointer;
    });
});
