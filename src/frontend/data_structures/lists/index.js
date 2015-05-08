define(["d3js", "variable"], function(){
  function drawSector(svg, list, available_s, available_y, start_s) {}

  function demand(list, available_y){
    return list.length;
  }

  return {
    drawSector: drawSector,
    demand: demand
  };
});