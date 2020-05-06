const http = require('http');

http.createServer((request, response) => {
    response.end('hi node');
}).listen(5000, () => console.log("listening to 5000"));