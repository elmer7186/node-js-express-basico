/**
 * Example 02:
 * 
 * Implement local module (local-modules/my-log) for trace logs
 * 
 * APIS:
 * 
 * => http://localhost:4000/info
 * 
 *    -------------200---------------
 *    |        INFO: /info          |
 *    -------------------------------
 *    back-console => INFO: /info
 * 
 * => http://localhost:4000/error
 * 
 *    -------------200---------------
 *    |       ERROR: /error         |
 *    -------------------------------
 *    back-console => ERROR: /error
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/modules/02-log-local-module.ts
 */
import http from 'http';
import log from './local-modules/my-log';

var server = http.createServer((request, response): void => {

    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>HOME PAGE</p></body></html>')
        response.end();
    } else if (request.url === '/exit') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>BYE</p></body></html>')
        response.end();
    } else if (request.url === '/info') {
        var result = log.info('/info');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(result)
        response.end();
    } else if (request.url === '/error') {
        var result2 = log.error('/error');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(result2)
        response.end();
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Not Found</p></body></html>')
        response.end();
    }

});

server.listen(4000);

console.log('running on 4000');