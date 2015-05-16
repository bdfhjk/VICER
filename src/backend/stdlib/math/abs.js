define(function() {

    function abs(args) {
        return Math.abs(args[0]);
    }

    abs.args = [ { type: "int" }];
    abs.returns = { type: "int" };

    return abs; 

});