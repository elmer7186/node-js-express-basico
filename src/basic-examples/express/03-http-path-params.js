/**
 * app.get('/languages/:lang', (request, response) => {
 *  request.params.lang;
 * });
 * 
 * Permite recibir parametros en el path de la peticion.
 * 
 * ejemplo:
 * 
 * localhost:4000/languages/es
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/express/03-http-path-params.js
 */
const express = require('express');

const { languages } = require('countries-list');

const app = express();

app.get('/', (request, response) => {
    response.status(200).send('HELLO');
});

/** path params */
app.get('/languages/:lang', (request, response) => {
    console.log('request.params', request.params);
    const lang = languages[request.params.lang];
    if (lang) {
        response
            .json({
                status: 'OK',
                data: lang
            });
    } else {
        response
            .status(404)
            .json({
                status: 'NOT FOUND',
                message: `language ${request.params.lang} not found`
            })
    }
});

app.get('*', (request, response) => {
    response.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
    console.log('running on 4000');
});