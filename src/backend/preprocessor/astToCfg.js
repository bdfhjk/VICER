define([
    './cfgGenerator',
    './envGenerator'
], function(cfgGenerator, envGenerator) {

    var _ = require('underscore');

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
	this.preprocessed.values = {};
	for(var i = 0; i < this.astObj.declarations.length; i++) {
	    if(this.astObj.declarations[i].type !== "FUNCTION")
		continue;
	    var funcDef = this.astObj.declarations[i];
	    
	    var args = [];
	    console.log('FUNCDEF');
	    console.log(funcDef);
	    console.log('PARAMETERSS');
	    console.log(funcDef.parameters);
	    for(var j = 0; j < funcDef.parameters.length; j++)
		args.push(funcDef.name + '_PARAMETER_' + funcDef.parameters[j].name);

	    var envAndValues = envGenerator(funcDef);
	    var env = envAndValues.env;
	    var values = {};
	    for(var val in envAndValues.constants) {
		values[envAndValues.constants[val]] = val;
	    }

	    var cfg = this.generateFunctionFromBody(funcDef.body);

	    // mark the first node
	    var firstId = cfg.first;
	    cfg = cfg.graph;
	    cfg[0] = cfg[firstId];
	    cfg[firstId] = undefined; // will delete erase both?
	    
	    for(var l in cfg.graph) {
		if(cfg[l].next == firstId)
		    cfg[l].next = 0;
	    }

	    var functionDesc = {
		returns: funcDef.returns,
		args: args,
		env: env,
		cfg: cfg
	    };
	    this.preprocessed.functions[funcDef.name] = functionDesc;
	    this.preprocessed.values = _.extend(this.preprocessed.values, values);
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
