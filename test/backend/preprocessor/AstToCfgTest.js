require('../../prepare-tests.js');

describe('astToCfg', function () {
    var AST;

    before(function(done) {
	requirejs(['mod_preprocessor/astToCfg'], function(_astToCfg) {
	    AST = _astToCfg.AST;
	    done();
	});
    });

    [
	{
	    description: 'blah blah blah',
	    file: 'ast3.json',
	    expected: null
	},
    ]
	.map(function(testCase) {
	    it(testCase.description, function() {
		var asset = require('./assets/' + testCase.file);
		var ast = new AST(asset);
		ast.retrieveGlobals();
		ast.generateFunctions();
		console.log(ast.preprocessed);
		console.log(ast.preprocessed.functions.fib);
		console.log(ast.preprocessed.functions.fib.cfg);
		expect(ast.preprocessed).to.equal(testCase.expected);
	    });
	}.bind(this));
});
