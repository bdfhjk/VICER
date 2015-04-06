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
	{
	    description: 'blah blah blah',
	    file: 'ast4.json',
	    expected: null
	}
    ]
	.map(function(testCase) {
	    it(testCase.description, function() {
		var asset = require('./assets/' + testCase.file);
		var ast = new AST(asset);
		console.log(testCase.file);
		console.log("======================================================");
		ast.retrieveGlobals();
		ast.generateFunctions();
		console.log(ast.preprocessed);
		console.log(ast.preprocessed.functions.main.cfg);
		console.log("SAM JSON");
		console.log(JSON.stringify(ast.preprocessed, null, 2));
		expect(ast.preprocessed).to.equal(testCase.expected);
	    });
	}.bind(this));
});
