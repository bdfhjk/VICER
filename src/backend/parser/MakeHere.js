var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');
var path = require('path');

var dest = process.cwd();

var lexerFilename = path.join(dest, 'ansic.lex.js');
var parserFilename = path.join(dest, 'ansic.js');

var lexerGrammar = fs.readFileSync('assets/ansic.jisonlex', 'utf-8');
var lexerSource = JisonLex.generate(lexerGrammar);
fs.writeFileSync(lexerFilename, lexerSource);

var parserGrammar = fs.readFileSync('assets/ansic.jison', 'utf-8');
var parser = new Jison.Parser(parserGrammar);
parser.lexer = new JisonLex(lexerGrammar);
var parserSource = parser.generate();
fs.writeFileSync(parserFilename, parserSource);
