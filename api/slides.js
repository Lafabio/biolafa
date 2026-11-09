const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const slidesDir = path.join(process.cwd(), 'public', 'assets', 'slides');
  fs.readdir(slidesDir, (err, files) => {
    if (err) {
      // Fallback para slides padrão se a pasta não for legível no ambiente serverless
      const fallback = [
        "laminas_slide1.bmp",
        "laminas_slide2.bmp",
        "laminas_sedimento_100x.bmp",
        "laminas_sedimento_400x.bmp",
        "laminas_biofilme_alga.bmp",
        "laminas_biofilme_cianobacteria.bmp"
      ];
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.end(JSON.stringify({ slides: fallback, fallback: true }));
    }

    const laminasFiles = files.filter(f => /^laminas_/i.test(f) || /lamina/i.test(f));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ slides: laminasFiles }));
  });
};
