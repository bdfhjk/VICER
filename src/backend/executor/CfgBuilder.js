define(["./InstructionSet"], function(InstructionSet) {

    // cache to avoid cycles in loops
    var cache = {};

    function build(cfgTemplate) {
        cache = {};
        return buildNode(cfgTemplate, 0);
    }

    function buildNode(cfgTemplate, nodeId) {
        if (cache[nodeId]) {
            return cache[nodeId];
        }

        var templItem = cfgTemplate[nodeId];
        if (!templItem) {
            return;
        }
        var Instruction = InstructionSet[templItem.type];
        if (!Instruction) {
            throw new Error("Unknown VM instruction: " + templItem.type);
        }
        var node = new Instruction(templItem.param);
        cache[nodeId] = node;
        node.next = buildNode(cfgTemplate, templItem.next || (Number(nodeId) + 1));
        // for BRANCH instruction
        node.true = buildNode(cfgTemplate, templItem.true);
        node.false = buildNode(cfgTemplate, templItem.false);
        return node;
    }

    return build;
});