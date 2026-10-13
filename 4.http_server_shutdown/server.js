const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Server Start!!")
})

const server = app.listen(3000, () => 
    console.log('Server is running....')
)

setInterval(() => server.getAllConnections (
    (err, allconnections) => 
        console.log(`${allconnections} are currently open...`)
),1000);


process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    console.log('Server is going to shut down, recieved kill message.')

    server.close(() => {
        console.log('closed the all remaining requests');
            process.exit(0);
    })

    setTimeout(() => {
        console.error('forcefully shut down the server.');
        process.exit(1);
    },10000)
    
}





















