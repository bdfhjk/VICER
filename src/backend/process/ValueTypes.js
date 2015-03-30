define(function() {

    function IntValue(num) {
        this.value = num;
    }

    function CharValue(chr) {
        this.value = chr;
    }

    function FunctionValue(args, env, cfg) {
        this.args = args;
        this.env = env;
        this.cfg = cfg;
    }

    return {
        IntValue: IntValue,
        CharValue: CharValue,
        FunctionValue: FunctionValue
    };
});