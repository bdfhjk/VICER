require("../../prepare-tests.js");

var fs = require('fs');

describe("Complete Integration Test", function() {
    var Parser, Preprocessor, Executor; 

    before(function(done) {
	var handle = this;
        requirejs(["mod_preprocessor/Preprocessor", "mod_executor/Executor"], function(preprocessor, executor) {
	    handle.timeout(5000);
	    var lexerGrammar = fs.readFileSync('src/backend/parser/assets/ansic.jisonlex', 'utf-8');
	    var lexerSource = JisonLex.generate(lexerGrammar);
	    var parserGrammar = fs.readFileSync('src/backend/parser/assets/ansic.jison', 'utf-8');
	    Parser = new Jison.Parser(parserGrammar);
	    Parser.lexer = new JisonLex(lexerGrammar);
	    Preprocessor = preprocessor;
            Executor = executor;

	    done();
        });
    });

    [
        {
            description: "just exit with code 42",
            file: "return-42.c",
            expected: 42

            /*
                int main() {
                    return 42;
                }
            */
        },
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
            description: "return function called without parameters",
            file: "paramless-function-call.c",
            expected: 42

            /*
                int fun() {
                    return 42;
                }

                int main() {
                    return fun();
                }
            */
        },
        {
            description: "call a function with 2 numbers",
            file: "adder.c",
            expected: 6

            /*
                int add(int a, int b) {
                    return a + b;
                }

                int main() {
                    return add(4, 2);
                }
            */
        },
        {
            description: "simple branch true",
            file: "simple-branch-true.c",
            expected: 42

            /*
                int main() {
                    if (1) 
                        return 42;
                    else
                        return 21;
                }
            */
        },
        {
            description: "simple branch false",
            file: "simple-branch-false.c",
            expected: 21

            /*
                int main() {
                    if (0) 
                        return 42;
                    else
                        return 21;
                }
            */
        },
        {
            description: "sum [1..5]",
            file: "sum1to5.c",
            expected: 15

            /*
                int result;
                int main() {
                    int i;
                    i = 0;
                    result = 0;
                    while (!(i == 6)) {
                        result = result + i;
                        i++;
                    }
                }
            */
        },
        {
            description: "10th Fibonacci",
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
        }
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
	    var asset = fs.readFileSync(__dirname + "/assets/" + testCase.file, 'utf-8');

	    var ast;
	    try {
		ast = Parser.parse(asset);
	    } catch(e) {
		throw e;
	    }

	    var astToCfg = Preprocessor.createAstToCfg(ast);
	    var cfgAndVars = astToCfg.convert();

            var proc = Executor.createProcess(cfgAndVars.global, cfgAndVars.functions, cfgAndVars.values);
            expect(Executor.finish(proc)).to.equal(testCase.expected);
        });
    }.bind(this));
});
