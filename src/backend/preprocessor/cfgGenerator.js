define([
    './cfgGenerator/Return',
    './cfgGenerator/Add',
    './cfgGenerator/ImplicitCall',
    './cfgGenerator/FunctionCall',
    './cfgGenerator/Constant',
    './cfgGenerator/If',
    './cfgGenerator/Compare',
    './cfgGenerator/Eq'
], function (Return, Add, ImplicitCall, FunctionCall, Constant, If, Compare, Eq) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'ADD' : Add,
	    'IMPLICIT_CALL' : ImplicitCall,
	    'FUNCTION_CALL' : FunctionCall,
	    'CONSTANT': Constant,
	    'IF': If,
	    'COMPARE': Compare,
	    'EQ': Eq
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
