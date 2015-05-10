define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function Deref(paramNode) {
	var location = cfgGenerator(paramNode.subexp);
	CfgHelper.toValOrPtr(location);

	var derefInstr = new Cfg ({
	    type: 'DEREF'
	});

	var result = location;
	result.mergeLeft(derefInstr);

	result.type = 'locVal';

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Deref;
    });
});
