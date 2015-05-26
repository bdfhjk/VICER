define([
    'lodash',
    './Cfg',
    './cfgGenerator',
    './envGenerator',
    'mod_stdlib'
], function(_, Cfg, cfgGenerator, envGenerator, stdlib) {

    function AstToCfg(_astObj) {
	this.astObj = _astObj;
	this.preprocessed = {};
    }
    
    AstToCfg.prototype.retrieveGlobals = function retrieveGlobals() {
	// retrieve globals
	this.preprocessed.global = {};
	for (var i = 0; i < this.astObj.external_declarations.length; i++) {
	    if (this.astObj.external_declarations[i].type !== 'declaration' &&
	       this.astObj.external_declarations[i].type !== 'array_declaration') {
		continue;
	    }
	    var varDef = this.astObj.external_declarations[i];
	    // duplicate code, extract it
	    var tvalue = varDef.tvalue;
	    var varEntry;
	    if (tvalue.type === 'concrete_type') {
		varEntry = {
		    type: tvalue.name
		};
	    } else if (tvalue.type === 'pointer') {
		varEntry = {
		    type: 'pointer',
		    of: {
			type: tvalue.tvalue.name // make it recursive
		    }
		};
	    }
	    // end of duplicate code
	    if (varDef.type === 'array_declaration') {
		this.preprocessed.global[varDef.name] = {
		    type: 'array',
		    size: varDef.size,
		    of: varEntry
		};
	    } else {
		this.preprocessed.global[varDef.name] = varEntry;
	    }
	}
    };

    AstToCfg.prototype.collectPrototypes = function collectPrototypes() {
        this.preprocessed.prototypes = this.preprocessed.prototypes || {};

	for (var i = 0; i < this.astObj.external_declarations.length; i++) {
	    if (this.astObj.external_declarations[i].type !== 'function_definition') {
		continue;
	    }

	    var funcDef = this.astObj.external_declarations[i];
	    this.preprocessed.prototypes[funcDef.declaration.name] = funcDef.declaration;
	}
    };

    AstToCfg.prototype.generateFunctions = function generateFunctions() {
	// generate functions
	this.preprocessed.functions = {};
	this.preprocessed.values = {};
	for (var i = 0; i < this.astObj.external_declarations.length; i++) {
	    if (this.astObj.external_declarations[i].type !== "function_definition") {
		continue;
	    }
	    var funcDef = this.astObj.external_declarations[i];
	    var funcDecl = funcDef.declaration;
	    
	    var args = [];
	    for (var j = 0; j < funcDecl.param_names.length; j++) {
		args.push(funcDecl.name + '_PARAMETER|' + funcDecl.param_names[j]);
	    }

	    var globals = this.preprocessed.global;
	    var decls = _.extend(this.preprocessed.prototypes, this.stdlib);
	    var envAndValues = envGenerator(funcDef, globals, decls, funcDecl.name);
	    var env = envAndValues.env;
	    var values = {};
	    for (var val in envAndValues.constants) {
		values[envAndValues.constants[val]] = isNaN(val) ? val : Number(val); // replace it with smarter check maybe?
	    }

	    var funcStep = new Cfg({
		type: 'STEP',
		param: funcDecl.loc
	    });
	    var cfg = funcStep;
	    cfg.mergeLeft(cfgGenerator(funcDef.body, decls, funcDecl.return_tvalue));

	    // mark the first node
	    var firstId = cfg.first;
	    cfg = cfg.graph;
	    cfg[0] = cfg[firstId];
	    cfg[firstId] = undefined; // will delete erase both?
	    
	    for (var l in cfg.graph) {
		if (cfg[l].next == firstId) {
		    cfg[l].next = 0;
		}
	    }

	    var functionDesc = {
		returns: { type: funcDecl.return_tvalue.name },
		args: args,
		env: env,
		cfg: cfg
	    };
	    this.preprocessed.functions[funcDecl.name] = functionDesc;
	    this.preprocessed.values = _.extend(this.preprocessed.values, values);
	}
    };

    AstToCfg.prototype.getConverted = function getConverted() {
	return this.preprocessed;
    };

    AstToCfg.prototype.collectStdLibFunctions = function collectStdLibFunctions() {
	this.stdlib = {};
        var rawStdlib = stdlib.getStdLibFunctions();
	var rawDesc, finDesc, rawEntry, finEntry;
	for (var stdFunc in rawStdlib) {
	    rawDesc = rawStdlib[stdFunc];
	    finDesc = {};
	    if (rawDesc.returns.type === 'pointer' || rawDesc.returns.type === 'array') {
		finDesc.return_tvalue = {
		    type: rawDesc.returns.type,
		    of: {
			type: 'concrete_type',
			name: rawDesc.returns.of.type
		    }
		};
	    } else {
		finDesc.return_tvalue = {
		    type: 'concrete_type',
		    name: rawDesc.returns.type
		};
	    }
	    finDesc.param_tvalues = [];
	    if (rawDesc.args !== 'varargs') {
		for (var i = 0; i < rawDesc.args.length; i++) {
		    finEntry = {};
		    rawEntry = rawDesc.env[rawDesc.args[i]];
		    if (rawEntry.type === 'pointer' || rawEntry.type === 'array') {
			finEntry = {
			    type: rawEntry.type,
			    of: {
				type: 'concrete_type',
				name: rawEntry.of.type
			    }
			};
		    } else {
			finEntry = {
			    type: 'concrete_type',
			    name: rawEntry.type
			};
		    }
		    finDesc.param_tvalues.push(finEntry);
		}
	    } else {
		finDesc.args = 'varargs';
	    }
	    finDesc.param_tvalues.reverse();
	    this.stdlib[stdFunc] = finDesc;
	}
    };

    AstToCfg.prototype.convert = function convert() {
	this.retrieveGlobals();
	this.collectStdLibFunctions();
	this.collectPrototypes();
	this.generateFunctions();
	return this.getConverted();
    };

    function createAstToCfg(astObj) {
	return new AstToCfg(astObj);
    }

    return {
	createAstToCfg: createAstToCfg
    };
});
