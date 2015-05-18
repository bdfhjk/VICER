define(function() {

    function abs(args) {
        return Math.abs(args.val);
    }

    abs.args = ["val"];
    abs.env = { 
        val: {
            type: "int"
        }
    };
    abs.returns = { type: "int" };

    return abs; 

});