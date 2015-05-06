define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Not(paramNode, options) {
	var value = cfgGenerator(paramNode.subexp, options);
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
