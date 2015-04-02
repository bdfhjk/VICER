define(["d3js", "variable"], function(_d3js, variable){
  function drawSector(svg, list, available_s, available_y, start_s) {
    var num_in_sec = Math.floor(available_y / 120);
    var number = Math.min(list.length, available_s * num_in_sec);

    for(i = 0; i < number; i++)
      variable.draw(svg, 10 + i % num_in_sec * 120,
                    start_s * 50 + Math.floor(i / num_in_sec) * 50 + 5,
                    list[i].name,
                    list[i].value,
                    list[i].isnew);
  }

  function demand(list, available_y){
    return Math.ceil(list.length * 120 / available_y);
  }

  return {
    drawSector: drawSector,
    demand: demand
  };
});