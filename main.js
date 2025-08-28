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
        s.className = 'sep';
        s.textContent = ', ';
        depsWrap.appendChild(s);
      }
    });

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
        s.className = 'sep';
        s.textContent = ', ';
        unlWrap.appendChild(s);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', makeLinks);

// ---- Done + Ready states ----
(function(){
  const KEY = 'doneTasks.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  function applyReady(set){
    document.querySelectorAll('.task').forEach(card=>{
      if(card.classList.contains('done')){
        card.classList.remove('ready');
        return;
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
    // mark dependencies
    document.querySelectorAll('.deps-list .linklike').forEach(el=>{
      const src = el.getAttribute('data-dep-src');
      if (src && set.has(src)) el.classList.add('dep-done'); else el.classList.remove('dep-done');
    });
    // also update ready-state
    applyReady(set);
  }

  function toggleById(id){
    const current = new Set(load());
    if (current.has(id)) current.delete(id); else current.add(id);
    save(Array.from(current));
    applyDoneUI(current);
  }

  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if (card){
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleById(card.id);
    }
  }, true);

  document.addEventListener('DOMContentLoaded', ()=>applyDoneUI(new Set(load())));

  if ('MutationObserver' in window){
    const wrapper = document.querySelector('.wrapper');
    if (wrapper){
      const obs = new MutationObserver(()=>applyDoneUI(new Set(load())));
      obs.observe(wrapper, {subtree:true, childList:true});
    }
  }

  window.__applyDoneUI = ()=>applyDoneUI(new Set(load()));
})();

// ---- GitHub Sync (збереження + авто-Load) ----
(function(){
  const KEY_CFG = 'ghSyncCfg.v1';
  const KEY_DONE = 'doneTasks.v1';

  function cfgGet(){ try { return JSON.parse(localStorage.getItem(KEY_CFG) || '{}'); } catch(e){ return {}; } }
  function cfgSet(cfg){ localStorage.setItem(KEY_CFG, JSON.stringify(cfg)); }

  function getDone(){ try { return JSON.parse(localStorage.getItem(KEY_DONE) || '[]'); } catch(e){ return []; } }
  function setDone(arr){ localStorage.setItem(KEY_DONE, JSON.stringify(arr)); }

  function els(){ return {
    repo: document.getElementById('gh_repo'),
    branch: document.getElementById('gh_branch'),
    path: document.getElementById('gh_path'),
    token: document.getElementById('gh_token'),
    load: document.getElementById('btn_load'),
    save: document.getElementById('btn_save'),
    status: document.getElementById('gh_status'),
  };}

  function show(msg, ok=true){ const e = els().status; e.textContent = msg; e.style.color = ok ? '#9cc7a7' : '#ff9f9f'; }

  async function ghFetchJSON(url, opts){
    const r = await fetch(url, opts);
    if (r.status === 404 && String(url).includes('/contents/')){
      setDone([]); window.__applyDoneUI && window.__applyDoneUI();
      show('Файл стану ще не існує — натисни "Save", щоб створити.');
      return {content: btoa('[]')};
    }
    if (!r.ok) { throw new Error('HTTP ' + r.status + ': ' + (await r.text())); }
    return r.json();
  }

  function b64Encode(str){ return btoa(unescape(encodeURIComponent(str))); }

  async function loadState(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token) return show('Заповни всі поля.', false);
    show('Завантажую...');
    try {
      const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
      const data = await ghFetchJSON(api, { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json', 'Cache-Control':'no-cache' } });
      const content = atob((data.content || '').replace(/\\n/g,''));
      const json = JSON.parse(content || '[]');
      const arr = Array.isArray(json) ? json : (json.done || []);
      setDone(arr); window.__applyDoneUI && window.__applyDoneUI();
      show('Стан завантажено з GitHub.');
    } catch(e){ show('Помилка завантаження: ' + e.message, false); }
  }

  async function saveState(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token) return show('Заповни всі поля.', false);
    show('Зберігаю...');
    try {
      const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;
      let sha = null;
      try {
        const info = await ghFetchJSON(`${api}?ref=${encodeURIComponent(branch)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
        });
        sha = info.sha || null;
      } catch(e){ }
      const bodyObj = {
        message: 'Update roadmap done state',
        branch,
        content: b64Encode(JSON.stringify({ done: getDone(), updatedAt: new Date().toISOString() }, null, 2)),
      };
      if (sha) bodyObj.sha = sha;
      await fetch(api, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' },
        body: JSON.stringify(bodyObj)
      }).then(r=>{
        if (!r.ok) return r.text().then(t=>{throw new Error('HTTP ' + r.status + ': ' + t)});
      });
      show('Збережено в GitHub.');
    } catch(e){ show('Помилка збереження: ' + e.message, false); }
  }

  function readCfg(){
    const repo = els().repo.value.trim();
    const branch = els().branch.value.trim() || 'main';
    const path = els().path.value.trim() || 'state.json';
    const token = els().token.value.trim();
    cfgSet({repo, branch, path, token});   // тепер зберігаємо і токен
    return {repo, branch, path, token};
  }

  function loadCfgToUI(){
    const cfg = cfgGet();
    if (cfg.repo) els().repo.value = cfg.repo;
    if (cfg.branch) els().branch.value = cfg.branch;
    if (cfg.path) els().path.value = cfg.path;
    if (cfg.token) els().token.value = cfg.token;  // підставляємо токен
  }

  document.addEventListener('DOMContentLoaded', function(){
    loadCfgToUI();
    els().load.onclick = loadState;
    els().save.onclick = saveState;

    // авто-Load після відкриття, якщо є всі поля
    const cfg = cfgGet();
    if (cfg.repo && cfg.branch && cfg.path && cfg.token){
      setTimeout(()=>loadState(), 500);
    }
  });
})();
