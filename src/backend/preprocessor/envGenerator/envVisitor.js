define([
    './Identifier',
    './IntConstant',
    './CharConstant',
    './Literal',
    './Inc',
    './Dec',
    './UnaryOpMinus',
    './FunctionCall',
    './Return',
    './Generic'
], function (visIdentifier, visIntConstant, visCharConstant, visLiteral, visInc, visDec, visUnaryOpMinus, visFunctionCall, visReturn, visGeneric) {
    var visitFun = {
	INDENTIFIER: visIdentifier,
	CONSTANT: visIntConstant,
	CHAR_CONSTANT: visCharConstant,
	STRING_LITERAL: visLiteral,
	POST_INC: visInc,
	PRE_INC: visInc,
	POST_DEC: visDec,
	PRE_DEC: visDec,
	'UNARYOP_-': visUnaryOpMinus,
	FUNCTION_CALL: visFunctionCall,
	'return': visReturn
    };
    
    function visit(ast, nameDict, prefix, globalContext) {
	if (visitFun[ast.type]) {
	    visitFun[ast.type](ast, nameDict, prefix, globalContext, visit);
	} else {
	    visGeneric(ast, nameDict, prefix, globalContext, visit);
	}
    }

    return visit;
});
	
