define([
        "./stdio/printf",
        "./stdio/scanf",
    ], function(printf, scanf) {
        return {
            "printf": printf,
            "scanf": scanf
        };
});