define(["cm/lib/codemirror",
        "cm/mode/javascript/javascript",
        "cm/addon/selection/active-line",
        "cm/addon/edit/matchbrackets",
        "jquery",
        "bootstrap"], function(CodeMirror) {

    //CodeMirror plugin initialization.
	var cm = CodeMirror.fromTextArea(document.getElementById("code"), {
		lineNumbers: true,
		theme: "solarized light",
		styleActiveLine: true,
		matchBrackets: true,
		viewportMargin: Infinity,
		onUpdate: function(cm) {
			cm.setSize("100%", "100%");
		}
    });
	updateSize();
	window.addEventListener('resize', updateSize);

    //Scaling left part of interface (code input and buttons).
	function updateSize(){
        var w = window,
        dc = document,
        e = dc.documentElement,
        g = dc.getElementsByTagName('body')[0];
        x = e.clientWidth;
        y = e.clientHeight;

        var codeMinWidth = 430,
            codeScale = 0.33,
            codeMargin = 10,
            buttonsHeight = 55;

		document.getElementById('codearea').style.width = Math.max(codeMinWidth,
                                                                   document.documentElement.clientWidth * codeScale) - codeMargin;
		document.getElementById('codearea').style.height = y - buttonsHeight;
	}
    return cm;
});
