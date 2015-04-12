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
    './cfgGenerator/PlusAssign',
    './cfgGenerator/MinusAssign',
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
    './cfgGenerator/Geq',
    './cfgGenerator/More',
    './cfgGenerator/Not'
], function (Return, CompoundStatement, ExpressionStatement, Add, Sub, Identifier, Deref, Ref, ArrayVal, Assign, PlusAssign, MinusAssign, FunctionCall, If, While, For, Break, Continue, Less, Eq, Neq, Leq, Geq, More, Not) {

    function generateCfg(node, options) {
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
	    '+=': PlusAssign,
	    '-=': MinusAssign,
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
	    'GEQ': Geq,
	    'MORE': More,
	    'NOT': Not
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node, options);
    }

    return generateCfg;

});
