define([
    '../Cfg',
], function (Cfg) {
    var cfgGenerator;
    
    function Return(paramNode) {
	var cfgFromParam = cfgGenerator(paramNode.rvalue);
	if(!cfgFromParam)
	    throw new Error('Something occured during processing node ' + paramNode);

	var returnInstr = new Cfg({
	    type: 'RETURN'
	});

	cfgFromParam.mergeLeft(returnInstr);

	return cfgFromParam;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Return;
    });
});
