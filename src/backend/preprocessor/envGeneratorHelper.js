define(['lodash', 'string', './nameHelper'], function(_, S, nameHelper) {
    function generateGlobalContext(env, constants, globals, decls, funcName) {
	return {
	    env: env,
	    constants: constants,
	    globals: globals,
	    decls: decls,
	    funcName: funcName
	};
    }
    
    function getEntityByName(name, nameDict, globalContext) {
	return getVariableByName(name, nameDict, globalContext) ||
	       getFunctionByName(name, nameDict, globalContext);
    }

    function getVariableByName(name, nameDict, globalContext) {
	if (nameDict[name]) { // is a local variable?
	    return {
		name: nameDict[name],
		type: globalContext.env[nameDict[name]]
	    };
	} else if (globalContext.globals[name]) { // is a global variable?
	    return {
		name: name,
		type: globalContext.globals[name]
	    };
	} else if ((_.invert(globalContext.constants))[name]) { // is a constant?
	    return {
		name: name,
		type: getTypeFromConstantValue((_.invert(globalContext.constants))[name])
	    };

	} else { // name unknown?
	    return;
	}
    }

    function getFunctionByName(name, globalContext) {
	return globalContext.decls[name];
    }

    function getOrSetConstantByValue(value, type, globalContext, prefix) {
	var compVal = S('{{type}}|{{value}}').template({
	    type: type,
	    value: value
	});

	if (!globalContext.constants[compVal]) {
	    var constNum = _.size(globalContext.constants);
	    globalContext.constants[compVal] = nameHelper.getConstantName(prefix, constNum);
	}
	return globalContext.constants[compVal];
    }

    function decomposeConstantValue(value) {
	if (S(value).startsWith('int|')) {
	    return Number(S(value).replaceAll('int|', '').s);
	} else if (S(value).startsWith('char|')) {
	    return S(value).replaceAll('char|', '').s;
	} else if (S(value).startsWith('literal|')) {
	    return S(value).replaceAll('literal|', '').s;
	}
    }

    function getTypeFromConstantValue(value) {
	return value.substring(0, value.indexOf('|'));
    }

    function createEnvEntry(tvalue) {
	if (tvalue.type === 'concrete_type') {
	    return {
		type: tvalue.name
	    };
	} else if (tvalue.type === 'pointer') {
	    if (tvalue.of) { // doesn't need conversion
		return tvalue;
	    }
	    return {
		type: 'pointer',
		of: {
		    type: tvalue.tvalue.name
		}
	    };
	} else { // doesn't need conversion
	    return tvalue;
	}
    }

    return {
	generateGlobalContext: generateGlobalContext,
	getEntityByName: getEntityByName,
	getVariableByName: getVariableByName,
	getFunctionByName: getFunctionByName,
	getOrSetConstantByValue: getOrSetConstantByValue,
	decomposeConstantValue: decomposeConstantValue,
	getTypeFromConstantValue: getTypeFromConstantValue,
	createEnvEntry: createEnvEntry
    };
});
