/**
 * app.get('/country', () => {
 *      request.query.code
 * });
 * 
 * Permite obtener los query params de una petición
 * ejemplo:
 * 
 * localhost:4000/country?code=CO
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/express/02-http-query-params.js
 */
const express = require('express');

const { info } = require('../modules/local-modules/my-log-individual-export');
const { countries } = require('countries-list');

const app = express();

app.get('/', (request, response) => {
    response.status(200).send('HELLO');
});

app.get('/info', (request, response) => {
    info('Hola info');
    response.send('info');
});

app.get('/country', (request, response) => {
    console.log('request', request.query);
    response.json(countries[request.query.code]);
});

app.get('*', (request, response) => {
    response.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
    console.log('running on 4000');
});