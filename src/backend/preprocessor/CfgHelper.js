define([
    './Cfg'
], function (Cfg) {
    function toValOrPtr (graph) {
	if (graph.type !== 'location') {
	    return;
	}

	var fetchInstr = new Cfg ({
	    type: 'FETCH'
	});

	graph.mergeLeft(fetchInstr);
    }

    function getNodeVal (node) {
	if ((node.tvalue && node.tvalue.type === 'pointer') ||
	    (node.return_tvalue && node.return_tvalue.type === 'pointer')) {
	    return 'pointer';
	} else {
	    return 'value';
	}
    }

    return {
	toValOrPtr: toValOrPtr,
	getNodeVal: getNodeVal
    };
});
