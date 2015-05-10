var isInNode = (typeof define !== "function");
var baseUrl = isInNode ? __dirname : "."; 

requirejs.config({
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    baseUrl: baseUrl,
    packages: [
        { name: 'when', location: '../bower_components/when', main: 'when' },
        { name: 'cm', location: '../bower_components/codemirror', main: 'codemirror'},
        { name: 'd3js', location: '../bower_components/d3', main: 'd3.min'},
        { name: 'jquery', location: '../bower_components/jquery/dist', main: 'jquery.min'},
        { name: 'bootstrap', location: '../bower_components/bootstrap/dist/js', main: 'bootstrap.min'},
        { name: 'sprintf', location: '../bower_components/sprintf/dist', main: 'sprintf.min'},
        { name: 'eventEmitter', location: '../bower_components/eventEmitter', main: 'EventEmitter.min'},
        { name: 'lodash', location: '../bower_components/lodash', main: 'lodash.min'},

        { name: 'mod_engine', location: 'backend/engine', main: 'index'},
        { name: 'mod_executor', location: 'backend/executor', main: 'index'},
        { name: 'mod_process', location: 'backend/process', main: 'index'},
        { name: 'mod_stdlib', location: 'backend/stdlib', main: 'index'},
        { name: 'mod_data_structures', location: 'backend/data_structures', main: 'index'},
        { name: 'mod_parser', location: 'backend/parser', main: 'index'},
	    { name: 'mod_preprocessor', location: 'backend/preprocessor', main: 'index'},

        { name: 'viperc_parser', location: 'parser', main: 'ansic'},

        { name: 'backend', location: 'backend', main: 'index'},
        { name: 'code_input', location: 'frontend/code_input', main: 'index'},
        { name: 'console', location: 'frontend/console', main: 'index'},
        { name: 'visualization', location: 'frontend/visualization', main: 'index'},
        { name: 'interface', location: 'frontend/interface', main: 'index'},

        { name: 'variables', location: 'frontend/data_structures/variables', main: 'index'},
        { name: 'lists', location: 'frontend/data_structures/lists', main: 'index'},
        { name: 'tables', location: 'frontend/data_structures/tables', main: 'index'},
        { name: 'trees', location: 'frontend/data_structures/trees', main: 'index'},
        { name: 'pointers', location: 'frontend/data_structures/pointers', main: 'index'},
        { name: 'stack', location: 'frontend/data_structures/stack', main: 'index'},
        { name: 'variable', location: 'frontend/visual_elements/variable', main: 'index'},
    ]
});

if (!isInNode) {
    require(["frontend/index"]);
}

DEBUG = {
    VM_INSTRUCTIONS: false,
    EXEC_STACK_OP: false,
    COMPILE_ERROR_STACK: false
};
