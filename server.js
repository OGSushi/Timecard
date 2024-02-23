import express from 'express';
const app = express();
const port = 1227
const ipAddress = '10.0.0.53';

// Serve static files from the 'public' directory
app.use(express.static('public'));             

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
});

// Start the server
const PORT = 1227;
app.listen(PORT, async () => { // Make this function async 
    console.log(`Server is running on http://localhost:1227/login.html`);
