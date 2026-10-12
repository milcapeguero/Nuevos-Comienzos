// Genera las imágenes del post de Wix (portada, paneles y frases) a partir de un JSON.
// Uso:  node wix/generar-imagenes.js wix/la-mejor-inversion.json
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const cfgPath = path.resolve(process.argv[2] || path.join(__dirname, 'la-mejor-inversion.json'));
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const outDir = path.join(__dirname, cfg.carpeta);
fs.mkdirSync(outDir, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const asset = (n) => 'file://' + path.resolve(__dirname, '../assets', n);

const defs = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <linearGradient id="cinta" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".55" stop-color="#dcecf5" stop-opacity=".26"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/>
 </linearGradient>
 <filter id="suave" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.4"/></filter>
 <symbol id="cintas" viewBox="0 0 800 900"><g fill="none" stroke-linecap="round" filter="url(#suave)">
  <path d="M640 -60 C 560 140 780 230 640 380 S 380 470 450 700 S 600 860 560 980" stroke="url(#cinta)" stroke-width="78"/>
  <path d="M640 -60 C 560 140 780 230 640 380 S 380 470 450 700 S 600 860 560 980" stroke="#fff" stroke-opacity=".16" stroke-width="40"/>
  <path d="M640 -60 C 560 140 780 230 640 380 S 380 470 450 700 S 600 860 560 980" stroke="#fff" stroke-opacity=".34" stroke-width="5" transform="translate(-14 0)"/>
  <path d="M860 160 C 700 260 820 420 700 520 S 560 640 620 780" stroke="url(#cinta)" stroke-width="54" opacity=".8"/>
  <path d="M860 160 C 700 260 820 420 700 520 S 560 640 620 780" stroke="#fff" stroke-opacity=".28" stroke-width="4" transform="translate(-10 0)"/>
 </g></symbol></defs></svg>`;

const base = `
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Oswald:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="file://${path.resolve(__dirname, '../assets/mensaje.css')}">
<style>
 html,body{margin:0;background:none}
 .card{position:relative;overflow:hidden;display:flex;flex-direction:column;color:#fff;font-family:var(--nc-font-body);line-height:1.2}
 .card.nc-on-blue{ }
 .card.claro{background:var(--nc-paper);color:var(--nc-neo)}
 .card.claro::after{display:none}
 .pie{display:flex;align-items:center;justify-content:space-between;gap:32px}
 .pie img{height:auto}
 .pie span{font-weight:600;letter-spacing:.16em;text-transform:uppercase;opacity:.9}
 .et{font-weight:600;letter-spacing:.2em;text-transform:uppercase;opacity:.88}
 .txt{font-family:var(--nc-font-display);font-weight:300;margin:0}
 .txt strong{font-weight:500}
 .marca{font-family:var(--nc-font-display);position:absolute;line-height:1;opacity:.2}
</style>`;

const rib = (css) => `<svg class="nc-ribbons" style="${css}" aria-hidden="true"><use href="#cintas"/></svg>`;

function portada() {
  const w = 1920, h = 1080;
  return { w, h, name: '01-portada', html: `
  <div class="card nc-on-blue" style="width:${w}px;height:${h}px;padding:90px 130px 100px;justify-content:space-between">
    ${rib('right:-6%;top:-12%;width:1000px;height:1125px')}
    <img src="${asset('logo-blanco.svg')}" style="width:190px;height:auto">
    <div>
      <div class="et" style="font-size:24px;margin-bottom:28px">Resumen del mensaje · Serie «${esc(cfg.serie)}»</div>
      <h1 class="nc-display" style="font-size:236px;line-height:1.04;margin:0">${cfg.portada.lineas.map(esc).join('<br>')}</h1>
      <div style="margin-top:36px;padding-top:24px;border-top:2px solid rgba(255,255,255,.32);width:900px;display:flex;gap:80px">
        <div><div class="et" style="font-size:17px">Serie</div><div style="font-family:var(--nc-font-display);font-size:42px;text-transform:uppercase;margin-top:8px">${esc(cfg.serie)}</div></div>
        <div><div class="et" style="font-size:17px">Predicadora</div><div style="font-family:var(--nc-font-display);font-size:42px;text-transform:uppercase;margin-top:8px">${esc(cfg.predicadora)}</div></div>
      </div>
    </div>
  </div>` };
}

function panel(p) {
  const w = 1600, h = 900;
  return { w, h, name: p.archivo, html: `
  <div class="card nc-on-blue" style="width:${w}px;height:${h}px;padding:100px 120px;justify-content:space-between">
    ${rib('right:-8%;top:-30%;width:800px;height:900px;opacity:.5')}
    <div class="et" style="font-size:22px">${esc(p.etiqueta)}</div>
    <p class="txt" style="font-size:${p.tam}px;line-height:1.12;text-transform:${p.tam > 90 ? 'uppercase' : 'none'};font-weight:${p.tam > 90 ? 400 : 300}">${p.texto}</p>
    <div class="pie"><img src="${asset('logo-blanco.svg')}" style="width:130px"><span style="font-size:18px">${esc(cfg.predicadora)} · ${esc(cfg.titulo)}</span></div>
  </div>` };
}

function frase(f, i) {
  const w = 1080, h = 1080;
  const n = f.t.length;
  const tam = n < 60 ? 92 : n < 100 ? 78 : n < 150 ? 64 : 52;
  const cls = f.claro ? 'card claro' : 'card nc-on-blue';
  return { w, h, name: `frase-${String(i + 1).padStart(2, '0')}`, html: `
  <div class="${cls}" style="width:${w}px;height:${h}px;padding:96px;justify-content:space-between">
    ${f.claro ? '' : rib('right:-18%;top:-22%;width:760px;height:855px;opacity:.55')}
    <div class="marca" style="font-size:300px;top:40px;left:80px">“</div>
    <div style="flex:1;display:flex;align-items:center"><p class="txt" style="font-size:${tam}px;line-height:1.16;position:relative">${esc(f.t)}</p></div>
    <div class="pie"><img src="${asset(f.claro ? 'logo-azul.svg' : 'logo-blanco.svg')}" style="width:130px"><span style="font-size:18px;text-align:right">${esc(cfg.predicadora)}<br>${esc(cfg.titulo)}</span></div>
  </div>` };
}

(async () => {
  const cards = [portada(), ...cfg.paneles.map(panel), ...cfg.frases.map(frase)];
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  for (const c of cards) {
    const page = await browser.newPage({ viewport: { width: c.w, height: c.h }, deviceScaleFactor: 1 });
    const tmp = path.join(__dirname, '_tarjeta.html');
    fs.writeFileSync(tmp, `<!doctype html><html lang="es"><head><meta charset="utf-8">${base}</head><body>${defs}${c.html}</body></html>`);
    await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, c.name + '.png'), clip: { x: 0, y: 0, width: c.w, height: c.h } });
    await page.close();
    console.log('ok', c.name);
  }
  fs.rmSync(path.join(__dirname, '_tarjeta.html'), { force: true });
  await browser.close();
})();
