var express = require("express");

var app = express();

// New call to compress content
// app.use(express.compress());
//
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/assets'));
//
var port = process.env.PORT || 3000;
app.listen(port);
console.log("VIPER server is listening on port " + port);
