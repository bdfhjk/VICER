define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Deref(paramNode) {
	var location = cfgGenerator(paramNode.expression, { wantLocation: true });

	var derefInstr = new Cfg({
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
