var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');
var path = require('path');
var preprocessGrammar = require('./LocationMacro');

var dest = process.cwd();

var lexerFilename = path.join(dest, 'ansic.lex.js');
var parserFilename = path.join(dest, 'ansic.js');

var lexerGrammar = fs.readFileSync('assets/ansic.jisonlex', 'utf-8');
var lexerSource = JisonLex.generate(lexerGrammar);
fs.writeFileSync(lexerFilename, lexerSource);

var parserGrammar = preprocessGrammar(fs.readFileSync('assets/ansic.jison', 'utf-8'));
var parser = new Jison.Parser(parserGrammar);
parser.lexer = new JisonLex(lexerGrammar);
var parserSource = parser.generate();

var ops = {};
var args = process.argv.slice(2);
var supported = ["locations", "print"];

for (var index in supported) {
    var option = supported[index];
    if (args.indexOf(option) != -1) {
        ops[option] = true;
    } else if (args.indexOf("no" + option) != -1) {
        ops[option] = false;
    }
}

var finalParserSource = parserSource.replace(
    "return exports.parser.parse(source);",
    "var parser_ops = " + JSON.stringify(ops, null, 4) + ";\n" +
    "return exports.parser.parse(source, parser_ops);"
    );

fs.writeFileSync(parserFilename, finalParserSource);

function processLocationMacro (parserGrammar) {
    var reg = /^(\w+)_\b/gm;
    var replacement = '$1\n    : $1_\n        { $$$$ = addloc($$1, @1, ops); }\n    ;\n\n$&';
    return parserGrammar.replace(reg, replacement);
}
