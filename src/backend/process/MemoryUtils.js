define(function() {

    function readStringPtr(memory, ptr) {
        return readString(memory, memory.at(ptr.base, ptr.offset));
    }

    function writeStringPtr(memory, ptr, string) {
        return writeString(memory, memory.at(ptr.base, ptr.offset), string);
    }

    function readString(memory, loc) {
        var str = "";
        var ch;
        var ptr = memory.getBaseAndOffset(loc);
        var id = ptr.offset;
        while ((ch = memory.fetch(memory.at(ptr.base, id++))) !== 0) {
            str += String.fromCharCode(ch);
        }
        return str;
    }

    function writeString(memory, loc, string) {
        string += '\0';
        var ptr = memory.getBaseAndOffset(loc);
        for (var i = 0; i < string.length; i++) {
            memory.assign(memory.at(ptr.base, i + ptr.offset), string.charCodeAt(i));
        }
    }

    return {
        readString: readString,
        writeString: writeString,
        readStringPtr: readStringPtr,
        writeStringPtr: writeStringPtr
    };

});