define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function Subscript(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var ll = (left.type === 'pointer' || left.type === 'array') ? left : right;
	var rr = (left.type === 'pointer' || left.type === 'array') ? right : left;

	var paddInstr = new Cfg ({
	    type: 'PADD'
	});
	var derefInstr = new Cfg({
	    type: 'DEREF'
	});

	var result = ll;
	result.mergeLeft(rr);
	result.mergeLeft(paddInstr);
	result.mergeLeft(derefInstr);

	result.type = 'locVal';
	result.tvalue = ll.tvalue.of;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Subscript;
    });
});
