/* Just a mock-up */
define(["d3js"], function(){

    
    updateWindow();

    function redraw() {
      path = path
          .data(voronoi(vertices), polygon);

      path.exit().remove();

      path.enter().append("path")
          .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
          .attr("d", polygon);

      path.order();
    }

    function polygon(d) {
      return "M" + d.join("L") + "Z";
    }

    function updateWindow(){

      var w = window,
      dc = document,
      e = dc.documentElement,
      g = dc.getElementsByTagName('body')[0];
      
      x = e.clientWidth;//w.innerWidth || e.clientWidth || g.clientWidth;
      y = e.clientHeight;//w.innerHeight|| e.clientHeight|| g.clientHeight;

      width = Math.min(x - 430, x * 0.67);
      height = y * 0.75;

      vertices = d3.range(100).map(function(d) {
        return [Math.random() * width, Math.random() * height];
      });

      voronoi = d3.geom.voronoi()
          .clipExtent([[0, 0], [width, height]]);

      d3.select("svg").remove();

      svg = d3.select("body").select("#display").append("svg")
          .attr("width", width)
          .attr("height", height)
          .on("mousemove", function() { vertices[0] = d3.mouse(this); redraw(); });

      path = svg.append("g").selectAll("path")
		  .attr("width", width)
          .attr("height", height);

      svg.selectAll("circle")
          .data(vertices.slice(1))
          .enter().append("circle")
          .attr("transform", function(d) { return "translate(" + d + ")"; })
          .attr("r", 1.5);

      svg.attr("width", width).attr("height", height);
      
      redraw();
    }
    window.onresize = updateWindow;

});
