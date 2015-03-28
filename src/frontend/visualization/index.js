define(["d3js"], function(){
    function updateWindow(){
        var w = window,
        dc = document,
        e = dc.documentElement,
        g = dc.getElementsByTagName('body')[0];
        x = e.clientWidth;
        y = e.clientHeight;

        width = Math.min(x - 430, x * 0.67);
        height = y * 0.75;

        d3.select("svg").remove();

        svg = d3.select("body").select("#display").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.attr("width", width).attr("height", height);

        var circle = svg.append("circle")
            .attr("cx", 25)
            .attr("cy", 40)
            .attr("r", 20);

        var sampleText = svg.append("text")
            .text("a")
            .attr("x", 20)
            .attr("y", 10)
            .attr("font-family", "courier")
            .attr("size", "10px");

        var sampleText2 = svg.append("text")
            .text("5")
            .attr("x", 20)
            .attr("y", 70)
            .attr("font-family", "courier")
            .attr("size", "10px");
    }
    window.onresize = updateWindow;
    updateWindow();
});
