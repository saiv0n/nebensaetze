// sitenin su samuru umut, sayfalarda arada bir çıkıyor
const Umut = (() => {
  const svg = () => `<svg viewBox="0 0 100 116" aria-hidden="true" focusable="false">
    <ellipse class="u-shadow" cx="50" cy="112" rx="24" ry="3.4"/>
    <g class="face-r">
      <path class="u-fur2" d="M63 99c13 4 27 1 32-9 2-4.4-2-7.4-6-5.2-6.400 3.400-14.600 5.200-26 4.600z"/>
      <g class="u-leg-l"><ellipse class="u-fur2" cx="40" cy="107" rx="8.5" ry="5"/></g>
      <g class="u-leg-r"><ellipse class="u-fur2" cx="60" cy="107" rx="8.5" ry="5"/></g>
      <g class="u-body">
        <path class="u-fur" d="M50 57c13 0 22 12 22 29 0 14-9 22-22 22s-22-8-22-22c0-17 9-29 22-29z"/>
        <ellipse class="u-cream" cx="50" cy="89" rx="13.5" ry="16"/>
        <g class="u-head">
          <circle class="u-fur" cx="23.5" cy="33" r="5.6"/><circle class="u-fur2" cx="23.5" cy="33.4" r="2.6"/>
          <circle class="u-fur" cx="76.5" cy="33" r="5.6"/><circle class="u-fur2" cx="76.5" cy="33.4" r="2.6"/>
          <path class="u-fur" d="M50 19.500c17.500 0 29.500 9.500 29.500 23.500 0 13.500-12.500 21.500-29.500 21.500S20.500 56.500 20.500 43c0-14 12-23.500 29.500-23.500z"/>
          <path class="u-cream" d="M50 40.500c9.500 0 16.500 4 18.500 10.500 2 7.200-6.400 12.300-18.500 12.300S29.500 58.200 31.500 51c2-6.500 9-10.500 18.500-10.500z"/>
          <circle class="u-cream" cx="44" cy="52.500" r="6.600"/><circle class="u-cream" cx="56" cy="52.500" r="6.600"/>
          <ellipse class="u-cheek" cx="31.500" cy="47.500" rx="3.800" ry="2.300"/>
          <ellipse class="u-cheek" cx="68.500" cy="47.500" rx="3.800" ry="2.300"/>
          <g class="u-eyes">
            <circle class="u-eye" cx="38.500" cy="38" r="4"/><circle class="u-glint" cx="40" cy="36.500" r="1.400"/>
            <circle class="u-eye" cx="61.500" cy="38" r="4"/><circle class="u-glint" cx="63" cy="36.500" r="1.400"/>
          </g>
          <g class="u-fur2"><circle cx="41" cy="51.500" r=".75"/><circle cx="42.800" cy="54.800" r=".75"/><circle cx="59" cy="51.500" r=".75"/><circle cx="57.200" cy="54.800" r=".75"/></g>
          <path class="u-nose" d="M44.300 45.300c3.800-1.700 7.600-1.700 11.400 0 .3 2.800-2.500 5.200-5.700 5.200s-6-2.400-5.700-5.200z"/>
          <path class="u-line" style="stroke-width:1.5" d="M50 50.300v2.400M47 54.600q3 2.300 6 0"/>
          <path class="u-whisk" d="M38.500 51l-13.500-2.600M38.500 54.200l-12.500 1.600M61.500 51l13.500-2.600M61.500 54.200l12.500 1.600"/>
        </g>
        <path class="u-scarf" d="M29.500 61c12.500 6.600 28.500 6.600 41 0l1.300 5.800c-13.400 7.200-30.200 7.200-43.600 0z"/>
        <path class="u-scarf2" d="M57.500 67.500l6.600-1 2.500 13.800c.3 1.500-.7 2.900-2.200 3.100l-2.400.3c-1.500.2-2.900-.8-3.100-2.300z"/>
        <g class="u-arm-l"><rect class="u-fur" x="26.500" y="68" width="9" height="22" rx="4.500" transform="rotate(12 31 70)"/></g>
        <g class="u-arm-r"><rect class="u-fur" x="64.500" y="68" width="9" height="22" rx="4.500" transform="rotate(-12 69 70)"/></g>
      </g>
      <path class="u-zzz u-line" style="stroke-width:1.8" d="M80 10h7l-7 8h7M90 0h5l-5 6h5"/>
    </g>
  </svg>`;

  const make = cls => { const d = document.createElement('div'); d.className = 'umut ' + (cls || ''); d.innerHTML = svg(); return d; };
  const live = () => typeof motionOk === 'function' ? motionOk() : true;
  const on = () => typeof S === 'undefined' || S.ui.mascot !== false;

  // görünür olunca bir kere oynuyor (el sallama, zıplama), sürekli değil
  function onceVisible(node, fn) {
    if (!('IntersectionObserver' in window)) return fn();
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); setTimeout(fn, 350); } }, {threshold: .6});
    io.observe(node);
  }
  function figure(pose) {
    const f = make();
    if (pose === 'sleep') f.classList.add('sleep');
    if (live() && (pose === 'wave' || pose === 'hop')) onceVisible(f, () => { f.classList.add(pose); setTimeout(() => f.classList.remove(pose), 1500); });
    return f;
  }
  function cameo(html, pose, small) {
    if (!on()) return null;
    const c = document.createElement('div');
    c.className = 'cameo' + (small ? ' sm' : '');
    c.append(figure(pose));
    const b = document.createElement('div'); b.className = 'bubble'; b.innerHTML = html; c.append(b);
    return c;
  }

  // sahnede umut cümleyi baştan kuruyor. d.m ana cümle, d.mv onun fiil sırası, d.a yan cümle olacak cümle, d.v onun fiil sırası
  // d.c bağlaç (yoksa d.front, koşulda fiil başa), d.keep / d.mkeep ilk harf küçülmesin (Sie, özel isim), d.tr çeviri
  const GAP = 7, CARRY_Y = 26, MAN_Y = 60, MAN_W = 76, TRACK_H = 146;
  const lower = (w, keep) => keep ? w : w.charAt(0).toLowerCase() + w.slice(1);
  const upper = w => w.charAt(0).toUpperCase() + w.slice(1);
  const MEAN = {
    weil: '“çünkü, -dığı için”: sebep bildirir', da: '“-dığı için, madem”: bilinen bir sebep', zumal: '“üstelik -dığı için”: ek bir sebep',
    wenn: '“-dığında / -se”: zaman ya da koşul', als: '“-dığında”: geçmişte tek sefer', 'während': '“-iken” ya da “oysa”',
    solange: '“-dığı sürece”', bevor: '“-meden önce”', ehe: '“-meden önce” (daha resmî)', nachdem: '“-dikten sonra”',
    sobald: '“-ir -mez”', sowie: '“-ir -mez”', bis: '“-e kadar”', seit: '“-den beri”', seitdem: '“-den beri”', falls: '“-diği takdirde, -se”'
  };
  // örneğin bitmiş hali, statik görünüm de altyazılar da buradan besleniyor
  function forms(d) {
    const sw = d.a.split(' '), mw = d.m.split(' '), v = sw[d.v], mv = mw[d.mv];
    const sRest = sw.filter((_, i) => i !== d.v), mRest = mw.filter((_, i) => i !== d.mv);
    const subLow = sRest.map((x, i) => i === 0 ? lower(x, d.keep) : x);
    const mainLow = mRest.map((x, i) => i === 0 ? lower(x, d.mkeep) : x);
    if (d.front) return {v, mv, full: `${upper(v)} ${subLow.join(' ')}, ${mv} ${mainLow.join(' ')}.`};
    return {v, mv,
      full: `${d.m}, ${d.c} ${subLow.join(' ')} ${v}.`,
      flip: d.noflip ? '' : `${upper(d.c)} ${subLow.join(' ')} ${v}, ${mv} ${mainLow.join(' ')}.`};
  }
  function staticHtml(list) {
    return list.map(d => {
      const f = forms(d);
      return `<div lang="de">${f.full}</div>${f.flip ? `<div lang="de">${f.flip}</div>` : ''}<div class="muted">${d.tr}</div>`;
    }).join('');
  }

  function scene(list, title) {
    const st = document.createElement('div');
    st.className = 'stage';
    st.innerHTML = `<div class="stage-top"><div class="eyebrow">${title || 'Umut gösteriyor'}</div><div class="stage-ctl"><button class="stage-b" data-sc="prev" aria-label="Önceki örnek" title="Önceki örnek">${I('chevL')}</button><div class="stage-step">${list.map((_, i) => `<button data-sc="${i}" aria-label="${i + 1}. örnek"><i></i></button>`).join('')}</div><button class="stage-b" data-sc="next" aria-label="Sonraki örnek" title="Sonraki örnek">${I('chevR')}</button><button class="stage-b" data-sc="pause" aria-label="Durdur" title="Durdur">${I('pause')}</button></div></div>`;
    if (!live() || !on()) {
      st.insertAdjacentHTML('beforeend', `<div class="stage-static">${staticHtml(list)}</div>`);
      st.querySelector('.stage-ctl').remove();
      return st;
    }
    st.insertAdjacentHTML('beforeend', `<div class="stage-body"><div class="stage-ground"></div><div class="stage-track"></div></div><div class="stage-cap" aria-live="polite"><span></span></div>`);
    const body = st.querySelector('.stage-body'), track = st.querySelector('.stage-track'), capEl = st.querySelector('.stage-cap span'), steps = [...st.querySelectorAll('.stage-step button')];
    const man = make(); track.append(man);
    let vis = false, need = 300, manX = 0, started = false, paused = false, stop = false, want = null;
    const wakers = new Set();

    // kullanıcı başka örneğe geçerse stop, oynayan hemen bırakılıyor
    const alive = () => st.isConnected && !stop;
    const gate = () => new Promise(res => { const t = () => { if (!alive()) return res(false); if (vis && !paused && !document.hidden && live()) return res(true); setTimeout(t, 120); }; t(); });
    const sleep = ms => new Promise(r => { const w = () => { clearTimeout(id); wakers.delete(w); r(); }, id = setTimeout(w, ms); wakers.add(w); }).then(gate);
    const pauseBtn = st.querySelector('[data-sc="pause"]');
    const setPaused = v => { paused = v; pauseBtn.innerHTML = I(v ? 'play' : 'pause'); pauseBtn.title = v ? 'Oynat' : 'Durdur'; pauseBtn.setAttribute('aria-label', pauseBtn.title); st.classList.toggle('paused', v); };
    const jump = i => { want = (i + list.length) % list.length; stop = true; [...wakers].forEach(w => w()); };
    let idx = 0;
    st.querySelector('.stage-ctl').addEventListener('click', e => {
      const b = e.target.closest('[data-sc]'); if (!b) return;
      const k = b.dataset.sc;
      if (k === 'pause') setPaused(!paused);
      else jump(k === 'prev' ? idx - 1 : k === 'next' ? idx + 1 : +k);
    });
    const pos = (n, x, y) => { n._x = x; n._y = y; n.style.transform = `translate(${x}px,${y}px)`; };
    const fit = () => {
      const W = body.clientWidth - 32, s = Math.min(1, W / need), H = Math.round(TRACK_H * s + 50);
      body.style.height = H + 'px';
      track.style.transform = `translate(${(body.clientWidth - need * s) / 2}px,${H - 26 - TRACK_H * s}px) scale(${s})`;
    };
    const caption = async t => {
      capEl.classList.add('out'); await new Promise(r => setTimeout(r, 160));
      capEl.innerHTML = t; capEl.classList.remove('out');
    };
    const layout = toks => { let x = 0; return toks.map((t, i) => { if (i && (t.textContent === '.' || t.textContent === ',')) x -= GAP - 1; const at = x; x += t.offsetWidth + GAP; return at; }); };
    const place = order => { const xs = layout(order); order.forEach((t, i) => { if (!t.classList.contains('lift')) pos(t, xs[i], 0); }); return xs; };
    const walkTo = async (x, extraNode) => {
      const dx = x - manX, dur = Math.round(Math.min(950, Math.max(380, 300 + Math.abs(dx) * 1.5)));
      if (Math.abs(dx) < 4) return 0;
      man.classList.toggle('left', dx < 0);
      man.style.transitionDuration = dur + 'ms';
      man.classList.add('walk');
      pos(man, x, MAN_Y); manX = x;
      if (extraNode) { extraNode.style.transition = `transform ${dur}ms var(--ease-io)`; pos(extraNode, x + MAN_W / 2 - extraNode.offsetWidth / 2, CARRY_Y); }
      await sleep(dur);
      man.classList.remove('walk');
      if (extraNode) extraNode.style.transition = '';
      return dur;
    };
    // umut kelimeye yürüyüp kaldırıyor, ötekiler kayıyor, sonra yerine bırakıyor
    async function carry(tok, order, cls) {
      await walkTo(tok._x + tok.offsetWidth / 2 - MAN_W / 2);
      if (!alive()) return false;
      man.classList.add('lift'); tok.classList.add('lift');
      pos(tok, tok._x, CARRY_Y);
      if (!await sleep(280)) return false;
      const xs = place(order), x = xs[order.indexOf(tok)];
      await walkTo(x + tok.offsetWidth / 2 - MAN_W / 2, tok);
      if (!alive()) return false;
      man.classList.remove('lift'); tok.classList.remove('lift');
      if (cls) { tok.classList.remove('hv'); tok.classList.add(cls); }
      pos(tok, x, 0);
      man.classList.add('hop'); setTimeout(() => man.classList.remove('hop'), 600);
      return true;
    }

    async function play(d, idx) {
      steps.forEach((s, i) => s.classList.toggle('on', i === idx));
      const f = forms(d);
      const mkTok = (txt, cls) => { const t = document.createElement('span'); t.className = 'tok ' + (cls || ''); t.textContent = txt; t.style.opacity = 0; track.insertBefore(t, man); return t; };
      const sub = d.a.split(' ').map((w, i) => mkTok(w, i === d.v ? 'hv' : ''));
      const main = d.m.split(' ').map((w, i) => mkTok(w, i === d.mv ? 'hv' : ''));
      const verb = sub[d.v], mverb = main[d.mv], dot = mkTok('.', 'p'), comma = mkTok(',', 'p');
      const conj = d.c ? mkTok(d.c, 'k') : null;
      const subRest = sub.filter(t => t !== verb), mRest = main.filter(t => t !== mverb);
      need = [...main, comma, conj, ...sub, dot].filter(Boolean).reduce((a, t) => a + t.offsetWidth + GAP, 0) + 24;
      fit();
      const show = ts => ts.forEach((t, i) => { t.style.transitionDelay = `0ms, ${i * 35}ms`; t.style.opacity = 1; setTimeout(() => { t.style.transitionDelay = ''; }, 600); });
      const dropIn = (ts, order) => { const xs = layout(order); ts.forEach(t => { t.style.transition = 'none'; pos(t, xs[order.indexOf(t)], -18); }); void track.offsetWidth; ts.forEach(t => { t.style.transition = ''; }); place(order); show(ts); };

      // 1. tek cümle, fiil 2. sırada
      place([...sub, dot]);
      if (!started) { started = true; man.style.transitionDuration = '0ms'; pos(man, 0, MAN_Y); manX = 0; void man.offsetWidth; }
      show([...sub, dot]);
      await caption(`<b lang="de">${d.a}.</b> Tek başına bir cümle. Çekimli fiil <span class="h">${f.v}</span> 2. sırada.`);
      if (!await sleep(1500)) return false;

      if (d.front) {
        // 2. ana cümle arkaya, bağlaç yok
        main[0].textContent = lower(main[0].textContent, d.mkeep);
        dropIn([comma, ...main], [...sub, comma, ...main, dot]);
        await caption(`Arkasına ana cümle geliyor: <i lang="de">${d.m}</i>. Bağlaç yok ama ilk kısım bir <b>koşul</b>.`);
        if (!await sleep(1500)) return false;
        // 3. koşulu fiil kuruyor, fiil başa
        await caption(`Bağlaç olmayınca koşulu fiil kurar: Umut <span class="v">${f.v}</span> fiilini <b>en başa</b> taşıyor.`);
        sub[0].textContent = lower(sub[0].textContent, d.keep); verb.textContent = upper(verb.textContent);
        if (!await carry(verb, [verb, ...subRest, comma, ...main, dot], 'nv')) return false;
        // 4. ana cümle de fiille başlıyor
        await caption(`Koşul öndeyse ana cümle <b>fiille</b> başlar: <span class="h">${f.mv}</span> virgülün hemen arkasına.`);
        mRest[0].textContent = lower(mRest[0].textContent, d.mkeep);
        if (!await carry(mverb, [verb, ...subRest, comma, mverb, ...mRest, dot])) return false;
        await caption(`<b lang="de">${f.full}</b><br>${d.tr}`);
        if (!await sleep(3000)) return false;
      } else {
        // 2. ana cümle öne, bağlaç araya
        sub[0].textContent = lower(sub[0].textContent, d.keep);
        dropIn([...main, comma, conj], [...main, comma, conj, ...sub, dot]);
        await caption(`Önüne ana cümle geldi: <i lang="de">${d.m}</i>. <span class="k">${d.c}</span> = ${MEAN[d.c] || 'bağlaç'}.`);
        if (!await sleep(1700)) return false;
        // 3. fiil sona
        await caption(`<span class="k">${d.c}</span> bir yan cümle açtı. Yan cümlede çekimli fiil <b>en sona</b> gider: Umut <span class="v">${f.v}</span> fiilini taşıyor.`);
        if (!await carry(verb, [...main, comma, conj, ...subRest, verb, dot], 'nv')) return false;
        await caption(`<b lang="de">${f.full}</b><br>${d.tr}`);
        if (!await sleep(d.noflip ? 3000 : 2600)) return false;
        if (!d.noflip) {
          // 4. yan cümle öne, ana cümle fiille başlıyor
          conj.textContent = upper(d.c);
          main[0].textContent = lower(main[0].textContent, d.mkeep);
          place([conj, ...subRest, verb, comma, ...main, dot]);
          await caption('Yan cümle öne de geçebilir. O zaman ana cümle <b>fiille</b> başlar…');
          if (!await sleep(900)) return false;
          if (!await carry(mverb, [conj, ...subRest, verb, comma, mverb, ...mRest, dot])) return false;
          await caption(`<b lang="de">${f.flip}</b><br>Ortada <b>fiil, virgül, fiil</b>: <span class="v">${f.v}</span>, <span class="h">${f.mv}</span>. Anlam aynı.`);
          if (!await sleep(3000)) return false;
        }
      }

      // 5. sahneyi temizle
      [...track.querySelectorAll('.tok')].forEach(t => { t.style.opacity = 0; });
      await sleep(380);
      track.querySelectorAll('.tok').forEach(t => t.remove());
      return true;
    }

    async function run() {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      let jumped = false;
      while (st.isConnected) {
        stop = false;
        // atlandıysa, durmuş olsa bile yeni örneğin ilk adımı hemen görünsün
        if (jumped || await gate()) await play(list[idx], idx);
        jumped = want !== null;
        if (!st.isConnected) return;
        if (want !== null) {
          // atlamada sahneyi hemen temizle, umut'u yerine koy
          track.querySelectorAll('.tok').forEach(t => t.remove());
          man.classList.remove('walk', 'lift', 'hop');
          idx = want; want = null;
        } else idx = (idx + 1) % list.length;
      }
    }
    const io = new IntersectionObserver(es => { vis = es.some(e => e.isIntersecting); }, {threshold: .35});
    io.observe(st);
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(body);
    setTimeout(run, 400);
    return st;
  }

  return {scene, cameo, figure};
})();
