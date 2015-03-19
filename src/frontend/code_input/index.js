define(["cm/lib/codemirror",
        "cm/mode/javascript/javascript",
        "cm/addon/selection/active-line",
        "cm/addon/edit/matchbrackets"], function(CodeMirror) {
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
				document.getElementById('codearea').style.width = Math.max(430, document.documentElement.clientWidth * 0.33);
			}
        });
