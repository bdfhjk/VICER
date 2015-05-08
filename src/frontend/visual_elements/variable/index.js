define(["console", "d3js"], function(my_console){
  function draw(svg, x, y, name, value, status) {

    var rectangle = svg.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", 100)
      .attr("height", 20)
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('stroke', '#2378ae')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', '4')
      .attr("shape-rendering", "geometricPrecision");

    value_s = String(value);

    // Removing overlaping parts
    if (value_s.length >= 10)
      value_s = value_s.substring(0, 5) + "...";

    // Centering
    var value_xs = 50 - value_s.length * 10 / 2 + 5;

    var color = "Black";
    if (status == "modified")
      color = "Red";
    if (status == "touched")
      color = "GoldenRod";

    var sampleText = svg.append("text")
      .text(value_s)
      .attr("x", x+value_xs)
      .attr("y", y+16)
      .attr("font-family", "monospace")
      .attr("fill", color)
      .attr("size", "10px");

    name_s = String(name);

    // Removing overlaping parts
    if (name_s.length >= 10)
      name_s = name_s.substring(0, 5) + "...";

    // Centering
    var name_xs = 50 - name_s.length * 10 / 2 + 5;

    var sampleText2 = svg.append("text")
      .text(name_s)
      .attr("x", x+name_xs)
      .attr("y", y+35)
      .attr("font-family", "monospace")
      .attr("size", "10px");
  }

  return {
    draw: draw
  };
});
