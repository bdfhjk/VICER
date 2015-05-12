define(["d3js",
        "variables",
        "lists",
        "tables",
        "pointers",
        "trees",
        "stack",
        "console"], function(_d3js,
                           variables,
                           lists,
                           tables,
                           pointers,
                           trees,
                           stack,
                           my_console){

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

  /* --------------- HELPERS --------------- */

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

  function clean(){
    variablesList = [];
    listsList = [];
    tablesList = [];
    treesList = [];
    pointersList = [];
    update();
    redraw();
  }

  /* --------------- INTEFRACE IMPLEMENTATION --------------- */

    function changeVariable(name, value) {
      var found = false;
      for (i = 0; i < variablesList.length; i++){
        if (variablesList[i].name == name){
          variablesList[i].value = value;
          variablesList[i].status = "modified";
          found = true;
        }
      }
      if (!found)
        variablesList.push({name: name, value: value, status: "modified"});
    }

    // When the variable was used, it will be displayed in separate color.
    function useVariable(name) {
      var found = false;
      for (i = 0; i < variablesList.length; i++){
        if (variablesList[i].name == name){
          variablesList[i].status = "touched";
          found = true;
        }
      }
      if (!found)
        my_console.addToConsole('exception', "Internal exception #1 " + name);
    }

    function deleteVariable(name) {
      var found = false;
      for (i = 0; i < variablesList.length; i++){
        if (variablesList[i].name == name){
          variablesList[i].status = "touched";
          found = true;
          variablesList.splice(i, 1);
        }
      }
      if (!found)
        my_console.addToConsole('exception', "Internal exception #2");
    }

    function changeActualSegment(startLine, startCharacter, endLine, endCharacter){
      var doc = $('.CodeMirror')[0].CodeMirror;
      var marks = doc.getAllMarks();
      if (marks.length !== 0) {
        marks[0].clear();
      }
      doc.markText({line:startLine, ch:startCharacter},
                   {line:endLine, ch:endCharacter},
                   {css:"color: #fe3"});
    }

    function changeTable(tableName, values) {
      var found = false;
      for (i = 0; i < tablesList.length; i++){
        if (tablesList[i].name == tableName){
          for(j = 0; j < tablesList[i].values.length; j++){
            if (tablesList[i].values[j].value != values[j]){
              tablesList[i].values[j].value = values[j];
              tablesList[i].values[j].status = "modified";
            }
          }
          found = true;
        }
      }

      if (!found){
        var t_values = [];
        for(i = 0; i < values.length; i++){
          t_values[i] = {};
          t_values[i].value = values[i];
          t_values[i].status = "modified";
        }
        tablesList.push({name: tableName, values: t_values});
      }
    }

    function changeList() {}    //Stub
    function changeTree() {}    //Stub
    function changePointer() {}   //Stub
    function changeStack() {}   //Stub

    /* --------------- VISUAL UPDATE IMPLEMENTATION --------------- */

    function clearState() {
      for(i = 0; i < variablesList.length; i++){
        variablesList[i].status = "none";
      }
      for(i = 0; i < listsList.length; i++){}
      for(i = 0; i < tablesList.length; i++){
        for(j = 0; j < tablesList[i].values.length; j++)
          tablesList[i].values[j].status = "none";
      }
      for(i = 0; i < treesList.length; i++){}
      for(i = 0; i < pointersList.length; i++){}
    }

    //Redraw the display part. Need to call update first.
    function redraw(){
      d3.select("svg").remove();

      svg = d3.select("body").select("#display").append("svg")
        .attr("width", getWidth())
        .attr("height", getHeight());
      svg.attr("width", getWidth()).attr("height", getHeight());

      stack.draw(svg);
      var position_y = 0;
      variables.drawSector(svg, variablesList, variablesSectors, getWidth(), position_y); position_y += variablesSectors;
      lists.drawSector(svg, listsList, listsSectors, getWidth(), position_y); position_y += listsSectors;
      tables.drawSector(svg, tablesList, tablesSectors, getWidth(), position_y); position_y += tablesSectors;
      trees.drawSector(svg, treesList, treesSectors, getWidth(), position_y); position_y += treesSectors;
      pointers.drawSector(svg, pointersList, pointersSectors, getWidth(), position_y);
    }

    //Function randomly using interface. Don't worry about internal errors, because it's not checking conditions.
    function testing(){
      changeVariable("test" + String(Math.floor((Math.random() * 6) + 1)),
                     Math.floor((Math.random() * 100000000) + 1));
      useVariable("test" + String(Math.floor((Math.random() * 6) + 1)));
      changeActualSegment(Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)));
      changeTable("TestTable", [Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6))]);
    }

    //Update the internal structure of visualization.
    function update(){

      //Testing interface. To be removed in production.
      testing();

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
    return {update: update, redraw: redraw, clearState: clearState, clean: clean};
  });
