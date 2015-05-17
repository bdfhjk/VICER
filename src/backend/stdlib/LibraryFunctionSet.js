define([
        "./stdio/printf",
        "./stdio/scanf",
        "./math/abs",
        "./stdlib/rand",
        "./stdlib/srand",
        "./stdlib/atoi",
        "./stdlib/strtol",
    ], function(printf, scanf, abs, rand, srand, atoi, strtol) {
        return {
            "abs": abs,
            "atoi": atoi,
            "atol": atoi,
            "labs": abs,
            "rand": rand,
            "srand": srand,
            "strtol": strtol,
            "printf": printf,
            "scanf": scanf,
        };
});