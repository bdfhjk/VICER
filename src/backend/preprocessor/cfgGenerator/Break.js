define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;
    
    function Break(paramNode) {
	var breakholder = new Cfg ({
	    type: 'BREAK'
	});

	breakholder.tvalue = null;

	return breakholder;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Break;
    });
});
