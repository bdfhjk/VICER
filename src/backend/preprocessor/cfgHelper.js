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
		JSON.stringify(type, null, 2),
		JSON.stringify(cfg.tvalue, null, 2),
		node
	    );
	}
	
	return cfg;
    }

    function matchTypes(type1, type2) {
	if ((type1.type === 'pointer' && type2.type === 'array') || // case one
	    (type2.type === 'pointer' && type1.type === 'array')) {
	    if ((type1.of && type2.of) && type1.of.type !== type2.of.type) {
		return false; // pointers and arrays are matching
	    }
	} else if (type1.type !== type2.type || // if not pointer/array pair, simple check
		   type1.of && type2.of && type1.of.type !== type2.of.type) {
	    return false;
	}
	return true;
    }

    return {
	init: init,
	computeAndCheckSubtrees: computeAndCheckSubtrees,
	computeAndCheckType: computeAndCheckType,
	matchTypes: matchTypes
    };
});
		
		
