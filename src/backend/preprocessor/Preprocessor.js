define([
    'lodash',
    './Cfg',
    './cfgGenerator',
    './envGenerator',
    './envGeneratorHelper',
    './nameHelper',
    'mod_stdlib'
], function(_, Cfg, cfgGenerator, envGenerator, envHelper, nameHelper, stdlib) {

    function AstToCfg(_astObj) {
	this.astObj = _astObj;
	this.preprocessed = {};
    }
    
    AstToCfg.prototype.retrieveGlobals = function retrieveGlobals() {
	var declarations = this.astObj.external_declarations;
	this.preprocessed.global = {};
	var global = this.preprocessed.global;

	_.each(declarations, function (decl) {
	    if (decl.type !== 'declaration' && decl.type !== 'array_declaration') {
		return;
	    }
	    // convert parser-syntax types to VM-syntax types
	    var varEntry = envHelper.createEnvEntry(decl.tvalue);
	    if (decl.type === 'array_declaration') {
		global[decl.name] = {
		    type: 'array',
		    size: decl.size,
		    of: varEntry
		};
	    } else {
		global[decl.name] = varEntry;
	    }
	});
    };

    AstToCfg.prototype.collectPrototypes = function collectPrototypes() {
	var declarations = this.astObj.external_declarations;
        this.preprocessed.prototypes = this.preprocessed.prototypes || {};
	var prototypes = this.preprocessed.prototypes;

	_.each(declarations, function (decl) {
	    if (decl.type !== 'function_definition') {
		return;
	    }

	    var paramTypePairs = _.zip(decl.declaration.param_names, decl.declaration.param_tvalues);

	    var convParamTypes = _.reduce(paramTypePairs, function (result, tvalue) {
		var paramName = tvalue[0];
		var paramType = envHelper.createEnvEntry(tvalue[1]);
		result[paramName] = paramType;
		return result;
	    }, {});

	    decl.declaration.args = decl.declaration.param_names;
	    decl.declaration.env = convParamTypes;
	    decl.declaration.returns = envHelper.createEnvEntry(decl.declaration.return_tvalue);
	    prototypes[decl.declaration.name] = decl.declaration;
	});
    };

    AstToCfg.prototype.generateFunctions = function generateFunctions() {
	var _this = this;
	var declarations = this.astObj.external_declarations;
	// generate functions
	this.preprocessed.functions = {};
	this.preprocessed.values = {};
	_.each(declarations, function (decl) {
	    if (decl.type !== 'function_definition') {
		return;
	    }
	    var funcDecl = decl.declaration;
	    var funcName = funcDecl.name;

	    // name args
	    var args = _.map(funcDecl.param_names, function (arg) {
		return nameHelper.getParameterName(funcName, arg);
	    });

	    var globals = _.extend(_.clone(_this.preprocessed.global),
				   _this.stdlibConstants);
	    var constants = {};
	    var protos = _.extend(_.clone(_this.preprocessed.prototypes),
				  _this.stdlib);

	    var envAndValues = envGenerator(decl, constants, globals, protos, _this.stdlibConstantsValues);
	    var env = envAndValues.env;

	    // add constants
	    var values = _.reduce(_.keys(envAndValues.constants), function (aku, val) {
		aku[envAndValues.constants[val]] = envHelper.decomposeConstantValue(val);
		return aku;
	    }, {});

	    // add step, build cfg
	    var funcStep = new Cfg({
		type: 'STEP',
		param: funcDecl.loc
	    });
	    var cfg = funcStep;
	    cfg.mergeLeft(cfgGenerator(decl.body));
	    
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
		returns: funcDecl.return_tvalue,
		args: args,
		env: env,
		cfg: cfg
	    };
	    _this.preprocessed.functions[funcDecl.name] = functionDesc;
	    _this.preprocessed.values = _.extend(_this.preprocessed.values, values);
	});
    };

    AstToCfg.prototype.getConverted = function getConverted() {
	return this.preprocessed;
    };

    AstToCfg.prototype.collectStdLibFunctions = function collectStdLibFunctions() {
	var colStdlib = stdlib.getStdLibFunctions();
	_.forOwn(colStdlib, function (value, key) {
	    colStdlib[key].name = key;
	});
	this.stdlib = colStdlib;
    };

    AstToCfg.prototype.collectStdLibConstants = function collectStdLibConstants() {
	var constants = {};
	var colStdlib = stdlib.getStdLibConstants();
	_.forOwn(colStdlib, function (value, key) {
	    constants[key] = { type: 'int' };
	});
	this.stdlibConstants = constants;
	this.stdlibConstantsValues = colStdlib;
    };

    AstToCfg.prototype.convert = function convert() {
	this.collectStdLibConstants();
	this.collectStdLibFunctions();
	this.retrieveGlobals();
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
