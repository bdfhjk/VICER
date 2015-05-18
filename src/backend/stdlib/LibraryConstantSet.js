define(["./stdlib/constants", "./stdio/constants", "./limits/constants"], function(stdlib, stdio, limits) {
    return {
        // stdlib
        RAND_MAX: stdlib.RAND_MAX,
        NULL: stdlib.NULL,
        // stdio
        stdin: stdio.stdin,
        // limits
        CHAR_BIT: limits.CHAR_BIT,
        CHAR_MIN: limits.CHAR_MIN,
        CHAR_MAX: limits.CHAR_MAX,
        INT_MIN: limits.INT_MIN,
        INT_MAX: limits.INT_MAX
    };
});