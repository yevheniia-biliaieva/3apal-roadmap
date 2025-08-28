// ============ Навігація між тасками ============
function scrollToTask(id){
  const el = document.getElementById(id);
  if (!el) return;
  document.querySelectorAll('.task').forEach(t=>t.classList.remove('highlight'));
  el.classList.add('highlight');
  el.scrollIntoView({behavior:'smooth', block:'center'});
}

function makeLinks(){
  document.querySelectorAll('[data-deps]').forEach(card=>{
    const id = card.id;

    // "Залежить від"
    const deps = card.dataset.deps ? card.dataset.deps.split(',').filter(Boolean) : [];
    const depsWrap = card.querySelector('.deps-list');
    deps.forEach((d, idx)=>{
      const span = document.createElement('span');
      span.className = 'linklike';
      span.textContent = document.getElementById(d)?.dataset.title || d;
      span.onclick = ()=>scrollToTask(d);
      span.setAttribute('data-dep-src', d);
      depsWrap.appendChild(span);
      if (idx < deps.length - 1){
        const s = document.createElement('span');
        s.className = 'sep'; s.textContent = ', ';
        depsWrap.appendChild(s);
      }
    });

    // "Відкриває"
    const unlocks = window.revMap ? (window.revMap[id] || []) : [];
    const unlWrap = card.querySelector('.unlocks-list');
    unlocks.forEach((u, idx)=>{
      const span = document.createElement('span');
      span.className = 'linklike';
      span.textContent = document.getElementById(u)?.dataset.title || u;
      span.onclick = ()=>scrollToTask(u);
      unlWrap.appendChild(span);
      if (idx < unlocks.length - 1){
        const s = document.createElement('span');
        s.className = 'sep'; s.textContent = ', ';
        unlWrap.appendChild(s);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', makeLinks);


// ============ Done + Ready ============
(function(){
  const KEY = 'doneTasks.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  function applyReady(set){
    document.querySelectorAll('.task').forEach(card=>{
      if(card.classList.contains('done')){
        card.classList.remove('ready'); return;
      }
      const deps = (card.dataset.deps || '').split(',').filter(Boolean);
      if(deps.length === 0 || deps.every(d => set.has(d))){
        card.classList.add('ready');
      } else {
        card.classList.remove('ready');
      }
    });
  }

  function applyDoneUI(set){
    document.querySelectorAll('.task').forEach(el=>{
      if (set.has(el.id)) el.classList.add('done'); else el.classList.remove('done');
    });
    document.querySelectorAll('.deps-list .linklike').forEach(el=>{
      const src = el.getAttribute('data-dep-src');
      if (src && set.has(src)) el.classList.add('dep-done'); else el.classList.remove('dep-done');
    });
    applyReady(set);
  }

  function toggleById(id){
    const current = new Set(load());
    if (current.has(id)) current.delete(id); else current.add(id);
    save(Array.from(current));
    applyDoneUI(current);

    // авто-Save у GitHub
    if (typeof window.__saveState === 'function') {
      clearTimeout(window.__saveDebounce);
      window.__saveDebounce = setTimeout(()=>{
        try {
          const cfg = JSON.parse(localStorage.getItem('ghSyncCfg.v1') || '{}');
          if (cfg && cfg.token) window.__saveState();
        } catch(_) {}
      }, 400);
    }
  }

  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if (card){ e.preventDefault(); toggleById(card.id); }
  }, true);

  document.addEventListener('DOMContentLoaded', ()=>applyDoneUI(new Set(load())));

  if ('MutationObserver' in window){
    document.addEventListener('DOMContentLoaded', ()=>{
      const wrapper = document.querySelector('.wrapper');
      if (!wrapper) return;
      const obs = new MutationObserver(()=>applyDoneUI(new Set(load())));
      obs.observe(wrapper, {subtree:true, childList:true});
    });
  }

  window.__applyDoneUI = ()=>applyDoneUI(new Set(load()));
})();


// ---- GitHub Sync (load/save + auto-Load + 409 retry) ----
(function(){
  const KEY_CFG  = 'ghSyncCfg.v1';
  const KEY_DONE = 'doneTasks.v1';
  const DEBOUNCE_MS = 400;      // анти-спам на авто-Save
  let saveTimer = null;

  const els = () => ({
    repo:   document.getElementById('gh_repo'),
    branch: document.getElementById('gh_branch'),
    path:   document.getElementById('gh_path'),
    token:  document.getElementById('gh_token'),
    load:   document.getElementById('btn_load'),
    save:   document.getElementById('btn_save'),
    status: document.getElementById('gh_status'),
  });

  const cfgGet = () => { try { return JSON.parse(localStorage.getItem(KEY_CFG) || '{}'); } catch(e){ return {}; } };
  const cfgSet = (o) => localStorage.setItem(KEY_CFG, JSON.stringify(o));

  const getDone = () => { try { return JSON.parse(localStorage.getItem(KEY_DONE) || '[]'); } catch(e){ return []; } };
  const setDone = (arr) => localStorage.setItem(KEY_DONE, JSON.stringify(arr));

  function show(msg, ok=true, quiet=false){
    const s = els().status; if (!s || quiet) return;
    s.textContent = msg; s.style.color = ok ? '#9cc7a7' : '#ff9f9f';
  }

  function readCfg(){
    const $ = els();
    const repo   = $.repo?.value.trim();
    const branch = $.branch?.value.trim() || 'main';
    const path   = $.path?.value.trim()   || 'state.json';
    const token  = $.token?.value.trim();
    cfgSet({repo, branch, path, token});
    return {repo, branch, path, token};
  }

  function loadCfgToUI(){
    const c = cfgGet();
    const $ = els();
    if (c.repo)   $.repo.value = c.repo;
    if (c.branch) $.branch.value = c.branch;
    if (c.path)   $.path.value = c.path;
    if (c.token)  $.token.value = c.token; // зберігаємо токен у localStorage, щоби ПМ не вводила щоразу
  }

  async function ghJSON(url, opts={}){
    try{
      const r = await fetch(url, {
        headers: { 'Accept':'application/vnd.github+json', 'Cache-Control':'no-cache', ...(opts.headers||{}) },
        ...opts
      });
      if (!r.ok){
        const t = await r.text().catch(()=>String(r.status));
        throw new Error(`HTTP ${r.status}: ${t}`);
      }
      return r.json();
    } catch(err){
      // TypeError: Failed to fetch — мережа/AdBlock/HTTPS тощо
      throw err;
    }
  }

  async function getContent(repo, path, ref, token){
    const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`;
    return ghJSON(api, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  }

  function decodeContent(b64){ return atob((b64||'').replace(/\n/g,'')); }
  function encodeContent(str){ return btoa(unescape(encodeURIComponent(str))); }

  async function loadState({quietAuto=false}={}){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token){
      show('Заповни repo / branch / path / token.', false, quietAuto);
      return;
    }
    try{
      show('Завантажую...', true, quietAuto);
      const data = await getContent(repo, path, branch, token)
        .catch(async (e)=>{
          // 404: файла ще нема — вважаємо порожнім станом
          if (String(e.message).startsWith('HTTP 404')) return {content: btoa('[]')};
          throw e;
        });
      const raw = decodeContent(data.content || '');
      const json = JSON.parse(raw || '[]');
      const arr = Array.isArray(json) ? json : (json.done || []);
      setDone(arr);
      window.__applyDoneUI && window.__applyDoneUI();
      show('Стан завантажено з GitHub.', true, quietAuto);
    } catch(e){
      show('Помилка завантаження: ' + e.message, false, quietAuto);
    }
  }

  async function saveStateInternal(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token){
      show('Заповни repo / branch / path / token.', false);
      return;
    }
    show('Зберігаю...');
    const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;

    // завжди спочатку тягнемо актуальний sha (або 404 якщо файла нема)
    let sha = null;
    try{
      const info = await getContent(repo, path, branch, token);
      sha = info.sha || null;
    } catch(e){
      if (!String(e.message).startsWith('HTTP 404')) {
        // не 404 — реальна помилка
        show('Помилка збереження (info): ' + e.message, false);
        return;
      }
    }

    const body = {
      message: 'Update roadmap done state',
      branch,
      content: encodeContent(JSON.stringify({ done: getDone(), updatedAt: new Date().toISOString() }, null, 2)),
      ...(sha ? { sha } : {})
    };

    async function put(withSha){
      const res = await fetch(api, {
        method: 'PUT',
        headers: { 'Accept':'application/vnd.github+json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(withSha ? {...body, sha: withSha} : body)
      });
      if (!res.ok){
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }
    }

    try{
      await put(sha);
      show('Збережено в GitHub.');
    } catch(e){
      // якщо 409 — підтягнемо свіжий sha і ретраїмо один раз
      if (String(e.message).startsWith('HTTP 409')){
        try{
          const fresh = await getContent(repo, path, branch, token);
          await put(fresh.sha);
          show('Збережено в GitHub (після оновлення sha).');
        } catch(e2){
          show('Помилка збереження (409 retry): ' + e2.message, false);
        }
      } else {
        show('Помилка збереження: ' + e.message, false);
      }
    }
  }

  // публічні кнопки та авто-Save (дебаунс)
  function saveStateDebounced(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveStateInternal, DEBOUNCE_MS);
  }

  // інтеграція з “правий клік” — тригеримо авто-Save
  document.addEventListener('contextmenu', (e)=>{
    if (e.target.closest('.task')){
      // зачекаємо поки локальний стан оновиться (__applyDoneUI викликано) і збережемо
      setTimeout(saveStateDebounced, 50);
    }
  }, true);

  document.addEventListener('DOMContentLoaded', ()=>{
    loadCfgToUI();
    const $ = els();
    if ($.load) $.load.onclick = ()=>loadState();
    if ($.save) $.save.onclick = ()=>saveStateInternal();

    // авто-Load при відкритті, якщо є всі поля — і робимо це “тихо”
    const c = cfgGet();
    if (c.repo && c.branch && c.path && c.token){
      // підставити у форму, щоб ПМ нічого не вводила
      $.repo.value = c.repo; $.branch.value = c.branch; $.path.value = c.path; $.token.value = c.token;
      loadState({quietAuto:true}).catch(()=>{ /* тихо */ });
    }
  });
})();
