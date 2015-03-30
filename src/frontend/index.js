requirejs.config({
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    packages: [
        { name: 'when', location: '../bower_components/when', main: 'when' },
        { name: 'mod_engine', location: '../backend/engine', main: 'index'},
        { name: 'mod_executor', location: '../backend/executor', main: 'index'},
        { name: 'mod_process', location: '../backend/process', main: 'index'},
        { name: 'mod_data_structures', location: '../backend/data_structures', main: 'index'},
        { name: 'mod_parser', location: '../backend/parser', main: 'index'},
        { name: 'cm', location: '../bower_components/codemirror', main: 'codemirror'},
        { name: 'backend', location: '../backend', main: 'index'},
        { name: 'code_input', location: 'code_input', main: 'index'},
        { name: 'visualization', location: 'visualization', main: 'index'},
        { name: 'd3js', location: '../bower_components/d3', main: 'd3.min'}
    ]
});

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
        var proc = Executor.createProcess({
            a: { type: "int" }
        }, {
            main: { 
                returns: { type: "void" },
                args: [],
                env: {
                    b: { type: "int" }
                },
                cfg: {
                    "0": {
                        "type": "RESOLVE",
                        "param": "a",
                    },
                    "1": {
                        "type": "PUT",
                        "param": 2
                    },
                    "2": {
                        "type": "ASSIGN"
                    },
                    "3": {
                        "type": "RESOLVE",
                        "param": "b",
                    },
                    "4": {
                        "type": "PUT",
                        "param": 3
                    },
                    "5": {
                        "type": "ASSIGN"
                    },
                    "6": {
                        "type": "RESOLVE",
                        "param": "a",
                    },
                    "7": {
                        "type": "FETCH"
                    },
                    "8": {
                        "type": "RESOLVE",
                        "param": "b",
                    },
                    "9": {
                        "type": "FETCH"
                    },
                    "10": {
                        "type": "ADD"
                    },
                    "11": {
                        "type": "RETURN"
                    }
                }
            },

            countSomething: {
                returns: { type: "int" },
                args: [],
                env: {},
                cfg: {
                    "0": {
                        "type": "PUT",
                        "param": 42
                    },
                    "1": {
                        "type": "RETURN"
                    }
                }
            }
        });

        for (var i=0; i<12; i++)
            Executor.executeNext(proc);
    });
}

runSampleProgram();