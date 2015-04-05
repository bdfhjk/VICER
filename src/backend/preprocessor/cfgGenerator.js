define([
    './cfgGenerator/Return',
    './cfgGenerator/Add',
    './cfgGenerator/ImplicitCall'
], function (Return, Add, ImplicitCall) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'ADD' : Add,
	    'IMPLICIT_CALL' : ImplicitCall
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
