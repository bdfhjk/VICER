define(["console", "variable", "d3js"], function(my_console, variable){
    function drawSector(svg, list, available_s, available_y, start_s) {

      var cellMargin = 120,
          cellWidth = 100,
          cellHeight = 50;

      var num_in_sec = Math.floor(available_y / cellMargin);

      for(i = 0; i < list.length; i++){
          var over_limit = false; // If we need to cut the table display.
          if (list[i].values.length > num_in_sec)
              over_limit = true;

          var number_to_draw = list[i].values.length;
          if (over_limit)
              number_to_draw = num_in_sec - 1;

          for(j = 0; j < number_to_draw; j++){
              var name = j.toString();
              if (j === 0)
                  name = list[i].name;
              variable.draw(svg, 10 + j * cellWidth,
                            start_s * cellHeight + i * cellHeight + 5,
                            name,
                            list[i].values[j].value,
                            list[i].values[j].status);
          }

          if (over_limit)
              variable.draw(svg, 10 + number_to_draw * cellWidth,
                            start_s * cellHeight + i * cellHeight + 5,
                            "...",
                            "...",
                            "none");
        }
    }

    function demand(list, available_y){
        return list.length;
    }

    return {
        drawSector: drawSector,
        demand: demand
    };
});