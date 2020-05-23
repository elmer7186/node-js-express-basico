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
 *     node src/basic-examples/modules/04-thirdparty-module-countries.ts
 **/
import http from 'http';
import url from 'url';
import querystring from 'querystring';
import { info } from '../modules/local-modules/my-log-individual-export';
import { countries } from 'countries-list';

var server = http.createServer(function (request, response): void {

    var parsed = url.parse(request.url);
    var pathname: string = parsed.pathname;
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