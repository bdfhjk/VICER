define(["d3js", "variable", "console"], function(_d3js, variable, my_console){
  function drawSector(svg, list, available_s, available_y, start_s) {

    var cellMargin = 120,
        cellHeight = 50;

    var num_in_sec = Math.floor(available_y / cellMargin);
    var number = Math.min(list.length, available_s * num_in_sec);

    for(i = 0; i < number; i++){
      variable.draw(svg, 10 + i % num_in_sec * cellMargin,
                    start_s * cellHeight + Math.floor(i / num_in_sec) * cellHeight + 5,
                    list[i].name,
                    list[i].value,
                    list[i].status);
      }
  }

  function demand(list, available_y){
    var cellMargin = 120;

    return Math.ceil(list.length * cellMargin / available_y);
  }

  return {
    drawSector: drawSector,
    demand: demand
  };
});