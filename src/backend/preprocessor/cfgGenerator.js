define([
    './cfgGenerator/Return',
    './cfgGenerator/CompoundStatement',
    './cfgGenerator/Add',
    './cfgGenerator/Sub',
    './cfgGenerator/ImplicitCast',
    './cfgGenerator/Assign',
    './cfgGenerator/FunctionCall',
    './cfgGenerator/If',
    './cfgGenerator/While',
    './cfgGenerator/For',
    './cfgGenerator/Break',
    './cfgGenerator/Continue',
    './cfgGenerator/Less',
    './cfgGenerator/Eq',
    './cfgGenerator/Neq',
    './cfgGenerator/Leq',
    './cfgGenerator/Not'
], function (Return, CompoundStatement, Add, Sub, ImplicitCast, Assign, FunctionCall, If, While, For, Break, Continue, Less, Eq, Neq, Leq, Not) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'compound_statement': CompoundStatement,
	    'ADD': Add,
	    'SUB': Sub,
	    'IMPLICIT_CAST' : ImplicitCast,
	    'ASSIGN': Assign,
	    'FUNCTION_CALL': FunctionCall,
	    'IF': If,
	    'WHILE': While,
	    'FOR': For,
	    'BREAK': Break,
	    'CONTINUE': Continue,
	    'LESS': Less,
	    'EQ': Eq,
	    'NEQ': Neq,
	    'LEQ': Leq,
	    'NOT': Not
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
