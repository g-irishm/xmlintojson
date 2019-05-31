# xmlintojson
This js converts xml string into json object

# Instruction
1. Include/Require the xmlintojson.js file
example - 
var converter = require('./xmlintojson.js');

2. Pass the xml string to the function and save the json object response
var xml = "<parent><child></child></parent>";
var json = converter(xml);