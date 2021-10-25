import http from 'http'
import { readFile } from 'fs/promises'

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(async (req, res) => {

    if (req.url == '/') {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(await readFile('./demo/index.html', 'utf8'));
        res.end();
    
    }

    if (req.url == '/sheet_tanks.css') {
        
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(await readFile('./demo/sheet_tanks.css', 'utf8'));
        res.end();
    
    }

    if (req.url == '/sheet_tanks.png') {
        
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(await readFile('./demo/sheet_tanks.png'));
        res.end();
    
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});