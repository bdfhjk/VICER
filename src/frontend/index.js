
/* Just a mock-up. */
function runSampleProgram() {
    /*
        int a;
        void main() {
            int b;
            a = 2;
            b = 3;
            return a + b;
        }
    */
    require(["mod_executor/Executor"], function(Executor) {
        var proc = Executor.createProcess();

        for (var i=0; i<12; i++)
            Executor.executeNext(proc);
    });
}

runSampleProgram();