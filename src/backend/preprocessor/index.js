define(["./Preprocessor"], function(pp) {
    function compile(tree) {
        return pp.createAstToCfg(tree).convert();
    }

    return {
        compile: compile
    };
});