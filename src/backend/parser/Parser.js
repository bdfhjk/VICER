define(["viperc_parser"], function(parser) {
    function parse(source) {
        return parser.parse(source);
    }

    return parse;
});