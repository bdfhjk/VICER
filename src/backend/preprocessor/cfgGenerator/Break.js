define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Break(paramNode) {
	var breakPlaceholder = new Cfg ({
	    type: 'BREAK'
	});

	return breakPlaceholder;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Break;
    });
});
