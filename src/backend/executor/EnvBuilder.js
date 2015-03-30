define(function() {
    
    function build(environment, envTemplate) {
        for (var v in envTemplate) {
            environment.add(v, envTemplate[v]);
        }
    }

    return build;
    
});