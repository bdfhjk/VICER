define(function() {
    
    // void srand(int seed);
    
    function srand() {
        // do nothing, JS doesn't allow seeding
    }

    srand.args = ["seed"];
    srand.env = { 
        seed: {
            type: "int"
        }
    };
    srand.returns = { type: "void" };

    return srand;

});
