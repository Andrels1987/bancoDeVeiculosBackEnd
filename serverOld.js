const http = require('http')
const logEvents = require('./logEvents')
const fs = require('fs')
const path = require('path')


const PORT = process.env.PORT || 3500

const server = http.createServer((req, res) =>{
    logEvents(req.method)
    let pathURL;
    if(req.url === "/" || req.url === "index.html"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        pathURL = path.join(__dirname,'views','index.html')
        fs.readFile(pathURL,'utf8', (err,data) =>{
            res.end(data)
        })
    }
});

server.listen(PORT, () => console.log("running on port " + PORT));