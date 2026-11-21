const KEY = 'nebensaetze-v1';
const UI_DEFAULT = {size: 100, motion: 'normal', confetti: true, mascot: true, rate: 'normal'};
const blank = () => ({v2: true, done: {}, exams: [], read: {}, box: {}, rev: {}, days: [], date: '', when: '', theme: 'sepia', tests: 0, ui: {...UI_DEFAULT}});
let S = blank();
try {
  const o = JSON.parse(localStorage.getItem(KEY) || '{}');
  Object.assign(S, o);
  if (!o.v2) { S.v2 = true; S.theme = 'sepia'; S.ui = {}; }
} catch (e) {}
S.ui = {...UI_DEFAULT, ...S.ui};
['font', 'lh', 'ls', 'col', 'density', 'corner', 'hc', 'mesh', 'mascotSize', 'mascotMode'].forEach(k => delete S.ui[k]);
if (!['calm', 'normal', 'full'].includes(S.ui.motion)) S.ui.motion = 'normal';
if (!['sepia', 'light', 'dark', 'system'].includes(S.theme)) S.theme = S.theme === 'black' ? 'dark' : 'sepia';
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const today = () => new Date().toISOString().slice(0, 10);
const addDays = n => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const touchDay = () => { const d = today(); if (!S.days.includes(d)) S.days.push(d); };
function streak() {
  let n = 0;
  for (let i = S.days.includes(today()) ? 0 : 1; S.days.includes(addDays(-i)); i++) n++;
  return n;
}
const reduceQ = matchMedia('(prefers-reduced-motion: reduce)');
// tam sistemi de ezer, normal sisteme uyar, azaltılmışta hiç hareket yok
const motionOk = () => S.ui.motion === 'full' || (S.ui.motion === 'normal' && !reduceQ.matches);

const THEMES = [['sepia', 'Sepya', '#F2E8D5', '#2A2016'], ['light', 'Açık', '#F7F4EE', '#1D1915'], ['dark', 'Koyu', '#17130F', '#F1E7D6'], ['system', 'Sistem', 'linear-gradient(135deg,#F2E8D5 50%,#17130F 50%)', '#8A775F']];
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const resolved = () => S.theme === 'system' ? (systemDark.matches ? 'dark' : 'light') : S.theme;
function applyTheme() {
  const r = document.documentElement;
  r.classList.remove('sepia', 'light', 'dark'); r.classList.add(resolved());
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.content = getComputedStyle(r).getPropertyValue('--bg').trim() || '#F2E8D5';
}
function applyUI() {
  const r = document.documentElement;
  r.style.fontSize = S.ui.size === 100 ? '' : S.ui.size + '%';
  r.dataset.motion = S.ui.motion;
  r.classList.toggle('side-mini', S.ui.side === 'mini');
}
applyTheme(); applyUI();

