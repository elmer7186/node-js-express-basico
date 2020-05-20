/**
 * Example 04:
 * 
 * Use npm for install library 'contrie's (npm install contries-list) and use this on the proyect
 * 
 * APIS:
 * 
 * => http://localhost:4000/country?code=CO
 * 
 *    -------------200-------------------
 *    |  <json country CO information>  |
 *    -----------------------------------
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/modules/04-thirdparty-module-countries.js
 **/
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var { info } = require('../modules/local-modules/my-log-individual-export');
var { countries } = require('countries-list');

var server = http.createServer(function (request, response) {

    var parsed = url.parse(request.url);
    var pathname = parsed.pathname;
    var query = querystring.parse(parsed.query);

    if (pathname === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>HOME PAGE</p></body></html>')
        response.end();
    } else if (pathname === '/exit') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>BYE</p></body></html>')
        response.end();
    } else if (pathname === '/info') {
        var result = info('/info');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(result)
        response.end();
    } else if (pathname === '/country') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Not Found</p></body></html>')
        response.end();
    }

});

server.listen(4000);

console.log('running on 4000');