define(['jquery'], function(){

    var last_type = -1;

    function addToConsole(type, text){
            $('.jumbotron').append('<br />');
        if (last_type != type){
            switch(type) {
                case "compile":
                    $('.jumbotron').append('<span class="console-label"><span class="label label-primary">Compiling... </span></span>');
                    break;
                case "run":
                    $('.jumbotron').append('<span class="console-label"><span class="label label-success">Running... </span></span>');
                    break;
                case "exception":
                    $('.jumbotron').append('<span class="console-label"><span class="label label-danger">Exception...</span></span>');
                    break;
            }
            last_type = type;
        }
        $('.jumbotron').append(text);
        $('.jumbotron').scrollTop($('.jumbotron')[0].scrollHeight - $('.jumbotron').height());
    }

    function clearConsole(){
        $('.jumbotron').html('Welcome to VIPER!');
        last_type = -1;
    }

    return {
        addToConsole: addToConsole,
        clearConsole: clearConsole
    };
});

