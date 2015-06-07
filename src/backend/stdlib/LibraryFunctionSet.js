define([
        // math
        "./math/abs",
        
        // stdio
        "./stdio/feof",
        "./stdio/printf",
        "./stdio/scanf",
        "./stdio/sprintf",
        "./stdio/sscanf",
        
        // stdlib
        "./stdlib/atoi",
        "./stdlib/free",
        "./stdlib/rand",
        "./stdlib/srand",
        "./stdlib/strtol",
        
        // string
        "./string/strcmp",
        "./string/strcpy",
        "./string/strlen"
    ], function(abs, feof, printf, scanf, sprintf, sscanf, atoi,
        free, rand, srand, strtol, strcmp, strcpy, strlen) {

        return {
            "abs": abs,
            "labs": abs,
            "feof": feof,
            "free": free,
            "printf": printf,
            "scanf": scanf,
            "sprintf": sprintf,
            "sscanf": sscanf,
            "atoi": atoi,
            "atol": atoi,
            "rand": rand,
            "srand": srand,
            "strtol": strtol,
            "strcmp": strcmp,
            "strcpy": strcpy,
            "strlen": strlen
        };
});