/**
 * Ejemplo básico con http express
 * 
 * - Ejecutar desde el directorio raíz:
 * 
 *     node src/basic-examples/express/01-http-service.ts
 */
import express, { Application, Request, Response } from 'express';

import { info } from '../modules/local-modules/my-log-individual-export';

const app: Application = express();

app.get('/', (request: Request, response: Response): void => {
    response.status(200).send('HELLO');
});

app.get('/info', (request: Request, response: Response): void => {
    info('Hola info');
    response.send('info');
});

app.get('*', (request: Request, response: Response): void => {
    response.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
    console.log('running on 4000');
});