define([
    '../Cfg'
], function (Cfg) {
    function Constant (paramNode) {
	var constantValue = paramNode.value;

	var putInstr = new Cfg({
	    type: 'PUT',
	    param: constantValue
	});

	return putInstr;
    }

    return (function() {
	return Constant;
    });
});
