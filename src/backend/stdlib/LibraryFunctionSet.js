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
        "./stdlib/rand",
        "./stdlib/srand",
        "./stdlib/strtol",
        
        // string
        "./string/strcmp",
        "./string/strcpy",
        "./string/strlen"
    ], function(abs, feof, printf, scanf, sprintf, sscanf, atoi,
        rand, srand, strtol, strcmp, strcpy, strlen) {

        return {
            "abs": abs,
            "labs": abs,
            "feof": feof,
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