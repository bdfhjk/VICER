define([
    './cfgGenerator/Return',
    './cfgGenerator/Add',
    './cfgGenerator/ImplicitCall',
    './cfgGenerator/FunctionCall',
    './cfgGenerator/Constant',
    './cfgGenerator/If',
    './cfgGenerator/While',
    './cfgGenerator/Compare',
    './cfgGenerator/Eq'
], function (Return, Add, ImplicitCall, FunctionCall, Constant, If, While, Compare, Eq) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'ADD' : Add,
	    'IMPLICIT_CALL' : ImplicitCall,
	    'FUNCTION_CALL' : FunctionCall,
	    'CONSTANT': Constant,
	    'IF': If,
	    'WHILE': While,
	    'COMPARE': Compare,
	    'EQ': Eq
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
