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
            options: { locations: false },
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
            options: { locations: false },
            expected: "ok"
        }, 
        {
            description: "Simple for",
            file: "simple_for",
            options: { locations: false },
            expected: "ok"
        },
        {
            description: "Simple if",
            file: "simple_if",
            options: { locations: false },
            expected: "ok"
        },
        {
            description: "Simple arrays",
            file: "simple_arrays",
            options: { locations: false },
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
            options: { locations: false },
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
            options: { locations: false },
            expected: "ok"
        },
        {
            description: "Void functions",
            file: "void_functions",
            options: { locations: false },
            expected: "ok",
        },
        {
            description: "Char type",
            file: "char_type",
            options: { locations: false },
            expected: "ok",
        },
        {
            description: "Character escape sequences",
            file: "char_escapes",
            options: { locations: false },
            expected: "ok",
        },
        {
            description: "Malloc",
            file: "malloc",
            options: { locations: false },
            expected: "ok",
        },
        {
            description: "Tracking locations",
            file: "locations",
            options: { locations: true },
            expected: "ok",
        },
        // bad
        {
            description: "Bad - Hello World",
            file: "bad_hello_world",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "Bad - Forgot struct keyword",
            file: "bad_forgot_struct_keyword",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "Bad - Nested functions",
            file: "bad_nested_functions",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No nested pointers",
            file: "no_nested_pointers",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No function pointers",
            file: "no_function_pointers",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No function parameters",
            file: "no_function_parameters",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No array parameters",
            file: "no_array_parameters",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No pointer arrays",
            file: "no_pointer_arrays",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No 2D arrays",
            file: "no_2Darrays",
            options: { locations: false },
            expected: "error"
        },
        {
            description: "No void parameters",
            file: "no_void_parameters",
            options: { locations: false },
            expected: "error",
        },
        {
            description: "No malloc without explicit cast",
            file: "nocast_malloc",
            options: { locations: false },
            expected: "error",
        },
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
            var program = fs.readFileSync(__dirname + "/assets/programs/" + testCase.file + ".c", 'utf-8');
            var result;
            try {
                result = parser.parse(program, testCase.options);
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
