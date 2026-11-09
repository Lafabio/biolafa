const http = require('http');
const fs = require('fs');
const path = require('path');
const teamsHandler = require('./api/teams.js');
const slidesHandler = require('./api/slides.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.bmp': 'image/bmp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Tratamento de URL limpa
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // CORS preflight global
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // Endpoints da API
  if (reqUrl === '/api/teams' || reqUrl.startsWith('/api/teams/')) {
    return teamsHandler(req, res);
  }

  if (reqUrl === '/api/slides') {
    return slidesHandler(req, res);
  }

  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqUrl);

  // Segurança para evitar Directory Traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acesso Negado (403)');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Não Encontrado</h1><p>O arquivo ${reqUrl} não existe.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 BioLab Explorer rodando com sucesso!`);
  console.log(`🌐 Acesse no navegador: http://localhost:${PORT}`);
  console.log(`📁 Diretório servido: ${PUBLIC_DIR}`);
  console.log(`👥 API de Equipes Ativa: http://localhost:${PORT}/api/teams`);
  console.log(`======================================================\n`);
});
