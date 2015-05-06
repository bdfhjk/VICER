define(function() {

    function ptrToString(memory, ptr) {
        var str = "";
        var ch;
        var id = ptr.offset;
        while ((ch = memory.fetch(memory.at(ptr.base, id++))) !== 0) {
            str += String.fromCharCode(ch);
        }
        return str;
    }

    return {
        ptrToString: ptrToString
    };
    
});