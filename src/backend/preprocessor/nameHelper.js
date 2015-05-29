define(['string'], function (S) {
    function getParameterName(funcName, paramName) {
	return S('{{funcName}}_PARAMETER|{{paramName}}').template({
	    funcName: funcName,
	    paramName: paramName
	}).s;
    }

    function getConstantName(prefix, constantNum) {
	return S('{{prefix}}_CONSTANT|{{constantNum}}').template({
	    prefix: prefix,
	    constantNum: S(constantNum).s
	}).s;
    }

    function getVariableName(prefix, varName) {
	return S('{{prefix}}|{{varName}}').template({
	    prefix: prefix,
	    varName: varName
	}).s;
    }

    function getBlockPrefix(prefix, blockType, blockNum) {
	return S('{{prefix}}_{{blockType}}{{blockNum}}').template({
	    prefix: prefix,
	    blockType: blockType,
	    blockNum: S(blockNum).s
	}).s;
    }

    return {
	getParameterName: getParameterName,
	getConstantName: getConstantName,
	getVariableName: getVariableName,
	getBlockPrefix: getBlockPrefix
    };
});
