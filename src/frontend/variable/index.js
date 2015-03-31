define(["d3js"], function(){
  function draw(x, y, name, value, isnew) {
    var rectangle = svgContainer.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", 100)
      .attr("height", 20);

    var sampleText = svg.append("text")
      .text("a")
      .attr("x", x+20)
      .attr("y", y+10)
      .attr("font-family", "courier")
      .attr("size", "10px");

    var sampleText2 = svg.append("text")
      .text("5")
      .attr("x", x+20)
      .attr("y", y+70)
      .attr("font-family", "courier")
      .attr("size", "10px");
  }
  
  return {
    draw: draw
  };
});