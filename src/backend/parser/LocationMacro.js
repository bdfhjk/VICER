function preprocessGrammar (parserGrammar) {
    var reg = /^(\w+)_\b/gm;
    var replacement = '$1\n    : $1_\n        { $$$$ = addloc($$1, @1, ops); }\n    ;\n\n$&';
    return parserGrammar.replace(reg, replacement);
}

module.exports = preprocessGrammar;
