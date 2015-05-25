define([
    './cfgGenerator/LogicalAnd',
    './cfgGenerator/LogicalOr',
    './cfgGenerator/Mod',
    './cfgGenerator/Mul',
    './cfgGenerator/Div',
    './cfgGenerator/Return',
    './cfgGenerator/CompoundStatement',
    './cfgGenerator/ExpressionStatement',
    './cfgGenerator/Add',
    './cfgGenerator/Sub',
    './cfgGenerator/Identifier',
    './cfgGenerator/Deref',
    './cfgGenerator/Ref',
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
], function (LogicalAnd, LogicalOr, Mod, Mul, Div, Return, CompoundStatement, ExpressionStatement, Add, Sub, Identifier, Deref, Ref, Assign, PlusAssign, MinusAssign, FunctionCall, If, While, For, Break, Continue, Less, Eq, Neq, Leq, Geq, More, Not, Subscript) {

    function generateCfg(node) {
	var generators = {
	    'LOGICAL_AND': LogicalAnd,
	    'LOGICAL_OR': LogicalOr,
	    'MOD': Mod,
	    'MUL': Mul,
	    'DIV': Div,
	    'return': Return,
	    'compound_statement': CompoundStatement,
	    'expression_statement': ExpressionStatement,
	    'ADD': Add,
	    'SUB': Sub,
	    'INDENTIFIER': Identifier,
	    'UNARYOP_*' : Deref,
	    'UNARYOP_&' : Ref,
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
	if (!generator) {
	    throw new Error("generateCfg: no function for " + JSON.stringify(node.type, null, 2));
	}
	return generator(generateCfg)(node);
    }

    return generateCfg;

});
