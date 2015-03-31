define(['jquery'], function(){

    var last_type = -1;

    function addToConsole(type, text){
        $('#console-output').append('<br />');
        if (last_type != type){
            switch(type) {
                case "compile":
                    $('#console-output').append('<span class="console-label"><span class="label label-primary">Compiling... </span></span>');
                    break;
                case "run":
                    $('#console-output').append('<span class="console-label"><span class="label label-success">Running... </span></span>');
                    break;
                case "exception":
                    $('#console-output').append('<span class="console-label"><span class="label label-danger">Exception...</span></span>');
                    break;
            }
            last_type = type;
        }
        $('#console-output').append(text);

        //Scroll the textbox to the last line.
        $('#console-output').scrollTop($('#console-output')[0].scrollHeight - $('#console-output').height());
    }

    function clearConsole(){
        $('#console-output').html('Welcome to VIPER!');
        last_type = -1;
    }

    return {
        addToConsole: addToConsole,
        clearConsole: clearConsole
    };
});