const P_ = {
  sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevL: '<path d="m14.5 6-6 6 6 6"/>',
  chevR: '<path d="m9.5 6 6 6-6 6"/>',
  pause: '<path d="M9 6v12M15 6v12"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z"/>',
  side: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9.5 4.5v15M15.5 10l-2 2 2 2"/>',
  today: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  book: '<path d="M12 6.5C10 5 7.400 4.300 4 4.300v14.400c3.400 0 6 .7 8 2.200 2-1.500 4.600-2.200 8-2.200V4.300c-3.400 0-6 .7-8 2.200zM12 6.500v14.400"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  cards: '<rect x="3" y="7" width="14" height="13" rx="2.500"/><path d="M7 7v-.5A2.500 2.500 0 0 1 9.500 4h9A2.500 2.500 0 0 1 21 6.500v9a2.500 2.500 0 0 1-2.500 2.500H17"/>',
  chat: '<path d="M21 11.500c0 4.100-4 7.500-9 7.500-1.200 0-2.300-.2-3.300-.5L4 20l1.400-3.600C3.900 15 3 13.300 3 11.500 3 7.400 7 4 12 4s9 3.400 9 7.500z"/>',
  exam: '<rect x="5" y="3" width="14" height="18" rx="2.500"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  next: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  prev: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.6.500 1 1.200 1 2.100h5c0-.9.400-1.600 1-2.100A6 6 0 0 0 12 3z"/>',
  warn: '<path d="M12 4 2.800 20h18.400zM12 10v4M12 17h0"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>',
  bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>',
  puzzle: '<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
  redo: '<path d="M4 12a8 8 0 1 0 2.500-5.800M4 4v4.500h4.500"/>',
  flame: '<path d="M12 21c-3.900 0-6.500-2.700-6.500-6.300 0-3.200 2.300-4.800 3.300-7.700 2 1 2.700 2.800 2.700 4.300 1-.5 1.700-2 1.700-3.800C16.300 9.500 18.500 12 18.500 14.700c0 3.600-2.600 6.300-6.500 6.300z"/>',
  speak: '<path d="M4 10v4h4l5 4V6L8 10zM16.500 9a4 4 0 0 1 0 6"/>',
  rule: '<path d="M5 4h11l3 3v13H5zM9 10h6M9 14h4"/>',
  sum: '<path d="M18 5H6l6 7-6 7h12"/>',
  brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V6a2.500 2.500 0 0 0-3-2zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  spark: '<path d="M12 3c.8 4.500 2.500 6.200 7 7-4.500.8-6.200 2.500-7 7-.8-4.500-2.500-6.200-7-7 4.500-.8 6.200-2.500 7-7z"/>',
  shuffle: '<path d="M3 7h4c5 0 5 10 10 10h4M3 17h4c1.800 0 3-1.300 4-3M21 7h-4c-1.800 0-3 1.300-4 3M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.500 2"/>',
  cal: '<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.300-1 .8-1 1.700M12 17h0"/>'
};
const I = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P_[n] || ''}</svg>`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mark = s => String(s)
  .replace(/\[([^\]]+)\]/g, '<span class="k">$1</span>')
  .replace(/\{([^}]+)\}/g, '<span class="v">$1</span>')
  .replace(/\^([^^]+)\^/g, '<span class="h">$1</span>');
const de = s => `<span lang="de">${mark(s)}</span>`;
const plain = s => String(s).replace(/[\[\]{}^]/g, '');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const el = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };
const pad = n => String(n).padStart(2, '0');
const view = document.getElementById('view');
const add = (...n) => n.forEach(x => x && view.append(typeof x === 'string' ? el(x) : x));

const canSay = 'speechSynthesis' in window;
const RATES = {slow: .7, normal: .92, fast: 1.1};
function say(text, btn) {
  try {
    speechSynthesis.cancel();
    document.querySelectorAll('.say.on').forEach(b => b.classList.remove('on'));
    const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; u.rate = RATES[S.ui.rate] || RATES.normal;
    if (btn) { btn.classList.add('on'); u.onend = u.onerror = () => btn.classList.remove('on'); }
    speechSynthesis.speak(u);
  } catch (e) {}
}

// konfeti, sitenin renkleriyle kısa bir patlama
const fx = document.getElementById('fx');
function confetti(x, y, n) {
  if (!motionOk() || !S.ui.confetti) return;
  x = x === undefined ? innerWidth / 2 : x; y = y === undefined ? innerHeight / 3 : y; n = n || 28;
  const c = fx.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1);
  fx.width = innerWidth * dpr; fx.height = innerHeight * dpr; c.scale(dpr, dpr);
  const cs = getComputedStyle(document.documentElement), cols = ['--accent', '--gold', '--v', '--h', '--k'].map(v => cs.getPropertyValue(v).trim());
  const ps = Array.from({length: n}, () => ({x, y, vx: (Math.random() - .5) * 10, vy: -Math.random() * 9 - 3, w: Math.random() * 5 + 4, h: Math.random() * 3 + 2, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6, va: (Math.random() - .5) * .4}));
  let f = 0;
  (function loop() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .3; p.vx *= .98; p.a += p.va; c.save(); c.globalAlpha = Math.max(0, 1 - f / 70); c.translate(p.x, p.y); c.rotate(p.a); c.fillStyle = p.c; c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); c.restore(); });
    if (++f < 70) requestAnimationFrame(loop); else c.clearRect(0, 0, innerWidth, innerHeight);
  })();
}
const burstAt = (node, n) => { const r = node.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n); };
const celebrate = () => confetti(innerWidth / 2, innerHeight * .35, 90);
function toast(t) { const n = el(`<div class="toast" role="status">${esc(t)}</div>`); document.body.append(n); setTimeout(() => n.remove(), 2700); }

// cümle kurmada kelime eski yerinden yenisine aksın diye FLIP
function flip(nodes, change) {
  const a = new Map(nodes.map(n => [n, n.getBoundingClientRect()]));
  change();
  if (!motionOk()) return;
  nodes.forEach(n => {
    const o = a.get(n), r = n.getBoundingClientRect(), dx = o.left - r.left, dy = o.top - r.top;
    if (dx || dy) n.animate([{transform: `translate(${dx}px,${dy}px)`}, {transform: 'none'}], {duration: 420, easing: 'cubic-bezier(.16,1,.3,1)'});
  });
}

const clean = s => s.replace(/[„“”"]/g, '"').replace(/\s+/g, ' ').replace(/\s+([,.?!])/g, '$1').trim().replace(/[.!?]+$/, '');
const expand = a => a.flatMap(x => x.includes('(so) ') ? [x.replace('(so) ', ''), x.replace('(so) ', 'so '), x.replace('(so) ', 'dann ')] : [x]);
function grade(input, accepted) {
  const u = clean(input), list = expand(accepted).map(clean);
  if (list.includes(u)) return 'ok';
  const noComma = s => s.replace(/,/g, '').replace(/\s+/g, ' ');
  if (list.some(a => noComma(a) === noComma(u))) return 'comma';
  if (list.some(a => a.toLowerCase() === u.toLowerCase())) return 'case';
  return 'check';
}


const drillsOf = t => Object.entries(DRILLS).filter(([, d]) => d.topic === t);
function topicPct(t) {
  let tot = 0, ok = 0;
  drillsOf(t).forEach(([id, d]) => d.items.forEach((_, i) => { tot++; if (S.done[id + '-' + i] === 'ok') ok++; }));
  return tot ? Math.round(ok / tot * 100) : 0;
}
const prepLeft = () => LESSONS.find(l => l.prep && topicPct(l.topic) < 100);
const lessonPct = l => l.topic ? topicPct(l.topic) : (S.read[l.id] ? 100 : 0);
const learnPct = () => { const ts = Object.keys(TOPICS); return Math.round(ts.reduce((a, t) => a + topicPct(t), 0) / ts.length); };
const bestExam = () => S.exams.length ? Math.max(...S.exams) : 0;
const wrongKeys = () => Object.keys(S.done).filter(k => S.done[k] === 'no');
const dueCards = () => CARDS.filter(c => { const b = S.box[c[1]]; return !b || b.due <= today(); });
const REV_GOAL = 10;
const ring = (pct, size) => { const r = 11, c = 2 * Math.PI * r; return `<svg class="ring" viewBox="0 0 28 28" style="width:${size || 28}px;height:${size || 28}px" aria-hidden="true"><circle class="bg" cx="14" cy="14" r="${r}"/><circle class="fg" cx="14" cy="14" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg>`; };

const TABS = [['basla', 'Bugün', 'today'], ['dersler', 'Dersler', 'book'], ['pratik', 'Pratik', 'target'], ['kartlar', 'Kartlar', 'cards'], ['sor', 'Sor', 'chat']];
const PAGES = {basla: home, dersler: lessonsList, pratik: practice, ozet: summary, kartlar: cards, sinav: examPage, sor: ask, test: mixTest, kur: builder, yanlis: wrongs};
const parentTab = id => id.startsWith('ders-') || id === 'ozet' ? 'dersler' : ['test', 'kur', 'yanlis', 'sinav'].includes(id) ? 'pratik' : id;
let cur = '';
const tabsEl = document.getElementById('tabs'), dockEl = document.getElementById('dock');
function drawNav() {
  const html = TABS.map(([id, label, icon]) => `<button data-go="${id}" class="${parentTab(cur) === id ? 'on' : ''}" ${parentTab(cur) === id ? 'aria-current="page"' : ''}>${I(icon)}<span>${label}</span></button>`).join('');
  [tabsEl, dockEl].forEach(box => {
    const pill = box.querySelector('.pill') || el('<i class="pill" aria-hidden="true"></i>');
    box.innerHTML = html; box.prepend(pill);
    placePill(box);
  });
}
function placePill(box, instant) {
  const p = box.querySelector('.pill'), t = box.querySelector('button.on');
  if (!p) return;
  if (!t || !t.offsetWidth) { p.style.opacity = 0; return; }
  if (instant || !p.dataset.ready) { p.style.transition = 'none'; }
  p.style.opacity = 1; p.style.width = t.offsetWidth + 'px'; p.style.height = t.offsetHeight + 'px'; p.style.transform = `translate(${t.offsetLeft}px,${t.offsetTop}px)`;
  if (instant || !p.dataset.ready) { void p.offsetWidth; p.style.transition = ''; p.dataset.ready = 1; }
}
addEventListener('resize', () => { placePill(tabsEl, true); placePill(dockEl, true); });
if ('ResizeObserver' in window) new ResizeObserver(() => placePill(tabsEl, true)).observe(tabsEl);
const colBtn = document.getElementById('col-btn');
const drawCol = () => { const mini = S.ui.side === 'mini', t = mini ? 'Menüyü genişlet' : 'Menüyü daralt'; colBtn.innerHTML = I('side') + `<span>${mini ? 'Genişlet' : 'Daralt'}</span>`; colBtn.title = t; colBtn.setAttribute('aria-label', t); colBtn.setAttribute('aria-expanded', !mini); };
drawCol();
colBtn.onclick = () => { S.ui.side = S.ui.side === 'mini' ? 'full' : 'mini'; applyUI(); save(); drawCol(); };
document.fonts && document.fonts.ready.then(() => { placePill(tabsEl, true); placePill(dockEl, true); });

function go(id) {
  if (location.hash.slice(1) === id) return render(id, true);
  location.hash = id;
}
addEventListener('hashchange', () => render(location.hash.slice(1)));

// sayfa geçişi, eskisi söner yenisi aşağıdan gelir
let renderSeq = 0;
async function render(id, same) {
  if (!PAGES[id] && !LESSONS.some(l => 'ders-' + l.id === id)) id = 'basla';
  const seq = ++renderSeq;
  if (!same && motionOk() && view.childElementCount) {
    const out = view.animate([{opacity: 1, transform: 'none'}, {opacity: 0, transform: 'translateY(-8px)'}], {duration: 150, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards'});
    await Promise.race([out.finished.catch(() => {}), new Promise(r => setTimeout(r, 200))]);
    if (seq !== renderSeq) return;
  }
  const keepY = same ? scrollY : 0;
  cur = id;
  drawNav(); closeSheet();
  view.getAnimations().forEach(a => a.cancel());
  view.innerHTML = ''; view.className = '';
  (PAGES[id] || (() => lesson(LESSONS.find(l => 'ders-' + l.id === id))))();
  scrollTo(0, keepY);
  reveal(!same);
  onScroll();
  const t = view.querySelector('h1'); document.title = (t ? t.textContent + ' · ' : '') + 'Nebensätze';
}

// görünür alana giren öğe bulanıktan netleşiyor, aynı anda girenler sırayla
const REVEAL = ':scope > :not(.drill):not(.toc):not(.grid):not(.why), .drill > *, .toc > *, .grid > *, .why > *';
let batch = 0, batchT = 0;
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top).forEach(e => {
    const n = e.target; io.unobserve(n);
    n.style.setProperty('--d', Math.min(batch++ * 70, 350) + 'ms');
    n.classList.add('in');
    const end = e => { if (e.target === n && e.propertyName === 'transform') { n.classList.add('done'); n.removeEventListener('transitionend', end); } };
    n.addEventListener('transitionend', end);
  });
  clearTimeout(batchT); batchT = setTimeout(() => { batch = 0; }, 120);
}, {rootMargin: '0px 0px -7% 0px', threshold: .01}) : null;
function splitWords(h) {
  let i = 0;
  [...h.childNodes].forEach(nd => {
    if (nd.nodeType === 3) {
      const frag = document.createDocumentFragment();
      nd.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.append(document.createTextNode(part));
        else { const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = part; frag.append(s); }
      });
      nd.replaceWith(frag);
    } else if (nd.nodeType === 1) { nd.classList.add('w'); nd.style.setProperty('--i', i++); }
  });
}
function reveal(animate) {
  if (!animate || !motionOk() || !io) return;
  batch = 0;
  view.querySelectorAll(REVEAL).forEach(n => { if (n.matches('h1')) return; n.classList.add('rv'); io.observe(n); });
  view.querySelectorAll('h1').forEach(h => { splitWords(h); requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('go'))); });
}
const topEl = document.getElementById('top'), progEl = document.getElementById('progress');
function onScroll() {
  topEl.classList.toggle('scrolled', scrollY > 8);
  const h = document.documentElement.scrollHeight - innerHeight;
  const show = cur.startsWith('ders-') || cur === 'ozet';
  progEl.style.transform = `scaleX(${show && h > 0 ? Math.min(1, scrollY / h) : 0})`;
}
addEventListener('scroll', onScroll, {passive: true});

const sheet = document.getElementById('sheet'), scrim = document.getElementById('scrim'), setBtn = document.getElementById('set-btn');
setBtn.innerHTML = I('sliders') + '<span>Görünüm</span>';
const seg = (key, opts) => `<div class="seg" role="group">${opts.map(([v, t]) => `<button data-ui="${key}" data-v="${v}" class="${S.ui[key] === v ? 'on' : ''}" aria-pressed="${S.ui[key] === v}">${t}</button>`).join('')}</div>`;
const sw = (key, label) => `<button class="sw-row" role="switch" data-sw="${key}" aria-checked="${!!S.ui[key]}">${label}<i></i></button>`;
function drawSheet() {
  sheet.innerHTML = `<div class="sheet-h"><b>Görünüm</b><button class="icon-btn" data-close aria-label="Kapat">${I('close')}</button></div>
  <div class="sec"><h4>Tema</h4><div class="themes">${THEMES.map(([id, n, bg, fg]) => `<button class="th ${S.theme === id ? 'on' : ''}" data-theme="${id}" aria-pressed="${S.theme === id}"><span style="background:${bg};color:${fg}">Aa</span>${n}</button>`).join('')}</div></div>
  <div class="sec"><div class="lab"><span>Yazı boyutu</span><output id="size-o">%${S.ui.size}</output></div><input type="range" id="size-i" min="85" max="135" step="5" value="${S.ui.size}" aria-label="Yazı boyutu"></div>
  <div class="sec"><h4>Hareket</h4>${seg('motion', [['calm', 'Azaltılmış'], ['normal', 'Normal'], ['full', 'Tam']])}${sw('confetti', 'Kutlama konfetisi')}${sw('mascot', 'Umut sahnelerde görünsün')}</div>
  ${canSay ? `<div class="sec"><h4>Almanca okuma hızı</h4>${seg('rate', [['slow', 'Yavaş'], ['normal', 'Normal'], ['fast', 'Hızlı']])}</div>` : ''}
  <div class="sec"><button class="btn ghost sm" data-reset>Varsayılana dön</button></div>`;
  sheet.querySelector('#size-i').oninput = e => { S.ui.size = +e.target.value; sheet.querySelector('#size-o').textContent = '%' + S.ui.size; applyUI(); save(); placePill(tabsEl, true); placePill(dockEl, true); };
}
let sheetOpen = false, sheetT = 0;
function openSheet() {
  sheetOpen = true; clearTimeout(sheetT); drawSheet();
  sheet.hidden = false; scrim.hidden = false; setBtn.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => { sheet.classList.add('in'); scrim.classList.add('in'); });
  sheet.focus();
}
function closeSheet() {
  if (!sheetOpen) return;
  sheetOpen = false; sheet.classList.remove('in'); scrim.classList.remove('in'); setBtn.setAttribute('aria-expanded', 'false');
  sheetT = setTimeout(() => { sheet.hidden = true; scrim.hidden = true; }, motionOk() ? 380 : 0);
}
setBtn.onclick = () => sheetOpen ? closeSheet() : openSheet();
scrim.onclick = closeSheet;
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheetOpen) { closeSheet(); setBtn.focus(); } });
sheet.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('[data-close]')) return closeSheet();
  const u = t.closest('[data-ui]');
  if (u) {
    S.ui[u.dataset.ui] = u.dataset.v; applyUI(); save();
    u.parentNode.querySelectorAll('button').forEach(b => { b.classList.toggle('on', b === u); b.setAttribute('aria-pressed', b === u); });
    if (u.dataset.ui === 'motion') render(cur, true);
    return;
  }
  const w = t.closest('[data-sw]');
  if (w) { const k = w.dataset.sw; S.ui[k] = !S.ui[k]; w.setAttribute('aria-checked', S.ui[k]); save(); if (k === 'mascot') render(cur, true); return; }
  const th = t.closest('[data-theme]');
  if (th) return setTheme(th.dataset.theme, e.clientX, e.clientY);
  if (t.closest('[data-reset]')) { S.ui = {...UI_DEFAULT}; S.theme = 'sepia'; save(); applyTheme(); applyUI(); drawSheet(); render(cur, true); }
});
// tema değişince tıklanan yerden daire yayılıyor
function setTheme(theme, x, y) {
  if (theme === S.theme) return;
  const apply = () => { S.theme = theme; save(); applyTheme(); sheet.querySelectorAll('[data-theme]').forEach(b => { const on = b.dataset.theme === theme; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); };
  if (!motionOk() || !document.startViewTransition) return apply();
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(apply).ready.then(() => document.documentElement.animate({clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`]}, {duration: 620, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)'})).catch(() => {});
}
systemDark.addEventListener('change', () => { if (S.theme === 'system') applyTheme(); });

