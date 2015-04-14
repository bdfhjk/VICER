require("../../prepare-tests.js");

var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');

describe("Complete Integration Test", function() {
    var Parser, Preprocessor, Executor; 
    var logHandle;

    before(function(done) {
	var h = this;
        requirejs(["mod_preprocessor/Preprocessor", "mod_executor/Executor"], function(preprocessor, executor) {
	    h.timeout(5000);
	    var lexerGrammar = fs.readFileSync('src/backend/parser/assets/ansic.jisonlex', 'utf-8');
	    var lexerSource = JisonLex.generate(lexerGrammar);
	    var parserGrammar = fs.readFileSync('src/backend/parser/assets/ansic.jison', 'utf-8');
	    Parser = new Jison.Parser(parserGrammar);
	    Parser.lexer = new JisonLex(lexerGrammar);
	    Preprocessor = preprocessor;
            Executor = executor;

	    logHandle = fs.openSync("./test.log", "w");
	    done();
        });
    });

    after(function(done) {
	fs.close(logHandle, done);
    });

    [
        {
            description: "assign and add to global and local scope",
            file: "global-local-scope.c",
            expected: 5

            /*
                int a;

                int main() {
                    int b;
                    a=2;
                    b=3;
                    return a+b;
                }
            */
        },
        {
            description: "call a function with 2 numbers",
            file: "adder.c",
            expected: 6

            /*
                int add(int a, int b) {
                    return a+b;
                }

                int main() {
                    return add(4, 2);
                }
            */
        },
	{
	    description: "calculate 10th fibonacci number using recursion",
	    file: "fibonacci10th.c",
	    expected: 55

            /*
                int fib(int n) {
                    if (n == 0)
                        return 0;
                    if (n == 1)
                        return 1;
                    return fib(n-1) + fib(n-2);
                }

                int main() {
                    return fib(10);
                }
            */
	},
        {
            description: "String literal",
            file: "string-literal.c",
            expected: 33 // char code of '!'

            /*
                char* hello;

                int main() {
                    hello = "Hello, world!";
                    return hello[12];
                }
            */
        }
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
            // var asset = require("./assets/" + testCase.file);
	    var asset = fs.readFileSync(__dirname + "/assets/" + testCase.file, 'utf-8');
	    fs.writeSync(logHandle, '\nFILE ' + testCase.file + ':\n');
	    fs.writeSync(logHandle, asset);

	    var ast;
	    try {
		ast = Parser.parse(asset);
	    } catch(e) {
		fs.writeSync(logHandle, 'ERROR: ' + e + '\n');
		throw e;
	    }
	    fs.writeSync(logHandle, 'AST:\n' + JSON.stringify(ast, null, 2) + '\n');

	    var astToCfg = Preprocessor.createAstToCfg(ast);
	    var cfgAndVars = astToCfg.convert();
	    fs.writeSync(logHandle, 'CFG AND VARS:\n' + JSON.stringify(cfgAndVars, null, 2) + '\n');

            var proc = Executor.createProcess(cfgAndVars.global, cfgAndVars.functions, cfgAndVars.values);
            expect(Executor.finish(proc)).to.equal(testCase.expected);
        });
    }.bind(this));
});
