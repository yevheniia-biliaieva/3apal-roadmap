
function scrollToTask(id){
  const el = document.getElementById(id);
  if (!el) return;
  document.querySelectorAll('.task').forEach(t=>t.classList.remove('highlight'));
  el.classList.add('highlight');
  el.scrollIntoView({behavior:'smooth', block:'center'});
}

window.revMap = {"brand_doc": ["logo_system", "tone"], "positioning": ["logo_system"], "logo_system": ["colors_fonts", "popup_visuals", "tags_design", "labels_design", "inserts_design"], "colors_fonts": ["icons_patterns", "ig_templates", "popup_visuals", "tags_design", "labels_design", "inserts_design"], "content_pillars": ["ig_templates", "content_strategy"], "ig_templates": ["social_pack", "content_plan", "visuals_posts"], "popup_visuals": ["popup_posters"], "pouch_patterns": ["samples_sew"], "bag_patterns": ["samples_sew"], "lighter_case_patterns": ["samples_sew"], "samples_sew": ["feedback_internal", "samples_photos"], "feedback_internal": ["feedback_external"], "feedback_external": ["feedback_table"], "feedback_table": ["design_corrections"], "lighter_designs": ["lighter_test_print"], "design_corrections": ["product_brief", "final_samples_check"], "suppliers_search": ["product_brief", "backup_vendors"], "lighter_test_print": ["product_brief"], "product_brief": ["techpack_bom", "copies", "sales_platform"], "techpack_bom": ["qcqa_checklist", "mass_production"], "content_strategy": ["content_plan", "copies", "ugc_concept", "media_plan", "crisis_guide"], "ugc_concept": ["first_mentions", "ugc_campaign"], "content_plan": ["micro_influencers", "prepr_teaser", "shoot_shotlist", "launch_posts"], "micro_influencers": ["promo_kits"], "visuals_posts": ["prepr_teaser", "launch_posts"], "sales_platform": ["ref_program", "orders_processing", "welcome_msgs", "popup_pos", "popup_sales_scripts"], "orders_processing": ["faq_support", "real_shipments"], "real_shipments": ["returns", "reviews_cases"], "qcqa_checklist": ["mass_production"], "mass_production": ["crash_tests", "final_qc", "tags_attached", "care_labels", "thank_you_cards", "popup_invite_boxes"], "crash_tests": ["final_qc"], "tags_design": ["tags_attached"], "labels_design": ["care_labels"], "inserts_design": ["thank_you_cards"], "final_qc": ["packaging", "final_photo_archive"], "tags_attached": ["packaging"], "care_labels": ["packaging"], "thank_you_cards": ["packaging"], "prepr_teaser": ["teaser_reveal_drop"], "media_plan": ["teaser_reveal_drop"], "promo_kits": ["influencers_ops"], "ugc_campaign": ["reviews_cases"], "packaging": ["popup_location", "popup_inventory"], "teaser_reveal_drop": ["popup_location", "popup_invites"], "popup_location": ["popup_zoning", "popup_mirrors", "popup_script"], "popup_zoning": ["popup_decor", "popup_upcycle", "popup_photozone", "popup_planogram"], "popup_decor": ["popup_garlands"], "popup_posters": ["popup_mirrors"], "popup_invites": ["popup_invite_boxes"], "popup_script": ["popup_playlist", "popup_photovideo"], "popup_photovideo": ["popup_feedback", "popup_thanks_digest"], "popup_feedback": ["popup_thanks_digest"]};
window.edgeGaps = {"logo_system": {"brand_doc": "1–2 дні", "positioning": "1–2 дні"}, "colors_fonts": {"logo_system": "1–2 дні"}, "icons_patterns": {"colors_fonts": "2–3 дні"}, "ig_templates": {"colors_fonts": "1–2 дні", "content_pillars": "1–2 дні"}, "social_pack": {"ig_templates": "1–2 дні"}, "popup_visuals": {"logo_system": "1–2 дні", "colors_fonts": "1–2 дні"}, "popup_posters": {"popup_visuals": "1–2 дні"}, "tags_design": {"logo_system": "1–2 дні", "colors_fonts": "1–2 дні"}, "labels_design": {"logo_system": "1–2 дні", "colors_fonts": "1–2 дні"}, "inserts_design": {"logo_system": "1–2 дні", "colors_fonts": "1–2 дні"}, "samples_sew": {"pouch_patterns": "2–3 дні", "bag_patterns": "2–3 дні", "lighter_case_patterns": "2–3 дні"}, "feedback_internal": {"samples_sew": "2–3 дні"}, "feedback_external": {"feedback_internal": "2–3 дні"}, "feedback_table": {"feedback_external": "2–3 дні"}, "design_corrections": {"feedback_table": "2–3 дні"}, "lighter_test_print": {"lighter_designs": "1–2 дні"}, "product_brief": {"design_corrections": "2–3 дні", "suppliers_search": "1–2 дні", "lighter_test_print": "1–2 дні"}, "techpack_bom": {"product_brief": "2–3 дні"}, "qcqa_checklist": {"techpack_bom": "2–3 дні"}, "samples_photos": {"samples_sew": "2–3 дні"}, "backup_vendors": {"suppliers_search": "1–2 дні"}, "content_strategy": {"content_pillars": "1–2 дні"}, "content_plan": {"content_strategy": "1–2 дні", "ig_templates": "1–2 дні"}, "visuals_posts": {"ig_templates": "1–2 дні"}, "copies": {"content_strategy": "1–2 дні", "product_brief": "1–2 дні"}, "tone": {"brand_doc": "1–2 дні"}, "ugc_concept": {"content_strategy": "1–2 дні"}, "first_mentions": {"ugc_concept": "1–2 дні"}, "micro_influencers": {"content_plan": "1–2 дні"}, "promo_kits": {"micro_influencers": "1–2 дні"}, "prepr_teaser": {"content_plan": "1–2 дні", "visuals_posts": "1–2 дні"}, "media_plan": {"content_strategy": "1–2 дні"}, "shoot_shotlist": {"content_plan": "1–2 дні"}, "ref_program": {"sales_platform": "1–2 дні"}, "crisis_guide": {"content_strategy": "1–2 дні"}, "sales_platform": {"product_brief": "1–2 дні"}, "orders_processing": {"sales_platform": "1–2 дні"}, "faq_support": {"orders_processing": "1–2 дні"}, "welcome_msgs": {"sales_platform": "1–2 дні"}, "real_shipments": {"orders_processing": "1–2 дні"}, "returns": {"real_shipments": "1–2 дні"}, "mass_production": {"techpack_bom": "5–7 днів", "qcqa_checklist": "5–7 днів"}, "final_samples_check": {"design_corrections": "2–3 дні"}, "crash_tests": {"mass_production": "5–7 днів"}, "final_qc": {"mass_production": "5–7 днів", "crash_tests": "2–3 дні"}, "tags_attached": {"tags_design": "1–2 дні", "mass_production": "5–7 днів"}, "care_labels": {"labels_design": "1–2 дні", "mass_production": "5–7 днів"}, "thank_you_cards": {"inserts_design": "1–2 дні", "mass_production": "5–7 днів"}, "packaging": {"final_qc": "5–7 днів", "tags_attached": "5–7 днів", "care_labels": "5–7 днів", "thank_you_cards": "5–7 днів"}, "final_photo_archive": {"final_qc": "2–3 дні"}, "teaser_reveal_drop": {"prepr_teaser": "1–2 дні", "media_plan": "1–2 дні"}, "influencers_ops": {"promo_kits": "1–2 дні"}, "launch_posts": {"content_plan": "1–2 дні", "visuals_posts": "1–2 дні"}, "ugc_campaign": {"ugc_concept": "1–2 дні"}, "reviews_cases": {"real_shipments": "1–2 дні", "ugc_campaign": "1–2 дні"}, "popup_location": {"packaging": "5–7 днів", "teaser_reveal_drop": "1–2 дні"}, "popup_zoning": {"popup_location": "1–2 дні"}, "popup_decor": {"popup_zoning": "1–2 дні"}, "popup_garlands": {"popup_decor": "1–2 дні"}, "popup_mirrors": {"popup_location": "1–2 дні", "popup_posters": "1–2 дні"}, "popup_invites": {"teaser_reveal_drop": "1–2 дні"}, "popup_invite_boxes": {"mass_production": "5–7 днів", "popup_invites": "1–2 дні"}, "popup_upcycle": {"popup_zoning": "1–2 дні"}, "popup_photozone": {"popup_zoning": "1–2 дні"}, "popup_script": {"popup_location": "1–2 дні"}, "popup_playlist": {"popup_script": "1–2 дні"}, "popup_pos": {"sales_platform": "1–2 дні"}, "popup_inventory": {"packaging": "5–7 днів"}, "popup_planogram": {"popup_zoning": "1–2 дні"}, "popup_sales_scripts": {"sales_platform": "1–2 дні"}, "popup_photovideo": {"popup_script": "1–2 дні"}, "popup_feedback": {"popup_photovideo": "2–3 дні"}, "popup_thanks_digest": {"popup_feedback": "2–3 дні", "popup_photovideo": "1–2 дні"}};

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
      // annotate for dep-done logic
      span.setAttribute('data-dep-src', d);
      depsWrap.appendChild(span);
      const gap = (window.edgeGaps[id] && window.edgeGaps[id][d]) ? window.edgeGaps[id][d] : null;
      if (gap){
        const g = document.createElement('span'); g.className = 'smallgap'; g.textContent = '(~' + gap + ')'; depsWrap.appendChild(g);
      }
      if (idx < deps.length - 1){ const s = document.createElement('span'); s.className = 'sep'; s.textContent = ', '; depsWrap.appendChild(s); }
    });

    const unlocks = window.revMap[id] || [];
    const unlWrap = card.querySelector('.unlocks-list');
    unlocks.forEach((u, idx)=>{
      const span = document.createElement('span');
      span.className = 'linklike';
      span.textContent = document.getElementById(u)?.dataset.title || u;
      span.onclick = ()=>scrollToTask(u);
      unlWrap.appendChild(span);
      const gap = (window.edgeGaps[u] && window.edgeGaps[u][id]) ? window.edgeGaps[u][id] : null;
      if (gap){
        const g = document.createElement('span'); g.className = 'smallgap'; g.textContent = '(~' + gap + ')'; unlWrap.appendChild(g);
      }
      if (idx < unlocks.length - 1){ const s = document.createElement('span'); s.className = 'sep'; s.textContent = ', '; unlWrap.appendChild(s); }
    });
  });
}

