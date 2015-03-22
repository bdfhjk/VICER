define(["cm/lib/codemirror",
        "cm/mode/javascript/javascript",
        "cm/addon/selection/active-line",
        "cm/addon/edit/matchbrackets",
        "jquery"], function(CodeMirror) {
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
	function updateSize(){
        var w = window,
        dc = document,
        e = dc.documentElement,
        g = dc.getElementsByTagName('body')[0];
        x = e.clientWidth;
        y = e.clientHeight;
		document.getElementById('codearea').style.width = Math.max(430, document.documentElement.clientWidth * 0.33);
		document.getElementById('codearea').style.height = y - 55;
	}
});
