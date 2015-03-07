requirejs.config({
    baseUrl: '.',
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },

    paths: {
        lib: '../bower_components',
        module: '../backend',
	jquery: "bower_components/jquery/dist/jquery.min",
	bootstrap: "bower_components/bootstrap/dist/js/bootstrap.min",
	cm: "bower_components/codemirror",
	htmlmixed: "bower_components/codemirror/mode/htmlmixed/htmlmixed"
    }
});

var backend;

function initBackend() {
    require(["jquery", "bootstrap", "backend/index"], function(be) {
        backend = be;
    });

    require(["cm/lib/codemirror",
	     "cm/mode/javascript/javascript",
	     "cm/addon/selection/active-line",
	     "cm/addon/edit/matchbrackets"], function(CodeMirror) {
        CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
	    theme: "solarized light",
	    styleActiveLine: true,
	    matchBrackets: true,
        });
    });
}

function init() {
    initBackend();
}

init();
