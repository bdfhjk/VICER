define(["./constants"], function(constants) {

    // int rand();
    
    function rand() {
        return Math.floor(Math.random() * constants.RAND_MAX);
    }

    rand.args = [];
    rand.env = {};
    rand.returns = { type: "int" };

    return rand;

});