document.addEventListener('click', e => {
  const b = e.target.closest('[data-go]');
  if (b && !b.closest('#sheet')) { e.preventDefault(); go(b.dataset.go); }
});

const PATH = [
  ...LESSONS.map(l => ({id: 'ders-' + l.id, t: l.title, d: l.sub, done: () => l.topic ? topicPct(l.topic) === 100 : !!S.read[l.id]})),
  {id: 'test', t: 'Karışık test', d: 'Konular karışık gelince hangi bağlacın gerektiğini gerçekten seçmeyi öğrenirsin.', done: () => (S.tests || 0) >= 3},
  {id: 'sinav', t: 'Deneme sınavı', d: 'Hedef: üst üste iki kez %85 ve üstü.', done: () => { const e = S.exams.slice(-2); return e.length === 2 && e.every(x => x >= 85); }}
];
function home() {
  view.className = 'wide';
  const nowI = PATH.findIndex(p => !p.done()), now = PATH[nowI];
  const first = !Object.keys(S.done).length && !Object.keys(S.read).length;
  const st = streak();
  add(`<section class="hero">
    <div class="eyebrow">Almancanın Yapısı <span class="dot"></span> Nebensätze</div>
    <h1>Fiil <em>sona</em> gider.</h1>
    <p class="lede">${first ? 'Yan cümlelerin bütün sırrı bu üç kelimede. Gerisi hangi bağlacın ne zaman geldiğini bilmek. Slaytlardaki her kural ve alıştırma burada, Türkçe açıklamalarla.' : st > 1 ? `${st} gündür buradasın. Seri bozulmasın: bugünkü adımın hazır.` : 'Tekrar hoş geldin. Kaldığın yerden, küçük adımlarla devam.'}</p>
    <div class="row cta">${now ? `<button class="btn accent lg" data-go="${now.id}">${first ? 'Hemen başla' : 'Devam et'} <span class="arr">${I('next')}</span></button>` : ''}<button class="btn ghost lg" data-go="ozet">${I('sum')} Tek sayfa özet</button></div>
  </section>`);
  add(Umut.scene(LESSONS.find(l => l.id === 'nb').scene, 'Umut gösteriyor · Fiil nereye gider?'));
  add(`<div class="legend"><span><span class="k">weil</span> bağlaç</span><span><span class="h">habe</span> ana cümle fiili</span><span><span class="v">habe</span> yan cümle fiili</span></div>`);
  if (now) add(`<button class="next" data-go="${now.id}"><span class="nb">${pad(nowI + 1)}</span><span><small>${first ? 'Buradan başla' : 'Sıradaki adımın'} · ${nowI + 1} / ${PATH.length}</small><b ${now.id.startsWith('ders-') ? 'lang="de"' : ''}>${esc(now.t)}</b><span class="d">${esc(now.d)}</span></span><span class="go">${I('next')}</span></button>`);
  else add(Umut.cameo('<b>Yolun tamamı bitti!</b> Sınava kadar her gün kartları tekrar et ve bir deneme çöz. Bilgiyi canlı tutan şey budur.', 'hop'));

  const rv = S.rev[today()] || 0;
  add(`<div class="stats">
    <div class="stat"><span class="n">${learnPct()}<small>%</small></span><span class="l">Alıştırmalar</span><div class="meter" style="--c:var(--accent)"><i data-w="${learnPct()}"></i></div></div>
    <div class="stat"><span class="n">${rv}<small>/${REV_GOAL}</small></span><span class="l">Bugünkü kart tekrarı</span><div class="meter" style="--c:var(--gold)"><i data-w="${Math.min(100, rv / REV_GOAL * 100)}"></i></div></div>
    <div class="stat"><span class="n">${bestExam()}<small>%</small></span><span class="l">En iyi deneme</span><div class="meter" style="--c:var(--ok)"><i data-w="${bestExam()}"></i></div></div>
    <div class="stat"><span class="n">${st}<small> gün</small></span><span class="l">Çalışma serisi</span><div class="meter" style="--c:var(--h)"><i data-w="${Math.min(100, st / 7 * 100)}"></i></div></div>
  </div>`);
  requestAnimationFrame(() => requestAnimationFrame(() => view.querySelectorAll('.meter i').forEach(i => { i.style.width = i.dataset.w + '%'; })));

  const todo = [];
  const wc = wrongKeys().length, dc = dueCards().length;
  if (wc) todo.push(['yanlis', 'redo', `${wc} yanlışını düzelt`, 'Hatayı hemen düzeltmek en kalıcı öğrenme yollarından biri.', 'no']);
  if (dc && rv < REV_GOAL) todo.push(['kartlar', 'cards', `${Math.min(dc, REV_GOAL - rv)} kart seni bekliyor`, 'Yaklaşık beş dakika.', 'h']);
  if (todo.length) {
    add(`<h2>Bugün ayrıca</h2>`);
    const g = el('<div class="grid"></div>');
    todo.forEach(t => g.append(el(`<button class="tile" data-go="${t[0]}" style="--tc:var(--${t[4]}-bg);--tf:var(--${t[4]})"><span class="ti">${I(t[1])}</span><b>${esc(t[2])}</b><small>${esc(t[3])}</small></button>`)));
    add(g);
  }

  add(`<h2>Yol haritası</h2>`, `<p class="muted" style="margin-top:-10px">Sırayı ben belirledim: her ders bir sonrakine temel oluyor. Bir dersin alıştırmalarını %100 yapınca adım tamamlanır.</p>`);
  const ol = el('<ol class="path"></ol>');
  PATH.forEach((p, i) => {
    const s = p.done() ? 'done' : i === nowI ? 'now' : '';
    ol.append(el(`<li class="${s}"><span class="dot">${s === 'done' ? I('check') : pad(i + 1)}</span><button class="pb" data-go="${p.id}"><b ${p.id.startsWith('ders-') ? 'lang="de"' : ''}>${esc(p.t)}</b><small>${esc(p.d)}</small></button></li>`));
  });
  add(ol);

  add(`<h2>Sınav planın</h2>`);
  const plan = el(`<div class="card"><div class="row" style="align-items:flex-start;gap:14px"><label class="field">Sınav tarihi<input type="date" id="exam-date" value="${esc(S.date)}"></label><label class="field">Her gün saat kaçta çalışacaksın?<input type="time" id="study-time" value="${esc(S.when)}"></label></div><p id="plan-t" style="margin-top:14px;color:var(--ink-2)"></p></div>`);
  const pt = plan.querySelector('#plan-t');
  const planText = () => {
    const lines = [];
    if (S.date) {
      const days = Math.ceil((new Date(S.date) - new Date(today())) / 864e5), left = PATH.filter(p => !p.done()).length;
      if (days > 0) lines.push(`Sınava <b>${days} gün</b> var. Kalan ${left} adım için günde ${Math.ceil(left / days)} adım yeterli.`);
      else if (days === 0) lines.push('Sınav bugün. Tek sayfa özete bak, yeni konuya başlama.');
    }
    if (S.when) lines.push(`Söz: her gün <b>${esc(S.when)}</b> olunca bu sayfayı açıp bir adım yapacağım.`);
    pt.innerHTML = lines.join(' ') || 'Tarih ve saat seç. “Saat şu olunca çalışacağım” diye önceden karar vermek başlamayı belirgin biçimde kolaylaştırır.';
  };
  plan.querySelector('#exam-date').onchange = e => { S.date = e.target.value; save(); planText(); };
  plan.querySelector('#study-time').onchange = e => { S.when = e.target.value; save(); planText(); };
  planText();
  add(plan);

  add(`<h2>Site neden böyle çalışıyor?</h2>`);
  const why = [
    ['Önce hatırla, sonra bak', 'Cevaplar kapalı gelir. Kendini sınamak yeniden okumaktan çok daha kalıcıdır.', 'Roediger & Karpicke, 2006'],
    ['Aralıklı tekrar', 'Kartlar unutmaya başladığın günlerde geri gelir: 1, 3, 7, 14 gün.', 'Cepeda ve ark., 2006'],
    ['Karışık pratik', 'Konuları karıştırmak hangi bağlacın gerektiğini seçmeyi öğretir.', 'Rohrer & Taylor, 2007'],
    ['Görsel ve sözlü birlikte', 'Fiilin hareketi ve zaman çizgileri kuralı iki kanaldan verir.', 'Paivio, 1971; Mayer, 2009'],
    ['Çözümlü örnekten başla', 'Her alıştırma bir örnekle açılır, sonra sen yaparsın.', 'Sweller & Cooper, 1985'],
    ['Anında geri bildirim', 'Hatanı hemen görürsün; “Yanlışlarım” bölümünde doğru yapana kadar kalır.', 'Hattie & Timperley, 2007']
  ];
  add(`<div class="why">${why.map(w => `<div><b>${esc(w[0])}</b><span>${esc(w[1])}</span><cite>${esc(w[2])}</cite></div>`).join('')}</div>`);
  const ft = el(`<div class="row" style="margin-top:6px"><button class="btn ghost sm" id="rs">${I('redo')} İlerlememi sıfırla</button></div>`);
  ft.querySelector('#rs').onclick = () => {
    ft.innerHTML = '<span class="muted">Tüm ilerleme silinecek. Emin misin?</span>';
    const y = el('<button class="btn sm">Evet, sil</button>'), n = el('<button class="btn ghost sm">Vazgeç</button>');
    y.onclick = () => { const {theme, ui} = S; S = Object.assign(blank(), {theme, ui}); save(); render('basla', true); };
    n.onclick = () => render('basla', true);
    ft.append(y, n);
  };
  add(ft);
}

