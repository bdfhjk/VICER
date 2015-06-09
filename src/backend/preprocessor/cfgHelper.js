define([
    'lodash',
    './Errors',
    './Cfg'
], function (_, Errors, Cfg) {
    var cfgGenerator;

    function init(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
    }

    function computeAndCheckSubtrees(paramNode, decl) {
	return _.mapValues(decl, function (desc, name) {
	    if (!paramNode[name]) {
		return null;
	    }
	    return computeAndCheckType(desc.type, desc.lvalue, paramNode[name]);
	});
    }

    function computeAndCheckType(type, lvalue, node) {
	var cfg = cfgGenerator(node);

	if (typeof lvalue === 'boolean') {
	    if (lvalue && !cfg.lvalue) {
		throw new Errors.ExpectedLvalue(node);
	    }
	    if (!lvalue && cfg.lvalue) {
		var fetchInstr = new Cfg({
		    type: 'FETCH'
		});
		cfg.mergeLeft(fetchInstr);
	    }
	}
	
	// treat pure char as pure int
	if (cfg.tvalue && cfg.tvalue.type === 'char') {
	    cfg.tvalue.type = 'int';
	    cfg.pureChar = true;
	}

	if (Array.isArray(type)) {
	    type = _.map(type, function (t) { return t === 'char' ? 'int' : t; });
	} else if (typeof type === 'object' && type !== null) {
	    type.type = (type.type === 'char' ? 'int' : type.type);
	}

	// compare types
	var isMatching;
	if (Array.isArray(type)) {
	    isMatching = _.find(type, matchTypes.bind(null, cfg.tvalue));
	} else if (typeof type === 'object' && type !== null) {
	    isMatching = matchTypes(type, cfg.tvalue);
	} else {
	    isMatching = true;
	}
	if (!isMatching) {
	    throw new Errors.TypeMismatch(
		Errors.prettyPrintTypes(type),
		Errors.prettyPrintTypes(cfg.tvalue),
		node
	    );
	}
	
	return cfg;
    }

    function matchTypes(type1, type2) {
	if (_.includes(["pointer", "array"], type1.type) && // both are pointers or arrays
	    _.includes(["pointer", "array"], type2.type)) {
	    if ((type1.of && type2.of) && //  both have defined underlying types
		(type1.of.type !== type2.of.type) && // and underlying types don't match
		(type1.of.type !== 'void' && type2.of.type !== 'void')) { // and neither of them is void
		return false; // then they don't match, else they do
	    }
	} else if (type1.type !== type2.type || // if not pointer/array pair, simple check
		   type1.of && type2.of && type1.of.type !== type2.of.type) {
	    return false;
	}
	return true;
    }

    function noopIfEmpty(node) {
	if (!node) {
	    return new Cfg({
		type: 'NOOP'
	    });
	} else {
	    return node;
	}
    }

    return {
	init: init,
	computeAndCheckSubtrees: computeAndCheckSubtrees,
	computeAndCheckType: computeAndCheckType,
	matchTypes: matchTypes,
	noopIfEmpty: noopIfEmpty
    };
});
		
		