document.addEventListener('DOMContentLoaded', makeLinks);

// ---- Done state: fresh from localStorage each toggle ----
(function(){
  const KEY = 'doneTasks.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));
  function applyDoneUI(set){
    document.querySelectorAll('.task').forEach(el=>{
      if (set.has(el.id)) el.classList.add('done'); else el.classList.remove('done');
    });
    // dependencies mark
    document.querySelectorAll('.deps-list .linklike').forEach(el=>{
      const src = el.getAttribute('data-dep-src');
      if (src && set.has(src)) el.classList.add('dep-done'); else el.classList.remove('dep-done');
    });
  }
  function toggleById(id){
    const current = new Set(load());
    if (current.has(id)) current.delete(id); else current.add(id);
    save(Array.from(current));
    applyDoneUI(current);
  }
  // capture phase to override any older handlers
  document.addEventListener('contextmenu', function(e){
    const card = e.target.closest('.task');
    if (card){
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleById(card.id);
    }
  }, true);
  // initial
  document.addEventListener('DOMContentLoaded', ()=>applyDoneUI(new Set(load())));
  // after any mutation
  document.addEventListener('DOMContentLoaded', function(){
    const wrapper = document.querySelector('.wrapper');
    if (!('MutationObserver' in window) || !wrapper) return;
    const obs = new MutationObserver(()=>applyDoneUI(new Set(load())));
    obs.observe(wrapper, {subtree:true, childList:true});
  });
  window.__applyDoneUI = ()=>applyDoneUI(new Set(load()));
})();

