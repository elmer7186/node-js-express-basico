/**
 * Example 01:
 * 
 * Implement core library 'http' and create apis with this library
 * It is a basic way to create apis without use frameworks (for example express)
 * 
 * APIS:
 * 
 * => http://localhost:4000/
 * 
 *    -------------200---------------
 *    |           Hello             |
 *    -------------------------------
 * 
 * => http://localhost:4000/exit
 * 
 *    -------------200---------------
 *    |            Bye              |
 *    -------------------------------
 * 
 * => http://localhost:4000/bad-route
 * 
 *    -------------404---------------
 *    |         Not Found           |
 *    -------------------------------
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/modules/01-http-core-module.js
 */

var http = require('http');

var server = http.createServer((request, response) => {

    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Hello</p></body></html>')
        response.end();
    } else if (request.url === '/exit') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Bye</p></body></html>')
        response.end();
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Not Found</p></body></html>')
        response.end();
    }


});

server.listen(4000);

console.log('running on 4000');