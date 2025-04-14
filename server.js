import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const hostname = 'localhost';
const port = 3000;
const baseDirectory = process.cwd();

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png'
};

// Function to serve index.html
async function serveIndexHtml(res) {
    const indexPath = path.join(baseDirectory, 'index.html');
    try {
        const data = await fs.readFile(indexPath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log("yes");

        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
}
const server = createServer(async (req, res) => {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const ph = path.join(baseDirectory, filePath);
    try {
        const stats = await fs.stat(ph);
        if (stats.isFile()) {
            const ext = path.extname(ph);
            const contentType = mimeTypes[ext] || 'text/plain';
            // Read file based on content type
            const isBinary = contentType.startsWith('image/');
            const data = await fs.readFile(ph, isBinary ? null : 'utf8');

            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        } else {
            await serveIndexHtml(res);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            await serveIndexHtml(res);
        } else {
            console.error('Server error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
        }
    }
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});