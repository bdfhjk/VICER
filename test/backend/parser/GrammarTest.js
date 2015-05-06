require("../../prepare-tests.js");

var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');

describe("Parser Grammar", function() {

    var parser;

    before(function(done) {
	this.timeout(5000);

        var lexerGrammar = fs.readFileSync('src/backend/parser/assets/ansic.jisonlex', 'utf-8');
        var lexerSource = JisonLex.generate(lexerGrammar);
        var parserGrammar = fs.readFileSync('src/backend/parser/assets/ansic.jison', 'utf-8');
        parser = new Jison.Parser(parserGrammar);
        parser.lexer = new JisonLex(lexerGrammar);

	done();
    });

    [
        // good
        {
            description: "Hello World",
            file: "hello_world",
            expected: "ok"
        },
/*        {
            description: "Advanced global structs",
            file: "advanced_global_structs.c",
            expected: "ok"
        },*/
        {
            description: "Expressions",
            file: "expressions",
            expected: "ok"
        }, 
        {
            description: "Simple for",
            file: "simple_for",
            expected: "ok"
        },
        {
            description: "Simple if",
            file: "simple_if",
            expected: "ok"
        },
        {
            description: "Simple arrays",
            file: "simple_arrays",
            expected: "ok"
        },
/*        {
            description: "Simple global structs",
            file: "simple_global_structs.c",
            expected: "ok"
        },
        {
            description: "Simple variable declarations",
            file: "simple_var_decls.c",
            expected: "ok"
        },*/
        {
            description: "Simple while loop",
            file: "simple_while",
            expected: "ok"
        },
/*        {
            description: "Struct forward declarations",
            file: "struct_forward_declarations.c",
            expected: "ok"
        },
        {
            description: "Structs in blocks",
            file: "structs_in_blocks.c",
            expected: "ok"
        }, */
        {
            description: "Two functions",
            file: "two_functions",
            expected: "ok"
        },

        // bad
        {
            description: "Bad - Hello World",
            file: "bad_hello_world",
            expected: "error"
        },
        {
            description: "Bad - Forgot struct keyword",
            file: "bad_forgot_struct_keyword",
            expected: "error"
        },
        {
            description: "Bad - Nested functions",
            file: "bad_nested_functions",
            expected: "error"
        },
        {
            description: "No nested pointers",
            file: "no_nested_pointers",
            expected: "error"
        },
        {
            description: "No function pointers",
            file: "no_function_pointers",
            expected: "error"
        },
        {
            description: "No function parameters",
            file: "no_function_parameters",
            expected: "error"
        },
        {
            description: "No array parameters",
            file: "no_array_parameters",
            expected: "error"
        },
        {
            description: "No pointer arrays",
            file: "no_pointer_arrays",
            expected: "error"
        },
        {
            description: "No 2D arrays",
            file: "no_2Darrays",
            expected: "error"
        },
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
            var program = fs.readFileSync(__dirname + "/assets/programs/" + testCase.file + ".c", 'utf-8');
            var result;
            try {
                result = parser.parse(program);
            } catch (e) {
                result = e;
            }
            
            if (testCase.expected === "ok") {
                var astJson = fs.readFileSync(__dirname + "/assets/ast/" + testCase.file + ".ast", 'utf-8');
                var ast = JSON.parse(astJson);

                var actualJsonString = JSON.stringify(result, null, 4);
                var expectedJsonString = JSON.stringify(ast, null, 4);

                expect(expectedJsonString).to.equal(actualJsonString);
            } else {
                expect(result).to.not.equal(true);
            }
        });
    }.bind(this));
});
