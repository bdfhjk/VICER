define(function() {

    function IntValue(num) {
        this.value = num;
    }

    function CharValue(chr) {
        this.value = chr;
    }

    function FunctionValue(returnType, args, env, cfg) {
        this.returnType = returnType;
        this.args = args;
        this.env = env;
        this.cfg = cfg;
    }

    function PointerValue(base, offset) {
        this.base = base;
        this.offset = offset;
    }

    return {
        IntValue: IntValue,
        CharValue: CharValue,
        FunctionValue: FunctionValue,
        PointerValue: PointerValue
    };
});