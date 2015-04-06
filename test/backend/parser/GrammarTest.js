require("../../prepare-tests.js");

var JisonLex = require('jison-lex');
var Jison = require('jison');
var fs = require('fs');

describe("Parser Grammar", function() {

    var parser;

    before(function() {
        var lexerGrammar = fs.readFileSync('src/backend/parser/ansic.jisonlex', 'utf-8');
        var lexerSource = JisonLex.generate(lexerGrammar);
        var parserGrammar = fs.readFileSync('src/backend/parser/ansic.jison', 'utf-8');
        parser = new Jison.Parser(parserGrammar);
        parser.lexer = new JisonLex(lexerGrammar);
    });

    [
        // good
        {
            description: "Hello World",
            file: "hello_world.c",
            expected: "ok"
        },
        {
            description: "Advanced global structs",
            file: "advanced_global_structs.c",
            expected: "ok"
        },
        {
            description: "Expressions",
            file: "expressions.c",
            expected: "ok"
        },
        {
            description: "Simple for",
            file: "simple_for.c",
            expected: "ok"
        },
        {
            description: "Simple if",
            file: "simple_if.c",
            expected: "ok"
        },
        {
            description: "Simple global structs",
            file: "simple_global_structs.c",
            expected: "ok"
        },
        {
            description: "Simple variable declarations",
            file: "simple_var_decls.c",
            expected: "ok"
        },
        {
            description: "Simple while loop",
            file: "simple_while.c",
            expected: "ok"
        },
        {
            description: "Struct forward declarations",
            file: "struct_forward_declarations.c",
            expected: "ok"
        },
        {
            description: "Structs in blocks",
            file: "structs_in_blocks.c",
            expected: "ok"
        },
        {
            description: "Two functions",
            file: "two_functions.c",
            expected: "ok"
        },

        // bad
        {
            description: "Bad - Hello World",
            file: "bad_hello_world.c",
            expected: "error"
        },
        {
            description: "Bad - Forgot struct keyword",
            file: "bad_forgot_struct_keyword.c",
            expected: "error"
        },
        {
            description: "Bad - Nested functions",
            file: "bad_nested_functions.c",
            expected: "error"
        }
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
            var asset = fs.readFileSync(__dirname + "/assets/" + testCase.file, 'utf-8');
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
        });
    }.bind(this));
});
