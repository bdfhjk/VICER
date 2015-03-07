define(function() {
    require(["cm/lib/codemirror",
	         "cm/mode/javascript/javascript",
	         "cm/addon/selection/active-line",
	         "cm/addon/edit/matchbrackets"], function(CodeMirror) {
		CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
			theme: "solarized light",
			styleActiveLine: true,
			matchBrackets: true 
		});
    });
});
