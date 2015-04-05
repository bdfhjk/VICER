require('../../prepare-tests.js');

describe('cfgGenerator', function () {
    var cfgGenerator;

    before(function(done) {
	requirejs(['mod_preprocessor/cfgGenerator'], function(_cfgGenerator) {
	    cfgGenerator = _cfgGenerator;
	    done();
	});
    });

    [
	{
	    description: 'blah blah blah',
	    file: 'ast.json',
	    expected: null
	},
	{
	    description: 'blah blah blah',
	    file: 'ast2.json',
	    expected: null
	}
    ]
	.map(function(testCase) {
	    it(testCase.description, function() {
		var asset = require('./assets/' + testCase.file);
		var result = cfgGenerator(asset);
		console.log(result);
		expect(result).to.equal(testCase.expected);
	    });
	}.bind(this));
});
