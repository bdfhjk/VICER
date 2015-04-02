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

        { name: 'mod_engine', location: 'backend/engine', main: 'index'},
        { name: 'mod_executor', location: 'backend/executor', main: 'index'},
        { name: 'mod_process', location: 'backend/process', main: 'index'},
        { name: 'mod_data_structures', location: 'backend/data_structures', main: 'index'},
        { name: 'mod_parser', location: 'backend/parser', main: 'index'},

        { name: 'backend', location: 'backend', main: 'index'},
        { name: 'code_input', location: 'frontend/code_input', main: 'index'},
        { name: 'console', location: 'frontend/console', main: 'index'},
        { name: 'visualization', location: 'frontend/visualization', main: 'index'},
        { name: 'interface', location: 'frontend/interface', main: 'index'},

        { name: 'variables', location: 'frontend/variables', main: 'index'},
        { name: 'lists', location: 'frontend/lists', main: 'index'},
        { name: 'tables', location: 'frontend/tables', main: 'index'},
        { name: 'trees', location: 'frontend/trees', main: 'index'},
        { name: 'pointers', location: 'frontend/pointers', main: 'index'},
        { name: 'stack', location: 'frontend/stack', main: 'index'},
        { name: 'variable', location: 'frontend/variable', main: 'index'},
    ]
});

if (!isInNode) {
    require(["frontend/index"]);
}

DEBUG = {
    VM_INSTRUCTIONS: false
};
