define(["d3js",
        "variables",
        "lists",
        "tables",
        "pointers",
        "trees",
        "stack"], function(_d3js,
                           variables,
                           lists,
                           tables,
                           pointers,
                           trees,
                           stack){

  var variablesSectors = 0,
      listsSectors = 0,
      tablesSectors = 0,
      treesSectors = 0,
      pointersSectors = 0,
      VARIABLES_LIMIT = 6,
      LISTS_LIMIT = 3,
      TABLES_LIMIT = 3,
      TREES_LIMIT = 6,
      POINTERS_LIMIT = 3,
      MINIMAL_SIZE_X = 430,
      SIZE_RATIO_Y = 0.67,
      SIZE_RATIO_X = 0.75,
      SECTOR_SIZE = 50,
      variablesList = [],
      listsList = [],
      tablesList = [],
      treesList = [],
      pointersList = [];

  function getWidth(){
    var w = window,
    dc = document,
    e = dc.documentElement;

    return Math.min(e.clientWidth - MINIMAL_SIZE_X, e.clientWidth * SIZE_RATIO_Y);
  }

  function getHeight(){
    var w = window,
    dc = document,
    e = dc.documentElement;

    return e.clientHeight * SIZE_RATIO_X;
  }

  function redraw(){
    d3.select("svg").remove();

    svg = d3.select("body").select("#display").append("svg")
      .attr("width", getWidth())
      .attr("height", getHeight());
    svg.attr("width", getWidth()).attr("height", getHeight());

    stack.draw(svg);
    variables.drawSector(svg, variablesList, variablesSectors, getWidth(), 0);
    lists.drawSector(svg, listsList, listsSectors);
    tables.drawSector(svg, tablesList, tablesSectors);
    trees.drawSector(svg, treesList, treesSectors);
    pointers.drawSector(svg, pointersList, pointersSectors);
    }

    function changeVariable(name, value) {
      var found = false;
      for (i = 0; i < variablesList.length; i++){
        if (variablesList[i].name == name){
          variablesList[i].value = value;
          variablesList[i].isnew = true;
          found = true;
        }
      }
      if (!found)
        variablesList.push({name: name, value: value, isnew: true});
    }

    function changeList() {}
    function changeTable() {}
    function changeTree() {}
    function changePointer() {}
    function changeStack() {}

    function clearState() {
      for(i = 0; i < variablesList.length; i++){
        variablesList[i].isnew = false;
      }
      for(i = 0; i < listsList.length; i++){
        variablesList[i].isnew = false;
      }
      for(i = 0; i < tablesList.length; i++){
        variablesList[i].isnew = false;
      }
      for(i = 0; i < treesList.length; i++){
        variablesList[i].isnew = false;
      }
      for(i = 0; i < pointersList.length; i++){
        variablesList[i].isnew = false;
      }
    }

    function update(){
      // just for test
      changeVariable("test" + String(Math.floor((Math.random() * 6) + 1)),
                     Math.floor((Math.random() * 100000000) + 1));

      sectorLimit = getHeight() / SECTOR_SIZE;
      useStack = false;

      var variablesDemand = variables.demand(variablesList, getWidth()),
          listsDemand = lists.demand(listsList, getWidth()),
          tablesDemand = tables.demand(tablesList, getWidth()),
          treesDemand = trees.demand(treesList, getWidth()),
          pointersDemand = pointers.demand(pointersList, getWidth());

      pointersSectors = Math.min(pointersDemand, sectorLimit);
      pointersSectors = Math.min(pointersSectors, POINTERS_LIMIT);
      sectorLimit -= pointersSectors;

      treesSectors = Math.min(treesDemand, sectorLimit);
      treesSectors = Math.min(treesSectors, TREES_LIMIT);
      sectorLimit -= treesSectors;

      tablesSectors = Math.min(tablesDemand, sectorLimit);
      tablesSectors = Math.min(tablesSectors, TABLES_LIMIT);
      sectorLimit -= tablesSectors;

      listsSectors = Math.min(listsDemand, sectorLimit);
      listsSectors = Math.min(listsSectors, LISTS_LIMIT);
      sectorLimit -= listsSectors;

      variablesSectors = Math.min(variablesDemand, sectorLimit);
      variablesSectors = Math.min(variablesSectors, VARIABLES_LIMIT);
      sectorLimit -= variablesSectors;

      if(sectorLimit > 0 && pointersSectors != pointersDemand){
        pointersSectors += pointersDemand;
        sectorLimit     -= pointersDemand;
      }

      if(sectorLimit > 0 && treesSectors != treesDemand){
        treesSectors    += treesDemand;
        sectorLimit     -= treesDemand;
      }

      if(sectorLimit > 0 && tablesSectors != tablesDemand){
        tablesSectors   += tablesDemand;
        sectorLimit     -= tablesDemand;
      }

      if(sectorLimit > 0 && listsSectors != listsDemand){
        listsSectors    += listsDemand;
        sectorLimit     -= listsDemand;
      }

      if(sectorLimit > 0 && variablesSectors != variablesDemand){
        variablesSectors += variablesDemand;
        sectorLimit      -= variablesDemand;
      }
    }

    window.onresize = redraw;
    return {update: update, redraw: redraw, clearState: clearState};
  });