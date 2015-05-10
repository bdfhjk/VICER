require("../../prepare-tests.js");

var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');

describe("Complete Integration Test", function() {
    var Parser, Preprocessor, Executor, EventEmitter; 

    before(function(done) {
	var handle = this;
        requirejs(["mod_preprocessor/Preprocessor", "mod_executor/Executor", "eventEmitter"], function(preprocessor, executor, ee) {
	    handle.timeout(5000);
        EventEmitter = ee;
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
            description: "an empty program",
            file: "empty.c",
            expected: 0
        },
        {
            description: "a program with an empty block",
            file: "empty-block.c",
            expected: 0
        },
        {
            description: "just exit with code 42",
            file: "return-42.c",
            expected: 42
        },
        {
            description: "just exit with code -42",
            file: "negative-integer.c",
            expected: -42
        },
        {
            description: "assign and add to global and local scope",
            file: "global-local-scope.c",
            expected: 5
        },
        {
            description: "return function called without parameters",
            file: "paramless-function-call.c",
            expected: 42
        },
        {
            description: "call a function with 2 numbers",
            file: "adder.c",
            expected: 6
        },
        {
            description: "simple branch true",
            file: "simple-branch-true.c",
            expected: 42
        },
        {
            description: "simple branch false",
            file: "simple-branch-false.c",
            expected: 21
        },
        {
            description: "sum [1..5]",
            file: "sum1to5.c",
            expected: 15
        },
        {
            description: "sum [1..5] in a for loop",
            file: "sum1to5-forloop.c",
            expected: 15
        },
        {
            description: "10th Fibonacci",
            file: "fibonacci10th.c",
            expected: 55
        },
        {
            description: "String literal",
            file: "string-literal.c",
            expected: 33 // char code of '!'
        },
        {
            description: "Adder upon pointers",
            file: "adder-upon-pointers.c",
            expected: 6
        },
        {
            description: "Fibonacci 10th - dynamic",
            file: "fibonacci10th-dynamic.c",
            expected: 55
        },
        {
            description: "call printf with varargs",
            file: "printf-varargs.c",
            expected_printf: "Hello world!"
        },
	{
	    description: "add number to pointer",
	    file: "pointer-add.c",
	    expected: 7
	},
	// {
	//     description: "change char in char array",
	//     file: "change-char.c",
	//     expected_printf: "Aladma kota"
	// }
    ]
    .map(function(testCase) {
        it (testCase.description, function(done) {
	    var asset = fs.readFileSync(__dirname + "/assets/" + testCase.file, 'utf-8');
        var world = new EventEmitter();

	    var ast;
	    try {
		ast = Parser.parse(asset);
	    } catch(e) {
		throw e;
	    }

	    var astToCfg = Preprocessor.createAstToCfg(ast);
	    var cfgAndVars = astToCfg.convert();

            var proc = Executor.createProcess(cfgAndVars.global, cfgAndVars.functions, cfgAndVars.values, world);
            if (typeof testCase.expected === "number") {
                expect(Executor.finish(proc)).to.equal(testCase.expected);
                done();
            } else if (testCase.expected_printf) {
                world.addListener("stdout", function(str) {
                    expect(str).to.equal(testCase.expected_printf);
                    done();
                });
                Executor.finish(proc);
            }
        });
    }.bind(this));
});
