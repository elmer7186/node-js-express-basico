/**
 * Ejemplo básico con http express
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/express/01-http-service.js
 */
const express = require('express');

const { info } = require('../modules/local-modules/my-log-individual-export');

const app = express();

app.get('/', (request, response) => {
    response.status(200).send('HELLO');
});

app.get('/info', (request, response) => {
    info('Hola info');
    response.send('info');
});

app.get('*', (request, response) => {
    response.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
    console.log('running on 4000');
});