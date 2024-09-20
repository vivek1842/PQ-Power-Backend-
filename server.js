const http = require('http'); 
const app = require('./app'); //import app

const port = process.env.PORT || 3000; //process.env simply access nodeJs environment variable

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`App is Listening on Port ${port}`);
}); //start server
                            