function lessonsList() {
  add(`<div class="eyebrow">İçindekiler</div>`, `<h1>Dersler</h1>`, `<p class="lede">Önce dört hazırlık dersi: fiil çekimi, kelime sırası, zamanlar ve cümle birleştirme. Ardından slaytlardaki dokuz ders. Her dersin sonunda açıklamalı alıştırmalar seni bekler.</p>`);
  add(Umut.cameo(prepLeft() ? '<b>Hazırlık bölümünden başla.</b> Präteritum, Perfekt veya cümle birleştirme konusunda emin değilsen yan cümle alıştırmalarında takılırsın. Hazırlığı bitirince derslere geç.' : 'Sırayla git: <b>her ders bir öncekinin üstüne kurulu.</b> Sınavdan önceki son bakış için en alttaki özet sayfası var.', 'wave', true));
  const toc = el('<div class="toc"></div>');
  const groups = [...new Set(LESSONS.map(l => l.group))];
  groups.forEach(g => {
    const box = el(`<div class="toc-g"><h3>${esc(g)}</h3><div class="toc-list"></div></div>`), list = box.querySelector('.toc-list');
    LESSONS.filter(l => l.group === g).forEach(l => {
      const i = LESSONS.indexOf(l), pc = lessonPct(l);
      list.append(el(`<button class="toc-i" data-go="ders-${l.id}"><span class="no">${pad(i + 1)}</span><span><b lang="de">${esc(l.title)}</b><small>${esc(l.sub)}</small></span><span class="pc">${l.topic ? `%${pc}` : pc ? 'okundu' : ''}${ring(pc)}</span></button>`));
    });
    toc.append(box);
  });
  toc.append(el(`<div class="toc-g"><h3>Tekrar</h3><div class="toc-list"><button class="toc-i" data-go="ozet"><span class="no">${I('sum')}</span><span><b>Tek sayfa özet</b><small>Bütün bağlaçlar, karar sırası ve en sık hatalar</small></span><span class="pc">${I('next')}</span></button></div></div>`));
  add(toc);
}

function timeline(b) {
  const seg = (cls, r, arr) => `<i class="tl-seg ${cls}${arr ? ' arr' : ''}" style="left:${r[0]}%;width:${r[1] - r[0]}%;transition-delay:${200 + r[0] * 9}ms"></i>`;
  const row = (name, cls, r) => r ? `<div class="tl-row"><span>${name}</span><div class="tl-track">${seg(cls, r, b.arrow)}</div></div>` : '';
  return `<div class="timeline" role="img" aria-label="Zaman çizgisi: ${esc(b.cap)}"><div class="tl-head"><span>Zaman çizgisi</span><span>önce → sonra</span></div>${row('Nebensatz', 'n', b.ns)}${row('Hauptsatz', 'm', b.hs)}<div class="cap">${esc(b.cap)}</div></div>`;
}
function exList(list) {
  const ul = el(`<ul class="ex">${list.map(e => {
    const [t, note] = e[1].split(' → ');
    return `<li><div class="s">${de(e[0])}</div>${canSay ? `<button class="say" aria-label="Sesli oku" data-s="${esc(plain(e[0]))}">${I('speak')}</button>` : ''}<div class="t">${esc(t)}${note ? ` <span class="arrow">→ ${esc(note)}</span>` : ''}</div></li>`;
  }).join('')}</ul>`);
  ul.querySelectorAll('.say').forEach(s => { s.onclick = () => say(s.dataset.s, s); });
  return ul;
}
const noteBox = (cls, icon, tag, html) => `<div class="note-box ${cls}"><span class="ic">${I(icon)}</span><div>${tag ? `<span class="tag">${tag}</span>` : ''}${html}</div></div>`;

