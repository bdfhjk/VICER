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

    stack.draw();
    variables.drawSector(variablesList, variablesSectors);
    lists.drawSector(listsList, listsSectors);
    tables.drawSector(tablesList, tablesSectors);
    trees.drawSector(treesList, treesSectors);
    pointers.drawSector(pointersList, pointersSectors);
    }

    function changeVariable() {}
    function changeList() {}
    function changeTable() {}
    function changeTree() {}
    function changePointer() {}
    function changeStack() {}

    function update(){
      sectorLimit = getHeight() / SECTOR_SIZE;
      useStack = false;

      var variablesDemand = variables.demand(variablesList, useStack),
          listsDemand = lists.demand(listsList, useStack),
          tablesDemand = tables.demand(tablesList, useStack),
          treesDemand = trees.demand(treesList, useStack),
          pointersDemand = pointers.demand(pointersList, useStack);

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

    update();
    redraw();
  });