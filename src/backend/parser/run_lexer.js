var JisonLex = require('jison-lex');
var fs = require('fs');
var path = require('path');

var lexerGrammar = fs.readFileSync('ansic.jisonlex', 'utf-8');

var input = fs.readFileSync(process.argv[2], 'utf-8');

lexer = new JisonLex(lexerGrammar);

lexer.setInput(input);

var EOF = 1;
var token;
while ((token = lexer.lex()) != EOF) {
    console.log(token + "::" + lexer.yytext);
}
