define([
    './cfgGenerator/Return',
    './cfgGenerator/CompoundStatement',
    './cfgGenerator/ExpressionStatement',
    './cfgGenerator/Add',
    './cfgGenerator/Sub',
    './cfgGenerator/Identifier',
    './cfgGenerator/Deref',
    './cfgGenerator/Ref',
    './cfgGenerator/ArrayVal',
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
    './cfgGenerator/More',
    './cfgGenerator/Not'
], function (Return, CompoundStatement, ExpressionStatement, Add, Sub, Identifier, Deref, Ref, ArrayVal, Assign, FunctionCall, If, While, For, Break, Continue, Less, Eq, Neq, Leq, More, Not) {

    function generateCfg(node) {
	var generators = {
	    'RETURN': Return,
	    'compound_statement': CompoundStatement,
	    'expression_statement': ExpressionStatement,
	    'ADD': Add,
	    'SUB': Sub,
	    'IDENTIFIER' : Identifier,
	    'DEREF' : Deref,
	    'REF' : Ref,
	    'ARRAY_VAL' : ArrayVal,
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
	    'MORE': More,
	    'NOT': Not
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
