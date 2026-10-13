require('dotenv').config();

const http = require('http');

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 3000;
const APP_NAME = process.env.APP_NAME || 'HTTP Service';
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;

        res.end(JSON.stringify({
            message: `Welcome to ${APP_NAME}`,
            environment: NODE_ENV
        }));

    } else if (req.url === '/demo' && req.method === 'GET') {
        res.statusCode = 200;

        res.end(JSON.stringify({
            status: 'OK',
            message: 'Service is running'
        }));

    } else {
        res.statusCode = 404;

        res.end(JSON.stringify({
            message: 'Route not found'
        }));
    }
});


server.listen(PORT, HOST, () => {
    console.log(`${APP_NAME} is running at http://${HOST}:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});
