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
    './cfgGenerator/Not',
    './cfgGenerator/Subscript'
], function (Return, CompoundStatement, ExpressionStatement, Add, Sub, Identifier, Deref, Ref, ArrayVal, Assign, PlusAssign, MinusAssign, FunctionCall, If, While, For, Break, Continue, Less, Eq, Neq, Leq, Geq, More, Not, Subscript) {

    function generateCfg(node, decls, return_tvalue) {
	var generators = {
	    'return': Return,
	    'compound_statement': CompoundStatement,
	    'expression_statement': ExpressionStatement,
	    'ADD': Add,
	    'SUB': Sub,
	    'INDENTIFIER': Identifier,
	    'UNARYOP_*' : Deref,
	    'UNARYOP_&' : Ref,
	    'ARRAY_VAL' : ArrayVal,
	    'ASSIGN': Assign,
	    '+=': PlusAssign,
	    '-=': MinusAssign,
	    'FUNCTION_CALL': FunctionCall,
	    'if': If,
	    'while': While,
	    'for': For,
	    'BREAK': Break,
	    'CONTINUE': Continue,
	    'LESS': Less,
	    'EQ': Eq,
	    'NE': Neq,
	    'LESS_EQUAL': Leq,
	    'GEQ': Geq,
	    'MORE': More,
	    'UNARYOP_!': Not,
	    'SUBSCRIPT': Subscript
	};

	var generator = generators[node.type];
	return generator(generateCfg)(node, decls, return_tvalue);
    }

    return generateCfg;

});
