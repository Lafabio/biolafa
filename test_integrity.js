const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/data.js',
  'js/microscope.js',
  'js/trophic-sim.js',
  'js/app.js',
  'assets/slides_catalog.json'
];

let allOk = true;
requiredFiles.forEach(rf => {
  const p = path.join(publicDir, rf);
  if (!fs.existsSync(p)) {
    console.error('Missing file:', p);
    allOk = false;
  } else {
    const stat = fs.statSync(p);
    console.log(`OK: ${rf} (${stat.size} bytes)`);
  }
});

// Check all slides listed in data.js
const bioData = require('./public/js/data.js');
console.log(`\nVerifying ${bioData.slides.length} slides from BIO_DATA...`);
bioData.slides.forEach(slide => {
  const sp = path.join(publicDir, slide.src);
  if (!fs.existsSync(sp)) {
    console.error('Missing slide image:', sp);
    allOk = false;
  } else {
    console.log(`✓ Slide [${slide.code}]: ${slide.title} -> ${sp}`);
  }
});

if (allOk) {
  console.log('\n🌟 TODOS OS ARQUIVOS E IMAGENS ESTÃO 100% ÍNTEGROS!');
} else {
  console.error('\nHouve erros na verificação!');
}
