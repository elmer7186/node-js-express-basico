/**
 * Example 03:
 * 
 * Implement local module but without include all in js file, only include individual methods
 * for this example only include 'info' from 'my-log-invidual-export'
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
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/modules/03-log-local-individual-module.ts
 */
import http from 'http';
import { info } './local-modules/my-log-individual-export';

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
        var result = info('/info');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(result)
        response.end();
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Not Found</p></body></html>')
        response.end();
    }

});

server.listen(4000);

console.log('running on 4000');