function lesson(l) {
  const i = LESSONS.indexOf(l), prev = LESSONS[i - 1], nx = LESSONS[i + 1];
  const strip = el(`<nav class="strip" aria-label="Dersler">${LESSONS.map((x, j) => `<button data-go="ders-${x.id}" class="${x === l ? 'on' : ''}" lang="de">${lessonPct(x) === 100 ? I('check').replace('class="i"', 'class="i ck"') : `<span class="muted" style="font-variant-numeric:tabular-nums">${pad(j + 1)}</span>`}${esc(x.title)}</button>`).join('')}</nav>`);
  add(strip);
  requestAnimationFrame(() => { const on = strip.querySelector('.on'); if (on) strip.scrollLeft = on.offsetLeft - strip.clientWidth / 2 + on.offsetWidth / 2; });
  add(`<div class="lhead"><div class="eyebrow"><span class="num">Ders ${pad(i + 1)}</span><span class="dot"></span>${esc(l.group)}</div><h1 class="md" lang="de">${esc(l.title)}</h1><p class="lede">${esc(l.sub)}</p></div>`);
  if (prev && TOPICS[prev.topic]) {
    const pool = POOL.filter(q => q.t === prev.topic && q.k === 'pick');
    const q = pool[Math.floor(Math.random() * pool.length)];
    if (q) add(quick({q: q.q, o: q.o, a: q.a, why: q.why}, `Isınma · önceki dersten (${TOPICS[prev.topic]})`, 'brain'));
  }
  if (l.scene) add(Umut.scene(l.scene, l.id === 'nb' ? 'Umut gösteriyor · Fiil nereye gider?' : `Umut gösteriyor · ${l.title}`));
  if (!l.prep && prepLeft()) add(noteBox('warn', 'info', 'Önce hazırlık', `Hazırlık bölümünü henüz bitirmedin. Fiil çekimi, zamanlar (Präteritum, Perfekt…) ve cümle birleştirme konusunda emin değilsen önce oraya bak: <button class="btn ghost sm" data-go="ders-${prepLeft().id}" style="margin-top:8px">Hazırlığa git: <span lang="de">${esc(prepLeft().title)}</span></button>`));
  if (l.bars) add(timeline(l.bars));
  let hn = 0;
  l.blocks.forEach(b => {
    if (b.p) add(`<p>${b.p}</p>`);
    else if (b.h) add(`<h2><span class="hn">${pad(++hn)}</span><span>${esc(b.h)}</span></h2>`);
    else if (b.barsInline) add(timeline(b.barsInline));
    else if (b.rule) add(`<div class="rule"><span class="tag">${I('rule')} Slayttaki kural</span><div class="de" lang="de">${esc(b.rule)}</div><div class="tr">${esc(b.tr)}</div>${b.note ? `<div class="note">${esc(b.note)}</div>` : ''}</div>`);
    else if (b.ex) add(exList(b.ex));
    else if (b.tip) add(noteBox('tip', 'bulb', 'Aklında tut', b.tip));
    else if (b.trap) add(noteBox('trap', 'warn', 'Dikkat', b.trap));
    else if (b.warn) add(noteBox('warn', 'info', '', esc(b.warn)));
    else if (b.table) add(`<div class="tw"><table><thead><tr>${b.table.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.table.rows.map(r => `<tr>${r.map(c => `<td>${mark(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
    else if (b.ask) add(quick(b.ask));
    else if (b.drills) b.drills.forEach(id => add(drill(id)));
  });
  const fin = el(`<div class="finish"></div>`);
  const fig = S.ui.mascot ? Umut.figure('hop') : null;
  if (fig) fin.append(fig);
  fin.append(el(`<h3>${S.read[l.id] ? 'Bu dersi bitirdin.' : 'Dersin sonuna geldin.'}</h3>`), el(`<p class="muted" style="max-width:30em">${l.topic ? `Alıştırmalarda %${topicPct(l.topic)} tamam. Eksik kalanları sonra “Yanlışlarım” bölümünden de çözebilirsin.` : 'Temel hazır. Şimdi ilk bağlaç çiftine geçebilirsin.'}</p>`));
  const done = el(`<button class="btn accent lg">${I('check')} ${nx ? 'Bitirdim, sonraki derse geç' : 'Bitirdim'}</button>`);
  done.onclick = () => { S.read[l.id] = true; touchDay(); save(); burstAt(done, 40); toast('Ders tamam, aferin!'); setTimeout(() => go(nx ? 'ders-' + nx.id : 'pratik'), motionOk() ? 650 : 0); };
  fin.append(done);
  add(fin);
  add(`<div class="pager">${prev ? `<button data-go="ders-${prev.id}"><small>${I('prev')} Önceki ders</small><b lang="de">${esc(prev.title)}</b></button>` : ''}${nx ? `<button class="nx" data-go="ders-${nx.id}"><small>Sonraki ders ${I('next')}</small><b lang="de">${esc(nx.title)}</b></button>` : `<button class="nx" data-go="pratik"><small>Sırada ${I('next')}</small><b>Pratik</b></button>`}</div>`);
}

function feel(n, ok, node) {
  n.classList.remove('pop', 'shake'); void n.offsetWidth;
  n.classList.add(ok ? 'pop' : 'shake');
  if (ok && node) burstAt(node, 18);
}
const ruleHtml = t => RULES[t] ? `<details class="rule-d"><summary>${I('rule')} Kuralı hatırla</summary><div>${RULES[t].rule}</div></details>` : '';
const fbHtml = (ok, why, t) => `<div class="fb ${ok ? 'ok' : 'no'}"><b class="st">${ok ? 'Doğru.' : 'Yanlış.'}</b> ${esc(why)}${ruleHtml(t)}</div>`;
const topicOf = (id, it) => id === 'p' ? it.t : DRILLS[id] && DRILLS[id].topic;
// cevaplamadan önce kendine sorulacak soru
function hintBtn(t, fb) {
  if (!RULES[t]) return '';
  const b = el(`<button class="btn ghost sm hint">${I('bulb')} İpucu</button>`);
  b.onclick = () => { fb.innerHTML = `<div class="fb neutral hint-fb"><b class="st">İpucu:</b> ${RULES[t].ask}</div>`; b.remove(); };
  return b;
}
function quick(a, label, icon) {
  const it = el(`<div class="item"><div class="n">${I(icon || 'bolt')} ${esc(label || 'Hızlı kontrol')}</div><div class="q">${de(a.q)}</div><div class="opts"></div><div class="fb-h"></div></div>`);
  const box = it.querySelector('.opts');
  shuffle(a.o).forEach(o => {
    const b = el(`<button class="opt" lang="de">${esc(o)}</button>`);
    b.onclick = () => {
      const right = o === a.a;
      box.querySelectorAll('button').forEach(x => { x.disabled = true; if (x.textContent === a.a) x.classList.add('right'); });
      if (!right) b.classList.add('wrong');
      feel(it, right, b);
      it.querySelector('.fb-h').innerHTML = fbHtml(right, a.why);
    };
    box.append(b);
  });
  return it;
}
function drill(id) {
  const d = DRILLS[id];
  const model = d.model ? d.model.split(' → ') : null;
  const wrap = el(`<section class="drill"><div class="drill-h"><div class="eyebrow">${I('target')} Alıştırma · ${d.items.length} soru</div><h2 lang="de">${esc(d.title)}</h2><p class="de" lang="de">${esc(d.de)}</p><p class="tr">${esc(d.tr)}</p></div>
    ${HOW[id] || RULES[d.topic] ? `<details class="how"><summary>${I('help')} Nasıl çözülür? Adım adım</summary><div>${HOW[id] ? `<ol>${HOW[id].map(x => `<li>${x}</li>`).join('')}</ol>` : ''}${RULES[d.topic] ? `<p><b>Kural:</b> ${RULES[d.topic].rule}</p>` : ''}</div></details>` : ''}
    ${model ? `<div class="muster"><span class="tag">Çözümlü örnek</span><span lang="de">${esc(model[0])}</span>${model[1] ? `<span class="to" lang="de">→ ${esc(model[1])}</span>` : ''}</div>` : ''}</section>`);
  d.items.forEach((it, i) => wrap.append(it.k === 'pick' ? pickItem(id, i, it) : it.k === 'write' ? writeItem(id, i, it) : freeItem(id, i, it)));
  return wrap;
}
function setDone(key, v) {
  const was = S.done[key]; S.done[key] = v; touchDay(); save();
  if (v === 'ok' && was !== 'ok' && key[0] !== 'p') {
    const d = DRILLS[key.split('-')[0]];
    if (d && topicPct(d.topic) === 100) { celebrate(); toast(`${TOPICS[d.topic] || (LESSONS.find(l => l.topic === d.topic) || {}).title}: hepsi tamam!`); }
  }
}
const numHead = (i, extra) => `<div class="n"><span>Soru ${pad(i + 1)}</span>${extra || ''}<span class="st">${I('check')}</span></div>`;
function pickItem(id, i, it) {
  const key = id + '-' + i, text = it.t || it.q;
  const n = el(`<div class="item">${numHead(i)}<div class="q" lang="de">${esc(text)}</div><div class="opts"></div><div class="fb-h"></div></div>`);
  const box = n.querySelector('.opts'), fb = n.querySelector('.fb-h'), t = topicOf(id, it);
  const hb = hintBtn(t, fb); if (hb) box.after(hb);
  const show = val => {
    if (hb) hb.remove();
    const right = val === it.a;
    box.querySelectorAll('button').forEach(x => { x.disabled = true; if (x.textContent === it.a) x.classList.add('right'); if (x.textContent === val && !right) x.classList.add('wrong'); });
    n.classList.add(right ? 'ok' : 'no');
    fb.innerHTML = fbHtml(right, it.why, t);
    if (!right) { const r = el(`<button class="btn ghost sm" style="margin-top:10px">${I('redo')} Tekrar dene</button>`); r.onclick = () => n.replaceWith(pickItem(id, i, it)); fb.append(r); }
  };
  it.o.forEach(o => { const b = el(`<button class="opt" lang="de">${esc(o)}</button>`); b.onclick = () => { setDone(key, o === it.a ? 'ok' : 'no'); show(o); feel(n, o === it.a, b); }; box.append(b); });
  if (S.done[key] === 'ok') show(it.a);
  return n;
}
function writeItem(id, i, it) {
  const key = id + '-' + i, tid = 'in-' + key;
  const n = el(`<div class="item">${numHead(i)}<div class="q" lang="de">${esc(it.q)}</div>
    <label for="${tid}" hidden>Cevabın</label><textarea id="${tid}" rows="2" lang="de" spellcheck="false" autocapitalize="sentences" placeholder="Önce hatırla, sonra yaz…"></textarea>
    <div class="row"><button class="btn sm cek">${I('check')} Kontrol et</button><button class="btn ghost sm gos">Cevabı göster</button></div><div class="fb-h"></div></div>`);
  const ta = n.querySelector('textarea'), fb = n.querySelector('.fb-h'), t = topicOf(id, it);
  const hb = hintBtn(t, fb); if (hb) n.querySelector('.row').append(hb);
  const whyHtml = () => `<div style="margin-top:8px"><b>Neden?</b> ${esc(it.why)}</div>${ruleHtml(t)}`;
  const modelHtml = () => `<div lang="de" style="margin-top:6px">${it.a.map(esc).join('<br>')}</div>`;
  const state = v => { n.classList.remove('ok', 'no'); if (v) n.classList.add(v); };
  const self = () => {
    const y = el('<button class="btn sm">Benimki de doğru</button>'), x = el('<button class="btn ghost sm">Yanlış yapmışım</button>');
    y.onclick = () => { setDone(key, 'ok'); state('ok'); feel(n, true, y); fb.innerHTML = `<div class="fb ok"><b class="st">Doğru sayıldı.</b> ${esc(it.why)}${ruleHtml(t)}</div>`; };
    x.onclick = () => { setDone(key, 'no'); state('no'); feel(n, false); y.remove(); x.remove(); };
    const r = el('<div class="row" style="margin-top:10px"></div>'); r.append(y, x); fb.append(r);
  };
  n.querySelector('.cek').onclick = () => {
    const v = ta.value.trim();
    if (!v) { fb.innerHTML = '<div class="fb neutral">Önce cümleni yaz.</div>'; ta.focus(); return; }
    const g = grade(v, it.a);
    if (g === 'ok') { setDone(key, 'ok'); state('ok'); feel(n, true, n.querySelector('.cek')); fb.innerHTML = fbHtml(true, it.why, t); return; }
    if (g === 'comma') { state('no'); setDone(key, 'no'); feel(n, false); fb.innerHTML = '<div class="fb no"><b class="st">Kelimeler doğru, virgül eksik ya da yanlış yerde.</b> Yan cümle her zaman virgülle ayrılır. Düzeltip yeniden kontrol et.</div>' + `<div class="fb neutral" style="margin-top:8px"><b>Neden?</b> ${esc(it.why)}</div>`; return; }
    if (g === 'case') { state('no'); setDone(key, 'no'); feel(n, false); fb.innerHTML = '<div class="fb no"><b class="st">Yalnızca büyük/küçük harf hatası.</b> Almancada isimler ve cümle başı büyük yazılır. Düzeltip yeniden kontrol et.</div>' + `<div class="fb neutral" style="margin-top:8px"><b>Neden?</b> ${esc(it.why)}</div>`; return; }
    fb.innerHTML = `<div class="fb neutral"><b class="st">Örnek cevapla birebir aynı değil.</b> Kelime sırası farklı ama yine de doğru olabilir. Karşılaştır:${modelHtml()}${whyHtml()}</div>`;
    self();
  };
  n.querySelector('.gos').onclick = () => { fb.innerHTML = `<div class="fb neutral"><b class="st">Cevap:</b>${modelHtml()}${whyHtml()}</div>`; };
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) n.querySelector('.cek').click(); });
  if (S.done[key] === 'ok') { state('ok'); ta.value = it.a[0]; fb.innerHTML = '<div class="fb ok"><b class="st">Daha önce doğru yaptın.</b></div>'; }
  return n;
}
function freeItem(id, i, it) {
  const key = id + '-' + i, tid = 'fr-' + key;
  const n = el(`<div class="item">${numHead(i, `<span style="text-transform:none;letter-spacing:0;font-weight:600;color:var(--ink-2)">· ${esc(it.q)}</span>`)}
    <label for="${tid}" hidden>Cümlen</label><textarea id="${tid}" rows="2" lang="de" spellcheck="false" placeholder="Kendi cümleni yaz…"></textarea>
    <div class="row"><button class="btn sm tam">${I('check')} Yazdım</button><button class="btn ghost sm gos">Örnek göster</button></div><div class="fb-h"></div></div>`);
  const fb = n.querySelector('.fb-h'), ta = n.querySelector('textarea'), t = topicOf(id, it);
  const hb = hintBtn(t, fb); if (hb) n.querySelector('.row').append(hb);
  n.querySelector('.gos').onclick = () => { fb.innerHTML = `<div class="fb neutral"><b class="st">Örnek:</b> <span lang="de">${esc(it.s)}</span>${ruleHtml(t)}</div>`; };
  n.querySelector('.tam').onclick = () => {
    if (!ta.value.trim()) { fb.innerHTML = '<div class="fb neutral">Önce cümleni yaz.</div>'; ta.focus(); return; }
    setDone(key, 'ok'); n.classList.add('ok'); feel(n, true, n.querySelector('.tam'));
    fb.innerHTML = `<div class="fb ok">Kaydedildi. Üç şeyi kontrol et: virgül var mı, fiil sonda mı, zaman doğru mu? Örnek: <span lang="de">${esc(it.s)}</span>${ruleHtml(t)}</div>`;
  };
  if (S.done[key] === 'ok') n.classList.add('ok');
  return n;
}

function practice() {
  view.className = 'wide';
  add(`<div class="eyebrow">Pratik</div>`, `<h1>Asıl öğrenme <em>burada.</em></h1>`, `<p class="lede">Dersi okumak ısınmaydı. Hatırlamaya çalıştıkça kural yerine oturur.</p>`);
  const wc = wrongKeys().length;
  const t = [
    ['test', 'shuffle', 'k', 'Karışık test', '10 soru, bütün konular karışık, seri sayacıyla.'],
    ['kur', 'puzzle', 'v', 'Cümle kur', 'Kelimeleri doğru sıraya diz, fiili sona götür.'],
    ['yanlis', 'redo', 'no', 'Yanlışlarım', wc ? `${wc} soru seni bekliyor.` : 'Şu an yanlışın yok.', wc],
    ['kartlar', 'cards', 'h', 'Kartlar', `${dueCards().length} kartın tekrar zamanı geldi.`],
    ['sinav', 'exam', 'gold', 'Deneme sınavı', '20 soru, 30 dakika, gerçek sınav gibi.'],
    ['ozet', 'sum', 'ok', 'Tek sayfa özet', 'Sınavdan önceki son bakış.']
  ];
  const g = el('<div class="grid"></div>');
  t.forEach(x => g.append(el(`<button class="tile" data-go="${x[0]}" style="--tc:var(--${x[2]}-bg);--tf:var(--${x[2]})"><span class="ti">${I(x[1])}</span>${x[5] ? `<span class="badge">${x[5]}</span>` : ''}<b>${x[3]}</b><small>${esc(x[4])}</small></button>`)));
  add(g);
  add(Umut.cameo('Bir ipucu: <b>karışık test</b> en zoru ama en faydalısı. Konular karışınca hangi bağlacın gerektiğini gerçekten seçmen gerekir.', '', true));
}
let mix = null;
function mixTest() {
  if (!mix) mix = {qs: shuffle(POOL.filter(q => q.k === 'pick')).slice(0, 10), i: 0, ok: 0, run: 0, best: 0};
  if (mix.i >= mix.qs.length) {
    const pct = Math.round(mix.ok / mix.qs.length * 100);
    S.tests = (S.tests || 0) + 1; save();
    add(`<div class="eyebrow">Karışık test</div>`, `<h1>Bitti.</h1>`);
    const c = el(`<div class="finish"></div>`);
    if (S.ui.mascot) c.append(Umut.figure(pct >= 60 ? 'hop' : ''));
    c.append(el(`<div class="bigscore">%${pct}</div>`), el(`<p class="muted">${mix.ok} / ${mix.qs.length} doğru · en uzun seri ${mix.best}. Yanlışların “Yanlışlarım” bölümüne eklendi.</p>`));
    const r = el(`<div class="row" style="justify-content:center"><button class="btn accent">${I('redo')} Yeni test</button><button class="btn ghost" data-go="yanlis">Yanlışlarıma git</button></div>`);
    r.querySelector('button').onclick = () => { mix = null; render('test', true); };
    c.append(r); add(c);
    if (pct >= 80) setTimeout(celebrate, 300);
    mix = null;
    return;
  }
  const q = mix.qs[mix.i];
  add(`<div class="timer"><span>Soru ${mix.i + 1} / ${mix.qs.length}</span><span>${I('flame')} ${mix.run} seri</span></div>`);
  add(`<div class="track"><i style="width:${mix.i / mix.qs.length * 100}%"></i></div>`);
  const n = el(`<div class="item" style="padding:26px"><div class="n" lang="de">${esc(TOPICS[q.t])}</div><div class="q big" lang="de">${esc(q.q)}</div><div class="opts"></div><div class="fb-h"></div></div>`);
  const box = n.querySelector('.opts'), fb = n.querySelector('.fb-h'), key = 'p-' + POOL.indexOf(q);
  const hb = hintBtn(q.t, fb); if (hb) box.after(hb);
  shuffle(q.o).forEach(o => {
    const b = el(`<button class="opt" lang="de">${esc(o)}</button>`);
    b.onclick = () => {
      const right = o === q.a;
      box.querySelectorAll('button').forEach(x => { x.disabled = true; if (x.textContent === q.a) x.classList.add('right'); });
      if (right) { mix.ok++; mix.run++; mix.best = Math.max(mix.best, mix.run); if (S.done[key]) setDone(key, 'ok'); } else { b.classList.add('wrong'); mix.run = 0; setDone(key, 'no'); }
      feel(n, right, b); touchDay(); save(); if (hb) hb.remove();
      fb.innerHTML = fbHtml(right, q.why, q.t);
      const nx = el(`<button class="btn accent" style="margin-top:12px">Devam <span class="arr">${I('next')}</span></button>`);
      nx.onclick = () => { mix.i++; render('test', true); scrollTo(0, 0); }; fb.append(nx); nx.focus({preventScroll: true});
    };
    box.append(b);
  });
  add(n);
}
const buildSet = () => LESSONS.flatMap(l => l.blocks.flatMap(b => b.ex || [])).filter(e => e[0].includes('[') && plain(e[0]).split(' ').length >= 5 && plain(e[0]).split(' ').length <= 13);
let buildI = null;
function builder() {
  const set = buildSet();
  if (buildI === null || buildI >= set.length) { buildI = 0; builder.order = shuffle(set); }
  const e = builder.order[buildI], target = plain(e[0]).split(' ');
  add(`<div class="eyebrow">Pratik</div>`, `<h1>Cümle kur</h1>`, `<p class="lede">Kelimelere sırayla dokun. Fiil nereye gidiyor?</p>`);
  const n = el(`<div class="item"><div class="n">${I('puzzle')} ${buildI + 1} / ${set.length}</div><div class="q">${esc(e[1].split(' → ')[0].replace(/^\d+\.\s*/, ''))}</div>
    <div class="tiles ans" lang="de" aria-label="Cümlen"></div><div class="tiles pool" lang="de" aria-label="Kelimeler"></div>
    <div class="row"><button class="btn sm cek">${I('check')} Kontrol et</button><button class="btn ghost sm gos">Cevabı göster</button></div><div class="fb-h"></div></div>`);
  const ans = n.querySelector('.ans'), pool = n.querySelector('.pool'), fb = n.querySelector('.fb-h');
  shuffle(target).forEach(w => {
    const b = el(`<button class="wd">${esc(w)}</button>`);
    b.onclick = () => { const all = [...n.querySelectorAll('.wd')]; flip(all, () => (b.parentElement === pool ? ans : pool).append(b)); };
    pool.append(b);
  });
  const nextBtn = () => { const nx = el(`<button class="btn accent" style="margin-top:12px">Sonraki <span class="arr">${I('next')}</span></button>`); nx.onclick = () => { buildI++; render('kur', true); scrollTo(0, 0); }; fb.append(nx); };
  n.querySelector('.cek').onclick = () => {
    const got = [...ans.children].map(x => x.textContent).join(' ');
    if (got === target.join(' ')) { feel(n, true, ans); n.classList.add('ok'); touchDay(); save(); fb.innerHTML = `<div class="fb ok"><b class="st">Doğru.</b> <span lang="de">${mark(e[0])}</span></div>`; nextBtn(); }
    else { feel(n, false); fb.innerHTML = `<div class="fb no"><b class="st">Henüz değil.</b> ${pool.children.length ? 'Kullanmadığın kelimeler var.' : 'Fiil yerinde mi, virgülden sonra ne geliyor? Bazı cümlelerde başka bir sıralama da doğru olabilir.'}</div>`; }
  };
  n.querySelector('.gos').onclick = () => { fb.innerHTML = `<div class="fb neutral"><span lang="de">${mark(e[0])}</span></div>`; nextBtn(); };
  add(n);
}
function wrongs() {
  add(`<div class="eyebrow">Pratik</div>`, `<h1>Yanlışlarım</h1>`);
  const keys = wrongKeys();
  if (!keys.length) {
    add(Umut.cameo('Düzeltilecek soru yok, ben de biraz kestiriyorum. Yanlış yaptığın her soru buraya gelir ve <b>doğru yapana kadar</b> burada kalır.', 'sleep'));
    add(`<div class="row"><button class="btn accent" data-go="test">${I('shuffle')} Karışık test çöz</button></div>`);
    return;
  }
  add(`<p class="lede">${keys.length} soru. Doğru yaptıkça listeden düşer.</p>`);
  keys.forEach(k => {
    const [id, i] = k.split('-');
    const it = id === 'p' ? POOL[+i] : DRILLS[id] && DRILLS[id].items[+i];
    if (it) add(it.k === 'pick' ? pickItem(id, +i, it) : writeItem(id, +i, it));
  });
}

function summary() {
  add(`<div class="eyebrow">Tekrar</div>`, `<h1>Tek sayfa özet</h1>`, `<p class="lede">Sınavdan önceki son bakış. Her şey slaytlardan.</p>`);
  add(`<div class="card"><h3>Üç temel kural</h3><ol style="margin:0;padding-left:22px;display:flex;flex-direction:column;gap:6px"><li>Çekimli fiil yan cümlenin <span class="v">sonuna</span> gider.</li><li>Ana ve yan cümle arasına <b>virgül</b> konur.</li><li>Yan cümle öndeyse ana cümle fiille başlar: <i lang="de">… habe, komme …</i> (fiil, virgül, fiil).</li></ol></div>`);
  const rows = [
    ['wenn', '-dığında / -se', 'Gegenwart ve Futur; geçmişte tekrarlı', 'Wenn du Zeit hast, …'],
    ['als', '-dığında', 'Yalnızca geçmiş, tek sefer', 'Als ich ein Kind war, …'],
    ['während', '-iken / oysa', 'Aynı kip. Temporal veya adversativ', 'Während er arbeitete, bügelte sie.'],
    ['solange', '-dığı sürece', 'Aynı kip. İkisi birlikte biter', 'Solange es warm ist, …'],
    ['bevor, ehe', '-meden önce', 'Ana cümle önce. Genelde aynı kip', 'Bevor du gehst, …'],
    ['nachdem', '-dikten sonra', 'Perfekt → Präsens; Plusquamperfekt → Präteritum', 'Nachdem er gegessen hatte, ging er.'],
    ['sobald, sowie', '-ir -mez', 'Hemen ardından; aynı anda ise aynı kip', 'Sobald sie kommt, …'],
    ['bis', '-e kadar', 'Çoğunlukla aynı kip. Futur = tahmin', 'Warte, bis ich komme.'],
    ['seit, seitdem', '-den beri', 'Paralel: aynı kip. Etki sürüyor: Zeitenwechsel', 'Seit ich hier wohne, …'],
    ['weil', 'çünkü, -dığı için', 'Warum? cevabı. Kip anlama göre', '…, weil ich keine Zeit habe.'],
    ['da', '-dığı için', 'Yazılı dil, genelde başta', 'Da es regnet, …'],
    ['zumal', 'üstelik', 'İkinci, ek sebep', '…, zumal ich lernen muss.'],
    ['falls', '-se, -sa', 'Yalnızca açık koşul. Çoğunlukla Präsens', 'Falls du kommst, …'],
    ['(bağlaçsız)', '-se, -sa', 'Fiil başa, sonra (so/dann)', 'Hast du Zeit, (so) …']
  ];
  add(`<div class="tw"><table><thead><tr><th>Bağlaç</th><th>Anlam</th><th>Zaman / kural</th><th>Örnek</th></tr></thead><tbody>${rows.map(r => `<tr><td lang="de"><span class="k">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td lang="de"><i>${r[3]}</i></td></tr>`).join('')}</tbody></table></div>`);
  add(`<h2>Karar sırası</h2>`);
  add(`<ol class="card" style="margin:0;padding:20px 20px 20px 44px;display:flex;flex-direction:column;gap:8px">
    <li>“-dığında” mı? <b>Geçmiş ve tek sefer</b> ise als, değilse wenn.</li>
    <li>“-se” mi? wenn veya falls, ya da fiil başa.</li>
    <li>Aynı anda mı? während; birlikte bitiyorsa solange.</li>
    <li>Önce / sonra mı? Ana cümle önceyse bevor; yan cümle önceyse nachdem veya sobald.</li>
    <li>Başlangıç mı, bitiş mi? Geçmişten şimdiye seit; bir noktaya kadar bis.</li>
    <li>Sebep mi? weil; yazıda ve başta da; ek sebep zumal.</li></ol>`);
  add(`<h2>En sık hatalar</h2>`);
  add(`<div class="tw"><table><thead><tr><th>Yanlış</th><th>Doğru</th></tr></thead><tbody>
    <tr><td lang="de">…, weil ich habe keine Zeit.</td><td lang="de">…, weil ich keine Zeit <span class="v">habe</span>.</td></tr>
    <tr><td lang="de">Wenn ich Zeit habe, ich komme.</td><td lang="de">Wenn ich Zeit habe, <span class="h">komme</span> ich.</td></tr>
    <tr><td lang="de">Wenn ich gestern kam, …</td><td lang="de"><span class="k">Als</span> ich gestern kam, …</td></tr>
    <tr><td lang="de">Nachdem ich esse, gehe ich.</td><td lang="de">Nachdem ich gegessen <span class="v">habe</span>, gehe ich.</td></tr>
    <tr><td lang="de">Nachdem er gelandet hatte, …</td><td lang="de">Nachdem er gelandet <span class="v">war</span>, …</td></tr>
    <tr><td lang="de">Seit 25 Jahren lebte sie hier. (hâlâ yaşıyorsa)</td><td lang="de">Seit 25 Jahren <span class="h">lebt</span> sie hier.</td></tr>
    <tr><td lang="de">…, wenn sie ihn ruft an.</td><td lang="de">…, wenn sie ihn <span class="v">anruft</span>.</td></tr>
    <tr><td lang="de">…, dagegen sie ist …</td><td lang="de">…, dagegen <span class="h">ist</span> sie …</td></tr></tbody></table></div>`);
}

// kartlar aralıklı tekrarla geliyor, 1 3 7 14 gün
const INTERVALS = [1, 3, 7, 14];
let cardFilter = 'Bağlaç', cardDeck = [], cardAll = false;
function cards() {
  add(`<div class="eyebrow">Aralıklı tekrar</div>`, `<h1>Kartlar</h1>`, `<p class="lede">Önce kendin hatırla, sonra çevir. Bildiklerin daha seyrek, bilmediklerin daha sık gelir.</p>`);
  const groups = ['Bağlaç', 'Terim', 'Tahta', 'Kelime'];
  const due = g => CARDS.filter(c => c[0] === g && dueCards().includes(c)).length;
  const chips = el('<div class="chips" role="group" aria-label="Kart grubu"></div>');
  groups.forEach(g => { const b = el(`<button class="chip ${g === cardFilter ? 'on' : ''}" aria-pressed="${g === cardFilter}">${g} <em>${due(g)}</em></button>`); b.onclick = () => { cardFilter = g; cardDeck = []; cardAll = false; render('kartlar', true); }; chips.append(b); });
  add(chips);
  if (!cardDeck.length) cardDeck = shuffle(CARDS.filter(c => c[0] === cardFilter && (cardAll || dueCards().includes(c))));
  if (!cardDeck.length) {
    add(Umut.cameo('<b>Bu grup bugünlük tamam.</b> Kartlar tekrar zamanı gelince geri dönecek. O zamana kadar ben de dinleniyorum.', 'sleep'));
    const r = el('<div class="row"><button class="btn ghost">Yine de hepsini çalış</button></div>');
    r.querySelector('button').onclick = () => { cardAll = true; render('kartlar', true); };
    add(r);
    return;
  }
  const c = cardDeck[0];
  const card = el(`<button class="flip" aria-label="Kartı çevir"><span class="in"><span class="f"><span class="grp">${esc(c[0])}</span><span class="big" lang="de">${esc(c[1])}</span><small>Anlamını hatırla, sonra dokun</small></span><span class="f b"><span class="grp">${esc(c[0])}</span><span class="ans">${esc(c[2])}</span><small lang="de">${esc(c[1])}</small></span></span></button>`);
  const rate = el('<div class="row" style="justify-content:center;visibility:hidden"><button class="btn ghost no">Bilemedim</button><button class="btn accent yes">Biliyordum</button></div>');
  card.onclick = () => { card.classList.toggle('on'); rate.style.visibility = 'visible'; };
  const finish = known => {
    const b = S.box[c[1]] || {b: 0, due: today()};
    if (known) { S.box[c[1]] = {b: Math.min(b.b + 1, 3), due: addDays(INTERVALS[b.b])}; cardDeck.shift(); }
    else { S.box[c[1]] = {b: 0, due: today()}; cardDeck.push(cardDeck.shift()); }
    S.rev[today()] = (S.rev[today()] || 0) + 1; touchDay(); save();
    if (S.rev[today()] === REV_GOAL) { celebrate(); toast('Günlük tekrar hedefi tamam!'); }
    render('kartlar', true);
  };
  rate.querySelector('.no').onclick = () => finish(false);
  rate.querySelector('.yes').onclick = () => finish(true);
  add(card, rate);
  add(`<p class="muted" style="text-align:center;font-size:.9rem;font-variant-numeric:tabular-nums">Bugün ${S.rev[today()] || 0} / ${REV_GOAL} · bu destede ${cardDeck.length} kart kaldı</p>`);
}

let exam = null;
function pickExam() {
  const qs = [];
  Object.keys(TOPICS).forEach(t => qs.push(...shuffle(POOL.filter(q => q.t === t && q.k === 'pick')).slice(0, 2)));
  qs.push(...shuffle(POOL.filter(q => q.k === 'write')).slice(0, 4));
  return shuffle(qs).map(q => Object.assign({}, q, {src: POOL.indexOf(q)}, q.k === 'pick' ? {o: shuffle(q.o)} : {}));
}
function examPage() {
  if (exam && !exam.finished) return examRun();
  if (exam && exam.finished) return examResult();
  add(`<div class="eyebrow">Pratik</div>`, `<h1>Deneme sınavı</h1>`, `<p class="lede">20 soru, 30 dakika. Bitirene kadar cevaplar gösterilmez.</p>`);
  add(noteBox('warn', 'info', '', 'Hocanın gerçek sınav biçimini notlardan bilemiyorum. Bu deneme slaytlardaki kural ve alıştırma tiplerine göre hazırlandı: 16 çoktan seçmeli, 4 cümle dönüştürme.'));
  if (S.exams.length) add(`<p>Önceki sonuçların: ${S.exams.slice(-6).map(x => '<b>%' + x + '</b>').join(', ')}</p>`);
  const b = el(`<div class="row"><button class="btn accent lg">${I('clock')} Sınavı başlat</button></div>`);
  b.querySelector('button').onclick = () => { exam = {qs: pickExam(), ans: {}, left: 1800, finished: false, self: {}}; exam.timer = setInterval(tick, 1000); render('sinav', true); };
  add(b);
}
function tick() {
  if (!exam) return;
  exam.left--;
  const t = document.getElementById('clock');
  if (t) t.textContent = fmt(exam.left);
  if (exam.left <= 0) finishExam();
}
const fmt = s => pad(Math.floor(s / 60)) + ':' + pad(s % 60);
function examRun() {
  add(`<div class="timer"><span>Deneme sınavı</span><span>${I('clock')} <span id="clock">${fmt(exam.left)}</span></span></div>`);
  exam.qs.forEach((q, i) => {
    const n = el(`<div class="item"><div class="n">Soru ${pad(i + 1)} / ${exam.qs.length}</div><div class="q" lang="de">${esc(q.q)}</div></div>`);
    if (q.k === 'pick') {
      const box = el('<div class="opts"></div>');
      q.o.forEach(o => { const b = el(`<button class="opt ${exam.ans[i] === o ? 'chosen' : ''}" lang="de">${esc(o)}</button>`); b.onclick = () => { exam.ans[i] = o; box.querySelectorAll('button').forEach(x => x.classList.remove('chosen')); b.classList.add('chosen'); }; box.append(b); });
      n.append(box);
    } else {
      const ta = el(`<textarea rows="2" lang="de" spellcheck="false" placeholder="Cümleni yaz…" aria-label="Cevabın"></textarea>`);
      ta.value = exam.ans[i] || ''; ta.oninput = () => { exam.ans[i] = ta.value; };
      n.append(ta);
    }
    add(n);
  });
  const end = el(`<div class="row"><button class="btn accent lg">${I('check')} Sınavı bitir</button></div>`);
  end.querySelector('button').onclick = finishExam;
  add(end);
}
function isRight(q, i) {
  const a = exam.ans[i] || '';
  if (q.k === 'pick') return a === q.a;
  if (exam.self[i] !== undefined) return exam.self[i];
  return grade(a, q.a) === 'ok';
}
const examScore = () => Math.round(exam.qs.filter((q, i) => isRight(q, i)).length / exam.qs.length * 100);
function finishExam() {
  if (!exam || exam.finished) return;
  clearInterval(exam.timer); exam.finished = true;
  exam.score = examScore(); S.exams.push(exam.score); exam.saved = S.exams.length - 1;
  exam.qs.forEach((q, i) => { const k = 'p-' + q.src; if (isRight(q, i)) { if (S.done[k]) S.done[k] = 'ok'; } else S.done[k] = 'no'; });
  touchDay(); save();
  if (exam.score >= 85) setTimeout(celebrate, 400);
  render('sinav', true); scrollTo(0, 0);
}
function examResult() {
  const score = examScore();
  S.exams[exam.saved] = score; save();
  add(`<div class="eyebrow">Deneme sınavı</div>`, `<h1>Sonuç</h1>`);
  const c = el('<div class="finish"></div>');
  if (S.ui.mascot) c.append(Umut.figure(score >= 60 ? 'hop' : ''));
  c.append(el(`<div class="bigscore">%${score}</div>`), el(`<p class="muted" style="max-width:30em">${score >= 85 ? 'Çok iyi. Bir kez daha %85 üstü al, sonra sınava hazırsın.' : 'Aşağıdaki zayıf konulara dön ve yanlışlarını düzelt. Sonra yeni bir deneme çöz.'}</p>`));
  add(c);
  const by = {};
  exam.qs.forEach((q, i) => { by[q.t] = by[q.t] || [0, 0]; by[q.t][1]++; if (isRight(q, i)) by[q.t][0]++; });
  add(`<div class="tw"><table><thead><tr><th>Konu</th><th>Doğru</th><th></th></tr></thead><tbody>${Object.entries(by).map(([t, v]) => `<tr><td lang="de">${TOPICS[t]}</td><td>${v[0]} / ${v[1]}</td><td>${v[0] < v[1] ? `<button class="btn ghost sm" data-go="ders-${t}">Derse dön</button>` : I('check')}</td></tr>`).join('')}</tbody></table></div>`);
  add('<h2>Soruları incele</h2>');
  exam.qs.forEach((q, i) => {
    const right = isRight(q, i), a = exam.ans[i] || '(boş)';
    const n = el(`<div class="item ${right ? 'ok' : 'no'}"><div class="n">Soru ${pad(i + 1)}</div><div class="q" lang="de">${esc(q.q)}</div>
      <div class="fb ${right ? 'ok' : 'no'}"><b class="st">${right ? 'Doğru.' : 'Yanlış.'}</b> Senin cevabın: <span lang="de">${esc(a)}</span><br>Doğru cevap: <span lang="de">${esc(q.k === 'pick' ? q.a : q.a[0])}</span><br>${esc(q.why)}${ruleHtml(q.t)}</div></div>`);
    if (q.k === 'write' && !right && a !== '(boş)') {
      const b = el('<div class="row"><button class="btn ghost sm">Benimki de doğru, say</button></div>');
      b.querySelector('button').onclick = () => { exam.self[i] = true; delete S.done['p-' + q.src]; save(); render('sinav', true); };
      n.append(b);
    }
    add(n);
  });
  const again = el(`<div class="row"><button class="btn accent lg">${I('redo')} Yeni deneme başlat</button></div>`);
  again.querySelector('button').onclick = () => { exam = null; render('sinav', true); scrollTo(0, 0); };
  add(again);
}

function ask() {
  add(`<div class="eyebrow">Yardım</div>`, `<h1>Soru sor</h1>`, `<p class="lede">Aklına takılan her şey için hazır cevaplara bak. Bir anahtar kelimeyle arayabilirsin.</p>`);
  const s = el('<input type="search" placeholder="Ara: seit, Futur, virgül…" aria-label="Hazır cevaplarda ara">');
  add(s);
  const list = el('<div></div>');
  const low = x => x.toLocaleLowerCase('tr');
  const draw = () => {
    const q = low(s.value.trim());
    const hits = FAQ.filter(f => !q || low(f[0] + ' ' + f[1]).includes(q));
    list.innerHTML = hits.length ? '' : '<p class="muted" style="padding:16px 0">Sonuç yok. Başka bir kelime dene.</p>';
    hits.forEach(fq => { const l = LESSONS.find(x => x.id === fq[2]); list.append(el(`<details><summary>${esc(fq[0])}</summary><div class="ans"><p>${esc(fq[1])}</p>${l ? `<button class="btn ghost sm" data-go="ders-${fq[2]}">Derse git: <span lang="de">${esc(l.title)}</span></button>` : ''}</div></details>`)); });
  };
  s.oninput = draw; draw();
  add(list);
  add(Umut.cameo('Cevabı bulamadıysan sorunu bir anahtar kelimeyle aramayı dene: <b>Futur, virgül, Plusquamperfekt</b> gibi.', '', true));
}

drawNav();
render(location.hash.slice(1) || 'basla', true);
reveal(true);
