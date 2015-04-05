define([
    './cfgGenerator'
], function(cfgGenerator) {

    function AST(_astObj) {
	this.astObj = _astObj;
	this.preprocessed = {};
    }
    
    AST.prototype.retrieveGlobals = function retrieveGlobals() {
	// retrieve globals
	this.preprocessed.global = {};
	for(var i = 0; i < this.astObj.declarations.length; i++) {
	    if(this.astObj.declarations[i].type !== "VARIABLE")
		continue;
	    var varDef = this.astObj.declarations[i];
	    var globalVariable = {
		type: varDef.of.type
	    };
	    this.preprocessed.global[varDef.name] = globalVariable;
	}
    };

    AST.prototype.generateFunctions = function generateFunctions() {
	// generate functions
	this.preprocessed.functions = {};
	for(var i = 0; i < this.astObj.declarations.length; i++) {
	    if(this.astObj.declarations[i].type !== "FUNCTION")
		continue;
	    var funcDef = this.astObj.declarations[i];
	    
	    var args = [];
	    for(var j = 0; j < funcDef.parameters; j++)
		args.push(funcDef.parameters[j].name);

	    var env = {};
	    for(var k = 0; k < funcDef.parameters; k++)
	    {
		env[funcDef.parameters[k].name] = {
		    type: funcDef.parameters[k].type
		};
	    }

	    var cfg = this.generateFunctionFromBody(funcDef.body);

	    var functionDesc = {
		returns: funcDef.returns,
		args: args,
		env: env,
		cfg: cfg
	    };
	    this.preprocessed.functions[funcDef.name] = functionDesc;
	}
    };

    AST.prototype.generateFunctionFromBody = function generateFunctionFromBody(body) {
	if(body.length === 0)
	    return null;

	var result = cfgGenerator(body[0]);
	for(var i = 1; i < body.length; i++)
	    result.mergeLeft(cfgGenerator(body[i]));

	return result;
    };

    return {
	AST: AST
    };
});
