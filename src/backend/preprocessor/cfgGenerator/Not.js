define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Not(paramNode) {
	var value = cfgGenerator(paramNode.subexp);
	var notInstr = new Cfg ({
	    type: 'NOT'
	});

	var result = value;
	result.mergeLeft(notInstr);

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Not;
    });
});
