define(["d3js",
        "variables",
        "tables",
        "console"], function(_d3js,
                             variables,
                             tables,
                             my_console){

  var variablesSectors = 0,
      tablesSectors = 0,
      VARIABLES_LIMIT = 6,
      TABLES_LIMIT = 3,
      MINIMAL_SIZE_X = 430,
      SIZE_RATIO_Y = 0.67,
      SIZE_RATIO_X = 0.75,
      SECTOR_SIZE = 50,
      variablesList = [],
      tablesList = [];

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
    tablesList = [];
    update();
    redraw();
    cleanCodeMark();
  }

  /* --------------- INTEFRACE IMPLEMENTATION --------------- */

    function changeVariable(name, value){
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
    function useVariable(name){
        var found = false;
        for (i = 0; i < variablesList.length; i++){
            if (variablesList[i].name == name){
                variablesList[i].status = "touched";
                found = true;
            }
        }
    }

    function deleteVariable(name){
        var found = false;
        for (i = 0; i < variablesList.length; i++){
            if (variablesList[i].name == name){
                variablesList[i].status = "touched";
                found = true;
                variablesList.splice(i, 1);
            }
        }
    }

    function deleteTable(name){
        for (i = 0; i < tablesList.length; i++) {
            if (tablesList[i].name == name){
                tablesList.splice(i, 1);
                return;
            }
        }
    }

    function cleanCodeMark(){
        var doc = $('.CodeMirror')[0].CodeMirror;
        var marks = doc.getAllMarks();
        marks.forEach(function(mark) {
            mark.clear();
        });
    }

    function changeActualSegment(startLine, startCharacter, endLine, endCharacter){
        var doc = $('.CodeMirror')[0].CodeMirror;
        cleanCodeMark();
        doc.markText({line:startLine, ch:startCharacter},
                     {line:endLine, ch:endCharacter},
                     {css:"background-color: #fe2"});
    }

    function createTable(tableName, size){
        var t_values = [];
        for (i = 0; i < size; i++){
            t_values[i] = {};
            t_values[i].value = "???";
            t_values[i].status = "modified";
        }
        tablesList.push({name: tableName, values: t_values});
    }

    function changeTableElement(tableName, id, value){
        var found = false;
        for (i = 0; i < tablesList.length; i++) {
            if (tablesList[i].name == tableName) {
                tablesList[i].values[id].value = value;
                tablesList[i].values[id].status = "modified";
                return;
            }
        }
    }

    function useTableElement(tableName, id) {
        var found = false;
        for (i = 0; i < tablesList.length; i++) {
            if (tablesList[i].name == tableName) {
                tablesList[i].values[id].status = "touched";
                return;
            }
        }
    }

    /* --------------- VISUAL UPDATE IMPLEMENTATION --------------- */

    function clearState() {
        for(i = 0; i < variablesList.length; i++){
            variablesList[i].status = "none";
        }
        for(i = 0; i < tablesList.length; i++){
            for(j = 0; j < tablesList[i].values.length; j++)
                tablesList[i].values[j].status = "none";
        }
    }

    //Redraw the display part. Need to call update first.
    function redraw() {
        d3.select("svg").remove();

        svg = d3.select("body").select("#display").append("svg")
            .attr("width", getWidth())
            .attr("height", getHeight());
        svg.attr("width", getWidth()).attr("height", getHeight());

        var position_y = 0;
        variables.drawSector(svg, variablesList, variablesSectors, getWidth(), position_y); position_y += variablesSectors;
        tables.drawSector(svg, tablesList, tablesSectors, getWidth(), position_y); position_y += tablesSectors;
    }

    //Function randomly using interface. Don't worry about internal errors, because it's not checking conditions.
    function testing() {
        changeVariable("test" + String(Math.floor((Math.random() * 6) + 1)),
                       Math.floor((Math.random() * 100000000) + 1));
        useVariable("test" + String(Math.floor((Math.random() * 6) + 1)));
        changeActualSegment(Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)),
                            Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)));
        changeTable("TestTable", [1,1,1,1,1,1,1,Math.floor((Math.random() * 6))]);
    }

    function finishExecution(exitCode) {
        my_console.addToConsole("run", "Program finished execution with exit code " + exitCode);
    }

    //Update the internal structure of visualization.
    function update() {
        sectorLimit = getHeight() / SECTOR_SIZE;
        useStack = false;

        var variablesDemand = variables.demand(variablesList, getWidth()),
            tablesDemand = tables.demand(tablesList, getWidth());

        tablesSectors = Math.min(tablesDemand, sectorLimit);
        tablesSectors = Math.min(tablesSectors, TABLES_LIMIT);
        sectorLimit -= tablesSectors;

        variablesSectors = Math.min(variablesDemand, sectorLimit);
        variablesSectors = Math.min(variablesSectors, VARIABLES_LIMIT);
        sectorLimit -= variablesSectors;

        if(sectorLimit > 0 && tablesSectors != tablesDemand){
            tablesSectors   += tablesDemand;
            sectorLimit     -= tablesDemand;
        }

        if(sectorLimit > 0 && variablesSectors != variablesDemand){
            variablesSectors += variablesDemand;
            sectorLimit      -= variablesDemand;
        }
    }

    window.onresize = redraw;
    return {
        update: update,
        redraw: redraw,
        clearState: clearState,
        clean: clean,
        cleanCodeMark: cleanCodeMark,
        changeActualSegment: changeActualSegment,
        useVariable: useVariable,
        changeVariable: changeVariable,
        createTable: createTable,
        useTableElement: useTableElement,
        changeTableElement: changeTableElement,
        finishExecution: finishExecution,
        deleteVariable: deleteVariable,
        deleteTable: deleteTable
        };
  });
