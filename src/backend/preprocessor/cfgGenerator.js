define([
    './cfgGenerator/Return',
    './cfgGenerator/Add',
    './cfgGenerator/Sub',
    './cfgGenerator/ImplicitCast',
    './cfgGenerator/FunctionCall',
    './cfgGenerator/Constant',
    './cfgGenerator/If',
    './cfgGenerator/While',
    './cfgGenerator/Break',
    './cfgGenerator/Continue',
    './cfgGenerator/Compare',
    './cfgGenerator/Eq'
], function (Return, Add, Sub, ImplicitCast, FunctionCall, Constant, If, While, Break, Continue, Compare, Eq) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'ADD' : Add,
	    'SUB': Sub,
	    'IMPLICIT_CAST' : ImplicitCast,
	    'FUNCTION_CALL' : FunctionCall,
	    'CONSTANT': Constant,
	    'IF': If,
	    'WHILE': While,
	    'BREAK': Break,
	    'CONTINUE': Continue,
	    'COMPARE': Compare,
	    'EQ': Eq
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
