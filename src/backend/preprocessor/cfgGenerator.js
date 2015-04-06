define([
    './cfgGenerator/Return',
    './cfgGenerator/Add',
    './cfgGenerator/Sub',
    './cfgGenerator/ImplicitCast',
    './cfgGenerator/Assign',
    './cfgGenerator/FunctionCall',
    './cfgGenerator/Constant',
    './cfgGenerator/If',
    './cfgGenerator/While',
    './cfgGenerator/For',
    './cfgGenerator/Break',
    './cfgGenerator/Continue',
    './cfgGenerator/Compare',
    './cfgGenerator/Eq',
    './cfgGenerator/Not'
], function (Return, Add, Sub, ImplicitCast, Assign, FunctionCall, Constant, If, While, For, Break, Continue, Compare, Eq, Not) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'ADD' : Add,
	    'SUB': Sub,
	    'IMPLICIT_CAST' : ImplicitCast,
	    'ASSIGN' : Assign,
	    'FUNCTION_CALL' : FunctionCall,
	    'CONSTANT': Constant,
	    'IF': If,
	    'WHILE': While,
	    'FOR': For,
	    'BREAK': Break,
	    'CONTINUE': Continue,
	    'COMPARE': Compare,
	    'EQ': Eq,
	    'NOT': Not
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
