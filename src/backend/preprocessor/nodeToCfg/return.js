define(["./NodeToCfg", function (nodeToCfg) {
    function Return(paramNode) {
	var cfgFromParam = nodeToCfg(paramNode);
	if(!cfgFromParam)
	    throw new Error('Something occured during processing node ' + paramNode);

	var returnInstr = {
	    type: 'RETURN'
	};

	cfgFromParam.addToEnd(returnInstr);

	return cfgFromParam;
    }
});
