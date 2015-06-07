define(function() {
    var SIZES = {
        pointer: 4,
        int: 4,
        char: 1
    };

    return function sizeof(type) {
        return SIZES[type];
    };
});