// ---- GitHub Sync (load/save done state) with 404-friendly load ----
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
      // treat as empty state
      setDone([]);
      window.__applyDoneUI && window.__applyDoneUI();
      show('Файл стану ще не існує — натисни "Save", щоб створити.');
      // return mock ok so downstream JSON.parse works if needed
      return {content: btoa('[]')};
    }
    if (!r.ok) { throw new Error('HTTP ' + r.status + ': ' + (await r.text())); }
    return r.json();
  }

  function b64Encode(str){ return btoa(unescape(encodeURIComponent(str))); }

  async function loadState(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token) return show('Заповни всі поля для завантаження.', false);
    show('Завантажую...');
    try {
      const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
      const data = await ghFetchJSON(api, { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' } });
      const content = atob((data.content || '').replace(/\n/g,''));
      const json = JSON.parse(content || '[]');
      const arr = Array.isArray(json) ? json : (json.done || []);
      setDone(arr);
      window.__applyDoneUI && window.__applyDoneUI();
      show('Стан завантажено з GitHub.');
    } catch(e){ show('Помилка завантаження: ' + e.message, false); }
  }

  async function saveState(){
    const {repo, branch, path, token} = readCfg();
    if (!repo || !branch || !path || !token) return show('Заповни всі поля для збереження.', false);
    show('Зберігаю...');
    try {
      const api = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;
      // get current sha if exists
      let sha = null;
      try {
        const info = await ghFetchJSON(`${api}?ref=${encodeURIComponent(branch)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
        });
        sha = info.sha || null;
      } catch(e){ /* if 404 handled above, new file */ }
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
    cfgSet({repo, branch, path});
    return {repo, branch, path, token};
  }

  function loadCfgToUI(){
    const cfg = cfgGet();
    if (cfg.repo) els().repo.value = cfg.repo;
    if (cfg.branch) els().branch.value = cfg.branch;
    if (cfg.path) els().path.value = cfg.path;
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Inject toolbar UI
    const h1 = document.querySelector('h1');
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    toolbar.innerHTML = `
      <div class="col-4"><label>Repo (owner/name)</label><input id="gh_repo" placeholder="owner/name"></div>
      <div class="col-2"><label>Branch</label><input id="gh_branch" placeholder="main" value="main"></div>
      <div class="col-3"><label>State path</label><input id="gh_path" placeholder="state.json" value="state.json"></div>
      <div class="col-3"><label>Token (fine-grained)</label><input id="gh_token" placeholder="github_pat_***" type="password"></div>
      <div class="col-12">
        <button id="btn_load">Load state from GitHub</button>
        <button id="btn_save">Save state to GitHub</button>
        <span class="status" id="gh_status"></span>
      </div>`;
    h1.after(toolbar);
    loadCfgToUI();
    document.getElementById('btn_load').onclick = loadState;
    document.getElementById('btn_save').onclick = saveState;
  });
})();


// --- Extend applyDoneUI with .ready state ---
(function(){
  const KEY = 'doneTasks.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } };

  function applyReady(set){
    document.querySelectorAll('.task').forEach(card => {
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

  // Patch existing __applyDoneUI if defined
  if (typeof window.__applyDoneUI === 'function'){
    const orig = window.__applyDoneUI;
    window.__applyDoneUI = ()=>{
      orig();
      applyReady(new Set(load()));
    };
  } else {
    document.addEventListener('DOMContentLoaded', ()=>applyReady(new Set(load())));
  }
})();
