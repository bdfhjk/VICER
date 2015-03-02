var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');

var lexerGrammar = fs.readFileSync('src/backend/parser/ansic.jisonlex', 'utf-8');
var lexerSource = JisonLex.generate(lexerGrammar);
fs.writeFileSync('src/backend/parser/ansic.lex.js', lexerSource);

var parserGrammar = fs.readFileSync('src/backend/parser/ansic.jison', 'utf-8');
var parser = new Jison.Parser(parserGrammar);
parser.lexer = new JisonLex(lexerGrammar);
var parserSource = parser.generate();
fs.writeFileSync('src/backend/parser/ansic.js', parserSource);
