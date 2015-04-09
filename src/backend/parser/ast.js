define(['jison-lex', 'jison', 'fs'], function(JisonLex, Jison, fs) {
    
    var lexerGrammar = fs.readFileSync('./ansic.jisonlex', 'utf-8');
    var lexerSource = JisonLex.generate(lexerGrammar);
    var parserGrammar = fs.readFileSync('./ansic.jison', 'utf-8');
    parser = new Jison.Parser(parserGrammar);
    parser.lexer = new JisonLex(lexerGrammar);

    return parser.parse;
}
/*    return function (program) {
        var result;
        try {
            result = parser.parse(asset);
        } catch (e) {
            result = e;
        }
            
            if (testCase.expected === "ok") {
                expect(result).to.equal(true);
            } else {
                expect(result).to.not.equal(true);
            }
  */      
