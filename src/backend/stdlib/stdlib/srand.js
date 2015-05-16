define(function() {
    
    function srand() {
        // do nothing, JS doesn't allow seeding
    }

    srand.args = [{ type: "int" }];
    srand.returns = { type: "void" };

    return srand;

});
